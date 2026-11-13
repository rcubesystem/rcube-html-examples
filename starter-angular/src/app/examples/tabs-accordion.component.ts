// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Tabs & accordion — https://rcube-html.com/tabs-accordion
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";

const schema = [
  {
    "type": "row",
    "id": "row-tabs",
    "children": [
      {
        "type": "column",
        "id": "c-tabs",
        "children": [
          {
            "type": "Tabs",
            "id": "profile-tabs",
            "props": {
              "defaultActiveKey": "personal",
              "onSelect": "tabChanged()"
            },
            "items": [
              {
                "key": "personal",
                "title": "Personal",
                "children": [
                  {
                    "type": "InputField",
                    "id": "name",
                    "props": {
                      "name": "name",
                      "label": "Name",
                      "required": true
                    }
                  }
                ]
              },
              {
                "key": "address",
                "title": "Address",
                "children": [
                  {
                    "type": "InputField",
                    "id": "city",
                    "props": {
                      "name": "city",
                      "label": "City (required — leave it empty and press Submit)",
                      "required": true
                    }
                  }
                ]
              },
              {
                "key": "notes",
                "title": "Notes",
                "children": [
                  {
                    "type": "TextareaField",
                    "id": "notes",
                    "props": {
                      "name": "notes",
                      "label": "Notes",
                      "rows": 2
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-tab-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-tab-buttons",
        "props": {
          "className": "rc-d-flex rc-gap-2 rc-mb-4"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "go-address",
            "props": {
              "text": "Go to Address",
              "variant": "outline-primary",
              "data-tabs": "profile-tabs",
              "data-key": "address",
              "onClick": "selectTab()"
            }
          },
          {
            "type": "ButtonField",
            "id": "go-notes",
            "props": {
              "text": "Go to Notes (from code)",
              "variant": "outline-primary",
              "onClick": "openNotes()"
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
  },
  {
    "type": "row",
    "id": "row-accordion",
    "children": [
      {
        "type": "column",
        "id": "c-accordion",
        "children": [
          {
            "type": "Accordion",
            "id": "faq",
            "props": {
              "defaultActiveKey": "shipping",
              "alwaysOpen": true,
              "onSelect": "panelChanged()"
            },
            "items": [
              {
                "key": "shipping",
                "title": "How long does shipping take?",
                "children": [
                  {
                    "type": "P",
                    "id": "a1",
                    "props": {
                      "text": "Orders ship within 2 business days."
                    }
                  }
                ]
              },
              {
                "key": "returns",
                "title": "Can I return an item?",
                "children": [
                  {
                    "type": "P",
                    "id": "a2",
                    "props": {
                      "text": "Yes, within 30 days."
                    }
                  },
                  {
                    "type": "InputField",
                    "id": "order-no",
                    "props": {
                      "name": "orderNo",
                      "label": "Order number (a field inside a panel)"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@Component({
  selector: "app-tabs-accordion",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [actions]="actions"
    (submitted)="onSubmit($event.entries)"
  ></rcube-html-form>`,
})
export class TabsAccordionComponent {
  schema = schema;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    tabChanged: ({ eventKey }) => console.log("Tab:", eventKey),
    panelChanged: ({ eventKey }) => console.log("Panel(s):", eventKey),
    openNotes: () => api.selectTab("profile-tabs", "notes"),
  });
  onSubmit(entries: unknown[]) {
    console.log("Submitted:", entries);
  }
}