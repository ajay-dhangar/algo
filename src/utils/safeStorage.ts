/**
 * Safe Storage Utilities (backed by unified progress store)
 * ---------------------------------------------------------
 * This module re-exports the public API that the rest of the codebase
 * depends on.  Internally every read/write delegates to the single
 * `UnifiedProgress` object managed by `progressStore.ts`, so there is
 * exactly one localStorage key and one source of truth.
 *
 * Legacy flat `algo_progress` accessors (`readAlgoProgress` /
 * `writeAlgoProgress`) are preserved for backward compatibility: they
 * convert between the flat schema and the structured topics map inside
 * the unified store.
 */

import {
  readProgress,
  writeProgress,
  getProgressSnapshot,
  setTopicCompleted,
  saveQuizAttempt as saveQuizAttemptUnified,
  getRoadmapStages,
  setRoadmapStages as setRoadmapStagesUnified,
  getAchievementSnapshot as getUnifiedAchievementSnapshot,
  syncFromSupabase,
  type QuizAttemptRecord,
  type ActivityEvent,
  type AchievementSnapshot,
} from './progressStore';

import { QUESTION_COUNTS } from '../data/quizzesConfig';

// ---------------------------------------------------------------------------
// Re-export types so existing consumers don't break
// ---------------------------------------------------------------------------
export type { QuizAttemptRecord, AchievementSnapshot, ActivityEvent };

export interface AlgoProgressData {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Safe localStorage helpers (unchanged API, unchanged behaviour)
// ---------------------------------------------------------------------------

export const getUserId = (): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const sessionRaw = window.localStorage.getItem('algo.auth.session.v1');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.accountId) return session.accountId;
    }
  } catch { /* ignore */ }
  return window.localStorage.getItem('quiz_userId') || null;
};

/** Pull latest progress from Supabase into local storage. */
export const syncAlgoProgress = async (): Promise<void> => {
  await syncFromSupabase();
};

/** Parse a JSON value from localStorage, returning `fallback` on any error. */
export const safeJsonParse = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    console.warn('[Algo] Corrupt localStorage key ' + key + ' — resetting to default.');
    try {
      localStorage.removeItem(key);
    } catch { /* ignore */ }
    return fallback;
  }
};

/** Read a raw string from localStorage, returning null on error. */
export const safeGetItem = (key: string): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error(`[Algo] Failed to get localStorage key "${key}":`, err);
    return null;
  }
};

/** Write a raw string to localStorage, silently ignoring errors. */
export const safeSetItem = (key: string, value: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(`[Algo] Failed to set localStorage key "${key}":`, err);
  }
};

/** Remove a key from localStorage, silently ignoring errors. */
export const safeRemoveItem = (key: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[Algo] Failed to remove localStorage key "${key}":`, err);
  }
};

// ---------------------------------------------------------------------------
// Flat algo_progress accessors (backward-compatible shim)
// ---------------------------------------------------------------------------

/**
 * Read the legacy flat `algo_progress` shape.
 * Internally the data lives in the unified store's `topics` map; this
 * function reconstructs the flat layout so callers don't need to change.
 */
export const readAlgoProgress = (): AlgoProgressData => {
  const progress = getProgressSnapshot();
  const flat: AlgoProgressData = {};

  for (const [topicId, entry] of Object.entries(progress.topics)) {
    flat[topicId] = entry.completed;
    if (entry.title) flat[`${topicId}_title`] = entry.title;
    if (entry.updatedAt) flat[`${topicId}_updatedAt`] = entry.updatedAt;
  }

  flat.lastActiveAt = progress.lastActiveAt;
  flat.roadmapStagesCompleted = progress.roadmapStages;

  return flat;
};

/**
 * Write a legacy flat `algo_progress` object.
 * Converts the flat keys back to the structured topics map and persists
 * via the unified store.
 */
export const writeAlgoProgress = (progress: AlgoProgressData): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const unified = readProgress();

  for (const [key, value] of Object.entries(progress)) {
    if (key === 'lastActiveAt' && typeof value === 'string') {
      unified.lastActiveAt = value;
    } else if (key === 'roadmapStagesCompleted' && Array.isArray(value)) {
      unified.roadmapStages = Array.from(new Set(value as number[]))
        .sort((a, b) => a - b);
    } else if (key.endsWith('_title') && typeof value === 'string') {
      const topicId = key.slice(0, -'_title'.length);
      const existing = unified.topics[topicId] ?? { completed: false, title: '', updatedAt: '' };
      existing.title = value;
      unified.topics[topicId] = existing;
    } else if (key.endsWith('_updatedAt') && typeof value === 'string') {
      const topicId = key.slice(0, -'_updatedAt'.length);
      const existing = unified.topics[topicId] ?? { completed: false, title: '', updatedAt: '' };
      existing.updatedAt = value;
      unified.topics[topicId] = existing;
    } else if (typeof value === 'boolean') {
      const existing = unified.topics[key] ?? { completed: false, title: '', updatedAt: '' };
      existing.completed = value;
      unified.topics[key] = existing;
    }
  }

  writeProgress(unified);
};

// ---------------------------------------------------------------------------
// Quiz ID aliasing & normalisation
// ---------------------------------------------------------------------------

const QUIZ_ID_ALIASES: Record<string, string> = {
  graph: 'graphs',
  'binary-tree': 'binary-trees',
  'binary-search-tree': 'bst',
  'linked-list': 'linked-lists',
  deque: 'deques',
  'priority-queue': 'priority-queues',
  'bplus-tree': 'bplus-trees',
  'b-tree': 'b-trees',
};

/** Map legacy quiz ID aliases to their canonical forms. */
export const normalizeQuizId = (quizId: string): string =>
  QUIZ_ID_ALIASES[quizId] ?? quizId;

/** Build the localStorage key used to store quiz attempts for a given user+quiz. */
export const getQuizAttemptStorageKey = (userId: string, quizId: string): string => {
  const uid = userId.toLowerCase();
  return `quiz_attempts_${uid}_${normalizeQuizId(quizId)}`;
};

// ---------------------------------------------------------------------------
// Challenge (doc topic) helpers
// ---------------------------------------------------------------------------

export const markChallengeSolved = (challengeId: string, title: string): void => {
  setTopicCompleted(challengeId, title, true);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('progressUpdated', {
        detail: { topicId: challengeId, completed: true, title },
      }),
    );
  }
};

// ---------------------------------------------------------------------------
// Roadmap stage accessors
// ---------------------------------------------------------------------------

export const ROADMAP_COMPLETED_KEY = 'roadmapStagesCompleted';
export const LEGACY_ROADMAP_STORAGE_KEY = 'dsa_learning_roadmap_completed';

export const getRoadmapCompletedStages = getRoadmapStages;

export const setRoadmapCompletedStages = setRoadmapStagesUnified;

// ---------------------------------------------------------------------------
// Last-visited tracking
// ---------------------------------------------------------------------------

export interface LastVisitedItem {
  id: string;
  title: string;
  url: string;
  visitedAt: string;
  type: 'doc' | 'quiz';
  readingTime?: string;
  isCompleted?: boolean;
}

/** Record the most recently visited doc or quiz page. */
export const recordLastVisited = (item: Omit<LastVisitedItem, 'visitedAt'> & { visitedAt?: string }): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  const fullItem: LastVisitedItem = {
    ...item,
    visitedAt: item.visitedAt || new Date().toISOString(),
  };
  localStorage.setItem('algo_last_visited', JSON.stringify(fullItem));
  window.dispatchEvent(new CustomEvent('lastVisitedUpdated', { detail: fullItem }));
};

/** Return the most recently visited doc or quiz page, considering both explicit records and progress data. */
export const getLastVisited = (): LastVisitedItem | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;

  const recorded = safeJsonParse<LastVisitedItem | null>('algo_last_visited', null);
  const progress = readProgress();

  let latestDocTopic: { id: string; title: string; updatedAt: string; url: string; isCompleted: boolean } | null = null;

  for (const [topicId, entry] of Object.entries(progress.topics)) {
    if (!entry.updatedAt) continue;
    if (!latestDocTopic || new Date(entry.updatedAt).getTime() > new Date(latestDocTopic.updatedAt).getTime()) {
      let url = `/docs/${topicId.replace(/-/g, '/')}`;
      if (topicId.includes('dsa-problems')) {
        url = `/docs/${topicId.replace(/^dsa-problems-/, 'dsa-problems/')}`;
      }
      latestDocTopic = { id: topicId, title: entry.title || topicId, updatedAt: entry.updatedAt, url, isCompleted: entry.completed };
    }
  }

  let latestQuiz: { id: string; title: string; updatedAt: string; url: string } | null = null;

  for (const [quizId, attempts] of Object.entries(progress.quizzes)) {
    for (const attempt of attempts) {
      if (!attempt.completedAt) continue;
      const attemptTime = new Date(attempt.completedAt).getTime();
      if (!Number.isNaN(attemptTime)) {
        if (!latestQuiz || attemptTime > new Date(latestQuiz.updatedAt).getTime()) {
          const formattedTitle = `Quiz on ${quizId.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
          latestQuiz = { id: quizId, title: formattedTitle, updatedAt: attempt.completedAt, url: `/quizzes/${quizId}` };
        }
      }
    }
  }

  const candidates: LastVisitedItem[] = [];

  if (recorded && recorded.title && recorded.url) {
    candidates.push(recorded);
  }
  if (latestDocTopic) {
    candidates.push({
      id: latestDocTopic.id,
      title: latestDocTopic.title,
      url: latestDocTopic.url,
      visitedAt: latestDocTopic.updatedAt,
      type: 'doc',
      readingTime: '4 min read',
      isCompleted: latestDocTopic.isCompleted,
    });
  }
  if (latestQuiz) {
    candidates.push({
      id: latestQuiz.id,
      title: latestQuiz.title,
      url: latestQuiz.url,
      visitedAt: latestQuiz.updatedAt,
      type: 'quiz',
      readingTime: '5 min quiz',
      isCompleted: true,
    });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());
  return candidates[0];
};

// ---------------------------------------------------------------------------
// Quiz attempt persistence
// ---------------------------------------------------------------------------

export const saveQuizAttemptLocal = (
  userId: string,
  quizId: string,
  attempt: QuizAttemptRecord,
): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const canonicalId = normalizeQuizId(quizId);
  saveQuizAttemptUnified(canonicalId, attempt);

  const quizTitle = canonicalId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  recordLastVisited({
    id: canonicalId,
    title: `Quiz on ${quizTitle}`,
    url: `/quizzes/${canonicalId}`,
    type: 'quiz',
    readingTime: '5 min quiz',
    isCompleted: true,
  });

  window.dispatchEvent(
    new CustomEvent('quizCompleted', {
      detail: { quizId: canonicalId, userId, score: attempt.score },
    }),
  );
};

// ---------------------------------------------------------------------------
// Quiz attempt ID extraction
// ---------------------------------------------------------------------------

const ALL_QUIZ_IDS = [
  'arrays', 'stacks', 'queues', 'linked-lists', 'deques', 'priority-queues',
  'linear-search', 'sorting', 'recursion', 'binary-trees', 'bst', 'graphs',
  'avl-trees', 'red-black-trees', 'b-trees', 'bplus-trees', 'isam',
  'hash-indexing', 'external-hashing',
];

/** Extract a canonical quiz ID from a localStorage attempts key. */
export const extractQuizIdFromStorageKey = (key: string): string | null => {
  if (!key || !key.startsWith('quiz_attempts_')) return null;
  const raw = key.slice('quiz_attempts_'.length).replace(/_+$/, '');
  if (!raw) return null;

  const knownCandidates = [
    ...ALL_QUIZ_IDS,
    ...Object.keys(QUIZ_ID_ALIASES),
    ...Object.values(QUIZ_ID_ALIASES),
  ];

  let bestMatch: string | null = null;
  for (const candidate of knownCandidates) {
    if (raw === candidate || raw.endsWith('_' + candidate)) {
      if (!bestMatch || candidate.length > bestMatch.length) {
        bestMatch = candidate;
      }
    }
  }

  if (bestMatch) return normalizeQuizId(bestMatch);

  const lastUnderscoreIndex = raw.lastIndexOf('_');
  const trailing = lastUnderscoreIndex !== -1 ? raw.slice(lastUnderscoreIndex + 1) : raw;
  return trailing ? normalizeQuizId(trailing) : null;
};

// ---------------------------------------------------------------------------
// Mock Exam Review Persistence (unchanged – unrelated to progress silos)
// ---------------------------------------------------------------------------

export interface MockExamReviewQuestion {
  uniqueId: string;
  topicId: string;
  topicTitle: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty?: string;
  codeSnippet?: string;
}

export interface MockExamTopicPerformance {
  topicId: string;
  topicTitle: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface MockExamReviewRecord {
  completedAt: string;
  totalScore: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  wasAutoSubmitted: boolean;
  questions: MockExamReviewQuestion[];
  userAnswers: string[];
  topicPerformance: MockExamTopicPerformance[];
}

const MOCK_EXAM_REVIEW_KEY = 'mock_exam_last_review';

/** Persist a mock exam review record to localStorage. */
export const saveMockExamReview = (record: MockExamReviewRecord): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(MOCK_EXAM_REVIEW_KEY, JSON.stringify(record));
  } catch (err) {
    console.warn('[Algo] Could not save mock exam review to localStorage:', err);
  }
};

/** Retrieve the most recent mock exam review record from localStorage. */
export const getLastMockExamReview = (): MockExamReviewRecord | null =>
  safeJsonParse<MockExamReviewRecord | null>(MOCK_EXAM_REVIEW_KEY, null);

/** Remove the stored mock exam review record. */
export const clearMockExamReview = (): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(MOCK_EXAM_REVIEW_KEY);
  } catch { /* ignore */ }
};

// ---------------------------------------------------------------------------
// Achievement snapshot (delegates to unified store)
// ---------------------------------------------------------------------------

export const getAchievementSnapshot = (_progress?: AlgoProgressData): AchievementSnapshot =>
  getUnifiedAchievementSnapshot();
