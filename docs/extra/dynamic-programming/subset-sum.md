---
id: subset-sum
title: Subset Sum Problem
sidebar_label: Subset Sum Problem
description: "Learn the Subset Sum Problem - a classic NP-complete problem solved efficiently using dynamic programming in pseudo-polynomial time."
tags: [dynamic-programming, subset-sum, knapsack, np-complete, algorithms]
---

# Subset Sum Problem

The **Subset Sum Problem** asks whether a subset of a given set of integers can sum to a target value. It is one of the classic NP-complete problems, but can be solved efficiently using dynamic programming in pseudo-polynomial time.

## Problem Statement

Given a set of positive integers `nums` and a target sum `target`, determine if there exists a subset of `nums` whose elements sum to exactly `target`.

**Example:**
```
Input:  nums = [3, 34, 4, 12, 5, 2],  target = 9
Output: True  (subset: [4, 5] or [3, 2, 4])
```

## Brute Force Approach

Try all possible subsets:

```python
def subset_sum_brute(nums, target):
    n = len(nums)
    for mask in range(1 << n):
        current_sum = 0
        for i in range(n):
            if mask & (1 << i):
                current_sum += nums[i]
        if current_sum == target:
            return True
    return False
```

**Time Complexity:** $O(n \times 2^n)$
**Space Complexity:** $O(1)$

## Dynamic Programming Solution

### State Definition

Let `dp[i]` represent whether a sum of `i` is achievable using some subset of the given numbers.

### Recurrence Relation

```
dp[sum] = true if exists num such that dp[sum - num] == true and num is in the set
```

### Bottom-Up Implementation

```python
def subset_sum_dp(nums, target):
    # dp[sum] = True if 'sum' can be achieved
    dp = [False] * (target + 1)
    dp[0] = True  # Zero sum is always achievable (empty subset)

    for num in nums:
        # Traverse backwards to avoid using the same number twice
        for s in range(target, num - 1, -1):
            if dp[s - num]:
                dp[s] = True

    return dp[target]

# Example usage
nums = [3, 34, 4, 12, 5, 2]
target = 9
print(subset_sum_dp(nums, target))  # Output: True
```

**Time Complexity:** $O(n \times \text{sum})$
**Space Complexity:** $O(\text{sum})$

### Why Backward Traversal?

When processing each number, we traverse from `target` down to `num` to ensure each number is used at most once. If we traversed forward, we might use the same number multiple times in the same iteration.

## Finding the Subset (Reconstruction)

```python
def subset_sum_with_subset(nums, target):
    n = len(nums)
    dp = [[False] * (target + 1) for _ in range(n + 1)]

    # Base case: empty subset can make sum 0
    for i in range(n + 1):
        dp[i][0] = True

    # Fill the DP table
    for i in range(1, n + 1):
        for s in range(1, target + 1):
            dp[i][s] = dp[i - 1][s]
            if s >= nums[i - 1]:
                dp[i][s] = dp[i][s] or dp[i - 1][s - nums[i - 1]]

    if not dp[n][target]:
        return False, []

    # Reconstruct subset
    subset = []
    s = target
    for i in range(n, 0, -1):
        if dp[i][s] and not dp[i - 1][s]:
            subset.append(nums[i - 1])
            s -= nums[i - 1]

    return True, subset[::-1]

nums = [3, 34, 4, 12, 5, 2]
target = 9
possible, subset = subset_sum_with_subset(nums, target)
print(f"Possible: {possible}, Subset: {subset}")  # Possible: True, Subset: [4, 5]
```

## Space-Optimized Version

The 2D DP table can be compressed to 1D, though subset reconstruction becomes harder:

```python
def subset_sum_optimized(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

    return dp[target]
```

## Handling Negative Numbers

```python
def subset_sum_with_negatives(nums, target):
    # Shift sums to handle negatives
    offset = sum(x for x in nums if x < 0)
    min_sum = offset
    max_sum = sum(x for x in nums if x > 0)
    size = max_sum - min_sum + 1

    dp = [False] * size
    dp[-min_sum] = True  # Sum of 0

    for num in nums:
        new_dp = dp[:]
        for s in range(size):
            if dp[s]:
                new_idx = s + num - min_sum
                if 0 <= new_idx < size:
                    new_dp[new_idx] = True
        dp = new_dp

    return dp[target - min_sum]
```

## Complexity Analysis

| Metric              | Value                      |
|---------------------|----------------------------|
| Time Complexity     | $O(n \times \text{sum})$   |
| Space Complexity    | $O(\text{sum})$            |
| Pseudo-polynomial   | Yes (depends on target, not n) |

## Why "Pseudo-Polynomial"?

The algorithm's complexity is polynomial in `n` (the number of elements) but exponential in the number of bits needed to represent `target`. This means:
- `target = 1000` requires 1001 DP entries
- `target = 10^9` requires 10^9 entries

This makes the algorithm impractical for very large targets, even with small $n$.

## Relationship to 0/1 Knapsack

The Subset Sum Problem is a special case of the **0/1 Knapsack Problem** where:
- Every item has value = weight = `nums[i]`
- Target sum = knapsack capacity
- Goal: achieve exactly the target value (fill the knapsack exactly)

Both problems share the same DP structure and complexity.

## Partition Equal Subset Sum

A common variant: can a set be partitioned into two subsets with equal sum?

```python
def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    return subset_sum_dp(nums, total // 2)

nums = [1, 5, 11, 5]
print(can_partition(nums))  # True (partition: [1, 5, 5] and [11])
```

## Applications

- **Resource allocation**: Selecting tasks that exactly fill available capacity
- **Currency system**: Finding exact change combinations
- **Cryptography**: Subset sum-based cryptographic schemes
- **Load balancing**: Partitioning workloads evenly
- **Portfolio optimization**: Selecting investments to reach a target value

## Key Takeaways

- Subset sum is NP-complete but tractable with DP in pseudo-polynomial time
- The DP solution uses $O(\text{sum})$ space, making it unsuitable for very large target values
- Backward traversal prevents using elements multiple times
- The solution is closely related to the 0/1 knapsack problem
