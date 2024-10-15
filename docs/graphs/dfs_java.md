---
id: javadfs
title: Depth-First Search (DFS) Using Java
sidebar_label: Depth-First Search (DFS) Using Java
description: "In this blog post, we'll explore Depth-First Search (DFS) using Java, a graph traversal algorithm used to explore vertices and edges by going as deep as possible before backtracking."
tags: [dsa, algorithms, graph, traversal]
---

### Definition:

Depth-First Search (DFS) is a graph traversal algorithm used to explore vertices and edges in a depthward motion, meaning it goes as deep as possible into a graph before backtracking. DFS starts from a source node and follows paths until there are no unvisited nodes left in that path. Once it reaches a dead-end (i.e., no more unvisited neighbors), it backtracks to explore other paths. It is widely applied in graph-related problems like pathfinding, cycle detection, and solving mazes.

### Characteristics:

- **Recursive or Stack-Based Traversal**:
  - DFS can be implemented recursively using a function call stack or iteratively using an explicit stack. At each node, it marks the node as visited and explores all its unvisited neighbors before backtracking.

- **Preorder Traversal**:
  - DFS visits a node before its neighbors, which can resemble preorder traversal in trees. This makes it useful in applications such as topological sorting or checking the existence of cycles in directed graphs.

- **Backtracking**:
  - DFS naturally involves backtracking. After fully exploring all paths from the current node, DFS backtracks to previously visited nodes to explore any remaining unvisited neighbors.

### Time Complexity:

- **Best, Average, and Worst Case: $O(V + E)$**
Here, V represents the number of vertices, and E represents the number of edges. The algorithm visits each vertex and edge exactly once in the worst-case scenario.

### Space Complexity:

- **Space Complexity: $O(V)$**  
  In the worst case, DFS may use space proportional to the number of vertices due to either the recursion stack or an explicit stack used during traversal.

### Java Implementation:

```java
import java.util.*;

public class DepthFirstSearch {
    
    // Function to perform DFS traversal
    public static void dfs(int node, List<List<Integer>> adjList, boolean[] visited) {
        visited[node] = true;
        System.out.print(node + " ");

        for (int neighbor : adjList.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adjList, visited);
            }
        }
    }

    public static void main(String[] args) {
        int n = 5;  // number of nodes
        List<List<Integer>> adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // Adding edges to the adjacency list
        adjList.get(0).add(1);
        adjList.get(0).add(2);
        adjList.get(1).add(0);
        adjList.get(1).add(3);
        adjList.get(1).add(4);
        adjList.get(2).add(0);
        adjList.get(3).add(1);
        adjList.get(4).add(1);

        // Mark all vertices as unvisited
        boolean[] visited = new boolean[n];
        int startNode = 0;
        
        System.out.println("DFS traversal starting from node " + startNode + ": ");
        dfs(startNode, adjList, visited);
        System.out.println();
    }
}

```