---

id: splay-intro  
sidebar_position: 2  
title: Splay Trees  
sidebar_label: Splay Trees  
description: "In this blog post, we'll explore Splay Trees, a type of self-adjusting binary search tree that provides amortized logarithmic time complexity for search, insertion, and deletion operations."  
tags: [dsa, data structures, splay-trees]  

---

## Introduction

A **Splay Tree** is a self-adjusting binary search tree (BST) that performs basic operations such as search, insertion, and deletion in amortized O(log n) time. The tree self-adjusts by moving the most recently accessed element to the root through a process called **splaying**. This ensures that frequently accessed elements are quick to reach in future operations.

Splay trees are particularly effective when access patterns exhibit locality of reference, meaning that recently accessed elements are likely to be accessed again soon.

## Properties of Splay Trees

1. **Self-adjusting**: The most recently accessed node is moved to the root of the tree.
2. **Binary Search Tree**: Maintains the basic properties of a BST, where for any node `x`, the left subtree contains nodes with keys less than `x` and the right subtree contains nodes with keys greater than `x`.
3. **Amortized Complexity**: Although individual operations can take O(n) in the worst case, the amortized time complexity of operations is O(log n).

## Definition and Structure

A Splay Tree consists of nodes with the following attributes:
- **Data**: The value stored in the node.
- **Left Child**: A reference to the left subtree.
- **Right Child**: A reference to the right subtree.

## Splaying Operations

Splaying is the process of moving a node to the root of the tree by performing a sequence of rotations. This operation restructures the tree based on access patterns, making frequently accessed nodes easier to reach.

### Types of Rotations

Splay Trees perform three types of rotations during splaying:

1. **Zig Rotation**: Performed when the node is a child of the root. A single rotation is performed to move the node to the root.
2. **Zig-Zig Rotation**: Performed when both the node and its parent are either left or right children. Two single rotations are performed.
3. **Zig-Zag Rotation**: Performed when the node is a left child, but its parent is a right child (or vice versa). A double rotation is performed to move the node to the root.

## Operations on Splay Trees

### 1. Insertion

Inserting a new node into a Splay Tree involves a typical BST insertion followed by splaying the newly inserted node to the root.

#### Code Example (C++)

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
};

Node* splay(Node* root, int key);

Node* insert(Node* root, int key) {
    if (root == nullptr) {
        Node* newNode = new Node();
        newNode->data = key;
        newNode->left = nullptr;
        newNode->right = nullptr;
        return newNode;
    }

    // Splay the tree to bring the closest node to root
    root = splay(root, key);

    if (root->data == key) return root;  // Node already exists

    Node* newNode = new Node();
    newNode->data = key;

    if (key < root->data) {
        newNode->right = root;
        newNode->left = root->left;
        root->left = nullptr;
    } else {
        newNode->left = root;
        newNode->right = root->right;
        root->right = nullptr;
    }

    return newNode;
}
```

### 2. Searching

Searching for a node in a Splay Tree involves first performing a standard BST search. Once the node is found (or the closest node), splaying brings it to the root to optimize future searches.

### Code Example (C++)

```cpp
Node* splay(Node* root, int key);

Node* search(Node* root, int key) {
    return splay(root, key);
}
```

### 3. Deletion

Deletion in a Splay Tree is a two-step process. First, the node to be deleted is splayed to the root. Then, the tree is split into two subtrees (left and right), and the right subtree is splayed to bring the smallest element to the root, after which it is joined with the left subtree.

### Code Example (C++)

```cpp
Node* deleteNode(Node* root, int key) {
    if (root == nullptr) return nullptr;

    // Splay the node to the root
    root = splay(root, key);

    // If the node isn't present, return
    if (root->data != key) return root;

    Node* temp;
    if (root->left == nullptr) {
        temp = root;
        root = root->right;
    } else {
        temp = root;
        root = splay(root->left, key);
        root->right = temp->right;
    }

    delete temp;
    return root;
}
```

## Advantages and Disadvantages

### Advantages:
- **Amortized O(log n)** time complexity for search, insertion, and deletion.
- Frequently accessed elements are fast to access, making the tree ideal for caches and other data structures with locality of reference.
- Simpler than AVL or Red-Black trees since no explicit balancing is required after every operation.

### Disadvantages:
- **Worst-case O(n)** time complexity for individual operations, though this is rare with random access patterns.
- Not as strictly balanced as other self-balancing trees like AVL or Red-Black Trees.
- Performance can degrade if access patterns are highly unbalanced.

## Applications of Splay Trees

- **Cache Implementations**: Splay trees are often used in cache implementations where recent access patterns exhibit temporal locality.
- **Data Compression**: Splay trees are used in some data compression algorithms like adaptive Huffman encoding.
- **Memory Management**: Splay trees are employed in certain dynamic memory allocation schemes for efficient block management.
- **Network Routers**: Splay trees are used to manage routing tables that require frequent updates.

---
