// Containers: cards / alerts / tooltips / popovers, tabs / accordion, modal / carousel

const slide = (color, label) => "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="260"><rect width="100%" height="100%" fill="${color}"/>` +
  `<text x="50%" y="50%" fill="#fff" font-family="sans-serif" font-size="36" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
);

export const cardsAlerts = {
  sections: [
    {
      heading: "Containers hold other nodes",
      body: [
        "Containers draw a Bootstrap component and put their `children` inside it. Children can be anything — text, buttons, rows and form fields. Fields inside a container still validate and submit normally.",
        "`Card` has `header`, `title`, `footer` (and `imgSrc`) in props and its children in the body. `Alert` shows `heading` and `text`; with `dismissible: true` the × button hides it, and `api.showNode(id)` brings it back.",
        "`Tooltip` and `Popover` wrap their children and show `text` on hover / click.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-1", props: { className: "g-3" }, children: [
      { type: "column", id: "c-card", props: { className: "col-12 col-md-6" }, children: [
        { type: "Card", id: "profile-card", props: { header: "Profile", title: "Jane Doe", footer: "Last login: today" }, children: [
          { type: "P", id: "card-text", props: { text: "Cards can hold any nodes, including fields:" } },
          { type: "InputField", id: "card-email", props: { type: "email", name: "cardEmail", label: "Email" } },
        ] },
      ] },
      { type: "column", id: "c-alerts", props: { className: "col-12 col-md-6" }, children: [
        { type: "Alert", id: "notice", props: { variant: "warning", heading: "Heads up!", text: "Close me with ×, then press \"Show alert again\".", dismissible: true, onClose: "alertClosed()" } },
        { type: "Alert", id: "info", props: { variant: "info", text: "A plain info alert." } },
      ] },
    ] },
    { type: "row", id: "row-2", props: { className: "mt-3" }, children: [
      { type: "column", id: "c-overlays", props: { className: "d-flex flex-wrap gap-2 align-items-start" }, children: [
        { type: "ButtonField", id: "show-alert", props: { text: "Show alert again", onClick: "showAlert()" } },
        { type: "Tooltip", id: "tip", props: { text: "I'm a tooltip", placement: "top" }, children: [
          { type: "ButtonField", id: "tip-btn", props: { text: "Hover me (tooltip)", variant: "outline-secondary" } },
        ] },
        { type: "Popover", id: "pop", props: { title: "Popover", text: "Click outside to close.", placement: "bottom", trigger: "click" }, children: [
          { type: "ButtonField", id: "pop-btn", props: { text: "Click me (popover)", variant: "outline-secondary" } },
        ] },
      ] },
    ] },
  ],
  actionsCode: `alertClosed: () => console.log("The alert was closed"),
showAlert: () => api.showNode("notice"),`,
  props: [
    ["Card { header, title, content, footer, imgSrc }", "A card; `children` go in its body."],
    ["Alert { variant, heading, text, dismissible }", "A message box; dismissible hides it."],
    ["Tooltip { text, placement }", "Text on hover around its children."],
    ["Popover { title, text, placement, trigger }", "A small pop-up around its children."],
  ],
  events: [
    ["onClose (Alert)", "The user closes a dismissible alert.", "`(event)`"],
  ],
};

export const tabsAccordion = {
  sections: [
    {
      heading: "Tabs and Accordion",
      body: [
        "Both take `items`: one `{ key, title, children }` per tab / panel. All tabs stay in the page, so values are kept when switching, and every tab is validated on Submit — a failed Submit opens the tab that holds the first error.",
        "A button can switch tabs without code: give it `data-tabs` (the Tabs id), `data-key` (the tab) and `onClick: \"selectTab()\"`. From code: `api.selectTab(id, key)`.",
        "Accordion with `alwaysOpen: true` lets several panels be open at once.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-tabs", children: [
      { type: "column", id: "c-tabs", children: [
        { type: "Tabs", id: "profile-tabs", props: { defaultActiveKey: "personal", onSelect: "tabChanged()" }, items: [
          { key: "personal", title: "Personal", children: [
            { type: "InputField", id: "name", props: { name: "name", label: "Name", required: true } },
          ] },
          { key: "address", title: "Address", children: [
            { type: "InputField", id: "city", props: { name: "city", label: "City (required — leave it empty and press Submit)", required: true } },
          ] },
          { key: "notes", title: "Notes", children: [
            { type: "TextareaField", id: "notes", props: { name: "notes", label: "Notes", rows: 2 } },
          ] },
        ] },
      ] },
    ] },
    { type: "row", id: "row-tab-buttons", children: [
      { type: "column", id: "c-tab-buttons", props: { className: "d-flex gap-2 mb-4" }, children: [
        { type: "ButtonField", id: "go-address", props: { text: "Go to Address", variant: "outline-primary", "data-tabs": "profile-tabs", "data-key": "address", onClick: "selectTab()" } },
        { type: "ButtonField", id: "go-notes", props: { text: "Go to Notes (from code)", variant: "outline-primary", onClick: "openNotes()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
    { type: "row", id: "row-accordion", children: [
      { type: "column", id: "c-accordion", children: [
        { type: "Accordion", id: "faq", props: { defaultActiveKey: "shipping", alwaysOpen: true, onSelect: "panelChanged()" }, items: [
          { key: "shipping", title: "How long does shipping take?", children: [
            { type: "P", id: "a1", props: { text: "Orders ship within 2 business days." } },
          ] },
          { key: "returns", title: "Can I return an item?", children: [
            { type: "P", id: "a2", props: { text: "Yes, within 30 days." } },
            { type: "InputField", id: "order-no", props: { name: "orderNo", label: "Order number (a field inside a panel)" } },
          ] },
        ] },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: `tabChanged: ({ eventKey }) => console.log("Tab:", eventKey),
panelChanged: ({ eventKey }) => console.log("Panel(s):", eventKey),
openNotes: () => api.selectTab("profile-tabs", "notes"),`,
  props: [
    ["Tabs { defaultActiveKey, variant }", "Tabs; `items: [{ key, title, children }]`."],
    ["Accordion { defaultActiveKey, alwaysOpen, flush }", "Collapsible panels; same `items`."],
    ["data-tabs / data-key + selectTab()", "A button that opens a tab (also works for Accordion)."],
    ["api.selectTab(id, key)", "Open a tab / panel from code."],
  ],
  events: [
    ["onSelect (Tabs)", "Another tab is chosen.", "`{ eventKey }` — the tab key."],
    ["onSelect (Accordion)", "A panel opens or closes.", "`{ eventKey }` — key(s) of the open panel(s)."],
    ["onSubmit", "Valid submit (all tabs checked).", "The entries."],
  ],
};

export const modalCarousel = {
  sections: [
    {
      heading: "Modal",
      body: [
        "A `Modal` (also `Dialog`) stays in the page while closed, so its fields keep their values. Fields inside a closed modal are not validated.",
        "Open and close it without code: a button with `data-modal` (the modal id) and `onClick: \"openModal()\"` / `\"closeModal()\"`. From code: `api.openModal(id)` / `api.closeModal(id)`. Buttons for the bottom of the modal go in `footer`.",
      ],
    },
    {
      heading: "Carousel",
      body: [
        "`items` are slides: an image slide `{ src, alt, caption, text }` or a slide made of nodes `{ children }`. `interval` is the time per slide in ms (`null` stops auto-play).",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-modal", children: [
      { type: "column", id: "c-modal", props: { className: "d-flex gap-2 mb-2" }, children: [
        { type: "ButtonField", id: "open", props: { text: "Edit profile (modal)", variant: "primary", "data-modal": "edit-modal", onClick: "openModal()" } },
        { type: "P", id: "saved", props: { className: "mb-0 align-self-center text-body-secondary", text: "" } },
      ] },
    ] },
    {
      type: "Modal", id: "edit-modal", props: { title: "Edit profile", show: false, centered: true, onHide: "modalHidden()" },
      children: [
        { type: "InputField", id: "nickname", props: { name: "nickname", label: "Nickname", required: true } },
        { type: "SelectField", id: "theme", props: { name: "theme", label: "Theme", options: ["Light", "Dark"] } },
      ],
      footer: [
        { type: "ButtonField", id: "cancel", props: { text: "Cancel", variant: "outline-secondary", "data-modal": "edit-modal", onClick: "closeModal()" } },
        { type: "ButtonField", id: "save", props: { text: "Save", onClick: "saveProfile()" } },
      ],
    },
    { type: "row", id: "row-carousel", props: { className: "mt-3" }, children: [
      { type: "column", id: "c-carousel", children: [
        { type: "Carousel", id: "hero", props: { interval: 4000 }, items: [
          { src: slide("#2a78d6", "Slide one"), alt: "Slide one", caption: "Image slide", text: "With a caption" },
          { src: slide("#1baf7a", "Slide two"), alt: "Slide two", caption: "Second slide" },
          { children: [
            { type: "DIV", id: "node-slide", props: { className: "p-5 text-center bg-body-tertiary", style: { height: 260 }, children: "A slide made of schema nodes" } },
          ] },
        ] },
      ] },
    ] },
  ],
  actionsCode: `saveProfile: () => {
  const { nickname, theme } = api.getFormData();
  if (!nickname) { api.setNodeProps("saved", { text: "Nickname is required." }); return; }
  api.setNodeProps("saved", { text: "Saved: " + nickname + " (" + (theme || "no theme") + ")" });
  api.closeModal("edit-modal");
},
modalHidden: () => console.log("Modal closed"),`,
  props: [
    ["Modal { title, show, size, centered, backdrop }", "A dialog; `children` = body, `footer` = bottom buttons."],
    ["data-modal + openModal() / closeModal()", "Buttons that open / close a modal."],
    ["api.openModal(id) / closeModal(id)", "Open / close from code."],
    ["Carousel { interval }", "Slides from `items`: `{ src, alt, caption, text }` or `{ children }`."],
  ],
  events: [
    ["onHide (Modal)", "The modal closes itself (× or backdrop click).", "—"],
  ],
};
