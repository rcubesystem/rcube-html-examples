// Languages — Write @keys instead of text and switch the whole form between languages.
// Live example and explanation: https://rcube-html.com/languages
// Group: Advanced
//
// Covers:
//   - @keys instead of text
//
// Form fields (name — type, label):
//   - name — InputField "@demo.name" (required)
//   - message — TextareaField "@demo.message" (required)
//
// No actions of its own.
// Built-in actions it uses: switchLanguage() (from the library or the page), runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, options } from "<path>/schema/languages";
//   const form = useDynamicTag({ schema, ...options });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

import libEs from "rcube-html/lang/lang_es";

// Helpers the actions use (textEn, textEs): in a real app, often your API or data.
// Your texts. Keys missing in a language fall back to "messages", then to the library English.
const textEn = {
  demo: { title: "Contact us", name: "Your name", message: "Message", send: "Send", hint: "Required fields have a red star." },
};
const textEs = {
  ...libEs, // the library's Spanish texts (validation messages, ...)
  demo: { title: "Contáctanos", name: "Tu nombre", message: "Mensaje", send: "Enviar", hint: "Los campos obligatorios tienen una estrella roja." },
};

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-lang",
    "children": [
      {
        "type": "column",
        "id": "c-lang",
        "props": {
          "className": "rc-d-flex rc-gap-2 rc-mb-3"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "lang-en",
            "props": {
              "text": "English",
              "variant": "outline-primary",
              "data-lang": "en",
              "onClick": "switchLanguage()"
            }
          },
          {
            "type": "ButtonField",
            "id": "lang-es",
            "props": {
              "text": "Español",
              "variant": "outline-primary",
              "data-lang": "es",
              "onClick": "switchLanguage()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-form",
    "children": [
      {
        "type": "column",
        "id": "c-form",
        "children": [
          {
            "type": "H4",
            "id": "title",
            "props": {
              "text": "@demo.title"
            }
          },
          {
            "type": "P",
            "id": "hint",
            "props": {
              "text": "@demo.hint",
              "className": "rc-text-body-secondary rc-small"
            }
          },
          {
            "type": "InputField",
            "id": "name",
            "props": {
              "name": "name",
              "label": "@demo.name",
              "required": true
            }
          },
          {
            "type": "TextareaField",
            "id": "message",
            "props": {
              "name": "message",
              "label": "@demo.message",
              "rows": 3,
              "required": true
            }
          },
          {
            "type": "ButtonField",
            "id": "send",
            "props": {
              "type": "submit",
              "text": "@demo.send",
              "onClick": "runValidation()"
            }
          }
        ]
      }
    ]
  }
];

// More useDynamicTag options (spread them in: useDynamicTag({ schema, ...options, actions })).
export const options = {
  messages: textEn,                          // starting texts and fallback
  language: "en",
  languages: { en: textEn, es: textEs },     // or es: () => import("./text_es") to load on demand
};
