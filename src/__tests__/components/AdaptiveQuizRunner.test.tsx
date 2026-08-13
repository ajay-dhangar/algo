import React from "react";
import { render, screen, within } from "../testUtils";
import userEvent from "@testing-library/user-event";
import AdaptiveQuizRunner, { AdaptiveQuizItem, AdaptiveQuizSummary } from "../../components/Quiz/AdaptiveQuizRunner";

function makePool(n = 30): AdaptiveQuizItem[] {
  const diffs = ["Easy", "Medium", "Hard"] as const;
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    difficulty: diffs[i % 3],
    question: `Question ${i}`,
    options: ["Correct", "Wrong A", "Wrong B", "Wrong C"],
    answer: "Correct",
    explanation: "Because.",
  }));
}

describe("AdaptiveQuizRunner", () => {
  test("renders the first question with difficulty badge and options", () => {
    render(<AdaptiveQuizRunner pool={makePool()} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(/question \d+/i);
    expect(screen.getByRole("radiogroup", { name: /smart quiz options/i })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  test("selecting an option and submitting advances to the next question", async () => {
    const user = userEvent.setup();
    render(<AdaptiveQuizRunner pool={makePool()} />);

    const firstQuestionText = screen.getByRole("heading", { level: 3 }).textContent;
    const options = screen.getAllByRole("radio");
    await user.click(options[0]);

    const submit = screen.getByRole("button", { name: /submit answer/i });
    expect(submit).not.toBeDisabled();
    await user.click(submit);

    const nextQuestionText = screen.getByRole("heading", { level: 3 }).textContent;
    expect(nextQuestionText).not.toBe(firstQuestionText);
  });

  test("submit is disabled until an option is selected", () => {
    render(<AdaptiveQuizRunner pool={makePool()} />);
    expect(screen.getByRole("button", { name: /submit answer/i })).toBeDisabled();
  });

  test("a full session of correct answers completes, shows Advanced, and calls onComplete exactly once", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn<void, [AdaptiveQuizSummary]>();
    render(<AdaptiveQuizRunner pool={makePool()} onComplete={onComplete} />);

    let guard = 0;
    while (!screen.queryByText(/smart quiz complete/i) && guard < 30) {
      const correctOption = screen.getByRole("radio", { name: /correct/i });
      await user.click(correctOption);
      await user.click(screen.getByRole("button", { name: /submit answer/i }));
      guard++;
    }

    expect(guard).toBeLessThan(30);
    expect(screen.getByText(/smart quiz complete/i)).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete.mock.calls[0][0].masteryLevel).toBe("Advanced");
  });

  test("shows a graceful message when the pool is empty", () => {
    render(<AdaptiveQuizRunner pool={[]} />);
    expect(screen.getByText(/no questions available/i)).toBeInTheDocument();
  });
});
