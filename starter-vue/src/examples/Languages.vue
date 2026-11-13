<!-- Languages — https://rcube-html.com/languages -->
<script setup>
import { RcubeForm } from "rcube-html/vue";
import libEs from "rcube-html/lang/lang_es";

// Your texts. Keys missing in a language fall back to "messages", then to the library English.
const textEn = {
  demo: { title: "Contact us", name: "Your name", message: "Message", send: "Send", hint: "Required fields have a red star." },
};
const textEs = {
  ...libEs, // the library's Spanish texts (validation messages, ...)
  demo: { title: "Contáctanos", name: "Tu nombre", message: "Mensaje", send: "Enviar", hint: "Los campos obligatorios tienen una estrella roja." },
};

const schema = [
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

const options = {
  messages: textEn,                          // starting texts and fallback
  language: "en",
  languages: { en: textEn, es: textEs },     // or es: () => import("./text_es") to load on demand
};

const onSubmit = ({ entries }) => console.log("Submitted:", entries);
</script>

<template>
  <RcubeForm :schema="schema" v-bind="options" @submit="onSubmit" />
</template>
