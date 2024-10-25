---
id: activity-selection
title: Activity Selection Problem
sidebar_label: Activity Selection
description: "In this blog post, we'll explore the Activity Selection Problem, a classic greedy algorithm used to select the maximum number of activities that don't overlap."
tags: [dsa, algorithms, greedy algorithms, activity selection]
---

### Definition:

The Activity Selection Problem is about selecting the maximum number of activities that don't overlap, given their start and finish times. The goal is to maximize the number of activities that can be performed by a single person or machine.

### Characteristics:

- **Greedy Approach**:
  The greedy approach selects the next activity that finishes first, ensuring that the maximum number of activities are completed. This is done by:
  1. **Sorting Activities**:  
     Sort the activities based on their finish times.
  2. **Selecting Activities**:  
     Iterate through the sorted activities and select an activity if it starts after or when the last selected activity finishes.

### Problem Statement:

You are given `N` activities, each with a start time `s_i` and finish time `f_i`. Your task is to select the maximum number of activities that can be performed by a single person or machine.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N \log N)$**  
  The dominant operation is sorting the activities based on their finish times.

### Space Complexity:

- **Space Complexity: $O(1)$**  
  Only a constant amount of extra space is required.

### Example:

Consider the following activities:

- Activity 1: Start = 0, Finish = 6
- Activity 2: Start = 1, Finish = 4
- Activity 3: Start = 3, Finish = 5
- Activity 4: Start = 5, Finish = 7
- Activity 5: Start = 8, Finish = 9
- Activity 6: Start = 5, Finish = 9

**Step-by-Step Execution:**

1. **Sort by Finish Times**:
   - Activity 2 (1, 4)
   - Activity 3 (3, 5)
   - Activity 4 (5, 7)
   - Activity 1 (0, 6)
   - Activity 5 (8, 9)
   - Activity 6 (5, 9)

2. **Select Activities**:
   - Select Activity 2: (1, 4)
   - Select Activity 4: (5, 7)
   - Select Activity 5: (8, 9)

Thus, the maximum number of activities that can be selected is 3.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Activity {
    int start, finish;
};

bool compare(Activity a, Activity b) {
    return a.finish < b.finish;
}

void activitySelection(vector<Activity>& activities) {
    sort(activities.begin(), activities.end(), compare);

    int n = activities.size();
    cout << "Selected Activities: " << endl;
    
    // The first activity always gets selected
    int i = 0;
    cout << "(" << activities[i].start << ", " << activities[i].finish << ") ";
    
    // Check the rest of the activities
    for (int j = 1; j < n; j++) {
        if (activities[j].start >= activities[i].finish) {
            cout << "(" << activities[j].start << ", " << activities[j].finish << ") ";
            i = j; // Update the last selected activity
        }
    }
}

int main() {
    vector<Activity> activities = {{0, 6}, {1, 4}, {3, 5}, {5, 7}, {8, 9}, {5, 9}};
    activitySelection(activities);
    return 0;
}
```