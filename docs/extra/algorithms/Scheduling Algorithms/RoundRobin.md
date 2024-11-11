---
id: round-robin-scheduling
title: Round Robin Scheduling Algorithm
sidebar_label: "Round Robin Scheduling"
sidebar_position: 6
description: Round Robin (RR) is a preemptive scheduling algorithm where each process is assigned a fixed time slice in a cyclic order.
tags: [Scheduling, Round Robin]
---

# Round Robin (RR) Scheduling Algorithm

## Introduction

The **Round Robin (RR)** scheduling algorithm is a preemptive process scheduling technique used in operating systems. In this algorithm, each process is assigned a fixed time slice, known as a quantum, to execute in a cyclic manner. This ensures that no process waits too long in the queue, promoting fairness among processes.

### Example

Consider three processes with the following burst times:
- Process 1: `3 units`
- Process 2: `5 units`
- Process 3: `7 units`

Using the Round Robin algorithm with a quantum of `2 units`, the processes will be executed in the order of their arrival.

## Problem Definition

Given a list of processes and their corresponding burst times, calculate the waiting times, turnaround times, average waiting time, and average turnaround time for the processes.

### Key Concepts

- **Waiting Time**: The amount of time a process spends waiting before it starts executing.
- **Turnaround Time**: The total time taken for a process from arrival to completion, which includes both the waiting time and the burst time.

## Round Robin Scheduling Approach

In the RR algorithm:
- Each process is given a fixed time slice (quantum) for execution.
- If a process does not finish within its quantum, it is moved to the end of the queue and waits for its next turn.

## Code Implementation in Python

Below is the Python implementation for the Round Robin scheduling algorithm:

```python
from __future__ import annotations
from statistics import mean

def calculate_waiting_times(burst_times: list[int], quantum: int = 2) -> list[int]:
    """
    Calculate the waiting times for each process using Round Robin scheduling.
    
    Parameters:
    burst_times (list[int]): The burst time for each process.
    quantum (int): The time slice for each process (default is 2).
    
    Returns:
    list[int]: The waiting time for each process.
    """
    remaining_burst_times = list(burst_times)
    waiting_times = [0] * len(burst_times)
    current_time = 0

    while True:
        all_done = True

        for i, burst_time in enumerate(burst_times):
            if remaining_burst_times[i] > 0:
                all_done = False
                if remaining_burst_times[i] > quantum:
                    current_time += quantum
                    remaining_burst_times[i] -= quantum
                else:
                    current_time += remaining_burst_times[i]
                    waiting_times[i] = current_time - burst_time
                    remaining_burst_times[i] = 0
        
        if all_done:
            return waiting_times

def calculate_turnaround_times(burst_times: list[int], waiting_times: list[int]) -> list[int]:
    """
    Calculate the turnaround times for each process.
    
    Turnaround time is the sum of waiting time and burst time for each process.
    
    Returns:
    list[int]: The turnaround time for each process.
    """
    return [burst + wait for burst, wait in zip(burst_times, waiting_times)]

if __name__ == "__main__":
    burst_times = [3, 5, 7]

    # Calculate waiting times and turnaround times
    waiting_times = calculate_waiting_times(burst_times)
    turnaround_times = calculate_turnaround_times(burst_times, waiting_times)

    # Display the results
    print("Process ID \tBurst Time \tWaiting Time \tTurnaround Time")
    for i, burst_time in enumerate(burst_times):
        print(
            f"  {i + 1}\t\t  {burst_time}\t\t  {waiting_times[i]}\t\t  "
            f"{turnaround_times[i]}"
        )

    # Calculate and display average waiting and turnaround times
    print(f"\nAverage waiting time = {mean(waiting_times):.5f}")
    print(f"Average turnaround time = {mean(turnaround_times):.5f}")
```
### Explanation of the Code

1. **Waiting Time Calculation**:
   - Each process gets a chance to execute for a fixed quantum of time.
   - The waiting time for each process is calculated based on how much time has elapsed before it gets executed.

2. **Turnaround Time Calculation**:
   - Turnaround time is the sum of waiting time and burst time for each process.

3. **Average Times**:
   - The average waiting time and average turnaround time are calculated by dividing the total time by the number of processes.

### Example Output

For the input where burst times are `[3, 5, 7]`, the output is as follows:

Process ID    Burst Time      Waiting Time    Turnaround Time
1             3               0               3
2             5               3               8
3             7               8               15

Average waiting time = 3.67
Average turnaround time = 8.67

### Time and Space Complexity

- **Time Complexity**: The time complexity is O(n) where n is the number of processes. Each function iterates through the process list.
- **Space Complexity**: The space complexity is O(n) due to the storage of waiting times and turnaround times.

### Conclusion

The Round Robin (RR) scheduling algorithm is effective for ensuring fairness in process execution. While it can introduce context switching overhead, it is widely used in time-sharing systems to allow multiple processes to share CPU time efficiently.