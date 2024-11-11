---
id: eulerian-graphs
title: Eulerian Graphs
sidebar_label: Eulerian Graphs
description: "This post explores Eulerian graphs, their properties, and algorithms for detecting and constructing Eulerian paths and circuits."
tags: [dsa, graph-theory, algorithms, eulerian-graphs]
---

### Definition

An **Eulerian Graph** is a graph in which we can traverse every edge exactly once and return to the starting vertex. There are two concepts related to Eulerian graphs:

1. **Eulerian Circuit (Cycle)**: A path in a graph that visits every edge exactly once and ends at the starting vertex.
2. **Eulerian Path**: A path that visits every edge exactly once but doesn't necessarily return to the starting vertex.

### Conditions for Eulerian Path and Circuit

- **Eulerian Circuit**:
  - A graph has an Eulerian circuit if and only if **every vertex** has an even degree, and the graph is connected (except isolated vertices).

- **Eulerian Path**:
  - A graph has an Eulerian path if and only if **exactly two vertices** have an odd degree, and the graph is connected.

### Characteristics

- **Eulerian Circuit**:
  - Every vertex has an **even degree**.
  - The graph must be connected (ignoring isolated vertices).

- **Eulerian Path**:
  - Exactly **two vertices** have an **odd degree**, and the graph must be connected.

- **Non-Eulerian**:
  - If more than two vertices have an odd degree, the graph cannot have an Eulerian path or circuit.

### Time Complexity

The complexity of finding an Eulerian path or circuit is `O(E)` where `E` is the number of edges in the graph, assuming the graph is represented using an adjacency list.

### Space Complexity

The space complexity is `O(V + E)` where `V` is the number of vertices and `E` is the number of edges.

### Algorithm Steps

1. **Check Degrees**: First, check the degree of every vertex in the graph.
   - If every vertex has an even degree, then it has an Eulerian circuit.
   - If exactly two vertices have an odd degree, then it has an Eulerian path.
   - If more than two vertices have an odd degree, the graph is not Eulerian.

2. **Fleury’s Algorithm** (for finding an Eulerian Path or Circuit):
   - Choose a starting vertex.
   - Follow edges one by one.
   - Always choose a non-bridge edge if possible until all edges are traversed.

3. **Hierholzer's Algorithm** (for finding an Eulerian Circuit):
   - Start from any vertex with non-zero degree and follow edges to form a circuit.
   - When the circuit is complete, repeat the process for any vertex that has edges remaining.

### Example Problem

Consider the following graph:

Vertices: {0, 1, 2, 3, 4}

Edges:
- (0, 1)
- (1, 2)
- (2, 0)
- (1, 3)
- (3, 4)
- (4, 1)

- Check degrees:
  - Vertex 0: Degree 2 (even)
  - Vertex 1: Degree 4 (even)
  - Vertex 2: Degree 2 (even)
  - Vertex 3: Degree 2 (even)
  - Vertex 4: Degree 2 (even)
  
Since all vertices have even degrees and the graph is connected, this graph has an **Eulerian Circuit**.

### Example Problem 2

Consider a graph:

Vertices: {0, 1, 2, 3}

Edges:
- (0, 1)
- (1, 2)
- (2, 3)
- (3, 0)
- (0, 2)

- Check degrees:
  - Vertex 0: Degree 3 (odd)
  - Vertex 1: Degree 2 (even)
  - Vertex 2: Degree 3 (odd)
  - Vertex 3: Degree 2 (even)

Since two vertices (0 and 2) have odd degrees, this graph has an **Eulerian Path** but no Eulerian Circuit.

### Related Problems

Here are some related problems on Eulerian graphs that can be solved:

1. **Euler Circuit in an Undirected Graph** (Classic Problem)
   - Problem: Check if a given undirected graph has an Eulerian circuit.
   - Difficulty: Medium
   - [Problem Link](https://www.geeksforgeeks.org/eulerian-path-and-circuit/)

2. **Hierholzer's Algorithm Implementation** (Find Eulerian Circuit)
   - Problem: Given a graph, find an Eulerian circuit if it exists.
   - Difficulty: Hard
   - [Problem Link](https://www.geeksforgeeks.org/hierholzers-algorithm-directed-graph/)

3. **Fleury’s Algorithm for Eulerian Path**
   - Problem: Find the Eulerian path in an undirected graph.
   - Difficulty: Medium
   - [Problem Link](https://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/)

### Java Implementation: Eulerian Circuit and Path

```java
import java.util.*;

public class EulerianGraph {
    private int V; // Number of vertices
    private LinkedList<Integer> adj[]; // Adjacency List Representation

    // Constructor
    EulerianGraph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList();
    }

    // Function to add an edge into the graph
    void addEdge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v); // Graph is undirected
    }

    // A function to perform DFS traversal
    void DFSUtil(int v, boolean visited[]) {
        visited[v] = true;
        for (int n : adj[v]) {
            if (!visited[n])
                DFSUtil(n, visited);
        }
    }

    // Check if all non-zero degree vertices are connected
    boolean isConnected() {
        boolean visited[] = new boolean[V];
        int i;
        for (i = 0; i < V; i++)
            if (adj[i].size() != 0)
                break;

        if (i == V)
            return true;

        DFSUtil(i, visited);

        for (i = 0; i < V; i++)
            if (visited[i] == false && adj[i].size() > 0)
                return false;

        return true;
    }

    // Check if the graph has Eulerian Path or Circuit
    int isEulerian() {
        if (isConnected() == false)
            return 0;

        int odd = 0;
        for (int i = 0; i < V; i++)
            if (adj[i].size() % 2 != 0)
                odd++;

        if (odd > 2)
            return 0;

        return (odd == 2) ? 1 : 2;
    }

    // Function to print result
    void testEulerian() {
        int res = isEulerian();
        if (res == 0)
            System.out.println("Graph is not Eulerian");
        else if (res == 1)
            System.out.println("Graph has an Eulerian Path");
        else
            System.out.println("Graph has an Eulerian Circuit");
    }

    public static void main(String args[]) {
        EulerianGraph g1 = new EulerianGraph(5);
        g1.addEdge(0, 1);
        g1.addEdge(1, 2);
        g1.addEdge(2, 0);
        g1.addEdge(0, 3);
        g1.addEdge(3, 4);
        g1.testEulerian();

        EulerianGraph g2 = new EulerianGraph(3);
        g2.addEdge(0, 1);
        g2.addEdge(1, 2);
        g2.addEdge(2, 0);
        g2.testEulerian();
    }
}
```