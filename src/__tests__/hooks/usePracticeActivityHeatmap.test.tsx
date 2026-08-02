import React from "react";
import { render, screen } from "@testing-library/react";
import { usePracticeActivityHeatmap } from "../../hooks/usePracticeActivityHeatmap";

function TestComponent() {
  const data = usePracticeActivityHeatmap(7);
  if (!data.loaded) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="totalAttempts">{data.totalAttempts}</div>
      <div data-testid="activeDays">{data.activeDays}</div>
      <div data-testid="days">{data.days.map((d) => `${d.date}:${d.count}`).join(",")}</div>
    </div>
  );
}

describe("usePracticeActivityHeatmap", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns zero values when there are no quiz attempts", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("totalAttempts").textContent).toBe("0");
    expect(screen.getByTestId("activeDays").textContent).toBe("0");
    expect(screen.getByTestId("days").textContent).toContain("0");
  });

  it("aggregates quiz attempts per day across the last 7 days", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setUTCDate(today.getUTCDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setUTCDate(today.getUTCDate() - 2);

    const attemptsToday = [{ score: 10, completedAt: today.toISOString() }];
    const attemptsYesterday = [{ score: 8, completedAt: yesterday.toISOString() }];
    const attemptsTwoDaysAgo = [
      { score: 6, completedAt: twoDaysAgo.toISOString() },
      { score: 7, completedAt: twoDaysAgo.toISOString() },
    ];

    localStorage.setItem("quiz_attempts_user1_arrays", JSON.stringify(attemptsToday));
    localStorage.setItem("quiz_attempts_user1_stacks", JSON.stringify(attemptsYesterday));
    localStorage.setItem("quiz_attempts_user1_queues", JSON.stringify(attemptsTwoDaysAgo));

    render(<TestComponent />);
    expect(screen.getByTestId("totalAttempts").textContent).toBe("4");
    expect(screen.getByTestId("activeDays").textContent).toBe("3");
    expect(screen.getByTestId("days").textContent).toContain("0");
    expect(screen.getByTestId("days").textContent).toContain("2");
    expect(screen.getByTestId("days").textContent).toContain("1");
  });
});
