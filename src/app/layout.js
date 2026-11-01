import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import DocsShell from "@/components/DocsShell";

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
    </html>
  );
}
