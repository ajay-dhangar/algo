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
#include <stdio.h>

// Function to calculate prefix sums
void prefixSum(int arr[], int n, int prefix[]) {
    // Initialize the first element of prefix sum array
    prefix[0] = arr[0];

    // Calculate prefix sums
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
}

// Function to get the sum of a subarray using prefix sums
int getSum(int prefix[], int left, int right) {
    if (left == 0) {
        return prefix[right]; // Sum from the start to 'right'
    }
    return prefix[right] - prefix[left - 1]; // Sum from 'left' to 'right'
}

int main() {
    int arr[] = {1, 2, 3, 4, 5}; // Example array
    int n = sizeof(arr) / sizeof(arr[0]); // Size of the array
    int prefix[n]; // Array to store prefix sums

    // Calculate prefix sums
    prefixSum(arr, n, prefix);

    // Display the prefix sums
    printf("Prefix Sum Array:\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", prefix[i]);
    }
    printf("\n");

    // Example: Get the sum of elements from index 1 to 3
    int left = 1, right = 3; // Sum from index 1 to 3 (2+3+4)
    int sum = getSum(prefix, left, right);
    printf("Sum of elements from index %d to %d: %d\n", left, right, sum);

    return 0;
}
```

### Summary:

The prefix sum algorithm is a straightforward yet powerful tool for optimizing range sum queries on an array. By preprocessing the array to build cumulative sums, it enables fast query responses in constant time. This makes it particularly suitable for applications involving frequent range sum queries, such as financial data analysis, signal processing, and game development.
