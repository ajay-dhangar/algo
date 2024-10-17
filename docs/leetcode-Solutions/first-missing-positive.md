---
id: first-missing-positive
sidebar_position: 6
title: First Missing Positive
sidebar_label: First Missing Positive
description: "This document explains the First Missing Positive problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# First Missing Positive

## Description
Given an unsorted integer array `nums`, return the smallest missing positive integer.

You must implement an algorithm that runs in **O(n)** time and uses constant extra space.

### Example:
**Input**: `nums = [1,2,0]`  
**Output**: `3`

**Input**: `nums = [3,4,-1,1]`  
**Output**: `2`

**Input**: `nums = [7,8,9,11,12]`  
**Output**: `1`

## Approach
The goal is to find the smallest missing positive integer in linear time and constant space.

### Steps:
1. **Index Mapping**: Since the smallest missing positive integer must lie between `1` and `n+1` (where `n` is the length of the array), we can try to place each number in its correct position, i.e., `nums[i] = i+1`. For example, `nums[i]` should be placed at index `nums[i] - 1`.
2. **Cycle Sort**: We can iterate through the array, and whenever we find a number between `1` and `n`, we place it in its correct index. We keep swapping elements until all numbers are either at their correct positions or are out of range.
3. **Find the Missing Positive**: After rearranging the array, the first index `i` where `nums[i] != i + 1` gives the first missing positive. If no such index is found, the missing positive is `n+1`.

## C++ Implementation

```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        
        // Step 1: Place each number in its correct index
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);  // Swap to place nums[i] at its correct position
            }
        }
        
        // Step 2: Find the first missing positive number
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;  // First missing positive
            }
        }
        
        return n + 1;  // If all positions are correct, return n + 1
    }
};
```
### Time Complexity
**O(n): We iterate through the array twice, once for the rearrangement and once to find the missing positive, so the time complexity is linear.**
### Space Complexity
**O(1): The algorithm uses constant extra space since it modifies the input array in place.**