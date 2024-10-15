---

id: multilevel-queue-scheduling
title: Multilevel Queue Scheduling Algorithm
sidebar_label: "Multilevel Queue Scheduling"
sidebar_position: 8
description: Multilevel Queue Scheduling is a scheduling algorithm that segregates processes into different queues based on their priority or type, each with its own scheduling algorithm.
tags: [Scheduling, Multilevel Queue]

---

# Multilevel Queue Scheduling Algorithm

## Introduction

The **Multilevel Queue Scheduling** algorithm is a process scheduling technique that partitions the ready queue into multiple separate queues, each serving different types of processes based on priority or process characteristics (e.g., foreground vs. background tasks). Each queue may employ its own scheduling algorithm, which allows for optimized performance based on the type of processes in that queue.

### Example

Consider three different queues:
- **Foreground Queue** (higher priority, uses Round Robin):
  - Process A: `5 units`
  - Process B: `3 units`
  
- **Background Queue** (lower priority, uses FCFS):
  - Process C: `10 units`
  - Process D: `4 units`

In this scenario, the scheduler may execute Process A and B using Round Robin for the foreground, while Processes C and D will be scheduled in the order they arrive.

## Problem Definition

Given a list of processes along with their burst times and types, calculate the waiting times, turnaround times, average waiting time, and average turnaround time for the processes based on their assigned queues.

### Key Concepts

- **Waiting Time**: The amount of time a process spends waiting in the queue before it gets CPU time.
- **Turnaround Time**: The total time taken for a process from arrival to completion, which includes both the waiting time and the burst time.

## Multilevel Queue Scheduling Approach

In the Multilevel Queue Scheduling algorithm:
- Processes are classified into different queues based on their priority or type.
- Each queue is scheduled with its own algorithm (e.g., Round Robin for interactive processes, FCFS for batch processes).
- The scheduler decides the order of execution based on the priority of the queues.

## Code Implementation in Python

Below is a Python implementation for the Multilevel Queue Scheduling algorithm:

```python
from typing import List, Tuple

def calculate_wait_times_fcfs(processes: List[Tuple[int, int]]) -> List[int]:
    """Calculate the waiting times for a FCFS queue."""
    wait_times = [0] * len(processes)
    for i in range(1, len(processes)):
        wait_times[i] = processes[i - 1][1] + wait_times[i - 1]
    return wait_times

def calculate_wait_times_rr(processes: List[Tuple[int, int]], quantum: int) -> List[int]:
    """Calculate the waiting times for a Round Robin queue."""
    n = len(processes)
    wait_times = [0] * n
    remaining_time = [p[1] for p in processes]
    t = 0

    while True:
        done = True
        for i in range(n):
            if remaining_time[i] > 0:
                done = False
                if remaining_time[i] > quantum:
                    t += quantum
                    remaining_time[i] -= quantum
                else:
                    t += remaining_time[i]
                    wait_times[i] = t - processes[i][1]
                    remaining_time[i] = 0
        if done:
            break
    return wait_times

if __name__ == "__main__":
    # Foreground processes for Round Robin
    fg_processes = [(1, 5), (2, 3)]  # (Process ID, Burst Time)
    fg_quantum = 2  # Quantum for Round Robin

    # Background processes for FCFS
    bg_processes = [(3, 10), (4, 4)]

    # Calculate waiting times for foreground (Round Robin)
    fg_wait_times = calculate_wait_times_rr(fg_processes, fg_quantum)
    
    # Calculate waiting times for background (FCFS)
    bg_wait_times = calculate_wait_times_fcfs(bg_processes)

    print("Foreground Processes (Round Robin):")
    for i, (process_id, burst_time) in enumerate(fg_processes):
        print(f"Process ID: {process_id}, Waiting Time: {fg_wait_times[i]}")

    print("\nBackground Processes (FCFS):")
    for i, (process_id, burst_time) in enumerate(bg_processes):
        print(f"Process ID: {process_id}, Waiting Time: {bg_wait_times[i]}")

```

### Explanation of the Code
    - Waiting Time Calculation for FCFS: The waiting time for each process is calculated based on the burst time of the previous processes in the queue.
    - Waiting Time Calculation for Round Robin: A quantum time is used to allow each process a slice of CPU time, adjusting their remaining time accordingly.
    - Process Classification: Processes are divided into foreground and background based on their type and are handled using different algorithms.

*** Example Output ***
- For the input where foreground processes are [(1, 5), (2, 3)] and background processes are [(3, 10), (4, 4)], the output is as follows:
```bash
Foreground Processes (Round Robin):
Process ID: 1, Waiting Time: 0
Process ID: 2, Waiting Time: 3

Background Processes (FCFS):
Process ID: 3, Waiting Time: 0
Process ID: 4, Waiting Time: 10

```

### Time and Space Complexity
    - Time Complexity: The time complexity depends on the scheduling algorithms used for each queue. For FCFS, it's O(n). For Round Robin, it may be O(n^2) in the worst case.
    - Space Complexity: The space complexity is O(n) for storing waiting times.

### Conclusion
    - The Multilevel Queue Scheduling algorithm effectively manages different types of processes by categorizing them into queues and using tailored scheduling algorithms. This approach optimizes CPU usage while accommodating various process requirements.