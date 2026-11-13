<%-- Change elements at runtime — https://rcube-html.com/element-dynamics
     The schema is in WEB-INF/schemas/element-dynamics.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Change elements at runtime — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Change elements at runtime</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/element-dynamics.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        changeText: () => api.setNodeProps("target-title", { text: "New title — " + new Date().toLocaleTimeString() }),
        colorText: () => api.setNodeProps("target-text", { style: { color: "#d03b3b", fontWeight: 600 } }),
        styleBox: () => api.setNodeProps("target-box", { className: "rc-border rc-border-primary rc-border-2 rc-rounded rc-p-3 rc-mb-3 rc-bg-primary-subtle rc-shadow" }),
        changeField: () => api.setNodeProps("target-field", { label: "Nickname (locked)", disabled: true }),
        toggleText: () => api.toggleNode("target-text"),
        removeBox: () => api.removeNode("target-box"),
        restoreBox: () => api.restoreNode("target-box"),
        resetAll: () => api.resetNodes(),
      }),
    });
  </script>
</body>
</html>
