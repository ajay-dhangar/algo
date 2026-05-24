import React, { useState, useCallback } from "react";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

export default function Root({ children }) {
  const onOpenHelp = useCallback(() => setShowKeyboardModal(true), []);
  const onCloseHelp = useCallback(() => setShowKeyboardModal(false), []);
  const [showKeyboardModal, setShowKeyboardModal] =
    useState(false);

  useKeyboardShortcuts({
    onOpenHelp,
    onCloseHelp,
  });

  return (
    <>
      {children}

      <KeyboardShortcutsModal
        isOpen={showKeyboardModal}
        onClose={onCloseHelp}
      />
    </>
  );
}
