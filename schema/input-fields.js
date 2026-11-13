// Input fields — Text, email, password, number, date, phone with a mask, color and checkbox inputs.
// Live example and explanation: https://rcube-html.com/input-fields
// Group: Form fields
//
// Covers:
//   - InputField
//
// Form fields (name — type, label):
//   - fullName — InputField "Full name (uppercase)"
//   - email — InputField "Email (lowercase)"
//   - password — InputField "Password"
//   - phone — InputField "Phone (mask)"
//   - quantity — InputField "Quantity" (min 1, max 10)
//   - startDate — InputField "Start date"
//   - themeColor — InputField "Color"
//   - agree — InputField "I agree"
//
// Actions written here: fieldChanged
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/input-fields";
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
        "id": "c-text",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "full-name",
            "props": {
              "name": "fullName",
              "label": "Full name (uppercase)",
              "placeholder": "Jane Doe",
              "uppercase": true,
              "onChange": "fieldChanged()"
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
              "label": "Email (lowercase)",
              "lowercase": true,
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-password",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "password",
            "props": {
              "type": "password",
              "name": "password",
              "label": "Password",
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-phone",
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
              "label": "Phone (mask)",
              "mask": "(###) ###-####",
              "placeholder": "(555) 123-4567",
              "hint": "Digits only — the mask adds the rest.",
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-number",
        "props": {
          "className": "rc-col-6 rc-col-md-3"
        },
        "children": [
          {
            "type": "InputField",
            "id": "quantity",
            "props": {
              "type": "number",
              "name": "quantity",
              "label": "Quantity",
              "min": 1,
              "max": 10,
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-date",
        "props": {
          "className": "rc-col-6 rc-col-md-3"
        },
        "children": [
          {
            "type": "InputField",
            "id": "start",
            "props": {
              "type": "date",
              "name": "startDate",
              "label": "Start date",
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-color",
        "props": {
          "className": "rc-col-6 rc-col-md-3"
        },
        "children": [
          {
            "type": "InputField",
            "id": "theme",
            "props": {
              "type": "color",
              "name": "themeColor",
              "label": "Color",
              "onChange": "fieldChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-check",
        "props": {
          "className": "rc-col-6 rc-col-md-3 rc-d-flex rc-align-items-center"
        },
        "children": [
          {
            "type": "InputField",
            "id": "agree",
            "props": {
              "type": "checkbox",
              "name": "agree",
              "label": "I agree",
              "onChange": "fieldChanged()"
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
              "text": "Change any field."
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
  // fieldChanged: run by InputField "full-name" (onChange); InputField "email" (onChange); InputField "password" (onChange); InputField "phone" (onChange); InputField "quantity" (onChange); InputField "start" (onChange); InputField "theme" (onChange); InputField "agree" (onChange)
  fieldChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),
});
