// Remembered views & the chosen row — https://rcube-html.com/remember-view
"use client";
import { useEffect } from "react";
import { useDynamicTag, DynamicTag } from "rcube-html";
import { configureViewStore, readView, saveView } from "rcube-html";
import ClientOnly from "../../ClientOnly";

// once signed in: whose choices these are (here a demo person) — in the browser only (Next.js also runs this
// file on the server, where there is no window / localStorage)
if (typeof window !== "undefined") configureViewStore({ namespace: "demo.school", user: "demo", days: 7 });
const ROWS = [{"id":1,"customer":"Aisha Khan","status":"Paid","amount":120.5},{"id":2,"customer":"Ben Lee","status":"Due","amount":80},{"id":3,"customer":"Carla Garcia","status":"Overdue","amount":45.25},{"id":4,"customer":"Dev Patel","status":"Paid","amount":300},{"id":5,"customer":"Elena Novak","status":"Due","amount":64.9},{"id":6,"customer":"Farid Haddad","status":"Paid","amount":18},{"id":7,"customer":"Grace Okafor","status":"Overdue","amount":99.99},{"id":8,"customer":"Hugo Brown","status":"Paid","amount":240},{"id":9,"customer":"Ines Silva","status":"Due","amount":12.5},{"id":10,"customer":"Jamal Wong","status":"Paid","amount":75},{"id":11,"customer":"Kim Ivanova","status":"Due","amount":150},{"id":12,"customer":"Leo Moreau","status":"Overdue","amount":33}];
const views = { readView, saveView };

const schema = [
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

function Example() {
  const form = useDynamicTag({
    schema,
    actions: (api) => ({
      // the page's filter, saved with the table's view ("<key>:filters": Reset clears it too)
      restoreFilters: () => {
        const saved = views.readView("demo-orders:filters");
        if (saved?.status) { api.setFieldValue("status", saved.status); api.setRows("orders", ROWS.filter((r) => r.status === saved.status)); }
      },
      statusChanged: (event, { value }) => {
        views.saveView("demo-orders:filters", value ? { status: value } : null);
        api.setRows("orders", value ? ROWS.filter((r) => r.status === value) : ROWS);
      },
      viewReset: () => { api.setFieldValue("status", ""); api.setRows("orders", ROWS); },
      openIt: (event, { rows }) => console.log("Open", rows[0]),
    }),
  });
  // once, when the page opens
  useEffect(() => {
    form.actions.restoreFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
