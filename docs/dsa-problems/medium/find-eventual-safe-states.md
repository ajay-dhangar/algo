---
id: find-eventual-safe-states
title: "Find Eventual Safe States"
sidebar_label: Find Eventual Safe States
description: "Solution for LeetCode 802: Find Eventual Safe States, utilizing Graph Traversal (DFS Cycle Detection) and BFS (Kahn's Algorithm)."
tags: [DSA, leetcode, graph, dfs, bfs, topological-sort]
---

## Description:

There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to node `i`, meaning there is an edge from node `i` to each node in `graph[i]`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a **terminal node** (or another safe node).

Return *an array containing all the **safe nodes** of the graph*. The answer should be sorted in ascending order.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="uRbJTeaWS8s"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Eventual Safe States | DFS | Cycle Detection in Directed Graph"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (Cycle Detection) (Optimal)

To determine if a node is safe, we can use DFS to detect if it is part of a cycle or has a path leading to a cycle. We can categorize the state of each node using three colors or numerical flags:
* **0 (Unvisited):** The node has not been visited yet.
* **1 (Visiting / In Stack):** The node is currently being explored in our DFS recursion stack.
* **2 (Safe / Visited):** All paths originating from this node have been completely explored and confirmed to lead only to terminal/safe nodes without any cycles.

**Algorithm:**
1. Initialize a `state` array of size `n` with all elements set to `0`.
2. Iterate through every node `i` from `0` to `n - 1`. If `state[i]` is `0`, run a helper DFS function on node `i`.
3. In the DFS function:
   - If the current node's state is not `0`, return `true` if its state is `2` (safe), or `false` if its state is `1` (cycle detected in current stack).
   - Mark the current node as `1` (in recursion stack).
   - Recursively call DFS for every neighbor of the current node:
     - If any neighbor returns `false`, it means we encountered a cycle. Immediately return `false`.
   - If all neighbors are explored safely without encountering a cycle, update the current node's state to `2` (safe) and return `true`.
4. Finally, collect all nodes that have a state of `2` into our result list. Since we iterate from `0` to `n - 1`, the result will naturally be in ascending order.

#### Complexity
* **Time Complexity:** $O(V + E)$ where $V$ is the number of vertices (`n`) and $E$ is the total number of edges in the graph. We visit each vertex and traverse each edge at most once across all DFS calls.
* **Space Complexity:** $O(V)$ to store the `state` array and to accommodate the recursion call stack, which can grow up to depth $V$ in the worst case.

#### Solutions:

**C++**
```cpp
class Solution {
private:
    bool dfs(int node, vector<vector<int>>& graph, vector<int>& state) {
        if (state[node] > 0) {
            return state[node] == 2;
        }
        
        // Mark node as visiting (in current DFS stack)
        state[node] = 1;
        
        for (int neighbor : graph[node]) {
            if (!dfs(neighbor, graph, state)) {
                return false;
            }
        }
        
        // Mark node as safe
        state[node] = 2;
        return true;
    }
    
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0); // 0: unvisited, 1: visiting, 2: safe
        vector<int> safeNodes;
        
        for (int i = 0; i < n; i++) {
            if (dfs(i, graph, state)) {
                safeNodes.push_back(i);
            }
        }
        
        return safeNodes;
    }
};
```

**Java**
```java
class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] state = new int[n]; // 0: unvisited, 1: visiting, 2: safe
        List<Integer> safeNodes = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            if (dfs(i, graph, state)) {
                safeNodes.add(i);
            }
        }
        
        return safeNodes;
    }
    
    private boolean dfs(int node, int[][] graph, int[] state) {
        if (state[node] > 0) {
            return state[node] == 2;
        }
        
        // Mark node as visiting
        state[node] = 1;
        
        for (int neighbor : graph[node]) {
            if (!dfs(neighbor, graph, state)) {
                return false;
            }
        }
        
        // Mark node as safe
        state[node] = 2;
        return true;
    }
}
```

**Python**
```py
class Solution:
    def eventualSafeNodes(self, graph: list[list[int]]) -> list[int]:
        n = len(graph)
        state = [0] * n  # 0: unvisited, 1: visiting, 2: safe
        
        def dfs(node):
            if state[node] > 0:
                return state[node] == 2
                
            state[node] = 1
            
            for neighbor in graph[node]:
                if not dfs(neighbor):
                    return False
                    
            state[node] = 2
            return True
            
        return [i for i in range(n) if dfs(i)]
```

**JavaScript**
```js
/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const n = graph.length;
    const state = new Array(n).fill(0); // 0: unvisited, 1: visiting, 2: safe
    const safeNodes = [];
    
    const dfs = (node) => {
        if (state[node] > 0) {
            return state[node] === 2;
        }
        
        state[node] = 1;
        
        for (const neighbor of graph[node]) {
            if (!dfs(neighbor)) {
                return false;
            }
        }
        
        state[node] = 2;
        return true;
    };
    
    for (let i = 0; i < n; i++) {
        if (dfs(i)) {
            safeNodes.push(i);
        }
    }
    
    return safeNodes;
};
```