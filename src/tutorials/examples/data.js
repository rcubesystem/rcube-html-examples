// Data components: tables, charts, calendar, file upload, trees

const orders = [
  ["Ann Lee", "ann@example.com", "Paid", 120, "2026-10-02"], ["Bob Stone", "bob@example.com", "Due", 75.5, "2026-10-05"],
  ["Cara Diaz", "cara@example.com", "Paid", 310, "2026-10-07"], ["Dev Patel", "dev@example.com", "Overdue", 48, "2026-09-28"],
  ["Eli Moss", "eli@example.com", "Paid", 220, "2026-10-11"], ["Fay Wong", "fay@example.com", "Due", 95, "2026-10-12"],
  ["Gus Hale", "gus@example.com", "Paid", 1250, "2026-10-15"], ["Hana Ito", "hana@example.com", "Overdue", 64, "2026-09-30"],
  ["Ivan Roy", "ivan@example.com", "Paid", 180, "2026-10-18"], ["Jo Kim", "jo@example.com", "Due", 33, "2026-10-20"],
  ["Kai Berg", "kai@example.com", "Paid", 410, "2026-10-22"], ["Lia Cruz", "lia@example.com", "Paid", 88, "2026-10-25"],
].map(([customer, email, status, amount, date], i) => ({ id: i + 1, customer, email, status, amount, date }));

export const dataTable = {
  sections: [
    {
      heading: "A table from columns and rows",
      body: [
        "`columns` say what to show: each has a `key` (the row field), a `title`, and options such as `sortable`, `format` (`currency`, `number`, `percent`, `date`, `boolean`), `badge` (colors by value), `link` and `total`.",
        "`rows` is the data. Table options switch features on: `searchable`, `pageSize`, `selectable`, `exportable` (CSV), `columnToggle`, and `stackBelow: \"md\"` shows cards on small screens.",
        "`rowRules` color whole rows by value; `hoverRow` / `hoverColumn` color what the mouse is over.",
      ],
    },
  ],
  wide: true,
  schema: [
    { type: "DataTable", id: "orders", props: {
      title: "Orders", rowKey: "id",
      columns: [
        { key: "id", title: "#", sortable: true, width: 60 },
        { key: "customer", title: "Customer", sortable: true },
        { key: "email", title: "Email", link: "mailto:{email}", hideBelow: "lg" },
        { key: "status", title: "Status", badge: { Paid: "success", Due: "warning", Overdue: "danger" } },
        { key: "amount", title: "Amount", format: "currency", currency: "USD", align: "end", sortable: true, total: "sum" },
        { key: "date", title: "Date", format: "date", sortable: true },
      ],
      rows: orders,
      pageSize: 5, pageSizeOptions: [5, 10, 25],
      searchable: true, selectable: true, exportable: true, columnToggle: true, stackBelow: "md", size: "sm",
      rowRules: [{ when: { field: "status", equals: "Overdue" }, background: "#fdecec" }],
      hoverRow: { background: "#fff8e1" },
      onRowClick: "rowClicked()", onSelectionChange: "selectionChanged()", onSortChange: "sortChanged()", onPageChange: "pageChanged()",
    } },
  ],
  actionsCode: `rowClicked: ({ row }) => console.log("Row:", row),
selectionChanged: ({ selected }) => console.log("Selected keys:", selected),
sortChanged: ({ sort }) => console.log("Sort:", sort),
pageChanged: ({ page, pageSize }) => console.log("Page", page, "of size", pageSize),`,
  props: [
    ["columns[].key / title / width / align", "Which row field, its heading, width and alignment (`start` / `center` / `end`)."],
    ["columns[].sortable", "Click the heading to sort."],
    ["columns[].format / currency / decimals", "`currency`, `number`, `percent`, `date`, `boolean`."],
    ["columns[].badge", "`{ value: \"bootstrap color\" }` — show the value as a badge."],
    ["columns[].link / template", "Link with `{field}` placeholders; text like `\"{first} {last}\"`."],
    ["columns[].total", "Footer total: `sum`, `avg`, `min`, `max`, `count`."],
    ["columns[].hideBelow", "Hide the column on small screens (`md`, `lg`, ...)."],
    ["rows / rowKey", "The data and the field that identifies a row."],
    ["pageSize / pageSizeOptions", "Rows per page and the choices (`0` = no paging)."],
    ["searchable / selectable / exportable / columnToggle", "Search box, checkboxes, CSV export, column chooser."],
    ["stackBelow", "Cards instead of a table below this screen size."],
    ["rowRules / hoverRow / hoverColumn / hoverCell", "Colors by value and on mouse over."],
  ],
  events: [
    ["onRowClick", "A row is clicked.", "`{ row, rowKey }`"],
    ["onSelectionChange", "Checkboxes change.", "`{ selected, rows }`"],
    ["onSortChange", "A heading is clicked.", "`{ sort: { key, dir } }` (or `null`)"],
    ["onPageChange", "Another page is shown.", "`{ page, pageSize }`"],
  ],
};

export const tableEditing = {
  sections: [
    {
      heading: "Editable cells",
      body: [
        "Give a column an `editor` to make its cells inputs: `{ type: \"number\" }`, `{ type: \"select\", options }`, `{ type: \"checkbox\" }`, ... Editors take the same rules as fields (`required`, `min`, `max`, `pattern`) and are checked on Submit.",
        "With `name` on the table, its rows are part of the submitted entries. `addable` adds a + Add row button, `removable` a Remove button on each row.",
      ],
    },
    {
      heading: "Your own buttons",
      body: [
        "A column with `actions` draws buttons in every row; each `onClick` names your action, called with `{ table, row, rowKey }`. `hiddenWhen` / `disabledWhen` hide or disable a button for some rows.",
        "`toolbarActions` adds buttons above the table; they get the selected rows. From code use `api.addRow`, `api.updateRow`, `api.removeRow`, `api.getRows`.",
      ],
    },
  ],
  wide: true,
  schema: [
    { type: "DataTable", id: "items", props: {
      name: "items", title: "Order items", rowKey: "sku",
      columns: [
        { key: "sku", title: "SKU", width: 90 },
        { key: "product", title: "Product" },
        { key: "qty", title: "Qty", width: 110, total: "sum", editor: { type: "number", required: true, min: 1, max: 99, rangeMessage: "1–99" } },
        { key: "ship", title: "Ship via", width: 150, editor: { type: "select", options: ["Ground", "Air", "Express"] } },
        { key: "gift", title: "Gift", align: "center", editor: { type: "checkbox" } },
        { key: "status", title: "Status", badge: { Ready: "success", "On hold": "secondary" } },
        { key: "actions", title: "", actions: [
          { text: "Hold", variant: "outline-secondary", onClick: "holdItem()", hiddenWhen: { field: "status", equals: "On hold" } },
          { text: "Release", variant: "outline-success", onClick: "releaseItem()", hiddenWhen: { field: "status", equals: "Ready" } },
          { text: "Duplicate", onClick: "duplicateItem()" },
        ] },
      ],
      rows: [
        { sku: "A-100", product: "Notebook", qty: 2, ship: "Ground", gift: false, status: "Ready" },
        { sku: "B-200", product: "Pen set", qty: 5, ship: "Air", gift: true, status: "Ready" },
        { sku: "C-300", product: "Desk lamp", qty: "", ship: "Express", gift: false, status: "On hold" },
      ],
      pageSize: 0, selectable: true, removable: true, addable: true, size: "sm",
      toolbarActions: [{ text: "Hold selected", variant: "outline-secondary", onClick: "holdSelected()", needsSelection: true }],
      rowRules: [{ when: { field: "status", equals: "On hold" }, color: "#6c757d" }],
      onCellChange: "cellChanged()",
    } },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "c-buttons", props: { className: "d-flex gap-2 justify-content-end" }, children: [
        { type: "ButtonField", id: "add-sample", props: { text: "Add a row from code", variant: "outline-primary", onClick: "addSample()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit (validates Qty)", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: `cellChanged: ({ rowKey, column, value }) => console.log(rowKey, column, "=", value),
holdItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "On hold" }),
releaseItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "Ready" }),
duplicateItem: (event, { table, row }) => api.addRow(table, { ...row, sku: row.sku.split("~")[0] + "~" + (Date.now() % 10000) }),
holdSelected: (event, { table, rows }) => rows.forEach((row) => api.updateRow(table, row.sku, { status: "On hold" })),
addSample: () => {
  const n = Math.floor(Math.random() * 900) + 100;
  api.addRow("items", { sku: "N-" + n, product: "New product " + n, qty: 1, ship: "Ground", gift: false, status: "Ready" });
},`,
  props: [
    ["columns[].editor", "`{ type, options, required, min, max, pattern, ...Message }` — an editable cell."],
    ["name", "Submit the rows under this key."],
    ["addable / removable", "+ Add row button / Remove button per row."],
    ["columns[].actions", "Row buttons: `{ text, variant, onClick, hiddenWhen, disabledWhen }`."],
    ["toolbarActions", "Buttons above the table: `{ text, variant, onClick, needsSelection }`."],
    ["api.addRow / updateRow / removeRow / getRows / setRows", "Change rows from code (first argument: the table id)."],
  ],
  events: [
    ["onCellChange", "An editable cell changes.", "`{ row, rowKey, column, value }`"],
    ["row action onClick", "A row button is pressed.", "`(event, { table, name, row, rowKey })`"],
    ["toolbar action onClick", "A toolbar button is pressed.", "`(event, { table, name, selected, rows })`"],
    ["onSubmit", "All cells are valid.", "`[{ items: [ ...rows ] }]`"],
  ],
};

export const charts = {
  sections: [
    {
      heading: "Chart",
      body: [
        "`chartType` picks the kind: `bar`, `line`, `area`, `pie`, `donut` or `scatter`. `labels` are the categories (x axis) and `series` the data: `{ key, name, data: [numbers] }`. A series can be `type: \"line\"` inside a bar chart.",
        "Options add the rest: `stacked`, `horizontal`, `format` (`currency`, ...), `rulers` (reference lines), `dataLabels`, `pointRules` (colors by value), `hover` effect, `highlight`, `tableToggle` and animation.",
        "Fields and buttons change a chart through actions: `api.setChartType`, `setChartValue`, `setChartData`, `addChartPoint`, `highlightChart`, `toggleSeries`, or any prop with `setNodeProps`.",
      ],
    },
  ],
  wide: true,
  schema: [
    { type: "row", id: "row-controls", children: [
      { type: "column", id: "c-type", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "type", props: { name: "chartType", label: "Chart type", defaultValue: "bar", onChange: "typeChanged()",
          options: [{ label: "Bar", value: "bar" }, { label: "Line", value: "line" }, { label: "Area", value: "area" }, { label: "Pie", value: "pie" }, { label: "Donut", value: "donut" }] } },
      ] },
      { type: "column", id: "c-slider", props: { className: "col-12 col-md-4" }, children: [
        { type: "SliderField", id: "march", props: { name: "march", label: "March online sales", min: 0, max: 100, defaultValue: 38, valueSuffix: "K", onChange: "marchChanged()" } },
      ] },
      { type: "column", id: "c-switches", props: { className: "col-12 col-md-4 d-flex gap-3 align-items-center" }, children: [
        { type: "InputField", id: "stacked", props: { type: "checkbox", name: "stacked", label: "Stacked", onChange: "stackedChanged()" } },
        { type: "InputField", id: "labels", props: { type: "checkbox", name: "labels", label: "Values", onChange: "labelsChanged()" } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "c-buttons", props: { className: "d-flex flex-wrap gap-2 mb-3" }, children: [
        { type: "ButtonField", id: "random", props: { text: "Randomize", onClick: "randomize()" } },
        { type: "ButtonField", id: "add", props: { text: "+ Add month", onClick: "addMonth()" } },
        { type: "ButtonField", id: "best", props: { text: "Highlight best month", variant: "outline-success", onClick: "highlightBest()" } },
        { type: "ButtonField", id: "store", props: { text: "Show / hide Store", variant: "outline-secondary", onClick: "toggleStore()" } },
      ] },
    ] },
    { type: "Chart", id: "sales", props: {
      chartType: "bar", title: "Monthly sales", subtitle: "Thousands of USD", height: 300,
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [
        { key: "online", name: "Online", data: [42, 51, 38, 64, 58, 71] },
        { key: "store", name: "Store", data: [30, 28, 35, 31, 40, 37] },
        { key: "target", name: "Target", type: "line", dashed: true, data: [45, 48, 50, 55, 60, 65] },
      ],
      format: "number", yAxis: { title: "Sales (K)" }, rulers: [{ value: 60, label: "Goal", showValue: true }],
      pointRules: [{ when: { lt: 32 }, color: "#d03b3b" }], highlightColor: "#0ca30c", tableToggle: true,
      onPointClick: "pointClicked()", onLegendClick: "legendClicked()",
    } },
  ],
  helpersCode: `const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const random = (min, max) => min + Math.floor(Math.random() * (max - min));`,
  helperNames: ["months", "random"],
  actionsCode: `typeChanged: (event, { value }) => api.setChartType("sales", value || "bar"),
marchChanged: (event, { value }) => api.setChartValue("sales", "online", "Mar", Number(value)),
stackedChanged: (event, { value }) => api.setNodeProps("sales", { stacked: value }),
labelsChanged: (event, { value }) => api.setNodeProps("sales", { dataLabels: value ? "all" : false }),
randomize: () => {
  const { labels, series } = api.getChartData("sales");
  api.setChartData("sales", { series: series.map((s) => (s.key === "target" ? s : { ...s, data: labels.map(() => random(25, 80)) })) });
},
addMonth: () => {
  const { labels } = api.getChartData("sales");
  api.addChartPoint("sales", months[labels.length % 12], { online: random(40, 80), store: random(25, 45), target: 65 }, { max: 12 });
},
highlightBest: () => {
  const { series } = api.getChartData("sales");
  const online = series.find((s) => s.key === "online").data;
  api.highlightChart("sales", { series: "online", index: online.indexOf(Math.max(...online)) });
},
toggleStore: () => api.toggleSeries("sales", "store"),
pointClicked: ({ label, seriesName, value }) => console.log(label, seriesName, value),
legendClicked: ({ series, hidden }) => console.log(series, hidden ? "hidden" : "shown"),`,
  props: [
    ["chartType", "`bar`, `line`, `area`, `pie`, `donut`, `scatter`."],
    ["labels / series", "Categories and `{ key, name, data, type, color, dashed }` series."],
    ["stacked / horizontal", "Stack the bars / areas; draw bars sideways."],
    ["format / currency / decimals", "How values are written (tooltip, labels, table)."],
    ["yAxis / xAxis", "`{ title, min, max, ticks, show }`."],
    ["rulers / bands", "Reference lines `{ value, label }` / shaded ranges `{ from, to }`."],
    ["dataLabels", "`all`, `last`, `max`, `minmax` (pie: `true` = percent)."],
    ["pointRules / highlight / highlightColor / hover / hoverColor", "Colors by value, highlighted marks, hover effect."],
    ["tableToggle / legend / tooltip / animate", "Table view button, legend position, tooltips, animation."],
  ],
  events: [
    ["onPointClick / onPointHover", "A bar / point / slice is clicked or hovered.", "`{ chart, index, label, series, seriesName, value, values }`"],
    ["onLegendClick", "A legend item is clicked.", "`{ chart, series, hidden }`"],
  ],
};

export const calendar = {
  sections: [
    {
      heading: "Events come from your API",
      body: [
        "The calendar calls `onRangeChange` when it first appears and every time the view or the visible dates change. Your action asks the API for that range and answers with `api.setCalendarEvents(id, events)`.",
        "Users can click or drag on empty time to create an event, drag an event to move it, drag its bottom edge to resize it, and click it for details. The calendar updates itself and calls `onEventCreate` / `onEventUpdate` / `onEventDelete` so you can save the change.",
        "Here the API is a small in-memory stand-in (see helpers at the top of Full page.js) — replace its methods with `fetch` calls.",
      ],
    },
    {
      heading: "Event objects",
      body: [
        "`{ id, title, start, end, allDay, calendar, color, location, description, recurrence }`. Times are local `\"YYYY-MM-DDTHH:mm\"`; all-day events use `\"YYYY-MM-DD\"` and `end` is the last day.",
        "`recurrence: { freq: \"weekly\", byDay: [1, 3] }` repeats an event (`daily`, `weekly`, `monthly`, `yearly`, with `interval`, `count`, `until`).",
      ],
    },
  ],
  wide: true,
  helpersCode: `// ---- A stand-in for your events API (dates relative to today) ----
const pad = (n) => String(n).padStart(2, "0");
const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
};
const at = (offset, time) => day(offset) + "T" + time;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const eventsDb = [
  { id: "standup", title: "Daily standup", start: at(-7, "09:30"), end: at(-7, "09:45"), calendar: "work", recurrence: { freq: "weekly", byDay: [1, 2, 3, 4, 5] } },
  { id: "review", title: "Design review", start: at(0, "14:00"), end: at(0, "15:00"), calendar: "work", location: "Room 4B" },
  { id: "lunch", title: "Lunch with Sam", start: at(1, "12:00"), end: at(1, "13:00"), calendar: "personal" },
  { id: "offsite", title: "Team offsite", start: day(3), end: day(4), allDay: true, calendar: "team" },
  { id: "launch", title: "Product launch", start: at(2, "16:00"), end: at(2, "17:30"), calendar: "team" },
  { id: "gym", title: "Gym", start: at(-1, "18:00"), end: at(-1, "19:00"), calendar: "personal", recurrence: { freq: "weekly", byDay: [2, 4] } },
];
const eventsApi = {
  // e.g. fetch("/api/events?start=" + start + "&end=" + end).then((r) => r.json())
  list: ({ start, end }) => wait(300).then(() => eventsDb.filter((e) =>
    e.recurrence || (e.start.slice(0, 10) < end && (e.end || e.start).slice(0, 10) >= start)).map((e) => ({ ...e }))),
  save: (event) => wait(100).then(() => {
    const i = eventsDb.findIndex((e) => e.id === event.id);
    if (i >= 0) eventsDb[i] = { ...event }; else eventsDb.push({ ...event });
  }),
  remove: (id) => wait(100).then(() => {
    const i = eventsDb.findIndex((e) => e.id === id);
    if (i >= 0) eventsDb.splice(i, 1);
  }),
};`,
  helperNames: ["eventsApi"],
  schema: [
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "c-buttons", props: { className: "d-flex flex-wrap gap-2 mb-3" }, children: [
        { type: "ButtonField", id: "month", props: { text: "Month view", variant: "outline-primary", onClick: "showMonth()" } },
        { type: "ButtonField", id: "today", props: { text: "Today", variant: "outline-secondary", onClick: "goToday()" } },
        { type: "ButtonField", id: "personal", props: { text: "Show / hide Personal", variant: "outline-secondary", onClick: "togglePersonal()" } },
        { type: "ButtonField", id: "add", props: { text: "+ Add event via API", variant: "outline-success", onClick: "addViaApi()" } },
      ] },
    ] },
    { type: "Calendar", id: "team-calendar", props: {
      view: "week", views: ["day", "week", "month", "year", "agenda"], height: 640,
      scrollToHour: 8, workingHours: { start: 9, end: 17, days: [1, 2, 3, 4, 5] },
      calendars: [
        { id: "work", name: "Work", color: "#2a78d6" },
        { id: "team", name: "Team", color: "#1baf7a" },
        { id: "personal", name: "Personal", color: "#eb6834" },
      ],
      events: [],
      onRangeChange: "loadEvents()", onViewChange: "viewChanged()", onEventClick: "eventClicked()", onSlotClick: "slotClicked()",
      onEventCreate: "eventCreated()", onEventUpdate: "eventUpdated()", onEventDelete: "eventDeleted()", onCalendarToggle: "calendarToggled()",
    } },
  ],
  actionsCode: `// On first render and whenever the visible range changes: { view, date, start, end }
loadEvents: async ({ start, end }) => {
  api.setCalendarLoading("team-calendar", true);
  const events = await eventsApi.list({ start, end });
  api.setCalendarEvents("team-calendar", events);   // also hides the spinner
},
viewChanged: ({ view }) => console.log("View:", view),
eventClicked: ({ event }) => console.log("Clicked:", event),
slotClicked: ({ start, allDay }) => console.log("Empty slot:", start, allDay),
// The calendar already shows these changes; save them
eventCreated: ({ event }) => eventsApi.save(event),
eventUpdated: ({ event }) => eventsApi.save(event),
eventDeleted: ({ event, scope, series, occurrence }) => (scope === "one"
  ? eventsApi.save({ ...series, recurrence: { ...series.recurrence, exceptions: [...(series.recurrence.exceptions || []), occurrence] } })
  : eventsApi.remove(event.id)),
calendarToggled: ({ calendarId, hidden }) => console.log(calendarId, hidden ? "hidden" : "shown"),
// Buttons outside the calendar
showMonth: () => api.setCalendarView("team-calendar", "month"),
goToday: () => api.calendarToday("team-calendar"),
togglePersonal: () => api.toggleCalendar("team-calendar", "personal"),
addViaApi: async () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const event = { id: "api-" + Date.now(), title: "Customer call", start: date + "T15:00", end: date + "T15:45", calendar: "work" };
  await eventsApi.save(event);
  api.addCalendarEvent("team-calendar", event);
},`,
  props: [
    ["view / views / date", "Starting view, the view buttons, the shown date (default today)."],
    ["calendars", "`[{ id, name, color }]` — the sidebar checkboxes; events link by `calendar`."],
    ["events", "Starting events (or `[]` and load them in `onRangeChange`)."],
    ["height / hourHeight / scrollToHour / dayStartHour / dayEndHour", "Size and the time grid."],
    ["workingHours", "`{ start, end, days }` — shades the rest."],
    ["firstDay / weekends", "Week starts on (0 = Sunday); `false` hides Sat / Sun."],
    ["editable / selectable / eventEditor / autoUpdate", "Drag & edit, drag-select, built-in editor, apply changes itself."],
    ["sidebar / searchable / keyboardShortcuts", "Mini month + calendars, search box, T / D / W / M / Y / A / J / K / C keys."],
  ],
  events: [
    ["onRangeChange", "First render and every view / date change.", "`{ calendar, view, date, start, end }` (`end` exclusive)"],
    ["onEventClick", "An event is clicked.", "`{ event }`"],
    ["onSlotClick / onSelect", "Empty time is clicked / dragged.", "`{ start, end, allDay }`"],
    ["onEventCreate", "The editor creates an event.", "`{ event }`"],
    ["onEventUpdate", "Moved, resized or edited.", "`{ event, previous, change }`"],
    ["onEventDelete", "Deleted.", "`{ event, scope }` (+ `series`, `occurrence` for one repeat)"],
    ["onViewChange / onCalendarToggle", "View button / calendar checkbox.", "`{ view, previousView }` / `{ calendarId, hidden }`"],
  ],
  tips: [
    "Other actions: `setCalendarEvents`, `addCalendarEvent`, `updateCalendarEvent`, `removeCalendarEvent`, `setCalendarView`, `setCalendarDate`, `calendarNext` / `calendarPrev` / `calendarToday`, `getCalendarRange`, `setCalendarLoading`, `toggleCalendar`.",
  ],
};

export const fileUpload = {
  sections: [
    {
      heading: "A drag & drop upload field",
      body: [
        "`FileUploadField` is a form field: users drop files on it, browse, or paste. `accept`, `maxSize`, `maxFiles` and `maxTotalSize` reject wrong files with a reason.",
        "Uploading is your action: `onUpload` gets `{ file, onProgress, signal }`, sends the file and returns the server's answer. Call `onProgress(percent)` for the progress bar; `signal` tells you the user pressed Cancel. Throw an error to mark the file as failed (the user can retry). Or set `uploadUrl` and the field posts the file itself.",
        "On Submit the field must have finished uploading; its value is the list of files (`[{ name, size, status, url, response }]`).",
      ],
    },
  ],
  helpersCode: `// ---- A fake upload with progress. A real one:
//   import { uploadWithXhr } from "rcube-html";
//   uploadFile: ({ file, onProgress, signal }) => uploadWithXhr({ url: "/api/files", file, onProgress, signal })
const fakeUpload = ({ file, onProgress, signal }, failRate = 0) => new Promise((resolve, reject) => {
  let percent = 0;
  const timer = setInterval(() => {
    percent += 8 + Math.random() * 15;
    if (percent < 100) { onProgress(percent); return; }
    clearInterval(timer);
    if (Math.random() < failRate) reject(new Error("Server error (simulated) — press retry"));
    else resolve({ id: "srv-" + Date.now(), url: URL.createObjectURL(file) });
  }, 150);
  signal.addEventListener("abort", () => {
    clearInterval(timer);
    reject(Object.assign(new Error("Upload cancelled"), { name: "AbortError" }));
  });
});`,
  helperNames: ["fakeUpload"],
  schema: [
    { type: "row", id: "row-uploads", props: { className: "g-3" }, children: [
      { type: "column", id: "c-docs", props: { className: "col-12 col-lg-6" }, children: [
        { type: "FileUploadField", id: "docs", props: {
          name: "documents", label: "Documents", required: true,
          accept: ".pdf,.doc,.docx,.txt,image/*", maxSize: "5MB", maxFiles: 4, parallel: 2,
          hint: "PDF, Word, text or images · up to 5 MB · max 4 files",
          onUpload: "uploadFile()", onValidate: "checkName()", onFilesAdded: "filesAdded()", onFileRejected: "fileRejected()",
          onUploadComplete: "uploaded()", onUploadError: "uploadFailed()", onAllComplete: "allDone()", onRemove: "removeFile()",
        } },
      ] },
      { type: "column", id: "c-photos", props: { className: "col-12 col-lg-6" }, children: [
        { type: "FileUploadField", id: "photos", props: {
          name: "photos", label: "Photos (upload when you press the button)", accept: "image/*", variant: "grid",
          autoUpload: false, maxTotalSize: "20MB", title: "Drop photos here", buttonText: "Choose photos",
          onUpload: "uploadPhoto()",
        } },
        { type: "FileUploadField", id: "avatar", props: {
          name: "avatar", label: "Avatar (one file, compact)", multiple: false, compact: true, accept: "image/png,image/jpeg", maxSize: "2MB",
          onUpload: "uploadPhoto()",
        } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "c-buttons", props: { className: "d-flex flex-wrap gap-2 justify-content-end" }, children: [
        { type: "ButtonField", id: "upload-photos", props: { text: "Upload photos", variant: "outline-primary", onClick: "uploadPhotosNow()" } },
        { type: "ButtonField", id: "saved", props: { text: "Load saved documents", variant: "outline-secondary", onClick: "loadSaved()" } },
        { type: "ButtonField", id: "clear", props: { text: "Clear documents", variant: "outline-danger", onClick: "clearDocs()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: `// Receives { file, name, size, type, onProgress, signal }; returns the server's answer
uploadFile: (payload) => fakeUpload(payload, 0.2),
uploadPhoto: (payload) => fakeUpload(payload),
// Return a message to reject a file ("" = OK)
checkName: ({ name }) => (/draft/i.test(name) ? "Drafts are not accepted." : ""),
filesAdded: ({ files, source }) => console.log(files.length, "file(s) added by", source),
fileRejected: ({ file, message }) => console.log(file.name, "rejected:", message),
uploaded: ({ file, response }) => console.log(file.name, "->", response),
uploadFailed: ({ file, error }) => console.log(file.name, "failed:", error.message),
allDone: ({ files, failed }) => console.log(files.length, "uploaded,", failed.length, "failed"),
// Delete it on the server first; return false to keep the file
removeFile: async ({ file }) => { console.log("Delete on server:", file.name); return true; },
uploadPhotosNow: () => api.uploadFiles("photos"),
loadSaved: () => api.setFieldValue("documents", [
  { id: "srv-1", name: "contract.pdf", size: 482133, type: "application/pdf", url: "#contract" },
  { id: "srv-2", name: "invoice-1042.pdf", size: 91022, type: "application/pdf", url: "#invoice" },
]),
clearDocs: () => api.clearFiles("documents"),`,
  props: [
    ["multiple / accept", "Several files or one; allowed types (`.pdf,image/*`)."],
    ["maxSize / minSize / maxTotalSize / maxFiles / minFiles", "Limits (`\"5MB\"` or bytes)."],
    ["onUpload or uploadUrl", "Your upload action, or the built-in POST (`uploadFieldName`, `uploadHeaders`, `uploadData`)."],
    ["autoUpload / parallel / retries", "Upload at once or on a button; uploads at a time; automatic retries."],
    ["variant / compact / dropAnywhere / paste", "`list` or `grid`; small zone; drop anywhere on the page; paste files."],
    ["defaultFiles", "Files already on the server `[{ name, size, url }]`."],
    ["api.uploadFiles / clearFiles / removeFile / retryFile / openFilePicker / getFiles(name)", "Control it from code."],
  ],
  events: [
    ["onUpload", "Each file to upload.", "`{ file, name, size, type, onProgress, signal }` → return the answer"],
    ["onValidate", "Before a file is added.", "`{ file, name, size, type }` → return a message to reject"],
    ["onFilesAdded / onFileRejected", "Files were added / refused.", "`{ files, source }` / `{ file, reason, message }`"],
    ["onUploadComplete / onUploadError", "One upload finished / failed.", "`{ file, response }` / `{ file, error }`"],
    ["onAllComplete", "A batch of uploads settled.", "`{ files, failed }`"],
    ["onRemove", "The user removes a file.", "`{ file }` — return `false` to keep it"],
  ],
};

const projectNodes = [
  { id: "src", label: "src", expanded: true, children: [
    { id: "src/components", label: "components", expanded: true, children: [
      { id: "src/components/Button.js", label: "Button.js", size: 2310 },
      { id: "src/components/Card.js", label: "Card.js", size: 1874 },
      { id: "src/components/Modal.js", label: "Modal.js", size: 4120, badge: "new" },
    ] },
    { id: "src/utils", label: "utils", children: [
      { id: "src/utils/format.js", label: "format.js", size: 980 },
      { id: "src/utils/dates.js", label: "dates.js", size: 1430 },
    ] },
    { id: "src/index.js", label: "index.js", size: 640 },
  ] },
  { id: "public", label: "public", children: [
    { id: "public/index.html", label: "index.html", size: 1210 },
    { id: "public/logo.png", label: "logo.png", size: 15086 },
  ] },
  { id: "config", label: "config", icon: "⚙️", children: [
    { id: "config/prod.json", label: "prod.json", size: 310, disabled: true, description: "read-only" },
  ] },
  { id: "package.json", label: "package.json", size: 1532 },
  { id: "README.md", label: "README.md", size: 4890 },
];

export const tree = {
  sections: [
    {
      heading: "Nodes",
      body: [
        "A tree shows `nodes`: `{ id, label, children }`. A node with `children` is a folder; `expanded: true` opens it at the start. Optional: `icon`, `badge`, `description`, `disabled`, and any data of your own.",
        "Options switch features on: `checkboxes` (with `cascadeCheck`, folders check their children), `showLines`, `draggable` (drag a node onto / between others), `editable` (F2 or double-click to rename), `contextMenu` (right-click), `filters` and search.",
        "Everything can also be changed from outside: the field and buttons above the tree call `api.addTreeNode`, `updateTreeNode`, `removeTreeNode`, `selectTreeNode`, `setTreeSearch`, `expandAllTree`, ...",
      ],
    },
  ],
  wide: true,
  schema: [
    { type: "row", id: "row-controls", children: [
      { type: "column", id: "c-name", props: { className: "col-12 col-md-4" }, children: [
        { type: "InputField", id: "item-name", props: { name: "itemName", label: "Item name", placeholder: "Header.js — end with / for a folder" } },
      ] },
      { type: "column", id: "c-find", props: { className: "col-12 col-md-4" }, children: [
        { type: "InputField", id: "find", props: { name: "find", label: "Find", placeholder: "type to filter", onChange: "findChanged()" } },
      ] },
      { type: "column", id: "c-view", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "view", props: { name: "view", label: "View", defaultValue: "tree", onChange: "viewChanged()",
          options: [{ label: "Tree", value: "tree" }, { label: "Columns", value: "columns" }, { label: "Explorer", value: "explorer" }] } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "c-buttons", props: { className: "d-flex flex-wrap gap-2 mb-2" }, children: [
        { type: "ButtonField", id: "add", props: { text: "+ Add to selected folder", variant: "outline-success", onClick: "addItem()" } },
        { type: "ButtonField", id: "rename", props: { text: "Rename selected", variant: "outline-primary", onClick: "renameSelected()" } },
        { type: "ButtonField", id: "delete", props: { text: "Delete selected", variant: "outline-danger", onClick: "deleteSelected()" } },
        { type: "ButtonField", id: "goto", props: { text: "Go to dates.js", variant: "outline-secondary", onClick: "goToDates()" } },
        { type: "ButtonField", id: "checked", props: { text: "Show checked", variant: "outline-secondary", onClick: "showChecked()" } },
      ] },
    ] },
    { type: "Tree", id: "project", props: {
      title: "my-app", nodes: projectNodes, height: 330,
      checkboxes: true, cascadeCheck: true, showLines: true, showCount: true,
      draggable: true, editable: true, searchable: false,
      filters: [{ id: "js", label: ".js only", when: { field: "ext", equals: "js" } }],
      contextMenu: [
        { label: "Rename", command: "rename" },
        { label: "New file here", action: "newFileHere()", when: { field: "branch", equals: true } },
        { divider: true },
        { label: "Delete", action: "deleteNode()" },
      ],
      onSelect: "selected()", onExpand: "toggled()", onCollapse: "toggled()", onCheck: "checked()", onActivate: "opened()",
      onMove: "moved()", onRename: "renamed()", onNodeFocus: "focused()",
    } },
    { type: "P", id: "status", props: { className: "small text-body-secondary mt-2", text: "Select, check, drag, double-click or right-click a node." } },
  ],
  helpersCode: `const PROJECT = "project";`,
  helperNames: ["PROJECT"],
  actionsCode: `selected: ({ node }) => api.setNodeProps("status", { text: "Selected " + node.id }),
toggled: ({ node }) => console.log("Toggled", node.id),
checked: ({ checkedIds }) => api.setNodeProps("status", { text: checkedIds.length + " checked" }),
opened: ({ node }) => api.setNodeProps("status", { text: "Open " + node.id }),
focused: ({ node }) => console.log("Focus", node.id),
// Return false to refuse a change
moved: ({ node, parentId }) => {
  if (parentId === "config") { api.setNodeProps("status", { text: "config is read-only" }); return false; }
  return true;
},
renamed: ({ name }) => /^[\\w.-]+$/.test(name),
newFileHere: ({ node }) => {
  const id = node.id + "/untitled-" + (Date.now() % 1000) + ".js";
  api.addTreeNode(PROJECT, node.id, { id, label: id.split("/").pop(), size: 0 });
  api.expandTreeNode(PROJECT, node.id);
  api.selectTreeNode(PROJECT, id);
},
deleteNode: ({ node }) => api.removeTreeNode(PROJECT, node.id),
// Fields and buttons outside the tree
findChanged: (event, { value }) => api.setTreeSearch(PROJECT, value),
viewChanged: (event, { value }) => value && api.setTreeView(PROJECT, value),
addItem: () => {
  const name = (api.getFormData().itemName || "").trim();
  if (!name) return;
  const selected = api.getSelectedTreeNodes(PROJECT)[0];
  const parentId = selected ? (selected.children ? selected.id : selected.id.split("/").slice(0, -1).join("/") || null) : null;
  const folder = name.endsWith("/");
  const label = folder ? name.slice(0, -1) : name;
  const id = parentId ? parentId + "/" + label : label;
  api.addTreeNode(PROJECT, parentId, folder ? { id, label, children: [] } : { id, label, size: 0 });
  if (parentId) api.expandTreeNode(PROJECT, parentId);
  api.selectTreeNode(PROJECT, id);
  api.setFieldValue("itemName", "");
},
renameSelected: () => {
  const selected = api.getSelectedTreeNodes(PROJECT)[0];
  const name = (api.getFormData().itemName || "").trim();
  if (selected && name) api.updateTreeNode(PROJECT, selected.id, { label: name });
},
deleteSelected: () => {
  const selected = api.getSelectedTreeNodes(PROJECT)[0];
  if (selected) api.removeTreeNode(PROJECT, selected.id);
},
goToDates: () => api.selectTreeNode(PROJECT, "src/utils/dates.js"),
showChecked: () => {
  const files = api.getCheckedTreeNodes(PROJECT).filter((n) => !n.children).map((n) => n.id);
  api.setNodeProps("status", { text: files.length ? "Checked: " + files.join(", ") : "Nothing checked" });
},`,
  props: [
    ["nodes", "`[{ id, label, children, expanded, icon, badge, description, disabled }]`."],
    ["view / views", "`tree`, `explorer`, `columns`."],
    ["selectionMode", "`none`, `single`, `multiple` (Ctrl / Shift)."],
    ["checkboxes / cascadeCheck", "Checkboxes; folders check their children."],
    ["showLines / showIcons / showCount", "Guide lines, icons, child counts."],
    ["draggable / editable", "Drag to move; rename with F2."],
    ["contextMenu", "`{ label, action }` or `{ label, command: \"rename\" | \"open\" | \"expand\" | \"reload\" | \"delete\" }`, `when`, `divider`."],
    ["filters / searchable", "Filter chips (`when` on node fields, `ext` is filled in) and a search box."],
  ],
  events: [
    ["onSelect", "Selection changes.", "`{ node, selected, nodes }`"],
    ["onExpand / onCollapse", "A folder opens / closes.", "`{ node, id, path, level }`"],
    ["onCheck", "A checkbox changes.", "`{ node, checked, checkedIds, checkedNodes }`"],
    ["onActivate", "Double-click / Enter on a file.", "`{ node }`"],
    ["onMove", "A node is dropped.", "`{ node, target, position, parentId, index }` — return `false` to refuse"],
    ["onRename", "A name is edited.", "`{ node, name, previous }` — return `false` to refuse"],
    ["onNodeFocus / onNodeClick / onNodeDoubleClick / onContextMenu / onDelete", "Focus, clicks, right-click, Delete key.", "`{ node }` (`onDelete`: `{ ids, nodes }`)"],
  ],
  tips: [
    "Keyboard: ↑ ↓ to move, → / ← to open / close, Enter to open, Space to select or check, * to open siblings, F2 to rename, type letters to jump.",
  ],
};

export const treeExplorer = {
  sections: [
    {
      heading: "Load folders from an API",
      body: [
        "Give a folder `hasChildren: true` (and no `children`) — or set `lazyRoot: true` for the top level — and the tree asks your `onLoadChildren` action when it opens: `{ parentId, cursor, pageSize }`. Return `{ children, hasMore, cursor }`.",
        "While `hasMore` is true, the next page loads by itself when the user scrolls to the end — the same token idea as S3's `ListObjectsV2` continuation token. Only the rows on screen are drawn, so thousands of files stay fast.",
        "With `searchMode: \"server\"` the search box calls `onSearch({ query, cursor, pageSize })`, paged the same way.",
      ],
    },
    {
      heading: "The explorer view",
      body: [
        "`view: \"explorer\"` shows folders on the left and the open folder's contents on the right, with a path bar, sorting columns, and Details / List / Icons layouts. Open `logs` below and scroll: 300 files load 50 at a time.",
      ],
    },
  ],
  wide: true,
  helpersCode: `// ---- A stand-in for a bucket listing API (Prefix + Delimiter "/" + continuation token, like S3 ListObjectsV2).
// In a real app call your backend, e.g. fetch("/api/files?prefix=" + prefix + "&token=" + token)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const objects = [];
["2025", "2026"].forEach((year) => {
  for (let m = 1; m <= 12; m += 1) objects.push({ key: "invoices/" + year + "/invoice-" + year + "-" + String(m).padStart(2, "0") + ".pdf", size: 38000 + m * 1234 });
});
for (let i = 0; i < 300; i += 1) objects.push({ key: "logs/app-" + String(i).padStart(4, "0") + ".log", size: 2000 + ((i * 37) % 5000) });
["beach", "mountain", "city", "forest"].forEach((name, i) => objects.push({ key: "images/" + name + ".jpg", size: 1200000 + i * 100000 }));
objects.push({ key: "README.md", size: 1500 });
objects.forEach((o, i) => { o.modified = new Date(Date.UTC(2026, 9, 31) - i * 3600000).toISOString(); });
objects.sort((a, b) => a.key.localeCompare(b.key));

const listFolder = async (prefix, token, max) => {
  await wait(300);
  const entries = [];
  const seen = new Set();
  objects.filter((o) => o.key.startsWith(prefix)).forEach((o) => {
    const rest = o.key.slice(prefix.length);
    const slash = rest.indexOf("/");
    if (slash < 0) entries.push({ id: o.key, label: rest, size: o.size, modified: o.modified });
    else {
      const folder = prefix + rest.slice(0, slash + 1);
      if (!seen.has(folder)) { seen.add(folder); entries.push({ id: folder, label: rest.slice(0, slash), hasChildren: true }); }
    }
  });
  const start = Number(token || 0);
  const page = entries.slice(start, start + max);
  const next = start + page.length;
  return { children: page, hasMore: next < entries.length, cursor: next < entries.length ? String(next) : undefined };
};

const searchFiles = async (query, token, max) => {
  await wait(250);
  const hits = objects.filter((o) => o.key.toLowerCase().includes(query.toLowerCase()));
  const start = Number(token || 0);
  const page = hits.slice(start, start + max).map((o) => ({
    id: o.key, label: o.key.split("/").pop(), size: o.size, modified: o.modified, description: o.key.split("/").slice(0, -1).join("/") || "/",
  }));
  return { nodes: page, hasMore: start + page.length < hits.length, cursor: String(start + page.length) };
};`,
  helperNames: ["listFolder", "searchFiles"],
  schema: [
    { type: "Tree", id: "files", props: {
      title: "demo-bucket", view: "explorer", views: ["explorer", "tree", "columns"], contentView: "details", rootLabel: "demo-bucket",
      height: 440, nodes: [], lazyRoot: true, pageSize: 50, loadMore: "scroll",
      selectionMode: "multiple", searchMode: "server", searchPlaceholder: "Search the whole bucket…",
      filters: [
        { id: "pdf", label: "PDF", when: { field: "ext", equals: "pdf" } },
        { id: "images", label: "Images", when: { field: "ext", in: ["jpg", "png"] } },
      ],
      columns: [
        { key: "label", title: "Name" },
        { key: "size", title: "Size", format: "bytes", width: "110px", align: "end" },
        { key: "modified", title: "Modified", format: "datetime", width: "180px" },
      ],
      contextMenu: [
        { label: "Open", command: "open" },
        { label: "Copy path", action: "copyPath()" },
        { label: "Reload", command: "reload", when: { field: "branch", equals: true } },
      ],
      onLoadChildren: "loadChildren()", onSearch: "search()", onNavigate: "navigated()", onActivate: "openFile()",
      onSelect: "selected()", onScrollEnd: "scrolledToEnd()",
    } },
  ],
  actionsCode: `// { parentId (folder id, null = top), cursor, pageSize } -> { children, hasMore, cursor }
loadChildren: ({ parentId, cursor, pageSize }) => listFolder(parentId || "", cursor, pageSize),
// { query, cursor, pageSize } -> { nodes, hasMore, cursor }
search: ({ query, cursor, pageSize }) => searchFiles(query, cursor, pageSize),
navigated: ({ folder }) => console.log("Folder:", folder || "/"),
openFile: ({ node }) => console.log("Open", node.id, "- e.g. ask your backend for a download URL"),
selected: ({ selected }) => console.log(selected.length, "selected"),
scrolledToEnd: ({ count }) => console.log("Scrolled to the end at", count),
copyPath: ({ node }) => navigator.clipboard && navigator.clipboard.writeText(node.id),`,
  props: [
    ["hasChildren / lazyRoot", "Load a folder's children (or the top level) through `onLoadChildren`."],
    ["pageSize / loadMore", "Items per request; load the next page on `scroll` or with a `button`."],
    ["searchMode", "`client` (loaded nodes) or `server` (`onSearch`)."],
    ["view / contentView / contentPaging", "`explorer` + `details` / `list` / `icons`; `scroll` or `pages`."],
    ["columns", "Explorer details columns: `{ key, title, format: \"bytes\" | \"date\" | \"datetime\", width, align }`."],
    ["api.setTreeChildren / reloadTreeNode / openTreeFolder / scrollToTreeNode", "Drive loading and navigation from code."],
  ],
  events: [
    ["onLoadChildren", "A lazy folder opens / more rows are needed.", "`{ node, parentId, cursor, offset, pageSize, more }` → `{ children, hasMore, cursor }`"],
    ["onSearch", "Search text changes (server mode).", "`{ query, cursor, pageSize, filters, folder }` → `{ nodes, hasMore, cursor }`"],
    ["onNavigate", "Another folder opens (explorer / columns).", "`{ node, folder }`"],
    ["onScrollEnd", "The list was scrolled to its end.", "`{ count }`"],
  ],
  tips: [
    "For S3, call your own backend from `onLoadChildren` — never put AWS keys in a web page.",
  ],
};
