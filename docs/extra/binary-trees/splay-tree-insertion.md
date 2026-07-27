---
id: splay-tree-insertion
title: "Splay Tree Insertion"
sidebar_label: "Splay Tree Insertion"
sidebar_position: 6
description: "A guide to splay tree insertion using zig, zig-zig, and zig-zag rotations with amortized O(log n) time complexity using the potential method analysis."
tags: ["dsa", "data-structures", "trees", "splay-tree"]
---

## Overview

A splay tree is a self-adjusting binary search tree with the property that recently accessed elements are quickly repositioned near the root via a sequence of tree rotations called splaying.

## The Splaying Operation

Splaying moves a node to the root through a sequence of rotations. Three cases exist:

- **Zig**: When the node is a direct child of the root.
- **Zig-Zig**: When the node and its parent are both left children or both right children.
- **Zig-Zag**: When the node is a right child of a left subtree or vice versa.

## Insertion Algorithm

1. Insert the new key using standard BST insertion.
2. Splay the newly inserted node to the root.

## Amortized Analysis: Potential Method

Using the potential method, the amortized cost of splay is O(log n). Define:

- Rank r(x) = log2(size of subtree rooted at x)
- Potential Phi(T) = sum of r(x) for all nodes x in T

The amortized cost satisfies the splay theorem: the amortized time is O(log n).

## Python Implementation

```python
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

def right_rotate(y):
    x = y.left
    y.left = x.right
    x.right = y
    return x

def splay(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        if root.left is None:
            return root
        if key < root.left.key:
            root.left.left = splay(root.left.left, key)
            root.left = right_rotate(root.left)
        elif key > root.left.key:
            root.left.right = splay(root.left.right, key)
            if root.left.right:
                root.left = rotate_left(root.left)
    else:
        if root.right is None:
            return root
        root.right = splay(root.right, key)
        if root.right:
            root.right = right_rotate(root.right)
    return root
```

## JavaScript Implementation

```javascript
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

function rightRotate(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    return x;
}

function splay(root, key) {
    if (!root || root.key === key) return root;
    if (key < root.key) {
        if (!root.left) return root;
        if (key < root.left.key) {
            root.left.left = splay(root.left.left, key);
            root.left = rightRotate(root.left);
        } else if (key > root.left.key) {
            root.left.right = splay(root.left.right, key);
        }
    } else {
        if (!root.right) return root;
        root.right = splay(root.right, key);
    }
    return root;
}
```

## Comparison with AVL and BST

| Aspect | BST | AVL Tree | Splay Tree |
|--------|-----|----------|-------------|
| Search complexity | O(log n) avg | O(log n) | O(log n) amortized |
| Insert complexity | O(log n) avg | O(log n) | O(log n) amortized |
| Self-balancing | No | Yes | Yes (via splaying) |
| Rotation cost | None | May be O(log n) | O(log n) per access |

## When to Use Splay Trees

- When recently accessed items are likely to be accessed again.
- When cache locality matters.
- In implementing caches, data structures for dynamic optimality problems, and network routing.
