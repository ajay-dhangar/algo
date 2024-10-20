---
id: binary-search-tree
title: Binary Search Tree
sidebar_label: Binary Search Tree
sidebar_position: 4
description: "A Binary Search Tree (BST) is a data structure that facilitates efficient searching, insertion, and deletion operations."
tags: [Data Structures, Binary Search Tree, Algorithms]
---

# Binary Search Tree (BST)

## Overview
A **Binary Search Tree (BST)** is a binary tree where each node follows the binary search property:
- The left subtree of a node contains only nodes with values less than the node's key.
- The right subtree of a node contains only nodes with values greater than the node's key.
- Both left and right subtrees must also be binary search trees.

BSTs are commonly used for searching, insertion, and deletion operations, all of which can be performed efficiently with an average time complexity of **O(log n)** for balanced trees.

## Features
- **Efficient Search**: Lookup operations are performed in **O(log n)** time.
- **Insertion**: New elements are added in the correct position in **O(log n)** time.
- **Deletion**: Nodes can be removed while maintaining the binary search property.
- **Traversal**: In-order, pre-order, and post-order traversals are supported to explore tree elements.
- **Balanced Tree Variants**: Variants like AVL and Red-Black trees ensure balancing to maintain performance.

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
In a BST:
- Each node contains a value (key), a pointer to the left child, and a pointer to the right child.
- The left subtree contains values smaller than the node’s key.
- The right subtree contains values greater than the node’s key.

### Binary Search Property:
- For every node `N`, all values in the left subtree are smaller than `N`.
- All values in the right subtree are greater than `N`.

## Operations

### Insertion
To insert a new value:
1. Start at the root.
2. Recursively move to the left or right subtree depending on whether the new value is smaller or greater than the current node.
3. Insert the new value in the appropriate position once you find an empty subtree.

### Deletion
Deletion is performed in three cases:
1. **Node has no children**: Simply remove the node.
2. **Node has one child**: Replace the node with its child.
3. **Node has two children**: Replace the node with its in-order predecessor or successor (the largest value in the left subtree or the smallest value in the right subtree).

### Search
To search for a value:
1. Start at the root.
2. Recursively traverse left if the value is smaller, or right if it's larger.
3. Stop when you find the value or hit a `null` pointer.

### Traversal
1. **In-Order Traversal**: Left subtree → Root → Right subtree.
2. **Pre-Order Traversal**: Root → Left subtree → Right subtree.
3. **Post-Order Traversal**: Left subtree → Right subtree → Root.

## Code Example

### Python Example:

```python
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.value = key

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
        else:
            self._insert(self.root, key)

    def _insert(self, node, key):
        if key < node.value:
            if node.left is None:
                node.left = Node(key)
            else:
                self._insert(node.left, key)
        else:
            if node.right is None:
                node.right = Node(key)
            else:
                self._insert(node.right, key)

    def inorder(self):
        self._inorder(self.root)

    def _inorder(self, node):
        if node:
            self._inorder(node.left)
            print(node.value, end=" ")
            self._inorder(node.right)

# Example usage:
bst = BinarySearchTree()
bst.insert(50)
bst.insert(30)
bst.insert(70)
bst.insert(20)
bst.insert(40)
bst.insert(60)
bst.insert(80)

print("Inorder traversal:")
bst.inorder()
```

### Output:
```
Inorder traversal:
20 30 40 50 60 70 80 
```

## Applications
- **Search Applications**: Used to store data for fast lookup, like phone directories or databases.
- **In-Memory Data**: Efficient for in-memory data representation where fast insertion, deletion, and lookup are required.
- **Sorting**: In-order traversal gives a sorted sequence of elements in the BST.

## Time Complexity

| Operation    | Average Time | Worst Case Time (Unbalanced) |
|--------------|--------------|-----------------------------|
| **Search**   | O(log n)     | O(n)                        |
| **Insertion**| O(log n)     | O(n)                        |
| **Deletion** | O(log n)     | O(n)                        |
| **Traversal**| O(n)         | O(n)                        |

> **Note**: In a balanced BST (like AVL or Red-Black Tree), all operations maintain an O(log n) time complexity. In an unbalanced BST, the time complexity can degrade to O(n) in the worst case (degenerating into a linked list).

## Conclusion
A Binary Search Tree is an essential data structure for efficient data management, offering quick search, insertion, and deletion operations. Understanding its structure and algorithms is crucial for optimizing tasks that involve dynamic sets of data.

---

