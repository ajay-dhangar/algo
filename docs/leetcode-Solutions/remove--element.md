---
id: remove-element
sidebar_position: 5
title: Remove Element
sidebar_label: Remove Element
description: "This document explains the Remove Element problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# Remove Element

## Description
Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` **in-place**. The relative order of the elements may be changed.

Since it is impossible to change the length of the array in some languages, you must instead have the result placed in the first part of the array. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` after placing the final result in the first `k` slots of `nums`.

Do not allocate extra space for another array. You must do this by modifying the input array **in-place** with O(1) extra memory.

### Example:
**Input**: `nums = [3,2,2,3], val = 3`  
**Output**: `2, nums = [2,2,_]`  
**Explanation**: The first two elements of `nums` are `2`. It does not matter what is left beyond the returned length.

**Input**: `nums = [0,1,2,2,3,0,4,2], val = 2`  
**Output**: `5, nums = [0,1,4,0,3,_,_,_]`  
**Explanation**: The first five elements of `nums` are `0`, `1`, `4`, `0`, and `3`. It does not matter what is left beyond the returned length.

## Approach
The goal is to remove all occurrences of `val` from `nums` in place. We can achieve this by using a two-pointer approach:

1. **Two Pointers**: One pointer (`i`) iterates through the array, and the other pointer (`k`) keeps track of the position where the next valid element (not equal to `val`) should be placed.
2. For each element in the array:
    - If `nums[i]` is not equal to `val`, assign it to `nums[k]` and increment `k`.
3. Finally, return `k`, which represents the length of the modified array with all occurrences of `val` removed.

## C++ Implementation

```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;  // Counter for the new length
        
        // Loop through the array
        for (int i = 0; i < nums.size(); i++) {
            // If the current element is not equal to val, move it to the position k
            if (nums[i] != val) {
                nums[k] = nums[i];
                k++;  // Increment the counter
            }
        }
        
        return k;  // Return the new length of the array
    }
};
```
### Time Complexity
**O(n): We traverse the array once, so the time complexity is linear in terms of the array size n.**
### Space Complexity
**O(1): The solution uses constant space, as we are modifying the input array in place.**