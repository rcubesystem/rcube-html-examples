"use client";
// Google Analytics events (GA4). The tag itself is loaded in app/layout.js (@next/third-parties) only when
// NEXT_PUBLIC_GA_ID is set (.env.production), so in `npm run dev` nothing is sent: events are printed to the console.
//
// Events sent:
//   menu_click     a left-menu (table of contents) item: menu_item (slug), menu_title, menu_group, from_search, search_term
//   link_click     any other link: link_text, link_url, link_location (header | pager | content | …), outbound
//   search         the left-menu search, once the person stops typing: search_term, results
//   menu_toggle    the phone menu button: open
// Each also carries page_path (where the click happened). To see a parameter in GA reports, register it under
// Admin › Custom definitions › Create custom dimension (event scope), e.g. menu_item, menu_group, link_location.

const clip = (value, max = 100) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** Sends one GA event; never throws (analytics must not break the page). */
export const track = (event, params = {}) => {
  if (typeof window === "undefined") return;
  const data = { page_path: window.location.pathname, ...params };
  try {
    if (typeof window.gtag === "function") window.gtag("event", event, data);
    else if (process.env.NODE_ENV !== "production") console.debug(`[analytics] ${event}`, data);
  } catch { /* ignore */ }
};

/**
 * One click listener for the whole site (DocsShell): every <a> click becomes an event. Where it was comes from the
 * nearest [data-ga-location]; left-menu links (location "sidebar") are menu_click with the item's data-ga-* details.
 * Returns the function that removes the listener.
 */
export const trackLinkClicks = (root = document) => {
  const onClick = (event) => {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link || link.dataset.gaSkip !== undefined) return;
    const location = link.closest("[data-ga-location]")?.getAttribute("data-ga-location") || "content";
    const url = new URL(link.getAttribute("href"), window.location.href);
    if (location === "sidebar") {
      const search = clip(link.closest("[data-ga-search]")?.getAttribute("data-ga-search"));
      track("menu_click", { menu_item: link.dataset.gaItem || url.pathname, menu_title: clip(link.dataset.gaTitle || link.textContent),
        menu_group: link.dataset.gaGroup || "", from_search: Boolean(search), ...(search && { search_term: search }) });
      return;
    }
    const outbound = url.origin !== window.location.origin;
    track("link_click", { link_text: clip(link.dataset.gaTitle || link.textContent || link.getAttribute("aria-label")), link_url: outbound ? url.href : url.pathname + url.hash,
      link_location: location, outbound });
  };
  root.addEventListener("click", onClick, true); // capture: runs before Next's <Link> navigates
  return () => root.removeEventListener("click", onClick, true);
};
