---
id: house-robber
title: House Robber
sidebar_label: "House Robber"
sidebar_position: 5
description: In this blog post, we explore the House Robber problem, a classic dynamic programming challenge that determines the maximum amount of money you can rob from a series of houses arranged in a line.
tags: [DP, House Robber]
---

# House Robber

## Introduction

The **House Robber** problem is a popular dynamic programming problem that illustrates how to make optimal decisions while adhering to constraints. In this problem, you must decide how much money to rob from a series of houses lined up in a row, ensuring that no two adjacent houses are robbed to avoid detection.

### Example

Consider the following amounts in houses:
- House values: `[2, 7, 9, 3, 1]`

The maximum amount you can rob without alerting the police is `12`, which can be achieved by robbing the houses with values `2`, `9`, and `1`.

## Problem Definition

Given an array of non-negative integers representing the amount of money at each house, the objective is to calculate the maximum amount of money you can rob without robbing two adjacent houses.

## Dynamic Programming Approach

To solve the House Robber problem, we can use dynamic programming by maintaining a `dp` array where `dp[i]` represents the maximum amount of money that can be robbed up to the i-th house.

### Recurrence Relation

1. For each house `i`, we have two choices:
   - Rob the current house `i`, adding its value to the maximum amount robbed from houses up to `i - 2`: 
     $$ 
     dp[i] = nums[i] + dp[i - 2] 
     $$
   - Skip the current house and take the maximum amount robbed from the previous house:
     $$ 
     dp[i] = dp[i - 1] 
     $$
2. The state transition is:
   $$
   dp[i] = \max(dp[i - 1], nums[i] + (i > 1 ? dp[i - 2] : 0))
   $$

### Base Case

- If there are no houses, the maximum amount is `0`: `dp[0] = 0`.
- If there is one house, the maximum amount is its value: `dp[1] = nums[0]`.

## Code Implementation in C++

Here’s a C++ implementation of the House Robber problem:

```cpp
#include <iostream>
#include <vector>

using namespace std;

int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];

    // Create a dp array to store the maximum amounts
    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);

    // Fill the dp array
    for (int i = 2; i < n; i++) {
        dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);
    }

    // The maximum amount is found at dp[n-1]
    return dp[n - 1];
}

int main() {
    vector<int> houses = {2, 7, 9, 3, 1};
    cout << "Maximum amount of money that can be robbed: " << rob(houses) << endl; // Output: 12

    // Additional test cases
    vector<int> houses1 = {1, 2, 3, 1};
    cout << "Maximum amount (1, 2, 3, 1): " << rob(houses1) << endl; // Output: 4

    vector<int> houses2 = {2, 1, 1, 2};
    cout << "Maximum amount (2, 1, 1, 2): " << rob(houses2) << endl; // Output: 4

    return 0;
}

```
## Explanation of the Code

1.  **Initial Setup:**
    
    -   We first determine the number of houses `n` and create a `dp` vector of size `n + 1`, initializing all elements to 0.
    -   The `dp[i]` represents the maximum amount of money that can be robbed up to the i-th house.

2.  **Filling the DP Array:**
    
    -   We start from the first house and iteratively calculate the maximum money that can be robbed at each house.
    -   For each house `i`, we have two choices:
        -   Rob the current house and add its value to the maximum amount robbed from houses up to `i - 2` (i.e., `dp[i - 2] + nums[i]`).
        -   Skip the current house and take the maximum amount robbed from the previous house (i.e., `dp[i - 1]`).
    -   We take the maximum of these two choices and store it in `dp[i]`.

3.  **Returning the Result:**
    
    -   Once the DP array is completely filled, the last element `dp[n]` contains the maximum amount of money that can be robbed from all houses.

## Time and Space Complexity

-   **Time Complexity:** The time complexity is $O(n)$ since we iterate through the list of houses once.
-   **Space Complexity:** The space complexity is $O(n)$ due to the `dp` array used for storing intermediate results.

## Conclusion

The House Robber problem is a classic example of dynamic programming that demonstrates how to make optimal decisions at each step to maximize the overall outcome. The approach described here allows for an efficient solution while maintaining clarity and simplicity in code structure.
