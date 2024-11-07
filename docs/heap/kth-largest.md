---
id: Kth-Largest-Element-Heap
title: Kth Largest Element in an Array using Heap
sidebar_label: Kth Largest Element
sidebar_position: 11
description: Find the Kth largest element in an array using a heap data structure.
tags: [Heap, Competitive Programming, Priority Queue, top-K]
---

# Kth Largest Element in an Array Using Heap

## Problem Description:
Given an array of integers, find the **Kth largest element** in the array. The array may contain duplicate values, and you are required to identify the Kth largest element in the sorted order, not the Kth distinct element.

### Example:
```bash
Input: [3, 2, 1, 5, 6, 4], K = 2  
Output: 5
```

## Approach:
The optimal solution to this problem involves using a Min Heap. The idea is to maintain a heap of size K which contains the largest K elements. The top of the min heap (the smallest element in the heap) will be the Kth largest element when all elements of the array have been processed.

## Steps:
Initialize a Min Heap with the first K elements of the array.
For the remaining elements, if the current element is greater than the top element of the heap, replace the top element with the current element.
After processing all elements, the top of the heap will contain the Kth largest element.


## Time Complexity:
O(n log K), where n is the number of elements in the array. This is because each insertion and removal operation on the heap takes O(log K) time.

```cpp
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

// Function to find the Kth largest element
int findKthLargest(vector<int>& nums, int k) {
    // Min heap to store the largest K elements
    priority_queue<int, vector<int>, greater<int>> minHeap;

    // Insert the first K elements into the heap
    for (int i = 0; i < k; ++i) {
        minHeap.push(nums[i]);
    }

    // Process the remaining elements
    for (int i = k; i < nums.size(); ++i) {
        if (nums[i] > minHeap.top()) {
            minHeap.pop();
            minHeap.push(nums[i]);
        }
    }

    // The top element of the heap is the Kth largest element
    return minHeap.top();
}

int main() {
    // Example array
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    int k = 2;

    // Find and display the Kth largest element
    cout << "The " << k << "th largest element is " << findKthLargest(nums, k) << endl;

    return 0;
}
```

