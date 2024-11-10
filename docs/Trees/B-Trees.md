---
id: b-tree
title: B-Tree
sidebar_label: B-Tree
sidebar_position: 3
description: "A B-Tree is a self-balancing tree data structure that maintains sorted data and allows for efficient insertion, deletion, and search operations."
tags: [Data Structures, B-Tree, Algorithms]
---

# B-Tree

## Overview
A **B-Tree** is a self-balancing tree data structure that maintains sorted data and allows for efficient operations such as insertion, deletion, and search. B-Trees are particularly well-suited for systems that read and write large blocks of data, such as databases and filesystems. They ensure that the tree remains balanced, allowing for operations to be performed in **O(log n)** time.

## Features
- **Balanced Structure**: All leaf nodes are at the same level, ensuring that the tree remains balanced.
- **Node Capacity**: Each node can contain a variable number of keys and children, defined by a minimum degree \( t \).
- **Dynamic Growth**: B-Trees can grow and shrink dynamically as keys are added or removed, maintaining balance without requiring rebalancing operations.

## Table of Contents
- [How It Works](#how-it-works)
- [Operations](#operations)
  - [Insertion](#insertion)
  - [Deletion](#deletion)
  - [Search](#search)
  - [Traversal](#traversal)
- [Code Example](#code-example)
- [Applications](#applications)
- [Time Complexity](#time-complexity)

## How It Works
In a B-Tree:
- Each node can contain multiple keys and children, allowing for a more compact representation of data.
- The tree maintains a balanced structure where the number of keys in each node is kept within a defined range, ensuring efficient operations.

### Balancing Techniques
1. **Node Splitting**: When a node becomes full, it is split into two nodes, and the median key is promoted to the parent node.
2. **Merging Nodes**: If a node becomes underflowed after deletion, it may borrow a key from a sibling or merge with a sibling.

## Operations

### Insertion
To insert a new value:
1. Start at the root and find the appropriate leaf node.
2. If the leaf node has fewer than \( 2t - 1 \) keys, insert the key directly.
3. If the leaf node is full, split the node and promote the median key to the parent.

### Deletion
Deletion is performed as follows:
1. Locate the key in the tree.
2. If the key is in a leaf node, remove it directly.
3. If the key is in an internal node, replace it with its predecessor or successor and delete that key.
4. If the node becomes underflowed, perform necessary operations to maintain the B-Tree properties.

### Search
Search for a value follows a similar mechanism:
1. Start from the root and traverse the tree based on comparisons until the value is found or a `null` pointer is reached.

### Traversal
1. **In-Order Traversal**: Left children → Current node → Right children.
2. **Pre-Order Traversal**: Current node → Left children → Right children.
3. **Post-Order Traversal**: Left children → Right children → Current node.

## Code Example

### C++ Example (B-Tree):

```cpp
#include <iostream>
using namespace std;

class BTreeNode {
    int *keys;
    int t;
    BTreeNode **C;
    int n;
    bool leaf;

public:
    BTreeNode(int _t, bool _leaf);

    void insertNonFull(int k);
    void splitChild(int i, BTreeNode *y);
    void traverse();

    BTreeNode *search(int k);

    friend class BTree;
};

class BTree {
    BTreeNode *root;
    int t;

public:
    BTree(int _t) {
        root = NULL;
        t = _t;
    }

    void traverse() {
        if (root != NULL) root->traverse();
    }

    BTreeNode* search(int k) {
        return (root == NULL) ? NULL : root->search(k);
    }

    void insert(int k);
};

BTreeNode::BTreeNode(int t1, bool leaf1) {
    t = t1;
    leaf = leaf1;

    keys = new int[2*t-1];
    C = new BTreeNode *[2*t];
    n = 0;
}

void BTreeNode::traverse() {
    int i;
    for (i = 0; i < n; i++) {
        if (leaf == false)
            C[i]->traverse();
        cout << " " << keys[i];
    }

    if (leaf == false)
        C[i]->traverse();
}

BTreeNode *BTreeNode::search(int k) {
    int i = 0;
    while (i < n && k > keys[i])
        i++;

    if (keys[i] == k)
        return this;

    if (leaf == true)
        return NULL;

    return C[i]->search(k);
}

void BTree::insert(int k) {
    if (root == NULL) {
        root = new BTreeNode(t, true);
        root->keys[0] = k;
        root->n = 1;
    } else {
        if (root->n == 2*t-1) {
            BTreeNode *s = new BTreeNode(t, false);
            s->C[0] = root;
            s->splitChild(0, root);

            int i = 0;
            if (s->keys[0] < k)
                i++;
            s->C[i]->insertNonFull(k);

            root = s;
        } else
            root->insertNonFull(k);
    }
}

void BTreeNode::insertNonFull(int k) {
    int i = n-1;

    if (leaf == true) {
        while (i >= 0 && keys[i] > k) {
            keys[i+1] = keys[i];
            i--;
        }

        keys[i+1] = k;
        n = n+1;
    } else {
        while (i >= 0 && keys[i] > k)
            i--;

        if (C[i+1]->n == 2*t-1) {
            splitChild(i+1, C[i+1]);

            if (keys[i+1] < k)
                i++;
        }
        C[i+1]->insertNonFull(k);
    }
}

void BTreeNode::splitChild(int i, BTreeNode *y) {
    BTreeNode *z = new BTreeNode(y->t, y->leaf);
    z->n = t - 1;

    for (int j = 0; j < t-1; j++)
        z->keys[j] = y->keys[j+t];

    if (y->leaf == false) {
        for (int j = 0; j < t; j++)
            z->C[j] = y->C[j+t];
    }

    y->n = t - 1;

    for (int j = n; j >= i+1; j--)
        C[j+1] = C[j];

    C[i+1] = z;

    for (int j = n-1; j >= i; j--)
        keys[j+1] = keys[j];

    keys[i] = y->keys[t-1];

    n = n + 1;
}

int main() {
    BTree t(3);
    t.insert(10);
    t.insert(20);
    t.insert(5);
    t.insert(6);
    t.insert(12);
    t.insert(30);
    t.insert(7);
    t.insert(17);

    cout << "Traversal of the constructed tree is ";
    t.traverse();

    return 0;
}

```
### Output:
```
Traversal of the constructed tree is  5 6 7 10 12 17 20 30
```
## Applications
```
- **Databases**: B-Trees are widely used in database systems to maintain sorted data, allowing for efficient retrieval, insertion, and deletion of records.
- **File Systems**: Many file systems use B-Trees to manage file directories and metadata, enabling quick access to files and efficient storage management.
- **Indexing**: B-Trees are used in indexing data structures for search engines and databases, allowing for fast lookups and range queries.
- **Memory Management**: They can efficiently manage free memory blocks in systems, helping to allocate and deallocate memory dynamically.
- **Auto-completion**: B-Trees are utilized in applications that require predictive text suggestions, enabling quick access to a large set of possible completions.
```

## Time Complexity
```

| Operation    | Average Time | Worst Case Time |
|--------------|--------------|-----------------|
| **Search**   | O(log n)     | O(n)            |
| **Insertion**| O(log n)     | O(n)            |
| **Deletion** | O(log n)     | O(n)            |
| **Traversal**| O(n)         | O(n)            |
```

> **Note**: The worst-case time complexity arises in unbalanced cases; however, B-Trees are designed to remain balanced, maintaining an average of O(log n) for most operations.

## Conclusion
```
B-Trees are essential data structures for efficient data management, particularly in applications that require dynamic datasets. Their ability to maintain balance ensures fast search, insertion, and deletion operations, making them ideal for databases, file systems, and other applications where performance is critical. The versatility and efficiency of B-Trees make them a fundamental choice for managing large volumes of data.
```
