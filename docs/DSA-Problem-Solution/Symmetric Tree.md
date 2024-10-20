---
id: symmetric-tree
title: "Symmetric Tree"
sidebar_label: "Symmetric"
sidebar_position: 12
description: "This document includes the solution to the problem of checking whether a binary tree is symmetric around its center, along with the approach and implementation."
tags: [binary tree, symmetric]
---

# Symmetric Tree

## Problem Description

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

A binary tree is symmetric if the left subtree is a mirror reflection of the right subtree.

## Approach

To determine if a binary tree is symmetric, we can use a **recursive approach**. We will compare the left and right subtrees of the tree.

### Steps:

1. **Checker Function**: Create a helper function that takes two nodes as arguments and checks if they are mirrors of each other.
   - If both nodes are `null`, return `true`.
   - If one node is `null` and the other is not, return `false`.
   - If the values of both nodes are different, return `false`.
   - Recursively check the left child of the first node against the right child of the second node, and the right child of the first node against the left child of the second node.

2. **Main Function**: In the main function, call the checker function with the left and right children of the root.

## Java Implementation

```java
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;         // Node value
    TreeNode left;   // Left child
    TreeNode right;  // Right child

    // Constructor to create a node with no children
    TreeNode() {}

    // Constructor to create a node with a value
    TreeNode(int val) { 
        this.val = val; 
    }

    // Constructor to create a node with a value and children
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val; 
        this.left = left; 
        this.right = right; 
    }
}

class Solution {
    // Main function to check if the tree is symmetric
    public boolean isSymmetric(TreeNode root) {
        return checker(root.left, root.right); // Check if left and right subtrees are mirrors
    }

    // Helper function to check if two nodes are mirrors of each other
    public static boolean checker(TreeNode p, TreeNode q) {
        // Both nodes are null, so they are symmetric
        if (p == null && q == null) {
            return true;
        }
        // One node is null while the other is not, so they are not symmetric
        if (p == null || q == null) {
            return false;
        }
        // Values of the nodes must be the same for them to be mirrors
        if (p.val != q.val) {
            return false;
        }
        // Recursively check the left and right children for mirror symmetry
        return checker(p.left, q.right) && checker(p.right, q.left);
    }
}
//C++ Implementation
#include <iostream>

using namespace std;

/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;          // Node value
    TreeNode* left;   // Pointer to left child
    TreeNode* right;  // Pointer to right child

    // Constructor to create a node with a value
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // Main function to check if the tree is symmetric
    bool isSymmetric(TreeNode* root) {
        return checker(root->left, root->right); // Check if left and right subtrees are mirrors
    }

    // Helper function to check if two nodes are mirrors of each other
    bool checker(TreeNode* p, TreeNode* q) {
        // Both nodes are null, so they are symmetric
        if (!p && !q) {
            return true;
        }
        // One node is null while the other is not, so they are not symmetric
        if (!p || !q) {
            return false;
        }
        // Values of the nodes must be the same for them to be mirrors
        if (p->val != q->val) {
            return false;
        }
        // Recursively check the left and right children for mirror symmetry
        return checker(p->left, q->right) && checker(p->right, q->left);
    }
};
//Python Implementation
class TreeNode:
    def __init__(self, x):
        self.val = x      # Node value
        self.left = None  # Left child
        self.right = None # Right child

class Solution:
    # Main function to check if the tree is symmetric
    def isSymmetric(self, root: TreeNode) -> bool:
        return self.checker(root.left, root.right) # Check if left and right subtrees are mirrors

    # Helper function to check if two nodes are mirrors of each other
    def checker(self, p: TreeNode, q: TreeNode) -> bool:
        # Both nodes are null, so they are symmetric
        if not p and not q:
            return True
        # One node is null while the other is not, so they are not symmetric
        if not p or not q:
            return False
        # Values of the nodes must be the same for them to be mirrors
        if p.val != q.val:
            return False
        # Recursively check the left and right children for mirror symmetry
        return self.checker(p.left, q.right) and self.checker(p.right, q.left)
```

## Time Complexity
Time Complexity : O(n)

The time complexity is O(n) since we traverse each node in the binary tree once.
## Space  Complexity
Space Complexity: O(h)
The space complexity is O(h), where h is the height of the tree. This space is used by the recursive stack. In the worst case (unbalanced tree), it can go up to O(n).