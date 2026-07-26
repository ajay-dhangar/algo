---
id: swift-quick-sort
title: Quick Sort in Swift
sidebar_label: Quick Sort
sidebar_position: 6
description: Learn how to implement Quick Sort in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, sorting, algorithms, quick-sort]
---

# Quick Sort in Swift

Quick Sort is an efficient, comparison-based, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

## Implementation in Swift

Here is a straightforward and readable implementation of Quick Sort in Swift.

```swift
func quickSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }
    
    let pivot = array[array.count / 2]
    
    let less = array.filter { $0 < pivot }
    let equal = array.filter { $0 == pivot }
    let greater = array.filter { $0 > pivot }
    
    return quickSort(less) + equal + quickSort(greater)
}

// Example usage:
let numbers = [10, 7, 8, 9, 1, 5]
let sortedNumbers = quickSort(numbers)
print("Sorted array: \(sortedNumbers)")
// Output: Sorted array: [1, 5, 7, 8, 9, 10]
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(n \log n)$ when the partition process always divides the array into two nearly equal halves.
  - **Average Case**: $O(n \log n)$ when partitions are reasonably balanced.
  - **Worst Case**: $O(n^2)$ when the partition process always divides the array into one element and $n-1$ elements (e.g., choosing the minimum/maximum element as the pivot).
- **Space Complexity**: $O(n)$ in this implementation due to the sub-array allocations (a standard in-place implementation has $O(\log n)$ call stack space).
