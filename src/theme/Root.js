import React, { useState, useCallback } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";
import BottomToTop from "../components/Scroller/BottomToTop/BottomToTop";
import TopToBottom from "../components/Scroller/TopToBottom/TopToBottom";
import PageProgressIndicator from "../components/PageProgressIndicator";
import SidebarUpdater from '../components/ProgressTracker/SidebarUpdater';
import { AuthProvider } from "../contexts/AuthContext";

export default function Root({ children }) {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const isHomepage = location.pathname === siteConfig.baseUrl;
  const isDocsPage = location.pathname.includes("/docs/");

  const onOpenHelp = useCallback(() => setShowKeyboardModal(true), []);
  const onCloseHelp = useCallback(() => setShowKeyboardModal(false), []);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  useKeyboardShortcuts({
    onOpenHelp,
    onCloseHelp,
  });

  return (
    <>
      <AuthProvider>
        <SidebarUpdater />
        {isDocsPage && <PageProgressIndicator />}
        {children}
        <KeyboardShortcutsModal
          isOpen={showKeyboardModal}
          onClose={onCloseHelp}
        />
        {!isHomepage && <BottomToTop />}
        {!isHomepage && <TopToBottom />}
      </AuthProvider>
    </>
  );
}
