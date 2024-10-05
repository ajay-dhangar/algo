---
id: dfs-topological-sort
title: Depth-First Search Based Topological Sort
sidebar_label: DFS Based Topological Sort
description: "In this blog post, we'll explore the Depth-First Search (DFS) Based Topological Sort, an effective algorithm for ordering the vertices of a directed acyclic graph (DAG). We'll discuss its implementation, time complexity, space complexity, and key points to remember."
tags: [dsa, algorithms, topological sorting]
---

# Depth-First Search Based Topological Sort

## Introduction

Depth-First Search (DFS) Based Topological Sort is a powerful algorithm used to order the vertices of a directed acyclic graph (DAG). In topological sorting, the vertices are arranged in such a way that for every directed edge \( u -> v \), vertex \( u \) comes before vertex \( v \) in the ordering. This algorithm is particularly useful in scenarios like task scheduling, where certain tasks must be completed before others can start.

DFS-Based Topological Sort leverages the depth-first search strategy to explore the graph and build a topological order by utilizing a stack to keep track of the vertices as they are processed.

## Implementation

The implementation of DFS-Based Topological Sort involves the following steps:

1. **Initialize**:
   - Create a visited array to keep track of visited vertices.
   - Create a stack to store the topological order.

2. **Perform DFS**:
   - For each unvisited vertex, perform a DFS.
   - Mark the vertex as visited and recursively visit all its unvisited neighbors.
   - After visiting all neighbors, push the vertex onto the stack.

3. **Construct Topological Order**:
   - Once all vertices are processed, pop elements from the stack to get the topological order.

## Code in Java

Here’s a sample implementation of Depth-First Search Based Topological Sort in Java:

```java
import java.util.*;

public class DFSTopologicalSort {
    
    private static void dfs(int vertex, boolean[] visited, Stack<Integer> stack, List<List<Integer>> adj) {
        visited[vertex] = true;
        
        // Visit all the neighbors
        for (int neighbor : adj.get(vertex)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, stack, adj);
            }
        }
        
        // Push current vertex to stack after visiting all its neighbors
        stack.push(vertex);
    }
    
    public static List<Integer> topologicalSort(int vertices, List<List<Integer>> adj) {
        boolean[] visited = new boolean[vertices];
        Stack<Integer> stack = new Stack<>();
        
        // Perform DFS for each vertex
        for (int i = 0; i < vertices; i++) {
            if (!visited[i]) {
                dfs(i, visited, stack, adj);
            }
        }
        
        // Prepare the topological order from the stack
        List<Integer> topoOrder = new ArrayList<>();
        while (!stack.isEmpty()) {
            topoOrder.add(stack.pop());
        }
        
        return topoOrder;
    }

    public static void main(String[] args) {
        int vertices = 6;
        List<List<Integer>> adj = new ArrayList<>(vertices);
        
        for (int i = 0; i < vertices; i++) {
            adj.add(new ArrayList<>());
        }

        // Example graph edges
        adj.get(5).add(2);
        adj.get(5).add(0);
        adj.get(4).add(0);
        adj.get(4).add(1);
        adj.get(2).add(3);
        adj.get(3).add(1);

        List<Integer> result = topologicalSort(vertices, adj);
        System.out.println("Topological Order: " + result);
    }
}
```
## Time Complexity and Space Complexity

### Time Complexity

The time complexity of DFS-Based Topological Sort is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. This is because:
- Each vertex is processed once.
- Each edge is traversed once during the DFS.

### Space Complexity

The space complexity is \( O(V) \), which accounts for:
- The storage of the visited array.
- The stack used to store the topological order.

## Points to Remember

1. **Directed Acyclic Graphs**: This algorithm only works on directed acyclic graphs. If there are cycles, a valid topological sort cannot be produced.

2. **Multiple Valid Orders**: There may be multiple valid topological sorts for a given DAG.

3. **Cycle Detection**: If you detect that not all vertices are included in the final topological order, it indicates that there is at least one cycle present in the graph.

4. **Use Cases**: Common applications include task scheduling, course prerequisite management, and dependency resolution.

5. **Alternative Algorithms**: While DFS-Based Topological Sort is efficient and intuitive, Kahn's Algorithm can also be used for topological sorting.