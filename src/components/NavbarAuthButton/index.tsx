import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { useAuth } from "@site/src/contexts/AuthContext";
import { FiUser, FiLogOut, FiChevronDown, FiLogIn, FiUserPlus } from "react-icons/fi";

interface NavbarAuthButtonProps {
  /** Injected by swizzled ComponentTypes.tsx for Docusaurus mobile drawer */
  isMobile?: boolean;
  className?: string;
}

export default function NavbarAuthButton({
  isMobile = false,
  className,
}: NavbarAuthButtonProps): JSX.Element | null {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMobile]);

  // Focus trap for accessibility when menu opens
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isOpen]);

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
  }, [logout]);

  // 1. LOADING SKELETON (Prevents Layout Shift)
  if (isLoading) {
    return (
      <div className={clsx("flex items-center gap-2", isMobile ? "w-full py-2" : "margin-left--sm", className)}>
        <div className="h-9 w-24 animate-pulse rounded-xl bg-neutral-200/60 dark:bg-neutral-800/60" />
      </div>
    );
  }

  // 2. UNAUTHENTICATED STATE (Sign In / Sign Up)
  if (!isAuthenticated) {
    if (isMobile) {
      return (
        <div className={clsx("flex w-full flex-col gap-2 py-2", className)}>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700 transition-all hover:bg-neutral-100 no-underline dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <FiLogIn className="text-emerald-500" />
            <span>Log In</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 hover:shadow-emerald-500/20 active:scale-[0.98] no-underline"
          >
            <FiUserPlus />
            <span>Sign Up</span>
          </Link>
        </div>
      );
    }

    return (
      <div className={clsx("flex items-center gap-2 margin-left--sm", className)}>
        <Link
          to="/login"
          className="rounded-xl px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white no-underline"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-500/20 active:scale-95 no-underline"
        >
          <span>Sign Up</span>
        </Link>
      </div>
    );
  }

  // Compute initials for User Avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // 3. AUTHENTICATED STATE - MOBILE DRAWER VIEW
  if (isMobile) {
    return (
      <div className={clsx("w-full py-2 border-t border-neutral-200/60 dark:border-neutral-800/60 mt-2", className)}>
        {/* User Info Header */}
        <div className="flex items-center gap-3 px-1 py-2 mb-2">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 font-bold text-white text-xs shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {user?.name}
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Action Options Grid */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-neutral-50/50 py-2.5 text-xs font-medium text-neutral-700 no-underline hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <FiUser className="text-emerald-500" />
            <span>Profile</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200/60 bg-red-50/50 py-2.5 text-xs font-medium text-red-600 cursor-pointer hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40"
          >
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. AUTHENTICATED STATE - DESKTOP POPOVER VIEW
  return (
    <div className={clsx("relative inline-block text-left margin-left--sm", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User profile menu"
        className={clsx(
          "group inline-flex items-center gap-2 rounded-full border p-1 pr-2.5 text-xs font-medium backdrop-blur-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 active:scale-95 cursor-pointer",
          isOpen
            ? "border-emerald-500/40 bg-emerald-50/50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-300"
            : "border-neutral-200/80 bg-white/80 text-neutral-700 shadow-sm hover:border-neutral-300 hover:bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
        )}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-[10px] font-bold text-white shadow-sm ring-2 ring-emerald-500/20 transition-transform group-hover:scale-105">
          {initials}
        </div>
        <span className="hidden sm:inline-block max-w-[100px] truncate font-semibold">
          {user?.name}
        </span>
        <FiChevronDown
          className={clsx(
            "h-3.5 w-3.5 text-neutral-400 transition-transform duration-200",
            isOpen && "rotate-180 text-emerald-500"
          )}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-label="User profile menu"
          className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-2xl border border-neutral-200/80 bg-white/95 p-1.5 shadow-xl shadow-black/5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 dark:border-neutral-800/80 dark:bg-neutral-900/95 dark:shadow-black/40"
        >
          {/* Header Card */}
          <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800/80 mb-1">
            <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 m-0 truncate">
              {user?.name}
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 m-0 truncate">
              {user?.email}
            </p>
          </div>

          {/* Menu Link: Profile */}
          <Link
            to="/profile"
            ref={firstItemRef}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-700 transition-all hover:bg-neutral-100/80 dark:text-neutral-300 dark:hover:bg-neutral-800/60 no-underline active:scale-[0.98]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <FiUser className="h-3.5 w-3.5" />
            </div>
            <span>Profile Settings</span>
          </Link>

          {/* Menu Button: Logout */}
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-50/80 dark:text-red-400 dark:hover:bg-red-950/40 border-none bg-transparent cursor-pointer text-left active:scale-[0.98]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <FiLogOut className="h-3.5 w-3.5" />
            </div>
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}