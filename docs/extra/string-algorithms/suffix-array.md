---
id: suffix-array
title: Suffix Array
sidebar_label: Suffix Array
sidebar_position: 3
description: A sorted array of all suffixes of a string, extremely useful for fast string queries.
tags: [string, algorithm, data-structure, advanced]
---

# Suffix Array

A Suffix Array is a sorted array of all suffixes of a given string. It is a space-efficient alternative to a suffix tree.

## Intuition
For a string `S` of length `N`, the `i`-th element of the suffix array contains the starting index of the `i`-th smallest suffix in lexicographical order.
Suffix arrays can solve many complex string problems efficiently, such as finding the longest repeated substring, finding the longest common substring of two strings, and counting the number of occurrences of a pattern.

## Complexity
- **Construction Time:** Naive `O(N^2 log N)`. Advanced algorithms like DC3 or Prefix Doubling achieve `O(N)` or `O(N log N)`.
- **Space Complexity:** `O(N)` since we only store `N` integers.

## Typical Use Cases
- Pattern matching in `O(P \log N)` time.
- Used in conjunction with the Longest Common Prefix (LCP) array for more complex text analysis.
