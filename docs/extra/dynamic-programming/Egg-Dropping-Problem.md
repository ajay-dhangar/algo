---
id: egg-dropping-problem
title: Egg Dropping Problem Algorithm
sidebar_label: Egg Dropping Problem
sidebar_position: 15
description: A comprehensive guide to the Egg Dropping Problem, a classic dynamic programming puzzle.
tags: [dsa, dynamic-programming, algorithms, egg-dropping, binary-search]
---

## Introduction

The **Egg Dropping Problem** is a classic algorithmic puzzle: Given `k` eggs and `n` floors of a building, find the minimum number of trials required to determine the highest floor from which an egg can be dropped without breaking.

The key insight is that:
- If an egg breaks at floor `x`, we know all floors above `x` are too high.
- If an egg survives at floor `x`, we know all floors below `x` are safe.

This problem demonstrates the power of dynamic programming and the optimization of recursive solutions.

## Problem Statement

Given:
- `k` eggs
- `n` floors

Find the minimum number of attempts `T` required in the worst case to find the critical floor (the highest floor from which an egg can be dropped without breaking).

An egg that is dropped from a floor and breaks is discarded. An egg that survives can be reused.

## Recursive Formulation

Let `dp[k][n]` be the minimum number of trials needed with `k` eggs and `n` floors.

The key recurrence:

```
dp[k][n] = 1 + min(max(dp[k-1][x-1], dp[k][n-x])) for x in 1..n
```

Where `x` is the floor we drop an egg from:
- `dp[k-1][x-1]` = worst case if the egg breaks (we have k-1 eggs and x-1 floors below)
- `dp[k][n-x]` = worst case if the egg survives (we have k eggs and n-x floors above)

We choose the `x` that minimizes the worst case.

## Naive Recursive Solution

```python
import sys

def egg_dropping_naive(k, n):
    """
    Naive recursive solution.
    Time: O(k * n^k) - exponential
    Space: O(k)
    """
    if k == 1:
        return n  # With 1 egg, must try all floors
    if n == 0:
        return 0  # No floors, no trials needed
    if n == 1:
        return 1  # 1 floor = 1 trial

    min_trials = sys.maxsize

    for x in range(1, n + 1):
        # Drop from floor x
        # If egg breaks: need dp[k-1][x-1] trials
        # If egg survives: need dp[k][n-x] trials
        worst = max(egg_dropping_naive(k - 1, x - 1),
                    egg_dropping_naive(k, n - x))
        min_trials = min(min_trials, worst)

    return 1 + min_trials
```

## Dynamic Programming Solution (Memoization)

```python
def egg_dropping_dp(k, n):
    """
    DP with memoization.
    Time: O(k * n^2)
    Space: O(k * n)
    """
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(eggs, floors):
        if eggs == 1:
            return floors
        if floors == 0:
            return 0
        if floors == 1:
            return 1

        min_trials = float('inf')

        for f in range(1, floors + 1):
            worst = max(dp(eggs - 1, f - 1), dp(eggs, floors - f))
            min_trials = min(min_trials, worst)

        return 1 + min_trials

    return dp(k, n)
```

## Optimized DP with Binary Search

The naive DP checks all floors for each state. We can optimize using binary search because `dp[k-1][f-1]` is monotonically increasing in `f` while `dp[k][n-f]` is monotonically decreasing.

```python
import math

def egg_dropping_optimized(k, n):
    """
    Optimized DP using binary search for floor selection.
    Time: O(k * n * log n) - actually O(k * n * log floors)
    Space: O(k * n)
    """
    from functools import lru_cache

    @lru_cache(maxsize=None)
    def dp(eggs, floors):
        if eggs == 1:
            return floors
        if floors == 0 or floors == 1:
            return floors

        low, high = 1, floors
        best = floors  # Worst case: linear search

        while low <= high:
            mid = (low + high) // 2

            # Egg breaks: search below
            break_case = dp(eggs - 1, mid - 1)
            # Egg survives: search above
            survive_case = dp(eggs, floors - mid)

            worst = max(break_case, survive_case)

            if break_case > survive_case:
                # Egg breaking is worse, search lower floors
                high = mid - 1
            else:
                # Egg surviving is worse, search higher floors
                low = mid + 1

            best = min(best, worst)

        return 1 + best

    return dp(k, n)
```

## Iterative DP Table

```c
#include <stdio.h>
#include <string.h>
#include <limits.h>

int eggDropping(int k, int n) {
    // dp[i][j] = min trials needed with i eggs and j floors
    int dp[k + 1][n + 1];

    // Base case: 1 egg -> try all floors
    for (int i = 1; i <= k; i++) {
        dp[i][0] = 0;  // 0 floors -> 0 trials
        dp[i][1] = 1;  // 1 floor -> 1 trial
    }

    // Base case: 1 floor
    for (int j = 0; j <= n; j++) {
        dp[1][j] = j;
    }

    // Fill the table bottom-up
    for (int i = 2; i <= k; i++) {
        for (int j = 2; j <= n; j++) {
            dp[i][j] = INT_MAX;
            int low = 1, high = j;
            int temp;

            while (low <= high) {
                int mid = (low + high) / 2;
                // Egg breaks: dp[i-1][mid-1]
                // Egg survives: dp[i][j-mid]
                temp = 1 + (dp[i - 1][mid - 1] > dp[i][j - mid]
                            ? dp[i - 1][mid - 1]
                            : dp[i][j - mid]);

                if (temp < dp[i][j]) {
                    dp[i][j] = temp;
                }

                if (dp[i - 1][mid - 1] < dp[i][j - mid]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
    }

    return dp[k][n];
}

int main() {
    int k = 2, n = 10;
    printf("Minimum trials with %d eggs and %d floors: %d\n",
           k, n, eggDropping(k, n));
    return 0;
}
```

## Egg Dropping with Minimum Attempts Limit

Sometimes we need to find if we can determine the critical floor within `T` attempts:

```python
def can_solve_within_trials(k, t, n):
    """
    Can we determine the critical floor with k eggs and t trials for n floors?
    Uses the fact that total floors testable = sum of C(t, i) for i in 1..k
    """
    reachable = 0
    for i in range(1, k + 1):
        reachable += math.comb(t, i)
        if reachable >= n:
            return True
    return False


def min_trials_binary_search(k, n):
    """
    Binary search on the number of trials.
    """
    low, high = 1, n
    while low < high:
        mid = (low + high) // 2
        if can_solve_within_trials(k, mid, n):
            high = mid
        else:
            low = mid + 1
    return low
```

## Complexity Analysis

| Approach | Time Complexity | Space Complexity |
|----------|----------------|------------------|
| Naive Recursion | O(k * n^k) | O(k) |
| Recursion + Memoization | O(k * n^2) | O(k * n) |
| Optimized + Binary Search | O(k * n * log n) | O(k * n) |
| DP Table (iterative) | O(k * n^2) | O(k * n) |

## Famous Formula

For 2 eggs and n floors, the optimal strategy drops from floors in a triangular number pattern: 1, 3, 6, 10, 15, ... (the k-th trial is from floor k*(k+1)/2). The minimum trials T satisfies: T*(T+1)/2 >= n, so T = ceil((sqrt(8n+1) - 1) / 2).

## Practice Problems

1. Find the minimum number of trials with k eggs and n floors.
2. Given k eggs and t trials, find the maximum number of floors that can be tested.
3. Implement the egg dropping problem using a 1D DP array (space optimization).
4. Modify the solution to return one optimal strategy (which floors to try).
5. Solve for the case where eggs can be reused after surviving a drop.
