---
id: inorder-predecessor-binary-search-tree
sidebar_position: 16
title: Inorder Predecessor in a Binary Search Tree
sidebar_label: Inorder Predecessor in BST
description: "This post explains how to find the Inorder Predecessor of a node in a Binary Search Tree (BST) in C++, with code examples and detailed explanations."
tags: [dsa, binary trees, inorder, predecessor, c++]
---

In this post, we will discuss how to find the **Inorder Predecessor** of a given node in a **Binary Search Tree (BST)**. The **Inorder Predecessor** of a node is the node that comes immediately before the given node in the in-order traversal of the BST.

## Problem Definition
Given a node in a binary search tree, find its in-order predecessor. If the given node does not have an in-order predecessor, return `NULL`.

- The in-order traversal of a binary tree visits the nodes in ascending order (left → root → right).
- The in-order predecessor of a node is the largest node that is smaller than the given node.

## Approach
To find the in-order predecessor of a node in a BST, we need to consider two cases:

1. **The node has a left subtree**:
   - The in-order predecessor is the rightmost (maximum) node in the left subtree.
   
2. **The node does not have a left subtree**:
   - We traverse up the tree from the node's parent. The in-order predecessor is the last ancestor for which the node was in the right subtree.

### Steps:
1. **If the node has a left subtree**:
   - Move to the left child and then find the rightmost node in the left subtree.
   
2. **If the node does not have a left subtree**:
   - Move upwards from the node. Traverse up the ancestors until you find a node that is the right child of its parent. That parent will be the in-order predecessor.

### C++ Code Implementation

```cpp
#include <iostream>
using namespace std;

// Definition for a binary search tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Helper function to find the rightmost node in a subtree
TreeNode* findMax(TreeNode* node) {
    while (node->right != NULL) {
        node = node->right;
    }
    return node;
}

// Function to find the inorder predecessor of a given node in BST
TreeNode* inorderPredecessor(TreeNode* root, TreeNode* node) {
    // Case 1: If there is a left subtree, find the max in that subtree
    if (node->left != NULL) {
        return findMax(node->left);
    }

    // Case 2: If no left subtree, find the deepest ancestor for which the node is in the right subtree
    TreeNode* predecessor = NULL;
    while (root != NULL) {
        if (node->val > root->val) {
            predecessor = root; // Potential predecessor
            root = root->right; // Move right
        } else if (node->val < root->val) {
            root = root->left;  // Move left
        } else {
            break;
        }
    }

    return predecessor;
}

int main() {
    TreeNode* root = new TreeNode(20);
    root->left = new TreeNode(10);
    root->right = new TreeNode(30);
    root->left->left = new TreeNode(5);
    root->left->right = new TreeNode(15);
    root->right->right = new TreeNode(35);

    TreeNode* node = root->left->right;  // Node with value 15

    TreeNode* predecessor = inorderPredecessor(root, node);

    if (predecessor != NULL) {
        cout << "Inorder Predecessor of node " << node->val << " is " << predecessor->val << endl;
    } else {
        cout << "Inorder Predecessor of node " << node->val << " does not exist." << endl;
    }

    return 0;
}
```