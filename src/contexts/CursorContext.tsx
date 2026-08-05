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
    if (cursor === "default") {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }
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
