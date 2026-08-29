import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import {
  resolvedMarkdownFiles,
  toPosix,
} from "./associate-canvas-markdown.ts";

const VIRTUAL_ID = "virtual:canvas-registry";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

const SKIP_DIR_NAMES = new Set([
  ".git",
  ".idea",
  ".venv",
  ".vscode",
  "dist",
  "images",
  "node_modules",
]);

function viteFsImport(absPath: string): string {
  return `/@fs/${toPosix(path.resolve(absPath))}`;
}

function shouldSkipDir(name: string): boolean {
  if (SKIP_DIR_NAMES.has(name)) return true;
  if (name.startsWith(".work") || name.startsWith(".convert")) return true;
  return false;
}

function walkCanvasFiles(root: string, out: string[]): void {
  if (!fs.existsSync(root)) return;
  const st = fs.statSync(root);
  if (st.isFile()) {
    if (root.endsWith(".canvas.tsx")) out.push(path.resolve(root));
    return;
  }
  if (!st.isDirectory()) return;

  const entries = fs.readdirSync(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walkCanvasFiles(full, out);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".canvas.tsx")) {
      out.push(path.resolve(full));
    }
  }
}

export const SCAN_API = "/__canvas-preview/scan";

function extraDirsFromEnv(): string[] {
  const raw = process.env.CANVAS_EXTRA_DIRS ?? "";
  return raw
    .split(/[;]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => path.resolve(s));
}

function uniqueRoots(roots: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const root of roots) {
    const key = toPosix(path.resolve(root)).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(path.resolve(root));
  }
  return unique;
}

export function resolveUserRoot(raw: string, repoRoot: string): string | null {
  const trimmed = raw.trim().replace(/\\/g, "/").replace(/\/+$/, "");
  if (!trimmed) return null;
  const home = toPosix(os.homedir());
  const expanded = trimmed.startsWith("~/")
    ? `${home}/${trimmed.slice(2)}`
    : trimmed === "~"
      ? home
      : trimmed;
  const resolved = path.isAbsolute(expanded)
    ? path.resolve(expanded)
    : path.resolve(repoRoot, expanded);
  return resolved;
}

export function resolveScanRoots(previewDir: string, repoRoot: string): string[] {
  const cursorCanvases = path.join(
    os.homedir(),
    ".cursor",
    "projects",
    "d-Project-Cursor-AP-DM",
    "canvases",
  );
  return uniqueRoots([
    path.join(repoRoot, "autosar", "dm", "analysis"),
    path.join(previewDir, "drop-in"),
    cursorCanvases,
    ...extraDirsFromEnv(),
  ]);
}

function scanRootsFile(previewDir: string): string {
  return path.join(previewDir, ".scan-roots.json");
}

export function loadSavedScanRoots(
  previewDir: string,
  repoRoot: string,
): string[] | null {
  const file = scanRootsFile(previewDir);
  if (!fs.existsSync(file)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as {
      roots?: unknown;
    };
    if (!Array.isArray(parsed.roots)) return null;
    const resolved = parsed.roots
      .filter((item): item is string => typeof item === "string")
      .map((item) => resolveUserRoot(item, repoRoot))
      .filter((item): item is string => Boolean(item));
    return uniqueRoots(resolved);
  } catch {
    return null;
  }
}

export function getActiveScanRoots(
  previewDir: string,
  repoRoot: string,
): string[] {
  return (
    loadSavedScanRoots(previewDir, repoRoot) ??
    resolveScanRoots(previewDir, repoRoot)
  );
}

function fileRank(repoRoot: string, abs: string): number {
  const rel = path.relative(repoRoot, abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return 2;
  if (rel.split(path.sep).includes("drop-in")) return 1;
  return 0;
}

function fileSha256(abs: string): string {
  return createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
}

export function collectCanvasFiles(repoRoot: string, roots: string[]): string[] {
  const files: string[] = [];
  const seenPath = new Set<string>();
  for (const root of roots) {
    const batch: string[] = [];
    walkCanvasFiles(root, batch);
    for (const file of batch) {
      const key = toPosix(file).toLowerCase();
      if (seenPath.has(key)) continue;
      seenPath.add(key);
      files.push(file);
    }
  }
  files.sort((a, b) => {
    const d = fileRank(repoRoot, a) - fileRank(repoRoot, b);
    if (d !== 0) return d;
    return a.localeCompare(b);
  });

  const seenNameHash = new Set<string>();
  const unique: string[] = [];
  for (const file of files) {
    const name = path.basename(file).toLowerCase();
    const key = `${name}\0${fileSha256(file)}`;
    if (seenNameHash.has(key)) continue;
    seenNameHash.add(key);
    unique.push(file);
  }
  return unique;
}

function describeRoots(repoRoot: string, roots: string[]): string[] {
  const home = toPosix(os.homedir());
  return roots.map((root) => {
    const rel = path.relative(repoRoot, root);
    if (!rel.startsWith("..") && !path.isAbsolute(rel)) return `${toPosix(rel)}/`;
    const abs = toPosix(root);
    const underHome =
      abs.toLowerCase() === home.toLowerCase() ||
      abs.toLowerCase().startsWith(`${home.toLowerCase()}/`);
    return underHome ? `~${abs.slice(home.length)}/` : `${abs}/`;
  });
}

function registryId(repoRoot: string, abs: string): string {
  const rel = toPosix(path.relative(repoRoot, abs));
  return rel.startsWith("..") ? toPosix(abs) : rel;
}

function emitEntry(
  repoRoot: string,
  abs: string,
  extra: string,
): string {
  const id = registryId(repoRoot, abs);
  const isMarkdown = abs.endsWith(".md");
  const label = path.basename(abs, isMarkdown ? ".md" : ".canvas.tsx");
  const importPath = isMarkdown
    ? `${viteFsImport(abs)}?raw`
    : viteFsImport(abs);
  const kind = isMarkdown ? "markdown" : "canvas";
  const loader = isMarkdown
    ? `() => import(${JSON.stringify(importPath)}).then((m) => m.default)`
    : `() => import(${JSON.stringify(importPath)})`;
  return (
    "  {\n" +
    `    id: ${JSON.stringify(id)},\n` +
    `    label: ${JSON.stringify(label)},\n` +
    `    relPath: ${JSON.stringify(id)},\n` +
    `    kind: ${JSON.stringify(kind)},\n` +
    `    load: ${loader},\n` +
    extra +
    "  }"
  );
}

function generateModule(
  repoRoot: string,
  roots: string[],
  canvasFiles: string[],
): string {
  const relatedByCanvas = new Map<string, string[]>();
  const markdownFiles: string[] = [];
  const seenMd = new Set<string>();

  for (const canvas of canvasFiles) {
    const related = resolvedMarkdownFiles(canvas, repoRoot);
    relatedByCanvas.set(canvas, related);
    for (const md of related) {
      const key = toPosix(md).toLowerCase();
      if (seenMd.has(key)) continue;
      seenMd.add(key);
      markdownFiles.push(md);
    }
  }

  const entries = [
    ...canvasFiles.map((abs) => {
      const relatedIds = (relatedByCanvas.get(abs) ?? []).map((md) =>
        registryId(repoRoot, md),
      );
      return emitEntry(
        repoRoot,
        abs,
        `    relatedIds: ${JSON.stringify(relatedIds)},\n`,
      );
    }),
    ...markdownFiles.map((abs) =>
      emitEntry(repoRoot, abs, "    relatedIds: [],\n"),
    ),
  ];

  return (
    "export const canvases = [\n" +
    entries.join(",\n") +
    "\n];\n" +
    `export const scanRoots = ${JSON.stringify(
      describeRoots(repoRoot, roots),
    )};\n` +
    `export const scanNote = ${JSON.stringify(
      "每行一个目录；支持仓库相对路径与 ~/。改完后点刷新。",
    )};\n`
  );
}

function jsonResponse(
  res: { statusCode: number; setHeader: (k: string, v: string) => void; end: (body: string) => void },
  status: number,
  body: unknown,
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function readJsonBody(req: { on: (ev: string, cb: (chunk?: Buffer) => void) => void }): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      if (chunk) chunks.push(Buffer.from(chunk));
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export function canvasRegistryPlugin(previewDir: string, repoRoot: string): Plugin {
  const applyRoots = (server: ViteDevServer, roots: string[]) => {
    fs.writeFileSync(
      scanRootsFile(previewDir),
      `${JSON.stringify({ roots: describeRoots(repoRoot, roots) }, null, 2)}\n`,
    );
    for (const root of roots) {
      const allow = server.config.server.fs.allow;
      const key = toPosix(root).toLowerCase();
      if (!allow.some((item) => toPosix(item).toLowerCase() === key)) {
        allow.push(root);
      }
      if (fs.existsSync(root)) server.watcher.add(root);
    }
    const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
    if (mod) server.moduleGraph.invalidateModule(mod);
    server.ws.send({ type: "full-reload" });
  };

  return {
    name: "canvas-registry",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const roots = getActiveScanRoots(previewDir, repoRoot);
      return generateModule(
        repoRoot,
        roots,
        collectCanvasFiles(repoRoot, roots),
      );
    },
    configureServer(server) {
      const watchRoots = (roots: string[]) => {
        for (const root of roots) {
          if (fs.existsSync(root)) server.watcher.add(root);
        }
      };
      watchRoots(getActiveScanRoots(previewDir, repoRoot));

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== SCAN_API) {
          next();
          return;
        }
        if (req.method === "GET") {
          const roots = getActiveScanRoots(previewDir, repoRoot);
          jsonResponse(res, 200, { roots: describeRoots(repoRoot, roots) });
          return;
        }
        if (req.method === "POST") {
          try {
            const body = (await readJsonBody(req)) as { roots?: unknown };
            const lines = Array.isArray(body.roots)
              ? body.roots.filter((item): item is string => typeof item === "string")
              : [];
            const roots = uniqueRoots(
              lines
                .map((item) => resolveUserRoot(item, repoRoot))
                .filter((item): item is string => Boolean(item)),
            );
            applyRoots(server, roots);
            jsonResponse(res, 200, { roots: describeRoots(repoRoot, roots) });
          } catch (err) {
            jsonResponse(res, 400, {
              error: err instanceof Error ? err.message : String(err),
            });
          }
          return;
        }
        next();
      });

      const invalidate = (file: string) => {
        if (!file.endsWith(".canvas.tsx") && !file.endsWith(".md")) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      };
      server.watcher.on("add", invalidate);
      server.watcher.on("unlink", invalidate);
      server.watcher.on("change", invalidate);
    },
  };
}
