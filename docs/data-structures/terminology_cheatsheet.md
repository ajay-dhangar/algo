---

id: dsa-terminology-cheat-sheet

title: DSA Terminology Cheat Sheet

sidebar_label: Terminology Cheat Sheet

sidebar_position: 1

description: A comprehensive quick-reference guide for Data Structures and Algorithms terminology.

tags: [dsa, beginners, cheat-sheet, terminology, reference]

---



# DSA Terminology Cheat Sheet



This comprehensive quick-reference guide covers essential terminology in Data Structures and Algorithms (DSA). Organized topic-wise for easy navigation, each term includes a clear definition, beginner-friendly explanation, key characteristics, and practical examples. Use it as a foundational reference throughout your DSA learning journey.



## 1. Basic Concepts



- **Data Structure**: A specialized format for organizing, processing, retrieving, and storing data efficiently in memory. It defines relationships between data elements and supported operations.  
  *Key Insight*: Choosing the right data structure optimizes time and space. *Examples*: Arrays (fast access), Linked Lists (dynamic size), Trees/Graphs (hierarchical/relational data).



- **Algorithm**: A finite, well-defined sequence of instructions to solve a specific problem or perform a computation. Must be correct, efficient, and terminate for all valid inputs.  

&#x20; *Example*: Binary Search algorithm to find an element in a sorted array.



- **Time Complexity**: Mathematical function describing how the running time of an algorithm increases with input size (*n*). Typically analyzed in worst, average, and best cases using asymptotic notation.  

&#x20; *Example*: Linear Search is O(n) in the worst case.



- **Space Complexity**: Total memory required by an algorithm as a function of input size, including both input data and auxiliary (extra) space.  

&#x20; *Example*: In-place algorithms like Heap Sort use O(1) auxiliary space.



- **Big O Notation (O)**: Describes the upper bound (worst-case growth rate) of an algorithm, ignoring constants and lower-order terms.  

&#x20; *Common Classes*: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n²) quadratic, O(2ⁿ) exponential.



- **Input**: Data or parameters provided to an algorithm.  

- **Output**: Result or solution produced by processing the input.  

- **Best/Average/Worst Case**: Performance analysis under different input conditions (e.g., already sorted vs reverse sorted).  

- **Asymptotic Analysis**: Evaluating algorithm efficiency as input size grows very large (*n* → ∞), focusing on dominant terms.



## 2. Data Structures



### Linear Data Structures

- **Array**: Collection of elements of the same type stored in contiguous memory locations, enabling O(1) random access via indices. Fixed or dynamic size.  

&#x20; *Example*: `int arr[] = {10, 20, 30};` – Direct access `arr[1]`.



- **Linked List**: Linear sequence of nodes, each containing data and a reference (pointer) to the next node. Efficient for insertions/deletions at known positions.  

&#x20; *Variants*: Singly-linked, Doubly-linked, Circular. *Example*: Implementing dynamic queues or undo features.



- **Node**: Basic structural unit in linked lists, trees, or graphs. Holds data and one or more references to other nodes.  

&#x20; *Example*: `struct Node { int data; Node* next; };`



- **Pointer / Reference**: Variable that stores the memory address of another variable or object. Enables dynamic memory allocation and linking.  

&#x20; *Languages*: C/C++ uses explicit pointers; Java/Python use references.



- **Stack**: Linear LIFO (Last-In-First-Out) abstract data type. Core operations: `push`, `pop`, `peek`/`top`.  

&#x20; *Example*: Managing function calls (call stack), evaluating arithmetic expressions, browser back button.



- **Queue**: Linear FIFO (First-In-First-Out) abstract data type. Core operations: `enqueue`, `dequeue`.  

&#x20; *Variants*: Simple Queue, Circular Queue, Priority Queue, Deque. *Example*: Task scheduling, BFS traversal.



### Non-Linear Data Structures

- **Tree**: Hierarchical, acyclic collection of nodes connected by edges, starting from a single root. No cycles.  

&#x20; *Example*: File system directories, organization charts.



- **Root Node**: Topmost node in a tree with no parent.  

- **Parent Node**: Node with one or more child nodes.  

- **Child Node**: Node connected below a parent.  

- **Leaf Node**: Node with no children (terminal node).  

- **Height**: Length of the longest path from root to a leaf. **Depth**: Distance of a node from the root.



- **Binary Tree**: Each node has at most two children (left/right).  

&#x20; *Important Variants*: Binary Search Tree (BST), AVL Tree, Red-Black Tree, Heap, Trie.



- **Graph**: Non-linear structure of vertices (nodes) connected by edges. Can be directed, undirected, weighted, or unweighted. May contain cycles.  

&#x20; *Example*: Social networks (users as vertices, friendships as edges), maps/roads.



- **Vertex / Node**: Individual entity in a graph.  

- **Edge**: Connection between two vertices (can be directed and/or weighted).  

- **Adjacency**: Direct connection between vertices.  

- **Cycle**: Path in a graph that starts and ends at the same vertex.



- **Hash Table / Hash Map**: Data structure that maps keys to values using a hash function for average O(1) access time. Resolves collisions with chaining or probing.  

&#x20; *Example*: Python `dict`, Java `HashMap` for fast lookups/caching.



## 3. Algorithms & Techniques



- **Traversal**: Process of visiting every node/element in a data structure systematically.  

&#x20; *Trees*: Pre-order (root-left-right), In-order, Post-order, Level-order. *Graphs*: DFS (Depth-First), BFS (Breadth-First).



- **Searching**: Locating a specific target value within a collection.  

&#x20; *Examples*: Linear Search (unsorted), Binary Search (sorted), Hashing.



- **Sorting**: Arranging elements in a particular order (usually ascending/descending).  

&#x20; *Stable vs Unstable*, *In-place vs Not*. *Examples*: Quick Sort, Merge Sort, Bubble Sort, Heap Sort.



- **Recursion**: Technique where a function solves a problem by calling itself on smaller sub-instances. Requires a base case.  

&#x20; *Example*: `factorial(n) = n * factorial(n-1)`. Powerful for trees/graphs but risks stack overflow.



- **Iteration**: Repetitive execution of a set of statements using loops. Often more space-efficient than deep recursion.  

&#x20; *Example*: For/while loops to sum array elements.



- **Backtracking**: Incremental construction of candidate solutions with pruning of invalid paths (a form of DFS).  

&#x20; *Example*: Solving Sudoku, N-Queens puzzle, generating permutations.



- **Greedy Algorithm**: Makes the locally optimal (best) choice at each step without reconsidering previous choices. Fast but may not yield global optimum.  

&#x20; *Example*: Dijkstra’s shortest path, Fractional Knapsack, Huffman Coding.



- **Dynamic Programming (DP)**: Solves problems by breaking into overlapping subproblems and storing results (memoization/tabulation). Avoids redundant work.  

&#x20; *Key Properties*: Optimal substructure + Overlapping subproblems. *Examples*: Fibonacci, 0/1 Knapsack, Longest Common Subsequence.



- **Divide and Conquer**: Divides problem into independent smaller subproblems, solves recursively, then combines solutions.  

&#x20; *Example*: Merge Sort, Quick Sort, Binary Search, Strassen’s matrix multiplication.



- **Brute Force**: Exhaustive search trying all possible combinations. Simple but inefficient for large inputs.  

&#x20; *Example*: Checking all pairs for Two-Sum problem.



## 4. Complexity Analysis



- **Time Complexity**: How runtime scales with input size *n*. Focus on dominant term.  

&#x20; *Classes*: O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!).



- **Space Complexity**: Memory usage as function of *n*. Distinguish between total and auxiliary space.  

&#x20; *Example*: Recursive DFS on tree may use O(h) stack space where *h* is height.



- **Big Theta (Θ)**: Tight asymptotic bound (both upper and lower).  

- **Big Omega (Ω)**: Lower bound on growth rate.



- **Constant Time O(1)**: Independent of input size. *Example*: Array index access.  

- **Logarithmic O(log n)**: *Example*: Binary Search.  

- **Linear O(n)**: *Example*: Single array pass.  

- **Linearithmic O(n log n)**: Efficient comparison sorts.  

- **Quadratic O(n²)**: *Example*: Nested loops (Bubble Sort).  



- **Auxiliary Space**: Extra space used excluding input/output.  

- **In-Place**: Algorithms using O(1) auxiliary space.  

- **Stable Algorithm**: Preserves relative order of equal elements (important in sorting).



## 5. Additional Important Terms



- **Memoization**: Caching results of recursive calls (top-down DP).  

- **Tabulation**: Iterative bottom-up DP filling a table.  

- **Optimal Substructure**: Optimal solution built from optimal sub-solutions.  

- **Overlapping Subproblems**: Same subproblems solved repeatedly.  

- **Adjacency List / Matrix**: Graph representations (efficient for sparse/dense graphs).  

- **Heap / Priority Queue**: Tree-based structure maintaining min/max property for fast extract-min.  

- **Balanced Tree**: Ensures logarithmic height (AVL, Red-Black Trees).  

- **Connected Component**: Maximal set of mutually reachable vertices in a graph.  

- **Topological Sort**: Linear ordering of DAG vertices respecting edge directions.  

- **Minimum Spanning Tree (MST)**: Minimum-weight tree connecting all vertices.  

- **Shortest Path**: Minimum-cost path between vertices (Dijkstra, Bellman-Ford, Floyd-Warshall).



---



**Usage Tip**: Bookmark this page! Cross-reference terms while reading tutorials or solving problems. For implementations, examples, and practice questions, visit the linked DSA tutorial sections. This cheat sheet evolves with your learning—feel free to suggest additions. Happy coding!

