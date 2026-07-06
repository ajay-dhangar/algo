---
id: find-a-peak-element-ii
title: "Find a Peak Element II"
sidebar_label: Find a Peak Element II
description: "Solving the Find a Peak Element II problem using Binary Search on a 2D Matrix."
tags: [DSA, leetcode, matrix, binary-search, divide-and-conquer]
---

## Description:

A **peak** element in a 2D grid is an element that is **strictly greater** than all of its adjacent neighbors to the left, right, top, and bottom.

Given a **0-indexed** `m x n` matrix `mat` where **no two adjacent cells are equal**, find **any** peak element `mat[i][j]` and return the length 2 array `[i,j]`.

You may assume that the entire matrix is surrounded by an outer perimeter with the value `-1` in every cell.

You must write an algorithm that runs in $O(M \log N)$ or $O(N \log M)$ time.

**Example 1:**

Input: `mat = [[1,4],[3,2]]`
Output: `[0,1]`
**Explanation:** Both 3 and 4 are peak elements so `[1,0]` and `[0,1]` are both acceptable answers.

**Example 2:**

Input: `mat = [[10,20,15],[21,30,14],[7,16,32]]`
Output: `[1,1]`
**Explanation:** Both 30 and 32 are peak elements so `[1,1]` and `[2,2]` are both acceptable answers.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="nGGp5XBzC4g"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Find a Peak Element II"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Optimal Approach (Binary Search)

Since we are required to solve this in $O(M \log N)$ or $O(N \log M)$ time, a linear scan of the whole matrix $O(M \times N)$ is not acceptable. We must use **Binary Search**.

We can perform a binary search on the columns (from $0$ to $N-1$). At each step, we look at the middle column `mid`. 
1. **Find Global Maximum in Column:** Iterate through all rows in the `mid` column to find the row index (`maxRow`) containing the maximum value.
2. **Evaluate Neighbors:** Since `mat[maxRow][mid]` is the largest element in its column, it is guaranteed to be strictly greater than its top and bottom neighbors. Now, we only need to compare it with its left and right neighbors.
   - If it is greater than both its left and right neighbors, we found a peak! Return `[maxRow, mid]`.
   - If its left neighbor is strictly greater, it means there *must* be a peak somewhere in the left half of the matrix. We eliminate the right half by setting `high = mid - 1`.
   - If its right neighbor is strictly greater, it means there *must* be a peak somewhere in the right half of the matrix. We eliminate the left half by setting `low = mid + 1`.

#### Complexity
* **Time Complexity:** $O(M \log N)$ where $M$ is the number of rows and $N$ is the number of columns. We perform a binary search on the columns ($\log N$) and at each step, we scan through $M$ rows to find the maximum element.
* **Space Complexity:** $O(1)$ as we only use a few pointers and integer variables.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int findMaxRow(vector<vector<int>>& mat, int col) {
        int maxVal = -1;
        int maxRow = -1;
        for (int i = 0; i < mat.size(); i++) {
            if (mat[i][col] > maxVal) {
                maxVal = mat[i][col];
                maxRow = i;
            }
        }
        return maxRow;
    }

    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int n = mat.size();
        int m = mat[0].size();
        int low = 0, high = m - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int maxRow = findMaxRow(mat, mid);

            int leftVal = mid - 1 >= 0 ? mat[maxRow][mid - 1] : -1;
            int rightVal = mid + 1 < m ? mat[maxRow][mid + 1] : -1;

            if (mat[maxRow][mid] > leftVal && mat[maxRow][mid] > rightVal) {
                return {maxRow, mid};
            } else if (mat[maxRow][mid] < leftVal) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return {-1, -1};
    }
};
```

**Java**
```java
class Solution {
    public int findMaxRow(int[][] mat, int col) {
        int maxVal = -1;
        int maxRow = -1;
        for (int i = 0; i < mat.length; i++) {
            if (mat[i][col] > maxVal) {
                maxVal = mat[i][col];
                maxRow = i;
            }
        }
        return maxRow;
    }

    public int[] findPeakGrid(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;
        int low = 0, high = m - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int maxRow = findMaxRow(mat, mid);

            int leftVal = mid - 1 >= 0 ? mat[maxRow][mid - 1] : -1;
            int rightVal = mid + 1 < m ? mat[maxRow][mid + 1] : -1;

            if (mat[maxRow][mid] > leftVal && mat[maxRow][mid] > rightVal) {
                return new int[]{maxRow, mid};
            } else if (mat[maxRow][mid] < leftVal) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return new int[]{-1, -1};
    }
}
```

**Python**
```py
class Solution:
    def findPeakGrid(self, mat: list[list[int]]) -> list[int]:
        n, m = len(mat), len(mat[0])
        low, high = 0, m - 1
        
        while low <= high:
            mid = low + (high - low) // 2
            max_row = 0
            for i in range(n):
                if mat[i][mid] > mat[max_row][mid]:
                    max_row = i
                    
            left_val = mat[max_row][mid - 1] if mid - 1 >= 0 else -1
            right_val = mat[max_row][mid + 1] if mid + 1 < m else -1
            
            if mat[max_row][mid] > left_val and mat[max_row][mid] > right_val:
                return [max_row, mid]
            elif mat[max_row][mid] < left_val:
                high = mid - 1
            else:
                low = mid + 1
                
        return [-1, -1]
```

**JavaScript**
```js
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findPeakGrid = function(mat) {
    let n = mat.length;
    let m = mat[0].length;
    let low = 0, high = m - 1;
    
    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        
        let maxRow = 0;
        for (let i = 0; i < n; i++) {
            if (mat[i][mid] > mat[maxRow][mid]) {
                maxRow = i;
            }
        }
        
        let leftVal = mid - 1 >= 0 ? mat[maxRow][mid - 1] : -1;
        let rightVal = mid + 1 < m ? mat[maxRow][mid + 1] : -1;
        
        if (mat[maxRow][mid] > leftVal && mat[maxRow][mid] > rightVal) {
            return [maxRow, mid];
        } else if (mat[maxRow][mid] < leftVal) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return [-1, -1];
};
```