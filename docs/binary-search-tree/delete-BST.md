---
id: delete-binary-search-tree
sidebar_position: 15
title: Delete in a Binary Search Tree
sidebar_label: Delete in BST
description: "This blog post covers how to delete a value from a Binary Search Tree (BST) in C++, along with explanations and code examples."
tags: [dsa, binary trees, delete, c++]
---

In this post, we will discuss how to delete a specific value from a **Binary Search Tree (BST)**. A BST is a special kind of binary tree where each node has a value greater than all values in its left subtree and less than all values in its right subtree.

## Problem Definition
Given a binary search tree and a value to delete, the goal is to remove the node containing the value from the tree while maintaining the BST properties. If the value does not exist in the tree, we do nothing.

## Approach
To delete a value from a BST, we need to consider three scenarios based on the node to be deleted:

1. **Node with no children (leaf node):** Simply remove the node.
2. **Node with one child:** Remove the node and link its parent to its child.
3. **Node with two children:** Find the inorder successor (smallest value in the right subtree) or inorder predecessor (largest value in the left subtree) to replace the node's value, and then delete the successor/predecessor.

### Steps:
1. Start from the root node.
2. If the current node is `NULL`, return `NULL`.
3. Compare the value to delete with the current node's value:
   - If they are equal, handle the three scenarios outlined above.
   - If the value is less, move to the left child.
   - If the value is greater, move to the right child.
4. Repeat until you find the node to delete.

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

// Function to find the minimum value node in a BST
TreeNode* minValueNode(TreeNode* node) {
    TreeNode* current = node;
    while (current && current->left != NULL) {
        current = current->left;
    }
    return current;
}

// Function to delete a value from a binary search tree
TreeNode* deleteBST(TreeNode* root, int val) {
    if (root == NULL) {
        return root;
    }
    
    // If the value to be deleted is smaller than the root's value
    if (val < root->val) {
        root->left = deleteBST(root->left, val);
    } 
    // If the value to be deleted is greater than the root's value
    else if (val > root->val) {
        root->right = deleteBST(root->right, val);
    } 
    // Value is found
    else {
        // Node with only one child or no child
        if (root->left == NULL) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == NULL) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }

        // Node with two children: Get the inorder successor (smallest in the right subtree)
        TreeNode* temp = minValueNode(root->right);
        
        // Copy the inorder successor's content to this node
        root->val = temp->val;
        
        // Delete the inorder successor
        root->right = deleteBST(root->right, temp->val);
    }
    return root;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);

    int valueToDelete = 2;
    root = deleteBST(root, valueToDelete);

    cout << "Value " << valueToDelete << " deleted from the BST." << endl;

    return 0;
}
```