import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuizStreak } from "../../hooks/useQuizStreak";

// ---------------------------------------------------------------------------
// Mock getUserId so we can control which user is "logged in" per test.
// The module path must match the import inside useQuizStreak.ts exactly.
// ---------------------------------------------------------------------------
jest.mock("../../utils/safeStorage", () => {
  const actual = jest.requireActual("../../utils/safeStorage");
  return {
    ...actual,
    getUserId: jest.fn(),
  };
});

import { getUserId } from "../../utils/safeStorage";
const mockGetUserId = getUserId as jest.Mock;

// ---------------------------------------------------------------------------
// Helper component — renders all streak values as testable DOM nodes.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isoToday(): string {
  return new Date().toISOString();
}

function isoOffsetDays(offset: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offset);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useQuizStreak hook", () => {
  beforeEach(() => {
    localStorage.clear();
    // Default: no user logged in (anonymous fallback)
    mockGetUserId.mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ── 1. Baseline ──────────────────────────────────────────────────────────

  test("returns zeroes when no quiz attempts exist in localStorage", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("0");
    expect(screen.getByTestId("longestStreak").textContent).toBe("0");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("0");
    expect(screen.getByTestId("practicedToday").textContent).toBe("false");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,0,0,0");
  });

  // ── 2. Authenticated user — only reads their own keys ─────────────────────

  test("reads only the logged-in user's keys when a user ID is available", () => {
    // User "alice" is logged in
    mockGetUserId.mockReturnValue("alice");

    // Alice completed a quiz today
    localStorage.setItem(
      "quiz_attempts_alice_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );

    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("1");
    expect(screen.getByTestId("practicedToday").textContent).toBe("true");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("1");
  });

  test("excludes keys belonging to a different user when a user ID is set", () => {
    // User "alice" is logged in
    mockGetUserId.mockReturnValue("alice");

    // Bob completed quizzes on three consecutive days — should NOT count for Alice
    localStorage.setItem(
      "quiz_attempts_bob_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );
    localStorage.setItem(
      "quiz_attempts_bob_stacks",
      JSON.stringify([{ score: 8, completedAt: isoOffsetDays(1) }])
    );
    localStorage.setItem(
      "quiz_attempts_bob_queues",
      JSON.stringify([{ score: 9, completedAt: isoOffsetDays(2) }])
    );

    render(<TestComponent />);

    // Alice has no attempts — everything must be zero
    expect(screen.getByTestId("currentStreak").textContent).toBe("0");
    expect(screen.getByTestId("longestStreak").textContent).toBe("0");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("0");
    expect(screen.getByTestId("practicedToday").textContent).toBe("false");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,0,0,0");
  });

  test("only counts the logged-in user's attempts and ignores other users", () => {
    // "alice" is logged in
    mockGetUserId.mockReturnValue("alice");

    // Alice: today only
    localStorage.setItem(
      "quiz_attempts_alice_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );

    // Bob: today + yesterday + day before (3-day streak) — must NOT inflate Alice's streak
    localStorage.setItem(
      "quiz_attempts_bob_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );
    localStorage.setItem(
      "quiz_attempts_bob_stacks",
      JSON.stringify([{ score: 8, completedAt: isoOffsetDays(1) }])
    );
    localStorage.setItem(
      "quiz_attempts_bob_queues",
      JSON.stringify([{ score: 9, completedAt: isoOffsetDays(2) }])
    );

    render(<TestComponent />);

    // Alice's streak should be 1, not 3
    expect(screen.getByTestId("currentStreak").textContent).toBe("1");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("1");
  });

  // ── 3. Anonymous fallback — scans all keys when no user is logged in ──────

  test("falls back to scanning all quiz_attempts_* keys when getUserId returns null", () => {
    // No user logged in
    mockGetUserId.mockReturnValue(null);

    // Keys from different "users" — all should be counted in anonymous mode
    localStorage.setItem(
      "quiz_attempts_alice_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );
    localStorage.setItem(
      "quiz_attempts_bob_stacks",
      JSON.stringify([{ score: 8, completedAt: isoOffsetDays(1) }])
    );

    render(<TestComponent />);

    // Anonymous mode merges all keys — 2 distinct days
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("2");
    expect(screen.getByTestId("currentStreak").textContent).toBe("2");
    expect(screen.getByTestId("practicedToday").textContent).toBe("true");
  });

  // ── 4. Multi-day streak (authenticated) ──────────────────────────────────

  test("calculates multi-day streak for authenticated user across consecutive days", () => {
    mockGetUserId.mockReturnValue("u1");

    localStorage.setItem(
      "quiz_attempts_u1_arrays",
      JSON.stringify([{ score: 10, completedAt: isoToday() }])
    );
    localStorage.setItem(
      "quiz_attempts_u1_stacks",
      JSON.stringify([{ score: 8, completedAt: isoOffsetDays(1) }])
    );
    localStorage.setItem(
      "quiz_attempts_u1_queues",
      JSON.stringify([{ score: 9, completedAt: isoOffsetDays(2) }])
    );

    render(<TestComponent />);
    expect(screen.getByTestId("currentStreak").textContent).toBe("3");
    expect(screen.getByTestId("longestStreak").textContent).toBe("3");
    expect(screen.getByTestId("totalActiveDays").textContent).toBe("3");
    expect(screen.getByTestId("practicedToday").textContent).toBe("true");
    expect(screen.getByTestId("last7Days").textContent).toBe("0,0,0,0,1,1,1");
  });
});
