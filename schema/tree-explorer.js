// File explorer (lazy loading) — An S3-style explorer: folders load from an API page by page as you scroll, with
//    server search.
// Live example and explanation: https://rcube-html.com/tree-explorer
// Group: Data components
//
// Covers:
//   - Load folders from an API
//   - The explorer view
//
// No form fields: it shows content, layout or data.
//
// Actions written here: loadChildren, search, navigated, openFile, selected, scrolledToEnd, copyPath
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/tree-explorer";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// Helpers the actions use (listFolder, searchFiles): in a real app, often your API or data.
// ---- A stand-in for a bucket listing API (Prefix + Delimiter "/" + continuation token, like S3 ListObjectsV2).
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
};

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "Tree",
    "id": "files",
    "props": {
      "title": "demo-bucket",
      "view": "explorer",
      "views": [
        "explorer",
        "tree",
        "columns"
      ],
      "contentView": "details",
      "rootLabel": "demo-bucket",
      "height": 440,
      "nodes": [],
      "lazyRoot": true,
      "pageSize": 50,
      "loadMore": "scroll",
      "selectionMode": "multiple",
      "searchMode": "server",
      "searchPlaceholder": "Search the whole bucket…",
      "filters": [
        {
          "id": "pdf",
          "label": "PDF",
          "when": {
            "field": "ext",
            "equals": "pdf"
          }
        },
        {
          "id": "images",
          "label": "Images",
          "when": {
            "field": "ext",
            "in": [
              "jpg",
              "png"
            ]
          }
        }
      ],
      "columns": [
        {
          "key": "label",
          "title": "Name"
        },
        {
          "key": "size",
          "title": "Size",
          "format": "bytes",
          "width": "110px",
          "align": "end"
        },
        {
          "key": "modified",
          "title": "Modified",
          "format": "datetime",
          "width": "180px"
        }
      ],
      "contextMenu": [
        {
          "label": "Open",
          "command": "open"
        },
        {
          "label": "Copy path",
          "action": "copyPath()"
        },
        {
          "label": "Reload",
          "command": "reload",
          "when": {
            "field": "branch",
            "equals": true
          }
        }
      ],
      "onLoadChildren": "loadChildren()",
      "onSearch": "search()",
      "onNavigate": "navigated()",
      "onActivate": "openFile()",
      "onSelect": "selected()",
      "onScrollEnd": "scrolledToEnd()"
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // { parentId (folder id, null = top), cursor, pageSize } -> { children, hasMore, cursor }
  // loadChildren: run by Tree "files" (onLoadChildren)
  loadChildren: ({ parentId, cursor, pageSize }) => listFolder(parentId || "", cursor, pageSize),
  // { query, cursor, pageSize } -> { nodes, hasMore, cursor }
  // search: run by Tree "files" (onSearch)
  search: ({ query, cursor, pageSize }) => searchFiles(query, cursor, pageSize),
  // navigated: run by Tree "files" (onNavigate)
  navigated: ({ folder }) => console.log("Folder:", folder || "/"),
  // openFile: run by Tree "files" (onActivate)
  openFile: ({ node }) => console.log("Open", node.id, "- e.g. ask your backend for a download URL"),
  // selected: run by Tree "files" (onSelect)
  selected: ({ selected }) => console.log(selected.length, "selected"),
  // scrolledToEnd: run by Tree "files" (onScrollEnd)
  scrolledToEnd: ({ count }) => console.log("Scrolled to the end at", count),
  // copyPath: run by Tree "files" (contextMenu › "Copy path" › action)
  copyPath: ({ node }) => navigator.clipboard && navigator.clipboard.writeText(node.id),
});
