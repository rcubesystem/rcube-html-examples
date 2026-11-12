"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { track, trackLinkClicks } from "@/lib/analytics";

// Page frame: header, table of contents on the left, the tutorial on the right
export default function DocsShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setMenuOpen(false); }, [pathname]); // close the phone menu after navigating
  // Google Analytics: every link click (left menu, header, prev / next, links in the tutorials) — lib/analytics.js
  useEffect(() => trackLinkClicks(document), []);
  const toggleMenu = () => { track("menu_toggle", { open: !menuOpen }); setMenuOpen(!menuOpen); };

  return (
    <>
      <header className="docs-header navbar bg-body border-bottom px-3" data-ga-location="header">
        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-sm btn-outline-secondary d-md-none" aria-label="Contents"
            aria-expanded={menuOpen} onClick={toggleMenu}>☰</button>
          <Link href="/" className="navbar-brand fw-semibold mb-0">
            rcube-html <span className="text-body-secondary fw-normal">examples</span>
          </Link>
        </div>
        <div className="d-flex gap-3 small">
          <a href="https://www.npmjs.com/package/rcube-html" target="_blank" rel="noreferrer">npm</a>
          <a href="https://github.com/rcubesystem/rcube-html" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </header>
      <div className="d-flex">
        <Sidebar open={menuOpen} />
        <main className="docs-main">
          <div className="docs-content">{children}</div>
        </main>
      </div>
    </>
  );
}
