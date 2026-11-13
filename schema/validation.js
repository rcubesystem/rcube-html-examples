// Validation & submit — Required fields, patterns, ranges, dates and custom messages; submit only when valid.
// Live example and explanation: https://rcube-html.com/validation
// Group: Form fields
//
// Covers:
//   - Rules live in the schema
//
// Form fields (name — type, label):
//   - name — InputField "Name" (required)
//   - email — InputField "Email" (required, pattern)
//   - age — InputField "Age" (required, min 18, max 99)
//   - shoeSize — InputField "Shoe size"
//   - birthDate — InputField "Date of birth" (required)
//   - zip — InputField "ZIP code" (pattern)
//   - topics — CheckboxGroupField "Topics" (required)
//   - terms — InputField "I accept the terms" (required)
//
// Actions written here: checkOnly
// Built-in actions it uses: clearForm(), runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/validation";
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
        "id": "c-name",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "name",
            "props": {
              "name": "name",
              "label": "Name",
              "required": true,
              "requiredMessage": "Please tell us your name."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-email",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "email",
            "props": {
              "type": "email",
              "name": "email",
              "label": "Email",
              "required": true,
              "pattern": "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}",
              "patternMessage": "That doesn't look like an email address."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-age",
        "props": {
          "className": "rc-col-6 rc-col-md-3"
        },
        "children": [
          {
            "type": "InputField",
            "id": "age",
            "props": {
              "type": "number",
              "name": "age",
              "label": "Age",
              "required": true,
              "min": 18,
              "max": 99,
              "rangeMessage": "Age must be 18 to 99."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-shoe",
        "props": {
          "className": "rc-col-6 rc-col-md-3"
        },
        "children": [
          {
            "type": "InputField",
            "id": "shoe",
            "props": {
              "type": "number",
              "name": "shoeSize",
              "label": "Shoe size",
              "allowedValues": [
                7,
                8,
                9,
                10,
                11
              ],
              "allowedValuesMessage": "We stock sizes 7–11."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-birth",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "birth",
            "props": {
              "type": "date",
              "name": "birthDate",
              "label": "Date of birth",
              "required": true,
              "beforeToday": true,
              "maxYearsAgo": 120
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-zip",
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
              "pattern": "\\d{5}",
              "patternMessage": "Five digits, please."
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-topics",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "CheckboxGroupField",
            "id": "topics",
            "props": {
              "name": "topics",
              "label": "Topics",
              "required": true,
              "options": [
                "News",
                "Tips",
                "Offers"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-terms",
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "InputField",
            "id": "terms",
            "props": {
              "type": "checkbox",
              "name": "terms",
              "label": "I accept the terms",
              "required": true
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
          "className": "rc-d-flex rc-justify-content-end rc-gap-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "clear",
            "props": {
              "text": "Clear",
              "onClick": "clearForm()"
            }
          },
          {
            "type": "ButtonField",
            "id": "check",
            "props": {
              "text": "Check without submitting",
              "variant": "outline-secondary",
              "onClick": "checkOnly()"
            }
          },
          {
            "type": "ButtonField",
            "id": "submit",
            "props": {
              "type": "submit",
              "text": "Submit",
              "onClick": "runValidation()"
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
  // runValidation() returns the entries when valid (and calls onSubmit), undefined when not
  // checkOnly: run by ButtonField "check" (onClick)
  checkOnly: () => {
    const entries = api.runValidation();
    window.alert(entries ? "All good!" : "Please fix the marked fields.");
  },
});
