---
id: Bron-Kerbosch-Algorithm
sidebar_position: 3
title: Bron-Kerbosch Algorithm
sidebar_label: Bron-Kerbosch Algorithm
description: "The Bron-Kerbosch algorithm is a backtracking algorithm used to find all maximal cliques in an undirected graph. Known for its efficiency, especially on sparse graphs, it is widely applied in social network analysis, bioinformatics, and computational chemistry. The algorithm can be optimized with pivoting to reduce recursive calls and improve performance."
tags: [graph-theory, bron-kerbosch, maximal-clique, backtracking, clique-detection, pivoting, optimization]
---

The **Bron-Kerbosch algorithm** is a backtracking algorithm used to find all maximal cliques in an undirected graph. A clique is a subset of vertices, all of which are adjacent to each other, and a maximal clique is a clique that cannot be extended by including an adjacent vertex. This algorithm is known for its recursive nature and efficiency in finding cliques in graphs without needing to search through all vertex subsets.

## Definition

The Bron-Kerbosch algorithm is a **recursive backtracking algorithm** that enumerates all maximal cliques in an undirected graph. By maintaining three sets during recursion, the algorithm explores all potential cliques and ensures that each maximal clique is discovered only once.

## Characteristics

- **Exactness**: The algorithm is exact and produces all maximal cliques without duplication.
- **Recursiveness**: It uses recursive backtracking with sets of vertices to manage the state at each step.
- **Efficiency**: The algorithm is highly efficient, especially for sparse graphs.
- **Pivoting**: The pivoting technique can be used to reduce the number of recursive calls, optimizing performance by reducing the search space.

## Time Complexity

The time complexity of the Bron-Kerbosch algorithm varies depending on the implementation:

- **Without pivoting**: , where \(n\) is the number of vertices.
- **With pivoting**: The worst-case complexity remains `O(3^(n/3))`, but pivoting reduces the number of recursive calls in practice, making the algorithm faster on average.

## Space Complexity

The space complexity is **O(n + E)**, where \(n\) is the number of vertices and \(E\) is the number of edges. This is primarily due to storing the adjacency list or matrix and maintaining three sets (R, P, and X) in each recursive call.

## Approach

The Bron-Kerbosch algorithm follows these steps:

1. **Initialize three sets**:
   - **R**: The growing clique being constructed.
   - **P**: The set of vertices that can still be added to the current clique.
   - **X**: The set of vertices that have already been considered for the current clique.

2. **Recursive Backtracking**:
   - At each step, choose a vertex from \(P\) and add it to \(R\), forming a new potential clique.
   - Recur with updated sets:
     - **R** includes the chosen vertex.
     - **P** is restricted to vertices adjacent to the new vertex.
     - **X** is updated to avoid revisiting vertices.

3. **Base Case**:
   - If both \(P\) and \(X\) are empty, \(R\) is a maximal clique.

4. **Pivot Optimization (Optional)**:
   - Choose a pivot vertex to minimize the number of recursive calls by excluding vertices that are unlikely to form new cliques.

## C++ Implementation

```cpp title="Bron-Kerbosch Algorithm in C++"
#include <iostream>
#include <vector>
#include <set>
using namespace std;

void bronKerbosch(set<int> R, set<int> P, set<int> X, const vector<set<int>>& graph) {
    if (P.empty() && X.empty()) {
        // Output the maximal clique found
        cout << "Maximal Clique: ";
        for (int v : R) cout << v << " ";
        cout << endl;
        return;
    }

    set<int> P_copy = P;
    for (int v : P_copy) {
        set<int> newR = R, newP, newX;
        newR.insert(v);

        for (int w : graph[v]) {
            if (P.find(w) != P.end()) newP.insert(w);
            if (X.find(w) != X.end()) newX.insert(w);
        }

        bronKerbosch(newR, newP, newX, graph);

        P.erase(v);
        X.insert(v);
    }
}

int main() {
    int n = 5;  // Number of vertices
    vector<set<int>> graph(n);
    
    // Define graph edges (example)
    graph[0] = {1, 2};
    graph[1] = {0, 2, 3};
    graph[2] = {0, 1, 4};
    graph[3] = {1, 4};
    graph[4] = {2, 3};

    bronKerbosch({}, {0, 1, 2, 3, 4}, {}, graph);

    return 0;
}
```

## Java Implementation

```java title="Bron-Kerbosch Algorithm in Java"
import java.util.HashSet;
import java.util.Set;

public class BronKerbosch {
    public static void bronKerbosch(Set<Integer> R, Set<Integer> P, Set<Integer> X, Set<Integer>[] graph) {
        if (P.isEmpty() && X.isEmpty()) {
            System.out.println("Maximal Clique: " + R);
            return;
        }

        Set<Integer> P_copy = new HashSet<>(P);
        for (Integer v : P_copy) {
            Set<Integer> newR = new HashSet<>(R);
            newR.add(v);

            Set<Integer> newP = new HashSet<>();
            Set<Integer> newX = new HashSet<>();
            for (Integer w : graph[v]) {
                if (P.contains(w)) newP.add(w);
                if (X.contains(w)) newX.add(w);
            }

            bronKerbosch(newR, newP, newX, graph);

            P.remove(v);
            X.add(v);
        }
    }

    public static void main(String[] args) {
        int n = 5;  // Number of vertices
        Set<Integer>[] graph = new Set[n];
        for (int i = 0; i < n; i++) graph[i] = new HashSet<>();

        // Define graph edges (example)
        graph[0].add(1); graph[0].add(2);
        graph[1].add(0); graph[1].add(2); graph[1].add(3);
        graph[2].add(0); graph[2].add(1); graph[2].add(4);
        graph[3].add(1); graph[3].add(4);
        graph[4].add(2); graph[4].add(3);

        Set<Integer> R = new HashSet<>();
        Set<Integer> P = new HashSet<>();
        for (int i = 0; i < n; i++) P.add(i);
        Set<Integer> X = new HashSet<>();

        bronKerbosch(R, P, X, graph);
    }
}
```

## Summary

The Bron-Kerbosch algorithm efficiently finds all maximal cliques in a graph, making it useful in various fields such as social network analysis and bioinformatics. With optional pivoting, it is adaptable to dense and sparse graphs alike, offering high-performance clique detection for applications requiring maximal clique identification.
