---
id: minimum-spanning-tree
title: Minimum Spanning Tree Algorithms
sidebar_label: Minimum Spanning Tree
description: "In this blog post, we'll explore Minimum Spanning Tree (MST) algorithms, specifically Prim's and Kruskal's algorithms, which are used to find the minimum cost spanning tree in a weighted graph."
tags: [dsa, algorithms, graph algorithms, minimum spanning tree]
---

A Minimum Spanning Tree (MST) of a connected, undirected graph is a spanning tree that has the smallest possible total edge weight among all spanning trees. An MST connects all vertices in the graph without cycles and with the minimum sum of edge weights.

<AdsComponent />

## Characteristics:

- **Optimal Substructure**:  
  MST exhibits optimal substructure, meaning that an MST of a graph contains the MSTs of its subgraphs.

- **Greedy Approach**:  
  Both Prim's and Kruskal's algorithms use a greedy strategy to find the MST. They build the MST by adding edges in a way that minimizes the total weight while ensuring no cycles are formed.

## Prim's Algorithm:

1. **Initialization**:  
   Start with an arbitrary vertex and mark it as part of the MST. Initialize a priority queue (min-heap) to keep track of the edges.

2. **Edge Selection**:  
   Continuously extract the edge with the smallest weight from the priority queue that connects a vertex in the MST to a vertex outside the MST. Add this edge to the MST and mark the new vertex as part of the MST.

3. **Repeat**:  
   Repeat the process until all vertices are included in the MST.

<Ads />

## Time Complexity of Prim's Algorithm:

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

## Time Complexity of Kruskal's Algorithm:

- **Time Complexity**: $O(E \log E + E \log V)$  
  The complexity comes from sorting the edges and performing union-find operations.

## Example:

Consider the following graph with vertices and weighted edges:

<AdsComponent />

## Step-by-Step Execution:

### Prim's Algorithm:

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

### Kruskal's Algorithm:

1. **Edge Sorting**:  
   Sorted edges: `{(A, B, 1), (B, D, 2), (A, C, 3), (B, C, 4), (D, C, 5)}`.

2. **Edge Selection**:
   - Select `(A, B, 1)`, MST: `{(A, B)}`.
   - Select `(B, D, 2)`, MST: `{(A, B), (B, D)}`.
   - Select `(A, C, 3)`, MST: `{(A, B), (B, D), (A, C)}`.

The final MST contains edges: `{(A, B), (B, D), (A, C)}` with a total weight of `1 + 2 + 3 = 6`.

## Prim's Algorithm

### C++ Implementation:

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
```

### Java Implementation:

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.PriorityQueue;

class Graph {
    int V; // Number of vertices
    ArrayList<ArrayList<Pair>> graph; // Adjacency list for storing {vertex, weight} pairs

    // Constructor
    Graph(int V) {
        this.V = V;
        graph = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            graph.add(new ArrayList<>());
        }
    }

    // Add edge to the graph
    void addEdge(int u, int v, int weight) {
        graph.get(u).add(new Pair(v, weight));
        graph.get(v).add(new Pair(u, weight));
    }

    // Prim's MST Algorithm
    void primMST() {
        int[] key = new int[V];
        boolean[] inMST = new boolean[V];
        PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingInt(pair -> pair.weight));

        // Initialize all keys as INFINITE
        for (int i = 0; i < V; i++) {
            key[i] = Integer.MAX_VALUE;
        }

        // Start from the first vertex
        key[0] = 0;
        pq.add(new Pair(0, 0)); // {weight, vertex}

        while (!pq.isEmpty()) {
            int u = pq.poll().vertex;
            inMST[u] = true;

            // Traverse all adjacent vertices of u
            for (Pair neighbor : graph.get(u)) {
                int v = neighbor.vertex;
                int weight = neighbor.weight;

                // If v is not in MST and weight of (u, v) is smaller than the current key[v]
                if (!inMST[v] && weight < key[v]) {
                    key[v] = weight;
                    pq.add(new Pair(v, key[v]));
                }
            }
        }

        // Print the result
        System.out.println("Minimum Spanning Tree weights:");
        for (int i = 1; i < V; i++) {
            System.out.println("Vertex " + i + " has key value: " + key[i]);
        }
    }

    // Pair class for vertex and weight
    static class Pair {
        int vertex;
        int weight;

        Pair(int vertex, int weight) {
            this.vertex = vertex;
            this.weight = weight;
        }
    }
}

public class Main {

    public static void main(String[] args) {
        int V = 5;
        Graph g = new Graph(V);

        // Add edges (u, v, weight)
        g.addEdge(0, 1, 1);
        g.addEdge(1, 3, 2);
        g.addEdge(3, 4, 5);
        g.addEdge(0, 2, 3);
        g.addEdge(1, 2, 4);

        g.primMST();
    }
}
```

### Output

```java
Minimum Spanning Tree weights:
Vertex 1 has key value: 1
Vertex 2 has key value: 3
Vertex 3 has key value: 2
Vertex 4 has key value: 5
```

## Kruskal Algorithm

### C++ Implementation:

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
```

### Java Implementation:

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class DisjointSet {
    private int[] parent, rank;

    // Constructor to initialize the disjoint set with `n` elements
    public DisjointSet(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    // Find function with path compression
    public int find(int u) {
        if (u != parent[u]) {
            parent[u] = find(parent[u]); // Path compression
        }
        return parent[u];
    }

    // Union function with union by rank
    public void unionSets(int u, int v) {
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

// Edge class to store each edge with its weight, source, and destination
class Edge {
    int weight, u, v;

    Edge(int weight, int u, int v) {
        this.weight = weight;
        this.u = u;
        this.v = v;
    }
}

public class Main {

    // Kruskal's Algorithm to find the Minimum Spanning Tree
    public static void kruskalMST(List<Edge> edges, int V) {
        // Sort edges based on weight
        Collections.sort(edges, Comparator.comparingInt(edge -> edge.weight));

        DisjointSet ds = new DisjointSet(V);
        List<Edge> mstEdges = new ArrayList<>();

        for (Edge edge : edges) {
            int u = edge.u;
            int v = edge.v;

            // If u and v are in different sets, include this edge in the MST
            if (ds.find(u) != ds.find(v)) {
                ds.unionSets(u, v);
                mstEdges.add(edge);
            }
        }

        // Print the result
        System.out.println("Edges in Minimum Spanning Tree:");
        for (Edge edge : mstEdges) {
            System.out.println(edge.u + " -- " + edge.v + " == " + edge.weight);
        }
    }

    public static void main(String[] args) {
        int V = 5; // Number of vertices
        List<Edge> edges = new ArrayList<>();

        // Adding edges to the graph
        edges.add(new Edge(1, 0, 1));
        edges.add(new Edge(2, 1, 3));
        edges.add(new Edge(3, 0, 2));
        edges.add(new Edge(4, 1, 2));
        edges.add(new Edge(5, 3, 4));

        kruskalMST(edges, V);
    }
}
```

### Output

```
Edges in Minimum Spanning Tree:
0 -- 1 == 1
1 -- 3 == 2
0 -- 2 == 3
3 -- 4 == 5
```

<Ads />

## Conclusion:

Prim's and Kruskal's algorithms. Both algorithms efficiently find the MST of a weighted graph, ensuring that all vertices are connected with the minimum total edge weight. Understanding these algorithms is fundamental for various applications in computer science, including network design, clustering, and resource management.
