---
id: first-come-first-served-cpu-scheduling
title: First Come First Served CPU Scheduling Algorithm
sidebar_label: "First Come First Served CPU Scheduling Algorithm"
sidebar_position: 1
description: First Come First Served (FCFS) is a simple scheduling algorithm where processes are handled in the order they arrive, without priority.
tags: [CPU Scheduling, FCFS, Algorithm]
---

# First Come First Served (FCFS) Scheduling

## 1. Introduction

First Come First Serve (FCFS) is the simplest CPU scheduling algorithm. In this method, processes are executed in the order in which they arrive in the ready queue. The process that arrives first gets the CPU first, and once it starts executing, it runs until completion without interruption.

FCFS is a non-preemptive scheduling algorithm, meaning the CPU cannot be taken away from a process until it finishes its execution.

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

- Processes enter the ready queue based on their arrival time.
- The process at the front of the queue is selected for execution.
- After the process completes, the next process in the queue is executed.
- This continues until all processes are completed.

## 3. Advantages

- Simple and easy to implement.
- Processes are executed fairly based on arrival order.
- No process starvation occurs.

## 4. Disadvantages

- Can lead to high average waiting time.
- Suffers from the Convoy Effect, where short processes wait behind long processes.
- Not suitable for time-sharing systems requiring quick response times.

## 5. Applications

FCFS is commonly used in batch processing systems where simplicity is more important than performance optimization.

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
# Sample input data: (name, arrival_time, burst_time)
processes = [
    ("p0", 1, 3),
    ("p1", 2, 6),
    ("p3", 16, 4),
    ("p4", 17, 2)
]

data = []
for i, (name, at, bt) in enumerate(processes, 1):
    data.append({
        "name": name,
        "at": at,
        "bt": bt,
        "order": i
    })
n = len(data)


fcfs_data = sorted(data, key=lambda item: (item["at"],item["order"]))

time=fcfs_data[0]["at"]
intervals = [str(time)]

print("\nGantt Chart:")

for p in fcfs_data:
    if time<p["at"]:
        print("    idle    ", end="")
        time+=p["at"]-time
        intervals.append(str(time))

    p['st']=time
    print(f"    {p['name']}    ", end="")
    time += p["bt"]
    p['ct']=time
    intervals.append(str(time))

print()
print("         ".join(intervals))

tat=0
print("\nTurn Around Time:")
for p in fcfs_data:
    p["tat"]=p['ct']-p['at']
    tat+=p["tat"]
    print(f"{p['name']}: {p['tat']}")
print("Average turn around time = ", tat/n)

wt=0
print("\nWaiting Time:")
for p in fcfs_data:
    p["wt"]=p['tat']-p['bt']
    wt+=p["wt"]
    print(f"{p['name']}: {p['wt']}")
print("Average waiting time = ", wt/n)

rt=0
print("\nResponse Time:")
for p in fcfs_data:
    p["rt"]=p['st']-p['at']
    rt+=p["rt"]
    print(f"{p['name']}: {p['rt']}")
print("Average response time = ", rt/n)
```

**Example:**

Input:
```text
Enter no of processes: 4
Enter name of process, arrival time, and burst time:
p0 1 3
p1 2 6
p3 16 4
p4 17 2
```

Output:
```text
Gantt Chart:
    p0        p1        idle        p3        p4    
1         4         10         16         20         22

Turn Around Time:
p0: 3
p1: 8
p3: 4
p4: 5
Average turn around time =  5.0

Waiting Time:
p0: 0
p1: 2
p3: 0
p4: 3
Average waiting time =  1.25

Response Time:
p0: 0
p1: 2
p3: 0
p4: 3
Average response time =  1.25
```