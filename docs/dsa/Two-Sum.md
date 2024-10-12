---
id: two-sum
title: Two-Sum
sidebar_label: two-sum
sidebar_position: 5
tags: [Two-sum]
description: The Two-Sum problem on LeetCode is a common algorithmic challenge that asks you to find two numbers in an array that add up to a specific target number
---

# Two-Sum Problem

## Problem Statement
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example:
- **Input**: `nums = [2, 7, 11, 15]`, `target = 9`
- **Output**: `[0, 1]`
- **Explanation**: Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

## Constraints:
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists.

## Solutions

### Brute Force Approach:
Check every pair of numbers to see if they add up to the target.

```java

class Solution {
    //Time: $O(n)$
    //Space: $O(n)$
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i=0; i<nums.length; i++) {
            int cur = nums[i];
            //cur + x = target
            //x = target - current
            int x = target - cur;
            if (map.containsKey(x)) {
                return new int[] { map.get(x), i };
            }
            map.put(cur, i);
            System.out.println();
        }
        return null;
    }
    public static void main(String args[]) {
        int nums[] = {2, 7, 11, 15};
        int target = 9;
    }

}

```

