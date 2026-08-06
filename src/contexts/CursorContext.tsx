import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CursorType = "default" | "glow" | "trail" | "sparkle";

interface CursorContextValue {
  cursor: CursorType;
  setCursor: (cursor: CursorType) => void;
}

const CURSOR_STORAGE_KEY = "algo.cursor.v1";

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

function safeWindow() {
  return typeof window !== "undefined" ? window : undefined;
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursorState] = useState<CursorType>(() => {
    const scope = safeWindow();
    if (!scope) return "default";
    try {
      const stored = scope.localStorage.getItem(CURSOR_STORAGE_KEY) as CursorType;
      return stored && ["default", "glow", "trail", "sparkle"].includes(stored) ? stored : "default";
    } catch {
      return "default";
    }
  });

  const setCursor = (newCursor: CursorType) => {
    setCursorState(newCursor);
    const scope = safeWindow();
    if (scope) {
      scope.localStorage.setItem(CURSOR_STORAGE_KEY, newCursor);
    }
  };

  useEffect(() => {
    const isActive = cursor !== "default";
    // Toggle the CSS class that applies `cursor: none !important` to body and
    // all its descendants. This is more robust than an inline style, which can
    // be silently overridden by any component-level CSS that sets `cursor`.
    document.body.classList.toggle("custom-cursor-active", isActive);
    // Also clear any residual inline cursor style so the CSS class is the
    // sole source of truth.
    document.body.style.cursor = "";
  }, [cursor]);

  const value = useMemo(() => ({ cursor, setCursor }), [cursor]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
