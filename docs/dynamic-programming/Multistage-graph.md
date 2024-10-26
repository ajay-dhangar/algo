---
id: multistage-graph
title: MULTISTAGE GRAPH
sidebar_label: SHORTEST PATH IN MULTISTAGE GRAPH
tags: [Dynamic Programming,Graph, DSA]
description: The multistage graph problem is finding the path with minimum cost from source to sink.
---

# SHORTEST PATH IN MULTISTAGE GRAPH

### Description
This program calculates the shortest path from a given source node to a target node in a directed graph using a dynamic programming approach. The graph is represented as an adjacency matrix, where the user provides input for the number of vertices and the adjacency matrix values.
### Problem Definition
- **Input**: The adjacency Cost Matrix.
- **Output**: Minimum cost path and Minimum Cost.

### Example
- **Input**: 
  - Enter the number of vertices in the graph: 12                              
    Enter the adjacency matrix (use 99 for INF):                            
    99 9 7 3 2 99 99 99 99 99 99 99                       
    99 99 99 99 99 4 2 1 99 99 99 99                         
    99 99 99 99 99 2 7 99 99 99 99 99                        
    99 99 99 99 99 99 99 11 99 99 99 99                     
    99 99 99 99 99 99 11 8 99 99 99 99                        
    99 99 99 99 99 99 99 99 6 5 99 99                                            
    99 99 99 99 99 99 99 99 4 3 99 99                                            
    99 99 99 99 99 99 99 99 99 5 6 99                    
    99 99 99 99 99 99 99 99 99 99 99 4                       
    99 99 99 99 99 99 99 99 99 99 99 2                       
    99 99 99 99 99 99 99 99 99 99 99 5                        
    99 99 99 99 99 99 99 99 99 99 99 0                     

    Enter the source node: 1                       
    Enter the target node: 12                                  
  
- **Output**: 
  - The shortest path distance from node 1 to node 12 is: 16                       
    Path: 1 -> 2 -> 7 -> 10 -> 12.                             
### Diagrammatic represntation of the above example
  ![Screenshot 2024-10-22 184618](https://github.com/user-attachments/assets/b4a70ddf-332e-4885-b367-38b20362d31f)

### Algorithm Overview
1. **Initialization:**                  
   The distance array `dist[]` is initialized with INF for all nodes except the target node, which has a distance of `0`. This array will store the shortest known distances from each node to the target.
   The path array `path[]` is initialized to store the next node on the shortest path for each node.
2. **Dynamic Programming Loop:**                       
   The function iterates from the target node backward to the source, evaluating each node's potential distance to the target by checking its connection to subsequent nodes.
   If the current distance from node `i` to the target is greater than the distance from node `i` to `j` plus `dist[j]` (where j is a neighboring node), it updates `dist[i]` and sets `path[i]` to `j`.
3. **Path Construction:**                 
   If a valid path exists, the function prints the shortest distance from the source to the target.
   It then traces the path from the source to the target using the `path[]` array and prints each node in the order they are visited.

### Time Complexity
- O(n^2) - where `n` is the total number of nodes in the multistage graph

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <climits>

#define INF 99

void shortestDist(const std::vector<std::vector<int>>& graph, int n, int source, int target) {
    std::vector<int> dist(n + 1, INF), path(n + 1, -1);

    dist[target] = 0;
    path[target] = target;

    for (int i = target - 1; i >= 1; i--) {
        for (int j = i + 1; j <= n; j++) {
            if (graph[i][j] != INF && dist[i] > graph[i][j] + dist[j]) {
                dist[i] = graph[i][j] + dist[j];
                path[i] = j;
            }
        }
    }

    if (dist[source] == INF) {
        std::cout << "There is no path from node " << source << " to node " << target << "\n";
        return;
    }

    std::cout << "The shortest path distance from node " << source << " to node " << target << " is: " << dist[source] << "\n";

    std::cout << "Path: " << source;
    int current = source;
    while (current != target) {
        current = path[current];
        std::cout << " -> " << current;
    }
    std::cout << "\n";
}

int main() {
    int n, source, target;

    std::cout << "Enter the number of vertices in the graph: ";
    std::cin >> n;

    std::vector<std::vector<int>> graph(n + 1, std::vector<int>(n + 1));

    std::cout << "Enter the adjacency matrix (use " << INF << " for INF):\n";
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            std::cin >> graph[i][j];
        }
    }

    std::cout << "Enter the source node: ";
    std::cin >> source;
    std::cout << "Enter the target node: ";
    std::cin >> target;

    shortestDist(graph, n, source, target);

    return 0;
}
```
