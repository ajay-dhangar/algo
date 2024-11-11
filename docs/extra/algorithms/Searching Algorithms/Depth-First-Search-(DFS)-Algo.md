---
id: dfs-algo  
sidebar_position: 7
title: Depth-First Search  
sidebar_label: DFS 
---

### Definition:

**Depth-First Search (DFS)** is a graph traversal algorithm used to explore all vertices and edges of a graph. It starts from an initial node and explores as far as possible along each branch before backtracking. DFS is commonly used to solve problems like detecting cycles, solving mazes, and connectivity in graphs.

### Characteristics:

- **Stack-Based Traversal:**
  DFS relies on an implicit or explicit stack data structure. When implemented recursively, the system call stack is used to keep track of the visited nodes.

- **Backtracking:**
  DFS explores all nodes along a path until it can’t go further, then backtracks to explore other unvisited nodes.

- **Complete Exploration:**
  DFS continues to search until all the nodes of the graph are visited.

### Types of DFS:

1. **Recursive DFS:**
   A depth-first traversal using recursive function calls to visit each node.
   
2. **Iterative DFS:**
   Uses an explicit stack to simulate the recursive function, achieving the same result without recursion.

### How DFS Works:

1. **Start at a node** (root or any node).
2. **Mark the node as visited**.
3. **Explore each neighbor** of the node in depth-first fashion.
4. **Backtrack** when no further neighbors are found.
5. **Repeat** the process for other nodes if necessary.

### Time Complexity:

- **Time Complexity**: $O(V + E)$  
  Where `V` is the number of vertices and `E` is the number of edges in the graph.

### Space Complexity:

- **Space Complexity**: $O(V)$  
  DFS uses space proportional to the number of vertices due to the recursion stack or explicit stack.

### Advantages of DFS:

- **Memory-Efficient**:  
  DFS typically requires less memory than breadth-first search (BFS) since it doesn’t need to store all levels of the tree simultaneously.

- **Finds Deeper Solutions**:  
  DFS is better suited for problems where the solution is deep in the graph.

- **Backtracking**:  
  DFS is great for backtracking problems, such as solving puzzles and finding paths in mazes.

### Disadvantages of DFS:

- **Not Always Optimal**:  
  DFS does not guarantee finding the shortest path in an unweighted graph.

- **May Get Stuck in Infinite Loops**:  
  Without proper handling (e.g., cycle detection), DFS can revisit nodes and lead to infinite recursion in graphs with cycles.

### Depth-First Search Algorithm (Java Implementation):

```java
import java.util.*;

class Graph {
    private int numVertices;
    private LinkedList<Integer> adjList[];

    // Constructor
    Graph(int v) {
        numVertices = v;
        adjList = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adjList[i] = new LinkedList();
    }

    // Add an edge to the graph
    void addEdge(int v, int w) {
        adjList[v].add(w); // Add w to v's list.
    }

    // DFS recursive function
    void DFSUtil(int v, boolean visited[]) {
        // Mark the current node as visited and print it
        visited[v] = true;
        System.out.print(v + " ");

        // Recur for all the vertices adjacent to this vertex
        for (int neighbor : adjList[v]) {
            if (!visited[neighbor])
                DFSUtil(neighbor, visited);
        }
    }

    // DFS traversal of the vertices reachable from v
    void DFS(int v) {
        // Mark all the vertices as not visited
        boolean visited[] = new boolean[numVertices];

        // Call the recursive helper function to print DFS traversal
        DFSUtil(v, visited);
    }

    public static void main(String args[]) {
        Graph g = new Graph(4);

        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 0);
        g.addEdge(2, 3);
        g.addEdge(3, 3);

        System.out.println("Following is Depth First Traversal (starting from vertex 2):");

        g.DFS(2); // Perform DFS starting from vertex 2
    }
}
```

### Applications of DFS:
- Topological Sorting:
DFS is used in topological sorting of directed acyclic graphs (DAGs).

- Cycle Detection:
DFS can detect cycles in both directed and undirected graphs.

- Solving Mazes and Puzzles:
DFS can explore all possible paths and backtrack to find solutions.

- Pathfinding and Connectivity:
DFS helps in finding paths and checking connectivity in graphs.

### Summary:
DFS is an essential algorithm for graph traversal and problem-solving in various domains. Its memory efficiency, ability to find deep solutions, and use in applications like topological sorting and cycle detection make it valuable. While it may not always find the shortest path, it provides an efficient approach to exploring graph structures in depth-first order.
