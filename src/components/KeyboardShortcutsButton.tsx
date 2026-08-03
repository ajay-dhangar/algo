import React from "react";
import styles from "./KeyboardShortcutsButton.module.css";

interface KeyboardShortcutsButtonProps {
  onClick: () => void;
}

/**
 * The Shift+? shortcut (see useKeyboardShortcuts.ts) already opens
 * KeyboardShortcutsModal, but nothing in the UI hints that it exists —
 * there's no visible way to discover it without already knowing the key
 * combo. This is a small, always-present floating button that both opens
 * the modal for people who don't know the shortcut, and acts as a visual
 * hint (via its label/title) that the shortcut exists.
 */
export default function KeyboardShortcutsButton({ onClick }: KeyboardShortcutsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
      aria-label="Keyboard shortcuts (press Shift + ?)"
      title="Keyboard shortcuts (Shift + ?)"
    >
      ?
    </button>
  );
}
