---
id: first-in-first-out-page-replacement
title: First In First Out Page Replacement Algorithm
sidebar_label: "FIFO"
sidebar_position: 1
description: "First In First Out (FIFO) is a simple page replacement algorithm in which pages are replaced based on which page came in first."
tags: [Page Replacement, FIFO, Algorithm]
---

# First In First Out (FIFO) Page Replacement

## 1. Introduction

FIFO (First In First Out) is one of the simplest page replacement algorithms used in operating systems for memory management. It replaces the page that has been in memory for the longest time whenever a new page needs to be loaded and all available frames are occupied. The algorithm follows the same principle as a queue: the first page that enters memory is the first one to be removed.

## 2. Working

- Pages are loaded into memory frames in the order they arrive.
- When a page fault occurs and no free frame is available, the oldest page in memory is selected for replacement.
- A queue data structure is commonly used to keep track of the order of page arrivals.

## 3. Example

Suppose there are 3 page frames and the page reference string is:

1, 2, 3, 4

| Step | Memory Frames                  |
|------|--------------------------------|
| 1    | 1                              |
| 2    | 1, 2                           |
| 3    | 1, 2, 3                        |
| 4    | 4, 2, 3                        |

When page 4 arrives, page 1 is removed because it entered memory first.

## 4. Advantages

- Very simple to understand and implement.
- Requires minimal overhead.
- Easy to maintain using a queue.

## 5. Disadvantages

- May replace frequently used pages.
- Does not consider page usage history.
- Can suffer from Belady's Anomaly, where increasing the number of page frames can unexpectedly increase page faults.

## 6. Python Implementation

```python
ref = input("Enter reference string: ").split()
m = int(input("Enter number of page frames: "))
mm = ["-1"] * m

hit = 0
miss = 0

ptr = 0

print("\nRef String\tPage Frames\tStatus")

for i in ref:
    if i in mm:
        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Hit")
        hit+=1
    else:
        mm[ptr]=i
        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Fault")
        ptr = (ptr+1)%m
        miss+=1

print("\nPage faults: ", miss)
print("Page replacements: ", max(0, miss - m))
print("Hit ratio: ", hit/(hit+miss))
print("Miss ratio: ", miss/(hit+miss))
```

**Example:**

Input:
```text
Enter reference string: 7 0 1 2 0 3 0 4 2 3 0 3 0 3 2 1 2 0 1 7 0 1
Enter number of page frames: 3
```

Output:
```text
Ref String	Page Frames	Status
7		7   -1   -1	Page Fault
0		7   0   -1	Page Fault
1		7   0   1	Page Fault
2		2   0   1	Page Fault
0		2   0   1	Page Hit
3		2   3   1	Page Fault
0		2   3   0	Page Fault
4		4   3   0	Page Fault
2		4   2   0	Page Fault
3		4   2   3	Page Fault
0		0   2   3	Page Fault
3		0   2   3	Page Hit
0		0   2   3	Page Hit
3		0   2   3	Page Hit
2		0   2   3	Page Hit
1		0   1   3	Page Fault
2		0   1   2	Page Fault
0		0   1   2	Page Hit
1		0   1   2	Page Hit
7		7   1   2	Page Fault
0		7   0   2	Page Fault
1		7   0   1	Page Fault

Page faults:  15
Page replacements:  12
Hit ratio:  0.3181818181818182
Miss ratio:  0.6818181818181818
```
