---
id: dsa-learning-progress-tracker
title: DSA Learning Progress Tracker
sidebar_label: DSA Progress Tracker
sidebar_position: 5
description: "A structured checklist for tracking DSA learning progress across core data structures, algorithms, graphs, dynamic programming, and interview practice."
tags: [dsa, learning roadmap, progress tracker, algorithms, data-structures]
---

# DSA Learning Progress Tracker

Use this tracker with the [Roadmap to Learning DSA](./roadmap-to-dsa.md). The roadmap explains the order of topics; this page turns that order into measurable milestones with prerequisites, study links, mini challenges, and complexity goals.

## How to Use This Tracker

1. Start with the first incomplete stage.
2. Read the linked Algo documentation page.
3. Implement the topic in one language without copying the solution.
4. Write the time and space complexity from memory.
5. Mark the checklist item complete only after solving the mini challenge.

:::tip
Do not rush to advanced topics. Most graph and dynamic programming problems become easier when arrays, hashing, recursion, and trees are already comfortable.
:::

## Stage 1: Fundamentals

| Topic | Difficulty | Prerequisites | Study Link | Key Concepts | Mini Challenge | Complexity Focus |
| --- | --- | --- | --- | --- | --- | --- |
| DSA Basics | Beginner | Basic programming | [What is DSA?](./what-is-dsa.md) | Data structures, algorithms, tradeoffs | Explain why the same problem can have multiple solutions | Compare constant, linear, and quadratic growth |
| Importance of DSA | Beginner | DSA basics | [Importance of DSA](./imp-of-dsa.md) | Problem solving, optimization, scalability | Pick one slow daily-life process and describe a faster algorithm | Identify input size and bottleneck operation |
| Arrays | Beginner | Variables and loops | [Arrays](../basic-data-structures/array/arrays-dsa.md) | Indexing, traversal, updates, contiguous storage | Find the maximum and second maximum in one pass | Time O(n), space O(1) |
| Strings | Beginner | Arrays | [String Basics](../basic-data-structures/Strings/What_is%20String.md) | Characters, substrings, frequency maps | Check if two strings are anagrams | Time O(n), space O(k) |
| Recursion | Beginner | Functions and call stack | [Recursion](../extra/Recursion/recursion.md) | Base case, recursive step, stack frames | Print numbers from n to 1 and back to n | Recurrence depth and call stack space |

### Fundamentals Checklist

- [ ] I can explain Big O using one real example.
- [ ] I can trace an array traversal without skipping indexes.
- [ ] I can solve a basic string frequency problem.
- [ ] I can identify the base case in a recursive solution.
- [ ] I can write time and space complexity for every solution in this stage.

## Stage 2: Core Data Structures

| Topic | Difficulty | Prerequisites | Study Link | Key Concepts | Mini Challenge | Complexity Focus |
| --- | --- | --- | --- | --- | --- | --- |
| Two Pointers | Beginner | Arrays, strings | [Two Pointers](../extra/algorithms/Two-Pointers/introduction-to-two-pointers.md) | Opposite pointers, same-direction pointers | Check if a sorted array has a pair with target sum | Reduce O(n^2) brute force to O(n) |
| Sliding Window | Intermediate | Arrays, two pointers | [Sliding Window](../extra/Sliding-Window/introduction-to-sliding-window.mdx) | Fixed window, variable window, shrinking condition | Find maximum sum subarray of size k | Maintain O(n) by updating window state |
| Prefix Sum | Intermediate | Arrays | [Prefix Sum](../extra/Prefix-Sum-and-Difference-Array/introduction-to-prefix-sum.md) | Precomputation, range query, difference arrays | Answer five range-sum queries in O(1) each | Build O(n), query O(1), space O(n) |
| Stack | Beginner | Arrays, recursion | [Stack](../extra/Stack/introduction-to-stack.md) | LIFO, push, pop, monotonic stack | Validate balanced parentheses | Time O(n), stack space O(n) |
| Queue | Beginner | Arrays, linked lists | [Queue](../extra/Queue/circular-queue.md) | FIFO, circular buffer, enqueue, dequeue | Simulate a ticket counter queue | O(1) enqueue and dequeue |
| Hashing | Intermediate | Arrays, strings | [Hashing](../extra/Hashing/what-is-hashing.md) | Hash tables, collisions, frequency maps | Find the first non-repeating character | Expected O(1) lookup, O(n) scan |
| Linked List | Intermediate | Pointers or references | [Linked List](../extra/linked-list/introduction-to-linked-list.md) | Nodes, next pointer, traversal, insertion | Reverse a singly linked list | Time O(n), space O(1) iterative |

### Core Data Structures Checklist

- [ ] I can choose between two pointers and sliding window.
- [ ] I can use prefix sums for repeated range queries.
- [ ] I can explain stack and queue ordering from memory.
- [ ] I can use a hash map to remove nested loops.
- [ ] I can update linked list pointers without losing nodes.

## Stage 3: Trees, Heaps, and Advanced Structures

| Topic | Difficulty | Prerequisites | Study Link | Key Concepts | Mini Challenge | Complexity Focus |
| --- | --- | --- | --- | --- | --- | --- |
| Binary Tree | Intermediate | Recursion, queues | [Binary Tree](../extra/Trees/binary-tree.md) | Root, child, traversal, height | Compute maximum depth recursively | Time O(n), recursion space O(h) |
| Binary Search Tree | Intermediate | Binary tree, binary search | [Binary Search Tree](../extra/Trees/binary-search-tree.md) | Ordered tree, insert, search, delete | Search a value in a BST | Average O(log n), worst O(n) |
| Trie | Advanced | Strings, trees | [Trie](../extra/Tries/tries-theory.md) | Prefix tree, character edges, word ending | Build autocomplete for a word list | O(L) search where L is word length |
| Heap | Intermediate | Arrays, tree basics | [Heap Basics](../extra/heap/heap-basics.md) | Min heap, max heap, priority queue | Find the kth largest element | O(n log k) with bounded heap |
| Segment Tree | Advanced | Recursion, arrays | [Segment Tree](../extra/advance-data-structure/segment-tree.md) | Range query, range update, tree nodes | Support range sum queries with point updates | Query O(log n), update O(log n) |
| Fenwick Tree | Advanced | Prefix sum, binary operations | [Fenwick Tree](../extra/advance-data-structure/fenwick-tree.md) | Binary indexed tree, prefix query | Count prefix sums after point updates | Query O(log n), update O(log n) |

### Trees and Advanced Structures Checklist

- [ ] I can trace preorder, inorder, and postorder traversal.
- [ ] I can explain why an unbalanced BST can become O(n).
- [ ] I can choose a heap when the problem asks for top-k values.
- [ ] I can explain the difference between segment trees and Fenwick trees.

## Stage 4: Algorithmic Paradigms

| Topic | Difficulty | Prerequisites | Study Link | Key Concepts | Mini Challenge | Complexity Focus |
| --- | --- | --- | --- | --- | --- | --- |
| Binary Search | Intermediate | Sorted arrays | [Binary Search](../extra/algorithms/Searching%20Algorithms/BinarySearch.md) | Search space, mid calculation, boundaries | Find first occurrence of a target | O(log n), O(1) space |
| Sorting | Beginner | Arrays | [Merge Sort](../extra/algorithms/sorting-algorithms/MergeSort.md) | Divide and conquer, stable sorting | Sort numbers and preserve equal-item order | O(n log n), O(n) auxiliary space |
| Greedy | Intermediate | Sorting, heaps | [Greedy Theory](../extra/algorithms/greedy-algorithms/greedy-theory.md) | Local choice, proof by exchange | Solve activity selection | Usually O(n log n) after sorting |
| Backtracking | Advanced | Recursion, arrays | [Backtracking](../extra/algorithms/backtracking-algorithms/what-is-backtracking.md) | State, choice, constraint, undo | Generate all valid parentheses strings | Exponential time, recursion depth |
| Bit Manipulation | Intermediate | Number systems | [Bit Manipulation](../extra/bit-manipulation/bit-manipulation-technique.md) | AND, OR, XOR, shifts, masks | Count set bits in an integer | O(number of bits), O(1) space |
| Dynamic Programming | Advanced | Recursion, arrays | [Identify DP Problems](../extra/dynamic-programming/how-to-identify.md) | Overlapping subproblems, memoization, tabulation | Solve house robber using tabulation | State count times transition cost |

### Algorithmic Paradigms Checklist

- [ ] I can write binary search without an infinite loop.
- [ ] I can explain merge sort's recurrence relation.
- [ ] I can state why a greedy choice is safe.
- [ ] I can draw the recursion tree for a backtracking solution.
- [ ] I can define DP state, transition, and base case.

## Stage 5: Graphs and Interview Practice

| Topic | Difficulty | Prerequisites | Study Link | Key Concepts | Mini Challenge | Complexity Focus |
| --- | --- | --- | --- | --- | --- | --- |
| Graph Representation | Intermediate | Hashing, arrays | [Adjacency List](../extra/graphs/Adjacency-List.md) | Nodes, edges, adjacency list, adjacency matrix | Convert edge list to adjacency list | Build O(V + E), space O(V + E) |
| Breadth-First Search | Intermediate | Queue, graph representation | [BFS](../extra/graphs/bfs.md) | Level order traversal, shortest unweighted path | Find shortest path in an unweighted graph | O(V + E), queue space O(V) |
| Depth-First Search | Intermediate | Stack, recursion | [DFS](../extra/graphs/dfs.md) | Visited set, recursion, connected components | Count connected components | O(V + E), recursion stack O(V) |
| Dijkstra's Algorithm | Advanced | Heap, graphs | [Dijkstra](../extra/graphs/shortest-path-algorithms/dijkstra-algorithm.md) | Weighted graph, priority queue, relaxation | Find shortest path with positive weights | O((V + E) log V) with heap |
| Disjoint Set Union | Advanced | Graphs, trees | [Disjoint Set](../extra/advance-data-structure/disjoint-set.md) | Parent array, union, find, path compression | Detect cycle in an undirected graph | Almost O(1) amortized operations |
| Practice Problems | Intermediate | Completed core stages | [DSA Problem Solutions](../extra/DSA-Problem-Solution/two_sum.md) | Pattern recognition, constraints, dry runs | Solve one easy, one medium, one hard problem weekly | Choose the best target complexity before coding |

### Graphs and Practice Checklist

- [ ] I can choose BFS for shortest paths in unweighted graphs.
- [ ] I can choose DFS for traversal and component problems.
- [ ] I can explain why Dijkstra needs non-negative edge weights.
- [ ] I can use DSU for connectivity and cycle detection.
- [ ] I can identify the dominant operation in an interview problem.

## Completion Review

Before marking this tracker complete, review these questions:

- [ ] Can I explain the prerequisite chain from arrays to dynamic programming?
- [ ] Can I choose a data structure based on operations instead of topic names?
- [ ] Can I solve a problem, then write its complexity without looking at notes?
- [ ] Can I explain the tradeoff between a brute-force and optimized solution?
- [ ] Can I map a new problem to at least one known pattern?

## Suggested Weekly Plan

| Week | Focus | Target Outcome |
| --- | --- | --- |
| 1 | Fundamentals, arrays, strings, recursion | Build comfort with traversal and simple complexity analysis |
| 2 | Two pointers, sliding window, prefix sums, hashing | Reduce brute-force solutions using reusable patterns |
| 3 | Stack, queue, linked list, trees | Understand pointer, recursion, and ordering-based structures |
| 4 | Heap, trie, binary search, sorting, greedy | Solve search, top-k, and scheduling-style problems |
| 5 | Backtracking, bit manipulation, dynamic programming | Practice state design and exponential-vs-polynomial tradeoffs |
| 6 | Graphs, Dijkstra, DSU, mixed practice | Prepare for interview-style problem selection and explanation |

Use this plan flexibly. The goal is not to finish every topic quickly; the goal is to understand when and why each technique should be used.
