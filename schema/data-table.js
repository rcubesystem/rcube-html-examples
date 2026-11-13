// Data table — Sorting, search, paging, selection, formats, totals, CSV export and colors.
// Live example and explanation: https://rcube-html.com/data-table
// Group: Data components
//
// Covers:
//   - A table from columns and rows
//
// No form fields: it shows content, layout or data.
//
// Actions written here: rowClicked, selectionChanged, sortChanged, pageChanged
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/data-table";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "DataTable",
    "id": "orders",
    "props": {
      "title": "Orders",
      "rowKey": "id",
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
          "key": "email",
          "title": "Email",
          "link": "mailto:{email}",
          "hideBelow": "lg"
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
          "currency": "USD",
          "align": "end",
          "sortable": true,
          "total": "sum"
        },
        {
          "key": "date",
          "title": "Date",
          "format": "date",
          "sortable": true
        }
      ],
      "rows": [
        {
          "id": 1,
          "customer": "Ann Lee",
          "email": "ann@example.com",
          "status": "Paid",
          "amount": 120,
          "date": "2026-10-02"
        },
        {
          "id": 2,
          "customer": "Bob Stone",
          "email": "bob@example.com",
          "status": "Due",
          "amount": 75.5,
          "date": "2026-10-05"
        },
        {
          "id": 3,
          "customer": "Cara Diaz",
          "email": "cara@example.com",
          "status": "Paid",
          "amount": 310,
          "date": "2026-10-07"
        },
        {
          "id": 4,
          "customer": "Dev Patel",
          "email": "dev@example.com",
          "status": "Overdue",
          "amount": 48,
          "date": "2026-09-28"
        },
        {
          "id": 5,
          "customer": "Eli Moss",
          "email": "eli@example.com",
          "status": "Paid",
          "amount": 220,
          "date": "2026-10-11"
        },
        {
          "id": 6,
          "customer": "Fay Wong",
          "email": "fay@example.com",
          "status": "Due",
          "amount": 95,
          "date": "2026-10-12"
        },
        {
          "id": 7,
          "customer": "Gus Hale",
          "email": "gus@example.com",
          "status": "Paid",
          "amount": 1250,
          "date": "2026-10-15"
        },
        {
          "id": 8,
          "customer": "Hana Ito",
          "email": "hana@example.com",
          "status": "Overdue",
          "amount": 64,
          "date": "2026-09-30"
        },
        {
          "id": 9,
          "customer": "Ivan Roy",
          "email": "ivan@example.com",
          "status": "Paid",
          "amount": 180,
          "date": "2026-10-18"
        },
        {
          "id": 10,
          "customer": "Jo Kim",
          "email": "jo@example.com",
          "status": "Due",
          "amount": 33,
          "date": "2026-10-20"
        },
        {
          "id": 11,
          "customer": "Kai Berg",
          "email": "kai@example.com",
          "status": "Paid",
          "amount": 410,
          "date": "2026-10-22"
        },
        {
          "id": 12,
          "customer": "Lia Cruz",
          "email": "lia@example.com",
          "status": "Paid",
          "amount": 88,
          "date": "2026-10-25"
        }
      ],
      "pageSize": 5,
      "pageSizeOptions": [
        5,
        10,
        25
      ],
      "searchable": true,
      "selectable": true,
      "exportable": true,
      "columnToggle": true,
      "stackBelow": "md",
      "size": "sm",
      "rowRules": [
        {
          "when": {
            "field": "status",
            "equals": "Overdue"
          },
          "background": "#fdecec"
        }
      ],
      "hoverRow": {
        "background": "#fff8e1"
      },
      "onRowClick": "rowClicked()",
      "onSelectionChange": "selectionChanged()",
      "onSortChange": "sortChanged()",
      "onPageChange": "pageChanged()"
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // rowClicked: run by DataTable "orders" (onRowClick)
  rowClicked: ({ row }) => console.log("Row:", row),
  // selectionChanged: run by DataTable "orders" (onSelectionChange)
  selectionChanged: ({ selected }) => console.log("Selected keys:", selected),
  // sortChanged: run by DataTable "orders" (onSortChange)
  sortChanged: ({ sort }) => console.log("Sort:", sort),
  // pageChanged: run by DataTable "orders" (onPageChange)
  pageChanged: ({ page, pageSize }) => console.log("Page", page, "of size", pageSize),
});
