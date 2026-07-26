---
id: activity-selection-problem
title: Activity Selection Problem
sidebar_label: Activity Selection
sidebar_position: 6
description: A classic greedy algorithm problem to select the maximum number of mutually compatible activities.
tags: [greedy, algorithm, activity-selection, scheduling]
---

The Activity Selection Problem is a classic optimization problem. The goal is to select the maximum number of mutually compatible activities from a given set of activities, each with a start time ($S_i$) and a finish time ($F_i$).

## Real-World Analogy

Imagine scheduling meetings in a single conference room. Many people want to hold meetings, each specifying a start and end time. You want to host the **maximum number of meetings** in that single room.

## Greedy Choice Property

The greedy strategy is to **always select the next activity whose finish time is the earliest** among the remaining compatible activities.

### Why this works

By choosing the activity that finishes first, we leave the maximum possible room for subsequent meetings.

Mathematically, if we sort the activities by their finish times:
$$F_1 \le F_2 \le F_3 \le \dots \le F_n$$
We start by selecting the first activity. Then we scan the remaining activities, selecting the first one that starts after or at the finish time of the last selected activity.

## Step-by-Step Walkthrough

* Sort the activities by their finish times.
* Select the first activity from the sorted list.
* For the remaining activities, if the start time of the current activity is greater than or equal to the finish time of the previously selected activity, select it.
* Repeat the check for all remaining activities.

## Complexity Analysis

* **Time Complexity:** $O(N \log N)$ due to sorting the activities. If the activities are already sorted by finish times, it takes $O(N)$ time.
* **Space Complexity:** $O(1)$ auxiliary space if sorted in place, or $O(N)$ to store sorted elements.

## Implementation

### Python

```python
def select_activities(activities):
    if not activities:
        return []
    # Sort activities by their finish times
    # activities is a list of tuples: (start_time, finish_time)
    activities.sort(key=lambda x: x[1])
    
    selected = []
    # Select the first activity
    selected.append(activities[0])
    last_finish_time = activities[0][1]
    
    for i in range(1, len(activities)):
        start, finish = activities[i]
        if start >= last_finish_time:
            selected.append(activities[i])
            last_finish_time = finish
            
    return selected
```

### C++

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

struct Activity {
    int start, finish;
};

bool activityCompare(Activity s1, Activity s2) {
    return (s1.finish < s2.finish);
}

void printMaxActivities(std::vector<Activity>& activities) {
    if (activities.empty()) {
        std::cout << "No activities to select." << std::endl;
        return;
    }
    std::sort(activities.begin(), activities.end(), activityCompare);
    
    std::cout << "Selected Activities: " << std::endl;
    int i = 0;
    std::cout << "(" << activities[i].start << ", " << activities[i].finish << ") ";
    
    for (int j = 1; j < activities.size(); j++) {
        if (activities[j].start >= activities[i].finish) {
            std::cout << "(" << activities[j].start << ", " << activities[j].finish << ") ";
            i = j;
        }
    }
    std::cout << std::endl;
}
```

### Java

```java
import java.util.*;

class Activity {
    int start, finish;
    Activity(int start, int finish) {
        this.start = start;
        this.finish = finish;
    }
}

public class ActivitySelection {
    public static List<Activity> getMaxActivities(List<Activity> list) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }
        list.sort(Comparator.comparingInt(a -> a.finish));
        List<Activity> selected = new ArrayList<>();
        
        selected.add(list.get(0));
        int lastFinish = list.get(0).finish;
        
        for (int i = 1; i < list.size(); i++) {
            Activity current = list.get(i);
            if (current.start >= lastFinish) {
                selected.add(current);
                lastFinish = current.finish;
            }
        }
        return selected;
    }
}
```
