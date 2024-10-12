export interface Topic {
  title: string;
  folders: Folder[];
}

export interface Folder {
  name: string;
  files: string[];
}

export const topics: Topic[] = [
  {
    title: "Pick a Language",
    folders: [
      // JavaScript Language
      {
        name: "JavaScript",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Objects",
          "Classes",
          "Inheritance",
          "Modules",
          "Promises",
          "Async/Await",
        ],
      },
      // Python Language
      {
        name: "Python",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Lists",
          "Dictionaries",
          "Classes",
          "Inheritance",
          "Modules",
          "Decorators",
          "Generators",
        ],
      },
      // Java Language
      {
        name: "Java",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Objects",
          "Classes",
          "Inheritance",
          "Interfaces",
          "Packages",
          "Multithreading",
        ],
      },
      // C++ Language
      {
        name: "C++",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Pointers",
          "Classes",
          "Inheritance",
          "Polymorphism",
          "Templates",
          "STL",
        ],
      },
      // C# Language
      {
        name: "C#",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Objects",
          "Classes",
          "Inheritance",
          "Interfaces",
          "Delegates",
          "Events",
        ],
      },
      // Ruby Language
      {
        name: "Ruby",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Hashes",
          "Classes",
          "Modules",
          "Mixins",
          "Blocks",
          "Procs",
        ],
      },
      // GO Language
      {
        name: "GO",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Structs",
          "Interfaces",
          "Methods",
          "Packages",
          "Concurrency",
          "Channels",
        ],
      },
      //   Rust Language
      {
        name: "Rust",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Arrays",
          "Structs",
          "Enums",
          "Traits",
          "Modules",
          "Concurrency",
          "Ownership",
        ],
      },
    ],
  },
  {
    title: "Programming Fundamentals",
    folders: [
      {
        name: "Language Syntax",
        files: [
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Conditionals",
          "Arrays",
          "Strings",
          "Classes",
          "Objects",
          "Inheritance",
          "Polymorphism",
          "Interfaces",
        ],
      },
      {
        name: "Control Structures",
        files: [
          "If-else",
          "Switch",
          "For Loop",
          "While Loop",
          "Do-While Loop",
          "Break",
          "Continue",
          "Return",
          "Try-Catch",
          "Throw",
          "Finally",
        ],
      },
      {
        name: "Functions",
        files: [
          "Function Declaration",
          "Function Call",
          "Function Parameters",
          "Function Return",
          "Function Scope",
          "Function Overloading",
          "Function Recursion",
          "Function Closures",
          "Function Currying",
          "Function Composition",
          "Function Memoization",
        ],
      },
      {
        name: "OOP Basics",
        files: [
          "Classes",
          "Objects",
          "Inheritance",
          "Polymorphism",
          "Encapsulation",
          "Abstraction",
          "Interfaces",
          "Abstract Classes",
          "Composition",
          "Delegation",
          "Mixins",
        ],
      },
      {
        name: "Pseudo Code",
        files: [
          "Introduction",
          "Variables",
          "Operators",
          "Functions",
          "Loops",
          "Conditionals",
          "Arrays",
          "Strings",
          "Classes",
          "Objects",
          "Inheritance",
          "Polymorphism",
        ],
      },
    ],
  },
  {
    title: "Data Structures",
    folders: [
      {
        name: "Data Structures",
        files: [
          "What are Data Structures?",
          "Importance of Data Structures",
          "Types of Data Structures",
        ],
      },
    ],
  },
  {
    title: "Basic Data Structures",
    folders: [
      {
        name: "Arrays",
        files: [
          "Introduction",
          "Declaration",
          "Initialization",
          "Accessing Elements",
          "Insertion",
          "Deletion",
          "Searching",
          "Sorting",
          "Merging",
          "Reversing",
          "Rotating",
          "Shifting",
        ],
      },
      {
        name: "Linked Lists",
        files: [
          "Introduction",
          "Singly Linked List",
          "Doubly Linked List",
          "Circular Linked List",
          "Insertion",
          "Deletion",
          "Traversal",
          "Searching",
          "Sorting",
          "Merging",
          "Reversing",
          "Rotating",
        ],
      },
      {
        name: "Stacks",
        files: [
          "Introduction",
          "Stack Operations",
          "Implementing Stack",
          "Applications",
        ],
      },
      {
        name: "Queues",
        files: [
          "Introduction",
          "Queue Operations",
          "Implementing Queue",
          "Applications",
        ],
      },
      {
        name: "Hash Tables",
        files: [
          "Introduction",
          "Hash Function",
          "Collision Handling",
          "Implementing Hash Table",
          "Applications",
        ],
      },
    ],
  },
  {
    title: "Algorithmic Complexity",
    folders: [
      {
        name: "Time and Space Complexity",
        files: [
          "Introduction",
          "Time Complexity",
          "Space Complexity",
          "How to calculate Complexity",
          "Time vs Space Complexity",
        ],
      },
      {
        name: "Common Runtimes",
        files: [
          "Constant",
          "Logarithmic",
          "Linear",
          "Linearithmic",
          "Quadratic",
          "Cubic",
          "Exponential",
          "Factorial",
        ],
      },
      {
        name: "Asymptotic Notation",
        files: [
          "Big O Notation",
          "Omega Notation",
          "Theta Notation",
          "Little O Notation",
        ],
      },
      {
        name: "Extra Topics",
        files: [
          "Best Case",
          "Worst Case",
          "Average Case",
          "Amortized Analysis",
        ],
      },
    ],
  },
  {
    title: "Sorting Algorithms",
    folders: [
      {
        name: "Bubble Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Selection Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Insertion Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Merge Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Quick Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Heap Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Counting Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Radix Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Bucket Sort",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
    ],
  },
  {
    title: "Searching Algorithms",
    folders: [
      {
        name: "Linear Search",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Binary Search",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Jump Search",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Interpolation Search",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
      {
        name: "Exponential Search",
        files: [
          "Introduction",
          "Algorithm",
          "Complexity",
          "Implementation",
          "Optimization",
        ],
      },
    ],
  },
  {
    title: "Recursion",
    folders: [
      {
        name: "Introduction",
        files: [
          "What is Recursion?",
          "How Recursion Works?",
          "Recursion vs Iteration",
          "Recursion Examples",
        ],
      },
      {
        name: "Recursion Techniques",
        files: [
          "Tail Recursion",
          "Head Recursion",
          "Tree Recursion",
          "Indirect Recursion",
          "Nested Recursion",
        ],
      },
      {
        name: "Recursion Problems",
        files: [
          "Factorial",
          "Fibonacci",
          "GCD",
          "Sum of Digits",
          "Power",
          "Tower of Hanoi",
        ],
      },
    ],
  },
  {
    title: "Tree Data Structures",
    folders: [
      {
        name: "Introduction",
        files: [
          "What are Trees?",
          "Types of Trees",
          "Binary Trees",
          "Binary Search Trees",
          "AVL Trees",
          "Red-Black Trees",
          "B-Trees",
          "Tries",
          "Segment Trees",
          "Fenwick Trees",
          "Suffix Trees",
        ],
      },
      {
        name: "Tree Traversals",
        files: [
          "Inorder Traversal",
          "Preorder Traversal",
          "Postorder Traversal",
          "Level Order Traversal",
          "Spiral Order Traversal",
          "Vertical Order Traversal",
        ],
      },
      {
        name: "Search Algorithms",
        files: ["Breadth First Search", "Depth First Search", "Binary Search"],
      },
      {
        name: "Tree Problems",
        files: [
          "Height of Tree",
          "Diameter of Tree",
          "Lowest Common Ancestor",
          "Binary Tree Paths",
          "Binary Tree Level Order Traversal",
          "Binary Tree Zigzag Level Order Traversal",
        ],
      },
    ],
  },
  {
    title: "Graph Data Structures",
    folders: [
      {
        name: "Introduction",
        files: [
          "What are Graphs?",
          "Types of Graphs",
          "Directed Graphs",
          "Undirected Graphs",
          "Graph Representation",
          "Graph Traversals",
          "Graph Algorithms",
          "Graph Problems",
        ],
      },
      {
        name: "Search Algorithms",
        files: [
          "Breadth First Search",
          "Depth First Search",
          "Dijkstra's Algorithm",
          "Bellman-Ford Algorithm",
          "Floyd-Warshall Algorithm",
          "Prim's Algorithm",
          "Kruskal's Algorithm",
          "Topological Sorting",
          "Articulation Points",
          "Bridges",
        ],
      },
      {
        name: "Shortest Path Algos",
        files: [
          "Dijkstra's Algorithm",
          "Bellman-Ford Algorithm",
          "Floyd-Warshall Algorithm",
          "Johnson's Algorithm",
          "A* Algorithm",
          "Bidirectional Search",
          "Backtracking",
          "Branch and Bound",
          "Greedy Algorithms",
          "Dynamic Programming",
        ],
      },
      {
        name: "Minimum Spanning Tree",
        files: [
          "Prim's Algorithm",
          "Kruskal's Algorithm",
          "Boruvka's Algorithm",
          "Reverse-Delete Algorithm",
          "Jarnik's Algorithm",
          "Karger's Algorithm",
        ],
      },
    ],
  },
  {
    title: "Advanced Data Structures",
    folders: [
      {
        name: "Trie",
        files: [
          "Introduction",
          "Trie Operations",
          "Implementing Trie",
          "Applications",
        ],
      },
      {
        name: "Segment Trees",
        files: [
          "Introduction",
          "Segment Tree Operations",
          "Implementing Segment Tree",
          "Applications",
        ],
      },
      {
        name: "Fenwick Tree",
        files: [
          "Introduction",
          "Fenwick Tree Operations",
          "Implementing Fenwick Tree",
          "Applications",
        ],
      },
      {
        name: "Suffix Tree",
        files: [
          "Introduction",
          "Suffix Tree Operations",
          "Implementing Suffix Tree",
          "Applications",
        ],
      },
      {
        name: "Bloom Filter",
        files: [
          "Introduction",
          "Bloom Filter Operations",
          "Implementing Bloom Filter",
          "Applications",
        ],
      },
      {
        name: "Skip List",
        files: [
          "Introduction",
          "Skip List Operations",
          "Implementing Skip List",
          "Applications",
        ],
      },
      {
        name: "Disjoint Set (Union-Find)",
        files: [
          "Introduction",
          "Disjoint Set Operations",
          "Implementing Disjoint Set",
          "Applications",
        ],
      },
    ],
  },
  {
    title: "Complex Data Structures",
    folders: [
      {
        name: "B/B+ Trees",
        files: [
          "Introduction",
          "B-Tree Operations",
          "B-Tree Properties",
          "B-Tree Implementation",
          "B+ Tree Operations",
          "B+ Tree Properties",
          "B+ Tree Implementation",
        ],
      },
      {
        name: "Skip List",
        files: [
          "Introduction",
          "Skip List Operations",
          "Skip List Properties",
          "Skip List Implementation",
        ],
      },
      {
        name: "ISAM",
        files: [
          "Introduction",
          "ISAM Operations",
          "ISAM Properties",
          "ISAM Implementation",
        ],
      },
      {
        name: "2-3 trees",
        files: [
          "Introduction",
          "2-3 Tree Operations",
          "2-3 Tree Properties",
          "2-3 Tree Implementation",
        ],
      },
    ],
  },
  {
    title: "Indexing",
    folders: [
      {
        name: "Introduction",
        files: [
          "What is Indexing?",
          "Types of Indexing",
          "Indexing Techniques",
          "Indexing Algorithms",
        ],
      },
      {
        name: "Linear Indexing",
        files: [
          "Introduction",
          "Linear Indexing Operations",
          "Linear Indexing Properties",
          "Linear Indexing Implementation",
        ],
      },
      {
        name: "Tree-Based Indexing",
        files: [
          "Introduction",
          "Tree-Based Indexing Operations",
          "Tree-Based Indexing Properties",
          "Tree-Based Indexing Implementation",
        ],
      },
    ],
  },
  {
    title: "Problem Solving Techniques",
    folders: [
      {
        name: "Brute Force",
        files: [
          "What is Brute Force?",
          "Brute Force Examples",
          "Brute Force Problems",
        ],
      },
      {
        name: "Greedy Algorithms",
        files: [
          "What are Greedy Algorithms?",
          "Greedy Algorithm Examples",
          "Greedy Algorithm Problems",
        ],
      },
      {
        name: "Divide and Conquer",
        files: [
          "What is Divide and Conquer?",
          "Divide and Conquer Examples",
          "Divide and Conquer Problems",
        ],
      },
      {
        name: "Dynamic Programming",
        files: [
          "What is Dynamic Programming?",
          "Dynamic Programming Examples",
          "Dynamic Programming Problems",
        ],
      },
      {
        name: "Backtracking",
        files: [
          "What is Backtracking?",
          "Backtracking Examples",
          "Backtracking Problems",
        ],
      },
      {
        name: "Branch and Bound",
        files: [
          "What is Branch and Bound?",
          "Branch and Bound Examples",
          "Branch and Bound Problems",
        ],
      },
      {
        name: "Randomized Algorithms",
        files: [
          "What are Randomized Algorithms?",
          "Randomized Algorithm Examples",
          "Randomized Algorithm Problems",
        ],
      },
      {
        name: "Recursion",
        files: [
          "What is Recursion?",
          "Recursion Examples",
          "Recursion Problems",
        ],
      },
      {
        name: "Bit Manipulation",
        files: [
          "What is Bit Manipulation?",
          "Bit Manipulation Examples",
          "Bit Manipulation Problems",
        ],
      },
      {
        name: "Two Pointers",
        files: [
          "What are Two Pointers?",
          "Two Pointers Examples",
          "Two Pointers Problems",
        ],
      },
      {
        name: "Sliding Window",
        files: [
          "What is Sliding Window?",
          "Sliding Window Examples",
          "Sliding Window Problems",
        ],
      },
    ],
  },
  {
    title: "Platforms for Practice",
    folders: [
      {
        name: "LeetCode",
        files: [
          "Introduction",
          "How to Practice",
          "LeetCode Problems",
          "LeetCode Contests",
          "LeetCode Premium",
        ],
      },
      {
        name: "HackerRank",
        files: [
          "Introduction",
          "How to Practice",
          "HackerRank Problems",
          "HackerRank Contests",
          "HackerRank Premium",
        ],
      },
      {
        name: "Codeforces",
        files: [
          "Introduction",
          "How to Practice",
          "Codeforces Problems",
          "Codeforces Contests",
          "Codeforces Premium",
        ],
      },
      {
        name: "AtCoder",
        files: [
          "Introduction",
          "How to Practice",
          "AtCoder Problems",
          "AtCoder Contests",
          "AtCoder Premium",
        ],
      },
      {
        name: "TopCoder",
        files: [
          "Introduction",
          "How to Practice",
          "TopCoder Problems",
          "TopCoder Contests",
          "TopCoder Premium",
        ],
      },
      {
        name: "CodeChef",
        files: [
          "Introduction",
          "How to Practice",
          "CodeChef Problems",
          "CodeChef Contests",
          "CodeChef Premium",
        ],
      },
      {
        name: "SPOJ",
        files: [
          "Introduction",
          "How to Practice",
          "SPOJ Problems",
          "SPOJ Contests",
          "SPOJ Premium",
        ],
      },
      {
        name: "Project Euler",
        files: [
          "Introduction",
          "How to Practice",
          "Project Euler Problems",
          "Project Euler Contests",
          "Project Euler Premium",
        ],
      },
    ],
  }
];
