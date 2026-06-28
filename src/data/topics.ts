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
          { name: "Variables", link: "/docs/languages/javascript/js-variables" },
          { name: "Data Types", link: "/docs/languages/javascript/datatypes" },
          { name: "Operators", link: "/docs/languages/javascript/js-operators" },
          { name: "Decisions", link: "/docs/languages/javascript/decisions" },
          { name: "Type Casting", link: "/docs/languages/javascript/type-casting" },
          { name: "Functions", link: "/docs/languages/javascript/js-functions" },
          { name: "Loops", link: "/docs/languages/javascript/js-loops" },
          { name: "Arrays", link: "/docs/languages/javascript/js-arrays" },
          { name: "Objects", link: "/docs/languages/javascript/js-objects" },
          { name: "Classes", link: "/docs/category/javascript" },
          { name: "Inheritance", link: "/docs/languages/javascript/js-inheritance" },
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
          { name: "Optimization", link: "#" },
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
          { name: "Binary Trees", link: "#" },
          { name: "Binary Search Trees", link: "#" },
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
          { name: "Sliding Window Problems", link: "#" },
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
        ],
      },
    ],
  },
];
