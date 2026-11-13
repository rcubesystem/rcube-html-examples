// Events & actions — Name an action in the schema (onChange, onClick, ...) and write it in your page.
// Live example and explanation: https://rcube-html.com/events-actions
// Group: Getting started
//
// Covers:
//   - Name an action in the schema
//   - What an action receives
//   - Built-in actions
//
// Form fields (name — type, label):
//   - zip — InputField "ZIP code"
//   - color — SelectField "Favorite color"
//
// Actions written here: zipChanged, zipBlurred, zipFocused, colorChanged, fillDemo
// Built-in actions it uses: clearForm()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/events-actions";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-fields",
    "children": [
      {
        "type": "column",
        "id": "col-zip",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "zip",
            "props": {
              "name": "zip",
              "label": "ZIP code",
              "mask": "#####",
              "placeholder": "5 digits",
              "onChange": "zipChanged()",
              "onBlur": "zipBlurred()",
              "onFocus": "zipFocused()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-color",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "color",
            "props": {
              "name": "color",
              "label": "Favorite color",
              "options": [
                "Red",
                "Green",
                "Blue"
              ],
              "onChange": "colorChanged()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-result",
    "children": [
      {
        "type": "column",
        "id": "col-result",
        "children": [
          {
            "type": "P",
            "id": "result",
            "props": {
              "className": "rc-alert rc-alert-info rc-py-2",
              "text": "Type a ZIP code or pick a color."
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
          "className": "rc-d-flex rc-gap-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "fill",
            "props": {
              "text": "Fill with demo values",
              "onClick": "fillDemo()"
            }
          },
          {
            "type": "ButtonField",
            "id": "clear",
            "props": {
              "text": "Clear",
              "onClick": "clearForm()"
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
  // zipChanged: run by InputField "zip" (onChange)
  zipChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " is now " + value }),
  // zipBlurred: run by InputField "zip" (onBlur)
  zipBlurred: (event, { value }) => api.setNodeProps("result", { text: "Left the ZIP field with " + (value || "nothing") }),
  // zipFocused: run by InputField "zip" (onFocus)
  zipFocused: () => api.setNodeProps("result", { text: "Typing a ZIP code..." }),
  // colorChanged: run by SelectField "color" (onChange)
  colorChanged: (event, { value }) => api.setNodeProps("result", { text: "Color: " + value, style: { color: value.toLowerCase() } }),
  // fillDemo: run by ButtonField "fill" (onClick)
  fillDemo: () => api.setFormData({ zip: "90210", color: "Blue" }),
});
