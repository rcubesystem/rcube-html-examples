<%-- Text & HTML tags — https://rcube-html.com/html-tags
     The schema is in WEB-INF/schemas/html-tags.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Text & HTML tags — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Text & HTML tags</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/html-tags.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    // Page state kept outside the actions (they are re-created on every render)
    const state = { progress: 40 };

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        changeHeading: () => api.setNodeProps("heading", { text: "Heading changed at " + new Date().toLocaleTimeString() }),
        addProgress: () => {
          state.progress = state.progress >= 100 ? 0 : state.progress + 10;
          api.setNodeProps("progress", { now: state.progress, variant: state.progress >= 80 ? "success" : undefined });
        },
        recolorBadge: () => api.setNodeProps("badge-new", { bg: ["primary", "danger", "dark", "info"][Math.floor(Math.random() * 4)] }),
      }),
    });
  </script>
</body>
</html>
