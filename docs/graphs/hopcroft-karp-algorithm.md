---
id: hopcroft-karp
title: Hopcroft-Karp Algorithm
sidebar_label: Hopcroft-Karp Algorithm
description: "In this blog post, we'll explore the Hopcroft-Karp algorithm, an efficient method for finding the maximum matching in a bipartite graph."
tags: [dsa, algorithms, maximum matching]
---

### Definition:

The **Hopcroft-Karp algorithm** is an efficient algorithm used to find the maximum matching in a bipartite graph. It works in two phases: finding augmenting paths using BFS and then updating the matching using DFS.

### Characteristics:

- **Bipartite Graph**: 
  - The algorithm operates on bipartite graphs, which consist of two disjoint sets of vertices such that every edge connects a vertex from one set to a vertex in the other.

- **Augmenting Path**: 
  - An augmenting path is a path that starts and ends with unmatched vertices and alternates between edges not in the matching and edges in the matching. The existence of augmenting paths is key to finding a maximum matching.

- **Efficiency**: 
  - The algorithm has a time complexity of `O(E √V)`, where `E` is the number of edges and `V` is the number of vertices.

### Time Complexity:

- **Time Complexity**: `O(E √V)`  
  The algorithm repeatedly finds augmenting paths and adjusts the matching, leading to efficient performance even for larger graphs.

### Space Complexity:

- **Space Complexity**: `O(V + E)`  
  The algorithm requires space for the adjacency list of the graph and additional space for storing the matching and visited nodes.

### Algorithm Steps:

1. **Initialization**:
   - Create an empty matching and initialize all vertices as unmatched.

2. **BFS for Augmenting Path**:
   - Use a breadth-first search (BFS) to find all possible augmenting paths from unmatched vertices.

3. **DFS for Augmenting Path**:
   - Use a depth-first search (DFS) to traverse the found paths and update the matching.

4. **Repeat**:
   - Repeat the BFS and DFS until no more augmenting paths can be found.

### Example:

Consider a bipartite graph with two sets of vertices:
- Set U: {1, 2, 3}
- Set V: {`A`, `B`, `C`}

Edges:
- (1, `A`)
- (2, `B`)
- (3, `C`)

The maximum matching can be:
- (1, A)
- (2, B)
- (3, C)

### Java Implementation:

```java
import java.util.*;

public class HopcroftKarp {
    private static final int INF = Integer.MAX_VALUE;
    private int[][] pair;
    private int[] dist;
    private List<List<Integer>> adj;
    
    public HopcroftKarp(int uCount, int vCount) {
        pair = new int[uCount + vCount + 1][2]; // pairs for U and V
        dist = new int[uCount + 1];
        adj = new ArrayList<>();
        
        for (int i = 0; i <= uCount + vCount; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adj.get(u).add(v + adj.size() / 2); // offset for v vertices
    }

    private boolean bfs(int uCount) {
        Queue<Integer> queue = new LinkedList<>();
        for (int u = 1; u <= uCount; u++) {
            if (pair[u][0] == 0) {
                dist[u] = 0;
                queue.offer(u);
            } else {
                dist[u] = INF;
            }
        }
        dist[0] = INF;

        while (!queue.isEmpty()) {
            int u = queue.poll();
            if (dist[u] < dist[0]) {
                for (int v : adj.get(u)) {
                    if (dist[pair[v][1]] == INF) {
                        dist[pair[v][1]] = dist[u] + 1;
                        queue.offer(pair[v][1]);
                    }
                }
            }
        }
        return dist[0] != INF;
    }

    private boolean dfs(int uCount) {
        if (uCount == 0) {
            return true;
        }
        for (int v : adj.get(uCount)) {
            if (dist[pair[v][1]] == dist[uCount] + 1) {
                if (dfs(pair[v][1])) {
                    pair[uCount][0] = v;
                    pair[v][1] = uCount;
                    return true;
                }
            }
        }
        dist[uCount] = INF;
        return false;
    }

    public int maximumMatching(int uCount) {
        Arrays.fill(pair, new int[]{0, 0});
        int matching = 0;

        while (bfs(uCount)) {
            for (int u = 1; u <= uCount; u++) {
                if (pair[u][0] == 0 && dfs(u)) {
                    matching++;
                }
            }
        }
        return matching;
    }

    public static void main(String[] args) {
        int uCount = 3; // Number of vertices in set U
        int vCount = 3; // Number of vertices in set V

        HopcroftKarp hk = new HopcroftKarp(uCount, vCount);
        hk.addEdge(1, 0); // Edge from U1 to V1
        hk.addEdge(1, 1); // Edge from U1 to V2
        hk.addEdge(2, 1); // Edge from U2 to V2
        hk.addEdge(3, 2); // Edge from U3 to V3

        int maxMatch = hk.maximumMatching(uCount);
        System.out.println("Maximum matching is: " + maxMatch);
    }
}