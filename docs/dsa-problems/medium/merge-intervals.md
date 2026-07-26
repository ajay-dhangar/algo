---
id: merge-intervals-problem
title: "Merge Intervals"
sidebar_label: Merge Intervals
description: "This document explains the Merge Intervals problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Merge Intervals

## Problem Statement
Given a collection of `intervals`, merge all overlapping intervals.

## Video Explanation

<LiteYouTubeEmbed
  id="IexN60k62jo"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Merge Overlapping Intervals | Brute, Optimal with Precise TC analysis"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## Approach
To merge the intervals, we can first sort them based on the start time. Then, we can iterate through the sorted intervals and merge them as needed.


### Steps:

1. **Initialize : Sort**:  
   - Sort the intervals by their start times.
   - Initialize a list to hold the merged intervals.

2. **Iterate**:  
   - For each interval, check if it overlaps with the last merged interval.
   - If it does, merge them. If not, add the interval to the list.

3. **Return**:  
   - Return the merged intervals.

## Python Implementation

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals:
            return []

        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]

        for i in range(1, len(intervals)):
            current = intervals[i]
            last_merged = merged[-1]

            if current[0] <= last_merged[1]:
                last_merged[1] = max(last_merged[1], current[1])
            else:
                merged.append(current)

        return merged

```
Time Complexity: O(n log n) <br /> 
Space Complexity: O(n)    