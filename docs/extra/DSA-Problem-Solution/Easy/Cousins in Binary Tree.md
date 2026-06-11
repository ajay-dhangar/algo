---
id: cousins-in-binary-tree
title: "Cousins in Binary Tree"
sidebar_label: "Cousins"
sidebar_position: 11
description: "This document includes the solution to the problem of determining if two nodes in a binary tree are cousins, along with the approach and implementation."
tags: [binary tree, cousins]
---

# Cousins in Binary Tree

## Problem Description

Given the root of a binary tree with unique values and the values of two different nodes of the tree, `x` and `y`, return `true` if the nodes corresponding to the values `x` and `y` in the tree are cousins, or `false` otherwise.

Two nodes of a binary tree are considered cousins if they have the same depth but different parents.

Note that in a binary tree, the root node is at depth 0, and children of each depth `k` node are at depth `k + 1`.

## Approach

To determine if two nodes are cousins, we can use a **Breadth-First Search (BFS)** approach. We will traverse the tree level by level while keeping track of the parent of each node and their respective depths.

### Steps:

1. **Initialization**: Use a queue to facilitate the BFS traversal. Store each node along with its parent and depth.

2. **BFS Traversal**:
   - Dequeue each node from the front of the queue.
   - If the current node has children, enqueue them along with their parent and the incremented depth.
   - Check if both `x` and `y` are found at the same depth but with different parents.

3. **Return Result**:
   - If both nodes are found to be cousins during the traversal, return `true`.
   - If the traversal ends without finding them, return `false`.

## Java Implementation

```java
import java.util.LinkedList;
import java.util.Queue;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public boolean isCousins(TreeNode root, int x, int y) {
        if (root == null) return false;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            boolean foundX = false, foundY = false;
            
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                
                // Check if both x and y are found at the same level
                if (node.val == x) foundX = true;
                if (node.val == y) foundY = true;

                // Check for siblings (same parent)
                if (node.left != null && node.right != null) {
                    if ((node.left.val == x && node.right.val == y) || 
                        (node.left.val == y && node.right.val == x)) {
                        return false; // x and y are siblings, not cousins
                    }
                }

                // Add child nodes to the queue
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }

            // If both x and y are found at the same level, they are cousins
            if (foundX && foundY) return true;
        }

        return false; // Not cousins if the loop completes
    }
}
//C++ Implementation
#include <iostream>
#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    bool isCousins(TreeNode* root, int x, int y) {
        if (!root) return false;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int size = q.size();
            bool foundX = false, foundY = false;

            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                // Check if both x and y are found at the same level
                if (node->val == x) foundX = true;
                if (node->val == y) foundY = true;

                // Check for siblings (same parent)
                if (node->left && node->right) {
                    if ((node->left->val == x && node->right->val == y) ||
                        (node->left->val == y && node->right->val == x)) {
                        return false; // x and y are siblings, not cousins
                    }
                }

                // Add child nodes to the queue
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            // If both x and y are found at the same level, they are cousins
            if (foundX && foundY) return true;
        }

        return false; // Not cousins if the loop completes
    }
};
//Python Implementation
from collections import deque

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def isCousins(self, root: TreeNode, x: int, y: int) -> bool:
        if not root:
            return False
        
        queue = deque([root])
        
        while queue:
            size = len(queue)
            foundX = foundY = False

            for _ in range(size):
                node = queue.popleft()
                
                # Check if both x and y are found at the same level
                if node.val == x:
                    foundX = True
                if node.val == y:
                    foundY = True

                # Check for siblings (same parent)
                if node.left and node.right:
                    if (node.left.val == x and node.right.val == y) or \
                       (node.left.val == y and node.right.val == x):
                        return False  # x and y are siblings, not cousins

                # Add child nodes to the queue
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # If both x and y are found at the same level, they are cousins
            if foundX and foundY:
                return True
        
        return False  # Not cousins if the loop completes
        ```




### Time Complexity: O(n) 
### Space Complexity: O(n)