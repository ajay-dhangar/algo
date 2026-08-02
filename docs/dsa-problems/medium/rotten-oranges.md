---
id: rotten-oranges
title: "Rotten Oranges Algorithm"
sidebar_label: "RottenOranges algorithm"
tags: [Leetcode, BFS, Graph, DSA, Rotten Oranges]
description: "Solve the Rotten Oranges problem using Breadth-First Search (BFS) to determine the minimum time required for all fresh oranges to rot."
---

The Rotten Oranges problem is a grid-based problem that involves determining the minimum time required for all fresh oranges to rot given an initial configuration of fresh and rotten oranges.

<AdsComponent />

## Problem Definition

**Given:** A 2D grid where each cell can have one of three values:
0: an empty cell
1: a fresh orange
2: a rotten orange

**Video Explanation**

<LiteYouTubeEmbed
  id="yf3oUhkvqA0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="G-10. Rotten Oranges | C++ | Java"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

**Objective:** Return the minimum number of minutes needed for all fresh oranges to become rotten. If all oranges can’t rot, return -1.
Algorithm Overview

**Breadth-First Search (BFS) Approach:**

Use BFS to simulate the spread of rotting from each rotten orange to adjacent fresh oranges. Each level of BFS represents one minute.
Initialization:

Initialize a queue with all initial rotten oranges and count the fresh oranges.
Track the minutes taken for all oranges to rot.
Processing BFS Levels:

For each rotten orange, attempt to rot adjacent fresh oranges (up, down, left, right).
Add newly rotten oranges to the queue and decrease the count of fresh oranges.
Result Evaluation:

<AdsComponent />

If there are no remaining fresh oranges after BFS, return the minutes taken. If fresh oranges remain, return -1.
Time Complexity
Time Complexity: O(n * m), where n is the number of rows and m is the number of columns, as each cell is processed at most once.
Space Complexity: O(n * m) for the BFS queue.
C++ Implementation

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        queue<pair<int, int>> rottenQueue;
        int freshOranges = 0;
        int minutes = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) {
                    rottenQueue.push({i, j});
                } else if (grid[i][j] == 1) {
                    freshOranges++;
                }
            }
        }

        vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!rottenQueue.empty() && freshOranges > 0) {
            int size = rottenQueue.size();
            minutes++;
            for (int i = 0; i < size; i++) {
                auto [x, y] = rottenQueue.front();
                rottenQueue.pop();
                for (auto [dx, dy] : directions) {
                    int newX = x + dx;
                    int newY = y + dy;
                    if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && grid[newX][newY] == 1) {
                        grid[newX][newY] = 2;
                        freshOranges--;
                        rottenQueue.push({newX, newY});
                    }
                }
            }
        }
        return freshOranges == 0 ? minutes : -1;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) {
                    queue.offer(new int[]{r, c});
                } else if (grid[r][c] == 1) {
                    fresh++;
                }
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (!queue.isEmpty() && fresh > 0) {
            int size = queue.size();
            minutes++;
            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0];
                    int nc = curr[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
from collections import deque

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
                    
        if fresh == 0:
            return 0
            
        minutes = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while queue and fresh > 0:
            minutes += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                        grid[nr][nc] = 2;
                        fresh -= 1;
                        queue.append((nr, nc))
                        
        return minutes if fresh == 0 else -1
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let fresh = 0;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                fresh++;
            }
        }
    }
    
    if (fresh === 0) return 0;
    
    let minutes = 0;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (queue.length > 0 && fresh > 0) {
        const size = queue.length;
        minutes++;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    
    return fresh === 0 ? minutes : -1;
};
```

  </TabItem>
</Tabs>
