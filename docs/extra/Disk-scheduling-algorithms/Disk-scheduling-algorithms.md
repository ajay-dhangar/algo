---
id: disk-scheduling
title: Disk Scheduling Algorithms
sidebar_label: "Disk Scheduling Algorithms"
sidebar_position: 1
description: Disk scheduling algortihtms govern the way the read/write head moves in order to serve the requets.
tags: [Disk Scheduling, FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK, Algorithm]
---

# Disk Scheduling

Disk scheduling is the process used by an operating system to decide the order in which disk I/O requests are serviced. Since the movement of the disk's read/write head takes time, efficient scheduling algorithms aim to reduce seek time, improve performance, and increase disk throughput.

## 1. First Come First Serve (FCFS)

FCFS services disk requests in the exact order they arrive.

### 1.1 How it Works

- Requests are placed in a queue.
- The disk head processes them one by one in arrival order.

### 1.2 Advantages

- Simple to implement.
- Fair, as requests are handled in arrival order.

### 1.3 Disadvantages

- Can result in large head movements.
- Poor overall seek time and performance.

### 1.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))

path = [pos]
seek = 0

cur = pos

for i in req:
    seek += abs(i-cur)
    cur = i
    path.append(i)

print("\nFCFS RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
```

Output:
```text
FCFS RW head path: 100 -> 83 -> 92 -> 1000 -> 278 -> 7803 -> 25 -> 78 -> 30 -> 786 -> 2
Total seek time: 18600
```

## 2. Shortest Seek Time First (SSTF)

SSTF selects the request closest to the current head position.

### 2.1 How it Works

- Calculate the distance between the current head position and all pending requests.
- Service the nearest request first.
- Repeat until all requests are completed.

### 2.2 Advantages

- Reduces total seek time.
- Better performance than FCFS.

### 2.3 Disadvantages

- Requests far from the current head position may experience starvation.
- Slightly more complex to implement.

### 2.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))

path = [pos]
seek = 0

cur = pos

while req:
    x = min(req, key=lambda i: abs(i-cur))
    seek += abs(x-cur)
    cur = x
    path.append(x)
    req.remove(x)

print("\nSSTF RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
```

Output:
```text
SSTF RW head path: 100 -> 92 -> 83 -> 78 -> 30 -> 25 -> 2 -> 278 -> 786 -> 1000 -> 7803
Total seek time: 7899
```

## 3. SCAN

SCAN moves the disk head in one direction, servicing all requests along the way, and then reverses direction.

### 3.1 How it Works
- The head moves toward one end of the disk.
- Services every request encountered.
- Upon reaching the end, it reverses and services requests in the opposite direction.

### 3.2 Advantages

- Provides good throughput.
- Reduces starvation compared to SSTF.
- More predictable waiting times.

### 3.3 Disadvantages
- Requests near the ends may wait longer.
- The head may travel to the disk boundary even when no requests exist there.

### 3.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))
d = input("Enter direction (l/r): ")

l = sorted([i for i in req if i < pos])
r = sorted([i for i in req if i >= pos])

path = [pos]
seek = 0
cur = pos

if d == "l":
    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

    seek += abs(cur-0)
    cur = 0
    path.append(0)

    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

else:
    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

    seek += abs(cur-(tot-1))
    cur = tot-1
    path.append(tot-1)

    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

print("\nSCAN RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
Enter direction (l/r): r
```

Output:
```text
SCAN RW head path: 100 -> 278 -> 786 -> 1000 -> 7803 -> 7999 -> 92 -> 83 -> 78 -> 30 -> 25 -> 2
Total seek time: 15896
```

## 4. Circular SCAN (C-SCAN)

C-SCAN services requests in only one direction.

### 4.1 How it Works

- The head moves in a single direction, servicing requests.
- After reaching the end of the disk, it immediately returns to the beginning without servicing requests during the return trip.
- The process then repeats.

### 4.2 Advantages

- Provides more uniform waiting times.
- Fairer than SCAN for all disk locations.

### 4.3 Disadvantages

- Additional movement is required for the return jump.
- Slightly less efficient than SCAN in some cases.

### 4.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))
d = input("Enter direction (l/r): ")

l = sorted([i for i in req if i < pos])
r = sorted([i for i in req if i >= pos])

path = [pos]
seek = 0
cur = pos

if d == "l":
    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

    seek += abs(cur-0)
    cur = 0
    path.append(0)

    seek += abs((tot-1)-cur)
    cur = tot-1
    path.append(tot-1)

    for i in reversed(r):
        seek += abs(i-cur)
        cur = i
        path.append(i)

else:
    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

    seek += abs((tot-1)-cur)
    cur = tot-1
    path.append(tot-1)

    seek += abs(cur-0)
    cur = 0
    path.append(0)

    for i in l:
        seek += abs(i-cur)
        cur = i
        path.append(i)

print("\nCSCAN RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
Enter direction (l/r): r
```

Output:
```text
CSCAN RW head path: 100 -> 278 -> 786 -> 1000 -> 7803 -> 7999 -> 0 -> 2 -> 25 -> 30 -> 78 -> 83 -> 92
Total seek time: 15990
```

## 5. LOOK

LOOK is an optimized version of SCAN.

### 5.1 How it Works

- The head moves in one direction and services requests.
- Instead of going all the way to the disk end, it reverses when the last request in that direction has been serviced.

### 5.2 Advantages

- Reduces unnecessary head movement.
- More efficient than SCAN.

### 5.3 Disadvantages

- Slightly more complex than FCFS and SSTF.
- Waiting times may still vary.

### 5.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))
d = input("Enter direction (l/r): ")

l = sorted([i for i in req if i < pos])
r = sorted([i for i in req if i >= pos])

path = [pos]
seek = 0
cur = pos

if d == "l":
    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

else:
    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

print("\nLOOK RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
Enter direction (l/r): r
```

Output:
```text
LOOK RW head path: 100 -> 278 -> 786 -> 1000 -> 7803 -> 92 -> 83 -> 78 -> 30 -> 25 -> 2
Total seek time: 15504
```

## 6. Circular LOOK (C-LOOK)

C-LOOK is an optimized version of C-SCAN.

### 6.1 How it Works

- The head services requests in one direction only.
- After reaching the last request in that direction, it jumps directly to the first pending request at the opposite end.
- Servicing then continues in the same direction.

### 6.2 Advantages

- Eliminates unnecessary travel to disk boundaries.
- Provides uniform waiting times.
- More efficient than C-SCAN.

### 6.3 Disadvantages

- The jump between the last and first request still adds movement.
- Slightly more complex to implement.

### 6.4 Python Implementation

```python
req = list(map(int, input("Enter request order: ").split()))
pos = int(input("Enter initial RW head position: "))
tot = int(input("Enter total number of tracks: "))
d = input("Enter direction (l/r): ")

l = sorted([i for i in req if i < pos])
r = sorted([i for i in req if i >= pos])

path = [pos]
seek = 0
cur = pos

if d == "l":
    for i in reversed(l):
        seek += abs(i-cur)
        cur = i
        path.append(i)

    if r:
        seek += abs(cur-r[-1])
        cur = r[-1]
        path.append(cur)

        for i in reversed(r[:-1]):
            seek += abs(i-cur)
            cur = i
            path.append(i)

else:
    for i in r:
        seek += abs(i-cur)
        cur = i
        path.append(i)

    if l:
        seek += abs(cur-l[0])
        cur = l[0]
        path.append(cur)

        for i in l[1:]:
            seek += abs(i-cur)
            cur = i
            path.append(i)

print("\nCLOOK RW head path: ", end="")
print(" -> ".join(map(str, path)))
print("Total seek time:", seek)
```

**Example:**

Input:
```text
Enter request order: 83 92 1000 278 7803 25 78 30 786 2
Enter initial RW head position: 100
Enter total number of tracks: 8000
Enter direction (l/r): r
```

Output:
```text
CLOOK RW head path: 100 -> 278 -> 786 -> 1000 -> 7803 -> 2 -> 25 -> 30 -> 78 -> 83 -> 92
Total seek time: 15594
```

## 7. Summary

| Algorithm | Main Idea	                            | Starvation | Efficiency |
|-----------|---------------------------------------|------------|------------|
| FCFS      | Service requests in arrival order     | No         | Low        |
| SSTF      | Service nearest request first         | Possible   | High       |
| SCAN      | Move back and forth like an elevator  | Rare       | High       |
| C-SCAN    | Service in one direction only         | No         | High       |
| LOOK      | SCAN without going to disk ends       | Rare       | Very High  |
| C-LOOK    | C-SCAN without going to disk ends     | No         | Very High  |

Among these algorithms, LOOK and C-LOOK are generally preferred because they reduce unnecessary head movement while maintaining good performance and fairness.
