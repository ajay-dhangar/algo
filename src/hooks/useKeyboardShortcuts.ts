import { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";

// --- Types & Interfaces ---
interface UseKeyboardShortcutsProps {
  onOpenHelp: () => void;
  onCloseHelp: () => void;
  onOpenChallengeSearch?: () => void; // ← NEW: opens the challenge search modal
  onToggleTheme?: () => void;
  onResetLayout?: () => void;
  onCollapseAll?: () => void;
}

type SequentialShortcuts = Record<string, string>;

// --- Constants ---
const SEQUENTIAL_SHORTCUTS: SequentialShortcuts = {
  gh: "/",
  gd: "/docs",
  gp: "/playground",
  gl: "/leaderboard",
  gb: "/blog",
  gq: "/quizzes",
  gc: "/challenges", // ← NEW: g then c → go to challenges
  gs: "/settings",
};

export default function useKeyboardShortcuts({
  onOpenHelp,
  onCloseHelp,
  onOpenChallengeSearch,
  onToggleTheme,
  onResetLayout,
  onCollapseAll,
}: UseKeyboardShortcutsProps): void {
  const history = useHistory();
  const keyBuffer = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      const active = document.activeElement as HTMLElement | null;

      // Detect if the user is already typing somewhere
      // (but we still intercept Ctrl+K even while typing)
      const isTyping =
        active &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) ||
          active.isContentEditable);

      const { key, shiftKey, metaKey, ctrlKey, altKey } = event;
      const lowerKey = key.toLowerCase();

      // ── 1. Ctrl/Cmd + K  →  Open Challenge Search ──────────────────────────
      // Intercepts even while typing so it's truly global
      if ((metaKey || ctrlKey) && lowerKey === "k") {
        event.preventDefault();
        if (onOpenChallengeSearch) {
          onOpenChallengeSearch();
        }
        return;
      }

      // All remaining shortcuts are suppressed while the user is typing
      if (isTyping) return;

      // ── 2. Ctrl/Cmd + Shift + D  →  Toggle theme ────────────────────────────
      if ((metaKey || ctrlKey) && shiftKey && lowerKey === "d" && onToggleTheme) {
        event.preventDefault();
        onToggleTheme();
        return;
      }

      // ── 3. Shift + ?  →  Open keyboard shortcuts modal ──────────────────────
      if (shiftKey && key === "?") {
        event.preventDefault();
        onOpenHelp();
        return;
      }

      // ── 4. Escape  →  Close modals / double-esc collapses sidebar ───────────
      if (key === "Escape") {
        event.preventDefault();
        onCloseHelp();

        if (keyBuffer.current[keyBuffer.current.length - 1] === "escape") {
          if (onCollapseAll) {
            onCollapseAll();
          } else {
            const expandedItems = document.querySelectorAll<HTMLElement>(
              ".menu__list-item:not(.menu__list-item--collapsed)"
            );
            expandedItems.forEach((item) => {
              const caret =
                item.querySelector<HTMLElement>(
                  ":scope > .menu__list-item-collapsible > .menu__caret"
                ) || item.querySelector<HTMLElement>(".menu__caret");
              if (caret) caret.click();
            });
          }
          keyBuffer.current = [];
        } else {
          keyBuffer.current.push("escape");
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            keyBuffer.current = [];
          }, 1000);
        }
        return;
      }

      // ── 5.  /  →  Open Challenge Search (single slash, no modifier) ─────────
      if (key === "/" && !shiftKey && !metaKey && !ctrlKey && !altKey) {
        event.preventDefault();
        if (onOpenChallengeSearch) {
          onOpenChallengeSearch();
        }
        return;
      }

      // ── 6. j / k  →  Next/prev doc pagination ───────────────────────────────
      if (lowerKey === "j" && !shiftKey && !metaKey && !ctrlKey && !altKey) {
        const nextLink = document.querySelector<HTMLElement>(
          ".pagination-nav__link--next"
        );
        if (nextLink) { event.preventDefault(); nextLink.click(); }
        return;
      }

      if (lowerKey === "k" && !shiftKey && !metaKey && !ctrlKey && !altKey) {
        const prevLink = document.querySelector<HTMLElement>(
          ".pagination-nav__link--prev"
        );
        if (prevLink) { event.preventDefault(); prevLink.click(); }
        return;
      }

      // ── 7. Alt + R  →  Reset layout/inputs ──────────────────────────────────
      if (altKey && lowerKey === "r" && onResetLayout) {
        event.preventDefault();
        onResetLayout();
        return;
      }

      // ── 8. Sequential combos (g + h, g + d, etc.) ───────────────────────────
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      keyBuffer.current.push(lowerKey);
      if (keyBuffer.current.length > 2) keyBuffer.current.shift();

      const combo = keyBuffer.current.join("");

      if (SEQUENTIAL_SHORTCUTS[combo]) {
        history.push(SEQUENTIAL_SHORTCUTS[combo]);
        keyBuffer.current = [];
      } else {
        timeoutRef.current = setTimeout(() => {
          keyBuffer.current = [];
        }, 1000);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    history,
    onOpenHelp,
    onCloseHelp,
    onOpenChallengeSearch,
    onToggleTheme,
    onResetLayout,
    onCollapseAll,
  ]);
}
