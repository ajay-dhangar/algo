/**
 * Learning Paths Data Structure
 * Defines curated learning paths for different skill levels and goals
 * Each path contains topics with metadata for progression tracking
 */

export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type InterviewRelevance = 1 | 2 | 3 | 4 | 5;

export interface TopicMetadata {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in hours
  prerequisites: string[]; // array of topic IDs
  interviewRelevance: InterviewRelevance; // 1-5 stars
  description: string;
  docLink?: string; // Link to documentation
  icon?: string; // Icon name for visual representation
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon identifier
  color: string; // Tailwind color class
  targetAudience: string;
  totalHours: number;
  topics: TopicMetadata[];
  keyBenefits: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

// ====================
// Topic Definitions
// ====================

const programmingFundamentalsTopics: TopicMetadata[] = [
  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    difficulty: "Easy",
    estimatedTime: 1.5,
    prerequisites: [],
    interviewRelevance: 3,
    description:
      "Learn how to declare and use variables, understand primitive data types and type systems",
    icon: "📦",
    docLink: "/docs/programming-fundamentals/language-syntax/variables",
  },
  {
    id: "operators",
    title: "Operators",
    difficulty: "Easy",
    estimatedTime: 1,
    prerequisites: ["variables-data-types"],
    interviewRelevance: 2,
    description:
      "Master arithmetic, logical, and comparison operators for building expressions",
    icon: "➕",
    docLink: "/docs/programming-fundamentals/language-syntax/operators",
  },
  {
    id: "control-flow",
    title: "Control Flow (If/Else, Loops)",
    difficulty: "Easy",
    estimatedTime: 2,
    prerequisites: ["operators"],
    interviewRelevance: 4,
    description:
      "Understand conditional statements and loops for program flow control",
    icon: "🔄",
    docLink: "/docs/programming-fundamentals/language-syntax/conditionals",
  },
  {
    id: "functions",
    title: "Functions & Methods",
    difficulty: "Easy",
    estimatedTime: 2,
    prerequisites: ["control-flow"],
    interviewRelevance: 5,
    description:
      "Learn to write reusable code blocks, understand scope and parameter passing",
    icon: "🔧",
    docLink: "/docs/programming-fundamentals/language-syntax/functions",
  },
  {
    id: "arrays",
    title: "Arrays",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["functions"],
    interviewRelevance: 5,
    description:
      "Work with ordered collections, array operations, and indexing",
    icon: "📋",
    docLink: "/docs/programming-fundamentals/language-syntax/arrays",
  },
  {
    id: "strings",
    title: "Strings",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays"],
    interviewRelevance: 4,
    description:
      "Master string manipulation, common operations, and pattern matching",
    icon: "📝",
    docLink: "/docs/programming-fundamentals/language-syntax/strings",
  },
  {
    id: "basic-problem-solving",
    title: "Basic Problem Solving",
    difficulty: "Medium",
    estimatedTime: 3,
    prerequisites: ["arrays", "strings", "functions"],
    interviewRelevance: 4,
    description:
      "Apply fundamentals to solve real-world programming problems",
    icon: "💡",
    docLink:  "/docs/category/programming-fundamentals/",
  },
];

const dsaFundamentalsTopics: TopicMetadata[] = [
  {
    id: "time-complexity",
    title: "Time Complexity & Big O",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["basic-problem-solving"],
    interviewRelevance: 5,
    description:
      "Understand algorithm efficiency, time complexity analysis, and Big O notation",
    icon: "⏱️",
    docLink: "/docs/data-structures/types-of-dsa",
  },
  {
    id: "space-complexity",
    title: "Space Complexity",
    difficulty: "Medium",
    estimatedTime: 1,
    prerequisites: ["time-complexity"],
    interviewRelevance: 4,
    description:
      "Learn memory usage analysis and optimization techniques",
    icon: "💾",
    docLink: "/docs/data-structures/types-of-dsa",
  },
  {
    id: "arrays-dsa",
    title: "Arrays (DSA Focus)",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["time-complexity"],
    interviewRelevance: 5,
    description:
      "Array manipulation, searching, sorting, and classic problems",
    icon: "📊",
    docLink: "/docs/basic-data-structures/array",
  },
  {
    id: "strings-dsa",
    title: "Strings (DSA Focus)",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 5,
    description:
      "String algorithms, pattern matching, and text processing",
    icon: "🔤",
    docLink: "/docs/basic-data-structures/Strings",
  },
    {
    id: "pointers",
    title: "Pointers & References",
    difficulty: "Medium",
    estimatedTime: 1.5,
    prerequisites: ["variables-data-types"],
    interviewRelevance: 4,
    description:
      "Master pointer concepts essential for linked lists and advanced DS",
    icon: "👉",
    docLink: "/docs/basic-data-structures/pointer",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    difficulty: "Medium",
    estimatedTime: 2.5,
    prerequisites: ["pointers"],
    interviewRelevance: 5,
    description:
      "Understand singly/doubly linked lists, operations, and common problems",
    icon: "🔗",
    docLink: "/docs/data-structures",
  },
  {
    id: "stack",
    title: "Stack",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 4,
    description:
      "LIFO data structure, stack operations, and applications",
    icon: "📚",
    docLink: "/docs/data-structures",
  },
  {
    id: "queue",
    title: "Queue",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 4,
    description:
      "FIFO data structure, queue types, and practical applications",
    icon: "🎯",
    docLink: "/docs/data-structures",
  },
  {
    id: "hashing",
    title: "Hashing & Hash Tables",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 5,
    description:
      "Hash functions, collision handling, and hash map implementations",
    icon: "#️⃣",
    docLink: "/docs/data-structures",
  },
];

const placementPrepTopics: TopicMetadata[] = [
  {
    id: "recursion",
    title: "Recursion",
    difficulty: "Medium",
    estimatedTime: 2.5,
    prerequisites: ["functions"],
    interviewRelevance: 5,
    description:
      "Understand recursion, base cases, and recursive problem-solving",
    icon: "🔁",
    docLink: "/docs/dsa-problems",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Medium",
    estimatedTime: 1.5,
    prerequisites: ["time-complexity"],
    interviewRelevance: 5,
    description:
      "Essential searching algorithm for sorted data, common interview topic",
    icon: "🔍",
    docLink: "/docs/dsa-problems/binary-search",
  },
  {
    id: "two-pointers",
    title: "Two Pointers Technique",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 5,
    description:
      "Powerful technique for array problems, reduces time complexity",
    icon: "👈👉",
    docLink: "/docs/dsa-problems",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    difficulty: "Medium",
    estimatedTime: 2,
    prerequisites: ["arrays-dsa"],
    interviewRelevance: 5,
    description:
      "Optimize substring/subarray problems with sliding window pattern",
    icon: "🪟",
    docLink: "/docs/dsa-problems",
  },
  {
    id: "trees",
    title: "Trees & Binary Trees",
    difficulty: "Hard",
    estimatedTime: 5,
    prerequisites: ["recursion", "linked-lists"],
    interviewRelevance: 5,
    description:
      "Tree structure, traversals, BST, and tree-based problems",
    icon: "🌳",
    docLink: "/docs/data-structures",
  },
  {
    id: "graphs",
    title: "Graphs & Graph Algorithms",
    difficulty: "Hard",
    estimatedTime: 6,
    prerequisites: ["trees", "queue"],
    interviewRelevance: 5,
    description:
      "Graph representation, BFS, DFS, and advanced graph algorithms",
    icon: "🔗🔗",
    docLink: "/docs/graphs",
  },
  {
    id: "heap",
    title: "Heap & Priority Queue",
    difficulty: "Hard",
    estimatedTime: 3,
    prerequisites: ["trees"],
    interviewRelevance: 4,
    description:
      "Min/Max heap, heap operations, and heap-based problems",
    icon: "⛰️",
    docLink: "/docs/data-structures",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    difficulty: "Hard",
    estimatedTime: 4,
    prerequisites: ["recursion"],
    interviewRelevance: 5,
    description:
      "Memoization, tabulation, and solving complex optimization problems",
    icon: "🎓",
    docLink: "/docs/dsa-problems",
  },
  
];

const competitiveProgrammingTopics: TopicMetadata[] = [
  {
    id: "number-theory",
    title: "Number Theory",
    difficulty: "Hard",
    estimatedTime: 3,
    prerequisites: ["time-complexity"],
    interviewRelevance: 3,
    description:
      "GCD, LCM, primes, modular arithmetic, and number-theoretic algorithms",
    icon: "🔢",
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    difficulty: "Hard",
    estimatedTime: 2.5,
    prerequisites: ["operators"],
    interviewRelevance: 4,
    description:
      "Bitwise operations, bit tricks, and efficient bit-level solutions",
    icon: "🔲",
  },
  {
    id: "segment-tree",
    title: "Segment Tree",
    difficulty: "Hard",
    estimatedTime: 3,
    prerequisites: ["trees", "recursion"],
    interviewRelevance: 2,
    description:
      "Advanced data structure for range queries and updates",
    icon: "📊",
  },
  {
    id: "fenwick-tree",
    title: "Fenwick Tree (BIT)",
    difficulty: "Hard",
    estimatedTime: 2.5,
    prerequisites: ["bit-manipulation"],
    interviewRelevance: 2,
    description:
      "Binary Indexed Tree for efficient range sum queries",
    icon: "🌲",
  },
  {
    id: "dsu",
    title: "Disjoint Set Union (DSU)",
    difficulty: "Hard",
    estimatedTime: 2,
    prerequisites: ["graphs"],
    interviewRelevance: 3,
    description:
      "Union-Find data structure for connectivity problems",
    icon: "🔀",
  },
  {
    id: "advanced-graphs",
    title: "Advanced Graph Algorithms",
    difficulty: "Hard",
    estimatedTime: 4,
    prerequisites: ["graphs"],
    interviewRelevance: 3,
    description:
      "Shortest paths, MST, flow algorithms, and graph optimizations",
    icon: "🌐",
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    difficulty: "Hard",
    estimatedTime: 2.5,
    prerequisites: ["dynamic-programming"],
    interviewRelevance: 3,
    description:
      "Greedy strategy for optimization and activity selection problems",
    icon: "🎯",
  },
];

// ====================
// Learning Path Definitions
// ====================

export const learningPaths: LearningPath[] = [
  {
    id: "beginner-programmer",
    name: "Coding Foundations",
    description: "Start your programming journey from scratch with fundamentals to build a robust base in logic.",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    targetAudience: "Absolute beginners with no prior programming experience",
    totalHours: 16,
    difficulty: "Beginner",
    topics: programmingFundamentalsTopics,
    keyBenefits: [
      "Build strong programming fundamentals",
      "Learn problem-solving mindset",
      "Prepare for your DSA journey",
      "Understand code structure and best practices",
    ],
  },
  {
    id: "dsa-fundamentals",
    name: "DSA Mastery",
    description: "Master the essentials of Data Structures & Algorithms to write highly efficient code.",
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
    targetAudience: "Students familiar with coding ready to learn efficiency",
    totalHours: 29,
    difficulty: "Intermediate",
    topics: [
      ...programmingFundamentalsTopics.slice(3), // Skip to functions
      ...dsaFundamentalsTopics,
    ],
    keyBenefits: [
      "Understand algorithm time/space efficiency",
      "Master fundamental data structures",
      "Solve real-world algorithmic problems",
      "Build foundation for advanced technical topics",
    ],
  },
  {
    id: "placement-prep",
    name: "Interview Readiness",
    description: "Targeted practice to crack product-based company interviews with curated problem sheets.",
    icon: "💼",
    color: "from-green-500 to-emerald-500",
    targetAudience: "Job seekers and final-year students preparing for interviews",
    totalHours: 45,
    difficulty: "Advanced",
    topics: [
      ...dsaFundamentalsTopics,
      ...placementPrepTopics,
    ],
    keyBenefits: [
      "Interview-focused topic selection and patterns",
      "High-frequency company interview questions",
      "Time management for live coding interviews",
      "Confidence building for technical screening rounds",
    ],
  },
    
  {
    id: "competitive-programming",
    name: "Competitive Programming",
    description: "Master advanced algorithms and data structures to excel in coding contests.",
    icon: "🏆",
    color: "from-yellow-500 to-orange-500",
    targetAudience: "Advanced programmers and competitive coding aspirants",
    totalHours: 52,
    difficulty: "Advanced",
    topics: [
      ...dsaFundamentalsTopics,
      ...placementPrepTopics,
      ...competitiveProgrammingTopics,
    ],
    keyBenefits: [
      "Master advanced data structures like Segment Trees and Fenwick Trees",
      "Solve complex mathematical and number theory problems",
      "Optimize code to run within strict time limits",
      "Excel in Google Kick Start, Facebook Hacker Cup, and ACM ICPC",
    ],
  },
];


// ====================
// Helper Functions
// ====================

export const getLearningPathById = (id: string): LearningPath | undefined => {
  return learningPaths.find((path) => path.id === id);
};

export const getTopicById = (pathId: string, topicId: string): TopicMetadata | undefined => {
  const path = getLearningPathById(pathId);
  return path?.topics.find((topic) => topic.id === topicId);
};

export const calculateTotalTime = (topics: TopicMetadata[]): number => {
  return topics.reduce((sum, topic) => sum + topic.estimatedTime, 0);
};

export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  const colors: Record<DifficultyLevel, string> = {
    Easy: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    Medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
    Hard: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  };
  return colors[difficulty];
};

export const getRelevanceStars = (relevance: InterviewRelevance): string => {
  return "⭐".repeat(relevance);
};
