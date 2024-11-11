---
id: size-of-largest-bst-in-binary-tree
title: Size of Largest BST in Binary Tree
sidebar_label: GFG
tags: [GFG , Binary Tree , BST]
description: Determine whether the subtree rooted at each node is a Binary Search Tree (BST). Find the size of the largest BST.
---

# Size of Largest BST in Binary Tree (GFG)

## Description

The **Size of Largest BST in Binary Tree** problem is based on determining whether the subtree rooted at each node is a Binary Search Tree (BST). If any node follows the properties of a BST and has the maximum size, we update the size of the largest BST.

### Problem Definition

Given:

- A binary tree

Objective:

- Find the size of largest BST in tree

### Algorithm Overview

1. **Recursion Approach**:

- Create a structure to store the minimum value, maximum value, and size of the largest BST for any given subtree.
- Implement a recursive function that traverse through the binary tree.
- For each node, first, recursively gather information from its left and right children.
- For each node, check whether the current subtree is a BST by comparing the node’s value with the maximum of the left subtree and the minimum of the right subtree.
- If the conditions are satisfied, update the size of the largest BST found by combining the sizes of the valid left and right subtrees with the current node.
- As the recursive calls return, keep track of the largest BST size. - Finally, after traversing the entire tree, return the size of the largest BST found.

2. **Return** `size`, which indicates the size of the largest BST found.

### Time Complexity

- **Time Complexity**: O(N) as we have to traverse throughout the tree consisting of N nodes.
- **Space Complexity**: O(N) for auxiliary stack space storing all the recursive calls.

### C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
   class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};

// Information about the subtree: Minimum value,
// Maximum value, and Size of the largest BST
class BSTInfo {
  public:
    int min;
    int max;
    int mxSz;

    BSTInfo(int mn, int mx, int sz) {
        min = mn;
        max = mx;
        mxSz = sz;
    }
};

// Function to determine the largest BST in the binary tree
BSTInfo largestBSTBT(Node *root) {
    if (!root)
        return BSTInfo(INT_MAX, INT_MIN, 0);

    BSTInfo left = largestBSTBT(root->left);
    BSTInfo right = largestBSTBT(root->right);

    // Check if the current subtree is a BST
    if (left.max < root->data && right.min > root->data) {
        return BSTInfo(min(left.min, root->data),
                       max(right.max, root->data), 1 + left.mxSz + right.mxSz);
    }

    return BSTInfo(INT_MIN, INT_MAX, max(left.mxSz, right.mxSz));
}

// Function to return the size of the largest BST
int largestBST(Node *root) {
    return largestBSTBT(root).mxSz;
}

};

```
