---
id: binary-tree-operations
sidebar_position: 2
title: Basic Operations on Binary Trees
sidebar_label: Binary Tree Operations
description: "In this blog post, we'll cover the basic operations on binary trees, including insertion, deletion, searching, and traversal techniques, with examples in C++."
tags: [dsa, data structures, binary trees]
---

## Introduction
Binary trees are a versatile data structure that allows for efficient operations like searching, insertion, and deletion. In this post, we’ll explore the core operations used to manipulate binary trees, along with traversal methods that are key to utilizing binary trees effectively.

## Basic Operations on Binary Trees

### 1. Insertion
Inserting a new node into a binary tree involves placing the node in its correct position, maintaining the structure of the binary tree.

#### Example in C++:
```cpp
// Insert function
Node* insert(Node* root, int val) {
    if (root == nullptr) {
        return new Node(val); // Inserting at an empty spot
    }
    if (val < root->data) {
        root->left = insert(root->left, val);//Traversing to left sub-tree
    } else {
        root->right = insert(root->right, val);//Traversing to right sub-tree
    }
    return root;
}
```
```
Inserting E at the right of B

       A                          A
     /   \                      /   \
    B     C       ------>      B     C
   /     / \                  / \   / \
  D     F   G                D   E F   G
```
### 2. Deletion
In a binary tree, when deleting a node, the node to be deleted is replaced by the deepest node in the tree. This approach ensures that the tree remains complete. The deletion process involves the following steps:

#### 1. Identify the Deepest Node:
Traverse the binary tree to find the deepest node (the node that is the last in the level order traversal). This node will be used to replace the node being deleted.

#### 2. Replace the Node:
Replace the value of the node to be deleted with the value of the deepest node.

#### 3. Delete the Deepest Node:
Remove the deepest node from the tree. Since it is a leaf node, you can simply delete it.

#### Example in C++:
```cpp
// Helper function to remove the deepest rightmost node
void remove_node(Node* root, Node* n) {
    if (root == nullptr) {
        return;
    }
    if (root == n) {
        delete root;
        root = nullptr;
        return;
    }
    if (root->left == n) {
        delete n;
        root->left = nullptr;
        return;
    }
    if (root->right == n) {
        delete n;
        root->right = nullptr;
        return;
    }
    remove_node(root->left, n);
    remove_node(root->right, n);
}

// Function to delete a node in a binary tree
Node* delete_node(Node* root, int key) {
    if (root == nullptr)
        return nullptr;

    // Queue for level order traversal
    std::queue<Node*> Q;
    Q.push(root);

    Node* key_node = nullptr;
    Node* curr_node = nullptr;

    // Level order traversal to find the node to delete and the deepest node
    while (!Q.empty()) {
        curr_node = Q.front();
        Q.pop();

        // If the node with the given key is found, store it
        if (curr_node->data == key) {
            key_node = curr_node;
        }

        // Traverse the left child
        if (curr_node->left != nullptr) {
            Q.push(curr_node->left);
        }

        // Traverse the right child
        if (curr_node->right != nullptr) {
            Q.push(curr_node->right);
        }
    }

    // If the node to delete was found, replace its value with the deepest node's value
    if (key_node != nullptr) {
        int x = curr_node->data;   // Value of the deepest rightmost node
        key_node->data = x;        // Replace the key_node's data with deepest node data
        remove_node(root, curr_node);  // Remove the deepest rightmost node
    }

    return root;
}
```
```
Case # 01: Deleting A (Root Node Removal)

       A                          G
     /   \                      /   \
    B     C       ------>      B     C
   / \   / \                  / \   / 
  D   E F   G                D   E F
```
### 3. Searching
Searching for a value in a binary tree involves comparing the value with the current node’s data and then recursively searching in the left or right subtree based on the comparison.

#### Example in C++:
```cpp
bool search(Node* root, int val) {
    if (root == nullptr) {
        return false;  // Base case: reached a null node, value not found
    }
    if (root->data == val) {
        return true;  // Value found
    } else if (val < root->data) {
        return search(root->left, val);  // Search in the left subtree
    } else {
        return search(root->right, val);  // Search in the right subtree
    }
}
```
## Complexity Analysis of Binary Tree Operations

### 1. Time Complexity

| OPERATION  | BEST CASE | AVERAGE CASE | WORST CASE |
|------------|------------|--------------|------------|
| Insertion  | O(logN)    | O(N^0.5)     | O(N)       |
| Search     | O(1)       | O(N^0.5)     | O(N)       |
| Deletion   | O(logN)    | O(N^0.5)     | O(N)       |

### 2. Space Complexity
The space complexity of the Binary Tree for all operations is O(N).


## Binary Tree Traversals
Traversal refers to visiting all nodes in a binary tree in a specific order. There are three main types of traversal:

#### a) Pre-order Traversal (Root, Left, Right)
In pre-order traversal, we visit the root node first, then the left subtree, and finally the right subtree. This method is useful for creating a copy of the tree or for prefix expression evaluations.

#### Example in C++:
```cpp
void preOrder(Node* root) {
    if (root == nullptr) return;
    cout << root->data << " ";  // Visit the root node
    preOrder(root->left);       // Traverse the left subtree
    preOrder(root->right);      // Traverse the right subtree
}
```
```
       A                
     /   \                     
    B     C       
   / \   / \                
  D   E F   G

  Pre-Order Traversal: A B D E C F G
```

#### b) In-order Traversal (Left, Root, Right)
In in-order traversal, we visit the left subtree first, then the root node, and finally the right subtree. For binary search trees, in-order traversal visits nodes in ascending order.

#### Example in C++:
```cpp
void inOrder(Node* root) {
    if (root == nullptr) return;
    inOrder(root->left);      // Traverse the left subtree
    cout << root->data << " "; // Visit the root node
    inOrder(root->right);     // Traverse the right subtree
}
```
```
       A                
     /   \                     
    B     C       
   / \   / \                
  D   E F   G

  In-Order Traversal: D B E A F C G
```
#### c) Post-order Traversal (Left, Right, Root)
In post-order traversal, we visit the left subtree first, followed by the right subtree, and finally the root node.

#### Example in C++:
```cpp
void postOrder(Node* root) {
    if (root == nullptr) return;
    postOrder(root->left);     // Traverse the left subtree
    postOrder(root->right);    // Traverse the right subtree
    cout << root->data << " "; // Visit the root node
}
```
```
       A                
     /   \                     
    B     C       
   / \   / \                
  D   E F   G

  Post-Order Traversal: D E B F G C A
```
