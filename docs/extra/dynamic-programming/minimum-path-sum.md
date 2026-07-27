---
id: minimum-path-sum
title: "Minimum Path Sum"
sidebar_label: "Minimum Path Sum"
sidebar_position: 10
description: "A grid dynamic programming problem finding the path with minimum sum from top-left to bottom-right, with O(m*n) time and O(n) space solutions."
tags: ["dsa", "algorithms", "dynamic-programming", "grid-dp"]
---

# Minimum Path Sum

## Overview

The Minimum Path Sum problem asks: given an m x n grid with non-negative numbers, find the path from top-left to bottom-right that minimizes the sum of numbers along the path. You can only move right or down.

## Problem Definition

```
Given: m x n grid
       grid[i][j] >= 0

Goal: Find path from (0,0) to (m-1,n-1)
      moving only right or down
      minimizing sum of visited cells

Example Grid:
    1   3   1
    1   5   1
    4   2   1

Optimal Path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2)
Sum: 1 + 3 + 1 + 1 + 1 = 7
```

## Recurrence Relation

The key insight is that any cell (i,j) can only be reached from:
- The cell above: (i-1, j)
- The cell to the left: (i, j-1)

Therefore:
```
dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
```

**Base cases:**
- dp[0][0] = grid[0][0]
- dp[0][j] = grid[0][j] + dp[0][j-1] (first row, only from left)
- dp[i][0] = grid[i][0] + dp[i-1][0] (first column, only from above)

## Python Implementation

### Standard DP (Tabulation)

```python
def min_path_sum(grid: list) -> int:
    """
    Find minimum path sum in grid.
    
    Args:
        grid: m x n matrix of non-negative integers
        
    Returns:
        Minimum sum path from (0,0) to (m-1,n-1)
        
    Time: O(m * n)
    Space: O(m * n)
    """
    if not grid or not grid[0]:
        return 0
    
    m, n = len(grid), len(grid[0])
    
    # Create DP table
    dp = [[0] * n for _ in range(m)]
    
    # Base case: start cell
    dp[0][0] = grid[0][0]
    
    # Fill first row (can only come from left)
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    
    # Fill first column (can only come from above)
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    
    # Fill rest of the table
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    
    return dp[m-1][n-1]


def min_path_sum_with_path(grid: list) -> tuple:
    """
    Find minimum path sum AND the actual path.
    
    Returns:
        Tuple of (min_sum, path)
    """
    if not grid or not grid[0]:
        return 0, []
    
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    
    dp[0][0] = grid[0][0]
    
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    
    # Backtrack to find path
    path = []
    i, j = m - 1, n - 1
    path.append((i, j))
    
    while i > 0 or j > 0:
        if i == 0:
            j -= 1
        elif j == 0:
            i -= 1
        elif dp[i-1][j] < dp[i][j-1]:
            i -= 1
        else:
            j -= 1
        path.append((i, j))
    
    path.reverse()
    return dp[m-1][n-1], path
```

### Space-Optimized Solution

```python
def min_path_sum_optimized(grid: list) -> int:
    """
    Space-optimized solution using O(n) space.
    
    Time: O(m * n)
    Space: O(n)
    """
    if not grid or not grid[0]:
        return 0
    
    m, n = len(grid), len(grid[0])
    
    # Use 1D array where dp[j] represents current row
    dp = [float('inf')] * n
    dp[0] = 0
    
    for i in range(m):
        for j in range(n):
            if j == 0:
                # First column: can only come from above
                dp[j] = dp[j] + grid[i][j]
            else:
                # Current cell = grid[i][j] + min(above in dp, left in dp)
                dp[j] = grid[i][j] + min(dp[j], dp[j-1])
    
    return dp[n-1]


def min_path_sum_row_optimized(grid: list) -> int:
    """
    Even more explicit: use previous and current row.
    
    Time: O(m * n)
    Space: O(n)
    """
    if not grid or not grid[0]:
        return 0
    
    m, n = len(grid), len(grid[0])
    prev_row = [float('inf')] * n
    
    for i in range(m):
        curr_row = [float('inf')] * n
        for j in range(n):
            if i == 0 and j == 0:
                curr_row[j] = grid[i][j]
            elif i == 0:
                curr_row[j] = grid[i][j] + curr_row[j-1]
            elif j == 0:
                curr_row[j] = grid[i][j] + prev_row[j]
            else:
                curr_row[j] = grid[i][j] + min(prev_row[j], curr_row[j-1])
        prev_row = curr_row
    
    return prev_row[n-1]
```

## JavaScript Implementation

### In-Place Modification (Space O(1))

```javascript
/**
 * Minimum Path Sum - In-place modification approach
 * 
 * @param {number[][]} grid - m x n grid
 * @returns {number} - Minimum path sum
 * 
 * Time: O(m * n)
 * Space: O(1) - modifies grid in place
 */
function minPathSum(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    
    const m = grid.length;
    const n = grid[0].length;
    
    // Modify first cell (already correct)
    
    // Fill first row
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }
    
    // Fill first column
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    
    // Fill rest - current cell = grid[i][j] + min(above, left)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    return grid[m - 1][n - 1];
}

/**
 * With path reconstruction
 */
function minPathSumWithPath(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return { sum: 0, path: [] };
    }
    
    const m = grid.length;
    const n = grid[0].length;
    
    // DP in separate array (to preserve grid)
    const dp = grid.map(row => [...row]);
    
    // First row
    for (let j = 1; j < n; j++) {
        dp[0][j] += dp[0][j - 1];
    }
    
    // First column
    for (let i = 1; i < m; i++) {
        dp[i][0] += dp[i - 1][0];
    }
    
    // Rest
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] += Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    // Backtrack path
    const path = [];
    let i = m - 1, j = n - 1;
    
    while (i > 0 || j > 0) {
        path.unshift([i, j]);
        if (i === 0) {
            j--;
        } else if (j === 0) {
            i--;
        } else if (dp[i - 1][j] < dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    path.unshift([0, 0]);
    
    return { sum: dp[m - 1][n - 1], path };
}

// Example usage
const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
];

console.log(`Minimum path sum: ${minPathSum([...grid.map(r => [...r])])}`);
console.log(`With path:`, minPathSumWithPath([...grid.map(r => [...r])]));
```

## Visual Walkthrough

```
Grid:
    1   3   1
    1   5   1
    4   2   1

DP Table after filling:
    1   4   5
    2   7   6
    6   8   7

Step by step:
(0,0): 1              dp[0][0] = 1
(0,1): 1 + 3 = 4      dp[0][1] = dp[0][0] + 3 = 4
(0,2): 4 + 1 = 5      dp[0][2] = dp[0][1] + 1 = 5
(1,0): 1 + 1 = 2      dp[1][0] = dp[0][0] + 1 = 2
(1,1): 1 + min(4,2)   dp[1][1] = grid[1][1] + min(dp[0][1], dp[1][0])
      = 5 + min(4,2)   = 5 + 2 = 7
      = 7
(1,2): 1 + min(5,7)   dp[1][2] = grid[1][2] + min(dp[0][2], dp[1][1])
      = 1 + min(5,7)   = 1 + 5 = 6
      = 6
(2,0): 4 + 2 = 6      dp[2][0] = dp[1][0] + 4 = 6
(2,1): 2 + min(7,6)   dp[2][1] = grid[2][1] + min(dp[1][1], dp[2][0])
      = 2 + min(7,6)   = 2 + 6 = 8
      = 8
(2,2): 1 + min(6,8)   dp[2][2] = grid[2][2] + min(dp[1][2], dp[2][1])
      = 1 + min(6,8)   = 1 + 6 = 7
      = 7

Answer: dp[2][2] = 7
```

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Standard DP (2D table) | O(m * n) | O(m * n) |
| Space-optimized (1D) | O(m * n) | O(n) |
| In-place modification | O(m * n) | O(1) |
| Recursive + memoization | O(m * n) | O(m * n) |

## LeetCode Problem

**LeetCode 64 - Minimum Path Sum**

```python
# Standard solution for LeetCode
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        return min_path_sum(grid)
```

## Common Pitfalls

1. **Forgetting base cases**: First row and column need special handling
2. **Off-by-one errors**: Remember dp indices match grid indices
3. **Not handling empty grid**: Always check for edge cases
4. **Modifying input grid**: Use copy if input must be preserved
