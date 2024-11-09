---
id: depth-first-search
sidebar_position: 3
title: Depth-First Search
sidebar_label: DFS
description: DFS algorithm implementation in Java.
tags: [java, searching, graph traversal]
---

## *Description*

Depth-First Search (DFS) is a graph traversal algorithm that explores nodes in a depthward motion. It starts at a selected node (root) and explores as far as possible along each branch before backtracking.

## *Java implementation*

```
public class DFS {
    public static void search(int[][] graph, int start) {
        boolean[] visited = new boolean[graph.length];
        dfs(graph, start, visited);
    }

    private static void dfs(int[][] graph, int node, boolean[] visited) {
        visited[node] = true;
        System.out.print(node + " ");
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                dfs(graph, neighbor, visited);
            }
        }
    }

    public static void main(String[] args) {
        int[][] graph = {{1, 2}, {0, 3}, {0, 4}, {1}, {2}};
        int start = 0;
        search(graph, start);
    }
}
```

# *Complexity*

- Time Complexity: O(V + E), where V is vertices and E is edges.
- Space Complexity: O(V), for visited array and recursive stack.

# *Use Cases for example*

- Traversing social networks.
- Web crawlers.
- Finding connected components.

# *Variants of this algorithm include:*

- Pre-order DFS (current node before neighbors).
- Post-order DFS (current node after neighbors).
- In-order DFS (current node between neighbors).

## Conclusion
In this article, we learned about Depth first search and implemented it in Java.
