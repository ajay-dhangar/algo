---
id: Prims
title: Prim's Algorithm
sidebar_label: Prim's Algorithm
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
  - To efficiently find the smallest edge, Prim's algorithm often uses a priority queue (or a min-heap). This helps in selecting the minimum weight edge at each step.

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
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define V 5 // Number of vertices in the graph

int minKey(int key[], int mstSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++) {
        if (mstSet[v] == 0 && key[v] < min) {
            min = key[v];
            min_index = v;
        }
    }
    return min_index;
}

void primMST(int graph[V][V]) {
    int parent[V]; // Array to store the constructed MST
    int key[V];    // Key values used to pick the minimum weight edge
    int mstSet[V]; // To represent the vertices included in the MST

    // Initialize all keys as INFINITE
    for (int i = 0; i < V; i++) {
        key[i] = INT_MAX;
        mstSet[i] = 0; // All vertices are initially not included in the MST
    }

    // Always include the first 1st vertex in MST
    key[0] = 0;     // Make key 0 so that this vertex is picked as first
    parent[0] = -1; // First node is always the root of the MST

    // The MST will have V vertices
    for (int count = 0; count < V - 1; count++) {
        // Pick the minimum key vertex from the set of vertices not yet included in the MST
        int u = minKey(key, mstSet);
        
        // Add the picked vertex to the MST set
        mstSet[u] = 1;

        // Update the key value and parent index of the adjacent vertices of the picked vertex
        for (int v = 0; v < V; v++) {
            // Update the key only if graph[u][v] is smaller than key[v]
            if (graph[u][v] && mstSet[v] == 0 && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    // Print the constructed MST
    printf("Edge \tWeight\n");
    for (int i = 1; i < V; i++) {
        printf("%d - %d \t%d\n", parent[i], i, graph[i][parent[i]]);
    }
}

int main() {
    // Example graph represented as an adjacency matrix
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };

    primMST(graph);
    return 0;
}
```

### Summary:

Prim's algorithm is a powerful tool for finding the Minimum Spanning Tree of a graph by growing the tree one vertex at a time. Using a priority queue allows the algorithm to efficiently pick the smallest edge from the MST to a new vertex, ensuring the minimum total weight. It is especially useful for dense graphs and has applications in various network design and optimization problems.

