---
id: interpolation-search
title: Interpolation Search Algorithm
sidebar_label: Interpolation Search
sidebar_position: 6
description: A comprehensive guide to Interpolation Search, an improvement over binary search for uniformly distributed sorted arrays.
tags: [dsa, searching, algorithms, binary-search, interpolation]
---

## Introduction

**Interpolation Search** is a searching algorithm that improves upon binary search for sorted, uniformly distributed arrays. Instead of always checking the middle element, it uses a formula to guess where the target element is likely to be, based on the values at the boundaries.

## How It Works

Binary search always goes to the middle element:

```
pos = (low + high) / 2
```

Interpolation Search uses linear interpolation:

```
pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
```

For a uniformly distributed array where the values are proportional to their indices, this formula estimates the position much more accurately than binary search.

## Algorithm (Pseudo-code)

```text
function InterpolationSearch(arr, target):
    low = 0
    high = arr.length - 1

    while low <= high AND target >= arr[low] AND target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1

        // Interpolation formula
        pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])

        if arr[pos] == target:
            return pos
        else if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1
```

## Implementation in C

```c
#include <stdio.h>

int interpolationSearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target)
                return low;
            return -1;
        }

        // Prevent division by zero
        if (arr[high] == arr[low])
            break;

        // Interpolation formula
        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);

        if (arr[pos] == target)
            return pos;
        else if (arr[pos] < target)
            low = pos + 1;
        else
            high = pos - 1;
    }

    return -1;
}

int main() {
    int arr[] = {1, 6, 7, 13, 18, 21, 29, 35, 42, 58, 63, 70, 79, 85};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 42;

    int result = interpolationSearch(arr, n, target);
    if (result != -1)
        printf("Element found at index %d\n", result);
    else
        printf("Element not found\n");

    return 0;
}
```

## Implementation in Python

```python
def interpolation_search(arr, target):
    """
    Interpolation search for sorted, uniformly distributed arrays.
    Time Complexity: O(log log n) average, O(n) worst case
    """
    low = 0
    high = len(arr) - 1

    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1

        # Prevent division by zero
        if arr[high] == arr[low]:
            break

        # Interpolation formula
        pos = low + int(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        )

        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1

# Example
arr = [1, 6, 7, 13, 18, 21, 29, 35, 42, 58, 63, 70, 79, 85]
target = 42
result = interpolation_search(arr, target)
print(f"Element found at index: {result}")
```

## Step-by-Step Example

Array: `[1, 6, 7, 13, 18, 21, 29, 35, 42, 58, 63, 70, 79, 85]`, Target = 42

| Step | low | high | arr[low] | arr[high] | pos | arr[pos] |
|------|-----|------|----------|-----------|-----|----------|
| 1 | 0 | 13 | 1 | 85 | 0 + (41 * 13) / 84 = 6 | 29 | < 42, go right |
| 2 | 7 | 13 | 35 | 85 | 7 + (7 * 6) / 50 = 7 | 35 | < 42, go right |
| 3 | 8 | 13 | 42 | 85 | 8 + (0 * 5) / 43 = 8 | 42 | Found! |

## When to Use Interpolation Search

### Good for:
- **Uniformly distributed data**: Arrays where values are evenly spread out
- **Dense data**: When the dataset is large and uniformly distributed
- **Interpolation in numeric data**: Arrays where values have a known linear relationship

### Not suitable for:
- **Non-uniformly distributed data**: Binary search is more reliable
- **Small datasets**: The overhead of interpolation formula is not worth it
- **Binary Search is better for**: General-purpose sorted arrays

## Complexity Analysis

| Metric | Value |
|--------|-------|
| Best Case | O(1) - Target is at the estimated position |
| Average Case | O(log log n) - For uniformly distributed data |
| Worst Case | O(n) - For non-uniformly distributed data |
| Space | O(1) - Iterative implementation |

## Comparison with Binary Search

| Aspect | Binary Search | Interpolation Search |
|--------|--------------|---------------------|
| Approach | Always middle element | Estimated position |
| Best for | General sorted arrays | Uniformly distributed data |
| Avg. Time (uniform) | O(log n) | O(log log n) |
| Worst Time | O(log n) | O(n) |
| Practical performance | Reliable | Fast on right data |

## Practice Problems

1. Implement interpolation search and compare its performance with binary search on random uniformly distributed arrays.
2. Modify interpolation search to handle duplicate elements and return the first occurrence.
3. Implement a recursive version of interpolation search.
4. Analyze how interpolation search performs on exponentially distributed data.
