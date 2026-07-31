import type { QuizStat } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG, type QuizCardConfig } from "../data/quizzesConfig";

export interface WeakTopicEntry {
  quiz: QuizCardConfig;
  stat: QuizStat;
}

export const MIN_WEAK_TOPICS = 3;
export const MAX_WEAK_TOPICS = 5;

/**
 * Ranks the topics a learner should practice next, weakest first.
 *
 * - Topics with at least one attempt are ranked by best score % (ascending —
 *   lowest score first), since "weakest" should reflect demonstrated
 *   performance, not just an untried topic.
 * - If fewer than MIN_WEAK_TOPICS have been attempted at all, the list is
 *   padded with never-attempted topics so the dashboard still has something
 *   useful to suggest to a newer learner, rather than showing an empty state.
 * - Returns at most MAX_WEAK_TOPICS entries.
 */
export function rankWeakTopics(
  stats: Record<string, QuizStat>,
  quizzes: QuizCardConfig[] = QUIZZES_CONFIG,
): WeakTopicEntry[] {
  const attempted: WeakTopicEntry[] = [];
  const notAttempted: WeakTopicEntry[] = [];

  quizzes.forEach((quiz) => {
    const stat = stats[quiz.id];
    if (!stat) return;

    if (stat.totalAttempts > 0) {
      attempted.push({ quiz, stat });
    } else {
      notAttempted.push({ quiz, stat });
    }
  });

  attempted.sort((a, b) => a.stat.bestPercent - b.stat.bestPercent);

  const result = attempted.slice(0, MAX_WEAK_TOPICS);

  if (result.length < MIN_WEAK_TOPICS) {
    const needed = MIN_WEAK_TOPICS - result.length;
    result.push(...notAttempted.slice(0, needed));
  }

  return result;
}
