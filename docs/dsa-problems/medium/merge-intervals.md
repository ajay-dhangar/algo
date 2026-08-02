---
id: merge-intervals-problem
title: "Merge Intervals"
sidebar_label: Merge Intervals
description: "This document explains the Merge Intervals problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
companies: [Google, Amazon, Meta]
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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (const auto& interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }
        return merged;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        result.add(current);
        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                current[1] = Math.max(current[1], interval[1]);
            } else {
                current = interval;
                result.add(current);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

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

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var merge = function(intervals) {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        const last = res[res.length - 1];
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            res.push(curr);
        }
    }
    return res;
};
```

  </TabItem>
</Tabs>
