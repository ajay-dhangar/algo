---

id: job-sequencing  
title: Job Sequencing Algorithm  
sidebar_label: Job Sequencing  
description: "In this blog post, we'll explore the Job Sequencing problem, a classical greedy algorithm that schedules jobs within their deadlines to maximize profit."  
tags: [dsa, algorithms, greedy algorithms, scheduling]

---

### Definition:

Job Sequencing is a problem in which we aim to schedule a set of jobs, each with a deadline and profit, to maximize the total profit while ensuring that all scheduled jobs are completed before their respective deadlines. It uses a greedy approach to prioritize jobs with higher profits and attempts to place each job within the latest possible available time slot, avoiding conflicts.

### Characteristics:

- **Greedy Approach**:  
  Job Sequencing employs a greedy strategy to maximize profit. It first sorts the jobs by their profits in descending order, then attempts to assign each job to a time slot before its deadline if available.

1. **Sort by Profit**:  
   Arrange the jobs in descending order of profit, prioritizing higher-profit jobs.

2. **Assign Jobs to Slots**:  
   For each job, try to assign it to the latest available slot before its deadline. If no such slot is free, discard the job.

3. **Maximize Profit**:  
   By selecting jobs with the highest profit first and assigning them to valid slots, the algorithm ensures that the total profit is maximized.

### Problem Statement:

Given `N` jobs, where each job has a profit and a deadline, the goal is to schedule as many jobs as possible such that each job is finished before its deadline and the total profit is maximized.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N \log N)$**  
  Sorting the jobs by profit takes $O(N \log N)$. Assigning each job to a slot takes $O(N)$ in the worst case, making the overall time complexity $O(N \log N)$.

### Space Complexity:

- **Space Complexity: $O(N)$**  
  The space complexity is $O(N)$ due to the storage needed for tracking available slots and storing the job sequence.

### Example:

Consider the following input:

Jobs: `{Job1, Job2, Job3, Job4, Job5}`  
Deadlines: `{2, 1, 2, 1, 3}`  
Profits: `{100, 19, 27, 25, 15}`  

Step-by-Step Execution:

1. **Sort by Profit**:  
   Arrange jobs in descending order of profit:
   - `Job1(100), Job3(27), Job4(25), Job2(19), Job5(15)`

2. **Assign Jobs to Slots**:
   - Assign `Job1` to the latest available slot before its deadline (Slot 2).
   - Assign `Job3` to the latest available slot before its deadline (Slot 2 is taken, assign to Slot 1).
   - Assign `Job4` to the latest available slot before its deadline (Slot 1 is taken, discard).
   - Assign `Job2` to Slot 1 (Slot 1 is taken, discard).
   - Assign `Job5` to Slot 3.

3. **Final Sequence**:
   - Job Sequence: `{Job3, Job1, Job5}`  
   - Total Profit: $27 + 100 + 15 = 142$

### C++ Implementation:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// A structure to represent a job
struct Job {
    int id;     // Job ID
    int deadline; // Deadline of job
    int profit;  // Profit if the job is completed
};

// Function to schedule jobs to maximize profit
bool comparison(Job a, Job b) {
    return (a.profit > b.profit);
}

void jobSequencing(Job arr[], int n) {
    // Sort jobs by decreasing order of profit
    sort(arr, arr + n, comparison);

    int result[n];  // To store result (sequence of jobs)
    bool slot[n];   // To keep track of free time slots

    // Initialize all slots as free
    for (int i = 0; i < n; i++) slot[i] = false;

    // Iterate through all given jobs
    for (int i = 0; i < n; i++) {
        // Find a free slot for this job (starting from the last possible slot)
        for (int j = min(n, arr[i].deadline) - 1; j >= 0; j--) {
            // If the slot is free, assign this job to the slot
            if (slot[j] == false) {
                result[j] = i;  // Add this job to result
                slot[j] = true;  // Mark this slot as occupied
                break;
            }
        }
    }

    // Print the result
    for (int i = 0; i < n; i++) {
        if (slot[i]) {
            cout << "Job " << arr[result[i]].id << " ";
        }
    }
    cout << endl;
}

int main() {
    Job arr[] = { {1, 2, 100}, {2, 1, 19}, {3, 2, 27}, {4, 1, 25}, {5, 3, 15} };
    int n = sizeof(arr) / sizeof(arr[0]);
    jobSequencing(arr, n);
    return 0;
}
```

### Summary:

Job Sequencing is an efficient greedy algorithm for scheduling jobs with deadlines to maximize profit. By selecting jobs in descending order of profit and assigning them to the latest possible time slots, it ensures maximum profit. The time complexity of the algorithm is $O(N \log N)$, making it suitable for practical scheduling and optimization problems in various fields like production management and task scheduling.

