---
id: manachers-algorithm
title: Manacher's Algorithm
sidebar_label: Manacher's Algorithm
sidebar_position: 4
description: A linear time algorithm to find the longest palindromic substring in a string.
tags: [string, algorithm, palindrome, linear-time]
---

# Manacher's Algorithm

Manacher's Algorithm is a clever algorithm designed to find the longest palindromic substring in a given string in strict `O(N)` linear time.

## Intuition
The naive approach expands around every character as a center, taking `O(N^2)` time. Manacher's algorithm utilizes the symmetrical properties of palindromes to skip redundant calculations. By keeping track of the boundaries of the rightmost verified palindrome, it can determine the length of palindromes around subsequent centers without full recomputation.

## Implementation Trick
To gracefully handle both even and odd length palindromes, the standard trick is to insert a special delimiter character (e.g., `#`) between every character in the original string, plus special boundary markers at the start and end to prevent bounds checking overhead.

## Complexity Analysis
- **Time Complexity:** `O(N)` as the right boundary only ever moves to the right.
- **Space Complexity:** `O(N)` to store the array of palindrome radii.
