---
id: <remove-duplicates-sorted-array>
title: <Remove Duplicates in-place from Sorted Array>
sidebar_label: <Remove Duplicates in-place>
sidebar_position: <1>
description: <Given a sorted array, remove the duplicates in-place and return the new length.>
tags: [<Array>, <In-place>, <DSA>]
---

# Remove Duplicates in-place from Sorted Array

## Problem Statement
Given a sorted array `arr`, remove duplicates in-place such that each element appears only once and return the new length. The solution should modify the input array in-place and not use extra space.

[LeetCode Problem Link](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/)

---

## Examples

**Example 1**:  
Input:  
`arr = [1, 1, 2, 2, 2, 3, 3]`

Output:  
`arr = [1, 2, 3, _, _, _, _]`

Explanation:  
The unique elements are `[1, 2, 3]`, so the function returns `3` and places `[1, 2, 3]` at the start of the array.

---

**Example 2**:  
Input:  
`arr = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4]`

Output:  
`arr = [1, 2, 3, 4, _, _, _, _, _, _, _]`

Explanation:  
The unique elements are `[1, 2, 3, 4]`, so the function returns `4` and places `[1, 2, 3, 4]` at the start of the array.

---

## Approach
The problem can be solved using the two-pointer technique:

1. Maintain two pointers, `i` and `j`, where `i` tracks the position of unique elements and `j` iterates over the array.
2. If the element at index `j` is different from the element at index `i`, increment `i` and set `arr[i] = arr[j]`.
3. The new length of the array will be `i + 1`.

### Steps:
- Initialize `i = 0` to track the first unique element.
- Traverse the array from `j = 1` to the end.
- If `arr[j]` is different from `arr[i]`, update `arr[i + 1]` with `arr[j]` and increment `i`.
- After the loop, the first `i + 1` elements of the array will be unique.

---

## Java Implementation

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        int arr[] = {1, 1, 2, 2, 2, 3, 3};
        int k = removeDuplicates(arr);
        System.out.println("The array after removing duplicate elements is ");
        for (int i = 0; i < k; i++) {
            System.out.print(arr[i] + " ");
        }
    }

    static int removeDuplicates(int[] arr) {
        int i = 0;
        for (int j = 1; j < arr.length; j++) {
            if (arr[i] != arr[j]) {
                i++;
                arr[i] = arr[j];
            }
        }
        return i + 1;
    }
}
```

---
## Time Complexity
**Time Complexity**: `O(n)`, where n is the length of the input array. We are using a single loop to traverse the array.

**Space Complexity**: `O(1)`, since we are modifying the array in-place without using any extra space.

---
## Conclusion
This solution efficiently removes duplicates from a sorted array in-place using the two-pointer technique. It has a time complexity of `O(n)` and does not require extra space, making it optimal for large inputs.