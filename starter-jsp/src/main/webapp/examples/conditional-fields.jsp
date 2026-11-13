<%-- Conditional fields — https://rcube-html.com/conditional-fields
     The schema is in WEB-INF/schemas/conditional-fields.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Conditional fields — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Conditional fields</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/conditional-fields.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));
  </script>
</body>
</html>
