---
id: rotate-image
sidebar_position: 5
title: Rotate Image
sidebar_label: Rotate Image
description: "This document explains the Rotate Image problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# rotate-image

## Description
You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **Do not** allocate another 2D matrix and do the rotation.

### Example:
**Input**: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`  
**Output**: `[[7,4,1],[8,5,2],[9,6,3]]`

**Input**: `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`  
**Output**: `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`

## Approach
To rotate the matrix by 90 degrees in-place, the approach can be divided into two steps:

1. **Transpose the Matrix**: Convert the rows of the matrix into columns. This can be done by swapping `matrix[i][j]` with `matrix[j][i]` for all `i` and `j`.
   
2. **Reverse Each Row**: Once the matrix is transposed, reverse each row. This will complete the 90-degree rotation.

### Steps:
1. **Transpose** the matrix: Swap `matrix[i][j]` with `matrix[j][i]` for all `i` and `j`.
2. **Reverse each row** of the matrix.

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        int n = matrix.size();

        // Step 1: Transpose the matrix
        for (int i = 0; i < n; ++i) {
            for (int j = i; j < n; ++j) {
                std::swap(matrix[i][j], matrix[j][i]);
            }
        }

        // Step 2: Reverse each row
        for (int i = 0; i < n; ++i) {
            std::reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```
Time Complexity: O(n^2)  <br/>
Space Complexity: O(1) 