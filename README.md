# rcube-html examples

**Examples for rcube-html: An Open-Source, JSON-Driven HTML Page Renderer.**

Tutorials and copy-ready examples for [rcube-html](https://www.npmjs.com/package/rcube-html) — schema-driven React forms, tables, charts, calendar, file upload and trees. It works with any CSS framework (Bootstrap, Tailwind, Clay, your own CSS or none) for building responsive pages.

**Live site: [rcube-html.com](https://rcube-html.com/)**

Every page has:

- a short explanation in simple English,
- a **live example** with an **Events** box that shows each action as it runs and the data it receives,
- the **code**: the schema (JSON), the actions, and a complete `page.js` you can paste into a Next.js app and run as is,
- tables of the options and events used.

The contents on the left are searchable (press `/`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (npx next dev -p 3100 for another port)
npm run build      # static site in out/
npm run preview    # build + serve out/ with the Firebase emulator (http://127.0.0.1:5000)
```

## Run every example on your computer

**[starter/](https://github.com/rcubesystem/rcube-html-examples/tree/main/starter)** is a ready-to-run
Next.js app with every example on its own page, plus `My page` (a form to change and play with). You need Node.js 20
or 22. Get it in one of these ways — none needs a file download, so they also work on work computers that block
downloads:

**With git** (copies only the `starter` folder):

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/rcubesystem/rcube-html-examples.git
cd rcube-html-examples
git sparse-checkout set starter
cd starter
npm install
npm run dev
```

**With npm only** (no git):

```bash
npx degit rcubesystem/rcube-html-examples/starter rcube-html-starter
cd rcube-html-starter
npm install
npm run dev
```

Open http://localhost:3000: the home page links to every example. Change any `app/examples/<name>/page.js` (or
`app/my-page/page.js`) and save: the page updates by itself.

**If GitHub is blocked too**, make the same app yourself:

```bash
npx create-next-app@latest my-rcube-app --js --app --no-src-dir --no-tailwind --yes
cd my-rcube-app
npm install rcube-html
npm run dev
```

1. In `app/layout.js`, add `import "rcube-html/styles.css";` under the other imports.
2. Replace `app/page.js` with any tutorial's **Full page.js** (the Code box on its page) and open http://localhost:3000.
3. More examples: one folder each, e.g. `app/validation/page.js` → http://localhost:3000/validation.

### How the starter app is made

`starter/` has two kinds of files:

- **hand-written** — edit these: `README.md`, `.gitignore`, `next.config.js`, `app/layout.js`, `app/page.js`,
  `app/globals.css`, `app/ClientOnly.js`;
- **made by `scripts/build-starter.mjs`** — never edit these by hand, they are rewritten before every `npm run dev`
  and `npm run build` (or on its own: `npm run starter`): `package.json` (this site's `next`, `react` and
  `rcube-html` versions), `app/examples.js`, `app/examples/<name>/page.js` (each tutorial's **Full page.js**, from
  `src/tutorials/pageCode.js`) and `app/my-page/page.js`.

So the starter always matches the tutorials. Commit `starter/` after changing a tutorial, so GitHub has the latest.

## All the schemas

**[schema/](schema/)** has every schema used on the site, one commented file per tutorial (`schema/validation.js`,
`schema/data-table.js`, …), plus `schema/index.js` (all of them by slug) and a list in `schema/README.md`. Each file
starts with a comment saying what the example shows, its form fields and its actions, then exports:

- `schema` (and `buttons` / `options` where the example has them),
- `actions`, each with a comment saying which element and event run it (e.g. `fillDemo: run by ButtonField "fill" (onClick)`),
- the helpers the actions use (a mock API, data) and `onLoad(form)` where the page loads something first.

```js
import { schema, actions } from "./schema/events-actions";
const form = useDynamicTag({ schema, actions });
```

`scripts/build-schemas.mjs` writes the folder fresh before every `npm run dev` and `npm run build` (or on its own:
`npm run schemas`) from `src/tutorials/examples/`, so don't edit `schema/` by hand. `custom-components.js` contains
JSX (its React components), so it needs a bundler such as Next.js, like any component file.

## Publish

The site is a static export hosted on Firebase Hosting (project `rcube-html`, see `firebase.json` and `.firebaserc`):

```bash
npm run deploy     # next build + firebase deploy --only hosting -> https://rcube-html.com/
```

Needs the Firebase CLI (`npm install -g firebase-tools`) and `firebase login` once.

Uses Next.js 16 (App Router), React 19.3, React-Bootstrap 2.10 and Bootstrap 5.3 — the same versions as salampro.

## Topics

| Group | Pages |
|---|---|
| Getting started | Introduction, Schema basics, Events & actions |
| Text & layout | Text & HTML tags, Change elements at runtime |
| Form fields | Input fields, Selects & dependent selects, Radios / checkboxes / slider / textarea, Validation & submit, Conditional fields, Read & set values, Rich text editor, Repeatable entries |
| Containers | Cards / alerts / tooltips / popovers, Tabs & accordion, Modal & carousel |
| Data components | Data table, Server paging, Remembered views & the chosen row, Editable table & row actions, Charts, Calendar, File upload (drag & drop), Tree, File explorer (lazy loading) |
| Advanced | Languages, Custom components |

## Adding a tutorial

1. Add the topic to `src/tutorials/topics.js` (slug, group, title, summary, search keywords).
2. Add its example to a file in `src/tutorials/examples/` and register it in `examples/index.js`:

```js
export const myTopic = {
  sections: [{ heading: "...", body: ["Paragraph with `code`."], list: [...], code: "..." }],
  helpersCode: "const api2 = { ... };",   // optional module-level code (e.g. a mock API)
  helperNames: ["api2"],                   // names helpersCode makes available to the actions
  schema: [ /* JSON nodes */ ],
  buttons: [ /* optional, drawn once after repeatable entries */ ],
  options: { repeatable: true },           // extra useDynamicTag options (or (helpers) => ({ ... }))
  optionsCode: "repeatable: true,",        // the same options as they appear in page.js
  submit: true,                            // add onSubmit
  actionsCode: `doThing: () => api.setNodeProps("x", { text: "Hi" }),`,
  props: [["option", "what it does"]],
  events: [["onThing", "when it runs", "what the action receives"]],
  tips: ["..."],
};
```

`actionsCode` is the body of `actions: (api) => ({ ... })`. The page **runs this exact text** for the live example and shows it in the code tabs, so the copied code is always the code that ran.

## Project layout

```
src/app/layout.js            Bootstrap CSS + the docs frame
src/app/page.js              home = Introduction
src/app/[slug]/page.js       one static page per topic
src/components/DocsShell.js  header + left contents + right pane
src/components/Sidebar.js    searchable table of contents
src/components/TutorialPage.js  explanation, live example, events log, code tabs, tables
src/components/LiveExample.js   runs an example with useDynamicTag / DynamicTag
src/tutorials/topics.js      table of contents
src/tutorials/examples/      the examples
```

## Author

Riyaz Hameed — [riyaz.mohamed@gmail.com](mailto:riyaz.mohamed@gmail.com)
