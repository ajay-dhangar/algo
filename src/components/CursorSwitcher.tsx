import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";
import { useCursor, CursorType } from "@site/src/contexts/CursorContext";
import {
  FiMousePointer,
  FiStar,
  FiCheck,
  FiChevronDown,
  FiZap,
} from "react-icons/fi";
import { BiMeteor } from "react-icons/bi";

interface CursorOption {
  type: CursorType;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const cursorOptions: CursorOption[] = [
  {
    type: "default",
    label: "Default",
    description: "Standard pointer",
    icon: <FiMousePointer className="text-neutral-500 dark:text-neutral-400" />,
  },
  {
    type: "glow",
    label: "Glow Aura",
    description: "Soft glowing ring",
    icon: <FiZap className="text-amber-500 fill-amber-500/20" />,
  },
  {
    type: "trail",
    label: "Cosmic Trail",
    description: "Particle trail effect",
    icon: <BiMeteor className="text-sky-500 text-base" />,
  },
  {
    type: "sparkle",
    label: "Sparkles",
    description: "Bursting stars",
    icon: <FiStar className="text-purple-500 fill-purple-500/20" />,
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

  // ---------------------------------------------------------------------------
  // 1. EMBEDDED VARIANT (inside Mobile Drawer / Custom Submenus)
  // ---------------------------------------------------------------------------
  if (variant === "embedded") {
    return (
      <div className={`w-full py-2 ${className}`}>
        <div className="mb-2 px-1 flex items-center justify-between text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
          <span>Cursor Mode</span>
          <span className="text-[10px] text-emerald-500 capitalize font-normal">
            {currentOption.label}
          </span>
        </div>
        <div
          className="grid grid-cols-4 gap-1.5 rounded-xl bg-neutral-100/70 p-1 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/50"
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
                title={`${option.label} - ${option.description}`}
                onClick={() => selectCursor(option.type)}
                className={`relative flex h-10 flex-col items-center justify-center rounded-lg text-sm transition-all duration-200 outline-none active:scale-95 ${
                  isSelected
                    ? "bg-white text-neutral-900 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:text-white dark:ring-white/10"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                <span className="text-base">{option.icon}</span>
                {isSelected && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. POPOVER VARIANT (Desktop Navbar Button & Menu)
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className={`group inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 active:scale-95 ${
          isOpen
            ? "border-emerald-500/40 bg-emerald-50/50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-300"
            : "border-neutral-200/80 bg-white/80 text-neutral-700 shadow-sm hover:border-neutral-300 hover:bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
        }`}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={`Cursor style: ${currentOption.label}`}
        title={`Cursor style: ${currentOption.label}`}
      >
        <span className="flex items-center text-sm transition-transform duration-200 group-hover:scale-110">
          {currentOption.icon}
        </span>
        <FiChevronDown
          className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-emerald-500" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Cursor options"
          className="absolute right-0 z-50 mt-2 flex w-48 flex-col gap-0.5 rounded-2xl border border-neutral-200/80 bg-white/95 p-1.5 shadow-xl shadow-black/5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 dark:border-neutral-800/80 dark:bg-neutral-900/95 dark:shadow-black/40"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
            Select Effect
          </div>

          {cursorOptions.map((option) => {
            const isSelected = cursor === option.type;
            return (
              <button
                key={option.type}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                aria-label={option.label}
                onClick={() => selectCursor(option.type)}
                className={`group flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all duration-150 outline-none active:scale-[0.98] ${
                  isSelected
                    ? "bg-emerald-50/80 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : "text-neutral-700 hover:bg-neutral-100/80 dark:text-neutral-300 dark:hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border text-base transition-colors ${
                      isSelected
                        ? "border-emerald-500/30 bg-white dark:bg-emerald-900/40"
                        : "border-neutral-200/60 bg-neutral-50 group-hover:bg-white dark:border-neutral-800 dark:bg-neutral-800/50 dark:group-hover:bg-neutral-800"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium leading-tight">
                      {option.label}
                    </span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                      {option.description}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <FiCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}