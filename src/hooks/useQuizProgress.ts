/**
 * useQuizProgress
 * ---------------
 * Reads quiz attempt history from the unified progress store and
 * returns a structured summary per quiz plus global stats.
 *
 * Replaces the legacy approach that scanned raw `quiz_attempts_*`
 * localStorage keys.  Now reads from `UnifiedProgress.quizzes`.
 *
 * SSG-safe: the store is only accessed inside useEffect.
 */

import { useState, useEffect, useCallback } from 'react';
import { readProgress, onProgressUpdate } from '../utils/progressStore';
import type { QuizAttemptRecord } from '../utils/progressStore';
import { normalizeQuizId } from '../utils/safeStorage';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizAttempt {
  id?: string;
  score: number;
  totalQuestions?: number;
  timeSpent: number;
  completedAt: string;
}

export interface QuizStat {
  quizId: string;
  attempts: QuizAttempt[];
  bestScore: number;
  bestPercent: number;
  latestScore: number;
  latestPercent: number;
  latestAttemptAt: string | null;
  totalAttempts: number;
  totalQuestions: number;
  averagePercent: number;
  status: 'not-started' | 'in-progress' | 'passed' | 'mastered';
}

export interface GlobalQuizStats {
  totalCompleted: number;
  totalMastered: number;
  totalPassed: number;
  totalQuizzes: number;
  overallAvgPercent: number;
  strongTopics: string[];
  weakTopics: string[];
}

// ─── Pass/mastery thresholds ──────────────────────────────────────────────────
const PASS_THRESHOLD = 70;
const MASTERY_THRESHOLD = 90;

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useQuizProgress = (quizIds: string[], questionCounts: Record<string, number>) => {
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
    if (typeof window === 'undefined') return;

    const uid = localStorage.getItem('quiz_userId');
    setUserId(uid);

    if (!uid) {
      const empty: Record<string, QuizStat> = {};
      quizIds.forEach((id) => {
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
          status: 'not-started',
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

    const progress = readProgress();
    const computed: Record<string, QuizStat> = {};
    let totalCompleted = 0;
    let totalMastered = 0;
    let totalPassed = 0;
    let sumBestPercent = 0;
    const strongTopics: string[] = [];
    const weakTopics: string[] = [];

    quizIds.forEach((quizId) => {
      const canonicalId = normalizeQuizId(quizId);
      const attempts: QuizAttemptRecord[] = progress.quizzes[canonicalId] ?? [];
      const total = questionCounts[quizId] ?? 10;

      if (attempts.length === 0) {
        computed[quizId] = {
          quizId, attempts: [], bestScore: 0, bestPercent: 0,
          latestScore: 0, latestPercent: 0, latestAttemptAt: null,
          totalAttempts: 0, totalQuestions: total, averagePercent: 0,
          status: 'not-started',
        };
        return;
      }

      const sorted = [...attempts].sort(
        (a, b) => {
          const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
          const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
          return timeB - timeA;
        },
      );

      const getAttemptTotal = (a: QuizAttemptRecord) =>
        typeof a.totalQuestions === 'number' && a.totalQuestions > 0 ? a.totalQuestions : total;
      const calcPercent = (score: number, t: number) =>
        Math.min(100, Math.max(0, Math.round((score / t) * 100)));

      let maxPercent = 0;
      attempts.forEach((a) => {
        const pct = calcPercent(a.score, getAttemptTotal(a));
        if (pct > maxPercent) maxPercent = pct;
      });

      const bestScore = Math.max(...attempts.map((a) => a.score));
      const bestPercent = maxPercent;
      const latest = sorted[0];
      const latestPercent = calcPercent(latest.score, getAttemptTotal(latest));
      const avgPercent = Math.round(
        attempts.reduce((sum, a) => sum + calcPercent(a.score, getAttemptTotal(a)), 0) / attempts.length,
      );

      const status: QuizStat['status'] =
        bestPercent >= MASTERY_THRESHOLD ? 'mastered'
        : bestPercent >= PASS_THRESHOLD ? 'passed'
        : 'in-progress';

      computed[quizId] = {
        quizId,
        attempts: sorted as QuizAttempt[],
        bestScore, bestPercent,
        latestScore: latest.score, latestPercent,
        latestAttemptAt: latest.completedAt ?? null,
        totalAttempts: attempts.length,
        totalQuestions: total, averagePercent: avgPercent, status,
      };

      totalCompleted++;
      sumBestPercent += bestPercent;
      if (bestPercent >= MASTERY_THRESHOLD) { totalMastered++; strongTopics.push(quizId); }
      else if (bestPercent >= 80) { strongTopics.push(quizId); }
      if (bestPercent >= PASS_THRESHOLD) totalPassed++;
      if (bestPercent < 60) weakTopics.push(quizId);
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
    const unsub = onProgressUpdate(refresh);
    window.addEventListener('quizCompleted', refresh);
    return () => {
      unsub();
      window.removeEventListener('quizCompleted', refresh);
    };
  }, [refresh]);

  return { stats, globalStats, userId, loaded, refresh };
};
