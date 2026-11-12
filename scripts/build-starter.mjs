// Fills in the starter app in starter/: a Next.js app with every example, committed to GitHub so people can copy the
// folder and run it (see the README). Runs before `npm run dev` and `npm run build` (predev / prebuild), or on its
// own: `npm run starter`.
//
// starter/ has two kinds of files:
//   hand-written (edit these): README.md, .gitignore, next.config.js, app/layout.js, app/page.js, app/globals.css,
//                              app/ClientOnly.js
//   made here (never edit them by hand, they are rewritten each time):
//     package.json                  the same next / react / rcube-html versions as this site
//     app/examples.js               the tutorials' titles (the home page's list)
//     app/examples/<slug>/page.js   each tutorial's "Full page.js" (src/tutorials/pageCode.js — the code the site shows)
//     app/my-page/page.js           the Introduction's form, to start changing
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const starterDir = path.join(root, "starter");

// The tutorials are written for the bundler (imports without ".js"): let Node resolve them the same way
register("./esm-loader.mjs", import.meta.url);
const { examples } = await import(pathToFileURL(path.join(root, "src/tutorials/examples/index.js")).href);
const { groups, topics } = await import(pathToFileURL(path.join(root, "src/tutorials/topics.js")).href);
const { pageCode } = await import(pathToFileURL(path.join(root, "src/tutorials/pageCode.js")).href);

const files = new Map(); // path in starter/ -> text

// ---- package.json: this site's versions
const site = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const rcubeHtml = JSON.parse(readFileSync(path.join(root, "node_modules/rcube-html/package.json"), "utf8")).version;
files.set("package.json", `${JSON.stringify({
  name: "rcube-html-starter",
  version: "0.1.0",
  private: true,
  description: "Every rcube-html example as a Next.js app: npm install, then npm run dev.",
  scripts: { dev: "next dev", build: "next build", start: "next start" },
  dependencies: { next: site.dependencies.next, react: site.dependencies.react, "react-dom": site.dependencies["react-dom"], "rcube-html": `^${rcubeHtml}` },
  engines: site.engines,
}, null, 2)}\n`);

// ---- one page per tutorial, and the list for the home page
// The tutorial's Full page.js, its component drawn in the browser only (app/ClientOnly.js): buttons in server-sent
// HTML do nothing until the page's JavaScript has loaded, so the form appears once it works
const browserOnly = (code, clientOnlyPath, title) => {
  const marker = "export default function Page() {";
  if (!code.includes(marker)) throw new Error(`build-starter: ${title}: no "${marker}" in its page code`);
  return `${code.replace(marker, "function Example() {").replace(/^(import [^\n]+\n)(?!import )/m, `$1import ClientOnly from "${clientOnlyPath}";\n`)}

// Drawn in the browser only, so its buttons work as soon as it appears (see app/ClientOnly.js)
export default function Page() {
  return <ClientOnly><Example /></ClientOnly>;
}
`;
};
const list = topics.filter((t) => examples[t.slug]).map(({ slug, group, title, summary }) => ({ slug, group, title, summary }));
for (const { slug, title } of list) {
  files.set(`app/examples/${slug}/page.js`, `// ${title} — https://rcube-html.com/${slug === "introduction" ? "" : slug}\n${browserOnly(pageCode(examples[slug]), "../../ClientOnly", title)}`);
}
files.set("app/examples.js", `// The examples in app/examples/ (the home page lists them). Made by the rcube-html site's build.\nexport const groups = ${JSON.stringify(groups.filter((g) => list.some((e) => e.group === g)), null, 2)};\n\nexport const examples = ${JSON.stringify(list, null, 2)};\n`);
files.set("app/my-page/page.js", `// My page — change the schema below and save: the browser updates by itself.\n// Every example's code is in app/examples/<name>/page.js; copy what you need from there.\n${browserOnly(pageCode(examples.introduction), "../ClientOnly", "My page")}`);

// ---- write them (the example folders fresh, so a removed tutorial doesn't leave its page behind)
rmSync(path.join(starterDir, "app/examples"), { recursive: true, force: true });
rmSync(path.join(starterDir, "app/my-page"), { recursive: true, force: true });
for (const [name, text] of files) {
  mkdirSync(path.dirname(path.join(starterDir, name)), { recursive: true });
  writeFileSync(path.join(starterDir, name), text);
}
console.log(`[starter] starter/: ${files.size} files made, ${list.length} examples`);
