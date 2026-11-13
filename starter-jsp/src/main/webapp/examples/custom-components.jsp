<%-- Custom components — https://rcube-html.com/custom-components
     The schema is in WEB-INF/schemas/custom-components.json (the Schema tab). --%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="rc" tagdir="/WEB-INF/tags/rcube" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Custom components — rcube-html</title>
</head>
<body style="margin: 0">
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <h1 style="font: 600 1.5rem system-ui, sans-serif">Custom components</h1>
    <rc:rcube-form id="example" schemaFile="/WEB-INF/schemas/custom-components.json">
      <p>Loading…</p>
    </rc:rcube-form>
  </main>
  <script src="${pageContext.request.contextPath}/static/rcube-html/rcube-html.js"></script>
  <script>
    const { React, registerComponent } = RcubeHtml;

    // Components are React components: rcube-html/element brings its own React (no JSX needed)
    const h = React.createElement;

    // A display component: gets the node's props
    const Stat = ({ label, value, trend }) => h("div", { className: "rc-border rc-rounded rc-p-3 rc-mb-3 rc-text-center" },
      h("div", { className: "rc-small rc-text-body-secondary" }, label),
      h("div", { className: "rc-fs-3 rc-fw-semibold" }, value),
      trend && h("div", { className: "small " + (String(trend).startsWith("-") ? "text-danger" : "text-success") }, trend));

    // A container: draws its children with renderNodes (fields inside keep validation)
    const Panel = ({ node, renderNodes, title }) => h("section", { className: "rc-border rc-border-primary-subtle rc-rounded rc-p-3 rc-mb-3" },
      h("h6", { className: "rc-text-primary" }, title),
      renderNodes(node.children));

    // A form field: forwardRef to an input that holds the value, call onChange when it changes
    const RatingField = React.forwardRef(function RatingField({ name, label, max = 5, required, error, onChange }, ref) {
      const [value, setValue] = React.useState(0);
      const inputRef = React.useRef(null);
      const pick = (n) => {
        setValue(n);
        inputRef.current.value = String(n);
        onChange?.({ type: "change", target: inputRef.current });
      };
      return h("div", { className: "rc-mb-3" },
        label && h("div", { className: "rc-label" }, label, required && h("span", { className: "rc-text-danger" }, " *")),
        h("input", { type: "hidden", name, defaultValue: "",
          ref: (el) => { inputRef.current = el; if (typeof ref === "function") ref(el); else if (ref) ref.current = el; } }),
        Array.from({ length: max }, (_, i) => i + 1).map((n) => h("button", {
          key: n, type: "button", className: "rc-btn rc-btn-link rc-p-0 rc-me-1 rc-fs-3 rc-text-decoration-none",
          style: { color: n <= value ? "#f0b429" : "gray" }, onClick: () => pick(n),
        }, "★")),
        error && h("div", { className: "rc-feedback rc-d-block" }, error));
    });

    registerComponent("Stat", Stat);                                    // display
    registerComponent("Panel", Panel, { container: true });             // holds other nodes
    registerComponent("RatingField", RatingField, { field: true });     // form field

    const form = document.getElementById("example");
    Object.assign(form, {
      // the actions the schema names, e.g. "onClick": "save()"
      actions: (api) => ({
        ratingChanged: (event, { value }) => console.log("Rating:", value),
        bumpUsers: () => api.setNodeProps("stat-users", { value: (1284 + Math.floor(Math.random() * 100)).toLocaleString() }),
      }),
    });
    form.addEventListener("rcube-submit", (e) => console.log("Submitted:", e.detail.entries));
  </script>
</body>
</html>
