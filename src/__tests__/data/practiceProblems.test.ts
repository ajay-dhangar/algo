import { TOPICS } from "../../data/practiceProblems";

const COMPLEXITY_VALUES = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(2^n)"];

interface FlatProblem {
  topic: string;
  difficulty: string;
  title: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

function allProblems(): FlatProblem[] {
  const problems: FlatProblem[] = [];
  for (const [topic, data] of Object.entries(TOPICS)) {
    for (const [difficulty, list] of Object.entries(data.problems)) {
      for (const p of list) {
        problems.push({
          topic,
          difficulty,
          title: p.title,
          timeComplexity: p.timeComplexity,
          spaceComplexity: p.spaceComplexity,
        });
      }
    }
  }
  return problems;
}

function findProblem(title: string): FlatProblem {
  const found = allProblems().find((p) => p.title === title);
  if (!found) {
    throw new Error(`Problem not found in practiceProblems data: ${title}`);
  }
  return found;
}

describe("practiceProblems complexity data", () => {
  test("every problem declares explicit time and space complexity", () => {
    const problems = allProblems();
    expect(problems.length).toBeGreaterThan(100);

    const missing = problems.filter(
      (p) => !p.timeComplexity || !p.spaceComplexity
    );
    expect(missing).toEqual([]);
  });

  test("every declared complexity matches a filter bucket", () => {
    const problems = allProblems();
    for (const p of problems) {
      expect(COMPLEXITY_VALUES).toContain(p.timeComplexity);
      expect(COMPLEXITY_VALUES).toContain(p.spaceComplexity);
    }
  });

  test("problems containing sort-like keywords are not mislabeled O(n log n)", () => {
    const mergeTwoSortedLists = findProblem("Merge Two Sorted Lists");
    expect(mergeTwoSortedLists.timeComplexity).toBe("O(n)");

    const slidingWindowMaximum = findProblem("Sliding Window Maximum");
    expect(slidingWindowMaximum.timeComplexity).toBe("O(n)");

    const addTwoNumbers = findProblem("Add Two Numbers");
    expect(addTwoNumbers.timeComplexity).toBe("O(n)");
  });

  test("well-known binary search problems are labeled O(log n)", () => {
    const medianOfTwoSortedArrays = findProblem("Median of Two Sorted Arrays");
    expect(medianOfTwoSortedArrays.timeComplexity).toBe("O(log n)");

    const searchA2DMatrix = findProblem("Search a 2D Matrix");
    expect(searchA2DMatrix.timeComplexity).toBe("O(log n)");

    const binarySearch = findProblem("Binary Search");
    expect(binarySearch.timeComplexity).toBe("O(log n)");
  });

  test("problems with O(n log n) solutions are not mislabeled by their names", () => {
    const longestIncreasingSubsequence = findProblem("Longest Increasing Subsequence");
    expect(longestIncreasingSubsequence.timeComplexity).toBe("O(n log n)");

    const kthSmallestElementInBST = findProblem("Kth Smallest Element in a BST");
    expect(kthSmallestElementInBST.timeComplexity).toBe("O(n)");

    const verticalOrderTraversal = findProblem("Vertical Order Traversal of a Binary Tree");
    expect(verticalOrderTraversal.timeComplexity).toBe("O(n log n)");
  });
});
