

# Graphs in Data Structures and Algorithms (DSA)

Graphs in Data Structures and Algorithms (DSA) are a non-linear data structure that consists of a set of vertices (nodes) connected by edges. They are widely used to represent relationships between objects or entities.

![alt text](image.png)

## Implementing a Graph using an Adjacency Matrix

To implement a graph, you can use various data structures such as an adjacency matrix or an adjacency list. 

An adjacency matrix is a 2D array where each cell represents the presence or absence of an edge between two vertices. It requires O(V^2) space, where V is the number of vertices.

Here's an example of implementing a graph using an adjacency matrix in Python:

```python
class Graph:
     def __init__(self, num_vertices):
          self.num_vertices = num_vertices
          self.adj_matrix = [[0] * num_vertices for _ in range(num_vertices)]

     def add_edge(self, src, dest):
          self.adj_matrix[src][dest] = 1
          self.adj_matrix[dest][src] = 1

     def remove_edge(self, src, dest):
          self.adj_matrix[src][dest] = 0
          self.adj_matrix[dest][src] = 0

     def print_graph(self):
          for row in self.adj_matrix:
               print(row)

# Example usage:
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.print_graph()
```

Output:
```plaintext
[0, 1, 0, 0]
[1, 0, 1, 0]
[0, 1, 0, 1]
[0, 0, 1, 0]
```

## Implementing a Graph using an Adjacency List

Another way to implement a graph is using an adjacency list. It is a collection of linked lists, where each vertex has a list of its adjacent vertices. It requires O(V + E) space, where V is the number of vertices and E is the number of edges.

Here's an example of implementing a graph using an adjacency list in Python:

```python
class Graph:
     def __init__(self, num_vertices):
          self.num_vertices = num_vertices
          self.adj_list = [[] for _ in range(num_vertices)]

     def add_edge(self, src, dest):
          self.adj_list[src].append(dest)
          self.adj_list[dest].append(src)

     def remove_edge(self, src, dest):
          self.adj_list[src].remove(dest)
          self.adj_list[dest].remove(src)

     def print_graph(self):
          for vertex, adj_vertices in enumerate(self.adj_list):
               print(f"Vertex {vertex}: {adj_vertices}")

# Example usage:
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.print_graph()
```

Output:
```plaintext
Vertex 0: [1]
Vertex 1: [0, 2]
Vertex 2: [1, 3]
Vertex 3: [2]
```

## Additional Operations on Graphs

These are just basic operations on graphs. Depending on your requirements, you can perform various other operations like finding a path between two vertices, checking for cycles, or finding the shortest path using algorithms like Depth-First Search (DFS) or Breadth-First Search (BFS).


Graphs in Data Structures and Algorithms (DSA) are a non-linear data structure that consists of a set of vertices (nodes) connected by edges. They are widely used to represent relationships between objects or entities.

To implement a graph, you can use various data structures such as an adjacency matrix or an adjacency list. 

An adjacency matrix is a 2D array where each cell represents the presence or absence of an edge between two vertices. It requires O(V^2) space, where V is the number of vertices.

Here's an example of implementing a graph using an adjacency matrix in Python:

```python
class Graph:
     def __init__(self, num_vertices):
          self.num_vertices = num_vertices
          self.adj_matrix = [[0] * num_vertices for _ in range(num_vertices)]

     def add_edge(self, src, dest):
          self.adj_matrix[src][dest] = 1
          self.adj_matrix[dest][src] = 1

     def remove_edge(self, src, dest):
          self.adj_matrix[src][dest] = 0
          self.adj_matrix[dest][src] = 0

     def print_graph(self):
          for row in self.adj_matrix:
               print(row)

# Example usage:
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.print_graph()
```

Output:
```
[0, 1, 0, 0]
[1, 0, 1, 0]
[0, 1, 0, 1]
[0, 0, 1, 0]
```

Another way to implement a graph is using an adjacency list. It is a collection of linked lists, where each vertex has a list of its adjacent vertices. It requires O(V + E) space, where V is the number of vertices and E is the number of edges.

Here's an example of implementing a graph using an adjacency list in Python:

```python
class Graph:
     def __init__(self, num_vertices):
          self.num_vertices = num_vertices
          self.adj_list = [[] for _ in range(num_vertices)]

     def add_edge(self, src, dest):
          self.adj_list[src].append(dest)
          self.adj_list[dest].append(src)

     def remove_edge(self, src, dest):
          self.adj_list[src].remove(dest)
          self.adj_list[dest].remove(src)

     def print_graph(self):
          for vertex, adj_vertices in enumerate(self.adj_list):
               print(f"Vertex {vertex}: {adj_vertices}")

# Example usage:
g = Graph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 3)
g.print_graph()
```

Output:
```
Vertex 0: [1]
Vertex 1: [0, 2]
Vertex 2: [1, 3]
Vertex 3: [2]
```

These are just basic operations on graphs. Depending on your requirements, you can perform various other operations like finding a path between two vertices, checking for cycles, or finding the shortest path using algorithms like Depth-First Search (DFS) or Breadth-First Search (BFS).

## Implementing a Graph in Java

To implement a graph in Java, you can use similar approaches as in Python. Here's an example of implementing a graph using an adjacency matrix in Java:

```java
public class Graph {
     private int numVertices;
     private int[][] adjMatrix;

     public Graph(int numVertices) {
          this.numVertices = numVertices;
          this.adjMatrix = new int[numVertices][numVertices];
     }

     public void addEdge(int src, int dest) {
          adjMatrix[src][dest] = 1;
          adjMatrix[dest][src] = 1;
     }

     public void removeEdge(int src, int dest) {
          adjMatrix[src][dest] = 0;
          adjMatrix[dest][src] = 0;
     }

     public void printGraph() {
          for (int i = 0; i < numVertices; i++) {
               for (int j = 0; j < numVertices; j++) {
                    System.out.print(adjMatrix[i][j] + " ");
               }
               System.out.println();
          }
     }

     public static void main(String[] args) {
          Graph g = new Graph(4);
          g.addEdge(0, 1);
          g.addEdge(1, 2);
          g.addEdge(2, 3);
          g.printGraph();
     }
}
```

Output:
```
0 1 0 0 
1 0 1 0 
0 1 0 1 
0 0 1 0 
```

## Implementing a Graph in C++

Similarly, you can implement a graph in C++ using an adjacency matrix. Here's an example:

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Graph {
private:
     int numVertices;
     vector<vector<int>> adjMatrix;

public:
     Graph(int numVertices) {
          this->numVertices = numVertices;
          this->adjMatrix.resize(numVertices, vector<int>(numVertices, 0));
     }

     void addEdge(int src, int dest) {
          adjMatrix[src][dest] = 1;
          adjMatrix[dest][src] = 1;
     }

     void removeEdge(int src, int dest) {
          adjMatrix[src][dest] = 0;
          adjMatrix[dest][src] = 0;
     }

     void printGraph() {
          for (int i = 0; i < numVertices; i++) {
               for (int j = 0; j < numVertices; j++) {
                    cout << adjMatrix[i][j] << " ";
               }
               cout << endl;
          }
     }
};

int main() {
     Graph g(4);
     g.addEdge(0, 1);
     g.addEdge(1, 2);
     g.addEdge(2, 3);
     g.printGraph();

     return 0;
}
```

Output:
```
0 1 0 0 
1 0 1 0 
0 1 0 1 
0 0 1 0 
```

Remember to adjust the number of vertices and edges according to your requirements.

In conclusion, graphs are a fundamental data structure in Data Structures and Algorithms (DSA) that are used to represent relationships between objects or entities. They can be implemented using various data structures such as an adjacency matrix or an adjacency list.

An adjacency matrix is a 2D array that represents the presence or absence of edges between vertices. It requires O(V^2) space, where V is the number of vertices. On the other hand, an adjacency list is a collection of linked lists where each vertex has a list of its adjacent vertices. It requires O(V + E) space, where V is the number of vertices and E is the number of edges.

Both implementations have their own advantages and disadvantages. The choice of implementation depends on the specific requirements of the problem at hand.

Additionally, there are various other operations that can be performed on graphs, such as finding a path between two vertices, checking for cycles, or finding the shortest path using algorithms like Depth-First Search (DFS) or Breadth-First Search (BFS).

Graphs can also be implemented in other programming languages like Java and C++. The implementation follows similar approaches using either an adjacency matrix or an adjacency list.

Overall, understanding graphs and their implementations is crucial for solving problems that involve relationships and connectivity between entities.

## Breadth-First-Search (BFS)

Breadth First Search (BFS) is a fundamental graph traversal algorithm. It begins with a node, then first traverses all its adjacent. Once all adjacent are visited, then their adjacent are traversed.

Steps for BFS of a Graph : 
The algorithm starts from a given source and explores all reachable vertices from the given source. Graphs may contain cycles, so we may come to the same node again. To avoid processing a node more than once, we use a boolean visited array.
1) While the queue is not empty:
     Remove a node from the queue and visit it.
     For each unvisited neighbor of the removed node:
          Add the neighbor into the queue.
          Mark the neighbor as visited.
2) When the queue is empty the algorithm terminates.

Implementation in Java:

Input parameters- 1) ArrayList<ArrayList<Integer>> adj - Adjacency list representation of the graph.
                  2) s - source node
```java
public void bfsOfGraph(ArrayList<ArrayList<Integer>> adj, int s) {
        Queue<Integer> q=new LinkedList<Integer>();
        boolean[] visited=new boolean[V];
        q.add(s);
        visited[s]=true;
        while(q.isEmpty()==false){
            int val=q.poll();
            System.out.print(val+" ");
            for(int v:adj.get(u)){
                 if(visited[v]==false){
                      visited[v]=true;
                      q.add(v);
                 }
            }     
        }
}
```
Input:
```plaintext
{{1,2},{},{3,4},{},{}}
0
```
Output :
```plaintext
0 1 2 3 4
```
```plaintext
Time Complexity - O(V+E)
Space Complexity - O(V+E)
```

## Depth First Search (DFS) 

Depth First Traversal (DFS) for a graph, we traverse all adjacent one by one, when we traverse an adjacent, we finish traversal of all vertices reachable through the adjacent completely. After we finish one adjacent and its reachable, we go to the next adjacent and finish all reachable through next and continue this way.

Steps for DFS of a Graph :
1) Initaialize visited array.
2) Mark the node s as visited.
3) For each unvisited neighbor of the s:
          call the dfs function for the neighbor

Implementation in Java:

Input parameters- 1) ArrayList<ArrayList<Integer>> adj - Adjacency list representation of the graph.
                  2) s - source node
                  3) Boolean array named 'visited'
```java
public void DFS(ArrayList<ArrayList<Integer>> adj, int s, boolean[] visited){
     visited[s]=true;
     System.out.print(s+" ");
     for(int u : adj.get(s)){
          if(visited[u]==false)
               DFS(adj,u,visited);
     }
}
```
Input :
```plaintext
{{1,4},{2},{3},{},{5,6},{4,6},{4,5}}
0
{false,false,false,false,false,false,false}
```
Output:
```plaintext
0 1 2 3 4 5 6
```
```plaintext
Time Complexity - O(V+E)
Space Complexity - O(V+E)
```

## Topological Sorting (Kahn's Algorithm)

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u-v, vertex u comes before v in the ordering. If the topological sorting has to done then the graph has to a Directed acyclic graph.

Kahn’s Algorithm for Topological Sorting is a method used to order the vertices of a directed graph in a linear order such that for every directed edge from vertex X to vertex Y, X comes before Y in the order. The algorithm works by repeatedly finding vertices with no incoming edges, removing them from the graph, and updating the incoming edges of the remaining vertices. This process continues until all vertices have been ordered.

Steps for Topological Sorting :
1) Add all nodes with in-degree 0 to a queue.
2) While the queue is not empty:
     i) Remove a node from the queue.
     ii) For each outgoing edge from the removed node, decrement the in-degree of the destination node by 1.
     iii) If the in-degree of a destination node becomes 0, add it to the queue.
3) If the queue is empty and there are still nodes in the graph, the graph contains a cycle and cannot be topologically sorted.
4) The nodes in the queue represent the topological ordering of the graph.

Implementation in Java:

Input parameters- 1) ArrayList<ArrayList<Integer>> adj - Adjacency list representation of the graph.
                  2) V - number of vertices.
                  
```java
public static int[] topologicalSort(List<List<Integer> > adj, int V)
    {
        // Array to store indegree of each vertex
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }
        // Queue to store vertices with indegree 0
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                q.offer(i);
            }
        }
        int[] result = new int[V];
        int index = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            result[index++] = node;
            // Decrease indegree of adjacent vertices as the
            // current node is in topological order
            for (int it : adj.get(node)) {
                indegree[it]--;

                // If indegree becomes 0, push it to the
                // queue
                if (indegree[it] == 0) {
                    q.offer(it);
                }
            }
        }
        // Check for cycle
        if (index != V) {
            System.out.println("Graph contains cycle!");
            return new int[0];
        }

        return result;
    }
```

Input:
```plaintext
{{2,3}, {3,1}, {4,0}, {4,1}, {5,0}, {5,2}}
6
```
Output :
```plaintext
4 5 2 0 3 1
```

## Prim's Minimum Spanning Tree Algorithm

Minimum Spanning Tree - Given a connected and undirected graph, a spanning tree of that graph is a subgraph that is a tree and connects all the vertices together. A single graph can have many different spanning trees.

A minimum spanning tree has (V – 1) edges where V is the number of vertices in the given graph.

Prim's algorithm - a spanning tree means all vertices must be connected. So the two disjoint subsets of vertices must be connected to make a Spanning  Tree. And they must be connected with the minimum weight edge to make it a Minimum Spanning Tree.

Steps for Prim's Algorithm :
1) Create a set mstSet that keeps track of vertices already included in Minimum Spanning Tree.
2) Assign a key value to all vertices in the input graph. Initialize all key values as INFINITE. Assign key value as 0 for the first vertex so that it is picked first.
3) While mstSet doesn't include all vertices:
        i) Pick a vertex u which is not there in mstSet and has minimum key value.
       ii) Include u to mstSet.
      iii) Update key value of all adjacent vertices of u. To update the key values, iterate through all adjacent vertices. For every adjacent vertex v, if                  weight of edge u-v is less than the previous key value of v, update the key value as weight of u-v.

Implementation in Java:

Input parameters- 1) ArrayList<ArrayList<Integer>> adj - Adjacency list representation of the graph.
                  2) s - source node

```java
    // A utility function to find the vertex with minimum key
    // value, from the set of vertices not yet included in MST

    static int V=5;
    int minKey(int key[], Boolean mstSet[])
    {
        // Initialize min value
        int min = Integer.MAX_VALUE, min_index = -1;

        for (int v = 0; v < V; v++)
            if (mstSet[v] == false && key[v] < min) {
                min = key[v];
                min_index = v;
            }

        return min_index;
    }

    // A utility function to print the constructed MST stored in
    // parent[]
    void printMST(int parent[], int graph[][])
    {
        System.out.println("Edge \tWeight");
        for (int i = 1; i < V; i++)
            System.out.println(parent[i] + " - " + i + "\t" + graph[i][parent[i]]);
    }

    // Function to construct and print MST for a graph represented
    // using adjacency matrix representation
    void primMST(int graph[][])
    {
        // Array to store constructed MST
        int parent[] = new int[V];

        // Key values used to pick minimum weight edge in cut
        int key[] = new int[V];

        // To represent set of vertices not yet included in MST
        Boolean mstSet[] = new Boolean[V];

        // Initialize all keys as INFINITE
        for (int i = 0; i < V; i++) {
            key[i] = Integer.MAX_VALUE;
            mstSet[i] = false;
        }

        // Always include first 1st vertex in MST.
        key[0] = 0; // Make key 0 so that this vertex is
        // picked as first vertex
        parent[0] = -1; // First node is always root of MST

        // The MST will have V vertices
        for (int count = 0; count < V - 1; count++) {
            // Pick thd minimum key vertex from the set of vertices
            // not yet included in MST
            int u = minKey(key, mstSet);

            // Add the picked vertex to the MST Set
            mstSet[u] = true;

            // Update key value and parent index of the adjacent
            // vertices of the picked vertex. Consider only those
            // vertices which are not yet included in MST
            for (int v = 0; v < V; v++)

                // graph[u][v] is non zero only for adjacent vertices of m
                // mstSet[v] is false for vertices not yet included in MST
                // Update the key only if graph[u][v] is smaller than key[v]
                if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
        }

        // print the constructed MST
        printMST(parent, graph);
    }
```

Input :

```plaintext
{ { 0, 2, 0, 6, 0 },
  { 2, 0, 3, 8, 5 },
  { 0, 3, 0, 0, 7 },
  { 6, 8, 0, 0, 9 },
  { 0, 5, 7, 9, 0 } }
```

Output :

```plaintext
Edge   Weight
0 - 1    2
1 - 2    3
0 - 3    6
1 - 4    5
```
```plaintext
Time Complexity -  O(V^2)
Space Complexity - O(V)
```
