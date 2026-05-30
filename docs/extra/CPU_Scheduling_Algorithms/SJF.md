---
id: shortest-job-first-cpu-scheduling
title: Shortest Job First CPU Scheduling Algorithm
sidebar_label: "Shortest Job First CPU Scheduling Algorithm"
sidebar_position: 2
description: Shortest Job First (SJF) is a simple scheduling algorithm where processes are handled such that the process requiring minimum amount of time is executed first, without priority.
tags: [CPU Scheduling, SJF, Algorithm]
---

# Shortest Job First (SJF) Scheduling

## 1. Introduction

Shortest Job First (SJF) is a CPU scheduling algorithm that selects the process with the smallest CPU burst time for execution. The goal of SJF is to minimize the average waiting time of processes in the system.

In the non-preemptive version of SJF, once a process starts executing, it continues until it finishes.

## 2. How It Works

- Processes arrive in the ready queue.
- Among all available processes, the one with the shortest burst time is selected.
- The selected process executes until completion.
- The scheduler then chooses the next shortest available process.

## 3. Advantages

- Provides the minimum average waiting time among non-preemptive scheduling algorithms.
- Improves overall system throughput.
- Efficient when burst times are known accurately.

## 4. Disadvantages

- Requires prior knowledge or estimation of CPU burst times.
- Long processes may experience starvation if shorter jobs keep arriving.
- More complex than FCFS.

## 5. Applications

SJF is useful in environments where process execution times can be estimated accurately, such as batch processing systems and certain job scheduling applications.

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
data = []

n = int(input("Enter no of processes: "))
print("Enter name of process, arrival time, and burst time:")

for i in range(1, n + 1):
    d = {}
    d["name"], d["at"], d["bt"] = list(map(str, input().split()))
    d["at"] = int(d["at"])
    d["tt"] = d["at"]         
    d["bt"] = int(d["bt"])
    d["order"] = i
    data.append(d)

sjf_data = data.copy()

time = min(data, key=lambda x: x["at"])["at"]
intervals = [str(time)]

print("\nGantt Chart:")

while data:

    available = [p for p in data if p["at"] <= time]

    if not available:
        print("   idle   ", end="")
        time = min(data, key=lambda x: x["at"])["at"]
        intervals.append(str(time))
        continue

    p = min(available, key=lambda x: (x["bt"], x["at"], x["order"]))

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
for p in sjf_data:
    p["tat"] = p["ct"] - p["at"]
    tat += p["tat"]
    print(f"{p['name']}: {p['tat']}")
print("Average turn around time = ", tat / n)


wt = 0
print("\nWaiting Time:")
for p in sjf_data:
    p["wt"] = p["tat"] - p["bt"]
    wt += p["wt"]
    print(f"{p['name']}: {p['wt']}")
print("Average waiting time = ", wt / n)


rt = 0
print("\nResponse Time:")
for p in sjf_data:
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
p0 1 3
p1 2 1
p3 2 4
p4 2 2
p5 16 3
```

Output:
```text
Gantt Chart:
    p0        p1        p4        p3       idle       p5    
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