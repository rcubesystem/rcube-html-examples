// Tabs & accordion — Split a long form into tabs or collapsible panels; errors open the right tab.
// Live example and explanation: https://rcube-html.com/tabs-accordion
// Group: Containers
//
// Covers:
//   - Tabs and Accordion
//
// Form fields (name — type, label):
//   - name — InputField "Name" (required)
//   - city — InputField "City (required — leave it empty and press Submit)" (required)
//   - notes — TextareaField "Notes"
//   - orderNo — InputField "Order number (a field inside a panel)"
//
// Actions written here: tabChanged, panelChanged, openNotes
// Built-in actions it uses: selectTab() (from the library or the page), runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/tabs-accordion";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
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

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // tabChanged: run by Tabs "profile-tabs" (onSelect)
  tabChanged: ({ eventKey }) => console.log("Tab:", eventKey),
  // panelChanged: run by Accordion "faq" (onSelect)
  panelChanged: ({ eventKey }) => console.log("Panel(s):", eventKey),
  // openNotes: run by ButtonField "go-notes" (onClick)
  openNotes: () => api.selectTab("profile-tabs", "notes"),
});
