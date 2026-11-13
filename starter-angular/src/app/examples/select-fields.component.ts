// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Selects & dependent selects — https://rcube-html.com/select-fields
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";

const schema = [
  {
    "type": "row",
    "id": "row-1",
    "children": [
      {
        "type": "column",
        "id": "c-size",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "size",
            "props": {
              "name": "size",
              "label": "Size (strings)",
              "options": [
                "Small",
                "Medium",
                "Large"
              ],
              "onChange": "selectChanged()"
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
              "label": "Plan (label / value)",
              "placeholder": "Choose a plan",
              "options": [
                {
                  "label": "Free — $0",
                  "value": "free"
                },
                {
                  "label": "Pro — $9",
                  "value": "pro"
                },
                {
                  "label": "Team — $29",
                  "value": "team"
                }
              ],
              "onChange": "selectChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-country",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "country",
            "props": {
              "name": "country",
              "label": "Country",
              "options": [
                "USA",
                "India",
                "Germany"
              ],
              "onChange": "selectChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-city",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "city",
            "props": {
              "name": "city",
              "label": "City (follows Country)",
              "onChange": "selectChanged()",
              "optionsFrom": {
                "field": "country",
                "waitingText": "Select a country first",
                "emptyText": "No cities for {value}",
                "map": {
                  "USA": [
                    "New York",
                    "Chicago",
                    "Austin"
                  ],
                  "India": [
                    "Chennai",
                    "Mumbai",
                    "Delhi"
                  ],
                  "Germany": [
                    "Berlin",
                    "Munich"
                  ]
                }
              }
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
              "text": "Pick something."
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
          "className": "rc-d-flex rc-gap-2 rc-mt-3"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "set-city",
            "props": {
              "text": "Set Germany → Munich from code",
              "onClick": "setCity()"
            }
          }
        ]
      }
    ]
  }
];

@Component({
  selector: "app-select-fields",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [actions]="actions"
  ></rcube-html-form>`,
})
export class SelectFieldsComponent {
  schema = schema;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    selectChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + (value || "(empty)") }),
    // A dependent value can be set together with its parent; the city is applied once its options exist
    setCity: () => api.setFormData({ country: "Germany", city: "Munich" }),
  });
}