---
id: multilevel-queue-scheduling
title:  Multilevel Queue Scheduling Algorithm
sidebar_label: "🟢 Multilevel Queue Scheduling Algorithm"
sidebar_position: 7
description: An overview of  the Multilevel Queue Scheduling Algorithm and its applications in programming.
tags: [CPU Scheduling, algorithms, programming, queue]
---

Multilevel Queue Scheduling is a type of CPU scheduling algorithm where the processes are divided into multiple queues based on certain criteria (like process priority or memory size). Each queue can have its own scheduling algorithm, and processes do not move between queues.

- It is mainly used in systems that can separate processes into categories, such as real-time, system processes, or user processes.
- Each queue has a different priority level.

## Where It Is Used
- Real-time systems where priority segregation is needed.
- Time-sharing systems where interactive processes need faster responses.
- Systems where different types of processes (foreground, background, etc.) need to be handled differently.

## Steps to Perform Multilevel Queue Scheduling

1. **Divide Processes:** Split the processes into multiple queues based on their types, priorities, or other criteria.
2. **Assign Scheduling Algorithms:** Each queue may have a distinct scheduling algorithm (e.g., FIFO, Round Robin).
3. **Fixed Priority Scheduling:** Each queue is assigned a fixed priority. Higher-priority queues are executed before lower-priority ones.
4. **Execution:** Processes are executed from higher-priority queues first. If there is no process in the higher-priority queue, the scheduler executes processes from the lower-priority queues.

## Example

Consider a system with three queues:
- **Queue 1**: System processes (priority 1, uses FIFO)
- **Queue 2**: Interactive processes (priority 2, uses Round Robin)
- **Queue 3**: Batch processes (priority 3, uses Round Robin)

If there are no system processes, the CPU schedules processes from the interactive queue. If no interactive processes are present, it schedules batch processes.

## Time Complexity
- Best Case: O(1) per process
- Average Case: O(k + n)
- Worst Case: O(k * n)
where `k` is the number of queues and `n` is the total number of processes.

## Space Complexity
- O(n)
where `n` is the number of processes, as space is required to store the process details across the queues.

## Explanation
In Multilevel Queue Scheduling, the overall time complexity largely depends on the specific scheduling algorithm used in each individual queue. In the simplest implementation, selecting a process to execute takes `O(1)` time if the highest priority queue has ready processes. In the worst case, checking empty queues and managing context switches introduces overhead proportional to the number of queues `k`. The space complexity is `O(n)` to maintain the queues containing the different processes.## Advantages
- **Separation of Processes:** Processes with different requirements can be separated and handled by different scheduling algorithms.
- **Efficient for Real-Time Systems:** High-priority tasks can be executed immediately.
- **Customizability:** Each queue can have its own scheduling algorithm.

## Disadvantages
- **Rigid Queue Structure:** Processes cannot move between queues, which can lead to inefficiency.
- **Starvation Risk:** Lower-priority queues might starve if higher-priority queues are always full.
- **Complexity:** Managing multiple queues and algorithms increases complexity.

## C Implementation

```c
#include <stdio.h>

#define HIGH_PRIORITY 1
#define LOW_PRIORITY 2

struct process {
    int pid;
    int priority;
};

void multilevelQueueScheduling(struct process p[], int n) {
    printf("Scheduling high-priority processes (priority 1):\n");
    for (int i = 0; i < n; i++) {
        if (p[i].priority == HIGH_PRIORITY) {
            printf("Process %d is running\n", p[i].pid);
        }
    }

    printf("Scheduling low-priority processes (priority 2):\n");
    for (int i = 0; i < n; i++) {
        if (p[i].priority == LOW_PRIORITY) {
            printf("Process %d is running\n", p[i].pid);
        }
    }
}

int main() {
    struct process p[] = {{1, HIGH_PRIORITY}, {2, LOW_PRIORITY}, {3, HIGH_PRIORITY}, {4, LOW_PRIORITY}};
    int n = sizeof(p) / sizeof(p[0]);

    multilevelQueueScheduling(p, n);
    return 0;
}
```
## Python Implementation
```c
class Process:
    def __init__(self, pid, priority):
        self.pid = pid
        self.priority = priority

def multilevel_queue_scheduling(processes):
    print("Scheduling high-priority processes (priority 1):")
    for process in processes:
        if process.priority == 1:
            print(f"Process {process.pid} is running")

    print("Scheduling low-priority processes (priority 2):")
    for process in processes:
        if process.priority == 2:
            print(f"Process {process.pid} is running")

processes = [Process(1, 1), Process(2, 2), Process(3, 1), Process(4, 2)]
multilevel_queue_scheduling(processes)

```
## Java Implementation
```c
class Process {
    int pid;
    int priority;

    Process(int pid, int priority) {
        this.pid = pid;
        this.priority = priority;
    }
}

public class MultilevelQueueScheduling {
    public static void main(String[] args) {
        Process[] processes = {
            new Process(1, 1),
            new Process(2, 2),
            new Process(3, 1),
            new Process(4, 2)
        };

        System.out.println("Scheduling high-priority processes (priority 1):");
        for (Process p : processes) {
            if (p.priority == 1) {
                System.out.println("Process " + p.pid + " is running");
            }
        }

        System.out.println("Scheduling low-priority processes (priority 2):");
        for (Process p : processes) {
            if (p.priority == 2) {
                System.out.println("Process " + p.pid + " is running");
            }
        }
    }
}

```
