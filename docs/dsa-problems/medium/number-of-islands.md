---
id: number-of-islands
title: "Number of Islands"
sidebar_label: Number of Islands
description: "Solution for LeetCode 200: Number of Islands, utilizing Graph Traversal (DFS) to count connected components in a matrix."
tags: [DSA, leetcode, graph, dfs, bfs, matrix]
---

## Description:

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="muncqlKJrHc"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Number of Islands | LeetCode 200 | Graph"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) (Optimal)

This problem essentially asks us to find the number of **Connected Components** in an undirected graph disguised as a 2D matrix. Every `'1'` represents a land node, and it is connected to adjacent `'1'`s.

We can solve this by iterating through every cell in the grid. Whenever we encounter a `'1'`, it means we have found a new, unvisited island. We increment our island count, and then use a Depth-First Search (DFS) to traverse the entire island, marking all connected `'1'`s as visited so we don't double-count them later.

**Algorithm:**
1. Initialize an `island_count` to 0.
2. Iterate through every cell `(r, c)` in the `m x n` grid.
3. If the current cell is `'1'` (land):
   - Increment `island_count` by 1.
   - Launch a `dfs(r, c)` helper function to explore the island.
4. In the `dfs` function:
   - Base Case: If the current row `r` or column `c` is out of bounds, or if the current cell is `'0'` (water), return immediately.
   - Mark the current cell as visited by changing its value from `'1'` to `'0'`. This modifies the grid in-place to save memory (alternatively, you could use a separate `visited` boolean matrix).
   - Recursively call `dfs` on all 4 adjacent directions (up, down, left, right).
5. Return the final `island_count`.

#### Complexity
* **Time Complexity:** $O(M \times N)$ where $M$ is the number of rows and $N$ is the number of columns. We visit every cell in the grid a constant number of times.
* **Space Complexity:** $O(M \times N)$ in the worst case for the recursion call stack. This happens if the entire grid is filled with `'1'`s, meaning the DFS goes $M \times N$ levels deep. 

#### Solutions:

**C++**
```cpp
class Solution {
private:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        // Boundary checks and water check
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') {
            return;
        }
        
        // Mark as visited by sinking the land
        grid[r][c] = '0';
        
        // Traverse all 4 adjacent directions
        dfs(grid, r - 1, c); // Up
        dfs(grid, r + 1, c); // Down
        dfs(grid, r, c - 1); // Left
        dfs(grid, r, c + 1); // Right
    }
    
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        
        int count = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
};
```

**Java**
```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
    
    private void dfs(char[][] grid, int r, int c) {
        // Boundary checks and water check
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') {
            return;
        }
        
        // Mark as visited by sinking the land
        grid[r][c] = '0';
        
        // Traverse all 4 adjacent directions
        dfs(grid, r - 1, c); // Up
        dfs(grid, r + 1, c); // Down
        dfs(grid, r, c - 1); // Left
        dfs(grid, r, c + 1); // Right
    }
}
```

**Python**
```py
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
            
        count = 0
        rows, cols = len(grid), len(grid[0])
        
        def dfs(r, c):
            # Boundary checks and water check
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
                return
                
            # Mark as visited by sinking the land
            grid[r][c] = '0'
            
            # Traverse all 4 adjacent directions
            dfs(r - 1, c) # Up
            dfs(r + 1, c) # Down
            dfs(r, c - 1) # Left
            dfs(r, c + 1) # Right
            
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
                    
        return count
```

**JavaScript**
```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    
    const dfs = (r, c) => {
        // Boundary checks and water check
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        // Mark as visited by sinking the land
        grid[r][c] = '0';
        
        // Traverse all 4 adjacent directions
        dfs(r - 1, c); // Up
        dfs(r + 1, c); // Down
        dfs(r, c - 1); // Left
        dfs(r, c + 1); // Right
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    
    return count;
};
```