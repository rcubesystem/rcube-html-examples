<%-- Data table — https://rcube-html.com/data-table
     The schema is in WEB-INF/schemas/data-table.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Data table — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Data table</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/data-table.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        rowClicked: ({ row }) => console.log("Row:", row),
        selectionChanged: ({ selected }) => console.log("Selected keys:", selected),
        sortChanged: ({ sort }) => console.log("Sort:", sort),
        pageChanged: ({ page, pageSize }) => console.log("Page", page, "of size", pageSize),
      }),
    });
  </script>
</body>
</html>
