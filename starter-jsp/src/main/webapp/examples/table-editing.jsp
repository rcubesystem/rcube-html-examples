<%-- Editable table & row actions — https://rcube-html.com/table-editing
     The schema is in WEB-INF/schemas/table-editing.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Editable table & row actions — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Editable table & row actions</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/table-editing.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        cellChanged: ({ rowKey, column, value }) => console.log(rowKey, column, "=", value),
        holdItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "On hold" }),
        releaseItem: (event, { table, rowKey }) => api.updateRow(table, rowKey, { status: "Ready" }),
        duplicateItem: (event, { table, row }) => api.addRow(table, { ...row, sku: row.sku.split("~")[0] + "~" + (Date.now() % 10000) }),
        holdSelected: (event, { table, rows }) => rows.forEach((row) => api.updateRow(table, row.sku, { status: "On hold" })),
        addSample: () => {
          const n = Math.floor(Math.random() * 900) + 100;
          api.addRow("items", { sku: "N-" + n, product: "New product " + n, qty: 1, ship: "Ground", gift: false, status: "Ready" });
        },
      }),
    });
    form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));
  </script>
</body>
</html>
