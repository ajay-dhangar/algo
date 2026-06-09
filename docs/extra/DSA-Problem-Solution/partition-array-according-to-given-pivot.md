---
id: partition-array-according-to-given-pivot
title: "Partition Array According to Given Pivot"
sidebar_label: Partition Array By Pivot
description: "Rearranging an array based on a pivot value while maintaining the stable relative order of elements."
tags: [DSA, leetcode, array, two-pointers, simulation]
---

## Description:

You are given a **0-indexed** integer array `nums` and an integer `pivot`. Rearrange `nums` such that the following conditions are satisfied:

1. Every element less than `pivot` appears before every element greater than `pivot`.
2. Every element equal to `pivot` appears in between the elements less than and greater than `pivot`.
3. The **relative order** of the elements less than `pivot` and the elements greater than `pivot` is maintained.

Return *the array after the rearrangement*.

**Example 1:**
Input: `nums = [9,12,5,10,14,3,10], pivot = 10`
Output: `[9,5,3,10,10,12,14]`
**Explanation:** The elements 9, 5, and 3 are less than the pivot so they are on the left side of the array.
The elements 12 and 14 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [9, 5, 3] and [12, 14] are the respective orderings.

**Example 2:**
Input: `nums = [-3,4,3,2], pivot = 2`
Output: `[-3,2,4,3]`
**Explanation:** The element -3 is less than the pivot so it is on the left side of the array.
The elements 4 and 3 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [-3] and [4, 3] are the respective orderings.

---

## Approaches:

### 1. Three-Pass Simulation / Auxiliary Structures

To achieve a stable partition (where the original relative order is preserved), the most straightforward optimal approach is to iterate through the array and separate the elements into three distinct categories: elements strictly less than the pivot, elements equal to the pivot, and elements strictly greater than the pivot. 

After categorizing them, we combine these three groups in order. Depending on the language, this can be done using separate dynamic arrays (like vectors or lists) and concatenating them, or by doing three sequential passes over the original array to populate a fixed-size result array directly.

* **Time Complexity:** $O(n)$ where $n$ is the length of the array `nums`. We iterate through the array a constant number of times.
* **Space Complexity:** $O(n)$ because we require additional space to store the resulting partitioned array and any intermediate lists.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    vector<int> pivotArray(vector<int>& nums, int pivot) {
        vector<int> less, equal, greater;
        
        for (int num : nums) {
            if (num < pivot) {
                less.push_back(num);
            } else if (num == pivot) {
                equal.push_back(num);
            } else {
                greater.push_back(num);
            }
        }
        
        // Combine the vectors
        less.insert(less.end(), equal.begin(), equal.end());
        less.insert(less.end(), greater.begin(), greater.end());
        
        return less;
    }
};
```

**Java**
```java
class Solution {
    public int[] pivotArray(int[] nums, int pivot) {
        int n = nums.length;
        int[] result = new int[n];
        int index = 0;
        
        // First pass: add elements less than the pivot
        for (int num : nums) {
            if (num < pivot) {
                result[index++] = num;
            }
        }
        
        // Second pass: add elements equal to the pivot
        for (int num : nums) {
            if (num == pivot) {
                result[index++] = num;
            }
        }
        
        // Third pass: add elements greater than the pivot
        for (int num : nums) {
            if (num > pivot) {
                result[index++] = num;
            }
        }
        
        return result;
    }
}
```

**Python**
```py
from typing import List

class Solution:
    def pivotArray(self, nums: List[int], pivot: int) -> List[int]:
        less = []
        equal = []
        greater = []
        
        for num in nums:
            if num < pivot:
                less.append(num)
            elif num == pivot:
                equal.append(num)
            else:
                greater.append(num)
                
        return less + equal + greater
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
const pivotArray = function(nums, pivot) {
    const less = [];
    const equal = [];
    const greater = [];
    
    for (const num of nums) {
        if (num < pivot) {
            less.push(num);
        } else if (num === pivot) {
            equal.push(num);
        } else {
            greater.push(num);
        }
    }
    
    return less.concat(equal, greater);
};
```