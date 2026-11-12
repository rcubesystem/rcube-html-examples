// The frame of every page. rcube-html's stylesheet is imported once, here.
import "rcube-html/styles.css";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: { default: "rcube-html starter", template: "%s · rcube-html starter" },
  description: "Every rcube-html example, running on your computer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="starter-header">
          <Link href="/" className="starter-brand">rcube-html <span>starter</span></Link>
          <nav>
            <Link href="/my-page">My page</Link>
            <a href="https://rcube-html.com/" target="_blank" rel="noreferrer">Tutorials</a>
          </nav>
        </header>
        <main className="starter-main">{children}</main>
      </body>
    </html>
  );
}
