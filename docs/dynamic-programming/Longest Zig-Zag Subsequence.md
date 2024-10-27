---
id: Longest Zig-Zag-Subsequence
title: Longest Zig-Zag Subsequence - Dynamic Programming
sidebar_label: Longest Zig-Zag Subsequence
description: "In this post, we'll explore the Longest Zig-Zag-Subsequence problem, aims to find the longest subsequence where elements alternate between increasing and decreasing. In a subsequence:
- A 'zig' occurs when a number is greater than the previous one.
- A 'zag' occurs when a number is smaller than the previous one.
 Since a brute-force solution would involve examining all subsequences, which can be exponential in time complexity, a dynamic programming approach is more efficient."
tags: [dsa, dynammic programming]
---
# Longest Zig-Zag-Subsequence

## Introduction
The **Longest Zig-Zag-Subsequence** problem is an extension of longest increasing subsequence problem, but requires more thinking for finding optimal substructure property in this.
We will solve this problem by dynamic Programming method.

## Problem Statement
Given an array nums of n positive integers. The task is to find the longest Zig-Zag subsequence problem such that all elements of this are alternating (numsi-1 < numsi > numsi+1 or numsi-1 > numsi < numsi+1).

The input consist of array where nums = {a,b,c}.

## Objective
- The objective of the longest zigzag subsequence problem is to find the longest subsequence within a given sequence of numbers that alternates between increasing and decreasing.
 
### Example
You are given an integer array arr of length n. A zigzag subsequence is a subsequence where the difference between consecutive elements alternates between positive and negative. Your task is to find the length of the longest zigzag subsequence in arr.

## Input
An integer array arr of length n (1 ≤ n ≤ 1000)
Each element in arr is an integer (1 ≤ arr[i] ≤ 10,000)

## Output
A single integer representing the length of the longest zigzag subsequence.

## Constraints
1 ≤ n ≤ 1000 — This allows an 𝑂(𝑛^2) dynamic programming solution to run efficiently within time limits.
1 ≤ arr[i] ≤ 10,000 — Positive integers allow straightforward comparisons.

## Approach
1. Initialize two arrays, up and down, with 1s (each element itself is a subsequence of length 1).
2. For each element at index i, check all previous elements at index j:
If arr[i] > arr[j], update up[i] = max(up[i], down[j] + 1).
If arr[i] < arr[j], update down[i] = max(down[i], up[j] + 1).
3. The final answer is the maximum value in up and down arrays.

## Solution
To solve this, we use dynamic programming. We maintain two arrays, up and down:

- up[i]: Stores the length of the longest zigzag subsequence ending at index i where the last element forms an "up" (increase).
- down[i]: Stores the length of the longest zigzag subsequence ending at index i where the last element forms a "down" (decrease).

## Code Implementation in C++

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int longestZigzagSubsequence(const vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return 0;

    // Initialize DP arrays
    vector<int> up(n, 1);   // up[i] means longest zigzag ending with an "up" at i
    vector<int> down(n, 1); // down[i] means longest zigzag ending with a "down" at i

    // Build the up and down arrays
    for (int i = 1; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (arr[i] > arr[j]) {
                up[i] = max(up[i], down[j] + 1);
            } else if (arr[i] < arr[j]) {
                down[i] = max(down[i], up[j] + 1);
            }
        }
    }

    // Find the maximum value in both arrays
    int maxLength = max(*max_element(up.begin(), up.end()), *max_element(down.begin(), down.end()));
    return maxLength;
}

int main() {
    vector<int> arr = {1, 7, 4, 9, 2, 5};
    cout << "Length of the longest zigzag subsequence: " << longestZigzagSubsequence(arr) << endl;
    return 0;
}
```

## Explanation of Code
We iterate over each i and, for each i, check every j (where j < i).

up[i] is updated when arr[i] > arr[j], meaning we’re continuing a zigzag sequence with an increase.

down[i] is updated when arr[i] < arr[j], continuing a zigzag sequence with a decrease.

Finally, max(max(up), max(down)) gives the length of the longest zigzag subsequence.

## Complexity Analysis
- **Time Complexity:** 
𝑂(𝑛^2) due to the nested loops over i and j.

- **Space Complexity:** 
𝑂(𝑛) for storing the up and down arrays.

## Conclusion
The Longest Zigzag Subsequence problem is a classic example of a dynamic programming problem. It requires us to identify the longest subsequence in which elements alternate between increasing and decreasing. By leveraging two dynamic programming arrays, up and down, we efficiently track the length of valid zigzag patterns as we progress through the array.
