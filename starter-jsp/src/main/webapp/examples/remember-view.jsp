<%-- Remembered views & the chosen row — https://rcube-html.com/remember-view
     The schema is in WEB-INF/schemas/remember-view.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Remembered views & the chosen row — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Remembered views & the chosen row</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/remember-view.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const { configureViewStore, readView, saveView } = RcubeHtml;

    // once signed in: whose choices these are (here a demo person) — in the browser only (Next.js also runs this
    // file on the server, where there is no window / localStorage)
    if (typeof window !== "undefined") configureViewStore({ namespace: "demo.school", user: "demo", days: 7 });
    const ROWS = [{"id":1,"customer":"Aisha Khan","status":"Paid","amount":120.5},{"id":2,"customer":"Ben Lee","status":"Due","amount":80},{"id":3,"customer":"Carla Garcia","status":"Overdue","amount":45.25},{"id":4,"customer":"Dev Patel","status":"Paid","amount":300},{"id":5,"customer":"Elena Novak","status":"Due","amount":64.9},{"id":6,"customer":"Farid Haddad","status":"Paid","amount":18},{"id":7,"customer":"Grace Okafor","status":"Overdue","amount":99.99},{"id":8,"customer":"Hugo Brown","status":"Paid","amount":240},{"id":9,"customer":"Ines Silva","status":"Due","amount":12.5},{"id":10,"customer":"Jamal Wong","status":"Paid","amount":75},{"id":11,"customer":"Kim Ivanova","status":"Due","amount":150},{"id":12,"customer":"Leo Moreau","status":"Overdue","amount":33}];
    const views = { readView, saveView };

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        // the page's filter, saved with the table's view ("<key>:filters": Reset clears it too)
        restoreFilters: () => {
          const saved = views.readView("demo-orders:filters");
          if (saved?.status) { api.setFieldValue("status", saved.status); api.setRows("orders", ROWS.filter((r) => r.status === saved.status)); }
        },
        statusChanged: (event, { value }) => {
          views.saveView("demo-orders:filters", value ? { status: value } : null);
          api.setRows("orders", value ? ROWS.filter((r) => r.status === value) : ROWS);
        },
        viewReset: () => { api.setFieldValue("status", ""); api.setRows("orders", ROWS); },
        openIt: (event, { rows }) => console.log("Open", rows[0]),
      }),
    });
    // once, when the form is on the page
    form.ready.then((api) => {
      api.restoreFilters();
    });
  </script>
</body>
</html>
