---
id: Prims
title: "Prim's Algorithm"
sidebar_label: "Prim's Algorithm"
description: "In this blog post, we'll explore Prim's Algorithm, a greedy algorithm used to find the Minimum Spanning Tree in a graph."
tags: [dsa, algorithms, minimum spanning tree]
---


### Definition:

Prim's algorithm is a **greedy algorithm** used to find the Minimum Spanning Tree (MST) of a connected, weighted, and undirected graph. The MST is a subset of the edges that connects all the vertices together with the minimum total edge weight and without forming any cycles.

### Characteristics:

- **Greedy Approach**:
  - Prim's algorithm starts from a selected node and grows the MST by adding the smallest edge from the MST to a new vertex, continuing until all vertices are included.

- **Vertex-Based Algorithm**:
  - Prim's algorithm focuses on growing the MST vertex by vertex, unlike Kruskal's which focuses on edges. The algorithm adds the shortest edge connected to the growing MST that connects a new vertex.

- **Priority Queue**:
  - Prim's algorithm often uses a priority queue (or a min-heap) to efficiently find the smallest edge. This helps in selecting the minimum weight edge at each step.

- **Applicable to Dense Graphs**:
  -Prim's algorithm is preferred for dense graphs where the number of edges is large relative to the number of vertices.

### Time Complexity:

- **Best, Average, and Worst Case: O(E log V)**
  Using a priority queue, Prim's algorithm achieves a time complexity of O(E log V), where E is the number of edges and V is the number of vertices.

### Space Complexity:

- **Space Complexity: O(V + E)**
  The algorithm requires additional space for the priority queue and arrays tracking visited vertices and minimum weights, resulting in a space complexity of O(V + E).

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <utility>
using namespace std;

typedef pair<int, int> pii;

int prim(int n, vector<vector<pii>>& adj) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<bool> inMST(n, false);
    vector<int> key(n, INT_MAX);
    int mst_weight = 0;

    key[0] = 0;
    pq.push({0, 0}); // {weight, vertex}

    while (!pq.empty()) {
        int u = pq.top().second;
        int weight = pq.top().first;
        pq.pop();

        if (inMST[u])
            continue;

        inMST[u] = true;
        mst_weight += weight;

        for (auto &[w, v] : adj[u]) {
            if (!inMST[v] && key[v] > w) {
                key[v] = w;
                pq.push({key[v], v});
            }
        }
    }

    return mst_weight;
}

int main() {
    int n = 4; // number of vertices
    vector<vector<pii>> adj(n);
    adj[0].push_back({10, 1});
    adj[0].push_back({6, 2});
    adj[0].push_back({5, 3});
    adj[1].push_back({10, 0});
    adj[1].push_back({15, 3});
    adj[2].push_back({6, 0});
    adj[2].push_back({4, 3});
    adj[3].push_back({5, 0});
    adj[3].push_back({15, 1});
    adj[3].push_back({4, 2});

    int mst_weight = prim(n, adj);
    cout << "Weight of the Minimum Spanning Tree: " << mst_weight << endl;

    return 0;
}
```

### Python Implementation:

```python
import heapq

def prim(n, adj):
    # Initialize the priority queue (min-heap) and other helper arrays
    pq = [(0, 0)]  # (weight, vertex)
    in_mst = [False] * n
    key = [float('inf')] * n
    key[0] = 0
    mst_weight = 0

    while pq:
        # Extract the minimum weight vertex
        weight, u = heapq.heappop(pq)
        
        if in_mst[u]:
            continue
        
        # Mark the vertex as part of the MST
        in_mst[u] = True
        mst_weight += weight

        # Check all adjacent vertices
        for w, v in adj[u]:
            if not in_mst[v] and key[v] > w:
                key[v] = w
                heapq.heappush(pq, (key[v], v))
                
    return mst_weight

# Example usage:
n = 4  # Number of vertices
adj = [
    [(10, 1), (6, 2), (5, 3)],   # Edges from vertex 0
    [(10, 0), (15, 3)],          # Edges from vertex 1
    [(6, 0), (4, 3)],            # Edges from vertex 2
    [(5, 0), (15, 1), (4, 2)]    # Edges from vertex 3
]

mst_weight = prim(n, adj)
print("Weight of the Minimum Spanning Tree:", mst_weight)
```

### Summary:

Prim's algorithm is a powerful tool for finding the Minimum Spanning Tree of a graph by growing the tree one vertex at a time. Using a priority queue allows the algorithm to efficiently pick the smallest edge from the MST to a new vertex, ensuring the minimum total weight. It is especially useful for dense graphs and has applications in various network design and optimization problems.
