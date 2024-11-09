---
id: Edmonds-Karp-Algorithm
sidebar_position: 4
title: Edmonds-Karp Algorithm
sidebar_label: Edmonds-Karp Algorithm
description: "The Edmonds-Karp algorithm is a flow network algorithm used to compute the maximum flow between a source and a sink in a flow network. It is an implementation of the Ford-Fulkerson method that uses breadth-first search (BFS) to find augmenting paths."
tags: [graph-theory, edmonds-karp, maximum-flow, ford-fulkerson, bfs, network-flow, algorithm]
---



The **Edmonds-Karp Algorithm** is an implementation of the Ford-Fulkerson method for computing the maximum flow in a flow network. It specifically uses **Breadth-First Search (BFS)** to find augmenting paths and calculate the maximum flow from a source to a sink node in a given network. This algorithm is commonly used in network flow analysis, including applications in transport, logistics, and matching problems.


## Definition

The Edmonds-Karp algorithm finds the maximum flow in a flow network by using the Ford-Fulkerson method with a Breadth-First Search to identify augmenting paths. By repeatedly finding augmenting paths from the source to the sink and updating the flow along these paths, the algorithm determines the maximum amount of flow that can be sent through the network.

## Characteristics

- Uses **Breadth-First Search (BFS)** to find the shortest path in terms of the number of edges from the source to the sink.
- Guarantees that each augmenting path found is the shortest possible path available in the residual graph.
- Suitable for networks with integer capacities, as it terminates after a finite number of augmenting paths.
- Deterministic, with a well-defined upper bound on the number of iterations.

## Time Complexity

The time complexity of the Edmonds-Karp algorithm is **O(V * E²)**, where:
- **V** is the number of vertices (nodes) in the graph.
- **E** is the number of edges.

This complexity arises from the BFS operation used to find paths, which takes **O(E)** time, and each augmenting path increases the flow, resulting in at most **O(V * E)** augmenting paths being processed.

## Space Complexity

The space complexity of the Edmonds-Karp algorithm is **O(V + E)**, where:
- **V** is the number of vertices (nodes).
- **E** is the number of edges.

This space complexity accounts for storing the graph (adjacency list or matrix), residual capacities, and the BFS queue.

## Approach

1. **Initialize the Flow Network**: Set the initial flow to 0 for all edges in the network.
2. **Create the Residual Graph**: This graph represents the remaining capacity of each edge after considering the current flow.
3. **BFS to Find Augmenting Path**: Using BFS, find an augmenting path from the source to the sink in the residual graph.
4. **Determine Bottleneck Capacity**: For the found path, determine the maximum flow (bottleneck) that can be added without violating the capacity constraints.
5. **Update Flows and Residual Capacities**: Increase the flow along the path by the bottleneck capacity and update the residual capacities.
6. **Repeat**: Repeat the BFS and path augmentation process until no more augmenting paths can be found from the source to the sink.
7. **Return Maximum Flow**: When no more paths are available, the sum of the flows from the source node to all other connected nodes is the maximum flow.

## C++ Implementation

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <climits>
using namespace std;

bool bfs(vector<vector<int>>& residualGraph, int source, int sink, vector<int>& parent) {
    int n = residualGraph.size();
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(source);
    visited[source] = true;
    parent[source] = -1;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v = 0; v < n; v++) {
            if (!visited[v] && residualGraph[u][v] > 0) {
                q.push(v);
                parent[v] = u;
                visited[v] = true;
                if (v == sink) return true;
            }
        }
    }
    return false;
}

int edmondsKarp(vector<vector<int>>& graph, int source, int sink) {
    int u, v;
    int n = graph.size();
    vector<vector<int>> residualGraph = graph;
    vector<int> parent(n);
    int maxFlow = 0;

    while (bfs(residualGraph, source, sink, parent)) {
        int pathFlow = INT_MAX;

        for (v = sink; v != source; v = parent[v]) {
            u = parent[v];
            pathFlow = min(pathFlow, residualGraph[u][v]);
        }

        for (v = sink; v != source; v = parent[v]) {
            u = parent[v];
            residualGraph[u][v] -= pathFlow;
            residualGraph[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}

int main() {
    vector<vector<int>> graph = {
        {0, 16, 13, 0, 0, 0},
        {0, 0, 10, 12, 0, 0},
        {0, 4, 0, 0, 14, 0},
        {0, 0, 9, 0, 0, 20},
        {0, 0, 0, 7, 0, 4},
        {0, 0, 0, 0, 0, 0}
    };

    cout << "The maximum possible flow is " << edmondsKarp(graph, 0, 5) << endl;
    return 0;
}
```

## Java Implementation

```java
import java.util.LinkedList;
import java.util.Queue;

public class EdmondsKarp {
    static final int V = 6;

    boolean bfs(int[][] residualGraph, int source, int sink, int[] parent) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        queue.add(source);
        visited[source] = true;
        parent[source] = -1;

        while (!queue.isEmpty()) {
            int u = queue.poll();

            for (int v = 0; v < V; v++) {
                if (!visited[v] && residualGraph[u][v] > 0) {
                    queue.add(v);
                    parent[v] = u;
                    visited[v] = true;
                    if (v == sink) return true;
                }
            }
        }
        return false;
    }

    int edmondsKarp(int[][] graph, int source, int sink) {
        int u, v;
        int[][] residualGraph = new int[V][V];

        for (u = 0; u < V; u++)
            for (v = 0; v < V; v++)
                residualGraph[u][v] = graph[u][v];

        int[] parent = new int[V];
        int maxFlow = 0;

        while (bfs(residualGraph, source, sink, parent)) {
            int pathFlow = Integer.MAX_VALUE;

            for (v = sink; v != source; v = parent[v]) {
                u = parent[v];
                pathFlow = Math.min(pathFlow, residualGraph[u][v]);
            }

            for (v = sink; v != source; v = parent[v]) {
                u = parent[v];
                residualGraph[u][v] -= pathFlow;
                residualGraph[v][u] += pathFlow;
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    }

    public static void main(String[] args) {
        int[][] graph = {
            {0, 16, 13, 0, 0, 0},
            {0, 0, 10, 12, 0, 0},
            {0, 4, 0, 0, 14, 0},
            {0, 0, 9, 0, 0, 20},
            {0, 0, 0, 7, 0, 4},
            {0, 0, 0, 0, 0, 0}
        };

        EdmondsKarp ek = new EdmondsKarp();
        System.out.println("The maximum possible flow is " + ek.edmondsKarp(graph, 0, 5));
    }
}
```
