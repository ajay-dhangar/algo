---
id: dijkstra-algorithm
sidebar_position: 14 
title: Dijkstra's Algorithm
sidebar_label: Dijkstra's Algorithm 
description: "This post covers Dijkstra's Algorithm for finding the shortest paths in a graph, with code examples and explanations." 
tags: [dsa, graph, dijkstra, shortest path, c++]
---


# Dijkstra’s Algorithm in C++

This project contains a C program that implements Dijkstra’s Algorithm to find the shortest path from a source vertex to all other vertices in a weighted graph. The program takes the number of vertices, edges, and their weights as input, and outputs the shortest distance from the source vertex to each vertex in the graph.

---

## Problem Definition

**Dijkstra's Algorithm** solves the single-source shortest path problem for graphs with non-negative edge weights. It efficiently finds the shortest path from a starting node to all other nodes in the graph.

### Example Use Case
Consider a map of cities connected by roads with different distances. Dijkstra's Algorithm can be used to find the shortest path from one city to all others.

---

## Approach

The algorithm maintains a priority queue to explore the nearest unvisited node at each step, updating the shortest path estimates for neighboring nodes.

### Key Characteristics:

1. **Greedy Strategy:** Chooses the node with the smallest tentative distance.
2. **Priority Queue:** Utilizes a min-heap for efficient extraction of the minimum distance node.
3. **Non-negative Weights:** Assumes all edge weights are non-negative.
   
   ---

## Dijkstra's Algorithm Operations

### Graph Representation

We can represent the graph using an adjacency list. Each entry contains pairs of neighboring nodes and their corresponding edge weights.

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <utility>
#include <limits>
using namespace std;
const int INF = numeric_limits<int>::max(); // Represents infinity
using pii = pair<int, int>; // Pair to represent (weight, vertex)
void dijkstra(int source, const vector<vector<pii>>& graph, vector<int>& dist) {
    priority_queue<pii, vector<pii>, greater<pii>> pq; // Min-heap
    dist[source] = 0;
    pq.push({0, source});
    while (!pq.empty()) {
        int d = pq.top().first; // Distance
        int u = pq.top().second; // Current node
        pq.pop();
        if (d > dist[u]) continue; // Ignore outdated distance
        for (const auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight; // Update distance
                pq.push({dist[v], v}); // Push new distance to the queue
            }
        }
    }
}
```
---

## Example Usage:

```
int main() {
    int n = 5; // Number of nodes
    vector<vector<pii>> graph(n); // Adjacency list
    // Add edges: (source, destination, weight)
    graph[0].push_back({1, 10});
    graph[0].push_back({2, 3});
    graph[1].push_back({2, 1});
    graph[1].push_back({3, 2});
    graph[2].push_back({1, 4});
    graph[2].push_back({3, 8});
    graph[2].push_back({4, 2});
    graph[3].push_back({4, 7});
    graph[4].push_back({3, 9});
    vector<int> dist(n, INF); // Initialize distances to infinity
    dijkstra(0, graph, dist); // Run Dijkstra's from source node 0
    // Print distances from source
    for (int i = 0; i < n; ++i) {
        cout << "Distance from 0 to " << i << " is " << dist[i] << endl;
    }
    return 0;
}
```
---

### Output

```
Distance from 0 to 0 is 0
Distance from 0 to 1 is 7
Distance from 0 to 2 is 3
Distance from 0 to 3 is 15
Distance from 0 to 4 is 5
```
---

## Complexity Analysis

### Time Complexity

Worst Case: (O(V^2)), where V is the number of vertices in the graph.
This is because, in the simplest implementation using an array, each vertex is checked against all others to find the minimum distance.

### Space Complexity

Space Complexity: (O(V)), where V is the number of vertices.
The program uses an array to store the shortest distances from the source vertex to all other vertices.

### Assumptions

The program assumes the graph is connected and contains non-negative weights.
It does not handle negative weight cycles, as Dijkstra's Algorithm is not suitable for graphs with negative weights.

## When to Use Dijkstra's Algorithm

**Non-negative weights:** When the graph has non-negative edge weights.
**Single-source shortest path:** When you need the shortest path from one source to all other vertices.
**Real-time applications:** Ideal for applications like GPS navigation systems and network routing.

## Conclusion

Dijkstra's Algorithm is a fundamental algorithm in computer science for finding the shortest paths in a weighted graph. Its efficiency and effectiveness make it applicable in various real-world scenarios where optimization is required.





