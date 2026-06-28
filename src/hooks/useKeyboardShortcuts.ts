import { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";

// --- Types & Interfaces ---
interface UseKeyboardShortcutsProps {
  onOpenHelp: () => void;
  onCloseHelp: () => void;
  onToggleTheme?: () => void;     // Optional callback for theme toggling
  onResetLayout?: () => void;     // Optional callback for resetting layout/code
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
  gs: "/settings", // Added matching key from the modal configuration
};

const SEARCH_SELECTORS: string[] = [
  ".DocSearch-Button", // Docusaurus Algolia button
  ".DocSearch-Input",
  'input[type="search"]',
];

export default function useKeyboardShortcuts({
  onOpenHelp,
  onCloseHelp,
  onToggleTheme,
  onResetLayout,
}: UseKeyboardShortcutsProps): void {
  const history = useHistory();
  const keyBuffer = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Helper to safely trigger the search box
    const focusOrClickSearch = (event: KeyboardEvent): void => {
      event.preventDefault();
      const searchInput = SEARCH_SELECTORS.reduce<HTMLElement | null>(
        (el, selector) => el || document.querySelector(selector),
        null
      );

      if (searchInput) {
        searchInput.focus();
        if (searchInput.tagName === "BUTTON") {
          searchInput.click();
        }
      }
    };

    const handler = (event: KeyboardEvent): void => {
      const active = document.activeElement as HTMLElement | null;

      // Enhanced check to prevent stealing focus from input nodes or text editors
      const isTyping =
        active &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) ||
          active.isContentEditable);

      const { key, shiftKey, metaKey, ctrlKey, altKey } = event;
      const lowerKey = key.toLowerCase();

      // 1. Global Command: Cmd/Ctrl + K (Trigger even if typing)
      if ((metaKey || ctrlKey) && lowerKey === "k") {
        focusOrClickSearch(event);
        return;
      }

      if (isTyping) return;

      // 2. Global Command: Cmd/Ctrl + T (Theme Toggle)
      if ((metaKey || ctrlKey) && lowerKey === "t" && onToggleTheme) {
        event.preventDefault();
        onToggleTheme();
        return;
      }

      // 3. Simple Single-key / Matchers
      if (shiftKey && key === "?") {
        event.preventDefault();
        onOpenHelp();
        return;
      }

      if (key === "Escape") {
        event.preventDefault();
        onCloseHelp();
        keyBuffer.current = [];
        return;
      }

      if (key === "/") {
        focusOrClickSearch(event);
        return;
      }

      // 4. Global Modifier: Alt + R (Reset layout/inputs)
      if (altKey && lowerKey === "r" && onResetLayout) {
        event.preventDefault();
        onResetLayout();
        return;
      }

      // 5. Sequential Combo Handling (e.g., 'g' then 'h')
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      keyBuffer.current.push(lowerKey);

      // Enforce maximum buffer layout depth (2 character sequences max)
      if (keyBuffer.current.length > 2) {
        keyBuffer.current.shift();
      }

      const combo = keyBuffer.current.join("");

      // Check for route map matches
      if (SEQUENTIAL_SHORTCUTS[combo]) {
        history.push(SEQUENTIAL_SHORTCUTS[combo]);
        keyBuffer.current = [];
      } else {
        // Break buffer chain window seamlessly after 1000ms
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
  }, [history, onOpenHelp, onCloseHelp, onToggleTheme, onResetLayout]);
}
