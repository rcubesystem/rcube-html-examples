# rcube-html starter (JSP)

Every example from [rcube-html.com](https://rcube-html.com/) as a JSP page, in a Maven web app. No Node.js needed.

## Run it

You need Java 17+ and [Maven](https://maven.apache.org/).

```bash
mvn jetty:run
```

Open http://localhost:8080/. `mvn package` makes `target/rcube-html-starter.war` for Tomcat 10+ (or any Jakarta EE
server; the pages work on Tomcat 9 too).

## What's inside

```
src/main/webapp/
  index.jsp                          the list of examples
  my-page.jsp                        a sign-up form to change and play with — start here
  examples/<name>.jsp                one page per tutorial (the same code as the site's JSP tab)
  WEB-INF/schemas/<name>.json        each page's schema — read on the server by the tag
  WEB-INF/tags/rcube/rcube-form.tag  the <rc:rcube-form> tag (from rcube-html/integrations/jsp)
  static/rcube-html/                 the library as one <script> (rcube-html.js: everything; rcube-html.core.js: forms)
```

Change a page or a schema and reload it in the browser.

## In your own web app

1. Copy `WEB-INF/tags/rcube/rcube-form.tag` and `static/rcube-html/` into it.
2. Keep schemas as JSON files (`WEB-INF/schemas/`) — the same files a React, Angular or Vue app can use.
3. In a page:

```jsp
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<rc:rcube-form id="signup" schemaFile="/WEB-INF/schemas/signup.json" values="${signupJson}" actions="signupActions" />
<script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.core.js"></script>
<script>
  window.signupActions = { save: function (event, context, api) { /* … */ } };
</script>
```

Inside a JSP page, JavaScript's `${…}` is JSP's own expression syntax: write `\${…}` in template strings (the
examples do).

`mvn package -Pcheck` compiles every JSP and the tag without starting a server.
