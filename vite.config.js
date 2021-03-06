const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  esbuild: {
    jsxFactory: "h",
  },
});
