---
id: dynamic-segment-tree
sidebar_position: 13
title: Dynamic Segment Tree
sidebar_label: Dynamic Segment Tree
description: "This post covers dynamic segment trees, their use-cases, code examples, and how they differ from regular segment trees."
tags: [dsa, segment tree, range queries, recursion, c++]
---

# Dynamic Segment Tree

In this post, we’ll cover **Dynamic Segment Trees**, a data structure that extends the capabilities of static segment trees to handle larger ranges efficiently. This is especially useful when the input size is too large to fit into memory at once, or when dealing with dynamic ranges that are sparsely populated.

---

## Problem Definition

A **Dynamic Segment Tree** is a type of segment tree where nodes are created **on-demand** during updates. It allows us to efficiently perform range queries and updates for very large ranges, without pre-allocating memory for all nodes.

### Example Use Case  
Suppose you need to manage a large range of values, such as from `1` to `10^9`, but only a small fraction of the elements within the range are relevant. A **dynamic segment tree** only creates the necessary nodes, making it space-efficient.

---

## Approach

The idea behind a dynamic segment tree is to **lazily initialize** nodes as they are accessed during updates or queries. Instead of building the entire tree upfront, we create only the nodes that are necessary.

### Key Characteristics:
1. **Sparse Representation:** Nodes are created on-demand to save space.
2. **Recursive Structure:** Similar to a regular segment tree but with dynamic memory allocation.
3. **Memory Efficient:** Ideal for problems with large ranges but sparse data.

---

## Dynamic Segment Tree Operations

### 1. **Node Structure**

```cpp
struct Node {
    int value; // Stores the sum or relevant data for the range
    Node* left;  // Pointer to the left child
    Node* right; // Pointer to the right child

    Node(int v = 0) : value(v), left(NULL), right(NULL) {}
};

```

### 2. **Update Operation**

```
void update(Node*& node, int start, int end, int idx, int val) {
    if (!node) node = new Node(); // Create node if it doesn't exist

    if (start == end) { 
        node->value += val; // Update the value at the leaf node
        return;
    }

    int mid = (start + end) / 2;
    if (idx <= mid)
        update(node->left, start, mid, idx, val);
    else
        update(node->right, mid + 1, end, idx, val);

    // Update the current node value based on children
    node->value = (node->left ? node->left->value : 0) +
                  (node->right ? node->right->value : 0);
}

```
### 3. **Range Query Operation**

```
int query(Node* node, int start, int end, int l, int r) {
    if (!node || l > end || r < start) 
        return 0; // Return 0 if out of range or node doesn't exist

    if (l <= start && end <= r) 
        return node->value; // Return value if the current segment is fully in range

    int mid = (start + end) / 2;
    int leftQuery = query(node->left, start, mid, l, r);
    int rightQuery = query(node->right, mid + 1, end, l, r);

    return leftQuery + rightQuery;
}

```

## Example Usage
### Code Implementation
```
#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* left;
    Node* right;
    Node(int v = 0) : value(v), left(NULL), right(NULL) {}
};

void update(Node*& node, int start, int end, int idx, int val) {
    if (!node) node = new Node();
    if (start == end) {
        node->value += val;
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid)
        update(node->left, start, mid, idx, val);
    else
        update(node->right, mid + 1, end, idx, val);
    node->value = (node->left ? node->left->value : 0) +
                  (node->right ? node->right->value : 0);
}

int query(Node* node, int start, int end, int l, int r) {
    if (!node || l > end || r < start) return 0;
    if (l <= start && end <= r) return node->value;
    int mid = (start + end) / 2;
    int leftQuery = query(node->left, start, mid, l, r);
    int rightQuery = query(node->right, mid + 1, end, l, r);
    return leftQuery + rightQuery;
}

int main() {
    Node* root = NULL; // Initialize an empty segment tree

    // Update some elements
    update(root, 0, 9, 2, 5);
    update(root, 0, 9, 4, 10);

    // Perform range queries
    cout << "Sum in range [0, 5]: " << query(root, 0, 9, 0, 5) << endl;
    cout << "Sum in range [3, 8]: " << query(root, 0, 9, 3, 8) << endl;

    return 0;
}

```
### Output 
```
Sum in range [0, 5]: 15
Sum in range [3, 8]: 10
```

## Time Complexity

- **Update Operation:** `O(log N)` in the average case.  
- **Query Operation:** `O(log N)` in the average case.  
- **Space Complexity:** Depends on the number of nodes created, which is proportional to the number of updates.

---

## When to Use a Dynamic Segment Tree

- **Very large ranges:** When the range size is too large to pre-allocate.  
- **Sparse updates:** When only a few elements in the range are updated.  
- **Memory constraints:** When space efficiency is critical.

---

## Conclusion

Dynamic Segment Trees are a powerful variation of segment trees, useful in scenarios with large but sparse datasets. They provide the same query and update performance as regular segment trees, but with improved memory efficiency by allocating nodes on demand.
