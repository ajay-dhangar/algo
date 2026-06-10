import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@docusaurus/Link";
import { FaCookieBite, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

type ConsentType = "all" | "essential" | null;

const COOKIE_KEY = "cookie_consent";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY) as ConsentType;

    if (!saved) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (type: ConsentType) => {
    localStorage.setItem(COOKIE_KEY, type || "essential");
    setVisible(false);

    if (type === "all") {
      console.log("All cookies accepted (analytics enabled)");
    } else {
      console.log("Only essential cookies enabled");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[92%] md:w-[600px]"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl p-5">
            {/* HEADER */}
            <div className="flex items-start gap-3 mb-4">
              <div className="text-green-500 text-xl mt-1">
                <FaCookieBite />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white m-0">
                  We use cookies
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0 mt-1">
                  We use cookies to improve performance, store preferences, and
                  analyze traffic.
                </p>
              </div>
            </div>

            {/* INFO */}
            <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <FaInfoCircle className="mt-0.5" />
              <span>
                You can accept all cookies, reject non-essential ones, or review
                full details anytime.
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => saveConsent("all")}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  <FaCheck /> Accept All
                </button>

                <button
                  onClick={() => saveConsent("essential")}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  <FaTimes /> Reject Non-Essential
                </button>
              </div>

              {/* COOKIE POLICY LINK */}
              <Link
                to="/cookies"
                className="flex items-center gap-2 text-sm font-semibold text-[var(--ifm-color-primary)] hover:underline mt-2 md:mt-0"
              >
                View Cookie Policy →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
