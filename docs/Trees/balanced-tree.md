---
id: balanced-tree
title: Balanced Tree
sidebar_label: Balanced Tree
sidebar_position: 2
description: "A Balanced Tree is a data structure that maintains a balanced height to ensure efficient operations."
tags: [Data Structures, Balanced Tree, Algorithms]
---

# Balanced Tree

## Overview
A **Balanced Tree** is a data structure that automatically keeps its height (depth) small in comparison to the number of nodes. This ensures that operations such as insertion, deletion, and search can be performed efficiently, typically in **O(log n)** time. Common types of balanced trees include **AVL trees**, **Red-Black trees**, and **B-trees**.

## Features
- **Height-Balancing**: Maintains a balanced height to ensure operations remain efficient.
- **Self-Balancing**: Automatically adjusts structure during insertion and deletion to maintain balance.
- **Binary Tree Structure**: Often structured as a binary tree, but can extend to N-ary trees.

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
In a balanced tree:
- The tree maintains a balanced structure where the difference in height between left and right subtrees of any node is minimized.
- Rotations are used to adjust the structure during insertion and deletion to maintain balance.

### Balancing Techniques
1. **Rotations**: Adjust the tree structure to ensure balance.
   - **Left Rotation**: Used when the right subtree becomes too heavy.
   - **Right Rotation**: Used when the left subtree becomes too heavy.

2. **Rebalancing**: After insertion or deletion, the tree is checked and rebalanced if necessary.

## Operations

### Insertion
To insert a new value:
1. Insert the value using standard BST insertion rules.
2. Check for balance and apply rotations if needed.

### Deletion
Deletion is performed in similar ways as a BST, with additional steps to maintain balance:
1. Remove the node as in a standard BST.
2. Check for balance and apply rotations if needed.

### Search
Search for a value follows the same mechanism as in a BST:
1. Start from the root and traverse left or right based on comparisons until the value is found or a `null` pointer is reached.

### Traversal
1. **In-Order Traversal**: Left subtree → Root → Right subtree.
2. **Pre-Order Traversal**: Root → Left subtree → Right subtree.
3. **Post-Order Traversal**: Left subtree → Right subtree → Root.

## Code Example

### Python Example (AVL Tree):

```python
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.value = key
        self.height = 1

class AVLTree:
    def insert(self, root, key):
        if not root:
            return Node(key)
        elif key < root.value:
            root.left = self.insert(root.left, key)
        else:
            root.right = self.insert(root.right, key)

        root.height = 1 + max(self.getHeight(root.left), self.getHeight(root.right))
        balance = self.getBalance(root)

        # Left Left Case
        if balance > 1 and key < root.left.value:
            return self.rightRotate(root)

        # Right Right Case
        if balance < -1 and key > root.right.value:
            return self.leftRotate(root)

        # Left Right Case
        if balance > 1 and key > root.left.value:
            root.left = self.leftRotate(root.left)
            return self.rightRotate(root)

        # Right Left Case
        if balance < -1 and key < root.right.value:
            root.right = self.rightRotate(root.right)
            return self.leftRotate(root)

        return root

    def leftRotate(self, z):
        y = z.right
        T2 = y.left

        y.left = z
        z.right = T2

        z.height = 1 + max(self.getHeight(z.left), self.getHeight(z.right))
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))

        return y

    def rightRotate(self, z):
        y = z.left
        T3 = y.right

        y.right = z
        z.left = T3

        z.height = 1 + max(self.getHeight(z.left), self.getHeight(z.right))
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))

        return y

    def getHeight(self, root):
        if not root:
            return 0
        return root.height

    def getBalance(self, root):
        if not root:
            return 0
        return self.getHeight(root.left) - self.getHeight(root.right)

    def inorder(self, root):
        if root:
            self.inorder(root.left)
            print(root.value, end=" ")
            self.inorder(root.right)

# Example usage:
avl = AVLTree()
root = None
values = [10, 20, 30, 40, 50, 25]
for value in values:
    root = avl.insert(root, value)

print("Inorder traversal:")
avl.inorder(root)
```

### Output:
```
Inorder traversal:
10 20 25 30 40 50 
```

## Applications
- **Databases**: Used for maintaining sorted data in databases where frequent insertions and deletions are required.
- **Memory Management**: Efficiently manage free memory blocks in systems.
- **Auto-completion**: Used in applications that require predictive text suggestions.

## Time Complexity

| Operation    | Average Time | Worst Case Time |
|--------------|--------------|-----------------|
| **Search**   | O(log n)     | O(n)            |
| **Insertion**| O(log n)     | O(n)            |
| **Deletion** | O(log n)     | O(n)            |
| **Traversal**| O(n)         | O(n)            |

> **Note**: The worst-case time complexity arises in unbalanced cases; balanced trees maintain an average of O(log n) for most operations.

## Conclusion
Balanced trees are crucial data structures for efficient data management, allowing for fast search, insertion, and deletion operations. They are essential for applications that require maintaining dynamic datasets.
---
