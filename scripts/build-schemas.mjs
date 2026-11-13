// Writes every tutorial's schema to schema/<slug>.js: one commented module per example, with
//   - a header: what the example is, its live page, what it covers, its form fields and the actions it calls,
//   - the schema (and buttons, options) as exports,
//   - its actions, each with a comment saying which element and event run it,
//   - the helpers they use (a mock API, data, ...) and, where the page loads something first, onLoad(form).
// Plus schema/index.js (all of them by slug) and schema/README.md. Never edit schema/ by hand: it is made fresh before
// every `npm run dev` and `npm run build` (predev / prebuild), or on its own: `npm run schemas`.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "schema");

// The tutorials are written for the bundler (imports without ".js"): let Node resolve them the same way
register("./esm-loader.mjs", import.meta.url);
const { examples } = await import(pathToFileURL(path.join(root, "src/tutorials/examples/index.js")).href);
const { topics } = await import(pathToFileURL(path.join(root, "src/tutorials/topics.js")).href);

const indent = (text, spaces) => text.split("\n").map((line) => (line ? " ".repeat(spaces) + line : line)).join("\n");
const plain = (text) => String(text).replace(/`/g, "").replace(/\s+/g, " ").trim();
const camel = (slug) => slug.replace(/-(\w)/g, (_, c) => c.toUpperCase());
// a comment block, wrapped at ~110 characters
const comment = (lines, prefix = "// ") => lines.flatMap((line) => {
  if (!line) return [prefix.trimEnd()];
  const out = [];
  let rest = line;
  while (rest.length > 110) {
    const cut = rest.lastIndexOf(" ", 110);
    if (cut <= 0) break;
    out.push(rest.slice(0, cut));
    rest = `   ${rest.slice(cut + 1)}`;
  }
  return [...out, rest].map((l) => prefix + l);
}).join("\n");

// every node of a schema: children, and nodes held anywhere else (tab panes in props, a modal's footer, ...)
const nodesIn = (value) => {
  if (Array.isArray(value)) return value.flatMap(nodesIn);
  if (!value || typeof value !== "object") return [];
  if (value.type && value.id) return [value];
  return Object.values(value).flatMap(nodesIn);
};
const walk = (nodes, visit) => (nodes || []).forEach((node) => {
  if (!node || typeof node !== "object") return;
  visit(node);
  // children, a modal's footer, nodes in props, ...: every node held anywhere inside this one
  const { type, id, ...rest } = node;
  walk(nodesIn(rest), visit);
});

// "name()" or "name(arg)" in a prop -> the action it runs
const ACTION = /^([A-Za-z_$][\w$]*)\((.*)\)$/;
const actionCalls = (nodes) => {
  const calls = new Map(); // action -> ["Button \"fill\" (onClick)", ...]
  // look through the props deeply: actions also sit in lists (a table's row actions, a menu's items, a dialog's buttons)
  const scan = (node, value, trail) => {
    if (typeof value === "string") {
      const m = ACTION.exec(value.trim());
      if (!m) return;
      const where = `${node.type} "${node.id}" (${trail.join(" › ")}${m[2] ? `, with ${m[2]}` : ""})`;
      if (!(calls.get(m[1]) || []).includes(where)) calls.set(m[1], [...(calls.get(m[1]) || []), where]);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        // a nested node is reported on its own (walk visits it)
        if (item && typeof item === "object" && item.type && item.id) return;
        const name = item && typeof item === "object" && (item.key || item.id || item.label || item.text);
        scan(node, item, name ? [...trail, `"${plain(name)}"`] : trail);
      });
    } else if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, v]) => key !== "children" && scan(node, v, [...trail, key]));
    }
  };
  walk(nodes, (node) => scan(node, node.props || {}, []));
  return calls;
};

// the form fields: name, type, label, required
const fieldsOf = (nodes) => {
  const fields = [];
  walk(nodes, (node) => {
    const p = node.props || {};
    if (!p.name) return;
    const extra = [p.required && "required", p.pattern && "pattern", p.min !== undefined && `min ${p.min}`, p.max !== undefined && `max ${p.max}`].filter(Boolean);
    fields.push(`${p.name} — ${node.type}${p.label ? ` "${plain(p.label)}"` : ""}${extra.length ? ` (${extra.join(", ")})` : ""}`);
  });
  return fields;
};

// actionsCode: one "name: (...) => ..." per action, each starting at column 0 -> add a comment above each one
const BUILT_IN = ["clearForm", "resetForm", "runValidation", "submitForm"];
const commentActions = (code, calls, onLoadCode = "") => code.trim().split("\n").map((line) => {
  const m = /^([A-Za-z_$][\w$]*)\s*:/.exec(line);
  if (!m) return line;
  const by = calls.get(m[1]);
  const when = by ? `run by ${by.join("; ")}`
    : new RegExp(`\\b${m[1]}\\(`).test(onLoadCode) ? "run once when the page opens (see onLoad below)"
    : new RegExp(`\\b${m[1]}\\(`).test(code.replace(line, "")) ? "called by the other actions here"
    : "called from a component or the page (no element names it in the schema)";
  return `// ${m[1]}: ${when}\n${line}`;
}).join("\n");

const list = topics.filter((t) => examples[t.slug]);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const topic of list) {
  const ex = examples[topic.slug];
  const nodes = [...(ex.schema || []), ...(ex.buttons || [])];
  const calls = actionCalls(nodes);
  const defined = [...(ex.actionsCode || "").matchAll(/^([A-Za-z_$][\w$]*)\s*:/gm)].map((m) => m[1]);
  const builtIns = [...calls.keys()].filter((name) => !defined.includes(name));
  const fields = fieldsOf(nodes);
  const covers = (ex.sections || []).map((s) => plain(s.heading));

  const header = comment([
    `${topic.title} — ${plain(topic.summary)}`,
    `Live example and explanation: https://rcube-html.com/${topic.slug === "introduction" ? "" : topic.slug}`,
    `Group: ${topic.group}`,
    "",
    ...(covers.length ? ["Covers:", ...covers.map((h) => `  - ${h}`), ""] : []),
    ...(fields.length ? ["Form fields (name — type, label):", ...fields.map((f) => `  - ${f}`), ""] : ["No form fields: it shows content, layout or data.", ""]),
    ...(defined.length ? [`Actions written here: ${defined.join(", ")}`] : ["No actions of its own."]),
    ...(builtIns.length ? [`Built-in actions it uses: ${builtIns.map((b) => `${b}()${BUILT_IN.includes(b) ? "" : " (from the library or the page)"}`).join(", ")}`] : []),
    "",
    "Use it in a client component (\"use client\"):",
    `  import { schema${ex.buttons ? ", buttons" : ""}${ex.optionsCode ? ", options" : ""}${ex.actionsCode?.trim() ? ", actions" : ""}${ex.onLoadCode ? ", onLoad" : ""} } from "<path>/schema/${topic.slug}";`,
    `  const form = useDynamicTag({ schema${ex.buttons ? ", buttons" : ""}${ex.optionsCode ? ", ...options" : ""}${ex.actionsCode?.trim() ? ", actions" : ""} });`,
    ...(ex.onLoadCode ? ["  useEffect(() => onLoad(form), []);"] : []),
    "  return <DynamicTag form={form} />;",
    "",
    "Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.",
  ]);

  const parts = [header, ""];
  if (ex.imports) parts.push(ex.imports.trim(), "");
  if (ex.pagePreamble) parts.push("// ---- custom components this schema uses", ex.pagePreamble.trim(), "");
  if (ex.helpersCode) {
    parts.push(comment([`Helpers the actions use${ex.helperNames ? ` (${ex.helperNames.join(", ")})` : ""}: in a real app, often your API or data.`]));
    parts.push(ex.helpersCode.trim(), "");
  }
  parts.push(comment(["The schema: the page, as a list of nodes ({ type, id, props, children })."]));
  parts.push(`export const schema = ${JSON.stringify(ex.schema, null, 2)};`, "");
  if (ex.buttons) {
    parts.push(comment(["Buttons drawn once, after the repeatable entries."]), `export const buttons = ${JSON.stringify(ex.buttons, null, 2)};`, "");
  }
  if (ex.optionsCode) {
    parts.push(comment(["More useDynamicTag options (spread them in: useDynamicTag({ schema, ...options, actions }))."]));
    parts.push(`export const options = {\n${indent(ex.optionsCode.trim(), 2)}\n};`, "");
  }
  if (ex.actionsCode?.trim()) {
    parts.push(comment([
      "The actions: the schema names them in its props (\"onClick\": \"fillDemo()\"); `api` reads and changes the form",
      "(setFormData, setNodeProps, getFormData, ...).",
    ]));
    parts.push(`export const actions = (api) => ({\n${indent(commentActions(ex.actionsCode, calls, ex.onLoadCode), 2)}\n});`, "");
  }
  if (ex.onLoadCode) {
    parts.push(comment(["Runs once when the page opens (call it from useEffect)."]));
    parts.push(`export const onLoad = (form) => {\n${indent(ex.onLoadCode.trim(), 2)}\n};`, "");
  }
  writeFileSync(path.join(outDir, `${topic.slug}.js`), parts.join("\n"));
}

// schema/index.js: every schema by slug
writeFileSync(path.join(outDir, "index.js"), [
  "// Every rcube-html example schema, by its tutorial's slug: schemas[\"validation\"].schema, .actions, ...",
  "// Made by scripts/build-schemas.mjs — don't edit by hand.",
  ...list.map((t) => `import * as ${camel(t.slug)} from "./${t.slug}";`),
  "",
  "export const schemas = {",
  ...list.map((t) => `  ${JSON.stringify(t.slug)}: ${camel(t.slug)},`),
  "};",
  "",
].join("\n"));

// schema/README.md: the list
writeFileSync(path.join(outDir, "README.md"), [
  "# rcube-html example schemas",
  "",
  "Every schema used on [rcube-html.com](https://rcube-html.com/), one commented file per tutorial. Each file has a",
  "header (what it shows, its form fields, its actions), then `schema` (and `buttons` / `options`), the `actions` with a",
  "comment on which element runs each one, the helpers they use, and `onLoad` where the page loads something first.",
  "",
  "Generated by `scripts/build-schemas.mjs` from `src/tutorials/examples/` before every `npm run dev` and `npm run build`",
  "(or `npm run schemas`) — edit the tutorials, not these files.",
  "",
  "| File | Group | Example |",
  "|---|---|---|",
  ...list.map((t) => `| [${t.slug}.js](${t.slug}.js) | ${t.group} | ${t.title} — ${plain(t.summary)} |`),
  "",
].join("\n"));

console.log(`[schemas] schema/: ${list.length} schemas + index.js + README.md`);
