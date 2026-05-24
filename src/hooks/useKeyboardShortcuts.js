import { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";

// 1. Keep configurations out of the core logic for cleaner readability
const SEQUENTIAL_SHORTCUTS = {
  gh: "/",
  gd: "/docs",
};

const SEARCH_SELECTORS = [
  ".DocSearch-Input",
  'input[type="search"]',
];

export default function useKeyboardShortcuts({ onOpenHelp, onCloseHelp }) {
  const history = useHistory();
  const keyBuffer = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      const active = document.activeElement;

      // 2. Enhanced check to prevent stealing focus from rich text editors
      const isTyping =
        active &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName) ||
          active.isContentEditable);

      if (isTyping) return;

      const { key, shiftKey } = event;

      // 3. Simple Single-key Map Matchers
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
        event.preventDefault();
        // Look for the first matching search bar element
        const searchInput = SEARCH_SELECTORS.reduce(
          (el, selector) => el || document.querySelector(selector),
          null
        );
        searchInput?.focus();
        return;
      }

      // 4. Sequential Combo Handling with a smart timeout reset
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      keyBuffer.current.push(key.toLowerCase());

      // Limit buffer to maximum required combo length (2 keys)
      if (keyBuffer.current.length > 2) {
        keyBuffer.current.shift();
      }

      const combo = keyBuffer.current.join("");

      // Check if the current typed combo matches any route configuration
      if (SEQUENTIAL_SHORTCUTS[combo]) {
        history.push(SEQUENTIAL_SHORTCUTS[combo]);
        keyBuffer.current = [];
      } else {
        // Clear the buffer if the user stalls for more than 1 second mid-combo
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
  }, [history, onOpenHelp, onCloseHelp]);
}
