// Getting started: introduction, schema basics, events & actions

export const introduction = {
  sections: [
    {
      heading: "What is rcube-html?",
      body: [
        "rcube-html builds React pages from a schema: a plain list of objects that says what to show — rows, columns, text, form fields, tables, charts, a calendar, file uploads, trees and more.",
        "You write the schema (it is JSON, so it can also come from an API or a database) and a few small functions called actions. The library does the rest: layout, validation, error messages, values, events and translation.",
      ],
    },
    {
      heading: "How to read these tutorials",
      list: [
        "Pick a topic in the contents on the left (or search with `/`).",
        "Try it: every page has a live example. Its Events box shows each action that runs and the data it receives.",
        "Copy it: the Code box has the schema, the actions and a Full page.js that you can paste into your app and run as is.",
      ],
    },
    {
      heading: "1. Install",
      body: ["In a Next.js (or any React) app:"],
      code: "npm install rcube-html",
    },
    {
      heading: "2. Add its stylesheet once",
      body: [
        "rcube-html draws its own buttons, fields, tables and dialogs — no Bootstrap needed. In Next.js, import its CSS in `app/layout.js` (without it, the library adds the same CSS itself when the page loads):",
        "Its colours and corners are CSS variables (`--rc-primary`, `--rc-border-radius`, ...): set them on `:root` to match your site. On a page with Bootstrap 5.3 they follow Bootstrap's colours by themselves; in Liferay, map them to Clay's.",
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
        "A schema is an array of nodes. Every node is an object with a `type` and a unique `id`.",
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
      ],
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
    { type: "row", id: "row-button", children: [
      { type: "column", id: "col-button", children: [
        { type: "ButtonField", id: "change", props: { text: "Change the title", variant: "primary", onClick: "changeTitle()" } },
      ] },
    ] },
  ],
  actionsCode: `changeTitle: () => api.setNodeProps("title", { text: "Changed at " + new Date().toLocaleTimeString() }),`,
  props: [
    ["type", "The kind of node: layout (`row`, `column`), text (`H4`, `P`, `DIV`), field, container, table, chart, ..."],
    ["id", "Unique per schema; used by actions and as React key."],
    ["children", "Nested nodes (rows, columns and containers)."],
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
