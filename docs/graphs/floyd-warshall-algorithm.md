---
id: floyd-warshall-algorithm
title: "Floyd-Warshall Algorithm"
sidebar_label: "Floyd-Warshall Algorithm"
sidebar_position: 5
description: "A complete guide to Floyd-Warshall Algorithm with explanations, use cases, and implementations in Python, Java, C++, and JavaScript."
tags: [graph, shortest-path, dynamic-programming, floyd-warshall, all-pairs, dsa]
---

The **Floyd-Warshall Algorithm** is used to find the shortest paths between **all pairs of vertices** in a weighted graph.

Unlike Dijkstra or Bellman-Ford, which are *Single-Source Shortest Path* algorithms (finding distances from one node to all others), Floyd-Warshall computes the distances between every node `u` and every node `v`.

:::info Key Feature
Floyd-Warshall handles negative weights correctly. It can also be used to detect negative weight cycles (if the distance from a node to itself becomes negative).
:::

---

## How It Works

The algorithm uses **Dynamic Programming**. The core idea is to gradually allow more intermediate vertices to form paths between any two nodes.

### Steps

1. Initialize a 2D `dist` matrix. If there's an edge from `u` to `v`, `dist[u][v] = weight(u, v)`. Otherwise, `dist[u][v] = ∞`. The diagonal `dist[i][i] = 0`.
2. For each intermediate node `k` from `0` to `V-1`:
   - For every pair `(i, j)`:
     - Check if the path `i → k → j` is shorter than the currently known path `i → j`.
     - Update: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`

---

## Complexity Analysis

| Metric           | Value        |
|------------------|--------------|
| Time Complexity  | O(V³)        |
| Space Complexity | O(V²)        |

Where `V` = number of vertices. Because of the `O(V³)` time complexity, it is best suited for small, dense graphs.

---

## Implementations

### Python

```python
def floyd_warshall(graph):
    V = len(graph)
    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))
    
    # Adding vertices individually
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                
    return dist

# Example usage (INF represented as float('inf'))
INF = float('inf')
graph = [
    [0, 5, INF, 10],
    [INF, 0, 3, INF],
    [INF, INF, 0, 1],
    [INF, INF, INF, 0]
]
result = floyd_warshall(graph)
```

### Java

```java
public class FloydWarshall {
    final static int INF = 99999, V = 4;

    void floydWarshall(int graph[][]) {
        int dist[][] = new int[V][V];
        int i, j, k;

        for (i = 0; i < V; i++)
            for (j = 0; j < V; j++)
                dist[i][j] = graph[i][j];

        for (k = 0; k < V; k++) {
            for (i = 0; i < V; i++) {
                for (j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}
```

### C++

```cpp
#include <iostream>
#include <vector>

using namespace std;
#define INF 99999

void floydWarshall(int V, vector<vector<int>>& graph) {
    vector<vector<int>> dist = graph;
    
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}
```

### JavaScript

```javascript
function floydWarshall(graph) {
    const V = graph.length;
    const dist = Array.from(graph, row => [...row]);

    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}
```

---

## Real-World Use Cases

- **Flight Routes** — Finding the cheapest connections between all possible city pairs.
- **Transitive Closure** — Checking if there exists a path between every pair of nodes in a directed graph.
- **Network Routing** — Used in decentralized networks to update routing tables.
