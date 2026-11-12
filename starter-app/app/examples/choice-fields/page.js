// Radios, checkboxes, slider, textarea — https://rcube-html.com/choice-fields
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
  {
    "type": "row",
    "id": "row-1",
    "children": [
      {
        "type": "column",
        "id": "c-radio",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "RadioGroupField",
            "id": "delivery",
            "props": {
              "name": "delivery",
              "label": "Delivery",
              "options": [
                "Standard",
                "Express",
                "Pick up"
              ],
              "onChange": "choiceChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-checks",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "CheckboxGroupField",
            "id": "toppings",
            "props": {
              "name": "toppings",
              "label": "Toppings",
              "options": [
                "Cheese",
                "Olives",
                "Peppers",
                "Onions"
              ],
              "onChange": "choiceChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-radio-stacked",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "RadioGroupField",
            "id": "size",
            "props": {
              "name": "size",
              "label": "Size (stacked)",
              "inline": false,
              "options": [
                {
                  "label": "Small (8\")",
                  "value": "S"
                },
                {
                  "label": "Medium (12\")",
                  "value": "M"
                },
                {
                  "label": "Large (16\")",
                  "value": "L"
                }
              ],
              "onChange": "choiceChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-slider",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "SliderField",
            "id": "spice",
            "props": {
              "name": "spice",
              "label": "Spice level",
              "min": 0,
              "max": 10,
              "step": 1,
              "defaultValue": 3,
              "valueSuffix": " / 10",
              "onChange": "choiceChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-notes",
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "TextareaField",
            "id": "notes",
            "props": {
              "name": "notes",
              "label": "Notes",
              "rows": 3,
              "placeholder": "Anything else?",
              "onBlur": "choiceChanged()"
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
              "className": "rc-alert rc-alert-secondary rc-py-2 rc-small rc-mb-0",
              "text": "Choose something."
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
      choiceChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
