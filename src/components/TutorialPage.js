"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { topics, topicBySlug } from "@/tutorials/topics";
import { examples } from "@/tutorials/examples";
import LiveExample from "./LiveExample";
import CodeBlock, { Inline } from "./CodeBlock";
import { indent, pageCode } from "@/tutorials/pageCode";

// "zipChanged" -> ["onChange", "onBlur"] by scanning the schema for "zipChanged()"
const eventNamesOf = (schema) => {
  const map = {};
  JSON.stringify(schema, (key, value) => {
    if (typeof value === "string" && /^\w+\(\)$/.test(value) && key) {
      const name = value.slice(0, -2);
      map[name] = [...new Set([...(map[name] || []), key])];
    }
    return value;
  });
  return map;
};

// Readable, short JSON for the event log (no DOM nodes, functions or huge lists)
const preview = (value, depth = 0) => {
  if (value === null || value === undefined) return value;
  if (typeof value === "function") return "ƒ()";
  if (typeof value !== "object") return typeof value === "string" && value.length > 120 ? `${value.slice(0, 120)}…` : value;
  if (typeof File !== "undefined" && value instanceof File) return `File(${value.name}, ${value.size} bytes)`;
  if (typeof Element !== "undefined" && value instanceof Element) return `<${value.tagName.toLowerCase()}>`;
  if (value instanceof Date) return value.toISOString();
  if (typeof AbortSignal !== "undefined" && value instanceof AbortSignal) return "AbortSignal";
  if (depth > 2) return Array.isArray(value) ? `[${value.length} items]` : "{…}";
  if (Array.isArray(value)) {
    const shown = value.slice(0, 5).map((v) => preview(v, depth + 1));
    return value.length > 5 ? [...shown, `…+${value.length - 5} more`] : shown;
  }
  return Object.fromEntries(Object.entries(value)
    .filter(([k]) => !["fieldRefs", "values", "nativeEvent", "_reactName", "view"].includes(k))
    .slice(0, 14)
    .map(([k, v]) => [k, preview(v, depth + 1)]));
};
// Field events are called as (event, { name, value, ... }); component events as (payload, context)
const summarize = (args) => {
  const [first, context] = args;
  const isDomEvent = first && typeof first === "object" && ("nativeEvent" in first || ("currentTarget" in first && "target" in first));
  const shown = isDomEvent ? { name: context?.name, value: context?.value } : first;
  try { return JSON.stringify(preview(shown), null, 1).replace(/\n\s*/g, " "); } catch { return String(shown); }
};

export default function TutorialPage({ slug }) {
  const topic = topicBySlug(slug);
  const example = examples[slug];
  const [tab, setTab] = useState("schema");
  const [log, setLog] = useState([]);
  const counter = useRef(0);
  const triggers = useMemo(() => (example ? eventNamesOf([example.schema, example.buttons || []]) : {}), [example]);

  const onEvent = useCallback((name, args) => {
    counter.current += 1;
    const entry = { id: counter.current, name, time: new Date().toLocaleTimeString(), detail: summarize(args) };
    // Later in the same tick than the action, so a log update never happens during a render
    setTimeout(() => setLog((prev) => [entry, ...prev].slice(0, 60)), 0);
  }, []);

  if (!topic || !example) return <p>Not found.</p>;
  const index = topics.findIndex((t) => t.slug === slug);
  const prev = topics[index - 1];
  const next = topics[index + 1];
  const href = (t) => (t.slug === "introduction" ? "/" : `/${t.slug}`);

  const schemaText = JSON.stringify(example.buttons ? { schema: example.schema, buttons: example.buttons } : example.schema, null, 2);
  const tabs = [
    ["schema", "Schema (JSON)", schemaText],
    ...(example.actionsCode?.trim() ? [["actions", "Actions", `actions: (api) => ({\n${indent(example.actionsCode.trim(), 2)}\n}),`]] : []),
    ...(example.extraCode || []).map((c, i) => [`extra${i}`, c.title, c.code]),
    ["page", "Full page.js", pageCode(example)],
  ];
  const activeTab = tabs.find(([key]) => key === tab) || tabs[0];

  return (
    <article>
      <div className="text-body-secondary small text-uppercase fw-semibold mb-1">{topic.group}</div>
      <h1 className="h2 mb-2">{topic.title}</h1>
      <p className="lead fs-5 text-body-secondary">{topic.summary}</p>

      {(example.sections || []).map((section) => (
        <section key={section.heading} className="mb-4">
          <h2 className="h5 mt-4">{section.heading}</h2>
          {(section.body || []).map((paragraph, i) => <p key={i} className="mb-2"><Inline text={paragraph} /></p>)}
          {/* a file to download (e.g. the starter app); the click is tracked as link_click, location "download" */}
          {section.download && (
            <p className="d-flex flex-wrap align-items-center gap-2 my-3" data-ga-location="download">
              <a className="btn btn-primary" href={section.download.href} download>⬇ {section.download.label}</a>
              {section.download.note && <span className="small text-body-secondary">{section.download.note}</span>}
            </p>
          )}
          {section.list && <ul>{section.list.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ul>}
          {section.code && <CodeBlock code={section.code} />}
        </section>
      ))}

      <h2 className="h5 mt-4">Try it</h2>
      <div className="row g-3 align-items-start">
        <div className={example.wide ? "col-12" : "col-xl-8"}>
          <LiveExample key={slug} example={example} onEvent={onEvent} />
        </div>
        <div className={example.wide ? "col-12" : "col-xl-4"}>
          <div className="card">
            <div className="card-header d-flex align-items-center py-2">
              <span className="fw-semibold small">Events</span>
              <span className="badge text-bg-secondary ms-2">{log.length}</span>
              <button type="button" className="btn btn-sm btn-link ms-auto p-0" onClick={() => setLog([])}>Clear</button>
            </div>
            <div className="docs-log" aria-live="polite">
              {!log.length && <div className="p-3 small text-body-secondary">Use the example — every action it runs shows up here with its data.</div>}
              {log.map((entry) => (
                <div key={entry.id} className="docs-log-item">
                  <div className="d-flex gap-2 align-items-center mb-1">
                    <span className="badge text-bg-primary">{entry.name}</span>
                    {triggers[entry.name] && <span className="small text-body-secondary">{triggers[entry.name].join(", ")}</span>}
                    <span className="small text-body-secondary ms-auto">{entry.time}</span>
                  </div>
                  <code>{entry.detail}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="h5 mt-4">Code</h2>
      <p className="small text-body-secondary mb-2">
        Copy <strong>Full page.js</strong> into <code className="docs-inline-code">app/your-page/page.js</code> of a Next.js app (with
        <code className="docs-inline-code">rcube-html</code> installed and <code className="docs-inline-code">rcube-html/styles.css</code> imported in its layout) — it runs as is.
        Or copy only the schema and keep your own page.
      </p>
      <ul className="nav nav-tabs mb-0">
        {tabs.map(([key, label]) => (
          <li key={key} className="nav-item">
            <button type="button" className={`nav-link ${activeTab[0] === key ? "active" : ""}`} onClick={() => setTab(key)}>{label}</button>
          </li>
        ))}
      </ul>
      <CodeBlock code={activeTab[2]} />

      {example.props?.length > 0 && (
        <>
          <h2 className="h5 mt-4">Options used here</h2>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead><tr><th style={{ width: "28%" }}>Option</th><th>What it does</th></tr></thead>
              <tbody>{example.props.map(([name, text]) => <tr key={name}><td><code className="docs-inline-code">{name}</code></td><td><Inline text={text} /></td></tr>)}</tbody>
            </table>
          </div>
        </>
      )}

      {example.events?.length > 0 && (
        <>
          <h2 className="h5 mt-4">Events</h2>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead><tr><th style={{ width: "22%" }}>Event</th><th style={{ width: "33%" }}>When it runs</th><th>Your action receives</th></tr></thead>
              <tbody>{example.events.map(([name, when, payload]) => (
                <tr key={name}><td><code className="docs-inline-code">{name}</code></td><td><Inline text={when} /></td><td><Inline text={payload} /></td></tr>
              ))}</tbody>
            </table>
          </div>
        </>
      )}

      {example.tips?.length > 0 && (
        <>
          <h2 className="h5 mt-4">Tips</h2>
          <ul>{example.tips.map((tip, i) => <li key={i}><Inline text={tip} /></li>)}</ul>
        </>
      )}

      <nav className="d-flex justify-content-between border-top pt-3 mt-5" aria-label="More tutorials" data-ga-location="pager">
        {prev ? <Link href={href(prev)}>← {prev.title}</Link> : <span />}
        {next ? <Link href={href(next)}>{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
