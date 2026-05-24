import React from "react";

const ShortcutRow = ({ action, shortcut }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 0",
      borderBottom: "1px solid #e5e7eb",
    }}
  >
    <span
      style={{
        fontSize: "0.95rem",
        fontWeight: 500,
      }}
    >
      {action}
    </span>

    <kbd
      style={{
        background: "#f3f4f6",
        padding: "6px 10px",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: 600,
        border: "1px solid #d1d5db",
      }}
    >
      {shortcut}
    </kbd>
  </div>
);

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          background: "#ffffff",
          color: "#111827",
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          borderRadius: "18px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Keyboard Shortcuts
            </h2>

            <p
              style={{
                marginTop: "0.4rem",
                color: "#6b7280",
                fontSize: "0.95rem",
              }}
            >
              Navigate Algo faster with keyboard shortcuts
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "none",
              background: "#f3f4f6",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>

        <div>
          <ShortcutRow
            action="Open shortcuts help"
            shortcut="Shift + /"
          />

          <ShortcutRow
            action="Close modal"
            shortcut="Esc"
          />

          <ShortcutRow
            action="Focus search"
            shortcut="/"
          />

          <ShortcutRow
            action="Go to Home"
            shortcut="g + h"
          />

          <ShortcutRow
            action="Go to Docs"
            shortcut="g + d"
          />
        </div>
      </div>
    </div>
  );
}
