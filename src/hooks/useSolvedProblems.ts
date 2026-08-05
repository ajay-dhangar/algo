/**
 * useSolvedProblems
 * -----------------
 * Persists solved/completed DSA-problem IDs to localStorage under
 * "algo.dsa.solved.v1" (a JSON array of strings).
 *
 * Solving a problem is distinct from bookmarking it — a bookmark means
 * "save for later" while marking solved means "I have completed this problem".
 * This separation fixes the issue where track progress was incorrectly driven
 * by bookmark count instead of actual completion state.
 *
 * SSG-safe: localStorage is only accessed inside useEffect / callbacks,
 * so the initial render always starts with an empty set and hydrates
 * silently after mount.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'algo.dsa.solved.v1';

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

export interface UseSolvedProblemsReturn {
  /** The set of solved problem IDs */
  solved: Set<string>;
  /** Returns true if the given problem ID is marked solved */
  isSolved: (id: string) => boolean;
  /** Toggles the solved state for the given problem ID */
  toggleSolved: (id: string) => void;
}

export function useSolvedProblems(): UseSolvedProblemsReturn {
  const [solved, setSolved] = useState<Set<string>>(new Set());

  // Hydrate from localStorage after mount (SSG-safe)
  useEffect(() => {
    setSolved(readFromStorage());
  }, []);

  const toggleSolved = useCallback((id: string) => {
    setSolved((prev) => {
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

  const isSolved = useCallback((id: string) => solved.has(id), [solved]);

  return { solved, isSolved, toggleSolved };
}
