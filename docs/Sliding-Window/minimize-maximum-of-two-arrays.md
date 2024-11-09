---
id: minimize-the-maximum-of-two-arrays
title: Minimize the Maximum of Two Arrays
sidebar_label: Minimize the Maximum of Two Arrays
sidebar_position: 3
description: "In this blog post, we'll explore how to solve the problem of minimizing the maximum value between two arrays using binary search and mathematical reasoning."
tags: [dsa, algorithms, binary search, arrays]
---

## Minimize the Maximum of Two Arrays

### Problem Definition:

You are given two sorted arrays of integers, and the task is to minimize the maximum element between the two arrays after selecting exactly one element from each array. The goal is to **minimize the maximum** of these two selected elements.

### Example:

Let's consider two sorted arrays:

- Array `A = [1, 4, 6]`
- Array `B = [2, 5, 8]`

We want to find a pair of elements, one from each array, such that the maximum of the two selected elements is minimized.  

For the pair `(A[i], B[j])`, the **maximum** values for different pairs are:

- Max of `(1, 2)` → `2`
- Max of `(1, 5)` → `5`
- Max of `(1, 8)` → `8`
- Max of `(4, 2)` → `4`
- Max of `(4, 5)` → `5`
- Max of `(4, 8)` → `8`
- Max of `(6, 2)` → `6`
- Max of `(6, 5)` → `6`
- Max of `(6, 8)` → `8`

The smallest maximum value is **4**, which corresponds to the pair `(4, 2)`.

### Approach: Binary Search and Mathematical Reasoning

To solve this problem efficiently, we can use **binary search** combined with properties of sorted arrays. By searching for a minimum "maximum" in a specified range, we avoid brute force calculations that would take too much time on larger arrays.

### Steps:

1. **Define the Range of Search**:  
   The maximum element lies between the minimum element of both arrays and the maximum element of both arrays, i.e.,  
   `minRange = min(A[0], B[0])` and  
   `maxRange = max(A[n-1], B[m-1])` (where `n` and `m` are the lengths of arrays `A` and `B`).

2. **Binary Search**:  
   Perform binary search on this range to find the minimum value of the maximum element by checking mid-points. For each mid-point, verify whether it can be the possible minimum maximum by ensuring that the selected elements from both arrays are smaller than or equal to the mid-point.

3. **Adjust Search**:  
   If the mid-point is valid, continue searching on the lower half. Otherwise, adjust the search towards the higher half of the range.

### Time Complexity:
- **O(log(maxRange - minRange))**, where `maxRange` and `minRange` represent the search space.
  
### Space Complexity:
- **O(1)**, since we are only using constant space for variables during binary search.

### C++ Code Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Helper function to check if x can be the minimum maximum
bool canMinimize(int x, const vector<int>& A, const vector<int>& B) {
    int idxA = upper_bound(A.begin(), A.end(), x) - A.begin();
    int idxB = upper_bound(B.begin(), B.end(), x) - B.begin();
    
    return (idxA > 0 && idxB > 0);  // There exists elements <= x in both arrays
}

int minimizeMaxOfTwoArrays(const vector<int>& A, const vector<int>& B) {
    int low = min(A[0], B[0]);  // Lower bound of the search space
    int high = max(A.back(), B.back());  // Upper bound of the search space
    int result = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canMinimize(mid, A, B)) {
            result = mid;  // mid can be a candidate for the minimum maximum
            high = mid - 1;  // Try to minimize further
        } else {
            low = mid + 1;  // Increase the lower bound
        }
    }

    return result;
}

int main() {
    vector<int> A = {1, 4, 6};
    vector<int> B = {2, 5, 8};

    int result = minimizeMaxOfTwoArrays(A, B);
    cout << "The minimum maximum value is: " << result << endl;

    return 0;
}
```

### Python Code Implementation:

```python
from bisect import bisect_right

# Helper function to check if x can be the minimum maximum
def can_minimize(x, A, B):
    idxA = bisect_right(A, x)
    idxB = bisect_right(B, x)
    return idxA > 0 and idxB > 0  # There exists elements <= x in both arrays

def minimize_max_of_two_arrays(A, B):
    low = min(A[0], B[0])  # Lower bound of the search space
    high = max(A[-1], B[-1])  # Upper bound of the search space
    result = high

    while low <= high:
        mid = low + (high - low) // 2
        if can_minimize(mid, A, B):
            result = mid  # mid can be a candidate for the minimum maximum
            high = mid - 1  # Try to minimize further
        else:
            low = mid + 1  # Increase the lower bound

    return result

# Test the function
A = [1, 4, 6]
B = [2, 5, 8]
result = minimize_max_of_two_arrays(A, B)
print(f"The minimum maximum value is: {result}")
```

### Java Code Implementation:

```java
import java.util.Arrays;

public class MinimizeMaxOfTwoArrays {

    // Helper function to check if x can be the minimum maximum
    private static boolean canMinimize(int x, int[] A, int[] B) {
        int idxA = bisectRight(A, x);
        int idxB = bisectRight(B, x);
        return idxA > 0 && idxB > 0;  // There exists elements <= x in both arrays
    }

    // Custom binary search helper to find the first element greater than x
    private static int bisectRight(int[] array, int x) {
        int low = 0, high = array.length;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (array[mid] <= x) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    public static int minimizeMaxOfTwoArrays(int[] A, int[] B) {
        int low = Math.min(A[0], B[0]);  // Lower bound of the search space
        int high = Math.max(A[A.length - 1], B[B.length - 1]);  // Upper bound of the search space
        int result = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canMinimize(mid, A, B)) {
                result = mid;  // mid can be a candidate for the minimum maximum
                high = mid - 1;  // Try to minimize further
            } else {
                low = mid + 1;  // Increase the lower bound
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] A = {1, 4, 6};
        int[] B = {2, 5, 8};
        int result = minimizeMaxOfTwoArrays(A, B);
        System.out.println("The minimum maximum value is: " + result);
    }
}
```


## Explanation:
Binary Search on Maximum Value:
We perform binary search on the possible values for the maximum between the two selected elements from the arrays.

Helper Function:
The canMinimize function checks whether a given maximum value x can be minimized by confirming that there are elements in both arrays that are smaller than or equal to x.

Update Range:
During each iteration, the binary search either reduces the search space by moving towards the lower half if a valid solution is found or shifts towards the upper half otherwise.