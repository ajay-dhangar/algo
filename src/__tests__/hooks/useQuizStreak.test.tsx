import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useQuizStreak } from "../../hooks/useQuizStreak";

function TestComponent() {
  const streak = useQuizStreak();
  if (!streak.loaded) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="currentStreak">{streak.currentStreak}</div>
      <div data-testid="longestStreak">{streak.longestStreak}</div>
      <div data-testid="totalActiveDays">{streak.totalActiveDays}</div>
      <div data-testid="practicedToday">{streak.practicedToday ? "true" : "false"}</div>
      <div data-testid="last7Days">{streak.last7Days.map((b) => (b ? "1" : "0")).join(",")}</div>
    </div>
  );
}

describe("useQuizStreak hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns zeroes when no quiz attempts exist in localStorage", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("0");
    expect(screen.getByTestId("longestStreak").textContent).toBe("0");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("0");
    expect(screen.getByTestId("practicedToday").textContent).toBe("false");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,0,0,0");
  });

  test("calculates active today correctly when a quiz attempt exists for today", () => {
    const todayIso = new Date().toISOString();
    const attempts = [{ score: 10, completedAt: todayIso }];
    localStorage.setItem("quiz_attempts_user1_arrays", JSON.stringify(attempts));

    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("1");
    expect(screen.getByTestId("longestStreak").textContent).toBe("1");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("1");
    expect(screen.getByTestId("practicedToday").textContent).toBe("true");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,0,0,1");
  });

  test("calculates multi-day streak across consecutive calendar days", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setUTCDate(today.getUTCDate() - 1);
    const dayBefore = new Date();
    dayBefore.setUTCDate(today.getUTCDate() - 2);

    const attemptsToday = [{ score: 10, completedAt: today.toISOString() }];
    const attemptsYesterday = [{ score: 8, completedAt: yesterday.toISOString() }];
    const attemptsDayBefore = [{ score: 9, completedAt: dayBefore.toISOString() }];

    localStorage.setItem("quiz_attempts_u1_arrays", JSON.stringify(attemptsToday));
    localStorage.setItem("quiz_attempts_u1_stacks", JSON.stringify(attemptsYesterday));
    localStorage.setItem("quiz_attempts_u1_queues", JSON.stringify(attemptsDayBefore));

    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("3");
    expect(screen.getByTestId("longestStreak").textContent).toBe("3");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("3");
    expect(screen.getByTestId("practicedToday").textContent).toBe("true");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,1,1,1");
  });
});
