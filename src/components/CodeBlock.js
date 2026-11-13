"use client";
import { useEffect, useRef, useState } from "react";

// Which language a piece of code is in, from its file name or (for the tutorials' short snippets) from how it starts.
// "jsx" | "typescript" | "json" | "html" | "vue" | "jsp" | "shell"
export function languageOf(code, name = "") {
  const file = name.toLowerCase();
  if (file.endsWith(".json") || file.startsWith("schema")) return "json";
  if (file.endsWith(".ts")) return "typescript";
  if (file.endsWith(".vue")) return "vue";
  if (file.endsWith(".jsp")) return "jsp";
  if (file.endsWith(".html")) return "html";
  if (file.endsWith(".js") || file.endsWith(".jsx")) return "jsx";
  const text = String(code).trimStart();
  if (/^<%|^<rc:|<%@/.test(text)) return "jsp";
  if (/^<script setup|^<template/.test(text)) return "vue";
  if (text.startsWith("<")) return "html";
  if (/^(npm|npx|git|cd|mvn|ng|yarn|pnpm)\s/.test(text)) return "shell";
  if (/^[[{]/.test(text)) {
    try { JSON.parse(text); return "json"; } catch { /* a JS object, not JSON */ }
  }
  return "jsx";
}

// The language's CodeMirror support, loaded only when a code box needs it
async function languageSupport(language) {
  switch (language) {
    case "json": return (await import("@codemirror/lang-json")).json();
    case "html":
    case "jsp": return (await import("@codemirror/lang-html")).html();
    case "vue": return (await import("@codemirror/lang-vue")).vue();
    case "shell": {
      const [{ StreamLanguage }, { shell }] = await Promise.all([import("@codemirror/language"), import("@codemirror/legacy-modes/mode/shell")]);
      return StreamLanguage.define(shell);
    }
    case "typescript": return (await import("@codemirror/lang-javascript")).javascript({ typescript: true });
    default: return (await import("@codemirror/lang-javascript")).javascript({ jsx: true });
  }
}

// Colours of a light editor (close to VS Code's light theme)
async function lightTheme() {
  const [{ EditorView }, { HighlightStyle, syntaxHighlighting }, { tags: t }] = await Promise.all([
    import("@codemirror/view"), import("@codemirror/language"), import("@lezer/highlight"),
  ]);
  const style = HighlightStyle.define([
    { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword, t.definitionKeyword], color: "#af00db" },
    { tag: [t.bool, t.null, t.atom], color: "#0000ff" },
    { tag: [t.number], color: "#098658" },
    { tag: [t.string, t.special(t.string), t.regexp], color: "#a31515" },
    { tag: [t.comment, t.lineComment, t.blockComment], color: "#008000", fontStyle: "italic" },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#795e26" },
    { tag: [t.propertyName], color: "#001080" },
    { tag: [t.variableName, t.definition(t.variableName)], color: "#001080" },
    { tag: [t.typeName, t.className, t.namespace], color: "#267f99" },
    { tag: [t.tagName], color: "#800000" },
    { tag: [t.attributeName], color: "#e50000" },
    { tag: [t.attributeValue], color: "#0000ff" },
    { tag: [t.angleBracket, t.bracket, t.punctuation, t.separator], color: "#3b3b3b" },
    { tag: [t.processingInstruction, t.meta, t.documentMeta], color: "#795e26" },
    { tag: [t.operator], color: "#3b3b3b" },
    { tag: [t.invalid], color: "#cd3131" },
  ]);
  const theme = EditorView.theme({
    "&": { backgroundColor: "#ffffff", color: "#1f2328", fontSize: ".8rem" },
    ".cm-content": { fontFamily: "var(--bs-font-monospace)", padding: ".75rem 0" },
    ".cm-gutters": { backgroundColor: "#f6f8fa", color: "#8c959f", borderRight: "1px solid var(--bs-border-color)" },
    ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "transparent" },
    "&.cm-focused": { outline: "none" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "#cce5ff" },
  }, { dark: false });
  return [theme, syntaxHighlighting(style)];
}

// Copy text: the clipboard API, or a hidden textarea on older browsers / http
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = Object.assign(document.createElement("textarea"), { value: text });
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

// A read-only code editor (CodeMirror) with the language's colours, on white in a bordered box, with a Copy button.
// The plain <pre> is in the page's HTML (search engines, no JavaScript) and is swapped for the editor once it's loaded.
export default function CodeBlock({ code, language, name, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const host = useRef(null);
  const lang = language || languageOf(code, name);

  useEffect(() => {
    let view;
    let gone = false;
    (async () => {
      const [{ EditorState }, { EditorView, lineNumbers }, support, theme] = await Promise.all([
        import("@codemirror/state"), import("@codemirror/view"), languageSupport(lang), lightTheme(),
      ]);
      if (gone || !host.current) return;
      view = new EditorView({
        parent: host.current,
        state: EditorState.create({
          doc: code,
          extensions: [
            lineNumbers(), support, theme,
            EditorState.readOnly.of(true), EditorView.editable.of(false),
            EditorView.contentAttributes.of({ "aria-label": `${lang} code`, tabindex: "0" }),
          ],
        }),
      });
      setReady(true);
    })().catch(() => setReady(false)); // the <pre> stays if the editor can't load
    return () => {
      gone = true;
      view?.destroy();
      setReady(false);
    };
  }, [code, lang]);

  const copy = async () => {
    await copyText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="docs-code" data-language={lang}>
      <div className="docs-code-bar">
        <span className="docs-code-lang">{LABELS[lang] || lang}</span>
        <button type="button" className="btn btn-sm btn-outline-secondary docs-copy" onClick={copy}>{copied ? "Copied ✓" : label}</button>
      </div>
      <div ref={host} className="docs-code-editor" hidden={!ready} />
      {!ready && <pre><code>{code}</code></pre>}
    </div>
  );
}

const LABELS = { jsx: "JavaScript", typescript: "TypeScript", json: "JSON", html: "HTML", vue: "Vue", jsp: "JSP", shell: "Terminal" };

// `code` inside a sentence -> <code>; **words** -> <strong>
export const Inline = ({ text }) => String(text).split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, i) => {
  if (part.length > 1 && part.startsWith("`") && part.endsWith("`")) return <code key={i} className="docs-inline-code">{part.slice(1, -1)}</code>;
  if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
  return <span key={i}>{part}</span>;
});
