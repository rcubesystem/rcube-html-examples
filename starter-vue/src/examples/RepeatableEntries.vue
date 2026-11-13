<!-- Repeatable entries — https://rcube-html.com/repeatable-entries -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

const schema = [
  {
    "type": "row",
    "id": "row-contact",
    "children": [
      {
        "type": "column",
        "id": "c-name",
        "props": {
          "className": "rc-col-12 rc-col-md-6"
        },
        "children": [
          {
            "type": "InputField",
            "id": "name",
            "props": {
              "name": "name",
              "label": "Contact name",
              "required": true
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-email",
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
      }
    ]
  }
];

const buttons = [
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "col-buttons",
        "props": {
          "className": "rc-d-flex rc-justify-content-between rc-mt-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "add",
            "props": {
              "text": "+ Add another contact",
              "variant": "outline-primary",
              "onClick": "addCopy()"
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

const options = {
  repeatable: true,
};

const onSubmit = ({ entries }) => console.log("Submitted:", entries);
</script>

<template>
  <RcubeForm :schema="schema" :buttons="buttons" v-bind="options" @submit="onSubmit" />
</template>
