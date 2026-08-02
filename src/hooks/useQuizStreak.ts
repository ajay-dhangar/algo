/**
 * useQuizStreak
 * -------------
 * Derives a Duolingo-style daily-streak counter purely from the
 * quiz-attempt timestamps already stored in localStorage.
 *
 * localStorage key pattern (written by saveQuizAttemptLocal):
 *   quiz_attempts_<uid>_<quizId>  ->  JSON array of { score, completedAt, ... }
 *
 * Algorithm
 * ---------
 * 1. Resolve the current user ID via getUserId().
 *    - If a UID is found, only scan keys that start with
 *      "quiz_attempts_<uid>_" to avoid mixing in other users' attempts.
 *    - If no UID is available (unauthenticated / anonymous), fall back to
 *      scanning all "quiz_attempts_*" keys so the widget still works.
 * 2. Collect all `completedAt` ISO strings across every matching quiz key.
 * 3. Normalise each timestamp to a UTC calendar date (YYYY-MM-DD string).
 * 4. De-duplicate: only one activity "tick" per calendar day.
 * 5. Sort descending and walk consecutive days to count the current streak.
 * 6. Walk the entire sorted set to find the all-time longest streak.
 * 7. Build a "last 7 days" boolean array for the mini-heatmap.
 *
 * SSG-safe: localStorage is only touched inside a useEffect.
 */

import { useState, useEffect, useCallback } from "react";
import { safeJsonParse, getUserId } from "../utils/safeStorage";

// --- Types -------------------------------------------------------------------

export interface QuizStreakData {
  /** Consecutive calendar days (up to and including today) with >= 1 quiz attempt. */
  currentStreak: number;
  /** Longest consecutive-day run ever recorded. */
  longestStreak: number;
  /** Total distinct calendar days on which any quiz was attempted. */
  totalActiveDays: number;
  /** True if the user has already attempted a quiz today (UTC). */
  practicedToday: boolean;
  /**
   * Activity flags for the last 7 days, index 0 = 6 days ago, index 6 = today.
   * Used to render the mini week-heatmap.
   */
  last7Days: boolean[];
  /** Whether the hook has finished reading from localStorage. */
  loaded: boolean;
}

// --- Helpers -----------------------------------------------------------------

/** Returns "YYYY-MM-DD" in UTC for a given Date. */
function toUtcDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Returns the UTC date string for "today". */
function todayUtc(): string {
  return toUtcDateStr(new Date());
}

/** Returns "YYYY-MM-DD" for a day that is `offsetDays` before today (UTC). */
function offsetDayUtc(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return toUtcDateStr(d);
}

/**
 * Given a sorted (descending) array of unique date strings,
 * compute the current streak (consecutive days ending at/after today)
 * and the all-time longest streak.
 */
function computeStreaks(sortedDescDates: string[]): {
  currentStreak: number;
  longestStreak: number;
} {
  if (sortedDescDates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const today = todayUtc();
  const yesterday = offsetDayUtc(1);

  // -- Current streak --
  // Starts only if the most recent activity was today or yesterday.
  let currentStreak = 0;
  const mostRecent = sortedDescDates[0];
  if (mostRecent === today || mostRecent === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < sortedDescDates.length; i++) {
      const prev = sortedDescDates[i - 1];
      const curr = sortedDescDates[i];
      // Check that curr is exactly one day before prev
      const prevMs = new Date(prev).getTime();
      const currMs = new Date(curr).getTime();
      const diffDays = Math.round((prevMs - currMs) / 86_400_000);
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // -- Longest streak --
  let longestStreak = 0;
  let run = 1;
  for (let i = 1; i < sortedDescDates.length; i++) {
    const prev = sortedDescDates[i - 1];
    const curr = sortedDescDates[i];
    const diffDays = Math.round(
      (new Date(prev).getTime() - new Date(curr).getTime()) / 86_400_000
    );
    if (diffDays === 1) {
      run++;
    } else {
      longestStreak = Math.max(longestStreak, run);
      run = 1;
    }
  }
  longestStreak = Math.max(longestStreak, run);

  return { currentStreak, longestStreak };
}

// --- Hook --------------------------------------------------------------------

const INITIAL_STATE: QuizStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalActiveDays: 0,
  practicedToday: false,
  last7Days: [false, false, false, false, false, false, false],
  loaded: false,
};

export function useQuizStreak(): QuizStreakData {
  const [data, setData] = useState<QuizStreakData>(INITIAL_STATE);

  const compute = useCallback(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    // Resolve the current user's ID so we only read their own quiz keys.
    // getQuizAttemptStorageKey writes: quiz_attempts_<uid>_<quizId>
    // If no user is logged in, fall back to scanning all quiz_attempts_* keys.
    const userId = getUserId();
    const userPrefix = userId
      ? `quiz_attempts_${userId.toLowerCase()}_`
      : null;

    // 1. Gather every completedAt timestamp from the current user's keys only
    const activeDateSet = new Set<string>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("quiz_attempts_")) continue;

      // Skip keys that belong to a different user
      if (userPrefix && !key.startsWith(userPrefix)) continue;

      const attempts = safeJsonParse<Array<{ completedAt?: string }>>(key, []);
      if (!Array.isArray(attempts)) continue;

      for (const attempt of attempts) {
        if (!attempt.completedAt) continue;
        const d = new Date(attempt.completedAt);
        if (!Number.isNaN(d.getTime())) {
          activeDateSet.add(toUtcDateStr(d));
        }
      }
    }

    // 2. Sort descending
    const sortedDates = Array.from(activeDateSet).sort((a, b) =>
      b.localeCompare(a)
    );

    // 3. Compute streaks
    const { currentStreak, longestStreak } = computeStreaks(sortedDates);

    // 4. Today flag
    const practicedToday = activeDateSet.has(todayUtc());

    // 5. Last-7-days heatmap (index 0 = 6 days ago, index 6 = today)
    const last7Days: boolean[] = Array.from({ length: 7 }, (_, i) =>
      activeDateSet.has(offsetDayUtc(6 - i))
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
    // Re-compute whenever any quiz is completed or storage changes
    window.addEventListener("quizCompleted", compute);
    window.addEventListener("storage", compute);
    return () => {
      window.removeEventListener("quizCompleted", compute);
      window.removeEventListener("storage", compute);
    };
  }, [compute]);

  return data;
}
