# rcube-html starter (Vue)

Every example from [rcube-html.com](https://rcube-html.com/) as a Vue 3 app (Vite), ready to run on your computer.

## Run it

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the address it prints (http://localhost:5173). `npm run build` makes the production files in `dist/`.

## What's inside

```
src/
  MyPage.vue            a sign-up form to change and play with — start here
  examples/<Name>.vue   one component per tutorial (the same code as the site's Vue tab)
  examples.js           the list on the home page
  App.vue, main.js      the home page and the frame (main.js imports rcube-html/styles.css)
```

Edit any `.vue` file and save: the browser updates by itself.

## In your own Vue app

```bash
npm install rcube-html
```

```vue
<script setup>
import "rcube-html/styles.css";            // once, e.g. in main.js
import { RcubeForm } from "rcube-html/vue";
</script>
<template>
  <RcubeForm :schema="schema" :actions="actions" v-model="values" @submit="save" />
</template>
```

Add `import "rcube-html/element/table";` (or `/chart`, `/calendar`, `/tree`, `/richtext`, `/upload`) when a schema
uses those components.
