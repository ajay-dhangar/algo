---
id: segment-tree
title: Segment Tree
sidebar_label: Segment Tree
description: "A comprehensive guide to Segment Trees with visual diagrams, build/query/update operations, lazy propagation, code templates in Python, Java, and C++, and practice problems."
tags:
  [
    segment-tree,
    algorithms,
    advanced,
    dsa,
    range-query,
    competitive-programming,
    interview-prep,
  ]
---

# Segment Tree

A **Segment Tree** is an advanced data structure that allows you to efficiently perform **range queries** and **point updates** on an array — operations that would take O(n) per query with brute force, reduced to O(log n) with a Segment Tree.

---

## 🧠 Why Segment Tree?

```
Problem: Given array [1, 3, 5, 7, 9, 11]
Answer Q queries: "What is the sum of elements from index L to R?"
Also handle U updates: "Change element at index i to value v"

❌ BRUTE FORCE:
  Query: O(n) per query → 100 queries on 10⁶ array = 10⁸ operations (TLE)
  Update: O(1)

✅ SEGMENT TREE:
  Build:  O(n)
  Query:  O(log n)
  Update: O(log n)
```

---

## 🌳 How the Tree is Built

A Segment Tree maps an array into a **binary tree** where:

- Each **leaf node** stores one element
- Each **internal node** stores the result (sum/min/max) of its children's range

```
Array: [1, 3, 5, 7, 9, 11]
Index:  0  1  2  3  4   5

                  [0,5] = 36
                /           \
         [0,2] = 9        [3,5] = 27
        /       \          /        \
    [0,1]=4  [2,2]=5  [3,4]=16   [5,5]=11
    /     \            /     \
[0,0]=1 [1,1]=3  [3,3]=7  [4,4]=9

Node stores: (range, value)
```

### Array Representation of Tree

```
For array of size n, segment tree uses array of size 4*n

tree[1]  = root = sum of entire array
tree[2]  = left child  (indices 0 to mid)
tree[3]  = right child (indices mid+1 to end)
tree[4]  = left child of tree[2]
tree[5]  = right child of tree[2]
...and so on

For node at index i:
  Left child  → 2*i
  Right child → 2*i + 1
  Parent      → i/2
```

---

## 🔨 Operation 1: Build

### Visual Step-by-Step

```
Array: [1, 3, 5, 7, 9, 11]

Step 1: Fill leaf nodes (bottom level)
tree[6]=1, tree[7]=3, tree[8]=5, tree[9]=7, tree[10]=9, tree[11]=11

Step 2: Fill internal nodes bottom-up
tree[3] = tree[6]+tree[7] = 1+3 = 4
tree[4] = tree[8]+tree[9] = 5+7 = 12   (wait — let's use 1-indexed correctly)

Correct tree (1-indexed, nodes store range sum):
tree[1]  = 36  (range [0,5])
tree[2]  = 9   (range [0,2])
tree[3]  = 27  (range [3,5])
tree[4]  = 4   (range [0,1])
tree[5]  = 5   (range [2,2])
tree[6]  = 16  (range [3,4])
tree[7]  = 11  (range [5,5])
tree[8]  = 1   (range [0,0])
tree[9]  = 3   (range [1,1])
tree[10] = 7   (range [3,3])
tree[11] = 9   (range [4,4])
```

### Code

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, self.n - 1, 1)

    def build(self, arr, start, end, node):
        if start == end:
            # Leaf node — store the element
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            left_child  = 2 * node
            right_child = 2 * node + 1

            # Recursively build left and right subtrees
            self.build(arr, start, mid, left_child)
            self.build(arr, mid + 1, end, right_child)

            # Internal node stores sum of children
            self.tree[node] = self.tree[left_child] + self.tree[right_child]
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class SegmentTree {
    int[] tree;
    int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, n - 1, 1);
    }

    private void build(int[] arr, int start, int end, int node) {
        if (start == end) {
            // Leaf node — store the element
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            int leftChild  = 2 * node;
            int rightChild = 2 * node + 1;

            // Recursively build left and right subtrees
            build(arr, start, mid, leftChild);
            build(arr, mid + 1, end, rightChild);

            // Internal node stores sum of children
            tree[node] = tree[leftChild] + tree[rightChild];
        }
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

class SegmentTree {
public:
    vector<int> tree;
    int n;

    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n, 0);
        build(arr, 0, n - 1, 1);
    }

    void build(vector<int>& arr, int start, int end, int node) {
        if (start == end) {
            // Leaf node — store the element
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            int leftChild  = 2 * node;
            int rightChild = 2 * node + 1;

            // Recursively build left and right subtrees
            build(arr, start, mid, leftChild);
            build(arr, mid + 1, end, rightChild);

            // Internal node stores sum of children
            tree[node] = tree[leftChild] + tree[rightChild];
        }
    }
};
```

  </TabItem>
</Tabs>

**Time Complexity:** O(n) &nbsp;|&nbsp; **Space Complexity:** O(n)

---

## 🔍 Operation 2: Range Query

### Visual Dry-Run

```
Array: [1, 3, 5, 7, 9, 11]   Query: sum(L=1, R=4)  Expected: 3+5+7+9 = 24

Start at root node [0,5]:
  Query [1,4] overlaps [0,5] → go to both children

  Left child [0,2]:
    Query [1,4] overlaps [0,2] → go to both children

    Left child [0,1]:
      Query [1,4] overlaps [0,1] → go to both children

      Left child [0,0]:
        Query [1,4] does NOT overlap [0,0] → return 0 ❌

      Right child [1,1]:
        Query [1,4] FULLY covers [1,1] → return tree value = 3 ✅

    Right child [2,2]:
      Query [1,4] FULLY covers [2,2] → return tree value = 5 ✅

  Right child [3,5]:
    Query [1,4] overlaps [3,5] → go to both children

    Left child [3,4]:
      Query [1,4] FULLY covers [3,4] → return tree value = 16 ✅

    Right child [5,5]:
      Query [1,4] does NOT overlap [5,5] → return 0 ❌

Final Answer: 0 + 3 + 5 + 16 + 0 = 24 ✅
```

### 3 Cases in Query

```
1. NO OVERLAP    → current range is completely outside query → return 0
2. FULL OVERLAP  → current range is completely inside query  → return tree[node]
3. PARTIAL       → current range partially overlaps query    → recurse on children
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
    def query(self, l, r, start, end, node):
        # Case 1: No overlap
        if r < start or end < l:
            return 0

        # Case 2: Full overlap
        if l <= start and end <= r:
            return self.tree[node]

        # Case 3: Partial overlap — recurse on both children
        mid = (start + end) // 2
        left_sum  = self.query(l, r, start, mid, 2 * node)
        right_sum = self.query(l, r, mid + 1, end, 2 * node + 1)
        return left_sum + right_sum

# Usage: st.query(1, 4, 0, n-1, 1)  → sum from index 1 to 4
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
    public int query(int l, int r, int start, int end, int node) {
        // Case 1: No overlap
        if (r < start || end < l) return 0;

        // Case 2: Full overlap
        if (l <= start && end <= r) return tree[node];

        // Case 3: Partial overlap — recurse on both children
        int mid = (start + end) / 2;
        int leftSum  = query(l, r, start, mid, 2 * node);
        int rightSum = query(l, r, mid + 1, end, 2 * node + 1);
        return leftSum + rightSum;
    }

// Usage: st.query(1, 4, 0, n-1, 1)  → sum from index 1 to 4
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
    int query(int l, int r, int start, int end, int node) {
        // Case 1: No overlap
        if (r < start || end < l) return 0;

        // Case 2: Full overlap
        if (l <= start && end <= r) return tree[node];

        // Case 3: Partial overlap — recurse on both children
        int mid = (start + end) / 2;
        int leftSum  = query(l, r, start, mid, 2 * node);
        int rightSum = query(l, r, mid + 1, end, 2 * node + 1);
        return leftSum + rightSum;
    }

// Usage: st.query(1, 4, 0, n-1, 1)  → sum from index 1 to 4
```

  </TabItem>
</Tabs>

**Time Complexity:** O(log n) &nbsp;|&nbsp; **Space Complexity:** O(log n) recursion stack

---

## ✏️ Operation 3: Point Update

### Visual Dry-Run

```
Array: [1, 3, 5, 7, 9, 11]   Update: index=2, newValue=10
(Changing 5 → 10, so diff = +5)

Start at root [0,5]:
  index=2 is in [0,5] → go to both children

  Left child [0,2]:
    index=2 is in [0,2] → go to right child only

    Right child [2,2]:
      index=2 == [2,2] → LEAF NODE
      tree[node] = 10 ✅ (update leaf)

  Back at [0,2]: tree[node] = tree[left] + tree[right] = 4 + 10 = 14 ✅
  Back at [0,5]: tree[node] = 14 + 27 = 41 ✅

All ancestor nodes updated automatically!
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
    def update(self, idx, new_val, start, end, node):
        if start == end:
            # Leaf node — update value
            self.tree[node] = new_val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                # Index is in left subtree
                self.update(idx, new_val, start, mid, 2 * node)
            else:
                # Index is in right subtree
                self.update(idx, new_val, mid + 1, end, 2 * node + 1)

            # Update current node after child is updated
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

# Usage: st.update(2, 10, 0, n-1, 1)  → change index 2 to value 10
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
    public void update(int idx, int newVal, int start, int end, int node) {
        if (start == end) {
            // Leaf node — update value
            tree[node] = newVal;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                // Index is in left subtree
                update(idx, newVal, start, mid, 2 * node);
            } else {
                // Index is in right subtree
                update(idx, newVal, mid + 1, end, 2 * node + 1);
            }
            // Update current node after child is updated
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

// Usage: st.update(2, 10, 0, n-1, 1)  → change index 2 to value 10
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
    void update(int idx, int newVal, int start, int end, int node) {
        if (start == end) {
            // Leaf node — update value
            tree[node] = newVal;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                // Index is in left subtree
                update(idx, newVal, start, mid, 2 * node);
            } else {
                // Index is in right subtree
                update(idx, newVal, mid + 1, end, 2 * node + 1);
            }
            // Update current node after child is updated
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

// Usage: st.update(2, 10, 0, n-1, 1)  → change index 2 to value 10
```

  </TabItem>
</Tabs>

**Time Complexity:** O(log n) &nbsp;|&nbsp; **Space Complexity:** O(log n) recursion stack

---

## ⚡ Advanced: Lazy Propagation (Range Update)

### The Problem Without Lazy

```
Without lazy: "Add 5 to all elements from index 1 to 4"
→ We'd call point update 4 times → O(4 log n)

With lazy propagation:
→ Mark the range as "pending update" and defer it → O(log n)
```

### Core Idea

```
Keep a separate lazy[] array.
lazy[node] = pending value to be added to all elements in this node's range.

When we visit a node:
1. Apply lazy[node] to tree[node] first
2. Pass lazy[node] down to children (propagate)
3. Clear lazy[node]

This way, we defer work until we actually need it.
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
class SegmentTreeLazy:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)  # pending updates
        self.build(arr, 0, self.n - 1, 1)

    def build(self, arr, start, end, node):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, start, mid, 2 * node)
            self.build(arr, mid + 1, end, 2 * node + 1)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def propagate(self, node, start, end):
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            # Apply pending update to children
            self.tree[2 * node]     += self.lazy[node] * (mid - start + 1)
            self.tree[2 * node + 1] += self.lazy[node] * (end - mid)
            # Pass lazy to children
            self.lazy[2 * node]     += self.lazy[node]
            self.lazy[2 * node + 1] += self.lazy[node]
            # Clear current lazy
            self.lazy[node] = 0

    def range_update(self, l, r, val, start, end, node):
        if r < start or end < l:
            return
        if l <= start and end <= r:
            # Full overlap — update and mark lazy
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return
        # Partial overlap — propagate first then recurse
        self.propagate(node, start, end)
        mid = (start + end) // 2
        self.range_update(l, r, val, start, mid, 2 * node)
        self.range_update(l, r, val, mid + 1, end, 2 * node + 1)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r, start, end, node):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        # Propagate before querying children
        self.propagate(node, start, end)
        mid = (start + end) // 2
        return (self.query(l, r, start, mid, 2 * node) +
                self.query(l, r, mid + 1, end, 2 * node + 1))
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class SegmentTreeLazy {
    int[] tree, lazy;
    int n;

    public SegmentTreeLazy(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        lazy = new int[4 * n];
        build(arr, 0, n - 1, 1);
    }

    private void build(int[] arr, int start, int end, int node) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, start, mid, 2 * node);
            build(arr, mid + 1, end, 2 * node + 1);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    private void propagate(int node, int start, int end) {
        if (lazy[node] != 0) {
            int mid = (start + end) / 2;
            tree[2 * node]     += lazy[node] * (mid - start + 1);
            tree[2 * node + 1] += lazy[node] * (end - mid);
            lazy[2 * node]     += lazy[node];
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }

    public void rangeUpdate(int l, int r, int val, int start, int end, int node) {
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += val * (end - start + 1);
            lazy[node] += val;
            return;
        }
        propagate(node, start, end);
        int mid = (start + end) / 2;
        rangeUpdate(l, r, val, start, mid, 2 * node);
        rangeUpdate(l, r, val, mid + 1, end, 2 * node + 1);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public int query(int l, int r, int start, int end, int node) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        propagate(node, start, end);
        int mid = (start + end) / 2;
        return query(l, r, start, mid, 2 * node) +
               query(l, r, mid + 1, end, 2 * node + 1);
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <bits/stdc++.h>
using namespace std;

class SegmentTreeLazy {
public:
    vector<long long> tree, lazy;
    int n;

    SegmentTreeLazy(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n, 0);
        lazy.resize(4 * n, 0);
        build(arr, 0, n - 1, 1);
    }

    void build(vector<int>& arr, int start, int end, int node) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, start, mid, 2 * node);
            build(arr, mid + 1, end, 2 * node + 1);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    void propagate(int node, int start, int end) {
        if (lazy[node] != 0) {
            int mid = (start + end) / 2;
            tree[2 * node]     += lazy[node] * (mid - start + 1);
            tree[2 * node + 1] += lazy[node] * (end - mid);
            lazy[2 * node]     += lazy[node];
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    }

    void rangeUpdate(int l, int r, int val, int start, int end, int node) {
        if (r < start || end < l) return;
        if (l <= start && end <= r) {
            tree[node] += (long long)val * (end - start + 1);
            lazy[node] += val;
            return;
        }
        propagate(node, start, end);
        int mid = (start + end) / 2;
        rangeUpdate(l, r, val, start, mid, 2 * node);
        rangeUpdate(l, r, val, mid + 1, end, 2 * node + 1);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long query(int l, int r, int start, int end, int node) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        propagate(node, start, end);
        int mid = (start + end) / 2;
        return query(l, r, start, mid, 2 * node) +
               query(l, r, mid + 1, end, 2 * node + 1);
    }
};
```

  </TabItem>
</Tabs>

**Time Complexity:** O(log n) per range update and query &nbsp;|&nbsp; **Space Complexity:** O(n)

---

## 📊 Complexity Summary

| Operation    | Without Segment Tree | With Segment Tree | With Lazy Propagation |
| ------------ | -------------------- | ----------------- | --------------------- |
| Build        | O(1)                 | O(n)              | O(n)                  |
| Range Query  | O(n)                 | O(log n)          | O(log n)              |
| Point Update | O(1)                 | O(log n)          | O(log n)              |
| Range Update | O(n)                 | O(n log n)        | O(log n)              |

---

## ❌ Common Mistakes

1. **Tree array too small** — Always allocate `4 * n` size for the tree array, not `2 * n`.
2. **Starting node at 0** — Segment trees use 1-indexed nodes. Left child = `2*i`, right = `2*i+1` only works when root is at index 1.
3. **Forgetting to propagate lazy** — In lazy propagation, always call `propagate()` before recursing into children during both query and update.
4. **Integer overflow** — For large arrays with large values, use `long long` (C++) or `long` (Java) for the tree array.
5. **Wrong base case in query** — No-overlap must return the **identity element** (0 for sum, INT_MAX for min, INT_MIN for max) not -1.

---

## 🏋️ Practice Problems

| #   | Problem                                  | Operation                             | Difficulty |
| --- | ---------------------------------------- | ------------------------------------- | ---------- |
| 1   | Range Sum Query — Mutable                | Point Update + Range Query            | 🟡 Medium  |
| 2   | Count of Smaller Numbers After Self      | Range Query                           | 🔴 Hard    |
| 3   | Range Minimum Query                      | Range Query                           | 🟡 Medium  |
| 4   | Interval Sum (Range Update)              | Lazy Propagation                      | 🟡 Medium  |
| 5   | Number of Longest Increasing Subsequence | Range Query                           | 🔴 Hard    |
| 6   | My Calendar III                          | Range Update + Range Query            | 🔴 Hard    |
| 7   | Rectangle Area II                        | Coordinate Compression + Segment Tree | 🔴 Hard    |

---

## 🌍 Real-World Applications

- **Database indexing** — Range aggregate queries (SUM, MIN, MAX) over rows
- **Competitive programming** — Most Codeforces Div. 1 problems involving range queries
- **Geographic Information Systems (GIS)** — Range queries on spatial data
- **Network routing** — Finding minimum latency path in a range

---

## 🔗 References

- [Segment Tree - CP-Algorithms](https://cp-algorithms.com/data_structures/segment_tree.html)
- [Segment Tree - GeeksforGeeks](https://www.geeksforgeeks.org/segment-tree-data-structure/)
- [Range Sum Query Mutable - LeetCode 307](https://leetcode.com/problems/range-sum-query-mutable/)
- [Lazy Propagation - Codeforces Blog](https://codeforces.com/blog/entry/18051)
