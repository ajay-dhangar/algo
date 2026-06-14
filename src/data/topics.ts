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
          { name: "Operators", link: "#operators" },
          { name: "Functions", link: "#functions" },
          { name: "Loops", link: "#loops" },
          { name: "Arrays", link: "#arrays" },
          { name: "Hashes", link: "#hashes" },
          { name: "Classes", link: "#classes" },
          { name: "Modules", link: "#modules" },
          { name: "Mixins", link: "#mixins" },
          { name: "Blocks", link: "#blocks" },
          { name: "Procs", link: "#procs" },
        ],
      },
      // GO Language
      {
        name: "GO",
        files: [
          { name: "Introduction", link: "#introduction" },
          { name: "Variables", link: "#variables" },
          { name: "Operators", link: "#operators" },
          { name: "Functions", link: "#functions" },
          { name: "Loops", link: "#loops" },
          { name: "Arrays", link: "#arrays" },
          { name: "Structs", link: "#structs" },
          { name: "Interfaces", link: "#interfaces" },
          { name: "Methods", link: "#methods" },
          { name: "Packages", link: "#packages" },
          { name: "Concurrency", link: "#concurrency" },
          { name: "Channels", link: "#channels" },
        ],
      },
      // Rust Language
      {
        name: "Rust",
        files: [
          { name: "Introduction", link: "#introduction" },
          { name: "Variables", link: "#variables" },
          { name: "Operators", link: "#operators" },
          { name: "Functions", link: "#functions" },
          { name: "Loops", link: "#loops" },
          { name: "Arrays", link: "#arrays" },
          { name: "Structs", link: "#structs" },
          { name: "Enums", link: "#enums" },
          { name: "Traits", link: "#traits" },
          { name: "Modules", link: "#modules" },
          { name: "Concurrency", link: "#concurrency" },
          { name: "Ownership", link: "#ownership" },
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
          { name: "Variables", link: "#variables" },
          { name: "Operators", link: "#operators" },
          { name: "Functions", link: "#functions" },
          { name: "Loops", link: "#loops" },
          { name: "Conditionals", link: "#conditionals" },
          { name: "Arrays", link: "#arrays" },
          { name: "Strings", link: "#strings" },
          { name: "Classes", link: "#classes" },
          { name: "Objects", link: "#objects" },
          { name: "Inheritance", link: "#inheritance" },
          { name: "Polymorphism", link: "#polymorphism" },
          { name: "Interfaces", link: "#interfaces" },
        ],
      },
      {
        name: "Control Structures",
        files: [
          { name: "If-else", link: "#if-else" },
          { name: "Switch", link: "#switch" },
          { name: "For Loop", link: "#for-loop" },
          { name: "While Loop", link: "#while-loop" },
          { name: "Do-While Loop", link: "#do-while-loop" },
          { name: "Break", link: "#break" },
          { name: "Continue", link: "#continue" },
          { name: "Return", link: "#return" },
          { name: "Try-Catch", link: "#try-catch" },
          { name: "Throw", link: "#throw" },
          { name: "Finally", link: "#finally" },
        ],
      },
      {
        name: "Functions",
        files: [
          { name: "Function Declaration", link: "#declaration" },
          { name: "Function Call", link: "#call" },
          { name: "Function Parameters", link: "#parameters" },
          { name: "Function Return", link: "#return" },
          { name: "Function Scope", link: "#scope" },
          { name: "Function Overloading", link: "#overloading" },
          { name: "Function Recursion", link: "#recursion" },
          { name: "Function Closures", link: "#closures" },
          { name: "Function Currying", link: "#currying" },
          { name: "Function Composition", link: "#composition" },
          { name: "Function Memoization", link: "#memoization" },
        ],
      },
      {
        name: "OOP Basics",
        files: [
          { name: "Classes", link: "#classes" },
          { name: "Objects", link: "#objects" },
          { name: "Inheritance", link: "#inheritance" },
          { name: "Polymorphism", link: "#polymorphism" },
          { name: "Encapsulation", link: "#encapsulation" },
          { name: "Abstraction", link: "#abstraction" },
          { name: "Interfaces", link: "#interfaces" },
          { name: "Abstract Classes", link: "#abstract-classes" },
          { name: "Composition", link: "#composition" },
          { name: "Delegation", link: "#delegation" },
          { name: "Mixins", link: "#mixins" },
        ],
      },
      {
        name: "Pseudo Code",
        files: [
          { name: "Introduction", link: "#introduction" },
          { name: "Variables", link: "#variables" },
          { name: "Operators", link: "#operators" },
          { name: "Functions", link: "#functions" },
          { name: "Loops", link: "#loops" },
          { name: "Conditionals", link: "#conditionals" },
          { name: "Arrays", link: "#arrays" },
          { name: "Strings", link: "#strings" },
          { name: "Classes", link: "#classes" },
          { name: "Objects", link: "#objects" },
          { name: "Inheritance", link: "#inheritance" },
          { name: "Polymorphism", link: "#polymorphism" },
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
          { name: "What are Data Structures?", link: "#what-is-dsa" },
          { name: "Importance of Data Structures", link: "#importance" },
          { name: "Types of Data Structures", link: "#types" },
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
          { name: "Introduction", link: "#introduction" },
          { name: "Declaration", link: "#declaration" },
          { name: "Initialization", link: "#initialization" },
          { name: "Accessing Elements", link: "#accessing" },
          { name: "Insertion", link: "#insertion" },
          { name: "Deletion", link: "#deletion" },
          { name: "Searching", link: "#searching" },
          { name: "Sorting", link: "#sorting" },
          { name: "Merging", link: "#merging" },
          { name: "Reversing", link: "#reversing" },
          { name: "Rotating", link: "#rotating" },
          { name: "Shifting", link: "#shifting" },
        ],
      },
      {
        name: "Linked Lists",
        files: [
          { name: "Introduction", link: "#introduction" },
          { name: "Singly Linked List", link: "#singly" },
          { name: "Doubly Linked List", link: "#doubly" },
          { name: "Circular Linked List", link: "#circular" },
          { name: "Insertion", link: "#insertion" },
          { name: "Deletion", link: "#deletion" },
          { name: "Traversal", link: "#traversal" },
          { name: "Searching", link: "#searching" },
          { name: "Sorting", link: "#sorting" },
          { name: "Merging", link: "#merging" },
          { name: "Reversing", link: "#reversing" },
          { name: "Rotating", link: "#rotating" },
        ],
      },
      {
        name: "Stacks",
        files: [
          { name: "Introduction", link: "#introduction" },
          { name: "Stack Operations", link: "#operations" },
          { name: "Implementing Stack", link: "#implementation" },
          { name: "Applications", link: "#applications" },
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
