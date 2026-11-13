// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Read & set values — https://rcube-html.com/form-values
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";

const schema = [
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

@Component({
  selector: "app-form-values",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [data]="options.data"
    [actions]="actions"
  ></rcube-html-form>`,
})
export class FormValuesComponent {
  schema = schema;
  options = {
    data: { firstName: "Jane", plan: "Pro", newsletter: true },   // starting values (resetForm returns here)
  };
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    fillAll: () => api.setFormData({ firstName: "John", lastName: "Smith", plan: "Team", newsletter: false }),
    setPlan: () => api.setFieldValue("plan", "Free"),
    readData: () => api.setNodeProps("output", { children: "getFormData() = " + JSON.stringify(api.getFormData()) }),
    readEntries: () => api.setNodeProps("output", { children: "getFormEntries() = " + JSON.stringify(api.getFormEntries()) }),
  });
}