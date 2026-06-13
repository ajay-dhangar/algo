---
id: optimal-page-replacement
title: Optimal Page Replacement Algorithm
sidebar_label: "Optimal Page Replacement Algorithm"
sidebar_position: 3
description: Optimal is a simple page replacement algorithm in which pages are replaced based on which page will be used furthest in the future.
tags: [Page Replacement, optimal, Algorithm]
---

# Optimal Page Replacement

## 1. Introduction

The Optimal Page Replacement Algorithm, often called OPT or MIN, replaces the page that will not be used for the longest time in the future. It produces the minimum possible number of page faults for a given reference string and is therefore considered the theoretical best page replacement algorithm.

## 2. Working

- When a page fault occurs, the operating system examines future page references.
- The page whose next use is farthest in the future (or never used again) is selected for replacement.
- Since future references are generally unknown in real systems, OPT is mainly used as a benchmark for comparing other algorithms.

## 3. Example

Suppose there are 3 page frames and the page reference string is:

1, 2, 3, 4, 1, 2, 5

| Step | Memory Frames |
| ---- | ------------- |
| 1    | 1             |
| 2    | 1, 2          |
| 3    | 1, 2, 3       |
| 4    | 1, 2, 4       |
| 1    | 1, 2, 4       |
| 2    | 1, 2, 4       |
| 5    | 5, 2, 4       |

When page 4 arrives, the frames contain 1, 2, 3. Looking ahead, pages 1 and 2 will be used again soon, while 3 will not be used again. Therefore, page 3 is replaced by page 4.

When page 5 arrives, the frames contain 1, 2, 4. Since none of these pages will be used again, any of them can be replaced. In this example, page 1 is replaced by page 5.


## 4. Advantages

- Produces the lowest possible page fault rate.
- Serves as an ideal benchmark for evaluating other page replacement algorithms.
- Never suffers from Belady's Anomaly.

## 5. Disadvantages

- Requires knowledge of future page references.
- Impossible to implement perfectly in practical systems.
- Used primarily for theoretical analysis and performance comparison.

## 6. Python Implementation

```python
ref = input("Enter reference string: ").split()
m = int(input("Enter number of page frames: "))
mm = ["-1"] * m

hit = 0
miss = 0

print("\nRef String\tPage Frames\tStatus")

count = 0

for i in ref:
    if i in mm:
        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Hit")
        hit+=1

    else:
        if "-1" in mm:
            j = mm.index("-1")
            mm[j] = i
        else:
            far = -1
            repl = mm[0]

            for p in mm:
                if p not in ref[count+1:]:
                    repl = p
                    break
                else:
                    nx = ref[count+1:].index(p)
                    if nx > far:
                        far = nx
                        repl = p

            j = mm.index(repl)
            mm[j] = i

        print(f"{i}\t\t{'   '.join(map(str, mm))}\tPage Fault")
        miss+=1

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
4		2   4   3	Page Fault
2		2   4   3	Page Hit
3		2   4   3	Page Hit
0		2   0   3	Page Fault
3		2   0   3	Page Hit
0		2   0   3	Page Hit
3		2   0   3	Page Hit
2		2   0   3	Page Hit
1		2   0   1	Page Fault
2		2   0   1	Page Hit
0		2   0   1	Page Hit
1		2   0   1	Page Hit
7		7   0   1	Page Fault
0		7   0   1	Page Hit
1		7   0   1	Page Hit

Page faults:  9
Page replacements:  6
Hit ratio:  0.5909090909090909
Miss ratio:  0.4090909090909091
```
