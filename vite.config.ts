import { defineConfig } from "vite-plus";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [solidPlugin({ hot: false }), tailwindcss()],
  root: "./src",
  build: {
    outDir: "../dist",
    minify: false,
    emptyOutDir: true,
  },
});
