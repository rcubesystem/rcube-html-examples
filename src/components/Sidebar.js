"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { groups, topics } from "@/tutorials/topics";
import { examples } from "@/tutorials/examples";
import { track } from "@/lib/analytics";

// Everything searchable about a topic: title, summary, keywords, explanations, props, events, schema types
const searchTextOf = (topic) => {
  const example = examples[topic.slug] || {};
  const sections = (example.sections || []).flatMap((s) => [s.heading, ...(s.body || [])]);
  const table = [...(example.props || []), ...(example.events || [])].flat();
  const types = [];
  JSON.stringify([example.schema || [], example.buttons || []], (key, value) => {
    if (key === "type" && typeof value === "string") types.push(value);
    return value;
  });
  return [topic.title, topic.group, topic.summary, topic.keywords, ...sections, ...table, ...types].join(" ").toLowerCase();
};

const Highlight = ({ text, query }) => {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + query.length)}</mark>{text.slice(i + query.length)}</>;
};

export default function Sidebar({ open }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const index = useMemo(() => topics.map((topic) => ({ topic, text: searchTextOf(topic) })), []);

  // "/" focuses the search box, Escape clears it
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !e.target.closest("input, textarea, select, [contenteditable=true]")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const matches = index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ topic }) => topic);
  const current = pathname === "/" ? "introduction" : pathname.replace(/^\//, "");

  // Google Analytics: what people search for in the menu (once they stop typing for a second), and how many results
  useEffect(() => {
    if (q.length < 2) return undefined;
    const timer = setTimeout(() => track("search", { search_term: q.slice(0, 100), results: matches.length }), 1000);
    return () => clearTimeout(timer);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // data-ga-*: what lib/analytics.js reports for a menu click (menu_click)
    <nav className={`docs-sidebar p-2 ${open ? "open" : ""}`} aria-label="Table of contents" data-ga-location="sidebar" data-ga-search={q}>
      <div className="p-1 position-sticky top-0 bg-body-tertiary" style={{ zIndex: 1 }}>
        <input ref={inputRef} type="search" className="form-control form-control-sm" value={query}
          placeholder="Search examples…  ( / )" aria-label="Search examples"
          onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }} />
        {q && <div className="small text-body-secondary mt-1 px-1">{matches.length} result{matches.length === 1 ? "" : "s"}</div>}
      </div>
      {groups.map((group) => {
        const list = matches.filter((t) => t.group === group);
        if (!list.length) return null;
        return (
          <div key={group}>
            <div className="docs-group">{group}</div>
            {list.map((topic) => (
              <Link key={topic.slug} href={topic.slug === "introduction" ? "/" : `/${topic.slug}`}
                className={`docs-link ${current === topic.slug ? "active" : ""}`}
                aria-current={current === topic.slug ? "page" : undefined}
                data-ga-item={topic.slug} data-ga-title={topic.title} data-ga-group={group}>
                <Highlight text={topic.title} query={q} />
                {q && <small><Highlight text={topic.summary} query={q} /></small>}
              </Link>
            ))}
          </div>
        );
      })}
      {q && !matches.length && <p className="small text-body-secondary px-2 mt-3">No examples match “{query}”.</p>}
    </nav>
  );
}
