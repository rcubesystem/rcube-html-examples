// The examples in src/examples/ (the home page lists them). Made by the rcube-html site's build (scripts/build-starters.mjs): don't edit by hand.
import { defineAsyncComponent } from "vue";

export const groups = [
  "Getting started",
  "Text & layout",
  "Form fields",
  "Containers",
  "Data components",
  "Advanced"
];

// each loaded when it's opened
export const examples = [
  { ...{"slug":"introduction","group":"Getting started","title":"Introduction","summary":"What rcube-html is, how to install it, the starters for React, Angular, Vue, HTML and JSP, and your first schema-driven form."}, component: defineAsyncComponent(() => import("./examples/Introduction.vue")) },
  { ...{"slug":"schema-basics","group":"Getting started","title":"Schema basics","summary":"Rows, columns, ids, props and children: how a schema describes a page."}, component: defineAsyncComponent(() => import("./examples/SchemaBasics.vue")) },
  { ...{"slug":"events-actions","group":"Getting started","title":"Events & actions","summary":"Name an action in the schema (onChange, onClick, ...) and write it in your page."}, component: defineAsyncComponent(() => import("./examples/EventsActions.vue")) },
  { ...{"slug":"styles-themes","group":"Getting started","title":"Styles & themes","summary":"The stylesheet, your colours as CSS variables, a CMS theme, dark mode, and the grid's span and gap."}, component: defineAsyncComponent(() => import("./examples/StylesThemes.vue")) },
  { ...{"slug":"angular-vue-jsp","group":"Getting started","title":"Angular, Vue, JSP & plain HTML","summary":"The same schema outside React: the <rcube-form> element in Angular, Vue, JSP and server pages, and plain JavaScript."}, component: defineAsyncComponent(() => import("./examples/AngularVueJsp.vue")) },
  { ...{"slug":"html-tags","group":"Text & layout","title":"Text & HTML tags","summary":"Headings, paragraphs, links, images, lists, badges, progress bars and more."}, component: defineAsyncComponent(() => import("./examples/HtmlTags.vue")) },
  { ...{"slug":"element-dynamics","group":"Text & layout","title":"Change elements at runtime","summary":"Change text, colors and classes, or hide, show and remove any element by its id."}, component: defineAsyncComponent(() => import("./examples/ElementDynamics.vue")) },
  { ...{"slug":"input-fields","group":"Form fields","title":"Input fields","summary":"Text, email, password, number, date, phone with a mask, color and checkbox inputs."}, component: defineAsyncComponent(() => import("./examples/InputFields.vue")) },
  { ...{"slug":"select-fields","group":"Form fields","title":"Selects & dependent selects","summary":"Drop-down lists, and a second list whose options follow the first one."}, component: defineAsyncComponent(() => import("./examples/SelectFields.vue")) },
  { ...{"slug":"choice-fields","group":"Form fields","title":"Radios, checkboxes, slider, textarea","summary":"Pick one, pick many, slide to a number or type a longer text."}, component: defineAsyncComponent(() => import("./examples/ChoiceFields.vue")) },
  { ...{"slug":"validation","group":"Form fields","title":"Validation & submit","summary":"Required fields, patterns, ranges, dates and custom messages; submit only when valid."}, component: defineAsyncComponent(() => import("./examples/Validation.vue")) },
  { ...{"slug":"conditional-fields","group":"Form fields","title":"Conditional fields","summary":"Show a field only when another field has a certain value."}, component: defineAsyncComponent(() => import("./examples/ConditionalFields.vue")) },
  { ...{"slug":"form-values","group":"Form fields","title":"Read & set values","summary":"Fill the form from code, read what the user typed, reset or clear it."}, component: defineAsyncComponent(() => import("./examples/FormValues.vue")) },
  { ...{"slug":"rich-text","group":"Form fields","title":"Rich text editor","summary":"A formatting toolbar you choose, your own tools, an HTML Source view; the value is cleaned HTML."}, component: defineAsyncComponent(() => import("./examples/RichText.vue")) },
  { ...{"slug":"repeatable-entries","group":"Form fields","title":"Repeatable entries","summary":"Let the user add the same group of fields several times (e.g. several contacts)."}, component: defineAsyncComponent(() => import("./examples/RepeatableEntries.vue")) },
  { ...{"slug":"cards-alerts","group":"Containers","title":"Cards, alerts, tooltips, popovers","summary":"Boxes and messages that hold other elements, including form fields."}, component: defineAsyncComponent(() => import("./examples/CardsAlerts.vue")) },
  { ...{"slug":"tabs-accordion","group":"Containers","title":"Tabs & accordion","summary":"Split a long form into tabs or collapsible panels; errors open the right tab."}, component: defineAsyncComponent(() => import("./examples/TabsAccordion.vue")) },
  { ...{"slug":"modal-carousel","group":"Containers","title":"Modal & carousel","summary":"Pop-up dialogs with fields, and sliding image / content carousels."}, component: defineAsyncComponent(() => import("./examples/ModalCarousel.vue")) },
  { ...{"slug":"data-table","group":"Data components","title":"Data table","summary":"Sorting, search, paging, selection, formats, totals, CSV export and colors."}, component: defineAsyncComponent(() => import("./examples/DataTable.vue")) },
  { ...{"slug":"server-paging","group":"Data components","title":"Server paging","summary":"Thousands of rows: the server pages, sorts and searches; the table asks for one page at a time."}, component: defineAsyncComponent(() => import("./examples/ServerPaging.vue")) },
  { ...{"slug":"remember-view","group":"Data components","title":"Remembered views & the chosen row","summary":"Tables keep each person's page, sort, search and filters for a week, with Reset; a radio per row and a highlighted chosen row."}, component: defineAsyncComponent(() => import("./examples/RememberView.vue")) },
  { ...{"slug":"table-editing","group":"Data components","title":"Editable table & row actions","summary":"Edit cells, validate them, add / remove rows and add your own buttons to each row."}, component: defineAsyncComponent(() => import("./examples/TableEditing.vue")) },
  { ...{"slug":"charts","group":"Data components","title":"Charts","summary":"Bar, line, area, pie and donut charts whose data changes from fields and buttons."}, component: defineAsyncComponent(() => import("./examples/Charts.vue")) },
  { ...{"slug":"calendar","group":"Data components","title":"Calendar","summary":"Day, week, month, year and schedule views; load events from an API on every view change."}, component: defineAsyncComponent(() => import("./examples/Calendar.vue")) },
  { ...{"slug":"file-upload","group":"Data components","title":"File upload (drag & drop)","summary":"Drop, browse or paste files; validate them and upload with progress, cancel and retry."}, component: defineAsyncComponent(() => import("./examples/FileUpload.vue")) },
  { ...{"slug":"tree","group":"Data components","title":"Tree","summary":"A folder tree with checkboxes, drag & drop, rename, context menu and buttons that change it."}, component: defineAsyncComponent(() => import("./examples/Tree.vue")) },
  { ...{"slug":"tree-explorer","group":"Data components","title":"File explorer (lazy loading)","summary":"An S3-style explorer: folders load from an API page by page as you scroll, with server search."}, component: defineAsyncComponent(() => import("./examples/TreeExplorer.vue")) },
  { ...{"slug":"languages","group":"Advanced","title":"Languages","summary":"Write @keys instead of text and switch the whole form between languages."}, component: defineAsyncComponent(() => import("./examples/Languages.vue")) },
  { ...{"slug":"custom-components","group":"Advanced","title":"Custom components","summary":"Add your own React component and use it in schemas by name."}, component: defineAsyncComponent(() => import("./examples/CustomComponents.vue")) },
];
