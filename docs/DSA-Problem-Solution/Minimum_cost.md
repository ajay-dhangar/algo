---
id: connecting-cities-with-minimum-cost
title: "Connecting Cities with Minimum Cost"
sidebar_label: "Connecting Cities with Minimum Cost"
sidebar_position: 11
description: "This document explains the 'Connecting Cities with Minimum Cost' problem, including its description, approach, and implementation."
tags: [DSA, problem-solving, graph, minimum-spanning-tree]
---

# Connecting Cities with Minimum Cost

## Problem Description

You are given a list of `n` cities and a list of connections between them. Each connection has a cost associated with it. The goal is to connect all cities with the minimum total cost, ensuring that all cities are reachable from one another. This problem can be represented as a graph where cities are nodes and connections are edges with weights.

For example, consider the following connections:

```
1 --(2)--> 2
1 --(3)--> 3
2 --(1)--> 3
3 --(4)--> 4
```

To connect all cities at the minimum cost, you need to find the minimum spanning tree (MST) of the graph. In the above example, the minimum cost to connect all cities would be `6`.

## Approach

To solve this problem, we can use algorithms such as **Kruskal's** or **Prim's** to find the minimum spanning tree (MST) of the graph. The steps are as follows:

1. **Create a List of Edges**:
   - Store all the connections (edges) between cities along with their costs.

2. **Sort Edges**:
   - Sort the edges based on their weights (cost).

3. **Union-Find Data Structure**:
   - Use the union-find data structure to keep track of connected components and ensure that we do not form cycles when adding edges.

4. **Select Edges**:
   - Iterate through the sorted edges, adding each edge to the MST if it connects two different components, until all cities are connected.

## Time Complexity

The time complexity of this approach is **O(E log E)**, where `E` is the number of edges. This complexity arises from sorting the edges. The union-find operations can be performed in nearly constant time, making the overall approach efficient.

## Implementation

### Java Implementation

```java
import java.util.*;

class Edge {
    int src, dest, weight;

    Edge(int src, int dest, int weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
}

class UnionFind {
    int[] parent, rank;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);
        }
        return parent[u];
    }

    void union(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
}

class Solution {
    public int minimumCost(int n, int[][] connections) {
        List<Edge> edges = new ArrayList<>();
        for (int[] conn : connections) {
            edges.add(new Edge(conn[0] - 1, conn[1] - 1, conn[2]));
        }
        
        Collections.sort(edges, Comparator.comparingInt(edge -> edge.weight));
        UnionFind uf = new UnionFind(n);
        int cost = 0;
        int edgesUsed = 0;

        for (Edge edge : edges) {
            if (uf.find(edge.src) != uf.find(edge.dest)) {
                uf.union(edge.src, edge.dest);
                cost += edge.weight;
                edgesUsed++;
            }
        }
        
        return edgesUsed == n - 1 ? cost : -1; // Return -1 if not all cities can be connected
    }
}
```

### C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Edge {
public:
    int src, dest, weight;
    Edge(int s, int d, int w) : src(s), dest(d), weight(w) {}
};

class UnionFind {
public:
    std::vector<int> parent, rank;

    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);
        }
        return parent[u];
    }

    void union(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);
        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
};

class Solution {
public:
    int minimumCost(int n, std::vector<std::vector<int>>& connections) {
        std::vector<Edge> edges;
        for (const auto& conn : connections) {
            edges.emplace_back(conn[0] - 1, conn[1] - 1, conn[2]);
        }

        std::sort(edges.begin(), edges.end(), [](Edge& a, Edge& b) {
            return a.weight < b.weight;
        });

        UnionFind uf(n);
        int cost = 0;
        int edgesUsed = 0;

        for (const auto& edge : edges) {
            if (uf.find(edge.src) != uf.find(edge.dest)) {
                uf.union(edge.src, edge.dest);
                cost += edge.weight;
                edgesUsed++;
            }
        }

        return edgesUsed == n - 1 ? cost : -1; // Return -1 if not all cities can be connected
    }
};
```

### Python Implementation

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        rootU = self.find(u)
        rootV = self.find(v)
        if rootU != rootV:
            if self.rank[rootU] > self.rank[rootV]:
                self.parent[rootV] = rootU
            elif self.rank[rootU] < self.rank[rootV]:
                self.parent[rootU] = rootV
            else:
                self.parent[rootV] = rootU
                self.rank[rootU] += 1

class Solution:
    def minimumCost(self, n: int, connections: List[List[int]]) -> int:
        edges = [(conn[0] - 1, conn[1] - 1, conn[2]) for conn in connections]
        edges.sort(key=lambda x: x[2])

        uf = UnionFind(n)
        cost = 0
        edges_used = 0

        for u, v, weight in edges:
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                cost += weight
                edges_used += 1

        return cost if edges_used == n - 1 else -1  # Return -1 if not all cities can be connected
```