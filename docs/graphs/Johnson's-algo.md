---

id: johnsons-algo  
title: "Johnson's Algorithm"  
sidebar_label: "Johnson's Algorithm"  
description: "In this blog post, we'll explore Johnson's Algorithm, a method to find the shortest paths between all pairs of nodes in a graph, even with negative weights."  
tags: [dsa, algorithms, shortest path]  

---

# Johnson's Algorithm

Johnson's Algorithm is a versatile method to find the shortest paths between all pairs of nodes in a weighted graph, including graphs with both positive and negative weights (but no negative cycles). It combines Bellman-Ford and Dijkstra’s algorithms to achieve an efficient solution.

## Key Features:
- **Time Complexity**: O(V² log V + VE) where V is the number of vertices, and E is the number of edges.
- **Space Complexity**: O(V²) for storing distances between every pair.
- Allows for graphs with negative edge weights as long as there are no negative weight cycles.

## Applications:
- Optimal pathfinding in transportation networks with varying costs.
- Network routing for latency optimization.
- Economic or logistic networks with mixed costs.

# Code in C

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define V 5

struct Edge {
    int src, dest, weight;
};

struct Graph {
    int V, E;
    struct Edge* edge;
};

struct Graph* createGraph(int V, int E) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edge = (struct Edge*)malloc(E * sizeof(struct Edge));
    return graph;
}

void bellmanFord(struct Graph* graph, int src, int dist[]) {
    for (int i = 0; i < graph->V; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;

    for (int i = 1; i <= graph->V - 1; i++) {
        for (int j = 0; j < graph->E; j++) {
            int u = graph->edge[j].src;
            int v = graph->edge[j].dest;
            int weight = graph->edge[j].weight;
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v])
                dist[v] = dist[u] + weight;
        }
    }
}

void dijkstra(int graph[V][V], int src, int dist[]) {
    int sptSet[V] = {0};
    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = -1;
        int min = INT_MAX;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && dist[v] <= min)
                min = dist[v], u = v;

        sptSet[u] = 1;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}

void johnsonsAlgorithm(struct Graph* graph) {
    int V = graph->V;
    int newGraph[V + 1][V + 1];
    int h[V + 1];
    
    for (int i = 0; i <= V; i++)
        for (int j = 0; j <= V; j++)
            newGraph[i][j] = 0;
    
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            newGraph[i][j] = graph->edge[i].weight;
    
    bellmanFord(graph, V, h);
    
    int reweightedGraph[V][V];
    for (int u = 0; u < V; u++) {
        for (int v = 0; v < V; v++) {
            if (graph->edge[u].weight != INT_MAX)
                reweightedGraph[u][v] = graph->edge[u].weight + h[u] - h[v];
        }
    }

    printf("All-pairs shortest paths:\n");
    for (int u = 0; u < V; u++) {
        int dist[V];
        dijkstra(reweightedGraph, u, dist);
        for (int v = 0; v < V; v++)
            printf("Distance from %d to %d is %d\n", u, v, dist[v]);
    }
}

int main() {
    int V = 5;
    int E = 10;
    struct Graph* graph = createGraph(V, E);

    // Define edges with source, destination, and weight
    graph->edge[0].src = 0;
    graph->edge[0].dest = 1;
    graph->edge[0].weight = 3;

    // Add remaining edges here...

    johnsonsAlgorithm(graph);
    return 0;
}
```
# Code in Cpp
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <limits.h>

using namespace std;

void bellmanFord(vector<vector<pair<int, int>>>& graph, int src, int V, vector<int>& h) {
    h.assign(V + 1, INT_MAX);
    h[src] = 0;

    for (int i = 0; i < V; i++) {
        for (int u = 0; u < V; u++) {
            for (auto& edge : graph[u]) {
                int v = edge.first;
                int weight = edge.second;
                if (h[u] != INT_MAX && h[u] + weight < h[v]) {
                    h[v] = h[u] + weight;
                }
            }
        }
    }
}

void dijkstra(vector<vector<pair<int, int>>>& graph, int src, int V, vector<int>& dist) {
    dist.assign(V, INT_MAX);
    dist[src] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second;
        int uDist = pq.top().first;
        pq.pop();

        if (uDist > dist[u]) continue;

        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (uDist + weight < dist[v]) {
                dist[v] = uDist + weight;
                pq.push({dist[v], v});
            }
        }
    }
}

void johnsonsAlgorithm(vector<vector<pair<int, int>>>& graph, int V) {
    vector<vector<pair<int, int>>> newGraph = graph;
    for (int i = 0; i < V; i++)
        newGraph.push_back({});  // Add extra vertex with zero-weight edges
    vector<int> h;
    bellmanFord(newGraph, V, V, h);

    vector<vector<pair<int, int>>> reweightedGraph(V);
    for (int u = 0; u < V; u++) {
        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second + h[u] - h[v];
            reweightedGraph[u].push_back({v, weight});
        }
    }

    for (int u = 0; u < V; u++) {
        vector<int> dist;
        dijkstra(reweightedGraph, u, V, dist);

        cout << "Distances from vertex " << u << ":\n";
        for (int v = 0; v < V; v++)
            cout << (dist[v] == INT_MAX ? "INF" : to_string(dist[v] + h[v] - h[u])) << " ";
        cout << endl;
    }
}

int main() {
    int V = 5;
    vector<vector<pair<int, int>>> graph(V);
    graph[0] = {{1, 3}, {4, -4}};
    graph[1] = {{2, 8}, {4, 7}};
    graph[2] = {{3, -5}};
    graph[3] = {{0, 2}};
    graph[4] = {{3, 6}};

    johnsonsAlgorithm(graph, V);
    return 0;
}
```
# Code in Python

```python
import heapq

def bellman_ford(graph, V, src):
    dist = [float("inf")] * V
    dist[src] = 0
    for _ in range(V - 1):
        for u in range(V):
            for v, weight in graph[u]:
                if dist[u] != float("inf") and dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
    return dist

def dijkstra(graph, src, V):
    dist = [float("inf")] * V
    dist[src] = 0
    min_heap = [(0, src)]
    while min_heap:
        u_distance, u = heapq.heappop(min_heap)
        for v, weight in graph[u]:
            if u_distance + weight < dist[v]:
                dist[v] = u_distance + weight
                heapq.heappush(min_heap, (dist[v], v))
    return dist

def johnsons_algorithm(graph, V):
    new_graph = [[] for _ in range(V + 1)]
    for u in range(V):
        new_graph[u].extend(graph[u])
        new_graph[V].append((u, 0))
    
    h = bellman_ford(new_graph, V + 1, V)
    
    reweighted_graph = [[] for _ in range(V)]
    for u in range(V):
        for v, weight in graph[u]:
            reweighted_graph[u].append((v, weight + h[u] - h[v]))
    
    distances = []
    for u in range(V):
        dist = dijkstra(reweighted_graph, u, V)
        distances.append([d + h[v] - h[u] for v, d in enumerate(dist)])
    
    return distances

# Example usage
V = 4
graph = [
    [(1, 3), (2, 8)],
    [(3, -2)],
    [(1, 4)],
    []
]

distances = johnsons_algorithm(graph, V)
print("Shortest path distances between all pairs:")
for u in range(V):
    print(f"From vertex {u}: {distances[u]}")
```
# Code in Java

```java
import java.util.*;

class JohnsonsAlgorithm {
    static final int INF = Integer.MAX_VALUE;

    public static void bellmanFord(List<int[]>[] graph, int src, int[] h) {
        Arrays.fill(h, INF);
        h[src] = 0;

        int V = graph.length;
        for (int i = 0; i < V - 1; i++) {
            for (int u = 0; u < V; u++) {
                for (int[] edge : graph[u]) {
                    int v = edge[0];
                    int weight = edge[1];
                    if (h[u] != INF && h[u] + weight < h[v]) {
                        h[v] = h[u] + weight;
                    }
                }
            }
        }
    }

    public static void dijkstra(List<int[]>[] graph, int src, int[] dist) {
        Arrays.fill(dist, INF);
        dist[src] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.add(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int u = current[0], uDist = current[1];
            
            if (uDist > dist[u]) continue;

            for (int[] edge : graph[u]) {
                int v = edge[0], weight = edge[1];
                if (uDist + weight < dist[v]) {
                    dist[v] = uDist + weight;
                    pq.add(new int[]{v, dist[v]});
                }
            }
        }
    }

    public static void johnsonsAlgorithm(List<int[]>[] graph) {
        int V = graph.length;
        
        List<int[]>[] newGraph = new ArrayList[V + 1];
        for (int i = 0; i <= V; i++) newGraph[i] = new ArrayList<>();
        for (int u = 0; u < V; u++) {
            for (int[] edge : graph[u]) newGraph[u].add(new int[]{edge[0], edge[1]});
            newGraph[V].add(new int[]{u, 0});
        }

        int[] h = new int[V + 1];
        bellmanFord(newGraph, V, h);

        List<int[]>[] reweightedGraph = new ArrayList[V];
        for (int u = 0; u < V; u++) reweightedGraph[u] = new ArrayList<>();
        
        for (int u = 0; u < V; u++) {
            for (int[] edge : graph[u]) {
                int v = edge[0], weight = edge[1] + h[u] - h[v];
                reweightedGraph[u].add(new int[]{v, weight});
            }
        }

        for (int u = 0; u < V; u++) {
            int[] dist = new int[V];
            dijkstra(reweightedGraph, u, dist);

            System.out.println("Distances from vertex " + u + ":");
            for (int v = 0; v < V; v++) {
                System.out.print((dist[v] == INF ? "INF" : dist[v] + h[v] - h[u]) + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int V = 5;
        List<int[]>[] graph = new ArrayList[V];
        for (int i = 0; i < V; i++) graph[i] = new ArrayList<>();

        graph[0].add(new int[]{1, 3});
        graph[0].add(new int[]{4, -4});
        graph[1].add(new int[]{2, 8});
        graph[1].add(new int[]{4, 7});
        graph[2].add(new int[]{3, -5});
        graph[3].add(new int[]{0, 2});
        graph[4].add(new int[]{3, 6});

        johnsonsAlgorithm(graph);
    }
}
```
---

### Example:
#### Input:
- Graph vertices: 4
- Edges:
```
  - (0 -> 1, weight=3)  
  - (0 -> 2, weight=8)  
  - (1 -> 3, weight=-2)  
  - (2 -> 1, weight=4)  
```
#### Output:
```
Shortest path distances between all pairs:
From vertex 0: [0, 3, 8, 1]
From vertex 1: [inf, 0, inf, -2]
From vertex 2: [inf, 4, 0, 2]
From vertex 3: [inf, inf, inf, 0]
```

---
