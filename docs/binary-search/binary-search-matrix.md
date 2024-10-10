---
id: Matrix-binary-dsa
sidebar_position: 5
title: Binary Search in Matrix
sidebar_label: Binary Search in Matrix
description: "In this blog post, we'll explore binary search in a matrix, an optimized method to find an element in a sorted 2D matrix efficiently."
tags: [dsa, algorithms, binary search, matrix]
---

## Introduction
Binary Search in a Matrix is an extension of the binary search algorithm used for a two-dimensional matrix. In a sorted 2D matrix where each row and column are sorted, binary search can be applied to search for an element efficiently. This is particularly useful when working with large matrices where a linear search would be too slow.

To apply binary search in a matrix, the matrix is treated as a flattened sorted array (while maintaining the row and column structure), and binary search is performed using the virtual array indices.

## Implementation

Let us see how to implement binary search in a 2D matrix in Java:

### Problem Setup:

We are given an `m x n` matrix where each row is sorted in ascending order from left to right, and the first integer of each row is greater than the last integer of the previous row. The goal is to search for a target value in this matrix.

### Time Complexity:

    Linear/Sequential search: O(m * n) where m is the number of rows and n is the number of columns.
    Binary search in a matrix: O(log(m * n)), because we are effectively performing a binary search over the entire matrix treated as a single sorted array.

### Points to Remember:
    Binary search requires that the matrix is sorted both row-wise and column-wise.
    
    Works effectively for two-dimensional arrays.
    
    Faster and more efficient than sequential search, especially for larger datasets.
    
    Utilizes the divide and conquer approach, similar to standard binary search.
    
    Ideal for large datasets where the matrix dimensions are substantial, enabling quick lookups.
### Code Implementation:

```java
public class BinarySearchInMatrix {

    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length;
        if (rows == 0) return false;
        int cols = matrix[0].length;

        int low = 0;
        int high = (rows * cols) - 1;  // Treating the 2D matrix as a single flat array

        while (low <= high) {
            int mid = (low + high) / 2;
            int midElement = matrix[mid / cols][mid % cols];  // Mapping the 1D index back to 2D

            if (midElement == target) {
                return true;  // Target found
            } else if (midElement < target) {
                low = mid + 1;  // Target is to the right
            } else {
                high = mid - 1;  // Target is to the left
            }
        }
        return false;  // Target not found
    }

    public static void main(String[] args) {
        BinarySearchInMatrix searcher = new BinarySearchInMatrix();
        int[][] matrix = {
            {1, 3, 5, 7},
            {10, 11, 16, 20},
            {23, 30, 34, 60}
        };
        int target = 3;
        boolean result = searcher.searchMatrix(matrix, target);
        System.out.println("Target found: " + result);  // Output: Target found: true
    }
}


