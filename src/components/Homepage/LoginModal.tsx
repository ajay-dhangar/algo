import React, { useRef, useEffect } from "react";
import { FiX, FiArrowRight, FiLogIn, FiUserPlus, FiCompass, FiTerminal } from "react-icons/fi";
import { useHistory } from "@docusaurus/router";
import { useAuth } from "../../contexts/AuthContext";
import { useFocusTrap } from "../../hooks/useFocusTrap";

interface CTAActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CTAActionModal: React.FC<CTAActionModalProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal safely on backdrop clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useFocusTrap(modalRef, { isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md px-4 transition-all duration-300">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Login & Onboarding"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-800/80 shadow-2xl transition-all duration-300"
      >
        {/* Tech-Layer Grid Styling Backgrounds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-2xl pointer-events-none" />
        <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-2xl pointer-events-none" />

        {/* Global Exit Anchor */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-50 inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 border-none bg-transparent cursor-pointer transition-colors"
          aria-label="Close onboarding panel"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col">
          {/* Header Description Stack */}
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">
              Workspace Core Engine
            </span>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-3 mb-1">
              Initialize Your Training Lab
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 m-0">
              Select an environment execution path to begin compiling structural algorithm logic profiles.
            </p>
          </div>

          {/* Conditional Action Routers */}
          {isAuthenticated && user ? (
            /* Scenario A: Authenticated User Telemetry */
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center space-y-4">
              <div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 m-0">
                  Active Session Verified
                </p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                  Welcome back, <strong className="text-slate-800 dark:text-slate-200">{user.name}</strong>. Ready to synchronize code commits.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  history.push("/algo/profile");
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 px-4 transition-all cursor-pointer border-none shadow-sm"
              >
                Launch Developer Workspace <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Scenario B: Unauthenticated Traffic Action Splits */
            <div className="grid gap-4 sm:grid-cols-2">
              
              {/* Option 1: Forward to Login Engine */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  history.push("/algo/login");
                }}
                className="group flex flex-col items-start p-4 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/30 hover:bg-white dark:hover:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer focus:outline-none"
              >
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FiLogIn className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white m-0 flex items-center gap-1">
                  Sign In <FiArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 leading-normal">
                  Restore existing module tokens, points configurations, and resume checkpoints.
                </p>
              </button>

              {/* Option 2: Forward to Register Engine */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  history.push("/algo/register");
                }}
                className="group flex flex-col items-start p-4 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-gray-950/30 hover:bg-white dark:hover:bg-gray-900 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer focus:outline-none"
              >
                <div className="h-9 w-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FiUserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white m-0 flex items-center gap-1">
                  Create Account <FiArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 leading-normal">
                  Establish a fresh local environment profile and initialize sandbox tracking variables.
                </p>
              </button>

              {/* Sandbox Alternative Link Footer */}
              <div className="sm:col-span-2 mt-2 p-3 rounded-lg bg-slate-100/50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
                  <FiTerminal className="opacity-70" /> Want to experiment without data saving?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    history.push("/algo/docs/");
                  }}
                  className="bg-transparent border-none p-0 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  Skip to Docs <FiCompass className="w-3 h-3" />
                </button>
              </div>

            </div>
          )}

          {/* Secure Infrastructure Guard Footer Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-gray-500">
            <span>🛡️ System Framework Encryption Layer Verified</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTAActionModal;