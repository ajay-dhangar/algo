import React from "react";
import { render, screen, fireEvent } from "../testUtils";
import DailyChallengeWidget from "../../components/DailyChallengeWidget";

const STORAGE_KEY = "daily_challenge_status";

/** Returns a local "YYYY-MM-DD" key for the given date. */
const dateKeyFor = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Returns a date shifted `n` days before today. */
const daysAgo = (n: number) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

describe("DailyChallengeWidget", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("starts unsolved when nothing is stored", async () => {
    render(<DailyChallengeWidget />);
    expect(
      await screen.findByRole("button", { name: "Mark as solved" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Solved" })).not.toBeInTheDocument();
  });

  test("marking solved persists a date-scoped status", async () => {
    render(<DailyChallengeWidget />);
    const button = await screen.findByRole("button", { name: "Mark as solved" });
    fireEvent.click(button);

    expect(screen.getByRole("button", { name: "Solved" })).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.date).toBe(dateKeyFor(new Date()));
    expect(stored.status).toBe("solved");
  });

  test("rehydrates the solved status for today only", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: dateKeyFor(new Date()), status: "solved" })
    );

    render(<DailyChallengeWidget />);
    expect(await screen.findByRole("button", { name: "Solved" })).toBeInTheDocument();
  });

  test("a solved status from a previous day does not leak into today", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: dateKeyFor(daysAgo(1)), status: "solved" })
    );

    render(<DailyChallengeWidget />);
    expect(
      await screen.findByRole("button", { name: "Mark as solved" })
    ).toBeInTheDocument();
  });

  test("legacy plain solved string is treated as stale", async () => {
    localStorage.setItem(STORAGE_KEY, "solved");

    render(<DailyChallengeWidget />);
    expect(
      await screen.findByRole("button", { name: "Mark as solved" })
    ).toBeInTheDocument();
  });
});
