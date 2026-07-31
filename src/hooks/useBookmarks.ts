/**
 * useBookmarks
 * ------------
 * Persists bookmarked DSA-problem IDs to localStorage under
 * "algo.dsa.bookmarks.v1" (a JSON array of strings).
 *
 * SSG-safe: localStorage is only accessed inside useEffect / callbacks,
 * so the initial render always starts with an empty set and hydrates
 * silently after mount.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'algo.dsa.bookmarks.v1';

function readFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
  } catch {
    // Corrupt value — reset silently
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return new Set();
}

function writeToStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Storage full or unavailable — ignore
  }
}

export interface UseBookmarksReturn {
  /** The set of bookmarked problem IDs */
  bookmarks: Set<string>;
  /** Returns true if the given problem ID is bookmarked */
  isBookmarked: (id: string) => boolean;
  /** Toggles the bookmark state for the given problem ID */
  toggleBookmark: (id: string) => void;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Hydrate from localStorage after mount (SSG-safe)
  useEffect(() => {
    setBookmarks(readFromStorage());
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      writeToStorage(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.has(id), [bookmarks]);

  return { bookmarks, isBookmarked, toggleBookmark };
}
