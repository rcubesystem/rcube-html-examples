// Remembered views & the chosen row — Tables keep each person's page, sort, search and filters for a week, with
//    Reset; a radio per row and a highlighted chosen row.
// Live example and explanation: https://rcube-html.com/remember-view
// Group: Data components
//
// Covers:
//   - Tables that remember
//   - The chosen row
//
// Form fields (name — type, label):
//   - status — SelectField "Status"
//
// Actions written here: restoreFilters, statusChanged, viewReset, openIt
//
// Use it in a client component ("use client"):
//   import { schema, actions, onLoad } from "<path>/schema/remember-view";
//   const form = useDynamicTag({ schema, actions });
//   useEffect(() => onLoad(form), []);
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

import { configureViewStore, readView, saveView } from "rcube-html";

// Helpers the actions use (ROWS, views): in a real app, often your API or data.
// once signed in: whose choices these are (here a demo person) — in the browser only (Next.js also runs this
// file on the server, where there is no window / localStorage)
if (typeof window !== "undefined") configureViewStore({ namespace: "demo.school", user: "demo", days: 7 });
const ROWS = [{"id":1,"customer":"Aisha Khan","status":"Paid","amount":120.5},{"id":2,"customer":"Ben Lee","status":"Due","amount":80},{"id":3,"customer":"Carla Garcia","status":"Overdue","amount":45.25},{"id":4,"customer":"Dev Patel","status":"Paid","amount":300},{"id":5,"customer":"Elena Novak","status":"Due","amount":64.9},{"id":6,"customer":"Farid Haddad","status":"Paid","amount":18},{"id":7,"customer":"Grace Okafor","status":"Overdue","amount":99.99},{"id":8,"customer":"Hugo Brown","status":"Paid","amount":240},{"id":9,"customer":"Ines Silva","status":"Due","amount":12.5},{"id":10,"customer":"Jamal Wong","status":"Paid","amount":75},{"id":11,"customer":"Kim Ivanova","status":"Due","amount":150},{"id":12,"customer":"Leo Moreau","status":"Overdue","amount":33}];
const views = { readView, saveView };

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "SelectField",
    "id": "status",
    "props": {
      "name": "status",
      "label": "Status",
      "placeholder": "Every status",
      "options": [
        "Paid",
        "Due",
        "Overdue"
      ],
      "onChange": "statusChanged()",
      "className": "rc-mb-2",
      "style": {
        "maxWidth": 240
      }
    }
  },
  {
    "type": "DataTable",
    "id": "orders",
    "props": {
      "remember": "demo-orders",
      "onViewReset": "viewReset()",
      "rowKey": "id",
      "rows": [
        {
          "id": 1,
          "customer": "Aisha Khan",
          "status": "Paid",
          "amount": 120.5
        },
        {
          "id": 2,
          "customer": "Ben Lee",
          "status": "Due",
          "amount": 80
        },
        {
          "id": 3,
          "customer": "Carla Garcia",
          "status": "Overdue",
          "amount": 45.25
        },
        {
          "id": 4,
          "customer": "Dev Patel",
          "status": "Paid",
          "amount": 300
        },
        {
          "id": 5,
          "customer": "Elena Novak",
          "status": "Due",
          "amount": 64.9
        },
        {
          "id": 6,
          "customer": "Farid Haddad",
          "status": "Paid",
          "amount": 18
        },
        {
          "id": 7,
          "customer": "Grace Okafor",
          "status": "Overdue",
          "amount": 99.99
        },
        {
          "id": 8,
          "customer": "Hugo Brown",
          "status": "Paid",
          "amount": 240
        },
        {
          "id": 9,
          "customer": "Ines Silva",
          "status": "Due",
          "amount": 12.5
        },
        {
          "id": 10,
          "customer": "Jamal Wong",
          "status": "Paid",
          "amount": 75
        },
        {
          "id": 11,
          "customer": "Kim Ivanova",
          "status": "Due",
          "amount": 150
        },
        {
          "id": 12,
          "customer": "Leo Moreau",
          "status": "Overdue",
          "amount": 33
        }
      ],
      "selectable": "single",
      "sortable": true,
      "searchable": true,
      "pageSize": 5,
      "pageSizeOptions": [
        5,
        10,
        25
      ],
      "size": "sm",
      "columns": [
        {
          "key": "id",
          "title": "#",
          "sortable": true,
          "width": 60
        },
        {
          "key": "customer",
          "title": "Customer",
          "sortable": true
        },
        {
          "key": "status",
          "title": "Status",
          "badge": {
            "Paid": "success",
            "Due": "warning",
            "Overdue": "danger"
          }
        },
        {
          "key": "amount",
          "title": "Amount",
          "format": "currency",
          "align": "end",
          "sortable": true
        }
      ],
      "toolbarActions": [
        {
          "text": "Open",
          "variant": "outline-primary",
          "onClick": "openIt()",
          "needsSelection": true
        }
      ]
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // the page's filter, saved with the table's view ("<key>:filters": Reset clears it too)
  // restoreFilters: run once when the page opens (see onLoad below)
  restoreFilters: () => {
    const saved = views.readView("demo-orders:filters");
    if (saved?.status) { api.setFieldValue("status", saved.status); api.setRows("orders", ROWS.filter((r) => r.status === saved.status)); }
  },
  // statusChanged: run by SelectField "status" (onChange)
  statusChanged: (event, { value }) => {
    views.saveView("demo-orders:filters", value ? { status: value } : null);
    api.setRows("orders", value ? ROWS.filter((r) => r.status === value) : ROWS);
  },
  // viewReset: run by DataTable "orders" (onViewReset)
  viewReset: () => { api.setFieldValue("status", ""); api.setRows("orders", ROWS); },
  // openIt: run by DataTable "orders" (toolbarActions › "Open" › onClick)
  openIt: (event, { rows }) => console.log("Open", rows[0]),
});

// Runs once when the page opens (call it from useEffect).
export const onLoad = (form) => {
  form.actions.restoreFilters();
};
