// Events & actions — https://rcube-html.com/events-actions
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
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

function Example() {
  const form = useDynamicTag({
    schema,
    actions: (api) => ({
      zipChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " is now " + value }),
      zipBlurred: (event, { value }) => api.setNodeProps("result", { text: "Left the ZIP field with " + (value || "nothing") }),
      zipFocused: () => api.setNodeProps("result", { text: "Typing a ZIP code..." }),
      colorChanged: (event, { value }) => api.setNodeProps("result", { text: "Color: " + value, style: { color: value.toLowerCase() } }),
      fillDemo: () => api.setFormData({ zip: "90210", color: "Blue" }),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
