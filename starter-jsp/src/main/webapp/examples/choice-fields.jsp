<%-- Radios, checkboxes, slider, textarea — https://rcube-html.com/choice-fields
     The schema is in WEB-INF/schemas/choice-fields.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Radios, checkboxes, slider, textarea — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Radios, checkboxes, slider, textarea</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/choice-fields.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        choiceChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " = " + JSON.stringify(value) }),
      }),
    });
  </script>
</body>
</html>
