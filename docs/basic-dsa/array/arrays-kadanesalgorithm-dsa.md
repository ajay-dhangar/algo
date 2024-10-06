---
id: kadane
title: Kadane's Algorithm
sidebar_label: Kadane's Algorithm
description: "In this blog post, we'll explore Kadane's Algorithm, a dynamic programming algorithm used to find the Maximum Sum Subarray in an array."
tags: [dsa, algorithms, dynamic programming, subarray]
---

### Definition:

Kadane's algorithm is a **dynamic programming algorithm** used to find the maximum sum of a contiguous subarray within a one-dimensional array of numbers. It efficiently calculates the largest sum that can be obtained by adding consecutive elements in the array.

### Characteristics:

- **Dynamic Programming Approach**:
  - Kadane's algorithm operates by maintaining a running sum of the maximum subarray ending at each position. It decides at every step whether to include the current element in the existing subarray or start a new subarray from the current element.

- **Linear Time Algorithm**:
  - The algorithm works in $O(n)$ time complexity, where $n$ is the number of elements in the array, as it only requires a single traversal of the array.

- **Handles Negative Numbers**:
  - Kadane’s algorithm can handle arrays with both positive and negative numbers, and it efficiently skips over negative subarrays that reduce the overall sum.

### Time Complexity:

- **Best, Average, and Worst Case: $O(n)$**  
  Kadane's algorithm processes each element exactly once, making its time complexity linear.

### Space Complexity:

- **Space Complexity: $O(1)$**  
  The algorithm only requires constant space, using variables to store the current maximum and the global maximum sums.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int kadane(vector<int>& arr) {
    int max_current = arr[0];
    int max_global = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        max_current = max(arr[i], max_current + arr[i]);
        if (max_current > max_global) {
            max_global = max_current;
        }
    }

    return max_global;
}

int main() {
    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int max_sum = kadane(arr);
    cout << "Maximum Sum Subarray: " << max_sum << endl;
    return 0;
}
```

### Summary:

Kadane's algorithm provides an efficient solution to the maximum sum subarray problem using dynamic programming. By keeping track of the current subarray sum and adjusting it dynamically, it guarantees finding the maximum sum with a time complexity of O(n). This algorithm is widely used in problems related to subarray sums and optimization in financial and data analysis tasks.
