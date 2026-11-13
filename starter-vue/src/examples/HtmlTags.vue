<!-- Text & HTML tags — https://rcube-html.com/html-tags -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

// Page state kept outside the actions (they are re-created on every render)
const state = { progress: 40 };

const schema = [
  {
    "type": "row",
    "id": "row-text",
    "props": {
      "className": "rc-mb-2"
    },
    "children": [
      {
        "type": "column",
        "id": "col-text",
        "props": {
          "className": "rc-col-12 rc-col-lg-6"
        },
        "children": [
          {
            "type": "H3",
            "id": "heading",
            "props": {
              "text": "H3 heading"
            }
          },
          {
            "type": "P",
            "id": "para",
            "props": {
              "text": "A paragraph (P) of body text."
            }
          },
          {
            "type": "Text",
            "id": "custom-tag",
            "props": {
              "tag": "h6",
              "text": "Text with tag \"h6\"",
              "className": "rc-text-primary"
            }
          },
          {
            "type": "SPAN",
            "id": "span",
            "props": {
              "text": "SPAN · "
            }
          },
          {
            "type": "STRONG",
            "id": "strong",
            "props": {
              "text": "STRONG · "
            }
          },
          {
            "type": "EM",
            "id": "em",
            "props": {
              "text": "EM · "
            }
          },
          {
            "type": "SMALL",
            "id": "small",
            "props": {
              "text": "SMALL"
            }
          },
          {
            "type": "BLOCKQUOTE",
            "id": "quote",
            "props": {
              "text": "BLOCKQUOTE — a quoted passage.",
              "className": "rc-border-start rc-border-4 rc-ps-3 rc-my-3 rc-text-body-secondary"
            }
          },
          {
            "type": "A",
            "id": "link",
            "props": {
              "text": "A — link to getbootstrap.com",
              "href": "https://getbootstrap.com",
              "target": "_blank"
            }
          },
          {
            "type": "LIST",
            "id": "list",
            "props": {
              "className": "rc-mt-2",
              "items": [
                "LIST item one",
                "LIST item two",
                {
                  "text": "Items can also be { text } objects"
                }
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-media",
        "props": {
          "className": "rc-col-12 rc-col-lg-6"
        },
        "children": [
          {
            "type": "IMG",
            "id": "image",
            "props": {
              "src": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320%22%20height%3D%22120%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20rx%3D%2212%22%20fill%3D%22%232a78d6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23fff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EIMG%20320%20%C3%97%20120%3C%2Ftext%3E%3C%2Fsvg%3E",
              "alt": "Sample image",
              "style": {
                "maxWidth": 320
              }
            }
          },
          {
            "type": "DIV",
            "id": "box",
            "props": {
              "className": "rc-border rc-rounded rc-p-2 rc-my-3 rc-bg-body-tertiary",
              "children": "DIV — a box for any text"
            }
          },
          {
            "type": "Badge",
            "id": "badge-new",
            "props": {
              "text": "New",
              "bg": "success",
              "className": "rc-me-1"
            }
          },
          {
            "type": "Badge",
            "id": "badge-beta",
            "props": {
              "text": "Beta",
              "bg": "warning",
              "textColor": "dark",
              "pill": true,
              "className": "rc-me-1"
            }
          },
          {
            "type": "Badge",
            "id": "badge-count",
            "props": {
              "text": "3 unread",
              "bg": "danger",
              "pill": true
            }
          },
          {
            "type": "Breadcrumb",
            "id": "crumbs",
            "props": {
              "className": "rc-mt-3",
              "items": [
                {
                  "text": "Home",
                  "href": "#"
                },
                {
                  "text": "Library",
                  "href": "#"
                },
                {
                  "text": "Data",
                  "active": true
                }
              ]
            }
          },
          {
            "type": "ProgressBar",
            "id": "progress",
            "props": {
              "now": 40,
              "showLabel": true,
              "striped": true,
              "className": "rc-mb-3"
            }
          },
          {
            "type": "Spinner",
            "id": "spinner",
            "props": {
              "animation": "border",
              "variant": "primary",
              "size": "sm",
              "text": "Loading..."
            }
          },
          {
            "type": "ListGroup",
            "id": "list-group",
            "props": {
              "className": "rc-mt-3",
              "items": [
                {
                  "text": "Inbox",
                  "badge": 14,
                  "active": true
                },
                {
                  "text": "Drafts",
                  "badge": 2
                },
                {
                  "text": "Archived",
                  "disabled": true
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "col-buttons",
        "props": {
          "className": "rc-d-flex rc-flex-wrap rc-gap-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "btn-heading",
            "props": {
              "text": "Change heading",
              "onClick": "changeHeading()"
            }
          },
          {
            "type": "ButtonField",
            "id": "btn-progress",
            "props": {
              "text": "+10% progress",
              "onClick": "addProgress()"
            }
          },
          {
            "type": "ButtonField",
            "id": "btn-badge",
            "props": {
              "text": "Recolor badge",
              "onClick": "recolorBadge()"
            }
          }
        ]
      }
    ]
  }
];

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  changeHeading: () => api.setNodeProps("heading", { text: "Heading changed at " + new Date().toLocaleTimeString() }),
  addProgress: () => {
    state.progress = state.progress >= 100 ? 0 : state.progress + 10;
    api.setNodeProps("progress", { now: state.progress, variant: state.progress >= 80 ? "success" : undefined });
  },
  recolorBadge: () => api.setNodeProps("badge-new", { bg: ["primary", "danger", "dark", "info"][Math.floor(Math.random() * 4)] }),
});
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" />
</template>
