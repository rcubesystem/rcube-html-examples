// Angular, Vue, JSP & plain HTML — The same schema outside React: the <rcube-form> element in Angular, Vue, JSP
//    and server pages, and plain JavaScript.
// Live example and explanation: https://rcube-html.com/angular-vue-jsp
// Group: Getting started
//
// Covers:
//   - One schema, every kind of page
//   - Get it: one package for every app
//   - Plain HTML and server pages
//   - JSP
//   - Angular
//   - Vue 3
//   - Any JavaScript: mount()
//   - Node servers: the form drawn first
//   - Actions and events
//   - The example
//
// Form fields (name — type, label):
//   - email — InputField "Email" (required)
//   - fullName — InputField "Full name" (required)
//   - plan — SelectField "Plan" (required)
//   - terms — InputField "I accept the terms" (required)
//
// Actions written here: save
// Built-in actions it uses: clearForm()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/angular-vue-jsp";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "props": {
      "gap": 3
    },
    "children": [
      {
        "type": "column",
        "props": {
          "span": {
            "xs": 12,
            "md": 6
          }
        },
        "children": [
          {
            "type": "InputField",
            "props": {
              "name": "email",
              "label": "Email",
              "type": "email",
              "required": true,
              "placeholder": "you@example.com"
            }
          },
          {
            "type": "InputField",
            "props": {
              "name": "fullName",
              "label": "Full name",
              "required": true
            }
          }
        ]
      },
      {
        "type": "column",
        "props": {
          "span": {
            "xs": 12,
            "md": 6
          }
        },
        "children": [
          {
            "type": "SelectField",
            "props": {
              "name": "plan",
              "label": "Plan",
              "options": [
                "Basic",
                "Standard",
                "Premium"
              ],
              "required": true
            }
          },
          {
            "type": "InputField",
            "props": {
              "name": "terms",
              "type": "checkbox",
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
    "props": {
      "className": "rc-mt-2"
    },
    "children": {
      "type": "column",
      "props": {
        "className": "rc-d-flex rc-gap-2"
      },
      "children": [
        {
          "type": "ButtonField",
          "props": {
            "text": "Save",
            "variant": "primary",
            "onClick": "save()"
          }
        },
        {
          "type": "ButtonField",
          "props": {
            "text": "Clear",
            "variant": "outline-secondary",
            "onClick": "clearForm()"
          }
        }
      ]
    }
  },
  {
    "type": "Alert",
    "id": "result",
    "props": {
      "variant": "secondary",
      "text": "Press Save: what each app gets appears here.",
      "className": "rc-mt-3 rc-mb-0"
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // Save: validate, then show what rcube-submit / (submitted) / @submit would carry
  // save: run by ButtonField "row2-column1-buttonfield1" (onClick)
  save: () => {
    const entries = api.runValidation();     // nothing when a field isn't valid
    if (!entries) return;
    api.setNodeProps("result", { variant: "success", text: "event.detail.values = " + JSON.stringify(entries[0]) });
  },
});
