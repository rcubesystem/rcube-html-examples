// Advanced: languages, custom components
import { forwardRef, useRef, useState } from "react";
import { registerComponent } from "rcube-html";
import libEs from "rcube-html/lang/lang_es";

export const languages = {
  sections: [
    {
      heading: "@keys instead of text",
      body: [
        "Write `@key.path` instead of a fixed text in any prop (`label`, `placeholder`, `text`, messages, option labels). The form looks the key up in its messages.",
        "Give `useDynamicTag` the starting `messages` and a `languages` map. A button with `\"data-lang\": \"es\"` and `onClick: \"switchLanguage()\"` switches; from code use `form.setLanguage(\"es\")`. A language can also be loaded on demand: `es: () => import(\"./text_es\")`.",
        "The library's own texts (validation messages, table / calendar / upload words) come from `rcube-html/lang/lang_en` and `lang_es` — spread them into your messages to translate those too.",
      ],
    },
  ],
  provides: { libEs },
  imports: `import libEs from "rcube-html/lang/lang_es";`,
  helpersCode: `// Your texts. Keys missing in a language fall back to "messages", then to the library English.
const textEn = {
  demo: { title: "Contact us", name: "Your name", message: "Message", send: "Send", hint: "Required fields have a red star." },
};
const textEs = {
  ...libEs, // the library's Spanish texts (validation messages, ...)
  demo: { title: "Contáctanos", name: "Tu nombre", message: "Mensaje", send: "Enviar", hint: "Los campos obligatorios tienen una estrella roja." },
};`,
  helperNames: ["textEn", "textEs"],
  options: (h) => ({ messages: h.textEn, language: "en", languages: { en: h.textEn, es: h.textEs } }),
  optionsCode: `messages: textEn,                          // starting texts and fallback
language: "en",
languages: { en: textEn, es: textEs },     // or es: () => import("./text_es") to load on demand`,
  schema: [
    { type: "row", id: "row-lang", children: [
      { type: "column", id: "c-lang", props: { className: "d-flex gap-2 mb-3" }, children: [
        { type: "ButtonField", id: "lang-en", props: { text: "English", variant: "outline-primary", "data-lang": "en", onClick: "switchLanguage()" } },
        { type: "ButtonField", id: "lang-es", props: { text: "Español", variant: "outline-primary", "data-lang": "es", onClick: "switchLanguage()" } },
      ] },
    ] },
    { type: "row", id: "row-form", children: [
      { type: "column", id: "c-form", children: [
        { type: "H4", id: "title", props: { text: "@demo.title" } },
        { type: "P", id: "hint", props: { text: "@demo.hint", className: "text-body-secondary small" } },
        { type: "InputField", id: "name", props: { name: "name", label: "@demo.name", required: true } },
        { type: "TextareaField", id: "message", props: { name: "message", label: "@demo.message", rows: 3, required: true } },
        { type: "ButtonField", id: "send", props: { type: "submit", text: "@demo.send", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: "",
  props: [
    ["@key.path", "Any text prop: looked up in the active language."],
    ["messages / language / languages (useDynamicTag)", "Starting texts, starting language code, all languages (objects or loaders)."],
    ["data-lang + switchLanguage()", "A button that switches language."],
    ["form.setLanguage(code) / form.language", "Switch / read the language from code."],
  ],
  events: [
    ["onSubmit", "Valid submit — try it in Spanish to see Spanish error messages.", "The entries."],
  ],
  tips: ["To add a language, copy `rcube-html/lang/lang_en`, translate it and add your keys."],
};

// ---------------------------------------------------------------- custom components

// A display component: gets the node's props
const Stat = ({ label, value, trend }) => (
  <div className="border rounded p-3 mb-3 text-center">
    <div className="small text-body-secondary">{label}</div>
    <div className="fs-3 fw-semibold">{value}</div>
    {trend && <div className={`small ${String(trend).startsWith("-") ? "text-danger" : "text-success"}`}>{trend}</div>}
  </div>
);

// A container: draws its children with renderNodes (fields inside keep validation)
const Panel = ({ node, renderNodes, title }) => (
  <section className="border border-primary-subtle rounded p-3 mb-3 bg-primary-subtle bg-opacity-25">
    <h6 className="text-primary">{title}</h6>
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
    <div className="mb-3">
      {label && <div className="form-label">{label}{required && <span className="text-danger"> *</span>}</div>}
      <input type="hidden" name={name} defaultValue=""
        ref={(el) => { inputRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; }} />
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className="btn btn-link p-0 me-1 fs-3 text-decoration-none" aria-label={`${n} of ${max}`}
          style={{ color: n <= value ? "#f0b429" : "var(--bs-secondary-color)" }} onClick={() => pick(n)}>★</button>
      ))}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
});

registerComponent("Stat", Stat);
registerComponent("Panel", Panel, { container: true });
registerComponent("RatingField", RatingField, { field: true });

const componentsCode = `import { forwardRef, useRef, useState } from "react";
import { registerComponent } from "rcube-html";

// A display component: gets the node's props
const Stat = ({ label, value, trend }) => (
  <div className="border rounded p-3 mb-3 text-center">
    <div className="small text-body-secondary">{label}</div>
    <div className="fs-3 fw-semibold">{value}</div>
    {trend && <div className={"small " + (String(trend).startsWith("-") ? "text-danger" : "text-success")}>{trend}</div>}
  </div>
);

// A container: draws its children with renderNodes (fields inside keep validation)
const Panel = ({ node, renderNodes, title }) => (
  <section className="border border-primary-subtle rounded p-3 mb-3">
    <h6 className="text-primary">{title}</h6>
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
    <div className="mb-3">
      {label && <div className="form-label">{label}{required && <span className="text-danger"> *</span>}</div>}
      <input type="hidden" name={name} defaultValue=""
        ref={(el) => { inputRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; }} />
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className="btn btn-link p-0 me-1 fs-3 text-decoration-none"
          style={{ color: n <= value ? "#f0b429" : "gray" }} onClick={() => pick(n)}>★</button>
      ))}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
});

registerComponent("Stat", Stat);                                    // display
registerComponent("Panel", Panel, { container: true });             // holds other nodes
registerComponent("RatingField", RatingField, { field: true });     // form field`;

export const customComponents = {
  sections: [
    {
      heading: "registerComponent",
      body: [
        "Any React component can be used in schemas: `registerComponent(\"Stat\", Stat)` and then `{ type: \"Stat\", props: { ... } }`. Its props come from the node's props.",
        "A container (`{ container: true }`) receives `node` and `renderNodes`; draw the children with `renderNodes(node.children)` — fields inside keep working.",
        "A field (`{ field: true }`) must `forwardRef` to an input that holds its value and call `onChange` when it changes; then `required`, values, `onChange` actions and `onSubmit` work like built-in fields.",
        "Register once, at the top of a file that runs before the form (e.g. a `components.js` you import in the page). The Components tab has the code.",
      ],
    },
  ],
  pagePreamble: componentsCode.split("\n").filter((line) => !line.startsWith("import")).join("\n"),
  imports: `import { forwardRef, useRef, useState } from "react";
import { registerComponent } from "rcube-html";`,
  extraCode: [{ title: "Components", code: componentsCode }],
  schema: [
    { type: "row", id: "row-stats", props: { className: "g-3" }, children: [
      { type: "column", id: "c-s1", props: { className: "col-6 col-md-4" }, children: [{ type: "Stat", id: "stat-users", props: { label: "Users", value: "1,284", trend: "+12%" } }] },
      { type: "column", id: "c-s2", props: { className: "col-6 col-md-4" }, children: [{ type: "Stat", id: "stat-orders", props: { label: "Orders", value: "342", trend: "-3%" } }] },
      { type: "column", id: "c-s3", props: { className: "col-12 col-md-4" }, children: [{ type: "Stat", id: "stat-revenue", props: { label: "Revenue", value: "$18.2K", trend: "+8%" } }] },
    ] },
    { type: "row", id: "row-panel", children: [
      { type: "column", id: "c-panel", children: [
        { type: "Panel", id: "feedback", props: { title: "Feedback (a custom container)" }, children: [
          { type: "RatingField", id: "rating", props: { name: "rating", label: "How did we do?", required: true, onChange: "ratingChanged()" } },
          { type: "TextareaField", id: "comment", props: { name: "comment", label: "Comment", rows: 2 } },
        ] },
        { type: "ButtonField", id: "send", props: { type: "submit", text: "Send", onClick: "runValidation()" } },
        { type: "ButtonField", id: "bump", props: { text: "Update a Stat from code", variant: "outline-secondary", className: "ms-2", onClick: "bumpUsers()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: `ratingChanged: (event, { value }) => console.log("Rating:", value),
bumpUsers: () => api.setNodeProps("stat-users", { value: (1284 + Math.floor(Math.random() * 100)).toLocaleString() }),`,
  props: [
    ["registerComponent(name, Component)", "Use `Component` as `{ type: name }`."],
    ["{ container: true }", "Receives `node`, `nodeId`, `items`, `renderNodes`, `actions`."],
    ["{ field: true }", "forwardRef to the value input; receives `name`, `label`, `error`, `onChange`, `required`, ..."],
  ],
  events: [
    ["onChange (custom field)", "Your field calls onChange.", "`(event, { name, value })`"],
    ["onSubmit", "Valid submit — the rating is required.", "`[{ rating: \"4\", comment: \"...\" }]`"],
  ],
};
