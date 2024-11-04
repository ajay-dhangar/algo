---
id: kadanes-algorithm>
title: Kadane's Algorithm- Maximum Subarray Sum
sidebar_label: Maximum Subarray Sum
sidebar_position: 1
description: Find the maximum sum of a contiguous subarray in an integer array.
tags: [Array, Dynamic Programming, Greedy, DSA]
---

# Kadane's Algorithm: Maximum Subarray Sum

## Problem Statement
Given an integer array `arr`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

[LeetCode Problem Link](https://leetcode.com/problems/maximum-subarray/description/)

## Examples

**Example 1**:  
Input:  
`arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`

Output:  
`6`

Explanation:  
The subarray `[4, -1, 2, 1]` has the largest sum = 6.

---

**Example 2**:  
Input:  
`arr = [1]`

Output:  
`1`

Explanation:  
Array has only one element, which gives a positive sum of 1.

---

## Intuition
The intuition behind **Kadane's Algorithm** is simple: a subarray with a negative sum will always reduce the sum of the total subarray, so it's better to discard such subarrays and reset the sum to 0 whenever the sum goes below 0.

### Key Idea
- Iterate through the array and add elements to a running sum.
- If the sum becomes negative at any point, reset it to zero since no subarray with a negative sum is worth considering.
- Track the maximum sum encountered during the iteration.

## Approach
1. Initialize two variables: `maxi` to store the maximum sum and `sum` to store the current subarray sum.
2. Iterate through the array:
   - Add the current element to `sum`.
   - If `sum` exceeds `maxi`, update `maxi`.
   - If `sum` becomes negative, reset it to `0`.
3. Return `maxi` as the result.

### Edge Case
In some scenarios, the question may mention that the sum of an empty subarray should be considered. In that case, compare `maxi` with `0` before returning the result, and ensure you return the larger value.

## Java Implementation

```java
import java.util.*;

public class Main {
    public static long maxSubarraySum(int[] arr, int n) {
        long maxi = Long.MIN_VALUE; // maximum sum
        long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];
            if (sum > maxi) {
                maxi = sum;
            }
            // If sum < 0: discard the sum calculated
            if (sum < 0) {
                sum = 0;
            }
        }

        return maxi;
    }

    public static void main(String args[]) {
        int[] arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4};
        int n = arr.length;
        long maxSum = maxSubarraySum(arr, n);
        System.out.println("The maximum subarray sum is: " + maxSum);
    }
}

```

---
## Time Complexity
The **Time complexity** of Kadane's Algorithm is `O(n)`, where n is the number of elements in the array. This is because we make a single pass through the array to calculate the maximum subarray sum.

**Space Complexity**: `O(1)` as we are not using any extra space.

---
## Conclusion
Kadane's Algorithm efficiently finds the maximum subarray sum in linear time, making it a powerful technique for solving problems related to contiguous subarrays. The algorithm's simplicity and effectiveness make it a staple in competitive programming and interviews.