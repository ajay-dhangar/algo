---
id: unique-paths
title: Unique Paths
sidebar_label: Unique Paths
description: >-
  The Unique Paths problem on LeetCode involves finding the number of possible
  unique paths for a robot to reach the bottom-right corner of a grid.
tags:
  - DSA
  - leetcode
  - dynamic-programming
  - combinatorics
  - math
companies:
  - Google
  - Microsoft
  - Netflix
---

## Description:
There is a robot on an `m x n` grid. The robot is initially located at the top-left corner (i.e., `grid[0][0]`). The robot tries to move to the bottom-right corner (i.e., `grid[m-1][n-1]`). The robot can only move either down or right at any point in time.

Given the two integers `m` and `n`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to `2 * 10^9`.

## Video Explanation

<LiteYouTubeEmbed
  id="sdE0A2Oxofw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="DP 8. Grid Unique Paths | Learn Everything about DP on Grids | ALL TECHNIQUES"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

**Example 1:**
Input: `m = 3`, `n = 7`
Output: `28`

**Example 2:**
Input: `m = 3`, `n = 2`
Output: `3`
**Explanation:** From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down

---

## Approaches:

### 1. Dynamic Programming (Tabulation)
The problem asks for the total number of unique paths to a specific cell. The number of ways to reach cell `(i, j)` is the sum of the ways to reach the cell directly above it `(i-1, j)` and the cell directly to its left `(i, j-1)`. 

We can create a 2D table `dp` of size `m x n`. We initialize the first row and the first column to `1` because there is only one way to reach any cell in the first row (by moving strictly right) or the first column (by moving strictly down). For all other cells, `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.

* **Time Complexity:** $O(m \times n)$ because we iterate through every cell in the grid once.
* **Space Complexity:** $O(m \times n)$ to store the DP table. (Note: This can be further space-optimized to $O(n)$ by keeping track of only the previous row).

#### DP Solutions:

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        std::vector<std::vector<int>> dp(m, std::vector<int>(n, 1));
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        
        return dp[m-1][n-1];
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        for(int i = 0; i < m; i++) dp[i][0] = 1;
        for(int j = 0; j < n; j++) dp[0][j] = 1;
        
        for(int i = 1; i < m; i++){
            for(int j = 1; j < n; j++){
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        
        return dp[m-1][n-1];
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]
        
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
                
        return dp[m-1][n-1]
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let dp = Array(m).fill().map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
};
```

  </TabItem>
</Tabs>
