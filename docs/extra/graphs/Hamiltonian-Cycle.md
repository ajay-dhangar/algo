---
id: hamiltonian-cycle
title: Hamiltonian Cycle Algorithm
sidebar_label: Hamiltonian Cycle
sidebar_position: 11
description: A comprehensive guide to the Hamiltonian Cycle problem, an NP-complete graph problem solved via backtracking.
tags: [dsa, graphs, backtracking, np-complete, hamiltonian-cycle]
---

## Introduction

A **Hamiltonian Cycle** (or Hamiltonian circuit) is a cycle in an undirected or directed graph that visits every vertex exactly once and returns to the starting vertex. The problem of determining whether such a cycle exists is one of the classical NP-complete problems.

Named after mathematician Sir William Rowan Hamilton, this problem has significant implications in graph theory and combinatorial optimization.

## Problem Statement

Given an undirected graph G = (V, E), find a cycle that visits every vertex exactly once and returns to the starting vertex.

Unlike the Eulerian cycle problem (which can be solved in polynomial time), the Hamiltonian cycle problem has no known polynomial-time algorithm.

## Relationship with Hamiltonian Path

- **Hamiltonian Cycle**: Starts and ends at the same vertex, visits all other vertices exactly once.
- **Hamiltonian Path**: Starts at one vertex and ends at another, visits all vertices exactly once (can be found by modifying the cycle algorithm).

## Backtracking Algorithm

The algorithm builds a path by adding vertices one by one, checking if the next vertex is adjacent to the last vertex in the current path and has not been visited yet.

### Algorithm (Pseudo-code)

```text
function hamCycle(graph):
    path = [0]  // Start from vertex 0
    visited = [false] with size = n
    visited[0] = true

    if hamCycleUtil(graph, path, 1, visited):
        return path + [path[0]]  // Complete the cycle
    else:
        return "No Hamiltonian Cycle exists"

function hamCycleUtil(graph, path, pos, visited):
    if pos == n:  // All vertices included
        // Check if there's an edge from last to first
        if graph[path[pos-1]][path[0]] == 1:
            return true
        else:
            return false

    for v in 1..n-1:
        if isSafe(graph, path, pos, v, visited):
            path[pos] = v
            visited[v] = true

            if hamCycleUtil(graph, path, pos+1, visited):
                return true

            // Backtrack
            path[pos] = -1
            visited[v] = false

    return false

function isSafe(graph, path, pos, v, visited):
    // v not visited yet
    if visited[v]:
        return false

    // Edge from last vertex to v exists
    if graph[path[pos-1]][v] == 0:
        return false

    return true
```

## Implementation in C

```c
#include <stdio.h>
#include <stdbool.h>

#define V 5

bool isSafe(int v, int graph[V][V], int path[], int pos) {
    // Check if vertex is adjacent to the previously added vertex
    if (graph[path[pos - 1]][v] == 0)
        return false;

    // Check if vertex has already been included
    for (int i = 0; i < pos; i++)
        if (path[i] == v)
            return false;

    return true;
}

void printPath(int path[]) {
    printf("Hamiltonian Cycle: ");
    for (int i = 0; i < V; i++)
        printf("%d -> ", path[i]);
    printf("%d\n", path[0]);
}

bool hamCycleUtil(int graph[V][V], int path[], int pos) {
    // Base case: all vertices are included in the path
    if (pos == V) {
        // Check if there's an edge from last vertex back to first
        if (graph[path[pos - 1]][path[0]] == 1)
            return true;
        else
            return false;
    }

    for (int v = 1; v < V; v++) {
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;

            if (hamCycleUtil(graph, path, pos + 1))
                return true;

            // Backtrack
            path[pos] = -1;
        }
    }

    return false;
}

bool hamCycle(int graph[V][V]) {
    int* path = (int*)malloc(V * sizeof(int));
    for (int i = 0; i < V; i++)
        path[i] = -1;

    // Start from vertex 0
    path[0] = 0;

    if (!hamCycleUtil(graph, path, 1)) {
        printf("No Hamiltonian Cycle exists\n");
        free(path);
        return false;
    }

    printPath(path);
    free(path);
    return true;
}

int main() {
    int graph1[V][V] = {
        {0, 1, 0, 1, 0},
        {1, 0, 1, 1, 1},
        {0, 1, 0, 0, 1},
        {1, 1, 0, 0, 1},
        {0, 1, 1, 1, 0}
    };

    hamCycle(graph1);
    return 0;
}
```

## Implementation in Python

```python
def hamiltonian_cycle(graph):
    """
    graph: adjacency matrix (list of lists)
    Returns one Hamiltonian cycle if it exists, else None.
    """
    n = len(graph)

    def is_safe(v, path, pos):
        # Check if vertex is adjacent to the last vertex in path
        if graph[path[pos - 1]][v] == 0:
            return False
        # Check if vertex is already in path
        if v in path:
            return False
        return True

    def backtrack(path, pos):
        # Base case: all vertices are in the path
        if pos == n:
            # Check if there's an edge from last to first
            if graph[path[pos - 1]][path[0]] == 1:
                return True
            return False

        for v in range(1, n):
            if is_safe(v, path, pos):
                path[pos] = v
                if backtrack(path, pos + 1):
                    return True
                path[pos] = -1  # backtrack
        return False

    path = [-1] * n
    path[0] = 0  # Start from vertex 0

    if backtrack(path, 1):
        return path + [path[0]]
    return None


# Example graph
graph = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0]
]

cycle = hamiltonian_cycle(graph)
if cycle:
    print("Hamiltonian Cycle:", cycle)
else:
    print("No Hamiltonian Cycle exists")
```

## Branch and Bound Optimization

The naive backtracking can be slow for large graphs. Key optimizations:

1. **Degree-based Pruning**: Prioritize vertices with fewer available neighbors.
2. **Reduced Cost Matrix**: For the Held-Karp formulation in TSP.
3. **Forbidden Edges**: Eliminate edges that would create a dead-end early.

## Complexity Analysis

| Metric | Value |
|--------|-------|
| Time Complexity | O(N!) - must potentially try all permutations |
| Space Complexity | O(N) - recursion stack and path array |
| NP-Complete | No known polynomial-time algorithm |

## Comparison with Eulerian Cycle

| Aspect | Eulerian Cycle | Hamiltonian Cycle |
|--------|---------------|------------------|
| Condition | Every vertex has even degree | No simple degree condition |
| Solution | O(V + E) via Fleury's/Hierholzer's | O(N!) via backtracking |
| Complexity | Polynomial | NP-Complete |

## Practice Problems

1. Find all Hamiltonian cycles in a given graph.
2. Solve the Hamiltonian Path problem (no return to start).
3. Implement branch and bound with cost lower bounds for TSP.
4. Given an NxN grid, find a Hamiltonian cycle (snake-like path).
5. Determine if a directed graph has a Hamiltonian cycle.
