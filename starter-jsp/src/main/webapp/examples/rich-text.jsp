<%-- Rich text editor — https://rcube-html.com/rich-text
     The schema is in WEB-INF/schemas/rich-text.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rich text editor — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Rich text editor</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/rich-text.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        // your tool: the editor is handed over
        shout: (event, { editor }) => editor.setHtml(editor.getHtml().toUpperCase().replace(/<(\/?)([A-Z0-9]+)/g, (m, s, t) => "<" + s + t.toLowerCase())),
        detailsChanged: (event, { value }) => console.log("HTML now:", value),
        showIt: () => api.setNodeProps("preview", { html: api.getFormData().details }),
        fillIt: () => api.setFieldValue("details", "<h4>Trip on Friday</h4><ul><li>Bring lunch</li><li>Wear the uniform</li></ul><script>alert(1)<\/script>"),
      }),
    });
  </script>
</body>
</html>
