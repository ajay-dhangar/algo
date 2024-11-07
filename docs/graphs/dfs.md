---
id: dfs
title: Depth-First Search (DFS)
sidebar_label: Depth-First Search
description: "In this blog post, we'll explore Depth-First Search (DFS), a graph traversal algorithm used to explore vertices and edges by going as deep as possible before backtracking."
tags: [dsa, algorithms, graph, traversal]
---

### Definition:

Depth-First Search (DFS) is a **graph traversal algorithm** that explores as far as possible along each branch before backtracking. DFS starts from a source vertex and explores each branch or path before moving to a new one. It is commonly used for traversing or searching tree or graph data structures.

### Characteristics:

- **Recursive or Stack-Based Traversal**:
  - DFS can be implemented using recursion or a stack data structure. It explores a node, then recursively explores its neighbors before backtracking to explore other branches.

- **Preorder Traversal**:
  - DFS naturally performs a preorder traversal of the graph, visiting a node before any of its neighbors. This makes it useful for tasks like topological sorting, detecting cycles, or pathfinding in specific types of graphs.

- **Backtracking**:
  - DFS backtracks when it reaches a node with no unvisited neighbors. It then returns to previous nodes to explore unvisited paths.

### Time Complexity:

- **Best, Average, and Worst Case: $O(V + E)$**  
  Where `V` is the number of vertices and `E` is the number of edges. DFS explores every vertex and edge exactly once.

### Space Complexity:

- **Space Complexity: $O(V)$**  
  In the worst case, DFS requires space proportional to the number of vertices, either due to the recursion stack or an explicit stack used for the traversal.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj_list, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";

    for (int neighbor : adj_list[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj_list, visited);
        }
    }
}

int main() {
    int n = 5;  // number of nodes
    vector<vector<int>> adj_list(n);

    adj_list[0] = {1, 2};
    adj_list[1] = {0, 3, 4};
    adj_list[2] = {0};
    adj_list[3] = {1};
    adj_list[4] = {1};

    vector<bool> visited(n, false);
    int start_node = 0;
    cout << "DFS traversal starting from node " << start_node << ": ";
    dfs(start_node, adj_list, visited);
    cout << endl;

    return 0;
}
```