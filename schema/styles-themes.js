// Styles & themes — The stylesheet, your colours as CSS variables, a CMS theme, dark mode, and the grid's span
//    and gap.
// Live example and explanation: https://rcube-html.com/styles-themes
// Group: Getting started
//
// Covers:
//   - Its own stylesheet
//   - Your colours: CSS variables
//   - In a CMS
//   - Dark
//   - Layout: span and gap
//   - The example
//
// Form fields (name — type, label):
//   - look — SelectField "Look"
//   - name — InputField "Name" (required)
//   - plan — SelectField "Plan"
//   - agree — InputField "Send me the newsletter"
//
// Actions written here: applyLook
// Built-in actions it uses: runValidation(), clearForm()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/styles-themes";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-pick",
    "props": {
      "gap": 3,
      "className": "rc-mb-3 rc-align-items-end"
    },
    "children": [
      {
        "type": "column",
        "id": "c-pick",
        "props": {
          "span": {
            "xs": 12,
            "md": 6
          }
        },
        "children": [
          {
            "type": "SelectField",
            "id": "look",
            "props": {
              "name": "look",
              "label": "Look",
              "className": "rc-mb-0",
              "placeholder": "Default (this site's Bootstrap colours)",
              "options": [
                {
                  "label": "CMS theme (blue, square corners)",
                  "value": "cms"
                },
                {
                  "label": "Teal, round corners",
                  "value": "teal"
                },
                {
                  "label": "Dark",
                  "value": "dark"
                }
              ],
              "onChange": "applyLook()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-pick-note",
        "props": {
          "span": {
            "xs": 12,
            "md": 6
          }
        },
        "children": [
          {
            "type": "P",
            "id": "look-note",
            "props": {
              "text": "Everything in the box below is rcube-html.",
              "className": "rc-mb-0 rc-text-muted rc-small"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Card",
    "id": "themed",
    "props": {
      "className": "theme-demo"
    },
    "children": [
      {
        "type": "row",
        "id": "row-form",
        "props": {
          "gap": 3
        },
        "children": [
          {
            "type": "column",
            "id": "c-left",
            "props": {
              "span": {
                "xs": 12,
                "md": 6
              }
            },
            "children": [
              {
                "type": "InputField",
                "id": "name",
                "props": {
                  "name": "name",
                  "label": "Name",
                  "required": true,
                  "placeholder": "Jane Doe",
                  "hint": "Press Check to see an error."
                }
              },
              {
                "type": "SelectField",
                "id": "plan",
                "props": {
                  "name": "plan",
                  "label": "Plan",
                  "options": [
                    "Basic",
                    "Standard",
                    "Premium"
                  ]
                }
              },
              {
                "type": "InputField",
                "id": "agree",
                "props": {
                  "name": "agree",
                  "type": "checkbox",
                  "label": "Send me the newsletter"
                }
              }
            ]
          },
          {
            "type": "column",
            "id": "c-right",
            "props": {
              "span": {
                "xs": 12,
                "md": 6
              }
            },
            "children": [
              {
                "type": "Alert",
                "id": "note",
                "props": {
                  "variant": "info",
                  "text": "An info alert. Its colours come from the theme."
                }
              },
              {
                "type": "column",
                "id": "badges",
                "props": {
                  "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-3"
                },
                "children": [
                  {
                    "type": "Badge",
                    "id": "b1",
                    "props": {
                      "text": "Paid",
                      "bg": "success"
                    }
                  },
                  {
                    "type": "Badge",
                    "id": "b2",
                    "props": {
                      "text": "Due",
                      "bg": "warning"
                    }
                  },
                  {
                    "type": "Badge",
                    "id": "b3",
                    "props": {
                      "text": "Overdue",
                      "bg": "danger"
                    }
                  },
                  {
                    "type": "Badge",
                    "id": "b4",
                    "props": {
                      "text": "3 new",
                      "bg": "primary",
                      "pill": true
                    }
                  }
                ]
              },
              {
                "type": "ProgressBar",
                "id": "pb",
                "props": {
                  "now": 65,
                  "showLabel": true,
                  "className": "rc-mb-3"
                }
              },
              {
                "type": "column",
                "id": "btns",
                "props": {
                  "className": "rc-d-flex rc-flex-wrap rc-gap-2"
                },
                "children": [
                  {
                    "type": "ButtonField",
                    "id": "check",
                    "props": {
                      "text": "Check",
                      "variant": "primary",
                      "onClick": "runValidation()"
                    }
                  },
                  {
                    "type": "ButtonField",
                    "id": "clear",
                    "props": {
                      "text": "Clear",
                      "variant": "outline-secondary",
                      "onClick": "clearForm()"
                    }
                  },
                  {
                    "type": "ButtonField",
                    "id": "del",
                    "props": {
                      "text": "Delete",
                      "variant": "outline-danger"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "DataTable",
        "id": "orders",
        "props": {
          "title": "Orders",
          "rowKey": "id",
          "pageSize": 2,
          "searchable": true,
          "columnToggle": true,
          "selectable": true,
          "className": "rc-mt-3 rc-mb-0",
          "columns": [
            {
              "key": "name",
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
          "rows": [
            {
              "id": 1,
              "name": "Aisha Khan",
              "status": "Paid",
              "amount": 120.5
            },
            {
              "id": 2,
              "name": "Ben Lee",
              "status": "Due",
              "amount": 80
            },
            {
              "id": 3,
              "name": "Carla Garcia",
              "status": "Overdue",
              "amount": 45.25
            }
          ]
        }
      }
    ]
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // The variables of each look (on your site: once, on :root)
  // applyLook: run by SelectField "look" (onChange)
  applyLook: (event, { value }) => {
    const box = document.querySelector(".theme-demo");
    const looks = {
      cms: { "--rc-primary": "#0b5fff", "--rc-primary-rgb": "11, 95, 255", "--rc-success": "#287d3c", "--rc-success-rgb": "40, 125, 60",
        "--rc-warning": "#b95000", "--rc-warning-rgb": "185, 80, 0", "--rc-danger": "#da1414", "--rc-danger-rgb": "218, 20, 20",
        "--rc-info": "#2e5aac", "--rc-info-rgb": "46, 90, 172", "--rc-info-bg-subtle": "#eef2fa", "--rc-info-text": "#2e5aac", "--rc-info-border-subtle": "#89a7e0",
        "--rc-body-color": "#272833", "--rc-border-color": "#e7e7ed", "--rc-border-radius": ".25rem", "--rc-border-radius-sm": ".2rem",
        "--rc-link-color": "#0b5fff", "--rc-input-focus-border-color": "#80acff", "--rc-focus-ring": "0 0 0 .2rem rgba(11, 95, 255, .25)" },
      teal: { "--rc-primary": "#0f766e", "--rc-primary-rgb": "15, 118, 110", "--rc-link-color": "#0f766e",
        "--rc-border-radius": ".75rem", "--rc-border-radius-sm": ".5rem", "--rc-border-radius-lg": "1rem",
        "--rc-input-focus-border-color": "#5eb8b0", "--rc-focus-ring": "0 0 0 .25rem rgba(15, 118, 110, .2)" },
    };
    // back to the page's own colours, then the chosen look
    for (const name of [...box.style].filter((p) => p.startsWith("--rc-"))) box.style.removeProperty(name);
    box.removeAttribute("data-bs-theme");
    if (value === "dark") box.setAttribute("data-bs-theme", "dark"); // a page without Bootstrap: data-rc-theme="dark"
    for (const [name, v] of Object.entries(looks[value] || {})) box.style.setProperty(name, v);
  },
});
