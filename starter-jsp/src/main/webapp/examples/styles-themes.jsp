<%-- Styles & themes — https://rcube-html.com/styles-themes
     The schema is in WEB-INF/schemas/styles-themes.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Styles & themes — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Styles & themes</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/styles-themes.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        // The variables of each look (on your site: once, on :root)
        applyLook: (event, { value }) => {
          const box = document.querySelector(".theme-demo");
          const looks = {
            cms: { "--rc-primary": "#0b5fff", "--rc-primary-rgb": "11, 95, 255", "--rc-success": "#287d3c", "--rc-success-rgb": "40, 125, 60",
              "--rc-warning": "#b95000", "--rc-warning-rgb": "185, 80, 0", "--rc-danger": "#da1414", "--rc-danger-rgb": "218, 20, 20",
              "--rc-info": "#2e5aac", "--rc-info-rgb": "46, 90, 172", "--rc-info-bg-subtle": "#eef2fa", "--rc-info-text": "#2e5aac", "--rc-info-border-subtle": "#89a7e0",
              "--rc-body-color": "#272833", "--rc-border-color": "#e7e7ed", "--rc-border-radius": ".25rem", "--rc-border-radius-sm": ".2rem",
              "--rc-link-color": "#0b5fff", "--rc-input-focus-border-color": "#80acff", "--rc-focus-ring": "0 0 0 .2rem rgba(11, 95, 255, .25)" },
            teal: { "--rc-primary": "#0f766e", "--rc-primary-rgb": "15, 118, 110", "--rc-link-color": "#0f766e",
              "--rc-border-radius": ".75rem", "--rc-border-radius-sm": ".5rem", "--rc-border-radius-lg": "1rem",
              "--rc-input-focus-border-color": "#5eb8b0", "--rc-focus-ring": "0 0 0 .25rem rgba(15, 118, 110, .2)" },
          };
          // back to the page's own colours, then the chosen look
          for (const name of [...box.style].filter((p) => p.startsWith("--rc-"))) box.style.removeProperty(name);
          box.removeAttribute("data-bs-theme");
          if (value === "dark") box.setAttribute("data-bs-theme", "dark"); // a page without Bootstrap: data-rc-theme="dark"
          for (const [name, v] of Object.entries(looks[value] || {})) box.style.setProperty(name, v);
        },
      }),
    });
  </script>
</body>
</html>
