import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { useCursor, CursorType } from "@site/src/contexts/CursorContext";
import { FiMousePointer, FiStar, FiCheck, FiChevronDown, FiZap } from "react-icons/fi";
import { BiMeteor } from "react-icons/bi";



interface CursorOption {
  type: CursorType;
  label: string;
  icon: React.ReactNode;
}

const cursorOptions: CursorOption[] = [
  { 
    type: "default", 
    label: "Default Cursor", 
    icon: <FiMousePointer /> 
  },
  { 
    type: "glow", 
    label: "Glow Cursor", 
    icon: <FiZap className="text-amber-500 fill-current" /> 
  },
  { 
    type: "trail", 
    label: "Trail Cursor", 
    icon: <BiMeteor className="text-sky-500 text-base" /> 
  },
  { 
    type: "sparkle", 
    label: "Sparkle Cursor", 
    icon: <FiStar className="text-yellow-500 fill-current" /> 
  },
];

interface CursorSwitcherProps {
  /** 'embedded' mode strips popover positioning for placement inside parent menus */
  variant?: "popover" | "embedded";
  className?: string;
}

export default function CursorSwitcher({
  variant = "popover",
  className = "",
}: CursorSwitcherProps): React.JSX.Element {
  const { cursor, setCursor } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  // Handle outside click & Escape key listeners
  useEffect(() => {
    if (!isOpen || variant === "embedded") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, variant]);

  const selectCursor = useCallback(
    (type: CursorType) => {
      setCursor(type);
      setIsOpen(false);
    },
    [setCursor]
  );

  const currentOption =
    cursorOptions.find((o) => o.type === cursor) || cursorOptions[0];

  // Render horizontal icon bar when embedded inside parent dropdown
  if (variant === "embedded") {
    return (
      <div className={`w-full px-2 py-1.5 ${className}`}>
        <div className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Cursor Effects
        </div>
        <div
          className="flex items-center gap-1.5"
          role="radiogroup"
          aria-label="Cursor Style Options"
        >
          {cursorOptions.map((option) => {
            const isSelected = cursor === option.type;
            return (
              <button
                key={option.type}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                title={option.label}
                onClick={() => selectCursor(option.type)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                  isSelected
                    ? "border-emerald-500/50 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{option.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Standalone compact icon button for navbar
  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1 rounded-lg border border-neutral-200 bg-white/80 p-2 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-md transition-all hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={`Cursor style: ${currentOption.label}`}
        title={`Cursor style: ${currentOption.label}`}
      >
        <span className="text-sm leading-none">{currentOption.icon}</span>
        {/* <FiChevronDown
          className={`h-3 w-3 opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Cursor options"
          className="absolute right-0 z-50 mt-2 flex min-w-[140px] flex-col gap-1 rounded-xl border border-neutral-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl transition-all dark:border-neutral-800/80 dark:bg-neutral-900/95"
        >
          {cursorOptions.map((option) => {
            const isSelected = cursor === option.type;
            return (
              <button
                key={option.type}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                aria-label={option.label}
                title={option.label}
                onClick={() => selectCursor(option.type)}
                className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                  isSelected
                    ? "bg-emerald-50 font-semibold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                    : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{option.icon}</span>
                  <span className="text-xs">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}