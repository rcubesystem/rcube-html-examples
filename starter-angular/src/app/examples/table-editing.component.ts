// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Editable table & row actions — https://rcube-html.com/table-editing
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";
import "rcube-html/element/table";

const schema = [
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

@Component({
  selector: "app-table-editing",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [actions]="actions"
    (submitted)="onSubmit($event.entries)"
  ></rcube-html-form>`,
})
export class TableEditingComponent {
  schema = schema;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    cellChanged: ({ rowKey, column, value }) => console.log(rowKey, column, "=", value),
    holdItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "On hold" }),
    releaseItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "Ready" }),
    duplicateItem: (event, { table, row }) => api.addRow(table, { ...row, sku: row.sku.split("~")[0] + "~" + (Date.now() % 10000) }),
    holdSelected: (event, { table, rows }) => rows.forEach((row) => api.updateRow(table, row.sku, { status: "On hold" })),
    addSample: () => {
      const n = Math.floor(Math.random() * 900) + 100;
      api.addRow("items", { sku: "N-" + n, product: "New product " + n, qty: 1, ship: "Ground", gift: false, status: "Ready" });
    },
  });
  onSubmit(entries: unknown[]) {
    console.log("Submitted:", entries);
  }
}