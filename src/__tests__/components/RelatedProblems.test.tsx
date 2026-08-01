import {
  getRelatedDsaProblems,
  formatTagLabel,
  DsaProblemsIndexData,
} from "../../components/RelatedProblems";

const mockIndexData: DsaProblemsIndexData = {
  generatedAt: "2026-08-01T00:00:00.000Z",
  count: 4,
  difficulties: ["Easy", "Medium", "Hard"],
  tags: [
    { value: "array", label: "Array" },
    { value: "linked-list", label: "Linked List" },
    { value: "two-pointers", label: "Two Pointers" },
    { value: "dfs", label: "DFS" },
  ],
  companies: [],
  problems: [
    {
      id: "add-two-numbers",
      title: "Add Two Numbers",
      description: "Add two numbers as linked lists",
      difficulty: "Medium",
      tags: ["linked-list"],
      companies: [],
      url: "/docs/dsa-problems/medium/add-two-numbers",
    },
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      description: "Reverse a singly linked list",
      difficulty: "Easy",
      tags: ["linked-list"],
      companies: [],
      url: "/docs/dsa-problems/easy/reverse-linked-list",
    },
    {
      id: "delete-node-linked-list",
      title: "Delete Node in a Linked List",
      description: "Delete node from linked list",
      difficulty: "Medium",
      tags: ["linked-list"],
      companies: [],
      url: "/docs/dsa-problems/medium/delete-node-linked-list",
    },
    {
      id: "two-sum",
      title: "Two Sum",
      description: "Find two indices that sum to target",
      difficulty: "Easy",
      tags: ["array", "two-pointers"],
      companies: [],
      url: "/docs/dsa-problems/easy/two-sum",
    },
  ],
};

describe("RelatedProblems logic", () => {
  test("formatTagLabel formats tag values to human readable labels", () => {
    expect(formatTagLabel("linked-list")).toBe("Linked List");
    expect(formatTagLabel("dfs")).toBe("DFS");
  });

  test("returns empty array for non-DSA problem documents", () => {
    const doc = {
      id: "basic-data-structures/array",
      permalink: "/docs/basic-data-structures/array",
      title: "Arrays in DSA",
    };
    const results = getRelatedDsaProblems(doc, mockIndexData);
    expect(results).toEqual([]);
  });

  test("auto-suggests 2-3 related problems sharing a topic tag", () => {
    const doc = {
      id: "add-two-numbers",
      permalink: "/docs/dsa-problems/medium/add-two-numbers",
      title: "Add Two Numbers",
      tags: ["linked-list"],
    };

    const results = getRelatedDsaProblems(doc, mockIndexData);

    // Should return 2 matching linked-list problems (excluding add-two-numbers itself)
    expect(results.length).toBe(2);

    const ids = results.map((r) => r.problem.id);
    expect(ids).not.toContain("add-two-numbers");
    expect(ids).toContain("delete-node-linked-list");
    expect(ids).toContain("reverse-linked-list");

    // Medium difficulty problem should be ranked higher due to difficulty match bonus
    expect(results[0].problem.id).toBe("delete-node-linked-list");
    expect(results[0].sharedTags).toEqual(["linked-list"]);
  });

  test("respects limit parameter", () => {
    const doc = {
      id: "add-two-numbers",
      permalink: "/docs/dsa-problems/medium/add-two-numbers",
      title: "Add Two Numbers",
    };

    const results = getRelatedDsaProblems(doc, mockIndexData, 1);
    expect(results.length).toBe(1);
  });
});
