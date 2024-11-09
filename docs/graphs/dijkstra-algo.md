---
id: dijkstra-algo
title: "Dijkstra's Algorithm"
sidebar_label: "Dijkstra's Algorithm"
description: "In this blog post, we'll explore Dijkstra's Algorithm, an efficient method to find the shortest path from a source to all other nodes in a graph."
tags: [dsa, algorithms, shortest path]
---

# Dijkstra's Algorithm

Dijkstra's Algorithm is used to find the shortest path from a source node to all other nodes in a weighted graph, where all edge weights are non-negative. It is widely used in network routing and GPS applications.

## Key Features:
- **Time Complexity**: O(V²) for a simple implementation with an adjacency matrix, or O(E log V) using a priority queue (min-heap).
- **Space Complexity**: O(V), where V is the number of vertices.
- Suitable for graphs with non-negative edge weights.

## Applications:
- Shortest path calculations in GPS and network routing.
- Optimal path planning in games and simulations.
- Analyzing transportation or logistics networks.

# Code in C

```c
#include <stdio.h>
#include <limits.h>

#define V 5

int minDistance(int dist[], int sptSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (sptSet[v] == 0 && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    int sptSet[V] = {0};

    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX;
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = 1;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }

    printf("Vertex\tDistance from Source\n");
    for (int i = 0; i < V; i++)
        printf("%d\t%d\n", i, dist[i]);
}

int main() {
    int graph[V][V];
    int src;

    printf("Enter the adjacency matrix (use 0 for no direct connection):\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            scanf("%d", &graph[i][j]);
        }
    }

    printf("Enter the source vertex: ");
    scanf("%d", &src);

    dijkstra(graph, src);
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

void dijkstra(vector<vector<int>>& graph, int src, int V) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (int v = 0; v < V; v++) {
            if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                pq.push({dist[v], v});
            }
        }
    }

    cout << "Vertex\tDistance from Source\n";
    for (int i = 0; i < V; i++)
        cout << i << "\t" << dist[i] << "\n";
}

int main() {
    int V;
    cout << "Enter the number of vertices: ";
    cin >> V;
    vector<vector<int>> graph(V, vector<int>(V));

    cout << "Enter the adjacency matrix (use 0 for no direct connection):\n";
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            cin >> graph[i][j];

    int src;
    cout << "Enter the source vertex: ";
    cin >> src;

    dijkstra(graph, src, V);
    return 0;
}
```

# Code in Python

```python
import heapq

def dijkstra(graph, src, V):
    dist = [float("inf")] * V
    dist[src] = 0
    min_heap = [(0, src)]

    while min_heap:
        current_distance, u = heapq.heappop(min_heap)

        for v in range(V):
            if graph[u][v] > 0 and current_distance + graph[u][v] < dist[v]:
                dist[v] = current_distance + graph[u][v]
                heapq.heappush(min_heap, (dist[v], v))

    print("Vertex\tDistance from Source")
    for i in range(V):
        print(f"{i}\t{dist[i]}")

V = int(input("Enter the number of vertices: "))
graph = []
print("Enter the adjacency matrix (use 0 for no direct connection):")
for i in range(V):
    graph.append(list(map(int, input().split())))

src = int(input("Enter the source vertex: "))
dijkstra(graph, src, V)
```

# Code in Java

```java
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Scanner;

public class Dijkstra {
    public static void dijkstra(int[][] graph, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int u = current[0];

            for (int v = 0; v < V; v++) {
                if (graph[u][v] > 0 && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    pq.add(new int[]{v, dist[v]});
                }
            }
        }

        System.out.println("Vertex\tDistance from Source");
        for (int i = 0; i < V; i++) {
            System.out.println(i + "\t" + dist[i]);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter the number of vertices: ");
        int V = sc.nextInt();
        
        int[][] graph = new int[V][V];
        System.out.println("Enter the adjacency matrix (use 0 for no direct connection):");
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                graph[i][j] = sc.nextInt();
            }
        }

        System.out.print("Enter the source vertex: ");
        int src = sc.nextInt();

        dijkstra(graph, src, V);
    }
}
```

### Example:
#### Input:
```mathmatica
Enter the number of vertices: 5
Enter the adjacency matrix (use 0 for no direct connection):
0 10 20 0 0
10 0 30 50 10
20 30 0 20 0
0 50 20 0 20
0 10 0 20 0
Enter the source vertex: 0
```
#### Output:
```csharp
Vertex	Distance from Source
0	    0
1	    10
2	    20
3	    40
4	    20
```
