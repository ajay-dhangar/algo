import { safeJsonParse, readRevisionQueue, writeRevisionQueue } from "./safeStorage";
import { getAllMockExamQuestions, type MockExamQuestion } from "./mockExamData";
import { rankWeakTopics } from "./weakTopics";
import type { QuizStat } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG } from "../data/quizzesConfig";

export type RecallDifficulty = "Again" | "Hard" | "Good" | "Easy";

export interface SpacedRepetitionItem {
  uniqueId: string; // e.g. "arrays_1"
  topicId: string;  // e.g. "arrays"
  questionId: number;
  nextReviewDate: string; // ISO date string
  intervalDays: number;
  interval?: number; // Alias for intervalDays
  easeFactor: number;
  repetitions: number;
  lastReviewedAt?: string;
  missedCount: number;
  lastQuality?: number;
  difficultyRating?: RecallDifficulty;
}

export const STORAGE_PREFIX = "quiz_spaced_repetition";

export function getSpacedRepetitionStorageKey(userId?: string | null): string {
  if (userId) {
    return `${STORAGE_PREFIX}_${userId}`;
  }
  return `${STORAGE_PREFIX}_default`;
}

/**
 * Reads the spaced repetition queue for a given user from localStorage / unified store.
 */
export function getSpacedRepetitionQueue(userId?: string | null): Record<string, SpacedRepetitionItem> {
  if (typeof window === "undefined") return {};
  
  // Try reading from unified progress store first
  const storeQueue = readRevisionQueue<SpacedRepetitionItem>();
  if (storeQueue && Object.keys(storeQueue).length > 0) {
    return storeQueue;
  }

  // Fallback to legacy key
  const key = getSpacedRepetitionStorageKey(userId);
  const legacyQueue = safeJsonParse<Record<string, SpacedRepetitionItem>>(key, {});
  if (Object.keys(legacyQueue).length > 0) {
    writeRevisionQueue(legacyQueue);
  }
  return legacyQueue;
}

/**
 * Saves the spaced repetition queue to localStorage and unified store.
 */
export function saveSpacedRepetitionQueue(
  queue: Record<string, SpacedRepetitionItem>,
  userId?: string | null
): void {
  if (typeof window === "undefined") return;
  
  // Ensure interval property is mirrored for consumers expecting either interval or intervalDays
  Object.values(queue).forEach((item) => {
    if (item.intervalDays !== undefined) {
      item.interval = item.intervalDays;
    } else if (item.interval !== undefined) {
      item.intervalDays = item.interval;
    }
  });

  writeRevisionQueue(queue);
  const key = getSpacedRepetitionStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(queue));
  } catch (err) {
    console.warn("[SpacedRepetition] Failed to save queue to localStorage:", err);
  }

  window.dispatchEvent(new CustomEvent("spacedRepetitionUpdated", { detail: queue }));
}

/**
 * Converts a boolean, number (0-5), or string rating ('Again', 'Hard', 'Good', 'Easy') to SM-2 quality score (0-5).
 */
export function convertRatingToQuality(rating: boolean | number | RecallDifficulty): number {
  if (typeof rating === "boolean") {
    return rating ? 4 : 1;
  }
  if (typeof rating === "number") {
    return Math.min(5, Math.max(0, Math.round(rating)));
  }
  switch (rating) {
    case "Again":
      return 1;
    case "Hard":
      return 3;
    case "Good":
      return 4;
    case "Easy":
      return 5;
    default:
      return 4;
  }
}

/**
 * Maps SM-2 quality score to human-readable recall difficulty rating label.
 */
export function convertQualityToDifficulty(quality: number): RecallDifficulty {
  if (quality < 3) return "Again";
  if (quality === 3) return "Hard";
  if (quality === 4) return "Good";
  return "Easy";
}

/**
 * Calculates the next review date, interval, and ease factor using SuperMemo SM-2 specification.
 */
export function calculateNextReview(
  item: Partial<SpacedRepetitionItem>,
  rating: boolean | number | RecallDifficulty,
  now: Date = new Date()
): {
  intervalDays: number;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
  lastQuality: number;
  difficultyRating: RecallDifficulty;
} {
  const quality = convertRatingToQuality(rating);
  let easeFactor = item.easeFactor ?? 2.5;
  let repetitions = item.repetitions ?? 0;
  let intervalDays = item.intervalDays ?? item.interval ?? 1;

  // SuperMemo SM-2 Ease Factor calculation formula:
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }
  easeFactor = Math.round(easeFactor * 100) / 100;

  if (quality < 3) {
    // Incorrect or "Again" -> Reset repetitions and schedule for 1 day
    repetitions = 0;
    intervalDays = 1;
  } else {
    // Successful recall -> Increment repetitions and scale interval
    repetitions += 1;
    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = quality === 5 ? 4 : 3;
    } else {
      intervalDays = Math.max(intervalDays + 1, Math.round(intervalDays * easeFactor));
    }
  }

  const nextReviewMs = now.getTime() + intervalDays * 24 * 60 * 60 * 1000;
  const nextReviewDate = new Date(nextReviewMs).toISOString();
  const difficultyRating = convertQualityToDifficulty(quality);

  return {
    intervalDays,
    interval: intervalDays,
    easeFactor,
    repetitions,
    nextReviewDate,
    lastQuality: quality,
    difficultyRating,
  };
}

/**
 * Records a question review result (quiz or flashcard), updating or creating the item in the queue.
 */
export function recordQuestionReview(
  uniqueId: string,
  topicId: string,
  questionId: number,
  rating: boolean | number | RecallDifficulty,
  userId?: string | null
): SpacedRepetitionItem {
  const queue = getSpacedRepetitionQueue(userId);
  const existing = queue[uniqueId] || {
    uniqueId,
    topicId,
    questionId,
    nextReviewDate: new Date().toISOString(),
    intervalDays: 1,
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    missedCount: 0,
  };

  const now = new Date();
  const next = calculateNextReview(existing, rating, now);
  const quality = convertRatingToQuality(rating);
  const isCorrect = quality >= 3;

  const updated: SpacedRepetitionItem = {
    ...existing,
    ...next,
    lastReviewedAt: now.toISOString(),
    missedCount: isCorrect ? existing.missedCount : existing.missedCount + 1,
  };

  queue[uniqueId] = updated;
  saveSpacedRepetitionQueue(queue, userId);
  return updated;
}

/**
 * Records a topic-level revision result, updating or creating the topic item in the queue.
 */
export function recordTopicReview(
  topicId: string,
  rating: boolean | number | RecallDifficulty,
  userId?: string | null
): SpacedRepetitionItem {
  const uniqueId = `topic_${topicId}`;
  return recordQuestionReview(uniqueId, topicId, 0, rating, userId);
}

/**
 * Scans quiz attempts stored in localStorage for missed questions and adds them to the review queue.
 */
export function syncMissedQuestionsFromHistory(
  stats: Record<string, QuizStat>,
  userId?: string | null
): Record<string, SpacedRepetitionItem> {
  const queue = getSpacedRepetitionQueue(userId);
  let updated = false;

  Object.values(stats).forEach((stat) => {
    stat.attempts.forEach((attempt) => {
      const missed = (attempt as any).missedQuestionIds || [];
      missed.forEach((qId: number) => {
        const uniqueId = `${stat.quizId}_${qId}`;
        if (!queue[uniqueId]) {
          queue[uniqueId] = {
            uniqueId,
            topicId: stat.quizId,
            questionId: qId,
            nextReviewDate: new Date().toISOString(),
            intervalDays: 1,
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0,
            missedCount: 1,
          };
          updated = true;
        }
      });
    });
  });

  if (updated) {
    saveSpacedRepetitionQueue(queue, userId);
  }

  return queue;
}

/**
 * Filters queue items that are due for review as of `now`.
 */
export function getDueItems(
  queue: Record<string, SpacedRepetitionItem>,
  now: Date = new Date()
): SpacedRepetitionItem[] {
  const nowMs = now.getTime();
  return Object.values(queue)
    .filter((item) => new Date(item.nextReviewDate).getTime() <= nowMs)
    .sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());
}

/**
 * Prepares a set of questions for a review session.
 */
export function getQuestionsForReviewSession(
  stats: Record<string, QuizStat>,
  userId?: string | null,
  limit: number = 10
): { questions: MockExamQuestion[]; source: "due" | "weak-topics" | "all" } {
  const queue = syncMissedQuestionsFromHistory(stats, userId);
  const dueItems = getDueItems(queue);
  const allQuestions = getAllMockExamQuestions();
  const questionMap = new Map<string, MockExamQuestion>();
  allQuestions.forEach((q) => questionMap.set(q.uniqueId, q));

  if (dueItems.length > 0) {
    const questions: MockExamQuestion[] = [];
    dueItems.forEach((item) => {
      const q = questionMap.get(item.uniqueId);
      if (q) questions.push(q);
    });
    if (questions.length > 0) {
      return {
        questions: questions.slice(0, limit),
        source: "due",
      };
    }
  }

  // Fallback: Pick questions from weak topics (lowest scores or unattempted)
  const weakTopicEntries = rankWeakTopics(stats, QUIZZES_CONFIG);
  const weakTopicIds = weakTopicEntries.map((e) => e.quiz.id);

  const fallbackQuestions: MockExamQuestion[] = [];
  allQuestions.forEach((q) => {
    if (weakTopicIds.includes(q.topicId)) {
      fallbackQuestions.push(q);
    }
  });

  if (fallbackQuestions.length > 0) {
    const shuffled = [...fallbackQuestions].sort(() => Math.random() - 0.5);
    return {
      questions: shuffled.slice(0, limit),
      source: "weak-topics",
    };
  }

  // If no weak topics recorded, return random sample of all questions
  const shuffledAll = [...allQuestions].sort(() => Math.random() - 0.5);
  return {
    questions: shuffledAll.slice(0, limit),
    source: "all",
  };
}
