---
id: eulerian-graphs
title: Eulerian Graphs
sidebar_label: Eulerian Graphs
description: "In this blog post, we'll explore Eulerian Graphs, which are graphs that contain an Eulerian path or circuit, with a focus on their properties, conditions, and applications."
tags: [dsa, algorithms, graph theory, eulerian graphs]
---

### Definition

An **Eulerian graph** is a graph in which there exists an Eulerian circuit, a trail that visits every edge exactly once and returns to the starting vertex. If such a trail exists but does not return to the starting vertex, it is known as an **Eulerian path**.

### Characteristics

- **Eulerian Circuit**: A graph contains an Eulerian circuit if:
  - The graph is connected.
  - All vertices have an even degree.

- **Eulerian Path**: A graph contains an Eulerian path if:
  - The graph is connected.
  - It has exactly 0 or 2 vertices with an odd degree.

### Conditions for Eulerian Graphs

To determine whether a given graph is Eulerian, you can apply the following conditions:

1. **For Eulerian Circuit**:
   - The graph must be connected.
   - All vertices must have even degrees.

2. **For Eulerian Path**:
   - The graph must be connected.
   - It can have exactly 0 or 2 vertices with odd degrees.

### Example

Consider the following undirected graph:


- **Degrees**:
  - A: 2
  - B: 3
  - C: 3
  - D: 2

In this graph:
- The vertices B and C have an odd degree, while A and D have an even degree.
- Since there are 2 vertices with an odd degree, this graph has an **Eulerian Path** but not an **Eulerian Circuit**.

### Applications

- **Network Design**: Eulerian graphs are used in network routing and design to minimize the number of repeated paths.
- **Circuit Design**: In electronics, Eulerian paths can be used for designing circuits with minimal crossings.
- **Tour Planning**: Finding paths that visit all edges in a network without retracing steps, such as in garbage collection or snow plowing.

### Time Complexity

- **Checking for Eulerian Properties**: The process of checking whether a graph is Eulerian can be done in \(O(V + E)\), where \(V\) is the number of vertices and \(E\) is the number of edges, due to the traversal needed to count the degree of vertices and check connectivity.

### Space Complexity

- **Space Complexity**: The space complexity is \(O(V + E)\) for storing the graph representation, such as using an adjacency list.

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

// Function to perform DFS traversal
void DFS(int v, unordered_map<int, vector<int>>& graph, vector<bool>& visited) {
    visited[v] = true;
    for (int neighbor : graph[v]) {
        if (!visited[neighbor]) {
            DFS(neighbor, graph, visited);
        }
    }
}

// Function to check if the graph is connected
bool isConnected(unordered_map<int, vector<int>>& graph, int V) {
    vector<bool> visited(V, false);
    int startVertex = 0;

    // Find the first vertex with a non-zero degree
    for (startVertex = 0; startVertex < V; startVertex++) {
        if (graph[startVertex].size() > 0) {
            break;
        }
    }

    // If there are no edges, return true
    if (startVertex == V) return true;

    // Perform DFS
    DFS(startVertex, graph, visited);

    // Check if all vertices with a non-zero degree are visited
    for (int i = 0; i < V; i++) {
        if (graph[i].size() > 0 && !visited[i]) {
            return false;
        }
    }

    return true;
}

// Function to check if the graph has an Eulerian Path or Circuit
void checkEulerianGraph(unordered_map<int, vector<int>>& graph, int V) {
    int oddDegreeCount = 0;

    // Count vertices with odd degree
    for (int i = 0; i < V; i++) {
        if (graph[i].size() % 2 != 0) {
            oddDegreeCount++;
        }
    }

    // Check for connectedness
    if (!isConnected(graph, V)) {
        cout << "The graph is not Eulerian as it is not connected." << endl;
        return;
    }

    // Determine Eulerian status
    if (oddDegreeCount == 0) {
        cout << "The graph has an Eulerian Circuit." << endl;
    } else if (oddDegreeCount == 2) {
        cout << "The graph has an Eulerian Path." << endl;
    } else {
        cout << "The graph is not Eulerian." << endl;
    }
}

int main() {
    int V = 5; // Number of vertices
    unordered_map<int, vector<int>> graph;

    // Create edges (Undirected Graph)
    graph[0] = {1, 2}; // A
    graph[1] = {0, 2, 3}; // B
    graph[2] = {0, 1, 3}; // C
    graph[3] = {1, 2, 4}; // D
    graph[4] = {3}; // E

    // Check if the graph is Eulerian
    checkEulerianGraph(graph, V);

    return 0;
}
```
### Summary

Eulerian graphs are a fundamental concept in graph theory with various practical applications. Understanding their properties and the conditions that allow for Eulerian paths and circuits is crucial for solving problems related to routing, network design, and optimization.