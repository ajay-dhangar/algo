import React, { useEffect, useState, useMemo } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaTrash,
  FaSearch,
  FaSort,
  FaExternalLinkAlt,
  FaBookOpen,
  FaBookmark,
  FaCompass,
  FaArrowRight,
} from "react-icons/fa";
import { safeJsonParse } from "../utils/safeStorage";

export interface FavoriteItem {
  id?: string;
  title?: string;
  path: string;
  addedAt?: string;
  category?: string;
}

export const STORAGE_KEY = "favorite-algorithms";
const LEGACY_STORAGE_KEY = "algo_bookmarks_v1";

function FavoritesContent() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");
  const [loaded, setLoaded] = useState(false);

  const loadFavorites = () => {
    if (typeof window === "undefined") return;
    try {
      const rawPrimary = localStorage.getItem(STORAGE_KEY);
      const rawLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      const raw = rawPrimary || rawLegacy || "[]";
      const parsed = JSON.parse(raw);

      const normalized: FavoriteItem[] = (Array.isArray(parsed) ? parsed : []).map((item, index) => {
        if (typeof item === "string") {
          return {
            path: item,
            title: item.replace(/^\//, "").replace(/-/g, " "),
            addedAt: new Date(Date.now() - index * 1000).toISOString(),
          };
        }
        return {
          path: item.path || "",
          title: item.title || item.path?.replace(/^\//, "").replace(/-/g, " ") || "Untitled Algorithm",
          addedAt: item.addedAt || new Date(Date.now() - index * 1000).toISOString(),
          category: item.category,
        };
      });

      setFavorites(normalized);
    } catch {
      setFavorites([]);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadFavorites();

    const handleUpdate = () => loadFavorites();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === LEGACY_STORAGE_KEY || !e.key) {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("bookmarksUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bookmarksUpdated", handleUpdate);
    };
  }, []);

  const handleRemove = (path: string) => {
    const updated = favorites.filter((f) => f.path !== path);
    setFavorites(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("bookmarksUpdated"));
    } catch (err) {
      console.warn("[Favorites] Failed to save updated favorites:", err);
    }
  };

  const handleClearAll = () => {
    if (!window.confirm("Are you sure you want to clear all favorite algorithms?")) return;
    setFavorites([]);
    try {
      localStorage.setItem(STORAGE_KEY, "[]");
      localStorage.setItem(LEGACY_STORAGE_KEY, "[]");
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("bookmarksUpdated"));
    } catch (err) {
      console.warn("[Favorites] Failed to clear favorites:", err);
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = favorites.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      if (!q) return true;
      const titleMatch = (item.title || "").toLowerCase().includes(q);
      const pathMatch = item.path.toLowerCase().includes(q);
      return titleMatch || pathMatch;
    });

    result.sort((a, b) => {
      if (sortBy === "newest") {
        const timeA = new Date(a.addedAt || 0).getTime();
        const timeB = new Date(b.addedAt || 0).getTime();
        return timeB - timeA;
      }
      if (sortBy === "oldest") {
        const timeA = new Date(a.addedAt || 0).getTime();
        const timeB = new Date(b.addedAt || 0).getTime();
        return timeA - timeB;
      }
      if (sortBy === "alphabetical") {
        const titleA = a.title || a.path;
        const titleB = b.title || b.path;
        return titleA.localeCompare(titleB);
      }
      return 0;
    });

    return result;
  }, [favorites, searchTerm, sortBy]);

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return "Recently added";
    try {
      const date = new Date(isoStr);
      if (isNaN(date.getTime())) return "Recently added";
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently added";
    }
  };

  if (!loaded) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin text-amber-500 text-3xl mb-4 inline-block">
          <FaStar />
        </div>
        <p className="text-slate-500 font-semibold">Loading your bookmarked algorithms...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold">
              <FaStar size={12} />
              Bookmark Management
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white m-0 flex items-center gap-3">
              Favorite Algorithms
            </h1>
            <p className="text-amber-100 text-sm max-w-xl m-0">
              Access your personal collection of bookmarked algorithms, data structures, and code visualizers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/20 backdrop-blur border border-white/30 text-center">
              <div className="text-2xl font-black font-mono text-white">
                {favorites.length}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100">
                Bookmarked
              </div>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-3 rounded-2xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold border border-rose-400/40 cursor-pointer transition-colors shadow-sm"
                title="Clear all bookmarked favorites"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Sort */}
      {favorites.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search favorites..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label htmlFor="sort-favorites" className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0">
              <FaSort size={12} />
              Sort by:
            </label>
            <select
              id="sort-favorites"
              aria-label="Sort favorites"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Date Added (Newest First)</option>
              <option value="oldest">Date Added (Oldest First)</option>
              <option value="alphabetical">Title (A - Z)</option>
            </select>
          </div>
        </div>
      )}

      {/* Grid / List of Favorites */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((item) => (
              <motion.div
                key={item.path}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={item.path}
                      className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 no-underline transition-colors leading-snug flex-1"
                    >
                      {item.title}
                    </Link>
                    <button
                      onClick={() => handleRemove(item.path)}
                      aria-label={`Remove ${item.title} from favorites`}
                      title="Remove bookmark"
                      className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800/30 cursor-pointer transition-colors shrink-0"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>

                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate">
                    {item.path}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Added {formatDate(item.addedAt)}
                  </span>

                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline no-underline"
                  >
                    Open Algorithm
                    <FaExternalLinkAlt size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : favorites.length > 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-slate-500 font-semibold m-0">
            No favorites match "{searchTerm}". Try clearing your search query!
          </p>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-amber-200 dark:border-amber-800/40">
            <FaBookmark />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 m-0">
              No Favorite Algorithms Bookmarked Yet
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
              Explore algorithms, data structures, and interactive visualizers. Click the bookmark icon on any page to save it to your personal favorites collection!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/visualization"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold no-underline transition-colors shadow-md text-xs"
            >
              <FaCompass size={12} />
              Explore Visualizers
            </Link>
            <Link
              to="/quizzes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold no-underline transition-colors text-xs"
            >
              <FaBookOpen size={12} />
              Concept Quizzes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Layout
      title="Favorite Algorithms — Personal Bookmark Manager | Algo"
      description="Manage your saved favorite algorithms, data structure topics, and interactive visualizer bookmarks."
    >
      <BrowserOnly fallback={<div className="p-8 text-center">Loading favorite algorithms...</div>}>
        {() => <FavoritesContent />}
      </BrowserOnly>
    </Layout>
  );
}