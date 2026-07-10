---
id: house-robber-ii
title: "House Robber II"
sidebar_label: House Robber II
description: "Solving the House Robber II problem using Dynamic Programming with space optimization."
tags: [DSA, leetcode, dynamic-programming, array]
---

## Description:

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night.**

Given an integer array `nums` representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police**.*

**Example 1:**

Input: `nums = [2,3,2]`
Output: `3`
**Explanation:** You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

**Example 2:**

Input: `nums = [1,2,3,1]`
Output: `4`
**Explanation:** Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

**Example 3:**

Input: `nums = [1,2,3]`
Output: `3`

---

## Video Explanation

<LiteYouTubeEmbed
  id="3WaxQM98WEA"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="House Robber 2 | DP 6 | C++ | Java"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Dynamic Programming (Space Optimized)

This problem is a direct extension of the original House Robber problem. The only complication is that the houses are arranged in a circle, meaning the first and last houses are adjacent. 

Because we cannot rob both the first and the last house simultaneously, we can break this circular problem down into two linear sub-problems:
1. Find the maximum loot by robbing houses from index `0` to `n-2` (completely ignoring the last house).
2. Find the maximum loot by robbing houses from index `1` to `n-1` (completely ignoring the first house).

The overall maximum loot will simply be the maximum of these two linear scenarios. 

**Algorithm:**
- Handle the base case: If the array has only 1 house, return its value immediately.
- Create a helper function `robLinear(start, end)` that applies the standard $O(1)$ space DP approach. It maintains two variables, `prev1` (max loot up to the previous house) and `prev2` (max loot up to the house before the previous one).
- At each step, the maximum loot is `max(prev2 + currentHouseValue, prev1)`.
- Return `max(robLinear(0, n - 2), robLinear(1, n - 1))`.

#### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the number of houses. We iterate through the array roughly twice (once for each sub-problem), which simplifies to linear time.
* **Space Complexity:** $O(1)$. We only use a few variables (`prev1`, `prev2`, `temp`) to keep track of the maximums, requiring no extra auxiliary arrays.

#### Solutions:

**C++**
```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        
        return max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
    
private:
    int robLinear(vector<int>& nums, int start, int end) {
        int prev1 = 0; // Max loot up to the previous house
        int prev2 = 0; // Max loot up to two houses ago
        
        for (int i = start; i <= end; i++) {
            int current = max(prev2 + nums[i], prev1);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};
```

**Java**
```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        
        return Math.max(robLinear(nums, 0, n - 2), robLinear(nums, 1, n - 1));
    }
    
    private int robLinear(int[] nums, int start, int end) {
        int prev1 = 0; // Max loot up to the previous house
        int prev2 = 0; // Max loot up to two houses ago
        
        for (int i = start; i <= end; i++) {
            int current = Math.max(prev2 + nums[i], prev1);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}
```

**Python**
```py
class Solution:
    def rob(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]
            
        def rob_linear(start, end):
            prev1, prev2 = 0, 0
            for i in range(start, end + 1):
                current = max(prev2 + nums[i], prev1)
                prev2 = prev1
                prev1 = current
            return prev1
            
        return max(rob_linear(0, len(nums) - 2), rob_linear(1, len(nums) - 1))
```

**JavaScript**
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    
    const robLinear = (start, end) => {
        let prev1 = 0; // Max loot up to the previous house
        let prev2 = 0; // Max loot up to two houses ago
        
        for (let i = start; i <= end; i++) {
            let current = Math.max(prev2 + nums[i], prev1);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    };
    
    return Math.max(robLinear(0, n - 2), robLinear(1, n - 1));
};
```