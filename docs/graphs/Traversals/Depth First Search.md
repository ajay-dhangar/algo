---
id: depth-first-search
title: Depth-First Search (DFS)
sidebar_label: Depth-First Search
description: "In this blog post, we'll explore Depth-First Search (DFS), a fundamental graph traversal algorithm. We'll discuss its implementation, time complexity, and practical applications in various fields such as pathfinding and tree traversals."
tags: [dsa, algorithms, graph traversal]
---

# Depth-First Search (DFS)

## Introduction

Depth-First Search (DFS) is a fundamental graph traversal algorithm used to explore nodes and edges of a graph. Starting from a selected node (or vertex), DFS explores as far as possible along each branch before backtracking. This algorithm is particularly useful in scenarios such as pathfinding, topological sorting, and solving puzzles with a single solution.

## Implementation

The implementation of DFS can be done using either recursion or an explicit stack. The basic steps are:

1. **Initialize**:
   - Create a visited array to track visited vertices.
   - Use a stack or recursion to explore vertices.

2. **Process Vertices**:
   - For each unvisited vertex, mark it as visited and recursively visit all its unvisited neighbors.

## Code in Java

Here’s a sample implementation of Depth-First Search in Java:

```java
import java.util.*;

public class DepthFirstSearch {
    
    public static void dfs(int vertex, boolean[] visited, List<List<Integer>> adj) {
        visited[vertex] = true;
        System.out.print(vertex + " "); // Process the current vertex
        
        // Visit all the neighbors
        for (int neighbor : adj.get(vertex)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, adj);
            }
        }
    }

    public static void main(String[] args) {
        int vertices = 5;
        List<List<Integer>> adj = new ArrayList<>(vertices);
        
        for (int i = 0; i < vertices; i++) {
            adj.add(new ArrayList<>());
        }

        // Example graph edges
        adj.get(0).add(1);
        adj.get(0).add(2);
        adj.get(1).add(3);
        adj.get(1).add(4);
        
        boolean[] visited = new boolean[vertices];
        System.out.println("Depth-First Search starting from vertex 0:");
        dfs(0, visited, adj);
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of DFS is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. This is because each vertex and edge is processed once.

### Space Complexity

The space complexity is \( O(V) \), which accounts for:
- The storage of the visited array.
- The recursion stack (or explicit stack) used for traversal.

## Points to Remember

1. **Graph Type**: DFS works on both directed and undirected graphs.
2. **Cycle Detection**: DFS can be used to detect cycles in graphs.
3. **Pathfinding**: DFS may not find the shortest path in weighted graphs.
4. **Traversal Order**: The order of traversal may vary based on the implementation and graph structure.
5. **Memory Usage**: Recursive implementations may lead to stack overflow for large graphs due to deep recursion.