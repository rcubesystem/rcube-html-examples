<!-- Change elements at runtime — https://rcube-html.com/element-dynamics -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

const schema = [
  {
    "type": "row",
    "id": "row-targets",
    "props": {
      "className": "rc-mb-3"
    },
    "children": [
      {
        "type": "column",
        "id": "col-targets",
        "children": [
          {
            "type": "H4",
            "id": "target-title",
            "props": {
              "text": "I am the title (id: target-title)"
            }
          },
          {
            "type": "P",
            "id": "target-text",
            "props": {
              "text": "I am a paragraph (id: target-text)."
            }
          },
          {
            "type": "DIV",
            "id": "target-box",
            "props": {
              "className": "rc-border rc-rounded rc-p-3 rc-mb-3",
              "children": "A box (id: target-box)"
            }
          },
          {
            "type": "InputField",
            "id": "target-field",
            "props": {
              "name": "nickname",
              "label": "Nickname (id: target-field)"
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
            "id": "b1",
            "props": {
              "text": "Change title text",
              "onClick": "changeText()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b2",
            "props": {
              "text": "Color the paragraph",
              "onClick": "colorText()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b3",
            "props": {
              "text": "Style the box",
              "onClick": "styleBox()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b4",
            "props": {
              "text": "Disable / relabel field",
              "onClick": "changeField()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b5",
            "props": {
              "text": "Toggle paragraph",
              "variant": "outline-secondary",
              "onClick": "toggleText()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b6",
            "props": {
              "text": "Remove box",
              "variant": "outline-danger",
              "onClick": "removeBox()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b7",
            "props": {
              "text": "Restore box",
              "variant": "outline-success",
              "onClick": "restoreBox()"
            }
          },
          {
            "type": "ButtonField",
            "id": "b8",
            "props": {
              "text": "Undo everything",
              "variant": "outline-dark",
              "onClick": "resetAll()"
            }
          }
        ]
      }
    ]
  }
];

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  changeText: () => api.setNodeProps("target-title", { text: "New title — " + new Date().toLocaleTimeString() }),
  colorText: () => api.setNodeProps("target-text", { style: { color: "#d03b3b", fontWeight: 600 } }),
  styleBox: () => api.setNodeProps("target-box", { className: "rc-border rc-border-primary rc-border-2 rc-rounded rc-p-3 rc-mb-3 rc-bg-primary-subtle rc-shadow" }),
  changeField: () => api.setNodeProps("target-field", { label: "Nickname (locked)", disabled: true }),
  toggleText: () => api.toggleNode("target-text"),
  removeBox: () => api.removeNode("target-box"),
  restoreBox: () => api.restoreNode("target-box"),
  resetAll: () => api.resetNodes(),
});
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" />
</template>
