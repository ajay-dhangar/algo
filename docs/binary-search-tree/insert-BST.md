---
id: insert-binary-search-tree
sidebar_position: 14
title: Insert in a Binary Search Tree
sidebar_label: Insert in BST
description: "This blog post covers how to insert a value in a Binary Search Tree (BST) in C++, along with explanations and code examples."
tags: [dsa, binary trees, insert, c++]
---

In this post, we will discuss how to insert a specific value into a **Binary Search Tree (BST)**. A BST is a special kind of binary tree where each node has a value greater than all values in its left subtree and less than all values in its right subtree.

## Problem Definition
Given a binary search tree and a value to insert, the goal is to place the value in the correct position in the tree while maintaining the BST properties. If the value already exists in the tree, we do not insert it again.

## Approach
To insert a value in a BST, we can utilize the properties of the BST. Starting from the root node, we compare the value to insert with the value of the current node:

1. If the value is less than the current node's value, we proceed to the left subtree.
2. If the value is greater than the current node's value, we proceed to the right subtree.
3. If we find a `NULL` position, we insert the new value as a new node.

### Steps:
1. Start from the root node.
2. If the current node is `NULL`, create a new node with the value and return it.
3. Compare the value to insert with the current node's value:
   - If the value is less, move to the left child.
   - If the value is greater, move to the right child.
4. Repeat until you find a `NULL` position, then insert the new node.

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

// Function to insert a value in a binary search tree
TreeNode* insertBST(TreeNode* root, int val) {
    // If the current node is NULL, create a new node
    if (root == NULL) {
        return new TreeNode(val);
    }
    
    // If the value is less, go to the left subtree
    if (val < root->val) {
        root->left = insertBST(root->left, val);
    } else if (val > root->val) { // If the value is greater, go to the right subtree
        root->right = insertBST(root->right, val);
    }
    
    // Return the unchanged node pointer
    return root;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);

    int valueToInsert = 5;
    root = insertBST(root, valueToInsert);

    cout << "Value " << valueToInsert << " inserted in the BST." << endl;

    return 0;
}
```