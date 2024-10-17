---
id: longest-consecutive-sequence
sidebar_position: 4
title: Longest Consecutive Sequence
sidebar_label: Longest Consecutive Sequence
description: "This document explains the Longest Consecutive Sequence problem, including its description, approach, and implementation in Java."
tags: [leetcode, algorithms, problem-solving]
---

# Longest Consecutive Sequence

## Description

Given an unsorted array of integers, the task is to find the length of the longest consecutive element sequence. The solution must run in **O(n)** time complexity.

### Example:

**Input**:  
`nums = [100, 4, 200, 1, 3, 2]`

**Output**:  
`4`

**Explanation**: The longest consecutive sequence is `[1, 2, 3, 4]`, and its length is `4`.

## Approach

The solution uses a **HashSet-based approach** to ensure an efficient `O(n)` time complexity. Here's the strategy:

1. **Insert all elements into a HashSet**: This allows for constant-time lookups, which is critical for checking if consecutive numbers exist.
2. **Iterate through the set**:
    - For each element, check if it is the start of a new sequence. A number is considered the start if the number immediately smaller (i.e., `num - 1`) is not in the set.
    - Count the sequence length by checking consecutive numbers (`num + 1`, `num + 2`, etc.).
3. **Update the longest sequence**: During the iteration, update the longest sequence found.

## Java Implementation

```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;

        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        int longest = 0;

        for (int num : set) {
            // Only consider the start of sequences
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int count = 1;

                // Continue checking for consecutive numbers
                while (set.contains(currentNum + 1)) {
                    currentNum++;
                    count++;
                }

                longest = Math.max(longest, count);
            }
        }

        return longest;
    }
}

```
Time Complexity: O(n). This is because each element is inserted and checked once.<br/>
Space Complexity: O(n). The HashSet uses extra space.
