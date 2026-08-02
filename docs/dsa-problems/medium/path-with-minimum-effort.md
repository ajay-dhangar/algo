---
id: path-with-minimum-effort
title: Path With Minimum Effort
sidebar_label: Path With Minimum Effort
description: >-
  Solution for LeetCode 1631: Path With Minimum Effort, utilizing Dijkstra's
  Algorithm with a Min-Priority Queue on a 2D grid.
tags:
  - DSA
  - leetcode
  - graph
  - dijkstras
  - shortest-path
  - matrix
  - binary-search
companies:
  - Amazon
---

## Description:

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where `heights[row][col]` represents the height of a cell. You are situated in the top-left cell, and you hope to travel to the bottom-right cell. You can move **up**, **down**, **left**, or **right**, and you wish to find a route that requires the minimum **effort**.

A route's **effort** is the **maximum absolute difference** in heights between two consecutive cells of the route.

Return *the minimum **effort** required to travel from the top-left cell to the bottom-right cell*.

---

## Video Solution:

<LiteYouTubeEmbed
  id="0lx2j_5997k"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Path With Minimum Effort | Dijkstra's Algorithm | LeetCode 1631"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Dijkstra's Algorithm (Min-Priority Queue) (Optimal)

This problem asks us to find a path from the source to the destination such that the **maximum edge weight along the path is minimized**. This is a classic variation of the Shortest Path problem, making **Dijkstra's Algorithm** the optimal approach.

Instead of summing the edge weights (as in standard Dijkstra's), our path cost is determined by the **maximum height difference** encountered so far. By using a Min-Priority Queue that always pops the cell reachable with the smallest maximum effort, the first time we pop the destination cell from the queue, we are guaranteed to have found the optimal path.

**Algorithm:**
1. Initialize a 2D `dist` matrix of size `rows x cols` with infinity, setting `dist[0][0] = 0`.
2. Use a Min-Priority Queue storing tuples of `(effort, row, col)`. Push `(0, 0, 0)` to start.
3. While the priority queue is not empty:
   - Pop the top element `(current_effort, r, c)`.
   - If `(r, c)` is the bottom-right destination cell, return `current_effort` immediately.
   - Iterate through the 4 directional neighbors `(nr, nc)`.
   - For each valid neighbor, calculate the effort required to move there: `next_effort = max(current_effort, abs(heights[r][c] - heights[nr][nc]))`.
   - If `next_effort < dist[nr][nc]`, update `dist[nr][nc] = next_effort` and push `(next_effort, nr, nc)` into the priority queue.
4. Return `0` as a fallback for a `1 x 1` grid.

#### Complexity
* **Time Complexity:** $O(E \log V) = O((R \times C) \log(R \times C))$ where $R$ is the number of rows and $C$ is the number of columns. Each cell has at most 4 edges, and pushing/popping from the priority queue takes logarithmic time relative to the number of cells.
* **Space Complexity:** $O(R \times C)$ to store the `dist` matrix and the elements inside the priority queue.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int rows = heights.size();
        int cols = heights[0].size();
        
        // dist[r][c] stores the minimum effort required to reach cell (r, c)
        vector<vector<int>> dist(rows, vector<int>(cols, 1e9));
        dist[0][0] = 0;
        
        // Min-Priority Queue stores: {effort, {row, col}}
        priority_queue<pair<int, pair<int, int>>, 
                       vector<pair<int, pair<int, int>>>, 
                       greater<pair<int, pair<int, int>>>> pq;
        
        pq.push({0, {0, 0}});
        
        // Direction vectors for Up, Right, Down, Left
        int dr[] = {-1, 0, 1, 0};
        int dc[] = {0, 1, 0, -1};
        
        while (!pq.empty()) {
            auto [effort, cell] = pq.top();
            auto [r, c] = cell;
            pq.pop();
            
            // If we reached the destination, this is the optimal effort
            if (r == rows - 1 && c == cols - 1) {
                return effort;
            }
            
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i];
                int nc = c + dc[i];
                
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int nextEffort = max(effort, abs(heights[r][c] - heights[nr][nc]));
                    
                    if (nextEffort < dist[nr][nc]) {
                        dist[nr][nc] = nextEffort;
                        pq.push({nextEffort, {nr, nc}});
                    }
                }
            }
        }
        
        return 0;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length;
        int cols = heights[0].length;
        
        int[][] dist = new int[rows][cols];
        for (int[] row : dist) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        dist[0][0] = 0;
        
        // Min-Priority Queue stores: int[]{effort, row, col}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        pq.offer(new int[]{0, 0, 0});
        
        int[] dr = {-1, 0, 1, 0};
        int[] dc = {0, 1, 0, -1};
        
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int effort = current[0];
            int r = current[1];
            int c = current[2];
            
            if (r == rows - 1 && c == cols - 1) {
                return effort;
            }
            
            for (int i = 0; i < 4; i++) {
                int nr = r + dr[i];
                int nc = c + dc[i];
                
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int nextEffort = Math.max(effort, Math.abs(heights[r][c] - heights[nr][nc]));
                    
                    if (nextEffort < dist[nr][nc]) {
                        dist[nr][nc] = nextEffort;
                        pq.offer(new int[]{nextEffort, nr, nc});
                    }
                }
            }
        }
        
        return 0;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import heapq

class Solution:
    def minimumEffortPath(self, heights: list[list[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        
        dist = [[float('inf')] * cols for _ in range(rows)]
        dist[0][0] = 0
        
        # Min-Priority Queue stores: (effort, row, col)
        pq = [(0, 0, 0)]
        
        directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
        
        while pq:
            effort, r, c = heapq.heappop(pq)
            
            if r == rows - 1 and c == cols - 1:
                return effort
                
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                
                if 0 <= nr < rows and 0 <= nc < cols:
                    next_effort = max(effort, abs(heights[r][c] - heights[nr][nc]))
                    
                    if next_effort < dist[nr][nc]:
                        dist[nr][nc] = next_effort
                        heapq.heappush(pq, (next_effort, nr, nc))
                        
        return 0
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    
    const dist = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    dist[0][0] = 0;
    
    // Min-Priority Queue simulation using array sorting (or a custom MinHeap)
    const pq = [[0, 0, 0]]; // [effort, row, col]
    
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
    
    while (pq.length > 0) {
        // Sort in descending order to pop the smallest effort from the end in O(1)
        pq.sort((a, b) => b[0] - a[0]);
        const [effort, r, c] = pq.pop();
        
        if (r === rows - 1 && c === cols - 1) {
            return effort;
        }
        
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const nextEffort = Math.max(effort, Math.abs(heights[r][c] - heights[nr][nc]));
                
                if (nextEffort < dist[nr][nc]) {
                    dist[nr][nc] = nextEffort;
                    pq.push([nextEffort, nr, nc]);
                }
            }
        }
    }
    
    return 0;
};
```

  </TabItem>
</Tabs>
