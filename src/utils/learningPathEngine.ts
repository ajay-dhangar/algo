import { STAGES, Stage } from "../data/roadmapData";
import { QuizAnswers } from "../data/diagnosticQuiz";

export type StageStatus = "study" | "review" | "confident";

export interface PersonalizedStage {
  stage: Stage;
  status: StageStatus;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface PersonalizedPath {
  /** Every stage the learner should still spend time on, in curriculum order */
  stagesToLearn: PersonalizedStage[];
  /** Stages the learner already scored 3/3 on — shown collapsed as "already solid" */
  masteredStages: Stage[];
  level: SkillLevel;
  /** Human-readable one-liner summarizing the recommendation */
  summary: string;
  /** True if every stage scored 3/3 — nothing left to recommend */
  allMastered: boolean;
}

/**
 * Turns a status into a stage rank so "study" stages are prioritized over
 * "review" stages if we ever need a flat ordering (e.g. progress bar).
 */
function statusFromScore(score: number): StageStatus {
  if (score >= 3) return "confident";
  if (score === 2) return "review";
  return "study"; // 0 or 1
}

export function computeStageStatuses(
  answers: QuizAnswers
): Record<number, StageStatus> {
  const statuses: Record<number, StageStatus> = {};
  for (const stage of STAGES) {
    const score = answers[stage.id] ?? 0;
    statuses[stage.id] = statusFromScore(score);
  }
  return statuses;
}

function computeLevel(answers: QuizAnswers): SkillLevel {
  const scores: number[] = STAGES.map((s) => answers[s.id] ?? 0);
  const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
  if (avg >= 2.4) return "Advanced";
  if (avg >= 1.3) return "Intermediate";
  return "Beginner";
}

/**
 * Builds the personalized learning path from raw quiz answers.
 *
 * Design choice: we do NOT reorder stages relative to each other — the
 * curriculum order in roadmapData.ts encodes real prerequisites (e.g. Trees
 * before Graphs, Recursion before Backtracking). Personalization instead
 * decides *which* stages to keep and where to start, e.g. an experienced
 * learner who is confident through "Searching & Sorting" gets a path that
 * starts directly at "Greedy & Backtracking" instead of Foundations.
 */
export function buildPersonalizedPath(answers: QuizAnswers): PersonalizedPath {
  const statuses = computeStageStatuses(answers);

  const stagesToLearn: PersonalizedStage[] = [];
  const masteredStages: Stage[] = [];

  for (const stage of STAGES) {
    const status = statuses[stage.id];
    if (status === "confident") {
      masteredStages.push(stage);
    } else {
      stagesToLearn.push({ stage, status });
    }
  }

  const level = computeLevel(answers);
  const allMastered = stagesToLearn.length === 0;

  let summary: string;
  if (allMastered) {
    summary =
      "You're solid across every stage in the roadmap — head straight to Practice Milestones or the Challenges section for harder problems.";
  } else {
    const firstStage = stagesToLearn[0].stage;
    const skippedCount = masteredStages.length;
    if (skippedCount === 0) {
      summary = `Start from the beginning: Stage ${firstStage.id} — ${firstStage.title}.`;
    } else {
      const skippedStageNumbers =
        skippedCount === 1
          ? `Stage ${masteredStages[0].id}`
          : `Stages ${masteredStages[0].id}–${masteredStages[masteredStages.length - 1].id}`;
      summary = `You already know ${skippedStageNumbers} well — jump straight to Stage ${firstStage.id}: ${firstStage.title}.`;
    }
  }

  return { stagesToLearn, masteredStages, level, summary, allMastered };
}

export const DIAGNOSTIC_QUIZ_STORAGE_KEY = "algo_diagnostic_quiz_answers_v1";
