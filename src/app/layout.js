import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import DocsShell from "@/components/DocsShell";

// Google Analytics: set in .env.production, so `npm run dev` sends nothing
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  title: { default: "rcube-html examples", template: "%s · rcube-html examples" },
  description: "Tutorials and copy-ready schema examples for rcube-html.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DocsShell>{children}</DocsShell>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
