import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  // the examples each load only when opened; the one with every component is the biggest
  build: { chunkSizeWarningLimit: 900 },
});
