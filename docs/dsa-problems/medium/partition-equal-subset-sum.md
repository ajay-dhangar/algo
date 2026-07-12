---
id: partition-equal-subset-sum
title: "Partition Equal Subset Sum"
sidebar_label: Partition Equal Subset Sum
description: "Solving the Partition Equal Subset Sum problem using Space-Optimized Dynamic Programming."
tags: [DSA, leetcode, dynamic-programming, array, knapsack]
---

## Description:

Given an integer array `nums`, return `true` *if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or* `false` *otherwise*.

**Example 1:**
 
Input: `nums = [1,5,11,5]`
Output: `true`
**Explanation:** The array can be partitioned as `[1, 5, 5]` and `[11]`.

**Example 2:**

Input: `nums = [1,2,3,5]`
Output: `false`
**Explanation:** The array cannot be partitioned into equal sum subsets.

---

## Video Explanation

<LiteYouTubeEmbed
  id="7win3dcgo3k"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Partition Equal Subset Sum | DP 14 | C++ | Java"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Dynamic Programming (Space Optimized 0/1 Knapsack)

To partition the array into two subsets with equal sums, the total sum of all elements in the array must be an **even number**. If the total sum is odd, it is mathematically impossible to divide it into two equal integer halves, and we can immediately return `false`.

If the total sum is even, our target sum for *one* of the subsets is exactly `totalSum / 2`. The problem now reduces to a standard **Subset Sum Problem** (a variation of 0/1 Knapsack): *Can we pick a subset of elements from the array that adds up exactly to this target?*

We can solve this using a 1D Dynamic Programming array to optimize space:
1. **Initialize:** Calculate the total sum. If it's odd, return `false`. Otherwise, set `target = sum / 2`.
2. **DP Array:** Create a boolean array `dp` of size `target + 1`, where `dp[i]` represents whether a subset with sum `i` is possible. Initialize `dp[0] = true` (an empty subset has a sum of 0), and the rest to `false`.
3. **Iterate:** For each `num` in the array, iterate through the `dp` array backwards from `target` down to `num`. 
4. **Transition:** Update the current state using `dp[j] = dp[j] || dp[j - num]`. This means we can form sum `j` either if we could already form it without the current `num`, or if we could form the sum `j - num` and then add the current `num` to it.
5. **Return:** The answer will be stored in `dp[target]`.

#### Complexity
* **Time Complexity:** $O(N \times \text{target})$ where $N$ is the length of the `nums` array and $\text{target}$ is half of the total sum. 
* **Space Complexity:** $O(\text{target})$ because we are using a 1D boolean array of size `target + 1` instead of a 2D matrix.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        
        // If the total sum is odd, we cannot split it into two equal halves
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int num : nums) {
            // Traverse backwards to avoid reusing the same number
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
            if (dp[target]) return true;
        }
        
        return dp[target];
    }
};
```

**Java**
```java
class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        
        // If the total sum is odd, we cannot split it into two equal halves
        if (sum % 2 != 0) return false;
        
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        
        for (int num : nums) {
            // Traverse backwards to avoid reusing the same number
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
            if (dp[target]) return true;
        }
        
        return dp[target];
    }
}
```

**Python**
```py
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total_sum = sum(nums)
        
        # If the total sum is odd, we cannot split it into two equal halves
        if total_sum % 2 != 0:
            return False
            
        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True
        
        for num in nums:
            # Traverse backwards to avoid reusing the same number
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
            if dp[target]:
                return True
                
        return dp[target]
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let sum = 0;
    for (let num of nums) {
        sum += num;
    }
    
    // If the total sum is odd, we cannot split it into two equal halves
    if (sum % 2 !== 0) return false;
    
    let target = sum / 2;
    let dp = new Array(target + 1).fill(false);
    dp[0] = true;
    
    for (let num of nums) {
        // Traverse backwards to avoid reusing the same number
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
        if (dp[target]) return true;
    }
    
    return dp[target];
};
```