"use client";
import { useState } from "react";

// Dark code box with a Copy button
export default function CodeBlock({ code, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Older browsers / http: copy through a hidden textarea
      const area = Object.assign(document.createElement("textarea"), { value: code });
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="docs-code">
      <button type="button" className="btn btn-sm btn-light docs-copy" onClick={copy}>{copied ? "Copied ✓" : label}</button>
      <pre><code>{code}</code></pre>
    </div>
  );
}

// `code` inside a sentence -> <code>
export const Inline = ({ text }) => String(text).split(/(`[^`]+`)/).map((part, i) => (
  part.startsWith("`") && part.endsWith("`")
    ? <code key={i} className="docs-inline-code">{part.slice(1, -1)}</code>
    : <span key={i}>{part}</span>
));
