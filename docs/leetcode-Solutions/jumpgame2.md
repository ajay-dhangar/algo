---
id: jump-game-ii
sidebar_position: 7
title: Jump Game II
sidebar_label: Jump Game II
description: "This document explains the Jump Game II problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# jump-game-ii

## Description
You are given a **0-indexed** array of integers `nums` of length `n`. Each element `nums[i]` represents the maximum number of steps you can jump forward from that index.

Your goal is to reach the last index in the minimum number of jumps. You can assume that you can always reach the last index.

### Example:
**Input**: `nums = [2,3,1,1,4]`  
**Output**: `2`  
**Explanation**: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Input**: `nums = [2,3,0,1,4]`  
**Output**: `2`

## Approach
To solve this problem, the key idea is to use a **greedy algorithm** to keep track of the maximum distance we can reach as we jump through the array.

### Steps:
1. **Initialize** variables to keep track of:
   - `jumps`: the number of jumps made to reach the last index.
   - `current_end`: the farthest index we can reach with the current jump.
   - `farthest`: the farthest index we can reach from any position within the range of the current jump.
   
2. Iterate over the array:
   - For each position `i`, update `farthest` as the maximum of `farthest` and `i + nums[i]` (the farthest point you can jump to from index `i`).
   - If we reach the `current_end`, it means we must jump, so increment the `jumps` counter and update `current_end` to `farthest`.

3. Continue this process until we reach the last index.

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int jump(std::vector<int>& nums) {
        int jumps = 0;
        int current_end = 0;
        int farthest = 0;

        // Iterate until the second last element
        for (int i = 0; i < nums.size() - 1; ++i) {
            // Update the farthest point we can reach
            farthest = std::max(farthest, i + nums[i]);

            // If we have reached the end of the current jump range
            if (i == current_end) {
                ++jumps;  // We must make a jump
                current_end = farthest;  // Update the end point for the next jump
            }
        }

        return jumps;
    }
};
```
The time complexity is O(n) <br/>
The space complexity is O(1)