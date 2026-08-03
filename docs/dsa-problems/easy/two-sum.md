---
id: two-sum-problem
title: Two Sum
sidebar_label: Two Sum
description: >-
  This document explains the Two Sum problem, including its description,
  approach, and implementation.
tags:
  - dsa
  - algorithms
  - problem-solving
companies:
  - Amazon
  - Google
  - Meta
  - Microsoft
  - Netflix
---

# Two Sum

## Problem Statement
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

## Video Explanation

<LiteYouTubeEmbed
  id="KLlXCFG5TnA"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Two Sum - Leetcode 1 - HashmMap - Python"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## Approach
To solve this problem, we can use a hash map to store the numbers and their indices. As we iterate through the list, we check if the complement (target - current number) exists in the hash map.

### Steps:

1. **Initialize**:  
   - Create an empty `hash` map.

2. **Iterate**:  
   - For each number in `nums`, calculate its complement.
   - Check if the complement exists in the hash map.
   - If it exists, return the indices.
   - Otherwise, add the current number and its index to the hash map.

3. **Return**:  
   - If no solution is found, return an empty list.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.count(complement)) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

  </TabItem>
</Tabs>
