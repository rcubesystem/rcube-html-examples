// Angular, Vue, JSP & plain HTML — https://rcube-html.com/angular-vue-jsp
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

const schema = [
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

function Example() {
  const form = useDynamicTag({
    schema,
    actions: (api) => ({
      // Save: validate, then show what rcube-submit / (submitted) / @submit would carry
      save: () => {
        const entries = api.runValidation();     // nothing when a field isn't valid
        if (!entries) return;
        api.setNodeProps("result", { variant: "success", text: "event.detail.values = " + JSON.stringify(entries[0]) });
      },
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
