---
id: swift-merge-sort
title: Merge Sort in Swift
sidebar_label: Merge Sort
sidebar_position: 5
description: Learn how to implement Merge Sort in Swift, with complete code examples, explanation, and complexity analysis.
tags: [swift, sorting, algorithms, merge-sort]
---

# Merge Sort in Swift

Merge Sort is an efficient, stable, comparison-based, divide-and-conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output.

## Implementation in Swift

Here is the implementation of Merge Sort in Swift using recursion.

```swift
func mergeSort<T: Comparable>(_ array: [T]) -> [T] {
    guard array.count > 1 else { return array }
    
    let middleIndex = array.count / 2
    
    let leftArray = mergeSort(Array(array[0..<middleIndex]))
    let rightArray = mergeSort(Array(array[middleIndex..<array.count]))
    
    return merge(leftArray, rightArray)
}

func merge<T: Comparable>(_ left: [T], _ right: [T]) -> [T] {
    var leftIndex = 0
    var rightIndex = 0
    var orderedArray = [T]()
    
    while leftIndex < left.count && rightIndex < right.count {
        if left[leftIndex] < right[rightIndex] {
            orderedArray.append(left[leftIndex])
            leftIndex += 1
        } else if left[leftIndex] > right[rightIndex] {
            orderedArray.append(right[rightIndex])
            rightIndex += 1
        } else {
            orderedArray.append(left[leftIndex])
            leftIndex += 1
            orderedArray.append(right[rightIndex])
            rightIndex += 1
        }
    }
    
    while leftIndex < left.count {
        orderedArray.append(left[leftIndex])
        leftIndex += 1
    }
    
    while rightIndex < right.count {
        orderedArray.append(right[rightIndex])
        rightIndex += 1
    }
    
    return orderedArray
}

// Example usage:
let numbers = [12, 11, 13, 5, 6, 7]
let sortedNumbers = mergeSort(numbers)
print("Sorted array: \(sortedNumbers)")
// Output: Sorted array: [5, 6, 7, 11, 12, 13]
```

## Complexity Analysis

- **Time Complexity**:
  - **Best Case**: $O(n \log n)$
  - **Average Case**: $O(n \log n)$
  - **Worst Case**: $O(n \log n)$
- **Space Complexity**: $O(n)$ auxiliary space to store the merged sub-arrays.
