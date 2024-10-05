---
id: kosarajus-algorithm
title: Kosaraju's Algorithm
sidebar_label: Kosaraju's Algorithm
description: "In this blog post, we'll delve into Kosaraju's Algorithm, a classic method for finding strongly connected components (SCCs) in a directed graph. We'll cover its implementation, time complexity, and use cases in various applications such as circuit design and social network analysis."
tags: [dsa, algorithms, graph connectivity]
---

# Kosaraju’s Algorithm

## Introduction

Kosaraju’s Algorithm is another efficient method for finding strongly connected components (SCCs) in a directed graph. It utilizes two passes of depth-first search (DFS): one on the original graph and another on the transposed graph. This algorithm effectively identifies all SCCs in linear time.

## Implementation

The implementation of Kosaraju's Algorithm involves the following steps:

1. **First Pass**:
   - Perform DFS on the original graph to determine the finishing order of vertices.
   - Push each finished vertex onto a stack.

2. **Transpose Graph**:
   - Reverse all edges in the graph to create a transposed graph.

3. **Second Pass**:
   - Pop vertices from the stack and perform DFS on the transposed graph.
   - Each DFS call identifies one strongly connected component.

## Code in Java

Here’s a sample implementation of Kosaraju’s Algorithm in Java:

```java
import java.util.*;

public class KosarajusAlgorithm {
    private List<List<Integer>> adj;
    private List<List<Integer>> transposedAdj;

    public KosarajusAlgorithm(int vertices) {
        adj = new ArrayList<>(vertices);
        transposedAdj = new ArrayList<>(vertices);
        
        for (int i = 0; i < vertices; i++) {
            adj.add(new ArrayList<>());
            transposedAdj.add(new ArrayList<>());
        }
    }

    public void addEdge(int u, int v) {
        adj.get(u).add(v);
    }

    private void dfs(int v, boolean[] visited, Stack<Integer> stack) {
        visited[v] = true;

        for (int neighbor : adj.get(v)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, stack);
            }
        }
        
        stack.push(v); // Push finished vertex onto stack
    }

    private void transposeGraph() {
        for (int u = 0; u < adj.size(); u++) {
            for (int v : adj.get(u)) {
                transposedAdj.get(v).add(u); // Reverse edge
            }
        }
    }

    public List<List<Integer>> findSCCs() {
        Stack<Integer> stack = new Stack<>();
        
        boolean[] visited = new boolean[adj.size()];
        
        // First pass: fill stack with finishing order
        for (int i = 0; i < adj.size(); i++) {
            if (!visited[i]) {
                dfs(i, visited, stack);
            }
        }

        transposeGraph(); // Create transposed graph
       
        Arrays.fill(visited, false); // Reset visited array
       
        List<List<Integer>> sccs = new ArrayList<>();

        // Second pass: process all vertices in order defined by stack
        while (!stack.isEmpty()) {
            int v = stack.pop();
            
            if (!visited[v]) {
                List<Integer> scc = new ArrayList<>();
                dfsUtil(v, visited, scc); // Perform DFS on transposed graph
                sccs.add(scc); // Add found SCC to result list
            }
        }

        return sccs;
    }

    private void dfsUtil(int v, boolean[] visited, List<Integer> scc) {
       visited[v] = true;
       scc.add(v);

       for (int neighbor : transposedAdj.get(v)) {
           if (!visited[neighbor]) {
               dfsUtil(neighbor, visited, scc);
           }
       }
   }

    public static void main(String[] args) {
       KosarajusAlgorithm graph = new KosarajusAlgorithm(5);

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

The time complexity of Kosaraju’s Algorithm is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges. This efficiency arises from performing two passes through all vertices and edges.

### Space Complexity

The space complexity is \( O(V + E) \), which accounts for:
- The storage of both the adjacency list and transposed adjacency list.
- The stack used during DFS.

## Points to Remember

1. **Strongly Connected Components**: Kosaraju's Algorithm efficiently identifies all SCCs in a directed graph.
2. **Two Passes**: The algorithm requires two passes through the graph—one on the original and one on the transposed version.
3. **Graph Type**: This algorithm works only on directed graphs.
4. **Applications**: Useful in various applications such as circuit design and analyzing social networks.
5. **Efficiency**: Like Tarjan's Algorithm, it operates in linear time relative to the size of the input.