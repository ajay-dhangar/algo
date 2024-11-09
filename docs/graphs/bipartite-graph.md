---
id: bipartite-graph 
title: Bipartite-graph
sidebar_label: Bipartite-graph
description: "A bipartite graph is a graph whose vertices can be divided into two disjoint sets such that no two vertices within the same set are adjacent."  
tags: [dsa, algorithms, graph]
---

## Problem Statement:
Given an adjacency list / matrix representing a graph with V vertices indexed from 0, the task is to determine whether the graph is bipartite or not. You can use queue data structure to check the graph.

## Definition:
A bipartite graph is a type of graph where the set of vertices can be divided into two distinct sets such that no two vertices within the same set are adjacent. In other words, if you were to color the graph using two colors, it would be possible to color it in such a way that no two connected vertices have the same color. This property makes bipartite graphs useful in various applications, including matching problems, scheduling, and network flow analysis, as they can represent relationships where entities can be classified into two categories.

## Approach
The approach to check if a graph is bipartite involves using BFS or DFS to color the graph with two colors, ensuring that no two adjacent vertices share the same color.

## Algorithm Steps to Check if a Graph is Bipartite:

1. **Initialize Colors**: Create an array `color` of size V (number of vertices) and initialize all elements to -1, indicating that no vertices have been colored.

2. **BFS for Each Component**: For each vertex `start` from 0 to V-1:
   - If `color[start]` is not -1, continue to the next vertex (this vertex is already colored).

3. **Start BFS**:
   - Initialize a queue and push the `start` vertex into it.
   - Color `start` with color 0.

4. **Process the Queue**:
   - While the queue is not empty, dequeue a vertex and check its neighbors:
     - Color uncolored neighbors with the opposite color.
     - If a neighbor has the same color as the current vertex, return false (the graph is not bipartite).

5. **Completion**: If all vertices are processed without conflicts, return true (the graph is bipartite).


## Time Complexity:
- The bipartite graph checking algorithm has a time complexity of `O(V^2)` with an adjacency matrix, where `V` is the number of vertices. If an adjacency list is used, the complexity is `O(V + E)`, with `E` being the number of edges.

## Example:

### Sample Input:

Enter the number of vertices: 5                 
Enter the adjacency matrix:                           
0       1       1       0       0                             
1       0       0       1       0                             
1       0       0       1       0                              
0       1       1       0       1                           
0       0       0       1       0                       

### Sample Output:                   

The graph is bipartite.                              

## Explainataion of Sample:

**Diagrammatic representation of the above input:** 

```
   0 ---- 1
   |      |
   2 ---- 1 --- 4                            
```

To determine if the graph is bipartite, we can attempt to color the vertices using two colors. The following coloring can be used:

- Color Vertex 0 with color 0.
- Color Vertex 1 and Vertex 2 with color 1 (neighbors of Vertex 0).
- Color Vertex 3 with color 0 (neighbor of Vertices 1 and 2).
- Color Vertex 4 with color 1 (neighbor of Vertex 3).

Since we can assign colors such that no two adjacent vertices share the same color, the graph is confirmed to be bipartite.


## C++ Implementation:

```cpp

#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool isBipartite(const vector<vector<int>>& adjMatrix, int V) {
    // Initialize colors array with -1 (uncolored)
    vector<int> color(V, -1);
    // Process each component of the graph
    for (int start = 0; start < V; ++start) {
        // If the vertex is already colored, skip it
        if (color[start] != -1) continue;
        // Start BFS from this node
        queue<int> q;
        q.push(start);
        color[start] = 0; // Color the starting vertex with 0
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            // Check all adjacent vertices
            for (int neighbor = 0; neighbor < V; ++neighbor) {
                // Check if there's an edge between node and neighbor
                if (adjMatrix[node][neighbor] == 1) {
                    // If the neighbor hasn't been colored, color it with the opposite color
                    if (color[neighbor] == -1) {
                        color[neighbor] = 1 - color[node];
                        q.push(neighbor);
                    }
                    // If the neighbor has the same color as the current node, the graph is not bipartite
                    else if (color[neighbor] == color[node]) {
                        return false;
                    }
                }
            }
        }
    }
    // If we successfully colored the graph, it's bipartite
    return true;
}

int main() {
    int V;
    cout << "Enter the number of vertices: ";
    cin >> V;
    vector<vector<int>> adjMatrix(V, vector<int>(V, 0));
    cout << "Enter the adjacency matrix:\n";
    for (int i = 0; i < V; ++i) {
        for (int j = 0; j < V; ++j) {
            cin >> adjMatrix[i][j];
        }
    }
    if (isBipartite(adjMatrix, V)) {
        cout << "The graph is bipartite.\n";
    } else {
        cout << "The graph is not bipartite.\n";
    }
    return 0;
}

```
