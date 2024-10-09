---
id: greedy-algorithms-1
title:  greedy Algorithms
sidebar_label:  greedy Algorithms
sidebar_position: 4
description: Greedy algorithms are a class of algorithms that make the optimal choice at each step with the hope of finding the global optimum
tags: [Competitive Programming,greedy approach,optimization]
---

# Greedy Algorithms - Examples

Here are a few examples of greedy algorithms in C++, demonstrating how the approach works in different problem scenarios.

## 1. Activity Selection Problem

The activity selection problem involves selecting the maximum number of activities that don't overlap. Given start and finish times, we need to choose activities that don't overlap.

### C++ Code

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

struct Activity {
    int start;
    int finish;
};

// Comparator to sort activities by their finish times
bool compare(Activity a1, Activity a2) {
    return a1.finish < a2.finish;
}

void activitySelection(Activity activities[], int n) {
    std::sort(activities, activities + n, compare);

    // The first activity always gets selected
    int lastSelectedActivity = 0;
    std::cout << "Selected activities: " << lastSelectedActivity << " ";

    // Consider the rest of the activities
    for (int i = 1; i < n; i++) {
        if (activities[i].start >= activities[lastSelectedActivity].finish) {
            std::cout << i << " ";
            lastSelectedActivity = i;
        }
    }
    std::cout << std::endl;
}

int main() {
    Activity activities[] = {{0, 6}, {1, 4}, {3, 5}, {5, 7}, {5, 9}, {8, 9}};
    int n = sizeof(activities) / sizeof(activities[0]);

    activitySelection(activities, n);

    return 0;
}
```