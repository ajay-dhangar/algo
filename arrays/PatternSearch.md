---
id: pattern-search-2d
title: Pattern Search in 2-D Arrays
sidebar_label: Introduction to Pattern Search in 2-D Arrays
sidebar_position: 1
description: The Pattern Search in 2-D Arrays algorithm efficiently finds a specified pattern within a two-dimensional array, making it useful in various applications such as image processing and text recognition.
tags: [basic-dsa, data-structures, Pattern Search]
---

### Definition

The Pattern Search in 2-D Arrays algorithm is used to locate a specific pattern or subarray within a two-dimensional array (matrix). This method is particularly useful in applications such as image processing, where one may need to find specific shapes or features within a larger image.

### Characteristics

- **Search in Two Dimensions**:
  - The algorithm is designed to work with matrices, allowing for horizontal, vertical, and diagonal searches.

- **Flexible Pattern Matching**:
  - The algorithm can handle patterns of varying sizes and can accommodate different shapes and orientations.

- **Efficient Searching**:
  - Depending on the implementation, it can provide efficient searching capabilities, especially in matrices with specific constraints.

### Time Complexity

- **Best Case: O(m * n)**
  - In the best case, where the pattern is found early, the search complexity is linear relative to the size of the matrix.

- **Average and Worst Case: O(m * n * p * q)**
  - In the worst case, the algorithm may need to compare each element of the matrix (m x n) with every element of the pattern (p x q), leading to higher complexity.

- **Space Complexity: O(1)**
  - The algorithm can be implemented with constant extra space, not accounting for the input matrix.

### Python Implementation

```python
def search_pattern(matrix, pattern):
    """
    Search for a pattern in a 2D matrix.

    Args:
        matrix (list of list): The 2D matrix to search within.
        pattern (list of list): The 2D pattern to search for.

    Returns:
        bool: True if the pattern is found, otherwise False.
    """
    if not matrix or not pattern:
        return False

    n, m = len(matrix), len(matrix[0])
    p, q = len(pattern), len(pattern[0])

    for i in range(n - p + 1):
        for j in range(m - q + 1):
            found = True
            for x in range(p):
                for y in range(q):
                    if matrix[i + x][j + y] != pattern[x][y]:
                        found = False
                        break
                if not found:
                    break
            if found:
                return True

    return False

# Example usage
if __name__ == "__main__":
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ]
    
    pattern = [
        [6, 7],
        [10, 11]
    ]
    
    found = search_pattern(matrix, pattern)
    print("Pattern found:", found)  # Output: True
