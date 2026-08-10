import React from "react";
import { render, screen } from "../testUtils";
import userEvent from "@testing-library/user-event";
import ChallengeSearchModal from "../../components/ChallengeSearchModal";

jest.mock("../../data/challengeData", () => [
  {
    title: "Search in Rotated Search Array",
    description: "Practice binary search on a rotated sorted search array.",
    link: "/challenges/search-in-rotated-search-array",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["search"],
  },
  {
    title: "Binary Search Tree Traversal",
    description: "Traverse a binary search tree.",
    link: "/challenges/bst-traversal",
    difficulty: "Easy",
    category: "Trees",
    tags: ["search"],
  },
]);

describe("ChallengeSearchModal highlight()", () => {
  test("wraps every repeated match in <mark>, not just alternating ones", async () => {
    const user = userEvent.setup();
    render(<ChallengeSearchModal isOpen={true} onClose={jest.fn()} />);

    const input = screen.getByPlaceholderText(/search challenges/i);
    await user.type(input, "search");

    // The first result's title, "Search in Rotated Search Array", contains
    // the query "search" TWICE (case-insensitively). Both occurrences must
    // be highlighted — with the old regex.test()-in-a-loop bug, only every
    // other occurrence (in the worst case) would get wrapped in <mark>.
    const marks = document.querySelectorAll("mark");
    const searchMarks = Array.from(marks).filter(
      (el) => el.textContent?.toLowerCase() === "search"
    );

    expect(searchMarks.length).toBeGreaterThanOrEqual(2);
    searchMarks.forEach((el) => {
      expect(el.textContent?.toLowerCase()).toBe("search");
    });
  });
});
