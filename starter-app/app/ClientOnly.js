"use client";
// Draws its children in the browser only. Next.js first sends the page's HTML from the server; until the browser has
// loaded the page's JavaScript, buttons drawn in that HTML do nothing (in `npm run dev` each page is compiled on its
// first visit, which can take a few seconds). The examples are drawn here instead, so their buttons work as soon as
// they appear — as on rcube-html.com.
import { useEffect, useState } from "react";

export default function ClientOnly({ children, fallback = <p className="starter-loading">Loading example…</p> }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  return ready ? children : fallback;
}
