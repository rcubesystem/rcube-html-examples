// Schema basics — https://rcube-html.com/schema-basics
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
  {
    "type": "row",
    "id": "row-header",
    "props": {
      "className": "rc-mb-3"
    },
    "children": [
      {
        "type": "column",
        "id": "col-header",
        "props": {
          "className": "rc-col-12 rc-bg-primary-subtle rc-rounded rc-p-3"
        },
        "children": [
          {
            "type": "H4",
            "id": "title",
            "props": {
              "text": "Page title",
              "className": "rc-mb-1"
            }
          },
          {
            "type": "P",
            "id": "subtitle",
            "props": {
              "text": "A row with one full-width column.",
              "className": "rc-mb-0 rc-text-body-secondary"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-body",
    "props": {
      "className": "rc-g-3 rc-mb-3"
    },
    "children": [
      {
        "type": "column",
        "id": "col-main",
        "props": {
          "className": "rc-col-12 rc-col-md-8"
        },
        "children": [
          {
            "type": "DIV",
            "id": "main-box",
            "props": {
              "className": "rc-border rc-rounded rc-p-3 rc-h-100",
              "children": "Main column (col-md-8): two thirds of the width on medium screens and up."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-side",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "DIV",
            "id": "side-box",
            "props": {
              "className": "rc-border rc-rounded rc-p-3 rc-h-100 rc-bg-body-tertiary",
              "children": "Side column (col-md-4)."
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-three",
    "props": {
      "className": "rc-g-3 rc-mb-3 rc-text-center"
    },
    "children": [
      {
        "type": "column",
        "id": "col-a",
        "children": [
          {
            "type": "DIV",
            "id": "box-a",
            "props": {
              "className": "rc-border rc-rounded rc-p-2",
              "children": "Equal"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-b",
        "children": [
          {
            "type": "DIV",
            "id": "box-b",
            "props": {
              "className": "rc-border rc-rounded rc-p-2",
              "children": "Equal"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-c",
        "children": [
          {
            "type": "DIV",
            "id": "box-c",
            "props": {
              "className": "rc-border rc-rounded rc-p-2",
              "children": "Equal"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-button",
    "children": [
      {
        "type": "column",
        "id": "col-button",
        "children": [
          {
            "type": "ButtonField",
            "id": "change",
            "props": {
              "text": "Change the title",
              "variant": "primary",
              "onClick": "changeTitle()"
            }
          }
        ]
      }
    ]
  }
];

function Example() {
  const form = useDynamicTag({
    schema,
    actions: (api) => ({
      changeTitle: () => api.setNodeProps("title", { text: "Changed at " + new Date().toLocaleTimeString() }),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
