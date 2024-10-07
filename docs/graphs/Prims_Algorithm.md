# Prim's Algorithm for Minimum Spanning Tree (MST)

## Introduction
Prim's Algorithm is a greedy algorithm that finds the Minimum Spanning Tree (MST) of a connected, undirected, and weighted graph. The MST is a subgraph that connects all the vertices with the minimum total edge weight and contains no cycles.

## Key Concepts
- **Greedy Approach**: The algorithm builds the MST by selecting the smallest weight edges that don't form a cycle.
- **Connected Graph**: The graph must be connected (every vertex is reachable).
- **Undirected Graph**: Edges between vertices are bidirectional.
- **Weighted Graph**: Each edge has a weight or cost, and the algorithm aims to minimize the sum of these weights.

## How Prim’s Algorithm Works
Prim's Algorithm starts from an arbitrary vertex and grows the MST one edge at a time. It continues until all vertices are included in the tree.

### Steps
1. **Initialization**:
    - Start with an empty MST.
    - Choose an arbitrary starting vertex and mark it as part of the MST.
    - Maintain a priority queue (min-heap) to store edges with minimum weights.
  
2. **Main Loop**:
    - Extract the smallest edge that connects a vertex inside the MST to a vertex outside the MST.
    - Add the selected edge and the new vertex to the MST.
    - Repeat until all vertices are in the MST.

3. **Termination**:
    - The algorithm stops when the MST contains \( V - 1 \) edges, where \( V \) is the number of vertices.

## Prim’s Algorithm in C++
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <utility>
#include <climits>

using namespace std;

// Pair to represent (weight, vertex) in the priority queue
typedef pair<int, int> pii;

void primsAlgorithm(int n, vector<vector<pii>>& graph) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> minWeight(n, INT_MAX);  // To store the minimum weight for each vertex
    vector<int> parent(n, -1);          // To store the parent of each vertex in the MST
    vector<bool> inMST(n, false);       // To track if a vertex is included in MST

    int start = 0;  // Starting from vertex 0
    pq.push({0, start});
    minWeight[start] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        if (inMST[u]) continue;  // Skip if vertex is already in MST

        inMST[u] = true;

        // Traverse adjacent vertices of u
        for (auto& neighbor : graph[u]) {
            int v = neighbor.first;
            int weight = neighbor.second;

            if (!inMST[v] && weight < minWeight[v]) {
                minWeight[v] = weight;
                parent[v] = u;
                pq.push({weight, v});
            }
        }
    }

    // Print MST edges and total weight
    int total_weight = 0;
    cout << "Minimum Spanning Tree Edges:\n";
    for (int i = 1; i < n; ++i) {
        cout << "Edge: " << parent[i] << " - " << i << " (Weight: " << minWeight[i] << ")\n";
        total_weight += minWeight[i];
    }
    cout << "Total weight of MST: " << total_weight << endl;
}

int main() {
    int n = 5;  // Number of vertices

    // Graph represented as an adjacency list
    vector<vector<pii>> graph(n);
    
    // Add edges to the graph (undirected)
    graph[0].push_back({1, 2});
    graph[0].push_back({3, 6});
    graph[1].push_back({0, 2});
    graph[1].push_back({2, 3});
    graph[1].push_back({3, 8});
    graph[1].push_back({4, 5});
    graph[2].push_back({1, 3});
    graph[2].push_back({4, 7});
    graph[3].push_back({0, 6});
    graph[3].push_back({1, 8});
    graph[4].push_back({1, 5});
    graph[4].push_back({2, 7});

    primsAlgorithm(n, graph);

    return 0;
}
## Explanation

- **Graph Representation**: An adjacency list is used, where each vertex has a list of its neighboring vertices and the corresponding edge weights.
  
- **Priority Queue (Min-Heap)**: Used to keep track of the minimum edge weights while growing the MST.

- **Parent Array**: Stores the parent of each vertex in the MST for constructing the tree.

- **Min Weight Array**: Keeps track of the minimum weight to connect each vertex to the MST.
## Time Complexity

The time complexity of Prim's Algorithm is \(O(E \log V)\), where:

- \(E\) is the number of edges.
- \(V\) is the number of vertices.

The use of a priority queue ensures that finding the smallest edge is efficient.

       2
   A ----- B
  /|      /|
 4 |    3  |
  / |   /  |
 C  | /    | 
 |  1/     |
 | /       |
  D ------- E
       6
## Step-by-Step Execution

1. Start with vertex A.
2. Choose the smallest edge (A-D, weight 1).
3. Add edge (A-B, weight 2).
4. Add edge (B-E, weight 3).
5. Add edge (A-C, weight 4).

The final MST includes edges (A-D), (A-B), (B-E), (A-C) with a total weight of 10.

## Prim’s Algorithm vs. Kruskal’s Algorithm

- **Prim's Algorithm**: Suitable for dense graphs; it builds the MST by adding the smallest edge from a vertex in the MST.

- **Kruskal's Algorithm**: Suitable for sparse graphs; it builds the MST by adding the smallest overall edge.

## Applications

- **Network Design**: Designing computer networks, telecommunications, or road networks.
  
- **Cabling and Wiring**: Laying cables between cities or buildings in an optimal way.

- **Cluster Analysis**: Used in hierarchical clustering for building an MST of a dataset.

## Conclusion

Prim's Algorithm is a fundamental algorithm used for finding the Minimum Spanning Tree in various graph-based problems. Its efficiency and real-world applications make it a powerful tool in computer science.



