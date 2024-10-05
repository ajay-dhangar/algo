---
id: tarjans-algorithm
title: Tarjan's Algorithm
sidebar_label: Tarjan's Algorithm
description: "In this blog post, we'll explore Tarjan's Algorithm, an efficient method for finding strongly connected components (SCCs) in a directed graph. We'll discuss its implementation, time complexity, and practical applications in graph theory."
tags: [dsa, algorithms, graph connectivity]
---

# Tarjan’s Algorithm

## Introduction

Tarjan’s Algorithm is an efficient method for finding strongly connected components (SCCs) in a directed graph. A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex within that component. The algorithm uses depth-first search (DFS) and maintains a low-link value to identify SCCs in linear time.

## Implementation

The implementation of Tarjan's Algorithm involves the following steps:

1. **Initialize**:
   - Create arrays to store discovery times and low-link values for each vertex.
   - Use a stack to keep track of the vertices in the current path of DFS.
   - Maintain a boolean array to track which vertices are in the stack.

2. **Perform DFS**:
   - For each unvisited vertex, perform a DFS.
   - Update discovery times and low-link values.
   - If the current vertex is the root of an SCC, pop vertices from the stack until the root is reached.

## Code in Java

Here’s a sample implementation of Tarjan’s Algorithm in Java:

```java
import java.util.*;

public class TarjansAlgorithm {
    private int time = 0;
    private List<List<Integer>> adj;
    private Stack<Integer> stack;
    private boolean[] onStack;
    private int[] disc;
    private int[] low;
    private List<List<Integer>> sccs;

    public TarjansAlgorithm(int vertices) {
        adj = new ArrayList<>(vertices);
        for (int i = 0; i < vertices; i++) {
            adj.add(new ArrayList<>());
        }
        stack = new Stack<>();
        onStack = new boolean[vertices];
        disc = new int[vertices];
        low = new int[vertices];
        Arrays.fill(disc, -1);
        Arrays.fill(low, -1);
        sccs = new ArrayList<>();
    }

    public void addEdge(int u, int v) {
        adj.get(u).add(v);
    }

    public void tarjanDFS(int u) {
        disc[u] = low[u] = time++;
        stack.push(u);
        onStack[u] = true;

        for (int v : adj.get(u)) {
            if (disc[v] == -1) {
                tarjanDFS(v);
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }

        if (low[u] == disc[u]) {
            List<Integer> scc = new ArrayList<>();
            int w;
            do {
                w = stack.pop();
                onStack[w] = false;
                scc.add(w);
            } while (w != u);
            sccs.add(scc);
        }
    }

    public List<List<Integer>> findSCCs() {
        for (int i = 0; i < adj.size(); i++) {
            if (disc[i] == -1) {
                tarjanDFS(i);
            }
        }
        return sccs;
    }

    public static void main(String[] args) {
        TarjansAlgorithm graph = new TarjansAlgorithm(5);
        
        // Example graph edges
        graph.addEdge(0, 2);
        graph.addEdge(2, 1);
        graph.addEdge(1, 0);
        graph.addEdge(0, 3);
        graph.addEdge(3, 4);

        List<List<Integer>> sccs = graph.findSCCs();
        
        System.out.println("Strongly Connected Components:");
        for (List<Integer> scc : sccs) {
            System.out.println(scc);
        }
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of Tarjan’s Algorithm is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. This efficiency arises from the single pass through all vertices and edges during the DFS.

### Space Complexity

The space complexity is \( O(V) \), which accounts for:
- The storage of the adjacency list.
- The stack used for maintaining vertices during DFS.

## Points to Remember

1. **Strongly Connected Components**: Tarjan's Algorithm identifies all SCCs in a directed graph efficiently.
2. **Single Pass**: The algorithm processes each vertex and edge only once.
3. **Low-Link Values**: The use of low-link values helps in determining the root of SCCs.
4. **Graph Type**: This algorithm works only on directed graphs.
5. **Applications**: Useful in various applications such as circuit design and analyzing social networks.