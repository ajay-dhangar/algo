---
id: longest-substring-without-repeated-characters-problem
sidebar_position: 4
title: Longest Substring Without Repeating Characters
sidebar_label: Longest Substring Without Repeating Characters
description: "This document explains the 'Longest Substring Without Repeating Characters' problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Longest Substring Without Repeating Characters

## Problem Statement
Given a string, find the length of the longest substring without repeating characters.

## Approach
We can use the `sliding window technique` along with a `hash map` to track the characters and their indices.

### Steps:

1. **Initialize**:  
   - Create a hash map to store the last seen index of each character.
   - Initialize two pointers, `start` and `end`, to the beginning of the string.


2. **Iterate**:  
   - For each character, check if it has been seen and is in the current window.
   - Update the `start` pointer if necessary.
   - Update the `end`.

3. **Return**:  
   - Return the maximum length found.

## Python Implementation

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        max_length = 0
        start = 0

        for i, char in enumerate(s):
            if char in char_index and char_index[char] >= start:
                start = char_index[char] + 1
            char_index[char] = i
            max_length = max(max_length, i - start + 1)

        return max_length

```
Time Complexity: O(n) <br /> 
Space Complexity: O(min(n, m)) (where m is the size of the character set)

    