// Fills in the starters for the other frameworks — starter-angular/, starter-vue/, starter-html/ and starter-jsp/ — with
// every example (the React one, starter/, is made by build-starter.mjs). Runs before `npm run dev` and `npm run build`,
// or on its own: `npm run starters`. Each example's code is the site's (src/tutorials/frameworkCode.js).
//
// In each starter, the files below are made here (never edit them by hand, they are rewritten each time); everything
// else (README.md, the config files, the home page frame) is hand-written:
//   starter-angular/  package.json, src/app/rcube-form.component.ts (from rcube-html), src/app/examples.ts,
//                     src/app/examples/<slug>.component.ts, src/app/my-page.component.ts
//   starter-vue/      package.json, src/examples.js, src/examples/<Name>.vue, src/MyPage.vue
//   starter-html/     index.html, examples/<slug>.html, my-page.html, rcube-html/*.js (the library's <script> files)
//   starter-jsp/      src/main/webapp/: index.jsp, examples/<slug>.jsp, my-page.jsp, WEB-INF/schemas/<slug>.json,
//                     WEB-INF/tags/rcube/rcube-form.tag (from rcube-html), static/rcube-html/*.js
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
register("./esm-loader.mjs", import.meta.url);
const { examples } = await import(pathToFileURL(path.join(root, "src/tutorials/examples/index.js")).href);
const { groups, topics } = await import(pathToFileURL(path.join(root, "src/tutorials/topics.js")).href);
const fw = await import(pathToFileURL(path.join(root, "src/tutorials/frameworkCode.js")).href);
const { packageKeywords } = await import(pathToFileURL(path.join(root, "src/tutorials/tags.js")).href);
// package.json keywords of every starter, plus its framework's
const starterTags = (...more) => ["rcube-html", "starter", "sample application", "simple application", "examples", "dynamic forms", "dynamic content", "JSON forms", "data table", "charts", "calendar", "tree view", "file upload", ...more].concat(more);
const starterKeywords = (...more) => packageKeywords(starterTags(...more));

const lib = path.join(root, "node_modules/rcube-html");
const version = JSON.parse(readFileSync(path.join(lib, "package.json"), "utf8")).version;
const list = topics.filter((t) => examples[t.slug]).map(({ slug, group, title, summary }) => ({ slug, group, title, summary }));
const usedGroups = groups.filter((g) => list.some((e) => e.group === g));
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const escapeHtml = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const generated = "Made by the rcube-html site's build (scripts/build-starters.mjs): don't edit by hand.";
const myPage = { slug: "introduction", title: "My page" };

const write = (dir, files, fresh = []) => {
  for (const name of fresh) rmSync(path.join(root, dir, name), { recursive: true, force: true });
  for (const [name, content] of files) {
    const file = path.join(root, dir, name);
    mkdirSync(path.dirname(file), { recursive: true });
    if (content instanceof Buffer) writeFileSync(file, content);
    else writeFileSync(file, content);
  }
  console.log(`[starters] ${dir}/: ${files.size} files made, ${list.length} examples`);
};
const copy = (from) => readFileSync(path.join(lib, from));

// ---------------------------------------------------------------- Angular
{
  const files = new Map();
  files.set("package.json", json({
    name: "rcube-html-starter-angular",
    version: "0.1.0",
    private: true,
    description: "Every rcube-html example as an Angular app: npm install, then npm start.",
    keywords: starterKeywords("Angular", "Angular forms", "web component"),
    scripts: { start: "ng serve", build: "ng build" },
    dependencies: {
      "@angular/common": "^21.2.0", "@angular/compiler": "^21.2.0", "@angular/core": "^21.2.0", "@angular/forms": "^21.2.0",
      "@angular/platform-browser": "^21.2.0", "@angular/router": "^21.2.0", "rcube-html": `^${version}`, rxjs: "~7.8.0", tslib: "^2.8.0",
    },
    devDependencies: { "@angular/build": "^21.2.0", "@angular/cli": "^21.2.0", "@angular/compiler-cli": "^21.2.0", typescript: "~5.9.0" },
  }));
  files.set("src/app/rcube-form.component.ts", copy("integrations/angular/rcube-form.component.ts"));
  for (const { slug, title } of list) files.set(`src/app/examples/${slug}.component.ts`, fw.angularCode(examples[slug], { slug, title, wrapperPath: "../rcube-form.component" }));
  files.set("src/app/my-page.component.ts", `// My page — change the schema below and save: the browser updates by itself.\n${fw.angularCode(examples.introduction, { ...myPage, wrapperPath: "./rcube-form.component" })
    .replace("IntroductionComponent", "MyPageComponent").replace('selector: "app-introduction"', 'selector: "app-my-page"')}\n`);
  files.set("src/app/examples.ts", [
    `// The examples in src/app/examples/ (the home page lists them). ${generated}`,
    'import { Routes } from "@angular/router";',
    "",
    `export const groups: string[] = ${JSON.stringify(usedGroups, null, 2)};`,
    "",
    `export const examples: { slug: string; group: string; title: string; summary: string }[] = ${JSON.stringify(list, null, 2)};`,
    "",
    "// one route per example, each loaded when it's opened",
    "export const exampleRoutes: Routes = [",
    ...list.map(({ slug }) => `  { path: "${slug}", loadComponent: () => import("./examples/${slug}.component").then((m) => m.${fw.pascal(slug)}Component) },`),
    "];",
    "",
  ].join("\n"));
  write("starter-angular", files, ["src/app/examples"]);
}

// ---------------------------------------------------------------- Vue
{
  const files = new Map();
  files.set("package.json", json({
    name: "rcube-html-starter-vue",
    version: "0.1.0",
    private: true,
    type: "module",
    description: "Every rcube-html example as a Vue 3 app: npm install, then npm run dev.",
    keywords: starterKeywords("Vue", "Vue 3", "Vite", "web component"),
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { "rcube-html": `^${version}`, vue: "^3.5.0" },
    devDependencies: { "@vitejs/plugin-vue": "^6.0.0", vite: "^8.0.0" },
  }));
  for (const { slug, title } of list) files.set(`src/examples/${fw.pascal(slug)}.vue`, `${fw.vueCode(examples[slug], { slug, title })}\n`);
  files.set("src/MyPage.vue", `<!-- My page — change the schema below and save: the browser updates by itself. -->\n${fw.vueCode(examples.introduction, myPage)}\n`);
  files.set("src/examples.js", [
    `// The examples in src/examples/ (the home page lists them). ${generated}`,
    'import { defineAsyncComponent } from "vue";',
    "",
    `export const groups = ${JSON.stringify(usedGroups, null, 2)};`,
    "",
    "// each loaded when it's opened",
    "export const examples = [",
    ...list.map((e) => `  { ...${JSON.stringify(e)}, component: defineAsyncComponent(() => import("./examples/${fw.pascal(e.slug)}.vue")) },`),
    "];",
    "",
  ].join("\n"));
  write("starter-vue", files, ["src/examples"]);
}

// ---------------------------------------------------------------- plain HTML (no build, no server: open index.html)
{
  const files = new Map();
  for (const file of ["rcube-html.js", "rcube-html.core.js"]) files.set(`rcube-html/${file}`, copy(`dist/browser/${file}`));
  for (const { slug, title } of list) files.set(`examples/${slug}.html`, `${fw.htmlCode(examples[slug], { slug, title, scriptBase: "../rcube-html" })}\n`);
  files.set("my-page.html", `${fw.htmlCode(examples.introduction, { ...myPage, scriptBase: "rcube-html" }).replace("<!doctype html>", "<!doctype html>\n<!-- My page — change the schema below, save and reload the page. -->")}\n`);
  const items = (group) => list.filter((e) => e.group === group).map((e) => `      <li><a href="examples/${e.slug}.html">${escapeHtml(e.title)}</a> — ${escapeHtml(e.summary)}</li>`).join("\n");
  files.set("index.html", `<!doctype html>
<!-- ${generated} -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>rcube-html examples (HTML)</title>
  <meta name="description" content="Every rcube-html example as a plain HTML and JavaScript page: dynamic forms, dynamic content, data tables, charts, calendar, tree and file upload from JSON.">
  <meta name="keywords" content="${starterTags("plain HTML", "JavaScript", "CDN").join(", ")}">
</head>
<body style="margin: 0; font-family: system-ui, sans-serif">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1>rcube-html examples</h1>
    <p>Every example from <a href="https://rcube-html.com/">rcube-html.com</a> as a plain HTML page — no build, no server.
      Start with <a href="my-page.html">My page</a>, then change any <code>examples/&lt;name&gt;.html</code>.</p>
${usedGroups.map((g) => `    <h2 style="font-size: 1.1rem; margin-top: 1.5rem">${escapeHtml(g)}</h2>\n    <ul>\n${items(g)}\n    </ul>`).join("\n")}
  </main>
</body>
</html>
`);
  write("starter-html", files, ["examples", "rcube-html"]);
}

// ---------------------------------------------------------------- JSP (Maven web app)
{
  const files = new Map();
  const web = "src/main/webapp";
  for (const file of ["rcube-html.js", "rcube-html.core.js"]) files.set(`${web}/static/rcube-html/${file}`, copy(`dist/browser/${file}`));
  files.set(`${web}/WEB-INF/tags/rcube/rcube-form.tag`, copy("integrations/jsp/rcube-form.tag"));
  for (const { slug, title } of list) {
    files.set(`${web}/examples/${slug}.jsp`, `${fw.jspCode(examples[slug], { slug, title })}\n`);
    files.set(`${web}/WEB-INF/schemas/${slug}.json`, `${fw.jspSchemaJson(examples[slug])}\n`);
  }
  files.set(`${web}/my-page.jsp`, `${fw.jspCode(examples.introduction, { ...myPage, slug: "my-page" })}\n`.replace("<%-- My page — https://rcube-html.com/my-page", "<%-- My page — change WEB-INF/schemas/my-page.json and reload the page."));
  files.set(`${web}/WEB-INF/schemas/my-page.json`, `${fw.jspSchemaJson(examples.introduction)}\n`);
  const items = (group) => list.filter((e) => e.group === group).map((e) => `      <li><a href="examples/${e.slug}.jsp">${escapeHtml(e.title)}</a> — ${escapeHtml(e.summary)}</li>`).join("\n");
  files.set(`${web}/index.jsp`, `<%-- ${generated} --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>rcube-html examples (JSP)</title>
  <meta name="description" content="Every rcube-html example as a JSP page: dynamic forms, dynamic content, data tables, charts, calendar, tree and file upload from JSON.">
  <meta name="keywords" content="${starterTags("JSP", "Java", "Maven", "JSP tag").join(", ")}">
</head>
<body style="margin: 0; font-family: system-ui, sans-serif">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1>rcube-html examples</h1>
    <p>Every example from <a href="https://rcube-html.com/">rcube-html.com</a> as a JSP page: the schema in
      <code>WEB-INF/schemas/&lt;name&gt;.json</code>, the page in <code>examples/&lt;name&gt;.jsp</code>. Start with
      <a href="my-page.jsp">My page</a>.</p>
${usedGroups.map((g) => `    <h2 style="font-size: 1.1rem; margin-top: 1.5rem">${escapeHtml(g)}</h2>\n    <ul>\n${items(g)}\n    </ul>`).join("\n")}
  </main>
</body>
</html>
`);
  write("starter-jsp", files, [`${web}/examples`, `${web}/WEB-INF/schemas`, `${web}/static`]);
}
