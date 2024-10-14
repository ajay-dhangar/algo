---
id: bst-intro
sidebar_position: 1
title: Binary Search Trees
sidebar_label: Binary Search Trees
description: "In this blog post, we'll explore binary search trees (BSTs), a special type of binary tree that allows for efficient searching, insertion, and deletion of elements."
tags: [dsa, data structures, bst]
---

## Introduction
A **Binary Search Tree (BST)** is a type of binary tree where each node follows a specific ordering property: 
- All the values in the left subtree are less than the root node.
- All the values in the right subtree are greater than the root node.

This structure makes it efficient for performing operations like searching, insertion, and deletion. BSTs are an important part of computer science and widely used in various applications like databases and search engines.

## Definition and Structure
A binary search tree consists of nodes, where each node contains:
- **Data:** The value stored in the node.
- **Left Child:** A reference to the left subtree (containing nodes with smaller values).
- **Right Child:** A reference to the right subtree (containing nodes with larger values).

The hierarchical structure begins with the root node and follows the binary search property across all nodes.

## Properties
Some important properties of binary search trees include:
- **Height:** The length of the longest path from the root to a leaf. A balanced BST will have a height of log(n), where n is the number of nodes.
- **Depth:** The number of edges from the root to a given node. The root has a depth of 0.
- **Balanced Trees:** A tree is considered balanced when the heights of the left and right subtrees of any node differ by at most one. This ensures the best performance for all operations.

    ``` 
         10
        /  \
       5   20
      / \    \
     2   7   25

    Height of the tree: 2
    Depth of node 7: 2
    Balanced: Yes
    ```

## Types of Binary Search Trees
1. **Unbalanced BST:** A BST that has nodes unevenly distributed, which can degrade performance to O(n) in the worst case.
    ```
         1
          \
           2
            \
             3
              \
               4
    ```

2. **Self-Balancing BST:** These trees automatically balance themselves, ensuring that the height remains logarithmic. Examples include:
   - **AVL Trees**: Ensures that the difference in heights of left and right subtrees is at most 1.
   - **Red-Black Trees**: Ensures balanced height using color properties at nodes.

## Operations on Binary Search Trees

### 1. Insertion
To insert a new value into the BST:
- If the tree is empty, the new value becomes the root.
- If the new value is smaller than the root, recursively insert it in the left subtree.
- If the new value is greater than the root, recursively insert it in the right subtree.

#### Code Example (C++)

```cpp
Node* insert(Node* root, int key) {
    if (root == nullptr) {
        return new Node(key);
    }
    
    if (key < root->data) {
        root->left = insert(root->left, key);
    } else if (key > root->data) {
        root->right = insert(root->right, key);
    }
    
    return root;
}
```
### 2. Searching
Searching is a core operation in a **Binary Search Tree (BST)**. The structure of the BST makes searching efficient when the tree is balanced.

### Searching in a Binary Search Tree
The search process in a BST leverages its structural properties:
- The left subtree contains only values smaller than the root.
- The right subtree contains only values larger than the root.

### Steps to Search:
1. **Start at the root node.**
2. **Compare** the target value with the root node:
   - If the target is **equal** to the root's value, return the node.
   - If the target is **less than** the root's value, search the left subtree.
   - If the target is **greater than** the root's value, search the right subtree.
3. If the target value is not found, return `false`.

### C++ Implementation

#### Recursive Search in C++
The recursive approach reduces the problem size at each step by calling the function on the left or right subtree based on the comparison.

```cpp
bool search(Node* root, int key) {
    // Base case: root is null or key is present at root
    if (root == nullptr) return false;
    
    // Key found
    if (root->data == key) return true;
    
    // Key is smaller than root's data
    if (key < root->data) return search(root->left, key);
    
    // Key is larger than root's data
    return search(root->right, key);
}
```


### 3. Deletion
Deletion is a crucial operation in a **Binary Search Tree (BST)**. Removing a node from a BST must maintain the binary search property: the left subtree contains only values smaller than the root, and the right subtree contains only values larger than the root.

### Types of Node Deletion in a BST
When deleting a node from a BST, there are three possible cases:

1. **Node to be deleted is a leaf (has no children).**
   - Simply remove the node.
   
2. **Node to be deleted has one child.**
   - Replace the node with its child.
   
3. **Node to be deleted has two children.**
   - Find the node's **inorder successor** (smallest node in the right subtree) or **inorder predecessor** (largest node in the left subtree) and replace the node with that value. Then, delete the inorder successor or predecessor.

### Case 1: Deleting a Leaf Node
If the node to be deleted is a leaf (no children), it can simply be removed from the tree.

#### Example:
```python
    10                       10        
   /  \                     /  \
  5    15    --------->    5    15
      /  \                        \
     12   20                       20

    # Deleting 12
```

### Case 2: Deleting a Node with One Child
If the node to be deleted has one child, replace the node with its child.

#### Example:
```python
    10                       10        
   /  \                     /  \
  5    15    --------->    5    20
         \                        
         20                       

    # Deleting 15
```


### Case 3: Deleting a Node with Two Children
If the node to be deleted has two children, replace it with its **inorder predecessor** (the smallest value in the right subtree). After the replacement, delete the inorder predecessor.

#### Example:
```python
    10                       10        
   /  \                     /  \
  5    15    --------->    5    12
      /  \                        \
     12   20                       20

    # Deleting 15 (12 is inorder predecessor)
```
### Implementation:
```cpp
    Node *InorderPredecessor(Node *node)
    {
        if (node->left != NULL)
            node = node->left;
        while (node->right != NULL)
        {
            if (node->left != NULL)
                node = node->left;
            else
                node = node->right;
        }
        return node;
    }
    Node *deletion(Node *node, int key)
    {
        Node *iPre = new Node;
        if (node == NULL)
            return NULL;
        if (node->left == NULL && node->right == NULL)
        {
            delete node;
            return NULL;
        }
        if (node->data > key)
            node->left = deletion(node->left, key);
        else if (node->data < key)
            node->right = deletion(node->right, key);
        else
        {
            iPre = InorderPredecessor(node);
            node->data = iPre->data;
            node->left = deletion(node->left, iPre->data);
        }
    return node;
}
```

## Advantages and Disadvantages
### Advantages:

- Provides efficient search, insertion, and deletion (O(log n) on average).

- Maintains data in a sorted manner, allowing for in-order traversal.
### Disadvantages:

- Can become unbalanced, leading to O(n) worst-case time complexity.
- Extra memory required for storing pointers to left and right children.
## Applications of Binary Search Trees
- **Searching and Sorting:** Efficient for performing binary search and organizing data.
- **Database Indexing:** BSTs help in implementing indexes for fast query retrieval.
- **File Systems:** Used in file systems to maintain directories and files.
- **Priority Queues:** BST-based structures like heaps are used in implementing priority queues.
- **Auto-complete Systems:** Used in search engines to store prefixes of words.