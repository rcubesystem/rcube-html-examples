// Tutorials for rcube-html 0.6: the rich text editor, and tables that remember the person's view.
import { configureViewStore, readView, saveView } from "rcube-html";
const ORDERS = [
  { id: 1, customer: "Aisha Khan", status: "Paid", amount: 120.5 }, { id: 2, customer: "Ben Lee", status: "Due", amount: 80 },
  { id: 3, customer: "Carla Garcia", status: "Overdue", amount: 45.25 }, { id: 4, customer: "Dev Patel", status: "Paid", amount: 300 },
  { id: 5, customer: "Elena Novak", status: "Due", amount: 64.9 }, { id: 6, customer: "Farid Haddad", status: "Paid", amount: 18 },
  { id: 7, customer: "Grace Okafor", status: "Overdue", amount: 99.99 }, { id: 8, customer: "Hugo Brown", status: "Paid", amount: 240 },
  { id: 9, customer: "Ines Silva", status: "Due", amount: 12.5 }, { id: 10, customer: "Jamal Wong", status: "Paid", amount: 75 },
  { id: 11, customer: "Kim Ivanova", status: "Due", amount: 150 }, { id: 12, customer: "Leo Moreau", status: "Overdue", amount: 33 },
];

export const richText = {
  sections: [
    {
      heading: "RichTextField",
      body: [
        "`RichTextField` is a form field with a formatting toolbar. Its value is **cleaned HTML** (paragraphs, bold, italic, underline, strike, headings, lists, quotes, safe links), kept in a hidden textarea — so `required`, `setFieldValue`, `getFormData` and `runValidation` work as for any field. `required` and `maxLength` count the text, not the tags.",
        "`toolbar` chooses and orders the buttons (`\"|\"` is a gap, `false` hides the toolbar). Add your own tools: `{ text, html }` inserts HTML; `{ text, onClick: \"action()\" }` runs an action that gets an `editor` (`getHtml`, `setHtml`, `insertHtml`, `insertText`, `focus`).",
        "`source: true` adds a **Source** button to edit the HTML itself (cleaned on the way back). `RichText` shows saved HTML safely; `cleanHtml`, `htmlToText`, `isHtml` are exported for your server and lists.",
      ],
    },
  ],
  schema: [
    { type: "RichTextField", id: "details", props: {
      name: "details", label: "Details", required: true, maxLength: 500, minHeight: 140, placeholder: "Write here…",
      hint: "Bold, lists, links — or edit the HTML with Source.",
      defaultValue: "<p>Hello <b>world</b> — try the toolbar.</p>",
      toolbar: ["bold", "italic", "underline", "|", "heading", "bulletList", "numberList", "quote", "|", "link", "clear", "|",
        { key: "sign", text: "Signature", title: "Insert my signature", html: "<p>— The school office</p>" },
        { key: "shout", text: "UPPER", title: "Upper-case the text", onClick: "shout()" }],
      source: true, onChange: "detailsChanged()",
    } },
    { type: "ButtonField", id: "show", props: { text: "Show it below", variant: "outline-primary", onClick: "showIt()" } },
    { type: "ButtonField", id: "fill", props: { text: "Set a value from code", variant: "outline-secondary", className: "rc-ms-2", onClick: "fillIt()" } },
    { type: "H6", id: "preview-h", props: { text: "Shown with RichText (cleaned again):", className: "rc-mt-3" } },
    { type: "RichText", id: "preview", props: { html: "", emptyText: "Nothing yet — press “Show it below”." } },
  ],
  buttons: [{ type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()", className: "rc-mt-3" } }],
  actionsCode: `// your tool: the editor is handed over
shout: (event, { editor }) => editor.setHtml(editor.getHtml().toUpperCase().replace(/<(\\/?)([A-Z0-9]+)/g, (m, s, t) => "<" + s + t.toLowerCase())),
detailsChanged: (event, { value }) => console.log("HTML now:", value),
showIt: () => api.setNodeProps("preview", { html: api.getFormData().details }),
fillIt: () => api.setFieldValue("details", "<h4>Trip on Friday</h4><ul><li>Bring lunch</li><li>Wear the uniform</li></ul><script>alert(1)</script>"),`,
  props: [
    ["name / label / required / hint / placeholder", "As every field; `hint` is the help text under it."],
    ["maxLength / maxLengthMessage / counter", "Text length limit (not counting tags), its message, the `n / max` counter."],
    ["toolbar", "Built in: `bold italic underline strike heading bulletList numberList quote link unlink clear undo redo`; `\"|\"` a gap; your tools `{ key, text, icon, title, html | onClick }`; `false` = none."],
    ["source", "The Source button: edit the HTML (cleaned when going back)."],
    ["headingTag / allowedTags", "What “heading” makes (`h3`–`h5`); what the cleaner keeps."],
    ["minHeight / maxHeight / disabled / readOnly / defaultValue", "Size and state."],
    ["RichText { html, emptyText }", "Shows rich text safely (cleaned again)."],
  ],
  events: [
    ["onChange", "Every edit.", "`(event, { name, value })` — value is the cleaned HTML"],
    ["tool onClick", "Your toolbar button is pressed.", "`(event, { name, value, editor, tool })`"],
    ["onLink", "The link button (instead of the browser's prompt).", "`(event, { selectionText, editor })` → the web address (or a Promise)"],
  ],
};

export const rememberView = {
  sections: [
    {
      heading: "Tables that remember",
      body: [
        "Give a `DataTable` a `remember` key and it keeps the person's **page, rows per page, sort and search** in the browser (localStorage) — for a week after they last used it (`configureViewStore({ days })`). Come back and the table is as they left it.",
        "While something is saved, the table shows a **Reset** button: it forgets the saved view and runs `onViewReset`, where your page clears its own filters. Save filters under `\"<key>:filters\"` with `saveView` / `readView` so Reset clears them too.",
        "Call `configureViewStore({ namespace, user, enabled, days })` once the person is signed in (e.g. `namespace: userId + \".\" + schoolId`), so people sharing a browser don't see each other's choices; `clearAllViews()` and `purgeExpiredViews()` tidy up (e.g. at sign-in).",
        "Try it: sort, search, change the page or the status, then reload this page.",
      ],
    },
    {
      heading: "The chosen row",
      body: [
        "`selectable: \"single\"` gives each row a radio button (one at a time; clicking a row picks it) — handy with `toolbarActions` that `needsSelection`. The chosen row is highlighted (tint, bold, a bar at its start); in a table without selection the row last clicked is (`highlightClicked: false` turns it off).",
        "Its colours: `configureTableLook({ background, color, weight, accent })` for the whole app, or `selectedLook: { background, color }` on one table.",
      ],
    },
  ],
  wide: true,
  provides: { configureViewStore, readView, saveView },
  imports: `import { configureViewStore, readView, saveView } from "rcube-html";`,
  helpersCode: `// once signed in: whose choices these are (here a demo person)
configureViewStore({ namespace: "demo.school", user: "demo", days: 7 });
const ROWS = ${JSON.stringify(ORDERS)};
const views = { readView, saveView };`,
  helperNames: ["ROWS", "views"],
  schema: [
    { type: "SelectField", id: "status", props: { name: "status", label: "Status", placeholder: "Every status", options: ["Paid", "Due", "Overdue"], onChange: "statusChanged()", className: "rc-mb-2", style: { maxWidth: 240 } } },
    { type: "DataTable", id: "orders", props: {
      remember: "demo-orders", onViewReset: "viewReset()",
      rowKey: "id", rows: ORDERS, selectable: "single", sortable: true, searchable: true, pageSize: 5, pageSizeOptions: [5, 10, 25], size: "sm",
      columns: [{ key: "id", title: "#", sortable: true, width: 60 }, { key: "customer", title: "Customer", sortable: true },
        { key: "status", title: "Status", badge: { Paid: "success", Due: "warning", Overdue: "danger" } }, { key: "amount", title: "Amount", format: "currency", align: "end", sortable: true }],
      toolbarActions: [{ text: "Open", variant: "outline-primary", onClick: "openIt()", needsSelection: true }],
    } },
  ],
  onLoadCode: `form.actions.restoreFilters();`,
  actionsCode: `// the page's filter, saved with the table's view ("<key>:filters": Reset clears it too)
restoreFilters: () => {
  const saved = views.readView("demo-orders:filters");
  if (saved?.status) { api.setFieldValue("status", saved.status); api.setRows("orders", ROWS.filter((r) => r.status === saved.status)); }
},
statusChanged: (event, { value }) => {
  views.saveView("demo-orders:filters", value ? { status: value } : null);
  api.setRows("orders", value ? ROWS.filter((r) => r.status === value) : ROWS);
},
viewReset: () => { api.setFieldValue("status", ""); api.setRows("orders", ROWS); },
openIt: (event, { rows }) => console.log("Open", rows[0]),`,
  props: [
    ["remember", "A key (or `true` = the node id): keep page, rows per page, sort and search in this browser."],
    ["sort / query", "The starting sort `{ key, dir }` and search text (what Reset goes back to)."],
    ["selectable: \"single\"", "A radio per row; clicking a row picks it."],
    ["selectedLook / highlightClicked", "This table's chosen-row colours; highlight the clicked row (default on)."],
    ["configureViewStore({ namespace, user, enabled, days })", "Whose choices, on / off, how long (days after last use)."],
    ["readView / saveView / clearView / hasView", "Your own saved values (e.g. filters at `\"<key>:filters\"`)."],
    ["clearAllViews / purgeExpiredViews", "Forget everything of this person / drop expired entries."],
    ["configureTableLook({ background, color, weight, accent })", "The app's chosen-row colours (CSS values)."],
  ],
  events: [
    ["onViewReset", "The table's Reset button.", "`{ key }` — clear your filters here"],
  ],
};
