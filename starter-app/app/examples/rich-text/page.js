// Rich text editor — https://rcube-html.com/rich-text
"use client";
import { useDynamicTag, DynamicTag } from "rcube-html";
import ClientOnly from "../../ClientOnly";

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

function Example() {
  const form = useDynamicTag({
    schema,
    buttons,
    actions: (api) => ({
      // your tool: the editor is handed over
      shout: (event, { editor }) => editor.setHtml(editor.getHtml().toUpperCase().replace(/<(\/?)([A-Z0-9]+)/g, (m, s, t) => "<" + s + t.toLowerCase())),
      detailsChanged: (event, { value }) => console.log("HTML now:", value),
      showIt: () => api.setNodeProps("preview", { html: api.getFormData().details }),
      fillIt: () => api.setFieldValue("details", "<h4>Trip on Friday</h4><ul><li>Bring lunch</li><li>Wear the uniform</li></ul><script>alert(1)</script>"),
    }),
  });
  return <DynamicTag form={form} />;
}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
