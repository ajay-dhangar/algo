---
id: Priority-Scheduling
title: Priority Scheduling
sidebar_label: "Priority Scheduling"
sidebar_position: 6
description: An overview of Priority Scheduling and its applications in programming.
tags: [CPU Scheduling, algorithms, programming, priority]
---

# Priority Scheduling

**Priority Scheduling** is a CPU scheduling algorithm where each process is assigned a priority, and the CPU is allocated to the process with the highest priority. The process with the highest priority gets executed first. If two processes have the same priority, a scheduling algorithm like FCFS (First-Come, First-Serve) or Round Robin is used to break the tie.

## Steps of Priority Scheduling:
1. **Assign Priority**: Each process in the queue is assigned a priority value.
2. **Sort Processes**: Sort the processes based on their priority.
3. **Execute Process**: Allocate CPU to the process with the highest priority.
4. **Re-Evaluate Priorities**: When a process completes or is preempted, re-evaluate the remaining processes and pick the next highest-priority process.
5. **Handle Ties**: If two processes have the same priority, handle them using another scheduling technique (like FCFS).

There are two types of Priority Scheduling:
- **Preemptive**: The currently executing process can be preempted if a new process with a higher priority arrives.
- **Non-preemptive**: The currently executing process finishes before a new process can start, even if a higher-priority process arrives.

---

## Example of Priority Scheduling:

### Example Process Table

| Process | Arrival Time | Burst Time | Priority |
|---------|--------------|------------|----------|
| P1      | 0            | 10         | 3        |
| P2      | 1            | 1          | 1        |
| P3      | 2            | 2          | 4        |
| P4      | 3            | 1          | 5        |

### Non-Preemptive Priority Scheduling

- At time 0, P1 arrives, but P2 arrives at time 1 with a higher priority. So P2 executes first.
- After P2 finishes, P1 resumes execution.
- After P1 finishes, P3 executes as it has a higher priority than P4.

**Gantt Chart**:
**| P2 | P1 | P3 | P4 |**


---

## Time Complexity Analysis

### Best Case Time Complexity: **O(n log n)**

- Sorting the processes based on priority will take **O(n log n)**.
- In the best case, if no new higher-priority processes arrive during execution, we only need to sort and then execute sequentially.

**Best Case Example**:
If all processes arrive at the same time and are already sorted by priority.

### Worst Case Time Complexity: **O(n²)**

- In the worst case (especially for preemptive scheduling), a new process with a higher priority arrives just before the current process finishes. This requires frequent preemption, and the process list must be updated multiple times, resulting in **O(n²)**.

**Worst Case Example**:
Each time a process is about to finish, a higher-priority process arrives, causing frequent preemption.

---

## Advantages of Priority Scheduling
1. **Efficient Handling of Critical Tasks**: Higher-priority tasks (e.g., system-critical processes) get CPU time first.
2. **Flexible**: Can handle a variety of systems by dynamically changing priority values.
3. **Preemption Capability**: Preemptive priority scheduling can ensure that important processes are not starved for resources.

## Disadvantages of Priority Scheduling
1. **Starvation**: Lower-priority processes may never get CPU time if higher-priority processes keep arriving.
2. **Complexity**: Dynamically adjusting priorities can increase system complexity.
3. **Indefinite Blocking**: A lower-priority process may never get executed if new, higher-priority processes keep arriving.

---

## Implementation of Priority Scheduling

### C Implementation

```c
#include <stdio.h>

struct Process {
    int id;
    int burstTime;
    int priority;
};

void priorityScheduling(struct Process processes[], int n) {
    struct Process temp;
    
    // Sort based on priority
    for (int i = 0; i < n - 1; i++) {
        for (int j = i + 1; j < n; j++) {
            if (processes[i].priority > processes[j].priority) {
                temp = processes[i];
                processes[i] = processes[j];
                processes[j] = temp;
            }
        }
    }
    
    printf("Process Execution Order:\n");
    for (int i = 0; i < n; i++) {
        printf("P%d (Priority: %d)\n", processes[i].id, processes[i].priority);
    }
}

int main() {
    struct Process processes[] = {{1, 10, 3}, {2, 1, 1}, {3, 2, 4}, {4, 1, 5}};
    int n = sizeof(processes) / sizeof(processes[0]);
    
    priorityScheduling(processes, n);
    return 0;
}
```
# 2) Python Implementation
```c


class Process:
    def __init__(self, pid, burst_time, priority):
        self.pid = pid
        self.burst_time = burst_time
        self.priority = priority

def priority_scheduling(processes):
    # Sort processes based on priority
    processes.sort(key=lambda x: x.priority)
    
    print("Process Execution Order:")
    for process in processes:
        print(f"P{process.pid} (Priority: {process.priority})")

processes = [
    Process(1, 10, 3),
    Process(2, 1, 1),
    Process(3, 2, 4),
    Process(4, 1, 5)
]

priority_scheduling(processes)
```

# 3) Java Implementation

```c
import java.util.Arrays;

class Process {
    int pid;
    int burstTime;
    int priority;

    Process(int pid, int burstTime, int priority) {
        this.pid = pid;
        this.burstTime = burstTime;
        this.priority = priority;
    }
}

public class PriorityScheduling {
    public static void priorityScheduling(Process[] processes) {
        Arrays.sort(processes, (p1, p2) -> p1.priority - p2.priority);

        System.out.println("Process Execution Order:");
        for (Process p : processes) {
            System.out.println("P" + p.pid + " (Priority: " + p.priority + ")");
        }
    }

    public static void main(String[] args) {
        Process[] processes = {
            new Process(1, 10, 3),
            new Process(2, 1, 1),
            new Process(3, 2, 4),
            new Process(4, 1, 5)
        };

        priorityScheduling(processes);
    }
}

```
