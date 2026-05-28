---
id: wiggle-sort
title: Wiggle Sort Algorithm
sidebar_label: Wiggle Sort
description: "An optimized O(N) single-pass algorithm to sort an array into a wave-like pattern."
tags: [array, java, dsa, algorithms, sorting]
---

# Wiggle Sort

Wiggle Sort is an algorithm that reorders an array such that the elements alternate between being smaller and larger than their adjacent elements. The final array satisfies the condition: `arr[0] <= arr[1] >= arr[2] <= arr[3]...`

## Characteristics
- **Time Complexity:** $O(N)$. The array is traversed exactly once, swapping adjacent elements if they violate the wiggle condition.
- **Space Complexity:** $O(1)$, as the sorting is done entirely in-place.

## Java Implementation

```java
public class WiggleSort {

    /**
     * Sorts the array in-place into a wiggle pattern.
     * @param nums the array of integers to be wiggle sorted.
     */
    public static void sort(int[] nums) {
        // Defensive check to prevent NullPointerException
        if (nums == null || nums.length <= 1) {
            return; 
        }

        for (int i = 0; i < nums.length - 1; i++) {
            // If index is even, current element should be <= next element
            // If index is odd, current element should be >= next element
            if (((i % 2 == 0) && nums[i] > nums[i + 1]) || 
                ((i % 2 == 1) && nums[i] < nums[i + 1])) {
                swap(nums, i, i + 1);
            }
        }
    }

    private static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```
