---
id: binary-search-rotated-sorted-array
sidebar_position: 5
title: Binary Search Rotated sort array
sidebar_label: Binary Search
description: "In this blog post, we'll dive into the rotated array approach with binary search algorithm, a fundamental technique in computer science for efficiently finding an element in a sorted array."
tags: [dsa, algorithms, binary search]
---


# Binary Search in Rotated Sorted Array

## Problem Description

Given a sorted array that has been rotated at some pivot point, implement a function to find a target element in the array. The function should return the index of the target element if found, or -1 if not found.

A rotated sorted array is an array that was originally sorted in ascending order but has been rotated around a pivot point. For example:
- Original sorted array: `[1, 2, 3, 4, 5, 6, 7]`
- After rotation at index 3: `[4, 5, 6, 7, 1, 2, 3]`

## Time Complexity
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

## Algorithm Overview

The algorithm uses a modified binary search approach that takes into account the rotation of the array. The key insight is that at least one half of the array (either left or right) will always be sorted.

### Key Steps:

1. Initialize two pointers:
   - `left` pointing to the start of array (index 0)
   - `right` pointing to the end of array (index n-1)

2. While `left <= right`:
   - Calculate middle point: `mid = (left + right) / 2`
   - If target is found at mid, return mid

3. Check which half of the array is sorted:
   - If left half is sorted (`arr[left] <= arr[mid]`):
     - Check if target lies in the left half
     - If yes, search left half
     - If no, search right half
   - If right half is sorted:
     - Check if target lies in the right half
     - If yes, search right half
     - If no, search left half

4. If element is not found, return -1

## Implementation

```python
def search(nums: list[int], target: int) -> int:
    if not nums:
        return -1
        
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Found target
        if nums[mid] == target:
            return mid
            
        # Check if left half is sorted
        if nums[left] <= nums[mid]:
            # Check if target is in left half
            if nums[left] <= target <= nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            # Check if target is in right half
            if nums[mid] <= target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1
```

## Example Usage

```python
# Example 1: Regular case
arr = [4, 5, 6, 7, 0, 1, 2]
target = 0
result = search(arr, target)  # Returns 4

# Example 2: Target not found
arr = [4, 5, 6, 7, 0, 1, 2]
target = 3
result = search(arr, target)  # Returns -1

# Example 3: Array with single element
arr = [1]
target = 1
result = search(arr, target)  # Returns 0
```

## Edge Cases to Consider

1. Empty array
2. Array with single element
3. Target not present in array
4. Duplicate elements (not handled in basic implementation)
5. Array not rotated (regular sorted array)
6. Array rotated n times (back to original position)
7. Target at the first or last position

## Common Pitfalls

1. **Not Handling Empty Arrays**: Always check if the input array is empty before processing.
2. **Integer Overflow**: When calculating mid point, use `left + (right - left) // 2` instead of `(left + right) // 2` to prevent integer overflow in some languages.
3. **Incorrect Boundary Conditions**: Be careful with the conditions when checking if target lies in sorted portion.
4. **Duplicate Elements**: The basic implementation assumes all elements are unique. Handling duplicates requires additional logic.

## Applications

1. **Database Indexing**: When indexes are partially sorted or reorganized
2. **Circular Buffer Search**: Finding elements in circular buffer data structures
3. **Version Control**: Finding specific versions in circular version histories
4. **Resource Allocation**: Finding available slots in circular resource allocation systems

## Related Problems

1. Find Minimum in Rotated Sorted Array
2. Search in Rotated Sorted Array II (with duplicates)
3. Find Rotation Count in Rotated Sorted Array
4. Find Maximum in Rotated Sorted Array

## Testing Guide

### Test Cases to Cover:

1. Basic cases:
   ```python
   assert search([4, 5, 6, 7, 0, 1, 2], 0) == 4
   assert search([4, 5, 6, 7, 0, 1, 2], 3) == -1
   ```

2. Edge cases:
   ```python
   assert search([], 5) == -1
   assert search([1], 1) == 0
   assert search([1], 0) == -1
   ```

3. Rotation variations:
   ```python
   assert search([1, 2, 3, 4, 5], 4) == 3  # No rotation
   assert search([2, 3, 4, 5, 1], 1) == 4  # Rotated once
   assert search([5, 1, 2, 3, 4], 5) == 0  # Target at start
   ```

## Performance Optimization Tips

1. Use binary search variant that avoids integer overflow
2. Consider adding early termination conditions for obvious cases
3. If dealing with large arrays, consider parallelization for multiple searches
4. Cache frequently searched values if appropriate for your use case

## Additional Resources

1. Time Complexity Analysis: [Master Theorem](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms))
2. Related Reading: Binary Search Trees and Their Applications
3. Practice Problems: LeetCode #33, #81, #153
4. Advanced Topics: Variants with duplicates, Finding multiple occurrences

## Practice Problems Collection

### Essential Problems

| Problem | Difficulty | LeetCode Link | Description | Key Concepts |
|---------|------------|---------------|-------------|--------------|
| Search in Rotated Sorted Array | Medium | [LC-33](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Find target in rotated array with unique elements | Basic rotated array search |
| Search in Rotated Sorted Array II | Medium | [LC-81](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) | Find target in rotated array with duplicates | Handling duplicates |
| Find Minimum in Rotated Sorted Array | Medium | [LC-153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Find minimum element in rotated array | Modified binary search |
| Find Minimum in Rotated Sorted Array II | Hard | [LC-154](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/) | Find minimum in rotated array with duplicates | Complex duplicate handling |

### Related Binary Search Problems

| Problem | Difficulty | LeetCode Link | Description | Key Concepts |
|---------|------------|---------------|-------------|--------------|
| Peak Element | Medium | [LC-162](https://leetcode.com/problems/find-peak-element/) | Find any peak element in array | Binary search on unsorted array |
| Find First and Last Position | Medium | [LC-34](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | Find range of target element | Modified binary search |
| Single Element in Sorted Array | Medium | [LC-540](https://leetcode.com/problems/single-element-in-a-sorted-array/) | Find element that appears once | Binary search with parity |
| Search Insert Position | Easy | [LC-35](https://leetcode.com/problems/search-insert-position/) | Find insertion position | Basic binary search |

### Problem-Solving Patterns

#### Pattern 1: Basic Rotated Array Search
```python
def findPivot(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return left
```

#### Pattern 2: Handling Duplicates
```python
def searchWithDuplicates(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        # Skip duplicates from left
        while left < right and nums[left] == nums[left + 1]:
            left += 1
        # Skip duplicates from right
        while left < right and nums[right] == nums[right - 1]:
            right -= 1
        # Regular binary search logic follows...
```

#### Pattern 3: Finding Range
```python
def searchRange(nums, target):
    def findBound(nums, target, isFirst):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                if isFirst:
                    if mid == left or nums[mid-1] < target:
                        return mid
                    right = mid - 1
                else:
                    if mid == right or nums[mid+1] > target:
                        return mid
                    left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
    
    return [findBound(nums, target, True), 
            findBound(nums, target, False)]
```

### Problem-Solving Tips

1. **For Basic Rotated Array**:
   - Always check which half is sorted first
   - Compare target with endpoints of sorted half
   - Move to appropriate half based on comparison

2. **For Duplicate Elements**:
   - Skip duplicate elements at boundaries
   - Consider worst-case time complexity becomes O(n)
   - Handle edge cases where all elements are same

3. **For Finding Ranges**:
   - Use two binary searches for left and right bounds
   - Modify condition to find first/last occurrence
   - Handle cases where element doesn't exist

### Common Patterns and Templates

#### Template 1: Basic Binary Search in Rotated Array
```python
def search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
            
        # Check if left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target <= nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] <= target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1
```

#### Template 2: Binary Search with Duplicates
```python
def searchWithDuplicates(nums: List[int], target: int) -> bool:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        # Handle duplicates
        while left < right and nums[left] == nums[left + 1]:
            left += 1
        while left < right and nums[right] == nums[right - 1]:
            right -= 1
            
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return True
            
        if nums[left] <= nums[mid]:
            if nums[left] <= target <= nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] <= target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return False
```