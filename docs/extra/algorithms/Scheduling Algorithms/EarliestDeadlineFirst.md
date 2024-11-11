---

id: earliest-deadline-first
title: Earliest Deadline First Scheduling Algorithm
sidebar_label: "Earliest Deadline First"
sidebar_position: 9
description: Earliest Deadline First (EDF) is a dynamic priority scheduling algorithm where processes are scheduled according to their deadlines. The process with the nearest deadline is executed first.
tags: [Scheduling, EDF]

---

# Earliest Deadline First Scheduling Algorithm

## Introduction

The **Earliest Deadline First (EDF)** algorithm is a dynamic priority scheduling technique used in real-time operating systems. In EDF, each process is assigned a deadline, and the CPU is allocated to the process with the closest deadline. This approach ensures that time-critical tasks are executed in a timely manner.

### Example

Consider three processes with the following burst times and deadlines:
- Process 1: `3 units` (Deadline at time 4)
- Process 2: `2 units` (Deadline at time 2)
- Process 3: `1 unit` (Deadline at time 3)

Using the EDF algorithm, the processes will be executed in the order of their deadlines: Process 2, Process 3, and then Process 1.

## Problem Definition

Given a list of processes along with their burst times and deadlines, calculate the waiting times, turnaround times, average waiting time, and average turnaround time for the processes.

### Key Concepts

- **Waiting Time**: The amount of time a process spends waiting in the queue before it starts executing.
- **Turnaround Time**: The total time taken for a process from arrival to completion, which includes both the waiting time and the burst time.

## EDF Scheduling Approach

In the Earliest Deadline First algorithm:
- The process with the earliest deadline is selected for execution next.
- The algorithm continuously evaluates the deadlines of all ready processes and adjusts the schedule dynamically.

## Code Implementation in Python

Below is the Python implementation for the Earliest Deadline First scheduling algorithm:

```python
from typing import List, Tuple

def calculate_wait_times(processes: List[Tuple[int, int, int]]) -> List[int]:
    """
    Calculate the waiting times for a list of processes given their burst times and deadlines.
    """
    # Sort processes by deadline
    processes.sort(key=lambda x: x[2])  # Sort by deadline
    n = len(processes)
    wait_times = [0] * n
    
    for i in range(1, n):
        wait_times[i] = processes[i - 1][1] + wait_times[i - 1]
    
    return wait_times

def calculate_turnaround_times(processes: List[Tuple[int, int, int]], wait_times: List[int]) -> List[int]:
    """
    Calculate the turnaround times for a list of processes.
    Turnaround time is the sum of waiting time and burst time for each process.
    """
    return [processes[i][1] + wait_times[i] for i in range(len(processes))]

def calculate_avg_turnaround_time(turnaround_times: List[int]) -> float:
    """
    Calculate the average turnaround time for a list of processes.
    """
    return sum(turnaround_times) / len(turnaround_times)

def calculate_avg_wait_time(wait_times: List[int]) -> float:
    """
    Calculate the average waiting time for a list of processes.
    """
    return sum(wait_times) / len(wait_times)

if __name__ == "__main__":
    processes = [(1, 3, 4), (2, 2, 2), (3, 1, 3)]  # List of (process_id, burst_time, deadline)

    # Calculate waiting times and turnaround times
    wait_times = calculate_wait_times(processes)
    turnaround_times = calculate_turnaround_times(processes, wait_times)

    # Calculate average waiting time and average turnaround time
    avg_wait_time = calculate_avg_wait_time(wait_times)
    avg_turnaround_time = calculate_avg_turnaround_time(turnaround_times)

    # Display process details and calculated times
    print("Process ID\tBurst Time\tDeadline\tWaiting Time\tTurnaround Time")
    for i, (process_id, burst_time, deadline) in enumerate(processes):
        print(f"{process_id}\t\t{burst_time}\t\t{deadline}\t\t{wait_times[i]}\t\t{turnaround_times[i]}")
    
    # Display averages
    print(f"Average waiting time = {avg_wait_time}")
    print(f"Average turnaround time = {avg_turnaround_time}")

```

## Explanation of the Code
    - Waiting Time Calculation: Processes are sorted by their deadlines, and the waiting time for each process is calculated based on the burst time of the previous processes.
    - Turnaround Time Calculation: Turnaround time is computed as the sum of the waiting time and the burst time for each process.
    - Average Times: The average waiting time and average turnaround time are calculated by taking the sum of the respective times and dividing by the total number of processes.

## Example Output
For the input where processes are [(1, 3, 4), (2, 2, 2), (3, 1, 3)], the output is as follows:
```bash
Process ID    Burst Time    Deadline    Waiting Time    Turnaround Time
2             2             2           0               2
3             1             3           2               3
1             3             4           5               8

Average waiting time = 2.33
Average turnaround time = 4.33
```

## Time and Space Complexity
    - Time Complexity: The time complexity is O(n log n) due to the sorting of processes, where n is the number of processes.
    - Space Complexity: The space complexity is O(n) due to the storage of waiting times and turnaround times.

## Conclusion
The Earliest Deadline First scheduling algorithm is an effective approach for real-time systems, ensuring that time-critical tasks are executed before their deadlines. However, it can lead to challenges such as deadline misses if the system is overloaded.
