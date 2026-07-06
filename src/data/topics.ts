export interface FileItem {
  name: string;
  link: string;
}

export interface Folder {
  name: string;
  files: FileItem[];
}

export interface Topic {
  title: string;
  folders: Folder[];
}

export const topics: Topic[] = [
  {
    title: "Pick a Language",
    folders: [
      // JavaScript Language
      {
        name: "JavaScript",
        files: [
          { name: "Introduction", link: "/docs/languages/javascript/introduction" },
          { name: "Variables", link: "/docs/languages/javascript/variables" },
          { name: "Data Types", link: "/docs/languages/javascript/datatypes" },
          { name: "Operators", link: "/docs/languages/javascript/operators" },
          { name: "Decisions", link: "/docs/languages/javascript/decisions" },
          { name: "Type Casting", link: "/docs/languages/javascript/type-casting" },
          { name: "Functions", link: "/docs/languages/javascript/functions" },
          { name: "Loops", link: "/docs/languages/javascript/loops" },
          { name: "Arrays", link: "/docs/languages/javascript/arrays" },
          { name: "Objects", link: "/docs/languages/javascript/objects" },
          { name: "Classes", link: "/docs/category/javascript" },
          { name: "Inheritance", link: "/docs/languages/javascript/inheritance" },
          { name: "Modules", link: "/docs/languages/javascript/modules" },
          { name: "Promises", link: "/docs/languages/javascript/promises" },
          { name: "Async/Await", link: "/docs/languages/javascript/async-await" },
        ],
      },
      // Python Language
      {
        name: "Python",
        files: [
          { name: "Introduction", link: "/docs/category/python" },
          { name: "Variables", link: "/docs/category/python" },
          { name: "Operators", link: "/docs/category/python" },
          { name: "Functions", link: "/docs/category/python" },
          { name: "Loops", link: "/docs/category/python" },
          { name: "Lists", link: "/docs/category/python" },
          { name: "Dictionaries", link: "/docs/category/python" },
          { name: "Classes", link: "/docs/category/python" },
          { name: "Inheritance", link: "/docs/category/python" },
          { name: "Modules", link: "/docs/category/python" },
          { name: "Decorators", link: "/docs/category/python" },
          { name: "Generators", link: "/docs/category/python" },
        ],
      },
      // Java Language
      {
        name: "Java",
        files: [
          { name: "Introduction", link: "/docs/category/java" },
          { name: "Variables", link: "/docs/category/java" },
          { name: "Operators", link: "/docs/category/java" },
          { name: "Functions", link: "/docs/category/java" },
          { name: "Loops", link: "/docs/category/java" },
          { name: "Arrays", link: "/docs/category/java" },
          { name: "Objects", link: "/docs/category/java" },
          { name: "Classes", link: "/docs/category/java" },
          { name: "Inheritance", link: "/docs/category/java" },
          { name: "Interfaces", link: "/docs/category/java" },
          { name: "Packages", link: "/docs/category/java" },
          { name: "Multithreading", link: "/docs/category/java" },
        ],
      },
      // C++ Language
      {
        name: "C++",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Pointers", link: "#" },
          { name: "Classes", link: "#" },
          { name: "Inheritance", link: "#" },
          { name: "Polymorphism", link: "#" },
          { name: "Templates", link: "#" },
          { name: "STL", link: "#" },
        ],
      },
      // C# Language
      {
        name: "C#",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Objects", link: "#" },
          { name: "Classes", link: "#" },
          { name: "Inheritance", link: "#" },
          { name: "Interfaces", link: "#" },
          { name: "Delegates", link: "#" },
          { name: "Events", link: "#" },
        ],
      },
      // Ruby Language
      {
        name: "Ruby",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Hashes", link: "#" },
          { name: "Classes", link: "#" },
          { name: "Modules", link: "#" },
          { name: "Mixins", link: "#" },
          { name: "Blocks", link: "#" },
          { name: "Procs", link: "#" },
        ],
      },
      // GO Language
      {
        name: "GO",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Structs", link: "#" },
          { name: "Interfaces", link: "#" },
          { name: "Methods", link: "#" },
          { name: "Packages", link: "#" },
          { name: "Concurrency", link: "#" },
          { name: "Channels", link: "#" },
        ],
      },
      // Rust Language
      {
        name: "Rust",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Structs", link: "#" },
          { name: "Enums", link: "#" },
          { name: "Traits", link: "#" },
          { name: "Modules", link: "#" },
          { name: "Concurrency", link: "#" },
          { name: "Ownership", link: "#" },
        ],
      },
      // Swift Language
      {
        name: "Swift",
        files: [
          { name: "Introduction", link: "/docs/languages/swift/swift-introduction" },
          { name: "Bubble Sort", link: "/docs/languages/swift/swift-bubble-sort" },
          { name: "Selection Sort", link: "/docs/languages/swift/swift-selection-sort" },
          { name: "Insertion Sort", link: "/docs/languages/swift/swift-insertion-sort" },
          { name: "Merge Sort", link: "/docs/languages/swift/swift-merge-sort" },
          { name: "Quick Sort", link: "/docs/languages/swift/swift-quick-sort" },
          { name: "Binary Search", link: "/docs/languages/swift/swift-binary-search" },
          { name: "BFS", link: "/docs/languages/swift/swift-bfs" },
          { name: "DFS", link: "/docs/languages/swift/swift-dfs" },
          { name: "Dijkstra's Algorithm", link: "/docs/languages/swift/swift-dijkstra" },
          { name: "Dynamic Programming", link: "/docs/languages/swift/swift-dynamic-programming" },
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
          { name: "Variables", link: "/docs/programming-fundamentals/language-syntax/variables" },
          { name: "Operators", link: "/docs/programming-fundamentals/language-syntax/operators" },
          { name: "Functions", link: "/docs/programming-fundamentals/language-syntax/functions" },
          { name: "Loops", link: "/docs/programming-fundamentals/language-syntax/loops" },
          { name: "Conditionals", link: "/docs/programming-fundamentals/language-syntax/conditionals" },
          { name: "Arrays", link: "/docs/programming-fundamentals/language-syntax/arrays" },
          { name: "Strings", link: "/docs/programming-fundamentals/language-syntax/strings" },
          { name: "Classes", link: "/docs/programming-fundamentals/language-syntax/classes" },
          { name: "Objects", link: "/docs/programming-fundamentals/language-syntax/objects" },
          { name: "Inheritance", link: "/docs/programming-fundamentals/language-syntax/inheritance" },
          { name: "Polymorphism", link: "/docs/programming-fundamentals/language-syntax/polymorphism" },
          { name: "Interfaces", link: "/docs/programming-fundamentals/language-syntax/interfaces" },
        ],
      },
      {
        name: "Control Structures",
        files: [
          { name: "If-else", link: "#" },
          { name: "Switch", link: "#" },
          { name: "For Loop", link: "#" },
          { name: "While Loop", link: "#" },
          { name: "Do-While Loop", link: "#" },
          { name: "Break", link: "#" },
          { name: "Continue", link: "#" },
          { name: "Return", link: "#" },
          { name: "Try-Catch", link: "#" },
          { name: "Throw", link: "#" },
          { name: "Finally", link: "#" },
        ],
      },
      {
        name: "Functions",
        files: [
          { name: "Function Declaration", link: "#" },
          { name: "Function Call", link: "#" },
          { name: "Function Parameters", link: "#" },
          { name: "Function Return", link: "#" },
          { name: "Function Scope", link: "#" },
          { name: "Function Overloading", link: "#" },
          { name: "Function Recursion", link: "#" },
          { name: "Function Closures", link: "#" },
          { name: "Function Currying", link: "#" },
          { name: "Function Composition", link: "#" },
          { name: "Function Memoization", link: "#" },
        ],
      },
      {
        name: "OOP Basics",
        files: [
          { name: "Classes", link: "#" },
          { name: "Objects", link: "#" },
          { name: "Inheritance", link: "#" },
          { name: "Polymorphism", link: "#" },
          { name: "Encapsulation", link: "#" },
          { name: "Abstraction", link: "#" },
          { name: "Interfaces", link: "#" },
          { name: "Abstract Classes", link: "#" },
          { name: "Composition", link: "#" },
          { name: "Delegation", link: "#" },
          { name: "Mixins", link: "#" },
        ],
      },
      {
        name: "Pseudo Code",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Variables", link: "#" },
          { name: "Operators", link: "#" },
          { name: "Functions", link: "#" },
          { name: "Loops", link: "#" },
          { name: "Conditionals", link: "#" },
          { name: "Arrays", link: "#" },
          { name: "Strings", link: "#" },
          { name: "Classes", link: "#" },
          { name: "Objects", link: "#" },
          { name: "Inheritance", link: "#" },
          { name: "Polymorphism", link: "#" },
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
          { name: "What are Data Structures?", link: "#" },
          { name: "Importance of Data Structures", link: "#" },
          { name: "Types of Data Structures", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "Declaration", link: "#" },
          { name: "Initialization", link: "#" },
          { name: "Accessing Elements", link: "#" },
          { name: "Insertion", link: "#" },
          { name: "Deletion", link: "#" },
          { name: "Searching", link: "#" },
          { name: "Sorting", link: "#" },
          { name: "Merging", link: "#" },
          { name: "Reversing", link: "#" },
          { name: "Rotating", link: "#" },
          { name: "Shifting", link: "#" },
        ],
      },
      {
        name: "Linked Lists",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Singly Linked List", link: "#" },
          { name: "Doubly Linked List", link: "#" },
          { name: "Circular Linked List", link: "#" },
          { name: "Insertion", link: "#" },
          { name: "Deletion", link: "#" },
          { name: "Traversal", link: "#" },
          { name: "Searching", link: "#" },
          { name: "Sorting", link: "#" },
          { name: "Merging", link: "#" },
          { name: "Reversing", link: "#" },
          { name: "Rotating", link: "#" },
        ],
      },
      {
        name: "Stacks",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Stack Operations", link: "#" },
          { name: "Implementing Stack", link: "#" },
          { name: "Applications", link: "#" },
        ],
      },
      {
        name: "Queues",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Queue Operations", link: "#" },
          { name: "Implementing Queue", link: "#" },
          { name: "Deque (Double-Ended Queue)", link: "#" },
          { name: "Priority Queue", link: "#" },
          { name: "Circular Queue", link: "#" },
          { name: "Applications", link: "#" },
        ],
      },
      {
        name: "Hash Tables",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Hash Function", link: "#" },
          { name: "Collision Handling", link: "#" },
          { name: "Implementing Hash Table", link: "#" },
          { name: "Applications", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "Time Complexity", link: "#" },
          { name: "Space Complexity", link: "#" },
          { name: "How to calculate Complexity", link: "#" },
          { name: "Time vs Space Complexity", link: "#" },
        ],
      },
      {
        name: "Common Runtimes",
        files: [
          { name: "Constant", link: "#" },
          { name: "Logarithmic", link: "#" },
          { name: "Linear", link: "#" },
          { name: "Linearithmic", link: "#" },
          { name: "Quadratic", link: "#" },
          { name: "Cubic", link: "#" },
          { name: "Exponential", link: "#" },
          { name: "Factorial", link: "#" },
        ],
      },
      {
        name: "Asymptotic Notation",
        files: [
          { name: "Big O Notation", link: "#" },
          { name: "Omega Notation", link: "#" },
          { name: "Theta Notation", link: "#" },
          { name: "Little O Notation", link: "#" },
        ],
      },
      {
        name: "Extra Topics",
        files: [
          { name: "Best Case", link: "#" },
          { name: "Worst Case", link: "#" },
          { name: "Average Case", link: "#" },
          { name: "Amortized Analysis", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Selection Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Insertion Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Merge Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Quick Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Heap Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Counting Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
        ],
      },
      {
        name: "Radix Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
        ],
      },
      {
        name: "Bucket Sort",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
      {
        name: "Binary Search",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Algorithm", link: "#" },
          { name: "Complexity", link: "#" },
          { name: "Implementation", link: "#" },
          { name: "Variations", link: "#" },
          { name: "Optimization", link: "#" },
        ],
      },
    ],
  },
  {
    title: "Prefix Sum & Array Techniques",
    folders: [
      {
        name: "Prefix Sum",
        files: [
          { name: "Introduction", link: "#" },
          { name: "1D Prefix Sum", link: "#" },
          { name: "2D Prefix Sum", link: "#" },
          { name: "Difference Array", link: "#" },
          { name: "Practice Problems", link: "#" },
        ],
      },
      {
        name: "Two Pointers",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Same Direction", link: "#" },
          { name: "Opposite Direction", link: "#" },
          { name: "Practice Problems", link: "#" },
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
          { name: "What is Recursion?", link: "#" },
          { name: "How Recursion Works?", link: "#" },
          { name: "Recursion vs Iteration", link: "#" },
          { name: "Tail Recursion", link: "#" },
          { name: "Backtracking Basics", link: "#" },
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
          { name: "What are Trees?", link: "#" },
          { name: "Tree Terminology", link: "#" },
          { name: "Types of Trees", link: "#" },
        ],
      },
      {
        name: "Binary Trees",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Inorder Traversal", link: "#" },
          { name: "Preorder Traversal", link: "#" },
          { name: "Postorder Traversal", link: "#" },
          { name: "Level Order Traversal", link: "#" },
          { name: "Height & Depth", link: "#" },
        ],
      },
      {
        name: "Binary Search Trees",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Insertion", link: "#" },
          { name: "Deletion", link: "#" },
          { name: "Searching", link: "#" },
          { name: "Balancing", link: "#" },
        ],
      },
      {
        name: "Heaps",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Min Heap", link: "#" },
          { name: "Max Heap", link: "#" },
          { name: "Heap Operations", link: "#" },
          { name: "Priority Queue using Heap", link: "#" },
        ],
      },
      {
        name: "Advanced Trees",
        files: [
          { name: "AVL Trees", link: "#" },
          { name: "Red-Black Trees", link: "#" },
          { name: "Segment Trees", link: "#" },
          { name: "Fenwick Trees (BIT)", link: "#" },
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
          { name: "What are Graphs?", link: "#" },
          { name: "Graph Representation", link: "#" },
          { name: "Adjacency Matrix", link: "#" },
          { name: "Adjacency List", link: "#" },
        ],
      },
      {
        name: "Graph Traversal",
        files: [
          { name: "Breadth-First Search (BFS)", link: "#" },
          { name: "Depth-First Search (DFS)", link: "#" },
          { name: "Connected Components", link: "#" },
          { name: "Cycle Detection", link: "#" },
          { name: "Topological Sort", link: "#" },
        ],
      },
      {
        name: "Shortest Path",
        files: [
          { name: "Dijkstra's Algorithm", link: "#" },
          { name: "Bellman-Ford Algorithm", link: "#" },
          { name: "Floyd-Warshall Algorithm", link: "#" },
        ],
      },
      {
        name: "Minimum Spanning Tree",
        files: [
          { name: "Kruskal's Algorithm", link: "#" },
          { name: "Prim's Algorithm", link: "#" },
        ],
      },
      {
        name: "Union Find (Disjoint Set Union)",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Union by Rank", link: "#" },
          { name: "Path Compression", link: "#" },
          { name: "Applications", link: "#" },
        ],
      },
    ],
  },
  {
    title: "Dynamic Programming",
    folders: [
      {
        name: "Introduction",
        files: [
          { name: "What is Dynamic Programming?", link: "#" },
          { name: "Memoization vs Tabulation", link: "#" },
          { name: "Identifying DP Problems", link: "#" },
        ],
      },
      {
        name: "1D DP",
        files: [
          { name: "Fibonacci Series", link: "#" },
          { name: "Climbing Stairs", link: "#" },
          { name: "House Robber", link: "#" },
          { name: "Coin Change", link: "#" },
        ],
      },
      {
        name: "2D DP",
        files: [
          { name: "Longest Common Subsequence", link: "#" },
          { name: "Edit Distance", link: "#" },
          { name: "Unique Paths", link: "#" },
          { name: "0/1 Knapsack", link: "#" },
        ],
      },
      {
        name: "Advanced DP",
        files: [
          { name: "DP on Trees", link: "#" },
          { name: "DP on Graphs", link: "#" },
          { name: "Bitmask DP", link: "#" },
          { name: "Interval DP", link: "#" },
        ],
      },
    ],
  },
  {
    title: "String Algorithms",
    folders: [
      {
        name: "Basics",
        files: [
          { name: "String Manipulation", link: "#" },
          { name: "Pattern Matching", link: "#" },
          { name: "Anagram Detection", link: "#" },
        ],
      },
      {
        name: "Advanced",
        files: [
          { name: "KMP Algorithm", link: "#" },
          { name: "Rabin-Karp Algorithm", link: "#" },
          { name: "Z Algorithm", link: "#" },
          { name: "Trie-Based Search", link: "#" },
          { name: "Suffix Array", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "Implementing Trie", link: "#" },
          { name: "Applications", link: "#" },
        ],
      },
      {
        name: "Monotonic Stack & Queue",
        files: [
          { name: "Monotonic Stack", link: "#" },
          { name: "Monotonic Queue", link: "#" },
          { name: "Next Greater Element", link: "#" },
          { name: "Sliding Window Maximum", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "B+ Tree Operations", link: "#" },
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
          { name: "What is Indexing?", link: "#" },
        ],
      },
    ],
  },
  {
    title: "Problem Solving Techniques",
    folders: [
      {
        name: "Sliding Window",
        files: [
          { name: "What is Sliding Window?", link: "#" },
          { name: "Fixed Size Window", link: "#" },
          { name: "Variable Size Window", link: "#" },
          { name: "Sliding Window Problems", link: "#" },
        ],
      },
      {
        name: "Greedy Algorithms",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Activity Selection", link: "#" },
          { name: "Fractional Knapsack", link: "#" },
          { name: "Huffman Coding", link: "#" },
        ],
      },
      {
        name: "Divide and Conquer",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Merge Sort", link: "#" },
          { name: "Quick Sort", link: "#" },
          { name: "Closest Pair of Points", link: "#" },
        ],
      },
      {
        name: "Backtracking",
        files: [
          { name: "Introduction", link: "#" },
          { name: "N-Queens Problem", link: "#" },
          { name: "Sudoku Solver", link: "#" },
          { name: "Subset Sum", link: "#" },
        ],
      },
      {
        name: "Bit Manipulation",
        files: [
          { name: "Introduction", link: "#" },
          { name: "Common Bit Tricks", link: "#" },
          { name: "Power of Two", link: "#" },
          { name: "Counting Set Bits", link: "#" },
        ],
      },
    ],
  },
  {
    title: "Practice Milestones",
    folders: [
      {
        name: "Phase 1: Fundamentals (Weeks 1–3)",
        files: [
          { name: "Solve 20 Array problems", link: "#" },
          { name: "Solve 10 String problems", link: "#" },
          { name: "Solve 10 Sorting problems", link: "#" },
          { name: "Implement Stack & Queue from scratch", link: "#" },
        ],
      },
      {
        name: "Phase 2: Intermediate (Weeks 4–7)",
        files: [
          { name: "Solve 15 Linked List problems", link: "#" },
          { name: "Solve 15 Binary Tree problems", link: "#" },
          { name: "Solve 10 Binary Search problems", link: "#" },
          { name: "Solve 10 Two Pointer problems", link: "#" },
          { name: "Solve 10 Sliding Window problems", link: "#" },
        ],
      },
      {
        name: "Phase 3: Advanced (Weeks 8–12)",
        files: [
          { name: "Solve 15 Graph problems", link: "#" },
          { name: "Solve 20 Dynamic Programming problems", link: "#" },
          { name: "Solve 10 Backtracking problems", link: "#" },
          { name: "Solve 5 Trie problems", link: "#" },
          { name: "Solve 5 Greedy problems", link: "#" },
        ],
      },
      {
        name: "Revision Cycle",
        files: [
          { name: "Re-solve Week 1–3 problems", link: "#" },
          { name: "Re-solve Week 4–7 problems", link: "#" },
          { name: "Timed mock interviews", link: "#" },
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
          { name: "Introduction", link: "#" },
          { name: "How to Practice", link: "#" },
          { name: "Top 75 Problems", link: "/practice" },
        ],
      },
      {
        name: "Other Platforms",
        files: [
          { name: "HackerRank", link: "https://www.hackerrank.com/" },
          { name: "Codeforces", link: "https://codeforces.com/" },
          { name: "GeeksforGeeks", link: "https://www.geeksforgeeks.org/" },
          { name: "CodeChef", link: "https://www.codechef.com/" },
          { name: "AtCoder", link: "https://atcoder.jp/" },
        ],
      },
    ],
  },
  {
    title: "Capstone Projects",
    folders: [
      {
        name: "Beginner Projects",
        files: [
          { name: "Build a Calculator with Expression Parsing", link: "#" },
          { name: "Implement an LRU Cache", link: "#" },
          { name: "Text Autocomplete using Trie", link: "#" },
        ],
      },
      {
        name: "Intermediate Projects",
        files: [
          { name: "Social Network Graph (BFS/DFS)", link: "#" },
          { name: "Pathfinding Visualizer (Dijkstra/A*)", link: "#" },
          { name: "File System Simulator (Trees)", link: "#" },
        ],
      },
      {
        name: "Advanced Projects",
        files: [
          { name: "Database Index Simulator (B+ Trees)", link: "#" },
          { name: "Route Optimizer (Graphs + DP)", link: "#" },
          { name: "Compression Tool (Huffman Coding)", link: "#" },
        ],
      },
    ],
  },
];

