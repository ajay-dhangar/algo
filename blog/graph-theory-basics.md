---
slug: graph-theory-basics
title: 'Graph Theory Basics'
authors: [AswaniBolisetti]
tags: [graphs, algorithms, dsa, bfs, dfs, dijkstra]
---

Graph theory is a branch of mathematics and computer science that studies 
the properties and relationships of graphs — consisting of vertices (nodes) 
and edges (links) connecting them.

<!-- truncate -->

## 1. Vertices and Edges

- **Vertices (Nodes):** Represent entities such as people in a social network or cities on a map.
- **Edges:** Represent relationships like friendships or roads between cities.

**Types:**
- **Undirected Graphs:** Edges have no direction — relationship is mutual.
- **Directed Graphs (Digraphs):** Edges have direction — relationship goes one way.

## 2. Types of Graphs

- **Simple Graph:** No loops or multiple edges between the same pair of vertices.
- **Weighted Graph:** Edges have weights/costs — useful for shortest path problems.
- **Complete Graph:** Every pair of distinct vertices is connected.
- **Cyclic vs Acyclic:** Cyclic contains cycles; acyclic does not. A Directed Acyclic Graph (DAG) is key in task scheduling.

## 3. Key Graph Algorithms

**Breadth-First Search (BFS):**
Explores level by level. Used for shortest path in unweighted graphs.
Time Complexity: O(V + E)

**Depth-First Search (DFS):**
Explores as far as possible before backtracking. Used for cycle detection and topological sorting.
Time Complexity: O(V + E)

**Dijkstra's Algorithm:**
Shortest path for weighted graphs from a single source.
Time Complexity: O((V + E) log V) with a priority queue.

**Kruskal's and Prim's Algorithms:**
Find the Minimum Spanning Tree (MST) — connects all vertices with minimum total edge weight.
Time Complexity: O(E log V)

## 4. Applications

- **Social Networks:** Modeling relationships between users.
- **Maps and Navigation:** Finding shortest routes.
- **Communication Networks:** Designing efficient data transfer networks.
- **Task Scheduling:** Using DAGs to model tasks with dependencies.

## 5. Graph Representations

- **Adjacency Matrix:** 2D array. Efficient for dense graphs but requires O(V²) space.
- **Adjacency List:** List of lists. More space-efficient for sparse graphs.

## Conclusion

Graph theory provides a powerful framework for solving a wide variety 
of problems in computer science — from social media and navigation 
systems to task scheduling and network design.