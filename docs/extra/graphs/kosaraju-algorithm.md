---
id: kosaraju
title: Kosaraju's Algorithm
sidebar_label: Kosaraju's Algorithm
description: "In this blog post, we'll explore Kosaraju's Algorithm, an efficient algorithm used to find all Strongly Connected Components (SCCs) in a directed graph."
tags: [dsa, algorithms, strongly connected components]
---

### Definition:

Kosaraju's Algorithm is an efficient **depth-first search (DFS)-based** algorithm used to find all **Strongly Connected Components (SCCs)** in a directed graph. A strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex in that subgraph.

### Characteristics:

- **Strongly Connected Components (SCCs)**:

  - A **strongly connected component (SCC)** is a subset of vertices such that every vertex is reachable from any other vertex within that subset.

- **Two Pass DFS**:

  - Kosaraju's algorithm performs **two depth-first searches** (DFS) on the graph. The first DFS is used to determine the finishing order of vertices. The second DFS is done on the transpose (reversed) graph to find SCCs in the order of decreasing finish times.

- **Transpose Graph**:

  - The **transpose of a directed graph** is a graph in which all the edges are reversed.

- **Linear Time Complexity**:
  - Kosaraju's algorithm works in **O(V + E)** time, where `V` is the number of vertices and `E` is the number of edges. This makes it an efficient algorithm for large graphs.

### Time Complexity:

- **Best, Average, and Worst Case: O(V + E)**  
  The algorithm performs two depth-first searches and a graph reversal, all of which run in linear time with respect to the number of vertices and edges.

### Space Complexity:

- **Space Complexity: O(V + E)**  
  The algorithm requires space for storing the graph, its transpose, and auxiliary structures like the visited array and stack. This results in O(V + E) space complexity.

### Steps of Kosaraju's Algorithm:

1. **First DFS on the Original Graph**:

   - Perform a DFS on the original graph, keeping track of the **finishing times** of each vertex. This information is used to order vertices for the second DFS.

2. **Transpose the Graph**:

   - Reverse the direction of all edges in the graph to create the **transpose graph**.

3. **Second DFS on the Transpose Graph**:
   - Perform a DFS on the transpose graph, processing vertices in decreasing order of their finishing times from the first DFS. Each DFS tree formed in this step corresponds to a **strongly connected component**.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class Graph {
public:
    int V; // Number of vertices
    vector<vector<int>> adj; // Adjacency list

    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    // Add edge to the graph
    void addEdge(int u, int v) {
        adj[u].push_back(v);
    }

    // First DFS to fill stack with vertices based on finish times
    void DFS(int v, vector<bool>& visited, stack<int>& Stack) {
        visited[v] = true;
        for (int i : adj[v])
            if (!visited[i])
                DFS(i, visited, Stack);
        Stack.push(v);
    }

    // DFS on transpose graph to find SCCs
    void DFSUtil(int v, vector<bool>& visited) {
        visited[v] = true;
        cout << v << " ";
        for (int i : adj[v])
            if (!visited[i])
                DFSUtil(i, visited);
    }

    // Function to get the transpose of the graph
    Graph getTranspose() {
        Graph gT(V);
        for (int v = 0; v < V; v++) {
            for (int i : adj[v])
                gT.adj[i].push_back(v);
        }
        return gT;
    }

    // Function to find and print all SCCs
    void findSCCs() {
        stack<int> Stack;

        // Step 1: Fill the stack with vertices according to their finishing times
        vector<bool> visited(V, false);
        for (int i = 0; i < V; i++)
            if (!visited[i])
                DFS(i, visited, Stack);

        // Step 2: Transpose the graph
        Graph gT = getTranspose();

        // Step 3: Process all vertices in the order of their finishing times
        fill(visited.begin(), visited.end(), false); // Reset visited array
        while (!Stack.empty()) {
            int v = Stack.top();
            Stack.pop();

            // Perform DFS on the transpose graph if vertex is not visited
            if (!visited[v]) {
                gT.DFSUtil(v, visited);
                cout << endl;
            }
        }
    }
};

int main() {
    Graph g(5);
    g.addEdge(1, 0);
    g.addEdge(0, 2);
    g.addEdge(2, 1);
    g.addEdge(0, 3);
    g.addEdge(3, 4);

    cout << "Strongly Connected Components (SCCs) are: \n";
    g.findSCCs();

    return 0;
}
```

### Java Implementation:

```java
import java.util.*;

class Graph{

    int V; // Number of vertices
    ArrayList<ArrayList<Integer>> adj = new ArrayList<>(); // Adjacency list

    public Graph(int V){
        this.V = V;
        for(int i=0; i<V; i++)
            adj.add(new ArrayList<>());
    }

    // Add edge to the graph
    public void addEdge(int u, int v){
        adj.get(u).add(v);
    }

    // First DFS to fill stack with vertices based on finish times
    void DFS(int v, boolean[] visited, Stack<Integer> stc)
    {
        visited[v] = true;

        for(int i : adj.get(v))
        {
            if(!visited[i])
                DFS(i, visited, stc);
        }
        stc.push(v);
    }

    // DFS on transpose graph to find SCCs
    void DFSUtil(int v, boolean[] visited){
        visited[v] = true;
        System.out.print(v + " ");
        for(int i : adj.get(v))
            if(!visited[i])
                DFSUtil(i, visited);
    }

    //Function to get the transpose of the graph
    Graph getTranspose(){
        Graph gT = new Graph(V);
        for(int v=0; v<V; v++)
        {
            for(int i : adj.get(v))
                gT.adj.get(i).add(v);
        }

        return gT;
    }

    // Function to find and print all SCCs
    void findSCCs() {
        Stack<Integer> stc = new Stack<>();

        // Step 1: Fill the stack with vertices according to their finishing times
        boolean[] visited = new boolean[V];
        Arrays.fill(visited, false);

        for(int i=0; i<V; i++)
            if(!visited[i])
                DFS(i, visited, stc);

        // Step 2: Transpose the graph
        Graph gT = getTranspose();

        // Step 3: Process all vertices in the order of their finishing times
        Arrays.fill(visited,false); // Reset visited array
        while(!stc.isEmpty())
        {
            int v = stc.pop();

            if(!visited[v])
            {
                gT.DFSUtil(v, visited);
                System.out.println();
            }
        }

    }
}

public class Main {
    public static void main(String args[]) {

        Graph g = new Graph(5);

        g.addEdge(1, 0);
        g.addEdge(0, 2);
        g.addEdge(2, 1);
        g.addEdge(0, 3);
        g.addEdge(3, 4);

        System.out.println("Strongly Connected Components (SCC) are :");
        g.findSCCs();

    }
}

```

#### Output

```java
Strongly Connected Components (SCC) are :
0 1 2
3
4
```
