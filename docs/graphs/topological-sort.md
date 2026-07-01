---
id: topological-sort
title: "Topological Sort"
sidebar_label: "Topological Sort"
sidebar_position: 6
description: "A complete guide to Topological Sort with explanations, use cases, and implementations in Python, Java, C++, and JavaScript."
tags: [graph, dag, topological-sort, ordering, dsa]
---

The **Topological Sort** is a linear ordering of vertices in a **Directed Acyclic Graph (DAG)** such that for every directed edge `u → v`, vertex `u` appears before vertex `v` in the ordering.

It is commonly used when tasks have dependencies and must be performed in a specific sequence.

:::info Key Feature
Topological Sort is only possible in a Directed Acyclic Graph (DAG). If the graph contains a cycle, a valid topological ordering does not exist.
:::

## Video Explanation

<LiteYouTubeEmbed
  id="dis_c84ejhQ"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="6.10 Topological Sorting (with Examples) | How to find all Topological Orderings of a Graph"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

---

## How It Works

The algorithm is commonly implemented using **Kahn's Algorithm (BFS)** or **Depth-First Search (DFS)**.

The most popular approach is **Kahn's Algorithm**, which repeatedly selects nodes with zero incoming edges.

### Steps

1. Calculate the in-degree of every vertex.
2. Add all vertices with in-degree `0` to a queue.
3. Remove a vertex from the queue and add it to the result.
4. Decrease the in-degree of all its adjacent vertices.
5. If any adjacent vertex becomes `0`, add it to the queue.
6. Repeat until the queue becomes empty.
7. If the number of processed vertices is less than the total number of vertices, the graph contains a cycle.

---

## Complexity Analysis

| Metric | Value |
|----------|----------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |

Where:

- `V` = Number of Vertices
- `E` = Number of Edges

---

## Implementations

### Python

```python
from collections import deque

def topological_sort(graph, vertices):
    indegree = [0] * vertices

    for u in graph:
        for v in graph[u]:
            indegree[v] += 1

    queue = deque()

    for i in range(vertices):
        if indegree[i] == 0:
            queue.append(i)

    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph.get(node, []):
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == vertices else []


graph = {
    0: [1, 2],
    1: [3],
    2: [3]
}

print(topological_sort(graph, 4))
```

### Java

```java
import java.util.*;

public class TopologicalSort {

    public static void topologicalSort(List<List<Integer>> graph, int V) {
        int[] indegree = new int[V];

        for (int i = 0; i < V; i++) {
            for (int neighbor : graph.get(i)) {
                indegree[neighbor]++;
            }
        }

        Queue<Integer> queue = new LinkedList<>();

        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }

        int count = 0;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            count++;

            for (int neighbor : graph.get(node)) {
                indegree[neighbor]--;

                if (indegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }

        if (count != V) {
            System.out.println("\nCycle detected. Topological ordering not possible.");
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

vector<int> topologicalSort(int V, vector<vector<int>>& graph) {
    vector<int> indegree(V, 0);

    for (int i = 0; i < V; i++) {
        for (int neighbor : graph[i]) {
            indegree[neighbor]++;
        }
    }

    queue<int> q;

    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0)
            q.push(i);
    }

    vector<int> result;

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        result.push_back(node);

        for (int neighbor : graph[node]) {
            indegree[neighbor]--;

            if (indegree[neighbor] == 0)
                q.push(neighbor);
        }
    }

    return result.size() == V ? result : vector<int>();
}
```

### JavaScript

```javascript
function topologicalSort(graph, V) {
    const indegree = new Array(V).fill(0);

    for (let u = 0; u < V; u++) {
        for (const v of graph[u]) {
            indegree[v]++;
        }
    }

    const queue = [];

    for (let i = 0; i < V; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    const result = [];

    while (queue.length) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph[node]) {
            indegree[neighbor]--;

            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return result.length === V ? result : [];
}
```

---

## Real-World Use Cases

- **Course Scheduling** — Determine the order of courses based on prerequisites.
- **Build Systems** — Compile source files in dependency order.
- **Task Scheduling** — Execute dependent tasks in the correct sequence.
- **Package Management** — Install software packages while respecting dependencies.
- **Project Planning** — Organize workflows where certain tasks must be completed before others.