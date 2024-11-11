---
id: find-indices-of-stable-mountains
sidebar_position: 2
title: Find Indices of stable mountains
sidebar_label: Find Indices of stable mountains
description: The "Find Indices of Stable Mountains" problem on involves identifying mountains that meet a specific stability criterion 1.
tags: [dsa, algorithms, problem-solving]
---

# Find Indices of Stable Mountains

## Description
There are ``n`` mountains in a row, and each mountain has a height. You are given an integer array ``height`` where ``height[i]`` represents the height of mountain ``i``, and an integer ``threshold``.

A mountain is called stable if the mountain just before it (if it exists) has a height strictly greater than ``threshold``. Note that mountain 0 is not stable.

Return an array containing the indices of all stable mountains in any order.

### Example 1:

**Input:** height = [1,2,3,4,5], threshold = 2

**Output:** [3,4]

**Explanation:**

Mountain 3 is stable because height[2] == 3 is greater than threshold == 2.
Mountain 4 is stable because height[3] == 4 is greater than threshold == 2.

### Example 2:

**Input:** height = [10,1,10,1,10], threshold = 3

**Output:** [1,3]

### Example 3:

**Input:** height = [10,1,10,1,10], threshold = 10

**Output:** [ ]

## Approach

**1. Iterate Through Mountains:** Loop through the array starting from the second mountain.

**2. Check Stability:** Compare the height of the current mountain with the height of the previous mountain.

**3. Collect Stable Indices:** If the previous mountain's height is greater than the threshold, add the current mountain's index to the result list.

# Code in Java

```java
class Solution {
    public List<Integer> stableMountains(int[] height, int threshold) {
        List<Integer> stableMountains = new ArrayList<>();
        for(int i=1; i<height.length; i++) {
            if(height[i-1]>threshold) {
                stableMountains.add(i);
            }
        }
        return stableMountains;
    }
}
```

 
