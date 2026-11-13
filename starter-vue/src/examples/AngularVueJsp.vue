<!-- Angular, Vue, JSP & plain HTML — https://rcube-html.com/angular-vue-jsp -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

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

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  // Save: validate, then show what rcube-submit / (submitted) / @submit would carry
  save: () => {
    const entries = api.runValidation();     // nothing when a field isn't valid
    if (!entries) return;
    api.setNodeProps("result", { variant: "success", text: "event.detail.values = " + JSON.stringify(entries[0]) });
  },
});
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" />
</template>
