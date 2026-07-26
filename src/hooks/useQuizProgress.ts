/**
 * useQuizProgress
 * ---------------
 * Reads all quiz attempt history from localStorage and returns a
 * structured summary per quiz plus global stats.
 *
 * localStorage schema (written by each individual quiz page):
 *   quiz_userId          → string  (user's slug id)
 *   quiz_attempts_<uid>_<quizId> → JSON array of HistoryAttempt
 *
 * This hook is SSG-safe: it only reads localStorage inside useEffect.
 */

import { useState, useEffect, useCallback } from "react";
import { safeJsonParse } from "../utils/safeStorage";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizAttempt {
  id?: string;
  score: number;
  totalQuestions?: number;
  timeSpent: number;          // seconds
  completedAt: string;        // ISO string
}

export interface QuizStat {
  quizId: string;
  attempts: QuizAttempt[];
  bestScore: number;           // absolute correct answers
  bestPercent: number;         // 0–100
  latestScore: number;
  latestPercent: number;
  latestAttemptAt: string | null;
  totalAttempts: number;
  totalQuestions: number;
  averagePercent: number;
  status: "not-started" | "in-progress" | "passed" | "mastered";
}

export interface GlobalQuizStats {
  totalCompleted: number;      // quizzes attempted at least once
  totalMastered: number;       // quizzes with best score 100%
  totalPassed: number;         // quizzes with best score >= 70%
  totalQuizzes: number;        // all quizzes available
  overallAvgPercent: number;   // average best-percent across all attempted
  strongTopics: string[];      // quizIds with best >= 80%
  weakTopics: string[];        // quizIds with best < 60% and at least 1 attempt
}

// ─── Pass/mastery thresholds ──────────────────────────────────────────────────
const PASS_THRESHOLD    = 70;  // % to count as "passed"
const MASTERY_THRESHOLD = 90;  // % to count as "mastered"

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useQuizProgress(quizIds: string[], questionCounts: Record<string, number>) {
  const [stats, setStats] = useState<Record<string, QuizStat>>({});
  const [globalStats, setGlobalStats] = useState<GlobalQuizStats>({
    totalCompleted: 0,
    totalMastered: 0,
    totalPassed: 0,
    totalQuizzes: quizIds.length,
    overallAvgPercent: 0,
    strongTopics: [],
    weakTopics: [],
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    if (typeof window === "undefined") return;

    const uid = localStorage.getItem("quiz_userId");
    setUserId(uid);

    if (!uid) {
      // No user logged into quizzes yet — all "not-started"
      const empty: Record<string, QuizStat> = {};
      quizIds.forEach(id => {
        empty[id] = {
          quizId: id,
          attempts: [],
          bestScore: 0,
          bestPercent: 0,
          latestScore: 0,
          latestPercent: 0,
          latestAttemptAt: null,
          totalAttempts: 0,
          totalQuestions: questionCounts[id] ?? 10,
          averagePercent: 0,
          status: "not-started",
        };
      });
      setStats(empty);
      setGlobalStats({
        totalCompleted: 0, totalMastered: 0, totalPassed: 0,
        totalQuizzes: quizIds.length, overallAvgPercent: 0,
        strongTopics: [], weakTopics: [],
      });
      setLoaded(true);
      return;
    }

    const computed: Record<string, QuizStat> = {};
    let totalCompleted = 0, totalMastered = 0, totalPassed = 0;
    let sumBestPercent = 0;
    const strongTopics: string[] = [];
    const weakTopics: string[] = [];

    quizIds.forEach(quizId => {
      const key = `quiz_attempts_${uid}_${quizId}`;
      const attempts = safeJsonParse<QuizAttempt[]>(key, []);
      const total = questionCounts[quizId] ?? 10;

      if (attempts.length === 0) {
        computed[quizId] = {
          quizId, attempts: [], bestScore: 0, bestPercent: 0,
          latestScore: 0, latestPercent: 0, latestAttemptAt: null,
          totalAttempts: 0, totalQuestions: total, averagePercent: 0,
          status: "not-started",
        };
        return;
      }

      // Sort by completedAt descending
      const sorted = [...attempts].sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );

      const bestScore   = Math.max(...attempts.map(a => a.score));
      const bestPercent = Math.round((bestScore / total) * 100);
      const latest      = sorted[0];
      const latestPercent = Math.round((latest.score / total) * 100);
      const avgPercent  = Math.round(
        attempts.reduce((sum, a) => sum + (a.score / total) * 100, 0) / attempts.length
      );

      const status: QuizStat["status"] =
        bestPercent >= MASTERY_THRESHOLD ? "mastered"
        : bestPercent >= PASS_THRESHOLD   ? "passed"
        : "in-progress";

      computed[quizId] = {
        quizId, attempts: sorted, bestScore, bestPercent,
        latestScore: latest.score, latestPercent,
        latestAttemptAt: latest.completedAt,
        totalAttempts: attempts.length,
        totalQuestions: total, averagePercent: avgPercent, status,
      };

      totalCompleted++;
      sumBestPercent += bestPercent;
      if (bestPercent >= MASTERY_THRESHOLD) { totalMastered++; strongTopics.push(quizId); }
      else if (bestPercent >= 80)           { strongTopics.push(quizId); }
      if (bestPercent >= PASS_THRESHOLD)    totalPassed++;
      if (bestPercent < 60)                 weakTopics.push(quizId);
    });

    setStats(computed);
    setGlobalStats({
      totalCompleted, totalMastered, totalPassed,
      totalQuizzes: quizIds.length,
      overallAvgPercent: totalCompleted > 0
        ? Math.round(sumBestPercent / totalCompleted)
        : 0,
      strongTopics, weakTopics,
    });
    setLoaded(true);
  }, [quizIds, questionCounts]);

  useEffect(() => {
    refresh();
    // Re-read if another tab updates localStorage
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    window.addEventListener("quizCompleted", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("quizCompleted", handler);
    };
  }, [refresh]);

  return { stats, globalStats, userId, loaded, refresh };
}
