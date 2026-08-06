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
 * Solve timestamps are persisted separately under "algo.dsa.solved.dates.v1"
 * as a Record<problemId, isoDateString[]>. This lets the practice activity
 * heatmap count solved problems as real activity without ever touching the
 * old bookmark storage key.
 *
 * SSG-safe: localStorage is only accessed inside useEffect / callbacks,
 * so the initial render always starts with an empty set and hydrates
 * silently after mount.
 */

import { useState, useEffect, useCallback } from 'react';

export const SOLVED_STORAGE_KEY = 'algo.dsa.solved.v1';
export const SOLVED_DATES_STORAGE_KEY = 'algo.dsa.solved.dates.v1';

/** Record<problemId, ISO-date-string[]> — one entry per solve event. */
export type SolvedDatesMap = Record<string, string[]>;

function readFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(SOLVED_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
  } catch {
    // Corrupt value — reset silently
    window.localStorage.removeItem(SOLVED_STORAGE_KEY);
  }
  return new Set();
}

function writeToStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Storage full or unavailable — ignore
  }
}

/**
 * Reads the solve-date map from localStorage.
 * Returns an empty object on any error.
 */
export function readSolvedDates(): SolvedDatesMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(SOLVED_DATES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as SolvedDatesMap;
    }
  } catch {
    window.localStorage.removeItem(SOLVED_DATES_STORAGE_KEY);
  }
  return {};
}

function writeSolvedDates(map: SolvedDatesMap): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SOLVED_DATES_STORAGE_KEY, JSON.stringify(map));
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
      const nowSolved = !next.has(id);

      if (nowSolved) {
        next.add(id);
        // Record the solve timestamp so the heatmap can count it as activity.
        const dates = readSolvedDates();
        dates[id] = [...(dates[id] ?? []), new Date().toISOString()];
        writeSolvedDates(dates);
        // Notify the heatmap (and any other listeners) that a solve occurred.
        window.dispatchEvent(
          new CustomEvent('problemSolved', { detail: { problemId: id } })
        );
      } else {
        next.delete(id);
        // Remove the most-recent solve entry on un-solve so the heatmap count
        // stays consistent, but keep earlier entries so history isn't lost.
        const dates = readSolvedDates();
        if (dates[id] && dates[id].length > 0) {
          dates[id] = dates[id].slice(0, -1);
          if (dates[id].length === 0) delete dates[id];
          writeSolvedDates(dates);
        }
        window.dispatchEvent(
          new CustomEvent('problemSolved', { detail: { problemId: id } })
        );
      }

      writeToStorage(next);
      return next;
    });
  }, []);

  const isSolved = useCallback((id: string) => solved.has(id), [solved]);

  return { solved, isSolved, toggleSolved };
}
