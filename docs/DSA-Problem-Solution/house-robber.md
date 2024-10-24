---
id: house-robber-algorithm
title: House Robber Algorithm
sidebar_label: Leetcode 198
tags: [Leetcode, Dynamic Programming, DSA, House Robber]
description: Solve the House Robber problem using dynamic programming to maximize the amount of money that can be robbed from houses without robbing two adjacent houses.
---

# House Robber Algorithm

## Description

The **House Robber** problem is a classic dynamic programming problem that focuses on maximizing the amount of money that can be robbed from houses lined up in a row, under the constraint that adjacent houses cannot be robbed.

### Problem Definition

Given:
- An array of integers `nums` where each element represents the amount of money in each house.

Objective:
- Determine the maximum amount of money that can be robbed without robbing two adjacent houses.

### Algorithm Overview

1. **Dynamic Programming Approach**:
   - Use a DP array where `dp[i]` represents the maximum amount of money that can be robbed from the first `i` houses.
   - Initialize:
     - `dp[0] = 0` (no houses to rob)
     - `dp[1] = nums[0]` (only one house)
   - For each house `i` from 2 to `n`:
     - Update `dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])`
       - `dp[i-1]`: maximum amount without robbing the current house
       - `dp[i-2] + nums[i-1]`: maximum amount including the current house

2. **Return** `dp[n]`, the maximum amount that can be robbed.

### Time Complexity

- **Time Complexity**: O(n), where n is the number of houses.
- **Space Complexity**: O(n) for the DP array.

### C++ Implementation

```cpp
#include <vector>
using namespace std;

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = nums[0];

    for (int i = 2; i <= n; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    }

    return dp[n];
}
````
