---
id: critical-connections-in-a-network
title: "Critical Connections in a Network"
sidebar_label: Critical Connections
description: "Solution for LeetCode 1192: Critical Connections in a Network, utilizing Tarjan's Algorithm to find bridges in an undirected graph."
tags: [DSA, leetcode, graph, dfs, tarjans-algorithm, bridges]
---

## Description:

You are given a network of `n` servers labeled from `0` to `n - 1`. These servers are connected by a series of undirected connections, where each connection links two servers. The network is guaranteed to be fully connected initially.

A **critical connection** is a connection that, if removed, would disconnect some servers from the rest of the network (making it impossible for some servers to communicate with others). In graph theory, this is known as a **bridge**.

Your task is to find all the critical connections in the network and return them in any order.

---

## Video Explanation:

<LiteYouTubeEmbed id="qr7zEAW62Z4" params="autoplay=1&autohide=1&showinfo=0&rel=0" poster="maxresdefault" title="Bridges in Graph | Tarjan's Algorithm" webp/>

---

## Approaches:

### 1. Tarjan's Algorithm (Optimal DFS)

To find bridges in a graph, we can use a Depth-First Search (DFS) approach based on Tarjan's Algorithm. The core idea relies on tracking two important timestamps for every node:
1.  **Time of Insertion (`tin`)**: The exact step/time at which the node was first visited during the DFS.
2.  **Lowest Time of Insertion (`low`)**: The lowest `tin` reachable from the current node (including itself and its descendants, but excluding the direct edge it came from).

An edge between node `u` and node `v` is a bridge if, from node `v`, there is no back-edge to a node discovered earlier than `u`. Mathematically, if `low[v] > tin[u]`, then the edge `(u, v)` is a critical connection because `v` has no other way back to the rest of the graph without using `(u, v)`.

**Algorithm:**
1.  Build an adjacency list from the given connections.
2.  Initialize arrays `vis` (visited), `tin`, and `low`, all of size `n`. Keep a global `timer` starting at 1.
3.  Start a DFS traversal from node `0` (since the graph is fully connected, one DFS is enough) with a dummy parent `-1`.
4.  In the DFS function for node `u`:
    *   Mark `u` as visited.
    *   Set `tin[u] = low[u] = timer`, then increment the `timer`.
    *   Iterate through all neighbors `v` of `u`:
        *   If `v` is the parent of `u`, ignore it (don't traverse back the way we came).
        *   If `v` is not visited, recursively call DFS on `v`. After the recursive call returns, update `low[u] = min(low[u], low[v])`.
        *   Check for the bridge condition: If `low[v] > tin[u]`, add `[u, v]` to the result list.
        *   If `v` is already visited (and is not the parent), it means we found a back-edge. Update `low[u] = min(low[u], tin[v])`.
5.  Return the gathered critical connections.

#### Complexity
*   **Time Complexity:** $O(V + E)$ where $V$ is the number of servers (`n`) and $E$ is the number of connections. The graph creation takes $O(E)$, and the DFS visits every node and edge exactly once.
*   **Space Complexity:** $O(V + E)$ to store the adjacency list representation of the graph, plus $O(V)$ auxiliary space for the `tin`, `low`, and `vis` arrays, as well as the DFS recursion stack.

#### Solutions:

**C++**
```cpp
class Solution {
private:
    int timer = 1;
    void dfs(int node, int parent, vector<int>& vis, vector<vector<int>>& adj, 
             vector<int>& tin, vector<int>& low, vector<vector<int>>& bridges) {
        vis[node] = 1;
        tin[node] = low[node] = timer;
        timer++;
        
        for (auto it : adj[node]) {
            if (it == parent) continue;
            
            if (vis[it] == 0) {
                dfs(it, node, vis, adj, tin, low, bridges);
                low[node] = min(low[node], low[it]);
                
                // Condition for a bridge
                if (low[it] > tin[node]) {
                    bridges.push_back({it, node});
                }
            } else {
                // Back-edge encountered
                low[node] = min(low[node], tin[it]);
            }
        }
    }
    
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto it : connections) {
            adj[it[0]].push_back(it[1]);
            adj[it[1]].push_back(it[0]);
        }
        
        vector<int> vis(n, 0);
        vector<int> tin(n, 0);
        vector<int> low(n, 0);
        vector<vector<int>> bridges;
        
        dfs(0, -1, vis, adj, tin, low, bridges);
        
        return bridges;
    }
};
```

**Java**
```java
class Solution {
    private int timer = 1;
    
    private void dfs(int node, int parent, int[] vis, List<List<Integer>> adj, 
                     int[] tin, int[] low, List<List<Integer>> bridges) {
        vis[node] = 1;
        tin[node] = low[node] = timer;
        timer++;
        
        for (Integer it : adj.get(node)) {
            if (it == parent) continue;
            
            if (vis[it] == 0) {
                dfs(it, node, vis, adj, tin, low, bridges);
                low[node] = Math.min(low[node], low[it]);
                
                // Condition for a bridge
                if (low[it] > tin[node]) {
                    bridges.add(Arrays.asList(it, node));
                }
            } else {
                // Back-edge encountered
                low[node] = Math.min(low[node], tin[it]);
            }
        }
    }
    
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (List<Integer> it : connections) {
            adj.get(it.get(0)).add(it.get(1));
            adj.get(it.get(1)).add(it.get(0));
        }
        
        int[] vis = new int[n];
        int[] tin = new int[n];
        int[] low = new int[n];
        List<List<Integer>> bridges = new ArrayList<>();
        
        dfs(0, -1, vis, adj, tin, low, bridges);
        
        return bridges;
    }
}
```

**Python**
```py
class Solution:
    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)
            
        vis = [0] * n
        tin = [0] * n
        low = [0] * n
        bridges = []
        timer = 1
        
        def dfs(node, parent):
            nonlocal timer
            vis[node] = 1
            tin[node] = low[node] = timer
            timer += 1
            
            for neighbor in adj[node]:
                if neighbor == parent:
                    continue
                    
                if not vis[neighbor]:
                    dfs(neighbor, node)
                    low[node] = min(low[node], low[neighbor])
                    
                    # Condition for a bridge
                    if low[neighbor] > tin[node]:
                        bridges.append([neighbor, node])
                else:
                    # Back-edge encountered
                    low[node] = min(low[node], tin[neighbor])
                    
        dfs(0, -1)
        return bridges
```

**JavaScript**
```js
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of connections) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const vis = new Array(n).fill(0);
    const tin = new Array(n).fill(0);
    const low = new Array(n).fill(0);
    const bridges = [];
    let timer = 1;
    
    const dfs = (node, parent) => {
        vis[node] = 1;
        tin[node] = low[node] = timer;
        timer++;
        
        for (const neighbor of adj[node]) {
            if (neighbor === parent) continue;
            
            if (!vis[neighbor]) {
                dfs(neighbor, node);
                low[node] = Math.min(low[node], low[neighbor]);
                
                // Condition for a bridge
                if (low[neighbor] > tin[node]) {
                    bridges.push([neighbor, node]);
                }
            } else {
                // Back-edge encountered
                low[node] = Math.min(low[node], tin[neighbor]);
            }
        }
    };
    
    dfs(0, -1);
    return bridges;
};
```