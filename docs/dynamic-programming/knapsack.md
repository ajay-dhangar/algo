---
id: knapsack
title: Knapsack Problem
sidebar_label: "Knapsack Problem"
sidebar_position: 6
description: In this blog post, we explore the Knapsack problem, a fundamental dynamic programming challenge that determines the maximum value achievable within a weight constraint.
tags: [DP, Knapsack]
---

# Knapsack Problem

## Introduction

The **Knapsack** problem is a well-known optimization problem that demonstrates the power of dynamic programming in solving complex decisions under constraints. In this problem, you aim to maximize the value of items you can carry in a knapsack without exceeding its weight capacity.

### Example

Consider a knapsack with a maximum weight capacity of `50` and a set of items with the following weights and values:
- Weights: `[10, 20, 30]`
- Values: `[60, 100, 120]`

The maximum value that can be achieved without exceeding the weight capacity is `220`, by choosing items with weights `20` and `30`.

## Problem Definition

Given an array of weights and values of `n` items, and a knapsack with a capacity `W`, find the maximum total value of items you can carry without exceeding the knapsack’s weight capacity.

## Dynamic Programming Approach

To solve the Knapsack problem, we use dynamic programming by creating a 2D `dp` array where `dp[i][w]` represents the maximum value achievable with the first `i` items and a knapsack capacity of `w`.

### Recurrence Relation

1. For each item `i`, we have two choices:
   - Do not include the item in the knapsack, so the value remains the same as `dp[i-1][w]`.
   - Include the item if it fits within the remaining weight capacity. In this case, we add its value to `dp[i-1][w - weight[i]]`:
     $$ 
     dp[i][w] = \max(dp[i-1][w], value[i] + dp[i-1][w - weight[i]])
     $$

### Base Case

- If there are no items or the weight capacity is `0`, the maximum value achievable is `0`: `dp[i][0] = 0` and `dp[0][w] = 0` for all `w`.

## Code Implementation in C++

Here’s a C++ implementation of the Knapsack problem:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int knapsack(int W, vector<int>& weights, vector<int>& values) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}

int main() {
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    int W = 50;

    cout << "Maximum value achievable in the knapsack: " << knapsack(W, weights, values) << endl; // Output: 220

    // Additional test cases
    vector<int> weights1 = {1, 2, 3};
    vector<int> values1 = {10, 15, 40};
    cout << "Maximum value (weights {1, 2, 3}): " << knapsack(5, weights1, values1) << endl; // Output: 65

    vector<int> weights2 = {5, 4, 6, 3};
    vector<int> values2 = {10, 40, 30, 50};
    cout << "Maximum value (weights {5, 4, 6, 3}): " << knapsack(10, weights2, values2) << endl; // Output: 90

    return 0;
}
```