import { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";

export default function useKeyboardShortcuts({
  onOpenHelp,
  onCloseHelp,
}) {
  const history = useHistory();
  const keyBuffer = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      const active = document.activeElement;

      const isTyping =
        active &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName);

      if (isTyping) return;

      // Open shortcuts modal
      if (e.shiftKey && e.key === "?") {
        e.preventDefault();
        onOpenHelp();
        return;
      }

      // Close modal
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseHelp();
        keyBuffer.current = [];
        return;
      }

      // Focus search
      if (e.key === "/") {
        e.preventDefault();

        const searchInput =
          document.querySelector(".DocSearch-Input") ||
          document.querySelector('input[type="search"]');

        if (searchInput) {
          searchInput.focus();
        }

        return;
      }

      // Navigation shortcuts
      keyBuffer.current.push(e.key.toLowerCase());

      if (keyBuffer.current.length > 2) {
        keyBuffer.current.shift();
      }

      const combo = keyBuffer.current.join("");

      if (combo === "gh") {
        history.push("/");
        keyBuffer.current = [];
      }

      if (combo === "gd") {
        history.push("/docs");
        keyBuffer.current = [];
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [history, onOpenHelp, onCloseHelp]);
}