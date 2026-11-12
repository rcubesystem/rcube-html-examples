# rcube-html starter

A small Next.js app with every example from [rcube-html.com](https://rcube-html.com/), ready to run on your computer.

## Run it

You need [Node.js](https://nodejs.org/) 20 or 22.

```bash
npm install
npm run dev
```

Open http://localhost:3000. (Another port: `npm run dev -- -p 3100`.)

## What's inside

```
app/
  layout.js              the frame of every page; imports rcube-html/styles.css once
  page.js                the home page: links to every example
  my-page/page.js        a sign-up form to change and play with — start here
  examples/<name>/page.js   one page per tutorial (the same code as "Full page.js" on the site)
  examples.js            the list shown on the home page
  ClientOnly.js          draws the examples in the browser only (see below)
```

Edit any `page.js` and save: the browser updates by itself.

Each example page is the tutorial's **Full page.js**, with its form drawn through `<ClientOnly>`: you see
"Loading example…" for a moment (longer the first time a page is opened in `npm run dev`, while it compiles), then the
form — and its buttons work as soon as it appears.

## Add your own page

1. Make a folder in `app/`, e.g. `app/contact/`.
2. Copy a tutorial's **Full page.js** from the site into `app/contact/page.js`.
3. Open http://localhost:3000/contact.

## Next steps

- Tutorials: https://rcube-html.com/
- The library on npm: https://www.npmjs.com/package/rcube-html
- Build for production: `npm run build`, then `npm start`.
