import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownView({
  loader,
  onOpenMarkdown,
}: {
  loader: () => Promise<string>;
  onOpenMarkdown: (hint: string) => boolean;
}) {
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSource(null);
    setError(null);
    loader()
      .then((text) => {
        if (!cancelled) setSource(text);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [loader]);

  if (error) {
    return (
      <div className="empty">
        <strong>Markdown 加载失败</strong>
        <pre>{error}</pre>
      </div>
    );
  }
  if (source === null) {
    return <div className="empty">正在加载 Markdown…</div>;
  }

  return (
    <div className="md-preview">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            if (href && (href.endsWith(".md") || href.includes(".md#"))) {
              return (
                <a
                  href={href}
                  onClick={(event) => {
                    if (onOpenMarkdown(href.split("#")[0] ?? href)) {
                      event.preventDefault();
                    }
                  }}
                >
                  {children}
                </a>
              );
            }
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
