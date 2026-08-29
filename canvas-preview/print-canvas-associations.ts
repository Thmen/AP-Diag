import path from "node:path";
import { fileURLToPath } from "node:url";
import { associateCanvasMarkdown, toPosix } from "./associate-canvas-markdown.ts";
import {
  collectCanvasFiles,
  getActiveScanRoots,
} from "./vite.canvas-registry.ts";

const previewDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(previewDir, "..");
const files = collectCanvasFiles(
  repoRoot,
  getActiveScanRoots(previewDir, repoRoot),
);

for (const file of files) {
  const rel = toPosix(path.relative(repoRoot, file));
  const links = associateCanvasMarkdown(file, repoRoot);
  console.log(rel.startsWith("..") ? toPosix(file) : rel);
  if (links.length === 0) {
    console.log("  (无 .md 引用)");
    continue;
  }
  for (const link of links) {
    const target = link.absPath
      ? toPosix(path.relative(repoRoot, link.absPath))
      : "未找到";
    console.log(`  ${link.hint}  ->  ${target}`);
  }
}
