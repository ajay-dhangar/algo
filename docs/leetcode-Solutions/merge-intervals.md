---
id: merge-intervals
sidebar_position: 3
title: Merge Intervals
sidebar_label: Merge Intervals
description: "This document explains the Merge Intervals problem, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving]
---

# merge-intervals

## Description
Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example:
**Input**: `intervals = [[1,3],[2,6],[8,10],[15,18]]`  
**Output**: `[[1,6],[8,10],[15,18]]`  
**Explanation**: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

## Approach
To merge overlapping intervals, the strategy is as follows:

1. **Sort the intervals** by their start time. This helps ensure that when we traverse the intervals, we can compare each interval with the last merged one to check for overlaps.
2. **Iterate through the sorted intervals** and for each interval:
    - If it overlaps with the last merged interval (i.e., if the current interval's start is less than or equal to the end of the last merged interval), merge them by updating the end time of the last merged interval to be the maximum of the current interval's end or the last merged interval's end.
    - Otherwise, append the current interval to the result as a non-overlapping interval.
3. Finally, return the list of merged intervals.

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        // Step 1: Sort the intervals based on the starting times
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[0] < b[0];
        });

        std::vector<std::vector<int>> merged;

        // Step 2: Iterate over the intervals
        for (const auto& interval : intervals) {
            // If the merged list is empty or no overlap, append the interval
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                // Step 3: If overlapping, merge the intervals
                merged.back()[1] = std::max(merged.back()[1], interval[1]);
            }
        }

        return merged;
    }
};
```

Time Complexity: O(n log n) (due to sorting the intervals) <br/>
Space Complexity: O(n) (for the output array)