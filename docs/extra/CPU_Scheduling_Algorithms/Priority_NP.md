---
id: non-preemptive-priority-cpu-scheduling
title: Non-Preemptive Priority CPU Scheduling Algorithm
sidebar_label: "Non-Preemptive Priority CPU Scheduling Algorithm"
sidebar_position: 3
description: Non-Preemptive Priority is a scheduling algorithm where each process is assigned a priority, and the CPU is allocated to the process with the highest priority.
tags: [CPU Scheduling, Priority, Algorithm]
---

# Priority Scheduling (Non-Preemptive)

## 1. Introduction

Priority Scheduling is a CPU scheduling algorithm in which each process is assigned a priority value. The CPU is allocated to the process with the highest priority among the processes present in the ready queue.

In non-preemptive priority scheduling, once a process begins execution, it continues until completion even if a higher-priority process arrives later.

## 2. How It Works

- Each process is assigned a priority level.
- When the CPU becomes available, the scheduler selects the highest-priority process.
- If multiple processes have the same priority, FCFS is usually used to break the tie.
- The selected process runs until completion.

## 3. Advantages

- Important processes can be executed before less important ones.
- Provides flexibility by allowing different priority levels.
- Suitable for systems where certain tasks require faster execution.

## 4. Disadvantages

- Low-priority processes may suffer from starvation.
- Priority assignment can be difficult and may affect system performance.
- Additional overhead is required to manage priorities.

**Starvation and Aging**

A major issue in priority scheduling is starvation, where low-priority processes may wait indefinitely if higher-priority processes continuously arrive.

To overcome this problem, a technique called aging is used. Aging gradually increases the priority of waiting processes over time, ensuring that every process eventually gets CPU time.

## 5. Applications

Priority scheduling is widely used in operating systems, real-time systems, and embedded systems where critical tasks must be executed before less important tasks.


## 6. Evaluation Metrics

### 6.1 Waiting Time

Waiting time is the total amount of time a process spends in the ready queue waiting for CPU allocation.
It does not include the time the process is actually executing.

Formula:
Waiting Time = Turnaround Time − Burst Time

It tells how long a process has to wait before getting executed.

### 6.2 Turnaround Time

Turnaround time is the total time taken by a process from its arrival to its completion.

Formula:
Turnaround Time = Completion Time − Arrival Time

It includes both waiting time and execution time.

### 6.3 Response Time

Response time is the time from when a process arrives in the ready queue to when it gets the CPU for the first time.

Formula:
Response Time = Time of first CPU allocation − Arrival Time

It measures how quickly a system responds to a process (important in interactive systems).

## 7. Python Implementation

```python
# Sample input data: (name, arrival_time, burst_time, priority)
processes = [
    ("p0", 1, 3, 2),
    ("p1", 2, 1, 1),
    ("p3", 2, 4, 2),
    ("p4", 2, 2, 1),
    ("p5", 16, 3, 1)
]

data = []
for i, (name, at, bt, priority) in enumerate(processes, 1):
    data.append({
        "name": name,
        "at": at,
        "bt": bt,
        "priority": priority,
        "order": i
    })
n = len(data)

p_data = data.copy()

time = min(data, key=lambda x: x["at"])["at"]
intervals = [str(time)]

print("\nGantt Chart:")

while data:

    available = [p for p in data if p["at"] <= time]

    if not available:
        print("    idle    ", end="")
        time = min(data, key=lambda x: x["at"])["at"]
        intervals.append(str(time))
        continue

    p = min(available, key=lambda x: (x["priority"], x["at"], x["order"]))

    print(f"    {p['name']}    ", end="")

    p["st"] = time
    time += p["bt"]
    p["ct"] = time
    intervals.append(str(time))

    data.remove(p)

print()
print("         ".join(intervals))


tat = 0
print("\nTurn Around Time:")
for p in p_data:
    p["tat"] = p["ct"] - p["at"]
    tat += p["tat"]
    print(f"{p['name']}: {p['tat']}")
print("Average turn around time = ", tat / n)


wt = 0
print("\nWaiting Time:")
for p in p_data:
    p["wt"] = p["tat"] - p["bt"]
    wt += p["wt"]
    print(f"{p['name']}: {p['wt']}")
print("Average waiting time = ", wt / n)


rt = 0
print("\nResponse Time:")
for p in p_data:
    p["rt"] = p["st"] - p["at"]
    rt += p["rt"]
    print(f"{p['name']}: {p['rt']}")
print("Average response time = ", rt / n)
```

**Example:**

Input:
```text
Enter no of processes: 5
Enter name of process, arrival time, and burst time:
p0 1 3 2
p1 2 1 1
p3 2 4 2
p4 2 2 1
p5 16 3 1
```

Output:
```text
Gantt Chart:
    p0        p1        p4        p3        idle        p5    
1         4         5         7         11         16         19

Turn Around Time:
p0: 3
p1: 3
p3: 9
p4: 5
p5: 3
Average turn around time =  4.6

Waiting Time:
p0: 0
p1: 2
p3: 5
p4: 3
p5: 0
Average waiting time =  2.0

Response Time:
p0: 0
p1: 2
p3: 5
p4: 3
p5: 0
Average response time =  2.0
```