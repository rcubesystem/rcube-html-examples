// Tutorial for rcube-html 0.8: the same schema in Angular, Vue, JSP / server pages and plain JavaScript, through the
// <rcube-form> element (rcube-html/element, rcube-html/vue, dist/browser/rcube-html.js, integrations/).

export const useAnywhere = {
  sections: [
    {
      heading: "One schema, every kind of page",
      body: [
        "A schema is plain JSON, so the same file can drive a React app, an Angular app, a Vue app and a JSP page. Outside React, rcube-html is the **`<rcube-form>`** element: a web component with React inside it, so the page installs nothing else.",
        "Pick the way in for your page: **Angular** — the `<rcube-html-form>` component (inputs, outputs, `formControl` / `ngModel`); **Vue 3** — `<RcubeForm>` with `v-model`; **any bundler** (Svelte, Lit, jQuery, …) — `import \"rcube-html/element\"`, then `<rcube-form>` or `mount()`; **no bundler** (JSP, PHP, ASP.NET, Django, a CMS) — one `<script>` and the schema as JSON in the page; **Node servers** — `renderFormHtml()` draws the form before any script runs.",
        "Sizes, gzipped with React and the styles: `rcube-html/element` about 162 KB (every component), `rcube-html/element/core` about 111 KB (forms). Add `rcube-html/element/table`, `/chart`, `/calendar`, `/tree`, `/richtext` or `/upload` to core when a schema needs them.",
      ],
      code: `npm install rcube-html`,
    },
    {
      heading: "Get it: one package for every app",
      body: [
        "rcube-html is one npm package. The other ways below serve the same files to people who don't use npm.",
        "Every tutorial's Code box has a **Code for** switch: React, Angular, Vue, HTML / JS or JSP. The schema stays the same; only the page around it changes. Each framework also has a starter with every example (see Introduction).",
      ],
      list: [
        "**React, Angular, Vue, Svelte, any bundler, Node servers** — npm: `npm install rcube-html`.",
        "**Plain HTML, PHP, ASP.NET, Django, a CMS** — the CDN, `https://cdn.jsdelivr.net/npm/rcube-html@0.8.0/dist/browser/rcube-html.js` (or unpkg.com), or the two files of `dist/browser/` copied to your static folder (the HTML starter has them).",
        "**Java / JSP** — the files of `dist/browser/` and `integrations/jsp/rcube-form.tag` copied into the web app (the JSP starter has them); or the WebJar `org.webjars.npm:rcube-html` once it's deployed at webjars.org.",
        "**Work computers that block downloads** — `npm install`, `git` or `npx degit` (see Introduction); the HTML and JSP starters need no npm at all.",
      ],
      links: [
        { href: "https://www.npmjs.com/package/rcube-html", label: "rcube-html on npm" },
        { href: "https://www.jsdelivr.com/package/npm/rcube-html", label: "CDN (jsDelivr)" },
        { href: "https://github.com/rcubesystem/rcube-html-examples", label: "Starters on GitHub" },
      ],
    },
    {
      heading: "Plain HTML and server pages",
      body: [
        "Load the script once and write the element with its schema as JSON. Anything already in the element (a \"Loading…\" message, or markup the server drew) stays until the form replaces it. `schema-src=\"/schemas/signup.json\"` fetches the schema instead.",
        "The script is `node_modules/rcube-html/dist/browser/rcube-html.js` (copy it to your static files) or from a CDN. Inside the JSON, write `</` as `<\\/` so a text can't close the `<script>` early.",
      ],
      code: `<rcube-form id="signup" actions="signupActions">
  <script type="application/json" data-rcube="schema">[
    { "type": "InputField", "props": { "name": "email", "label": "Email", "type": "email", "required": true } },
    { "type": "ButtonField", "props": { "text": "Sign up", "variant": "primary", "onClick": "save()" } }
  ]</script>
  <script type="application/json" data-rcube="values">{ "email": "" }</script>
  <p>Loading the form…</p>
</rcube-form>

<script src="https://cdn.jsdelivr.net/npm/rcube-html@0.8.0/dist/browser/rcube-html.js"></script>
<script>
  // the actions the schema names, each called as (event, context, api)
  window.signupActions = {
    save: function (event, context, api) {
      var entries = api.runValidation();           // nothing when a field isn't valid (the errors show)
      if (entries) fetch("/api/signup", { method: "POST", body: JSON.stringify(entries[0]) });
    }
  };
</script>`,
    },
    {
      heading: "JSP",
      body: [
        "Copy `node_modules/rcube-html/integrations/jsp/rcube-form.tag` to `WEB-INF/tags/rcube/` (Java 9+). Keep schemas as JSON files of the web app — `schemaFile` reads one on the server and writes it into the page. `schema`, `values`, `buttons`, `messages` take JSON text (from Jackson, for example); `schemaSrc` is fetched by the browser.",
      ],
      code: `<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>

<rc:rcube-form id="signup" schemaFile="/WEB-INF/schemas/signup.json" values="\${signupJson}" actions="signupActions">
  <p>Loading the form…</p>
</rc:rcube-form>

<script src="\${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
<script>
  window.signupActions = { save: function (event, context, api) { /* as above */ } };
  // or: document.getElementById("signup").addEventListener("rcube-submit", e => send(e.detail.values));
</script>`,
    },
    {
      heading: "Angular",
      body: [
        "Copy `node_modules/rcube-html/integrations/angular/rcube-form.component.ts` into your app (Angular compiles components from the app's own source). It works with Angular forms — `formControl`, `ngModel` or `[(values)]` — and gives `submitted`, `action`, `formChange` and `ready` outputs. `form.api` holds the form actions.",
      ],
      code: `import { Component, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RcubeFormComponent, RcubeAction, RcubeSubmit } from "./shared/rcube-form.component";
import signupSchema from "../schemas/signup.json";      // the same JSON the other apps use

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [RcubeFormComponent, ReactiveFormsModule],
  template: \`<rcube-html-form [schema]="schema" [actions]="actions" [formControl]="signup"
               (submitted)="save($event)" (action)="onAction($event)"></rcube-html-form>\`,
})
export class SignupComponent {
  schema = signupSchema;
  signup = new FormControl({ email: "" });
  actions = { checkEmail: () => this.form.api.setNodeProps("email", { hint: "Checked" }) };
  @ViewChild(RcubeFormComponent) form!: RcubeFormComponent;

  save(e: RcubeSubmit) { this.http.post("/api/signup", e.values).subscribe(); }
  onAction(e: RcubeAction) { console.log("not in [actions]:", e.name); }
}`,
    },
    {
      heading: "Vue 3",
      body: [
        "`<RcubeForm>` takes the same options as props, `v-model` for the values, and emits `submit`, `action`, `change` and `ready`. Give a new schema to change it (`schema.value = [...]`), or use `form.value.api`.",
      ],
      code: `<script setup>
import { ref } from "vue";
import { RcubeForm } from "rcube-html/vue";
import "rcube-html/element/table";                  // only if the schema has a DataTable
import signupSchema from "./schemas/signup.json";

const values = ref({ email: "" });
const form = ref();                                  // form.value.api.setNodeProps(…)
const actions = { checkEmail: () => form.value.api.setNodeProps("email", { hint: "Checked" }) };
const save = ({ values }) => fetch("/api/signup", { method: "POST", body: JSON.stringify(values) });
</script>

<template>
  <RcubeForm ref="form" :schema="signupSchema" :actions="actions" v-model="values" @submit="save" />
</template>`,
    },
    {
      heading: "Any JavaScript: mount()",
      body: [
        "With a bundler, `import { mount } from \"rcube-html/element\"`; with the script, `RcubeHtml.mount`. It puts a form into an element and returns the `<rcube-form>`: `el.api` for the actions, `el.values = {…}` to fill it, `el.remove()` to take it away.",
      ],
      code: `import { mount } from "rcube-html/element";

const el = mount("#signup", {
  schema,
  actions: { checkEmail: (event, context) => { /* … */ } },
  onSubmit: ({ values }) => fetch("/api/signup", { method: "POST", body: JSON.stringify(values) }),
  onAction: ({ name }) => console.log("not defined:", name),
});
el.api.setFormData({ email: "a@b.co" });`,
    },
    {
      heading: "Node servers: the form drawn first",
      body: [
        "`renderFormHtml()` from `rcube-html/server` returns the element, its JSON and the form already drawn, so the page shows it before the script runs. When the script starts, the live form replaces the drawn one (text typed in between isn't kept).",
      ],
      code: `import { renderFormHtml } from "rcube-html/server";

app.get("/signup", (req, res) => res.send(\`<!doctype html><html><body>
  \${renderFormHtml({ schema, values: { email: req.user.email } }, { attributes: { id: "signup", actions: "signupActions" } })}
  <script src="/static/rcube-html.js"></script>
</body></html>\`));`,
    },
    {
      heading: "Actions and events",
      body: [
        "An action the schema names (`\"onClick\": \"save()\"`) is looked for in the built-in actions, then `actions` (property or prop: an object, or `(api) => object`), then the global object named by the `actions` attribute, and otherwise it comes out as an **`rcube-action`** event — so each app can handle it in its own code.",
        "Events carry their data in `event.detail`: `rcube-ready` `{ api }`, `rcube-change` `{ values, entries }`, `rcube-submit` `{ entries, values }` after `runValidation()` passes, `rcube-action` `{ name, event, context, api }`, `rcube-error` `{ error }`.",
      ],
    },
    {
      heading: "The example",
      body: ["The form below is the shared schema, drawn by React on this site. Copied into any of the pages above it looks and behaves the same: Save validates it and shows what each app would get."],
    },
  ],
  schema: [
    { type: "row", props: { gap: 3 }, children: [
      { type: "column", props: { span: { xs: 12, md: 6 } }, children: [
        { type: "InputField", props: { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" } },
        { type: "InputField", props: { name: "fullName", label: "Full name", required: true } },
      ] },
      { type: "column", props: { span: { xs: 12, md: 6 } }, children: [
        { type: "SelectField", props: { name: "plan", label: "Plan", options: ["Basic", "Standard", "Premium"], required: true } },
        { type: "InputField", props: { name: "terms", type: "checkbox", label: "I accept the terms", required: true } },
      ] },
    ] },
    { type: "row", props: { className: "rc-mt-2" }, children: { type: "column", props: { className: "rc-d-flex rc-gap-2" }, children: [
      { type: "ButtonField", props: { text: "Save", variant: "primary", onClick: "save()" } },
      { type: "ButtonField", props: { text: "Clear", variant: "outline-secondary", onClick: "clearForm()" } },
    ] } },
    { type: "Alert", id: "result", props: { variant: "secondary", text: "Press Save: what each app gets appears here.", className: "rc-mt-3 rc-mb-0" } },
  ],
  actionsCode: `// Save: validate, then show what rcube-submit / (submitted) / @submit would carry
save: () => {
  const entries = api.runValidation();     // nothing when a field isn't valid
  if (!entries) return;
  api.setNodeProps("result", { variant: "success", text: "event.detail.values = " + JSON.stringify(entries[0]) });
},`,
  props: [
    ["schema, buttons", "The form and the buttons after it (the same JSON as in React). Property / prop / `data-rcube=\"schema\"` JSON / `schema-src`."],
    ["actions", "Property: `{ name: fn }` or `(api) => ({ … })`. Attribute: the name of a global object (`signupActions`), each action called as `(event, context, api)`."],
    ["values", "Written into the fields; each new object again. Vue: `v-model`. Angular: `formControl`, `ngModel`, `[(values)]`."],
    ["messages, languages, language, data, repeatable", "As in `useDynamicTag`."],
    ["schema-src", "Attribute: a URL with the schema (a list) or a config `{ schema, buttons, values, … }`."],
    ["el.api", "Every form action: `setFormData`, `getFormEntries`, `runValidation`, `setNodeProps`, `hideNode`, …"],
    ["mount(target, options)", "Plain JavaScript: a form in `target`; options plus `onSubmit`, `onChange`, `onAction`, `onReady`."],
    ["renderFormHtml(options, { attributes, prerender })", "Node: the element as HTML, with its JSON and the form drawn."],
  ],
  events: [
    ["rcube-ready", "The form is on the page.", "`{ api }`"],
    ["rcube-change", "A field changed (typed, picked, or set in code).", "`{ values, entries }` — entries: one object per form copy"],
    ["rcube-submit", "`runValidation()` passed.", "`{ entries, values }`"],
    ["rcube-action", "The schema ran an action nobody defined.", "`{ name, event, context, api }`"],
    ["rcube-error", "`schema-src` couldn't be loaded.", "`{ error }`"],
  ],
  tips: [
    "React apps keep using `useDynamicTag` / `DynamicTag` — the element is for the other pages.",
    "Give a new schema or values object to change them; changing one in place isn't noticed. For small changes use `api.setNodeProps`, `hideNode`, `showNode`.",
    "Keep the schemas in `.json` files and import them everywhere (or read them with the JSP tag's `schemaFile`): one change reaches every app.",
  ],
};
