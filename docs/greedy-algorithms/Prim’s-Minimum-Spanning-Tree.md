---
id: prims-mst
title: Prim's Minimum Spanning Tree (MST)
sidebar_label: Prim's MST
description: "This repository implements Prim's algorithm for finding the Minimum Spanning Tree (MST) of a graph, using a greedy approach to minimize the total edge weight."
tags: [dsa, algorithms, greedy algorithms, graph algorithms, minimum spanning tree]
---

### Definition:

Prim’s algorithm is a **greedy algorithm** that finds the **Minimum Spanning Tree (MST)** for a connected, undirected graph. The MST is a subgraph that connects all vertices of the graph with the minimum total edge weight, without forming cycles.

### Characteristics:

- **Greedy Approach**:  
  Prim's algorithm builds the MST by selecting the smallest edge that connects a vertex in the MST to a vertex not yet included in the MST. This process repeats until all vertices are included.

1. **Start with Any Vertex**:  
   The algorithm begins with an arbitrary vertex and adds it to the MST. It then finds the smallest edge that connects this vertex to an unvisited vertex.

2. **Update Minimum Cost Edges**:  
   After each step, the algorithm updates the edges that connect the vertices in the MST to the remaining unvisited vertices, ensuring the minimum cost edge is always selected.

3. **Repeat Until All Vertices Are Included**:  
   The process continues until all vertices of the graph are part of the MST.

### Problem Statement:

Given a connected, undirected graph with `V` vertices and `E` edges, the objective is to construct a Minimum Spanning Tree (MST). Prim's algorithm starts from a single vertex and progressively adds edges that have the least weight and connect unvisited vertices, ensuring that all vertices are eventually included in the MST.

### Time Complexity:

- **Time Complexity: $O(E \log V)$**  
  With the use of a priority queue (min-heap), Prim’s algorithm runs in $O(E \log V)$ time, where `E` is the number of edges and `V` is the number of vertices.

### Space Complexity:

- **Space Complexity: $O(V + E)$**  
  The space complexity is dominated by the graph representation and the additional data structures used for storing the MST and priority queue, resulting in a space complexity of $O(V + E)$.

### Example:

Consider the following graph:

---
id: prims-mst
title: Prim's Minimum Spanning Tree (MST)
sidebar_label: Prim's MST
description: "This repository implements Prim's algorithm for finding the Minimum Spanning Tree (MST) of a graph, using a greedy approach to minimize the total edge weight."
tags: [dsa, algorithms, greedy algorithms, graph algorithms, minimum spanning tree]
---

### Definition:

Prim’s algorithm is a **greedy algorithm** that finds the **Minimum Spanning Tree (MST)** for a connected, undirected graph. The MST is a subgraph that connects all vertices of the graph with the minimum total edge weight, without forming cycles.

### Characteristics:

- **Greedy Approach**:  
  Prim's algorithm builds the MST by selecting the smallest edge that connects a vertex in the MST to a vertex not yet included in the MST. This process repeats until all vertices are included.

1. **Start with Any Vertex**:  
   The algorithm begins with an arbitrary vertex and adds it to the MST. It then finds the smallest edge that connects this vertex to an unvisited vertex.

2. **Update Minimum Cost Edges**:  
   After each step, the algorithm updates the edges that connect the vertices in the MST to the remaining unvisited vertices, ensuring the minimum cost edge is always selected.

3. **Repeat Until All Vertices Are Included**:  
   The process continues until all vertices of the graph are part of the MST.

### Problem Statement:

Given a connected, undirected graph with `V` vertices and `E` edges, the objective is to construct a Minimum Spanning Tree (MST). Prim's algorithm starts from a single vertex and progressively adds edges that have the least weight and connect unvisited vertices, ensuring that all vertices are eventually included in the MST.

### Time Complexity:

- **Time Complexity: $O(E \log V)$**  
  With the use of a priority queue (min-heap), Prim’s algorithm runs in $O(E \log V)$ time, where `E` is the number of edges and `V` is the number of vertices.

### Space Complexity:

- **Space Complexity: $O(V + E)$**  
  The space complexity is dominated by the graph representation and the additional data structures used for storing the MST and priority queue, resulting in a space complexity of $O(V + E)$.

### Example:

Consider the following graph:


Graph Representation:

- Vertices: `{A, B, C, D, E, F}`
- Edges: `A-B(2), A-D(6), B-C(3), B-E(8), C-F(7), E-F(9), E-D(5)`

Step-by-Step Execution:

1. **Start with Vertex A**:  
   Add vertex `A` to the MST and add its edges to the priority queue: `{A-B(2), A-D(6)}`.

2. **Choose Edge with Minimum Weight**:  
   The minimum edge is `A-B(2)`. Add vertex `B` to the MST and update the queue with its edges: `{B-C(3), B-E(8), A-D(6)}`.

3. **Repeat the Process**:  
   - Add edge `B-C(3)` and vertex `C` to the MST.
   - Continue selecting the minimum weight edge until all vertices are included in the MST.

The resulting MST:

- Selected edges: `A-B(2), B-C(3), A-D(6), D-E(5), C-F(7)`
- Total weight: `2 + 3 + 6 + 5 + 7 = 23`

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <utility>
using namespace std;

// Function to implement Prim's algorithm
void primMST(vector<vector<pair<int, int>>> &graph, int V) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> key(V, INT_MAX); // Tracks minimum edge weight to each vertex
    vector<int> parent(V, -1);   // Stores MST
    vector<bool> inMST(V, false); // Tracks vertices in MST
    
    int startVertex = 0; // Start from vertex 0
    key[startVertex] = 0;
    pq.push({0, startVertex});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        if (inMST[u]) continue;
        inMST[u] = true;
        
        for (auto &[v, weight] : graph[u]) {
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                pq.push({key[v], v});
                parent[v] = u;
            }
        }
    }
    
    // Print the MST
    cout << "Edge   Weight\n";
    for (int i = 1; i < V; i++) {
        cout << parent[i] << " - " << i << "    " << key[i] << endl;
    }
}

int main() {
    int V = 6; // Number of vertices
    vector<vector<pair<int, int>>> graph(V);
    
    // Add edges to the graph
    graph[0].push_back({1, 2});
    graph[0].push_back({3, 6});
    graph[1].push_back({0, 2});
    graph[1].push_back({2, 3});
    graph[1].push_back({4, 8});
    graph[2].push_back({1, 3});
    graph[2].push_back({5, 7});
    graph[3].push_back({0, 6});
    graph[3].push_back({4, 5});
    graph[4].push_back({1, 8});
    graph[4].push_back({3, 5});
    graph[4].push_back({5, 9});
    graph[5].push_back({2, 7});
    graph[5].push_back({4, 9});
    
    primMST(graph, V);
    
    return 0;
}


Summary:
Prim’s Minimum Spanning Tree algorithm efficiently constructs an MST by using a greedy strategy to select the smallest edges that connect the tree to unvisited vertices. With a time complexity of $O(E \log V)$, Prim's algorithm is highly efficient for finding the MST in graphs with many vertices and edges. The MST has applications in network design, circuit design, and more.