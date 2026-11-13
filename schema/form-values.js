// Read & set values — Fill the form from code, read what the user typed, reset or clear it.
// Live example and explanation: https://rcube-html.com/form-values
// Group: Form fields
//
// Covers:
//   - Set values from code
//   - Read values
//
// Form fields (name — type, label):
//   - firstName — InputField "First name"
//   - lastName — InputField "Last name"
//   - plan — SelectField "Plan"
//   - newsletter — InputField "Newsletter"
//
// Actions written here: fillAll, setPlan, readData, readEntries
// Built-in actions it uses: resetForm(), clearForm()
//
// Use it in a client component ("use client"):
//   import { schema, options, actions } from "<path>/schema/form-values";
//   const form = useDynamicTag({ schema, ...options, actions });
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
        "id": "c-first",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "InputField",
            "id": "first",
            "props": {
              "name": "firstName",
              "label": "First name"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-last",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "InputField",
            "id": "last",
            "props": {
              "name": "lastName",
              "label": "Last name"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-plan",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "plan",
            "props": {
              "name": "plan",
              "label": "Plan",
              "options": [
                "Free",
                "Pro",
                "Team"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-news",
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "InputField",
            "id": "newsletter",
            "props": {
              "type": "checkbox",
              "name": "newsletter",
              "label": "Newsletter"
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
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-3"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "fill",
            "props": {
              "text": "setFormData",
              "onClick": "fillAll()"
            }
          },
          {
            "type": "ButtonField",
            "id": "one",
            "props": {
              "text": "setFieldValue (plan)",
              "onClick": "setPlan()"
            }
          },
          {
            "type": "ButtonField",
            "id": "read",
            "props": {
              "text": "getFormData",
              "variant": "outline-primary",
              "onClick": "readData()"
            }
          },
          {
            "type": "ButtonField",
            "id": "entries",
            "props": {
              "text": "getFormEntries",
              "variant": "outline-primary",
              "onClick": "readEntries()"
            }
          },
          {
            "type": "ButtonField",
            "id": "reset",
            "props": {
              "text": "resetForm",
              "variant": "outline-secondary",
              "onClick": "resetForm()"
            }
          },
          {
            "type": "ButtonField",
            "id": "clear",
            "props": {
              "text": "clearForm",
              "variant": "outline-danger",
              "onClick": "clearForm()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-output",
    "children": [
      {
        "type": "column",
        "id": "col-output",
        "children": [
          {
            "type": "DIV",
            "id": "output",
            "props": {
              "className": "rc-border rc-rounded rc-p-2 rc-bg-body-tertiary rc-font-monospace rc-small",
              "children": "Values appear here."
            }
          }
        ]
      }
    ]
  }
];

// More useDynamicTag options (spread them in: useDynamicTag({ schema, ...options, actions })).
export const options = {
  data: { firstName: "Jane", plan: "Pro", newsletter: true },   // starting values (resetForm returns here)
};

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // fillAll: run by ButtonField "fill" (onClick)
  fillAll: () => api.setFormData({ firstName: "John", lastName: "Smith", plan: "Team", newsletter: false }),
  // setPlan: run by ButtonField "one" (onClick)
  setPlan: () => api.setFieldValue("plan", "Free"),
  // readData: run by ButtonField "read" (onClick)
  readData: () => api.setNodeProps("output", { children: "getFormData() = " + JSON.stringify(api.getFormData()) }),
  // readEntries: run by ButtonField "entries" (onClick)
  readEntries: () => api.setNodeProps("output", { children: "getFormEntries() = " + JSON.stringify(api.getFormEntries()) }),
});
