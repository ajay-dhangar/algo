### C Code: Graph Coloring using Greedy Algorithm 🚀

```c
#include <stdio.h>
#include <stdbool.h>

#define V 4  // Number of vertices in the graph 🌐

// Function to check if the color assignment is valid for the given vertex 🔍
bool isSafe(int v, int graph[V][V], int color[], int c) {
    for (int i = 0; i < V; i++)
        if (graph[v][i] && color[i] == c)  // Check if adjacent vertices have the same color 🚫
            return false;
    return true;
}

// Recursive function to assign colors to vertices 🔄
bool graphColoringUtil(int graph[V][V], int m, int color[], int v) {
    if (v == V)  // All vertices are assigned a color 🎉
        return true;

    for (int c = 1; c <= m; c++) {
        if (isSafe(v, graph, color, c)) {
            color[v] = c;

            // Recur to assign colors to the rest of the vertices 🔄
            if (graphColoringUtil(graph, m, color, v + 1))
                return true;

            color[v] = 0;  // Backtrack 🔙
        }
    }

    return false;
}

// Main function to solve the m-coloring problem 🚧
bool graphColoring(int graph[V][V], int m) {
    int color[V] = {0};  // Initialize all vertices as unassigned (0) 🔄

    if (!graphColoringUtil(graph, m, color, 0)) {
        printf("Solution does not exist 😔\n");
        return false;
    }

    // Print the color assignment 🖨️
    printf("Solution exists with the following color assignment:\n");
    for (int i = 0; i < V; i++)
        printf("Vertex %d ---> Color %d\n", i, color[i]);

    return true;
}

// Main function 🚀
int main() {
    // Example adjacency matrix for a graph 🌐
    int graph[V][V] = {
        {0, 1, 1, 1},
        {1, 0, 1, 0},
        {1, 1, 0, 1},
        {1, 0, 1, 0}
    };

    int m = 3;  // Number of colors 🎨
    graphColoring(graph, m);

    return 0;
}
```

---

### README Document for Graph Coloring Algorithm 🚀

---

# Graph Coloring Algorithm in C 🚀

This project demonstrates the Graph Coloring algorithm using a greedy approach implemented in C. The algorithm tries to color the vertices of a graph such that no two adjacent vertices share the same color 🚫.

## Table of Contents
- [Description](#description)
- [Algorithm](#algorithm)
- [Usage](#usage)
- [Example](#example)
- [Limitations](#limitations)

## Description

Graph coloring is a way of coloring the vertices of a graph such that no two adjacent vertices have the same color 🚫. This problem is widely used in scheduling, register allocation in compilers, and many other optimization areas 🚀.

### Problem Statement

Given a graph represented by an adjacency matrix, and an integer `m` representing the number of colors, assign a color to each vertex such that:
- No two adjacent vertices have the same color 🚫.
- The solution uses at most `m` colors 🎨.

### Solution Approach

This implementation uses a backtracking approach:
1. **Color Assignment**: It attempts to color each vertex starting from vertex 0 🔄.
2. **Backtracking**: If the current color assignment leads to a conflict, it backtracks and tries another color 🔙.
3. **Stopping Condition**: The algorithm stops if all vertices are successfully colored or if no solution exists 🚧.

## Usage

### Requirements
- C compiler (like GCC) 🚧.

### Running the Program

1. **Compile** the code using the following command:
   ```bash
   gcc graph_coloring.c -o graph_coloring
   ```
2. **Execute** the program:
   ```bash
   ./graph_coloring
   ```

The program will output a possible coloring for the graph if a solution exists with the given number of colors, or it will indicate that no solution is possible 😔.

### Code Structure

- **isSafe**: Checks if it’s safe to color a vertex with a particular color 🔍.
- **graphColoringUtil**: Tries to color each vertex and recursively backtracks if needed 🔄.
- **graphColoring**: The main function that initializes color assignments and starts the recursive coloring 🚧.

## Example

Using the adjacency matrix:
```
graph[V][V] = {
    {0, 1, 1, 1},
    {1, 0, 1, 0},
    {1, 1, 0, 1},
    {1, 0, 1, 0}
};
```

With `m = 3` colors, a possible output is:
```
Solution exists with the following color assignment:
Vertex 0 ---> Color 1
Vertex 1 ---> Color 2
Vertex 2 ---> Color 3
Vertex 3 ---> Color 1
```

This result assigns colors such that no two adjacent vertices share the same color 🚫.

## Limitations

- This approach is not efficient for large graphs, as it uses a backtracking technique that has exponential time complexity in the worst case ⚠️.
- The solution may not be optimal for large and complex graphs 🚧.

---

### Notes

- Adjust the adjacency matrix and `m` (number of colors) as needed to test different graphs 🔄.
- This code can be modified to use a non-greedy approach for graphs where a minimal coloring is essential 🚀.

---