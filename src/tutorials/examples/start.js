// Getting started: introduction, schema basics, events & actions

export const introduction = {
  sections: [
    {
      heading: "What is rcube-html?",
      body: [
        "rcube-html is a schema-driven form and layout engine. Describe rows, columns, fields and buttons as JSON-like objects, and it renders them — with built-in validation, conditional and dependent fields, input masks, repeatable entries, runtime changes and multi-language text.",
        "Use it natively in **React**, or as the `<rcube-form>` web component in **Angular, Vue, plain JavaScript, and server-rendered pages (JSP, PHP, .NET)**. Ships with its own components and stylesheet — no framework lock-in — and works with any CSS framework, including Bootstrap.",
        "You write the schema (it is JSON, so it can also come from an API, a database or a file shared by all your apps) and a few small functions called actions. The library does the rest: layout, validation, error messages, values, events and translation.",
      ],
    },
    {
      heading: "How to read these tutorials",
      list: [
        "Pick a topic in the contents on the left (or search with `/`).",
        "Try it: every page has a live example. Its Events box shows each action that runs and the data it receives.",
        "Copy it: the Code box has the schema, the actions and the complete page — pick **React, Angular, Vue, HTML / JS or JSP** above it (the site remembers your choice). Every one runs as is.",
      ],
    },
    {
      heading: "Run every example on your computer",
      body: [
        "There is a starter for each kind of app, with all the examples of these tutorials, each on its own page, plus `My page` — a form to change and play with. Each is a folder of the rcube-html-examples repository on GitHub; pick yours:",
      ],
      list: [
        "**React (Next.js)** — `starter`: Node.js 20 or 22; `npm install`, `npm run dev`, then http://localhost:3000.",
        "**Angular** — `starter-angular`: Node.js 20.19+ or 22.12+; `npm install`, `npm start`, then http://localhost:4200.",
        "**Vue 3** — `starter-vue`: Node.js 20.19+ or 22.12+; `npm install`, `npm run dev`, then http://localhost:5173.",
        "**Plain HTML / JavaScript** — `starter-html`: nothing to install; open `index.html` in the browser.",
        "**JSP** — `starter-jsp`: Java 17+ and Maven; `mvn jetty:run`, then http://localhost:8080 (or `mvn package` for a .war).",
        "Get the folder in one of the ways below — no file download needed, so they also work on work computers that block downloads.",
      ],
      links: [
        { href: "https://github.com/rcubesystem/rcube-html-examples/tree/main/starter", label: "React" },
        { href: "https://github.com/rcubesystem/rcube-html-examples/tree/main/starter-angular", label: "Angular" },
        { href: "https://github.com/rcubesystem/rcube-html-examples/tree/main/starter-vue", label: "Vue" },
        { href: "https://github.com/rcubesystem/rcube-html-examples/tree/main/starter-html", label: "HTML" },
        { href: "https://github.com/rcubesystem/rcube-html-examples/tree/main/starter-jsp", label: "JSP" },
      ],
    },
    {
      heading: "Way 1: with git",
      body: [
        "If git is installed, copy only the starter's folder (a sparse checkout skips the rest of the repository), then install and start it. For another framework, write its folder instead of `starter` (`starter-angular`, `starter-vue`, `starter-html`, `starter-jsp`) and run it as its line above says:",
      ],
      code: "git clone --depth 1 --filter=blob:none --sparse https://github.com/rcubesystem/rcube-html-examples.git\ncd rcube-html-examples\ngit sparse-checkout set starter\ncd starter\nnpm install\nnpm run dev",
    },
    {
      heading: "Way 2: with npm only (no git)",
      body: [
        "`degit` (run through npx) copies a starter's folder from GitHub into a new folder, without git (here the React one; `rcubesystem/rcube-html-examples/starter-vue` and so on for the others):",
      ],
      code: "npx degit rcubesystem/rcube-html-examples/starter rcube-html-starter\ncd rcube-html-starter\nnpm install\nnpm run dev",
    },
    {
      heading: "Way 3: make the same app yourself",
      body: [
        "If GitHub is blocked too, npm can create an empty Next.js app, and you paste the examples into it. (For Angular, Vue, a plain page or JSP, see Angular, Vue, JSP & plain HTML: add rcube-html to your app and paste any example's code for your framework.)",
      ],
      list: [
        "Run the commands below. They create a folder `my-rcube-app` with a new Next.js app, add rcube-html and start it.",
        "In `app/layout.js`, add `import \"rcube-html/styles.css\";` under the other imports.",
        "Replace everything in `app/page.js` with any tutorial's Full page.js (in the Code box of its page), save, and open http://localhost:3000.",
        "For more examples, give each one its own folder: `app/validation/page.js` opens at http://localhost:3000/validation.",
        "If a button does nothing right after the page appears, wait a moment: the first time a page opens in `npm run dev`, Next.js is still compiling its JavaScript.",
      ],
      code: "npx create-next-app@latest my-rcube-app --js --app --no-src-dir --no-tailwind --yes\ncd my-rcube-app\nnpm install rcube-html\nnpm run dev",
    },
    {
      heading: "1. Install",
      body: ["In a Next.js (or any React) app — for Angular, Vue, plain HTML or JSP, see Angular, Vue, JSP & plain HTML:"],
      code: "npm install rcube-html",
    },
    {
      heading: "Load only what you use (optional)",
      body: [
        "`import … from \"rcube-html\"` brings everything (about 118 KB gzipped, with its styles). A page that needs only forms can import `rcube-html/core` instead (about 51 KB): fields, layout, containers, actions, languages and styles.",
        "The bigger components have entry points of their own, which add them to your schemas when imported: `rcube-html/table`, `/chart`, `/calendar`, `/tree`, `/richtext` and `/upload` (core plus a table is about 60 KB). They all share one copy of the core. If a schema uses one the page didn't import, its place says which import is missing.",
      ],
      code: "import { useDynamicTag, DynamicTag } from \"rcube-html/core\";\nimport \"rcube-html/table\";   // DataTable can now be used in schemas",
    },
    {
      heading: "2. Add its stylesheet once",
      body: [
        "rcube-html draws its own buttons, fields, tables and dialogs, and works with any CSS framework — Bootstrap, Tailwind, a CMS theme, your own CSS or none — for building responsive pages. In Next.js, import its CSS in `app/layout.js` (without it, the library adds the same CSS itself when the page loads):",
        "Its colours and corners are CSS variables (`--rc-primary`, `--rc-border-radius`, ...): set them on `:root` to match your site. On a page with Bootstrap 5.3 they follow Bootstrap's colours by themselves; in a CMS, map them to its theme's.",
      ],
      code: "import \"rcube-html/styles.css\";",
    },
    {
      heading: "3. Write a schema and render it",
      body: [
        "`useDynamicTag({ schema, actions, onSubmit })` creates the form; `<DynamicTag form={form} />` draws it. The page must be a client component (`\"use client\"`).",
        "The example below is a complete sign-up form: two required fields, an email pattern, and two buttons that call the built-in actions `clearForm()` and `runValidation()`. Press Submit with empty fields, then fill them in and press it again.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-title", children: [
      { type: "column", id: "col-title", children: [
        { type: "H4", id: "title", props: { text: "Sign up" } },
      ] },
    ] },
    { type: "row", id: "row-fields", children: [
      { type: "column", id: "col-name", props: { className: "rc-col-12 rc-col-md-6" }, children: [
        { type: "InputField", id: "first", props: { name: "firstName", label: "First name", required: true, uppercase: true } },
      ] },
      { type: "column", id: "col-email", props: { className: "rc-col-12 rc-col-md-6" }, children: [
        { type: "InputField", id: "email", props: { type: "email", name: "email", label: "Email", required: true, lowercase: true,
          pattern: "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}", patternMessage: "Please enter a valid email address." } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "rc-d-flex rc-justify-content-end rc-gap-2" }, children: [
        { type: "ButtonField", id: "clear", props: { text: "Clear", onClick: "clearForm()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: "",
  props: [
    ["type", "What to draw: `row`, `column`, `InputField`, `ButtonField`, `H4`, ..."],
    ["id", "A unique name for every node. Actions use it to change that node later."],
    ["props.name", "The field's key in the submitted values (`firstName`)."],
    ["props.required", "The field must be filled in before Submit works."],
    ["props.uppercase / lowercase", "Change the letters while the user types."],
    ["props.pattern / patternMessage", "A regular expression the value must match, and the message when it does not."],
    ["props.onClick", "The action a button runs. `runValidation()` and `clearForm()` are built in."],
  ],
  events: [
    ["onSubmit", "Submit is pressed and every visible field is valid.", "An array with one object of values per entry: `[{ firstName: \"JANE\", email: \"jane@example.com\" }]`."],
  ],
  tips: [
    "The schema is data, so you can load it with `fetch` and pass it to `useDynamicTag`.",
    "Next: Schema basics explains rows, columns and ids.",
  ],
};

export const schemaBasics = {
  sections: [
    {
      heading: "Nodes",
      body: [
        "A schema is an array of nodes. Every node is an object with a `type`, and usually an `id` (optional: see Shorthands below).",
        "Layout nodes (`row`, `column`, containers like `Card` or `Tabs`) have `children`: a list of more nodes. Other nodes have `props`: the settings for that element (its text, label, color, ...).",
      ],
      code: "{ type: \"row\", id: \"row-1\", props: { className: \"rc-mb-3\" }, children: [\n  { type: \"column\", id: \"col-1\", children: [\n    { type: \"H4\", id: \"title\", props: { text: \"Hello\" } }\n  ] }\n]}",
    },
    {
      heading: "Rows and columns",
      body: [
        "`row` and `column` are a 12-column grid. Columns share the row equally; give a column `span: { xs: 12, md: 8 }` (or `span: 6`, `span: \"auto\"`) to set its width per screen size, and a row `gap: 3` for the space between columns. Rows at the top level are wrapped in a container.",
        "Any node can have `props.className` and `props.style` — rcube-html's classes carry Bootstrap's names with `rc-` in front: `rc-p-3`, `rc-bg-body-tertiary`, `rc-text-center`, `rc-border`, `rc-rounded`, `rc-d-flex`, `rc-gap-2`, `rc-col-md-6`, .... On a page that has Bootstrap, its own classes work too.",
      ],
    },
    {
      heading: "Why ids matter",
      body: [
        "Actions find nodes by id. In this example the button runs `changeTitle()`, which calls `api.setNodeProps(\"title\", { text: ... })` — it changes the node whose id is `title`.",
        "So write the `id` yourself on a node your code changes. Other nodes can do without one (next section).",
      ],
    },
    {
      heading: "Shorthands: a single child, and no ids",
      body: [
        "A single child can be written as an object instead of a list of one — in `children`, in a tab's or accordion's `children` and in a modal's `footer`. Empty entries (`null`, `false`) are skipped, so `condition && node` works inside a list.",
        "The `id` is optional. A field gets its `name` (`email`, then `email-2` if taken); any other node gets its parent's id, its type and its place: `row1`, `row1-column1`, `row1-column1-p1`. Ids you write are kept and never given to another node. A generated id follows the node's place, so give your own id to a node your actions change.",
        "The last row of the example below is written this way. Arrays and ids you write keep working exactly as before. In your own code, `childrenOf(node)` reads children as a list, and `normalizeSchema(schema)` returns a schema with lists and ids everywhere.",
      ],
      code: "// the long way\n{ type: \"row\", id: \"r1\", children: [\n  { type: \"column\", id: \"c1\", children: [\n    { type: \"InputField\", id: \"email\", props: { name: \"email\", label: \"Email\" } }\n  ] }\n] }\n\n// the same with the shorthands\n{ type: \"row\", children: { type: \"column\", children:\n  { type: \"InputField\", props: { name: \"email\", label: \"Email\" } } } }",
    },
  ],
  schema: [
    { type: "row", id: "row-header", props: { className: "rc-mb-3" }, children: [
      { type: "column", id: "col-header", props: { className: "rc-col-12 rc-bg-primary-subtle rc-rounded rc-p-3" }, children: [
        { type: "H4", id: "title", props: { text: "Page title", className: "rc-mb-1" } },
        { type: "P", id: "subtitle", props: { text: "A row with one full-width column.", className: "rc-mb-0 rc-text-body-secondary" } },
      ] },
    ] },
    { type: "row", id: "row-body", props: { className: "rc-g-3 rc-mb-3" }, children: [
      { type: "column", id: "col-main", props: { className: "rc-col-12 rc-col-md-8" }, children: [
        { type: "DIV", id: "main-box", props: { className: "rc-border rc-rounded rc-p-3 rc-h-100", children: "Main column (col-md-8): two thirds of the width on medium screens and up." } },
      ] },
      { type: "column", id: "col-side", props: { className: "rc-col-12 rc-col-md-4" }, children: [
        { type: "DIV", id: "side-box", props: { className: "rc-border rc-rounded rc-p-3 rc-h-100 rc-bg-body-tertiary", children: "Side column (col-md-4)." } },
      ] },
    ] },
    { type: "row", id: "row-three", props: { className: "rc-g-3 rc-mb-3 rc-text-center" }, children: [
      { type: "column", id: "col-a", children: [{ type: "DIV", id: "box-a", props: { className: "rc-border rc-rounded rc-p-2", children: "Equal" } }] },
      { type: "column", id: "col-b", children: [{ type: "DIV", id: "box-b", props: { className: "rc-border rc-rounded rc-p-2", children: "Equal" } }] },
      { type: "column", id: "col-c", children: [{ type: "DIV", id: "box-c", props: { className: "rc-border rc-rounded rc-p-2", children: "Equal" } }] },
    ] },
    { type: "row", id: "row-button", props: { className: "rc-mb-3" }, children: [
      { type: "column", id: "col-button", children: [
        { type: "ButtonField", id: "change", props: { text: "Change the title", variant: "primary", onClick: "changeTitle()" } },
      ] },
    ] },
    // written with the shorthands: no ids, and each single child is an object
    { type: "row", children: { type: "column", props: { className: "rc-col-12 rc-border rc-rounded rc-p-3 rc-bg-body-tertiary" }, children:
      { type: "P", props: { text: "This row is written with the shorthands: no ids, and each single child is an object, not a list.", className: "rc-mb-0" } } } },
  ],
  actionsCode: `changeTitle: () => api.setNodeProps("title", { text: "Changed at " + new Date().toLocaleTimeString() }),`,
  props: [
    ["type", "The kind of node: layout (`row`, `column`), text (`H4`, `P`, `DIV`), field, container, table, chart, ..."],
    ["id", "Unique per schema; used by actions and as React key. Optional: a field gets its name, other nodes their place (`row1-column1-p1`)."],
    ["children", "Nested nodes (rows, columns and containers): a list, or a single node as an object."],
    ["props.className / props.style", "Classes (`rc-…`, or your own) or inline styles for that element."],
    ["props.span / props.gap", "A column's width (`6`, `\"auto\"`, `{ xs: 12, md: 6 }`) / a row's space between columns (`0`–`5`)."],
    ["props.text", "The text of text nodes (`H1`–`H6`, `P`, `SPAN`, ...). `DIV` uses `props.children`."],
  ],
  events: [
    ["onClick", "The button is pressed.", "`(event, context)` — `context.name` is the button's id."],
  ],
};

export const eventsActions = {
  sections: [
    {
      heading: "Name an action in the schema",
      body: [
        "Any prop that starts with `on` (`onChange`, `onBlur`, `onFocus`, `onKeyDown`, `onClick`, ...) can hold the name of an action: `\"onChange\": \"zipChanged()\"`.",
        "Write the action in `useDynamicTag({ actions: (api) => ({ ... }) })`. `api` is the form's toolbox (set values, change nodes, validate, ...).",
      ],
    },
    {
      heading: "What an action receives",
      body: [
        "Field and button actions are called as `(event, context)`. `context` has `name` (the field name), `value` (its current value), `values` (all tracked values) and `fieldRefs`.",
        "Components such as tables, charts and calendars pass a payload object first instead — each tutorial lists it under Events.",
      ],
      code: "actions: (api) => ({\n  zipChanged: (event, { name, value }) => console.log(name, value),\n})",
    },
    {
      heading: "Built-in actions",
      body: [
        "These names work in the schema without writing anything: `runValidation()`, `clearForm()`, `resetForm()`, `addCopy()`, `removeCopy()`, `switchLanguage()`, `openModal()`, `closeModal()`, `selectTab()`.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-fields", children: [
      { type: "column", id: "col-zip", props: { className: "rc-col-12 rc-col-md-6" }, children: [
        { type: "InputField", id: "zip", props: { name: "zip", label: "ZIP code", mask: "#####", placeholder: "5 digits",
          onChange: "zipChanged()", onBlur: "zipBlurred()", onFocus: "zipFocused()" } },
      ] },
      { type: "column", id: "col-color", props: { className: "rc-col-12 rc-col-md-6" }, children: [
        { type: "SelectField", id: "color", props: { name: "color", label: "Favorite color", options: ["Red", "Green", "Blue"], onChange: "colorChanged()" } },
      ] },
    ] },
    { type: "row", id: "row-result", children: [
      { type: "column", id: "col-result", children: [
        { type: "P", id: "result", props: { className: "rc-alert rc-alert-info rc-py-2", text: "Type a ZIP code or pick a color." } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "rc-d-flex rc-gap-2" }, children: [
        { type: "ButtonField", id: "fill", props: { text: "Fill with demo values", onClick: "fillDemo()" } },
        { type: "ButtonField", id: "clear", props: { text: "Clear", onClick: "clearForm()" } },
      ] },
    ] },
  ],
  actionsCode: `zipChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " is now " + value }),
zipBlurred: (event, { value }) => api.setNodeProps("result", { text: "Left the ZIP field with " + (value || "nothing") }),
zipFocused: () => api.setNodeProps("result", { text: "Typing a ZIP code..." }),
colorChanged: (event, { value }) => api.setNodeProps("result", { text: "Color: " + value, style: { color: value.toLowerCase() } }),
fillDemo: () => api.setFormData({ zip: "90210", color: "Blue" }),`,
  props: [
    ["onChange / onBlur / onFocus", "Run an action when the field changes, loses focus or gets focus."],
    ["onClick", "Run an action when a button is pressed."],
    ["mask", "Format while typing; `#` is a digit, e.g. `\"(###) ###-####\"`."],
  ],
  events: [
    ["onChange", "Every edit of the field.", "`(event, { name, value, values })`"],
    ["onBlur / onFocus", "The field loses / gets focus.", "`(event, { name, value })`"],
    ["onClick", "A button is pressed.", "`(event, { name })`"],
  ],
  tips: [
    "`api.setFormData({ ... })` and `api.setFieldValue(name, value)` set values from code; they do not fire `onChange`.",
    "An action can call other actions through `api` — custom ones too, because they are added to the same object.",
  ],
};
