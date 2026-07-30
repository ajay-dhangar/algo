import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import KeyboardShortcutsModal from "../components/KeyboardShortcutsModal";
import ChallengeSearchModal from "../components/ChallengeSearchModal";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";
import PageProgressIndicator from "../components/PageProgressIndicator";
import SidebarUpdater from '../components/ProgressTracker/SidebarUpdater';
import { AuthProvider } from "../contexts/AuthContext";
 
export default function Root({ children }) {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const isHomepage = location.pathname === siteConfig.baseUrl;
  const isDocsPage = location.pathname.includes("/docs/");

  // Client-side anti-clickjacking frame-busting protection
  useEffect(() => {
    if (typeof window !== "undefined" && window.top !== window.self) {
      try {
        if (window.top.location.hostname !== window.self.location.hostname) {
          window.top.location.href = window.self.location.href;
        }
      } catch (e) {
        window.self.location.href = "about:blank";
      }
    }
  }, []);
 
  const onOpenHelp  = useCallback(() => setShowKeyboardModal(true), []);
  const onCloseHelp = useCallback(() => setShowKeyboardModal(false), []);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
 
  const onOpenSearch  = useCallback(() => setShowChallengeSearch(true), []);
  const onCloseSearch = useCallback(() => setShowChallengeSearch(false), []);
  const [showChallengeSearch, setShowChallengeSearch] = useState(false);
 
  useKeyboardShortcuts({
    onOpenHelp,
    onCloseHelp,
    onOpenChallengeSearch: onOpenSearch,
  });
 
  return (
    <>
      <Head>
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self';" />
      </Head>
      <AuthProvider>
        <SidebarUpdater />
        {isDocsPage && <PageProgressIndicator />}
        {children}
        <KeyboardShortcutsModal
          isOpen={showKeyboardModal}
          onClose={onCloseHelp}
        />
        <ChallengeSearchModal
          isOpen={showChallengeSearch}
          onClose={onCloseSearch}
        />
      </AuthProvider>
    </>
  );
}