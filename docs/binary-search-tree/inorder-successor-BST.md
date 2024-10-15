---
id: inorder-successor-binary-search-tree
sidebar_position: 17
title: Inorder Successor in a Binary Search Tree
sidebar_label: Inorder Successor in BST
description: "This post explains how to find the Inorder Successor of a node in a Binary Search Tree (BST) in C++, with code examples and detailed explanations."
tags: [dsa, binary trees, inorder, successor, c++]
---

In this post, we will discuss how to find the **Inorder Successor** of a given node in a **Binary Search Tree (BST)**. The **Inorder Successor** of a node is the node that comes immediately after the given node in the in-order traversal of the BST.

## Problem Definition
Given a node in a binary search tree, find its in-order successor. If the given node does not have an in-order successor, return `NULL`.

- The in-order traversal of a binary tree visits the nodes in ascending order (left → root → right).
- The in-order successor of a node is the smallest node that is greater than the given node.

## Approach
To find the in-order successor of a node in a BST, we need to consider two cases:

1. **The node has a right subtree**:
   - The in-order successor is the leftmost (minimum) node in the right subtree.
   
2. **The node does not have a right subtree**:
   - We traverse up the tree from the node's parent. The in-order successor is the last ancestor for which the node was in the left subtree.

### Steps:
1. **If the node has a right subtree**:
   - Move to the right child and then find the leftmost node in the right subtree.
   
2. **If the node does not have a right subtree**:
   - Move upwards from the node. Traverse up the ancestors until you find a node that is the left child of its parent. That parent will be the in-order successor.
   

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

// Helper function to find the leftmost node in a subtree
TreeNode* findMin(TreeNode* node) {
    while (node->left != NULL) {
        node = node->left;
    }
    return node;
}

// Function to find the inorder successor of a given node in BST
TreeNode* inorderSuccessor(TreeNode* root, TreeNode* node) {
    // Case 1: If there is a right subtree, find the min in that subtree
    if (node->right != NULL) {
        return findMin(node->right);
    }

    // Case 2: If no right subtree, find the deepest ancestor for which the node is in the left subtree
    TreeNode* successor = NULL;
    while (root != NULL) {
        if (node->val < root->val) {
            successor = root; // Potential successor
            root = root->left; // Move left
        } else if (node->val > root->val) {
            root = root->right;  // Move right
        } else {
            break;
        }
    }

    return successor;
}

int main() {
    TreeNode* root = new TreeNode(20);
    root->left = new TreeNode(10);
    root->right = new TreeNode(30);
    root->left->left = new TreeNode(5);
    root->left->right = new TreeNode(15);
    root->right->right = new TreeNode(35);

    TreeNode* node = root->left->right;  // Node with value 15

    TreeNode* successor = inorderSuccessor(root, node);

    if (successor != NULL) {
        cout << "Inorder Successor of node " << node->val << " is " << successor->val << endl;
    } else {
        cout << "Inorder Successor of node " << node->val << " does not exist." << endl;
    }

    return 0;
}
``` 