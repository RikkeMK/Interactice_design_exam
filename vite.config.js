import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupIds: {
                    preservePrefixes: ["stage_"],
                  },
                },
              },
            },
          ],
        },
      },
    }),
  ],
});
