---
id: tree-data-structures
title: Tree Data Structures
sidebar_label: Tree Data Structures
description: "An in-depth guide to tree data structures, covering types of trees, traversal methods, balancing, and algorithms with implementations."
tags: [dsa, trees, algorithms, binary-trees]
---

### Introduction

A **Tree** is a widely used data structure that simulates a hierarchical tree structure with a set of nodes. It is a non-linear data structure, meaning data elements are not arranged in a sequential manner.

- **Root**: The topmost node in a tree.
- **Node**: Each element in a tree, containing a value or data, and references to other nodes.
- **Edge**: The link between two nodes.
- **Parent and Child**: The connected nodes, where one is higher in the hierarchy (parent) and others are lower (children).
- **Leaf**: A node without children.
- **Depth**: The number of edges from the root to the node.
- **Height**: The number of edges in the longest path from a node to a leaf.

### Types of Trees

1. **Binary Tree**: A tree where each node has at most two children.
   - **Full Binary Tree**: Every node has either 0 or 2 children.
   - **Complete Binary Tree**: All levels are fully filled except possibly the last level.
   - **Perfect Binary Tree**: All levels are fully filled, including the last level.
   - **Balanced Binary Tree**: The height difference between left and right subtrees of every node is at most one.

2. **Binary Search Tree (BST)**: A binary tree with the left child containing nodes with lesser values, and the right child containing nodes with greater values.

3. **AVL Tree**: A self-balancing binary search tree where the difference in heights of left and right subtrees is at most one for all nodes.

4. **Red-Black Tree**: A balanced binary search tree with additional properties to ensure balance through color-coding.

5. **B-Tree**: A self-balancing tree data structure that maintains sorted data and allows searches, insertions, deletions, and sequential access in logarithmic time.

6. **Trie**: A tree-like data structure used for storing a dynamic set of strings, often used for searching words.

### Tree Traversals

Tree traversal refers to the process of visiting each node in a tree exactly once in a specific order. The main types of tree traversal are:

1. **In-Order Traversal** (for BSTs):
   - Traverse the left subtree.
   - Visit the root node.
   - Traverse the right subtree.
   - *Use Case*: To retrieve data in a sorted order in a BST.

2. **Pre-Order Traversal**:
   - Visit the root node.
   - Traverse the left subtree.
   - Traverse the right subtree.
   - *Use Case*: Used for creating a copy of the tree.

3. **Post-Order Traversal**:
   - Traverse the left subtree.
   - Traverse the right subtree.
   - Visit the root node.
   - *Use Case*: Used for deleting the tree.

4. **Level-Order Traversal**:
   - Visit nodes level by level from the root.
   - *Use Case*: Finding the shortest path or level-by-level operations.

### Tree Balancing

Balancing a tree ensures that the tree maintains its structure for efficient operations. The two most common balanced trees are **AVL Trees** and **Red-Black Trees**.

- **AVL Tree**: Self-balances by performing rotations (Left, Right, Left-Right, Right-Left) to maintain a height difference of at most one between subtrees.

- **Red-Black Tree**: Uses coloring and rotations to ensure that no path is more than twice as long as any other, leading to `O(log n)` time complexity for operations.

### Tree Algorithms

1. **Insertion**:
   - Binary Search Tree (BST): Place the new node in a position that maintains the BST property.
   - AVL Tree: After insertion, rotate nodes as needed to balance the tree.
   - Red-Black Tree: Insert a new node as a red node and recolor or rotate as needed.

2. **Deletion**:
   - BST: Remove the node and reorganize the subtree if necessary.
   - AVL Tree: After deletion, rebalance the tree using rotations.
   - Red-Black Tree: Remove the node, then perform recoloring or rotations to maintain balance.

3. **Search**:
   - BST: Use a binary search strategy to find the element.
   - Trie: Traverse through nodes based on characters of the string.

### Example: Binary Search Tree Implementation in Java

```java
class Node {
    int key;
    Node left, right;

    public Node(int item) {
        key = item;
        left = right = null;
    }
}

class BinarySearchTree {
    Node root;

    BinarySearchTree() {
        root = null;
    }

    // Insert a new node with given key
    void insert(int key) {
        root = insertRec(root, key);
    }

    Node insertRec(Node root, int key) {
        if (root == null) {
            root = new Node(key);
            return root;
        }
        if (key < root.key)
            root.left = insertRec(root.left, key);
        else if (key > root.key)
            root.right = insertRec(root.right, key);
        return root;
    }

    // Inorder traversal of the tree
    void inorder() {
        inorderRec(root);
    }

    void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.key + " ");
            inorderRec(root.right);
        }
    }

    // Delete a node with given key
    void deleteKey(int key) {
        root = deleteRec(root, key);
    }

    Node deleteRec(Node root, int key) {
        if (root == null) return root;

        if (key < root.key)
            root.left = deleteRec(root.left, key);
        else if (key > root.key)
            root.right = deleteRec(root.right, key);
        else {
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;

            root.key = minValue(root.right);
            root.right = deleteRec(root.right, root.key);
        }
        return root;
    }

    int minValue(Node root) {
        int minValue = root.key;
        while (root.left != null) {
            minValue = root.left.key;
            root = root.left;
        }
        return minValue;
    }
}
```