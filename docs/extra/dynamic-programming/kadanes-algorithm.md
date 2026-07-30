---
id: kadanes-maximum-subarray
title: Kadane's Algorithm (Maximum Subarray)
sidebar_label: Kadane's Algorithm
description: "A guide to Kadane's Algorithm for finding the maximum subarray sum in O(n) time, one of the most elegant dynamic programming solutions."
tags: [dynamic-programming, kadane, subarray, sliding-window, algorithms]
sidebar_position: 15
---

# Kadane's Algorithm

**Kadane's Algorithm** is an efficient method for solving the **Maximum Subarray Problem** - finding the contiguous subarray with the largest sum. It achieves $O(n)$ time complexity, dramatically outperforming the naive $O(n^3)$ and divide-and-conquer $O(n \log n)$ approaches.

## Problem Statement

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Example:**
```
Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6  (subarray: [4, -1, 2, 1])
```

## Brute Force Approach

Check all possible subarrays and track the maximum sum:

```python
def max_subarray_brute(nums):
    n = len(nums)
    max_sum = float('-inf')
    for i in range(n):
        current_sum = 0
        for j in range(i, n):
            current_sum += nums[j]
            max_sum = max(max_sum, current_sum)
    return max_sum
```
**Time Complexity:** $O(n^2)$
**Space Complexity:** $O(1)$

## Kadane's Algorithm

### Intuition

The key insight is that if we know the maximum subarray ending at position $i-1$, we can compute the maximum subarray ending at position $i$ in $O(1)$ time. We have two choices:
1. Extend the previous subarray (include `nums[i]`)
2. Start a new subarray at `nums[i]`

We always choose the better option.

```python
def kadane(nums):
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# Example usage
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(kadane(nums))  # Output: 6
```

### Why It Works

The algorithm maintains two values:
- `current_sum`: Maximum sum of subarray ending at current position
- `max_sum`: Maximum sum seen so far across all positions

At each step, `current_sum` is either extended with `nums[i]` or reset to `nums[i]` (starting fresh). This is because if adding `nums[i]` makes the sum worse than `nums[i]` alone, starting a new subarray is always better.

## Complexity Analysis

| Metric          | Complexity |
|-----------------|------------|
| Time Complexity | $O(n)$     |
| Space Complexity| $O(1)$     |

## Handling All-Negative Arrays

The standard Kadane's algorithm works correctly for arrays with all negative numbers as well, returning the maximum (least negative) element:

```python
def kadane_all_negative(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

# Example: all negative
print(kadane_all_negative([-3, -1, -2]))  # Output: -1
```

## Reconstructing the Subarray

To also return the actual subarray, track the start and end indices:

```python
def kadane_with_indices(nums):
    max_sum = current_sum = nums[0]
    start = end = 0
    temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            temp_start = i
        else:
            current_sum += nums[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end

nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
max_sum, s, e = kadane_with_indices(nums)
print(f"Max sum: {max_sum}, Subarray: {nums[s:e+1]}")
# Output: Max sum: 6, Subarray: [4, -1, 2, 1]
```

## Variants

### Maximum Circular Subarray Sum

Find the maximum sum of a circular subarray (wrapping around the end):

```python
def max_circular_subarray(nums):
    total_sum = sum(nums)
    max_kadane = kadane(nums)  # Standard Kadane
    max_wrap = total_sum - kadane_all_negative([-x for x in nums])

    if max_wrap == 0:
        return max_kadane
    return max(max_kadane, max_wrap)
```

### Maximum Product Subarray

For maximum product subarray (considering negative numbers):

```python
def max_product(nums):
    if not nums:
        return 0

    max_prod = min_prod = result = nums[0]

    for num in nums[1:]:
        temp = max(num, max_prod * num, min_prod * num)
        min_prod = min(num, max_prod * num, min_prod * num)
        max_prod = temp
        result = max(result, max_prod)

    return result
```

## Applications

- **Stock price analysis**: Maximum profit from single buy/sell
- **Signal processing**: Finding dominant signals
- **Image processing**: Finding brightest/darkest regions
- **Bioinformatics**: Finding mutations in sequence alignments

## Key Takeaways

- Kadane's algorithm reduces $O(n^2)$ to $O(n)$ by exploiting the optimal substructure property
- The optimal subarray ending at position $i$ is either `[i]` alone or extended from the optimal subarray ending at $i-1$
- Works for all-negative arrays by comparing `nums[i]` vs `current_sum + nums[i]`
