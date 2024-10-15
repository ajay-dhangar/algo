# Multilevel Queue Scheduling Algorithm

## Definition
Multilevel Queue Scheduling is a type of CPU scheduling algorithm where the processes are divided into multiple queues based on certain criteria (like process priority or memory size). Each queue can have its own scheduling algorithm, and processes do not move between queues.

- It is mainly used in systems that can clearly separate processes into categories, such as real-time, system processes, or user processes.
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

## Time Complexity Analysis

### Best Case Scenario:
In the best case, all processes are in the highest-priority queue, which allows the CPU to execute them without needing to check other queues. For example:

#### Example:
Let's say there are 3 queues:
- **Queue 1**: 5 high-priority processes (using FIFO)
- **Queue 2**: 3 medium-priority processes (using Round Robin)
- **Queue 3**: 2 low-priority processes (using Round Robin)

If all processes are in **Queue 1**, the CPU only needs to execute the processes in that queue without checking the other queues.

- **Time Complexity (Best Case):** `O(1)` for each process, because the scheduler simply picks the next process in **Queue 1** (using FIFO). 
- For **n** processes in the highest-priority queue, the complexity is `O(n)`.

### Worst Case Scenario:
In the worst case, the CPU has to check multiple queues and switch between different scheduling algorithms.

#### Example:
Let's consider the same three queues:
- **Queue 1**: Empty
- **Queue 2**: 3 medium-priority processes (Round Robin)
- **Queue 3**: 2 low-priority processes (Round Robin)

Here, the CPU first checks **Queue 1**, finds it empty, and then moves to **Queue 2**. After executing a process in **Queue 2**, it may have to perform a context switch and check **Queue 3** if all processes in **Queue 2** have finished. This adds overhead.

- **Time Complexity (Worst Case):** 
    - The worst-case complexity arises from checking multiple queues and handling context switches between different queues and scheduling algorithms. This can be **O(n)** per queue.
    - For **k** queues with **n** processes spread across them, the worst-case time complexity could be **O(k × n)**.

#### Detailed Worst Case Example:
- **Queue 1**: Empty
- **Queue 2**: 3 processes with Round Robin scheduling.
- **Queue 3**: 2 processes with Round Robin scheduling.

At each step:
1. CPU checks **Queue 1** → Empty (Time: O(1))
2. CPU checks **Queue 2** → Executes a process (Time: O(1))
3. CPU checks **Queue 3** → Executes a process (Time: O(1))

Total checks across **k** queues with **n** processes lead to **O(k × n)**, where **k** is the number of queues.




## Advantages
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