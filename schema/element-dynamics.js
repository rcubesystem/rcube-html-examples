// Change elements at runtime — Change text, colors and classes, or hide, show and remove any element by its id.
// Live example and explanation: https://rcube-html.com/element-dynamics
// Group: Text & layout
//
// Covers:
//   - Change any node by its id
//
// Form fields (name — type, label):
//   - nickname — InputField "Nickname (id: target-field)"
//
// Actions written here: changeText, colorText, styleBox, changeField, toggleText, removeBox, restoreBox,
//    resetAll
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/element-dynamics";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
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

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // changeText: run by ButtonField "b1" (onClick)
  changeText: () => api.setNodeProps("target-title", { text: "New title — " + new Date().toLocaleTimeString() }),
  // colorText: run by ButtonField "b2" (onClick)
  colorText: () => api.setNodeProps("target-text", { style: { color: "#d03b3b", fontWeight: 600 } }),
  // styleBox: run by ButtonField "b3" (onClick)
  styleBox: () => api.setNodeProps("target-box", { className: "rc-border rc-border-primary rc-border-2 rc-rounded rc-p-3 rc-mb-3 rc-bg-primary-subtle rc-shadow" }),
  // changeField: run by ButtonField "b4" (onClick)
  changeField: () => api.setNodeProps("target-field", { label: "Nickname (locked)", disabled: true }),
  // toggleText: run by ButtonField "b5" (onClick)
  toggleText: () => api.toggleNode("target-text"),
  // removeBox: run by ButtonField "b6" (onClick)
  removeBox: () => api.removeNode("target-box"),
  // restoreBox: run by ButtonField "b7" (onClick)
  restoreBox: () => api.restoreNode("target-box"),
  // resetAll: run by ButtonField "b8" (onClick)
  resetAll: () => api.resetNodes(),
});
