// The home page: a link to every example (the list is in examples.js)
import Link from "next/link";
import { groups, examples } from "./examples";

export default function Home() {
  return (
    <>
      <h1>rcube-html starter</h1>
      <p className="starter-lead">
        Every example from the tutorials, running on your computer. Open one, then change its <code>page.js</code> in
        <code>app/examples/</code> and save — the page updates by itself.
      </p>
      <p>
        Start with <Link href="/my-page">My page</Link> (<code>app/my-page/page.js</code>): a small form to change and play with.
      </p>
      {groups.map((group) => (
        <section key={group}>
          <h2 className="starter-group">{group}</h2>
          <div className="starter-grid">
            {examples.filter((e) => e.group === group).map((e) => (
              <Link key={e.slug} href={`/examples/${e.slug}`} className="starter-card">
                <strong>{e.title}</strong>
                <small>{e.summary}</small>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
