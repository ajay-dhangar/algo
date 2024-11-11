---
id: job-scheduling  
title: Job Scheduling with Deadline  
sidebar_label: Job-Scheduling  
description: "The problem aims to maximize total profit by scheduling a set of jobs, each with a deadline and profit, ensuring selected jobs are completed within their deadlines."  
tags: [dsa, algorithms, greedy algorithms]
---

### Definition:
The Job Scheduling problem is a classical optimization problem where a set of jobs needs to be scheduled such that the profit is maximized. Each job has:
- A deadline by which it must be completed.
- A profit associated with it.

### Problem Statement:
Given n jobs, each with a deadline and a profit, the objective is to maximize the total profit by selecting jobs that can be completed within their deadlines.

### Approach:
The algorithm uses a greedy approach where jobs are sorted in decreasing order of their profits. We then try to schedule jobs in the latest possible time slots before their deadline, filling up the schedule greedily to maximize profit.

### Algorithm Steps:

1. Sort all jobs in descending order of profit.
2. Iterate over the sorted jobs and attempt to schedule them in the latest available time slot before their deadline.
3. Print the job sequence that maximizes the profit.

### Steps Involved:
1. **Structure definition**:  
    Explained each field in the Job struct.
   
2. **Comparison function**:  
    Described its purpose for sorting jobs by profit.
   
3. **Main Function**:  
   - Initialization of job list and user input.             
   - Sorting and slot allocation logic.
4. **Result output**:
    Displays the job sequence that maximizes profit.


### Time Complexity:
- Sorting the jobs: Sorting n jobs based on their profit takes `O(n log n)` time.
  Scheduling the jobs: For each job, we try to find an available slot in `O(n)` time. Therefore, the total time complexity for scheduling is O(n^2).
  Thus, the overall time complexity is `O(n log n + n^2)`, where n is the number of jobs.

### Sample Input:

Enter the number of jobs: 4            
Enter job details (id, deadline, profit) for each job:             
Job 1: a 4 20            
Job 2: b 1 10               
Job 3: c 1 40            
Job 4: d 1 30            

### Sample Output:

Following is the maximum profit sequence of Jobs:
c a

### Explanation of Sample:

Job c has the highest profit and is scheduled first.
Job d is scheduled next as it also has a high profit but must be done before its deadline.
Job a is scheduled because there is a remaining slot before its deadline.
Job b is not scheduled because its profit is lower, and no slots are available before its deadline.


### C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// Structure to represent a job with an ID, deadline, and profit
struct Job {
    char id;     // Job ID
    int dead;    // Deadline for job completion
    int profit;  // Profit if job is completed before or on deadline
};

// Comparison function to sort jobs in descending order of profit
bool compare(const Job &a, const Job &b) {
    return a.profit > b.profit;
}

// Function to find the minimum of two numbers
int min(int num1, int num2) {
    return (num1 > num2) ? num2 : num1;
}

int main() {
    int n;
    std::cout << "Enter the number of jobs: ";
    std::cin >> n;
    
    // Vector to store the list of jobs
    std::vector<Job> jobs(n);
    std::cout << "Enter job details (id, deadline, profit) for each job:\n";
    for (int i = 0; i < n; ++i) {
        std::cout << "Job " << i + 1 << ": ";
        std::cin >> jobs[i].id >> jobs[i].dead >> jobs[i].profit;
    }

    // Display the sequence of jobs that maximize profit
    std::cout << "Following is the maximum profit sequence of jobs:\n";

    // Sort jobs by profit in descending order
    std::sort(jobs.begin(), jobs.end(), compare);

    // Vector to store the result (sequence of job IDs)
    std::vector<int> result(n, -1);
    // Boolean vector to keep track of occupied time slots
    std::vector<bool> slot(n, false);

    // Iterate through all jobs
    for (int i = 0; i < n; ++i) {
        // Find a free slot for this job, checking from the last possible slot
        for (int j = min(n, jobs[i].dead) - 1; j >= 0; --j) {
            if (!slot[j]) {  // If slot is free
                result[j] = i; // Assign this job to the slot
                slot[j] = true; // Mark the slot as occupied
                break;
            }
        }
    }

    // Print the sequence of job IDs for maximum profit
    for (int i = 0; i < n; ++i) {
        if (slot[i]) {
            std::cout << jobs[result[i]].id << " ";
        }
    }
    
    return 0;
}

```

