---
id: Heap-data-Structure-3
title: heap data structure
sidebar_label: Kth smallest Element
sidebar_position: 10
description: Heaps are commonly used to implement priority queues and ensure efficient retrieval of the minimum or maximum element.
tags: [Competitive Programming,top-K,priority queue]
---

# Heap Problems: Kth Smallest Elements

## Problem : Kth Smallest Element in an Array

### Problem Description:
Given an array of `n` integers, find the **Kth largest** element. The array may contain duplicate values, but you are tasked with identifying the Kth largest distinct element.

### Example:
```
Input: [3, 2, 1, 5, 6, 4], K = 2  
Output: 5
```

Approach:
Using a Min Heap (Optimal Solution):
Use a Min Heap to keep track of the top K largest elements.
Iterate through the array, adding elements to the heap.
If the heap size exceeds K, remove the smallest element from the heap.
The top element of the heap will be the Kth largest when the iteration is complete.
Time Complexity: O(n log K), where n is the number of elements in the array.

```cpp
#include <iostream>
#include <queue>
#include <vector>

int findKthSmallest(std::vector<int>& nums, int k) {
    std::priority_queue<int> maxHeap;

    for (int num : nums) {
        maxHeap.push(num); // Add element to max heap

        if (maxHeap.size() > k) {
            maxHeap.pop(); // Remove the largest element if size exceeds k
        }
    }

    return maxHeap.top(); // The top of the heap is the Kth smallest element
}

int main() {
    std::vector<int> nums = {7, 10, 4, 3, 20, 15};
    int k = 3;
    std::cout << "The " << k << "th smallest element is " << findKthSmallest(nums, k) << std::endl;
    return 0;
}
```


