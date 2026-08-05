import React, { useState, useRef, useEffect } from "react";
import { useCursor, CursorType } from "@site/src/contexts/CursorContext";

const cursorOptions: { type: CursorType; label: string; icon: string }[] = [
  { type: "default", label: "Default", icon: "↖" },
  { type: "glow", label: "Glow", icon: "✨" },
  { type: "trail", label: "Trail", icon: "☄️" },
  { type: "sparkle", label: "Sparkle", icon: "⭐" },
];

export default function CursorSwitcher() {
  const { cursor, setCursor } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = cursorOptions.find((o) => o.type === cursor) || cursorOptions[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
        aria-expanded={isOpen}
      >
        <span>{currentOption.icon}</span>
        <span className="hidden sm:inline">Cursor: {currentOption.label}</span>
        <svg className="w-4 h-4 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-50">
          {cursorOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                setCursor(option.type);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                cursor === option.type
                  ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
