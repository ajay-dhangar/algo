export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  link: string;
  topic: string;
}

const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Find two values that add up to the target with a fast hash-map approach.",
    difficulty: "Easy",
    tags: ["Hash Table", "Array"],
    link: "https://leetcode.com/problems/two-sum/",
    topic: "Arrays",
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    description: "Check whether a string reads the same forwards and backwards, ignoring non-alphanumeric characters.",
    difficulty: "Easy",
    tags: ["Two Pointers", "String"],
    link: "https://leetcode.com/problems/valid-palindrome/",
    topic: "Strings",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Locate a target value efficiently by halving the search space each step.",
    difficulty: "Easy",
    tags: ["Binary Search", "Array"],
    link: "https://leetcode.com/problems/binary-search/",
    topic: "Binary Search",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    description: "Use two pointers to find the maximum area between vertical lines.",
    difficulty: "Medium",
    tags: ["Two Pointers", "Array"],
    link: "https://leetcode.com/problems/container-with-most-water/",
    topic: "Two Pointers",
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    description: "Slide a window across the string and keep track of the longest unique segment.",
    difficulty: "Medium",
    tags: ["Sliding Window", "String"],
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    topic: "Sliding Window",
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    description: "Traverse a tree level by level and collect each row in order.",
    difficulty: "Medium",
    tags: ["Tree", "BFS"],
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    topic: "Binary Tree",
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    description: "Merge multiple sorted linked lists efficiently using a priority queue.",
    difficulty: "Hard",
    tags: ["Heap", "Linked List"],
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    topic: "Linked List",
  },
];

export function getDailyChallenge(date: Date = new Date()): DailyChallenge {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}
