---
id: check-if-array-is-sorted-and-rotated
title: "Check if array is sorted and rotated"
sidebar_label: Check if array is sorted and rotated
description: "Determining if an array was originally sorted in non-decreasing order and then rotated using a simple traversal approach."
tags: [DSA, leetcode, array]
---

## Description:

Given an array `nums`, return `true` *if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero)*. Otherwise, return `false`.

There may be duplicates in the original array.

**Note:** An array `A` rotated by `x` positions results in an array `B` of the same length such that `A[i] == B[(i+x) % A.length]`, where `%` is the modulo operation.

**Example 1:**
Input: `nums = [3, 4, 5, 1, 2]`
Output: `true`
**Explanation:** `[1, 2, 3, 4, 5]` is the original sorted array.
You can rotate the array by x = 3 positions to begin on the the element of value 3: `[3, 4, 5, 1, 2]`.

**Example 2:**
Input: `nums = [2, 1, 3, 4]`
Output: `false`
**Explanation:** There is no sorted array once rotated that can make `nums`.

**Example 3:**
Input: `nums = [1, 2, 3]`
Output: `true`
**Explanation:** `[1, 2, 3]` is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make `nums`.

---

## Approaches:

### 1. Count Inversions Algorithm

In a completely sorted array, every element is less than or equal to the next element. In a sorted and rotated array, there will be exactly **one drop** (or inversion) where the current element is greater than the next element—this happens exactly at the pivot where the rotation occurred.

If the array is not sorted and rotated, there will be more than one drop. To check this efficiently, we iterate through the array and count these drops. We use the modulo operator (`%`) to easily compare the last element of the array back to the first element to handle the rotation seamlessly.

* **Time Complexity:** $O(n)$ where $n$ is the number of elements in the array. We iterate through the array exactly once.
* **Space Complexity:** $O(1)$ because we only use a counter variable and length variable, taking constant extra space.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    bool check(vector<int>& nums) {
        int count = 0;
        int n = nums.size();
        
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }
        
        return count <= 1;
    }
};
```

**Java**
```java
class Solution {
    public boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;
        
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }
        
        return count <= 1;
    }
}
```

**Python**
```py
class Solution:
    def check(self, nums: list[int]) -> bool:
        count = 0
        n = len(nums)
        
        for i in range(n):
            if nums[i] > nums[(i + 1) % n]:
                count += 1
                
        return count <= 1
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const check = function(nums) {
    let count = 0;
    let n = nums.length;
    
    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) {
            count++;
        }
    }
    
    return count <= 1;
};
```