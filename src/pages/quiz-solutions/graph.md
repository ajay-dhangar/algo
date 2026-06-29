# Graph Quiz Solutions

## Questions

### Easy Questions

1. **What is a Graph in data structures?**
   - A) A linear collection of elements accessed by index
   - B) A non-linear data structure consisting of vertices and edges
   - C) A hierarchical structure with a single root node
   - D) A fixed-size array of key-value pairs  
   **Answer:** B) A non-linear data structure consisting of vertices and edges  
   **Explanation:** A graph is a non-linear data structure made up of a finite set of vertices (nodes) and a set of edges connecting pairs of vertices. It is used to model pairwise relations between objects.

2. **In an undirected graph, if there is an edge between vertex A and vertex B, which of the following is true?**
   - A) You can traverse only from A to B
   - B) You can traverse only from B to A
   - C) You can traverse from A to B and from B to A
   - D) No traversal is possible between A and B  
   **Answer:** C) You can traverse from A to B and from B to A  
   **Explanation:** In an undirected graph, edges have no direction. If an edge exists between A and B, the connection is bidirectional — you can move freely between A and B in either direction.

3. **What is the 'degree' of a vertex in an undirected graph?**
   - A) The total number of vertices in the graph
   - B) The number of edges connected to that vertex
   - C) The shortest distance from that vertex to any other
   - D) The maximum weight of edges adjacent to the vertex  
   **Answer:** B) The number of edges connected to that vertex  
   **Explanation:** The degree of a vertex in an undirected graph is the count of edges incident to it. A vertex with no edges has degree 0 and is called an isolated vertex.

4. **Which data structure does Breadth First Search (BFS) primarily use for traversal?**
   - A) Stack
   - B) Priority Queue
   - C) Queue
   - D) Linked List  
   **Answer:** C) Queue  
   **Explanation:** BFS explores a graph level by level. It uses a Queue (FIFO) to track which node to visit next, ensuring all neighbors of the current node are processed before moving deeper.

5. **Which data structure does Depth First Search (DFS) primarily use for traversal?**
   - A) Queue
   - B) Stack (or recursion call stack)
   - C) Heap
   - D) Hash Map  
   **Answer:** B) Stack (or recursion call stack)  
   **Explanation:** DFS dives as deep as possible down a path before backtracking. It uses a Stack — either explicitly or via the program's recursion call stack — to remember the path and backtrack when needed.

### Medium Questions

6. **What is the space complexity of representing a graph with V vertices and E edges using an Adjacency List?**
   - A) O(V²)
   - B) O(V + E)
   - C) O(E²)
   - D) O(V × E)  
   **Answer:** B) O(V + E)  
   **Explanation:** An adjacency list stores each vertex along with a list of its neighbors. Total space = O(V) for the vertex array + O(E) for all edge entries across all lists = O(V + E). This makes it memory-efficient for sparse graphs.

7. **In a directed graph, what is the difference between 'in-degree' and 'out-degree' of a vertex?**
   - A) In-degree counts outgoing edges; out-degree counts incoming edges
   - B) In-degree counts incoming edges; out-degree counts outgoing edges
   - C) Both refer to the total number of edges connected to the vertex
   - D) In-degree applies only to weighted graphs  
   **Answer:** B) In-degree counts incoming edges; out-degree counts outgoing edges  
   **Explanation:** In a directed graph, edges have direction. The in-degree of a vertex is the number of edges pointing INTO it, while out-degree is the number of edges pointing OUT of it.

8. **What is a 'cycle' in a graph?**
   - A) A path that visits every vertex exactly once
   - B) A path where the start vertex and end vertex are the same, with no repeated edges
   - C) A sequence of edges connecting two disconnected components
   - D) The longest possible path between any two vertices  
   **Answer:** B) A path where the start vertex and end vertex are the same, with no repeated edges  
   **Explanation:** A cycle is a closed path — it starts and ends at the same vertex without reusing any edge. Detecting cycles is important in many algorithms such as deadlock detection and topological sorting.

9. **What is the time complexity of BFS on a graph represented using an Adjacency List with V vertices and E edges?**
   - A) O(V²)
   - B) O(V log V)
   - C) O(V + E)
   - D) O(E²)  
   **Answer:** C) O(V + E)  
   **Explanation:** In BFS using an adjacency list, each vertex is enqueued and dequeued once — O(V) — and each edge is examined once when processing the adjacency list of each vertex — O(E). Total: O(V + E).

### Hard Questions

10. **Which of the following is a real-world application of Graph data structures?**
    - A) Storing sorted integers for binary search
    - B) Modeling social networks where users are vertices and friendships are edges
    - C) Implementing a LIFO-based undo mechanism
    - D) Performing prefix-based string lookups  
    **Answer:** B) Modeling social networks where users are vertices and friendships are edges  
    **Explanation:** Graphs model social networks, road maps (GPS), web crawlers (pages as vertices, hyperlinks as edges), dependency resolution, and many more real-world problems.

11. **In a weighted directed graph, which algorithm is most suitable for finding the shortest path from a single source to all other vertices when all edge weights are non-negative?**
    - A) Depth First Search (DFS)
    - B) Breadth First Search (BFS)
    - C) Dijkstra's Algorithm
    - D) Topological Sort  
    **Answer:** C) Dijkstra's Algorithm  
    **Explanation:** Dijkstra's algorithm is designed for single-source shortest paths in graphs with non-negative weights. It uses a priority queue to greedily pick the vertex with the smallest known distance at each step, achieving O((V + E) log V) with a min-heap.

12. **What is the key advantage of an Adjacency Matrix over an Adjacency List representation for graphs?**
    - A) Uses less memory for sparse graphs
    - B) Allows O(1) time to check whether an edge exists between two vertices
    - C) Supports faster BFS traversal on all graph types
    - D) Automatically handles disconnected components  
    **Answer:** B) Allows O(1) time to check whether an edge exists between two vertices  
    **Explanation:** An adjacency matrix stores a V×V grid where matrix[i][j] = 1 (or weight) if edge (i,j) exists. This enables O(1) edge lookup. However, it uses O(V²) memory regardless of edge count, making it inefficient for sparse graphs.
