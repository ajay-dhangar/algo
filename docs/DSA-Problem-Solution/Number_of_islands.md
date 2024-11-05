---
id: number-of-islands
title: "Counting the Number of Islands"
sidebar_label: "Counting the Number of Islands"
sidebar_position: 10
description: "This document explains the 'Number of Islands' problem, including its description, approach, and implementation."
tags: [DSA, problem-solving, graph]
---

# Counting the Number of Islands

## Problem Description

Given a 2D grid of `m x n` cells where each cell can be either `0` (water) or `1` (land), the task is to count the number of islands. An island is formed by connecting adjacent lands horizontally or vertically. 

You can assume all four edges of the grid are surrounded by water. Two cells are considered part of the same island if they are directly adjacent (horizontally or vertically).

For example, given the following grid:

```
1 1 0 0 0
1 1 0 0 1
0 0 0 1 1
0 0 0 0 0
```

The output should be `3`, as there are three distinct islands.

## Approach

To solve the problem of counting the number of islands, we can use Depth-First Search (DFS) or Breadth-First Search (BFS). The steps are as follows:

1. **Traverse the Grid**:
   - Iterate through each cell in the grid.
   - Whenever a land cell (`1`) is encountered, increment the island count and perform a DFS or BFS to mark all connected land cells.

2. **Mark Visited Cells**:
   - During the traversal, change the value of visited land cells to `0` (or another marker) to prevent counting them again.

3. **Count Islands**:
   - Each time a new island is discovered (when a `1` is found), we consider it as a new island and mark all its connected parts.

## Time Complexity

The time complexity of this approach is **O(m * n)**, where `m` is the number of rows and `n` is the number of columns in the grid. This is because, in the worst case, we may need to visit each cell once. The space complexity is **O(m * n)** as well if we consider the recursion stack for DFS, but it can be reduced to **O(1)** for BFS if we use an iterative approach with a queue.

## Implementation

### Java Implementation

```java
class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int count = 0;
        int rows = grid.length;
        int cols = grid[0].length;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0'; // Mark the cell as visited
        dfs(grid, i + 1, j); // Down
        dfs(grid, i - 1, j); // Up
        dfs(grid, i, j + 1); // Right
        dfs(grid, i, j - 1); // Left
    }
}
```

### C++ Implementation

```cpp
#include <vector>

class Solution {
public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        if (grid.empty()) return 0;

        int count = 0;
        int rows = grid.size();
        int cols = grid[0].size();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }

private:
    void dfs(std::vector<std::vector<char>>& grid, int i, int j) {
        if (i < 0 || i >= grid.size() || j < 0 || j >= grid[0].size() || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0'; // Mark the cell as visited
        dfs(grid, i + 1, j); // Down
        dfs(grid, i - 1, j); // Up
        dfs(grid, i, j + 1); // Right
        dfs(grid, i, j - 1); // Left
    }
};
```

### Python Implementation

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        
        count = 0
        rows, cols = len(grid), len(grid[0])
        
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    count += 1
                    self.dfs(grid, i, j)
        
        return count

    def dfs(self, grid, i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':
            return
        
        grid[i][j] = '0'  # Mark the cell as visited
        self.dfs(grid, i + 1, j)  # Down
        self.dfs(grid, i - 1, j)  # Up
        self.dfs(grid, i, j + 1)  # Right
        self.dfs(grid, i, j - 1)  # Left
```
