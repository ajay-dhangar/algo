import { act, renderHook } from "@testing-library/react";
import { useAdaptiveQuiz } from "../../hooks/useAdaptiveQuiz";
import { AdaptiveQuestion, DEFAULT_ADAPTIVE_CONFIG } from "../../utils/adaptiveQuiz";

function makePool(n = 30): AdaptiveQuestion[] {
  const diffs = ["Easy", "Medium", "Hard"] as const;
  return Array.from({ length: n }, (_, i) => ({ id: i, difficulty: diffs[i % 3] }));
}

describe("useAdaptiveQuiz", () => {
  test("starts with a question and not complete", () => {
    const { result } = renderHook(() => useAdaptiveQuiz({ pool: makePool() }));
    expect(result.current.currentQuestion).not.toBeNull();
    expect(result.current.isComplete).toBe(false);
    expect(result.current.questionsAnswered).toBe(0);
  });

  test("answering advances to a new question and updates questionsAnswered", () => {
    const { result } = renderHook(() => useAdaptiveQuiz({ pool: makePool() }));
    const firstQuestionId = result.current.currentQuestion?.id;

    act(() => {
      result.current.answer(true);
    });

    expect(result.current.questionsAnswered).toBe(1);
    expect(result.current.currentQuestion?.id).not.toBe(firstQuestionId);
  });

  test("a session of correct answers eventually completes within maxQuestions", () => {
    const { result } = renderHook(() => useAdaptiveQuiz({ pool: makePool() }));

    let guard = 0;
    while (!result.current.isComplete && guard < 100) {
      act(() => {
        result.current.answer(true);
      });
      guard++;
    }

    expect(guard).toBeLessThan(100);
    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.questionsAnswered).toBeLessThanOrEqual(DEFAULT_ADAPTIVE_CONFIG.maxQuestions);
    expect(result.current.masteryLevel).toBe("Advanced");
  });

  test("reset() clears progress and can swap in a new pool", () => {
    const { result } = renderHook(() => useAdaptiveQuiz({ pool: makePool(6) }));

    act(() => {
      result.current.answer(true);
      result.current.answer(true);
    });
    expect(result.current.questionsAnswered).toBe(2);

    act(() => {
      result.current.reset(makePool(10));
    });

    expect(result.current.questionsAnswered).toBe(0);
    expect(result.current.currentQuestion).not.toBeNull();
  });

  test("answer() is a no-op once the session is already complete", () => {
    const { result } = renderHook(() =>
      useAdaptiveQuiz({
        pool: makePool(3),
        config: { minQuestions: 1, maxQuestions: 3, confidenceThreshold: 0.99, stabilityWindow: 1, stabilityTolerance: 1 },
      })
    );

    act(() => {
      result.current.answer(true);
      result.current.answer(true);
      result.current.answer(true);
    });
    expect(result.current.isComplete).toBe(true);
    const answeredBefore = result.current.questionsAnswered;

    act(() => {
      result.current.answer(true);
    });
    expect(result.current.questionsAnswered).toBe(answeredBefore);
  });
});
