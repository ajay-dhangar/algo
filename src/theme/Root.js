import React, { useState, useCallback } from "react";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

export default function Root({ children }) {
  const [showKeyboardModal, setShowKeyboardModal] =
    useState(false);

  useKeyboardShortcuts({
    onOpenHelp: () => setShowKeyboardModal(true),
    onCloseHelp: () => setShowKeyboardModal(false),
  });

  return (
    <>
      {children}

      <KeyboardShortcutsModal
        isOpen={showKeyboardModal}
        onClose={() => setShowKeyboardModal(false)}
      />
    </>
  );
}