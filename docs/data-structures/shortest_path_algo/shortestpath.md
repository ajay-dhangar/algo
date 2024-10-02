---
id: shortest-path-algorithm
title: Shortest Path Algorithm (Dijkstra's Algorithm)
sidebar_label: Dijkstra's Algorithm
tags:
  - Graph
  - Greedy
  - Algorithm
  - Shortest Path
description: Given a graph represented by nodes and weighted edges, find the shortest path from a given source node to all other nodes using Dijkstra's Algorithm.
---

## Problem Statement

Given a graph with `n` nodes and weighted edges, the task is to find the shortest path from a given source node to all other nodes using Dijkstra's algorithm.

### Examples

*Example 1:*

```plaintext
Input:
Number of vertices: 5
Edges: {(0, 1, 2), (0, 4, 8), (1, 2, 3), (1, 3, 5), (2, 3, 1), (4, 3, 4)}
Source: 0

Output: [0, 2, 5, 6, 8]

Explanation:
The shortest path from node 0 to node 3 is 6.
```

*Example 2:*
```plaintext
Input:
Number of vertices: 3
Edges: {(0, 1, 1), (1, 2, 2), (0, 2, 4)}
Source: 0

Output: [0, 1, 3]

Explanation:
The shortest path from node 0 to node 2 is 3.
```

### Constraints 
```plaintext
1 <= number of vertices <= 1000
1 <= weight of edges <= 100
```
### Solution
Dijkstra’s algorithm is a well-known greedy algorithm used to find the shortest path between nodes in a graph, which can either be directed or undirected. The algorithm works by maintaining a set of nodes whose shortest path distance from the source is known. It picks the closest unvisited node, calculates its distance through its neighbors, and updates the shortest paths accordingly.

## Approach: Dijkstra's Algorithm
### Algorithm
1) Create a priority queue (min-heap) to store nodes and their minimum distance from the source node.
2)
Initialize the distance of all nodes to infinity, except the source node which is set to 0.
3) While the priority queue is not empty:
  - Extract the node with the minimum distance from the queue.
  - For each neighboring node, calculate the distance via the current node and        update the neighbor’s distance
4) if it's smaller than the previously known distance.
Repeat until all nodes have been processed or the queue is empty.
### Implementation

```cpp 
#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

typedef pair<int, int> pii; // {distance, node}

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int source) {
    // Create a distance vector, initialized to infinity
    vector<int> dist(V, INT_MAX);
    
    // Min-heap priority queue to store {distance, node}
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    
    // Set the distance of the source to 0 and add it to the queue
    dist[source] = 0;
    pq.push({0, source});
    
    while (!pq.empty()) {
        int currentDist = pq.top().first;
        int currentNode = pq.top().second;
        pq.pop();
        
        // If this distance is already larger than the known shortest, skip
        if (currentDist > dist[currentNode]) {
            continue;
        }
        
        // Process each neighbor
        for (auto& neighbor : adj[currentNode]) {
            int nextNode = neighbor.first;
            int weight = neighbor.second;
            
            // Calculate new potential distance
            int newDist = currentDist + weight;
            
            // If the new distance is shorter, update and push to queue
            if (newDist < dist[nextNode]) {
                dist[nextNode] = newDist;
                pq.push({newDist, nextNode});
            }
        }
    }
    
    return dist;
}

int main() {
    int V = 5;
    vector<vector<pii>> adj(V);
    
    // Adding edges (node1, node2, weight)
    adj[0].push_back({1, 2});
    adj[0].push_back({4, 8});
    adj[1].push_back({2, 3});
    adj[1].push_back({3, 5});
    adj[2].push_back({3, 1});
    adj[4].push_back({3, 4});
    
    int source = 0;
    vector<int> shortestPaths = dijkstra(V, adj, source);
    
    cout << "Shortest distances from node " << source << ": ";
    for (int dist : shortestPaths) {
        cout << dist << " ";
    }
    
    return 0;
}
```
## Complexity Analysis
- **Time complexity:** `$O((V + E) \log V)$`, where `V` is the number of vertices and `E` is the number of edges.
- Inserting and extracting from the priority queue takes `$O(\log V)$`, and each - edge is processed at most once.
- **Space complexity**: `$O(V + E)$` for the adjacency list and the distance array.
## Conclusion
Dijkstra’s algorithm efficiently finds the shortest path from a source node to all other nodes in a graph. The algorithm works best with non-negative weights, and its performance can be optimized using min-heaps or priority queues.
