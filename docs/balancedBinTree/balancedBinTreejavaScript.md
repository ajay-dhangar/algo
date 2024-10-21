---
id: balanced-binary-tree-checker-js
title: Balanced Binary Tree Javascript
description: Learn how to implement a balanced binary tree checker in JavaScript, with explanations of the algorithm and time complexity analysis.
tags: [tree, binary-tree, depth-first-search, javascript, leetcode]
---

# Balanced Binary Tree Checker
## Problem Statement

Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as:

:::note
A binary tree in which the left and right subtrees of every node differ in height by no more than one.
:::

## Solution
We'll implement a depth-first search (DFS) approach to check if the binary tree is balanced. The idea is to recursively calculate the height of each subtree and check if the difference between the heights of the left and right subtrees is not more than 1 for every node.

```js
/**
 * @description Check if a binary tree is height-balanced
 * @param {TreeNode} root
 * @returns {boolean}
 */
function isBalanced(root) {
    return dfsHeight(root) !== -1;
}

/**
 * @description Helper function to calculate height and check balance
 * @param {TreeNode} node
 * @returns {number}
 */
function dfsHeight(node) {
    if (node === null) return 0;

    const leftHeight = dfsHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = dfsHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
}
```

## JavaScript Implementation

This is the JavaScript version of the balanced binary tree checker.
- We define a helper function `dfsHeight` that performs depth-first search (DFS) on the tree.
- If the current node is null, we return 0 as the height.
- We recursively calculate the height of the left and right subtrees.
- If we encounter an unbalanced subtree (i.e., it returns -1), we propagate this value up.
- We check if the absolute difference between the heights of the left and right subtrees is greater than 1. If so, we return -1, indicating the tree is unbalanced.
- If the tree is balanced, we return the maximum of the left and right subtree heights plus 1.
- Finally, in the `isBalanced` function, we call `dfsHeight` and return whether the result is not -1.


## Time Complexity
The time complexity of this solution is O(n), where n is the number of nodes in the binary tree. We visit each node once during the depth-first search.

## Space Complexity
The space complexity is O(h), where h is the height of the tree. This space is used by the recursion stack. In the worst case of a skewed tree, this could be O(n), but for a balanced tree, it would be O(log n).

## Example Usage

Here's an example of how to use the `isBalanced` function in JavaScript:


```js
// TreeNode class definition
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// Example Usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.left.right.right = new TreeNode(6);
root.left.right.right.right = new TreeNode(7);

// Check if the tree is balanced
if (isBalanced(root)) {
    console.log("The tree is balanced.");
} else {
    console.log("The tree is not balanced.");
}
```


:::note
This example creates a binary tree and uses the `isBalanced` function to check if it's balanced. The output will be "The tree is not balanced." because the left subtree has a depth of 4 while the right subtree has a depth of 1, violating the balance condition.
:::