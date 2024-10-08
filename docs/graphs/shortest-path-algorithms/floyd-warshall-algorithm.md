---
id: floyd-warshall
title: Floyd-Warshall Algorithm
sidebar_label: Floyd-Warshall Algorithm
description: "In this blog post, we'll dive into the Floyd-Warshall Algorithm, a fundamental graph algorithm used to find the shortest path between all pairs of nodes in a graph."
tags: [dsa, algorithms, shortest path]
---

## Introduction
The **Floyd-Warshall Algorithm** is an algorithm used to find the shortest paths between all pairs of vertices in a weighted graph. Unlike Dijkstra's or Bellman-Ford algorithms, which find the shortest path from a single source, the Floyd-Warshall algorithm computes the shortest paths between all pairs of vertices. The algorithm works with graphs that have negative weights but does not work with negative weight cycles.

## Implementation

Let’s see how the Floyd-Warshall Algorithm can be implemented in Java:

# Code in Java

```java
   public class FloydWarshall {
      final static int INF = 99999, V = 4;

      void floydWarshall(int graph[][]) {
         int dist[][] = new int[V][V];
         int i, j, k;

         // Initialize the solution matrix same as the input graph matrix
         for (i = 0; i < V; i++)
            for (j = 0; j < V; j++)
               dist[i][j] = graph[i][j];

         // Add all vertices one by one to the set of intermediate vertices
         for (k = 0; k < V; k++) {
            for (i = 0; i < V; i++) {
               for (j = 0; j < V; j++) {
                  if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
               }
            }
         }

         // Print the shortest distance matrix
         printSolution(dist);
      }

      void printSolution(int dist[][]) {
         System.out.println("The following matrix shows the shortest distances between every pair of vertices:");
         for (int i = 0; i < V; ++i) {
            for (int j = 0; j < V; ++j) {
               if (dist[i][j] == INF)
                  System.out.print("INF ");
               else
                  System.out.print(dist[i][j] + "   ");
            }
            System.out.println();
         }
      }
   }
```

Let’s see how the Floyd-Warshall Algorithm can be implemented in C++:

Code in C++

```cpp
   #include<bits/stdc++.h>
   using namespace std;

   #define INF 99999
   #define V 4

   void floydWarshall(int graph[][V]) {
      int dist[V][V], i, j, k;

      // Initialize the solution matrix same as input graph matrix
      for (i = 0; i < V; i++)
         for (j = 0; j < V; j++)
            dist[i][j] = graph[i][j];

      // Add all vertices one by one to the set of intermediate vertices
      for (k = 0; k < V; k++) {
         for (i = 0; i < V; i++) {
            for (j = 0; j < V; j++) {
               if (dist[i][k] + dist[k][j] < dist[i][j])
                  dist[i][j] = dist[i][k] + dist[k][j];
            }
         }
      }

      // Print the shortest distance matrix
      printSolution(dist);
   }

   void printSolution(int dist[][V]) {
      cout << "The following matrix shows the shortest distances between every pair of vertices:\n";
      for (int i = 0; i < V; i++) {
         for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF)
               cout << "INF ";
            else
               cout << dist[i][j] << "   ";
         }
         cout << endl;
      }
   }
```

## Time complexity:
Floyd-Warshall Algorithm: O(V³), where V is the number of vertices.

## Points to Remember:
- The Floyd-Warshall algorithm finds the shortest paths between all pairs of vertices.

- It can handle negative weights, but it cannot detect negative weight cycles.

- The algorithm is simple and easy to implement, but its time complexity makes it impractical for large graphs.
