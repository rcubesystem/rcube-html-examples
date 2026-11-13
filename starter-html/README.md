# rcube-html starter (plain HTML)

Every example from [rcube-html.com](https://rcube-html.com/) as a plain HTML page. No Node.js, no build, no server:
**open `index.html` in your browser** (double-click it).

## What's inside

```
index.html               the list of examples
my-page.html             a sign-up form to change and play with — start here
examples/<name>.html     one page per tutorial (the same code as the site's HTML / JS tab)
rcube-html/
  rcube-html.js          the library as one <script> (every component, React inside)
  rcube-html.core.js     the same with forms only (smaller)
```

Change a page, save, and reload it in the browser.

## In your own pages (PHP, ASP.NET, Django, a CMS, …)

Copy the `rcube-html/` folder to your static files (or use the CDN), then:

```html
<div id="signup"></div>
<script src="/static/rcube-html/rcube-html.core.js"></script>
<script>
  RcubeHtml.mount("#signup", {
    schema: [ /* … */ ],
    actions: (api) => ({ save: () => { /* … */ } }),
    onSubmit: ({ values }) => fetch("/api/signup", { method: "POST", body: JSON.stringify(values) }),
  });
</script>
```

Or write the schema as JSON in the page, which is what a server page does:

```html
<rcube-form id="signup">
  <script type="application/json" data-rcube="schema">[ … ]</script>
</rcube-form>
```

CDN: `https://cdn.jsdelivr.net/npm/rcube-html@0.8.0/dist/browser/rcube-html.js` (or `unpkg.com/rcube-html@0.8.0/…`).
