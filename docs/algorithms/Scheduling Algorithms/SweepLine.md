---
id: sweep-line-algorithm
sidebar_position: 3
title: Sweep Line Algorithm
sidebar_label: Sweep Line Algorithm
description: "This document explains the Merge Intervals problem using the Sweep Line Algorithm, including its description, approach, and implementation in C++."
tags: [leetcode, algorithms, problem-solving, sweep-line-algo]
---

# sweep-line-merge-intervals

## Description
Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example:
**Input**: `intervals = [[1,3],[2,6],[8,10],[15,18]]`  
**Output**: `[[1,6],[8,10],[15,18]]`  
**Explanation**: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

## Approach

This approach uses a **sweep line algorithm**. Here's how it works:

1. **Transform the intervals into events**: 
    - Each interval generates two events: one at the start and one at the end. A start event increases the "active" interval count, while an end event decreases it.
2. **Sort all events**: 
    - Sort events primarily by time. If two events have the same time, prioritize end events over start events. This ensures the correct merging of intervals.
3. **Sweep through the events**:
    - Track when new intervals start and end based on active intervals, and merge intervals accordingly.

## C++ Implementation

```cpp
#include <vector>
#include <algorithm>
#include <iostream>

class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        // Step 1: Create events (start and end) from each interval
        std::vector<std::pair<int, int>> events;
        for (const auto& interval : intervals) {
            events.push_back({interval[0], 1});  // Start event (+1)
            events.push_back({interval[1], -1}); // End event (-1)
        }

        // Step 2: Sort events. Sort by time, and if equal, end (-1) comes before start (+1)
        std::sort(events.begin(), events.end(), [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
            if (a.first == b.first) return a.second < b.second;
            return a.first < b.first;
        });

        // Step 3: Sweep through the events and merge intervals
        std::vector<std::vector<int>> merged;
        int active = 0;  // Active intervals count
        int start = -1;  // Start of the current interval

        for (const auto& event : events) {
            if (active == 0) {
                // No active intervals, so this is the start of a new interval
                start = event.first;
            }

            // Update the active intervals count
            active += event.second;

            if (active == 0) {
                // When active becomes 0, we finished an interval
                merged.push_back({start, event.first});
            }
        }

        return merged;
    }
};

int main() {
    Solution sol;
    std::vector<std::vector<int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    
    std::vector<std::vector<int>> result = sol.merge(intervals);

    for (const auto& interval : result) {
        std::cout << "[" << interval[0] << "," << interval[1] << "] ";
    }

    return 0;
}
```

## Time and Space Complexity
- **Time Complexity**:O(n log n), where n is the number of intervals. Sorting the events takes O(n log n), and the sweeping phase takes O(n).
- **Space Complexity**: O(n) due to the space used for storing events and the output merged intervals.


