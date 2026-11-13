// Checks the framework code of every tutorial (src/tutorials/frameworkCode.js): `npm run check:frameworks`.
//   - HTML / JS: each page runs in jsdom with the library's <script> (node_modules/rcube-html/dist/browser): the form is
//     drawn, the page script has no errors, onLoad code runs
//   - JSP: the page as the tag would write it (the JSON from WEB-INF/schemas, the \${…} escapes read back) runs too
//   - Angular / Vue: the code is made for each one (their builds check them: starter-angular, starter-vue)
// Needs jsdom, which rcube-html's own tests install: run from this repository next to ../rcube-html, or install jsdom.
import { readFileSync } from "node:fs";
import { createRequire, register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
register("./esm-loader.mjs", import.meta.url);
const { examples } = await import(pathToFileURL(path.join(root, "src/tutorials/examples/index.js")).href);
const { topics } = await import(pathToFileURL(path.join(root, "src/tutorials/topics.js")).href);
const fw = await import(pathToFileURL(path.join(root, "src/tutorials/frameworkCode.js")).href);

let JSDOM;
try {
  ({ JSDOM } = createRequire(import.meta.url)("jsdom"));
} catch {
  ({ JSDOM } = createRequire(path.join(root, "../rcube-html/package.json"))("jsdom"));
}
const browserDir = path.join(root, "node_modules/rcube-html/dist/browser");
const libScript = (file) => readFileSync(path.join(browserDir, file), "utf8");
const tick = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// errors in a page's promises (el.ready.then(…)) belong to the page being run
let pageErrors = [];
process.on("unhandledRejection", (error) => pageErrors.push(`${error?.name}: ${error?.message}`));

// Runs a page: its <script src> from node_modules, its inline scripts in order; returns the window and the errors
const runPage = async (html) => {
  const errors = [];
  pageErrors = errors;
  const dom = new JSDOM(html.replace(/<script src="[^"]*\/(rcube-html(?:\.core)?\.js)"><\/script>/, '<script data-lib="$1"></script>'), {
    runScripts: "outside-only", pretendToBeVisual: true, url: "http://localhost/",
  });
  const { window } = dom;
  window.addEventListener("error", (e) => errors.push(e.message));
  window.console.error = (...args) => errors.push(args.map(String).join(" "));
  window.fetch = async () => ({ ok: true, json: async () => ({}) });
  for (const script of [...window.document.querySelectorAll("script")]) {
    if (script.type === "application/json") continue;
    try {
      window.eval(script.dataset.lib ? libScript(script.dataset.lib) : script.textContent);
    } catch (error) {
      errors.push(`${error.name}: ${error.message}`);
    }
  }
  await tick(150);
  return { window, errors };
};

const failures = [];
const list = topics.filter((t) => examples[t.slug]);
for (const { slug, title } of list) {
  const example = examples[slug];
  const meta = { slug, title };
  // every framework's code can be made
  for (const { key } of fw.FRAMEWORKS) fw.frameworkFiles(key, example, meta);

  // HTML
  const html = fw.htmlCode(example, meta);
  const page = await runPage(html);
  const form = page.window.document.querySelector("#example rcube-form");
  const drawn = form?.querySelector("[data-rcube-root]")?.children.length > 0;
  // a component the page didn't load or register shows a message in its place
  const missing = /isn't loaded: add import|Component "[^"]*" not found/.exec(form?.textContent || "");
  if (missing) page.errors.push(`a component is missing: ${missing[0]}`);
  if (!drawn || page.errors.length) failures.push(`${slug} (HTML): ${!drawn ? "form not drawn; " : ""}${page.errors.join(" | ")}`);
  page.window.close();

  // JSP: what the tag writes (config JSON) and the page script with its \${ escapes read back as JSP would
  const jsp = fw.jspCode(example, meta)
    .replace(/^<%--[\s\S]*?--%>\n/, "")
    .replace(/<%@[^%]*%>\n/g, "")
    .replace(/<rc:rcube-form id="example" schemaFile="[^"]+">/, `<rcube-form id="example"><script type="application/json" data-rcube="config">${fw.jspSchemaJson(example).replace(/<\//g, "<\\/")}</script>`)
    .replace("</rc:rcube-form>", "</rcube-form>")
    .replace(/\$\{pageContext\.request\.contextPath\}/g, "")
    .replace(/\\\$\{/g, "${").replace(/\\#\{/g, "#{");
  const jspPage = await runPage(jsp);
  const jspForm = jspPage.window.document.querySelector("rcube-form#example");
  const jspDrawn = jspForm?.querySelector("[data-rcube-root]")?.children.length > 0;
  if (/isn't loaded: add import|Component "[^"]*" not found/.test(jspForm?.textContent || "")) jspPage.errors.push("a component is missing");
  if (!jspDrawn || jspPage.errors.length) failures.push(`${slug} (JSP): ${!jspDrawn ? "form not drawn; " : ""}${jspPage.errors.join(" | ")}`);
  jspPage.window.close();
}

if (failures.length) {
  console.error(`[frameworks] ${failures.length} problem(s):\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`[frameworks] ${list.length} examples: HTML and JSP pages run; Angular, Vue and React code made`);
process.exit(0);
