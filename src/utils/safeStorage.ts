export interface AlgoProgressData {
  [key: string]: unknown;
}

import { supabase } from './supabaseClient';

export function getUserId(): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const sessionRaw = window.localStorage.getItem("algo.auth.session.v1");
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session && session.accountId) return session.accountId;
    }
  } catch {}
  return window.localStorage.getItem("quiz_userId") || null;
}

export async function syncAlgoProgress(): Promise<void> {
  const userId = getUserId();
  if (!userId) return;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error("[Algo] Failed to sync progress from Supabase:", error);
      }
      return;
    }

    if (data && data.progress_data) {
      const current = readAlgoProgress();
      const merged = { ...current, ...data.progress_data };
      window.localStorage.setItem('algo_progress', JSON.stringify(merged));
      window.dispatchEvent(new Event('progressUpdated'));
    }
  } catch (err) {
    console.error("[Algo] Error syncing progress from Supabase:", err);
  }
}

export interface AchievementSnapshot {
  completedCount: number;
  completedTopics: string[];
  completedTitles: string[];
  streak: number;
  lastActiveAt: string | null;
  /** Number of quizzes where best score >= 70% */
  quizzesPassed: number;
  /** Number of quizzes where best score >= 90% */
  quizzesMastered: number;
  /** Total quiz IDs found in localStorage */
  totalQuizzesAttempted: number;
}

export function safeJsonParse<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    console.warn("[Algo] Corrupt localStorage key " + key + " — resetting to default.");
    try {
      localStorage.removeItem(key);
    } catch {}
    return fallback;
  }
}

export function readAlgoProgress(): AlgoProgressData {
  return safeJsonParse<AlgoProgressData>('algo_progress', {});
}

export function writeAlgoProgress(progress: AlgoProgressData): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  window.localStorage.setItem('algo_progress', JSON.stringify(progress));

  const userId = getUserId();
  if (userId) {
    supabase.from('user_progress').upsert(
      { user_id: userId, progress_data: progress, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    ).then(({ error }) => {
      if (error) {
        console.error("[Algo] Failed to save progress to Supabase:", error);
      }
    });
  }
}

function computeStreak(progress: AlgoProgressData): number {
  if (typeof progress.streak === 'number' && Number.isFinite(progress.streak)) {
    return Math.max(0, progress.streak);
  }

  const activityDates = Object.entries(progress)
    .filter(([key, value]) => key.endsWith('_updatedAt') && typeof value === 'string')
    .map(([, value]) => new Date(String(value)))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())
    .map((date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      return normalized;
    });

  if (activityDates.length === 0) {
    const lastActiveAt = typeof progress.lastActiveAt === 'string' ? progress.lastActiveAt : null;
    if (!lastActiveAt) {
      return 0;
    }

    const parsed = new Date(lastActiveAt);
    return Number.isNaN(parsed.getTime()) ? 0 : 1;
  }

  let streak = 1;
  for (let index = 1; index < activityDates.length; index += 1) {
    const current = activityDates[index];
    const previous = activityDates[index - 1];
    const dayDiff = Math.round((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

/** All known quiz IDs — must stay in sync with QUIZZES_CONFIG in quizzes/index.tsx */
const ALL_QUIZ_IDS = [
  'arrays', 'stacks', 'queues', 'linked-lists', 'deques', 'priority-queues',
  'linear-search', 'sorting', 'recursion', 'binary-trees', 'bst', 'graphs',
  'avl-trees', 'red-black-trees', 'b-trees', 'bplus-trees', 'isam',
  'hash-indexing', 'external-hashing',
];

const QUIZ_QUESTION_COUNTS: Record<string, number> = {
  arrays: 10, stacks: 8, queues: 16, 'linked-lists': 12, deques: 12,
  'priority-queues': 12, 'linear-search': 12, sorting: 12, recursion: 12,
  'binary-trees': 12, bst: 10, graphs: 12, 'avl-trees': 8,
  'red-black-trees': 8, 'b-trees': 10, 'bplus-trees': 12, isam: 12,
  'hash-indexing': 12, 'external-hashing': 12,
};

interface QuizAttemptRecord {
  score: number;
  totalQuestions?: number;
  completedAt?: string;
}

function computeQuizStats(): { passed: number; mastered: number; attempted: number } {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { passed: 0, mastered: 0, attempted: 0 };
  }

  const uid =
    localStorage.getItem('quiz_userId') ||
    localStorage.getItem('quiz_username') ||
    null;

  let passed = 0;
  let mastered = 0;
  let attempted = 0;

  // Try both uid-based and username-based keys to cover all quiz pages
  const prefixes = uid ? [uid, uid.toLowerCase()] : [];

  // Also scan all localStorage keys that match the quiz_attempts_ pattern
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('quiz_attempts_')) continue;

    const attempts = safeJsonParse<QuizAttemptRecord[]>(key, []);
    if (!Array.isArray(attempts) || attempts.length === 0) continue;

    // Extract quiz id from key: quiz_attempts_<uid>_<quizId>
    const parts = key.replace('quiz_attempts_', '').split('_');
    const quizId = parts.slice(1).join('_') || parts[0];
    const total = QUIZ_QUESTION_COUNTS[quizId] ?? 10;

    const bestScore = Math.max(...attempts.map((a) => (typeof a.score === 'number' ? a.score : 0)));
    const bestPercent = Math.round((bestScore / total) * 100);

    attempted++;
    if (bestPercent >= 70) passed++;
    if (bestPercent >= 90) mastered++;
  }

  return { passed, mastered, attempted };
}

export function getAchievementSnapshot(progress: AlgoProgressData = readAlgoProgress()): AchievementSnapshot {
  const completedTopics = Object.entries(progress)
    .filter(([key, value]) => typeof value === 'boolean' && value === true && !key.endsWith('_title') && !key.endsWith('_updatedAt'))
    .map(([key]) => key);

  const completedTitles = Object.entries(progress)
    .filter(([key, value]) => key.endsWith('_title') && typeof value === 'string' && value.trim().length > 0)
    .map(([, value]) => String(value).trim());

  const streak = computeStreak(progress);
  const lastActiveAt = typeof progress.lastActiveAt === 'string' ? progress.lastActiveAt : null;

  const quizStats = computeQuizStats();

  return {
    completedCount: completedTopics.length,
    completedTopics,
    completedTitles,
    streak,
    lastActiveAt,
    quizzesPassed: quizStats.passed,
    quizzesMastered: quizStats.mastered,
    totalQuizzesAttempted: quizStats.attempted,
  };
}

