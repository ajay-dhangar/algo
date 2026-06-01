---
id: bfs-algorithm
title: "Breadth-First Search (BFS)"
sidebar_label: "Breadth-First Search"
sidebar_position: 1
description: "A complete guide to Breadth-First Search (BFS) algorithm with explanations, use cases, and implementations in Python, Java, C++, and JavaScript."
tags: [graph, search, bfs, shortest-path, level-order, dsa]
---

**Breadth-First Search (BFS)** is a fundamental graph traversal algorithm that explores all the vertices of a graph at the present depth level before moving on to the vertices at the next depth level.

:::info Key Use Case
BFS is the best algorithm to find the **shortest path** on an unweighted graph, as it naturally explores nodes in increasing order of distance from the source.
:::

---

## How It Works

BFS uses a **Queue (FIFO)** data structure to keep track of the vertices to visit next.

### Steps

1. Start by putting the source node in a queue and marking it as visited.
2. While the queue is not empty:
   - Dequeue a node from the front of the queue.
   - For every unvisited neighbor of this node:
     - Mark it as visited.
     - Enqueue it at the back of the queue.

---

## Complexity Analysis

| Metric           | Value        |
|------------------|--------------|
| Time Complexity  | O(V + E)     |
| Space Complexity | O(V)         |

Where `V` = number of vertices, `E` = number of edges.

---

## Implementations

### Python

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    result = []
    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result

# Example graph represented as an adjacency list
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2]
}
print(bfs(graph, 0)) # Output: [0, 1, 2, 3, 4, 5]
```

### Java

```java
import java.util.*;

public class BFS {
    public static void bfs(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.add(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");

            for (int neighbor : graph.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
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
#include <queue>

using namespace std;

void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

### JavaScript

```javascript
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    const result = [];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}
```

---

## Real-World Use Cases

- **Social Networks** — Finding people within a certain degree of separation (e.g., friends of friends).
- **Web Crawlers** — Search engines like Google use BFS to crawl links on a page level by level.
- **GPS Navigation** — Finding the shortest route if all roads have the same length.
