---
id: shortest-job-remaining-first-scheduling
title: Shortest Job Remaining First Scheduling Algorithm
sidebar_label: "Shortest Job Remaining First Scheduling"
sidebar_position: 6
description: Shortest Job Remaining First (SJR) is a preemptive scheduling algorithm that selects the process with the smallest remaining time to execute next.
tags: [Scheduling, SJR]
---

# Shortest Job Remaining First (SJR) Scheduling Algorithm

## Introduction

The **Shortest Job Remaining First (SJR)** scheduling algorithm is a preemptive scheduling technique used in operating systems. It selects the process with the smallest remaining burst time to execute next, allowing for efficient handling of processes with varying execution times.

### Example

Consider four processes with the following arrival and burst times:
- Process 1: Arrival time `1`, Burst time `3`
- Process 2: Arrival time `2`, Burst time `3`
- Process 3: Arrival time `3`, Burst time `5`
- Process 4: Arrival time `4`, Burst time `1`

Using the SJR algorithm, the processes will be executed based on their remaining times and arrival sequence.

## Problem Definition

Given a list of processes with their corresponding arrival times and burst times, calculate the waiting times, turnaround times, average waiting time, and average turnaround time for the processes.

### Key Concepts

- **Waiting Time**: The amount of time a process spends waiting before it starts executing.
- **Turnaround Time**: The total time taken for a process from arrival to completion, which includes both the waiting time and burst time.

## SJR Scheduling Approach

In the SJR algorithm:
- The waiting time is calculated based on the execution order of the processes with the shortest remaining time.
- Processes can be preempted if a newly arriving process has a shorter burst time than the remaining time of the currently executing process.

## Code Implementation in Python

Below is the Python implementation for the SJR scheduling algorithm:

```python
from __future__ import annotations
import pandas as pd

def calculate_waiting_time(arrival_time: list[int], burst_time: list[int], num_processes: int) -> list[int]:
    remaining_time = burst_time.copy()
    waiting_time = [0] * num_processes
    
    completed_processes = 0
    current_time = 0
    min_remaining_time = float('inf')
    shortest_process = 0
    process_found = False

    while completed_processes != num_processes:
        for j in range(num_processes):
            if (arrival_time[j] <= current_time and remaining_time[j] > 0 
                and remaining_time[j] < min_remaining_time):
                min_remaining_time = remaining_time[j]
                shortest_process = j
                process_found = True

        if not process_found:
            current_time += 1
            continue
        
        remaining_time[shortest_process] -= 1
        
        min_remaining_time = remaining_time[shortest_process]
        if min_remaining_time == 0:
            min_remaining_time = float('inf')

        if remaining_time[shortest_process] == 0:
            completed_processes += 1
            finish_time = current_time + 1
            waiting_time[shortest_process] = finish_time - arrival_time[shortest_process] - burst_time[shortest_process]
            waiting_time[shortest_process] = max(waiting_time[shortest_process], 0)

        current_time += 1
    
    return waiting_time

def calculate_turnaround_time(burst_time: list[int], num_processes: int, waiting_time: list[int]) -> list[int]:
    return [burst + wait for burst, wait in zip(burst_time, waiting_time)]

def calculate_average_times(waiting_time: list[int], turnaround_time: list[int], num_processes: int) -> None:
    total_waiting_time = sum(waiting_time)
    total_turnaround_time = sum(turnaround_time)
    print(f"Average waiting time = {total_waiting_time / num_processes:.5f}")
    print("Average turnaround time =", total_turnaround_time / num_processes)

if __name__ == "__main__":
    print("Enter how many processes you want to analyze:")
    num_processes = int(input())
    burst_time = [0] * num_processes
    arrival_time = [0] * num_processes
    processes = list(range(1, num_processes + 1))

    for i in range(num_processes):
        print("Enter the arrival time and burst time for process:", i + 1)
        arrival_time[i], burst_time[i] = map(int, input().split())

    waiting_time = calculate_waiting_time(arrival_time, burst_time, num_processes)
    turnaround_time = calculate_turnaround_time(burst_time, num_processes, waiting_time)

    calculate_average_times(waiting_time, turnaround_time, num_processes)

    fcfs = pd.DataFrame(
        list(zip(processes, burst_time, arrival_time, waiting_time, turnaround_time)),
        columns=[
            "Process",
            "Burst Time",
            "Arrival Time",
            "Waiting Time",
            "Turnaround Time",
        ],
    )

    pd.set_option("display.max_rows", fcfs.shape[0] + 1)
    print(fcfs)
```

# Explanation of the Code

## Waiting Time Calculation

The waiting time is calculated by tracking the remaining times of each process as they are executed in order of their shortest remaining time.

## Turnaround Time Calculation

Turnaround time is calculated as the sum of waiting time and burst time for each process.

## Average Times

The average waiting time and turnaround time are printed by dividing the total by the number of processes.

## Example Output

For the input where the arrival and burst times are:

- **Arrival Time**: `[1, 2, 3, 4]`
- **Burst Time**: `[3, 3, 5, 1]`

The output will display the waiting and turnaround times, as well as the average values for all processes.

## Time and Space Complexity

- **Time Complexity**: The time complexity is O(n²) due to the nested loops for finding the shortest job remaining.
- **Space Complexity**: The space complexity is O(n) for storing waiting times and turnaround times.

## Conclusion

The **Shortest Job Remaining First (SJR)** scheduling algorithm effectively minimizes waiting times for processes by executing the shortest jobs first. However, it may lead to **starvation** for longer processes if shorter jobs continue to arrive.