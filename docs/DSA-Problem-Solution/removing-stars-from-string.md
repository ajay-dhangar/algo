---
id: removing-stars-from-string
sidebar_position: 1
title: Removing Stars From a String
sidebar_label: Removing Stars From a String
description: "This document explains the Removing Stars From a String problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Removing Stars From a String

## Description

You are given a string `s`, which contains stars `*`.

In one operation, you can:
- Choose a star in `s`.
- Remove the closest non-star character to its left, as well as remove the star itself.

Return the string after all stars have been removed.

### Note:
- The input will be generated such that the operation is always possible.
- It can be shown that the resulting string will always be unique.

## Approach

To solve this problem, we can use a **stack** to keep track of the non-star characters. We iterate through the string, and for each character:
1. If it is a non-star character, push it onto the stack.
2. If it is a star (`*`), pop the top element from the stack (i.e., remove the closest non-star character).

Finally, the remaining elements in the stack represent the string after all stars and corresponding characters have been removed.

## Python Implementation

```python
class Solution:
    def removeStars(self, s: str) -> str:
        stack = []
        
        for char in s:
            if char == '*':
                if stack:
                    stack.pop()  # Remove the closest non-star character
            else:
                stack.append(char)  # Add non-star characters to the stack
        
        return ''.join(stack)
```
Time Complexity: O(n) <br />
Space Complexity: O(n)