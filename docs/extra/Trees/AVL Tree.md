---
id: avl-trees
title: AVL Trees
sidebar_label: AVL Trees
sidebar_position: 2
description: An overview of AVL trees, their properties, and operations.
tags: [data structures, trees, algorithms]
---

# AVL Trees

An AVL tree is a self-balancing binary search tree where the difference between the heights of left and right subtrees cannot be more than one for all nodes. This property ensures that the tree remains balanced, leading to efficient search, insertion, and deletion operations.

## Properties of AVL Trees

1. **Balance Factor**: For any node in the tree, the balance factor is defined as the height of the left subtree minus the height of the right subtree. It can take values of -1, 0, or +1.
2. **Height-Balanced**: The AVL tree maintains its balance through rotations during insertion and deletion operations.
3. **Binary Search Tree**: Like all binary search trees, AVL trees maintain the property that for any node, the left subtree contains only nodes with keys less than the node’s key, and the right subtree only nodes with keys greater than the node’s key.

## Rotations

To maintain balance, AVL trees perform rotations during insertions and deletions:

- **Right Rotation**: Used when a left-heavy subtree needs to be balanced.
- **Left Rotation**: Used when a right-heavy subtree needs to be balanced.
- **Left-Right Rotation**: A combination of left rotation followed by a right rotation.
- **Right-Left Rotation**: A combination of right rotation followed by a left rotation.

## Implementation

Python implementation of an AVL tree with insertion:

```python
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def insert(self, root, key):
        if not root:
            return Node(key)
        elif key < root.key:
            root.left = self.insert(root.left, key)
        else:
            root.right = self.insert(root.right, key)

        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))
        balance = self.get_balance(root)

        # Left Left Case
        if balance > 1 and key < root.left.key:
            return self.right_rotate(root)
        # Right Right Case
        if balance < -1 and key > root.right.key:
            return self.left_rotate(root)
        # Left Right Case
        if balance > 1 and key > root.left.key:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        # Right Left Case
        if balance < -1 and key < root.right.key:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root

    def get_height(self, root):
        if not root:
            return 0
        return root.height

    def get_balance(self, root):
        if not root:
            return 0
        return self.get_height(root.left) - self.get_height(root.right)

    def right_rotate(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        z.height = 1 + max(self.get_height(z.left), self.get_height(z.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def left_rotate(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        z.height = 1 + max(self.get_height(z.left), self.get_height(z.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y
```

