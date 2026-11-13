// Radios, checkboxes, slider, textarea — Pick one, pick many, slide to a number or type a longer text.
// Live example and explanation: https://rcube-html.com/choice-fields
// Group: Form fields
//
// Covers:
//   - One choice, many choices, a number, a long text
//
// Form fields (name — type, label):
//   - delivery — RadioGroupField "Delivery"
//   - toppings — CheckboxGroupField "Toppings"
//   - size — RadioGroupField "Size (stacked)"
//   - spice — SliderField "Spice level" (min 0, max 10)
//   - notes — TextareaField "Notes"
//
// Actions written here: choiceChanged
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/choice-fields";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
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

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // choiceChanged: run by RadioGroupField "delivery" (onChange); CheckboxGroupField "toppings" (onChange); RadioGroupField "size" (onChange); SliderField "spice" (onChange); TextareaField "notes" (onBlur)
  choiceChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),
});
