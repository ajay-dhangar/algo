---
id: rabbits-in-forest
title: "Rabbits in Forest"
sidebar_label: Rabbits in Forest
description: "Solving the Rabbits in Forest problem using a Hash Map and Greedy Math approach."
tags: [DSA, leetcode, math, hash-table, greedy]
---

## Description:

There is a forest with an unknown number of rabbits. We asked `n` rabbits **"How many rabbits have the same color as you?"** and collected the answers in an integer array `answers` where `answers[i]` is the answer of the `i-th` rabbit.

Given the array `answers`, return the **minimum** number of rabbits that could be in the forest.

**Example 1:**

Input: `answers = [1,1,2]`
Output: `5`
**Explanation:** - The two rabbits that answered "1" could both be the same color, say red. 
- The rabbit that answered "2" can't be red or the answers would be inconsistent. 
- Say the rabbit that answered "2" was blue. Then there should be 2 other blue rabbits in the forest that didn't answer into the array. 
- The smallest possible number of rabbits in the forest is therefore 5: 2 that answered "1" plus 3 that are blue (1 that answered "2" and 2 that didn't answer).

**Example 2:**

Input: `answers = [10,10,10]`
Output: `11`
**Explanation:**
- All three rabbits that answered "10" could be the same color. 
- If they are all the same color, there must be 11 rabbits of that color in total.

---

## Approaches:

### 1. Hash Map and Math (Optimal)

This problem can be elegantly solved using a frequency counter and some basic math. 

If a rabbit says there are `k` other rabbits with the same color, it means that this specific color group must have exactly `k + 1` rabbits in total.

1. **Count Frequencies:** Use a Hash Map to count how many times each answer appears in the `answers` array. Let's say `count` rabbits answered `k`.
2. **Calculate Groups:** A single color group can hold up to `k + 1` rabbits. If we have `count` rabbits claiming there are `k` others, we might need multiple color groups of size `k + 1` to satisfy them. 
3. **The Math:** The minimum number of groups needed to accommodate `count` rabbits of group size `k + 1` is exactly `ceil(count / (k + 1))`. 
4. **Sum it Up:** The total number of rabbits for that specific answer is the number of groups multiplied by the size of the group: `num_groups * (k + 1)`. We sum this up for all unique answers in our Hash Map.

### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the number of elements in the `answers` array. We iterate through the array once to populate the Hash Map, and then iterate through the unique keys in the map.
* **Space Complexity:** $O(N)$ in the worst case, where every rabbit gives a different answer, meaning our Hash Map stores $N$ distinct entries.

---

## Solutions:

### C++
```cpp
#include <unordered_map>
#include <vector>
#include <cmath>

class Solution {
public:
    int numRabbits(vector<int>& answers) {
        unordered_map<int, int> counts;
        for (int ans : answers) {
            counts[ans]++;
        }
        
        int total_rabbits = 0;
        for (auto& [ans, count] : counts) {
            int groupSize = ans + 1;
            // Integer ceiling division: (a + b - 1) / b
            int numGroups = (count + groupSize - 1) / groupSize;
            total_rabbits += numGroups * groupSize;
        }
        
        return total_rabbits;
    }
};
```

### Java
```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int numRabbits(int[] answers) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int ans : answers) {
            counts.put(ans, counts.getOrDefault(ans, 0) + 1);
        }
        
        int totalRabbits = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int ans = entry.getKey();
            int count = entry.getValue();
            int groupSize = ans + 1;
            
            // Integer ceiling division
            int numGroups = (count + groupSize - 1) / groupSize;
            totalRabbits += numGroups * groupSize;
        }
        
        return totalRabbits;
    }
}
```

### Python
```py
from collections import Counter
import math

class Solution:
    def numRabbits(self, answers: list[int]) -> int:
        counts = Counter(answers)
        total_rabbits = 0
        
        for ans, count in counts.items():
            group_size = ans + 1
            # Calculate the number of groups needed
            num_groups = math.ceil(count / group_size)
            total_rabbits += num_groups * group_size
            
        return total_rabbits
```

### JavaScript
```js
/**
 * @param {number[]} answers
 * @return {number}
 */
const numRabbits = function(answers) {
    const counts = new Map();
    for (let ans of answers) {
        counts.set(ans, (counts.get(ans) || 0) + 1);
    }
    
    let totalRabbits = 0;
    for (let [ans, count] of counts) {
        let groupSize = ans + 1;
        // Calculate the number of groups needed
        let numGroups = Math.ceil(count / groupSize);
        totalRabbits += numGroups * groupSize;
    }
    
    return totalRabbits;
};
```