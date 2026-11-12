// Builds the starter app twice: public/downloads/rcube-html-starter.zip (served by the site) and the folder
// starter-app/ (committed, so it can be fetched from GitHub). Runs before `npm run dev` and `npm run build`
// (predev / prebuild), or on its own: `npm run starter`.
//
// The zip holds one folder, rcube-html-starter/:
//   starter/ (hand-written: README, layout, home page, styles, next.config.js, gitignore -> .gitignore)
//   package.json             the same next / react / rcube-html versions as this site
//   app/examples.js          the tutorials' titles (the home page's list)
//   app/examples/<slug>/page.js   each tutorial's "Full page.js" (src/tutorials/pageCode.js — the code the site shows)
//   app/my-page/page.js      the Introduction's form, to start changing
//
//   node scripts/build-starter.mjs [--dir <folder>]   --dir also writes the files there (to try them without unzipping)
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { zipFiles } from "./zip.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NAME = "rcube-html-starter";

// The tutorials are written for the bundler (imports without ".js"): let Node resolve them the same way
register("./esm-loader.mjs", import.meta.url);
const { examples } = await import(pathToFileURL(path.join(root, "src/tutorials/examples/index.js")).href);
const { groups, topics } = await import(pathToFileURL(path.join(root, "src/tutorials/topics.js")).href);
const { pageCode } = await import(pathToFileURL(path.join(root, "src/tutorials/pageCode.js")).href);

const files = new Map(); // path in the app -> text

// ---- the hand-written files
const starterDir = path.join(root, "starter");
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const full = path.join(dir, name);
  return statSync(full).isDirectory() ? walk(full) : [full];
});
for (const full of walk(starterDir)) {
  const rel = path.relative(starterDir, full).split(path.sep).join("/");
  files.set(rel === "gitignore" ? ".gitignore" : rel, readFileSync(full, "utf8").replace(/\r\n/g, "\n"));
}

// ---- package.json: this site's versions
const site = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const rcubeHtml = JSON.parse(readFileSync(path.join(root, "node_modules/rcube-html/package.json"), "utf8")).version;
files.set("package.json", `${JSON.stringify({
  name: NAME,
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

// ---- write the zip (and the folder, with --dir)
const outFile = path.join(root, "public/downloads", `${NAME}.zip`);
mkdirSync(path.dirname(outFile), { recursive: true });
const entries = [...files].sort(([a], [b]) => a.localeCompare(b)).map(([name, text]) => ({ name: `${NAME}/${name}`, data: Buffer.from(text, "utf8") }));
writeFileSync(outFile, zipFiles(entries));

const writeDir = (target) => {
  for (const [name, text] of files) {
    mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
    writeFileSync(path.join(target, name), text);
  }
};

// starter-app/: the same app as a folder, committed to GitHub, so people can get it without the zip
// (git sparse checkout or npx degit — see the README). Made fresh each time: never edit it by hand, edit starter/.
const appDir = path.join(root, "starter-app");
rmSync(appDir, { recursive: true, force: true });
writeDir(appDir);
console.log(`[starter] ${path.relative(root, appDir)}/: the same files, for GitHub`);

const dirFlag = process.argv.indexOf("--dir");
if (dirFlag > 0 && process.argv[dirFlag + 1]) {
  const target = path.resolve(process.argv[dirFlag + 1]);
  writeDir(target);
  console.log(`[starter] also written to ${target}`);
}
console.log(`[starter] ${path.relative(root, outFile)}: ${files.size} files, ${list.length} examples, ${(statSync(outFile).size / 1024).toFixed(0)} KB`);
