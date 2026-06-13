---
id: left-and-right-sum-differences
title: "Left and Right Sum Differences"
sidebar_label: Left and Right Sum Differences
description: "The Left and Right Sum Differences problem on LeetCode involves finding the absolute difference between the sum of elements to the left and right of each index in an array."
tags: [DSA, leetcode, array, prefix-sum]
---

## Description:

Given a **0-indexed** integer array `nums`, find a **0-indexed** integer array `answer` where:
* `answer.length == nums.length`.
* `answer[i] = |leftSum[i] - rightSum[i]|`.

Where:
* `leftSum[i]` is the sum of elements to the left of the index `i` in the array `nums`. If there is no such element, `leftSum[i] = 0`.
* `rightSum[i]` is the sum of elements to the right of the index `i` in the array `nums`. If there is no such element, `rightSum[i] = 0`.

Return *the array* `answer`.

**Example 1:**
Input: `nums = [10, 4, 8, 3]`
Output: `[15, 1, 11, 22]`
**Explanation:** The array `leftSum` is `[0, 10, 14, 22]` and the array `rightSum` is `[15, 11, 3, 0]`.
The array `answer` is `[|0 - 15|, |10 - 11|, |14 - 3|, |22 - 0|] = [15, 1, 11, 22]`.

**Example 2:**
Input: `nums = [1]`
Output: `[0]`
**Explanation:** The array `leftSum` is `[0]` and the array `rightSum` is `[0]`.
The array `answer` is `[|0 - 0|] = [0]`.

---

## Approaches:

### 1. Optimal Prefix Sum Approach

To avoid calculating the left and right sums from scratch for every element (which would result in a less optimal time complexity), we can utilize a running sum strategy:

1. Calculate the `totalSum` of all elements in the array.
2. Initialize a `leftSum` variable to 0.
3. Iterate through the array. For any element at index `i`, the `rightSum` can be deduced dynamically using the formula: `rightSum = totalSum - leftSum - nums[i]`.
4. Calculate the absolute difference, add it to our answer array, and update the `leftSum` by adding `nums[i]` before moving to the next iteration.

* **Time Complexity:** $O(n)$ because we iterate through the `nums` array twice (once to find the total sum, and once to calculate the differences).
* **Space Complexity:** $O(1)$ auxiliary space. We use an output array to store the results, which is generally not counted towards auxiliary space complexity. The space used for tracking sums is constant.

#### Optimal Solutions:

**C++**
```cpp
class Solution {
public:
    vector<int> leftRightDifference(vector<int>& nums) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        
        int leftSum = 0;
        vector<int> ans(nums.size());
        
        for (size_t i = 0; i < nums.size(); i++) {
            int rightSum = totalSum - leftSum - nums[i];
            ans[i] = abs(leftSum - rightSum);
            leftSum += nums[i];
        }
        
        return ans;
    }
};
```

**Java**
```java
class Solution {
    public int[] leftRightDifference(int[] nums) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
        
        int leftSum = 0;
        int[] ans = new int[nums.length];
        
        for (int i = 0; i < nums.length; i++) {
            int rightSum = totalSum - leftSum - nums[i];
            ans[i] = Math.abs(leftSum - rightSum);
            leftSum += nums[i];
        }
        
        return ans;
    }
}
```

**Python**
```py
class Solution:
    def leftRightDifference(self, nums: list[int]) -> list[int]:
        total_sum = sum(nums)
        left_sum = 0
        ans = []
        
        for num in nums:
            right_sum = total_sum - left_sum - num
            ans.append(abs(left_sum - right_sum))
            left_sum += num
            
        return ans
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const leftRightDifference = function(nums) {
    let totalSum = nums.reduce((acc, curr) => acc + curr, 0);
    let leftSum = 0;
    let ans = new Array(nums.length);
    
    for (let i = 0; i < nums.length; i++) {
        let rightSum = totalSum - leftSum - nums[i];
        ans[i] = Math.abs(leftSum - rightSum);
        leftSum += nums[i];
    }
    
    return ans;
};
```