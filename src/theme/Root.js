import React, { useState, useCallback } from "react";
import { useLocation } from "@docusaurus/router";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";
import BottomToTop from "../components/Scroller/BottomToTop/BottomToTop.tsx";
import TopToBottom from "../components/Scroller/TopToBottom/TopToBottom.tsx";

export default function Root({ children }) {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const onOpenHelp = useCallback(() => setShowKeyboardModal(true), []);
  const onCloseHelp = useCallback(() => setShowKeyboardModal(false), []);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

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
      {!isHomepage && <BottomToTop />}
      {!isHomepage && <TopToBottom />}
    </>
  );
}