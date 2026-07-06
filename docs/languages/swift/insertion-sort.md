---
id: swift-insertion-sort
title: Insertion Sort in Swift
sidebar_label: Insertion Sort
sidebar_position: 4
description: Learn how to implement Insertion Sort in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, sorting, algorithms, insertion-sort]
---

# Insertion Sort in Swift

Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.

## Implementation in Swift

Here is the implementation of Insertion Sort in Swift as an extension on the `Array` type.

```swift
extension Array where Element: Comparable {
    mutating func insertionSort() {
        guard count > 1 else { return }
        
        for i in 1..<count {
            let key = self[i]
            var j = i - 1
            
            while j >= 0 && self[j] > key {
                self[j + 1] = self[j]
                j -= 1
            }
            self[j + 1] = key
        }
    }
    
    func insertionSorted() -> [Element] {
        var result = self
        result.insertionSort()
        return result
    }
}

// Example usage:
var numbers = [12, 11, 13, 5, 6]
numbers.insertionSort()
print("Sorted array: \(numbers)")
// Output: Sorted array: [5, 6, 11, 12, 13]
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(n)$ when the array is already sorted.
  - **Average Case**: $O(n^2)$ when elements are in random order.
  - **Worst Case**: $O(n^2)$ when elements are sorted in reverse order.
- **Space Complexity**: $O(1)$ auxiliary space.
