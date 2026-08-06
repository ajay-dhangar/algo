---
id: sqrt-decomposition
sidebar_position: 19
title: "Sqrt Decomposition"
sidebar_label: Sqrt Decomposition
description: "Sqrt Decomposition is a technique that splits an array into blocks of size sqrt(n) to answer range queries and updates faster than brute force."
tags: [sqrt decomposition, block decomposition, advance data structures, range queries]
---

**Sqrt Decomposition** (also called **Block Decomposition**) is a technique for answering range queries and performing updates on an array in roughly $O(\sqrt{n})$ time. It works by splitting the array into blocks of size approximately $\sqrt{n}$ and precomputing an aggregate (sum, minimum, maximum, etc.) for each block. It is simpler to implement than a Segment Tree or Fenwick Tree and is a great stepping stone toward those structures.

## Purpose

Sqrt Decomposition is useful when you need to:

- **Answer range queries** (sum, min, max, gcd, etc.) faster than the $O(n)$ brute-force scan.
- **Support point or range updates** without the complexity of a Segment Tree.
- **Trade a small amount of query speed for a much simpler implementation** — useful in contests when time is short.

## How It Works

1. **Divide** the array of size $n$ into blocks of size $\text{blockSize} \approx \sqrt{n}$.
2. **Precompute** an aggregate value (e.g., sum) for every block in $O(n)$.
3. **Query(l, r)**:
   - For any blocks that are **fully contained** within `[l, r]`, use the precomputed block aggregate directly — $O(1)$ per block.
   - For the **partial blocks** at the two ends of the range, iterate element by element.
   - Total blocks touched is at most $O(\sqrt{n})$, so a query runs in $O(\sqrt{n})$.
4. **Update(idx, val)**:
   - Update the element directly, then update the aggregate of the block it belongs to — $O(1)$.

## Operations

1. **Build**: Construct block aggregates from the given array — $O(n)$.
2. **Query**: Retrieve an aggregate over a range `[l, r]` — $O(\sqrt{n})$.
3. **Update**: Modify a single element and refresh its block's aggregate — $O(1)$.

## Time Complexity

- **Building**: $O(n)$
- **Range Query**: $O(\sqrt{n})$
- **Point Update**: $O(1)$
- **Space**: $O(n)$

## Implementations

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class SqrtDecomposition {
    vector<int> arr;
    vector<long long> blockSum;
    int n, blockSize;

public:
    SqrtDecomposition(vector<int>& input) {
        arr = input;
        n = arr.size();
        blockSize = max(1, (int)sqrt(n));
        blockSum.assign((n / blockSize) + 1, 0);
        for (int i = 0; i < n; i++) {
            blockSum[i / blockSize] += arr[i];
        }
    }

    // Sum over [l, r], inclusive, 0-indexed
    long long query(int l, int r) {
        long long sum = 0;
        while (l <= r) {
            int startOfBlock = (l / blockSize) * blockSize;
            int endOfBlock = min(startOfBlock + blockSize - 1, n - 1);
            if (startOfBlock == l && endOfBlock <= r) {
                // Fully contained block — use precomputed aggregate
                sum += blockSum[l / blockSize];
                l = endOfBlock + 1;
            } else {
                // Partial block — walk element by element
                sum += arr[l];
                l++;
            }
        }
        return sum;
    }

    void update(int idx, int val) {
        blockSum[idx / blockSize] += (val - arr[idx]);
        arr[idx] = val;
    }
};
```

### Java

```java
class SqrtDecomposition {
    private int[] arr;
    private long[] blockSum;
    private int n, blockSize;

    public SqrtDecomposition(int[] input) {
        arr = input.clone();
        n = arr.length;
        blockSize = Math.max(1, (int) Math.sqrt(n));
        blockSum = new long[(n / blockSize) + 1];
        for (int i = 0; i < n; i++) {
            blockSum[i / blockSize] += arr[i];
        }
    }

    public long query(int l, int r) {
        long sum = 0;
        while (l <= r) {
            int startOfBlock = (l / blockSize) * blockSize;
            int endOfBlock = Math.min(startOfBlock + blockSize - 1, n - 1);
            if (startOfBlock == l && endOfBlock <= r) {
                sum += blockSum[l / blockSize];
                l = endOfBlock + 1;
            } else {
                sum += arr[l];
                l++;
            }
        }
        return sum;
    }

    public void update(int idx, int val) {
        blockSum[idx / blockSize] += (val - arr[idx]);
        arr[idx] = val;
    }
}
```

### Python

```python
import math

class SqrtDecomposition:
    def __init__(self, arr):
        self.arr = arr[:]
        self.n = len(arr)
        self.block_size = max(1, int(math.sqrt(self.n)))
        self.block_sum = [0] * ((self.n // self.block_size) + 1)
        for i, val in enumerate(arr):
            self.block_sum[i // self.block_size] += val

    def query(self, l, r):
        total = 0
        while l <= r:
            start_of_block = (l // self.block_size) * self.block_size
            end_of_block = min(start_of_block + self.block_size - 1, self.n - 1)
            if start_of_block == l and end_of_block <= r:
                total += self.block_sum[l // self.block_size]
                l = end_of_block + 1
            else:
                total += self.arr[l]
                l += 1
        return total

    def update(self, idx, val):
        self.block_sum[idx // self.block_size] += (val - self.arr[idx])
        self.arr[idx] = val
```

### Pseudo Code

```
function build(arr):
    blockSize = sqrt(n)
    for i in 0..n-1:
        blockSum[i / blockSize] += arr[i]

function query(l, r):
    sum = 0
    while l <= r:
        if l is at the start of its block AND the whole block fits within r:
            sum += blockSum[l / blockSize]
            l = start of next block
        else:
            sum += arr[l]
            l += 1
    return sum

function update(idx, val):
    blockSum[idx / blockSize] += val - arr[idx]
    arr[idx] = val
```

## Compare Languages Side-by-Side

Pick any two languages below to see the same logic next to each other — useful if you know one of these languages and are mapping the syntax onto the other.

<LanguageComparator algorithm="sqrt-decomposition" />

## Complexity Cheat Sheet

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Build** | $O(n)$ | $O(n)$ |
| **Range Query** | $O(\sqrt{n})$ | - |
| **Point Update** | $O(1)$ | - |
| **Range Update (with lazy block tagging)** | $O(\sqrt{n})$ | - |

## When to Use Sqrt Decomposition vs. Segment Tree / Fenwick Tree

- **Sqrt Decomposition** is simpler to write and reason about, and is often "fast enough" for $n \le 10^5$–$10^6$.
- **Segment Tree** and **Fenwick Tree** offer $O(\log n)$ queries/updates and scale better for very large inputs or when many range updates are needed.
- Sqrt Decomposition is especially handy for problems that don't fit a Segment Tree cleanly — e.g., **Mo's Algorithm**, answering offline queries, or maintaining more complex per-block state (like a sorted block for order statistics).

## Conclusion

Sqrt Decomposition trades a bit of asymptotic performance for a much simpler mental model and implementation. It's a great structure to reach for when a Segment Tree feels like overkill, or as a building block for more advanced techniques like Mo's Algorithm.
