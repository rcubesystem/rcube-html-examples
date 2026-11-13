// Editable table & row actions — Edit cells, validate them, add / remove rows and add your own buttons to each
//    row.
// Live example and explanation: https://rcube-html.com/table-editing
// Group: Data components
//
// Covers:
//   - Editable cells
//   - Your own buttons
//
// Form fields (name — type, label):
//   - items — DataTable
//
// Actions written here: cellChanged, holdItem, releaseItem, duplicateItem, holdSelected, addSample
// Built-in actions it uses: runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/table-editing";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "DataTable",
    "id": "items",
    "props": {
      "name": "items",
      "title": "Order items",
      "rowKey": "sku",
      "columns": [
        {
          "key": "sku",
          "title": "SKU",
          "width": 90
        },
        {
          "key": "product",
          "title": "Product"
        },
        {
          "key": "qty",
          "title": "Qty",
          "width": 110,
          "total": "sum",
          "editor": {
            "type": "number",
            "required": true,
            "min": 1,
            "max": 99,
            "rangeMessage": "1–99"
          }
        },
        {
          "key": "ship",
          "title": "Ship via",
          "width": 150,
          "editor": {
            "type": "select",
            "options": [
              "Ground",
              "Air",
              "Express"
            ]
          }
        },
        {
          "key": "gift",
          "title": "Gift",
          "align": "center",
          "editor": {
            "type": "checkbox"
          }
        },
        {
          "key": "status",
          "title": "Status",
          "badge": {
            "Ready": "success",
            "On hold": "secondary"
          }
        },
        {
          "key": "actions",
          "title": "",
          "actions": [
            {
              "text": "Hold",
              "variant": "outline-secondary",
              "onClick": "holdItem()",
              "hiddenWhen": {
                "field": "status",
                "equals": "On hold"
              }
            },
            {
              "text": "Release",
              "variant": "outline-success",
              "onClick": "releaseItem()",
              "hiddenWhen": {
                "field": "status",
                "equals": "Ready"
              }
            },
            {
              "text": "Duplicate",
              "onClick": "duplicateItem()"
            }
          ]
        }
      ],
      "rows": [
        {
          "sku": "A-100",
          "product": "Notebook",
          "qty": 2,
          "ship": "Ground",
          "gift": false,
          "status": "Ready"
        },
        {
          "sku": "B-200",
          "product": "Pen set",
          "qty": 5,
          "ship": "Air",
          "gift": true,
          "status": "Ready"
        },
        {
          "sku": "C-300",
          "product": "Desk lamp",
          "qty": "",
          "ship": "Express",
          "gift": false,
          "status": "On hold"
        }
      ],
      "pageSize": 0,
      "selectable": true,
      "removable": true,
      "addable": true,
      "size": "sm",
      "toolbarActions": [
        {
          "text": "Hold selected",
          "variant": "outline-secondary",
          "onClick": "holdSelected()",
          "needsSelection": true
        }
      ],
      "rowRules": [
        {
          "when": {
            "field": "status",
            "equals": "On hold"
          },
          "color": "#6c757d"
        }
      ],
      "onCellChange": "cellChanged()"
    }
  },
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-buttons",
        "props": {
          "className": "rc-d-flex rc-gap-2 rc-justify-content-end"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "add-sample",
            "props": {
              "text": "Add a row from code",
              "variant": "outline-primary",
              "onClick": "addSample()"
            }
          },
          {
            "type": "ButtonField",
            "id": "submit",
            "props": {
              "type": "submit",
              "text": "Submit (validates Qty)",
              "onClick": "runValidation()"
            }
          }
        ]
      }
    ]
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // cellChanged: run by DataTable "items" (onCellChange)
  cellChanged: ({ rowKey, column, value }) => console.log(rowKey, column, "=", value),
  // holdItem: run by DataTable "items" (columns › "actions" › actions › "Hold" › onClick)
  holdItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "On hold" }),
  // releaseItem: run by DataTable "items" (columns › "actions" › actions › "Release" › onClick)
  releaseItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "Ready" }),
  // duplicateItem: run by DataTable "items" (columns › "actions" › actions › "Duplicate" › onClick)
  duplicateItem: (event, { table, row }) => api.addRow(table, { ...row, sku: row.sku.split("~")[0] + "~" + (Date.now() % 10000) }),
  // holdSelected: run by DataTable "items" (toolbarActions › "Hold selected" › onClick)
  holdSelected: (event, { table, rows }) => rows.forEach((row) => api.updateRow(table, row.sku, { status: "On hold" })),
  // addSample: run by ButtonField "add-sample" (onClick)
  addSample: () => {
    const n = Math.floor(Math.random() * 900) + 100;
    api.addRow("items", { sku: "N-" + n, product: "New product " + n, qty: 1, ship: "Ground", gift: false, status: "Ready" });
  },
});
