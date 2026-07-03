---
id: dijkstra-vs-bellman-ford
title: Dijkstra vs Bellman-Ford
sidebar_label: Dijkstra vs Bellman-Ford
sidebar_position: 3
description: Comparison of Dijkstra's and Bellman-Ford algorithms for finding single-source shortest paths in graphs.
tags: [comparison, graph, shortest-path, dijkstra, bellman-ford]
---

Dijkstra's Algorithm and the Bellman-Ford Algorithm are both designed to solve the Single-Source Shortest Path (SSSP) problem, but they have major differences in constraints and efficiency.

## Comparison Table

### Variables:
* $V$: Number of vertices (nodes)
* $E$: Number of edges

| Feature | Dijkstra's Algorithm | Bellman-Ford Algorithm |
| --- | --- | --- |
| **Time Complexity** | $O((V + E) \log V)$ (with Min-Heap) | $O(V \cdot E)$ |
| **Negative Edges** | May produce incorrect results (greedy assumption is violated). | Handles negative edge weights safely. |
| **Negative Cycles** | Cannot detect (may loop infinitely or return incorrect distances). | Detects negative cycles and reports them. |
| **Approach** | Greedy. | Dynamic Programming (relaxation of all edges). |
| **Applicability** | Single-source shortest path. | Single-source shortest path, routing protocols. |

## How Relaxation Differs

* **Dijkstra** greedily selects the closest unvisited vertex and relaxes its outgoing edges. It visits each vertex once.
* **Bellman-Ford** relaxes all $E$ edges in the graph $V-1$ times. It does not make any greedy assumptions, allowing it to correctly propagate negative weights.

## Decision Criteria

* **Choose Dijkstra's** for most general shortest path applications (like maps or routing) where all edge weights are non-negative, as it is much faster.
* **Choose Bellman-Ford** only when negative edge weights are present or when you need to detect negative cycles (e.g., in financial arbitrage detection).
