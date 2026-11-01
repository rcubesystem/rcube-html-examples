// Form fields: inputs, selects, choices, validation, conditional fields, values, repeatable entries

const result = (text) => ({ type: "row", id: "row-result", children: [
  { type: "column", id: "col-result", children: [{ type: "P", id: "result", props: { className: "alert alert-secondary py-2 small mb-0", text } }] },
] });

export const inputFields = {
  sections: [
    {
      heading: "InputField",
      body: [
        "`InputField` draws an `<input>`. Pick the kind with `props.type`: `text` (default), `email`, `password`, `number`, `date`, `tel`, `color`, `checkbox`, ...",
        "Every field needs a `name` — it is the key of its value. `label` and `placeholder` are the texts. `uppercase` / `lowercase` change letters while typing, and `mask` formats digits (`#` = one digit).",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-text", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "full-name", props: { name: "fullName", label: "Full name (uppercase)", placeholder: "Jane Doe", uppercase: true, onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-email", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "email", props: { type: "email", name: "email", label: "Email (lowercase)", lowercase: true, onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-password", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "password", props: { type: "password", name: "password", label: "Password", onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-phone", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "phone", props: { type: "tel", name: "phone", label: "Phone (mask)", mask: "(###) ###-####", placeholder: "(555) 123-4567", onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-number", props: { className: "col-6 col-md-3" }, children: [
        { type: "InputField", id: "quantity", props: { type: "number", name: "quantity", label: "Quantity", min: 1, max: 10, onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-date", props: { className: "col-6 col-md-3" }, children: [
        { type: "InputField", id: "start", props: { type: "date", name: "startDate", label: "Start date", onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-color", props: { className: "col-6 col-md-3" }, children: [
        { type: "InputField", id: "theme", props: { type: "color", name: "themeColor", label: "Color", onChange: "fieldChanged()" } },
      ] },
      { type: "column", id: "c-check", props: { className: "col-6 col-md-3 d-flex align-items-center" }, children: [
        { type: "InputField", id: "agree", props: { type: "checkbox", name: "agree", label: "I agree", onChange: "fieldChanged()" } },
      ] },
    ] },
    result("Change any field."),
  ],
  actionsCode: `fieldChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),`,
  props: [
    ["type", "`text`, `email`, `password`, `number`, `date`, `tel`, `color`, `checkbox`, `radio`, `range`, ..."],
    ["name", "Key of the value (defaults to the node id)."],
    ["label / placeholder", "Texts shown with the field."],
    ["uppercase / lowercase", "Convert letters while typing."],
    ["mask", "Format digits while typing: `\"(###) ###-####\"`, `\"####-####-####-####\"`."],
    ["min / max", "Number range (checked on Submit, see Validation)."],
    ["disabled / readOnly", "Normal input attributes are passed through."],
  ],
  events: [
    ["onChange", "Every edit.", "`(event, { name, value })` — `value` is `true` / `false` for a checkbox."],
    ["onBlur / onFocus / onKeyDown", "Focus leaves / arrives, a key is pressed.", "`(event, { name, value })`"],
  ],
};

export const selectFields = {
  sections: [
    {
      heading: "SelectField",
      body: [
        "`options` can be plain strings (`[\"Red\", \"Green\"]`) or `{ label, value }` objects when the shown text differs from the stored value. `placeholder` is the empty first choice.",
      ],
    },
    {
      heading: "Dependent selects — optionsFrom",
      body: [
        "`optionsFrom: { field, map }` makes a list follow another field: `map` has one option list per value of that field. Changing the first field clears the second. `waitingText` shows while the first field is empty.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-size", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "size", props: { name: "size", label: "Size (strings)", options: ["Small", "Medium", "Large"], onChange: "selectChanged()" } },
      ] },
      { type: "column", id: "c-plan", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "plan", props: { name: "plan", label: "Plan (label / value)", placeholder: "Choose a plan",
          options: [{ label: "Free — $0", value: "free" }, { label: "Pro — $9", value: "pro" }, { label: "Team — $29", value: "team" }], onChange: "selectChanged()" } },
      ] },
      { type: "column", id: "c-country", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "country", props: { name: "country", label: "Country", options: ["USA", "India", "Germany"], onChange: "selectChanged()" } },
      ] },
      { type: "column", id: "c-city", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "city", props: { name: "city", label: "City (follows Country)", onChange: "selectChanged()",
          optionsFrom: { field: "country", waitingText: "Select a country first", emptyText: "No cities for {value}",
            map: { USA: ["New York", "Chicago", "Austin"], India: ["Chennai", "Mumbai", "Delhi"], Germany: ["Berlin", "Munich"] } } } },
      ] },
    ] },
    result("Pick something."),
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "d-flex gap-2 mt-3" }, children: [
        { type: "ButtonField", id: "set-city", props: { text: "Set Germany → Munich from code", onClick: "setCity()" } },
      ] },
    ] },
  ],
  actionsCode: `selectChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + (value || "(empty)") }),
// A dependent value can be set together with its parent; the city is applied once its options exist
setCity: () => api.setFormData({ country: "Germany", city: "Munich" }),`,
  props: [
    ["options", "`[\"A\", \"B\"]` or `[{ label, value }]`."],
    ["placeholder", "Text of the empty first option."],
    ["optionsFrom.field", "The field this list follows."],
    ["optionsFrom.map", "`{ parentValue: [options] }`."],
    ["optionsFrom.waitingText / emptyText", "Shown when the parent is empty / has no options (`{value}` = parent value)."],
  ],
  events: [
    ["onChange", "A choice is made.", "`(event, { name, value })`"],
  ],
};

export const choiceFields = {
  sections: [
    {
      heading: "One choice, many choices, a number, a long text",
      body: [
        "`RadioGroupField` lets the user pick one of `options` (`inline: false` stacks them). `CheckboxGroupField` allows several; its value is an array.",
        "`SliderField` picks a number between `min` and `max` and shows it (`valueSuffix` adds a unit). `TextareaField` is a multi-line text box (`rows`).",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-radio", props: { className: "col-12 col-md-6" }, children: [
        { type: "RadioGroupField", id: "delivery", props: { name: "delivery", label: "Delivery", options: ["Standard", "Express", "Pick up"], onChange: "choiceChanged()" } },
      ] },
      { type: "column", id: "c-checks", props: { className: "col-12 col-md-6" }, children: [
        { type: "CheckboxGroupField", id: "toppings", props: { name: "toppings", label: "Toppings", options: ["Cheese", "Olives", "Peppers", "Onions"], onChange: "choiceChanged()" } },
      ] },
      { type: "column", id: "c-radio-stacked", props: { className: "col-12 col-md-6" }, children: [
        { type: "RadioGroupField", id: "size", props: { name: "size", label: "Size (stacked)", inline: false,
          options: [{ label: "Small (8\")", value: "S" }, { label: "Medium (12\")", value: "M" }, { label: "Large (16\")", value: "L" }], onChange: "choiceChanged()" } },
      ] },
      { type: "column", id: "c-slider", props: { className: "col-12 col-md-6" }, children: [
        { type: "SliderField", id: "spice", props: { name: "spice", label: "Spice level", min: 0, max: 10, step: 1, defaultValue: 3, valueSuffix: " / 10", onChange: "choiceChanged()" } },
      ] },
      { type: "column", id: "c-notes", props: { className: "col-12" }, children: [
        { type: "TextareaField", id: "notes", props: { name: "notes", label: "Notes", rows: 3, placeholder: "Anything else?", onBlur: "choiceChanged()" } },
      ] },
    ] },
    result("Choose something."),
  ],
  actionsCode: `choiceChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),`,
  props: [
    ["RadioGroupField { options, inline }", "One choice; `inline` (default true) puts options on one line."],
    ["CheckboxGroupField { options, requiredOptions }", "Several choices; value is an array. `requiredOptions` must all be checked."],
    ["SliderField { min, max, step, defaultValue, showValue, valueSuffix }", "A number slider that shows its value."],
    ["TextareaField { rows }", "Multi-line text (default 4 rows)."],
  ],
  events: [
    ["onChange", "A choice changes / the slider moves.", "`(event, { name, value })` — an array for checkbox groups."],
    ["onBlur", "Leaving the textarea.", "`(event, { name, value })`"],
  ],
};

export const validation = {
  sections: [
    {
      heading: "Rules live in the schema",
      body: [
        "Add rules to a field's props: `required`, `pattern`, `min` / `max`, `allowedValues`, and for dates `beforeToday` / `maxYearsAgo`. Each rule has a message prop to replace the default text (`requiredMessage`, `patternMessage`, `rangeMessage`, ...).",
        "The built-in action `runValidation()` checks every visible field. If something is wrong, the messages appear and the first wrong field gets the focus. If everything is fine, your `onSubmit(entries)` runs.",
        "A message disappears as soon as the user edits that field.",
      ],
    },
  ],
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-name", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "name", props: { name: "name", label: "Name", required: true, requiredMessage: "Please tell us your name." } },
      ] },
      { type: "column", id: "c-email", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "email", props: { type: "email", name: "email", label: "Email", required: true,
          pattern: "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}", patternMessage: "That doesn't look like an email address." } },
      ] },
      { type: "column", id: "c-age", props: { className: "col-6 col-md-3" }, children: [
        { type: "InputField", id: "age", props: { type: "number", name: "age", label: "Age", required: true, min: 18, max: 99, rangeMessage: "Age must be 18 to 99." } },
      ] },
      { type: "column", id: "c-shoe", props: { className: "col-6 col-md-3" }, children: [
        { type: "InputField", id: "shoe", props: { type: "number", name: "shoeSize", label: "Shoe size", allowedValues: [7, 8, 9, 10, 11], allowedValuesMessage: "We stock sizes 7–11." } },
      ] },
      { type: "column", id: "c-birth", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "birth", props: { type: "date", name: "birthDate", label: "Date of birth", required: true, beforeToday: true, maxYearsAgo: 120 } },
      ] },
      { type: "column", id: "c-zip", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "zip", props: { name: "zip", label: "ZIP code", mask: "#####", pattern: "\\d{5}", patternMessage: "Five digits, please." } },
      ] },
      { type: "column", id: "c-topics", props: { className: "col-12 col-md-6" }, children: [
        { type: "CheckboxGroupField", id: "topics", props: { name: "topics", label: "Topics", required: true, options: ["News", "Tips", "Offers"] } },
      ] },
      { type: "column", id: "c-terms", props: { className: "col-12" }, children: [
        { type: "InputField", id: "terms", props: { type: "checkbox", name: "terms", label: "I accept the terms", required: true } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "d-flex justify-content-end gap-2" }, children: [
        { type: "ButtonField", id: "clear", props: { text: "Clear", onClick: "clearForm()" } },
        { type: "ButtonField", id: "check", props: { text: "Check without submitting", variant: "outline-secondary", onClick: "checkOnly()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: `// runValidation() returns the entries when valid (and calls onSubmit), undefined when not
checkOnly: () => {
  const entries = api.runValidation();
  window.alert(entries ? "All good!" : "Please fix the marked fields.");
},`,
  props: [
    ["required / requiredMessage", "Must be filled (checkbox: checked; group: at least one)."],
    ["pattern / patternMessage", "Regular expression for the whole value."],
    ["min / max / rangeMessage", "Number range."],
    ["allowedValues / allowedValuesMessage", "Only these values are accepted."],
    ["numberMessage", "When a number field holds text that isn't a number."],
    ["beforeToday / beforeTodayMessage", "Date must be before today (also limits the date picker)."],
    ["maxYearsAgo / maxYearsAgoMessage", "Date no more than N years ago."],
    ["requiredOptions / requiredOptionsMessage", "Checkbox group options that must all be checked."],
  ],
  events: [
    ["onSubmit", "`runValidation()` found no errors.", "`[{ name, email, age, ... }]` — one object per entry."],
  ],
  tips: [
    "Hidden fields (visibleWhen, `hideNode`, closed modals) are not validated.",
    "To validate on your own button, call `api.runValidation()` in an action — it returns the entries or `undefined`.",
  ],
};

export const conditionalFields = {
  sections: [
    {
      heading: "visibleWhen",
      body: [
        "Add `visibleWhen` to any node — a field, a column or a whole row — to show it only when another field has a value. Hidden nodes are not drawn, so they are not validated.",
        "Tests: `equals` (radio, select, text), `includesAny` and `includesAll` (checkbox groups).",
      ],
      code: "{ type: \"column\", id: \"c-email\", visibleWhen: { field: \"contactBy\", equals: \"Email\" }, children: [ ... ] }",
    },
  ],
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-contact", props: { className: "col-12" }, children: [
        { type: "RadioGroupField", id: "contact-by", props: { name: "contactBy", label: "How should we contact you?", required: true, options: ["Email", "Phone", "Post"] } },
      ] },
      { type: "column", id: "c-email", visibleWhen: { field: "contactBy", equals: "Email" }, props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "email", props: { type: "email", name: "email", label: "Email", required: true } },
      ] },
      { type: "column", id: "c-phone", visibleWhen: { field: "contactBy", equals: "Phone" }, props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "phone", props: { type: "tel", name: "phone", label: "Phone", required: true, mask: "(###) ###-####" } },
        { type: "SelectField", id: "best-time", props: { name: "bestTime", label: "Best time to call", options: ["Morning", "Afternoon", "Evening"] } },
      ] },
      { type: "column", id: "c-address", visibleWhen: { field: "contactBy", equals: "Post" }, props: { className: "col-12" }, children: [
        { type: "TextareaField", id: "address", props: { name: "address", label: "Postal address", rows: 2, required: true } },
      ] },
    ] },
    { type: "row", id: "row-2", children: [
      { type: "column", id: "c-extras", props: { className: "col-12 col-md-6" }, children: [
        { type: "CheckboxGroupField", id: "extras", props: { name: "extras", label: "Extras", options: ["Newsletter", "Special offers"] } },
      ] },
      { type: "column", id: "c-offer", visibleWhen: { field: "extras", includesAny: ["Special offers"] }, props: { className: "col-12 col-md-6" }, children: [
        { type: "SelectField", id: "offer-type", props: { name: "offerType", label: "Offers about", required: true, options: ["Books", "Music", "Travel"] } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "d-flex justify-content-end" }, children: [
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: "",
  props: [
    ["visibleWhen.field", "The field to watch (its `name`)."],
    ["visibleWhen.equals", "Show when the value equals this (radio, select, text)."],
    ["visibleWhen.includesAny / includesAll", "Show when a checkbox group has any / all of these."],
  ],
  events: [
    ["onSubmit", "Valid submit.", "Hidden fields still appear in the entries, with an empty value, so every entry has the same keys."],
  ],
};

export const formValues = {
  sections: [
    {
      heading: "Set values from code",
      body: [
        "`api.setFormData({ ... })` sets many fields; `api.setFieldValue(name, value)` sets one. Both work for fields that are hidden or still waiting for a dependent list.",
        "`data` in `useDynamicTag({ data })` gives the starting values; `api.resetForm()` goes back to them and `api.clearForm()` empties everything.",
      ],
    },
    {
      heading: "Read values",
      body: [
        "`api.getFormData()` returns a flat object of every field on the page. `api.getFormEntries()` returns `[{ ... }]` — one object per entry — the same shape `onSubmit` receives.",
      ],
    },
  ],
  options: { data: { firstName: "Jane", plan: "Pro", newsletter: true } },
  optionsCode: `data: { firstName: "Jane", plan: "Pro", newsletter: true },   // starting values (resetForm returns here)`,
  schema: [
    { type: "row", id: "row-1", children: [
      { type: "column", id: "c-first", props: { className: "col-12 col-md-4" }, children: [
        { type: "InputField", id: "first", props: { name: "firstName", label: "First name" } },
      ] },
      { type: "column", id: "c-last", props: { className: "col-12 col-md-4" }, children: [
        { type: "InputField", id: "last", props: { name: "lastName", label: "Last name" } },
      ] },
      { type: "column", id: "c-plan", props: { className: "col-12 col-md-4" }, children: [
        { type: "SelectField", id: "plan", props: { name: "plan", label: "Plan", options: ["Free", "Pro", "Team"] } },
      ] },
      { type: "column", id: "c-news", props: { className: "col-12" }, children: [
        { type: "InputField", id: "newsletter", props: { type: "checkbox", name: "newsletter", label: "Newsletter" } },
      ] },
    ] },
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "d-flex flex-wrap gap-2 mb-3" }, children: [
        { type: "ButtonField", id: "fill", props: { text: "setFormData", onClick: "fillAll()" } },
        { type: "ButtonField", id: "one", props: { text: "setFieldValue (plan)", onClick: "setPlan()" } },
        { type: "ButtonField", id: "read", props: { text: "getFormData", variant: "outline-primary", onClick: "readData()" } },
        { type: "ButtonField", id: "entries", props: { text: "getFormEntries", variant: "outline-primary", onClick: "readEntries()" } },
        { type: "ButtonField", id: "reset", props: { text: "resetForm", variant: "outline-secondary", onClick: "resetForm()" } },
        { type: "ButtonField", id: "clear", props: { text: "clearForm", variant: "outline-danger", onClick: "clearForm()" } },
      ] },
    ] },
    { type: "row", id: "row-output", children: [
      { type: "column", id: "col-output", children: [
        { type: "DIV", id: "output", props: { className: "border rounded p-2 bg-body-tertiary font-monospace small", children: "Values appear here." } },
      ] },
    ] },
  ],
  actionsCode: `fillAll: () => api.setFormData({ firstName: "John", lastName: "Smith", plan: "Team", newsletter: false }),
setPlan: () => api.setFieldValue("plan", "Free"),
readData: () => api.setNodeProps("output", { children: "getFormData() = " + JSON.stringify(api.getFormData()) }),
readEntries: () => api.setNodeProps("output", { children: "getFormEntries() = " + JSON.stringify(api.getFormEntries()) }),`,
  props: [
    ["data (useDynamicTag)", "Starting values `{ name: value }`."],
    ["api.setFormData(values) / setFieldValue(name, value)", "Set values from code."],
    ["api.getFormData()", "Flat `{ name: value }` of every rendered field."],
    ["api.getFormEntries()", "`[{ ... }]`, one object per entry."],
    ["api.resetForm() / clearForm()", "Back to `data` / empty everything."],
  ],
  events: [
    ["onClick", "A button is pressed.", "`(event, { name })`"],
  ],
};

export const repeatableEntries = {
  sections: [
    {
      heading: "repeatable: true",
      body: [
        "With `useDynamicTag({ repeatable: true })` the user can add the same set of fields again — for example several contacts. Each copy gets an \"Entry N\" heading and a Remove button.",
        "Put the buttons in `buttons` (not in `schema`) so they appear once, below all entries. The built-in `addCopy()` adds an entry.",
        "`onSubmit` receives one object per entry, all with the same keys: `[{ name, email }, { name, email }]`.",
      ],
    },
  ],
  options: { repeatable: true },
  optionsCode: `repeatable: true,`,
  schema: [
    { type: "row", id: "row-contact", children: [
      { type: "column", id: "c-name", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "name", props: { name: "name", label: "Contact name", required: true } },
      ] },
      { type: "column", id: "c-email", props: { className: "col-12 col-md-6" }, children: [
        { type: "InputField", id: "email", props: { type: "email", name: "email", label: "Email", required: true } },
      ] },
    ] },
  ],
  buttons: [
    { type: "row", id: "row-buttons", children: [
      { type: "column", id: "col-buttons", props: { className: "d-flex justify-content-between mt-2" }, children: [
        { type: "ButtonField", id: "add", props: { text: "+ Add another contact", variant: "outline-primary", onClick: "addCopy()" } },
        { type: "ButtonField", id: "submit", props: { type: "submit", text: "Submit", onClick: "runValidation()" } },
      ] },
    ] },
  ],
  submit: true,
  actionsCode: "",
  props: [
    ["repeatable (useDynamicTag)", "Allow copies of the schema."],
    ["buttons (useDynamicTag)", "Nodes drawn once, after all copies."],
    ["addCopy() / removeCopy()", "Built-in actions to add / remove an entry."],
  ],
  events: [
    ["onSubmit", "All entries are valid.", "`[{ name, email }, { name, email }, ...]`"],
  ],
  tips: ["Inside the page, copy N's field names get a `__N` suffix (`email__2`); the entries strip it."],
};
