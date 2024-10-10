---
id: minimum-depth-binary-tree
sidebar_position: 12
title: Minimum Depth of a Binary Tree
sidebar_label: Minimum Depth
description: "This blog post covers how to find the minimum depth (or height) of a binary tree in C++, along with explanations and code examples."
tags: [dsa, binary trees, recursion, c++]
---


In this post, we will discuss how to calculate the **minimum depth** of a binary tree. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

## Problem Definition
Given a binary tree, the **minimum depth** is defined as the length of the shortest path from the root to a leaf. In other words, it represents the number of nodes along the shortest path from the root node down to the closest leaf node.


## Approach
To calculate the minimum depth of a binary tree, we can use a recursive approach. At each node, we need to determine the depth of the left subtree and the right subtree. The minimum depth is the smaller of the two, but we need to be careful when one of the subtrees is missing (i.e., `NULL`), in which case we must consider only the non-`NULL` subtree.

### Steps:
1. If the tree is empty (i.e., the current node is `NULL`), the depth is `0`.
2. If one of the subtrees is `NULL`, we return the depth of the non-`NULL` subtree plus `1` (to account for the current node).
3. Otherwise, we recursively calculate the depth of the left and right subtrees, and return the smaller of the two depths, plus `1` for the current node.

### C++ Code Implementation

```cpp
#include <iostream>
using namespace std;

// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Function to find the minimum depth of a binary tree
int minDepth(TreeNode* root) {
    // Base case: if the tree is empty, return 0
    if (root == NULL)
        return 0;

    // If the left subtree is NULL, recurse on the right subtree
    if (root->left == NULL)
        return minDepth(root->right) + 1;

    // If the right subtree is NULL, recurse on the left subtree
    if (root->right == NULL)
        return minDepth(root->left) + 1;

    // If both left and right subtrees are non-NULL, find the minimum depth
    return min(minDepth(root->left), minDepth(root->right)) + 1;
}

int main() {
    // Create a sample binary tree
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);

    // Calculate and print the minimum depth of the binary tree
    cout << "Minimum Depth of the Binary Tree: " << minDepth(root) << endl;

    return 0;
}

```

## Explanation of the Code

### TreeNode Structure
We define a `TreeNode` structure to represent each node in the binary tree. Each node contains the following fields:

- **val:** The value stored in the node.
- **left:** A pointer/reference to the left child node (or `NULL` if there is no left child).
- **right:** A pointer/reference to the right child node (or `NULL` if there is no right child).

### minDepth Function
The `minDepth` function is a recursive function used to calculate the minimum depth of the binary tree.

- **Base Case:** If the current node is `NULL`, the function returns `0`, indicating an empty tree or subtree.
- **Subtree Case:** If the current node has only one non-`NULL` child, the function recurses on that child and adds `1` for the current node.
- **Recursive Case:** If the current node has both left and right children, the function recursively computes the depth of both subtrees and returns the smaller of the two depths, plus `1` for the current node.

### main Function
In the `main` function:

1. We create a sample binary tree by manually assigning nodes and their left and right children.
2. The `minDepth` function is then called with the root of the binary tree to calculate the minimum depth.
3. Finally, the result is printed to the console.

## Time Complexity
The time complexity of this approach is **O(N)**, where `N` is the number of nodes in the binary tree. This is because the function visits each node exactly once during the recursive traversal.

