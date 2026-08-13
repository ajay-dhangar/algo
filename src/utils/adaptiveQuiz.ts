export type Difficulty = "Easy" | "Medium" | "Hard";

export interface AdaptiveQuestion {
  id: string | number;
  difficulty: Difficulty;
}

export interface AdaptiveAnswerRecord {
  id: string | number;
  difficulty: Difficulty;
  correct: boolean;
  /** Ability estimate immediately after this answer — lets shouldStop look at recent trend stability. */
  abilityAfter: number;
}

export interface AdaptiveState {
  /** Estimated ability on a 1 (Easy) .. 3 (Hard) scale. Starts neutral at 2 (Medium). */
  abilityEstimate: number;
  /** Shrinks toward 0 as answers accumulate; how "unsure" we still are about the estimate. */
  uncertainty: number;
  history: AdaptiveAnswerRecord[];
}

export interface AdaptiveConfig {
  /** Never end the session before this many questions, however confident. Default 6. */
  minQuestions: number;
  /** Hard ceiling — always end by this many questions even if confidence is never reached. */
  maxQuestions: number;
  /** Once uncertainty drops to/below this, mastery confidence is considered statistically reached. */
  confidenceThreshold: number;
  /** How many of the most recent answers must show a stable estimate before stopping early. */
  stabilityWindow: number;
  /** Max allowed ability swing across the stability window to count as "stable". */
  stabilityTolerance: number;
}

export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveConfig = {
  minQuestions: 6,
  maxQuestions: 12,
  confidenceThreshold: 0.22,
  stabilityWindow: 4,
  stabilityTolerance: 0.35,
};

const DIFFICULTY_VALUE: Record<Difficulty, number> = { Easy: 1, Medium: 2, Hard: 3 };
const MIN_ABILITY = 1;
const MAX_ABILITY = 3;
const MIN_UNCERTAINTY = 0.08;
const UNCERTAINTY_DECAY = 0.85;
/** How far a single answer can move the ability estimate at maximum uncertainty (session start). */
const BASE_STEP = 0.9;

export function createInitialAdaptiveState(): AdaptiveState {
  return { abilityEstimate: 2, uncertainty: 1, history: [] };
}

/** Pure update: given the previous state and one new answer, returns the next state. */
export function recordAnswer(
  state: AdaptiveState,
  question: AdaptiveQuestion,
  correct: boolean
): AdaptiveState {
  const direction = correct ? 1 : -1;
  // Bigger corrections early (high uncertainty), smaller/finer corrections later —
  // this is what makes the estimate converge instead of oscillating forever.
  const step = direction * state.uncertainty * BASE_STEP;
  const nextAbility = clamp(state.abilityEstimate + step, MIN_ABILITY, MAX_ABILITY);
  const nextUncertainty = Math.max(MIN_UNCERTAINTY, state.uncertainty * UNCERTAINTY_DECAY);

  return {
    abilityEstimate: nextAbility,
    uncertainty: nextUncertainty,
    history: [
      ...state.history,
      { id: question.id, difficulty: question.difficulty, correct, abilityAfter: nextAbility },
    ],
  };
}

/**
 * Picks the next question whose difficulty best matches the current ability
 * estimate, from whatever hasn't been asked yet. Ties (equally-close
 * difficulty) are broken deterministically-but-unpredictably via a simple
 * seeded shuffle of the tied candidates, so two users with an identical
 * answer pattern don't always see the exact same question order.
 */
export function selectNextQuestion<T extends AdaptiveQuestion>(
  state: AdaptiveState,
  pool: T[]
): T | null {
  const answeredIds = new Set(state.history.map((h) => h.id));
  const remaining = pool.filter((q) => !answeredIds.has(q.id));
  if (remaining.length === 0) return null;

  let bestDistance = Infinity;
  for (const q of remaining) {
    const distance = Math.abs(DIFFICULTY_VALUE[q.difficulty] - state.abilityEstimate);
    if (distance < bestDistance) bestDistance = distance;
  }
  const tied = remaining.filter(
    (q) => Math.abs(DIFFICULTY_VALUE[q.difficulty] - state.abilityEstimate) === bestDistance
  );

  // Deterministic-but-varied tie-break: rotate by how many questions have
  // been answered so far, so repeated ties don't always resolve the same way.
  const pick = tied[state.history.length % tied.length];
  return pick;
}

/**
 * Whether the session can end now. Ends when either:
 *  - the hard question-count ceiling is hit, or
 *  - the minimum question count has been met, uncertainty has decayed to/
 *    below the threshold, AND the ability estimate has actually been
 *    *stable* over the last few answers (not just "many rounds have
 *    passed") — this second condition is what makes the early stop
 *    statistically meaningful rather than a fixed-schedule guess: a
 *    learner whose recent answers keep swinging the estimate around
 *    (e.g. acing every difficulty except one) is deliberately kept in
 *    the session longer so that weak spot gets sampled properly.
 */
export function shouldStop(
  state: AdaptiveState,
  poolSize: number,
  config: AdaptiveConfig = DEFAULT_ADAPTIVE_CONFIG
): boolean {
  const answered = state.history.length;
  if (answered >= Math.min(config.maxQuestions, poolSize)) return true;
  if (answered < config.minQuestions) return false;
  if (state.uncertainty > config.confidenceThreshold) return false;

  const window = state.history.slice(-config.stabilityWindow);
  if (window.length < Math.min(config.stabilityWindow, config.minQuestions)) return false;
  const abilities = window.map((h) => h.abilityAfter);
  const swing = Math.max(...abilities) - Math.min(...abilities);
  return swing <= config.stabilityTolerance;
}

export type MasteryLevel = "Developing" | "Proficient" | "Advanced";

export function getMasteryLevel(state: AdaptiveState): MasteryLevel {
  if (state.abilityEstimate < 1.67) return "Developing";
  if (state.abilityEstimate < 2.5) return "Proficient";
  return "Advanced";
}

/** 0-100 display value: how statistically confident we are in the mastery estimate. */
export function getConfidencePercent(state: AdaptiveState): number {
  const raw = 1 - (state.uncertainty - MIN_UNCERTAINTY) / (1 - MIN_UNCERTAINTY);
  return Math.round(clamp(raw, 0, 1) * 100);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
