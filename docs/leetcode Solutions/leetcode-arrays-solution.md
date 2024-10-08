---
id:easy-array-leetcode-problems-10
sidebar_position: 1
title: easy-array-leetcode-problems-10
sidebar_label:easy-array-leetcode-problems-10
description: "This document contains solutions to 10 easy array leetcode problems, showcasing various algorithms and data structures."
tags: [leetcode, algorithms, problem-solving]
---

# LeetCode Problems and Solutions

1. [Two Sum](#1-two-sum)
2. [Remove Duplicates from Sorted Array](#2-remove-duplicates-from-sorted-array)
3. [Remove Element](#3-remove-element)
4. [Search Insert Position](#4-search-insert-position)
5. [Plus One](#5-plus-one)
6. [Merge Sorted Array](#6-merge-sorted-array)
7. [Convert Sorted Array to Binary Search Tree](#7-convert-sorted-array-to-binary-search-tree)
8. [Pascal's Triangle](#8-pascals-triangle)
9. [Pascal's Triangle II](#9-pascals-triangle-ii)
10. [Best Time to Buy and Sell Stock](#10-best-time-to-buy-and-sell-stock)

## 1. Two Sum
**Description:** Given an array of integers, return indices of the two numbers such that they add up to a specific target.  
**Solution:** Use a hash map to store the difference between the target and each element. As you iterate through the array, check if the current number exists in the map. If it does, return the indices; otherwise, add the current number and its index to the map.

```python
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in num_map:
            return [num_map[diff], i]
        num_map[num] = i
```

    **Time Complexity**: O(n)
    **Space Complexity**: O(n)
---

## 2. Remove Duplicates from Sorted Array
**Description:** Given a sorted array, remove the duplicates in-place such that each element appears only once, and return the new length of the array.  
**Solution:** Use a two-pointer approach. One pointer tracks the current position in the array, and the other pointer finds unique elements. 

```python
def remove_duplicates(nums):
    if not nums:
        return 0
    unique_index = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[unique_index] = nums[i]
            unique_index += 1
    return unique_index
```
 **Time Complexity**: O(n)  
 **Space Complexity**: O(1)  

---

## 3. Remove Element
**Description:** Given an array and a value, remove all instances of that value in-place and return the new length.  
**Solution:** Use a similar two-pointer technique. One pointer traverses the array, while the other pointer keeps track of the position for non-target elements.

```python
def remove_element(nums, val):
    new_index = 0
    for num in nums:
        if num != val:
            nums[new_index] = num
            new_index += 1
    return new_index
```
 **Time Complexity**: O(n)  
 **Space Complexity**: O(1) 
---

## 4. Search Insert Position
**Description:** Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.  
**Solution:** Use binary search to efficiently find the insert position.

```python
def search_insert(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left
```
 **Time Complexity**: O(log n)  
 **Space Complexity**: O(1)  
---

## 5. Plus One
**Description:** Given a non-empty array of digits representing a non-negative integer, increment one to the integer. The digits are stored such that the most significant digit is at the head of the list.  
**Solution:** Start from the least significant digit and handle carry over. If there is a carry after processing all digits, insert a new digit at the start.

```python
def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits
```
  **Time Complexity**: O(n)  
  **Space Complexity**: O(1)  
---

## 6. Merge Sorted Array
**Description:** Given two sorted arrays, merge them into one sorted array.  
**Solution:** Use three pointers: one for each array and one for the merged array, comparing the elements to merge them in sorted order.

```python
def merge(nums1, m, nums2, n):
    while m > 0 and n > 0:
        if nums1[m - 1] > nums2[n - 1]:
            nums1[m + n - 1] = nums1[m - 1]
            m -= 1
        else:
            nums1[m + n - 1] = nums2[n - 1]
            n -= 1
    nums1[:n] = nums2[:n]
```   
   **Time Complexity**: O(m + n)  
   **Space Complexity**: O(1)  

---

## 7. Convert Sorted Array to Binary Search Tree
**Description:** Given an array where elements are sorted in ascending order, convert it to a height-balanced binary search tree.  
**Solution:** Use a recursive approach to build the tree by choosing the middle element as the root.

```python
def sorted_array_to_bst(nums):
    if not nums:
        return None
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    root.left = sorted_array_to_bst(nums[:mid])
    root.right = sorted_array_to_bst(nums[mid + 1:])
    return root
```
   **Time Complexity**: O(n)  
   **Space Complexity**: O(h) where h is the height of the tree (O(log n) for balanced trees)  

---

## 8. Pascal's Triangle
**Description:** Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.  
**Solution:** Initialize a triangle list and iteratively build each row based on the previous row's values.

```python
def generate(numRows):
    triangle = []
    for row_num in range(numRows):
        row = [1] * (row_num + 1)
        for j in range(1, row_num):
            row[j] = triangle[row_num - 1][j - 1] + triangle[row_num - 1][j]
        triangle.append(row)
    return triangle
```
   **Time Complexity**: O(numRows^2)  
   **Space Complexity**: O(1)  
---

## 9. Pascal's Triangle II
**Description:** Given an integer rowIndex, return the rowIndexth row of Pascal's triangle.  
**Solution:** Generate the triangle until the desired row is reached, returning the last row.

```python
def get_row(rowIndex):
    row = [1]
    for i in range(1, rowIndex + 1):
        row.append(row[-1] * (rowIndex - i + 1) // i)
    return row
```
   **Time Complexity**: O(numRows)  
   **Space Complexity**: O(numRows)  

---

## 10. Best Time to Buy and Sell Stock
**Description:** Given an array where the ith element is the price of a given stock on the ith day, find the maximum profit you can achieve. You may complete at most one transaction.  
**Solution:** Track the minimum price and calculate the maximum profit as you iterate through the prices.

```python
def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit
```
    **Time Complexity**: O(n)  
    **Space Complexity**: O(1)  
---
