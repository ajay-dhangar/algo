---
id: cycle-detection-undirected
title: "Cycle Detection in Undirected Graphs"
sidebar_label: "Cycle Detection"
sidebar_position: 10
description: "Detecting cycles in undirected graphs using Depth-First Search and Union-Find approaches, with O(V+E) time complexity."
tags: ["dsa", "algorithms", "graphs", "cycle-detection"]
---

# Cycle Detection in Undirected Graphs

## Overview

Cycle detection in undirected graphs determines whether a cycle exists in the graph. A cycle occurs when we can start at a vertex, follow edges, and return to the starting vertex without traversing any edge twice.

## Two Main Approaches

1. **DFS-based**: Track visited nodes and parent to detect back edges
2. **Union-Find (Disjoint Set Union)**: Detect cycle when trying to union already-connected vertices

## Approach 1: DFS Detection

### Key Insight

During DFS traversal, a cycle exists if we encounter a vertex that:
1. Has already been visited
2. Is NOT the parent of the current vertex

If we only skip the parent, any other visited neighbor indicates a cycle.

### Algorithm

```
CYCLE_DFS(graph):
    visited = empty set
    parent = null
    
    for each vertex v:
        if v not in visited:
            if DFS(v, visited, parent):
                return true
    
    return false

DFS(v, visited, parent):
    visited.add(v)
    
    for each neighbor u of v:
        if u not in visited:
            if DFS(u, visited, v):
                return true
        else if u != parent:
            # Found a visited vertex that's not parent = cycle
            return true
    
    return false
```

### Handling Disconnected Graphs

Run DFS from every unvisited vertex to handle disconnected components:

```python
def has_cycle_disconnected(graph, num_vertices):
    visited = [False] * num_vertices
    
    for vertex in range(num_vertices):
        if not visited[vertex]:
            if dfs_cycle_check(graph, vertex, visited, -1):
                return True
    
    return False
```

## Approach 2: Union-Find (Disjoint Set Union)

### Key Insight

A cycle exists if and only if when trying to add an edge (u, v), both u and v already belong to the same connected component.

### Algorithm

```
UNION_FIND_CYCLE(graph):
    parent = [i for i in range(num_vertices)]
    rank = [0 for i in range(num_vertices)]
    
    for each edge (u, v):
        if find(u) == find(v):
            return true  # Cycle detected
        union(u, v)
    
    return false

FIND(x):
    if parent[x] != x:
        parent[x] = FIND(parent[x])  # Path compression
    return parent[x]

UNION(x, y):
    root_x = FIND(x)
    root_y = FIND(y)
    
    if root_x == root_y:
        return  # Already connected
    
    # Union by rank
    if rank[root_x] < rank[root_y]:
        parent[root_x] = root_y
    elif rank[root_x] > rank[root_y]:
        parent[root_y] = root_x
    else:
        parent[root_y] = root_x
        rank[root_x] += 1
```

## Python Implementation

### DFS Approach

```python
from collections import defaultdict, deque
from typing import List, Optional


def has_cycle_dfs(num_vertices: int, edges: List[List[int]]) -> bool:
    """
    Detect cycle in undirected graph using DFS.
    
    Args:
        num_vertices: Number of vertices (0 to n-1)
        edges: List of edges as [u, v]
        
    Returns:
        True if cycle exists, False otherwise
        
    Time: O(V + E)
    Space: O(V + E) for adjacency list, O(V) for visited
    """
    # Build adjacency list
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = [False] * num_vertices
    
    def dfs(vertex: int, parent: int) -> bool:
        """DFS from vertex, skipping parent to avoid false positive."""
        visited[vertex] = True
        
        for neighbor in graph[vertex]:
            if not visited[neighbor]:
                if dfs(neighbor, vertex):
                    return True
            elif neighbor != parent:
                # Found visited vertex that's not parent = cycle
                return True
        
        return False
    
    # Check all components (handles disconnected graphs)
    for vertex in range(num_vertices):
        if not visited[vertex]:
            if dfs(vertex, -1):
                return True
    
    return False


def find_cycle_path_dfs(num_vertices: int, edges: List[List[int]]) -> Optional[List[int]]:
    """
    Find the actual cycle path if one exists.
    Returns the cycle as a list of vertices.
    """
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = [False] * num_vertices
    parent = [-1] * num_vertices
    
    def dfs(vertex: int, par: int) -> Optional[List[int]]:
        visited[vertex] = True
        parent[vertex] = par
        
        for neighbor in graph[vertex]:
            if not visited[neighbor]:
                result = dfs(neighbor, vertex)
                if result:
                    return result
            elif neighbor != par:
                # Found cycle! Reconstruct it
                cycle = [neighbor]
                curr = vertex
                while curr != neighbor:
                    cycle.append(curr)
                    curr = parent[curr]
                return cycle
        
        return None
    
    for vertex in range(num_vertices):
        if not visited[vertex]:
            result = dfs(vertex, -1)
            if result:
                return result
    
    return None


def has_cycle_bfs(num_vertices: int, edges: List[List[int]]) -> bool:
    """
    Detect cycle using BFS (level-based approach).
    In BFS, a cycle exists if we encounter an already-visited vertex
    that is not the parent of current vertex.
    """
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = [False] * num_vertices
    
    for vertex in range(num_vertices):
        if visited[vertex]:
            continue
        
        queue = deque([(vertex, -1)])  # (node, parent)
        visited[vertex] = True
        
        while queue:
            node, par = queue.popleft()
            
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append((neighbor, node))
                elif neighbor != par:
                    return True  # Cycle found
    
    return False


# Union-Find approach
class UnionFind:
    """Disjoint Set Union with path compression and union by rank."""
    
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        """
        Union two sets. Returns True if union performed,
        False if already in same set (indicates cycle).
        """
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False  # Already connected = cycle
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True


def has_cycle_union_find(num_vertices: int, edges: List[List[int]]) -> bool:
    """
    Detect cycle using Union-Find data structure.
    
    Time: O(E * alpha(V)) where alpha is inverse Ackermann
    Space: O(V)
    """
    uf = UnionFind(num_vertices)
    
    for u, v in edges:
        if not uf.union(u, v):
            return True  # Cycle detected
    
    return False


# Example usage
if __name__ == "__main__":
    # Graph with cycle
    #     0
    #    / \
    #   1---2
    edges_with_cycle = [[0, 1], [1, 2], [2, 0]]
    print(f"Cycle (0-1-2-0): DFS={has_cycle_dfs(3, edges_with_cycle)}, "
          f"UnionFind={has_cycle_union_find(3, edges_with_cycle)}")
    
    # Graph without cycle
    #     0
    #    / \
    #   1   2
    edges_no_cycle = [[0, 1], [0, 2]]
    print(f"No cycle (0-1, 0-2): DFS={has_cycle_dfs(3, edges_no_cycle)}, "
          f"UnionFind={has_cycle_union_find(3, edges_no_cycle)}")
    
    # Disconnected graph with cycle in one component
    #   0---1     2---3
    #           \ /
    #            4
    disconnected = [[0, 1], [2, 3], [3, 4], [4, 2]]
    print(f"Disconnected cycle: DFS={has_cycle_dfs(5, disconnected)}")
    
    # Find actual cycle path
    cycle_path = find_cycle_path_dfs(3, edges_with_cycle)
    print(f"Cycle path: {cycle_path}")
```

## JavaScript Implementation

```javascript
/**
 * Detect cycle in undirected graph using DFS
 * @param {number} numVertices
 * @param {number[][]} edges
 * @returns {boolean}
 */
function hasCycleDFS(numVertices, edges) {
    // Build adjacency list
    const graph = Array.from({ length: numVertices }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    const visited = new Array(numVertices).fill(false);
    
    function dfs(vertex, parent) {
        visited[vertex] = true;
        
        for (const neighbor of graph[vertex]) {
            if (!visited[neighbor]) {
                if (dfs(neighbor, vertex)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                return true;  // Cycle found
            }
        }
        return false;
    }
    
    // Check all components
    for (let i = 0; i < numVertices; i++) {
        if (!visited[i]) {
            if (dfs(i, -1)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Union-Find data structure
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) {
            return false;  // Cycle detected
        }
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}

/**
 * Detect cycle using Union-Find
 * @param {number} numVertices
 * @param {number[][]} edges
 * @returns {boolean}
 */
function hasCycleUnionFind(numVertices, edges) {
    const uf = new UnionFind(numVertices);
    
    for (const [u, v] of edges) {
        if (!uf.union(u, v)) {
            return true;  // Cycle detected
        }
    }
    return false;
}

// Example usage
const edgesWithCycle = [[0, 1], [1, 2], [2, 0]];
const edgesNoCycle = [[0, 1], [0, 2]];

console.log(`Cycle (0-1-2-0): DFS=${hasCycleDFS(3, edgesWithCycle)}, UnionFind=${hasCycleUnionFind(3, edgesWithCycle)}`);
console.log(`No cycle: DFS=${hasCycleDFS(3, edgesNoCycle)}, UnionFind=${hasCycleUnionFind(3, edgesNoCycle)}`);
```

## Visual Example

```
Graph with cycle:          DFS traversal:
                           Start at 0
    0 ──── 1                      0
    │      │                     / \
    │      │         visited:   1   2
    └──────2                    ↑
                                |
When at 2, neighbor 0 is        This back edge (2→0) indicates cycle
visited and 0 ≠ parent(2)

Graph without cycle:        DFS traversal:
                              Start at 0
    0 ──── 1                      0
    │                               / \
    │                            1   2
    2                               ↑
                                   |
When at 2, only unvisited          No back edge - no cycle
neighbor is parent(0), skip it
```

## Complexity Analysis

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| DFS | O(V + E) | O(V + E) | Recursive or explicit stack |
| BFS | O(V + E) | O(V + E) | Queue-based |
| Union-Find | O(E * alpha(V)) | O(V) | Nearly constant amortized |

Where alpha(V) is the inverse Ackermann function, effectively constant.

## Comparison

| Aspect | DFS | BFS | Union-Find |
|--------|-----|-----|------------|
| Implementation | Recursive/Stack | Queue | Array-based |
| Memory | O(V) recursion stack | O(V) queue | O(V) |
| Finds cycle location | Yes | Yes | Yes |
| Better for | Path reconstruction | Shortest path | Dynamic graphs |
