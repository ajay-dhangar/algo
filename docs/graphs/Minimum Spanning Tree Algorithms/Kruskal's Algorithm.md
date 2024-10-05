---
id: kruskals-algorithm
title: Kruskal's Algorithm
sidebar_label: Kruskal's Algorithm
description: "In this blog post, we'll delve into Kruskal's Algorithm, a classic greedy algorithm used to find the minimum spanning tree (MST) of a weighted undirected graph. We'll cover its implementation, time complexity, and use cases in various applications."
tags: [dsa, algorithms, minimum spanning tree]
---

# Kruskal’s Algorithm

## Introduction

Kruskal’s Algorithm is a classic greedy algorithm used to find the minimum spanning tree (MST) of a weighted, undirected graph. Like Prim's Algorithm, Kruskal's aims to connect all vertices with the minimum total edge weight while avoiding cycles. The algorithm works by sorting all edges in non-decreasing order of their weights and adding them one by one to the MST, ensuring that no cycles are formed.

Kruskal's Algorithm is particularly useful for sparse graphs, where the number of edges is much lower than the maximum possible number of edges.

## Implementation

The implementation of Kruskal’s Algorithm involves the following steps:

1. **Sort Edges**:
   - Sort all the edges in non-decreasing order based on their weights.

2. **Initialize**:
   - Create a disjoint-set (union-find) data structure to keep track of which vertices are in which components.

3. **Process Edges**:
   - Iterate through the sorted edges, and for each edge:
     - Check if adding this edge would form a cycle using the union-find structure.
     - If it does not form a cycle, add it to the MST.

4. **Repeat** until you have added \( V - 1 \) edges (where \( V \) is the number of vertices).

## Code in Java

Here’s a sample implementation of Kruskal’s Algorithm in Java:

```java
import java.util.*;

public class KruskalsAlgorithm {

    static class Edge implements Comparable<Edge> {
        int src, dest, weight;

        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }

        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    static class DisjointSet {
        int[] parent, rank;

        DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        int find(int u) {
            if (parent[u] != u) {
                parent[u] = find(parent[u]); // Path compression
            }
            return parent[u];
        }

        void union(int u, int v) {
            int rootU = find(u);
            int rootV = find(v);
            if (rootU != rootV) {
                // Union by rank
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

    public static void kruskalsAlgorithm(int vertices, List<Edge> edges) {
        Collections.sort(edges); // Sort edges by weight
        DisjointSet ds = new DisjointSet(vertices);
        List<Edge> mstEdges = new ArrayList<>();

        for (Edge edge : edges) {
            int u = edge.src;
            int v = edge.dest;

            // Check if including this edge creates a cycle
            if (ds.find(u) != ds.find(v)) {
                ds.union(u, v);
                mstEdges.add(edge);
            }
        }

        // Print the resulting MST
        System.out.println("Edges in Minimum Spanning Tree:");
        for (Edge edge : mstEdges) {
            System.out.println(edge.src + " -- " + edge.dest + " == " + edge.weight);
        }
    }

    public static void main(String[] args) {
        int vertices = 5;
        List<Edge> edges = new ArrayList<>();

        // Example graph edges
        edges.add(new Edge(0, 1, 10));
        edges.add(new Edge(0, 2, 6));
        edges.add(new Edge(0, 3, 5));
        edges.add(new Edge(1, 3, 15));
        edges.add(new Edge(2, 3, 4));

        kruskalsAlgorithm(vertices, edges);
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of Kruskal’s Algorithm is \( O(E \log E) \), where \( E \) is the number of edges. This complexity arises from:
- Sorting the edges: \( O(E \log E) \).
- The union-find operations can be performed in nearly constant time due to path compression and union by rank.

### Space Complexity

The space complexity is \( O(V + E) \), which accounts for:
- The storage of the edge list.
- The disjoint-set data structure used to keep track of connected components.

## Points to Remember

1. **Greedy Approach**: Kruskal's Algorithm employs a greedy strategy by always choosing the smallest edge that does not form a cycle.

2. **Disconnected Graphs**: Kruskal's can work on disconnected graphs and will produce a minimum spanning forest instead of a single MST.

3. **Multiple MSTs**: There can be multiple minimum spanning trees for a given graph if there are equal-weight edges.

4. **Use Cases**: Common applications include network design problems like connecting cities with roads or laying out electrical grids.

5. **Comparison with Prim's Algorithm**: While both algorithms find an MST, Kruskal's is often more efficient for sparse graphs while Prim's is better suited for dense graphs.