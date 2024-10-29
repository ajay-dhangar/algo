---
id: graph-coloring
title: Graph Coloring using Greedy Algorithm
sidebar_label: Graph Coloring
description: "In this document, we explore the graph coloring problem and provide a C implementation using a greedy algorithm."
tags: [dsa, algorithms, graph coloring]
---

### C Code: Graph Coloring using Greedy Algorithm

```c
#include <stdio.h>
#include <stdbool.h>

#define V 4  // Number of vertices in the graph

// Function to check if the color assignment is valid for the given vertex
bool isSafe(int v, int graph[V][V], int color[], int c) {
    for (int i = 0; i < V; i++)
        if (graph[v][i] && color[i] == c)  // Check if adjacent vertices have the same color
            return false;
    return true;
}

// Recursive function to assign colors to vertices
bool graphColoringUtil(int graph[V][V], int m, int color[], int v) {
    if (v == V)  // All vertices are assigned a color
        return true;

    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c;

            // Recur to assign colors to the rest of the vertices
            if (graphColoringUtil(graph, m, color, v + 1))
                return true;

            color[v] = 0;  // Backtrack
        }
    }

    return false;
}

// Main function to solve the m-coloring problem
bool graphColoring(int graph[V][V], int m) {
    int color[V] = {0};  // Initialize all vertices as unassigned (0)

    if (!graphColoringUtil(graph, m, color, 0)) {
        printf("Solution does not exist\n");
        return false;
    }

    // Print the color assignment
    printf("Solution exists with the following color assignment:\n");
    for (int i = 0; i < V; i++)
        printf("Vertex %d ---> Color %d\n", i, color[i]);

    return true;
}

// Main function
int main() {
    // Example adjacency matrix for a graph
    int graph[V][V] = {
        {0, 1, 1, 1},
        {1, 0, 1, 0},
        {1, 1, 0, 1},
        {1, 0, 1, 0}
    };

    int m = 3;  // Number of colors
    graphColoring(graph, m);

    return 0;
}
```
Key Concepts:

➢ The graph coloring problem is a classic problem in graph theory where the goal is to assign colors to the vertices of a graph such that no two adjacent vertices share the same color.
➢ The greedy algorithm is a simple and efficient approach to solve the graph coloring problem. It works by iteratively assigning the smallest available color to each vertex while ensuring that no two adjacent vertices share the same color.


Here is an example:
Using the adjacency matrix:

```
graph[V][V] = {
    {0, 1, 1, 1},
    {1, 0, 1, 0},
    {1, 1, 0, 1},
    {1, 0, 1, 0}
};
```

- With m = 3 colors, a possible output is:

```
Solution exists with the following color assignment:
Vertex 0 ---> Color 1
Vertex 1 ---> Color 2
Vertex 2 ---> Color 3
Vertex 3 ---> Color 1
```

This result assigns colors such that no two adjacent vertices share the same color.

### Limitations
- This approach is not efficient for large graphs, as it uses a backtracking technique that has exponential time complexity in the worst case.
- The solution may not be optimal for large and complex graphs.

### Notes
- Adjust the adjacency matrix and m (number of colors) as needed to test different graphs.
This code can be modified to use a non-greedy approach for graphs where a minimal coloring is essential.