"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDynamicTag, DynamicTag } from "rcube-html";

/*
 * Runs one example exactly as its "Full page" code would:
 * - helpersCode (module-level code such as a mock API) runs once and returns helperNames
 * - actionsCode is the body of `actions: (api) => ({ ... })`, compiled once
 * - onLoadCode runs once after the first render with `form` (as the page's useEffect does)
 * Every action call is reported to onEvent(name, args) for the event log.
 */
// provides: real imports the helper code uses (e.g. { libEs } for `import libEs from "rcube-html/lang/lang_es"`)
const compileHelpers = (code, names, provides = {}) => (code
  ? new Function(...Object.keys(provides), `${code}\nreturn { ${names.join(", ")} };`)(...Object.values(provides))
  : {});
const compileActions = (code, names) => (code && code.trim() ? new Function("api", ...names, `return ({\n${code}\n});`) : null);

function Live({ example, onEvent }) {
  const names = useMemo(() => example.helperNames || [], [example]);
  const helpers = useMemo(() => compileHelpers(example.helpersCode, names, example.provides), [example, names]);
  const factory = useMemo(() => compileActions(example.actionsCode, names), [example, names]);
  const options = typeof example.options === "function" ? example.options(helpers) : (example.options || {});

  const form = useDynamicTag({
    schema: example.schema,
    buttons: example.buttons,
    ...options,
    onSubmit: (entries) => onEvent("onSubmit", [entries]),
    actions: (api) => {
      const custom = factory ? factory(api, ...names.map((n) => helpers[n])) : (example.actions?.(api) || {});
      // Wrap each action so the page can show when it runs and with what
      return Object.fromEntries(Object.entries(custom).map(([name, fn]) => [
        name,
        typeof fn === "function" ? (...args) => { onEvent(name, args); return fn(...args); } : fn,
      ]));
    },
  });

  const formRef = useRef(form);
  formRef.current = form;
  useEffect(() => {
    if (!example.onLoadCode) return undefined;
    const t = setTimeout(() => new Function("form", example.onLoadCode)(formRef.current), 0);
    return () => clearTimeout(t);
  }, [example]);

  return (
    <div className="docs-live">
      <DynamicTag form={form} />
    </div>
  );
}

// Examples use the browser's dates, locale and time zone, so they render only in the browser (no hydration mismatch)
export default function LiveExample(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? <Live {...props} /> : <div className="docs-live text-body-secondary small">Loading example…</div>;
}
