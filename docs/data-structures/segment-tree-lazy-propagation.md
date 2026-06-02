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
A **Segment Tree with Lazy Propagation** is an advanced data structure that allows both **range updates** and **range queries** in $O(\log n)$ time. Without lazy propagation, a range update would take $O(n \log n)$ time. Lazy propagation defers (delays) the updates and applies them only when needed.

---

## Why Do We Need Lazy Propagation?
Consider a basic Segment Tree:
- **Point Update + Range Query** → works fine in $O(\log n)$
- **Range Update + Range Query** → without lazy propagation, updating a range takes $O(n \log n)$ time because we have to update every individual leaf node.

Lazy Propagation solves this by **postponing updates** to child nodes until those nodes are actually visited or queried.

---

## How It Works
We maintain an extra array called `lazy[]` alongside our standard tree array.
- When we update a range, instead of updating all child nodes immediately, we store the **pending update** value in the corresponding index of the `lazy[]` array.
- When we later query or update a node, we first **push down** the lazy value to its direct children before proceeding deeper into the tree.

---

## Dry Run Example
**Array:** `[1, 3, 5, 7, 9, 11]`  
**Operation:** Add 10 to all elements in range `[1, 3]`

- **Without Lazy:** Update every node that covers indices 1, 2, and 3 individually → multiple deep recursive calls.
- **With Lazy:** Update and mark the parent node covering `[1, 3]` with `lazy = 10`. Stop early. Apply the updates to its children only when they are accessed in future operations. ✅

---

## Implementation

### C++
```cpp
#include <vector>
#include <iostream>

class SegmentTree {
private:
    int n;
    std::vector<long long> tree, lazy;

    void build(const std::vector<int>& arr, int node, int start, int end) {
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

    void updateRange(int node, int start, int end, int l, int r, long long val) {
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

    long long queryRange(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        return queryRange(2 * node + 1, start, mid, l, r) + 
               queryRange(2 * node + 2, mid + 1, end, l, r);
    }

public:
    SegmentTree(const std::vector<int>& arr) {
        n = arr.size();
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(arr, 0, 0, n - 1);
    }

    void update(int l, int r, long long val) {
        updateRange(0, 0, n - 1, l, r, val);
    }

    long long query(int l, int r) {
        return queryRange(0, 0, n - 1, l, r);
    }
};
class SegmentTree {
    private long[] tree, lazy;
    private int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new long[4 * n];
        lazy = new long[4 * n];
        build(arr, 0, 0, n - 1);
    }

    private void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node + 1, start, mid);
            build(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    private void pushDown(int node, int start, int end) {
        if (lazy[node] != 0) {
            int mid = (start + end) / 2;
            tree[2 * node + 1] += lazy[node] * (mid - start + 1);
            tree[2 * node + 2] += lazy[node] * (end - mid);
            lazy[2 * node + 1] += lazy[node];
            lazy[2 * node + 2] += lazy[node];
            lazy[node] = 0;
        }
    }

    private void updateRange(int node, int start, int end, int l, int r, long val) {
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

    private long queryRange(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        return queryRange(2 * node + 1, start, mid, l, r) + 
               queryRange(2 * node + 2, mid + 1, end, l, r);
    }

    public void update(int l, int r, long val) {
        updateRange(0, 0, n - 1, l, r, val);
    }

    public long query(int l, int r) {
        return queryRange(0, 0, n - 1, l, r);
    }
}
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

    def update(self, l, r, val):
        self.update_range(0, 0, self.n - 1, l, r, val)

    def query(self, l, r):
        return self.query_range(0, 0, self.n - 1, l, r)

        ---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Build** | $O(n)$ | $O(n)$ (total structure allocation) |
| **Range Update** | $O(\log n)$ | $O(\log n)$ (auxiliary call stack space) |
| **Range Query** | $O(\log n)$ | $O(\log n)$ (auxiliary call stack space) |

---

## Use Cases
- **Range Sum/Min/Max Query with Range Updates** — Handled efficiently without timing out.
- **Competitive Programming** — Essential tool for solving complex range query problems in Codeforces, ICPC, and LeetCode Hard.

---

## Practice Problems
1. [Handling Sum Queries After Update (LeetCode 2569)](https://leetcode.com/problems/handling-sum-queries-after-update/)
2. [Circular RMQ (Codeforces 52C)](https://codeforces.com/problemset/problem/52/C)
3. [SPOJ - Horrible Queries](https://www.spoj.com/problems/HORRIBLE/)

---

## References
- [CP-Algorithms - Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [Codeforces - Efficient Segment Trees Tutorial](https://codeforces.com/blog/entry/18051)
- [GeeksforGeeks - Lazy Propagation in Segment Tree](https://www.geeksforgeeks.org/lazy-propagation-in-segment-tree/)