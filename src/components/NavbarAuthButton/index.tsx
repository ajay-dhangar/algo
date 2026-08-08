import React, { useState, useRef, useEffect } from "react";
import Link from "@docusaurus/Link";
import { useAuth } from "@site/src/contexts/AuthContext";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function NavbarAuthButton(): JSX.Element | null {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close profile dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Move focus into the dropdown when it opens so keyboard users don't
  // have to Tab from the trigger button through the whole page to reach it.
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isOpen]);

  // Prevent layout shifts during initial local storage check
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 margin-left--sm">
        <div className="h-8 w-20 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  // LOGGED OUT: Show requested primary Sign Up button (and secondary Login)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {/* <Link
          to="/login"
          className="button button--secondary button--sm"
        >
          Log In
        </Link> */}
        <Link
          to="/register"
          className="algo-signup algo-link button button--primary button--sm margin--sm"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // LOGGED IN: Render User Avatar / Profile Dropdown Button
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative inline-block text-left margin-left--sm" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 p-1 pr-2.5 text-xs font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-[10px] shadow-sm">
          {initials}
        </div>
        <span className="hidden sm:inline-block max-w-[90px] truncate">{user?.name}</span>
        <FiChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="User profile menu"
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-neutral-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/95"
        >
          <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 m-0 truncate">
              {user?.name}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 m-0 truncate">
              {user?.email}
            </p>
          </div>

          <Link
            to="/profile"
            ref={firstItemRef}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/60 no-underline"
          >
            <FiUser className="h-3.5 w-3.5 text-emerald-500" />
            <span>Profile Settings</span>
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 border-none bg-transparent cursor-pointer text-left"
          >
            <FiLogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}