---
id: search-insert-position
sidebar_position: 4
title: Search Insert Position
sidebar_label: Search Insert Position
description: "This document explains the Search Insert Position problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# Search Insert Position

## Description
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

### Example:
**Input**: `nums = [1,3,5,6], target = 5`  
**Output**: `2`

**Input**: `nums = [1,3,5,6], target = 2`  
**Output**: `1`

**Input**: `nums = [1,3,5,6], target = 7`  
**Output**: `4`

## Approach
The problem requires O(log n) runtime complexity, which suggests that a **binary search** is the optimal solution.

Steps:
1. **Binary Search**: We divide the array in halves, and search the target in the appropriate half based on the value comparison.
2. If the target is found, return the index.
3. If the target is not found, return the index where it would fit in a sorted order.

### Binary Search Explanation:
- Start with two pointers: `low = 0` and `high = size of the array - 1`.
- Calculate the middle index: `mid = low + (high - low) / 2`.
- Compare `nums[mid]` with `target`:
  - If `nums[mid] == target`, return `mid`.
  - If `nums[mid] > target`, search the left half by updating `high = mid - 1`.
  - If `nums[mid] < target`, search the right half by updating `low = mid + 1`.
- If the loop ends without finding the target, `low` will be the correct insertion position.

## C++ Implementation

```cpp
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            // Check if the mid is the target
            if (nums[mid] == target) {
                return mid;
            }
            // Target is smaller, search left half
            else if (nums[mid] > target) {
                high = mid - 1;
            }
            // Target is larger, search right half
            else {
                low = mid + 1;
            }
        }
        
        // If not found, return the position where it would be inserted
        return low;
    }
};
```
### Time Complexity
**O(log n): We are dividing the array in half at each step, so the time complexity is logarithmic.**
### Space Complexity
**O(1): The space complexity is constant because no extra space is used apart from a few variables.**