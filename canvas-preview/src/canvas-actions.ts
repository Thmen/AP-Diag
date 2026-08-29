import { useCallback } from "react";

export const PREVIEW_OPEN_FILE = "preview-open-file";

type CanvasAction = {
  type: string;
  path?: string;
  [key: string]: unknown;
};

export function useCanvasAction(): (action: CanvasAction) => void {
  return useCallback((action: CanvasAction) => {
    if (action?.type === "openFile" && typeof action.path === "string") {
      window.dispatchEvent(
        new CustomEvent(PREVIEW_OPEN_FILE, { detail: action.path }),
      );
    }
  }, []);
}
