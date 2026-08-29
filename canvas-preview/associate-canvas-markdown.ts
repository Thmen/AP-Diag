import fs from "node:fs";
import path from "node:path";

const MD_HINT = /[\w./\\-]+\.md/gi;

export function toPosix(p: string): string {
  return p.replace(/\\/g, "/");
}

export function extractMarkdownHints(source: string): string[] {
  const found: string[] = [];
  const seen = new Set<string>();
  for (const match of source.matchAll(MD_HINT)) {
    const hint = toPosix(match[0]).replace(/^\.\//, "");
    const key = hint.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(hint);
  }
  return found;
}

function isMarkdownFile(abs: string): boolean {
  try {
    return abs.toLowerCase().endsWith(".md") && fs.statSync(abs).isFile();
  } catch {
    return false;
  }
}

/** 只按 canvas 源码里的路径做定点解析，不递归扫描 markdown 目录。 */
export function resolveMarkdownHint(
  hint: string,
  canvasAbs: string,
  repoRoot: string,
): string | null {
  const posix = toPosix(hint.split("#")[0] ?? hint).replace(/^\.\//, "");
  if (!posix.toLowerCase().endsWith(".md")) return null;

  const canvasDir = path.dirname(canvasAbs);
  const candidates = [
    path.resolve(posix),
    path.resolve(repoRoot, posix),
    path.resolve(canvasDir, posix),
    path.resolve(canvasDir, "..", posix),
    path.resolve(canvasDir, "..", path.basename(posix)),
  ];

  const seen = new Set<string>();
  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    const key = toPosix(resolved).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (isMarkdownFile(resolved)) return resolved;
  }
  return null;
}

export type CanvasMarkdownLink = {
  hint: string;
  absPath: string | null;
};

export function associateCanvasMarkdown(
  canvasAbs: string,
  repoRoot: string,
  source?: string,
): CanvasMarkdownLink[] {
  const text = source ?? fs.readFileSync(canvasAbs, "utf8");
  return extractMarkdownHints(text).map((hint) => ({
    hint,
    absPath: resolveMarkdownHint(hint, canvasAbs, repoRoot),
  }));
}

export function resolvedMarkdownFiles(
  canvasAbs: string,
  repoRoot: string,
  source?: string,
): string[] {
  const seen = new Set<string>();
  const files: string[] = [];
  for (const link of associateCanvasMarkdown(canvasAbs, repoRoot, source)) {
    if (!link.absPath) continue;
    const key = toPosix(link.absPath).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    files.push(link.absPath);
  }
  return files;
}
