---
id: recursive-binary-search-DSA
title: Recursive Binary Search
sidebar_label: Recursive Binary Search
sidebar_position: 3
description: "In this blog post, we'll explore the recursive binary search algorithm, a fundamental technique in computer science for efficiently finding an element in a sorted array. You'll learn what recursive binary search is, how it works, and its time complexity. We'll also cover practical applications and common problems you can solve using this algorithm. By the end, you'll have a thorough understanding of recursive binary search and how to implement it in your programming projects."
tags: [dsa, algorithms, binary search, recursive]
---

Recursive Binary Search algorithm is essential for efficiently finding elements in sorted arrays, making it a staple in the toolkit of any adept programmer. Whether you're optimizing search operations or solving complex algorithmic challenges, understanding recursive binary search is crucial. Let's delve into its mechanics, applications, and implementation.

## What is Recursive Binary Search?

Recursive binary search is a highly efficient algorithm used to find an element in a sorted array. It works by repeatedly dividing the search interval in half, using a recursive approach. If the value of the search key is less than the item in the middle of the interval, the algorithm narrows the interval to the lower half. Otherwise, it narrows it to the upper half. The process continues until the search key is found or the interval is empty.

In pseudo-code, recursive binary search is defined as follows:

```cpp
FUNCTION recursiveBinarySearch(array, low, high, key):
IF low > high:
RETURN -1
mid = (low + high) / 2
IF array[mid] == key:
RETURN mid
ELSE IF array[mid] < key:
RETURN recursiveBinarySearch(array, mid + 1, high, key)
ELSE:
RETURN recursiveBinarySearch(array, low, mid - 1, key)
```

```cpp
int recursiveBinarySearch(int array[], int low, int high, int key) {
    if (low > high) {
        return -1;
    }
    int mid = low + (high - low) / 2;
    if (array[mid] == key) {
        return mid;
    } else if (array[mid] < key) {
        return recursiveBinarySearch(array, mid + 1, high, key);
    } else {
        return recursiveBinarySearch(array, low, mid - 1, key);
    }
}
```

## How Recursive Binary Search Works

### Step-by-Step Explanation

1. Initialize: Set two pointers, low at the beginning and high at the end of the array.
2. Middle Element: Calculate the middle element's index.
Comparison:
3. If the middle element is the target, return its index.
4. If the middle element is less than the target, discard the left half by setting low to mid + 1.
5. If the middle element is greater than the target, discard the right half by setting high to mid - 1.
6. Repeat: Repeat steps 2 and 3 until the target is found or the low pointer exceeds the high pointer.

### Time Complexity

The time complexity of iterative binary search is $𝑂(log𝑛)$. 

where $n$ is the number of elements in the array. This logarithmic time complexity makes iterative binary search significantly faster than linear search for large datasets.

## Practical Applications

Iterative binary search is widely used in various real-world applications and algorithmic problems:

1. Searching in a Sorted Array
   The primary use of iterative binary search is to find elements in a sorted array efficiently. It is the foundation for more complex search algorithms.

2. Dictionary Lookups
   Iterative binary search is used in dictionaries (like the one you're reading now) to quickly find words and their definitions.

3. Binary Search Trees
   Iterative binary search is the basis for searching in binary search trees (BSTs), a fundamental data structure in computer science.

4. Finding Boundaries
   Iterative binary search can be adapted to find the first or last occurrence of a target element, making it useful in problems requiring boundary searches.

Common Problems Solved Using Iterative Binary Search
Iterative binary search can be adapted in various ways to solve different types of problems. Here are a couple of common problems:

1. Lower Bound and Upper Bound
   These variations of iterative binary search are used to find the first and last occurrence of a target element in a sorted array.

Lower Bound Pseudo-Code:

```cpp
FUNCTION lowerBound(array, low, high, key):
    IF low == high:
        RETURN low
    mid = (low + high) / 2
    IF array[mid] < key:
        RETURN lowerBound(array, mid + 1, high, key)
    ELSE:
        RETURN lowerBound(array, low, mid, key)


```

Upper Bound Pseudo-Code:

```cpp
FUNCTION upperBound(array, low, high, key):
    if low == high:
        return low
    mid = (low + high) / 2
    if array[mid] <= key:
        return upperBound(array, mid + 1, high, key)
    else:
        return upperBound(array, low, mid, key)

```

2. Rotated Sorted Array
   Recursive binary search can be modified to handle rotated sorted arrays, where the array is sorted but then rotated at some pivot point.

:::tip
Handle Edge Cases: Ensure your implementation correctly handles cases where the target element is not present or when the array is empty.
Prevent Stack Overflow: Be mindful of the recursion depth, especially for large arrays, as deep recursion can lead to stack overflow.
Efficiency: The recursive approach can be more intuitive and elegant, but consider the iterative approach for environments with limited stack size.
:::

## Conclusion
Recursive binary search is a fundamental algorithm that every programmer should master. Its efficiency and versatility make it a powerful tool for solving a wide range of problems. By understanding how recursive binary search works and how to implement its variations, you'll be well-equipped to tackle numerous challenges in your programming journey.
