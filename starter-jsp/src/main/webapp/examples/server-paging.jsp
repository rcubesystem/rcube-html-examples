<%-- Server paging — https://rcube-html.com/server-paging
     The schema is in WEB-INF/schemas/server-paging.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Server paging — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Server paging</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/server-paging.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    // ---- A stand-in for your API: 1,000 students, paged / sorted / searched "on the server" ----
    const FIRST = ["Aisha", "Ben", "Carla", "Dev", "Elena", "Farid", "Grace", "Hugo", "Ines", "Jamal", "Kim", "Leo", "Maya", "Noah", "Omar", "Priya"];
    const LAST = ["Khan", "Lee", "Garcia", "Patel", "Novak", "Haddad", "Okafor", "Brown", "Silva", "Wong", "Ivanova", "Moreau"];
    const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
    const studentsDb = Array.from({ length: 1000 }, (_, i) => ({
      id: 1000 + i, name: FIRST[i % FIRST.length] + " " + LAST[(i * 7) % LAST.length], grade: GRADES[(i * 3) % GRADES.length],
      attendance: 70 + ((i * 37) % 31), average: 50 + ((i * 53) % 51), active: i % 9 !== 0,
    }));
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let failNext = false;
    const studentsApi = {
      // e.g. fetch("/api/students?" + new URLSearchParams({ page, pageSize, q: query, sort: sort?.key || "", dir: sort?.dir || "" })).then((r) => r.json())
      page: async ({ page, pageSize, sort, query }) => {
        await wait(400);
        if (failNext) { failNext = false; throw new Error("The server didn't answer (simulated)"); }
        const q = (query || "").toLowerCase();
        let list = q ? studentsDb.filter((s) => (s.name + " " + s.grade + " " + s.id).toLowerCase().includes(q)) : studentsDb.slice();
        if (sort) list.sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * (sort.dir === "desc" ? -1 : 1));
        const pages = Math.max(1, Math.ceil(list.length / pageSize));
        const p = Math.min(page, pages);
        return { rows: list.slice((p - 1) * pageSize, p * pageSize), total: list.length, page: p };
      },
      failOnce: () => { failNext = true; },
    };
    // the last page the table asked for (for "Reload this page")
    let last = { page: 1, pageSize: 25, sort: null, query: "" };

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        // The table asks for a page: { page, pageSize, sort, query } (its spinner is on already)
        loadPage: async (query) => {
          last = query;
          try {
            const answer = await studentsApi.page(query);
            api.setPageRows("students", { rows: answer.rows, totalRows: answer.total, page: answer.page });
            api.setNodeProps("error", { text: "", className: "rc-d-none" });
          } catch (error) {
            api.setTableLoading("students", false);     // the previous page stays
            api.setNodeProps("error", { text: error.message, className: "" });
          }
        },
        reload: () => api.loadPage(last),
        failNext: () => studentsApi.failOnce(),
      }),
    });
    // once, when the form is on the page
    form.ready.then((api) => {
      api.loadPage({ page: 1, pageSize: 25, sort: null, query: "" });
    });
  </script>
</body>
</html>
