import React from "react";

const ShortcutRow = ({ action, shortcut }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
    <span className="text-[0.95rem] font-medium text-slate-900 dark:text-white">
      {action}
    </span>

    <kbd className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-[0.85rem] font-semibold text-slate-900 dark:text-white">
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[500px] bg-white dark:bg-gray-900 text-slate-900 dark:text-white p-8 rounded-[18px] shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="m-0 text-2xl font-bold">
              Keyboard Shortcuts
            </h2>

            <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-[0.95rem]">
              Navigate Algo faster with keyboard shortcuts
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="border-none w-10 h-10 rounded-[10px] cursor-pointer text-[1.2rem] font-bold flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors"
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
            shortcut="Cmd/Ctrl + K or /"
          />

          <ShortcutRow
            action="Go to Home"
            shortcut="g + h"
          />

          <ShortcutRow
            action="Go to Docs"
            shortcut="g + d"
          />

          <ShortcutRow
            action="Go to Playground"
            shortcut="g + p"
          />

          <ShortcutRow
            action="Go to Leaderboard"
            shortcut="g + l"
          />

          <ShortcutRow
            action="Go to Blog"
            shortcut="g + b"
          />

          <ShortcutRow
            action="Go to Quizzes"
            shortcut="g + q"
          />
        </div>
      </div>
    </div>
  );
}
