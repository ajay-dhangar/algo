---
id: shortest-remaining-time-first-cpu-scheduling
title: Shortest Remaining Time First CPU Scheduling Algorithm
sidebar_label: "Shortest Remaining Time First CPU Scheduling Algorithm"
sidebar_position: 4
description: Shortest Remaining Time First (SRTF) is a simple scheduling algorithm where processes are handled such that the process requiring minimum amount of time is executed first.
tags: [CPU Scheduling, SJF, SRTF, Preemptive, Algorithm]
---

# Shortest Remaining Time First (SRTF) Scheduling

## 1. Introduction

Shortest Remaining Time First (SRTF) is the preemptive version of the Shortest Job First (SJF) scheduling algorithm. In this method, the process with the shortest remaining burst time is selected for execution. If a new process arrives with a shorter remaining time than the currently running process, the CPU is immediately assigned to the new process.

SRTF is a preemptive scheduling algorithm, meaning a running process can be interrupted before completion.

## Video Explanation

<LiteYouTubeEmbed
  id="hoN7_VMzw_g"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L-2.5: Shortest Remaining Time First (SJF With Preemption) Scheduling Algorithm with Example | OS"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## 2. How It Works

- Processes arrive in the ready queue.
- The scheduler selects the process with the shortest remaining burst time.
- If a new process arrives with a shorter remaining time, the current process is preempted.
- The newly selected process executes.
- This continues until all processes are completed.

## 3. Advantages

- Produces very low average waiting time.
- Improves system responsiveness.
- Gives preference to shorter jobs, increasing throughput.

## 4. Disadvantages

- Requires continuous monitoring of remaining burst times.
- More complex to implement than SJF.
- Long processes may suffer from starvation.

## 5. Applications

SRTF is suitable for systems where process execution times can be estimated and minimizing waiting time is a primary goal.

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
    d["bt"] = int(d["bt"])
    d["order"] = i
    data.append(d)

sjf_data = data.copy()

time = min(data, key=lambda x: x["at"])["at"]
intervals = [str(time)]
processes = []

print("\nGantt Chart:")

for p in data:
    p["rbt"] = p["bt"]
    p["st"] = None


while data:

    available = [p for p in data if p["at"] <= time]

    if not available:
        print("    idle    ", end="")
        time += 1
        intervals.append(str(time))
        continue

    p = min(available, key=lambda x: (x["bt"], x["at"], x["order"]))

    processes.append(p["name"])

    if p["st"] is None:
        p["st"] = time

    time += 1
    p["rbt"] -= 1
    intervals.append(str(time))

    if p["rbt"] == 0:
        p["ct"] = time
        data.remove(p)


processes1 = processes.copy()
intervals1 = intervals.copy()

processes2 = []
intervals2 = [intervals1[0]]

for i in range(len(processes1)-1):
    if processes1[i] == processes1[i+1]:
        processes1[i] = None
        intervals1[i+1] = None

for i in range(len(processes1)-1):
    if processes1[i] != None:
        processes2.append(processes1[i])
    if intervals1[i+1] != None:
        intervals2.append(intervals1[i+1])

processes2.append(processes1[-1])
intervals2.append(intervals1[-1])

print()
print("    ", end="")
print("         ".join(processes2))
print("         ".join(intervals2))


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
Enter no of processes: 4
Enter name of process, arrival time, and burst time:
p1 1 3
p2 2 1
p3 4 8
p4 7 3
```

Output:
```text
Gantt Chart:

    p1         p2         p1         p3         p4         p3
1         2         3         5         7         10         16

Turn Around Time:
p1: 4
p2: 1
p3: 12
p4: 3
Average turn around time =  5.0

Waiting Time:
p1: 1
p2: 0
p3: 4
p4: 0
Average waiting time =  1.25

Response Time:
p1: 0
p2: 0
p3: 1
p4: 0
Average response time =  0.25
```
