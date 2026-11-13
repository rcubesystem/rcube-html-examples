# rcube-html starter (Angular)

Every example from [rcube-html.com](https://rcube-html.com/) as an Angular app, ready to run on your computer.

## Run it

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+.

```bash
npm install
npm start
```

Open http://localhost:4200. `npm run build` makes the production files in `dist/`.

## What's inside

```
src/app/
  rcube-form.component.ts      <rcube-html-form>: rcube-html as an Angular component (copy it into your own app)
  my-page.component.ts         a sign-up form to change and play with — start here
  examples/<name>.component.ts one component per tutorial (the same code as the site's Angular tab)
  examples.ts                  the list on the home page, and a route per example
  home.component.ts, app.component.ts, routes.ts    the home page and the frame
```

Edit any component and save: the browser updates by itself.

## In your own Angular app

```bash
npm install rcube-html
```

1. Copy `node_modules/rcube-html/integrations/angular/rcube-form.component.ts` into your app.
2. Add `@import "rcube-html/styles.css";` to `src/styles.css`.
3. Use `<rcube-html-form [schema]="schema" [actions]="actions" (submitted)="save($event.values)">` — or copy an
   example's component from the site (its **Angular** tab).

The examples' actions are plain JavaScript (the same code for every framework), so their files start with
`// @ts-nocheck`; in your own components, give them types.
