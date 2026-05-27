---
id: monotonic-array
title: Monotonic Array Algorithm
sidebar_label: Monotonic Array
description: "An optimized O(N) single-pass solution to check if an array is monotonic."
tags: [array, java, dsa, algorithms]
---

# Monotonic Array

An array is considered **monotonic** if it is either entirely non-increasing (monotonic decreasing) or entirely non-decreasing (monotonic increasing). 

## Characteristics
- **Time Complexity:** $O(N)$, where $N$ is the length of the array. We only need to traverse the array once.
- **Space Complexity:** $O(1)$, as we are only using two boolean flags for evaluation without any extra auxiliary data structures.

## Java Implementation

Instead of looping through the array twice, this approach assumes the array is both increasing and decreasing at the start. As we iterate through the array in a single pass, we invalidate these flags if we find a violation. 

```java
public class MonotonicArray {

    /**
     * Checks if the given array is monotonic.
     * @param nums the array of integers.
     * @return true if the array is monotonic, false otherwise
     */
    public static boolean isMonotonic(int[] nums) {
        // Defensive check to prevent NullPointerException
        if (nums == null || nums.length <= 1) {
            return true;
        }

        boolean isIncreasing = true;
        boolean isDecreasing = true;

        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                isIncreasing = false;
            }
            if (nums[i] < nums[i + 1]) {
                isDecreasing = false;
            }
            
            // Optimization: If it breaks both properties, terminate early
            if (!isIncreasing && !isDecreasing) {
                return false;
            }
        }

        return isIncreasing || isDecreasing;
    }
}
```
