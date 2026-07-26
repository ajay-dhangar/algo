---
id: swift-bubble-sort
title: Bubble Sort in Swift
sidebar_label: Bubble Sort
sidebar_position: 2
description: Learn how to implement Bubble Sort in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, sorting, algorithms, bubble-sort]
---

# Bubble Sort in Swift

Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items, and swapping them if they are in the wrong order. This process is repeated until no swaps are needed, which indicates that the list is sorted.

## Implementation in Swift

Here is the idiomatic implementation of Bubble Sort in Swift as an extension on the `Array` type, allowing it to work with any elements that conform to the `Comparable` protocol.

```swift
extension Array where Element: Comparable {
    mutating func bubbleSort() {
        guard count > 1 else { return }
        
        for i in 0..<count {
            var swapped = false
            for j in 1..<count - i {
                if self[j - 1] > self[j] {
                    self.swapAt(j - 1, j)
                    swapped = true
                }
            }
            if !swapped {
                break
            }
        }
    }
    
    func bubbleSorted() -> [Element] {
        var result = self
        result.bubbleSort()
        return result
    }
}

// Example usage:
var numbers = [64, 34, 25, 12, 22, 11, 90]
numbers.bubbleSort()
print("Sorted array: \(numbers)")
// Output: Sorted array: [11, 12, 22, 25, 34, 64, 90]
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(n)$ when the array is already sorted.
  - **Average Case**: $O(n^2)$ when elements are in random order.
  - **Worst Case**: $O(n^2)$ when the array is sorted in reverse order.
- **Space Complexity**: $O(1)$ auxiliary space because it sorts the array in-place.
