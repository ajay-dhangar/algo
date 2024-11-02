---
id: sum-tree
title: Sum-tree 
sidebar_label: Sum-tree 
description: "A Sum Tree is a binary tree where each node's value is equal to the sum of the values of its left and right children, with the property holding true for all nodes in the tree."  
tags: [dsa, algorithms, tree]
---

### Problem Statement:
Given a binary tree, the task is to check if it is a Sum Tree. A Sum Tree is a Binary Tree where the value of a node is equal to the sum of the nodes present in its left subtree and right subtree. An empty tree is Sum Tree and the sum of an empty tree can be considered as 0. A leaf node is also considered a Sum Tree.

### Appraoch
The approach to checking if a binary tree is a Sum Tree involves recursively traversing the tree, where each node checks if it is `nullptr` or a leaf. The algorithm computes the sums of the left and right subtrees, then verifies if the current node's value equals the combined sum of its children. If all nodes satisfy this condition, the tree is classified as a Sum Tree; otherwise, it is not.

### Algorithm Steps:

1. Pass the root node of the binary tree to the Sum Tree check function.
2. If the node is `nullptr`, return `true` with a sum of 0; if it's a leaf, return `true` with its value.
3. Recursively call the function for the left child and right child to get their sums and check for Sum Tree property.
4. Add the values of the left and right subtree sums to the current node’s value.
5. Return `true` if the current node's value equals the sum of its left and right subtree sums; otherwise, return `false`.
6. If the root’s check passes, return `true` ; if any node fails, return `false`.

### Time Complexity:
- The time complexity of checking if a binary tree is a Sum Tree is `O(n)`, where `n` is the number of nodes in the tree. This is because the algorithm visits each node exactly once to compute sums and check the Sum Tree property, resulting in linear traversal.

### Space Complexity:
- The space complexity of the algorithm for checking if a binary tree is a Sum Tree is `O(h)`, where `h` is the height of the tree, due to the recursive call stack. In the worst case, this can be `O(n)` for a skewed tree, while for a balanced tree, it is `O(log n)`.

### Sample Input:
Insert: 26
Insert: 10
Insert: 3
Insert: 4
Insert: 6
Insert: 3

### Sample Output:
The binary tree is a Sum Tree.

### Explanation of Sample:

- The binary tree's structure shows that each node has a specific value, represented visually with branches connecting parent and child nodes.
- Each node’s value must equal the sum of its left and right children's values for the tree to qualify as a Sum Tree.
- In this example, the root node (26) equals the sum of its children (10 + 3), and the left child (10) equals (4 + 6).
- Since all nodes satisfy this condition, the conclusion is that the binary tree is indeed a Sum Tree.

### C++ Implementation:

```cpp
#include <iostream>
struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

bool isSumTree(TreeNode* root, int& sum) {
    // An empty tree is a Sum Tree
    if (root == nullptr) {
        sum = 0;
        return true;
    }
    // Leaf nodes are Sum Trees
    if (root->left == nullptr && root->right == nullptr) {
        sum = root->value;
        return true;
    }
    int leftSum = 0, rightSum = 0;
    // Recursively check the left and right subtrees
    bool leftIsSumTree = isSumTree(root->left, leftSum);
    bool rightIsSumTree = isSumTree(root->right, rightSum);
    // The current node's value should equal the sum of left and right subtrees
    sum = leftSum + rightSum + root->value;
    return leftIsSumTree && rightIsSumTree && (root->value == leftSum + rightSum);
}
// Helper function to initiate the check
bool isSumTree(TreeNode* root) {
    int sum = 0;
    return isSumTree(root, sum);
}

int main() {
    // Creating a binary tree
    TreeNode* root = new TreeNode(26);
    root->left = new TreeNode(10);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(6);
    root->right->right = new TreeNode(3);
    if (isSumTree(root)) {
        std::cout << "The binary tree is a Sum Tree." << std::endl;
    } else {
        std::cout << "The binary tree is NOT a Sum Tree." << std::endl;
    }
    return 0;
}

```
