---
id: kruskals-algorithm  
title: "Kruskal's Algorithm" 
sidebar_label: "Kruskal's Algorithm" 
description: "Learn about Kruskal's algorithm, a minimum spanning tree algorithm that works by sorting the edges and adding them one by one if they don't form a cycle."
tags: [dsa, algorithms, graph algorithms, minimum spanning tree]
---

Kruskal's algorithm is a greedy algorithm used to find the Minimum Spanning Tree (MST) of a connected, undirected graph. It works by sorting all edges in the graph in increasing order of weight and adding them one by one to the MST, provided they don't form a cycle.

<Ads />

### Characteristics:
- **Greedy Approach**:  
  Kruskal's algorithm always picks the edge with the smallest weight that doesn't form a cycle. It processes edges in sorted order rather than growing the MST from a single vertex like Prim’s algorithm.

- **Cycle Detection**:  
  Kruskal's algorithm uses a Union-Find (Disjoint Set) data structure to detect cycles and ensure that no edge forms a cycle in the MST.

### Steps Involved:
1. **Sort All Edges by Weight**:  
   Sort the edges in increasing order of their weight.
   
2. **Initialize Disjoint Sets**:  
   Each vertex is initially in its own set.
   
3. **Add Edges**:  
   Pick the smallest edge. If it connects two different sets (i.e., no cycle is formed), add it to the MST. Otherwise, discard it.

4. **Repeat** the process until the MST contains exactly `V - 1` edges.

<Ads />

### Problem Statement:
Given a connected, undirected graph with `n` vertices and `m` edges, find a subset of edges that forms a tree including all vertices, where the total weight of the edges is minimized.

### Time Complexity:
- **Sorting Edges**: $O(m \log m)$  
  Where `m` is the number of edges.
- **Union-Find Operations**: $O(\alpha(V))$ for each edge, where `α` is the inverse Ackermann function (almost constant time).

Overall time complexity: $O(m \log m)$

### Space Complexity:
- **Space Complexity: $O(V + E)$**  
  This is due to storing the edges, vertices, and auxiliary data structures for Union-Find.

### Example:
Consider the following Graph:
- Vertices: `{A, B, C, D}`
- Edges with weights: `{(A, B, 4), (A, C, 3), (B, D, 5), (C, D, 2)}`

Step-by-Step Execution:

1. **Sort edges**: `{(C, D, 2), (A, C, 3), (A, B, 4), (B, D, 5)}`
2. **Pick edge (C, D)**: No cycle, add to MST.
3. **Pick edge (A, C)**: No cycle, add to MST.
4. **Pick edge (A, B)**: No cycle, add to MST.

Total Minimum Weight: `9`

<Ads />

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Disjoint Set (Union-Find) structure
class DisjointSet {
public:
    vector<int> parent, rank;

    DisjointSet(int V) {
        parent.resize(V);
        rank.resize(V, 0);
        for (int i = 0; i < V; i++) {
            parent[i] = i;
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    void unionSets(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }
};

struct Edge {
    int u, v, weight;
    bool operator<(const Edge &e) const {
        return weight < e.weight;
    }
};

void kruskalMST(int V, vector<Edge>& edges) {
    DisjointSet ds(V);
    sort(edges.begin(), edges.end()); // Sort edges by weight

    vector<Edge> mst;

    for (Edge e : edges) {
        int u = e.u, v = e.v;
        if (ds.find(u) != ds.find(v)) {
            ds.unionSets(u, v);
            mst.push_back(e);
        }
    }

    cout << "Edge\tWeight\n";
    for (Edge e : mst) {
        cout << e.u << " - " << e.v << "\t" << e.weight << endl;
    }
}

int main() {
    int V = 4;
    vector<Edge> edges = {
        {0, 1, 4}, {0, 2, 3}, {1, 3, 5}, {2, 3, 2}
    };

    kruskalMST(V, edges);

    return 0;
}
```


```java
import java.util.*;

public class KruskalAlgorithm {

    static class Edge {
        int u, v, weight;

        Edge(int u, int v, int weight) {
            this.u = u;
            this.v = v;
            this.weight = weight;
        }
    }

    static class DisjointSet {
        int[] parent, rank;

        DisjointSet(int V) {
            parent = new int[V];
            rank = new int[V];
            for (int i = 0; i < V; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            if (rootX != rootY) {
                if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
            }
        }
    }

    public static void kruskalMST(List<Edge> edges, int V) {
        Collections.sort(edges, Comparator.comparingInt(e -> e.weight)); // Sort edges by weight
        DisjointSet ds = new DisjointSet(V);

        List<Edge> mst = new ArrayList<>();

        for (Edge edge : edges) {
            int u = edge.u, v = edge.v;
            if (ds.find(u) != ds.find(v)) {
                ds.union(u, v);
                mst.add(edge);
            }
        }

        System.out.println("Edge\tWeight");
        for (Edge e : mst) {
            System.out.println(e.u + " - " + e.v + "\t" + e.weight);
        }
    }

    public static void main(String[] args) {
        int V = 4;
        List<Edge> edges = new ArrayList<>();
        edges.add(new Edge(0, 1, 4));
        edges.add(new Edge(0, 2, 3));
        edges.add(new Edge(1, 3, 5));
        edges.add(new Edge(2, 3, 2));

        kruskalMST(edges, V);
    }
}
```
