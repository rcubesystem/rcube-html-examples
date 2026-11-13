// Custom components — Add your own React component and use it in schemas by name.
// Live example and explanation: https://rcube-html.com/custom-components
// Group: Advanced
//
// Covers:
//   - registerComponent
//
// Form fields (name — type, label):
//   - rating — RatingField "How did we do?" (required)
//   - comment — TextareaField "Comment"
//
// Actions written here: ratingChanged, bumpUsers
// Built-in actions it uses: runValidation()
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/custom-components";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

import { forwardRef, useRef, useState } from "react";
import { registerComponent } from "rcube-html";

// ---- custom components this schema uses
// A display component: gets the node's props
const Stat = ({ label, value, trend }) => (
  <div className="rc-border rc-rounded rc-p-3 rc-mb-3 rc-text-center">
    <div className="rc-small rc-text-body-secondary">{label}</div>
    <div className="rc-fs-3 rc-fw-semibold">{value}</div>
    {trend && <div className={"small " + (String(trend).startsWith("-") ? "text-danger" : "text-success")}>{trend}</div>}
  </div>
);

// A container: draws its children with renderNodes (fields inside keep validation)
const Panel = ({ node, renderNodes, title }) => (
  <section className="rc-border rc-border-primary-subtle rc-rounded rc-p-3 rc-mb-3">
    <h6 className="rc-text-primary">{title}</h6>
    {renderNodes(node.children)}
  </section>
);

// A form field: forwardRef to an input that holds the value, call onChange when it changes
const RatingField = forwardRef(function RatingField({ name, label, max = 5, required, error, onChange }, ref) {
  const [value, setValue] = useState(0);
  const inputRef = useRef(null);
  const pick = (n) => {
    setValue(n);
    inputRef.current.value = String(n);
    onChange?.({ type: "change", target: inputRef.current });
  };
  return (
    <div className="rc-mb-3">
      {label && <div className="rc-label">{label}{required && <span className="rc-text-danger"> *</span>}</div>}
      <input type="hidden" name={name} defaultValue=""
        ref={(el) => { inputRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; }} />
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className="rc-btn rc-btn-link rc-p-0 rc-me-1 rc-fs-3 rc-text-decoration-none"
          style={{ color: n <= value ? "#f0b429" : "gray" }} onClick={() => pick(n)}>★</button>
      ))}
      {error && <div className="rc-feedback rc-d-block">{error}</div>}
    </div>
  );
});

registerComponent("Stat", Stat);                                    // display
registerComponent("Panel", Panel, { container: true });             // holds other nodes
registerComponent("RatingField", RatingField, { field: true });     // form field

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
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

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // ratingChanged: run by RatingField "rating" (onChange)
  ratingChanged: (event, { value }) => console.log("Rating:", value),
  // bumpUsers: run by ButtonField "bump" (onClick)
  bumpUsers: () => api.setNodeProps("stat-users", { value: (1284 + Math.floor(Math.random() * 100)).toLocaleString() }),
});
