---
id: tree-based-indexing
title: Tree-Based Indexing
sidebar_label: Tree-Based Indexing
sidebar_position: 3
description: Learn how tree-based indexing works with binary search trees and hierarchical access.
tags: [indexing, trees, bst, dsa]
---

# Tree-Based Indexing

Tree-based indexing stores and accesses data through a hierarchy of nodes. Instead of moving in a straight line, the program follows parent-child links.

## Introduction to Tree-Based Indexing

Tree-based indexing is useful when data is ordered in a way that supports branching decisions. A common example is a binary search tree, where smaller values go to the left and larger values go to the right.

## Why Tree Indexing Is Needed

Tree indexing helps when linear search becomes too slow or when data changes often.

- It can reduce search work in balanced trees.
- It supports ordered data access.
- It is useful for hierarchical relationships.

## Tree-Based Operations

The main operations are search, insert, delete, and traversal.

| Operation | What it does                                          |
| --------- | ----------------------------------------------------- |
| Search    | Find a value by comparing nodes                       |
| Insert    | Add a new value in the correct place                  |
| Delete    | Remove a value and keep the tree valid                |
| Traversal | Visit nodes in an order such as in-order or pre-order |

## Search

In a binary search tree, search compares the target with the current node.

If the target is smaller, move left. If it is larger, move right.

### Example in Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def search(root, target):
    current = root
    while current is not None:
        if current.value == target:
            return True
        if target < current.value:
            current = current.left
        else:
            current = current.right
    return False
```

## Insert

Insertion follows the same left-or-right comparison rule until an empty spot is found.

### Example in JavaScript

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (root === null) {
    return new Node(value);
  }

  if (value < root.value) {
    root.left = insert(root.left, value);
  } else {
    root.right = insert(root.right, value);
  }

  return root;
}
```

## Delete

Deletion is a little more complex because the tree must stay valid after removal.

Common cases include:

- Deleting a leaf node
- Deleting a node with one child
- Deleting a node with two children

## Traversal

Traversal visits tree nodes in an order.

- In-order traversal gives sorted output in a BST.
- Pre-order traversal visits the root first.
- Post-order traversal visits children before the root.

### Example in C++

```cpp
#include <iostream>
using namespace std;

struct Node {
    int value;
    Node* left;
    Node* right;
    Node(int v) : value(v), left(nullptr), right(nullptr) {}
};

void inorder(Node* root) {
    if (root == nullptr) return;
    inorder(root->left);
    cout << root->value << endl;
    inorder(root->right);
}
```

## Properties of Tree-Based Indexing

- Data is organized hierarchically.
- The cost of operations depends on tree height.
- Balanced trees keep search paths short.
- Unbalanced trees can become slow.

## Balanced vs Unbalanced Trees

| Tree type       | Shape                | Search performance |
| --------------- | -------------------- | ------------------ |
| Balanced tree   | Height stays small   | Usually fast       |
| Unbalanced tree | Can lean to one side | Can become slow    |

Balanced trees are preferred when you want stable performance.

## Complexity Analysis

| Operation | Balanced tree | Unbalanced tree |
| --------- | ------------- | --------------- |
| Search    | `O(log n)`    | `O(n)`          |
| Insert    | `O(log n)`    | `O(n)`          |
| Delete    | `O(log n)`    | `O(n)`          |
| Traversal | `O(n)`        | `O(n)`          |

## Basic Implementation Example

### Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


root = Node(10)
root.left = Node(5)
root.right = Node(15)
```

### JavaScript

```javascript
const root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
```

### C++

```cpp
Node* root = new Node(10);
root->left = new Node(5);
root->right = new Node(15);
```

## Why Balanced Trees Help

When a tree stays balanced, each comparison removes about half of the remaining search space. That is why balanced trees often give `O(log n)` search time.

This makes them a strong example of indexing in hierarchical data.
