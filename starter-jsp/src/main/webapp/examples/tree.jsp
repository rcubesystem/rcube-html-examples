<%-- Tree — https://rcube-html.com/tree
     The schema is in WEB-INF/schemas/tree.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tree — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Tree</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/tree.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const PROJECT = "project";

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        selected: ({ node }) => api.setNodeProps("status", { text: "Selected " + node.id }),
        toggled: ({ node }) => console.log("Toggled", node.id),
        checked: ({ checkedIds }) => api.setNodeProps("status", { text: checkedIds.length + " checked" }),
        opened: ({ node }) => api.setNodeProps("status", { text: "Open " + node.id }),
        focused: ({ node }) => console.log("Focus", node.id),
        // Return false to refuse a change
        moved: ({ node, parentId }) => {
          if (parentId === "config") { api.setNodeProps("status", { text: "config is read-only" }); return false; }
          return true;
        },
        renamed: ({ name }) => /^[\w.-]+$/.test(name),
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
        },
      }),
    });
  </script>
</body>
</html>
