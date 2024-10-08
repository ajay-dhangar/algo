---
id: bellman-ford
title: Bellman-Ford Algorithm
sidebar_label: Bellman-Ford Algorithm
description: "In this blog post, we'll dive into the Bellman-Ford Algorithm, a fundamental graph algorithm used to find the shortest path between nodes in a graph, even with negative weights."
tags: [dsa, algorithms, shortest path]
---

## Introduction
The **Bellman-Ford Algorithm** is an algorithm used to find the shortest path from a single source vertex to all other vertices in a weighted graph. Unlike Dijkstra’s Algorithm, Bellman-Ford works with graphs that have negative weights. However, it does not work with graphs containing negative weight cycles.

The Bellman-Ford algorithm is useful in scenarios where we expect the graph to have negative edge weights and need to detect negative weight cycles.

## Implementation

Let’s see how the Bellman-Ford Algorithm can be implemented in Java:

# Code in Java

```java
// A Java program to find the shortest path using Bellman-Ford algorithm
   public class BellmanFord {
      // A class to represent a weighted edge in a graph
      class Edge {
         int src, dest, weight;
         Edge() {
            src = dest = weight = 0;
         }
      }

      int V, E;
      Edge edge[];

      // Constructor
      BellmanFord(int v, int e) {
         V = v;
         E = e;
         edge = new Edge[e];
         for (int i = 0; i < e; ++i)
            edge[i] = new Edge();
      }

      // Function to find the shortest path
      void bellmanFord(BellmanFord graph, int src) {
         int V = graph.V, E = graph.E;
         int dist[] = new int[V];

         // Initialize distances from src to all other vertices as INFINITE
         for (int i = 0; i < V; ++i)
            dist[i] = Integer.MAX_VALUE;
         dist[src] = 0;

         // Relax all edges |V| - 1 times
         for (int i = 1; i < V; ++i) {
            for (int j = 0; j < E; ++j) {
               int u = graph.edge[j].src;
               int v = graph.edge[j].dest;
               int weight = graph.edge[j].weight;
               if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v])
                  dist[v] = dist[u] + weight;
            }
         }

         // Check for negative-weight cycles
         for (int j = 0; j < E; ++j) {
            int u = graph.edge[j].src;
            int v = graph.edge[j].dest;
            int weight = graph.edge[j].weight;
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) {
               System.out.println("Graph contains negative weight cycle");
               return;
            }
         }

         // Print the distance array
         printArr(dist, V);
      }

      // Utility function to print the solution
      void printArr(int dist[], int V) {
         System.out.println("Vertex Distance from Source");
         for (int i = 0; i < V; ++i)
            System.out.println(i + "\t\t" + dist[i]);
      }

   }
```
Let’s see how the Bellman-Ford Algorithm can be implemented in C++:

Code in C++
```cpp
   #include<bits/stdc++.h>
   using namespace std;

   struct Edge {
      int src, dest, weight;
   };

   void bellmanFord(int V, int E, vector<Edge>& edges, int src) {
      vector<int> dist(V, INT_MAX);
      dist[src] = 0;

      // Relax all edges V-1 times
      for (int i = 1; i <= V - 1; i++) {
         for (int j = 0; j < E; j++) {
               int u = edges[j].src;
               int v = edges[j].dest;
               int weight = edges[j].weight;
               if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                  dist[v] = dist[u] + weight;
               }
         }
      }

      // Check for negative-weight cycles
      for (int j = 0; j < E; j++) {
         int u = edges[j].src;
         int v = edges[j].dest;
         int weight = edges[j].weight;
         if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
               cout << "Graph contains negative weight cycle" << endl;
               return;
         }
      }

      // Print the distance array
      cout << "Vertex Distance from Source:" << endl;
      for (int i = 0; i < V; i++)
         cout << i << "\t\t" << dist[i] << endl;
   }

   int main() {
      int V, E;
      cin >> V >> E;

      vector<Edge> edges(E);

      for (int i = 0; i < E; i++) {
         cin >> edges[i].src >> edges[i].dest >> edges[i].weight;
      }

      int src;
      cin >> src;

      bellmanFord(V, E, edges, src);

      return 0;
   }
```


## Time complexity:

Bellman-Ford Algorithm: O(V * E), where V is the number of vertices, and E is the number of edges.


## Points to Remember:

- The Bellman-Ford algorithm can handle graphs with negative weight edges.



- It detects negative weight cycles and reports if one exists.



- The algorithm is slower than Dijkstra’s, but it works with graphs that have negative weights.
