---
id: bfs-algo  
sidebar_position: 6
title: Breadth-First Search  
sidebar_label: BFS  
---

### Definition:

**Breadth-First Search (BFS)** is a graph traversal algorithm used to explore all vertices and edges of a graph. It starts from an initial node and explores all of its neighbours at the present depth before moving on to nodes at the next depth level. BFS is commonly used to find the shortest path in unweighted graphs, level-order traversal in trees, and solve puzzles like the shortest path in a maze.

### Characteristics:

- **Queue-Based Traversal:**
  BFS uses a queue data structure to keep track of nodes that need to be explored next.

- **Level-Order Exploration:**
  BFS explores nodes in layers, first visiting all nodes at the current depth level before moving deeper.

- **Complete Exploration:**
  BFS continues to search until all the nodes of the graph are visited.

### How BFS Works:

1. **Start at a node** (root or any node).
2. **Mark the node as visited** and enqueue it.
3. **Dequeue a node** from the front of the queue and explore its unvisited neighbours.
4. **Mark each neighbor as visited** and enqueue them.
5. **Repeat** the process until the queue is empty.

### Time Complexity:

- **Time Complexity**: $O(V + E)$  
  Where `V` is the number of vertices and `E` is the number of edges in the graph.

### Space Complexity:

- **Space Complexity**: $O(V)$
  BFS uses space proportional to the number of vertices due to the queue and visited list.

### Advantages of BFS:

- **Finds Shortest Path**:  
  BFS guarantees the shortest path in an unweighted graph.

- **Systematic Exploration**:  
  BFS explores each level of the graph before moving to the next, ensuring that all nodes at the same level are visited.

- **Ideal for Connected Components**:  
  BFS can be used to find connected components in a graph.

### Disadvantages of BFS:

- **Memory Intensive**:  
  BFS can consume more memory than depth-first search (DFS) due to storing all nodes at the current level.

- **Not Optimal for Deep Solutions**:  
  BFS may take longer to reach deeper nodes if they are far from the starting point.

### Breadth-First Search Algorithm (Java Implementation):

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

    // BFS traversal of the vertices reachable from v
    void BFS(int s) {
        // Mark all the vertices as not visited
        boolean visited[] = new boolean[numVertices];

        // Create a queue for BFS
        LinkedList<Integer> queue = new LinkedList<>();

        // Mark the current node as visited and enqueue it
        visited[s] = true;
        queue.add(s);

        while (queue.size() != 0) {
            // Dequeue a vertex from queue and print it
            s = queue.poll();
            System.out.print(s + " ");

            // Get all adjacent vertices of the dequeued vertex
            // If an adjacent vertex has not been visited, mark it visited and enqueue it
            for (int neighbor : adjList[s]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }

    public static void main(String args[]) {
        Graph g = new Graph(4);

        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 0);
        g.addEdge(2, 3);
        g.addEdge(3, 3);

        System.out.println("Following is Breadth First Traversal (starting from vertex 2):");

        g.BFS(2); // Perform BFS starting from vertex 2
    }
}
```

### Applications of BFS:
- Shortest Path Finding:
BFS is used to find the shortest path in unweighted graphs.

- Level-Order Traversal:
BFS is ideal for performing level-order traversal in trees.

- Web Crawlers:
BFS can be used in web crawling to explore web pages in a breadth-wise manner.

- Connected Components:
BFS helps identify connected components in undirected graphs.

### Summary:
BFS is a fundamental algorithm for graph traversal and plays a crucial role in various applications like shortest path finding and level-order traversal. Its systematic approach ensures that all nodes at the current level are explored before moving deeper, making it invaluable for many graph-related
