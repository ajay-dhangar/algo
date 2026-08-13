/**
 * useSolvedProblems
 * -----------------
 * Thin hook over the unified progress store.  Problem IDs and their
 * solve timestamps are persisted in `UnifiedProgress.solvedProblems`
 * and `UnifiedProgress.solvedDates` respectively, replacing the legacy
 * `algo.dsa.solved.v1` and `algo.dsa.solved.dates.v1` localStorage keys.
 *
 * SSG-safe: the hook initialises with an empty set and hydrates after mount.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getSolvedProblems,
  setProblemSolved,
  getSolvedDates,
  onProgressUpdate,
} from '../utils/progressStore';
import type { SolvedDatesMap } from '../utils/progressStore';

export const SOLVED_STORAGE_KEY = 'algo.dsa.solved.v1';
export const SOLVED_DATES_STORAGE_KEY = 'algo.dsa.solved.dates.v1';

export type { SolvedDatesMap };

/**
 * Read-only accessor for the solve-date map.
 * Kept for backward compatibility with `usePracticeActivityHeatmap`.
 */
export const readSolvedDates = (): SolvedDatesMap =>
  getSolvedDates();

export interface UseSolvedProblemsReturn {
  /** The set of solved problem IDs. */
  solved: Set<string>;
  /** Returns true if the given problem ID is marked solved. */
  isSolved: (id: string) => boolean;
  /** Toggles the solved state for the given problem ID. */
  toggleSolved: (id: string) => void;
}

/** Thin hook over the unified progress store for solved-problem state. */
export const useSolvedProblems = (): UseSolvedProblemsReturn => {
  const [solved, setSolved] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSolved(getSolvedProblems());
    const unsub = onProgressUpdate(() => setSolved(getSolvedProblems()));
    return unsub;
  }, []);

  const toggleSolved = useCallback((id: string) => {
    const isNowSolved = !solved.has(id);
    setProblemSolved(id, isNowSolved);
    setSolved((prev) => {
      const next = new Set(prev);
      isNowSolved ? next.add(id) : next.delete(id);
      return next;
    });
  }, [solved]);

  const isSolved = useCallback((id: string) => solved.has(id), [solved]);

  return { solved, isSolved, toggleSolved };
};
