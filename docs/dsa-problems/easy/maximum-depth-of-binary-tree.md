---
id: maximum-depth-of-binary-tree
title: "Maximum Depth of Binary Tree"
sidebar_label: Maximum Depth of Binary Tree
description: "Solving the Maximum Depth of Binary Tree problem using a Recursive Depth-First Search (DFS) approach."
tags: [DSA, leetcode, binary-tree, dfs, recursion]
---

## Description:

Given the `root` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

Input: `root = [3,9,20,null,null,15,7]`
Output: `3`

**Example 2:**

Input: `root = [1,null,2]`
Output: `2`

---

## Approaches:

### 1. Recursive Depth-First Search (DFS)

The most intuitive and optimal way to find the maximum depth of a binary tree is to use recursion. A tree's maximum depth is essentially $1$ (for the current node) plus the maximum of the depths of its left and right subtrees.

1. **Base Case:** If the current node is `null` (or `None`), it means we have reached beyond a leaf node. The depth at this point is `0`.
2. **Recursive Step:** Recursively call the depth function on the `left` child and the `right` child.
3. **Calculate and Return:** Take the maximum of the left subtree's depth and the right subtree's depth, add `1` to account for the current node, and return that value up the call stack.

### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the total number of nodes in the binary tree. We visit every single node exactly once during our traversal.
* **Space Complexity:** $O(H)$ where $H$ is the height of the tree. This accounts for the memory used by the recursion call stack. In the worst-case scenario (a completely skewed tree), the space complexity would be $O(N)$. In the best-case scenario (a perfectly balanced tree), the space complexity would be $O(\log N)$.

---

## Solutions:

### C++
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 * int val;
 * TreeNode *left;
 * TreeNode *right;
 * TreeNode() : val(0), left(nullptr), right(nullptr) {}
 * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Base case: if the node is null, the depth is 0
        if (root == nullptr) {
            return 0;
        }
        
        // Recursively find the depth of the left and right subtrees
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);
        
        // The total depth is 1 (for the root) plus the max of the subtrees
        return 1 + max(leftDepth, rightDepth);
    }
};
```

### Java
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        // Base case: if the node is null, the depth is 0
        if (root == null) {
            return 0;
        }
        
        // Recursively find the depth of the left and right subtrees
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);
        
        // The total depth is 1 (for the root) plus the max of the subtrees
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
```

### Python
```py
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Base case: if the node is null, the depth is 0
        if not root:
            return 0
            
        # Recursively find the depth of the left and right subtrees
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        
        # The total depth is 1 (for the root) plus the max of the subtrees
        return 1 + max(left_depth, right_depth)
```

### JavaScript
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val = (val===undefined ? 0 : val)
 * this.left = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    // Base case: if the node is null, the depth is 0
    if (!root) {
        return 0;
    }
    
    // Recursively find the depth of the left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    // The total depth is 1 (for the root) plus the max of the subtrees
    return 1 + Math.max(leftDepth, rightDepth);
};
```