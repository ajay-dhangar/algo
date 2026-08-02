import { QUESTIONS as arraysQuestions } from "../pages/quizzes/arrays";
import { QUESTIONS as stackQuestions } from "../pages/quizzes/stack";
import { QUESTIONS as queueQuestions } from "../pages/quizzes/queue";
import { QUESTIONS as linkedListQuestions } from "../pages/quizzes/linked-list";
import { QUESTIONS as dequeQuestions } from "../pages/quizzes/deque";
import { QUESTIONS as priorityQueueQuestions } from "../pages/quizzes/priority-queue";
import { QUESTIONS as linearSearchQuestions } from "../pages/quizzes/linear-search";
import { QUESTIONS as sortingQuestions } from "../pages/quizzes/sorting";
import { QUESTIONS as recursionQuestions } from "../pages/quizzes/recursion";
import { QUESTIONS as binaryTreeQuestions } from "../pages/quizzes/binary-tree";
import { QUESTIONS as bstQuestions } from "../pages/quizzes/binary-search-tree";
import { QUESTIONS as graphQuestions } from "../pages/quizzes/graph";
import { QUESTIONS as avlTreeQuestions } from "../pages/quizzes/avl-tree";
import { QUESTIONS as redBlackTreeQuestions } from "../pages/quizzes/red-black-tree";
import { QUESTIONS as bTreeQuestions } from "../pages/quizzes/b-tree";
import { QUESTIONS as bplusTreeQuestions } from "../pages/quizzes/bplus-tree";
import { QUESTIONS as isamQuestions } from "../pages/quizzes/isam";
import { QUESTIONS as hashIndexingQuestions } from "../pages/quizzes/hash-indexing";
import { QUESTIONS as externalHashingQuestions } from "../pages/quizzes/external-hashing";
import { QUIZZES_CONFIG } from "../data/quizzesConfig";

export interface RawQuestion {
  id: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  question: string;
  codeSnippet?: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface MockExamQuestion extends RawQuestion {
  topicId: string;
  topicTitle: string;
  uniqueId: string;
}

const RAW_QUESTIONS_BY_TOPIC: Record<string, RawQuestion[]> = {
  arrays: arraysQuestions,
  stacks: stackQuestions,
  queues: queueQuestions,
  "linked-lists": linkedListQuestions,
  deques: dequeQuestions,
  "priority-queues": priorityQueueQuestions,
  "linear-search": linearSearchQuestions,
  sorting: sortingQuestions,
  recursion: recursionQuestions,
  "binary-trees": binaryTreeQuestions,
  bst: bstQuestions,
  graphs: graphQuestions,
  "avl-trees": avlTreeQuestions,
  "red-black-trees": redBlackTreeQuestions,
  "b-trees": bTreeQuestions,
  "bplus-trees": bplusTreeQuestions,
  isam: isamQuestions,
  "hash-indexing": hashIndexingQuestions,
  "external-hashing": externalHashingQuestions,
};

export function getTopicTitle(topicId: string): string {
  const config = QUIZZES_CONFIG.find((q) => q.id === topicId);
  return config ? config.title.replace(/^Quiz on /, "") : topicId;
}

/**
 * Returns all questions tagged with topic metadata.
 */
export function getAllMockExamQuestions(): MockExamQuestion[] {
  const result: MockExamQuestion[] = [];

  Object.entries(RAW_QUESTIONS_BY_TOPIC).forEach(([topicId, questions]) => {
    const topicTitle = getTopicTitle(topicId);
    (questions || []).forEach((q) => {
      result.push({
        ...q,
        topicId,
        topicTitle,
        uniqueId: `${topicId}_${q.id}`,
      });
    });
  });

  return result;
}

/**
 * Fisher-Yates shuffle array utility.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selects questions for a mock exam based on target topics and question count limit.
 */
export function buildMockExamQuestions(
  selectedTopicIds: string[],
  targetCount: number = 30
): MockExamQuestion[] {
  const allQuestions = getAllMockExamQuestions();
  const filtered = selectedTopicIds.length > 0
    ? allQuestions.filter((q) => selectedTopicIds.includes(q.topicId))
    : allQuestions;

  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, targetCount);
}

/**
 * Preset helper for "random 30 questions across all 19 topics".
 */
export function getRandom30Preset(): MockExamQuestion[] {
  const allTopics = Object.keys(RAW_QUESTIONS_BY_TOPIC);
  return buildMockExamQuestions(allTopics, 30);
}
