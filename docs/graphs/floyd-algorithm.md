---
id: flyod-algo
title: Floyd's-Algorithm
sidebar_label: Floyd's-Algorithm
description: "In this blog post, we'll explore the Floyd's-Algorithm, an efficient method to implement all pair shortest paths"
tags: [dsa, algorithms,all pair shortest paths]
---

# Floyd's Algorithm (Floyd-Warshall Algorithm)

Floyd's algorithm, also known as the **Floyd-Warshall algorithm**, is a dynamic programming technique used to find the shortest paths between all pairs of vertices in a weighted graph. This algorithm works on both directed and undirected graphs, and it can handle graphs with negative edge weights (as long as there are no negative weight cycles).

The algorithm iteratively improves the solution by checking if a path between two vertices can be improved by going through an intermediate vertex. It uses a 2D matrix to store the shortest path distances between every pair of vertices.

## Key Features:
- **Time Complexity**: O(V³), where V is the number of vertices.
- **Space Complexity**: O(V²), as it stores the distances in a 2D array.
- Suitable for dense graphs due to its cubic time complexity.

## Applications:
- Shortest path discovery in road networks.
- Network routing algorithms.
- Solving the transitive closure of a graph.



# Code in C

```c
#include <stdio.h>
#include <stdlib.h>
int min(int v1, int v2) {
 return (v1 >= v2) ? v2 : v1;
     }

int main() 
{
 int W[10][10], D[10][10], n, i, j, k;
 printf("Enter the number of Vertices: ");
 scanf("%d", &n);
 printf("Enter the Weight matrix of the given graph row-wise:\n");
 for (i = 0; i < n; i++) {
 for (j = 0; j < n; j++) {
       scanf("%d", &W[i][j]);
       D[i][j] = W[i][j];
        }
       }
     for (k = 0; k < n; k++) {
     for (i = 0; i < n; i++) {
     for (j = 0; j < n; j++) {
        D[i][j] = min(D[i][j], D[i][k] + D[k][j]);
            }
        }
 }
 printf("Solution to All Pairs Shortest Distance Problem\n");
 printf("Using Floyd's Algorithm - Distance Matrix of the given graph is: \n");
 for (i = 0; i < n; i++) {
 for (j = 0; j < n; j++) {
 printf("%d\t", D[i][j]);
 }
 printf("\n");
 }
 return 0;
} 
```
