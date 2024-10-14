---
id: bfs
title: Breadth-First Search (BFS)
sidebar_label: Breadth-First Search
description: "In this blog post, we'll explore Breadth-First Search (BFS), a graph traversal algorithm used to explore vertices and edges level by level in a graph."
tags: [dsa, algorithms, graph, traversal]
---

### Definition:

Breadth-First Search (BFS) is a **graph traversal algorithm** that explores vertices level by level. Starting from a source vertex, BFS explores all its direct neighbors before moving to the next level of neighbors. It is useful for traversing or searching graph data structures and can be applied to both directed and undirected graphs.

### Characteristics:

- **Level-Order Traversal**:
  - BFS visits nodes in a level-wise manner. Starting from the source node, it explores all the direct neighbors before moving to the next level.

- **Queue-Based Approach**:
  - BFS uses a **queue** data structure to keep track of nodes that need to be explored. The queue ensures that nodes are processed in the correct order, with nodes at the current level being processed before nodes at the next level.

- **Shortest Path in Unweighted Graphs**:
  - BFS can find the shortest path between two nodes in an unweighted graph. Since BFS explores paths in increasing order of their lengths, the first time a node is reached is through the shortest path.

### Time Complexity:

- **Best, Average, and Worst Case: $O(V + E)$**  
  Where `V` is the number of vertices and `E` is the number of edges in the graph. BFS explores each vertex and edge exactly once.

### Space Complexity:

- **Space Complexity: $O(V)$**  
  BFS requires space to store the visited vertices, the queue for traversal, and the adjacency list for the graph.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int start, vector<vector<int>>& adj_list, int n) {
    vector<bool> visited(n, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";

        for (int neighbor : adj_list[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
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

    int start_node = 0;
    cout << "BFS traversal starting from node " << start_node << ": ";
    bfs(start_node, adj_list, n);
    cout << endl;

    return 0;
}
```

### Conclusion:

Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores vertices level by level. It is widely used in various applications, such as finding the shortest path in unweighted graphs, analyzing network connectivity, and solving puzzles. By leveraging the queue data structure, BFS ensures that nodes are visited in the correct order, making it an essential tool for graph exploration and search.