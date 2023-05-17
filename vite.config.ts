import { resolve } from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import paths from "vite-tsconfig-paths";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      path: "path-browserify"
    }
  },
  plugins: [
    paths(),
    solid({
      hot: false
    })
  ],
  build: {
    outDir,
    rollupOptions: {
      input: {
        sado: resolve(root, "..", "app", "sado.html")
      }
    }
  }
});
