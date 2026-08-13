/**
 * useQuizStreak
 * -------------
 * Derives a Duolingo-style daily-streak counter from the unified
 * progress store's activity log and quiz timestamps.
 *
 * Replaces the legacy approach that scanned raw `quiz_attempts_*`
 * localStorage keys.  Now reads from `UnifiedProgress.quizzes` and
 * `UnifiedProgress.solvedDates` so quiz activity, doc completions,
 * and problem solves all count toward the same streak.
 *
 * SSG-safe: localStorage is only touched inside a useEffect.
 */

import { useState, useEffect, useCallback } from 'react';
import { readProgress, onProgressUpdate } from '../utils/progressStore';

// --- Types -------------------------------------------------------------------

export interface QuizStreakData {
  /** Consecutive calendar days (up to and including today) with >= 1 activity. */
  currentStreak: number;
  /** Longest consecutive-day run ever recorded. */
  longestStreak: number;
  /** Total distinct calendar days on which any activity occurred. */
  totalActiveDays: number;
  /** True if the user has already been active today (UTC). */
  practicedToday: boolean;
  /**
   * Activity flags for the last 7 days, index 0 = 6 days ago, index 6 = today.
   * Used to render the mini week-heatmap.
   */
  last7Days: boolean[];
  /** Whether the hook has finished reading from the store. */
  loaded: boolean;
}

// --- Helpers -----------------------------------------------------------------

/** Returns "YYYY-MM-DD" in UTC for a given Date. */
const toUtcDateStr = (date: Date): string =>
  date.toISOString().slice(0, 10);

/** Returns the UTC date string for "today". */
const todayUtc = (): string =>
  toUtcDateStr(new Date());

/** Returns "YYYY-MM-DD" for a day that is `offsetDays` before today (UTC). */
const offsetDayUtc = (offsetDays: number): string => {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - offsetDays);
  return toUtcDateStr(now);
};

/**
 * Given a sorted (descending) array of unique date strings,
 * compute the current streak (consecutive days ending at/after today)
 * and the all-time longest streak.
 */
const computeStreaks = (sortedDescDates: string[]): {
  currentStreak: number;
  longestStreak: number;
} => {
  if (sortedDescDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const today = todayUtc();
  const yesterday = offsetDayUtc(1);

  let currentStreak = 0;
  const mostRecent = sortedDescDates[0];
  if (mostRecent === today || mostRecent === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < sortedDescDates.length; i++) {
      const prevMs = new Date(sortedDescDates[i - 1]).getTime();
      const currMs = new Date(sortedDescDates[i]).getTime();
      const diffDays = Math.round((prevMs - currMs) / 86_400_000);
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  let longestStreak = 0;
  let run = 1;
  for (let i = 1; i < sortedDescDates.length; i++) {
    const prevMs = new Date(sortedDescDates[i - 1]).getTime();
    const currMs = new Date(sortedDescDates[i]).getTime();
    const diffDays = Math.round((prevMs - currMs) / 86_400_000);
    if (diffDays === 1) {
      run++;
    } else {
      longestStreak = Math.max(longestStreak, run);
      run = 1;
    }
  }
  longestStreak = Math.max(longestStreak, run);

  return { currentStreak, longestStreak };
};

// --- Hook --------------------------------------------------------------------

const INITIAL_STATE: QuizStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalActiveDays: 0,
  practicedToday: false,
  last7Days: [false, false, false, false, false, false, false],
  loaded: false,
};

/** Derives a Duolingo-style daily-streak counter from the unified progress store. */
export const useQuizStreak = (): QuizStreakData => {
  const [data, setData] = useState<QuizStreakData>(INITIAL_STATE);

  const compute = useCallback(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const progress = readProgress();
    const activeDateSet = new Set<string>();

    for (const attempts of Object.values(progress.quizzes)) {
      for (const attempt of attempts) {
        if (attempt.completedAt) {
          const parsedDate = new Date(attempt.completedAt);
          if (!Number.isNaN(parsedDate.getTime())) activeDateSet.add(toUtcDateStr(parsedDate));
        }
      }
    }

    for (const timestamps of Object.values(progress.solvedDates)) {
      for (const ts of timestamps) {
        const parsedDate = new Date(ts);
        if (!Number.isNaN(parsedDate.getTime())) activeDateSet.add(toUtcDateStr(parsedDate));
      }
    }

    for (const entry of Object.values(progress.topics)) {
      if (entry.updatedAt) {
        const parsedDate = new Date(entry.updatedAt);
        if (!Number.isNaN(parsedDate.getTime())) activeDateSet.add(toUtcDateStr(parsedDate));
      }
    }

    const sortedDates = Array.from(activeDateSet).sort((a, b) => b.localeCompare(a));
    const { currentStreak, longestStreak } = computeStreaks(sortedDates);
    const practicedToday = activeDateSet.has(todayUtc());

    const last7Days: boolean[] = Array.from({ length: 7 }, (_, i) =>
      activeDateSet.has(offsetDayUtc(6 - i)),
    );

    setData({
      currentStreak,
      longestStreak,
      totalActiveDays: sortedDates.length,
      practicedToday,
      last7Days,
      loaded: true,
    });
  }, []);

  useEffect(() => {
    compute();
    const unsub = onProgressUpdate(compute);
    window.addEventListener('quizCompleted', compute);
    window.addEventListener('problemSolved', compute);
    return () => {
      unsub();
      window.removeEventListener('quizCompleted', compute);
      window.removeEventListener('problemSolved', compute);
    };
  }, [compute]);

  return data;
};
