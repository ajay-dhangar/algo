---
id: preemptive-priority-cpu-scheduling
title: Preemptive Priority CPU Scheduling Algorithm
sidebar_label: "Preemptive Priority CPU Scheduling Algorithm"
sidebar_position: 5
description: Preemptive Priority is a scheduling algorithm where each process is assigned a priority, and the CPU is allocated to the process with the highest priority.
tags: [CPU Scheduling, Priority, Algorithm]
---

# Priority Scheduling (Preemptive)

## 1. Introduction

Priority Scheduling assigns each process a priority value, and the CPU is allocated to the process with the highest priority. In the preemptive version, if a newly arrived process has a higher priority than the currently running process, the CPU is immediately reassigned to the higher-priority process.

This ensures that important processes receive CPU time as soon as possible.

## Video Explanation

<LiteYouTubeEmbed
  id="7gMLNiEz3nw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L-4.5: Deadlock Avoidance Banker's Algorithm with Example |With English Subtutles"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## 2. How It Works

- Each process is assigned a priority level.
- The scheduler selects the highest-priority process from the ready queue.
- If a higher-priority process arrives, the currently running process is preempted.
- The higher-priority process begins execution.
- The process continues until completion or until another higher-priority process arrives.

## 3. Advantages

- Critical processes receive immediate attention.
- Provides flexibility through priority levels.
- Suitable for real-time and time-sensitive systems.

## 4. Disadvantages

- Low-priority processes may experience starvation.
- Frequent preemption can increase overhead.
- Performance depends on appropriate priority assignment.

**Starvation and Ageing:**

A common problem is starvation, where low-priority processes may wait indefinitely. Aging gradually increases the priority of waiting processes to ensure they eventually receive CPU time.

## 5. Applications

Preemptive priority scheduling is widely used in real-time operating systems, embedded systems, and applications where urgent tasks must be handled quickly.

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
print("Enter name of process, arrival time, burst time, and priority:")

for i in range(1, n + 1):
    d = {}
    d["name"], d["at"], d["bt"], d["priority"] = list(map(str, input().split()))
    d["at"] = int(d["at"])        
    d["bt"] = int(d["bt"])
    d["priority"] = int(d["priority"])
    d["order"] = i
    data.append(d)

p_data = data.copy()

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

    p = min(available, key=lambda x: (x["priority"], x["at"], x["order"]))

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
p1 0 7 3
p2 2 4 1
p3 4 1 2
p4 5 4 1
p5 6 2 4
```

Output:
```text
Gantt Chart:

    p1         p2         p4         p3         p1         p5
0         2         6         10         11         16         18

Turn Around Time:
p1: 16
p2: 4
p3: 7
p4: 5
p5: 12
Average turn around time =  8.8

Waiting Time:
p1: 9
p2: 0
p3: 6
p4: 1
p5: 10
Average waiting time =  5.2

Response Time:
p1: 0
p2: 0
p3: 6
p4: 1
p5: 10
Average response time =  3.4
```
