---
id: 2d-prefix-sum
title: 2D Prefix Sum
sidebar_label: 2D Prefix Sum
sidebar_position: 2
description: "Extend the Prefix Sum technique to two dimensions — efficiently answer rectangular range sum queries on a 2D grid in O(1) after O(m×n) preprocessing. Includes intuition, dry runs, and multi-language implementations."
tags: [dsa, algorithms, prefix sum, 2d prefix sum, matrix, range query, competitive programming]
---

## 2D Prefix Sum

### Introduction & Intuition

The **2D Prefix Sum** (also called the *summed area table* or *integral image*) extends the 1D prefix sum idea to matrices.

**Problem:** Given a 2D matrix of size `m × n`, answer queries of the form:  
*"What is the sum of all elements in the rectangle with top-left `(r1, c1)` and bottom-right `(r2, c2)`?"*

**Naïve approach:** Iterate through every cell in the rectangle — O(m × n) per query.  
**2D Prefix Sum:** Preprocess in O(m × n), then answer each query in **O(1)**.

---

### Building the 2D Prefix Array

Let `P[i][j]` = sum of all elements in the rectangle from `(1,1)` to `(i,j)`.

**Recurrence:**

```
P[i][j] = arr[i][j]
         + P[i-1][j]      (sum above)
         + P[i][j-1]      (sum to left)
         - P[i-1][j-1]    (subtract double-counted top-left rectangle)
```

This is the **inclusion-exclusion** principle applied to 2D.

---

### Dry Run — Building the Prefix Matrix

Given matrix (1-indexed):

```
arr =
  [ 1,  2,  3 ]
  [ 4,  5,  6 ]
  [ 7,  8,  9 ]
```

Computing `P[i][j]`:

```
P[1][1] = 1
P[1][2] = 1 + 2 = 3
P[1][3] = 1 + 2 + 3 = 6

P[2][1] = 1 + 4 = 5
P[2][2] = arr[2][2] + P[1][2] + P[2][1] - P[1][1]
        = 5 + 3 + 5 - 1 = 12
P[2][3] = arr[2][3] + P[1][3] + P[2][2] - P[1][2]
        = 6 + 6 + 12 - 3 = 21

P[3][1] = 1 + 4 + 7 = 12
P[3][2] = arr[3][2] + P[2][2] + P[3][1] - P[2][1]
        = 8 + 12 + 12 - 5 = 27
P[3][3] = arr[3][3] + P[2][3] + P[3][2] - P[2][2]
        = 9 + 21 + 27 - 12 = 45
```

Final prefix matrix:

```
P =
  [  1,  3,  6 ]
  [  5, 12, 21 ]
  [ 12, 27, 45 ]
```

---

### Range Sum Query — Dry Run

**Query:** Sum of rectangle from `(2,2)` to `(3,3)` → expected = `5 + 6 + 8 + 9 = 28`

**Formula:**

```
rectSum(r1, c1, r2, c2) = P[r2][c2]
                        - P[r1-1][c2]
                        - P[r2][c1-1]
                        + P[r1-1][c1-1]
```

Substituting:

```
rectSum(2, 2, 3, 3) = P[3][3] - P[1][3] - P[3][1] + P[1][1]
                    = 45 - 6 - 12 + 1
                    = 28  ✓
```

---

### Visualizing the Formula

The formula uses inclusion-exclusion:

```
┌─────────────────────┐
│                     │
│  P[r1-1][c1-1]  ───►│  P[r1-1][c2]
│                     │
│  ─────────────────  │
│                     │
│  P[r2][c1-1]    ───►│  P[r2][c2]  ← this is what we want
└─────────────────────┘

rectSum = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]
```

- **Subtract** top region: `P[r1-1][c2]`
- **Subtract** left region: `P[r2][c1-1]`
- **Add back** top-left corner (subtracted twice): `P[r1-1][c1-1]`

---

### Time & Space Complexity

| Operation               | Complexity  |
|-------------------------|-------------|
| Build 2D prefix matrix  | O(m × n)    |
| Single rectangle query  | O(1)        |
| Total for Q queries     | O(m×n + Q)  |
| Space (prefix matrix)   | O(m × n)    |

---

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m = 3, n = 3;
    vector<vector<int>> arr = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // Build 2D prefix sum (1-indexed)
    vector<vector<long long>> P(m + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            P[i][j] = arr[i-1][j-1]
                    + P[i-1][j]
                    + P[i][j-1]
                    - P[i-1][j-1];
        }
    }

    // Rectangle sum query (1-indexed)
    auto rectSum = [&](int r1, int c1, int r2, int c2) -> long long {
        return P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1];
    };

    // Example queries
    cout << "Sum of (2,2) to (3,3) = " << rectSum(2, 2, 3, 3) << endl; // 28
    cout << "Sum of (1,1) to (2,2) = " << rectSum(1, 1, 2, 2) << endl; // 12
    cout << "Sum of (1,1) to (3,3) = " << rectSum(1, 1, 3, 3) << endl; // 45

    return 0;
}
```

**Output:**
```
Sum of (2,2) to (3,3) = 28
Sum of (1,1) to (2,2) = 12
Sum of (1,1) to (3,3) = 45
```

---

### Java Implementation

```java
public class TwoDPrefixSum {

    static long[][] buildPrefix(int[][] arr) {
        if (arr == null || arr.length == 0 || arr[0].length == 0) {
            return new long[0][0];
        }
        int m = arr.length, n = arr[0].length;
        long[][] P = new long[m + 1][n + 1]; // 1-indexed
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                P[i][j] = arr[i-1][j-1]
                         + P[i-1][j]
                         + P[i][j-1]
                         - P[i-1][j-1];
            }
        }
        return P;
    }

    static long rectSum(long[][] P, int r1, int c1, int r2, int c2) {
        return P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1];
    }

    public static void main(String[] args) {
        int[][] arr = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        long[][] P = buildPrefix(arr);

        System.out.println("Sum of (2,2)-(3,3) = " + rectSum(P, 2, 2, 3, 3)); // 28
        System.out.println("Sum of (1,1)-(2,2) = " + rectSum(P, 1, 1, 2, 2)); // 12
        System.out.println("Sum of (1,1)-(3,3) = " + rectSum(P, 1, 1, 3, 3)); // 45
    }
}
```

---

### Python Implementation

```python
def build_2d_prefix(arr):
    if not arr or not arr[0]:
        return []
    m, n = len(arr), len(arr[0])
    P = [[0] * (n + 1) for _ in range(m + 1)]  # 1-indexed
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            P[i][j] = (arr[i-1][j-1]
                      + P[i-1][j]
                      + P[i][j-1]
                      - P[i-1][j-1])
    return P

def rect_sum(P, r1, c1, r2, c2):
    """Returns sum of rectangle (r1,c1) to (r2,c2) — 1-indexed."""
    return P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]

# Example usage
arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
P = build_2d_prefix(arr)

print(f"Sum of (2,2)-(3,3) = {rect_sum(P, 2, 2, 3, 3)}")  # 28
print(f"Sum of (1,1)-(2,2) = {rect_sum(P, 1, 1, 2, 2)}")  # 12
print(f"Sum of (1,1)-(3,3) = {rect_sum(P, 1, 1, 3, 3)}")  # 45
```

---

### JavaScript Implementation

```javascript
function build2DPrefix(arr) {
    const m = arr.length, n = arr[0].length;
    const P = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            P[i][j] = arr[i-1][j-1]
                    + P[i-1][j]
                    + P[i][j-1]
                    - P[i-1][j-1];
        }
    }
    return P;
}

function rectSum(P, r1, c1, r2, c2) {
    return P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1];
}

// Example usage
const arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const P = build2DPrefix(arr);

console.log(`Sum of (2,2)-(3,3) = ${rectSum(P, 2, 2, 3, 3)}`); // 28
console.log(`Sum of (1,1)-(2,2) = ${rectSum(P, 1, 1, 2, 2)}`); // 12
console.log(`Sum of (1,1)-(3,3) = ${rectSum(P, 1, 1, 3, 3)}`); // 45
```

---

### Real-World Applications

| Domain | Application |
|--------|-------------|
| Image Processing | Integral Image (Viola-Jones face detection) |
| Game Development | Fog-of-war visibility sums over rectangular regions |
| Geographic Data | Sum of population/values in a rectangular region |
| Competitive Programming | Maximum sum subrectangle, counting 1s in binary matrices |
| Machine Learning | Convolution operations, feature map aggregations |

---

### Classic Problem: Maximum Sum Subrectangle

A well-known application of 2D prefix sums is finding the rectangle with the maximum sum. By fixing two rows and using the 1D Kadane's algorithm on column sums (derived from the prefix matrix), this can be solved in **O(m² × n)**.

---

### Summary

- **2D Prefix Sum** extends 1D prefix sum to matrices using the inclusion-exclusion principle.
- Build time: **O(m × n)**, query time: **O(1)** per rectangle.
- Formula: `P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]`
- Always use **1-indexed** arrays to keep the formula uniform.
- Essential for matrix problems in competitive programming and image processing.
