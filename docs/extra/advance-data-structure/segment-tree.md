---
id: segment-trees
sidebar_position: 2
title: Segment Trees
sidebar_label: Segment Trees
description: "Segment Trees are used for efficient range queries."
tags: [segment trees, advance data structures, trees, range queries]
---

# Segment Trees

**Segment Trees** are a versatile and efficient data structure used for solving range query problems. They allow for quick querying of information over a range of elements in an array, making them particularly useful in scenarios where the data may change frequently.

## Purpose

Segment Trees are commonly used for:

- **Range sum queries**: Quickly calculating the sum of elements in a specific range.
- **Range minimum/maximum queries**: Finding the minimum or maximum element in a range.
- **Range updates**: Modifying the values of elements in a range efficiently.

## Operations

1. **Build**: Construct the segment tree from the given array.
2. **Query**: Retrieve information about a specific range (e.g., sum, minimum, maximum).
3. **Update**: Modify the value of a specific element and update the tree accordingly.

## Time Complexity

- **Building the Segment Tree**: $O(n)$
- **Querying**: $O(log \ n)$
- **Updating**: $O(log \ n)$

## Implementations

### C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

class SegmentTree {
    vector<int> tree;
    int n;

public:
    SegmentTree(int arr[], int size) {
        n = size;
        tree.resize(4 * n);
        buildTree(arr, 0, 0, n - 1);
    }

    void buildTree(int arr[], int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            buildTree(arr, 2 * node + 1, start, mid);
            buildTree(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return 0; // Out of range
        }
        if (l <= start && end <= r) {
            return tree[node]; // Total overlap
        }
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, l, r) +
               query(2 * node + 2, mid + 1, end, l, r); // Partial overlap
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val; // Update leaf node
        } else {
            int mid = (start + end) / 2;
            if (start <= idx && idx <= mid) {
                update(2 * node + 1, start, mid, idx, val);
            } else {
                update(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]; // Update parent
        }
    }
};
```
### Java
```java
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        buildTree(arr, 0, 0, n - 1);
    }

    private void buildTree(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            buildTree(arr, 2 * node + 1, start, mid);
            buildTree(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    public int query(int l, int r) {
        return query(0, 0, n - 1, l, r);
    }

    private int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return 0; // Out of range
        }
        if (l <= start && end <= r) {
            return tree[node]; // Total overlap
        }
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, l, r) +
               query(2 * node + 2, mid + 1, end, l, r); // Partial overlap
    }

    public void update(int idx, int val) {
        update(0, 0, n - 1, idx, val);
    }

    private void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val; // Update leaf node
        } else {
            int mid = (start + end) / 2;
            if (start <= idx && idx <= mid) {
                update(2 * node + 1, start, mid, idx, val);
            } else {
                update(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]; // Update parent
        }
    }
}
```
### Python
```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build_tree(arr, 0, 0, self.n - 1)

    def build_tree(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build_tree(arr, 2 * node + 1, start, mid)
            self.build_tree(arr, 2 * node + 2, mid + 1, end)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query(self, l, r):
        return self.query_recursive(0, 0, self.n - 1, l, r)

    def query_recursive(self, node, start, end, l, r):
        if r < start or end < l:
            return 0  # Out of range
        if l <= start and end <= r:
            return self.tree[node]  # Total overlap
        mid = (start + end) // 2
        return (self.query_recursive(2 * node + 1, start, mid, l, r) +
                self.query_recursive(2 * node + 2, mid + 1, end, l, r))  # Partial overlap

    def update(self, idx, val):
        self.update_recursive(0, 0, self.n - 1, idx, val)

    def update_recursive(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val  # Update leaf node
        else:
            mid = (start + end) // 2
            if start <= idx <= mid:
                self.update_recursive(2 * node + 1, start, mid, idx, val)
            else:
                self.update_recursive(2 * node + 2, mid + 1, end, idx, val)
            self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]  # Update parent
```
### Pseudo Code
```
function buildTree(arr, node, start, end):
    if start == end:
        tree[node] = arr[start]
    else:
        mid = (start + end) / 2
        buildTree(arr, 2 * node + 1, start, mid)
        buildTree(arr, 2 * node + 2, mid + 1, end)
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2]

function query(node, start, end, l, r):
    if r < start or end < l:
        return 0 // Out of range
    if l <= start and end <= r:
        return tree[node] // Total overlap
    mid = (start + end) / 2
    return query(2 * node + 1, start, mid, l, r) +
           query(2 * node + 2, mid + 1, end, l, r) // Partial overlap

function update(node, start, end, idx, val):
    if start == end:
        tree[node] = val // Update leaf node
    else:
        mid = (start + end) / 2
        if start <= idx <= mid:
            update(2 * node + 1, start, mid, idx, val)
       
```
### Conclusion

Segment Trees are an essential data structure for efficiently handling dynamic array queries and updates. They provide a systematic approach to managing ranges and are widely used in algorithmic competitions and software development.
