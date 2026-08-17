/**
 * Unified Progress Store
 * ----------------------
 * Single source of truth replacing four independent progress silos:
 *   1. `algo_progress`              – topic completions, roadmap stages
 *   2. `quiz_attempts_*`            – per-user per-quiz score history
 *   3. `leetcode_solved`            – solved LeetCode-style problem IDs
 *   4. `dsa_learning_roadmap_completed` – legacy roadmap (already migrated)
 *
 * All data lives under one localStorage key (`algo.unified_progress.v1`)
 * and is kept in sync across tabs via BroadcastChannel + storage events.
 *
 * An append-only activity log powers profile stats, dashboard widgets,
 * streak calculations, and achievement unlocks.
 *
 * SSG-safe: every public function guards `typeof window` so the initial
 * server render always gets deterministic fallback values.
 */

import { supabase } from './supabaseClient';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Completion record for a single doc topic. */
export interface TopicCompletion {
  completed: boolean;
  title: string;
  updatedAt: string;
}

/** A single quiz attempt (score, timing, missed questions). */
export interface QuizAttemptRecord {
  score: number;
  totalQuestions?: number;
  timeSpent?: number;
  completedAt?: string;
  missedQuestionIds?: number[];
}

/** Supported activity event types. */
export type ActivityEventType =
  | 'doc_completed'
  | 'doc_uncompleted'
  | 'quiz_completed'
  | 'problem_solved'
  | 'problem_unsolved'
  | 'roadmap_step_completed';

/** A single entry in the append-only activity log. */
export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  timestamp: string;
  /** Flexible payload – consumers narrow by `type`. */
  data: Record<string, unknown>;
}

/** The canonical shape of all persisted progress data. */
export interface UnifiedProgress {
  /** Topic completions keyed by topicId. */
  topics: Record<string, TopicCompletion>;
  /** Quiz attempt history keyed by canonical quiz ID. */
  quizzes: Record<string, QuizAttemptRecord[]>;
  /** IDs of problems the user has solved. */
  solvedProblems: string[];
  /** Per-problem solve timestamps for heatmap rendering. */
  solvedDates: Record<string, string[]>;
  /** Completed DSA roadmap stage IDs. */
  roadmapStages: number[];
  /** Append-only activity log (newest last). */
  activityLog: ActivityEvent[];
  /** ISO timestamp of the most recent user action. */
  lastActiveAt: string;
  /** Cached streak count. */
  streak: number;
  /** Spaced repetition revision queue records. */
  revisionQueue?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Record of problemId to ISO-date-string array — one entry per solve event. */
export type SolvedDatesMap = Record<string, string[]>;

const STORAGE_KEY = 'algo.unified_progress.v1';
const CHANNEL_NAME = 'algo_progress_sync';
const MAX_ACTIVITY_LOG = 500;
const MAX_QUIZ_ATTEMPTS = 10;

// Legacy keys that will be migrated on first read.
const LEGACY_ALGO_PROGRESS = 'algo_progress';
const LEGACY_ROADMAP_KEY = 'dsa_learning_roadmap_completed';
const LEGACY_LEETCODE_SOLVED = 'leetcode_solved';
const LEGACY_SOLVED_KEY = 'algo.dsa.solved.v1';
const LEGACY_SOLVED_DATES_KEY = 'algo.dsa.solved.dates.v1';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns an empty progress object with sensible defaults. */
const emptyProgress = (): UnifiedProgress => ({
  topics: {},
  quizzes: {},
  solvedProblems: [],
  solvedDates: {},
  roadmapStages: [],
  activityLog: [],
  lastActiveAt: new Date().toISOString(),
  streak: 0,
  revisionQueue: {},
});

/** Generate a short unique ID for activity events. */
const generateEventId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/** Read a JSON value from localStorage, returning `fallback` on any error. */
const safeParse = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
    return fallback;
  }
};

/** Write a JSON value to localStorage. Silently ignores errors. */
const safeWrite = (key: string, value: unknown): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* storage full or unavailable */ }
};

/** Remove a key from localStorage. Silently ignores errors. */
const safeRemove = (key: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try { localStorage.removeItem(key); } catch { /* ignore */ }
};

// ---------------------------------------------------------------------------
// Migration – reads legacy silos and merges into unified shape (one-time)
// ---------------------------------------------------------------------------

/**
 * Migrates data from the four legacy silos into the unified schema.
 * Each legacy key is read, merged, then deleted so future reads are fast.
 * Broken into small helpers to keep cyclomatic complexity low.
 */

/** Migrates topic completions and roadmap stages from legacy `algo_progress`. */
const migrateAlgoProgress = (result: UnifiedProgress): void => {
  const legacyProgress = safeParse<Record<string, unknown>>(LEGACY_ALGO_PROGRESS, {});
  if (Object.keys(legacyProgress).length === 0) return;

  for (const [key, value] of Object.entries(legacyProgress)) {
    if (key === 'roadmapStagesCompleted' && Array.isArray(value)) {
      result.roadmapStages = Array.from(new Set([...result.roadmapStages, ...(value as number[])]))
        .filter((v): v is number => typeof v === 'number')
        .sort((a, b) => a - b);
    } else if (key === 'lastActiveAt' && typeof value === 'string') {
      if (!result.lastActiveAt || value > result.lastActiveAt) result.lastActiveAt = value;
    } else if (key.endsWith('_title') && typeof value === 'string') {
      const topicId = key.slice(0, -'_title'.length);
      const existing = result.topics[topicId] ?? { completed: false, title: '', updatedAt: '' };
      existing.title = value;
      result.topics[topicId] = existing;
    } else if (key.endsWith('_updatedAt') && typeof value === 'string') {
      const topicId = key.slice(0, -'_updatedAt'.length);
      const existing = result.topics[topicId] ?? { completed: false, title: '', updatedAt: '' };
      existing.updatedAt = value;
      result.topics[topicId] = existing;
    } else if (typeof value === 'boolean' && !key.endsWith('_title') && !key.endsWith('_updatedAt')) {
      const existing = result.topics[key] ?? { completed: false, title: '', updatedAt: '' };
      existing.completed = value;
      result.topics[key] = existing;
    }
  }
  safeRemove(LEGACY_ALGO_PROGRESS);
};

/** Migrates legacy roadmap stage list into the unified store. */
const migrateRoadmap = (result: UnifiedProgress): void => {
  const legacyRoadmap = safeParse<number[]>(LEGACY_ROADMAP_KEY, []);
  if (legacyRoadmap.length === 0) return;
  result.roadmapStages = Array.from(new Set([...result.roadmapStages, ...legacyRoadmap]))
    .filter((v): v is number => typeof v === 'number')
    .sort((a, b) => a - b);
  safeRemove(LEGACY_ROADMAP_KEY);
};

/** Migrates solved-problem IDs from legacy LeetCode and DSA silos. */
const migrateSolvedProblems = (result: UnifiedProgress): void => {
  const legacyLeetcode = safeParse<string[]>(LEGACY_LEETCODE_SOLVED, []);
  if (legacyLeetcode.length > 0) {
    result.solvedProblems = Array.from(new Set([...result.solvedProblems, ...legacyLeetcode]));
    safeRemove(LEGACY_LEETCODE_SOLVED);
  }

  const legacySolved = safeParse<string[]>(LEGACY_SOLVED_KEY, []);
  if (legacySolved.length > 0) {
    result.solvedProblems = Array.from(new Set([...result.solvedProblems, ...legacySolved]));
    safeRemove(LEGACY_SOLVED_KEY);
  }
};

/** Migrates per-problem solve-date maps from legacy storage. */
const migrateSolvedDates = (result: UnifiedProgress): void => {
  const legacySolvedDates = safeParse<Record<string, string[]>>(LEGACY_SOLVED_DATES_KEY, {});
  if (Object.keys(legacySolvedDates).length === 0) return;

  for (const [problemId, dates] of Object.entries(legacySolvedDates)) {
    const existing = result.solvedDates[problemId] ?? [];
    result.solvedDates[problemId] = Array.from(new Set([...existing, ...dates])).sort();
  }
  safeRemove(LEGACY_SOLVED_DATES_KEY);
};

/** Migrates quiz attempt records from legacy `quiz_attempts_*` keys. */
const migrateQuizAttempts = (result: UnifiedProgress): void => {
  const quizPrefix = 'quiz_attempts_';
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(quizPrefix)) continue;

    const rest = key.slice(quizPrefix.length);
    const lastUnderscore = rest.lastIndexOf('_');
    const quizId = lastUnderscore !== -1 ? rest.slice(lastUnderscore + 1) : rest;
    if (!quizId) continue;

    const attempts = safeParse<QuizAttemptRecord[]>(key, []);
    if (attempts.length > 0) {
      const existing = result.quizzes[quizId] ?? [];
      result.quizzes[quizId] = [...attempts, ...existing]
        .sort((a, b) => {
          const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
          const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
          return timeB - timeA;
        })
        .slice(0, MAX_QUIZ_ATTEMPTS);
    }
    keysToRemove.push(key);
  }
  keysToRemove.forEach((k) => safeRemove(k));
};

/** Orchestrates all legacy-to-unified data migrations in one pass. */
const migrateLegacyData = (progress: UnifiedProgress): UnifiedProgress => {
  if (typeof window === 'undefined' || !window.localStorage) return progress;

  const result = { ...progress };
  migrateAlgoProgress(result);
  migrateRoadmap(result);
  migrateSolvedProblems(result);
  migrateSolvedDates(result);
  migrateQuizAttempts(result);
  return result;
};

// ---------------------------------------------------------------------------
// BroadcastChannel cross-tab sync
// ---------------------------------------------------------------------------

let broadcastChannel: BroadcastChannel | null = null;

/** Lazily create or return the BroadcastChannel used for cross-tab sync. */
const getChannel = (): BroadcastChannel | null => {
  if (typeof window === 'undefined' || !window.BroadcastChannel) return null;
  if (!broadcastChannel) {
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    } catch { return null; }
  }
  return broadcastChannel;
};

/** Post a lightweight message so other tabs can refresh their cache. */
const notifyOtherTabs = (): void => {
  const channel = getChannel();
  if (channel) {
    try { channel.postMessage({ type: 'progress-updated' }); } catch { /* ignore */ }
  }
};

// ---------------------------------------------------------------------------
// Core write helpers – defined before readProgress / public APIs that call them
// ---------------------------------------------------------------------------

/** Append an activity event and trim the log to `MAX_ACTIVITY_LOG`. */
const logActivity = (
  progress: UnifiedProgress,
  event: Omit<ActivityEvent, 'id' | 'timestamp'>,
): void => {
  progress.activityLog.push({
    ...event,
    id: generateEventId(),
    timestamp: new Date().toISOString(),
  });
  if (progress.activityLog.length > MAX_ACTIVITY_LOG) {
    progress.activityLog = progress.activityLog.slice(-MAX_ACTIVITY_LOG);
  }
};

/** Upsert progress to Supabase if the user is authenticated. */
const syncToSupabase = (progress: UnifiedProgress): void => {
  if (typeof window === 'undefined') return;

  let userId: string | null = null;
  try {
    const sessionRaw = window.localStorage.getItem('algo.auth.session.v1');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.accountId) userId = session.accountId;
    }
  } catch { /* ignore */ }

  if (!userId) userId = window.localStorage.getItem('quiz_userId') || null;
  if (!userId) return;

  supabase.from('user_progress').upsert(
    { user_id: userId, progress_data: progress, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  ).then(({ error }) => {
    if (error) {
      console.error('[Algo] Failed to sync progress to Supabase:', error);
    }
  });
};

/** Persist the full progress object and notify listeners. */
export const writeProgress = (progress: UnifiedProgress): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  progress.lastActiveAt = new Date().toISOString();
  safeWrite(STORAGE_KEY, progress);
  notifyOtherTabs();

  window.dispatchEvent(new Event('progressUpdated'));
  window.dispatchEvent(new Event('storage'));

  syncToSupabase(progress);
};

// ---------------------------------------------------------------------------
// Core read
// ---------------------------------------------------------------------------

/** Read the full unified progress object from localStorage. */
export const readProgress = (): UnifiedProgress => {
  if (typeof window === 'undefined' || !window.localStorage) return emptyProgress();

  const progress = safeParse<UnifiedProgress>(STORAGE_KEY, emptyProgress());

  // Ensure shape validity (handles partial migrations / corrupt data)
  if (!progress.topics) progress.topics = {};
  if (!progress.quizzes) progress.quizzes = {};
  if (!Array.isArray(progress.solvedProblems)) progress.solvedProblems = [];
  if (!progress.solvedDates) progress.solvedDates = {};
  if (!Array.isArray(progress.roadmapStages)) progress.roadmapStages = [];
  if (!Array.isArray(progress.activityLog)) progress.activityLog = [];
  if (!progress.revisionQueue) progress.revisionQueue = {};

  // One-time migration from legacy silos
  const migrated = migrateLegacyData(progress);
  if (migrated !== progress) {
    writeProgress(migrated);
    return migrated;
  }

  return progress;
};

/**
 * Read-only access to the current progress snapshot (no migration side-effects).
 * Use this in render paths where you just need the data.
 */
export const getProgressSnapshot = (): UnifiedProgress => {
  if (typeof window === 'undefined' || !window.localStorage) return emptyProgress();
  return safeParse<UnifiedProgress>(STORAGE_KEY, emptyProgress());
};

// ---------------------------------------------------------------------------
// Topic completion
// ---------------------------------------------------------------------------

/** Mark a doc topic as completed or uncompleted. */
export const setTopicCompleted = (
  topicId: string,
  title: string,
  completed: boolean,
): void => {
  const progress = readProgress();
  progress.topics[topicId] = {
    completed,
    title,
    updatedAt: new Date().toISOString(),
  };

  logActivity(progress, {
    type: completed ? 'doc_completed' : 'doc_uncompleted',
    data: { topicId, title },
  });

  writeProgress(progress);
};

/** Check whether a doc topic is marked completed. */
export const isTopicCompleted = (topicId: string): boolean => {
  const progress = getProgressSnapshot();
  return Boolean(progress.topics[topicId]?.completed);
};

/** Return all completed topic IDs. */
export const getCompletedTopicIds = (): string[] =>
  Object.entries(getProgressSnapshot().topics)
    .filter(([, entry]) => entry.completed)
    .map(([id]) => id);

/** Return a map of topicId to title for all completed topics. */
export const getCompletedTopics = (): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [id, entry] of Object.entries(getProgressSnapshot().topics)) {
    if (entry.completed && entry.title) result[id] = entry.title;
  }
  return result;
};

// ---------------------------------------------------------------------------
// Quiz attempts
// ---------------------------------------------------------------------------

/** Store a quiz attempt. Keeps at most `MAX_QUIZ_ATTEMPTS` per quiz. */
export const saveQuizAttempt = (
  quizId: string,
  attempt: QuizAttemptRecord,
): void => {
  const progress = readProgress();
  const existing = progress.quizzes[quizId] ?? [];
  progress.quizzes[quizId] = [attempt, ...existing].slice(0, MAX_QUIZ_ATTEMPTS);

  logActivity(progress, {
    type: 'quiz_completed',
    data: {
      quizId,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      timeSpent: attempt.timeSpent,
    },
  });

  writeProgress(progress);
};

/** Return attempts for a specific quiz (newest first). */
export const getQuizAttempts = (quizId: string): QuizAttemptRecord[] =>
  getProgressSnapshot().quizzes[quizId] ?? [];

/** Return the best score percentage for a quiz (0–100). */
export const getQuizBestPercent = (
  quizId: string,
  totalQuestions: number,
): number => {
  const attempts = getQuizAttempts(quizId);
  if (attempts.length === 0) return 0;
  let best = 0;
  for (const attempt of attempts) {
    const total = (typeof attempt.totalQuestions === 'number' && attempt.totalQuestions > 0)
      ? attempt.totalQuestions
      : totalQuestions;
    if (total <= 0) continue;
    const pct = Math.min(100, Math.max(0, Math.round((attempt.score / total) * 100)));
    if (pct > best) best = pct;
  }
  return best;
};

/** Return all quiz IDs that have at least one attempt. */
export const getAttemptedQuizIds = (): string[] =>
  Object.keys(getProgressSnapshot().quizzes);

// ---------------------------------------------------------------------------
// Solved problems
// ---------------------------------------------------------------------------

/** Mark a problem as solved (or unsolved). */
export const setProblemSolved = (problemId: string, solved: boolean): void => {
  const progress = readProgress();
  const set = new Set(progress.solvedProblems);

  if (solved) {
    set.add(problemId);
    const dates = progress.solvedDates[problemId] ?? [];
    dates.push(new Date().toISOString());
    progress.solvedDates[problemId] = dates;
  } else {
    set.delete(problemId);
    const dates = progress.solvedDates[problemId] ?? [];
    if (dates.length > 0) {
      dates.pop();
      progress.solvedDates[problemId] = dates;
    }
  }

  progress.solvedProblems = Array.from(set);

  logActivity(progress, {
    type: solved ? 'problem_solved' : 'problem_unsolved',
    data: { problemId },
  });

  writeProgress(progress);
};

/** Return the set of solved problem IDs. */
export const getSolvedProblems = (): Set<string> =>
  new Set(getProgressSnapshot().solvedProblems);

/** Return the solve-date map (problemId to ISO date strings). */
export const getSolvedDates = (): Record<string, string[]> =>
  getProgressSnapshot().solvedDates;

// ---------------------------------------------------------------------------
// Roadmap stages
// ---------------------------------------------------------------------------

/** Return completed roadmap stage IDs (sorted ascending). */
export const getRoadmapStages = (): number[] =>
  readProgress().roadmapStages;

/** Set the full list of completed roadmap stage IDs. */
export const setRoadmapStages = (stageIds: number[]): void => {
  const progress = readProgress();
  const merged = Array.from(new Set(stageIds)).sort((a, b) => a - b);

  // Log newly added stages
  const prev = new Set(progress.roadmapStages);
  for (const id of merged) {
    if (!prev.has(id)) {
      logActivity(progress, {
        type: 'roadmap_step_completed',
        data: { stageId: id },
      });
    }
  }

  progress.roadmapStages = merged;
  writeProgress(progress);
};

/** Add a single roadmap stage (idempotent). */
export const completeRoadmapStage = (stageId: number): void => {
  const progress = readProgress();
  if (progress.roadmapStages.includes(stageId)) return;
  progress.roadmapStages.push(stageId);
  progress.roadmapStages.sort((a, b) => a - b);

  logActivity(progress, {
    type: 'roadmap_step_completed',
    data: { stageId },
  });

  writeProgress(progress);
};

// ---------------------------------------------------------------------------
// Activity log (public reads)
// ---------------------------------------------------------------------------

/** Return the most recent N activity events (newest first). */
export const getRecentActivity = (limit = 20): ActivityEvent[] => {
  const log = getProgressSnapshot().activityLog;
  return log.slice(-limit).reverse();
};

/** Return all activity events of a given type. */
export const getActivityByType = (type: ActivityEventType): ActivityEvent[] =>
  getProgressSnapshot().activityLog.filter((e) => e.type === type);

// ---------------------------------------------------------------------------
// Streak computation
// ---------------------------------------------------------------------------

/** Compute a consecutive-day streak from all activity timestamps. */
export const computeStreak = (): number => {
  const progress = getProgressSnapshot();
  const dates = new Set<string>();

  for (const entry of Object.values(progress.topics)) {
    if (entry.updatedAt) {
      dates.add(entry.updatedAt.slice(0, 10));
    }
  }

  for (const attempts of Object.values(progress.quizzes)) {
    for (const attempt of attempts) {
      if (attempt.completedAt) {
        dates.add(attempt.completedAt.slice(0, 10));
      }
    }
  }

  for (const timestamps of Object.values(progress.solvedDates)) {
    for (const ts of timestamps) {
      dates.add(ts.slice(0, 10));
    }
  }

  if (dates.size === 0) {
    return progress.lastActiveAt ? 1 : 0;
  }

  const sorted = Array.from(dates).sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prevMs = new Date(sorted[i - 1]).getTime();
    const currMs = new Date(sorted[i]).getTime();
    const diffDays = Math.round((prevMs - currMs) / 86_400_000);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

// ---------------------------------------------------------------------------
// Achievement snapshot (consolidates computeStreak + computeQuizStats)
// ---------------------------------------------------------------------------

/** Combined stats consumed by the achievements, profile, and dashboard pages. */
export interface AchievementSnapshot {
  completedCount: number;
  completedTopics: string[];
  completedTitles: string[];
  streak: number;
  lastActiveAt: string;
  quizzesPassed: number;
  quizzesMastered: number;
  totalQuizzesAttempted: number;
  totalSolvedProblems: number;
}

/** Compute the full achievement snapshot from unified progress. */
export const getAchievementSnapshot = (): AchievementSnapshot => {
  const progress = readProgress();

  const completedTopics = Object.entries(progress.topics)
    .filter(([, entry]) => entry.completed)
    .map(([id]) => id);

  const completedTitles = Object.values(progress.topics)
    .filter((entry) => entry.completed && entry.title.trim().length > 0)
    .map((entry) => entry.title.trim());

  const streak = computeStreak();
  const totalSolvedProblems = progress.solvedProblems.length;

  let passed = 0;
  let mastered = 0;
  let attempted = 0;
  for (const attempts of Object.values(progress.quizzes)) {
    if (attempts.length === 0) continue;
    attempted++;
    let bestPercent = 0;
    for (const attempt of attempts) {
      if (typeof attempt.score !== 'number') continue;
      const total = (typeof attempt.totalQuestions === 'number' && attempt.totalQuestions > 0)
        ? attempt.totalQuestions
        : 10;
      const pct = Math.min(100, Math.max(0, Math.round((attempt.score / total) * 100)));
      if (pct > bestPercent) bestPercent = pct;
    }
    if (bestPercent >= 70) passed++;
    if (bestPercent >= 90) mastered++;
  }

  return {
    completedCount: completedTopics.length,
    completedTopics,
    completedTitles,
    streak,
    lastActiveAt: progress.lastActiveAt,
    quizzesPassed: passed,
    quizzesMastered: mastered,
    totalQuizzesAttempted: attempted,
    totalSolvedProblems,
  };
};

// ---------------------------------------------------------------------------
// Cross-tab listener
// ---------------------------------------------------------------------------

/** Callback type for cross-tab update subscriptions. */
type UpdateCallback = () => void;

const listeners = new Set<UpdateCallback>();

/**
 * Subscribe to progress updates from any tab.
 * Returns an unsubscribe function.
 */
export const onProgressUpdate = (callback: UpdateCallback): (() => void) => {
  listeners.add(callback);

  /** Listener for storage events from other tabs. */
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  const channel = getChannel();
  /** Listener for BroadcastChannel messages from other tabs. */
  const onMessage = (): void => { callback(); };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  if (channel) {
    try { channel.addEventListener('message', onMessage); } catch { /* ignore */ }
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
    if (channel) {
      try { channel.removeEventListener('message', onMessage); } catch { /* ignore */ }
    }
  };
};

// ---------------------------------------------------------------------------
// Supabase pull
// ---------------------------------------------------------------------------

/** Pull progress from Supabase and merge into local storage. */
export const syncFromSupabase = async (): Promise<void> => {
  if (typeof window === 'undefined') return;

  let userId: string | null = null;
  try {
    const sessionRaw = window.localStorage.getItem('algo.auth.session.v1');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.accountId) userId = session.accountId;
    }
  } catch { /* ignore */ }

  if (!userId) userId = window.localStorage.getItem('quiz_userId') || null;
  if (!userId) return;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('progress_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('[Algo] Failed to sync progress from Supabase:', error);
      }
      return;
    }

    if (data?.progress_data) {
      const local = readProgress();
      const remote = data.progress_data as UnifiedProgress;

      for (const [topicId, remoteEntry] of Object.entries(remote.topics ?? {})) {
        const localEntry = local.topics[topicId];
        if (!localEntry || (remoteEntry.updatedAt > localEntry.updatedAt)) {
          local.topics[topicId] = remoteEntry;
        }
      }

      for (const [quizId, remoteAttempts] of Object.entries(remote.quizzes ?? {})) {
        const localAttempts = local.quizzes[quizId] ?? [];
        const merged = [...remoteAttempts, ...localAttempts]
          .sort((a, b) => {
            const timeA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
            const timeB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
            return timeB - timeA;
          })
          .slice(0, MAX_QUIZ_ATTEMPTS);
        local.quizzes[quizId] = merged;
      }

      local.solvedProblems = Array.from(
        new Set([...local.solvedProblems, ...(remote.solvedProblems ?? [])]),
      );

      local.roadmapStages = Array.from(
        new Set([...local.roadmapStages, ...(remote.roadmapStages ?? [])]),
      ).sort((a, b) => a - b);

      writeProgress(local);
    }
  } catch (err) {
    console.error('[Algo] Error syncing progress from Supabase:', err);
  }
};

// ---------------------------------------------------------------------------
// Revision Queue Storage Accessors
// ---------------------------------------------------------------------------

/** Get the revision queue map from the unified progress store. */
export const getRevisionQueueFromStore = <T = Record<string, unknown>>(): Record<string, T> => {
  const progress = getProgressSnapshot();
  return (progress.revisionQueue as Record<string, T>) ?? {};
};

/** Save the revision queue map into the unified progress store. */
export const saveRevisionQueueToStore = <T = Record<string, unknown>>(queue: Record<string, T>): void => {
  const progress = readProgress();
  progress.revisionQueue = queue as Record<string, unknown>;
  writeProgress(progress);
};

