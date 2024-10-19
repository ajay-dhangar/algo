---
id: minimum-spanning-tree  
title: Minimum Spanning Tree Algorithms  
sidebar_label: Minimum Spanning Tree  
description: "In this blog post, we'll explore Minimum Spanning Tree (MST) algorithms, specifically Prim's and Kruskal's algorithms, which are used to find the minimum cost spanning tree in a weighted graph."  
tags: [dsa, algorithms, graph algorithms, minimum spanning tree]

---

### Definition:

A Minimum Spanning Tree (MST) of a connected, undirected graph is a spanning tree that has the smallest possible total edge weight among all spanning trees. An MST connects all vertices in the graph without cycles and with the minimum sum of edge weights. 

### Characteristics:

- **Optimal Substructure**:  
  MST exhibits optimal substructure, meaning that an MST of a graph contains the MSTs of its subgraphs.

- **Greedy Approach**:  
  Both Prim's and Kruskal's algorithms use a greedy strategy to find the MST. They build the MST by adding edges in a way that minimizes the total weight while ensuring no cycles are formed.

### Prim's Algorithm:

1. **Initialization**:  
   Start with an arbitrary vertex and mark it as part of the MST. Initialize a priority queue (min-heap) to keep track of the edges.

2. **Edge Selection**:  
   Continuously extract the edge with the smallest weight from the priority queue that connects a vertex in the MST to a vertex outside the MST. Add this edge to the MST and mark the new vertex as part of the MST.

3. **Repeat**:  
   Repeat the process until all vertices are included in the MST.

### Time Complexity of Prim's Algorithm:

- **Time Complexity**: $O(E \log V)$  
  The complexity arises from maintaining the priority queue for the edges, where E is the number of edges and V is the number of vertices.

### Kruskal's Algorithm:

1. **Edge Sorting**:  
   Start by sorting all the edges in the graph in ascending order based on their weights.

2. **Union-Find Structure**:  
   Use a union-find (disjoint-set) data structure to keep track of connected components.

3. **Edge Selection**:  
   Iterate through the sorted edge list, adding edges to the MST if they do not form a cycle (i.e., if they connect two different components).

4. **Repeat**:  
   Continue until the MST contains exactly \(V-1\) edges, where V is the number of vertices.

### Time Complexity of Kruskal's Algorithm:

- **Time Complexity**: $O(E \log E + E \log V)$  
  The complexity comes from sorting the edges and performing union-find operations.

### Example:

Consider the following graph with vertices and weighted edges:


### Step-by-Step Execution:

#### Prim's Algorithm:

1. **Initialization**:  
   Start from vertex A and add edges to the priority queue:  
   - Edges: `{(A, B, 1), (A, C, 3)}`

2. **Edge Selection**:  
   - Select edge `(A, B, 1)`, MST: `{(A, B)}`.
   - Add edges from B: `{(B, C, 4), (B, D, 2)}`.

3. **Repeat**:  
   - Select edge `(B, D, 2)`, MST: `{(A, B), (B, D)}`.
   - Add edges from D: `{(D, C, 5)}`.
   - Select edge `(A, C, 3)`, MST: `{(A, B), (B, D), (A, C)}`.

The final MST contains edges: `{(A, B), (B, D), (A, C)}` with a total weight of `1 + 2 + 3 = 6`.

#### Kruskal's Algorithm:

1. **Edge Sorting**:  
   Sorted edges: `{(A, B, 1), (B, D, 2), (A, C, 3), (B, C, 4), (D, C, 5)}`.

2. **Edge Selection**:  
   - Select `(A, B, 1)`, MST: `{(A, B)}`.
   - Select `(B, D, 2)`, MST: `{(A, B), (B, D)}`.
   - Select `(A, C, 3)`, MST: `{(A, B), (B, D), (A, C)}`.

The final MST contains edges: `{(A, B), (B, D), (A, C)}` with a total weight of `1 + 2 + 3 = 6`.

### C++ Implementation of Prim's Algorithm:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <utility>

using namespace std;

// Prim's Algorithm
void primMST(vector<vector<pair<int, int>>>& graph, int V) {
    vector<int> key(V, INT_MAX);
    vector<bool> inMST(V, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    key[0] = 0;
    pq.push({0, 0}); // {key, vertex}

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        inMST[u] = true;

        for (auto& neighbor : graph[u]) {
            int v = neighbor.first;
            int weight = neighbor.second;

            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({key[v], v});
            }
        }
    }

    cout << "Minimum Spanning Tree weights:\n";
    for (int i = 1; i < V; ++i)
        cout << "Vertex " << i << " has key value: " << key[i] << "\n";
}

int main() {
    int V = 5; // Number of vertices
    vector<vector<pair<int, int>>> graph(V);

    // Graph edges (u, v, weight)
    graph[0].push_back({1, 1});
    graph[1].push_back({0, 1});
    graph[1].push_back({3, 2});
    graph[3].push_back({1, 2});
    graph[3].push_back({4, 5});
    graph[4].push_back({3, 5});
    graph[0].push_back({2, 3});
    graph[2].push_back({0, 3});
    graph[1].push_back({2, 4});
    graph[2].push_back({1, 4});

    primMST(graph, V);

    return 0;
}

### C++ Implementation of Kruskal Algorithm:
```cpp

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Disjoint Set Union (Union-Find)
class DisjointSet {
    vector<int> parent, rank;

public:
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i) parent[i] = i;
    }

    int find(int u) {
        if (u != parent[u])
            parent[u] = find(parent[u]); // Path compression
        return parent[u];
    }

    void unionSets(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV])
                parent[rootV] = rootU;
            else if (rank[rootU] < rank[rootV])
                parent[rootU] = rootV;
            else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
};

// Kruskal's Algorithm
void kruskalMST(vector<tuple<int, int, int>>& edges, int V) {
    sort(edges.begin(), edges.end()); // Sort edges based on weight
    DisjointSet ds(V);
    vector<tuple<int, int, int>> mstEdges;

    for (auto& edge : edges) {
        int weight, u, v;
        tie(weight, u, v) = edge;

        if (ds.find(u) != ds.find(v)) {
            ds.unionSets(u, v);
            mstEdges.push_back(edge);
        }
    }

    cout << "Edges in Minimum Spanning Tree:\n";
    for (auto& edge : mstEdges) {
        int weight, u, v;
        tie(weight, u, v) = edge;
        cout << u << " -- " << v << " == " << weight << "\n";
    }
}

int main() {
    int V = 5; // Number of vertices
    vector<tuple<int, int, int>> edges = {
        {1, 0, 1},
        {2, 1, 3},
        {3, 0, 2},
        {4, 1, 2},
        {5, 3, 4}
    };

    kruskalMST(edges, V);
    return 0;
}

### Conclusion:

 Prim's and Kruskal's algorithms. Both algorithms efficiently find the MST of a weighted graph, ensuring that all vertices are connected with the minimum total edge weight. Understanding these algorithms is fundamental for various applications in computer science, including network design, clustering, and resource management.
