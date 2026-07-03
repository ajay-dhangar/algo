import React from "react";

interface ShortcutItem {
  action: string;
  keys: string[];
}

interface ShortcutRowProps {
  action: string;
  keys: string[];
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS_DATA: ShortcutItem[] = [
  { action: "Open shortcuts help", keys: ["Shift", "/"] },
  { action: "Close modal", keys: ["Esc"] },
  { action: "Focus search", keys: ["⌘K", "or", "/"] },
  { action: "Go to Home", keys: ["g", "h"] },
  { action: "Go to Docs", keys: ["g", "d"] },
  { action: "Go to Playground", keys: ["g", "p"] },
  { action: "Go to Leaderboard", keys: ["g", "l"] },
  { action: "Go to Blog", keys: ["g", "b"] },
  { action: "Go to Quizzes", keys: ["g", "q"] },

  { action: "Toggle dark mode", keys: ["⌘", "Shift", "D"] },
  { action: "Next item / Next step", keys: ["j"] },
  { action: "Previous item / Previous step", keys: ["k"] },
  { action: "Collapse/Expand all panes", keys: ["Esc", "Esc"] },
];

const ShortcutRow: React.FC<ShortcutRowProps> = ({ action, keys }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
      {action}
    </span>
    <div className="flex items-center gap-1.5">
      {keys.map((key, index) => {
    
        if (key === "or" || key === "+") {
          return (
            <span key={index} className="text-xs text-slate-400 font-normal px-0.5">
              {key}
            </span>
          );
        }
        return (
          <kbd
            key={index}
            className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-md text-xs font-semibold font-sans text-slate-800 dark:text-slate-200 shadow-sm"
          >
            {key}
          </kbd>
        );
      })}
    </div>
  </div>
);

export default function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800 flex flex-col max-h-[85vh]"
      >
        <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Keyboard Shortcuts
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Navigate Algo faster with keyboard shortcuts
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex flex-col">
            {SHORTCUTS_DATA.map((item, index) => (
              <ShortcutRow 
                key={index} 
                action={item.action} 
                keys={item.keys} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
