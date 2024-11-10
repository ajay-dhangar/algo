---
id: warshall-algo
title: Warshall's-Algorithm
sidebar_label: Warshall's-Algorithm
description: "In this blog post, we'll explore the Warshall's-Algorithm, an efficient method to Compute the transitive closure of a given directed graph"
tags: [dsa, algorithms, transitive closure]
---

# Warshall's Algorithm

Warshall's algorithm is a graph-based algorithm used to compute the **transitive closure** of a directed graph. It determines whether a path exists between any two vertices by updating a reachability matrix. The algorithm works by iteratively checking if a vertex can be reached indirectly through another vertex.

Unlike shortest-path algorithms, Warshall's algorithm is concerned only with reachability, not the distance between vertices.

## Key Features:

- **Time Complexity**: O(V³), where V is the number of vertices.
- **Space Complexity**: O(V²), as it stores the reachability information in a matrix.
- Suitable for determining reachability in directed graphs.

## Applications:

- Finding reachability in network analysis.
- Identifying connected components in a graph.
- Transitive closure in databases.

# Code in C

```c

#include <stdio.h>
#include <stdlib.h>
int main()
 {
    int A[10][10], T[10][10], n, i, j, k;
     printf("Enter the number of Vertices: ");
    scanf("%d", &n);
    printf("Enter the adjacency matrix of the given graph row-wise:\n");
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                scanf("%d", &A[i][j]);
                T[i][j] = A[i][j];
            }
        }
                for (k = 0; k < n; k++) {
                    for (i = 0; i < n; i++) {
                        for (j = 0; j < n; j++) {
                            T[i][j] = T[i][j] || (T[i][k] && T[k][j]);
                        }
                     }
                }
 printf("Transitive Closure of the given graph is:\n");
                 for (i = 0; i < n; i++) {
                    for (j = 0; j < n; j++) {
                        printf("%d\t", T[i][j]);
                        }
                    printf("\n");
                    }
                return 0;
}
```

# Code in Java

```java
import java.util.Scanner;

public class TransitiveClosure {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n;

        System.out.print("Enter the number of Vertices: ");
        n = sc.nextInt();

        int[][] A = new int[n][n];
        int[][] T = new int[n][n];

        System.out.println("Enter the adjacency matrix of the given graph row-wise:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                A[i][j] = sc.nextInt();
                T[i][j] = A[i][j];
            }
        }

        // Applying Floyd-Warshall algorithm for transitive closure
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    T[i][j] = T[i][j] | (T[i][k] & T[k][j]);
                }
            }
        }

        // Print the transitive closure
        System.out.println("Transitive Closure of the given graph is:");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(T[i][j] + "\t");
            }
            System.out.println();
        }

        sc.close();
    }
}
```
