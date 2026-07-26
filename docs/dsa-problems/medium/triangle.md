---
id: triangle
title: "Triangle"
sidebar_label: Triangle
description: "Solving the Triangle problem using Dynamic Programming (Bottom-Up space optimization)."
tags: [DSA, leetcode, dynamic-programming, array, matrix]
---

## Description:

Given a `triangle` array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.

**Example 1:**

Input: `triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]`
Output: `11`
**Explanation:** The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11.

**Example 2:**

Input: `triangle = [[-10]]`
Output: `-10`

---

## Video Explanation:

<LiteYouTubeEmbed
  id="SrP-PiLSYC0"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Triangle | DP on Grids"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Dynamic Programming (Bottom-Up Space Optimized)

To find the minimum path sum, we can start from the bottom row and work our way up to the top. This avoids the need for bounds checking and naturally converges on the root element.

At any given cell `(i, j)`, the minimum path sum to reach the bottom is the value of the cell itself plus the minimum of the two possible downward paths: directly below `(i+1, j)` or below-right `(i+1, j+1)`.

We can optimize the space complexity by recognizing that we only ever need the results from the row immediately below us. Therefore, we can maintain a single 1D DP array initialized to the values of the bottom row, and continuously overwrite it as we move upwards.

1. **Initialize:** Create a 1D `dp` array that is an exact copy of the last row of the triangle.
2. **Iterate Bottom-Up:** Start from the second-to-last row and iterate upwards to row 0.
3. **Calculate Minimums:** For each element `j` in the current row `i`, update the DP array: 
   `dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])`
4. **Return:** After processing the top row, the minimum path sum for the entire triangle will be sitting in `dp[0]`.

#### Complexity
* **Time Complexity:** $O(N^2)$ where $N$ is the total number of rows in the triangle. We visit every single element in the matrix exactly once.
* **Space Complexity:** $O(N)$. We use a 1D array of size $N$ to keep track of the minimum path sums for the current row.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[n - 1];
        
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
            }
        }
        
        return dp[0];
    }
};
```

**Java**
```java
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        
        // Initialize the base cases from the bottom row
        for (int i = 0; i < n; i++) {
            dp[i] = triangle.get(n - 1).get(i);
        }
        
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
            }
        }
        
        return dp[0];
    }
}
```

**Python**
```py
class Solution:
    def minimumTotal(self, triangle: list[list[int]]) -> int:
        # Initialize dp array with the last row
        dp = triangle[-1][:]
        
        # Start from the second to last row and move upwards
        for i in range(len(triangle) - 2, -1, -1):
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])
                
        return dp[0]
```

**JavaScript**
```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    // Make a copy of the last row
    let dp = [...triangle[triangle.length - 1]];
    
    // Start from the second to last row and move upwards
    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    
    return dp[0];
};
```