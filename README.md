# rcube-html examples

**Examples for rcube-html: An Open-Source, JSON-Driven HTML Page Renderer.**

Tutorials and copy-ready examples for [rcube-html](https://www.npmjs.com/package/rcube-html) — schema-driven React + Bootstrap forms, tables, charts, calendar, file upload and trees.

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

Download the starter app files individually — every file from the `starter`
folder, keeping the same file structure as in that folder. Then go to the
local folder where you set up the same starter app and run the commands
below. You need Node.js 20 or 22.

### Starter files

Download each file and keep the same folder structure as the `starter` folder:

- `package.json` → [download](/downloads/starter/package.json)
- `app/layout.js` → [download](/downloads/starter/app/layout.js)
- `app/page.js` → [download](/downloads/starter/app/page.js)
- … (list the rest of the `starter/` files here)

Then, in your local starter folder:

```bash
npm install
npm run dev
```
open http://localhost:3000.
3. More examples: one folder each, e.g. `app/validation/page.js` → http://localhost:3000/validation.

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
