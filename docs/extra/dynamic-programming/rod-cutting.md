---
id: rod-cutting
title: Rod Cutting Problem
sidebar_label: Rod Cutting Problem
description: "Learn the Rod Cutting Problem - a classic dynamic programming optimization problem of maximizing profit by cutting a rod into pieces."
tags: [dynamic-programming, optimization, rod-cutting, knapsack, algorithms]
---

# Rod Cutting Problem

The **Rod Cutting Problem** is a classic optimization problem in dynamic programming. Given a rod of length $n$ and a table of prices $p[i]$ for each piece of length $i$, determine the maximum revenue obtainable by cutting the rod and selling the pieces.

## Problem Statement

You have a rod of length $n$ inches and a price table:

| Length | Price |
|--------|-------|
| 1      | $1    |
| 2      | $5    |
| 3      | $8    |
| 4      | $9    |
| 5      | $10   |
| 6      | $17   |
| 7      | $17   |
| 8      | $20   |

For a rod of length 8, what cuts yield the maximum revenue?

**Answer: 2 + 6 = 8 (price: 5 + 17 = 22)**

## Recursive Formulation

Let $r[n]$ be the maximum revenue for a rod of length $n$.

$$r[n] = \max_{1 \leq i \leq n}(p[i] + r[n - i])$$

This means: either sell the rod uncut of length $i$ and add the optimal solution for length $n-i$, or just cut off length $i$ and continue.

## Approach 1: Top-Down Recursive (Naive)

```python
def cut_rod_recursive(prices, n):
    if n <= 0:
        return 0

    max_revenue = float('-inf')
    for i in range(1, n + 1):
        max_revenue = max(max_revenue, prices[i] + cut_rod_recursive(prices, n - i))
    return max_revenue

# Example
prices = [0, 1, 5, 8, 9, 10, 17, 17, 20]  # prices[0] unused
print(cut_rod_recursive(prices, 8))  # Output: 22
```

**Time Complexity:** $O(2^n)$ - exponential, extremely slow for large $n$

## Approach 2: Top-Down with Memoization

Store previously computed results to avoid redundant calculations:

```python
def cut_rod_memoized(prices, n):
    memo = [-1] * (n + 1)
    memo[0] = 0

    def helper(length):
        if memo[length] >= 0:
            return memo[length]

        max_revenue = float('-inf')
        for i in range(1, length + 1):
            max_revenue = max(max_revenue, prices[i] + helper(length - i))
        memo[length] = max_revenue
        return max_revenue

    return helper(n)

print(cut_rod_memoized(prices, 8))  # Output: 22
```

**Time Complexity:** $O(n^2)$
**Space Complexity:** $O(n)$

## Approach 3: Bottom-Up Dynamic Programming

```python
def cut_rod_dp(prices, n):
    dp = [0] * (n + 1)
    dp[0] = 0

    for length in range(1, n + 1):
        max_revenue = float('-inf')
        for cut in range(1, length + 1):
            max_revenue = max(max_revenue, prices[cut] + dp[length - cut])
        dp[length] = max_revenue

    return dp[n]

# Example
prices = [0, 1, 5, 8, 9, 10, 17, 17, 20]
print(cut_rod_dp(prices, 8))  # Output: 22
```

**Time Complexity:** $O(n^2)$
**Space Complexity:** $O(n)$

## Approach 4: Bottom-Up with Cut Reconstruction

Track which cut was made to reconstruct the solution:

```python
def cut_rod_with_solution(prices, n):
    dp = [0] * (n + 1)
    cuts = [0] * (n + 1)

    for length in range(1, n + 1):
        max_revenue = float('-inf')
        for cut in range(1, length + 1):
            revenue = prices[cut] + dp[length - cut]
            if revenue > max_revenue:
                max_revenue = revenue
                cuts[length] = cut
        dp[length] = max_revenue

    # Reconstruct the solution
    solution = []
    while n > 0:
        solution.append(cuts[n])
        n -= cuts[n]

    return dp[len(solution) and len(solution) or n], solution

prices = [0, 1, 5, 8, 9, 10, 17, 17, 20]
max_rev, cuts_made = cut_rod_with_solution(prices, 8)
print(f"Maximum revenue: {max_rev}")   # Output: 22
print(f"Cuts made: {cuts_made}")       # Output: [2, 6]
```

## Complexity Analysis

| Approach              | Time Complexity | Space Complexity |
|-----------------------|-----------------|------------------|
| Naive Recursion       | $O(2^n)$        | $O(n)$           |
| Memoized (Top-Down)   | $O(n^2)$        | $O(n)$           |
| Bottom-Up DP          | $O(n^2)$        | $O(n)$           |
| Bottom-Up + Solution  | $O(n^2)$        | $O(n)$           |

## Relationship to Other Problems

The Rod Cutting Problem is a special case of **unbounded knapsack** where:
- Each "item" is a cut of length $i$ with value $p[i]$
- The "capacity" is the rod length $n$
- Items can be taken unlimited times (unbounded)

It is also equivalent to **integer partition** where the goal is to maximize the sum of weights rather than minimize the number of parts.

## Extended Problem: Unlimited Cuts vs Limited Cuts

```python
# Limited cuts: at most k cuts
def cut_rod_limited(prices, n, k):
    dp = [[0] * (k + 1) for _ in range(n + 1)]

    for length in range(1, n + 1):
        for cuts in range(1, k + 1):
            max_revenue = float('-inf')
            for cut in range(1, length + 1):
                if cuts > 0:
                    max_revenue = max(max_revenue, prices[cut] + dp[length - cut][cuts - 1])
            dp[length][cuts] = max_revenue

    return dp[n][k]
```

## Key Takeaways

- Rod cutting exhibits **optimal substructure**: the optimal solution for length $n$ contains optimal solutions for smaller lengths
- **Overlapping subproblems**: the same subproblem (optimal for length $m$) is solved multiple times in the naive recursive approach
- The DP solution is $O(n^2)$ — a significant improvement over $O(2^n)$
- The problem maps elegantly to the unbounded knapsack formulation
