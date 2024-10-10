---
id: hashmap-problems
title: HashMap Practice Problems
sidebar_label: HashMap Problems
sidebar_position: 4
description: "A set of practice problems designed to enhance your understanding of HashMap data structures. Solve these to strengthen your skills in handling key-value pairs efficiently."
tags: [dsa, data-structures, HashMap, problems]
---

# HashMap Practice Problems

## Problem 1: Frequency Count of Elements
**Description**:  
Given an array of integers, find the frequency of each element.

### Example:
Input:  
`[4, 5, 4, 6, 5, 5]`

Output:  
`{4: 2, 5: 3, 6: 1}`

### Solution Steps:
1. Initialize an empty HashMap.
2. Traverse the array and for each element:
   - If it is already present in the HashMap, increment its count.
   - Otherwise, insert it with a count of 1.

---

## Problem 2: Find First Non-Repeating Character
**Description**:  
Given a string, find the first non-repeating character.

### Example:
Input:  
`"swiss"`

Output:  
`"w"`

### Solution Steps:
1. Use a HashMap to store the frequency of each character in the string.
2. Traverse the string again to find the first character with frequency 1.

---

## Problem 3: Group Anagrams
**Description**:  
Given an array of strings, group the anagrams together.

### Example:
Input:  
`["eat", "tea", "tan", "ate", "nat", "bat"]`

Output:  
`[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`

### Solution Steps:
1. Use a HashMap to store sorted versions of each string as keys and lists of anagrams as values.
2. Traverse through the array of strings and sort each string, then group them accordingly.

---

## Problem 4: Two Sum
**Description**:  
Given an array of integers and a target value, return indices of the two numbers such that they add up to the target.

### Example:
Input:  
`nums = [2, 7, 11, 15], target = 9`

Output:  
`[0, 1]`

### Solution Steps:
1. Use a HashMap to store the complement of each element with respect to the target as keys, and the indices of elements as values.
2. For each element, check if its complement exists in the HashMap.

---

## Problem 5: Subarray Sum Equals K
**Description**:  
Given an array of integers and an integer `k`, find the total number of continuous subarrays whose sum equals to `k`.

### Example:
Input:  
`nums = [1, 1, 1], k = 2`

Output:  
`2`

### Solution Steps:
1. Use a HashMap to store the cumulative sum and its frequency.
2. For each element, calculate the cumulative sum and check if the difference between the current sum and `k` exists in the HashMap.

---

## Problem 6: Longest Consecutive Sequence
**Description**:  
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

### Example:
Input:  
`[100, 4, 200, 1, 3, 2]`

Output:  
`4` (The longest consecutive sequence is `[1, 2, 3, 4]`)

### Solution Steps:
1. Use a HashMap to store each number and check for the existence of its consecutive numbers.
2. Use the map to identify the longest sequence by checking both forward and backward neighbors.

---

## Problem 7: Intersection of Two Arrays
**Description**:  
Given two arrays, write a function to compute their intersection.

### Example:
Input:  
`nums1 = [1, 2, 2, 1], nums2 = [2, 2]`

Output:  
`[2]`

### Solution Steps:
1. Use a HashMap to store the frequency of elements in one array.
2. Traverse the second array and check if the element exists in the map and still has a non-zero count.

---

## Problem 8: Isomorphic Strings
**Description**:  
Given two strings, determine if they are isomorphic. Two strings are isomorphic if the characters in one string can be replaced to get the other string.

### Example:
Input:  
`s = "egg", t = "add"`

Output:  
`true`

### Solution Steps:
1. Use two HashMaps to store the mapping between characters of `s` to `t` and vice versa.
2. Traverse both strings simultaneously and verify the mapping consistency.

---

## Problem 9: Find the Difference
**Description**:  
You are given two strings `s` and `t` which are anagrams of each other except for one extra letter in `t`. Find the extra letter.

### Example:
Input:  
`s = "abcd", t = "abcde"`

Output:  
`"e"`

### Solution Steps:
1. Use a HashMap to store the frequency of characters in `s`.
2. Traverse `t` and check for the extra character.

---

## Problem 10: Word Pattern
**Description**:  
Given a pattern and a string `s`, find if `s` follows the same pattern.

### Example:
Input:  
`pattern = "abba", s = "dog cat cat dog"`

Output:  
`true`

### Solution Steps:
1. Use a HashMap to map characters in the pattern to words in the string.
2. Check for both forward and reverse mappings to ensure a consistent relationship.

---

## Problem 11: Number of Good Pairs
**Description**:  
Given an array of integers, find the number of good pairs. A pair `(i, j)` is called good if `nums[i] == nums[j]` and `i < j`.

### Example:
Input:  
`nums = [1, 2, 3, 1, 1, 3]`

Output:  
`4`

### Solution Steps:
1. Use a HashMap to count occurrences of each number.
2. For each number, the number of good pairs is the count of that number in the map before the current index.

---

## Conclusion
These problems cover a variety of topics and operations commonly associated with HashMap data structures. Working through them will improve your understanding of how to use HashMaps effectively to solve algorithmic problems efficiently.
