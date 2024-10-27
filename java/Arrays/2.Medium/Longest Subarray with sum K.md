---
id: <longest-subarray-sum-k>
title: <Find Longest Subarray with Sum k>
sidebar_label: <Longest Subarray with Sum k>
sidebar_position: <1>
description: <Find the length of the longest subarray whose sum equals k.>
tags: [<Array>, <Hashing>, <DSA>]
---

# Problem Statement
Given an array `a[]` and an integer `k`, find the length of the longest subarray that sums to `k`.

[LeetCode Problem Link](https://leetcode.com/problems/subarray-sum-equals-k/)

## Examples

**Example 1**:  
Input:  
`N = 3, k = 5, array[] = {2, 3, 5}`

Output:  
`2`

Explanation:  
The longest subarray with sum `5` is `{2, 3}`. Its length is `2`.

---

**Example 2**:  
Input:  
`N = 3, k = 1, array[] = {-1, 1, 1}`

Output:  
`3`

Explanation:  
The longest subarray with sum `1` is `{-1, 1, 1}`. Its length is `3`.

---

## Intuition
To solve this problem optimally, we can use the concept of **prefix sum** combined with **hashing**.

### Key Idea:
- Maintain a map to store the prefix sum and its corresponding index.
- As we iterate through the array, calculate the prefix sum up to each index.
- Check if the prefix sum equals `k`. If yes, update the maximum subarray length.
- Also, check if there is a prefix sum equal to `sum - k` (the remaining sum required to get `k` from the current subarray). If such a sum exists, calculate the length of the subarray and update the maximum length accordingly.
- Store the prefix sum and its earliest occurrence in the map to maximize the subarray length.

---

## Approach
1. Declare a HashMap `preSumMap` to store prefix sums and their corresponding indices.
2. Initialize variables `sum = 0` (to store the running prefix sum) and `maxLen = 0` (to store the length of the longest subarray with sum `k`).
3. Iterate through the array. For each element:
    - Add the current element to `sum` (prefix sum up to that index).
    - If the sum is equal to `k`, update `maxLen` to `i + 1` (the length from the start).
    - Check if `sum - k` exists in the map. If yes, update `maxLen` with the length of the subarray `i - preSumMap[sum - k]`.
    - Add the current `sum` to the map if it doesn't already exist (to store the earliest occurrence of the prefix sum).
4. Return `maxLen`, which stores the length of the longest subarray with sum `k`.

---

## Java Implementation

```java
import java.util.*;

public class tUf {
    public static int getLongestSubarray(int[] a, int k) {
        int n = a.length; // size of the array.
        Map<Integer, Integer> preSumMap = new HashMap<>();
        int sum = 0;
        int maxLen = 0;

        for (int i = 0; i < n; i++) {
            // calculate the prefix sum till index i:
            sum += a[i];

            // if the sum = k, update the maxLen:
            if (sum == k) {
                maxLen = Math.max(maxLen, i + 1);
            }

            // calculate the sum of remaining part i.e. x-k:
            int rem = sum - k;

            // calculate the length and update maxLen:
            if (preSumMap.containsKey(rem)) {
                int len = i - preSumMap.get(rem);
                maxLen = Math.max(maxLen, len);
            }

            // finally, update the map checking the conditions:
            if (!preSumMap.containsKey(sum)) {
                preSumMap.put(sum, i);
            }
        }

        return maxLen;
    }

    public static void main(String[] args) {
        int[] a = {-1, 1, 1};
        int k = 1;
        int len = getLongestSubarray(a, k);
        System.out.println("The length of the longest subarray is: " + len);
    }
}

```

---
## Time Complexity
**Time Complexity**: `O(N)`, where N is the number of elements in the array. We process each element only once.

**Space Complexity**: `O(N)`, as we are using a HashMap to store the prefix sums.

---
## Conclusion
Using a hash map to store prefix sums allows us to efficiently find the longest subarray with sum k in linear time.