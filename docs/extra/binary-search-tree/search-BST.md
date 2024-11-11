---
id: search-binary-search-tree
sidebar_position: 13
title: Search in a Binary Search Tree
sidebar_label: Search in BST
description: "This blog post covers how to search for a value in a Binary Search Tree (BST) in C++, along with explanations and code examples."
tags: [dsa, binary trees, search, c++]
---

In this post, we will discuss how to search for a specific value in a **Binary Search Tree (BST)**. A BST is a special kind of binary tree where each node has a value greater than all values in its left subtree and less than all values in its right subtree.

## Problem Definition
Given a binary search tree and a target value, the goal is to determine if the target value exists in the tree. If it exists, we return the corresponding node; otherwise, we return `NULL`.

## Approach
To search for a value in a BST, we can utilize the properties of the BST. Starting from the root node, we compare the target value with the value of the current node:

1. If the target value is equal to the current node's value, we have found the target, and we return the current node.
2. If the target value is less than the current node's value, we search in the left subtree.
3. If the target value is greater than the current node's value, we search in the right subtree.

### Steps:
1. Start from the root node.
2. If the current node is `NULL`, return `NULL`.
3. Compare the target value with the current node's value:
   - If they are equal, return the current node.
   - If the target value is less, move to the left child.
   - If the target value is greater, move to the right child.
4. Repeat until you find the target or exhaust the tree.

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

// Function to search a value in a binary search tree
TreeNode* searchBST(TreeNode* root, int val) {
    if (root == NULL || root->val == val) {
        return root;
    }
    if (val < root->val) {
        return searchBST(root->left, val);
    } else {
        return searchBST(root->right, val);
    }
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);

    int target = 2;
    TreeNode* result = searchBST(root, target);

    if (result != NULL) {
        cout << "Found: " << result->val << endl;
    } else {
        cout << "Value not found in the BST." << endl;
    }

    return 0;
}
```
### JAVA Code Implementation

```java
// Definition for a binary search tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    // Constructor for initializing a TreeNode with a value
    TreeNode(int x) {
        val = x;
        left = null;
        right = null;
    }
}

public class BinarySearchTree {

    // Function to search a value in a binary search tree
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) {
            return root;
        }
        if (val < root.val) {
            return searchBST(root.left, val);
        } else {
            return searchBST(root.right, val);
        }
    }

    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();

        // Building the binary search tree
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);

        // Define the target value to search for
        int target = 2;
        
        // Search for the target value in the tree
        TreeNode result = bst.searchBST(root, target);

        // Output the result
        if (result != null) {
            System.out.println("Found: " + result.val);
        } else {
            System.out.println("Value not found in the BST.");
        }
    }
}

```
