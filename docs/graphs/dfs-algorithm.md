---
id: dfs-algorithm
title: "Depth-First Search (DFS)"
sidebar_label: "Depth-First Search"
sidebar_position: 3
description: "A complete guide to Depth-First Search (DFS) algorithm with explanations, use cases, and implementations in Python, Java, C++, and JavaScript."
tags: [graph, search, dfs, backtracking, recursion, dsa]
---

**Depth-First Search (DFS)** is a graph traversal algorithm that explores as far as possible along each branch before backtracking. 

:::info Key Use Case
DFS is extremely useful for **topological sorting**, **detecting cycles**, and solving **mazes or puzzles** with a single solution.
:::

---

## How It Works

DFS uses a **Stack (LIFO)** data structure, typically implemented via the call stack during recursion, to keep track of the vertices to visit.

### Difference from BFS

While DFS dives deep into a graph by exploring as far as possible along each branch before backtracking, **Breadth-First Search (BFS)** explores the graph level by level, visiting all immediate neighbors of a node before moving deeper. BFS uses a Queue (FIFO) data structure, whereas DFS uses a Stack (LIFO).

### Steps

1. Start by picking a node and marking it as visited.
2. Visit an adjacent unvisited node, mark it as visited, and recursively call DFS on it.
3. If the current node has no unvisited adjacent nodes, backtrack to the previous node and continue the process.
4. The traversal ends when all reachable nodes are visited.

---

## Complexity Analysis

| Metric           | Value        |
|------------------|--------------|
| Time Complexity  | O(V + E)     |
| Space Complexity | O(V)         |

Where `V` = number of vertices, `E` = number of edges. Space complexity stems from the recursion stack in the worst-case scenario (e.g., a straight line graph).

---

## Implementations

### Python

**Recursive Implementation**
```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=" ")

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Example graph represented as an adjacency list
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2]
}
dfs(graph, 0) # Output: 0 1 3 4 2 5
```

**Iterative Implementation**
```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node not in visited:
            print(node, end=" ")
            visited.add(node)
            # Add neighbors to stack in reverse order to visit them in the same order as recursion.
            # Note: This simple iterative approach can push duplicate nodes onto the stack,
            # leading to a worst-case space complexity of O(E) instead of O(V).
            stack.extend(reversed(graph[node]))

dfs_iterative(graph, 0) # Output: 0 1 3 4 2 5
```

### Java

```java
import java.util.*;

public class DFS {
    public static void dfs(List<List<Integer>> graph, int start, boolean[] visited) {
        visited[start] = true;
        System.out.print(start + " ");

        for (int neighbor : graph.get(start)) {
            if (!visited[neighbor]) {
                dfs(graph, neighbor, visited);
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

void dfs(vector<vector<int>>& graph, int start, vector<bool>& visited) {
    visited[start] = true;
    cout << start << " ";

    for (int neighbor : graph[start]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

### JavaScript

```javascript
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);

    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

---

## Real-World Use Cases

- **Cycle Detection** — Finding cycles in graphs to resolve deadlocks.
- **Topological Sorting** — Used in build systems (like Make or npm) to resolve dependencies.
- **Connected Components** — Finding all connected components in an undirected graph.
- **Path Finding** — Finding a path in games or mazes where we just need *any* path, not necessarily the shortest.
