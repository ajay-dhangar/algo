---
id: kahns-algorithm
title: Kahn's Algorithm
sidebar_label: Kahn's Algorithm
description: "In this blog post, we'll explore Kahn's Algorithm, a key graph algorithm used for topological sorting of directed acyclic graphs (DAGs). We'll discuss its implementation, time complexity, and practical applications in various fields."
tags: [dsa, algorithms, topological sorting]
---

# Kahn's Algorithm

## Introduction

Kahn's Algorithm is a fundamental method used to perform topological sorting on directed acyclic graphs (DAGs). Topological sorting is a linear ordering of vertices such that for every directed edge \( u \rightarrow v \), vertex \( u \) comes before vertex \( v \) in the ordering. This algorithm is particularly useful in scenarios such as task scheduling, where certain tasks must be completed before others can begin.

Kahn’s Algorithm operates using the concept of in-degrees, which counts the number of incoming edges to each vertex. By iteratively removing vertices with zero in-degrees and updating the in-degrees of their neighbors, Kahn's Algorithm efficiently constructs a valid topological order.

## Implementation

Kahn’s Algorithm can be implemented using a queue to keep track of vertices with zero in-degrees. The basic steps are as follows:

1. Calculate the in-degree for each vertex.
2. Initialize a queue and enqueue all vertices with an in-degree of zero.
3. While the queue is not empty:
   - Dequeue a vertex and add it to the topological order.
   - For each outgoing edge from this vertex, decrease the in-degree of the destination vertex by one.
   - If any destination vertex's in-degree becomes zero, enqueue it.
4. If all vertices are processed, return the topological order; otherwise, report that a cycle exists.

## Code in Java

Here’s a sample implementation of Kahn's Algorithm in Java:

```java
import java.util.*;

public class KahnsAlgorithm {
    
    public static List<Integer> topologicalSort(int vertices, List<List<Integer>> adj) {
        int[] inDegree = new int[vertices];
        List<Integer> topoOrder = new ArrayList<>();
        
        // Step 1: Calculate in-degrees
        for (int i = 0; i < vertices; i++) {
            for (int neighbor : adj.get(i)) {
                inDegree[neighbor]++;
            }
        }
        
        // Step 2: Initialize the queue with all vertices having in-degree 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < vertices; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Step 3: Process vertices
        while (!queue.isEmpty()) {
            int current = queue.poll();
            topoOrder.add(current);
            
            // Decrease the in-degree of neighboring vertices
            for (int neighbor : adj.get(current)) {
                inDegree[neighbor]--;
                // If the in-degree becomes zero, add it to the queue
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // Check for cycles
        if (topoOrder.size() != vertices) {
            throw new IllegalArgumentException("Graph has at least one cycle.");
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

        try {
            List<Integer> result = topologicalSort(vertices, adj);
            System.out.println("Topological Order: " + result);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
```
## Time Complexity and Space Complexity

### Time Complexity

The time complexity of Kahn's Algorithm is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. This is because:
- Calculating the in-degrees takes \( O(E) \).
- Processing each vertex and its neighbors also takes \( O(V + E) \).

### Space Complexity

The space complexity is \( O(V) \), which accounts for:
- The storage of the in-degree array.
- The queue used to manage vertices with zero in-degrees.
- The list storing the topological order.

## Points to Remember
- Directed Acyclic Graphs: Kahn’s Algorithm only works on directed acyclic graphs. If there are cycles, a valid topological sort cannot be produced.
- Multiple Valid Orders: There may be multiple valid topological sorts for a given DAG.
- Cycle Detection: If the size of the resulting topological order does not equal the number of vertices, it indicates that there is at least one cycle present in the graph.
- Use Cases: Common applications include task scheduling, course prerequisite management, and dependency resolution.
Alternative Algorithms: While Kahn's Algorithm is efficient and intuitive, other methods like Depth-First Search can also be used for topological sorting.