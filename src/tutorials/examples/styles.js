// Tutorial for rcube-html 0.7: its own stylesheet, the --rc-* theme variables, dark mode, the grid (span / gap) and rc- classes.

const ROWS = [
  { id: 1, name: "Aisha Khan", status: "Paid", amount: 120.5 },
  { id: 2, name: "Ben Lee", status: "Due", amount: 80 },
  { id: 3, name: "Carla Garcia", status: "Overdue", amount: 45.25 },
];

export const stylesThemes = {
  sections: [
    {
      heading: "Its own stylesheet",
      body: [
        "rcube-html draws its own buttons, fields, tables, pager, dropdowns, dialogs and tabs, with classes that start with `rc-` (`rc-btn rc-btn-primary`, `rc-input`, `rc-table`, …). It works with any CSS framework for building responsive pages: the same schema runs in a Bootstrap or Tailwind app, inside Liferay next to Clay, with your own CSS, or on a page with no CSS framework at all.",
        "Import its stylesheet once (in Next.js, in `app/layout.js`). Without the import the library adds the same CSS itself the first time it loads in the browser — the import is better, because the CSS is in the page before anything draws.",
      ],
      code: `import "rcube-html/styles.css";`,
    },
    {
      heading: "Your colours: CSS variables",
      body: [
        "Colours, corners and sizes are CSS variables. Set them on `:root` to restyle every form and table on the site. Each colour has an `-rgb` twin (used for focus rings and tints).",
        "On a page with Bootstrap 5.3 every variable follows Bootstrap's own (`--rc-primary` is `var(--bs-primary)`), so a Bootstrap theme colours rcube-html too — that's what you see on this site.",
      ],
      code: `:root {
  --rc-primary: #0f766e;      --rc-primary-rgb: 15, 118, 110;
  --rc-danger: #da1414;       --rc-danger-rgb: 218, 20, 20;
  --rc-body-color: #272833;   --rc-body-bg: #fff;
  --rc-border-color: #e7e7ed; --rc-border-radius: .75rem;
  --rc-link-color: #0f766e;   --rc-font-size: .875rem;
}`,
    },
    {
      heading: "In Liferay",
      body: [
        "Clay's `.btn`, `.form-control`, `.table` and `.row` never touch rcube-html (it uses none of them), and rcube-html's classes never touch Clay's. To make the forms look like the rest of the portal, map the variables to the theme's once — in the theme's CSS or a client extension:",
      ],
      code: `:root {
  --rc-primary: var(--primary, #0b5fff);   --rc-primary-rgb: 11, 95, 255;
  --rc-body-color: var(--body-color, #272833);
  --rc-border-color: var(--gray-300, #e7e7ed);
  --rc-border-radius: var(--border-radius, .25rem);
  --rc-font-size: .875rem;
}`,
    },
    {
      heading: "Dark",
      body: [
        "`data-rc-theme=\"dark\"` on `<html>` (or on any element) switches to the dark colours. On a Bootstrap page, Bootstrap's `data-bs-theme=\"dark\"` does the same — rcube-html follows it.",
      ],
    },
    {
      heading: "Layout: span and gap",
      body: [
        "A `column` takes `span`: `6`, `\"auto\"`, or one per screen size — `{ xs: 12, md: 6, lg: 4 }`. Without it, columns share the row equally. A `row` takes `gap` (`0`–`5`, or `{ x, y }`) for the space between its columns.",
        "Any node's `className` can use rcube-html's classes — Bootstrap's names with `rc-` in front: `rc-d-flex`, `rc-gap-2`, `rc-mt-3`, `rc-p-3`, `rc-text-center`, `rc-text-muted`, `rc-small`, `rc-fw-semibold`, `rc-border`, `rc-rounded`, `rc-bg-body-tertiary`, `rc-w-100`, `rc-col-md-6`, … Bootstrap's own classes work only on pages that load Bootstrap.",
      ],
    },
    {
      heading: "The example",
      body: ["Pick a look: the example below changes the variables on its own box (on your site you'd set them on `:root`). Resize the window to see the columns stack."],
    },
  ],
  schema: [
    { type: "row", id: "row-pick", props: { gap: 3, className: "rc-mb-3 rc-align-items-end" }, children: [
      { type: "column", id: "c-pick", props: { span: { xs: 12, md: 6 } }, children: [
        { type: "SelectField", id: "look", props: { name: "look", label: "Look", className: "rc-mb-0", placeholder: "Default (this site's Bootstrap colours)",
          options: [{ label: "Liferay (Clay colours)", value: "clay" }, { label: "Teal, round corners", value: "teal" }, { label: "Dark", value: "dark" }],
          onChange: "applyLook()" } },
      ] },
      { type: "column", id: "c-pick-note", props: { span: { xs: 12, md: 6 } }, children: [
        { type: "P", id: "look-note", props: { text: "Everything in the box below is rcube-html.", className: "rc-mb-0 rc-text-muted rc-small" } },
      ] },
    ] },
    { type: "Card", id: "themed", props: { className: "theme-demo" }, children: [
      { type: "row", id: "row-form", props: { gap: 3 }, children: [
        { type: "column", id: "c-left", props: { span: { xs: 12, md: 6 } }, children: [
          { type: "InputField", id: "name", props: { name: "name", label: "Name", required: true, placeholder: "Jane Doe", hint: "Press Check to see an error." } },
          { type: "SelectField", id: "plan", props: { name: "plan", label: "Plan", options: ["Basic", "Standard", "Premium"] } },
          { type: "InputField", id: "agree", props: { name: "agree", type: "checkbox", label: "Send me the newsletter" } },
        ] },
        { type: "column", id: "c-right", props: { span: { xs: 12, md: 6 } }, children: [
          { type: "Alert", id: "note", props: { variant: "info", text: "An info alert. Its colours come from the theme." } },
          { type: "column", id: "badges", props: { className: "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-3" }, children: [
            { type: "Badge", id: "b1", props: { text: "Paid", bg: "success" } },
            { type: "Badge", id: "b2", props: { text: "Due", bg: "warning" } },
            { type: "Badge", id: "b3", props: { text: "Overdue", bg: "danger" } },
            { type: "Badge", id: "b4", props: { text: "3 new", bg: "primary", pill: true } },
          ] },
          { type: "ProgressBar", id: "pb", props: { now: 65, showLabel: true, className: "rc-mb-3" } },
          { type: "column", id: "btns", props: { className: "rc-d-flex rc-flex-wrap rc-gap-2" }, children: [
            { type: "ButtonField", id: "check", props: { text: "Check", variant: "primary", onClick: "runValidation()" } },
            { type: "ButtonField", id: "clear", props: { text: "Clear", variant: "outline-secondary", onClick: "clearForm()" } },
            { type: "ButtonField", id: "del", props: { text: "Delete", variant: "outline-danger" } },
          ] },
        ] },
      ] },
      { type: "DataTable", id: "orders", props: { title: "Orders", rowKey: "id", pageSize: 2, searchable: true, columnToggle: true, selectable: true, className: "rc-mt-3 rc-mb-0",
        columns: [
          { key: "name", title: "Customer", sortable: true },
          { key: "status", title: "Status", badge: { Paid: "success", Due: "warning", Overdue: "danger" } },
          { key: "amount", title: "Amount", format: "currency", align: "end", sortable: true },
        ],
        rows: ROWS } },
    ] },
  ],
  actionsCode: `// The variables of each look (on your site: once, on :root)
applyLook: (event, { value }) => {
  const box = document.querySelector(".theme-demo");
  const looks = {
    clay: { "--rc-primary": "#0b5fff", "--rc-primary-rgb": "11, 95, 255", "--rc-success": "#287d3c", "--rc-success-rgb": "40, 125, 60",
      "--rc-warning": "#b95000", "--rc-warning-rgb": "185, 80, 0", "--rc-danger": "#da1414", "--rc-danger-rgb": "218, 20, 20",
      "--rc-info": "#2e5aac", "--rc-info-rgb": "46, 90, 172", "--rc-info-bg-subtle": "#eef2fa", "--rc-info-text": "#2e5aac", "--rc-info-border-subtle": "#89a7e0",
      "--rc-body-color": "#272833", "--rc-border-color": "#e7e7ed", "--rc-border-radius": ".25rem", "--rc-border-radius-sm": ".2rem",
      "--rc-link-color": "#0b5fff", "--rc-input-focus-border-color": "#80acff", "--rc-focus-ring": "0 0 0 .2rem rgba(11, 95, 255, .25)" },
    teal: { "--rc-primary": "#0f766e", "--rc-primary-rgb": "15, 118, 110", "--rc-link-color": "#0f766e",
      "--rc-border-radius": ".75rem", "--rc-border-radius-sm": ".5rem", "--rc-border-radius-lg": "1rem",
      "--rc-input-focus-border-color": "#5eb8b0", "--rc-focus-ring": "0 0 0 .25rem rgba(15, 118, 110, .2)" },
  };
  // back to the page's own colours, then the chosen look
  for (const name of [...box.style].filter((p) => p.startsWith("--rc-"))) box.style.removeProperty(name);
  box.removeAttribute("data-bs-theme");
  if (value === "dark") box.setAttribute("data-bs-theme", "dark"); // a page without Bootstrap: data-rc-theme="dark"
  for (const [name, v] of Object.entries(looks[value] || {})) box.style.setProperty(name, v);
},`,
  props: [
    ["import \"rcube-html/styles.css\"", "The stylesheet (added by the library itself when not imported)."],
    ["--rc-primary … --rc-dark (+ -rgb)", "The eight colours: primary, secondary, success, info, warning, danger, light, dark."],
    ["--rc-{colour}-text / -bg-subtle / -border-subtle", "The softer versions (alerts, list items, table rows)."],
    ["--rc-body-color / --rc-body-bg / --rc-emphasis-color / --rc-secondary-color", "Text and background."],
    ["--rc-border-color / --rc-border-width / --rc-border-radius (-sm, -lg)", "Lines and corners."],
    ["--rc-link-color / --rc-focus-ring / --rc-box-shadow / --rc-font-size", "Links, the focus outline, shadows, the text size."],
    ["--rc-btn-padding-x / -y, --rc-btn-radius, --rc-table-hover-bg, …", "Per component, for a theme's own tweaks (on `.rc-btn`, `.rc-table`, …)."],
    ["data-rc-theme=\"dark\"", "Dark colours (Bootstrap's `data-bs-theme=\"dark\"` works too)."],
    ["column props.span", "`6`, `\"auto\"`, `{ xs, sm, md, lg, xl, xxl }`; none = equal widths."],
    ["row props.gap", "`0`–`5`, or `{ x, y }`: space between the columns."],
  ],
  events: [
    ["onChange (Look)", "Another look is picked.", "`(event, { value })` — the look's key"],
  ],
  tips: [
    "Set the variables on `:root`: some derived ones (the focus ring, the field's focus border, the soft alert colours) are worked out there from `--rc-primary`, so on a single element set those too — as the example does.",
    "Don't give your own elements class names rcube-html uses (`rc-card-body`, `rc-progress`, `rc-table-…`); pick another prefix.",
  ],
};
