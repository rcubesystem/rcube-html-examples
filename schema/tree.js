// Tree — A folder tree with checkboxes, drag & drop, rename, context menu and buttons that change it.
// Live example and explanation: https://rcube-html.com/tree
// Group: Data components
//
// Covers:
//   - Nodes
//
// Form fields (name — type, label):
//   - itemName — InputField "Item name"
//   - find — InputField "Find"
//   - view — SelectField "View"
//
// Actions written here: selected, toggled, checked, opened, focused, moved, renamed, newFileHere, deleteNode,
//    findChanged, viewChanged, addItem, renameSelected, deleteSelected, goToDates, showChecked
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/tree";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// Helpers the actions use (PROJECT): in a real app, often your API or data.
const PROJECT = "project";

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "row",
    "id": "row-controls",
    "children": [
      {
        "type": "column",
        "id": "c-name",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "InputField",
            "id": "item-name",
            "props": {
              "name": "itemName",
              "label": "Item name",
              "placeholder": "Header.js — end with / for a folder"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-find",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "InputField",
            "id": "find",
            "props": {
              "name": "find",
              "label": "Find",
              "placeholder": "type to filter",
              "onChange": "findChanged()"
            }
          }
        ]
      },
      {
        "type": "column",
        "id": "c-view",
        "props": {
          "className": "rc-col-12 rc-col-md-4"
        },
        "children": [
          {
            "type": "SelectField",
            "id": "view",
            "props": {
              "name": "view",
              "label": "View",
              "defaultValue": "tree",
              "onChange": "viewChanged()",
              "options": [
                {
                  "label": "Tree",
                  "value": "tree"
                },
                {
                  "label": "Columns",
                  "value": "columns"
                },
                {
                  "label": "Explorer",
                  "value": "explorer"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "type": "row",
    "id": "row-buttons",
    "children": [
      {
        "type": "column",
        "id": "c-buttons",
        "props": {
          "className": "rc-d-flex rc-flex-wrap rc-gap-2 rc-mb-2"
        },
        "children": [
          {
            "type": "ButtonField",
            "id": "add",
            "props": {
              "text": "+ Add to selected folder",
              "variant": "outline-success",
              "onClick": "addItem()"
            }
          },
          {
            "type": "ButtonField",
            "id": "rename",
            "props": {
              "text": "Rename selected",
              "variant": "outline-primary",
              "onClick": "renameSelected()"
            }
          },
          {
            "type": "ButtonField",
            "id": "delete",
            "props": {
              "text": "Delete selected",
              "variant": "outline-danger",
              "onClick": "deleteSelected()"
            }
          },
          {
            "type": "ButtonField",
            "id": "goto",
            "props": {
              "text": "Go to dates.js",
              "variant": "outline-secondary",
              "onClick": "goToDates()"
            }
          },
          {
            "type": "ButtonField",
            "id": "checked",
            "props": {
              "text": "Show checked",
              "variant": "outline-secondary",
              "onClick": "showChecked()"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "Tree",
    "id": "project",
    "props": {
      "title": "my-app",
      "nodes": [
        {
          "id": "src",
          "label": "src",
          "expanded": true,
          "children": [
            {
              "id": "src/components",
              "label": "components",
              "expanded": true,
              "children": [
                {
                  "id": "src/components/Button.js",
                  "label": "Button.js",
                  "size": 2310
                },
                {
                  "id": "src/components/Card.js",
                  "label": "Card.js",
                  "size": 1874
                },
                {
                  "id": "src/components/Modal.js",
                  "label": "Modal.js",
                  "size": 4120,
                  "badge": "new"
                }
              ]
            },
            {
              "id": "src/utils",
              "label": "utils",
              "children": [
                {
                  "id": "src/utils/format.js",
                  "label": "format.js",
                  "size": 980
                },
                {
                  "id": "src/utils/dates.js",
                  "label": "dates.js",
                  "size": 1430
                }
              ]
            },
            {
              "id": "src/index.js",
              "label": "index.js",
              "size": 640
            }
          ]
        },
        {
          "id": "public",
          "label": "public",
          "children": [
            {
              "id": "public/index.html",
              "label": "index.html",
              "size": 1210
            },
            {
              "id": "public/logo.png",
              "label": "logo.png",
              "size": 15086
            }
          ]
        },
        {
          "id": "config",
          "label": "config",
          "icon": "⚙️",
          "children": [
            {
              "id": "config/prod.json",
              "label": "prod.json",
              "size": 310,
              "disabled": true,
              "description": "read-only"
            }
          ]
        },
        {
          "id": "package.json",
          "label": "package.json",
          "size": 1532
        },
        {
          "id": "README.md",
          "label": "README.md",
          "size": 4890
        }
      ],
      "height": 330,
      "checkboxes": true,
      "cascadeCheck": true,
      "showLines": true,
      "showCount": true,
      "draggable": true,
      "editable": true,
      "searchable": false,
      "filters": [
        {
          "id": "js",
          "label": ".js only",
          "when": {
            "field": "ext",
            "equals": "js"
          }
        }
      ],
      "contextMenu": [
        {
          "text": "Rename",
          "command": "rename"
        },
        {
          "text": "New file here",
          "onClick": "newFileHere()",
          "when": {
            "field": "branch",
            "equals": true
          }
        },
        {
          "divider": true
        },
        {
          "text": "Delete",
          "onClick": "deleteNode()"
        }
      ],
      "toolbarActions": [
        {
          "text": "Delete selected",
          "variant": "outline-danger",
          "onClick": "deleteSelected()",
          "needsSelection": true
        }
      ],
      "onSelect": "selected()",
      "onExpand": "toggled()",
      "onCollapse": "toggled()",
      "onCheck": "checked()",
      "onActivate": "opened()",
      "onMove": "moved()",
      "onRename": "renamed()",
      "onNodeFocus": "focused()"
    }
  },
  {
    "type": "P",
    "id": "status",
    "props": {
      "className": "rc-small rc-text-body-secondary rc-mt-2",
      "text": "Select, check, drag, double-click or right-click a node."
    }
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // selected: run by Tree "project" (onSelect)
  selected: ({ node }) => api.setNodeProps("status", { text: "Selected " + node.id }),
  // toggled: run by Tree "project" (onExpand); Tree "project" (onCollapse)
  toggled: ({ node }) => console.log("Toggled", node.id),
  // checked: run by Tree "project" (onCheck)
  checked: ({ checkedIds }) => api.setNodeProps("status", { text: checkedIds.length + " checked" }),
  // opened: run by Tree "project" (onActivate)
  opened: ({ node }) => api.setNodeProps("status", { text: "Open " + node.id }),
  // focused: run by Tree "project" (onNodeFocus)
  focused: ({ node }) => console.log("Focus", node.id),
  // Return false to refuse a change
  // moved: run by Tree "project" (onMove)
  moved: ({ node, parentId }) => {
    if (parentId === "config") { api.setNodeProps("status", { text: "config is read-only" }); return false; }
    return true;
  },
  // renamed: run by Tree "project" (onRename)
  renamed: ({ name }) => /^[\w.-]+$/.test(name),
  // newFileHere: run by Tree "project" (contextMenu › "New file here" › onClick)
  newFileHere: ({ node }) => {
    const id = node.id + "/untitled-" + (Date.now() % 1000) + ".js";
    api.addTreeNode(PROJECT, node.id, { id, label: id.split("/").pop(), size: 0 });
    api.expandTreeNode(PROJECT, node.id);
    api.selectTreeNode(PROJECT, id);
  },
  // deleteNode: run by Tree "project" (contextMenu › "Delete" › onClick)
  deleteNode: ({ node }) => api.removeTreeNode(PROJECT, node.id),
  // Fields and buttons outside the tree
  // findChanged: run by InputField "find" (onChange)
  findChanged: (event, { value }) => api.setTreeSearch(PROJECT, value),
  // viewChanged: run by SelectField "view" (onChange)
  viewChanged: (event, { value }) => value && api.setTreeView(PROJECT, value),
  // addItem: run by ButtonField "add" (onClick)
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
  // renameSelected: run by ButtonField "rename" (onClick)
  renameSelected: () => {
    const selected = api.getSelectedTreeNodes(PROJECT)[0];
    const name = (api.getFormData().itemName || "").trim();
    if (selected && name) api.updateTreeNode(PROJECT, selected.id, { label: name });
  },
  // deleteSelected: run by ButtonField "delete" (onClick); Tree "project" (toolbarActions › "Delete selected" › onClick)
  deleteSelected: () => {
    const selected = api.getSelectedTreeNodes(PROJECT)[0];
    if (selected) api.removeTreeNode(PROJECT, selected.id);
  },
  // goToDates: run by ButtonField "goto" (onClick)
  goToDates: () => api.selectTreeNode(PROJECT, "src/utils/dates.js"),
  // showChecked: run by ButtonField "checked" (onClick)
  showChecked: () => {
    const files = api.getCheckedTreeNodes(PROJECT).filter((n) => !n.children).map((n) => n.id);
    api.setNodeProps("status", { text: files.length ? "Checked: " + files.join(", ") : "Nothing checked" });
  },
});
