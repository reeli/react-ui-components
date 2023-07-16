/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: "ui-guide",
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "@emotion/react",
    }),
  ],
  resolve: {
    conditions: ["development"],
  },
});
