---
id: first-come-first-served-scheduling
title: First Come First Served Scheduling Algorithm
sidebar_label: "First Come First Served Scheduling"
sidebar_position: 5
description: First Come First Served (FCFS) is a simple scheduling algorithm where processes are handled in the order they arrive, without priority.
tags: [Scheduling, FCFS]
---

# First Come First Served (FCFS) Scheduling Algorithm

## Introduction

The **First Come First Served (FCFS)** scheduling algorithm is one of the simplest process scheduling techniques used in operating systems. It handles processes in the order they arrive, ensuring that no process is preempted. Once a process starts executing, it runs to completion.

### Example

Consider three processes with the following duration times:
- Process 1: `19 units`
- Process 2: `8 units`
- Process 3: `9 units`

Using the FCFS algorithm, the processes will be executed in the order of their arrival.

## Problem Definition

Given a list of processes and their corresponding execution times, calculate the waiting times, turnaround times, average waiting time, and average turnaround time for the processes.

### Key Concepts

- **Waiting Time**: The amount of time a process spends waiting before it starts executing.
- **Turnaround Time**: The total time taken for a process from arrival to completion, which includes both the waiting time and the duration time.

## FCFS Scheduling Approach

In the FCFS algorithm:
- The waiting time for the first process is `0` because it starts immediately.
- For every subsequent process, its waiting time is the sum of the durations of all preceding processes.

## Code Implementation in Python

Below is the Python implementation for the FCFS scheduling algorithm:

```python
from __future__ import annotations

def calculate_wait_times(process_durations: list[int]) -> list[int]:
    """
    Calculate the waiting times for a list of processes given their duration times.
    The waiting time for the first process is 0, and for each subsequent process,
    it's the sum of the duration times of all previous processes.
    """
    wait_times = [0] * len(process_durations)
    for i in range(1, len(process_durations)):
        wait_times[i] = process_durations[i - 1] + wait_times[i - 1]
    return wait_times

def calculate_turnaround_times(process_durations: list[int], wait_times: list[int]) -> list[int]:
    """
    Calculate the turnaround times for a list of processes.
    Turnaround time is the sum of waiting time and duration time for each process.
    """
    return [process_durations[i] + wait_times[i] for i in range(len(process_durations))]

def calculate_avg_turnaround_time(turnaround_times: list[int]) -> float:
    """
    Calculate the average turnaround time for a list of processes.
    """
    return sum(turnaround_times) / len(turnaround_times)

def calculate_avg_wait_time(wait_times: list[int]) -> float:
    """
    Calculate the average waiting time for a list of processes.
    """
    return sum(wait_times) / len(wait_times)

if __name__ == "__main__":
    process_ids = [1, 2, 3]  # List of process IDs

    # The duration time for each process
    process_durations = [19, 8, 9]

    # Calculate waiting times and turnaround times
    wait_times = calculate_wait_times(process_durations)
    turnaround_times = calculate_turnaround_times(process_durations, wait_times)

    # Calculate average waiting time and average turnaround time
    avg_wait_time = calculate_avg_wait_time(wait_times)
    avg_turnaround_time = calculate_avg_turnaround_time(turnaround_times)

    # Display process details and calculated times
    print("Process ID\tDuration Time\tWaiting Time\tTurnaround Time")
    for i, process_id in enumerate(process_ids):
        print(f"{process_id}\t\t{process_durations[i]}\t\t{wait_times[i]}\t\t{turnaround_times[i]}")
    
    # Display averages
    print(f"Average waiting time = {avg_wait_time}")
    print(f"Average turnaround time = {avg_turnaround_time}")
```

### Explanation of the Code

1. **Waiting Time Calculation**:
   - The first process always has a waiting time of 0.
   - For subsequent processes, the waiting time is the sum of the durations of all previous processes.

2. **Turnaround Time Calculation**:
   - Turnaround time is calculated as the sum of the waiting time and the duration of each process.

3. **Average Times**:
   - The average waiting time and average turnaround time are calculated by taking the sum of the respective times and dividing by the total number of processes.

### Example Output

For the input where process durations are `[19, 8, 9]`, the output is as follows:

```plaintext
Process ID    Duration Time    Waiting Time    Turnaround Time
1             19               0               19
2             8                19              27
3             9                27              36

Average waiting time = 15.33
Average turnaround time = 27.33
```

### Time and Space Complexity

- **Time Complexity**: The time complexity is O(n) where n is the number of processes. Each function iterates through the process list once.
- **Space Complexity**: The space complexity is O(n) due to the storage of waiting times and turnaround times.

### Conclusion

The **First Come First Served (FCFS)** scheduling algorithm is simple and effective for non-preemptive tasks. While easy to implement, it may lead to long waiting times for processes that arrive later, especially if earlier processes have long durations (known as the convoy effect).