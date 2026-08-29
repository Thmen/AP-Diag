import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MantineProvider } from "@mantine/core";
import { canvases, scanRoots } from "virtual:canvas-registry";
import type { CanvasEntry, CanvasModule } from "virtual:canvas-registry";
import { PREVIEW_OPEN_FILE } from "./canvas-actions";
import { MarkdownView } from "./MarkdownView";

const THEME_KEY = "canvas-preview-theme";
const LAYOUT_KEY = "canvas-preview-layout";
const SCAN_OPEN_KEY = "canvas-preview-scan-open";
const LINKED_HEIGHT_KEY = "canvas-preview-linked-height";

type ColorScheme = "light" | "dark";
type Layout = "wide" | "centered";

function readLayout(): Layout {
  try {
    const stored = localStorage.getItem(LAYOUT_KEY);
    if (stored === "wide" || stored === "centered") return stored;
  } catch {
    /* ignore */
  }
  return "centered";
}

function readScanOpen(): boolean {
  try {
    return localStorage.getItem(SCAN_OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

function readLinkedHeight(): number | null {
  try {
    const stored = Number(localStorage.getItem(LINKED_HEIGHT_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : null;
  } catch {
    return null;
  }
}

function readScheme(): ColorScheme {  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore quota / private mode */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readHashId(): string | null {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function writeHashId(id: string): void {
  const next = `#${encodeURIComponent(id)}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
}

function normalizeHint(hint: string): string {
  return hint.trim().replace(/\\/g, "/").replace(/^\.\//, "");
}

function findMarkdown(hint: string): CanvasEntry | undefined {
  const posix = normalizeHint(hint.split("#")[0] ?? hint);
  const base = (posix.split("/").pop() ?? posix).toLowerCase();
  const docs = canvases.filter((item) => item.kind === "markdown");
  return (
    docs.find((item) => item.id === posix) ??
    docs.find((item) => item.id.endsWith(`/${posix}`)) ??
    docs.find((item) => item.id.endsWith(posix)) ??
    docs.find((item) => (item.label + ".md").toLowerCase() === base)
  );
}

function extractMarkdownHints(text: string): string[] {
  return text.match(/[\w./\\-]+\.md/gi) ?? [];
}

class CanvasErrorBoundary extends Component<
  { resetKey: string; children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidUpdate(prevProps: { resetKey: string }) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="empty">
          <strong>该 canvas 加载失败</strong>
          <pre>{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScanToolIcon({
  name,
}: {
  name: "add" | "remove" | "edit" | "refresh" | "check";
}) {
  if (name === "add") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M7 2.5v9M2.5 7h9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "remove") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M2.5 7h9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "edit") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M8.2 3.2 10.8 5.8M3 11l1.1-4.1L9.4 1.6a1.2 1.2 0 0 1 1.7 0l1.3 1.3a1.2 1.2 0 0 1 0 1.7L7.1 9.9 3 11Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path
          d="M2.8 7.2 5.6 10l5.6-6.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M11.2 7A4.2 4.2 0 1 1 7 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M7 1.6 9.1 3.4 7.4 5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayoutIcon({ layout }: { layout: Layout }) {
  const inset = layout === "wide" ? 1.5 : 4.5;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect
        x="0.75"
        y="1.75"
        width="14.5"
        height="12.5"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <rect
        x={inset}
        y="4"
        width={16 - inset * 2}
        height="8"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

function CanvasHost({
  loader,
}: {
  loader: () => Promise<CanvasModule>;
}) {
  const Lazy = useMemo(
    () =>
      lazy(async () => {
        const mod = await loader();
        if (typeof mod.default !== "function") {
          throw new Error("canvas 必须 default export 一个 React 组件");
        }
        return { default: mod.default };
      }),
    [loader],
  );

  return (
    <Suspense fallback={<div className="empty">正在加载 canvas…</div>}>
      <Lazy />
    </Suspense>
  );
}

export function App() {
  const [query, setQuery] = useState("");
  const [scheme, setScheme] = useState<ColorScheme>(() => readScheme());
  const [layout, setLayout] = useState<Layout>(() => readLayout());
  const [selectedId, setSelectedId] = useState<string | null>(
    () =>
      readHashId() ??
      canvases.find((item) => item.kind === "canvas")?.id ??
      null,
  );
  const [rootDraft, setRootDraft] = useState<string[]>(() => [...scanRoots]);
  const [scanBusy, setScanBusy] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanSelected, setScanSelected] = useState<number | null>(null);
  const [scanEditing, setScanEditing] = useState(false);
  const [scanOpen, setScanOpen] = useState(() => readScanOpen());
  const [linkedOpen, setLinkedOpen] = useState(false);
  const [linkedHeight, setLinkedHeight] = useState<number | null>(() =>
    readLinkedHeight(),
  );
  const listRef = useRef<HTMLDivElement>(null);
  const linkedRef = useRef<HTMLDetailsElement>(null);
  const scanFoldRef = useRef<HTMLDetailsElement>(null);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [missing, setMissing] = useState<string | null>(null);

  const openScanFold = () => {
    setScanOpen(true);
  };

  useEffect(() => {
    try {
      localStorage.setItem(SCAN_OPEN_KEY, scanOpen ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [scanOpen]);

  const byId = useMemo(
    () => new Map(canvases.map((item) => [item.id, item])),
    [],
  );
  const canvasItems = useMemo(
    () => canvases.filter((item) => item.kind === "canvas"),
    [],
  );

  const filteredCanvases = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return canvasItems;
    return canvasItems.filter((canvas) =>
      `${canvas.label}\n${canvas.relPath}`.toLowerCase().includes(q),
    );
  }, [canvasItems, query]);

  const selected =
    canvases.find((c) => c.id === selectedId) ?? filteredCanvases[0] ?? null;

  const activeCanvas =
    selected?.kind === "canvas"
      ? selected
      : (canvasItems.find((canvas) =>
          canvas.relatedIds.includes(selected?.id ?? ""),
        ) ?? null);

  const linkFiles = (activeCanvas?.relatedIds ?? [])
    .map((id) => byId.get(id))
    .filter((item): item is CanvasEntry => item?.kind === "markdown");

  const openMarkdownHint = (hint: string): boolean => {
    const doc = findMarkdown(hint);
    if (!doc) {
      setMissing(normalizeHint(hint));
      return false;
    }
    setSelectedId(doc.id);
    return true;
  };

  const refreshScan = async (nextRoots?: string[]) => {
    setScanBusy(true);
    setScanError(null);
    try {
      const roots = (nextRoots ?? rootDraft)
        .map((line) => line.trim())
        .filter(Boolean);
      const response = await fetch("/__canvas-preview/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roots }),
      });
      const data = (await response.json()) as {
        roots?: string[];
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || `刷新失败（${response.status}）`);
      }
      if (Array.isArray(data.roots)) {
        setRootDraft(data.roots);
        setScanSelected((prev) =>
          prev !== null && prev < data.roots!.length ? prev : null,
        );
      }
      setScanEditing(false);
    } catch (err) {
      setScanError(err instanceof Error ? err.message : String(err));
    } finally {
      setScanBusy(false);
    }
  };

  const commitScanEdit = () => {
    const roots = rootDraft.map((line) => line.trim()).filter(Boolean);
    setRootDraft(roots);
    setScanEditing(false);
    void refreshScan(roots);
  };

  const startLinkedResize = (event: React.PointerEvent<HTMLDivElement>) => {
    const list = listRef.current;
    const linked = linkedRef.current;
    if (!list || !linked || !linkedOpen) return;
    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);

    const listBox = list.getBoundingClientRect();
    const summaryHeight =
      linked.querySelector("summary")?.getBoundingClientRect().height ?? 34;
    const minHeight = summaryHeight + 24;
    const maxHeight = Math.max(minHeight, listBox.height - 120);

    const onMove = (moveEvent: PointerEvent) => {
      const next = Math.min(
        maxHeight,
        Math.max(minHeight, listBox.bottom - moveEvent.clientY),
      );
      setLinkedHeight(next);
    };
    const onUp = () => {
      handle.releasePointerCapture(event.pointerId);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  };

  useEffect(() => {
    if (scanEditing) scanInputRef.current?.focus();
  }, [scanEditing, scanSelected]);

  const load = selected?.load;

  const markdownLoader = useMemo(
    () => async () => {
      const mod = await load!();
      if (typeof mod !== "string") throw new Error("Markdown 加载结果不是文本");
      return mod;
    },
    [load],
  );

  const canvasLoader = useMemo(
    () => async () => {
      const mod = await load!();
      if (typeof mod === "string" || typeof mod.default !== "function") {
        throw new Error("canvas 必须 default export 一个 React 组件");
      }
      return mod;
    },
    [load],
  );

  useEffect(() => {
    const onHash = () => {
      const id = readHashId();
      if (id && canvases.some((c) => c.id === id)) setSelectedId(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const filePath = (event as CustomEvent<string>).detail;
      if (typeof filePath !== "string") return;
      const doc = findMarkdown(filePath);
      if (doc) setSelectedId(doc.id);
      else setMissing(normalizeHint(filePath));
    };
    window.addEventListener(PREVIEW_OPEN_FILE, onOpen);
    return () => window.removeEventListener(PREVIEW_OPEN_FILE, onOpen);
  }, []);

  useEffect(() => {
    if (!missing) return;
    const timer = window.setTimeout(() => setMissing(null), 4000);
    return () => window.clearTimeout(timer);
  }, [missing]);

  useEffect(() => {
    if (selected) writeHashId(selected.id);
  }, [selected]);

  useEffect(() => {
    document.documentElement.dataset.theme = scheme;
    document.documentElement.style.colorScheme = scheme;
    try {
      localStorage.setItem(THEME_KEY, scheme);
    } catch {
      /* ignore */
    }
  }, [scheme]);

  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_KEY, layout);
    } catch {
      /* ignore */
    }
  }, [layout]);

  useEffect(() => {
    if (linkedHeight === null) return;
    try {
      localStorage.setItem(LINKED_HEIGHT_KEY, String(Math.round(linkedHeight)));
    } catch {
      /* ignore */
    }
  }, [linkedHeight]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="title-row">
            <h1>Canvas 预览</h1>
            <div className="theme-switch" role="group" aria-label="主题">
              <button
                type="button"
                aria-pressed={scheme === "light"}
                onClick={() => setScheme("light")}
              >
                浅色
              </button>
              <button
                type="button"
                aria-pressed={scheme === "dark"}
                onClick={() => setScheme("dark")}
              >
                深色
              </button>
            </div>
          </div>
          <input
            type="search"
            placeholder="按文件名或路径过滤…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="过滤文件"
          />
        </div>
        <div className="canvas-list" ref={listRef}>
          <details className="file-group canvas-files" open>
            <summary>Canvas Files</summary>
            {filteredCanvases.length === 0 ? (
              <p className="muted">没有匹配的 canvas</p>
            ) : (
              <ul>
                {filteredCanvases.map((canvas) => (
                  <li key={canvas.id}>
                    <button
                      type="button"
                      className={
                        canvas.id === selected?.id ? "active" : undefined
                      }
                      onClick={() => setSelectedId(canvas.id)}
                    >
                      <span className="name">{canvas.label}</span>
                      <span className="path">{canvas.relPath}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </details>
          {linkedOpen ? (
            <div
              className="split-handle"
              role="separator"
              aria-orientation="horizontal"
              aria-label="调整分栏高度"
              onPointerDown={startLinkedResize}
              onDoubleClick={() => setLinkedHeight(null)}
              title="拖动调整高度；双击复位"
            />
          ) : null}
          <details
            ref={linkedRef}
            className="file-group linked-files"
            style={
              linkedOpen && linkedHeight !== null
                ? { flex: `0 0 ${Math.round(linkedHeight)}px`, maxHeight: "none" }
                : undefined
            }
            onToggle={(event) => setLinkedOpen(event.currentTarget.open)}
          >
            <summary>Linked Files</summary>
            {linkFiles.length === 0 ? (
              <p className="muted">None</p>
            ) : (
              <ul>
                {linkFiles.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      className={doc.id === selected?.id ? "active" : undefined}
                      onClick={() => setSelectedId(doc.id)}
                    >
                      <span className="name">{doc.label}.md</span>
                      <span className="path">{doc.relPath}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </details>
        </div>
        <details
          ref={scanFoldRef}
          className="scan-fold"
          open={scanOpen}
          onToggle={(event) => setScanOpen(event.currentTarget.open)}
        >
          <summary>Scanned Path</summary>
          <div className="scan-tools">
            <button
              type="button"
              title="添加路径"
              aria-label="添加路径"
              disabled={scanEditing || scanBusy}
              onClick={(event) => {
                event.preventDefault();
                openScanFold();
                setRootDraft((prev) => {
                  setScanSelected(prev.length);
                  return [...prev, ""];
                });
                setScanEditing(true);
              }}
            >
              <ScanToolIcon name="add" />
            </button>
            <button
              type="button"
              title="删除路径"
              aria-label="删除路径"
              disabled={scanSelected === null || scanBusy}
              onClick={(event) => {
                event.preventDefault();
                if (scanSelected === null) return;
                const index = scanSelected;
                const next = rootDraft.filter((_, i) => i !== index);
                setRootDraft(next);
                setScanSelected(null);
                setScanEditing(false);
                void refreshScan(next);
              }}
            >
              <ScanToolIcon name="remove" />
            </button>
            <button
              type="button"
              title="编辑路径"
              aria-label="编辑路径"
              disabled={scanSelected === null || scanEditing || scanBusy}
              onClick={(event) => {
                event.preventDefault();
                if (scanSelected === null) return;
                openScanFold();
                setScanEditing(true);
              }}
            >
              <ScanToolIcon name="edit" />
            </button>
            <button
              type="button"
              title="刷新扫描"
              aria-label="刷新扫描"
              disabled={scanBusy || scanEditing}
              onClick={(event) => {
                event.preventDefault();
                void refreshScan();
              }}
            >
              <ScanToolIcon name="refresh" />
            </button>
          </div>
          <ul className="scan-path-list">
            {rootDraft.length === 0 ? (
              <li className="muted">None</li>
            ) : (
              rootDraft.map((root, index) => {
                const selectedPath = scanSelected === index;
                const editingPath = scanEditing && selectedPath;
                return (
                  <li
                    key={index}
                    className={selectedPath ? "selected" : undefined}
                  >
                    <input
                      ref={editingPath ? scanInputRef : undefined}
                      value={root}
                      readOnly={!editingPath}
                      spellCheck={false}
                      aria-label={`扫描路径 ${index + 1}`}
                      onClick={() => {
                        if (!scanEditing) setScanSelected(index);
                      }}
                      onChange={(event) => {
                        const value = event.target.value;
                        setRootDraft((prev) =>
                          prev.map((item, i) => (i === index ? value : item)),
                        );
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && editingPath) {
                          event.preventDefault();
                          commitScanEdit();
                        }
                      }}
                    />
                    {editingPath ? (
                      <button
                        type="button"
                        className="scan-check"
                        title="完成并刷新"
                        aria-label="完成并刷新"
                        disabled={scanBusy}
                        onClick={(event) => {
                          event.preventDefault();
                          commitScanEdit();
                        }}
                      >
                        <ScanToolIcon name="check" />
                      </button>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
          {scanError ? <p className="scan-error">{scanError}</p> : null}
        </details>
        <p className="file-count">
          <span>{canvasItems.length} canvas</span>
          <span>{linkFiles.length} linked</span>
        </p>
      </aside>
      <main className="stage">
        <button
          type="button"
          className="layout-toggle"
          aria-pressed={layout === "wide"}
          title={layout === "wide" ? "切换为居中显示" : "切换为全宽显示"}
          aria-label={layout === "wide" ? "切换为居中显示" : "切换为全宽显示"}
          onClick={() =>
            setLayout((prev) => (prev === "wide" ? "centered" : "wide"))
          }
        >
          <LayoutIcon layout={layout} />
        </button>
        {missing ? (
          <div className="toast" role="status">
            未收录该文件：<code>{missing}</code>
          </div>
        ) : null}
        <div className="stage-scroll">
          {!selected ? (
            <div className="empty">
              未发现可预览文件。把 `.canvas.tsx` 放到{" "}
              <code>autosar/dm/analysis/</code> 或{" "}
              <code>canvas-preview/drop-in/</code>。
            </div>
          ) : (
            <MantineProvider
              forceColorScheme={scheme}
              defaultColorScheme={scheme}
            >
              <div
                className={`canvas-frame ${layout}`}
                onClickCapture={(event) => {
                  if (selected.kind !== "canvas") return;
                  const node = event.target;
                  if (!(node instanceof Element)) return;
                  const host = node.closest("button, a, p, span, li, td");
                  const text = host?.textContent ?? "";
                  const hints = extractMarkdownHints(text);
                  if (hints[0] && openMarkdownHint(hints[0])) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
              >
                <CanvasErrorBoundary resetKey={selected.id}>
                  {selected.kind === "markdown" ? (
                    <MarkdownView
                      key={selected.id}
                      loader={markdownLoader}
                      onOpenMarkdown={openMarkdownHint}
                    />
                  ) : (
                    <CanvasHost key={selected.id} loader={canvasLoader} />
                  )}
                </CanvasErrorBoundary>
              </div>
            </MantineProvider>
          )}
        </div>
      </main>
    </div>
  );
}
