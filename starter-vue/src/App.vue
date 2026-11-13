<!-- The home page (a link to every example) and the example picked in the address: #/<slug> -->
<script setup>
import { computed, defineAsyncComponent, onBeforeUnmount, ref } from "vue";
import { examples, groups } from "./examples";

const slug = ref(location.hash.replace(/^#\/?/, ""));
const onHash = () => { slug.value = location.hash.replace(/^#\/?/, ""); };
window.addEventListener("hashchange", onHash);
onBeforeUnmount(() => window.removeEventListener("hashchange", onHash));

const current = computed(() => (slug.value === "my-page"
  ? { title: "My page", component: defineAsyncComponent(() => import("./MyPage.vue")) }
  : examples.find((example) => example.slug === slug.value)));
const inGroup = (group) => examples.filter((example) => example.group === group);
</script>

<template>
  <main style="max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem 4rem">
    <p><a href="#/">rcube-html starter (Vue)</a></p>
    <template v-if="current">
      <h1 style="font-size: 1.5rem">{{ current.title }}</h1>
      <component :is="current.component" :key="slug" />
    </template>
    <template v-else>
      <h1>rcube-html examples</h1>
      <p>Every example from <a href="https://rcube-html.com/">rcube-html.com</a>, in Vue. Start with
        <a href="#/my-page">My page</a>, then change any <code>src/examples/&lt;Name&gt;.vue</code>.</p>
      <template v-for="group in groups" :key="group">
        <h2 style="font-size: 1.1rem; margin-top: 1.5rem">{{ group }}</h2>
        <ul>
          <li v-for="example in inGroup(group)" :key="example.slug">
            <a :href="`#/${example.slug}`">{{ example.title }}</a> — {{ example.summary }}
          </li>
        </ul>
      </template>
    </template>
  </main>
</template>

<style>
body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #212529; }
</style>
