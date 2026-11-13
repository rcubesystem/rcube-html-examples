// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code
// Rich text editor — https://rcube-html.com/rich-text
import { Component } from "@angular/core";
import { RcubeFormComponent } from "../rcube-form.component";
import "rcube-html/element/richtext";

const schema = [
  {
    "type": "RichTextField",
    "id": "details",
    "props": {
      "name": "details",
      "label": "Details",
      "required": true,
      "maxLength": 500,
      "minHeight": 140,
      "placeholder": "Write here…",
      "hint": "Bold, lists, links — or edit the HTML with Source.",
      "defaultValue": "<p>Hello <b>world</b> — try the toolbar.</p>",
      "toolbar": [
        "bold",
        "italic",
        "underline",
        "|",
        "heading",
        "bulletList",
        "numberList",
        "quote",
        "|",
        "link",
        "clear",
        "|",
        {
          "key": "sign",
          "text": "Signature",
          "title": "Insert my signature",
          "html": "<p>— The school office</p>"
        },
        {
          "key": "shout",
          "text": "UPPER",
          "title": "Upper-case the text",
          "onClick": "shout()"
        }
      ],
      "source": true,
      "onChange": "detailsChanged()"
    }
  },
  {
    "type": "ButtonField",
    "id": "show",
    "props": {
      "text": "Show it below",
      "variant": "outline-primary",
      "onClick": "showIt()"
    }
  },
  {
    "type": "ButtonField",
    "id": "fill",
    "props": {
      "text": "Set a value from code",
      "variant": "outline-secondary",
      "className": "rc-ms-2",
      "onClick": "fillIt()"
    }
  },
  {
    "type": "H6",
    "id": "preview-h",
    "props": {
      "text": "Shown with RichText (cleaned again):",
      "className": "rc-mt-3"
    }
  },
  {
    "type": "RichText",
    "id": "preview",
    "props": {
      "html": "",
      "emptyText": "Nothing yet — press “Show it below”."
    }
  }
];

const buttons = [
  {
    "type": "ButtonField",
    "id": "submit",
    "props": {
      "type": "submit",
      "text": "Submit",
      "onClick": "runValidation()",
      "className": "rc-mt-3"
    }
  }
];

@Component({
  selector: "app-rich-text",
  standalone: true,
  imports: [RcubeFormComponent],
  template: `<rcube-html-form
    [schema]="schema"
    [buttons]="buttons"
    [actions]="actions"
  ></rcube-html-form>`,
})
export class RichTextComponent {
  schema = schema;
  buttons = buttons;
  // the actions the schema names, e.g. "onClick": "save()"
  actions = (api: any): Record<string, (...args: any[]) => any> => ({
    // your tool: the editor is handed over
    shout: (event, { editor }) => editor.setHtml(editor.getHtml().toUpperCase().replace(/<(\/?)([A-Z0-9]+)/g, (m, s, t) => "<" + s + t.toLowerCase())),
    detailsChanged: (event, { value }) => console.log("HTML now:", value),
    showIt: () => api.setNodeProps("preview", { html: api.getFormData().details }),
    fillIt: () => api.setFieldValue("details", "<h4>Trip on Friday</h4><ul><li>Bring lunch</li><li>Wear the uniform</li></ul><script>alert(1)</script>"),
  });
}