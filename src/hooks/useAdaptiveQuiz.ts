import { useCallback, useMemo, useState } from "react";
import {
  AdaptiveConfig,
  AdaptiveQuestion,
  AdaptiveState,
  DEFAULT_ADAPTIVE_CONFIG,
  MasteryLevel,
  createInitialAdaptiveState,
  getConfidencePercent,
  getMasteryLevel,
  recordAnswer,
  selectNextQuestion,
  shouldStop,
} from "../utils/adaptiveQuiz";

export interface UseAdaptiveQuizOptions<T extends AdaptiveQuestion> {
  pool: T[];
  config?: Partial<AdaptiveConfig>;
}

export interface UseAdaptiveQuizResult<T extends AdaptiveQuestion> {
  /** The question to show right now, or null once the session has ended. */
  currentQuestion: T | null;
  /** How many questions have been answered so far. */
  questionsAnswered: number;
  /** Current best guess at the user's ability, on a 1 (Easy) .. 3 (Hard) scale. */
  abilityEstimate: number;
  /** 0-100: how statistically confident the engine is in the mastery estimate right now. */
  confidencePercent: number;
  /** Whether the session has ended (either by confidence or by hitting maxQuestions). */
  isComplete: boolean;
  /** Final mastery bucket — meaningful once isComplete is true, but available throughout as a live estimate. */
  masteryLevel: MasteryLevel;
  /** Records the answer to currentQuestion and advances to the next question (or ends the session). */
  answer: (correct: boolean) => void;
  /** Resets the session back to the start, optionally against a new pool. */
  reset: (nextPool?: T[]) => void;
  /** Full answer-by-answer history, useful for a results breakdown. */
  history: AdaptiveState["history"];
}

/**
 * Runs an adaptive ("smart") quiz session over the given question pool.
 * Distinct from spaced repetition (which resurfaces missed questions across
 * days/sessions): this operates entirely within a single sitting, picking
 * the next question's difficulty from the last few answers and ending the
 * session early once confidence in the user's mastery level is reached,
 * rather than always working through a fixed-length question set.
 */
export const useAdaptiveQuiz = <T extends AdaptiveQuestion>({
  pool,
  config,
}: UseAdaptiveQuizOptions<T>): UseAdaptiveQuizResult<T> => {
  const resolvedConfig: AdaptiveConfig = useMemo(
    () => ({ ...DEFAULT_ADAPTIVE_CONFIG, ...config }),
    [config]
  );

  const [state, setState] = useState<AdaptiveState>(createInitialAdaptiveState);
  const [activePool, setActivePool] = useState<T[]>(pool);

  const isComplete = shouldStop(state, activePool.length, resolvedConfig);
  const currentQuestion = isComplete ? null : selectNextQuestion(state, activePool);

  const answer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      setState((prev) => recordAnswer(prev, currentQuestion, correct));
    },
    [currentQuestion]
  );

  const reset = useCallback((nextPool?: T[]) => {
    setState(createInitialAdaptiveState());
    if (nextPool) setActivePool(nextPool);
  }, []);

  return {
    currentQuestion,
    questionsAnswered: state.history.length,
    abilityEstimate: state.abilityEstimate,
    confidencePercent: getConfidencePercent(state),
    isComplete,
    masteryLevel: getMasteryLevel(state),
    answer,
    reset,
    history: state.history,
  };
};
