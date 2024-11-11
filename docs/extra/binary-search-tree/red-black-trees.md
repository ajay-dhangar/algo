---
id: rbt-intro  
sidebar_position: 17 
title: Red-Black Trees  
sidebar_label: Red-Black Trees  
description: "In this blog post, we'll explore Red-Black trees, a type of self-balancing binary search tree that guarantees logarithmic time complexity for search, insertion, and deletion operations."  
tags: [dsa, data structures, rbt]
---

A **Red-Black Tree (RBT)** is a self-balancing binary search tree (BST) that ensures the tree remains approximately balanced after insertions and deletions. The primary goal of a Red-Black Tree is to keep the height of the tree O(log n), ensuring efficient operations.

Each node in a Red-Black Tree has an additional property: a color, which is either **red** or **black**. The tree follows specific rules regarding the colors, which ensures that it remains balanced.

## Properties of Red-Black Trees

1. **Every node is either red or black.**
2. **The root is always black.**
3. **Every leaf (null node) is black.**
4. **Red nodes cannot have red children** (no two red nodes appear consecutively along a path).
5. **Every path from a node to its descendant leaves has the same number of black nodes**.

These properties ensure that the longest path from the root to a leaf is no more than twice as long as the shortest path, guaranteeing O(log n) height.

## Definition and Structure

A Red-Black Tree consists of nodes with the following attributes:
- **Data:** The value stored in the node.
- **Left Child:** A reference to the left subtree.
- **Right Child:** A reference to the right subtree.
- **Color:** Each node is either red or black, maintaining the Red-Black properties.

## Types of Rotations

To maintain balance, Red-Black Trees utilize rotations similar to AVL Trees. These include:

1. **Left Rotation**: Shifts the tree to the left when a right-heavy subtree becomes unbalanced.
2. **Right Rotation**: Shifts the tree to the right when a left-heavy subtree becomes unbalanced.
3. **Left-Right Rotation**: A left rotation followed by a right rotation, used when a left-heavy subtree's right child causes imbalance.
4. **Right-Left Rotation**: A right rotation followed by a left rotation, used when a right-heavy subtree's left child causes imbalance.

## Operations on Red-Black Trees

### 1. Insertion

Inserting a new node into a Red-Black Tree involves several steps:

- Insert the new node as you would in a regular BST.
- Color the new node red.
- Fix any violations of the Red-Black properties by adjusting the tree with recoloring and rotations.

#### Code Example (C++)

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
    bool isRed;
};

Node* insert(Node* root, int key) {
    // Insert like a regular BST node
    if (root == nullptr) {
        Node* newNode = new Node();
        newNode->data = key;
        newNode->left = nullptr;
        newNode->right = nullptr;
        newNode->isRed = true;  // New nodes are always red
        return newNode;
    }
    
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);

    // Fix Red-Black properties
    return balance(root);
}
```

### 2. Searching

The searching operation in a Red-Black Tree is identical to that of a standard BST. Due to the self-balancing properties of RBTs, the time complexity is guaranteed to be O(log n).

### Code Example (C++)

```cpp
bool search(Node* root, int key) {
    if (root == nullptr) return false;

    if (root->data == key) return true;

    if (key < root->data)
        return search(root->left, key);

    return search(root->right, key);
}
```

### 3. Deletion

Deleting a node from a Red-Black Tree follows the same steps as a standard BST deletion, but with additional balancing to maintain the Red-Black properties. After deletion, the tree may violate the Red-Black rules, so recoloring and rotations are performed to restore balance.

#### Steps for Deletion:

1. Remove the node similarly to a regular BST deletion.
2. If the deleted node or its replacement is red, the tree is still balanced.
3. If the deleted node or its replacement is black, the tree needs to be rebalanced through rotations and recoloring.

### Code Example (C++)

```cpp
Node* deleteNode(Node* root, int key) {
    // Perform standard BST deletion
    if (root == nullptr) return nullptr;

    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        if (root->left == nullptr || root->right == nullptr) {
            Node* temp = root->left ? root->left : root->right;
            delete root;
            return temp;
        }

        Node* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }

    // Fix Red-Black properties
    return balance(root);
}
```

## Advantages and Disadvantages

### Advantages:
- Guarantees O(log n) time complexity for search, insertion, and deletion.
- Self-balancing, preventing the tree from becoming skewed.
- Simpler than AVL trees in terms of rebalancing operations.

### Disadvantages:
- Balancing is not as strict as AVL trees, leading to slightly worse balancing in certain cases.
- Complex to implement due to recoloring and rotation logic.

## Applications of Red-Black Trees

- **Memory Management:** Used in memory allocators to efficiently manage memory chunks.
- **Linux Kernel:** Red-Black Trees are used in process scheduling and other kernel operations.
- **Database Indexing:** Red-Black Trees are used in databases to maintain balance for indexing.
- **Computational Geometry:** Used for dynamic sets of intervals and points in geometric algorithms.

---
