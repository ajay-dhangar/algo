---
id: breadth-first-search
title: Breadth-First Search (BFS)
sidebar_label: Breadth-First Search
description: "In this blog post, we'll delve into Breadth-First Search (BFS), another essential graph traversal algorithm. We'll cover its implementation, time complexity, and use cases in applications like shortest path finding and network broadcasting."
tags: [dsa, algorithms, graph traversal]
---


### Breadth-First Search (BFS)

```markdown
# Breadth-First Search (BFS)

## Introduction

Breadth-First Search (BFS) is another fundamental graph traversal algorithm that explores nodes level by level. Starting from a selected node (or vertex), BFS visits all neighboring nodes at the present depth before moving on to nodes at the next depth level. This algorithm is widely used in applications such as finding the shortest path in unweighted graphs and network broadcasting.

## Implementation

The implementation of BFS involves using a queue to keep track of vertices that need to be explored. The basic steps are:

1. **Initialize**:
   - Create a visited array to track visited vertices.
   - Use a queue to manage the vertices for exploration.

2. **Process Vertices**:
   - Enqueue the starting vertex and mark it as visited.
   - While the queue is not empty, dequeue a vertex and visit all its unvisited neighbors, enqueuing them for future exploration.

## Code in Java

Here’s a sample implementation of Breadth-First Search in Java:

```java
import java.util.*;

public class BreadthFirstSearch {
    
    public static void bfs(int startVertex, boolean[] visited, List<List<Integer>> adj) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(startVertex);
        visited[startVertex] = true;

        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            System.out.print(vertex + " "); // Process the current vertex
            
            // Visit all neighbors
            for (int neighbor : adj.get(vertex)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
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
        System.out.println("Breadth-First Search starting from vertex 0:");
        bfs(0, visited, adj);
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of BFS is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. Each vertex and edge is processed once during traversal.

### Space Complexity

The space complexity is \( O(V) \), which accounts for:
- The storage of the visited array.
- The queue used for managing vertices during traversal.

## Points to Remember

1. **Graph Type**: BFS works on both directed and undirected graphs.
2. **Shortest Path**: BFS can find the shortest path in unweighted graphs.
3. **Level Order Traversal**: BFS explores nodes level by level, making it suitable for problems involving layers or levels.
4. **Memory Usage**: BFS requires more memory than DFS due to its use of a queue.
5. **Cycle Detection**: BFS can also be used to detect cycles in undirected graphs by checking back edges.