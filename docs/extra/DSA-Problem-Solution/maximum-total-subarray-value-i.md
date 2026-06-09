---
id: maximum-total-subarray-value-i
title: "Maximum Total Subarray Value I"
sidebar_label: Maximum Total Subarray Value I
description: "The Maximum Total Subarray Value I problem involves finding the maximum possible value by choosing a subarray k times using a greedy approach."
tags: [DSA, leetcode, greedy-algorithms, arrays]
---

## Description:

Given an integer array `nums` and an integer `k`, you are allowed to choose a subarray exactly `k` times. The value of a subarray is defined as the maximum element minus the minimum element within that subarray.

Return the *maximum total value* you can achieve.

**Example 1:**

Input: `nums = [1, 2, 3, 4], k = 2`
Output: `6`

**Explanation:**
The optimal subarray is the entire array `[1, 2, 3, 4]`. Its value is `4 - 1 = 3`. We choose this subarray `k = 2` times, yielding a total value of `3 * 2 = 6`.

---

## Approaches:

### 1. Greedy Algorithm

Since we can choose the exact same subarray multiple times, the optimal strategy is simply to find the single subarray that yields the absolute maximum value and choose it `k` times. The maximum possible value for *any* subarray is just the global maximum element minus the global minimum element of the entire array.

1. Traverse the array to find the global maximum and global minimum elements.
2. The maximum possible value of any valid subarray will be the difference between these two: `global_max - global_min`.
3. Multiply this maximum difference by `k` to get the optimal total value.

> **Note on Integer Overflow:** The array values can be up to $10^9$ and `k` up to $10^5$. This means the maximum possible result is $10^{14}$, which exceeds the limit of a standard 32-bit signed integer. We must use 64-bit integers (`long long` in C++, `long` in Java) to prevent overflow.

* **Time Complexity:** $O(n)$ where $n$ is the length of the `nums` array. We only need a single pass through the array to find the minimum and maximum values.
* **Space Complexity:** $O(1)$ because we are only using a few extra variables for the bounds, taking constant extra space.

#### Solutions:

**C++**

```cpp
class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int min_val = nums[0];
        int max_val = nums[0];
        
        for (int num : nums) {
            if (num < min_val) min_val = num;
            if (num > max_val) max_val = num;
        }
        
        return ((long long)max_val - min_val) * k;
    }
};
```

**Java**

```java
class Solution {
    public long maxTotalValue(int[] nums, int k) {
        int min_val = nums[0];
        int max_val = nums[0];
        
        for (int num : nums) {
            if (num < min_val) min_val = num;
            if (num > max_val) max_val = num;
        }
        
        return ((long)max_val - min_val) * k;
    }
}
```

**Python**

```py
class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        # Python automatically handles arbitrarily large integers
        return (max(nums) - min(nums)) * k
```

**JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {
    let min_val = nums[0];
    let max_val = nums[0];
    
    for (let num of nums) {
        if (num < min_val) min_val = num;
        if (num > max_val) max_val = num;
    }
    
    return (max_val - min_val) * k;
};
```