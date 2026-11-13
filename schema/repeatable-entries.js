// Repeatable entries — Let the user add the same group of fields several times (e.g. several contacts).
// Live example and explanation: https://rcube-html.com/repeatable-entries
// Group: Form fields
//
// Covers:
//   - repeatable: true
//
// Form fields (name — type, label):
//   - name — InputField "Contact name" (required)
//   - email — InputField "Email" (required)
//
// No actions of its own.
// Built-in actions it uses: addCopy() (from the library or the page), runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, buttons, options } from "<path>/schema/repeatable-entries";
//   const form = useDynamicTag({ schema, buttons, ...options });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-contact",
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
              "label": "Contact name",
              "required": true
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
              "required": true
            }
          }
        ]
      }
    ]
  }
];

// Buttons drawn once, after the repeatable entries.
export const buttons = [
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "col-buttons",
        "props": {
          "className": "rc-d-flex rc-justify-content-between rc-mt-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "add",
            "props": {
              "text": "+ Add another contact",
              "variant": "outline-primary",
              "onClick": "addCopy()"
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

// More useDynamicTag options (spread them in: useDynamicTag({ schema, ...options, actions })).
export const options = {
  repeatable: true,
};
