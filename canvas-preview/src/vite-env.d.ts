/// <reference types="vite/client" />

declare module "virtual:canvas-registry" {
  export type CanvasModule = {
    default: import("react").ComponentType;
  };

  export type DocKind = "canvas" | "markdown";

  export type CanvasEntry = {
    id: string;
    label: string;
    relPath: string;
    kind: DocKind;
    relatedIds: string[];
    load: () => Promise<CanvasModule | string>;
  };

  export const canvases: CanvasEntry[];
  export const scanRoots: string[];
  export const scanNote: string;
}
