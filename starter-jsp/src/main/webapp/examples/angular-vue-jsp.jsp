<%-- Angular, Vue, JSP & plain HTML — https://rcube-html.com/angular-vue-jsp
     The schema is in WEB-INF/schemas/angular-vue-jsp.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Angular, Vue, JSP & plain HTML — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Angular, Vue, JSP & plain HTML</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/angular-vue-jsp.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        // Save: validate, then show what rcube-submit / (submitted) / @submit would carry
        save: () => {
          const entries = api.runValidation();     // nothing when a field isn't valid
          if (!entries) return;
          api.setNodeProps("result", { variant: "success", text: "event.detail.values = " + JSON.stringify(entries[0]) });
        },
      }),
    });
  </script>
</body>
</html>
