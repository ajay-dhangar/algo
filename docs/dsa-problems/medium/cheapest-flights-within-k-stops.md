---
id: cheapest-flights-within-k-stops
title: "Cheapest Flights Within K Stops"
sidebar_label: Cheapest Flights Within K Stops
description: "Solution for LeetCode 787: Cheapest Flights Within K Stops, utilizing BFS (Modified Dijkstra) to find the cheapest flight path within K stops."
tags: [DSA, leetcode, graph, bfs, shortest-path, dynamic-programming]
---

## Description:

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates that there is a flight from city `fromi` to city `toi` with cost `pricei`.

You are also given three integers `src`, `dst`, and `k`, return *the **cheapest price** from* `src` *to* `dst` *with at most* `k` *stops*. If there is no such route, return `-1`.

---

## Video Solution:

<LiteYouTubeEmbed
  id="9XybHVqTHcQ"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Cheapest Flights Within K Stops | BFS | Graph"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Breadth-First Search (Modified Dijkstra) (Optimal)

Unlike standard shortest-path algorithms like Dijkstra's (which prioritizes by minimum cost using a Priority Queue), this problem imposes a strict restriction on the **number of stops (`k`)**. If we prioritize purely by cost, we might reach a city cheaply but exhaust our limit of stops, missing a slightly more expensive route that uses fewer stops and can successfully reach the destination.

Since the number of stops increments by exactly 1 with each flight taken, **Breadth-First Search (BFS)** is the ideal approach. By using a standard Queue where elements are ordered naturally by the number of stops, we explore paths level-by-level (0 stops, 1 stop, ..., up to `k` stops).

**Algorithm:**
1. Build an adjacency list `adj` from the `flights` array where `adj[u]` contains pairs `(v, price)`.
2. Initialize a `minCost` array of size `n` with infinity (or a very large number), setting `minCost[src] = 0`.
3. Use a queue that stores tuples of `(stops, current_city, current_cost)`. Push the initial state `(0, src, 0)` into the queue.
4. While the queue is not empty:
   - Pop the front element `(stops, u, cost)`.
   - If `stops > k`, we cannot take any more flights from this city, so continue to the next item in the queue.
   - For each neighbor `(v, price)` in `adj[u]`:
     - Calculate `newCost = cost + price`.
     - If `newCost < minCost[v]`, update `minCost[v] = newCost` and push `(stops + 1, v, newCost)` into the queue.
5. After the queue is empty, if `minCost[dst]` is still infinity, return `-1`. Otherwise, return `minCost[dst]`.

#### Complexity
* **Time Complexity:** $O(V + E)$ where $V$ is the number of cities (`n`) and $E$ is the number of flights (`flights.length`). Since we explore level-by-level up to at most `k` stops and only push neighbors into the queue when a cheaper path is found, each edge is processed efficiently without redundant cycles.
* **Space Complexity:** $O(V + E)$ to store the adjacency list graph, the `minCost` array, and the queue elements.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        // Build adjacency list: adj[u] = {v, price}
        vector<vector<pair<int, int>>> adj(n);
        for (const auto& flight : flights) {
            adj[flight[0]].push_back({flight[1], flight[2]});
        }
        
        // minCost array initialized to infinity
        vector<int> minCost(n, 1e9);
        minCost[src] = 0;
        
        // Queue stores: {stops, {current_node, current_cost}}
        queue<pair<int, pair<int, int>>> q;
        q.push({0, {src, 0}});
        
        while (!q.empty()) {
            auto [stops, nodeCost] = q.front();
            auto [u, cost] = nodeCost;
            q.pop();
            
            // If stops exceed limit k, stop exploring further from this path
            if (stops > k) continue;
            
            for (const auto& [v, price] : adj[u]) {
                if (cost + price < minCost[v]) {
                    minCost[v] = cost + price;
                    q.push({stops + 1, {v, minCost[v]}});
                }
            }
        }
        
        return minCost[dst] == 1e9 ? -1 : minCost[dst];
    }
};
```

**Java**
```java
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        // Build adjacency list: adj[u] = list of int[]{v, price}
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] flight : flights) {
            adj.get(flight[0]).add(new int[]{flight[1], flight[2]});
        }
        
        // minCost array initialized to infinity
        int[] minCost = new int[n];
        Arrays.fill(minCost, Integer.MAX_VALUE);
        minCost[src] = 0;
        
        // Queue stores: int[]{stops, current_node, current_cost}
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, src, 0});
        
        while (!q.isEmpty()) {
            int[] current = q.poll();
            int stops = current[0];
            int u = current[1];
            int cost = current[2];
            
            if (stops > k) continue;
            
            for (int[] neighbor : adj.get(u)) {
                int v = neighbor[0];
                int price = neighbor[1];
                
                if (cost + price < minCost[v]) {
                    minCost[v] = cost + price;
                    q.offer(new int[]{stops + 1, v, minCost[v]});
                }
            }
        }
        
        return minCost[dst] == Integer.MAX_VALUE ? -1 : minCost[dst];
    }
}
```

**Python**
```py
from collections import deque

class Solution:
    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
        # Build adjacency list: adj[u] = [(v, price)]
        adj = [[] for _ in range(n)]
        for u, v, price in flights:
            adj[u].append((v, price))
            
        # minCost array initialized to infinity
        minCost = [float('inf')] * n
        minCost[src] = 0
        
        # Queue stores tuples of: (stops, current_node, current_cost)
        q = deque([(0, src, 0)])
        
        while q:
            stops, u, cost = q.popleft()
            
            if stops > k:
                continue
                
            for v, price in adj[u]:
                if cost + price < minCost[v]:
                    minCost[v] = cost + price
                    q.append((stops + 1, v, minCost[v]))
                    
        return minCost[dst] if minCost[dst] != float('inf') else -1
```

**JavaScript**
```js
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    // Build adjacency list: adj[u] = [[v, price]]
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, price] of flights) {
        adj[u].push([v, price]);
    }
    
    // minCost array initialized to infinity
    const minCost = new Array(n).fill(Infinity);
    minCost[src] = 0;
    
    // Queue stores: [stops, current_node, current_cost]
    const q = [[0, src, 0]];
    let head = 0; // Using pointer to avoid array shift O(N) overhead
    
    while (head < q.length) {
        const [stops, u, cost] = q[head++];
        
        if (stops > k) continue;
        
        for (const [v, price] of adj[u]) {
            if (cost + price < minCost[v]) {
                minCost[v] = cost + price;
                q.push([stops + 1, v, minCost[v]]);
            }
        }
    }
    
    return minCost[dst] === Infinity ? -1 : minCost[dst];
};
```