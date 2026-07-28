---
id: linear-search
title: Linear Search Algorithm
sidebar_label: Linear Search
sidebar_position: 1
description: A comprehensive guide to Linear Search, the most fundamental searching algorithm for arrays and lists.
tags: [dsa, searching, algorithms, linear-search, basics]
---

## Introduction

**Linear Search** (also known as Sequential Search) is the simplest and most fundamental searching algorithm. It sequentially checks each element of a list until a match is found or the entire list has been searched.

Linear search is the baseline against which all other search algorithms are compared.

## When to Use Linear Search

- **Small datasets**: When the dataset has fewer than 10-20 elements, the overhead of complex algorithms is not justified.
- **Unsorted data**: Binary search requires sorted data; linear search works on any collection.
- **Single search on unsorted data**: Sorting just to search once is inefficient.
- **Real-time systems**: Simpler to implement with predictable behavior.

## Algorithm (Pseudo-code)

```text
function linearSearch(arr, target):
    for i from 0 to arr.length - 1:
        if arr[i] == target:
            return i  // Found at index i
    return -1  // Not found
```

## Implementation in C

```c
#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

int linearSearchLast(int arr[], int n, int target) {
    // Find the LAST occurrence
    int lastIdx = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            lastIdx = i;
        }
    }
    return lastIdx;
}

int main() {
    int arr[] = {10, 25, 30, 45, 55, 60, 75, 80};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 45;

    int result = linearSearch(arr, n, target);
    if (result != -1) {
        printf("Element found at index %d\n", result);
    } else {
        printf("Element not found\n");
    }

    return 0;
}
```

## Implementation in Python

```python
def linear_search(arr, target):
    """
    Standard linear search.
    Returns the index of target if found, -1 otherwise.
    Time: O(n), Space: O(1)
    """
    for i, element in enumerate(arr):
        if element == target:
            return i
    return -1


def linear_search_recursive(arr, target, index=0):
    """
    Recursive linear search.
    """
    if index >= len(arr):
        return -1
    if arr[index] == target:
        return index
    return linear_search_recursive(arr, target, index + 1)


def linear_search_all(arr, target):
    """
    Find all occurrences of target.
    Returns a list of all indices.
    """
    return [i for i, x in enumerate(arr) if x == target]


def linear_search_ordered(arr, target):
    """
    Linear search optimized for sorted arrays.
    Can stop early when arr[i] > target in a sorted array.
    Time: O(n), but faster in practice for sorted arrays.
    """
    for i, element in enumerate(arr):
        if element == target:
            return i
        if element > target:
            break  # No need to continue for sorted array
    return -1
```

## Sentinel Optimization

The sentinel optimization reduces the number of comparisons by placing the target at the end of the array.

```c
int linearSearchSentinel(int arr[], int n, int target) {
    int last = arr[n - 1];
    arr[n - 1] = target;  // Place sentinel

    int i = 0;
    while (arr[i] != target) {
        i++;
    }

    arr[n - 1] = last;  // Restore original value

    if (i < n - 1 || arr[n - 1] == target) {
        return i;
    }
    return -1;
}
```

The sentinel optimization reduces the number of comparisons in the loop condition, though modern compilers typically optimize this anyway.

## Time and Space Complexity

| Metric | Value |
|--------|-------|
| Best Case | O(1) - Element found at the first position |
| Worst Case | O(n) - Element found at the last position or not found |
| Average Case | O(n) - (n+1)/2 comparisons |
| Space | O(1) - No additional space needed |
| Stability | Yes - can find first or last occurrence |

## Comparison with Other Search Algorithms

| Algorithm | Time (Average) | Time (Worst) | Requirement | Space |
|-----------|---------------|-------------|-------------|-------|
| Linear Search | O(n) | O(n) | None | O(1) |
| Binary Search | O(log n) | O(log n) | Sorted | O(1) |
| Jump Search | O(sqrt(n)) | O(sqrt(n)) | Sorted | O(1) |
| Interpolation Search | O(log log n) | O(n) | Sorted, Uniform | O(1) |
| Exponential Search | O(log n) | O(log n) | Sorted | O(1) |

## Practice Problems

1. Implement linear search that returns all indices where the target appears.
2. Find the minimum and maximum elements in a single pass.
3. Find the second largest element in an array.
4. Count occurrences of a target in an unsorted array.
5. Search in a circularly sorted array using linear search.
