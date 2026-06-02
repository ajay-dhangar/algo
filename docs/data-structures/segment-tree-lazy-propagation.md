---
id: segment-tree-lazy-propagation
title: Segment Tree with Lazy Propagation
sidebar_label: Segment Tree with Lazy Propagation
sidebar_position: 11
description: A comprehensive guide to Segment Tree with Lazy Propagation, including concept explanation, implementations in C++, Java, and Python, complexity analysis, and practice problems.
tags: [data-structures, segment-tree, lazy-propagation, advanced, competitive-programming]
---

# Segment Tree with Lazy Propagation

## Overview

A **Segment Tree with Lazy Propagation** is an advanced data structure that allows both **range updates** and **range queries** in `O(log n)` time. Without lazy propagation, a range update would take `O(n log n)` time. Lazy propagation defers (delays) the updates and applies them only when needed.

---

## Why Do We Need Lazy Propagation?

Consider a basic Segment Tree:
- **Point Update + Range Query** → works fine in `O(log n)`
- **Range Update + Range Query** → without lazy propagation, updating a range takes `O(n log n)` time

Lazy Propagation solves this by **postponing updates** to child nodes until they are actually needed.

---

## How It Works

We maintain an extra array called `lazy[]`.

- When we update a range, instead of updating all nodes immediately, we store the **pending update** in the `lazy[]` array.
- When we later query or update a node, we first **push down** the lazy value to its children before proceeding.

---

## Dry Run Example

**Array:** `[1, 3, 5, 7, 9, 11]`

**Operation:** Add 10 to all elements in range `[1, 3]`

**Without Lazy:** Update every node that covers indices 1, 2, 3 → multiple recursive calls

**With Lazy:** Mark the parent node covering `[1, 3]` with `lazy = 10` → apply to children only when needed ✅

---

## Implementation

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
long long tree[4 * MAXN], lazy[4 * MAXN];

void build(int arr[], int node, int start, int end) {
    lazy[node] = 0;
    if (start == end) {
        tree[node] = arr[start];
    } else {
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
}

void pushDown(int node, int start, int end) {
    if (lazy[node] != 0) {
        int mid = (start + end) / 2;
        tree[2 * node] += lazy[node] * (mid - start + 1);
        tree[2 * node + 1] += lazy[node] * (end - mid);
        lazy[2 * node] += lazy[node];
        lazy[2 * node + 1] += lazy[node];
        lazy[node] = 0;
    }
}

void updateRange(int node, int start, int end, int l, int r, long long val) {
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        tree[node] += val * (end - start + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, start, end);
    int mid = (start + end) / 2;
    updateRange(2 * node, start, mid, l, r, val);
    updateRange(2 * node + 1, mid + 1, end, l, r, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

long long queryRange(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node];
    pushDown(node, start, end);
    int mid = (start + end) / 2;
    return queryRange(2 * node, start, mid, l, r) +
           queryRange(2 * node + 1, mid + 1, end, l, r);
}
```

### Java

```java
class SegmentTree {
    long[] tree, lazy;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new long[4 * n];
        lazy = new long[4 * n];
        build(arr, 0, 0, n - 1);
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node + 1, start, mid);
            build(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    void pushDown(int node, int start, int end) {
        if (lazy[node] != 0) {
            int mid = (start + end) / 2;
            tree[2 * node + 1] += lazy[node] * (mid - start + 1);
            tree[2 * node + 2] += lazy[node] * (end - mid);
            lazy[2 * node + 1] += lazy[node];
            lazy[2 * node + 2] += lazy[node];
            lazy[node] = 0;
        }
    }

    void updateRange(int node, int start, int end, int l, int r, long val) {
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += val * (end - start + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        updateRange(2 * node + 1, start, mid, l, r, val);
        updateRange(2 * node + 2, mid + 1, end, l, r, val);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    long queryRange(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        return queryRange(2 * node + 1, start, mid, l, r) +
               queryRange(2 * node + 2, mid + 1, end, l, r);
    }
}
```

### Python

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)

    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2 * node + 1, start, mid)
            self.build(arr, 2 * node + 2, mid + 1, end)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def push_down(self, node, start, end):
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            self.tree[2 * node + 1] += self.lazy[node] * (mid - start + 1)
            self.tree[2 * node + 2] += self.lazy[node] * (end - mid)
            self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[2 * node + 2] += self.lazy[node]
            self.lazy[node] = 0

    def update_range(self, node, start, end, l, r, val):
        if r < start or end < l:
            return
        if l <= start and end <= r:
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return
        self.push_down(node, start, end)
        mid = (start + end) // 2
        self.update_range(2 * node + 1, start, mid, l, r, val)
        self.update_range(2 * node + 2, mid + 1, end, l, r, val)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query_range(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        self.push_down(node, start, end)
        mid = (start + end) // 2
        return (self.query_range(2 * node + 1, start, mid, l, r) +
                self.query_range(2 * node + 2, mid + 1, end, l, r))
```

---

## Complexity Analysis

| Operation    | Time Complexity | Space Complexity |
|-------------|----------------|-----------------|
| Build       | O(n)           | O(n)            |
| Range Update | O(log n)       | O(n)            |
| Range Query  | O(log n)       | O(n)            |

---

## Use Cases

- **Range Sum Query with Range Update** — most common use case
- **Range Min/Max Query** — finding minimum or maximum in a range
- **Competitive Programming** — Codeforces, ICPC, LeetCode Hard problems
- **Database range indexing** — efficient bulk updates

---

## Practice Problems

1. [Range Sum Query - Mutable (LeetCode 307)](https://leetcode.com/problems/range-sum-query-mutable/)
2. [Interval Sum (Codeforces)](https://codeforces.com/problemset)
3. [SPOJ - Horrible Queries](https://www.spoj.com/problems/HORRIBLE/)

---

## References

- https://cp-algorithms.com/data_structures/segment_tree.html
- https://codeforces.com/blog/entry/18051
- https://www.geeksforgeeks.org/lazy-propagation-in-segment-tree/