// Conditional fields — https://rcube-html.com/conditional-fields
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";

const schema = [
  {
    "type": "row",
    "id": "row-1",
    "children": [
      {
        "type": "column",
        "id": "c-contact",
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "RadioGroupField",
            "id": "contact-by",
            "props": {
              "name": "contactBy",
              "label": "How should we contact you?",
              "required": true,
              "options": [
                "Email",
                "Phone",
                "Post"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-email",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Email"
        },
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
      },
      {
        "type": "column",
        "id": "c-phone",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Phone"
        },
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
              "label": "Phone",
              "required": true,
              "mask": "(###) ###-####"
            }
          },
          {
            "type": "SelectField",
            "id": "best-time",
            "props": {
              "name": "bestTime",
              "label": "Best time to call",
              "options": [
                "Morning",
                "Afternoon",
                "Evening"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-address",
        "visibleWhen": {
          "field": "contactBy",
          "equals": "Post"
        },
        "props": {
          "className": "rc-col-12"
        },
        "children": [
          {
            "type": "TextareaField",
            "id": "address",
            "props": {
              "name": "address",
              "label": "Postal address",
              "rows": 2,
              "required": true
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-2",
    "children": [
      {
        "type": "column",
        "id": "c-extras",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "CheckboxGroupField",
            "id": "extras",
            "props": {
              "name": "extras",
              "label": "Extras",
              "options": [
                "Newsletter",
                "Special offers"
              ]
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-offer",
        "visibleWhen": {
          "field": "extras",
          "includesAny": [
            "Special offers"
          ]
        },
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "offer-type",
            "props": {
              "name": "offerType",
              "label": "Offers about",
              "required": true,
              "options": [
                "Books",
                "Music",
                "Travel"
              ]
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
          "className": "rc-d-flex rc-justify-content-end"
        },
        "children": [
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

@Component({
  selector: "app-conditional-fields",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    (submitted)="onSubmit($event.entries)"
  ></rcube-html-form>`,
})
export class ConditionalFieldsComponent {
  schema = schema;
  onSubmit(entries: unknown[]) {
    console.log("Submitted:", entries);
  }
}