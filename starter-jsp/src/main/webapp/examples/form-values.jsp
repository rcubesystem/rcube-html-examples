<%-- Read & set values — https://rcube-html.com/form-values
     The schema is in WEB-INF/schemas/form-values.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Read & set values — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Read & set values</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/form-values.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      data: { firstName: "Jane", plan: "Pro", newsletter: true },   // starting values (resetForm returns here)
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        fillAll: () => api.setFormData({ firstName: "John", lastName: "Smith", plan: "Team", newsletter: false }),
        setPlan: () => api.setFieldValue("plan", "Free"),
        readData: () => api.setNodeProps("output", { children: "getFormData() = " + JSON.stringify(api.getFormData()) }),
        readEntries: () => api.setNodeProps("output", { children: "getFormEntries() = " + JSON.stringify(api.getFormEntries()) }),
      }),
    });
  </script>
</body>
</html>
