---
id: prims-algorithm  
title: "Prim's Algorithm" 
sidebar_label: "Prim's Algorithm"
description: "Explore Prim's algorithm, a minimum spanning tree algorithm that starts with a single vertex and expands the MST one edge at a time."
tags: [dsa, algorithms, graph algorithms, minimum spanning tree]
---

Prim's algorithm is a greedy algorithm that constructs a Minimum Spanning Tree (MST) for a weighted, connected, undirected graph. It starts with a single vertex and iteratively adds the lowest-cost edge that expands the MST without forming a cycle.

<Ads />

### Characteristics:
- **Greedy Approach**:  
  Prim's algorithm builds the MST by selecting the minimum-weight edge that connects a vertex in the MST to a vertex outside it.

- **Optimal for MSTs**:  
  Unlike the greedy algorithm in graph colouring, Prim's algorithm guarantees the minimum weight for the MST.

### Steps Involved:
1. **Initialize the MST with an arbitrary starting vertex**.
2. **Select the smallest weight edge that connects a vertex in the MST to a vertex outside**.
3. **Repeat** this process until all vertices are included in the MST.

<Ads />

### Problem Statement:
Given a connected, undirected, weighted graph with `n` vertices, find a subset of the edges that forms a tree including all vertices, where the total weight of the edges is minimized.

### Time Complexity:
- **Using Adjacency Matrix with Min-Heap: $O(V^2)$**
- **Using Adjacency List with Min-Heap: $O(E \log V)$**
  Where `V` is the number of vertices and `E` is the number of edges.

### Space Complexity:
- **Space Complexity: $O(V + E)$**  
  This is due to storing vertices, edges, and auxiliary data structures for MST construction.

<Ads />

### Example:
Consider the following Graph:
- Vertices: `{A, B, C, D}`
- Edges with weights: `{(A, B, 4), (A, C, 3), (B, D, 5), (C, D, 2)}`

Step-by-Step Execution:

1. **Initialize MST with vertex A**.
2. **Select edge (A, C) with weight 3**.
3. **Select edge (C, D) with weight 2**.
4. **Select edge (A, B) with weight 4**.

Total Minimum Weight: `9`

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <queue>
#include <utility>

using namespace std;

void primMST(vector<vector<pair<int, int>>> &graph, int V) {
    // Min-heap to store {weight, vertex}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;

    // Initialize MST and weights
    vector<int> weight(V, INT_MAX);
    vector<bool> inMST(V, false);
    vector<int> parent(V, -1);

    // Start from the first vertex
    int start = 0;
    weight[start] = 0;
    minHeap.push({0, start});

    while (!minHeap.empty()) {
        int u = minHeap.top().second;
        minHeap.pop();

        inMST[u] = true;

        // Traverse all adjacent vertices
        for (auto &edge : graph[u]) {
            int v = edge.first;
            int w = edge.second;

            // If v is not in MST and weight[v] > edge weight
            if (!inMST[v] && weight[v] > w) {
                weight[v] = w;
                minHeap.push({weight[v], v});
                parent[v] = u;
            }
        }
    }

    // Print the edges of the MST
    cout << "Edge\tWeight\n";
    for (int i = 1; i < V; i++) {
        cout << parent[i] << " - " << i << "\t" << weight[i] << endl;
    }
}

int main() {
    int V = 4;
    vector<vector<pair<int, int>>> graph(V);

    // Add edges to the graph
    graph[0].push_back({1, 4});
    graph[0].push_back({2, 3});
    graph[1].push_back({0, 4});
    graph[1].push_back({3, 5});
    graph[2].push_back({0, 3});
    graph[2].push_back({3, 2});
    graph[3].push_back({1, 5});
    graph[3].push_back({2, 2});

    // Call Prim's algorithm
    primMST(graph, V);

    return 0;
}
```

### Java

```java
import java.util.*;

public class PrimAlgorithm {

    static class Edge {
        int dest, weight;

        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }

    public static void primMST(List<List<Edge>> graph, int V) {
        boolean[] inMST = new boolean[V];
        int[] weight = new int[V];
        int[] parent = new int[V];
        Arrays.fill(weight, Integer.MAX_VALUE);
        weight[0] = 0;
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        minHeap.offer(new int[]{0, 0});

        while (!minHeap.isEmpty()) {
            int u = minHeap.poll()[1];
            inMST[u] = true;

            for (Edge edge : graph.get(u)) {
                int v = edge.dest, w = edge.weight;
                if (!inMST[v] && weight[v] > w) {
                    weight[v] = w;
                    parent[v] = u;
                    minHeap.offer(new int[]{weight[v], v});
                }
            }
        }

        System.out.println("Edge\tWeight");
        for (int i = 1; i < V; i++) {
            System.out.println(parent[i] + " - " + i + "\t" + weight[i]);
        }
    }

    public static void main(String[] args) {
        int V = 4;
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < V; i++) graph.add(new ArrayList<>());

        // Add edges to the graph
        graph.get(0).add(new Edge(1, 4));
        graph.get(0).add(new Edge(2, 3));
        graph.get(1).add(new Edge(0, 4));
        graph.get(1).add(new Edge(3, 5));
        graph.get(2).add(new Edge(0, 3));
        graph.get(2).add(new Edge(3, 2));
        graph.get(3).add(new Edge(1, 5));
        graph.get(3).add(new Edge(2, 2));

        primMST(graph, V);
    }
}
```
