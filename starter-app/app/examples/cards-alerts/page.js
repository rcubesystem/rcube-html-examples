// Cards, alerts, tooltips, popovers — https://rcube-html.com/cards-alerts
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
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

function Example() {
  const form = useDynamicTag({
    schema,
    actions: (api) => ({
      alertClosed: () => console.log("The alert was closed"),
      showAlert: () => api.showNode("notice"),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
