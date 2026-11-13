<%-- Languages — https://rcube-html.com/languages
     The schema is in WEB-INF/schemas/languages.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Languages — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Languages</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/languages.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const libEs = RcubeHtml.langEs;

    // Your texts. Keys missing in a language fall back to "messages", then to the library English.
    const textEn = {
      demo: { title: "Contact us", name: "Your name", message: "Message", send: "Send", hint: "Required fields have a red star." },
    };
    const textEs = {
      ...libEs, // the library's Spanish texts (validation messages, ...)
      demo: { title: "Contáctanos", name: "Tu nombre", message: "Mensaje", send: "Enviar", hint: "Los campos obligatorios tienen una estrella roja." },
    };

    const form = document.getElementById("example");
    Object.assign(form, {
      messages: textEn,                          // starting texts and fallback
      language: "en",
      languages: { en: textEn, es: textEs },     // or es: () => import("./text_es") to load on demand
    });
    form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));
  </script>
</body>
</html>
