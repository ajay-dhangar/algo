---
id: beautiful-subgrids
title: Beautiful Subgrids Problem - Efficient Detection
sidebar_label: Beautiful Subgrids
sidebar_position: 3
description: "In this post, we'll explore the Beautiful Subgrids problem, an algorithmic challenge that focuses on efficiently detecting subgrids in a matrix that meet specific criteria. We'll delve into the problem's constraints, discuss the approach for finding beautiful subgrids, and provide solutions in multiple languages such as C++, Java, Python, JavaScript, and Go. By the end, you'll understand how to count beautiful subgrids in a grid efficiently."
tags: [dsa, dp, grid problems, matrix]
---

## Problem Definition

The Beautiful Subgrids problem involves finding subgrids within a larger 2D grid that possess certain "beautiful" properties, such as symmetry or uniformity in values. The challenge is to efficiently count such subgrids, especially as the grid size increases.

### Constraints

- The dimensions of the grid can be large, potentially reaching up to \(10^5\) rows and \(10^5\) columns.
- The values within the grid can range between a specified set of integers.

## Approach

To solve the Beautiful Subgrids problem, we can use a straightforward approach that involves iterating through all possible subgrids and checking if each one meets the criteria for being beautiful. The efficiency of the algorithm is crucial, especially for large inputs.

### Efficient Detection of Beautiful Subgrids

1. **Iterate Through All Possible Subgrids**: For each position in the grid, consider all possible square subgrids that can originate from that position.
  
2. **Check for Beauty**: For each subgrid, check if it satisfies the beautiful condition (e.g., all elements being equal).

3. **Count Valid Subgrids**: Maintain a counter to count how many of these subgrids are considered beautiful.

## Complexity Analysis

- **Time Complexity**: The worst-case time complexity is \(O(m^2 . n^2)\), where \(m\) is the number of rows and \(n\) is the number of columns in the grid.
- **Space Complexity**: The space complexity is \(O(1)\) for auxiliary storage, but this could increase if storing subgrids is necessary.

## Code Implementations

Here are implementations of the Beautiful Subgrids problem in various programming languages:

C++:

```cpp
#include <iostream>
#include <vector>

using namespace std;

// Function to check if a subgrid is beautiful
bool isBeautiful(const vector<vector<int>>& subgrid) {
    int firstValue = subgrid[0][0];
    for (const auto& row : subgrid) {
        for (int cell : row) {
            if (cell != firstValue) {
                return false;
            }
        }
    }
    return true; // Uniform check
}

// Function to count beautiful subgrids
int countBeautifulSubgrids(const vector<vector<int>>& grid) {
    int m = grid.size();
    int n = grid[0].size();
    int beautifulCount = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            for (int size = 1; size <= min(m - i, n - j); size++) {
                vector<vector<int>> subgrid(size, vector<int>(size));
                for (int k = 0; k < size; k++) {
                    for (int l = 0; l < size; l++) {
                        subgrid[k][l] = grid[i + k][j + l];
                    }
                }
                if (isBeautiful(subgrid)) {
                    beautifulCount++;
                }
            }
        }
    }
    return beautifulCount;
}
```

Java: 

```java
public class BeautifulSubgrids {
    public static boolean isBeautiful(int[][] subgrid) {
        int firstValue = subgrid[0][0];
        for (int[] row : subgrid) {
            for (int cell : row) {
                if (cell != firstValue) {
                    return false;
                }
            }
        }
        return true; // Uniform check
    }

    public static int countBeautifulSubgrids(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int beautifulCount = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                for (int size = 1; size <= Math.min(m - i, n - j); size++) {
                    int[][] subgrid = new int[size][size];
                    for (int k = 0; k < size; k++) {
                        for (int l = 0; l < size; l++) {
                            subgrid[k][l] = grid[i + k][j + l];
                        }
                    }
                    if (isBeautiful(subgrid)) {
                        beautifulCount++;
                    }
                }
            }
        }
        return beautifulCount;
    }
}
```

Python: 

```python
def is_beautiful(subgrid):
    first_value = subgrid[0][0]
    for row in subgrid:
        if any(cell != first_value for cell in row):
            return False
    return True  # Uniform check

def count_beautiful_subgrids(grid):
    m, n = len(grid), len(grid[0])
    beautiful_count = 0

    for i in range(m):
        for j in range(n):
            for size in range(1, min(m - i, n - j) + 1):
                subgrid = [row[j:j + size] for row in grid[i:i + size]]
                if is_beautiful(subgrid):
                    beautiful_count += 1

    return beautiful_count
```

Javascript:

```javascript
function isBeautiful(subgrid) {
    const firstValue = subgrid[0][0];
    return subgrid.every(row => row.every(cell => cell === firstValue)); // Uniform check
}

function countBeautifulSubgrids(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let beautifulCount = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let size = 1; size <= Math.min(m - i, n - j); size++) {
                const subgrid = grid.slice(i, i + size).map(row => row.slice(j, j + size));
                if (isBeautiful(subgrid)) {
                    beautifulCount++;
                }
            }
        }
    }
    return beautifulCount;
}
```

Go: 

```go
package main

import "fmt"

func isBeautiful(subgrid [][]int) bool {
    firstValue := subgrid[0][0]
    for _, row := range subgrid {
        for _, cell := range row {
            if cell != firstValue {
                return false
            }
        }
    }
    return true // Uniform check
}

func countBeautifulSubgrids(grid [][]int) int {
    m := len(grid)
    n := len(grid[0])
    beautifulCount := 0

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            for size := 1; size <= min(m-i, n-j); size++ {
                subgrid := make([][]int, size)
                for k := 0; k < size; k++ {
                    subgrid[k] = make([]int, size)
                    for l := 0; l < size; l++ {
                        subgrid[k][l] = grid[i+k][j+l]
                    }
                }
                if isBeautiful(subgrid) {
                    beautifulCount++
                }
            }
        }
    }
    return beautifulCount
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

## Conclusion

The Beautiful Subgrids problem presents an interesting challenge that can be approached through a systematic enumeration of potential subgrids. By understanding the properties of beautiful subgrids and applying an efficient counting strategy, we can solve this problem effectively. This algorithm can be optimized further depending on the specific characteristics of the input grid.

