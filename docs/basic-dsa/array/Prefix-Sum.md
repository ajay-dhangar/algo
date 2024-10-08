---
id: Prefix-Sum
title: Prefix Sum Algorithm
sidebar_label: Prim's Algorithm
description: "In this blog post, we'll explore the Prefix Sum Algorithm, a useful technique for solving range sum queries efficiently."
tags: [dsa, algorithms, array manipulation]
---

### Definition:

The prefix sum algorithm is a **preprocessing technique** used to answer range sum queries efficiently. Given an array, the prefix sum algorithm calculates cumulative sums such that each element at index i in the prefix sum array stores the sum of elements from the start of the array up to i. This technique is widely used to reduce the time complexity of multiple range sum queries from O(n) to O(1).

### Characteristics:

- **Preprocessing Approach**:
  - The algorithm preprocesses the array to build a prefix sum array, which can then be used to answer sum queries in constant time.

- **Array-Based Algorithm**:
  - The prefix sum algorithm is particularly useful for problems dealing with contiguous subarrays and is implemented using an auxiliary array to store cumulative sums.

- **Efficient for Range Queries**:
  - By using cumulative sums, the prefix sum algorithm optimizes queries for the sum of elements between any two indices, making it efficient for large datasets.

### Time Complexity:

- **Preprocessing Time: O(n)**
  Using a priority queue, Prim's algorithm achieves a time complexity of O(E log V), where E is the number of edges and V is the number of vertices.

- **Query Time: O(1)**
  Once the prefix sum array is built, each range sum query can be answered in constant time by simple arithmetic.

### Space Complexity:

- **Space Complexity: O(n)**
  An auxiliary array of size n is needed to store cumulative sums, making the space complexity O(n).

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> buildPrefixSum(const vector<int>& arr) {
    int n = arr.size();
    vector<int> prefixSum(n);
    prefixSum[0] = arr[0];

    for (int i = 1; i < n; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }

    return prefixSum;
}

int rangeSum(const vector<int>& prefixSum, int l, int r) {
    if (l == 0)
        return prefixSum[r];
    return prefixSum[r] - prefixSum[l - 1];
}

int main() {
    vector<int> arr = {3, 2, 4, 5, 6};
    vector<int> prefixSum = buildPrefixSum(arr);

    int l = 1, r = 3; // Range query from index 1 to 3
    cout << "Sum of elements from index " << l << " to " << r << ": " << rangeSum(prefixSum, l, r) << endl;

    return 0;
}
```

### Summary:

The prefix sum algorithm is a straightforward yet powerful tool for optimizing range sum queries on an array. By preprocessing the array to build cumulative sums, it enables fast query responses in constant time. This makes it particularly suitable for applications involving frequent range sum queries, such as financial data analysis, signal processing, and game development.