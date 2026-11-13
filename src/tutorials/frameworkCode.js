// Each tutorial as code for every kind of app: React (pageCode.js), Angular, Vue, plain HTML / JavaScript and JSP.
// Shown in the Code box (the framework switch) and written into the starters (scripts/build-starter.mjs).
// Plain JS (no JSX, no aliases) so Node can run it too.
//
// Every framework gets the same schema, actions, helpers and options; outside React they go to the <rcube-form>
// element (rcube-html/element): Angular through <rcube-html-form>, Vue through <RcubeForm>, HTML through
// RcubeHtml.mount(), JSP through the <rc:rcube-form> tag (schema read from a JSON file on the server).
import { indent, pageCode } from "./pageCode";

export const RCUBE_HTML_VERSION = "0.8.0";
export const CDN = `https://cdn.jsdelivr.net/npm/rcube-html@${RCUBE_HTML_VERSION}/dist/browser`;

export const FRAMEWORKS = [
  { key: "react", label: "React" },
  { key: "angular", label: "Angular" },
  { key: "vue", label: "Vue" },
  { key: "html", label: "HTML / JS" },
  { key: "jsp", label: "JSP" },
];

// The components with an entry point of their own (rcube-html/element/<part>)
const PARTS = [
  ["table", /^(DataTable|DynamicTable)$/],
  ["chart", /^Chart$/],
  ["calendar", /^Calendar$/],
  ["tree", /^Tree$/],
  ["richtext", /^RichText(Field)?$/],
  ["upload", /^FileUpload(Field)?$/],
];
const typesIn = (value, found = new Set()) => {
  if (Array.isArray(value)) value.forEach((v) => typesIn(v, found));
  else if (value && typeof value === "object") {
    if (typeof value.type === "string") found.add(value.type);
    Object.values(value).forEach((v) => typesIn(v, found));
  }
  return found;
};
export const partsOf = (example) => {
  const types = [...typesIn([example.schema, example.buttons || []])];
  return PARTS.filter(([, test]) => types.some((t) => test.test(t))).map(([part]) => part);
};

// "data-table" -> "DataTable"
export const pascal = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const json = (value) => JSON.stringify(value, null, 2);
const has = (code) => Boolean(code && code.trim());

// The example's imports, outside React: rcube-html's names from the element; React itself is never needed (custom
// components use the element's React, in elementCode)
const importLines = (example) => (example.imports || "").split("\n").map((l) => l.trim()).filter(Boolean)
  .filter((l) => !/from\s+["']react["']/.test(l))
  .filter((l) => !(example.elementCode && /\bregisterComponent\b/.test(l)));
const bundlerImports = (example) => {
  const lines = importLines(example).map((l) => l.replace(/from\s+["']rcube-html["']/, 'from "rcube-html/element/core"'));
  if (example.elementCode) lines.push('import { React, registerComponent } from "rcube-html/element/core";');
  return lines;
};
// With the <script>: window.RcubeHtml has the same names
const scriptImports = (example) => {
  const lines = importLines(example).map((l) => {
    const named = /^import\s*\{([^}]+)\}\s*from\s*["']rcube-html["'];?$/.exec(l);
    if (named) return `const {${named[1]}} = RcubeHtml;`;
    const lang = /^import\s+(\w+)\s+from\s*["']rcube-html\/lang\/lang_(\w+)["'];?$/.exec(l);
    if (lang) return `const ${lang[1]} = RcubeHtml.lang${lang[2][0].toUpperCase()}${lang[2].slice(1)};`;
    return `// ${l}`;
  });
  if (example.elementCode) lines.push("const { React, registerComponent } = RcubeHtml;");
  return lines;
};
// The code before the form: helpers (a stand-in API, page state, texts) and custom components
const moduleCode = (example) => [
  ...(has(example.helpersCode) ? [example.helpersCode.trim(), ""] : []),
  ...(has(example.elementCode) ? [example.elementCode.trim(), ""] : []),
];
// optionsCode: lines like `data: { … },` -> their keys
const optionKeys = (example) => (has(example.optionsCode) ? [...example.optionsCode.matchAll(/^(\w+)\s*:/gm)].map((m) => m[1]) : []);
const onLoadBody = (example) => (has(example.onLoadCode) ? example.onLoadCode.trim().replace(/\bform\.actions\./g, "api.") : "");
const header = (title, slug, comment = "//") => `${comment} ${title} — https://rcube-html.com/${slug === "introduction" ? "" : slug}`;

// ---------------------------------------------------------------- Angular: a standalone component
export const angularCode = (example, { slug, title, wrapperPath = "./rcube-form.component" }) => {
  const name = `${pascal(slug)}Component`;
  const keys = optionKeys(example);
  const bindings = [
    '[schema]="schema"',
    ...(example.buttons ? ['[buttons]="buttons"'] : []),
    ...keys.map((k) => `[${k}]="options.${k}"`),
    ...(has(example.actionsCode) ? ['[actions]="actions"'] : []),
    ...(example.submit ? ['(submitted)="onSubmit($event.entries)"'] : []),
    ...(has(example.onLoadCode) ? ['(ready)="onReady($event.api)"'] : []),
  ];
  // The tutorials' helpers and actions are plain JavaScript (the same code on every framework's page): untyped for a
  // strict TypeScript app. Angular still checks the template against the component's inputs.
  const plainJs = has(example.helpersCode) || has(example.elementCode) || has(example.actionsCode) || has(example.onLoadCode);
  const lines = [
    ...(plainJs ? ["// @ts-nocheck — the example's actions and helpers are plain JavaScript; give them types in your own code"] : []),
    header(title, slug),
    'import { Component } from "@angular/core";',
    `import { RcubeFormComponent } from "${wrapperPath}";`,
    ...partsOf(example).map((p) => `import "rcube-html/element/${p}";`),
    ...bundlerImports(example),
    "",
    ...moduleCode(example),
    `const schema = ${json(example.schema)};`,
    "",
    ...(example.buttons ? [`const buttons = ${json(example.buttons)};`, ""] : []),
    "@Component({",
    `  selector: "app-${slug}",`,
    "  standalone: true,",
    "  imports: [RcubeFormComponent],",
    "  template: `<rcube-html-form",
    ...bindings.map((b) => `    ${b}`),
    "  ></rcube-html-form>`,",
    "})",
    `export class ${name} {`,
    "  schema = schema;",
    ...(example.buttons ? ["  buttons = buttons;"] : []),
    ...(keys.length ? ["  options = {", indent(example.optionsCode.trim(), 4), "  };"] : []),
    ...(has(example.actionsCode) ? [
      "  // the actions the schema names, e.g. \"onClick\": \"save()\"",
      "  actions = (api: any): Record<string, (...args: any[]) => any> => ({",
      indent(example.actionsCode.trim(), 4),
      "  });",
    ] : []),
    ...(has(example.onLoadCode) ? ["  // once, when the form is on the page", "  onReady(api: any) {", indent(onLoadBody(example), 4), "  }"] : []),
    ...(example.submit ? ["  onSubmit(entries: unknown[]) {", '    console.log("Submitted:", entries);', "  }"] : []),
    "}",
  ];
  return lines.join("\n");
};

// ---------------------------------------------------------------- Vue 3: a single-file component
export const vueCode = (example, { slug, title }) => {
  const keys = optionKeys(example);
  const attrs = [
    ':schema="schema"',
    ...(example.buttons ? [':buttons="buttons"'] : []),
    ...(keys.length ? ['v-bind="options"'] : []),
    ...(has(example.actionsCode) ? [':actions="actions"'] : []),
    ...(example.submit ? ['@submit="onSubmit"'] : []),
    ...(has(example.onLoadCode) ? ['@ready="onReady"'] : []),
  ];
  const lines = [
    header(title, slug, "<!--").concat(" -->"),
    "<script setup>",
    'import { RcubeForm } from "rcube-html/vue";',
    ...partsOf(example).map((p) => `import "rcube-html/element/${p}";`),
    ...bundlerImports(example),
    "",
    ...moduleCode(example),
    `const schema = ${json(example.schema)};`,
    ...(example.buttons ? ["", `const buttons = ${json(example.buttons)};`] : []),
    ...(keys.length ? ["", "const options = {", indent(example.optionsCode.trim(), 2), "};"] : []),
    ...(has(example.actionsCode) ? [
      "",
      "// the actions the schema names, e.g. \"onClick\": \"save()\"",
      "const actions = (api) => ({",
      indent(example.actionsCode.trim(), 2),
      "});",
    ] : []),
    ...(has(example.onLoadCode) ? ["", "// once, when the form is on the page", "const onReady = ({ api }) => {", indent(onLoadBody(example), 2), "};"] : []),
    ...(example.submit ? ["", 'const onSubmit = ({ entries }) => console.log("Submitted:", entries);'] : []),
    "</script>",
    "",
    "<template>",
    `  <RcubeForm ${attrs.join(" ")} />`,
    "</template>",
  ];
  // "</script" in a schema's text would end <script setup>: written <\/script inside it
  const code = lines.join("\n");
  const open = code.indexOf("<script setup>\n") + "<script setup>\n".length;
  const close = code.lastIndexOf("\n</script>");
  return code.slice(0, open) + inlineSafe(code.slice(open, close)) + code.slice(close);
};

// Inside an inline <script>, "</script" (in a schema's text, say) would end it: written <\/script (the same string in JS)
const inlineSafe = (code) => code.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

// The page script shared by HTML and JSP: helpers, components and the form's options
const scriptBody = (example) => [
  ...scriptImports(example),
  ...(scriptImports(example).length ? [""] : []),
  ...moduleCode(example),
];
const actionsOption = (example) => (has(example.actionsCode) ? [
  "// the actions the schema names, e.g. \"onClick\": \"save()\"",
  "actions: (api) => ({",
  indent(example.actionsCode.trim(), 2),
  "}),",
] : []);
const scriptFile = (example) => (partsOf(example).length || example.elementCode || /RcubeHtml\.lang/.test(scriptImports(example).join("\n")) ? "rcube-html.js" : "rcube-html.core.js");

// ---------------------------------------------------------------- plain HTML: one page, the script, mount()
export const htmlCode = (example, { slug, title, scriptBase = CDN }) => {
  const options = [
    "schema,",
    ...(example.buttons ? ["buttons,"] : []),
    ...(has(example.optionsCode) ? [example.optionsCode.trim()] : []),
    ...actionsOption(example),
    ...(example.submit ? ['onSubmit: ({ entries }) => console.log("Submitted:", entries),'] : []),
    ...(has(example.onLoadCode) ? ["// once, when the form is on the page", "onReady: ({ api }) => {", indent(onLoadBody(example), 2), "},"] : []),
  ];
  const script = [
    ...scriptBody(example),
    `const schema = ${json(example.schema)};`,
    ...(example.buttons ? ["", `const buttons = ${json(example.buttons)};`] : []),
    "",
    'RcubeHtml.mount("#example", {',
    indent(options.join("\n"), 2),
    "});",
  ];
  return [
    "<!doctype html>",
    header(title, slug, "<!--").concat(" -->"),
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${title} — rcube-html</title>`,
    "</head>",
    '<body style="margin: 0">',
    '  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">',
    `    <h1 style="font: 600 1.5rem system-ui, sans-serif">${title}</h1>`,
    '    <div id="example">Loading…</div>',
    "  </main>",
    `  <script src="${scriptBase}/${scriptFile(example)}"></script>`,
    "  <script>",
    indent(inlineSafe(script.join("\n")), 4),
    "  </script>",
    "</body>",
    "</html>",
  ].join("\n");
};

// ---------------------------------------------------------------- JSP: the schema as JSON on the server, the tag, a script
// JSP reads ${…} and #{…} in the page as its own expressions: in the JavaScript they are written \${…} / \#{…}
const jspSafe = (code) => code.replace(/\$\{/g, "\\${").replace(/#\{/g, "\\#{");
export const jspSchemaJson = (example) => json(example.buttons ? { schema: example.schema, buttons: example.buttons } : example.schema);
export const jspCode = (example, { slug, title, scriptPath = "${pageContext.request.contextPath}/static/rcube-html" }) => {
  const script = [
    ...scriptBody(example),
    'const form = document.getElementById("example");',
    ...(has(example.optionsCode) || has(example.actionsCode) ? [
      "Object.assign(form, {",
      indent([...(has(example.optionsCode) ? [example.optionsCode.trim()] : []), ...actionsOption(example)].join("\n"), 2),
      "});",
    ] : []),
    ...(example.submit ? ['form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));'] : []),
    ...(has(example.onLoadCode) ? ["// once, when the form is on the page", "form.ready.then((api) => {", indent(onLoadBody(example), 2), "});"] : []),
  ];
  return [
    `<%-- ${title} — https://rcube-html.com/${slug === "introduction" ? "" : slug}`,
    `     The schema is in WEB-INF/schemas/${slug}.json (the Schema tab). --%>`,
    '<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>',
    '<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>',
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${title} — rcube-html</title>`,
    "</head>",
    '<body style="margin: 0">',
    '  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">',
    `    <h1 style="font: 600 1.5rem system-ui, sans-serif">${title}</h1>`,
    `    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/${slug}.json">`,
    "      <p>Loading…</p>",
    "    </rc:rcube-form>",
    "  </main>",
    `  <script src="${scriptPath}/${scriptFile(example)}"></script>`,
    "  <script>",
    indent(jspSafe(inlineSafe(script.join("\n"))), 4),
    "  </script>",
    "</body>",
    "</html>",
  ].join("\n");
};

/**
 * The files of one example for a framework: [{ name, code }]. The first is the "Full page".
 *   react    page.js
 *   angular  <slug>.component.ts
 *   vue      <Name>.vue
 *   html     <slug>.html
 *   jsp      <slug>.jsp, WEB-INF/schemas/<slug>.json
 */
export const frameworkFiles = (framework, example, meta) => {
  const { slug } = meta;
  if (framework === "angular") return [{ name: `${slug}.component.ts`, code: angularCode(example, meta) }];
  if (framework === "vue") return [{ name: `${pascal(slug)}.vue`, code: vueCode(example, meta) }];
  if (framework === "html") return [{ name: `${slug}.html`, code: htmlCode(example, meta) }];
  if (framework === "jsp") return [{ name: `${slug}.jsp`, code: jspCode(example, meta) }, { name: `WEB-INF/schemas/${slug}.json`, code: jspSchemaJson(example) }];
  return [{ name: "page.js", code: pageCode(example) }];
};
