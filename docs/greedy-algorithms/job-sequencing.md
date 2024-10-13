---
id: job-sequencing
title: Job Sequencing Problem
sidebar_label: Job Sequencing
description: "In this blog post, we'll explore the Job Sequencing Problem, a greedy algorithm for scheduling jobs with deadlines."
tags: [dsa, algorithms, greedy algorithms, job scheduling]
---

### Definition:

The Job Sequencing Problem involves scheduling jobs to maximize the total profit when each job has a deadline and associated profit. The objective is to complete as many jobs as possible within their deadlines.

### Characteristics:

- **Greedy Approach**:
  The algorithm schedules jobs based on their profit in descending order and assigns them to the latest available time slot before their deadline.
  1. **Sorting Jobs**:  
     Sort jobs based on profit in descending order.
  2. **Slot Assignment**:  
     For each job, check if there is a free time slot before its deadline and assign the job if possible.

### Problem Statement:

Given `N` jobs, each with a deadline and profit, find the maximum profit that can be earned by scheduling jobs within their deadlines.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N \log N)$**  
  The dominant operation is sorting the jobs based on profit.

### Space Complexity:

- **Space Complexity: $O(N)$**  
Space is required for storing the scheduled jobs and available time slots.

### Example:

Consider the following jobs:

- Job 1: Deadline = 2, Profit = 100
- Job 2: Deadline = 1, Profit = 19
- Job 3: Deadline = 2, Profit = 27
- Job 4: Deadline = 1, Profit = 25
- Job 5: Deadline = 3, Profit = 15

1. **Sort Jobs** by profit:
   - Sorted jobs: [(1, 100), (3, 27), (4, 25), (2, 19), (3, 15)]

2. **Schedule Jobs**:
   - Job 1 (profit 100) → Time slot 2 (slot taken).
   - Job 3 (profit 27) → Time slot 1 (slot taken).
   - Job 4 (profit 25) cannot be scheduled as all slots are full.

The maximum profit is 100 + 27 = 127.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Job {
    int id;
    int deadline;
    int profit;
};

// Comparison function to sort jobs based on profit
bool jobComparison(Job a, Job b) {
    return (a.profit > b.profit);
}

int jobSequencing(vector<Job>& jobs) {
    sort(jobs.begin(), jobs.end(), jobComparison);

    int n = jobs.size();
    vector<int> result(n, -1); // To keep track of free time slots
    int totalProfit = 0;

    for (const auto& job : jobs) {
        // Find a free time slot for this job
        for (int j = min(n - 1, job.deadline - 1); j >= 0; j--) {
            if (result[j] == -1) { // If slot is free
                result[j] = job.id; // Assign job to this slot
                totalProfit += job.profit;
                break;
            }
        }
    }

    return totalProfit;
}

int main() {
    vector<Job> jobs = {{1, 2, 100}, {2, 1, 19}, {3, 2, 27}, {4, 1, 25}, {5, 3, 15}};
    cout << "Maximum Profit: " << jobSequencing(jobs) << endl;
    return 0;
}
```