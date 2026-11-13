<!-- My page — change the schema below and save: the browser updates by itself. -->
<!-- My page — https://rcube-html.com/ -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

const schema = [
  {
    "type": "row",
    "id": "row-title",
    "children": [
      {
        "type": "column",
        "id": "col-title",
        "children": [
          {
            "type": "H4",
            "id": "title",
            "props": {
              "text": "Sign up"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-fields",
    "children": [
      {
        "type": "column",
        "id": "col-name",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "first",
            "props": {
              "name": "firstName",
              "label": "First name",
              "required": true,
              "uppercase": true
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "col-email",
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
              "required": true,
              "lowercase": true,
              "pattern": "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}",
              "patternMessage": "Please enter a valid email address."
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
          "className": "rc-d-flex rc-justify-content-end rc-gap-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "clear",
            "props": {
              "text": "Clear",
              "onClick": "clearForm()"
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
  }
];

const onSubmit = ({ entries }) => console.log("Submitted:", entries);
</script>

<template>
  <RcubeForm :schema="schema" @submit="onSubmit" />
</template>
