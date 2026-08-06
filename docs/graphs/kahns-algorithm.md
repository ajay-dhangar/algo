---
id: kahns-algorithm
title: "Kahn's Algorithm"
sidebar_label: "Kahn's Algorithm"
sidebar_position: 9
description: "A BFS-based algorithm for topological sorting of directed acyclic graphs using indegree counting, with O(V+E) time complexity."
tags: ["dsa", "algorithms", "graphs", "topological-sort"]
difficulty: Medium
---

# Kahn's Algorithm for Topological Sort

## Overview

Kahn's Algorithm is a BFS-based approach for performing topological sorting on a Directed Acyclic Graph (DAG). It repeatedly removes vertices with zero indegree (no incoming edges) until the graph is empty.

## Key Concepts

### Indegree

**Indegree** of a vertex is the number of edges pointing TO that vertex.

```
Indegree Example:

    A ──→ B ──→ C
    │           ↑
    └───────────┘

Vertex  Indegree  Outdegree
   A        0           2
   B        1           1
   C        2           0
```

### Topological Order

A topological order is a linear ordering of all vertices such that for every edge (u, v), vertex u appears before vertex v in the ordering.

A valid topological order for the above graph: **A, B, C** or **A, B, C**

## Algorithm Steps

```
KAHN_TOPOLOGICAL_SORT(G):
    1. Calculate indegree of all vertices
    2. Initialize queue with all vertices having indegree 0
    3. While queue is not empty:
        a. Dequeue vertex u
        b. Add u to topological order
        c. For each neighbor v of u:
            - Reduce indegree[v] by 1
            - If indegree[v] becomes 0, enqueue v
    4. If result size < |V|: Cycle exists (not a DAG)
```

## Step-by-Step Example

Given graph:
```
    2 ──→ 3
    │      ↑
    1 ────┘
    │
    └──→ 0
```

### Step 1: Calculate Indegrees

| Vertex | Indegree | Outgoing |
|--------|----------|----------|
| 0      | 0        | 1        |
| 1      | 0        | 3        |
| 2      | 1        | 1        |
| 3      | 2        | 0        |

### Step 2: Initialize Queue

Queue starts with vertices having indegree 0: **[0, 1]**

### Step 3: Process Vertices

**Iteration 1**: Dequeue 0
- Add 0 to result
- Reduce indegree[2] from 1 to 0
- Enqueue 2 (now indegree 0)
- Queue: **[1, 2]**

**Iteration 2**: Dequeue 1
- Add 1 to result
- Reduce indegree[2] from 0 to... (no edge 1→2)
- No changes
- Queue: **[2]**

**Iteration 3**: Dequeue 2
- Add 2 to result
- Reduce indegree[3] from 2 to 1
- indegree[3] != 0, don't enqueue
- Queue: **[]**

**Iteration 4**: Dequeue 3
- Add 3 to result
- Queue: **[]**

### Result

Topological Order: **[0, 1, 2, 3]**

## Python Implementation

```python
from collections import deque, defaultdict


def kahn_topological_sort(num_courses: int, prerequisites: list) -> list:
    """
    Perform topological sort using Kahn's Algorithm.
    
    Args:
        num_courses: Number of courses (vertices)
        prerequisites: List of [a, b] where a must be taken before b
        
    Returns:
        Topological order of courses, or empty list if cycle exists
        
    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list and indegree array
    graph = defaultdict(list)
    indegree = [0] * num_courses
    
    for dest, src in prerequisites:
        graph[src].append(dest)
        indegree[dest] += 1
    
    # Initialize queue with vertices having indegree 0
    queue = deque()
    for i in range(num_courses):
        if indegree[i] == 0:
            queue.append(i)
    
    # Process vertices
    topo_order = []
    
    while queue:
        # Dequeue vertex with no dependencies
        vertex = queue.popleft()
        topo_order.append(vertex)
        
        # Reduce indegree of neighbors
        for neighbor in graph[vertex]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check for cycle: if not all vertices processed, cycle exists
    if len(topo_order) != num_courses:
        return []  # Cycle detected
    
    return topo_order


def build_order(num_projects: int, dependencies: list) -> list:
    """
    Find a build order for projects given dependencies.
    Similar to LeetCode 269 (Alien Dictionary).
    """
    result = kahn_topological_sort(num_projects, dependencies)
    return result if result else []  # Empty means cycle


# Advanced: Class-based implementation
class TopologicalSort:
    """
    Kahn's Algorithm implementation with detailed tracking.
    """
    
    def __init__(self, num_vertices: int):
        self.num_vertices = num_vertices
        self.graph = defaultdict(list)
        self.indegree = [0] * num_vertices
    
    def add_edge(self, u: int, v: int):
        """Add directed edge u -> v."""
        self.graph[u].append(v)
        self.indegree[v] += 1
    
    def sort(self) -> list:
        """
        Perform topological sort.
        
        Returns:
            Topological order, or empty list if cycle exists
            
        Raises:
            ValueError if cycle is detected
        """
        queue = deque([i for i in range(self.num_vertices) if self.indegree[i] == 0])
        result = []
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            for neighbor in self.graph[vertex]:
                self.indegree[neighbor] -= 1
                if self.indegree[neighbor] == 0:
                    queue.append(neighbor)
        
        if len(result) != self.num_vertices:
            raise ValueError("Graph contains a cycle - topological sort not possible")
        
        return result
    
    def has_cycle(self) -> bool:
        """Check if graph contains a cycle."""
        return len(self.sort()) != self.num_vertices
    
    def all_orders(self) -> list:
        """
        Return ALL valid topological orders.
        Useful for understanding non-unique topological sorts.
        """
        if self.has_cycle():
            return []
        
        result = []
        used = [False] * self.num_vertices
        indegree_copy = self.indegree.copy()
        
        def backtrack():
            if len(result) == self.num_vertices:
                yield list(result)
                return
            
            for i in range(self.num_vertices):
                if indegree_copy[i] == 0 and not used[i]:
                    # Choose this vertex
                    used[i] = True
                    result.append(i)
                    
                    # Reduce indegree of neighbors
                    for neighbor in self.graph[i]:
                        indegree_copy[neighbor] -= 1
                    
                    # Recurse
                    yield from backtrack()
                    
                    # Undo choice
                    for neighbor in self.graph[i]:
                        indegree_copy[neighbor] += 1
                    
                    result.pop()
                    used[i] = False
        
        return list(backtrack())


# Example usage and testing
if __name__ == "__main__":
    # LeetCode 207 - Course Schedule
    num_courses = 4
    prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
    
    order = kahn_topological_sort(num_courses, prerequisites)
    print(f"Course Schedule - Topological Order: {order}")
    # Possible output: [0, 1, 2, 3] or [0, 2, 1, 3]
    
    # Class-based usage
    topo = TopologicalSort(6)
    edges = [(5, 2), (5, 0), (4, 0), (4, 1), (2, 3), (3, 1)]
    for u, v in edges:
        topo.add_edge(u, v)
    
    print(f"Topological Order: {topo.sort()}")
    print(f"Has Cycle: {topo.has_cycle()}")
    
    # Cycle detection example
    topo2 = TopologicalSort(3)
    topo2.add_edge(0, 1)
    topo2.add_edge(1, 2)
    topo2.add_edge(2, 0)  # Creates cycle
    
    try:
        topo2.sort()
    except ValueError as e:
        print(f"Cycle detected: {e}")
```

## JavaScript Implementation

```javascript
/**
 * Kahn's Algorithm for Topological Sort
 * 
 * @param {number} numCourses - Number of courses
 * @param {number[][]} prerequisites - [a, b] pairs where a must come before b
 * @returns {number[]} - Topological order or empty array if cycle exists
 */
function kahnTopologicalSort(numCourses, prerequisites) {
    // Build graph and calculate indegrees
    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [dest, src] of prerequisites) {
        graph[src].push(dest);
        indegree[dest]++;
    }
    
    // Initialize queue with all nodes having indegree 0
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        // Dequeue node with no dependencies
        const node = queue.shift();
        result.push(node);
        
        // Reduce indegree of all neighbors
        for (const neighbor of graph[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // If result doesn't contain all nodes, there's a cycle
    if (result.length !== numCourses) {
        return [];  // Cycle detected
    }
    
    return result;
}

/**
 * Class-based implementation
 */
class TopologicalSort {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.graph = Array.from({ length: numVertices }, () => []);
        this.indegree = new Array(numVertices).fill(0);
    }
    
    addEdge(u, v) {
        this.graph[u].push(v);
        this.indegree[v]++;
    }
    
    sort() {
        const queue = [];
        const result = [];
        const indegreeCopy = [...this.indegree];
        
        // Initialize with all nodes having indegree 0
        for (let i = 0; i < this.numVertices; i++) {
            if (indegreeCopy[i] === 0) {
                queue.push(i);
            }
        }
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);
            
            for (const neighbor of this.graph[node]) {
                indegreeCopy[neighbor]--;
                if (indegreeCopy[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
        
        return result.length === this.numVertices ? result : null;
    }
    
    hasCycle() {
        return this.sort() === null;
    }
}

// Example usage
const numCourses = 4;
const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]];

const order = kahnTopologicalSort(numCourses, prerequisites);
console.log(`Topological Order: [${order}]`);
// Possible output: [0, 1, 2, 3]

// Using class
const topo = new TopologicalSort(6);
[[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]].forEach(([u, v]) => topo.addEdge(u, v));

console.log(`Topological Sort: [${topo.sort()}]`);
console.log(`Has Cycle: ${topo.hasCycle()}`);
```

## Cycle Detection

Kahn's Algorithm naturally detects cycles:

```python
def detect_cycle_kahn(num_vertices, edges):
    """Detect cycle using Kahn's Algorithm approach."""
    graph = defaultdict(list)
    indegree = [0] * num_vertices
    
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1
    
    queue = deque([i for i in range(num_vertices) if indegree[i] == 0])
    processed = 0
    
    while queue:
        vertex = queue.popleft()
        processed += 1
        
        for neighbor in graph[vertex]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    # If processed != num_vertices, cycle exists
    if processed != num_vertices:
        # Find vertices in cycle
        in_cycle = [i for i in range(num_vertices) if indegree[i] > 0]
        return True, in_cycle
    
    return False, []
```

## Comparison with DFS Topological Sort

| Aspect | Kahn's Algorithm | DFS Topological Sort |
|--------|-----------------|----------------------|
| Approach | BFS | DFS |
| Data structure | Queue | Stack |
| Order produced | Front-to-back | Reverse post-order |
| Cycle detection | Result size check | Back-edge detection |
| Complexity | O(V + E) | O(V + E) |
| Use case | When order matters | When cycle detection needed mid-way |

## Time and Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time | O(V + E) |
| Space | O(V + E) for adjacency list |
| Additional space | O(V) for queue and indegree array |

## LeetCode Problems

- **207 - Course Schedule**: Check if all courses can be finished
- **210 - Course Schedule II**: Return topological order of courses
- **269 - Alien Dictionary**: Find alien language order
- **310 - Minimum Height Trees**: Find centers of tree formed by removing leaves
