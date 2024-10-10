---
id: container-with-most-water
sidebar_position: 1
title: Container With Most Water
sidebar_label: Container With Most Water
description: "This document explains the Container With Most Water problem, including its description, approach, and implementation."
tags: [leetcode, algorithms, problem-solving]
---

# Container With Most Water

## Description
You are given an integer array `height` of length `n`.  
There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.  
The goal is to find two lines that together with the x-axis form a container, such that the container contains the most water.

**Return the maximum amount of water a container can store.**

## Approach
To solve this problem, we can use the **two-pointer technique**:

1. **Initialization**: Start with one pointer at the beginning (`l = 0`) and the other at the end (`r = len(height) - 1`) of the array.
2. **Calculate Area**: Calculate the area formed by the lines at these pointers. The area can be calculated as:
   \[
   \text{Area} = (\text{right index} - \text{left index}) \times \min(\text{height[left index]}, \text{height[right index]})
   \]
3. **Update Maximum Area**: Keep track of the maximum area encountered.
4. **Move Pointers**: Move the pointer pointing to the shorter line inward to potentially find a taller line that could increase the area.
5. **Repeat**: Continue this process until the two pointers meet.

## Python Implementation
```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1  # Initialize pointers
        max_area = 0  # Variable to store the maximum area
        
        while l < r:  # Loop until the two pointers meet
            area = (r - l) * min(height[l], height[r])  # Calculate area
            max_area = max(max_area, area)  # Update max area if current is larger
            
            # Move the pointer pointing to the shorter line
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        
        return max_area  # Return the maximum area found
```
Time Complexity: O(n)  
Space Complexity: O(1)      
