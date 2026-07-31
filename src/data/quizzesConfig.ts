export interface QuizCardConfig {
  id: string;
  title: string;
  category: "Linear" | "Non-Linear" | "Balanced Tree" | "Disk Storage";
  description: string;
  path: string;
  questionCount: number;
}

// Source of truth for every quiz's id, title, and route. Originally lived
// only inside src/pages/quizzes/index.tsx — extracted here so it can be
// reused by src/pages/dashboard (weak topics) without duplicating this list.
export const QUIZZES_CONFIG: QuizCardConfig[] = [
  { id: "arrays",          title: "Quiz on Arrays",                  category: "Linear",        description: "Evaluate your foundational knowledge on sequential storage, index shifting, allocation footprints, and contiguous multi-dimensional matrices.", path: "/quizzes/arrays",          questionCount: 10 },
  { id: "stacks",          title: "Quiz on Stacks",                  category: "Linear",        description: "Analyze LIFO processing infrastructure, recursion execution flow behaviors, frame call stacks, and parentheses balancing validation rules.", path: "/quizzes/stack",           questionCount: 8  },
  { id: "queues",          title: "Quiz on Queues",                  category: "Linear",        description: "Challenge your skills on asynchronous FIFO task piping, sliding window architectures, priority schedulers, and circular double-ended buffers.", path: "/quizzes/queue",           questionCount: 16 },
  { id: "linked-lists",    title: "Quiz on Linked Lists",            category: "Linear",        description: "Test your grasp of singly, doubly, and circular linked list structures, pointer-based operations, and traversal/complexity trade-offs.", path: "/quizzes/linked-list",     questionCount: 12 },
  { id: "deques",          title: "Quiz on Deques",                  category: "Linear",        description: "Evaluate your understanding of double-ended queue operations, sliding window applications, and front/rear insertion-deletion complexity.", path: "/quizzes/deque",           questionCount: 12 },
  { id: "priority-queues", title: "Quiz on Priority Queues",         category: "Linear",        description: "Test your knowledge of heap-based priority scheduling, min/max-heap operations, and real-world applications like Dijkstra's algorithm.", path: "/quizzes/priority-queue",  questionCount: 12 },
  { id: "linear-search",   title: "Quiz on Linear Search",           category: "Linear",        description: "Assess your understanding of sequential search mechanics, best/average/worst case analysis, and when linear search is the right tool.", path: "/quizzes/linear-search",   questionCount: 12 },
  { id: "sorting",         title: "Quiz on Sorting Algorithms",      category: "Linear",        description: "Challenge your sorting skills: stability behaviors, complexity bounds (best/average/worst cases), in-place operations, and hybrid algorithms.", path: "/quizzes/sorting",         questionCount: 12 },
  { id: "recursion",       title: "Quiz on Recursion Fundamentals",  category: "Linear",        description: "Examine call stack behavior, base and recursive case design, and the time/space complexity implications of recursive algorithms.", path: "/quizzes/recursion",        questionCount: 12 },
  { id: "binary-trees",    title: "Quiz on Binary Trees",            category: "Non-Linear",    description: "Test your parsing logic across hierarchical node trees, DFS/BFS traversal sequences, depth diagnostics, and structural serialization patterns.", path: "/quizzes/binary-tree",     questionCount: 12 },
  { id: "bst",             title: "Quiz on Binary Search Trees",     category: "Non-Linear",    description: "Review specific sorting properties, target node deletion edge-cases, inline predecessor tracking, and computational lookup bounds.", path: "/quizzes/binary-search-tree", questionCount: 10 },
  { id: "graphs",          title: "Quiz on Graphs",                  category: "Non-Linear",    description: "Test your knowledge of graph types, vertex/edge terminology, adjacency representations, BFS, DFS traversal algorithms, and real-world applications.", path: "/quizzes/graph",           questionCount: 12 },
  { id: "avl-trees",       title: "Quiz on AVL Trees",               category: "Balanced Tree", description: "Examine self-balancing data structures, compute strict height imbalance factors, and trace complex Single/Double node rotation loops.", path: "/quizzes/avl-tree",        questionCount: 8  },
  { id: "red-black-trees", title: "Quiz on Red-Black Trees",         category: "Balanced Tree", description: "Test your understanding of strict node coloring rules, balancing bounds during insertions, recoloring mechanisms, and rotation limits.", path: "/quizzes/red-black-tree",  questionCount: 8  },
  { id: "b-trees",         title: "Quiz on B-Trees",                 category: "Disk Storage",  description: "Evaluate external indexing structures, block storage node split workflows, high fan-out properties, and direct multi-way search trees.", path: "/quizzes/b-tree",          questionCount: 10 },
  { id: "bplus-trees",     title: "Quiz on B+ Trees",                category: "Disk Storage",  description: "Test your knowledge of internal vs leaf node organization, range queries, linked leaf nodes, and database indexing applications.", path: "/quizzes/bplus-tree",      questionCount: 12 },
  { id: "isam",            title: "Quiz on ISAM",                    category: "Disk Storage",  description: "Evaluate static indexing concepts, overflow pages, search performance trade-offs, and how ISAM compares to dynamic B-Tree structures.", path: "/quizzes/isam",            questionCount: 12 },
  { id: "hash-indexing",   title: "Quiz on Hash Indexing",           category: "Disk Storage",  description: "Test your understanding of static and dynamic hashing, extendible and linear hashing, and collision handling techniques.", path: "/quizzes/hash-indexing",   questionCount: 12 },
  { id: "external-hashing",title: "Quiz on External Hashing",        category: "Disk Storage",  description: "Assess your knowledge of bucket organization, disk block management, overflow handling, and disk-based performance analysis.", path: "/quizzes/external-hashing", questionCount: 12 },
];

export const QUESTION_COUNTS: Record<string, number> = Object.fromEntries(
  QUIZZES_CONFIG.map((q) => [q.id, q.questionCount]),
);

export const QUIZ_IDS: string[] = QUIZZES_CONFIG.map((q) => q.id);
