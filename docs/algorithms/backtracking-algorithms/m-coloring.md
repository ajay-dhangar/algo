---
id: m-coloring-problem
sidebar_position: 1
title: M-Coloring Problem
sidebar_label: M-Coloring Problem
description: "The M-Coloring problem is a backtracking algorithm where the task is to assign colors to vertices of a graph so that no two adjacent vertices share the same color. The goal is to find if it is possible to color the graph using at most M colors."
tags: [backtracking, graph-coloring, constraint satisfaction]
---

## M-Coloring Problem

The M-Coloring problem is a classic constraint satisfaction problem where the task is to color the vertices of a graph using at most M colors such that no two adjacent vertices have the same color. This problem can be solved using backtracking by exploring all possible color assignments and ensuring that constraints are not violated.

### Problem Definition

Given an undirected graph with **N** vertices and **E** edges, the task is to find a way to assign colors to each vertex such that no two adjacent vertices share the same color. You are allowed to use a maximum of **M** different colors.

### Key Features of the M-Coloring Problem

1. **Constraint Satisfaction**: Each vertex must be assigned one of the **M** colors, and no two adjacent vertices should have the same color.
2. **Backtracking Approach**: The algorithm tries to color one vertex at a time. If a valid coloring is found for the current vertex, it proceeds to color the next vertex. If not, it backtracks to try a different color for the previous vertex.

3. **Feasibility Check**: At each step, we check if assigning a particular color to a vertex is valid by ensuring that none of its adjacent vertices have the same color.

### How the M-Coloring Problem Works

The problem is solved using a backtracking algorithm that tries to assign colors to vertices one by one. If a color assignment leads to a conflict, the algorithm backtracks and tries a different color.

### Algorithm Steps

1. Assign the first vertex a color from the available **M** colors.
2. Recursively assign colors to the remaining vertices, ensuring that no adjacent vertices share the same color.
3. If a vertex cannot be assigned any color without violating the constraint, backtrack to the previous vertex and try a different color.
4. Continue this process until either all vertices are colored or it is determined that no valid coloring exists with **M** colors.

### Step-by-Step Example

Consider a graph with **4 vertices** and the following adjacency matrix:

We want to color this graph using at most 3 colors.

### C++ Code Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to check if the current color assignment is safe for vertex v
bool isSafe(int v, vector<vector<int>>& graph, vector<int>& color, int c) {
    for (int i = 0; i < graph.size(); i++) {
        if (graph[v][i] && color[i] == c) // Check adjacency and color constraint
            return false;
    }
    return true;
}

// A recursive utility function to solve M Coloring problem
bool graphColoringUtil(vector<vector<int>>& graph, int m, vector<int>& color, int v) {
    if (v == graph.size()) // All vertices are colored
        return true;

    // Try different colors for vertex v
    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c;  // Assign color c to vertex v

            // Recur to assign colors to the rest of the vertices
            if (graphColoringUtil(graph, m, color, v + 1))
                return true;

            color[v] = 0;  // Backtrack if no solution found
        }
    }

    return false;  // Return false if no coloring is possible
}

// Function to solve the M Coloring problem
bool graphColoring(vector<vector<int>>& graph, int m) {
    vector<int> color(graph.size(), 0);  // Initialize all vertices with no color

    // Call the utility function to solve the problem
    if (!graphColoringUtil(graph, m, color, 0)) {
        cout << "No solution exists for " << m << " colors." << endl;
        return false;
    }

    // Print the solution
    cout << "Solution exists for " << m << " colors:" << endl;
    for (int i = 0; i < graph.size(); i++) {
        cout << "Vertex " << i << " -> Color " << color[i] << endl;
    }
    return true;
}

int main() {
    // Example graph represented by adjacency matrix
    vector<vector<int>> graph = {{0, 1, 1, 1},
                                 {1, 0, 1, 0},
                                 {1, 1, 0, 1},
                                 {1, 0, 1, 0}};
    int m = 3;  // Number of colors
    graphColoring(graph, m);
    return 0;
}

```


### JavaScript Code Implementation

```javascript
function isSafe(v, graph, color, c) {
    // Check if the current color assignment is safe for vertex v
    for (let i = 0; i < graph.length; i++) {
        if (graph[v][i] === 1 && color[i] === c) { // Check adjacency and color constraint
            return false;
        }
    }
    return true;
}

function graphColoringUtil(graph, m, color, v) {
    // All vertices are colored
    if (v === graph.length) {
        return true;
    }

    // Try different colors for vertex v
    for (let c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c; // Assign color c to vertex v

            // Recur to assign colors to the rest of the vertices
            if (graphColoringUtil(graph, m, color, v + 1)) {
                return true;
            }

            color[v] = 0; // Backtrack if no solution found
        }
    }

    return false; // Return false if no coloring is possible
}

function graphColoring(graph, m) {
    const color = Array(graph.length).fill(0); // Initialize all vertices with no color

    // Call the utility function to solve the problem
    if (!graphColoringUtil(graph, m, color, 0)) {
        console.log(`No solution exists for ${m} colors.`);
        return false;
    }

    // Print the solution
    console.log(`Solution exists for ${m} colors:`);
    for (let i = 0; i < graph.length; i++) {
        console.log(`Vertex ${i} -> Color ${color[i]}`);
    }
    return true;
}

// Example graph represented by adjacency matrix
const graph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0]
];
const m = 3; // Number of colors
graphColoring(graph, m);
```

### Explanation of the Code

1. **`isSafe` Function**: Checks whether it's safe to assign a color `c` to vertex `v` by ensuring that no adjacent vertices have the same color.
  
2. **`graphColoringUtil` Function**: A recursive utility function that tries to color the graph. If it successfully colors all vertices, it returns `true`. If it can't color a vertex with any of the available colors, it backtracks.

3. **`graphColoring` Function**: Initializes the `color` array and calls the utility function. It also prints the results or indicates that no solution exists.

4. **Example Graph**: The adjacency matrix defines a graph with 4 vertices, and the program attempts to color it using up to 3 colors.

