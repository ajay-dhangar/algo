---
id: segment-tree-intro 
title: Segment Trees
sidebar_label: Segment Trees
description: "In this blog post, we'll explore Segment Trees, a powerful data structure for efficiently solving range query problems."
tags: [dsa, data structures, segment trees]
---

## Introduction
**Segment Trees** are a versatile data structure that allows for efficient querying and updating of an array. They are particularly useful for problems that involve range queries, such as finding the sum or minimum of elements in a specified range, and for efficiently updating elements in the array. The main advantage of segment trees over other data structures, like binary indexed trees (BIT), is their ability to handle both queries and updates in logarithmic time.

![Segment Tree](Segment-Tree-img.png)


## Definition and Structure
A Segment Tree is a binary tree where each node represents an interval or segment of an array. The leaf nodes represent individual elements of the array, while each internal node represents the aggregation (sum, minimum, maximum, etc.) of its child segments.

Key components of a Segment Tree:
- **Leaf Nodes**: Represent individual elements of the array.
- **Internal Nodes**: Represent the aggregation of their child nodes.
- **Root Node**: Represents the entire array.

**Example Segment Tree for the array [1, 3, 5, 7, 9, 11]:**
```
         [1, 3, 5, 7, 9, 11]
         /                \
    [1, 3, 5]            [7, 9, 11]
    /      \                /      \
[1, 3]   [5]           [7, 9]    [11]
 /  \
```

## Properties
- **Efficient Range Queries**: Segment trees can answer range queries in **O(log n)** time.
- **Dynamic Updates**: They allow for efficient updates to elements in the array, also in **O(log n)** time.
- **Space Complexity**: A Segment Tree requires **O(n)** space, where **n** is the size of the input array.

## Types of Segment Trees
1. **Standard Segment Tree**: Used for range queries where the operation is additive or multiplicative.
    ```
    Example for range sum: 
    Given array: [1, 3, 5, 7, 9, 11]
    Range sum for [1, 3]: 3 + 5 = 8
    ```

2. **Lazy Propagation Segment Tree**: An optimized segment tree that handles range updates efficiently by deferring updates to avoid unnecessary recalculations.
    ```
    Example for range update: 
    Increment elements in the range [1, 3] by 5.
    ```

## Operations on Segment Trees

### 1. **Building the Segment Tree**
The tree is built from the array in **O(n)** time, where each node is initialized with the corresponding segment's aggregation.

### 2. **Querying**
To get the sum (or any aggregation) over a range, we traverse the tree from the root and combine the results of relevant segments.

### 3. **Updating**
To update an element, we locate the leaf node corresponding to the element and update its value, then propagate the change up the tree to maintain the correct segment values.

## Implementation

Here’s an example of how you can implement a Segment Tree in C++:

```cpp
#include <iostream>
#include <vector>
using namespace std;

class SegmentTree {
public:
    vector<int> tree;
    int n;

    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 0, 0, n - 1);
    }

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start]; // Leaf node
        } else {
            int mid = (start + end) / 2;
            build(arr, 2 * node + 1, start, mid);
            build(arr, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]; // Sum of children
        }
    }

    int query(int l, int r) {
        return query(0, 0, n - 1, l, r);
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // No overlap
        if (l <= start && end <= r) return tree[node]; // Total overlap
        int mid = (start + end) / 2;
        int leftSum = query(2 * node + 1, start, mid, l, r);
        int rightSum = query(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum; // Sum of both halves
    }

    void update(int idx, int val) {
        update(0, 0, n - 1, idx, val);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val; // Leaf node
        } else {
            int mid = (start + end) / 2;
            if (start <= idx && idx <= mid) {
                update(2 * node + 1, start, mid, idx, val);
            } else {
                update(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]; // Update current node
        }
    }
};

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegmentTree segmentTree(arr);
    cout << segmentTree.query(1, 3) << endl; // Output: 15 (3 + 5 + 7)
    segmentTree.update(1, 10); // Update index 1 to 10
    cout << segmentTree.query(1, 3) << endl; // Output: 22 (10 + 5 + 7)
}
```

## Advantages of Segment Trees

- **Efficient Range Queries**: Segment trees enable efficient querying of range sums, minimums, maximums, and other aggregate functions in **O(log n)** time, making them suitable for dynamic datasets.
  
- **Dynamic Updates**: They allow for efficient updates to the array elements, where updates can also be done in **O(log n)** time, providing flexibility in data manipulation.
  
- **Flexible Range Queries**: Segment trees can be customized to handle various types of queries beyond basic range queries, including lazy propagation for efficient range updates.
  
- **Space Complexity**: Although segment trees require **O(n)** space, they efficiently use space compared to other data structures when considering the additional features they provide.

## Applications of Segment Trees

- **Range Sum Queries**: Segment trees are widely used in scenarios where frequent range sum queries are required, such as in competitive programming.

- **Interval Overlap**: They can be used to solve problems involving overlapping intervals, allowing for efficient counting of overlaps within a specific range.

- **Dynamic Programming**: Segment trees can assist in optimizing dynamic programming problems that involve range queries and updates, especially in scenarios with large input sizes.

- **Frequency Count**: They can be adapted to maintain frequencies of elements within a range, enabling efficient queries regarding the count of elements within specified bounds.

- **Image Processing**: Segment trees can be applied in image processing algorithms, particularly in operations that involve pixel values and require efficient region queries.
 
 ---