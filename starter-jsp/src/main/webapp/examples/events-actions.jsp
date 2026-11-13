<%-- Events & actions — https://rcube-html.com/events-actions
     The schema is in WEB-INF/schemas/events-actions.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Events & actions — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Events & actions</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/events-actions.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        zipChanged: (event, { name, value }) => api.setNodeProps("result", { text: name + " is now " + value }),
        zipBlurred: (event, { value }) => api.setNodeProps("result", { text: "Left the ZIP field with " + (value || "nothing") }),
        zipFocused: () => api.setNodeProps("result", { text: "Typing a ZIP code..." }),
        colorChanged: (event, { value }) => api.setNodeProps("result", { text: "Color: " + value, style: { color: value.toLowerCase() } }),
        fillDemo: () => api.setFormData({ zip: "90210", color: "Blue" }),
      }),
    });
  </script>
</body>
</html>
