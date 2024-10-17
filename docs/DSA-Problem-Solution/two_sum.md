---
id: two-sum-problem
sidebar_position: 2
title: Two Sum
sidebar_label: Two Sum
description: "This document explains the Two Sum problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Two Sum

## Problem Statement
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

## Approach
To solve this problem, we can use a hash map to store the numbers and their indices. As we iterate through the list, we check if the complement (target - current number) exists in the hash map.

### Steps:

1. **Initialize**:  
   - Create an empty `hash` map.

2. **Iterate**:  
   - For each number in `nums`, calculate its complement.
   - Check if the complement exists in the hash map.
   - If it exists, return the indices.
   - Otherwise, add the current number and its index to the hash map.

3. **Return**:  
   - If no solution is found, return an empty list.

## Python Implementation

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
```
Time Complexity: O(n) <br /> 
Space Complexity: O(n)    