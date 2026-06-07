import React, { useState, useEffect, useMemo } from "react";
import Link from "@docusaurus/Link";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";

// ─── Types ───────────────────────────────────────────────────────────

interface Section {
  name: string;
  topics: string[];
}

interface Stage {
  id: number;
  title: string;
  tagline: string;
  sections: Section[];
  studyLinks?: { label: string; url: string }[];
}

// ─── Data ────────────────────────────────────────────────────────────

const STAGES: Stage[] = [
  {
    id: 1,
    title: "Foundations",
    tagline: "Understand how data lives in memory",
    studyLinks: [
      { label: "What is DSA?", url: "./what-is-dsa" },
      { label: "Arrays", url: "../basic-data-structures/array/arrays-dsa" },
      { label: "Recursion", url: "../extra/Recursion/recursion" },
    ],
    sections: [
      {
        name: "Arrays",
        topics: [
          "How arrays are stored in memory (contiguous blocks)",
          "Declaring, accessing, inserting, deleting elements",
          "Traversal — linear scan, reverse traversal",
          "Common patterns: frequency count, prefix sum, kadane's algorithm",
          "2D arrays / matrices — row-major traversal, diagonal traversal",
        ],
      },
      {
        name: "Strings",
        topics: [
          "Strings as character arrays, immutability concept",
          "Traversal, reversal, palindrome check",
          "Substring & subsequence — difference matters",
          "Character frequency maps (using hash maps)",
          "String comparison, anagram detection",
        ],
      },
      {
        name: "Recursion",
        topics: [
          "What is a call stack — visualize it",
          "Base case vs recursive case",
          "Simple examples: factorial, fibonacci, power(x,n)",
          "Recursion on arrays: sum, max, reverse",
          "Recursion tree — how to draw and analyze one",
        ],
      },
      {
        name: "Complexity Analysis",
        topics: [
          "Big O, Big Omega, Big Theta — what they mean intuitively",
          "Analyzing loops: O(n), O(n²), O(log n)",
          "Space complexity — stack frames, auxiliary arrays",
          "Comparing brute-force vs optimized for the same problem",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Core Patterns",
    tagline: "The techniques that replace brute-force",
    studyLinks: [
      { label: "Two Pointers", url: "../extra/algorithms/Two-Pointers/introduction-to-two-pointers" },
      { label: "Sliding Window", url: "../extra/Sliding-Window/introduction-to-sliding-window" },
      { label: "Hashing", url: "../extra/Hashing/what-is-hashing" },
    ],
    sections: [
      {
        name: "Hashing",
        topics: [
          "Hash maps & hash sets — when and why",
          "Counting frequencies in O(n)",
          "Two-sum pattern using hash map",
          "Detecting duplicates, finding intersections",
          "Hash collisions — what they are (conceptual)",
        ],
      },
      {
        name: "Two Pointers",
        topics: [
          "Opposite-end pointers (sorted array pair sum)",
          "Same-direction pointers (remove duplicates in-place)",
          "Fast & slow pointer (linked list cycle, middle element)",
          "Three-pointer problems (3Sum, Dutch National Flag)",
        ],
      },
      {
        name: "Sliding Window",
        topics: [
          "Fixed-size window — max sum of subarray of size k",
          "Variable-size window — smallest subarray with sum ≥ target",
          "Window with hash map — longest substring without repeating chars",
          "When to shrink vs expand the window",
        ],
      },
      {
        name: "Prefix Sum & Difference Array",
        topics: [
          "Building a prefix sum array",
          "Range sum queries in O(1)",
          "Subarray sum equals K (prefix sum + hash map combo)",
          "Difference array for range update operations",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Linear Data Structures",
    tagline: "Ordering, pointers, and LIFO/FIFO",
    studyLinks: [
      { label: "Linked List", url: "../../category/linked-list" },
      { label: "Stacks", url: "../../category/stacks" },
      { label: "Queue", url: "../../category/queue" },
    ],
    sections: [
      {
        name: "Linked List",
        topics: [
          "Singly linked list — insert, delete, traverse",
          "Doubly linked list — when you need backward traversal",
          "Reverse a linked list (iterative + recursive)",
          "Detect cycle (Floyd's tortoise & hare)",
          "Merge two sorted linked lists",
          "Find nth node from end (two-pointer trick)",
        ],
      },
      {
        name: "Stack",
        topics: [
          "Push, pop, peek — LIFO principle",
          "Valid parentheses / balanced brackets",
          "Next greater element (monotonic stack)",
          "Evaluate postfix expressions",
          "Min stack — O(1) getMin",
          "Trapping rain water, largest rectangle in histogram",
        ],
      },
      {
        name: "Queue",
        topics: [
          "Enqueue, dequeue — FIFO principle",
          "Circular queue implementation",
          "Deque (double-ended queue) — sliding window maximum",
          "Queue using two stacks",
          "BFS uses a queue — preview for graphs",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Trees",
    tagline: "Hierarchies, recursion in action",
    studyLinks: [
      { label: "Binary Tree", url: "../extra/Trees/binary-tree" },
      { label: "Trie", url: "../extra/Tries/tries-theory" },
      { label: "Heap", url: "../extra/heap/heap-basics" },
    ],
    sections: [
      {
        name: "Binary Trees",
        topics: [
          "Nodes, edges, root, leaf, depth, height",
          "Inorder, preorder, postorder traversal (recursive)",
          "Level-order traversal (BFS with queue)",
          "Height of tree, diameter, max path sum",
          "Symmetric tree, mirror/invert a tree",
          "Lowest Common Ancestor (LCA)",
          "Zigzag / spiral order traversal",
          "Construct tree from inorder + preorder",
        ],
      },
      {
        name: "Binary Search Tree (BST)",
        topics: [
          "BST property — left < root < right",
          "Search, insert, delete in BST",
          "Validate BST (inorder should be sorted)",
          "Kth smallest element in BST",
          "BST from sorted array",
        ],
      },
      {
        name: "Heap / Priority Queue",
        topics: [
          "Min-heap, max-heap — what they guarantee",
          "Heapify, insert, extract-min/max — O(log n)",
          "Kth largest/smallest element",
          "Merge K sorted lists using min-heap",
          "Top-K frequent elements",
          "Heap sort — how it works",
        ],
      },
      {
        name: "Trie (Prefix Tree)",
        topics: [
          "Trie structure — each node is a character",
          "Insert, search, startsWith operations",
          "Autocomplete / prefix matching",
          "Word search in a board (trie + backtracking)",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Searching & Sorting",
    tagline: "Divide, conquer, and find things fast",
    studyLinks: [
      { label: "Binary Search", url: "../extra/algorithms/Searching Algorithms/BinarySearch" },
      { label: "Sorting", url: "../../category/sorting-algorithms" },
    ],
    sections: [
      {
        name: "Binary Search",
        topics: [
          "Classic binary search on sorted array",
          "Lower bound, upper bound — careful with boundaries",
          "Search in rotated sorted array",
          "Find peak element",
          "Binary search on answer (min/max optimization)",
          "Median of two sorted arrays",
          "Allocate minimum pages / split array largest sum",
        ],
      },
      {
        name: "Sorting Algorithms",
        topics: [
          "Bubble, selection, insertion — O(n²) but know them",
          "Merge sort — divide & conquer, stable, O(n log n)",
          "Quick sort — partition logic, average O(n log n)",
          "Counting sort, radix sort — when to use O(n) sorts",
          "Custom comparators for sorting objects",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Greedy & Backtracking",
    tagline: "Local choices and exhaustive exploration",
    studyLinks: [
      { label: "Greedy Theory", url: "../extra/algorithms/greedy-algorithms/greedy-theory" },
      { label: "Backtracking", url: "../../category/backtracking-algorithms" },
    ],
    sections: [
      {
        name: "Greedy Algorithms",
        topics: [
          "Greedy choice property — when greedy works",
          "Activity selection / meeting rooms",
          "Fractional knapsack",
          "Jump game — can you reach the end?",
          "Huffman encoding (conceptual)",
          "Minimum platforms / intervals overlap",
        ],
      },
      {
        name: "Backtracking",
        topics: [
          "Template: choose → explore → unchoose",
          "Generate all subsets, all permutations",
          "N-Queens problem",
          "Sudoku solver",
          "Word search on a grid",
          "Combination sum (with and without repetition)",
          "Pruning — how to cut bad branches early",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Dynamic Programming",
    tagline: "Overlapping subproblems, optimal substructure",
    studyLinks: [
      { label: "Identify DP Problems", url: "../extra/dynamic-programming/how-to-identify" },
    ],
    sections: [
      {
        name: "DP Fundamentals",
        topics: [
          "When to use DP — overlapping subproblems + optimal substructure",
          "Top-down (memoization) vs bottom-up (tabulation)",
          "State definition — the hardest part",
          "Fibonacci, climbing stairs — your first DP problems",
        ],
      },
      {
        name: "1-D DP",
        topics: [
          "House robber (can't pick adjacent)",
          "Coin change — minimum coins to make amount",
          "Longest increasing subsequence (LIS)",
          "Decode ways",
          "Word break",
          "Maximum product subarray",
        ],
      },
      {
        name: "2-D DP",
        topics: [
          "Grid paths — unique paths with obstacles",
          "Longest common subsequence (LCS)",
          "Edit distance (Levenshtein)",
          "0/1 Knapsack",
          "Partition equal subset sum",
          "Longest palindromic subsequence",
        ],
      },
      {
        name: "DP on Other Structures",
        topics: [
          "DP on trees — max path sum, house robber III",
          "DP on strings — wildcard matching, regex matching",
          "Interval DP — matrix chain multiplication, burst balloons",
          "Bitmask DP — travelling salesman (intro level)",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Graphs",
    tagline: "Networks, paths, and connected components",
    studyLinks: [
      { label: "Adjacency List", url: "../extra/graphs/Adjacency-List" },
      { label: "BFS", url: "../extra/graphs/bfs" },
      { label: "Dijkstra", url: "../extra/graphs/shortest-path-algorithms/dijkstra-algorithm" },
    ],
    sections: [
      {
        name: "Graph Basics",
        topics: [
          "Vertices & edges, directed vs undirected",
          "Adjacency list vs adjacency matrix — tradeoffs",
          "Weighted vs unweighted graphs",
          "Convert edge list → adjacency list (must know)",
        ],
      },
      {
        name: "Traversals",
        topics: [
          "BFS — level-by-level, uses queue, shortest path in unweighted",
          "DFS — goes deep first, uses stack/recursion",
          "Connected components (DFS/BFS on unvisited nodes)",
          "Cycle detection — directed (DFS coloring) & undirected",
          "Topological sort — prerequisites, build order",
        ],
      },
      {
        name: "Shortest Path Algorithms",
        topics: [
          "Dijkstra's — non-negative weights, priority queue",
          "Bellman-Ford — handles negative weights",
          "Floyd-Warshall — all pairs shortest path",
          "0-1 BFS — edge weights are only 0 or 1",
        ],
      },
      {
        name: "Advanced Graph",
        topics: [
          "Union-Find / DSU — connected components efficiently",
          "Kruskal's & Prim's — minimum spanning tree",
          "Bridges & articulation points (Tarjan's)",
          "Strongly connected components",
          "Bipartite graph check",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Bit Manipulation & Math",
    tagline: "Low-level tricks and number theory",
    studyLinks: [
      { label: "Bit Manipulation", url: "../../category/bit-manipulation" },
    ],
    sections: [
      {
        name: "Bit Manipulation",
        topics: [
          "AND, OR, XOR, NOT, left shift, right shift",
          "Check if number is power of 2",
          "Count set bits (Brian Kernighan's)",
          "Single number — XOR trick",
          "Subsets generation using bitmask",
        ],
      },
      {
        name: "Math & Number Theory",
        topics: [
          "GCD (Euclidean algorithm), LCM",
          "Sieve of Eratosthenes — find all primes up to n",
          "Modular arithmetic — why (a*b) % MOD matters in CP",
          "Fast exponentiation — power(x, n) in O(log n)",
          "Combinatorics basics — nCr, Pascal's triangle",
        ],
      },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────

const SectionBlock: React.FC<{
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, isOpen, onToggle }) => (
  <div style={{ marginBottom: 6 }}>
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 600,
        color: isOpen ? "var(--ifm-color-primary)" : "var(--ifm-font-color-base)",
        background: isOpen
          ? "var(--ifm-color-primary-lightest)"
          : "var(--ifm-background-surface-color)",
      }}
    >
      <span>{section.name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            opacity: 0.5,
            fontWeight: 500,
          }}
        >
          {section.topics.length} topics
        </span>
        <FaChevronDown
          style={{
            fontSize: 9,
            opacity: 0.4,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
    </button>
    <div
      style={{
        maxHeight: isOpen ? section.topics.length * 48 + 32 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ padding: "8px 16px 4px" }}>
        {section.topics.map((topic, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "6px 0",
            }}
          >
            <span
              style={{
                marginTop: 7,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--ifm-color-emphasis-400)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "var(--ifm-font-color-secondary)",
                lineHeight: 1.55,
              }}
            >
              {topic}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────

const DSALearningRoadmap: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

  // Persist completion state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_learning_roadmap_completed");
      if (saved) setCompletedStages(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "dsa_learning_roadmap_completed",
        JSON.stringify([...completedStages])
      );
    } catch {}
  }, [completedStages]);

  const toggleStage = (id: number) => {
    setExpandedStage(expandedStage === id ? null : id);
    setExpandedSections(new Set());
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedStages((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const progress = Math.round((completedStages.size / STAGES.length) * 100);
  const totalTopics = useMemo(
    () => STAGES.reduce((sum, s) => sum + s.sections.reduce((ss, sec) => ss + sec.topics.length, 0), 0),
    []
  );

  return (
    <div style={{ margin: "32px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--ifm-color-primary-lightest)",
            color: "var(--ifm-color-primary-dark)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "monospace",
            padding: "4px 14px",
            borderRadius: 100,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {STAGES.length} Stages · {STAGES.reduce((s, st) => s + st.sections.length, 0)} Sections · {totalTopics} Topics
        </span>
        <h2
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 800,
            margin: "0 0 8px",
            color: "var(--ifm-heading-color)",
          }}
        >
          The Complete DSA Roadmap
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--ifm-font-color-secondary)",
            maxWidth: 480,
            margin: "0 auto 20px",
            lineHeight: 1.6,
          }}
        >
          Everything you need to learn, in the exact order you should learn it.
          No guessing, no jumping around. Open any stage to see every topic inside.
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: 340, margin: "0 auto" }}>
          <div
            style={{
              background: "var(--ifm-color-emphasis-200)",
              borderRadius: 100,
              height: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 100,
                background: "var(--ifm-color-primary)",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--ifm-font-color-secondary)",
              marginTop: 6,
              opacity: 0.7,
            }}
          >
            {completedStages.size} of {STAGES.length} stages complete — {progress}%
          </p>
        </div>
      </div>

      {/* Roadmap cards */}
      <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
        {/* Vertical dashed line */}
        <div
          style={{
            position: "absolute",
            left: 21,
            top: 0,
            bottom: 0,
            width: 3,
            borderRadius: 4,
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--ifm-color-emphasis-300) 0px, var(--ifm-color-emphasis-300) 6px, transparent 6px, transparent 14px)",
          }}
        />

        {STAGES.map((stage) => {
          const isOpen = expandedStage === stage.id;
          const isDone = completedStages.has(stage.id);
          const topicCount = stage.sections.reduce((s, sec) => s + sec.topics.length, 0);

          return (
            <div
              key={stage.id}
              style={{ position: "relative", marginBottom: 14, paddingLeft: 54 }}
            >
              {/* Timeline node */}
              <div
                style={{
                  position: "absolute",
                  left: 9,
                  top: 16,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  zIndex: 2,
                  transition: "all 0.2s ease",
                  border: `3px solid ${
                    isDone
                      ? "var(--ifm-color-primary)"
                      : isOpen
                      ? "var(--ifm-color-primary)"
                      : "var(--ifm-color-emphasis-300)"
                  }`,
                  background: isDone
                    ? "var(--ifm-color-primary)"
                    : "var(--ifm-background-color)",
                  color: isDone
                    ? "#fff"
                    : isOpen
                    ? "var(--ifm-color-primary)"
                    : "var(--ifm-color-emphasis-500)",
                }}
              >
                {isDone ? "✓" : stage.id}
              </div>

              {/* Card */}
              <div
                style={{
                  borderRadius: 12,
                  border: `2px solid ${
                    isOpen
                      ? "var(--ifm-color-primary-light)"
                      : "var(--ifm-color-emphasis-300)"
                  }`,
                  background: "var(--ifm-card-background-color, var(--ifm-background-color))",
                  boxShadow: isOpen
                    ? "0 6px 24px rgba(0,0,0,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Header */}
                <div
                  onClick={() => toggleStage(stage.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    cursor: "pointer",
                    gap: 10,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ifm-heading-color)",
                      }}
                    >
                      {stage.title}
                    </h4>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 12,
                        color: "var(--ifm-font-color-secondary)",
                        opacity: 0.7,
                      }}
                    >
                      {stage.tagline}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "monospace",
                        opacity: 0.5,
                      }}
                    >
                      {topicCount} topics
                    </span>
                    <button
                      onClick={(e) => toggleComplete(stage.id, e)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        border: isDone
                          ? "none"
                          : "2px solid var(--ifm-color-emphasis-300)",
                        background: isDone
                          ? "var(--ifm-color-primary)"
                          : "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: isDone ? "#fff" : "transparent",
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                        padding: 0,
                      }}
                    >
                      ✓
                    </button>
                    <FaChevronDown
                      style={{
                        fontSize: 10,
                        opacity: 0.35,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Expanded body */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 16px 16px",
                      borderTop: "1px solid var(--ifm-color-emphasis-200)",
                    }}
                  >
                    <div style={{ paddingTop: 12 }}>
                      {stage.sections.map((sec, si) => {
                        const secKey = `${stage.id}-${si}`;
                        return (
                          <SectionBlock
                            key={secKey}
                            section={sec}
                            isOpen={expandedSections.has(secKey)}
                            onToggle={() => toggleSection(secKey)}
                          />
                        );
                      })}
                    </div>

                    {/* Study links + Next */}
                    <div style={{ marginTop: 14 }}>
                      {stage.studyLinks && stage.studyLinks.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 8,
                          }}
                        >
                          {stage.studyLinks.map((link, li) => (
                            <Link
                              key={li}
                              to={link.url}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 11,
                                fontFamily: "monospace",
                                fontWeight: 600,
                                color: "var(--ifm-color-primary)",
                                background: "var(--ifm-color-primary-lightest)",
                                padding: "5px 12px",
                                borderRadius: 8,
                                border: "1px solid var(--ifm-color-primary-light)",
                                textDecoration: "none",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <FaExternalLinkAlt style={{ fontSize: 8 }} />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {stage.id < STAGES.length && (
                        <div
                          style={{
                            background: "var(--ifm-background-surface-color)",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: 12,
                            color: "var(--ifm-font-color-secondary)",
                          }}
                        >
                          <strong style={{ color: "var(--ifm-font-color-base)" }}>
                            Next →
                          </strong>{" "}
                          {STAGES[stage.id].title} — {STAGES[stage.id].tagline}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 480,
          margin: "36px auto 0",
          textAlign: "center",
          padding: "20px",
          borderRadius: 12,
          border: "2px solid var(--ifm-color-emphasis-200)",
          background: "var(--ifm-background-surface-color)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "var(--ifm-font-color-secondary)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Every topic is here. Every topic has an order. You don't need to look
          anywhere else — just start from Stage 1 and keep going. One topic at a time 💪
        </p>
      </div>
    </div>
  );
};

export default DSALearningRoadmap;