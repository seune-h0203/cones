import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps every asset URL relative so the build runs from any
// GitHub Pages sub-path without extra configuration.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    target: "es2020",
    assetsInlineLimit: 2048,
  },
});
