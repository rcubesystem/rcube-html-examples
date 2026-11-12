// The complete page.js of an example — shown in the Code box ("Full page.js") and written into the downloadable
// starter app (scripts/build-starter.mjs). Plain JS (no JSX, no aliases) so Node can run it too.

export const indent = (text, spaces) => text.split("\n").map((line) => (line ? " ".repeat(spaces) + line : line)).join("\n");

// The complete page.js a reader can paste into app/<name>/page.js
export const pageCode = (example) => {
  const lines = ['"use client";', ...(example.onLoadCode ? ['import { useEffect } from "react";'] : []), 'import { useDynamicTag, DynamicTag } from "rcube-html";'];
  if (example.imports) lines.push(example.imports.trim());
  lines.push("");
  if (example.pagePreamble) lines.push(example.pagePreamble.trim(), "");
  if (example.helpersCode) lines.push(example.helpersCode.trim(), "");
  lines.push(`const schema = ${JSON.stringify(example.schema, null, 2)};`, "");
  if (example.buttons) lines.push(`const buttons = ${JSON.stringify(example.buttons, null, 2)};`, "");
  const options = ["    schema,"];
  if (example.buttons) options.push("    buttons,");
  if (example.optionsCode) options.push(indent(example.optionsCode.trim(), 4));
  if (example.submit) options.push('    onSubmit: (entries) => console.log("Submitted:", entries),');
  if (example.actionsCode?.trim()) options.push("    actions: (api) => ({", indent(example.actionsCode.trim(), 6), "    }),");
  lines.push(
    "export default function Page() {",
    "  const form = useDynamicTag({",
    ...options,
    "  });",
    // onLoadCode: what runs once when the page opens (e.g. load a table's first page)
    ...(example.onLoadCode ? ["  // once, when the page opens", "  useEffect(() => {", indent(example.onLoadCode.trim(), 4), "  }, []); // eslint-disable-line react-hooks/exhaustive-deps"] : []),
    "  return <DynamicTag form={form} />;",
    "}",
  );
  return lines.join("\n");
};
