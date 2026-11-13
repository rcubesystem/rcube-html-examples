// Tags (keywords) for search engines and package registries: the site's <meta name="keywords">, each tutorial page's
// own tags, the structured data (JSON-LD) and the starters' package.json keywords. One list, used everywhere.
// Plain JS so the build scripts (Node) can read it too.

export const SITE_URL = "https://rcube-html.com";

// What rcube-html is and what people search for to find it
export const SITE_TAGS = [
  "rcube-html", "schema-driven forms", "dynamic forms", "JSON forms", "form builder", "form generator",
  "dynamic content", "dynamic UI", "JSON to HTML", "layout engine", "page builder", "low-code",
  "simple application", "sample application", "starter app", "examples", "tutorials",
  "React", "Next.js", "Angular", "Vue", "JavaScript", "web component", "custom element", "JSP", "Java",
  "server-side rendering", "PHP", ".NET", "CMS", "CMS forms",
  "form validation", "conditional fields", "dependent dropdowns", "input mask", "repeatable fields", "multi-language", "i18n",
  "data table", "datatable", "charts", "calendar", "event calendar", "recurring events", "tree view", "file explorer",
  "file upload", "rich text editor", "modal", "tabs", "accordion",
  "Bootstrap", "Tailwind", "any CSS framework", "responsive",
];

// Each tutorial's own tags (added to the site's on its page)
export const TOPIC_TAGS = {
  introduction: ["getting started", "install", "starter app", "sample application", "simple application", "sign-up form"],
  "schema-basics": ["JSON schema layout", "rows and columns", "grid layout", "schema shorthand", "dynamic layout"],
  "events-actions": ["form events", "onClick", "onChange", "actions", "event handlers"],
  "styles-themes": ["themes", "CSS variables", "dark mode", "Bootstrap theme", "CMS theme", "responsive grid"],
  "angular-vue-jsp": ["Angular forms", "Vue forms", "JSP forms", "web component", "plain JavaScript", "CDN", "server-rendered pages", "WebJars"],
  "html-tags": ["dynamic content", "headings", "lists", "badges", "progress bar", "HTML from JSON"],
  "element-dynamics": ["dynamic content", "show and hide elements", "runtime changes", "dynamic UI"],
  "input-fields": ["input fields", "text input", "date input", "phone mask", "input mask"],
  "select-fields": ["select", "dropdown", "dependent dropdowns", "cascading select", "searchable select"],
  "choice-fields": ["radio buttons", "checkboxes", "slider", "choice fields"],
  validation: ["form validation", "required fields", "pattern validation", "error messages"],
  "conditional-fields": ["conditional fields", "show fields when", "dynamic forms", "conditional logic"],
  "form-values": ["form values", "set form data", "reset form", "get form values"],
  "rich-text": ["rich text editor", "WYSIWYG", "HTML editor", "sanitize HTML"],
  "repeatable-entries": ["repeatable fields", "add another", "dynamic rows", "repeating sections"],
  "cards-alerts": ["cards", "alerts", "notifications", "dynamic content"],
  "tabs-accordion": ["tabs", "accordion", "wizard", "multi-step form"],
  "modal-carousel": ["modal", "dialog", "popup", "carousel", "slider"],
  "data-table": ["data table", "datatable", "sortable table", "searchable table", "pagination", "grid"],
  "server-paging": ["server-side paging", "server-side pagination", "lazy loading table", "API table"],
  "remember-view": ["saved filters", "remember table view", "local storage", "user preferences"],
  "table-editing": ["editable table", "inline editing", "editable grid", "table validation"],
  charts: ["charts", "bar chart", "line chart", "pie chart", "dashboard"],
  calendar: ["calendar", "event calendar", "scheduler", "recurring events", "drag and drop events", "month week day view"],
  "file-upload": ["file upload", "drag and drop upload", "upload progress", "image upload"],
  tree: ["tree", "tree view", "hierarchy", "nested list", "drag and drop tree"],
  "tree-explorer": ["file explorer", "folder tree", "document browser", "tree view"],
  languages: ["multi-language", "i18n", "translations", "localization", "Spanish"],
  "custom-components": ["custom components", "plugins", "extend", "registerComponent"],
};

/** A tutorial page's keywords: its title, its own tags, then the site's (no repeats) */
export const pageKeywords = (topic) => {
  const seen = new Set();
  // "Calendar" and "calendar" are one tag
  return [topic.title, ...(TOPIC_TAGS[topic.slug] || []), ...SITE_TAGS].filter((tag) => !seen.has(tag.toLowerCase()) && seen.add(tag.toLowerCase()));
};

// For package.json "keywords": lowercase, words joined by "-" (npm's style)
export const packageKeywords = (tags) => [...new Set(tags.map((t) => t.toLowerCase().replace(/[^a-z0-9.+#]+/g, "-").replace(/^-|-$/g, "")).filter(Boolean))];
