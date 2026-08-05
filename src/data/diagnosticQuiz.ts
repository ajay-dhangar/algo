import { STAGES, Stage } from "./roadmapData";

/**
 * Diagnostic Quiz → Personalized Learning Path
 * ------------------------------------------------
 * This quiz asks one self-assessment question per Stage in `roadmapData.ts`
 * (the same 9 stages that power the DSA Learning Roadmap component), so the
 * quiz and the roadmap can never drift out of sync — add/edit a stage there
 * and this quiz picks it up automatically.
 *
 * Each answer maps to a 0-3 "comfort score" for that stage. The scoring
 * logic lives in `src/utils/learningPathEngine.ts`.
 */

export interface QuizOption {
  /** 0 = never heard of it, 3 = could teach it to someone else */
  score: 0 | 1 | 2 | 3;
  label: string;
}

export interface QuizQuestion {
  /** Matches Stage.id in roadmapData.ts */
  stageId: number;
  stageTitle: string;
  question: string;
  /** A couple of example concepts pulled from the stage, shown as a hint */
  exampleTopics: string[];
  options: QuizOption[];
}

const QUIZ_OPTIONS: QuizOption[] = [
  { score: 0, label: "Never heard of this / totally new to me" },
  { score: 1, label: "I've heard of it but never practiced it" },
  { score: 2, label: "Comfortable — I've solved a few problems with it" },
  { score: 3, label: "Very confident — I could explain it to someone else" },
];

function buildQuestion(stage: Stage): QuizQuestion {
  const exampleTopics = stage.sections
    .slice(0, 2)
    .map((section) => section.name);

  return {
    stageId: stage.id,
    stageTitle: stage.title,
    question: `How comfortable are you with ${stage.title.toLowerCase()}?`,
    exampleTopics,
    options: QUIZ_OPTIONS,
  };
}

export const DIAGNOSTIC_QUIZ_QUESTIONS: QuizQuestion[] = STAGES.map(buildQuestion);

/** answers[stageId] = score (0-3) */
export type QuizAnswers = Record<number, 0 | 1 | 2 | 3>;
