import type { QuizStat } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG, type QuizCardConfig } from "../data/quizzesConfig";

export interface Recommendation {
  quiz: QuizCardConfig;
  stat: QuizStat;
  score: number;
  reasons: string[];
  scoreBreakdown: {
    weakness: number;
    recency: number;
    progression: number;
  };
}

const PASS_THRESHOLD = 70;
const MASTERY_THRESHOLD = 90;

function getDaysSince(isoString: string | null): number | null {
  if (!isoString) return null;
  const timestamp = new Date(isoString).getTime();
  if (Number.isNaN(timestamp)) return null;

  const delta = Date.now() - timestamp;
  if (delta < 0) return null;

  return delta / (1000 * 60 * 60 * 24);
}

function computeWeaknessScore(stat: QuizStat): number {
  if (stat.status === "mastered") return 0;
  if (stat.totalAttempts === 0) return 0.92;

  const raw = 1 - stat.bestPercent / 100;
  return Math.min(0.95, Math.max(0.15, raw));
}

function computeRecencyScore(latestAttemptAt: string | null): number {
  const days = getDaysSince(latestAttemptAt);
  if (days === null) return 1;
  return Math.min(1, days / 21);
}

function computePrerequisiteCompletion(
  quiz: QuizCardConfig,
  stats: Record<string, QuizStat>
): number {
  if (!quiz.prerequisites || quiz.prerequisites.length === 0) return 1;

  const completedPrereqs = quiz.prerequisites.filter((prereq) => {
    const prereqStat = stats[prereq];
    return prereqStat?.bestPercent >= PASS_THRESHOLD;
  }).length;

  return completedPrereqs / quiz.prerequisites.length;
}

function computeProgressionScore(
  quiz: QuizCardConfig,
  stat: QuizStat,
  stats: Record<string, QuizStat>
): number {
  const prerequisiteCompletion = computePrerequisiteCompletion(quiz, stats);
  const statusBonus = stat.totalAttempts === 0
    ? 0.35
    : stat.status === "in-progress"
      ? 0.24
      : stat.status === "passed"
        ? 0.15
        : 0.05;

  return Math.min(1, prerequisiteCompletion * 0.6 + statusBonus);
}

function buildRecommendationReasons(
  quiz: QuizCardConfig,
  stat: QuizStat,
  stats: Record<string, QuizStat>,
  scores: { weakness: number; recency: number; progression: number }
): string[] {
  const reasons: string[] = [];
  const prerequisiteCompletion = computePrerequisiteCompletion(quiz, stats);
  const daysSince = stat.latestAttemptAt ? getDaysSince(stat.latestAttemptAt) : null;

  if (stat.totalAttempts === 0) {
    reasons.push("New quiz with no attempts yet");
  } else if (stat.bestPercent < 60) {
    reasons.push(`Weak topic: best score is ${stat.bestPercent}%`);
  } else if (stat.bestPercent < MASTERY_THRESHOLD) {
    reasons.push(`Boost this topic from ${stat.bestPercent}% to mastery`);
  }

  if (daysSince === null) {
    if (stat.totalAttempts === 0) {
      reasons.push("Fresh start — begin with a focused quiz");
    }
  } else if (daysSince >= 14) {
    reasons.push(`Last practiced ${Math.round(daysSince)} days ago`);
  } else if (daysSince >= 7) {
    reasons.push("It’s been a week since you last practiced this topic");
  }

  if (quiz.prerequisites?.length) {
    if (prerequisiteCompletion === 1) {
      reasons.push("Your prerequisites are complete — this is the next step");
    } else if (prerequisiteCompletion > 0) {
      reasons.push("Prerequisite topics are partially complete — keep progressing");
    } else {
      reasons.push("Foundational topics are still building here");
    }
  } else {
    reasons.push("Great next step for core topic coverage");
  }

  if (reasons.length === 0) {
    if (stat.totalAttempts === 0) {
      reasons.push("Ready for your first attempt");
    } else {
      reasons.push("A strong recommendation based on your recent activity");
    }
  }

  return reasons.slice(0, 3);
}

export function getRecommendedNextQuiz(
  stats: Record<string, QuizStat>,
  quizzes: QuizCardConfig[] = QUIZZES_CONFIG,
): Recommendation | null {
  const hasPracticeHistory = Object.values(stats).some((stat) => stat.totalAttempts > 0);
  if (!hasPracticeHistory) return null;

  const candidates: Recommendation[] = quizzes
    .map((quiz) => {
      // Fall back to a default not-started stat so quizzes that have never
      // been started (no entry in stats yet) are still eligible candidates.
      const stat: QuizStat = stats[quiz.id] ?? {
        quizId: quiz.id,
        attempts: [],
        bestScore: 0,
        bestPercent: 0,
        latestScore: 0,
        latestPercent: 0,
        latestAttemptAt: null,
        totalAttempts: 0,
        totalQuestions: 0,
        averagePercent: 0,
        status: "not-started",
      };

      if (stat.status === "mastered") return null;

      const weakness = computeWeaknessScore(stat);
      const recency = computeRecencyScore(stat.latestAttemptAt);
      const progression = computeProgressionScore(quiz, stat, stats);
      const score = 0.45 * weakness + 0.35 * recency + 0.2 * progression;

      return {
        quiz,
        stat,
        score,
        reasons: buildRecommendationReasons(quiz, stat, stats, { weakness, recency, progression }),
        scoreBreakdown: { weakness, recency, progression },
      };
    })
    .filter((item): item is Recommendation => Boolean(item));

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.quiz.id.localeCompare(b.quiz.id);
  });

  return candidates[0];
}
