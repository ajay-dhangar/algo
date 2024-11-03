---
id: dft
title: "Depth-First Traversal (DFT)"
sidebar_label: Depth-First Traversal
description: "In this blog post, we'll explore Depth-First Traversal (DFT), a tree traversal algorithm that explores nodes by going as deep as possible before backtracking."
tags: [dsa, algorithms, tree, traversal]
---

### Definition:

**Depth-First Traversal (DFT)** is a **tree traversal algorithm** that explores nodes by going as deep as possible along each branch before backtracking. Starting from the root node, it traverses as far along a branch as possible before returning to explore other branches. DFT is commonly used in scenarios requiring a systematic exploration of a tree structure, such as evaluating expressions, searching, and more.

### Characteristics:

- **Preorder, Inorder, and Postorder Traversals**:
  - Depth-First Traversal can be categorized into three main types depending on the order of visiting the root, left, and right nodes:
    - **Preorder Traversal**: Visit the root node first, then the left subtree, followed by the right subtree.
    - **Inorder Traversal**: Visit the left subtree, the root node, and finally the right subtree.
    - **Postorder Traversal**: Visit the left subtree, then the right subtree, and finally the root node.

- **Recursive or Stack-Based Traversal**:
  - DFT can be implemented either recursively or with an explicit stack. The recursive approach is straightforward and concise, while the stack-based approach provides an iterative solution.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N)$**  
  Where `N` is the number of nodes in the tree. DFT visits each node exactly once, making it efficient for complete traversal.

### Space Complexity:

- **Space Complexity: $O(H)$**  
  In the worst case, DFT requires space proportional to the height of the tree (`H`), either due to the recursion stack in a recursive approach or an explicit stack used for iterative traversal.

### C++ Implementation:

Here are C++ implementations for each type of depth-first traversal: preorder, inorder, and postorder. These examples use a recursive approach for simplicity.

```cpp
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Preorder Traversal (Root -> Left -> Right)
void preorderTraversal(TreeNode* node) {
    if (node == NULL) return;
    cout << node->val << " ";
    preorderTraversal(node->left);
    preorderTraversal(node->right);
}

// Inorder Traversal (Left -> Root -> Right)
void inorderTraversal(TreeNode* node) {
    if (node == NULL) return;
    inorderTraversal(node->left);
    cout << node->val << " ";
    inorderTraversal(node->right);
}

// Postorder Traversal (Left -> Right -> Root)
void postorderTraversal(TreeNode* node) {
    if (node == NULL) return;
    postorderTraversal(node->left);
    postorderTraversal(node->right);
    cout << node->val << " ";
}

int main() {
    // Creating a sample tree:
    //        1
    //       / \
    //      2   3
    //     / \
    //    4   5

    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    cout << "Preorder Traversal: ";
    preorderTraversal(root);
    cout << endl;

    cout << "Inorder Traversal: ";
    inorderTraversal(root);
    cout << endl;

    cout << "Postorder Traversal: ";
    postorderTraversal(root);
    cout << endl;

    return 0;
}
```
