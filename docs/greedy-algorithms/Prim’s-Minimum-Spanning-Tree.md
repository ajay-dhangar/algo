id: prims-mst  
title: Prim's Minimum Spanning Tree (MST) Algorithm  
sidebar_label: Prim's MST  
description: "In this blog post, we'll explore Prim's Algorithm, a greedy algorithm used to find the Minimum Spanning Tree (MST) of a weighted undirected graph."  
tags: [dsa, algorithms, greedy algorithms, graph algorithms]
---

### Definition:
Prim's Minimum Spanning Tree (MST) is a greedy algorithm that finds the Minimum Spanning Tree for a weighted undirected graph. The MST is a subset of the graph that includes all the vertices and the minimum possible total edge weight without forming any cycles. Prim's algorithm starts with an arbitrary node and grows the MST by adding the shortest edge from the tree to a new vertex, ensuring all vertices are eventually included.

### Characteristics:
- **Greedy Approach**:  
  Prim's algorithm is a greedy algorithm that always selects the smallest edge connecting a vertex in the MST to a vertex outside the MST. This process continues until all vertices are included.
  
- **Graph Representation**:  
  Prim's algorithm can be implemented using an adjacency matrix or an adjacency list, with priority queues (min-heaps) used to efficiently retrieve the next minimum edge.
  
- **Connectivity Requirement**:  
  The graph must be connected; otherwise, an MST cannot be formed for the entire graph.

### Steps Involved:
1. **Initialize**:  
   Start with an arbitrary vertex, mark it as part of the MST, and initialize the cost of reaching each vertex with the weight of the edges.
   
2. **Pick the Minimum Edge**:  
   Select the edge with the smallest weight that connects a vertex in the MST to a vertex outside the MST.
   
3. **Add to MST**:  
   Add the selected vertex to the MST, update the weights of the adjacent vertices, and repeat until all vertices are included.

### Problem Statement:
Given a connected weighted graph, find the Minimum Spanning Tree (MST) using Prim's algorithm. The objective is to minimize the sum of the edge weights in the spanning tree while ensuring that all vertices are included and no cycles are formed.

### Time Complexity:
- **Best, Average, and Worst Case: $O(E \log V)$**  
  The time complexity depends on the priority queue operations for retrieving and updating the minimum edge, where $E$ is the number of edges, and $V$ is the number of vertices. Using a binary heap, the complexity is $O(E \log V)$.

### Space Complexity:
- **Space Complexity: $O(V)$**  
  The space complexity is dominated by the storage of the graph's adjacency list and the auxiliary arrays for tracking the MST.

### Example:
Consider the following graph:
```
     2       3
   A---B-------C
   |  /        |
  6| /1       5|
   |/          |
   D-----------E
       4
```
Vertices: `{A, B, C, D, E}`  
Edges: `{(A-B, 2), (A-D, 6), (B-C, 3), (B-D, 1), (C-E, 5), (D-E, 4)}`

Step-by-Step Execution:

1. **Start from vertex A**:
   - Include vertex A in the MST.
   - Select edge A-B (weight 2) as the minimum.
   
2. **Add vertex B to the MST**:
   - Select edge B-D (weight 1) as the minimum.

3. **Add vertex D to the MST**:
   - Select edge D-E (weight 4) as the minimum.
   
4. **Add vertex E to the MST**:
   - Select edge B-C (weight 3) as the minimum.
   
5. **Add vertex C to the MST**:  
   Now all vertices are included, and the MST is formed with total weight = 2 + 1 + 4 + 3 = 10.

### C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Pair structure: (weight, vertex)
typedef pair<int, int> PII;

void primMST(vector<vector<PII>>& adj, int V) {
    priority_queue<PII, vector<PII>, greater<PII>> pq;
    vector<int> key(V, INT_MAX);  // Used to store the minimum weight for each vertex
    vector<bool> inMST(V, false); // To track vertices in MST
    vector<int> parent(V, -1);    // To store MST edges
    int src = 0;  // Start from vertex 0
    pq.push({0, src});
    key[src] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        inMST[u] = true;

        // Traverse all adjacent vertices of u
        for (auto &edge : adj[u]) {
            int v = edge.second;
            int weight = edge.first;
            
            // If v is not in MST and weight of (u, v) is smaller than key[v]
            if (!inMST[v] && key[v] > weight) {
                key[v] = weight;
                pq.push({key[v], v});
                parent[v] = u; // Track the MST path
            }
        }
    }

    // Output the MST
    cout << "Edges in MST:\n";
    for (int i = 1; i < V; i++) {
        cout << parent[i] << " - " << i << " : " << key[i] << "\n";
    }
}

int main() {
    int V = 5; // Number of vertices
    vector<vector<PII>> adj(V);

    // Graph with weighted edges
    adj[0].push_back({2, 1}); // A-B
    adj[1].push_back({2, 0}); // B-A

    adj[0].push_back({6, 3}); // A-D
    adj[3].push_back({6, 0}); // D-A

    adj[1].push_back({3, 2}); // B-C
    adj[2].push_back({3, 1}); // C-B

    adj[1].push_back({1, 3}); // B-D
    adj[3].push_back({1, 1}); // D-B

    adj[2].push_back({5, 4}); // C-E
    adj[4].push_back({5, 2}); // E-C

    adj[3].push_back({4, 4}); // D-E
    adj[4].push_back({4, 3}); // E-D

    primMST(adj, V);
    return 0;
}
```

### Summary:
Prim's MST algorithm is an efficient greedy approach to finding the Minimum Spanning Tree in a weighted undirected graph. By selecting the smallest edge at each step, it ensures that the MST is built with the least total weight, avoiding cycles. The time complexity of the algorithm is $O(E \log V)$, making it suitable for large, dense graphs. Prim's algorithm is used in various network design applications, including telecommunications, electrical grids, and transportation networks.