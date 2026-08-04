import { safeJsonParse } from "./safeStorage";
import { getAllMockExamQuestions, type MockExamQuestion } from "./mockExamData";
import { rankWeakTopics } from "./weakTopics";
import type { QuizStat } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG } from "../data/quizzesConfig";

export interface SpacedRepetitionItem {
  uniqueId: string; // e.g. "arrays_1"
  topicId: string;  // e.g. "arrays"
  questionId: number;
  nextReviewDate: string; // ISO date string
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  lastReviewedAt?: string;
  missedCount: number;
}

export const STORAGE_PREFIX = "quiz_spaced_repetition";

export function getSpacedRepetitionStorageKey(userId?: string | null): string {
  if (userId) {
    return `${STORAGE_PREFIX}_${userId}`;
  }
  return `${STORAGE_PREFIX}_default`;
}

/**
 * Reads the spaced repetition queue for a given user from localStorage.
 */
export function getSpacedRepetitionQueue(userId?: string | null): Record<string, SpacedRepetitionItem> {
  if (typeof window === "undefined") return {};
  const key = getSpacedRepetitionStorageKey(userId);
  return safeJsonParse<Record<string, SpacedRepetitionItem>>(key, {});
}

/**
 * Saves the spaced repetition queue to localStorage.
 */
export function saveSpacedRepetitionQueue(
  queue: Record<string, SpacedRepetitionItem>,
  userId?: string | null
): void {
  if (typeof window === "undefined") return;
  const key = getSpacedRepetitionStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(queue));
  } catch (err) {
    console.warn("[SpacedRepetition] Failed to save queue to localStorage:", err);
  }
}

/**
 * Calculates the next review date and interval based on SM-2 algorithm derivative.
 */
export function calculateNextReview(
  item: Partial<SpacedRepetitionItem>,
  wasCorrect: boolean,
  now: Date = new Date()
): { intervalDays: number; easeFactor: number; repetitions: number; nextReviewDate: string } {
  let easeFactor = item.easeFactor ?? 2.5;
  let repetitions = item.repetitions ?? 0;
  let intervalDays = item.intervalDays ?? 1;

  if (wasCorrect) {
    repetitions += 1;
    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
  } else {
    repetitions = 0;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  }

  const nextReviewMs = now.getTime() + intervalDays * 24 * 60 * 60 * 1000;
  const nextReviewDate = new Date(nextReviewMs).toISOString();

  return {
    intervalDays,
    easeFactor,
    repetitions,
    nextReviewDate,
  };
}

/**
 * Records a question review result, updating or creating the item in the queue.
 */
export function recordQuestionReview(
  uniqueId: string,
  topicId: string,
  questionId: number,
  wasCorrect: boolean,
  userId?: string | null
): SpacedRepetitionItem {
  const queue = getSpacedRepetitionQueue(userId);
  const existing = queue[uniqueId] || {
    uniqueId,
    topicId,
    questionId,
    nextReviewDate: new Date().toISOString(),
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 0,
    missedCount: 0,
  };

  const now = new Date();
  const next = calculateNextReview(existing, wasCorrect, now);

  const updated: SpacedRepetitionItem = {
    ...existing,
    ...next,
    lastReviewedAt: now.toISOString(),
    missedCount: wasCorrect ? existing.missedCount : existing.missedCount + 1,
  };

  queue[uniqueId] = updated;
  saveSpacedRepetitionQueue(queue, userId);
  return updated;
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
 * 1. Checks due items in queue.
 * 2. If due items exist, maps them to MockExamQuestion objects.
 * 3. If no items are due (or queue is empty), falls back to selecting questions from weak topics.
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
    // Shuffle slightly so review session varies
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
