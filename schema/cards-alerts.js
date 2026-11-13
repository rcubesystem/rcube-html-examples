// Cards, alerts, tooltips, popovers — Boxes and messages that hold other elements, including form fields.
// Live example and explanation: https://rcube-html.com/cards-alerts
// Group: Containers
//
// Covers:
//   - Containers hold other nodes
//
// Form fields (name — type, label):
//   - cardEmail — InputField "Email"
//
// Actions written here: alertClosed, showAlert
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/cards-alerts";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-1",
    "props": {
      "className": "rc-g-3"
    },
    "children": [
      {
        "type": "column",
        "id": "c-card",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "Card",
            "id": "profile-card",
            "props": {
              "header": "Profile",
              "title": "Jane Doe",
              "footer": "Last login: today"
            },
            "children": [
              {
                "type": "P",
                "id": "card-text",
                "props": {
                  "text": "Cards can hold any nodes, including fields:"
                }
              },
              {
                "type": "InputField",
                "id": "card-email",
                "props": {
                  "type": "email",
                  "name": "cardEmail",
                  "label": "Email"
                }
              }
            ]
          }
        ]
      },
      {
        "type": "column",
        "id": "c-alerts",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "Alert",
            "id": "notice",
            "props": {
              "variant": "warning",
              "heading": "Heads up!",
              "text": "Close me with ×, then press \"Show alert again\".",
              "dismissible": true,
              "onClose": "alertClosed()"
            }
          },
          {
            "type": "Alert",
            "id": "info",
            "props": {
              "variant": "info",
              "text": "A plain info alert."
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-2",
    "props": {
      "className": "rc-mt-3"
    },
    "children": [
      {
        "type": "column",
        "id": "c-overlays",
        "props": {
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-align-items-start"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "show-alert",
            "props": {
              "text": "Show alert again",
              "onClick": "showAlert()"
            }
          },
          {
            "type": "Tooltip",
            "id": "tip",
            "props": {
              "text": "I'm a tooltip",
              "placement": "top"
            },
            "children": [
              {
                "type": "ButtonField",
                "id": "tip-btn",
                "props": {
                  "text": "Hover me (tooltip)",
                  "variant": "outline-secondary"
                }
              }
            ]
          },
          {
            "type": "Popover",
            "id": "pop",
            "props": {
              "title": "Popover",
              "text": "Click outside to close.",
              "placement": "bottom",
              "trigger": "click"
            },
            "children": [
              {
                "type": "ButtonField",
                "id": "pop-btn",
                "props": {
                  "text": "Click me (popover)",
                  "variant": "outline-secondary"
                }
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
  // alertClosed: run by Alert "notice" (onClose)
  alertClosed: () => console.log("The alert was closed"),
  // showAlert: run by ButtonField "show-alert" (onClick)
  showAlert: () => api.showNode("notice"),
});
