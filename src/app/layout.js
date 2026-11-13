// Bootstrap: only for this site's own pages (menu, code boxes); the examples are drawn by rcube-html and its stylesheet
import "bootstrap/dist/css/bootstrap.min.css";
import "rcube-html/styles.css";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import DocsShell from "@/components/DocsShell";
import { SITE_TAGS, SITE_URL } from "@/tutorials/tags";

// Google Analytics: set in .env.production, so `npm run dev` sends nothing
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const DESCRIPTION = "Tutorials and copy-ready examples for rcube-html, the schema-driven form and layout engine: dynamic forms, dynamic content, data tables, charts, calendar, tree and file upload — in React, Angular, Vue, plain HTML and JSP.";

// Search engines and link previews: the tags are in src/tutorials/tags.js (each tutorial adds its own)
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "rcube-html examples — dynamic forms and content from JSON", template: "%s · rcube-html examples" },
  description: DESCRIPTION,
  keywords: SITE_TAGS,
  applicationName: "rcube-html examples",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "rcube-html examples", url: "/", title: "rcube-html examples", description: DESCRIPTION },
  twitter: { card: "summary", title: "rcube-html examples", description: DESCRIPTION },
};

// Structured data: what the site and the library are (search engines read it; nothing is shown)
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "rcube-html examples", url: SITE_URL, description: DESCRIPTION, keywords: SITE_TAGS.join(", ") },
    {
      "@type": "SoftwareSourceCode",
      name: "rcube-html",
      description: "A schema-driven form and layout engine: describe rows, columns, fields and buttons as JSON and it renders them, in React, Angular, Vue, plain JavaScript and server-rendered pages (JSP, PHP, .NET).",
      codeRepository: "https://github.com/rcubesystem/rcube-html",
      programmingLanguage: "JavaScript",
      runtimePlatform: ["React", "Angular", "Vue", "Web browser", "Java (JSP)"],
      license: "https://opensource.org/licenses/MIT",
      keywords: SITE_TAGS.join(", "),
      url: "https://www.npmjs.com/package/rcube-html",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }} />
        <DocsShell>{children}</DocsShell>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
