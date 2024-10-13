---
id: exponential-search-dsa
sidebar_position: 4
title: Exponential Search
sidebar_label: Exponential Search
description: "In this blog post, we'll explore Exponential Search, a searching algorithm that efficiently finds an element in a sorted array, especially when the size of the array is unknown."
tags: [dsa, algorithms, binary search]
---

## Introduction
Exponential Search is a searching algorithm that efficiently locates an element in a sorted array, especially in scenarios where the size of the array is not known beforehand. Unlike traditional binary search, which requires the boundaries of the search space to be defined, Exponential Search cleverly combines the approach of linear search with binary search to accommodate unknown-sized arrays.

The algorithm works in two main phases:

1.Finding the Range: In the first phase, Exponential Search aims to identify a range in which the target element may exist. It starts by checking the first element of the array. If the target is not found there, the algorithm begins to double the index at each step (e.g., checking the element at index 1, then index 2, then index 4, and so on) until it either finds an element larger than the target or reaches the end of the array. This phase ensures that the algorithm can quickly pinpoint the potential range of the search without needing to know the total length of the array.

2.Binary Search: Once the appropriate range is determined, Exponential Search transitions to binary search within that range. The binary search efficiently narrows down the position of the target element by repeatedly dividing the search interval in half. This combination allows Exponential Search to achieve a time complexity of O(log n) for the actual search phase, making it particularly effective for large datasets..

## Implementation

Let us see how to implement Exponential Search in Java:
## Time Complexity:
Linear search: O(n)<br />
Exponential search: O(log n)

## Points to Remember:
 Exponential Search is effective when the size of the array is unknown.
 
 It quickly finds the range in which the target value may exist.
 
 Combines sequential and binary search methods.
 
 Particularly efficient when the target is near the start of a large sorted array.
 
 Suitable for dynamic datasets where the size might change frequently.

```java
public class ExponentialSearch {

    public int binarySearch(int[] arr, int low, int high, int target) {
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid; // Target found
            } else if (arr[mid] < target) {
                low = mid + 1; // Search right half
            } else {
                high = mid - 1; // Search left half
            }
        }
        return -1; // Target not found
    }

    public int exponentialSearch(int[] arr, int target) {
        if (arr[0] == target) return 0; // Check first element

        int index = 1;
        while (index < arr.length && arr[index] <= target) {
            index *= 2; // Double the index
        }

        return binarySearch(arr, index / 2, Math.min(index, arr.length - 1), target);
    }

    public static void main(String[] args) {
        ExponentialSearch searcher = new ExponentialSearch();
        int[] arr = {2, 3, 4, 10, 40, 50, 60, 70, 80, 90};
        int target = 10;
        int result = searcher.exponentialSearch(arr, target);
        System.out.println("Target found at index: " + result);  // Output: Target found at index: 3
    }
}
