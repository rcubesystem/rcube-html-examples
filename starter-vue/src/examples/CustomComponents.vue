<!-- Custom components — https://rcube-html.com/custom-components -->
<script setup>
import { RcubeForm } from "rcube-html/vue";
import { React, registerComponent } from "rcube-html/element/core";

// Components are React components: rcube-html/element brings its own React (no JSX needed)
const h = React.createElement;

// A display component: gets the node's props
const Stat = ({ label, value, trend }) => h("div", { className: "rc-border rc-rounded rc-p-3 rc-mb-3 rc-text-center" },
  h("div", { className: "rc-small rc-text-body-secondary" }, label),
  h("div", { className: "rc-fs-3 rc-fw-semibold" }, value),
  trend && h("div", { className: "small " + (String(trend).startsWith("-") ? "text-danger" : "text-success") }, trend));

// A container: draws its children with renderNodes (fields inside keep validation)
const Panel = ({ node, renderNodes, title }) => h("section", { className: "rc-border rc-border-primary-subtle rc-rounded rc-p-3 rc-mb-3" },
  h("h6", { className: "rc-text-primary" }, title),
  renderNodes(node.children));

// A form field: forwardRef to an input that holds the value, call onChange when it changes
const RatingField = React.forwardRef(function RatingField({ name, label, max = 5, required, error, onChange }, ref) {
  const [value, setValue] = React.useState(0);
  const inputRef = React.useRef(null);
  const pick = (n) => {
    setValue(n);
    inputRef.current.value = String(n);
    onChange?.({ type: "change", target: inputRef.current });
  };
  return h("div", { className: "rc-mb-3" },
    label && h("div", { className: "rc-label" }, label, required && h("span", { className: "rc-text-danger" }, " *")),
    h("input", { type: "hidden", name, defaultValue: "",
      ref: (el) => { inputRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; } }),
    Array.from({ length: max }, (_, i) => i + 1).map((n) => h("button", {
      key: n, type: "button", className: "rc-btn rc-btn-link rc-p-0 rc-me-1 rc-fs-3 rc-text-decoration-none",
      style: { color: n <= value ? "#f0b429" : "gray" }, onClick: () => pick(n),
    }, "★")),
    error && h("div", { className: "rc-feedback rc-d-block" }, error));
});

registerComponent("Stat", Stat);                                    // display
registerComponent("Panel", Panel, { container: true });             // holds other nodes
registerComponent("RatingField", RatingField, { field: true });     // form field

const schema = [
  {
    "type": "row",
    "id": "row-stats",
    "props": {
      "className": "rc-g-3"
    },
    "children": [
      {
        "type": "column",
        "id": "c-s1",
        "props": {
          "className": "rc-col-6 rc-col-md-4"
        },
        "children": [
          {
            "type": "Stat",
            "id": "stat-users",
            "props": {
              "label": "Users",
              "value": "1,284",
              "trend": "+12%"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-s2",
        "props": {
          "className": "rc-col-6 rc-col-md-4"
        },
        "children": [
          {
            "type": "Stat",
            "id": "stat-orders",
            "props": {
              "label": "Orders",
              "value": "342",
              "trend": "-3%"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-s3",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "Stat",
            "id": "stat-revenue",
            "props": {
              "label": "Revenue",
              "value": "$18.2K",
              "trend": "+8%"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-panel",
    "children": [
      {
        "type": "column",
        "id": "c-panel",
        "children": [
          {
            "type": "Panel",
            "id": "feedback",
            "props": {
              "title": "Feedback (a custom container)"
            },
            "children": [
              {
                "type": "RatingField",
                "id": "rating",
                "props": {
                  "name": "rating",
                  "label": "How did we do?",
                  "required": true,
                  "onChange": "ratingChanged()"
                }
              },
              {
                "type": "TextareaField",
                "id": "comment",
                "props": {
                  "name": "comment",
                  "label": "Comment",
                  "rows": 2
                }
              }
            ]
          },
          {
            "type": "ButtonField",
            "id": "send",
            "props": {
              "type": "submit",
              "text": "Send",
              "onClick": "runValidation()"
            }
          },
          {
            "type": "ButtonField",
            "id": "bump",
            "props": {
              "text": "Update a Stat from code",
              "variant": "outline-secondary",
              "className": "rc-ms-2",
              "onClick": "bumpUsers()"
            }
          }
        ]
      }
    ]
  }
];

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  ratingChanged: (event, { value }) => console.log("Rating:", value),
  bumpUsers: () => api.setNodeProps("stat-users", { value: (1284 + Math.floor(Math.random() * 100)).toLocaleString() }),
});

const onSubmit = ({ entries }) => console.log("Submitted:", entries);
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" @submit="onSubmit" />
</template>
