---
id: balanced-binary-tree-checker
title: Balanced Binary Tree Checker
sidebar_label: 110. Balanced Binary Tree
sidebar_position: 110
description: Learn how to implement a balanced binary tree checker in Java, with explanations of the algorithm and time complexity analysis.
tags: [tree, binary-tree, depth-first-search, java, leetcode]
---

# Balanced Binary Tree Checker

## Problem Statement

Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as:

> A binary tree in which the left and right subtrees of every node differ in height by no more than one.

## Solution

We'll implement a depth-first search (DFS) approach to check if the binary tree is balanced. The idea is to recursively calculate the height of each subtree and check if the difference between the heights of left and right subtrees is not more than 1 for every node.

### Java Implementation

```java
 class Solution {
    public boolean isBalanced(TreeNode root) {
       return dfsHeight(root) != -1;
   }
    
    private int dfsHeight(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = dfsHeight(node.left);
        if (leftHeight == -1) return -1;
        
        int rightHeight = dfsHeight(node.right);
        if (rightHeight == -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
```

### Explanation

1. We define a helper method `dfsHeight` that performs a depth-first search on the tree.
2. If the current node is null, we return 0 as the height.
3. We recursively calculate the height of the left and right subtrees.
4. If at any point we get -1 from a subtree, it means the subtree is unbalanced, so we propagate the -1 upwards.
5. We check if the absolute difference between left and right subtree heights is greater than 1. If so, we return -1 to indicate an unbalanced tree.
6. If the subtree is balanced, we return the maximum of left and right heights plus 1 (accounting for the current node).
7. In the main `isBalanced` method, we call `dfsHeight` and check if the result is not -1.

## Time Complexity

The time complexity of this solution is O(n), where n is the number of nodes in the binary tree. We visit each node once during the depth-first search.

## Space Complexity

The space complexity is O(h), where h is the height of the tree. This space is used by the recursion stack. In the worst case of a skewed tree, this could be O(n), but for a balanced tree, it would be O(log n).

## Example Usage

Here's an example of how to use the `Solution` class:

```java
 class TreeNode {
+    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

 public class Main {
   public static void main(String[] args) {
        // Creating a sample binary tree
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.left.right.right = new TreeNode(6);
        root.left.right.right.right = new TreeNode(7);

        // Creating an instance of the Solution class
        Solution solution = new Solution();

        // Checking if the tree is balanced
        if (solution.isBalanced(root)) {
            System.out.println("The tree is balanced.");
        } else {
            System.out.println("The tree is not balanced.");
        }
    }
}
```

This example creates a binary tree and uses the `Solution` class to check if it's balanced. The output will be "The tree is not balanced." because the left subtree has a depth of 4 while the right subtree has a depth of 1, violating the balance condition.
