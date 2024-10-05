---
id: prims-algorithm
title: Prim's Algorithm
sidebar_label: Prim's Algorithm
description: "In this blog post, we'll explore Prim's Algorithm, a fundamental graph algorithm used to find the minimum spanning tree (MST) of a weighted undirected graph. We'll discuss its implementation, time complexity, and practical applications in network design."
tags: [dsa, algorithms, minimum spanning tree]
---

# Prim’s Algorithm

## Introduction

Prim’s Algorithm is a classic greedy algorithm used to find the minimum spanning tree (MST) of a weighted, undirected graph. A minimum spanning tree is a subset of the edges that connects all vertices in the graph without any cycles and with the minimum possible total edge weight. Prim's Algorithm is particularly useful in network design, such as designing least-cost networks for telecommunications or computer networks.

The algorithm starts with a single vertex and grows the MST by repeatedly adding the smallest edge that connects a vertex in the tree to a vertex outside the tree.

## Implementation

The implementation of Prim’s Algorithm involves the following steps:

1. **Initialize**:
   - Create a priority queue (or min-heap) to store edges based on their weights.
   - Create an array to track which vertices are included in the MST.
   - Start from an arbitrary vertex and add its edges to the priority queue.

2. **Process Edges**:
   - While there are edges in the priority queue:
     - Extract the edge with the minimum weight.
     - If it connects a vertex not yet included in the MST, add it to the MST and mark the vertex as included.
     - Add all edges from this new vertex to the priority queue.

3. **Repeat** until all vertices are included in the MST.

## Code in Java

Here’s a sample implementation of Prim’s Algorithm in Java:

```java
import java.util.*;

public class PrimsAlgorithm {
    
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;

        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }

        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    public static void primsAlgorithm(int vertices, List<Edge> edges) {
        // Create a priority queue to store edges
        PriorityQueue<Edge> pq = new PriorityQueue<>();
        boolean[] inMST = new boolean[vertices];
        List<Edge> mstEdges = new ArrayList<>();

        // Start from vertex 0
        inMST = true;
        for (Edge edge : edges) {
            if (edge.src == 0 || edge.dest == 0) {
                pq.offer(edge);
            }
        }

        while (!pq.isEmpty()) {
            Edge minEdge = pq.poll();

            // If it connects to an unvisited vertex
            if (!inMST[minEdge.dest]) {
                mstEdges.add(minEdge);
                inMST[minEdge.dest] = true;

                // Add all edges from this vertex to the priority queue
                for (Edge edge : edges) {
                    if (edge.src == minEdge.dest && !inMST[edge.dest]) {
                        pq.offer(edge);
                    } else if (edge.dest == minEdge.dest && !inMST[edge.src]) {
                        pq.offer(edge);
                    }
                }
            }
        }

        // Print the resulting MST
        System.out.println("Edges in Minimum Spanning Tree:");
        for (Edge edge : mstEdges) {
            System.out.println(edge.src + " -- " + edge.dest + " == " + edge.weight);
        }
    }

    public static void main(String[] args) {
        int vertices = 5;
        List<Edge> edges = new ArrayList<>();

        // Example graph edges
        edges.add(new Edge(0, 1, 2));
        edges.add(new Edge(0, 3, 6));
        edges.add(new Edge(1, 2, 3));
        edges.add(new Edge(1, 3, 8));
        edges.add(new Edge(1, 4, 5));
        edges.add(new Edge(2, 4, 7));
        edges.add(new Edge(3, 4, 9));

        primsAlgorithm(vertices, edges);
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of Prim’s Algorithm depends on how we implement the priority queue:
- Using an adjacency matrix and a simple array: \( O(V^2) \)
- Using an adjacency list and a binary heap: \( O(E \log V) \), where \( E \) is the number of edges and \( V \) is the number of vertices.

### Space Complexity

The space complexity is \( O(V + E) \), which accounts for:
- The storage of the adjacency list.
- The priority queue used to store edges.

## Points to Remember

1. **Greedy Approach**: Prim's Algorithm uses a greedy approach by always choosing the smallest edge that expands the growing MST.

2. **Connected Graphs**: Prim's Algorithm works only on connected graphs. If the graph is disconnected, it will only produce an MST for one of its components.

3. **Multiple MSTs**: There can be multiple minimum spanning trees for a given graph if there are equal-weight edges.

4. **Use Cases**: Common applications include network design problems like laying out electrical grids or computer networks.

5. **Comparison with Kruskal's Algorithm**: While both algorithms find an MST, Prim's is often more efficient for dense graphs while Kruskal's is better suited for sparse graphs.