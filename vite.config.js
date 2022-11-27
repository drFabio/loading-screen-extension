import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        newTab: fileURLToPath(
          new URL("./src/modules/newTab/index.html", import.meta.url)
        ),
        options: fileURLToPath(
          new URL("./src/modules/options/index.html", import.meta.url)
        ),
      },
    },
  },
});
