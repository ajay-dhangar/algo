---
slug: understanding-graph-representation-adjacency-matrix-vs-adjacency-list
title: "Understanding Graph Representation: Adjacency Matrix vs Adjacency List"
authors: [Harshitha-Grandhi]
tags: [Harshitha-Grandhi, algo, dsa, algorithms, graph-theory]
---

Graph representation is essential for effectively implementing graph algorithms and understanding the relationships between nodes. The two most common representations of graphs are the **Adjacency Matrix** and the **Adjacency List**. This blog post will compare these two representations, discussing their structures, advantages, and use cases.

<!-- truncate -->

In this blog, we'll explore:

- **Understanding Graphs**: What are graphs and their components?
- **Adjacency Matrix**: Structure and characteristics.
- **Adjacency List**: Structure and characteristics.
- **Comparison of Adjacency Matrix and Adjacency List**: When to use which representation.
- **Implementation**: Code examples in Python and Java.
- **Real-World Applications**: How these representations are applied in practice.

---

## Understanding Graphs

Graphs consist of vertices (nodes) connected by edges (links). They can be directed or undirected, weighted or unweighted, and are used to model relationships and structures in various fields, from social networks to transportation systems.

### Graph Representation Example:

Consider the following undirected graph:

This graph can be represented using an adjacency matrix or an adjacency list.

## Adjacency Matrix

An adjacency matrix is a 2D array where each cell at position (i, j) indicates whether there is an edge between vertex i and vertex j. If there is an edge, the cell contains a value (usually 1 for unweighted graphs or the weight of the edge for weighted graphs); otherwise, it contains 0.

### Characteristics:

- **Space Complexity**: O(V²), where V is the number of vertices.
- **Direct Access**: Allows O(1) time complexity for checking if an edge exists between two vertices.
- **Memory Inefficiency**: Less efficient for sparse graphs (graphs with few edges compared to the number of vertices).

### Example Implementation (Python):

```python
class GraphAdjacencyMatrix:
    def __init__(self, vertices):
        self.V = vertices
        self.matrix = [[0] * vertices for _ in range(vertices)]

    def add_edge(self, u, v):
        self.matrix[u][v] = 1  # For undirected graph, add the reverse edge as well
        self.matrix[v][u] = 1

    def display(self):
        for row in self.matrix:
            print(row)

# Example usage
g_matrix = GraphAdjacencyMatrix(4)
g_matrix.add_edge(0, 1)  # A - B
g_matrix.add_edge(0, 2)  # A - C
g_matrix.add_edge(1, 3)  # B - D
g_matrix.add_edge(2, 3)  # C - D
g_matrix.display()

#output
[0, 1, 1, 0]
[1, 0, 0, 1]
[1, 0, 0, 1]
[0, 1, 1, 0]
```


## Adjacency List
An adjacency list is a collection of lists or arrays where each list corresponds to a vertex and contains a list of adjacent vertices. It is more space-efficient for sparse graphs.

### Characteristics:
-**Space Complexity**: O(V + E), where E is the number of edges.
-**Memory Efficiency**: More efficient for sparse graphs, as it only stores existing edges.
-**Traversal**: It may take longer to check if an edge exists between two vertices (O(V) in the worst case).

### Example Implementation (Python):
```python
class GraphAdjacencyList:
    def __init__(self):
        self.graph = {}

    def add_edge(self, u, v):
        if u not in self.graph:
            self.graph[u] = []
        if v not in self.graph:
            self.graph[v] = []
        self.graph[u].append(v)  # For undirected graph, add the reverse edge as well
        self.graph[v].append(u)

    def display(self):
        for vertex, edges in self.graph.items():
            print(f"{vertex}: {edges}")

# Example usage
g_list = GraphAdjacencyList()
g_list.add_edge('A', 'B')  # A - B
g_list.add_edge('A', 'C')  # A - C
g_list.add_edge('B', 'D')  # B - D
g_list.add_edge('C', 'D')  # C - D
g_list.display()

# output
A: ['B', 'C']
B: ['A', 'D']
C: ['A', 'D']
D: ['B', 'C']


```

### Java Implementation (Adjacency Matrix):
```java
public class GraphMatrix {
    private int[][] matrix;
    private int V;

    public GraphMatrix(int vertices) {
        V = vertices;
        matrix = new int[V][V];
    }

    public void addEdge(int u, int v) {
        matrix[u][v] = 1; // For undirected graph, also set matrix[v][u]
        matrix[v][u] = 1;
    }

    public void display() {
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        GraphMatrix g_matrix = new GraphMatrix(4);
        g_matrix.addEdge(0, 1);  // A - B
        g_matrix.addEdge(0, 2);  // A - C
        g_matrix.addEdge(1, 3);  // B - D
        g_matrix.addEdge(2, 3);  // C - D
        g_matrix.display();
    }
}
//output:
0 1 1 0 
1 0 0 1 
1 0 0 1 
0 1 1 0 


```


### Java Implementation (Adjacency List):
```java
import java.util.*;

public class GraphList {
    private Map<String, List<String>> adjList;

    public GraphList() {
        adjList = new HashMap<>();
    }

    public void addEdge(String u, String v) {
        adjList.putIfAbsent(u, new ArrayList<>());
        adjList.putIfAbsent(v, new ArrayList<>());
        adjList.get(u).add(v);  // For undirected graph, also add reverse edge
        adjList.get(v).add(u);
    }

    public void display() {
        for (String vertex : adjList.keySet()) {
            System.out.println(vertex + ": " + adjList.get(vertex));
        }
    }

    public static void main(String[] args) {
        GraphList g_list = new GraphList();
        g_list.addEdge("A", "B");  // A - B
        g_list.addEdge("A", "C");  // A - C
        g_list.addEdge("B", "D");  // B - D
        g_list.addEdge("C", "D");  // C - D
        g_list.display();
    }
}
//output:
A: [B, C]
B: [A, D]
C: [A, D]
D: [B, C]

```
### Real-World Applications
Understanding how to represent graphs using adjacency matrices and adjacency lists is crucial in many applications, such as:
-**Social Network Analysis**: Modeling relationships between users.
-**Routing Algorithms**: Efficiently determining paths in networks.
-**Computer Networks**: Representing connections in a network topology.

## Conclusion
Choosing the right graph representation is essential for optimizing the performance of graph algorithms. Adjacency matrices and adjacency lists each have their strengths and weaknesses, making them suitable for different scenarios. Mastering these representations will enhance your understanding of graph theory and improve your problem-solving skills in computer science.





