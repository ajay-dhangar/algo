---
id: round-robin-cpu-scheduling
title: Round Robin CPU Scheduling Algorithm
sidebar_label: "Round Robin CPU Scheduling Algorithm"
sidebar_position: 6
description: Round Robin is a scheduling algorithm where each process can use the CPU only for a given time slice or time quantum.
tags: [CPU Scheduling, Round robin, Preemptive, Algorithm]
---

# Round Robin Scheduling

## 1. Introduction

Round Robin (RR) is a preemptive CPU scheduling algorithm designed for time-sharing systems. Each process is assigned a fixed amount of CPU time called a time quantum or time slice. If a process does not complete within its time quantum, it is preempted and moved to the end of the ready queue.

This ensures fair CPU allocation among all processes.

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

- Processes are placed in a ready queue.
- The first process is given the CPU for one time quantum.
- If the process completes, it leaves the system.
- If it does not complete, it is moved to the back of the queue.
- The next process receives the CPU.
- The cycle repeats until all processes are completed.

## 3. Advantages

- Fair CPU allocation to all processes.
- Good response time for interactive systems.
- Prevents process starvation.

## 4. Disadvantages

- Performance depends heavily on the chosen time quantum.
- Excessively small time quantum increases context-switching overhead.
- Large time quantum makes RR behave similarly to FCFS.

## 5. Applications

Round Robin is commonly used in time-sharing and multitasking operating systems where multiple users or applications require responsive CPU access.

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

print("Enter name of process, arrival time, burst time:")

for i in range(1, n + 1):
    d = {}
    d["name"], d["at"], d["bt"] = list(map(str, input().split()))
    d["at"] = int(d["at"])
    d["bt"] = int(d["bt"])
    d["order"] = i
    data.append(d)

q = int(input("Enter time quantum: "))

p_data = data.copy()

time = 0
intervals = ["0"]
processes = []

print("\nGantt Chart:")

for p in data:
    p["rbt"] = p["bt"]
    p["st"] = None

ready = []

while data or ready:

    for p in data:
        if p["at"] <= time and p not in ready:
            ready.append(p)

    if not ready:
        processes.append("idle")
        time += 1
        intervals.append(str(time))
        continue

    p = ready.pop(0)

    processes.append(p["name"])

    if p["st"] is None:
        p["st"] = time

    run = min(q, p["rbt"])

    time += run
    p["rbt"] -= run
    intervals.append(str(time))

    for x in data:
        if x["at"] <= time and x not in ready and x != p:
            ready.append(x)

    if p["rbt"] == 0:
        p["ct"] = time
        data.remove(p)
    else:
        ready.append(p)


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
print("        ".join(processes2))
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
Enter no of processes: 4
Enter name of process, arrival time, and burst time:
p1 2 5
p2 3 3
p3 5 7
p4 12 2
Enter time quantum: 3
```

Output:
```text
Gantt Chart:

    idle        p1        p2        p3        p1        p3        p4        p3
0         2         5         8         11         13         16         18         19

Turn Around Time:
p1: 11
p2: 5
p3: 14
p4: 6
Average turn around time =  9.0

Waiting Time:
p1: 6
p2: 2
p3: 7
p4: 4
Average waiting time =  4.75

Response Time:
p1: 0
p2: 2
p3: 3
p4: 4
Average response time =  2.25
```