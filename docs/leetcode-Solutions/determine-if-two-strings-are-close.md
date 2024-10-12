---
id: determine-if-two-strings-are-close
sidebar_position: 2
title: Determine if Two Strings Are Close
sidebar_label: Determine if Two Strings Are Close
description: "This document explains the Close Strings problem, including its description, approach, and implementation."
tags: [leetcode, algorithms, problem-solving]
---

# determine-if-two-strings-are-close

## Description
Two strings are considered **close** if you can attain one from the other using the following operations:

- **Operation 1**: Swap any two existing characters.  
  For example, `abcde` can be transformed into `aecdb`.

- **Operation 2**: Transform every occurrence of one existing character into another existing character, and do the same with the other character.  
  For example, `aacabb` can be transformed into `bbcbaa` (all `a`s turn into `b`s, and all `b`s turn into `a`s).

Given two strings, `word1` and `word2`, the goal is to return **true** if `word1` and `word2` are close, and **false** otherwise.

## Approach
To determine if the two strings are close, we can follow these steps:

1. **Length Check**: If the lengths of `word1` and `word2` are not equal, return `False`.
2. **Character Frequency Count**: Use `Counter` from the `collections` module to count the frequency of each character in both strings.
3. **Character Set Comparison**: Check if the sets of keys (characters) in both frequency counts are the same. If not, return `False`.
4. **Frequency Comparison**: Sort the values of the frequency counts and check if they are the same. If not, return `False`.
5. If both checks pass, return `True`.

## Python Implementation
```python
from collections import Counter

class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        if len(word1) != len(word2):  # Step 1: Length check
            return False
        
        f = Counter(word1)  # Count character frequencies in word1
        g = Counter(word2)  # Count character frequencies in word2
        
        if set(f.keys()) != set(g.keys()):  # Step 3: Character set comparison
            return False
        
        if sorted(f.values()) != sorted(g.values()):  # Step 4: Frequency comparison
            return False
        
        return True 
```
Time Complexity: O(n) <br />
Space Complexity: O(1)       
