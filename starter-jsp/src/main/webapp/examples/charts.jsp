<%-- Charts — https://rcube-html.com/charts
     The schema is in WEB-INF/schemas/charts.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Charts — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Charts</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/charts.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const random = (min, max) => min + Math.floor(Math.random() * (max - min));

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        typeChanged: (event, { value }) => api.setChartType("sales", value || "bar"),
        marchChanged: (event, { value }) => api.setChartValue("sales", "online", "Mar", Number(value)),
        stackedChanged: (event, { value }) => api.setNodeProps("sales", { stacked: value }),
        labelsChanged: (event, { value }) => api.setNodeProps("sales", { dataLabels: value ? "all" : false }),
        randomize: () => {
          const { labels, series } = api.getChartData("sales");
          api.setChartData("sales", { series: series.map((s) => (s.key === "target" ? s : { ...s, data: labels.map(() => random(25, 80)) })) });
        },
        addMonth: () => {
          const { labels } = api.getChartData("sales");
          api.addChartPoint("sales", months[labels.length % 12], { online: random(40, 80), store: random(25, 45), target: 65 }, { max: 12 });
        },
        highlightBest: () => {
          const { series } = api.getChartData("sales");
          const online = series.find((s) => s.key === "online").data;
          api.highlightChart("sales", { series: "online", index: online.indexOf(Math.max(...online)) });
        },
        toggleStore: () => api.toggleSeries("sales", "store"),
        pointClicked: ({ label, seriesName, value }) => console.log(label, seriesName, value),
        legendClicked: ({ series, hidden }) => console.log(series, hidden ? "hidden" : "shown"),
      }),
    });
  </script>
</body>
</html>
