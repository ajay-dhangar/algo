import React from "react";
import { render, screen } from "../testUtils";
import QuizErrorBoundary from "../../components/Quiz/QuizErrorBoundary";

const Bomb = (): JSX.Element => {
  throw new Error("boom");
};

describe("QuizErrorBoundary", () => {
  test("renders children normally when there is no error", () => {
    render(
      <QuizErrorBoundary>
        <div>Quiz content</div>
      </QuizErrorBoundary>
    );
    expect(screen.getByText("Quiz content")).toBeInTheDocument();
  });

  test("renders the fallback UI when a child throws", () => {
    // Error boundaries still log to console.error during tests; suppress noise.
    const spy = jest.spyOn(console, "error").mockReturnValue(undefined);
    render(
      <QuizErrorBoundary>
        <Bomb />
      </QuizErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    spy.mockRestore();
  });

  test("renders the toast container (no longer gated behind componentDidMount/setState)", () => {
    const { container } = render(
      <QuizErrorBoundary>
        <div>Quiz content</div>
      </QuizErrorBoundary>
    );
    // react-toastify renders a container div with this class immediately,
    // since BrowserOnly's mock resolves synchronously — confirming the
    // toast UI is present without needing a post-mount setState render.
    expect(container.querySelector(".Toastify")).toBeInTheDocument();
  });
});
