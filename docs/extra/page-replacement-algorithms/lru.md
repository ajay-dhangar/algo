---
id: least-recently-used-page-replacement
title: Least Recently Used Page Replacement Algorithm
sidebar_label: "Least Recently Used Page Replacement Algorithm"
sidebar_position: 2
description: "Least Recently Used (LRU) is a simple page replacement algorithm in which pages are replaced based on which page has been least recently used."
tags: [Page Replacement, LRU, Algorithm]
---

# Least Recently Used (LRU) Page Replacement

## 1. Introduction

LRU (Least Recently Used) is a page replacement algorithm that removes the page that has not been used for the longest period of time. It is based on the assumption that pages used recently are more likely to be used again in the near future.

## 2. Working

- Whenever a page is accessed, its usage information is updated.
- If a page fault occurs and all frames are occupied, the page with the oldest recent usage is replaced.
- The algorithm keeps track of the access history of pages.

## 3. Example

Suppose there are 3 page frames and the page reference string is:

1, 2, 3, 1, 4

| Step | Memory Frames                  |
|------|--------------------------------|
| 1    | 1                              |
| 2    | 1, 2                           |
| 3    | 1, 2, 3                        |
| 1    | 1, 2, 3 (page 1 recently used) |
| 4    | 1, 3, 4                        |

When page 4 arrives, page 2 is replaced because it was the least recently used page.

## 4. Advantages

- Generally provides better performance than FIFO.
- Takes page usage patterns into account.
- Does not suffer from Belady's Anomaly.

## 5. Disadvantages

- More complex to implement.
- Requires additional hardware support or bookkeeping to track page usage.
- Higher overhead compared to FIFO.

## 6. Python Implementation

```python
ref = input("Enter reference string: ").split()
m = int(input("Enter number of page frames: "))
mm = ["-1"] * m

usage = {}

hit = 0
miss = 0

print("\nRef String\tPage Frames\tStatus")

count = 0

for i in ref:
    if i in mm:
        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Hit")
        usage[i] = count
        hit+=1

    else:
        if "-1" in mm:
            j = mm.index("-1")
            mm[j] = i

        else:
            repl = min(usage, key=usage.get)

            j = mm.index(repl)
            mm[j] = i
            del usage[repl]

        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Fault")

        miss+=1
        usage[i] = count

    count+=1

print("\nPage faults: ", miss)
print("Page replacements: ", miss-m if miss>m else 0)
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
3		2   0   3	Page Fault
0		2   0   3	Page Hit
4		4   0   3	Page Fault
2		4   0   2	Page Fault
3		4   3   2	Page Fault
0		0   3   2	Page Fault
3		0   3   2	Page Hit
0		0   3   2	Page Hit
3		0   3   2	Page Hit
2		0   3   2	Page Hit
1		1   3   2	Page Fault
2		1   3   2	Page Hit
0		1   0   2	Page Fault
1		1   0   2	Page Hit
7		1   0   7	Page Fault
0		1   0   7	Page Hit
1		1   0   7	Page Hit

Page faults:  12
Page replacements:  9
Hit ratio:  0.45454545454545453
Miss ratio:  0.5454545454545454
```
