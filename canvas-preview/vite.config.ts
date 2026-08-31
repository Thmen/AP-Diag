import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { canvasRegistryPlugin } from "./vite.canvas-registry.ts";

const previewDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(previewDir, "..");
const homeCursor = path.join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".cursor");
const nm = path.resolve(previewDir, "node_modules");

export default defineConfig({
  plugins: [react(), canvasRegistryPlugin(previewDir, repoRoot)],
  resolve: {
    // canvas 文件在仓库其它目录，Rolldown 会按该文件位置解析 react，生产构建会失败。
    dedupe: ["react", "react-dom"],
    alias: {
      "cursor/canvas": path.resolve(previewDir, "src/cursor-canvas.ts"),
      "react/jsx-dev-runtime": path.resolve(nm, "react/jsx-dev-runtime.js"),
      "react/jsx-runtime": path.resolve(nm, "react/jsx-runtime.js"),
      "react-dom": path.resolve(nm, "react-dom"),
      react: path.resolve(nm, "react"),
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
