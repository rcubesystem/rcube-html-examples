// Tabs & accordion — https://rcube-html.com/tabs-accordion
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
  {
    "type": "row",
    "id": "row-tabs",
    "children": [
      {
        "type": "column",
        "id": "c-tabs",
        "children": [
          {
            "type": "Tabs",
            "id": "profile-tabs",
            "props": {
              "defaultActiveKey": "personal",
              "onSelect": "tabChanged()"
            },
            "items": [
              {
                "key": "personal",
                "title": "Personal",
                "children": [
                  {
                    "type": "InputField",
                    "id": "name",
                    "props": {
                      "name": "name",
                      "label": "Name",
                      "required": true
                    }
                  }
                ]
              },
              {
                "key": "address",
                "title": "Address",
                "children": [
                  {
                    "type": "InputField",
                    "id": "city",
                    "props": {
                      "name": "city",
                      "label": "City (required — leave it empty and press Submit)",
                      "required": true
                    }
                  }
                ]
              },
              {
                "key": "notes",
                "title": "Notes",
                "children": [
                  {
                    "type": "TextareaField",
                    "id": "notes",
                    "props": {
                      "name": "notes",
                      "label": "Notes",
                      "rows": 2
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-tab-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-tab-buttons",
        "props": {
          "className": "rc-d-flex rc-gap-2 rc-mb-4"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "go-address",
            "props": {
              "text": "Go to Address",
              "variant": "outline-primary",
              "data-tabs": "profile-tabs",
              "data-key": "address",
              "onClick": "selectTab()"
            }
          },
          {
            "type": "ButtonField",
            "id": "go-notes",
            "props": {
              "text": "Go to Notes (from code)",
              "variant": "outline-primary",
              "onClick": "openNotes()"
            }
          },
          {
            "type": "ButtonField",
            "id": "submit",
            "props": {
              "type": "submit",
              "text": "Submit",
              "onClick": "runValidation()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-accordion",
    "children": [
      {
        "type": "column",
        "id": "c-accordion",
        "children": [
          {
            "type": "Accordion",
            "id": "faq",
            "props": {
              "defaultActiveKey": "shipping",
              "alwaysOpen": true,
              "onSelect": "panelChanged()"
            },
            "items": [
              {
                "key": "shipping",
                "title": "How long does shipping take?",
                "children": [
                  {
                    "type": "P",
                    "id": "a1",
                    "props": {
                      "text": "Orders ship within 2 business days."
                    }
                  }
                ]
              },
              {
                "key": "returns",
                "title": "Can I return an item?",
                "children": [
                  {
                    "type": "P",
                    "id": "a2",
                    "props": {
                      "text": "Yes, within 30 days."
                    }
                  },
                  {
                    "type": "InputField",
                    "id": "order-no",
                    "props": {
                      "name": "orderNo",
                      "label": "Order number (a field inside a panel)"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

function Example() {
  const form = useDynamicTag({
    schema,
    onSubmit: (entries) => console.log("Submitted:", entries),
    actions: (api) => ({
      tabChanged: ({ eventKey }) => console.log("Tab:", eventKey),
      panelChanged: ({ eventKey }) => console.log("Panel(s):", eventKey),
      openNotes: () => api.selectTab("profile-tabs", "notes"),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
