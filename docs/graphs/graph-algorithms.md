---
id: breadth-first-search
title: Breadth First Search (BFS)
sidebar_label: Breadth First Search
sidebar_position: 1
description: Breadth First Search (BFS) is a fundamental graph traversal algorithm. It begins with a node, then first traverses all its adjacent. Once all adjacent are visited, then their adjacent are traversed.
tags: [Graph, Algorithms, Java, Medium]
---

Breadth First Search (BFS) is a fundamental graph traversal algorithm. It begins with a node, then first traverses all its adjacent. Once all adjacent are visited, then their adjacent are traversed.

<AdsComponent adSlot="3270832720" />

### Steps for BFS of a Graph :

The algorithm starts from a given source and explores all reachable vertices from the given source. Graphs may contain cycles, so we may come to the same node again. To avoid processing a node more than once, we use a boolean visited array.
**1) While the queue is not empty:**
     Remove a node from the queue and visit it.
     For each unvisited neighbor of the removed node:
          Add the neighbor into the queue.
          Mark the neighbor as visited.
**2) When the queue is empty the algorithm terminates.**

Implementation in Java:

```plaintext
Input parameters- 1) adj - Adjacency list representation of the graph.
                  2) s - source node
```

```java title="BFS.java"
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

**Input:**

```plaintext
{{1,2},{},{3,4},{},{}}
0
```

**Output :**

```plaintext
0 1 2 3 4
```

**Complexity Analysis:**

- Time Complexity - $O(V+E)$
- Space Complexity - $O(V+E)$

<AdsComponent adSlot="5461416177" />

## Depth First Search (DFS) 

Depth First Traversal (DFS) for a graph, we traverse all adjacent one by one, when we traverse an adjacent, we finish traversal of all vertices reachable through the adjacent completely. After we finish one adjacent and its reachable, we go to the next adjacent and finish all reachable through next and continue this way.

**Steps for DFS of a Graph :**
1) Initaialize visited array.
2) Mark the node s as visited.
3) For each unvisited neighbor of the s:
          call the dfs function for the neighbor

**Implementation in Java:**

Input parameters- 1) adj - Adjacency list representation of the graph.
                  2) s - source node
                  3) Boolean array named 'visited'
```java title="DFS.java"
public void DFS(ArrayList<ArrayList<Integer>> adj, int s, boolean[] visited){
     visited[s]=true;
     System.out.print(s+" ");
     for(int u : adj.get(s)){
          if(visited[u]==false)
               DFS(adj,u,visited);
     }
}
```

**Input:**

```plaintext
{{1,4},{2},{3},{},{5,6},{4,6},{4,5}}
0
{false,false,false,false,false,false,false}
```

**Output:**

```plaintext
0 1 2 3 4 5 6
```

**Complexity Analysis:**

- Time Complexity - $O(V+E)$
- Space Complexity - $O(V+E)$

## Topological Sorting (Kahn's Algorithm)

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u-v, vertex u comes before v in the ordering. If the topological sorting has to done then the graph has to a Directed acyclic graph.

Kahn’s Algorithm for Topological Sorting is a method used to order the vertices of a directed graph in a linear order such that for every directed edge from vertex X to vertex Y, X comes before Y in the order. The algorithm works by repeatedly finding vertices with no incoming edges, removing them from the graph, and updating the incoming edges of the remaining vertices. This process continues until all vertices have been ordered.

**Steps for Topological Sorting:**

1) Add all nodes with in-degree 0 to a queue.
2) While the queue is not empty:
     i) Remove a node from the queue.
     ii) For each outgoing edge from the removed node, decrement the in-degree of the destination node by 1.
     iii) If the in-degree of a destination node becomes 0, add it to the queue.
3) If the queue is empty and there are still nodes in the graph, the graph contains a cycle and cannot be topologically sorted.
4) The nodes in the queue represent the topological ordering of the graph.

**Implementation in Java:**

Input parameters- 1) adj - Adjacency list representation of the graph.
                  2) V - number of vertices.
                  
```java title="TopologicalSort.java"
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

**Input:**

```plaintext
{{2,3}, {3,1}, {4,0}, {4,1}, {5,0}, {5,2}}
6
```

**Output:**

```plaintext
4 5 2 0 3 1
```

<AdsComponent adSlot="3270832720" />

## Prim's Minimum Spanning Tree Algorithm

Minimum Spanning Tree - Given a connected and undirected graph, a spanning tree of that graph is a subgraph that is a tree and connects all the vertices together. A single graph can have many different spanning trees.

A minimum spanning tree has (V – 1) edges where V is the number of vertices in the given graph.

Prim's algorithm - a spanning tree means all vertices must be connected. So the two disjoint subsets of vertices must be connected to make a Spanning  Tree. And they must be connected with the minimum weight edge to make it a Minimum Spanning Tree.

**Steps for Prim's Algorithm:**

1) Create a set mstSet that keeps track of vertices already included in Minimum Spanning Tree.
2) Assign a key value to all vertices in the input graph. Initialize all key values as INFINITE. Assign key value as 0 for the first vertex so that it is picked first.
3) While mstSet doesn't include all vertices:
        i) Pick a vertex u which is not there in mstSet and has minimum key value.
       ii) Include u to mstSet.
      iii) Update key value of all adjacent vertices of u. To update the key values, iterate through all adjacent vertices. For every adjacent vertex v, if                  weight of edge u-v is less than the previous key value of v, update the key value as weight of u-v.

**Implementation in Java:**

Input parameters- 1) adj - Adjacency list representation of the graph.
                  2) s - source node

```java title="Prim.java"
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

**Input:**

```plaintext
{ { 0, 2, 0, 6, 0 },
  { 2, 0, 3, 8, 5 },
  { 0, 3, 0, 0, 7 },
  { 6, 8, 0, 0, 9 },
  { 0, 5, 7, 9, 0 } }
```

**Output:**

```plaintext
Edge   Weight
0 - 1    2
1 - 2    3
0 - 3    6
1 - 4    5
```

**Complexity Analysis:**

- Time Complexity -  $O(V^2)$
- Space Complexity - $O(V)$

## Dijkstra's Algorithm for Shortest Path in a Weighted Graph

Dijkstra's algorithm is a variation of the BFS algorithm. In Dijkstra's Algorithm, a SPT(shortest path tree) is generated with given source as root. Each node at this SPT stores the value of the shortest path from the source vertex to the current vertex. We maintain two sets, one set contains vertices included in shortest path tree, other set includes vertices not yet included in shortest path tree. At every step of the algorithm, we find a vertex which is in the other set (set of not yet included) and has a minimum distance from the source.

**Steps for Dijkstra's Algorithm :**

1) Create a set sptSet (shortest path tree set) that keeps track of vertices included in shortest path tree, i.e., whose minimum distance from source is calculated and finalized. Initially, this set is empty.
2) Assign a distance value to all vertices in the input graph. Initialize all distance values as INFINITE. Assign distance value as 0 for the source vertex so that it is picked first.
3) While sptSet doesn't include all vertices:
     i) Pick a vertex u which is not there in sptSet and has minimum distance value.
    ii) Include u to sptSet.
   iii) Update distance value of all adjacent vertices of u. To update the distance values, iterate through all adjacent vertices. For every adjacent vertex v, if sum of distance value of u (from source) and weight of edge u-v, is less than the distance value of v, then update the distance value of v.


**Implementation in Java:**

Input parameters- 1) adj - Adjacency list representation of the graph.
                  2) s - source node

```java title="Dijkstra.java"
static final int V = 9; 
    int minDistance(int dist[], Boolean sptSet[]) 
    { 
        // Initialize min value 
        int min = Integer.MAX_VALUE, min_index = -1; 
  
        for (int v = 0; v < V; v++) 
            if (sptSet[v] == false && dist[v] <= min) { 
                min = dist[v]; 
                min_index = v; 
            } 
  
        return min_index; 
    } 
  
    // A utility function to print the constructed distance array 
    void printSolution(int dist[], int n) 
    { 
        System.out.println("Vertex   Distance from Source\n"); 
        for (int i = 0; i < V; i++) 
            System.out.println(i + "                " + dist[i]+"\n"); 
    } 
  
    // Function that implements Dijkstra's single source shortest path 
    // algorithm for a graph represented using adjacency matrix 
    // representation 
    void dijkstra(int graph[][], int src) 
    { 
        int dist[] = new int[V]; // The output array. dist[i] will hold 
        // the shortest distance from src to i 
  
        // sptSet[i] will true if vertex i is included in shortest 
        // path tree or shortest distance from src to i is finalized 
        Boolean sptSet[] = new Boolean[V]; 
  
        // Initialize all distances as INFINITE and stpSet[] as false 
        for (int i = 0; i < V; i++) { 
            dist[i] = Integer.MAX_VALUE; 
            sptSet[i] = false; 
        } 
  
        // Distance of source vertex from itself is always 0 
        dist[src] = 0; 
  
        // Find shortest path for all vertices 
        for (int count = 0; count < V - 1; count++) { 
            // Pick the minimum distance vertex from the set of vertices 
            // not yet processed. u is always equal to src in first 
            // iteration. 
            int u = minDistance(dist, sptSet); 
  
            // Mark the picked vertex as processed 
            sptSet[u] = true; 
  
            // Update dist value of the adjacent vertices of the 
            // picked vertex. 
            for (int v = 0; v < V; v++) 
  
                // Update dist[v] only if is not in sptSet, there is an 
                // edge from u to v, and total weight of path from src to 
                // v through u is smaller than current value of dist[v] 
                if (!sptSet[v] && graph[u][v] != 0 &&  
                   dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) 
                    dist[v] = dist[u] + graph[u][v]; 
        } 
  
        // print the constructed distance array 
        printSolution(dist, V); 
    }
```

**Input:**

```plaintext
{ { 0, 4, 0, 0, 0, 0, 0, 8, 0 }, 
  { 4, 0, 8, 0, 0, 0, 0, 11, 0 }, 
  { 0, 8, 0, 7, 0, 4, 0, 0, 2 }, 
  { 0, 0, 7, 0, 9, 14, 0, 0, 0 }, 
  { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
  { 0, 0, 4, 14, 10, 0, 2, 0, 0 }, 
  { 0, 0, 0, 0, 0, 2, 0, 1, 6 }, 
  { 8, 11, 0, 0, 0, 0, 1, 0, 7 }, 
  { 0, 0, 2, 0, 0, 0, 6, 7, 0 } }
```

**Output:**

```plaintext
Vertex   Distance from Source
0                0
1                4
2                12
3                19
4                21
5                11
6                9
7                8
8                14
```

**Complexity Analysis :**

- Time Complexity - $O(E * logV)$
- Space Complexity - $O(V)$

<AdsComponent adSlot="5461416177" />

## Kosaraju's Algorithm for finding Strongly Connected Components

A directed graph is strongly connected if there is a path between all pairs of vertices. A strongly connected component of a directed graph is a maximal strongly connected subgraph.

**Steps for Kosaraju's Algorithm:**

1) Create an empty stack 'S' and do DFS traversal of a graph. In DFS traversal, after calling recursive DFS for adjacent vertices of a vertex, push the vertex to stack.
2) Reverse directions of all arcs to obtain the transpose graph.
3) One by one pop a vertex from S while S is not empty. Let the popped vertex be 'v'. Take v as source and do DFS (call DFSUtil(v)). The DFS starting from v prints strongly connected component of v. In the above example, we process vertices in order 0, 3, 4, 2, 1 (One by one popped from stack).

**Implementation in Java:**

```java title="Kosaraju.java"
private int V;   // No. of vertices
    private LinkedList<Integer> adj[]; //Adjacency List

    //Constructor
    Graph(int v)
    {
        V = v;
        adj = new LinkedList[v];
        for (int i=0; i<v; ++i)
            adj[i] = new LinkedList();
    }

    //Function to add an edge into the graph
    void addEdge(int v, int w)  { adj[v].add(w); }

    // A recursive function to print DFS starting from v
    void DFSUtil(int v,boolean visited[])
    {
        // Mark the current node as visited and print it
        visited[v] = true;
        System.out.print(v + " ");

        int n;

        // Recur for all the vertices adjacent to this vertex
        Iterator<Integer> i =adj[v].iterator();
        while (i.hasNext())
        {
            n = i.next();
            if (!visited[n])
                DFSUtil(n,visited);
        }
    }

    // Function that returns reverse (or transpose) of this graph
    Graph getTranspose()
    {
        Graph g = new Graph(V);
        for (int v = 0; v < V; v++)
        {
            // Recur for all the vertices adjacent to this vertex
            Iterator<Integer> i =adj[v].listIterator();
            while(i.hasNext())
                g.adj[i.next()].add(v);
        }
        return g;
    }

    void fillOrder(int v, boolean visited[], Stack stack)
    {
        // Mark the current node as visited and print it
        visited[v] = true;

        // Recur for all the vertices adjacent to this vertex
        Iterator<Integer> i = adj[v].iterator();
        while (i.hasNext())
        {
            int n = i.next();
            if(!visited[n])
                fillOrder(n, visited, stack);
        }

        // All vertices reachable from v are processed by now,
        // push v to Stack
        stack.push(new Integer(v));
    }

    // The main function that finds and prints all strongly
    // connected components
    void printSCCs()
    {
        Stack stack = new Stack();

        // Mark all the vertices as not visited (For first DFS)
        boolean visited[] = new boolean[V];
        for(int i = 0; i < V; i++)
            visited[i] = false;

        // Fill vertices in stack according to their finishing
        // times
        for (int i = 0; i < V; i++)
            if (visited[i] == false)
                fillOrder(i, visited, stack);

        // Create a reversed graph
        Graph gr = getTranspose();

        // Mark all the vertices as not visited (For second DFS)
        for (int i = 0; i < V; i++)
            visited[i] = false;

        // Now process all vertices in order defined by Stack
        while (stack.empty() == false)
        {
            // Pop a vertex from stack
            int v = (int)stack.pop();

            // Print Strongly connected component of the popped vertex
            if (visited[v] == false)
            {
                gr.DFSUtil(v, visited);
                System.out.println();
            }
        }
    }
```

**Input:**

```plaintext
1 0
0 2
2 1
0 3
3 4
```

**Output:**

```plaintext
0 1 2
3
4
```

**Complexity Analysis :**

- Time Complexity - $O(V+E)$
- Space Complexity - $O(V+E)$

## Kruskal's Algorithm

Steps for finding Minimum Spanning Tree using Kruskal's algorithm :
1) Sort all the edges in non-decreasing order of their weight. 
2) Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge. Else, discard it. 
3) Repeat step#2 until there are (V-1) edges in the spanning tree.

**Implementation in Java:** 

```java title="Kruskal.java"
class Graph {
    // A class to represent a graph edge
    class Edge implements Comparable<Edge> 
    {
        int src, dest, weight;

        // Comparator function used for 
        // sorting edgesbased on their weight
        public int compareTo(Edge compareEdge)
        {
            return this.weight - compareEdge.weight;
        }
    };

    // A class to represent a subset for 
    // union-find
    class subset 
    {
        int parent, rank;
    };

    int V, E; // V-> no. of vertices & E->no.of edges
    Edge edge[]; // collection of all edges

    // Creates a graph with V vertices and E edges
    Graph(int v, int e)
    {
        V = v;
        E = e;
        edge = new Edge[E];
        for (int i = 0; i < e; ++i)
            edge[i] = new Edge();
    }

    // A utility function to find set of an 
    // element i (uses path compression technique)
    int find(subset subsets[], int i)
    {
        // find root and make root as parent of i 
        // (path compression)
        if (subsets[i].parent != i)
            subsets[i].parent
                = find(subsets, subsets[i].parent);

        return subsets[i].parent;
    }

    // A function that does union of two sets 
    // of x and y (uses union by rank)
    void Union(subset subsets[], int x, int y)
    {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);

        // Attach smaller rank tree under root 
        // of high rank tree (Union by Rank)
        if (subsets[xroot].rank 
            < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank 
                 > subsets[yroot].rank)
            subsets[yroot].parent = xroot;

        // If ranks are same, then make one as 
        // root and increment its rank by one
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }

    // The main function to construct MST using Kruskal's
    // algorithm
    void KruskalMST()
    {
        // This will store the resultant MST
        Edge result[] = new Edge[V]; 
      
        // An index variable, used for result[]
        int e = 0; 
      
        // An index variable, used for sorted edges
        int i = 0; 
        for (i = 0; i < V; ++i)
            result[i] = new Edge();

        // Step 1:  Sort all the edges in non-decreasing
        // order of their weight.  If we are not allowed to
        // change the given graph, we can create a copy of
        // array of edges
        Arrays.sort(edge);

        // Allocate memory for creating V subsets
        subset subsets[] = new subset[V];
        for (i = 0; i < V; ++i)
            subsets[i] = new subset();

        // Create V subsets with single elements
        for (int v = 0; v < V; ++v) 
        {
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }

        i = 0; // Index used to pick next edge

        // Number of edges to be taken is equal to V-1
        while (e < V - 1) 
        {
            // Step 2: Pick the smallest edge. And increment
            // the index for next iteration
            Edge next_edge = edge[i++];

            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);

            // If including this edge doesn't cause cycle,
            // include it in result and increment the index
            // of result for next edge
            if (x != y) {
                result[e++] = next_edge;
                Union(subsets, x, y);
            }
            // Else discard the next_edge
        }

        // print the contents of result[] to display
        // the built MST
        System.out.println("Following are the edges in "
                           + "the constructed MST");
        int minimumCost = 0;
        for (i = 0; i < e; ++i)
        {
            System.out.println(result[i].src + " -- "
                               + result[i].dest
                               + " == " + result[i].weight);
            minimumCost += result[i].weight;
        }
        System.out.println("Minimum Cost Spanning Tree " 
                           + minimumCost);
    }

    // Driver Code
    public static void main(String[] args)
    {

        /* Let us create following weighted graph
                 10
            0--------1
            |  \     |
           6|   5\   |15
            |      \ |
            2--------3
                4       */
        int V = 4; // Number of vertices in graph
        int E = 5; // Number of edges in graph
        Graph graph = new Graph(V, E);

        // add edge 0-1
        graph.edge[0].src = 0;
        graph.edge[0].dest = 1;
        graph.edge[0].weight = 10;

        // add edge 0-2
        graph.edge[1].src = 0;
        graph.edge[1].dest = 2;
        graph.edge[1].weight = 6;

        // add edge 0-3
        graph.edge[2].src = 0;
        graph.edge[2].dest = 3;
        graph.edge[2].weight = 5;

        // add edge 1-3
        graph.edge[3].src = 1;
        graph.edge[3].dest = 3;
        graph.edge[3].weight = 15;

        // add edge 2-3
        graph.edge[4].src = 2;
        graph.edge[4].dest = 3;
        graph.edge[4].weight = 4;

        // Function call
        graph.KruskalMST();
    }
}
```

**Output:**

```plaintext
Following are the edges in the constructed MST
2 -- 3 == 4
0 -- 3 == 5
0 -- 1 == 10
Minimum Cost Spanning Tree: 19
```

**Complexity Analysis:**

- Time Complexity - $O(ElogV)$
- Space Complexity - $O(V+E)$

<AdsComponent adSlot="3270832720" />

## Bellman-Ford Algorithm for Shortest Path

Given a graph and a source vertex src in graph, find shortest paths from src to all vertices in the given graph. The graph may contain negative weight edges.

Steps for Bellman-Ford Algorithm for finding Shortest Path :
Input: Graph and a source vertex src.
Output: Shortest distance to all vertices from src. If there is a negative weight cycle, then shortest distances are not calculated, negative weight cycle is reported.

1) This step initializes distances from source to all vertices as infinite and distance to source itself as 0. Create an array dist[] of size |V| with all values as infinite except dist[src] where src is source vertex.
2) This step calculates shortest distances. Do following |V|-1 times where |V| is the number of vertices in given graph. Do following for each edge u-v:
      i) If dist[v] greater than dist[u] + weight of edge uv, then update dist[v] as: dist[v] = dist[u] + weight of edge uv.
3) This step reports if there is a negative weight cycle in graph. Do following for each edge u-v. If dist[v] greater than dist[u] + weight of edge uv, then "Graph contains negative weight cycle".

**Implementation on Java :**

```java title="BellmanFord.java"
class Graph
{
    // A class to represent a weighted edge in graph
    class Edge {
        int src, dest, weight;
        Edge() {
            src = dest = weight = 0;
        }
    };

    int V, E;
    Edge edge[];

    // Creates a graph with V vertices and E edges
    Graph(int v, int e)
    {
        V = v;
        E = e;
        edge = new Edge[e];
        for (int i=0; i<e; ++i)
            edge[i] = new Edge();
    }

    // The main function that finds shortest distances from src
    // to all other vertices using Bellman-Ford algorithm.  The
    // function also detects negative weight cycle
    void BellmanFord(Graph graph,int src)
    {
        int V = graph.V, E = graph.E;
        int dist[] = new int[V];

        // Step 1: Initialize distances from src to all other
        // vertices as INFINITE
        for (int i=0; i<V; ++i)
            dist[i] = Integer.MAX_VALUE;
        dist[src] = 0;

        // Step 2: Relax all edges |V| - 1 times. A simple
        // shortest path from src to any other vertex can
        // have at-most |V| - 1 edges
        for (int i=1; i<V; ++i)
        {
            for (int j=0; j<E; ++j)
            {
                int u = graph.edge[j].src;
                int v = graph.edge[j].dest;
                int weight = graph.edge[j].weight;
                if (dist[u]!=Integer.MAX_VALUE &&
                    dist[u]+weight<dist[v])
                    dist[v]=dist[u]+weight;
            }
        }

        // Step 3: check for negative-weight cycles.  The above
        // step guarantees shortest distances if graph doesn't
        // contain negative weight cycle. If we get a shorter
        //  path, then there is a cycle.
        for (int j=0; j<E; ++j)
        {
            int u = graph.edge[j].src;
            int v = graph.edge[j].dest;
            int weight = graph.edge[j].weight;
            if (dist[u] != Integer.MAX_VALUE &&
                dist[u]+weight < dist[v])
              System.out.println("Graph contains negative weight cycle");
        }
        printArr(dist, V);
    }

    // A utility function used to print the solution
    void printArr(int dist[], int V)
    {
        System.out.println("Vertex   Distance from Source");
        for (int i=0; i<V; ++i)
            System.out.println(i+"\t\t"+dist[i]);
    }

    // Driver method to test above function
    public static void main(String[] args)
    {
        int V = 5;  // Number of vertices in graph
        int E = 8;  // Number of edges in graph

        Graph graph = new Graph(V, E);

        // add edge 0-1 (or A-B in above figure)
        graph.edge[0].src = 0;
        graph.edge[0].dest = 1;
        graph.edge[0].weight = -1;

        // add edge 0-2 (or A-C in above figure)
        graph.edge[1].src = 0;
        graph.edge[1].dest = 2;
        graph.edge[1].weight = 4;

        // add edge 1-2 (or B-C in above figure)
        graph.edge[2].src = 1;
        graph.edge[2].dest = 2;
        graph.edge[2].weight = 3;

        // add edge 1-3 (or B-D in above figure)
        graph.edge[3].src = 1;
        graph.edge[3].dest = 3;
        graph.edge[3].weight = 2;

        // add edge 1-4 (or A-E in above figure)
        graph.edge[4].src = 1;
        graph.edge[4].dest = 4;
        graph.edge[4].weight = 2;

        // add edge 3-2 (or D-C in above figure)
        graph.edge[5].src = 3;
        graph.edge[5].dest = 2;
        graph.edge[5].weight = 5;

        // add edge 3-1 (or D-B in above figure)
        graph.edge[6].src = 3;
        graph.edge[6].dest = 1;
        graph.edge[6].weight = 1;

        // add edge 4-3 (or E-D in above figure)
        graph.edge[7].src = 4;
        graph.edge[7].dest = 3;
        graph.edge[7].weight = -3;

        graph.BellmanFord(graph, 0);
    }
}
```

**Output:**

```plaintext
Vertex   Distance from Source
0                0
1                -1
2                2
3                -2
4                1
```

## Tarjan's Algorithm

A directed graph is strongly connected if there is a path between all pairs of vertices. A strongly connected component (SCC) of a directed graph is a maximal strongly connected subgraph. For example, there are 3 SCCs in the following graph.

**Steps for Tarjan's Algorithm :** 

1) DFS search produces a DFS tree/forest 
2) Strongly Connected Components form subtrees of the DFS tree. 
3) If we can find the head of such subtrees, we can print/store all the nodes in that subtree (including the head) and that will be one SCC. 
There is no back edge from one SCC to another (There can be cross edges, but cross edges will not be used while processing the graph).

**Implementation in Java:**

```java title="Tarjan's Algorithm"
class Graph{

// No. of vertices    
private int V; 

//Adjacency Lists 
private LinkedList<Integer> adj[]; 
private int Time;

// Constructor 
@SuppressWarnings("unchecked")
Graph(int v) 
{ 
    V = v; 
    adj = new LinkedList[v];
    
    for(int i = 0; i < v; ++i) 
        adj[i] = new LinkedList(); 
        
    Time = 0;
} 

// Function to add an edge into the graph 
void addEdge(int v,int w) 
{ 
    adj[v].add(w); 
} 

// A recursive function that finds and prints strongly 
// connected components using DFS traversal 
// u --> The vertex to be visited next 
// disc[] --> Stores discovery times of visited vertices 
// low[] -- >> earliest visited vertex (the vertex with
//             minimum discovery time) that can be reached
//             from subtree rooted with current vertex 
// st -- >> To store all the connected ancestors (could be part 
//         of SCC) 
// stackMember[] --> bit/index array for faster check
//                   whether a node is in stack 
void SCCUtil(int u, int low[], int disc[],
             boolean stackMember[], 
             Stack<Integer> st)
{
    
    // Initialize discovery time and low value 
    disc[u] = Time; 
    low[u] = Time; 
    Time += 1;
    stackMember[u] = true;
    st.push(u);

    int n;
    
    // Go through all vertices adjacent to this 
    Iterator<Integer> i = adj[u].iterator(); 
    
    while (i.hasNext()) 
    { 
        n = i.next(); 
        
        if (disc[n] == -1) 
        {
            SCCUtil(n, low, disc, stackMember, st);
            
            // Check if the subtree rooted with v 
            // has a connection to one of the 
            // ancestors of u 
            // Case 1 (per above discussion on
            // Disc and Low value) 
            low[u] = Math.min(low[u], low[n]);
        }
        else if (stackMember[n] == true)
        {
            
            // Update low value of 'u' only if 'v' is
            // still in stack (i.e. it's a back edge, 
            // not cross edge). 
            // Case 2 (per above discussion on Disc
            // and Low value)
            low[u] = Math.min(low[u], disc[n]);
        }
    } 

    // head node found, pop the stack and print an SCC 
    // To store stack extracted vertices 
    int w = -1; 
    if (low[u] == disc[u])
    {
        while (w != u)
        { 
            w = (int)st.pop();
            System.out.print(w + " ");
            stackMember[w] = false;
        }
        System.out.println(); 
    }
}

// The function to do DFS traversal.
// It uses SCCUtil() 
void SCC()
{
    
    // Mark all the vertices as not visited 
    // and Initialize parent and visited, 
    // and ap(articulation point) arrays 
    int disc[] = new int[V]; 
    int low[] = new int[V]; 
    for(int i = 0;i < V; i++)
    {
        disc[i] = -1;
        low[i] = -1;
    }
    
    boolean stackMember[] = new boolean[V]; 
    Stack<Integer> st = new Stack<Integer>(); 
    
    // Call the recursive helper function 
    // to find articulation points 
    // in DFS tree rooted with vertex 'i' 
    for(int i = 0; i < V; i++)
    {
        if (disc[i] == -1)
            SCCUtil(i, low, disc,
                    stackMember, st);
    }
}

// Driver code
public static void main(String args[]) 
{ 
    
    // Create a graph given in the above diagram 
    Graph g1 = new Graph(5); 

    g1.addEdge(1, 0);
    g1.addEdge(0, 2);
    g1.addEdge(2, 1);
    g1.addEdge(0, 3);
    g1.addEdge(3, 4);
    System.out.println("SSC in first graph ");
    g1.SCC();

    Graph g2 = new Graph(4);
    g2.addEdge(0, 1);
    g2.addEdge(1, 2);
    g2.addEdge(2, 3);
    System.out.println("\nSSC in second graph ");
    g2.SCC();
    
    Graph g3 = new Graph(7);
    g3.addEdge(0, 1);
    g3.addEdge(1, 2);
    g3.addEdge(2, 0);
    g3.addEdge(1, 3);
    g3.addEdge(1, 4);
    g3.addEdge(1, 6);
    g3.addEdge(3, 5);
    g3.addEdge(4, 5);
    System.out.println("\nSSC in third graph ");
    g3.SCC();
    
    Graph g4 = new Graph(11);
    g4.addEdge(0, 1);
    g4.addEdge(0, 3);
    g4.addEdge(1, 2);
    g4.addEdge(1, 4);
    g4.addEdge(2, 0);
    g4.addEdge(2, 6);
    g4.addEdge(3, 2);
    g4.addEdge(4, 5);
    g4.addEdge(4, 6);
    g4.addEdge(5, 6);
    g4.addEdge(5, 7);
    g4.addEdge(5, 8);
    g4.addEdge(5, 9);
    g4.addEdge(6, 4);
    g4.addEdge(7, 9);
    g4.addEdge(8, 9);
    g4.addEdge(9, 8);
    System.out.println("\nSSC in fourth graph ");
    g4.SCC(); 
    
    Graph g5 = new Graph (5);
    g5.addEdge(0, 1);
    g5.addEdge(1, 2);
    g5.addEdge(2, 3);
    g5.addEdge(2, 4);
    g5.addEdge(3, 0);
    g5.addEdge(4, 2);
    System.out.println("\nSSC in fifth graph ");
    g5.SCC();
} 
} 
```

**Output :**

```plaintext
SCCs in first graph 
4
3
1 2 0

SCCs in second graph 
3
2
1
0

SCCs in third graph 
5
3
4
6
2 1 0

SCCs in fourth graph 
8 9
7
5 4 6
3 2 1 0
10

SCCs in fifth graph 
4 3 2 1 0
```

**Complexity Analysis :**

- Time Complexity - $O(V+E)$
- Space Complexity - $O(V+E)$

## Conclusion

In this article, we have discussed various graph algorithms like Dijkstra's Algorithm, Prim's Algorithm, Kruskal's Algorithm, Bellman-Ford Algorithm, Tarjan's Algorithm. We have also discussed the implementation of these algorithms in Java. These algorithms are used to solve various graph problems like finding the shortest path, finding the minimum spanning tree, finding the strongly connected components, etc.