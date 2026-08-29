import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { canvasRegistryPlugin } from "./vite.canvas-registry.ts";

const previewDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(previewDir, "..");
const homeCursor = path.join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".cursor");

export default defineConfig({
  plugins: [react(), canvasRegistryPlugin(previewDir, repoRoot)],
  resolve: {
    alias: {
      "cursor/canvas": path.resolve(previewDir, "src/cursor-canvas.ts"),
    },
  },
  server: {
    port: 5173,
    fs: {
      allow: [
        searchForWorkspaceRoot(previewDir),
        repoRoot,
        homeCursor,
      ],
    },
  },
});
