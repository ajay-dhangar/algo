---
id: kruskal
title: Kruskal's Algorithm
sidebar_label: Kruskal's Algorithm
description: "In this blog post, we'll explore Kruskal's Algorithm, a greedy algorithm used to find the Minimum Spanning Tree in a graph."
tags: [dsa, algorithms, minimum spanning tree]
---


### Definition:

Kruskal's algorithm is a **greedy algorithm** used to find the Minimum Spanning Tree (MST) of a graph. The MST is a subset of the edges of a connected, weighted, and undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.

### Characteristics:

- **Greedy Approach**:
  - Kruskal's algorithm works by selecting the smallest edge and ensuring that no cycles are formed in the process. It greedily adds edges in increasing order of weight.

- **Disjoint Set Data Structure**:
  - The algorithm uses a **Disjoint Set Union (DSU)** or **Union-Find** data structure to efficiently determine whether adding an edge will form a cycle in the growing spanning tree.

- **Edge-Based Algorithm**:
  - Kruskal's algorithm focuses on edges rather than vertices, sorting them by weight and picking the smallest ones that do not create a cycle.

- **Applicable to Sparse Graphs**:
  - Kruskal's algorithm is often preferred for sparse graphs, where the number of edges is much smaller than the number of vertices squared.

### Time Complexity:

- **Best, Average, and Worst Case: O(E log E)**  
  Kruskal's algorithm sorts all the edges in ascending order of their weights, and the most time-consuming operation is sorting, which takes O(E log E), where E is the number of edges.

### Space Complexity:

- **Space Complexity: O(V + E)**  
  The algorithm requires extra space for the parent and rank arrays used by the Union-Find data structure, resulting in O(V + E) space, where V is the number of vertices and E is the number of edges.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, weight;
    bool operator<(Edge const& other) {
        return weight < other.weight;
    }
};

vector<int> parent, rank;

int find(int v) {
    if (v == parent[v])
        return v;
    return parent[v] = find(parent[v]);
}

void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a != b) {
        if (rank[a] < rank[b])
            swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b])
            rank[a]++;
    }
}

int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    parent.resize(n);
    rank.resize(n);
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }

    int mst_weight = 0;
    for (Edge e : edges) {
        if (find(e.u) != find(e.v)) {
            mst_weight += e.weight;
            unite(e.u, e.v);
        }
    }

    return mst_weight;
}

int main() {
    int n = 4; // number of vertices
    vector<Edge> edges = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}
    };

    int mst_weight = kruskal(n, edges);
    cout << "Weight of the Minimum Spanning Tree: " << mst_weight << endl;

    return 0;
}
```

### Summary:

Kruskal's algorithm is an efficient way to find the Minimum Spanning Tree of a graph by considering the smallest edges first. It uses the Union-Find data structure to avoid forming cycles and guarantees that the resulting spanning tree has the minimum possible total weight. The algorithm is particularly useful for sparse graphs and is widely used in network design and optimization problems.
