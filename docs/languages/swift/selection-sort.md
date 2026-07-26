---
id: swift-selection-sort
title: Selection Sort in Swift
sidebar_label: Selection Sort
sidebar_position: 3
description: Learn how to implement Selection Sort in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, sorting, algorithms, selection-sort]
---

# Selection Sort in Swift

Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: a sorted sublist of items which is built up from left to right, and a sublist of the remaining unsorted items. The algorithm repeatedly finds the minimum element from the unsorted sublist and swaps it with the leftmost unsorted element.

## Implementation in Swift

Here is the implementation of Selection Sort in Swift as an extension on the `Array` type.

```swift
extension Array where Element: Comparable {
    mutating func selectionSort() {
        guard count > 1 else { return }
        
        for i in 0..<count - 1 {
            var minIndex = i
            for j in (i + 1)..<count {
                if self[j] < self[minIndex] {
                    minIndex = j
                }
            }
            if minIndex != i {
                self.swapAt(i, minIndex)
            }
        }
    }
    
    func selectionSorted() -> [Element] {
        var result = self
        result.selectionSort()
        return result
    }
}

// Example usage:
var numbers = [64, 25, 12, 22, 11]
numbers.selectionSort()
print("Sorted array: \(numbers)")
// Output: Sorted array: [11, 12, 22, 25, 64]
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(n^2)$ because we always run the nested loops.
  - **Average Case**: $O(n^2)$ when elements are in random order.
  - **Worst Case**: $O(n^2)$ when elements are sorted in reverse order.
- **Space Complexity**: $O(1)$ auxiliary space because it sorts the array in-place.
