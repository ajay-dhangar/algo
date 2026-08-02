---
id: number-of-operations-to-make-network-connected
title: "Number of Operations to Make Network Connected"
sidebar_label: Make Network Connected
description: "Solution for LeetCode 1319: Number of Operations to Make Network Connected, utilizing Graph Traversal (DFS) to count connected components."
tags: [DSA, leetcode, graph, dfs, bfs, union-find]
---

## Description:

There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between computers `ai` and `bi`. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return *the minimum number of times you need to do this in order to make all the computers connected*. If it is not possible, return `-1`.

---

## Video Solution

<LiteYouTubeEmbed
  id="FYrl7iz9_ZU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="G-49. Number of Operations to Make Network Connected - DSU"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) for Connected Components (Optimal)

To connect `n` computers (or nodes), we need an absolute minimum of `n - 1` cables (or edges). If the total number of given cables is less than `n - 1`, it is mathematically impossible to connect all computers, so we can immediately return `-1`.

If we have enough cables, the problem reduces to finding the number of **connected components** in the graph. 
* If the graph is entirely connected, there is `1` component, and we need `0` operations.
* If the graph is split into `C` isolated components, we need to bridge them together. To connect `C` components, we exactly need `C - 1` cables. Since we already proved we have enough total cables to do so, the answer is simply `C - 1`.

We can use Depth-First Search (DFS) to traverse the network and count how many separate components exist.

**Algorithm:**
1. Check if `connections.length < n - 1`. If so, return `-1`.
2. Build an adjacency list `adj` from the `connections` array.
3. Initialize a `visited` boolean array (or set) of size `n`.
4. Initialize a `components` counter to 0.
5. Loop through every computer from `0` to `n - 1`.
   - If the computer hasn't been visited, increment `components` by 1.
   - Run a DFS starting from that computer to mark all reachable computers as visited.
6. Return `components - 1`.

#### Complexity
* **Time Complexity:** $O(V + E)$ where $V$ is the number of computers (`n`) and $E$ is the number of connections. We build the graph and visit each node and edge exactly once during the DFS traversal.
* **Space Complexity:** $O(V + E)$ to store the adjacency list representation of the graph, plus $O(V)$ for the `visited` array and recursion call stack.

#### Solutions:

**C++**
```cpp
class Solution {
private:
    void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
        visited[node] = true;
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }
    
public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        // Not enough edges to connect all nodes
        if (connections.size() < n - 1) return -1;
        
        vector<vector<int>> adj(n);
        for (const auto& conn : connections) {
            adj[conn[0]].push_back(conn[1]);
            adj[conn[1]].push_back(conn[0]);
        }
        
        vector<bool> visited(n, false);
        int components = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                components++;
                dfs(i, adj, visited);
            }
        }
        
        // We need (components - 1) edges to connect all isolated components
        return components - 1;
    }
};
```

**Java**
```java
class Solution {
    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;
        
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] conn : connections) {
            adj.get(conn[0]).add(conn[1]);
            adj.get(conn[1]).add(conn[0]);
        }
        
        boolean[] visited = new boolean[n];
        int components = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                components++;
                dfs(i, adj, visited);
            }
        }
        
        return components - 1;
    }
    
    private void dfs(int node, List<List<Integer>> adj, boolean[] visited) {
        visited[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }
}
```

**Python**
```py
class Solution:
    def makeConnected(self, n: int, connections: list[list[int]]) -> int:
        if len(connections) < n - 1:
            return -1
            
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)
            
        visited = [False] * n
        components = 0
        
        def dfs(node):
            visited[node] = True
            for neighbor in adj[node]:
                if not visited[neighbor]:
                    dfs(neighbor)
                    
        for i in range(n):
            if not visited[i]:
                components += 1
                dfs(i)
                
        return components - 1
```

**JavaScript**
```js
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    if (connections.length < n - 1) return -1;
    
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of connections) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const visited = new Array(n).fill(false);
    let components = 0;
    
    const dfs = (node) => {
        visited[node] = true;
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            components++;
            dfs(i);
        }
    }
    
    return components - 1;
};
```