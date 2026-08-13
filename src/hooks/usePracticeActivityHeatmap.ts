/**
 * usePracticeActivityHeatmap
 * --------------------------
 * Builds a 28-day activity heatmap from the unified progress store.
 *
 * Replaces the legacy approach that scanned raw `quiz_attempts_*`
 * localStorage keys and `algo.dsa.solved.dates.v1`.  Now reads from
 * `UnifiedProgress.quizzes` and `UnifiedProgress.solvedDates` so all
 * activity sources are counted from a single source of truth.
 *
 * SSG-safe: the store is only accessed inside useEffect.
 */

import { useCallback, useEffect, useState } from 'react';
import { readProgress, onProgressUpdate } from '../utils/progressStore';

export interface PracticeActivityHeatmapDay {
  date: string;
  count: number;
  dayLabel: string;
  quizCount: number;
  solvedCount: number;
}

export interface PracticeActivityHeatmapData {
  days: PracticeActivityHeatmapDay[];
  totalAttempts: number;
  totalSolved: number;
  activeDays: number;
  loaded: boolean;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toUtcDateString(date: Date): string {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

function parseUtcDateString(utcDate: string): Date {
  return new Date(`${utcDate}T00:00:00.000Z`);
}

function getWeekdayLabel(utcDate: string): string {
  return DAY_LABELS[parseUtcDateString(utcDate).getUTCDay()];
}

function buildWindowDates(days: number): string[] {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - (days - 1 - index));
    return toUtcDateString(date);
  });
}

const INITIAL_STATE: PracticeActivityHeatmapData = {
  days: [],
  totalAttempts: 0,
  totalSolved: 0,
  activeDays: 0,
  loaded: false,
};

/** Builds a 28-day activity heatmap from the unified progress store. */
export const usePracticeActivityHeatmap = (windowDays = 28): PracticeActivityHeatmapData => {
  const [state, setState] = useState<PracticeActivityHeatmapData>(INITIAL_STATE);

  const compute = useCallback(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const progress = readProgress();

    // Count quiz activity per day
    const quizCounts = new Map<string, number>();
    for (const attempts of Object.values(progress.quizzes)) {
      for (const attempt of attempts) {
        if (!attempt.completedAt) continue;
        const date = new Date(attempt.completedAt);
        if (Number.isNaN(date.getTime())) continue;
        const day = toUtcDateString(date);
        quizCounts.set(day, (quizCounts.get(day) ?? 0) + 1);
      }
    }

    // Count solved-problem activity per day
    const solvedCounts = new Map<string, number>();
    for (const timestamps of Object.values(progress.solvedDates)) {
      for (const ts of timestamps) {
        const date = new Date(ts);
        if (Number.isNaN(date.getTime())) continue;
        const day = toUtcDateString(date);
        solvedCounts.set(day, (solvedCounts.get(day) ?? 0) + 1);
      }
    }

    const windowDates = buildWindowDates(windowDays);

    const days = windowDates.map((date) => {
      const quizCount = quizCounts.get(date) ?? 0;
      const solvedCount = solvedCounts.get(date) ?? 0;
      return {
        date,
        count: quizCount + solvedCount,
        quizCount,
        solvedCount,
        dayLabel: getWeekdayLabel(date),
      };
    });

    const totalAttempts = days.reduce((sum, day) => sum + day.quizCount, 0);
    const totalSolved = days.reduce((sum, day) => sum + day.solvedCount, 0);
    const activeDays = days.filter((day) => day.count > 0).length;

    setState({ days, totalAttempts, totalSolved, activeDays, loaded: true });
  }, [windowDays]);

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

  return state;
};
