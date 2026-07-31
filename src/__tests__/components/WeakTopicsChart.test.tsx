import React from "react";
import { render, screen } from "../testUtils";
import WeakTopicsChart from "../../components/WeakTopicsChart";
import type { WeakTopicEntry } from "../../utils/weakTopics";
import type { QuizStat } from "../../hooks/useQuizProgress";

function makeStat(quizId: string, overrides: Partial<QuizStat> = {}): QuizStat {
  return {
    quizId,
    attempts: [],
    bestScore: 0,
    bestPercent: 0,
    latestScore: 0,
    latestPercent: 0,
    latestAttemptAt: null,
    totalAttempts: 0,
    totalQuestions: 10,
    averagePercent: 0,
    status: "not-started",
    ...overrides,
  };
}

const entries: WeakTopicEntry[] = [
  {
    quiz: { id: "graphs", title: "Quiz on Graphs", category: "Non-Linear", description: "", path: "/quizzes/graph", questionCount: 12 },
    stat: makeStat("graphs", { totalAttempts: 2, bestPercent: 30, status: "in-progress" }),
  },
  {
    quiz: { id: "bst", title: "Quiz on Binary Search Trees", category: "Non-Linear", description: "", path: "/quizzes/binary-search-tree", questionCount: 10 },
    stat: makeStat("bst", { totalAttempts: 0 }),
  },
];

describe("WeakTopicsChart", () => {
  test("renders an empty state when there are no entries", () => {
    render(<WeakTopicsChart entries={[]} />);
    expect(screen.getByText(/no quiz history yet/i)).toBeInTheDocument();
  });

  test("renders a row per topic with score and attempt count", () => {
    render(<WeakTopicsChart entries={entries} />);

    expect(screen.getByText("Graphs")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("2 attempts")).toBeInTheDocument();

    expect(screen.getByText("Binary Search Trees")).toBeInTheDocument();
    expect(screen.getByText("Not attempted yet")).toBeInTheDocument();
  });

  test('renders a "Practice this" link to each quiz path', () => {
    render(<WeakTopicsChart entries={entries} />);

    const links = screen.getAllByRole("link", { name: /practice this/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/quizzes/graph");
    expect(links[1]).toHaveAttribute("href", "/quizzes/binary-search-tree");
  });
});
