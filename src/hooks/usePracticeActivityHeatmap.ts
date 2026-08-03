import { useCallback, useEffect, useState } from "react";
import { getUserId, safeJsonParse } from "../utils/safeStorage";
import type { QuizAttemptRecord } from "../utils/safeStorage";

export interface PracticeActivityHeatmapDay {
  date: string;
  count: number;
  dayLabel: string;
}

export interface PracticeActivityHeatmapData {
  days: PracticeActivityHeatmapDay[];
  totalAttempts: number;
  activeDays: number;
  loaded: boolean;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function getDailyQuizCounts(userPrefix: string | null): Map<string, number> {
  const counts = new Map<string, number>();

  if (typeof window === "undefined" || !window.localStorage) {
    return counts;
  }

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith("quiz_attempts_")) continue;
    if (userPrefix && !key.startsWith(userPrefix)) continue;

    const attempts = safeJsonParse<QuizAttemptRecord[]>(key, []);
    if (!Array.isArray(attempts)) continue;

    for (const attempt of attempts) {
      if (!attempt.completedAt) continue;
      const date = new Date(attempt.completedAt);
      if (Number.isNaN(date.getTime())) continue;
      const day = toUtcDateString(date);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
  }

  return counts;
}

const INITIAL_STATE: PracticeActivityHeatmapData = {
  days: [],
  totalAttempts: 0,
  activeDays: 0,
  loaded: false,
};

export function usePracticeActivityHeatmap(windowDays = 28): PracticeActivityHeatmapData {
  const [state, setState] = useState<PracticeActivityHeatmapData>(INITIAL_STATE);

  const compute = useCallback(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }

    const userId = getUserId();
    const userPrefix = userId ? `quiz_attempts_${userId.toLowerCase()}_` : null;
    const dailyCounts = getDailyQuizCounts(userPrefix);
    const windowDates = buildWindowDates(windowDays);

    const days = windowDates.map((date) => ({
      date,
      count: dailyCounts.get(date) ?? 0,
      dayLabel: getWeekdayLabel(date),
    }));

    const totalAttempts = days.reduce((sum, day) => sum + day.count, 0);
    const activeDays = days.filter((day) => day.count > 0).length;

    setState({ days, totalAttempts, activeDays, loaded: true });
  }, [windowDays]);

  useEffect(() => {
    compute();
    window.addEventListener("quizCompleted", compute);
    window.addEventListener("storage", compute);
    return () => {
      window.removeEventListener("quizCompleted", compute);
      window.removeEventListener("storage", compute);
    };
  }, [compute]);

  return state;
}
