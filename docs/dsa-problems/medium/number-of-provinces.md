---
id: number-of-provinces
title: "Number of Provinces"
sidebar_label: Number of Provinces
description: "Solution for LeetCode 547: Number of Provinces, utilizing Graph Traversal (DFS) to find connected components."
tags: [DSA, leetcode, graph, dfs, bfs, union-find]
---

## Description:

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `i`th city and the `j`th city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return the total number of **provinces**.

**Example 1:**

Input: `isConnected = [[1,1,0],[1,1,0],[0,0,1]]`
Output: `2`

**Example 2:**

Input: `isConnected = [[1,0,0],[0,1,0],[0,0,1]]`
Output: `3`

---

## Video Explanation:

<LiteYouTubeEmbed
  id="uEbGoLY6ytw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Number of Provinces"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) (Optimal)

This problem essentially asks us to find the number of **Connected Components** in an undirected graph. 

The graph is given as an Adjacency Matrix. We can find the connected components by performing a standard graph traversal (either DFS or BFS) starting from every unvisited node. 

**Algorithm:**
1. Create a `visit` array of boolean values (size $n$) to keep track of the cities we have already visited. Initialize all to `false`.
2. Initialize a `provinces` counter to 0.
3. Iterate through every city $i$ from 0 to $n - 1$:
   - If the city `visit[i]` is `false`, it means we have found a new, unvisited province. 
   - Increment the `provinces` counter by 1.
   - Launch a DFS traversal starting from city $i$. The DFS will recursively visit all cities that are directly or indirectly connected to city $i$ and mark them as `true` in the `visit` array.
4. Return the `provinces` counter.

#### Complexity
* **Time Complexity:** $O(N^2)$ where $N$ is the number of cities. Even though it looks like nested loops, we traverse the $N \times N$ matrix exactly once throughout all the combined DFS calls.
* **Space Complexity:** $O(N)$ for the `visit` array of size $N$ and the recursion call stack, which can go up to $N$ deep in the worst case if all cities are connected in a single line.

#### Solutions:

**C++**
```cpp
class Solution {
private:
    void dfs(int node, vector<vector<int>>& isConnected, vector<bool>& visit) {
        visit[node] = true;
        int n = isConnected.size();
        for (int i = 0; i < n; i++) {
            if (isConnected[node][i] == 1 && !visit[i]) {
                dfs(i, isConnected, visit);
            }
        }
    }
    
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        int provinces = 0;
        vector<bool> visit(n, false);
        
        for (int i = 0; i < n; i++) {
            if (!visit[i]) {
                provinces++;
                dfs(i, isConnected, visit);
            }
        }
        
        return provinces;
    }
};
```

**Java**
```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int provinces = 0;
        boolean[] visit = new boolean[n];
        
        for (int i = 0; i < n; i++) {
            if (!visit[i]) {
                provinces++;
                dfs(i, isConnected, visit);
            }
        }
        return provinces;
    }
    
    private void dfs(int node, int[][] isConnected, boolean[] visit) {
        visit[node] = true;
        for (int i = 0; i < isConnected.length; i++) {
            if (isConnected[node][i] == 1 && !visit[i]) {
                dfs(i, isConnected, visit);
            }
        }
    }
}
```

**Python**
```py
class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        n = len(isConnected)
        provinces = 0
        visit = [False] * n
        
        def dfs(node):
            visit[node] = True
            for i in range(n):
                if isConnected[node][i] == 1 and not visit[i]:
                    dfs(i)
                    
        for i in range(n):
            if not visit[i]:
                provinces += 1
                dfs(i)
                
        return provinces
```

**JavaScript**
```js
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
const findCircleNum = function(isConnected) {
    const n = isConnected.length;
    let provinces = 0;
    const visit = new Array(n).fill(false);
    
    const dfs = (node) => {
        visit[node] = true;
        for (let i = 0; i < n; i++) {
            if (isConnected[node][i] === 1 && !visit[i]) {
                dfs(i);
            }
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (!visit[i]) {
            provinces++;
            dfs(i);
        }
    }
    
    return provinces;
};
```