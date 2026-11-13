// Conditional fields — Show a field only when another field has a certain value.
// Live example and explanation: https://rcube-html.com/conditional-fields
// Group: Form fields
//
// Covers:
//   - visibleWhen
//
// Form fields (name — type, label):
//   - contactBy — RadioGroupField "How should we contact you?" (required)
//   - email — InputField "Email" (required)
//   - phone — InputField "Phone" (required)
//   - bestTime — SelectField "Best time to call"
//   - address — TextareaField "Postal address" (required)
//   - extras — CheckboxGroupField "Extras"
//   - offerType — SelectField "Offers about" (required)
//
// No actions of its own.
// Built-in actions it uses: runValidation()
//
// Use it in a client component ("use client"):
//   import { schema } from "<path>/schema/conditional-fields";
//   const form = useDynamicTag({ schema });
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
        "id": "c-contact",
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "RadioGroupField",
            "id": "contact-by",
            "props": {
              "name": "contactBy",
              "label": "How should we contact you?",
              "required": true,
              "options": [
                "Email",
                "Phone",
                "Post"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-email",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Email"
        },
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
              "required": true
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-phone",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Phone"
        },
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "phone",
            "props": {
              "type": "tel",
              "name": "phone",
              "label": "Phone",
              "required": true,
              "mask": "(###) ###-####"
            }
          },
          {
            "type": "SelectField",
            "id": "best-time",
            "props": {
              "name": "bestTime",
              "label": "Best time to call",
              "options": [
                "Morning",
                "Afternoon",
                "Evening"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-address",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Post"
        },
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "TextareaField",
            "id": "address",
            "props": {
              "name": "address",
              "label": "Postal address",
              "rows": 2,
              "required": true
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-2",
    "children": [
      {
        "type": "column",
        "id": "c-extras",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "CheckboxGroupField",
            "id": "extras",
            "props": {
              "name": "extras",
              "label": "Extras",
              "options": [
                "Newsletter",
                "Special offers"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-offer",
        "visibleWhen": {
          "field": "extras",
          "includesAny": [
            "Special offers"
          ]
        },
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "offer-type",
            "props": {
              "name": "offerType",
              "label": "Offers about",
              "required": true,
              "options": [
                "Books",
                "Music",
                "Travel"
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
          "className": "rc-d-flex rc-justify-content-end"
        },
        "children": [
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
