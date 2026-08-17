import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpacedRepetitionWidget from "../../components/SpacedRepetitionWidget";
import type { SpacedRepetitionItem } from "../../utils/spacedRepetition";

// Mock Docusaurus Link
jest.mock("@docusaurus/Link", () => {
  return ({ to, children, className }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  );
});

describe("SpacedRepetitionWidget", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders empty state when no items are due", () => {
    render(<SpacedRepetitionWidget queue={{}} userId="user123" />);

    expect(screen.getByText("Topics Due for Review Today")).toBeInTheDocument();
    expect(screen.getByText("All Caught Up for Today!")).toBeInTheDocument();
    expect(screen.getByText(/No DSA topics or questions are currently due/i)).toBeInTheDocument();
  });

  test("renders due items and allows recall rating click", () => {
    const past = new Date("2026-01-01T00:00:00Z").toISOString();
    const mockQueue: Record<string, SpacedRepetitionItem> = {
      arrays_1: {
        uniqueId: "arrays_1",
        topicId: "arrays",
        questionId: 1,
        nextReviewDate: past,
        intervalDays: 1,
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        missedCount: 1,
      },
    };

    const handleRated = jest.fn();

    render(
      <SpacedRepetitionWidget
        queue={mockQueue}
        userId="user123"
        onReviewRated={handleRated}
      />
    );

    expect(screen.getByText("Arrays")).toBeInTheDocument();
    expect(screen.getByText("Q#1")).toBeInTheDocument();

    const goodBtn = screen.getByRole("button", { name: "Good" });
    expect(goodBtn).toBeInTheDocument();

    fireEvent.click(goodBtn);
    expect(handleRated).toHaveBeenCalledWith("arrays_1", "Good");
    expect(screen.getByText(/Rated as/i)).toBeInTheDocument();
  });
});
