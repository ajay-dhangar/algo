---
id: dijkstra
title: Dijkstra's Algorithm 
sidebar_label: Dijkstra's Algorithm
description: "In this blog post, we'll dive into Dijkstra's Algorithm, a fundamental graph algorithm used to find the shortest path between nodes in a graph."

tags: [dsa, algorithms, shortest path]
---


## Introduction
Dijkstra's Algorithm is a popular algorithm used to find the shortest path from a source node to all other nodes in a weighted graph. It guarantees the shortest path only when all edge weights are non-negative. The algorithm uses a greedy approach and is commonly used in network routing protocols and GPS systems.


## Implementation

Let’s see how Dijkstra's Algorithm can be implemented in Java:
# Code in Java

```java
      //let the source node be 'src'
      int[] dist = new int[n]; // n represents the number of vertices
      boolean[] visited = new boolean[n]; // to track visited nodes

      //initialize distances to infinity and source to 0
      for (int i = 0; i < n; i++) {
         dist[i] = Integer.MAX_VALUE;
         visited[i] = false;
      }
      dist[src] = 0;

      for (int i = 0; i < n - 1; i++) {
         // find the node with the minimum distance from the source
         int u = findMinDistance(dist, visited);

         // mark the chosen node as visited
         visited[u] = true;

         // update the distance values of the adjacent vertices of the picked node
         for (int v = 0; v < n; v++) {
               if (!visited[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE
                  && dist[u] + graph[u][v] < dist[v]) {
                  dist[v] = dist[u] + graph[u][v];
               }
         }
      }

      // Output the shortest distances from the source node
      for (int i = 0; i < n; i++) {
         System.out.println("Shortest distance from node " + src + " to node " + i + " is " + dist[i]);
      }

      // Helper function to find the vertex with the minimum distance
      private int findMinDistance(int[] dist, boolean[] visited) {
         int min = Integer.MAX_VALUE, minIndex = -1;

         for (int i = 0; i < dist.length; i++) {
            if (!visited[i] && dist[i] <= min) {
                  min = dist[i];
                  minIndex = i;
            }
         }
         return minIndex;
      }
```
Let’s see how Dijkstra's Algorithm can be implemented in C++:
# Code in C++

```cpp
   #include<bits/stdc++.h>
   using namespace std;

   // singel src shortest path algorithm

   vector<int> dijkstra(vector<vector<pair<int, int>>> &adj, int src){
      priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
      minHeap.push({0, src});
      vector<int> dist(adj.size(), 1e9);
      dist[src] = 0;
      while(!minHeap.empty()){
         auto top = minHeap.top();
         minHeap.pop();
         int pDist = top.first, pVert = top.second; // pDist -> dist from src to that node.
         for(auto it: adj[pVert]){
            int dis = it.second, vert = it.first;
            int d = dis + pDist;
            if(d < dist[vert]){
               dist[vert] = d;
               minHeap.push({d, vert});
            }
         }
      }
      return dist;
   }

   int main() {
      int n, e;
      cin >> n >> e;
      int src;
      cin >> src;
      vector<vector<pair<int, int>>> adj(n);
      for (int i = 0; i < e; i++){
         int x;
         cin >> x;
         pair<int, int> temp;
         cin >> temp.first >> temp.second;
         adj[x].push_back(temp);
         adj[temp.first].push_back({x, temp.second}); // undirected
      }
      vector<int> dist = dijkstra(adj, src);
      for (int i = 0; i < dist.size(); i++)
         cout << dist[i] << " ";
      cout << endl;
      return 0;
   }
```

In this algorithm, we use a greedy approach where we always pick the unvisited node with the minimum distance from the source node and update the distances to its neighbors.


## Time complexity:

Dijkstra's Algorithm: O(V²) (with an adjacency matrix, where V is the number of vertices)<br/>
With Priority Queue: O((V + E) log V), where E is the number of edges

## Points to Remember:

- Dijkstra's Algorithm is used to find the shortest path in a graph with non-negative edge weights.

- Works for both directed and undirected graphs.

- Faster than other algorithms for sparse graphs (when using priority queue).

- The graph must have non-negative edge weights for Dijkstra's Algorithm to work correctly.

