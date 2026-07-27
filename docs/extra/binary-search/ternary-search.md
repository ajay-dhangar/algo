---
id: ternary-search
title: "Ternary Search"
sidebar_label: "Ternary Search"
sidebar_position: 15
description: "A divide-and-conquer algorithm for finding the maximum or minimum of a unimodal function by partitioning the search space into three parts."
tags: ["dsa", "algorithms", "search", "divide-and-conquer"]
---

# Ternary Search

## Overview

Ternary Search is a divide-and-conquer algorithm used to find the maximum or minimum of a **unimodal function** - a function that first increases and then decreases (or vice versa). Unlike binary search which divides the array into two parts, ternary search divides it into three parts using two midpoints.

## When to Use Ternary Search

Ternary search is ideal when:
- Searching in a **unimodal function** (strictly increasing then strictly decreasing, or vice versa)
- Finding the **maximum** of a convex function or **minimum** of a concave function
- Problems involving real numbers where binary search precision is insufficient

### Common Applications
- Finding peak elements in unimodal arrays
- Optimization problems in calculus-based contexts
- Finding maximum profit in stock trading (buy low, sell high pattern)

## Algorithm Steps

1. Calculate two midpoints: `mid1 = left + (right - left) / 3` and `mid2 = right - (right - left) / 3`
2. Evaluate the function at both midpoints
3. If `f(mid1) < f(mid2)`, the maximum lies in `[mid1, right]` (move left pointer to `mid1`)
4. If `f(mid1) > f(mid2)`, the maximum lies in `[left, mid2]` (move right pointer to `mid2`)
5. Repeat until `right - left < epsilon` (desired precision)

## Pseudocode

```
function ternarySearch(f, left, right, epsilon):
    while right - left > epsilon:
        mid1 = left + (right - left) / 3
        mid2 = right - (right - left) / 3
        
        if f(mid1) < f(mid2):
            left = mid1        // Maximum is in [mid1, right]
        else:
            right = mid2       // Maximum is in [left, mid2]
    
    return (left + right) / 2  // Peak position
```

## Time and Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time Complexity | O(log_3 n) |
| Space Complexity | O(log n) recursive, O(1) iterative |
| Iterations | ~log_3 n = ~1.099 * log_2 n |

## Python Implementation

```python
def ternary_search(f, left, right, epsilon=1e-7):
    """
    Find the maximum of a unimodal function f in [left, right].
    
    Args:
        f: Unimodal function to search
        left: Left boundary
        right: Right boundary
        epsilon: Precision threshold
    
    Returns:
        x position where f achieves maximum (approximately)
    """
    iterations = 0
    max_iterations = 100
    
    while right - left > epsilon and iterations < max_iterations:
        mid1 = left + (right - left) / 3
        mid2 = right - (right - left) / 3
        
        # For finding maximum: if f(mid1) < f(mid2), search right half
        if f(mid1) < f(mid2):
            left = mid1
        else:
            right = mid2
        
        iterations += 1
    
    peak_x = (left + right) / 2
    return peak_x, f(peak_x)


def find_peak_unimodal(arr):
    """Find peak element in unimodal array using ternary search."""
    def f(x):
        idx = int(x)
        if idx < 0:
            return float('-inf')
        if idx >= len(arr) - 1:
            return float('-inf')
        return arr[idx]
    
    peak_x, _ = ternary_search(f, 0, len(arr) - 1)
    return int(peak_x)


# Example usage
if __name__ == "__main__":
    # Unimodal array: increasing then decreasing
    arr = [1, 3, 5, 7, 9, 11, 10, 8, 6, 4, 2]
    peak_idx = find_peak_unimodal(arr)
    print(f"Peak element {arr[peak_idx]} at index {peak_idx}")
    
    # Finding maximum of a quadratic function
    def parabola(x):
        return -(x - 5) ** 2 + 25  # Maximum at x = 5
    
    peak_x, peak_val = ternary_search(parabola, -10, 20)
    print(f"Maximum of parabola: f({peak_x:.6f}) = {peak_val:.6f}")
```

## JavaScript Implementation

```javascript
/**
 * Ternary Search - Find maximum of unimodal function
 * @param {Function} f - Unimodal function
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @param {number} epsilon - Precision threshold
 * @returns {Object} - { x: peak position, value: function value at peak }
 */
function ternarySearch(f, left, right, epsilon = 1e-7) {
    let iterations = 0;
    const maxIterations = 100;
    
    while (right - left > epsilon && iterations < maxIterations) {
        const mid1 = left + (right - left) / 3;
        const mid2 = right - (right - left) / 3;
        
        // For finding maximum
        if (f(mid1) < f(mid2)) {
            left = mid1;
        } else {
            right = mid2;
        }
        
        iterations++;
    }
    
    const peakX = (left + right) / 2;
    return { x: peakX, value: f(peakX) };
}

/**
 * Find peak in unimodal array
 * @param {number[]} arr - Unimodal array
 * @returns {number} - Index of peak element
 */
function findPeakUnimodal(arr) {
    const f = (x) => {
        const idx = Math.floor(x);
        if (idx < 0 || idx >= arr.length - 1) {
            return -Infinity;
        }
        return arr[idx];
    };
    
    const result = ternarySearch(f, 0, arr.length - 1);
    return Math.floor(result.x);
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 10, 8, 6, 4, 2];
console.log(`Peak element ${arr[findPeakUnimodal(arr)]} at index ${findPeakUnimodal(arr)}`);

// Finding maximum of cubic function
const cubic = (x) => -((x - 3) ** 3) + 2 * ((x - 3) ** 2) + 10;
const result = ternarySearch(cubic, -5, 10);
console.log(`Maximum: f(${result.x.toFixed(6)}) = ${result.value.toFixed(6)}`);
```

## Comparison with Binary Search

| Aspect | Binary Search | Ternary Search |
|--------|---------------|----------------|
| Divides into | 2 parts | 3 parts |
| Compares | 1 element | 2 elements per iteration |
| Time complexity | O(log_2 n) | O(log_3 n) |
| Iterations needed | log_2 n | ~0.63 * log_2 n |
| Use case | Sorted arrays | Unimodal functions |

## Practice Problems

1. **LeetCode 162 - Find Peak Element**: Find a peak element in an array
2. **LeetCode 852 - Peak Index in a Mountain Array**: Find the index of peak in mountain array
3. **Peak element in 2D grid**: Extend ternary search to 2D unimodal surfaces
4. **Maximum in bitonic array**: Find maximum in array that increases then decreases

## Common Pitfalls

1. **Forgetting epsilon**: Always have a termination condition to avoid infinite loops
2. **Wrong comparison direction**: Ensure correct comparison based on whether searching for max or min
3. **Integer overflow**: Use `left + (right - left) / 3` instead of `(left + right) / 3`
4. **Non-unimodal data**: Ternary search fails on non-unimodal functions
