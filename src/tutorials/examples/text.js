// Text & layout: HTML tags, runtime element changes

const sampleImage = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120"><rect width="100%" height="100%" rx="12" fill="#2a78d6"/>' +
  '<text x="50%" y="50%" fill="#fff" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">IMG 320 × 120</text></svg>'
);

export const htmlTags = {
  sections: [
    {
      heading: "Text nodes",
      body: [
        "`H1`–`H6`, `P`, `SPAN`, `SMALL`, `STRONG`, `EM`, `LABEL` and `BLOCKQUOTE` draw that HTML tag with `props.text`. `Text` with `props.tag` does the same for any of them.",
        "`A` is a link (`href`, `text`, `target`), `IMG` a responsive image (`src`, `alt`), `DIV` a box (`children` text, `className`), and `LIST` a bullet list (`items`).",
      ],
    },
    {
      heading: "Small components",
      body: [
        "`Badge`, `Breadcrumb`, `ProgressBar`, `Spinner` and `ListGroup` take their data in props. Like every node, their props can be changed later with `api.setNodeProps` — the buttons below do that.",
      ],
    },
  ],
  helpersCode: `// Page state kept outside the actions (they are re-created on every render)
const state = { progress: 40 };`,
  helperNames: ["state"],
  schema: [
    { type: "row", id: "row-text", props: { className: "rc-mb-2" }, children: [
      { type: "column", id: "col-text", props: { className: "rc-col-12 rc-col-lg-6" }, children: [
        { type: "H3", id: "heading", props: { text: "H3 heading" } },
        { type: "P", id: "para", props: { text: "A paragraph (P) of body text." } },
        { type: "Text", id: "custom-tag", props: { tag: "h6", text: "Text with tag \"h6\"", className: "rc-text-primary" } },
        { type: "SPAN", id: "span", props: { text: "SPAN · " } },
        { type: "STRONG", id: "strong", props: { text: "STRONG · " } },
        { type: "EM", id: "em", props: { text: "EM · " } },
        { type: "SMALL", id: "small", props: { text: "SMALL" } },
        { type: "BLOCKQUOTE", id: "quote", props: { text: "BLOCKQUOTE — a quoted passage.", className: "rc-border-start rc-border-4 rc-ps-3 rc-my-3 rc-text-body-secondary" } },
        { type: "A", id: "link", props: { text: "A — link to getbootstrap.com", href: "https://getbootstrap.com", target: "_blank" } },
        { type: "LIST", id: "list", props: { className: "rc-mt-2", items: ["LIST item one", "LIST item two", { text: "Items can also be { text } objects" }] } },
      ] },
      { type: "column", id: "col-media", props: { className: "rc-col-12 rc-col-lg-6" }, children: [
        { type: "IMG", id: "image", props: { src: sampleImage, alt: "Sample image", style: { maxWidth: 320 } } },
        { type: "DIV", id: "box", props: { className: "rc-border rc-rounded rc-p-2 rc-my-3 rc-bg-body-tertiary", children: "DIV — a box for any text" } },
        { type: "Badge", id: "badge-new", props: { text: "New", bg: "success", className: "rc-me-1" } },
        { type: "Badge", id: "badge-beta", props: { text: "Beta", bg: "warning", textColor: "dark", pill: true, className: "rc-me-1" } },
        { type: "Badge", id: "badge-count", props: { text: "3 unread", bg: "danger", pill: true } },
        { type: "Breadcrumb", id: "crumbs", props: { className: "rc-mt-3", items: [{ text: "Home", href: "#" }, { text: "Library", href: "#" }, { text: "Data", active: true }] } },
        { type: "ProgressBar", id: "progress", props: { now: 40, showLabel: true, striped: true, className: "rc-mb-3" } },
        { type: "Spinner", id: "spinner", props: { animation: "border", variant: "primary", size: "sm", text: "Loading..." } },
        { type: "ListGroup", id: "list-group", props: { className: "rc-mt-3", items: [
          { text: "Inbox", badge: 14, active: true }, { text: "Drafts", badge: 2 }, { text: "Archived", disabled: true },
        ] } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "rc-d-flex rc-flex-wrap rc-gap-2" }, children: [
        { type: "ButtonField", id: "btn-heading", props: { text: "Change heading", onClick: "changeHeading()" } },
        { type: "ButtonField", id: "btn-progress", props: { text: "+10% progress", onClick: "addProgress()" } },
        { type: "ButtonField", id: "btn-badge", props: { text: "Recolor badge", onClick: "recolorBadge()" } },
      ] },
    ] },
  ],
  actionsCode: `changeHeading: () => api.setNodeProps("heading", { text: "Heading changed at " + new Date().toLocaleTimeString() }),
addProgress: () => {
  state.progress = state.progress >= 100 ? 0 : state.progress + 10;
  api.setNodeProps("progress", { now: state.progress, variant: state.progress >= 80 ? "success" : undefined });
},
recolorBadge: () => api.setNodeProps("badge-new", { bg: ["primary", "danger", "dark", "info"][Math.floor(Math.random() * 4)] }),`,
  props: [
    ["H1–H6, P, SPAN, ... { text }", "Text in that HTML tag. `Text { tag, text }` picks the tag."],
    ["A { href, text, target }", "A link."],
    ["IMG { src, alt }", "A responsive, rounded image."],
    ["DIV { children, className }", "A box with text."],
    ["LIST { items }", "Bullet list from strings or `{ text }` objects."],
    ["Badge { text, bg, pill, textColor }", "Small colored label."],
    ["Breadcrumb { items: [{ text, href, active }] }", "Navigation trail."],
    ["ProgressBar { now, min, max, showLabel, variant, striped, animated }", "Progress bar."],
    ["Spinner { animation, variant, size, text }", "Loading spinner (`border` or `grow`)."],
    ["ListGroup { items: [{ text, href, active, disabled, variant, badge }], flush, numbered, horizontal }", "List group."],
  ],
  events: [
    ["onClick", "Any node can have it; buttons and links are the usual place.", "`(event, { name })`"],
  ],
  tips: [
    "Keep values that actions update (like the progress here) outside `actions` — the actions object is created again on every render.",
  ],
};

export const elementDynamics = {
  sections: [
    {
      heading: "Change any node by its id",
      body: [
        "`api.setNodeProps(id, props)` merges new props into a node: change its `text`, `className`, `style`, a field's `label` or `disabled`, a button's `variant`, ... `style` is merged with earlier style changes; other props replace.",
        "`api.hideNode(id)`, `showNode(id)` and `toggleNode(id)` hide an element but keep it in the page, so a hidden field keeps its value (and is not validated). `removeNode(id)` takes it out completely; `restoreNode(id)` brings it back.",
        "`api.resetNode(id)` and `api.resetNodes()` undo the changes.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-targets", props: { className: "rc-mb-3" }, children: [
      { type: "column", id: "col-targets", children: [
        { type: "H4", id: "target-title", props: { text: "I am the title (id: target-title)" } },
        { type: "P", id: "target-text", props: { text: "I am a paragraph (id: target-text)." } },
        { type: "DIV", id: "target-box", props: { className: "rc-border rc-rounded rc-p-3 rc-mb-3", children: "A box (id: target-box)" } },
        { type: "InputField", id: "target-field", props: { name: "nickname", label: "Nickname (id: target-field)" } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "rc-d-flex rc-flex-wrap rc-gap-2" }, children: [
        { type: "ButtonField", id: "b1", props: { text: "Change title text", onClick: "changeText()" } },
        { type: "ButtonField", id: "b2", props: { text: "Color the paragraph", onClick: "colorText()" } },
        { type: "ButtonField", id: "b3", props: { text: "Style the box", onClick: "styleBox()" } },
        { type: "ButtonField", id: "b4", props: { text: "Disable / relabel field", onClick: "changeField()" } },
        { type: "ButtonField", id: "b5", props: { text: "Toggle paragraph", variant: "outline-secondary", onClick: "toggleText()" } },
        { type: "ButtonField", id: "b6", props: { text: "Remove box", variant: "outline-danger", onClick: "removeBox()" } },
        { type: "ButtonField", id: "b7", props: { text: "Restore box", variant: "outline-success", onClick: "restoreBox()" } },
        { type: "ButtonField", id: "b8", props: { text: "Undo everything", variant: "outline-dark", onClick: "resetAll()" } },
      ] },
    ] },
  ],
  actionsCode: `changeText: () => api.setNodeProps("target-title", { text: "New title — " + new Date().toLocaleTimeString() }),
colorText: () => api.setNodeProps("target-text", { style: { color: "#d03b3b", fontWeight: 600 } }),
styleBox: () => api.setNodeProps("target-box", { className: "rc-border rc-border-primary rc-border-2 rc-rounded rc-p-3 rc-mb-3 rc-bg-primary-subtle rc-shadow" }),
changeField: () => api.setNodeProps("target-field", { label: "Nickname (locked)", disabled: true }),
toggleText: () => api.toggleNode("target-text"),
removeBox: () => api.removeNode("target-box"),
restoreBox: () => api.restoreNode("target-box"),
resetAll: () => api.resetNodes(),`,
  props: [
    ["api.setNodeProps(id, props)", "Merge props into the node (text, className, style, label, disabled, ...)."],
    ["api.hideNode / showNode / toggleNode(id)", "Hide or show; the element stays in the page and keeps its value."],
    ["api.removeNode / restoreNode(id)", "Take the element out of the page / put it back."],
    ["api.resetNode(id) / resetNodes()", "Undo runtime changes of one node / all nodes."],
  ],
  events: [
    ["onClick", "A button is pressed.", "`(event, { name })`"],
  ],
};
