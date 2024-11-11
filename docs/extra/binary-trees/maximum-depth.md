---
id: maximum-depth-binary-tree
sidebar_position: 11
title: Maximum Depth of a Binary Tree
sidebar_label: Maximum Depth
description: "This blog post covers how to find the maximum depth (or height) of a binary tree in C++, along with explanations and code examples."
tags: [dsa, binary trees, recursion, c++]
---


In this post, we will discuss how to calculate the **maximum depth** (also known as the height) of a binary tree. The maximum depth of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Problem Definition
Given a binary tree, the **maximum depth** is defined as the length of the longest path from the root to a leaf. In other words, it represents the number of nodes along the longest path from the root node down to the deepest leaf node.

### Example
Consider the following binary tree:

```
    1
   / \
  2   3
 / \
4   5
```

The maximum depth of this tree is `3`, as the longest path is either `1 → 2 → 4` or `1 → 2 → 5`.

## Approach
To calculate the maximum depth of a binary tree, we can use a recursive approach. At each node, we need to determine the depth of the left subtree and the right subtree. The maximum depth is the larger of the two, plus one (for the current node).

### Steps:
1. If the tree is empty (i.e., the current node is `NULL`), the depth is `0`.
2. Recursively calculate the depth of the left and right subtrees.
3. Return the maximum of the two depths, plus `1` for the current node.

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

// Function to find the maximum depth of a binary tree
int maxDepth(TreeNode* root) {
    // Base case: if the tree is empty, return 0
    if (root == NULL)
        return 0;

    // Recursive case: calculate the depth of left and right subtrees
    int leftDepth = maxDepth(root->left);
    int rightDepth = maxDepth(root->right);

    // Return the larger of the two depths, plus 1 for the current node
    return max(leftDepth, rightDepth) + 1;
}

int main() {
    // Create a sample binary tree
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    // Calculate and print the maximum depth of the binary tree
    cout << "Maximum Depth of the Binary Tree: " << maxDepth(root) << endl;

    return 0;
}
```
## Explanation of the Code

### TreeNode Structure
We define a `TreeNode` structure to represent each node in the binary tree. Each node contains the following fields:
- **val:** The value stored in the node.
- **left:** A pointer/reference to the left child node (or `NULL` if there is no left child).
- **right:** A pointer/reference to the right child node (or `NULL` if there is no right child).

### maxDepth Function
The `maxDepth` function is a recursive function used to calculate the maximum depth of the binary tree.

- **Base Case:** If the current node is `NULL`, the function returns `0`, indicating an empty tree or subtree.
- **Recursive Case:** If the current node is not `NULL`, the function recursively computes the depth of the left and right subtrees.
  - It then returns the maximum of the two depths plus `1`, which accounts for the current node's depth.

### main Function
In the `main` function:
- We create a sample binary tree by manually assigning nodes and their left and right children.
- The `maxDepth` function is then called with the root of the binary tree to calculate the maximum depth.
- Finally, the result is printed to the console.

## Time Complexity

The time complexity of this approach is **O(N)**, where `N` is the number of nodes in the binary tree. This is because the function visits each node exactly once during the recursive traversal.
