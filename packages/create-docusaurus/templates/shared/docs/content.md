---
id: table-of-contents
sidebar_position: 2
title: Table Of Contents
sidebar_label: Contents
---

import Authors from '../src/components/Authors'

---

<Authors names="@ajay-dhangar"/>

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="ds" label="Data Structures" default>
    ```mermaid
      sequenceDiagram
        participant User
        participant System

      User -> System: Request to Learn Data Structures

      System -> System: Introduction to Data Structures
      Note over System: What are data structures?<br /><br />Importance of data structures in programming

      System -> System: Basics of Arrays
      Note over System: Basics of arrays<br /><br />Operations on arrays (insertion, deletion, searching)

      System -> System: Linked Lists
      Note over System: Singly linked lists<br /><br />Doubly linked lists<br /><br />Circular linked lists

      System -> System: Stacks
      Note over System: Basics of stacks<br /><br />Implementation of stacks<br /><br />Applications of stacks

      System -> System: Queues
      Note over System: Basics of queues <br /><br />Implementation of queues<br /><br />Priority queues

      System -> System: Trees
      Note over System: Binary trees<br /><br />Binary search trees (BST)<br /><br />AVL trees (Balanced BST)

      System -> System: Graphs
      Note over System: Basics of graphs<br /><br />Graph representation (adjacency matrix, adjacency list)<br /><br />Depth-First Search (DFS) and Breadth-First Search (BFS)

      User -> System: Explore Further

      ````

  </TabItem>
  <TabItem value="algo" label="Algorithms">
    ```mermaid
      sequenceDiagram
        participant User
        participant System
      
        User -> System: Request to Learn Algorithms
      
        System -> System: Introduction to Algorithms
        Note over System: What are algorithms?<br /><br />Time and space complexity
      
        System -> System: Searching Algorithms
        Note over System: Linear search<br /><br />Binary search<br /><br />Hashing and hash tables
      
        System -> System: Sorting Algorithms
        Note over System: Bubble sort<br /><br />Selection sort<br /><br />Merge sort<br /><br />Quick sort
      
        System -> System: Recursion
        Note over System: Understanding recursion<br /><br />Recursive algorithms
      
        System -> System: Dynamic Programming
        Note over System: Basics of dynamic programming<br /><br />Memoization and tabulation
      
        System -> System: Greedy Algorithms
        Note over System: Basics of greedy algorithms<br /><br />Applications of greedy algorithms
      
        System -> System: Divide and Conquer
        Note over System: Principles of divide and conquer<br /><br />Examples of divide and conquer algorithms
      
        System -> System: Graph Algorithms
        Note over System: Shortest path algorithms (Dijkstra's, Bellman-Ford)<br /><br />Minimum Spanning Tree (Prim's, Kruskal's)<br /><br />Depth-First Search (DFS) and Breadth-First Search (BFS) for graphs
      
        User -> System: Explore Further
      
      ````
  </TabItem>
  <TabItem value="Practice" label="Practice and Applications">
    ```mermaid
      sequenceDiagram
        participant User
        participant System

        User -> System: Request for Practice and Applications

        System -> System: Coding Challenges
        Note over System: Solve coding problems on platforms <br /><br />like LeetCode, HackerRank, and CodeSignal

        System -> System: Project Work
        Note over System: Implement data structures and algorithms in small projects

        System -> System: Real-world Applications
        Note over System: Explore how DSA is applied in real-world scenarios

        System -> System: Interview Preparation
        Note over System: Tips for technical interviews<br /><br />Practice common DSA interview questions

        User -> System: Explore Further

      ```
  </TabItem>
</Tabs>
