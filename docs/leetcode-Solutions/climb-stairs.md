---
id: merge-intervals
sidebar_position: 4
title: Climbing Stairs
sidebar_label: Climbing Stairs
description: "This document explains the Climbing Stairs problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# Climbing-Stairs

## Description
You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Example 1:
**Input**: `n = 2`  
**Output**: `2`  
**Explanation**: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps.

### Example 2:
**Input**: `n = 4`  
**Output**: `5`  
**Explanation**: There are two ways to climb to the top.
1. 1 step + 1 step + 1 step + 1 step
2. 1 step + 1 step + 2 step
3. 1 step + 2 step + 1 step
4. 2 step + 1 step + 1 step
5. 2 steps + 2 step

## Approach - Brute Force
To find the number of steps, the strategy is as follows:

1.  If n == 0 or n == 1, there's only one way to reach the top (either standing still or taking one step).

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int climbStairs(int n) {
        if(n == 1 || n == 0) return 1;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};
```

Time Complexity: O(2^n) (due to overlapping sub-problems multiple times) <br/>
Space Complexity: O(n) (due to recursive stack)


## Approach - Memorization
To find the number of steps, the strategy is as follows:

1.  The idea is to use a dp array where dp[i] represents the number of distinct ways to reach step i.

2.  Base cases:
    **dp[0] = 1:** There's 1 way to reach the 0th step (doing nothing).
    **dp[1] = 1:** There's 1 way to reach the 1st step (a single step).

3.  For steps greater than 1, you can reach step i either from step i-1 or from step i-2. Thus, the recurrence relation is: dp[i] = dp[i - 1] + dp[i - 2]


## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int climbStairs(int n) {
        vector<int>dp(n + 1);
        dp[0] = 1;
        dp[1] = 1;
        for(int i = 2;i <= n;i++) dp[i] = dp[i - 1] + dp[i - 2];
        return dp[n];
    }
};
```

Time Complexity: O(n) (due to traverse to n) <br/>
Space Complexity: O(n) (due to using vector)


## Approach - Optimized Solution
To find the number of steps, the strategy is as follows:

1.  **temp1** initially stores the number of ways to reach the previous step **(n-2)**, and **temp2** stores the number of ways to reach the current step **(n-1)**.

2.  For each step, you calculate the number of ways to reach the next step as the sum of **temp1** and **temp2** (because you can either take one step from **n-1** or two steps from **n-2**).

3.  After calculating the next step, update **temp1** and **temp2** accordingly.

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int climbStairs(int n) {
        int temp1 = 0,temp2 = 1;
        for(int i = 0;i < n;i++){
            int temp = temp1 + temp2;
            temp1 = temp2;
            temp2 = temp;
        }
        return temp2;
    }
};
```

Time Complexity: O(n) (due to traverse to n) <br/>
Space Complexity: O(1) 