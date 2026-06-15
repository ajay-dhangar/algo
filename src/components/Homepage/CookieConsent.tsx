import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@docusaurus/Link";
import { FaCookieBite, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

type ConsentType = "all" | "essential" | null;

const COOKIE_KEY = "cookie_consent";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const updateBodyPadding = useCallback(() => {
    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      document.body.style.paddingBottom = `${bannerHeight + 24}px`;
    }
  }, []);

  const removeBodyPadding = useCallback(() => {
    document.body.style.paddingBottom = "";
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY) as ConsentType;

    if (!saved) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      // Use a small delay to ensure the banner is rendered before measuring
      const timeoutId = setTimeout(updateBodyPadding, 100);
      window.addEventListener("resize", updateBodyPadding);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", updateBodyPadding);
        removeBodyPadding();
      };
    } else {
      removeBodyPadding();
    }
  }, [visible, updateBodyPadding, removeBodyPadding]);

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
          ref={bannerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "min(92%, 600px)",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--ifm-background-color)",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "1rem",
              padding: "1.25rem",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  color: "#22c55e",
                  fontSize: "1.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <FaCookieBite />
              </div>

              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    color: "var(--ifm-font-color-base)",
                    margin: 0,
                  }}
                >
                  We use cookies
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--ifm-color-emphasis-700)",
                    margin: "0.25rem 0 0 0",
                  }}
                >
                  We use cookies to improve performance, store preferences, and
                  analyze traffic.
                </p>
              </div>
            </div>

            {/* INFO */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--ifm-color-emphasis-600)",
                marginBottom: "1rem",
              }}
            >
              <FaInfoCircle style={{ marginTop: "0.125rem", flexShrink: 0 }} />
              <span>
                You can accept all cookies, reject non-essential ones, or review
                full details anytime.
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => saveConsent("all")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#15803d")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#16a34a")
                  }
                >
                  <FaCheck /> Accept All
                </button>

                <button
                  onClick={() => saveConsent("essential")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "var(--ifm-color-emphasis-200)",
                    color: "var(--ifm-font-color-base)",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--ifm-color-emphasis-300)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--ifm-color-emphasis-200)")
                  }
                >
                  <FaTimes /> Reject Non-Essential
                </button>
              </div>

              {/* COOKIE POLICY LINK */}
              <Link
                to="/cookies"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--ifm-color-primary)",
                }}
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
