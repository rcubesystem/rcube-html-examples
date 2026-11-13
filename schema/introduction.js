// Introduction — What rcube-html is, how to install it, the starters for React, Angular, Vue, HTML and JSP, and
//    your first schema-driven form.
// Live example and explanation: https://rcube-html.com/
// Group: Getting started
//
// Covers:
//   - What is rcube-html?
//   - How to read these tutorials
//   - Run every example on your computer
//   - Way 1: with git
//   - Way 2: with npm only (no git)
//   - Way 3: make the same app yourself
//   - 1. Install
//   - Load only what you use (optional)
//   - 2. Add its stylesheet once
//   - 3. Write a schema and render it
//
// Form fields (name — type, label):
//   - firstName — InputField "First name" (required)
//   - email — InputField "Email" (required, pattern)
//
// No actions of its own.
// Built-in actions it uses: clearForm(), runValidation()
//
// Use it in a client component ("use client"):
//   import { schema } from "<path>/schema/introduction";
//   const form = useDynamicTag({ schema });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-title",
    "children": [
      {
        "type": "column",
        "id": "col-title",
        "children": [
          {
            "type": "H4",
            "id": "title",
            "props": {
              "text": "Sign up"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-fields",
    "children": [
      {
        "type": "column",
        "id": "col-name",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "first",
            "props": {
              "name": "firstName",
              "label": "First name",
              "required": true,
              "uppercase": true
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-email",
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
              "lowercase": true,
              "pattern": "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}",
              "patternMessage": "Please enter a valid email address."
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
