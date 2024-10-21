---
id: hamiltonian-path-cycle
sidebar_position: 2
title: Hamiltonian Path and Cycle
sidebar_label: Hamiltonian Path and Cycle
description: "Hamiltonian Path and Cycle problems are a classic graph theory problem where the task is to find a path or cycle that visits every vertex exactly once. These problems are NP-complete and are widely used in various applications such as route planning, logistics, and genome sequencing."
tags: [graph-theory, hamiltonian-cycle, backtracking]
---

## Hamiltonian Path and Cycle

The **Hamiltonian Path** is a path in an undirected or directed graph that visits each vertex exactly once. A **Hamiltonian Cycle** (or Circuit) is a Hamiltonian Path that starts and ends at the same vertex, forming a cycle. These problems are NP-complete and have numerous applications, particularly in areas such as route optimization, logistics, and bioinformatics.

### What is a Hamiltonian Path?

In simple terms, a Hamiltonian Path is a path in a graph where each vertex is visited exactly once. If such a path exists, the graph is called a Hamiltonian Graph. If the path forms a cycle, where the first and last vertex are the same, it is called a Hamiltonian Cycle.

### Key Features of Hamiltonian Path and Cycle Problems

1. **NP-complete Problem**: Both the Hamiltonian Path and Cycle problems are NP-complete, meaning no polynomial-time algorithm is known to solve them for arbitrary graphs.
   
2. **Backtracking Approach**: A popular way to solve the Hamiltonian problems is by using backtracking. This involves trying to construct the solution one step at a time and abandoning paths that fail to satisfy the required conditions.

3. **Cycle Condition**: For a Hamiltonian Cycle, the solution must form a cycle, i.e., the path should return to the starting vertex.

### How Does Backtracking Solve the Hamiltonian Path Problem?

1. **Recursive Structure**:
   The problem is solved by recursively visiting vertices, starting from an arbitrary vertex and keeping track of visited vertices to avoid revisiting them.

2. **Base Case**:
   The recursion stops when all vertices are visited. If a path is found, it is returned as a solution. If the current path leads to a dead-end, the algorithm backtracks by removing the last vertex from the path and trying another one.

3. **Cycle Check**:
   In the case of Hamiltonian Cycle, after visiting all vertices, an additional check is made to see if the last vertex in the path is adjacent to the first vertex.

### Step-by-Step Backtracking Example: Hamiltonian Cycle

Consider a graph represented by an adjacency matrix. We aim to find a Hamiltonian Cycle in this graph.

**Algorithm**:

1. Start from the first vertex and mark it as visited.
2. Try to find the next vertex that hasn't been visited and is connected to the current vertex.
3. If all vertices are visited and there is an edge from the last vertex to the first, a cycle is found.
4. If no such vertex is found, backtrack and try a different path.

```cpp
#include <iostream>
#include <vector>
using namespace std;

bool isSafe(int v, vector<vector<int>>& graph, vector<int>& path, int pos) {
    // Check if current vertex and the last vertex in path are adjacent
    if (graph[path[pos - 1]][v] == 0) {
        return false;
    }

    // Check if the current vertex has already been included in the path
    for (int i = 0; i < pos; i++) {
        if (path[i] == v) {
            return false;
        }
    }

    return true;
}

bool hamiltonianCycleUtil(vector<vector<int>>& graph, vector<int>& path, int pos, int N) {
    // Base case: If all vertices are in the path, check if there is an edge to the start vertex
    if (pos == N) {
        return graph[path[pos - 1]][path[0]] == 1;
    }

    // Try different vertices as next candidates in the Hamiltonian Cycle
    for (int v = 1; v < N; v++) {
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;  // Add vertex v to the path

            if (hamiltonianCycleUtil(graph, path, pos + 1, N)) {
                return true;  // If cycle is found, return true
            }

            path[pos] = -1;  // Backtrack
        }
    }

    return false;  // No cycle found
}

void hamiltonianCycle(vector<vector<int>>& graph, int N) {
    vector<int> path(N, -1);
    path[0] = 0;  // Start from the first vertex

    if (!hamiltonianCycleUtil(graph, path, 1, N)) {
        cout << "No Hamiltonian Cycle exists" << endl;
        return;
    }

    // Print the Hamiltonian Cycle
    cout << "Hamiltonian Cycle: ";
    for (int i = 0; i < N; i++) {
        cout << path[i] << " ";
    }
    cout << path[0] << endl;  // Print the first vertex again to complete the cycle
}

int main() {
    // Example graph represented as an adjacency matrix
    vector<vector<int>> graph = {{0, 1, 0, 1, 0},
                                 {1, 0, 1, 1, 1},
                                 {0, 1, 0, 0, 1},
                                 {1, 1, 0, 0, 1},
                                 {0, 1, 1, 1, 0}};

    int N = graph.size();
    hamiltonianCycle(graph, N);

    return 0;
}

```