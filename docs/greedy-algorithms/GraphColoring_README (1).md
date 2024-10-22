---
id: graph-coloring  
title: Graph Coloring Algorithm  
sidebar_label: Graph Coloring  
description: "In this blog post, we'll explore the Graph Coloring problem, a classical algorithm that assigns colors to the vertices of a graph such that no two adjacent vertices share the same color."  
tags: [dsa, algorithms, graph algorithms, coloring]

---

### Definition:

The Graph Coloring problem involves assigning colors to the vertices of a graph such that no two adjacent vertices share the same color. The aim is to minimize the total number of colors used while ensuring the constraint of no adjacent vertices having the same color is maintained.

### Characteristics:

- **Greedy Approach**:  
  The graph coloring problem can often be tackled using a greedy approach. In this approach, colors are assigned one by one to each vertex, ensuring that no two adjacent vertices are assigned the same color.

1. **Sort Vertices**:  
   Arrange the vertices based on their degree (the number of edges connecting them to other vertices). A higher-degree vertex is often colored earlier.

2. **Assign Colors**:  
   For each vertex, choose the smallest color that has not been assigned to any adjacent vertex. If no color is available, introduce a new color.

3. **Minimize Colors**:  
   The goal is to minimize the number of distinct colors used while ensuring no two adjacent vertices share the same color.

### Problem Statement:

Given a graph `G` with `N` vertices, assign colors to each vertex such that no two adjacent vertices share the same color, while minimizing the number of distinct colors used.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N^2)$**  
  The greedy graph coloring algorithm typically runs in $O(N^2)$ time, where `N` is the number of vertices in the graph.

### Space Complexity:

- **Space Complexity: $O(N)$**  
  The space complexity is $O(N)$, as an array of size `N` is required to store the color assigned to each vertex.

### Example:

Consider a graph with the following vertices and edges:

Vertices: `{1, 2, 3, 4, 5}`  
Edges: `{(1, 2), (1, 3), (2, 4), (3, 5), (4, 5)}`

Step-by-Step Execution:

1. **Sort by Vertex Degree**:  
   Prioritize the vertices based on the degree of connection. Vertices with the highest degree are considered first.

2. **Assign Colors**:
   - Assign color 1 to Vertex 1.
   - Assign color 2 to Vertex 2 (adjacent to Vertex 1).
   - Assign color 1 to Vertex 3 (adjacent to Vertex 1, not to Vertex 2).
   - Assign color 2 to Vertex 4 (adjacent to Vertex 2).
   - Assign color 3 to Vertex 5 (adjacent to Vertex 3 and Vertex 4).


### C++ Implementation

```cpp

#include <iostream>
#include <vector>
#include <list>
#include <algorithm>

using namespace std;

// A class to represent a graph
class Graph {
    int V;    // No. of vertices
    list<int> *adj;    // A dynamic array of adjacency lists
public:
    Graph(int V);   // Constructor
    void addEdge(int v, int w);   // Function to add an edge to graph
    void greedyColoring();    // Function to do greedy coloring of the graph
};

// Constructor for the graph
Graph::Graph(int V) {
    this->V = V;
    adj = new list<int>[V];
}

// Function to add an edge to the graph
void Graph::addEdge(int v, int w) {
    adj[v].push_back(w);
    adj[w].push_back(v);  // Since the graph is undirected
}

// Assign colors to vertices using a greedy algorithm
void Graph::greedyColoring() {
    vector<int> result(V, -1);   // Array to store result (colors assigned to vertices)

    // Assign the first color to the first vertex
    result[0] = 0;

    // A temporary array to store the available colors. True value of available[cr] would mean
    // that the color cr is assigned to one of its adjacent vertices
    vector<bool> available(V, false);

    // Assign colors to remaining V-1 vertices
    for (int u = 1; u < V; u++) {
        // Process all adjacent vertices and flag their colors as unavailable
        for (auto i : adj[u])
            if (result[i] != -1)
                available[result[i]] = true;

        // Find the first available color
        int cr;
        for (cr = 0; cr < V; cr++)
            if (!available[cr])
                break;

        result[u] = cr;   // Assign the found color

        // Reset the values back to false for the next iteration
        for (auto i : adj[u])
            if (result[i] != -1)
                available[result[i]] = false;
    }

    // Print the result
    for (int u = 0; u < V; u++)
        cout << "Vertex " << u << " --->  Color " << result[u] << endl;
}

// Driver program to test the above function
int main() {
    Graph g1(5);
    g1.addEdge(0, 1);
    g1.addEdge(0, 2);
    g1.addEdge(1, 2);
    g1.addEdge(1, 3);
    g1.addEdge(2, 3);
    g1.addEdge(3, 4);
    cout << "Coloring of graph 1\n";
    g1.greedyColoring();

    cout << "\n";

    Graph g2(5);
    g2.addEdge(0, 1);
    g2.addEdge(0, 2);
    g2.addEdge(1, 2);
    g2.addEdge(1, 4);
    g2.addEdge(2, 4);
    g2.addEdge(3, 4);
    cout << "Coloring of graph 2\n";
    g2.greedyColoring();

    return 0;
}
```