---
id: longest-path-in-dag
sidebar_position: 1
title: Longest Path in DAG
sidebar_label: Longest Path in Directed Acyclic Graph
description: "In this problem, given a weighted directed acyclic graph (DAG) and a source vertex, we need to find the cost of the longest path from the source vertex to all other vertices present in the graph."
tags: [java, algorithm, graph]
---

# Longest Path in DAG 
## Description:

The Longest Path in DAG problem involves determining the longest path from a given source vertex to all other vertices in a weighted directed acyclic graph (DAG). If a vertex cannot be reached from the source vertex, its distance is represented as infinity.

## Approach

To solve this problem, we can use a combination of topological sorting and dynamic programming.

1. **Topological Sort:** First, perform a topological sort of the graph, which provides an ordering of the vertices such that for every directed edge u -> v, vertex u comes before vertex v.
2. **Dynamic Programming:** Once we have the topological order, we can iterate through the vertices in this order to compute the longest path distances.

## Time Complexity
- **Topological Sort:** O(V + E), where V is the number of vertices and E is the number of edges.
- **Relaxation of Edges:** O(E).
- **Overall Time Complexity:** O(V + E).

## Space Complexity
- O(V) for storing the adjacency list.
- O(V) for the stack used in topological sorting.
- O(V) for the distance array.
- **Overall Space Complexity:** O(V).

# Code in Java

```java
import java.util.*;

// Edge class to represent a directed edge with a weight
class Edge {
    int dest, weight;

    public Edge(int dest, int weight) {
        this.dest = dest;
        this.weight = weight;
    }
}

// Graph class to represent the DAG and implement the longest path algorithm
class Graph {
    private final int V;  // Number of vertices
    private final List<List<Edge>> adj;  // Adjacency list for each vertex

    // Constructor for initializing the graph
    public Graph(int V) {
        this.V = V;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }

    // Adds an edge to the graph
    public void addEdge(int u, int v, int weight) {
        adj.get(u).add(new Edge(v, weight));
    }

    // Performs topological sort and stores the result in a stack
    private void topologicalSort(int v, boolean[] visited, Stack<Integer> stack) {
        visited[v] = true;
        for (Edge edge : adj.get(v)) {
            if (!visited[edge.dest]) {
                topologicalSort(edge.dest, visited, stack);
            }
        }
        stack.push(v);
    }

    // Method to find the longest path from a given source vertex
    public int[] findLongestPath(int source) {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[V];

        // Perform topological sort on all vertices
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                topologicalSort(i, visited, stack);
            }
        }

        // Initialize distances to all vertices as negative infinity except source
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MIN_VALUE);
        dist[source] = 0;

        // Process vertices in topological order and update distances
        while (!stack.isEmpty()) {
            int u = stack.pop();

            // Update distances to all adjacent vertices of u
            if (dist[u] != Integer.MIN_VALUE) {
                for (Edge edge : adj.get(u)) {
                    if (dist[edge.dest] < dist[u] + edge.weight) {
                        dist[edge.dest] = dist[u] + edge.weight;
                    }
                }
            }
        }

        return dist;  // Returns the distances from the source to each vertex
    }
}

// Testing class with basic test cases to verify the code functionality
public class LongestPathInDAGTest {
    public static void main(String[] args) {
        Graph graph = new Graph(4);
        graph.addEdge(0, 1, 5);
        graph.addEdge(0, 2, 3);
        graph.addEdge(1, 3, 6);
        graph.addEdge(2, 3, 7);
        graph.addEdge(1, 2, 2);

        // Run longest path algorithm from vertex 0
        int[] distances = graph.findLongestPath(0);

        // Display results for each vertex
        System.out.println("Longest paths from vertex 0:");
        for (int i = 0; i < distances.length; i++) {
            if (distances[i] == Integer.MIN_VALUE) {
                System.out.println("Vertex " + i + ": Infinity");
            } else {
                System.out.println("Vertex " + i + ": " + distances[i]);
            }
        }
    }
}
