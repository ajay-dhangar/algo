---
id: postorder-traversal-binary-search-tree
sidebar_position: 18
title: Post-order Traversal in a Binary Search Tree
sidebar_label: Post-order Traversal in BST
description: "This post explains how to perform Post-order Traversal of a Binary Search Tree (BST) in C++, with code examples and detailed explanations."
tags: [dsa, binary trees, postorder, traversal, c++]
---

In this post, we will discuss how to perform **Post-order Traversal** in a **Binary Search Tree (BST)**. The **Post-order Traversal** visits the nodes in the order: left subtree → right subtree → root.

## Problem Definition
Given a binary search tree, traverse it using the post-order traversal technique and print the values of the nodes.

### Approach
The post-order traversal of a binary tree is a depth-first traversal that visits the left subtree, then the right subtree, and finally the root node.

### Steps:
1. **Recursively traverse the left subtree**.
2. **Recursively traverse the right subtree**.
3. **Visit the root node** (process the node's value).

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

// Function for post-order traversal of the BST
void postOrderTraversal(TreeNode* root) {
    if (root == NULL) {
        return;
    }

    // Traverse left subtree
    postOrderTraversal(root->left);

    // Traverse right subtree
    postOrderTraversal(root->right);

    // Visit root node
    cout << root->val << " ";
}

int main() {
    // Constructing the binary search tree
    TreeNode* root = new TreeNode(20);
    root->left = new TreeNode(10);
    root->right = new TreeNode(30);
    root->left->left = new TreeNode(5);
    root->left->right = new TreeNode(15);
    root->right->right = new TreeNode(35);

    cout << "Post-order Traversal: ";
    postOrderTraversal(root);
    cout << endl;

    return 0;
}
```

## Output:
This will print the values of the nodes in post-order sequence:

```
Post-order Traversal: 5 15 10 35 30 20
```

## Explanation:
First, the left subtree (5, 15, 10) is traversed.
Next, the right subtree (35, 30) is traversed.
Finally, the root node (20) is processed.
