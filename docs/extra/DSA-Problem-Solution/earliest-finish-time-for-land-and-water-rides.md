---
id: earliest-finish-time-for-land-and-water-rides
title: "Earliest Finish Time for Land and Water Rides I/II"
sidebar_label: Earliest Finish Time for Land and Water Rides I/II
description: "Finding the earliest possible completion time for taking exactly one land ride and one water ride using a greedy approach."
tags: [DSA, leetcode, array, greedy]
---

## Description:

You are given two categories of theme park attractions: land rides and water rides.

- **Land rides:** `landStartTime[i]` represents the earliest time the `i-th` land ride can be boarded, and `landDuration[i]` represents how long the `i-th` land ride lasts.
- **Water rides:** `waterStartTime[j]` represents the earliest time the `j-th` water ride can be boarded, and `waterDuration[j]` represents how long the `j-th` water ride lasts.

A tourist must experience exactly one ride from each category, in either order.

- A ride may be started at its opening time or any later moment.
- If a ride is started at time `t`, it finishes at time `t + duration`.
- Immediately after finishing one ride the tourist may board the other (if it is already open) or wait until it opens.

Return the earliest possible time at which the tourist can finish both rides.

**Example 1:**
Input: `landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]`
Output: `9`

**Explanation:**
- Plan A (land ride 0 → water ride 0):
  - Start land ride 0 at time `landStartTime[0] = 2`. Finish at 2 + `landDuration[0] = 6`.
  - Water ride 0 opens at time `waterStartTime[0] = 6`. Start immediately at 6, finish at 6 + `waterDuration[0] = 9`.
Plan A gives the earliest finish time of 9.

**Example 2:**
Input: `landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]`
Output: `14`

**Explanation:**
- Plan A (water ride 0 → land ride 0):
  - Start water ride 0 at time `waterStartTime[0] = 1`. Finish at 1 + `waterDuration[0] = 11`.
  - Land ride 0 opened at `landStartTime[0] = 5`. Start immediately at 11 and finish at 11 + `landDuration[0] = 14`.
Plan A provides the earliest finish time of 14.

---

## Approaches:

### 1. Greedy Algorithm / Enumeration
To find the absolute earliest finish time, we evaluate both sequence permutations: riding a land ride then a water ride, or riding a water ride then a land ride. 

For each sequence, we first calculate the absolute earliest finish time of the first ride. Then, using that earliest end time, we check every available option for the second ride, calculating its finish time as the maximum of the second ride's start time and the first ride's finish time, plus the duration. We take the overall minimum completion time.

* **Time Complexity:** $O(N + M)$ where $N$ is the number of land rides and $M$ is the number of water rides. The algorithm iterates through the arrays in linear, independent loops rather than nested arrays.
* **Space Complexity:** $O(1)$ as we strictly use only a few scalar variables to keep track of the earliest finish times, meaning space does not scale with the input.

#### Solutions:

**C++**
```cpp
class Solution {
    int calc(const vector<int>& start1, const vector<int>& dur1, const vector<int>& start2, const vector<int>& dur2) {
        long long minEnd = LLONG_MAX;
        for (int i = 0; i < start1.size(); i++) {
            minEnd = min(minEnd, (long long)start1[i] + dur1[i]);
        }
        
        long long minTotal = LLONG_MAX;
        for (int i = 0; i < start2.size(); i++) {
            minTotal = min(minTotal, max((long long)start2[i], minEnd) + dur2[i]);
        }
        return minTotal;
    }

public:
    int earliestFinishTime(vector<int>& landStartTime, vector<int>& landDuration, vector<int>& waterStartTime, vector<int>& waterDuration) {
        return min(
            calc(landStartTime, landDuration, waterStartTime, waterDuration),
            calc(waterStartTime, waterDuration, landStartTime, landDuration)
        );
    }
};
```

**Java**
```java
class Solution {
    private int calc(int[] start1, int[] dur1, int[] start2, int[] dur2) {
        long minEnd = Long.MAX_VALUE;
        for (int i = 0; i < start1.length; i++) {
            minEnd = Math.min(minEnd, (long) start1[i] + dur1[i]);
        }
        
        long minTotal = Long.MAX_VALUE;
        for (int i = 0; i < start2.length; i++) {
            minTotal = Math.min(minTotal, Math.max((long) start2[i], minEnd) + dur2[i]);
        }
        return (int) minTotal;
    }

    public int earliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) {
        return Math.min(
            calc(landStartTime, landDuration, waterStartTime, waterDuration),
            calc(waterStartTime, waterDuration, landStartTime, landDuration)
        );
    }
}
```

**Python**
```py
class Solution:
    def earliestFinishTime(self, landStartTime: List[int], landDuration: List[int], waterStartTime: List[int], waterDuration: List[int]) -> int:
        def calc(start1, dur1, start2, dur2):
            min_end = min(a + t for a, t in zip(start1, dur1))
            return min(max(a, min_end) + t for a, t in zip(start2, dur2))
            
        return min(
            calc(landStartTime, landDuration, waterStartTime, waterDuration),
            calc(waterStartTime, waterDuration, landStartTime, landDuration)
        )
```

**JavaScript**
```js
/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
const earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    const calc = (start1, dur1, start2, dur2) => {
        let minEnd = Infinity;
        for (let i = 0; i < start1.length; i++) {
            minEnd = Math.min(minEnd, start1[i] + dur1[i]);
        }
        
        let minTotal = Infinity;
        for (let i = 0; i < start2.length; i++) {
            minTotal = Math.min(minTotal, Math.max(start2[i], minEnd) + dur2[i]);
        }
        return minTotal;
    };

    return Math.min(
        calc(landStartTime, landDuration, waterStartTime, waterDuration),
        calc(waterStartTime, waterDuration, landStartTime, landDuration)
    );
};
```