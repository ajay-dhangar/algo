---
id: two-sum
sidebar_position: 2
title: Two Sum
sidebar_label: Two Sum
description: "This document explains the Two Sum problem, including its description, algorithm, and implementation."
tags: [leetcode, problem-solving, arrays, leetcode-easy]
---

# Two Sum

## Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.<br/>
You may assume that each input would have **exactly one solution**, and you may not use the same element twice.<br/>
Answer can be returned in any order.

- **Example 1**:
  - Input: `nums` = [2, 7, 11, 15] , `target` = 9
  - Output: [0, 1]
  - Explanation: As `nums[0]` + `nums[1]` = 9, we return these indices.

- **Example 2**:
  - Input: `nums` = [3, 2, 4] , `target` = 6
  - Output: [1, 2]
  - Explanation: As `nums[1]` + `nums[2]` = 6, we return these indices.

- **Example 3**:
  - Input: `nums` = [3, 3] , `target` = 6
  - Output: [0, 1]
  - Explanation: As `nums[0]` + `nums[1]` = 6, we return these indices.

## Constraints
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- `Only one valid answer exists`

## Algorithm

1. **Initialise a map or a dictionary**: Initialise a map (or a dictionary, depending on the language) to store each number from the arrays as a key and its index as the value.
2. **Iterate through the array**: Run a `for` loop to iterate through the array.
3. **Calculate the difference**: For current element, calculate the difference between target and current number -> `diff = target - num`
4. **Check if `diff` exists in the map**: Check if `diff` already exists as a key in the map.
5. - If **yes**, return the pair of indices -> index of `diff` from the map and the current index.
   - If **no**, continue to the next step.
6. **Store the current number in the map**: Add current number `num` to the map, with the current index as its value to enable checks remaining iterations.
7. **Return a default value if no solution is found**: If the loop reaches the end of the array without finding the two numbers, return `{-1, -1}`. This indicates that no valid pair was found.

## Java Implementation
```java

class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>(); // initialising a map
    for(int i = 0; i < nums.length; i++) {
      int diff = target - nums[i]; //calculating the difference
      if(map.containsKey(diff)) { //check if diff exists in the map
        return new int[] {map.get(diff), i}; //returns the pair of indices
      }
      map.put(nums[i], i); //adds current num into the map with current index as value
    }
    return new int[]{-1, -1}; //returns default value if no pair is found
  }
}

```
Time Complexity: `O(n)` -> One entire pass through the array is made.<br />
Space Complexity: `O(1)` -> The HashMap will store `n` key-value pairs in the worst case, where `n` is the input array length.
