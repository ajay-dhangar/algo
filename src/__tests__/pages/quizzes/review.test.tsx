import React from "react";
import { render, screen } from "@testing-library/react";
import SpacedRepetitionReviewPage from "../../../pages/quizzes/review";

jest.mock("@theme/Layout", () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="docusaurus-layout">{children}</div>;
  };
});

jest.mock("@docusaurus/Link", () => {
  return function MockLink({ to, children, className, onClick }: any) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  };
});

jest.mock("@docusaurus/BrowserOnly", () => {
  return function MockBrowserOnly({ children }: { children: () => React.ReactNode }) {
    return <>{children()}</>;
  };
});

describe("SpacedRepetitionReviewPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders spaced repetition review quiz page header and questions", () => {
    render(<SpacedRepetitionReviewPage />);

    expect(screen.getByText(/Review Weak Topics/i)).toBeInTheDocument();
    expect(screen.getByText(/Spaced Repetition/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });
});
