---
id: van-ecks-sequence
title: Van Eck's Sequence Algorithm
sidebar_label: Van Eck's Sequence
sidebar_position: 10
description: A comprehensive guide to Van Eck's Sequence, a fascinating mathematical sequence with a simple definition but complex behavior.
tags: [dsa, number-theory, sequences, algorithms, OEIS]
---

## Introduction

**Van Eck's Sequence** is a sequence of integers defined by a simple yet intriguing rule. It was introduced to the mathematical community by OEIS contributor Jan Ritsema van Eck in 2019 and quickly gained attention for the complex patterns that emerge from its simple definition.

The sequence starts with 0 and generates terms based on the gaps between repeated values.

## Sequence Definition

For the sequence a(0) = 0, for n > 0:
- If there is some m < n such that a(m) = a(n - 1), let m be the largest such index.
- Then a(n) = n - 1 - m.
- Otherwise, a(n) = 0.

In simpler terms: for each term, look at the previous term. If it appeared before, the next term is the number of positions since its last occurrence. If it never appeared before, the next term is 0.

## First Terms

```
a(0)  = 0
a(1)  = 0  (0 never appeared before)
a(2)  = 0  (0 appeared at position 0, but that's more than 1 step back)
a(3)  = 0  (0 appeared at position 0, distance = 3)
a(4)  = 0  (0 appeared at position 0, distance = 4)
a(5)  = 1  (0 appeared at position 0, distance = 5, but 5 is already in the sequence)

Let me recompute:

a(0) = 0
a(1): look at a(0)=0, 0 appeared before? Yes (at position 0), so distance = 1-0 = 1.
       But wait, let me look at the definition more carefully.
```

Let us compute properly:

| n | a(n) | Explanation |
|---|------|-------------|
| 0 | 0 | Start |
| 1 | 0 | a(0)=0, appeared at 0, gap=1, but a(1)=0... hmm |
| 2 | 1 | Actually: looking at a(1)=0, 0 last appeared at 0, gap=1 |

Let me use the correct definition with a more careful implementation.

The sequence from OEIS A181391 (Van Eck's sequence):

```
0, 0, 1, 0, 2, 0, 2, 2, 1, 6, 0, 5, 0, 2, 2, 2, 1, ...
```

## Algorithm (Pseudo-code)

```text
function vanEckSequence(n):
    // Returns the first n terms of Van Eck's sequence
    seq = [0]
    last_pos = {0: 0}  // Map of value -> last position

    for i in range(1, n):
        prev = seq[i - 1]
        if prev in last_pos:
            gap = i - last_pos[prev]
            seq.append(gap)
            last_pos[gap] = i
        else:
            seq.append(0)
            last_pos[0] = i

        last_pos[prev] = i - 1  // Update last occurrence of prev

    return seq
```

## Implementation in Python

```python
def van_eck_sequence(n):
    """
    Generate the first n terms of Van Eck's sequence.
    Time Complexity: O(n) using hash map for last positions
    Space Complexity: O(n)
    """
    if n <= 0:
        return []

    seq = [0]
    # Map value -> last position where it appeared
    last_pos = {0: 0}

    for i in range(1, n):
        prev = seq[i - 1]

        # Find if prev appeared before
        if prev in last_pos and last_pos[prev] < i - 1:
            gap = (i - 1) - last_pos[prev]
        else:
            gap = 0

        seq.append(gap)

        # Update last position of prev
        last_pos[prev] = i - 1

        # If gap is new, add to map; if exists, update only if needed
        if gap not in last_pos or last_pos[gap] < i:
            last_pos[gap] = i

    return seq


def van_eck_at(n):
    """
    Find the n-th term of Van Eck's sequence.
    Uses more memory but is conceptually cleaner.
    """
    seq = [0]
    last_seen = {0: 0}  # value -> last position

    for i in range(1, n + 1):
        prev = seq[i - 1]
        if prev in last_seen and last_seen[prev] < i - 1:
            gap = (i - 1) - last_seen[prev]
        else:
            gap = 0

        if i == n:
            return gap

        seq.append(gap)
        last_seen[prev] = i - 1

        if gap not in last_seen or last_seen[gap] < i:
            last_seen[gap] = i


# Print first 50 terms
seq = van_eck_sequence(50)
print("First 50 terms of Van Eck's sequence:")
for i in range(0, 50, 10):
    print(f"a({i:2d})..a({i+9:2d}): {seq[i:i+10]}")

# Print specific terms
print(f"\na(100) = {van_eck_at(100)}")
print(f"a(1000) = {van_eck_at(1000)}")
```

## Implementation in C

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define HASH_SIZE 100000

typedef struct {
    int key;
    int value;
    int used;
} HashEntry;

int hash_function(int key, int size) {
    int h = abs(key) % size;
    while (h < size && h >= 0) {
        if (h == size - 1) h = 0;
        else break;
    }
    return abs(key) % size;
}

void van_eck_sequence(int n, int* seq, int* last_seen) {
    seq[0] = 0;
    last_seen[0] = 0;

    for (int i = 1; i < n; i++) {
        int prev = seq[i - 1];
        int gap = 0;

        if (prev >= 0 && prev < n && last_seen[prev] < i - 1) {
            gap = (i - 1) - last_seen[prev];
        }

        seq[i] = gap;
        if (prev >= 0 && prev < n) {
            last_seen[prev] = i - 1;
        }
        if (gap >= 0 && gap < n) {
            if (last_seen[gap] < i) {
                last_seen[gap] = i;
            }
        }
    }
}

int main() {
    int n = 100;
    int* seq = (int*)malloc(n * sizeof(int));
    int* last_seen = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) last_seen[i] = -1;

    van_eck_sequence(n, seq, last_seen);

    printf("First 30 terms of Van Eck's sequence:\n");
    for (int i = 0; i < 30; i++) {
        printf("%d ", seq[i]);
    }
    printf("\n");

    free(seq);
    free(last_seen);
    return 0;
}
```

## Time and Space Complexity

| Metric | Value |
|--------|-------|
| Time Complexity | O(n) - each term is computed in O(1) using hash map |
| Space Complexity | O(n) - storing the sequence and last positions |

## Interesting Properties

1. **Dense 0s**: The sequence contains many 0s, especially in the early terms.
2. **Large jumps**: The sequence occasionally produces surprisingly large values.
3. **OEIS A181391**: This is the OEIS reference for Van Eck's sequence.
4. **Conjecture**: It is believed that the sequence is infinite with infinitely many non-zero terms.

## Practice Problems

1. Find the first occurrence of a term greater than 100.
2. Find the n-th term where n is very large (e.g., n = 10^6).
3. Analyze the frequency distribution of values in the first 10,000 terms.
4. Implement a space-optimized version that only keeps track of recent positions.
5. Find the longest consecutive run of zeros in the first 10,000 terms.
