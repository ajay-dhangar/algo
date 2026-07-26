---
id: swift-binary-search
title: Binary Search in Swift
sidebar_label: Binary Search
sidebar_position: 7
description: Learn how to implement Binary Search in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, searching, algorithms, binary-search]
---

# Binary Search in Swift

Binary Search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half.

## Implementation in Swift

Here is the implementation of Binary Search in Swift, both iterative and recursive.

### Iterative Implementation

```swift
func binarySearch<T: Comparable>(_ array: [T], target: T) -> Int? {
    var lowerBound = 0
    var upperBound = array.count - 1
    
    while lowerBound <= upperBound {
        let mid = lowerBound + (upperBound - lowerBound) / 2
        if array[mid] == target {
            return mid
        } else if array[mid] < target {
            lowerBound = mid + 1
        } else {
            upperBound = mid - 1
        }
    }
    
    return nil
}

// Example usage:
let numbers = [1, 5, 7, 8, 9, 10]
if let index = binarySearch(numbers, target: 7) {
    print("Found 7 at index \(index)")
} else {
    print("7 not found")
}
// Output: Found 7 at index 2
```

### Recursive Implementation

```swift
func binarySearchRecursive<T: Comparable>(_ array: [T], target: T, range: Range<Int>) -> Int? {
    guard range.lowerBound < range.upperBound else { return nil }
    
    let mid = range.lowerBound + (range.upperBound - range.lowerBound) / 2
    
    if array[mid] == target {
        return mid
    } else if array[mid] > target {
        return binarySearchRecursive(array, target: target, range: range.lowerBound..<mid)
    } else {
        return binarySearchRecursive(array, target: target, range: (mid + 1)..<range.upperBound)
    }
}
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(1)$ when the middle element of the array is the target.
  - **Average Case**: $O(\log n)$
  - **Worst Case**: $O(\log n)$
- **Space Complexity**:
  - **Iterative**: $O(1)$ auxiliary space.
  - **Recursive**: $O(\log n)$ space on the call stack.
