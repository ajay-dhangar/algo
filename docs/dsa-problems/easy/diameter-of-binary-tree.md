---
id: diameter-of-binary-tree
title: "Diameter of Binary Tree"
sidebar_label: Diameter of Binary Tree
description: "Solving the Diameter of Binary Tree problem using a Recursive Depth-First Search (DFS) approach."
tags: [DSA, leetcode, binary-tree, dfs, recursion]
---

## Description:

Given the `root` of a binary tree, return the length of the **diameter** of the tree.

The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The length of a path between two nodes is represented by the number of edges between them.

**Example 1:**

Input: `root = [1,2,3,4,5]`
Output: `3`
**Explanation:** 3 is the length of the path [4,2,1,3] or [5,2,1,3].

**Example 2:**

Input: `root = [1,2]`
Output: `1`

## Video Explanation

<LiteYouTubeEmbed
  id="Rezetez59Nk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Diameter of Binary Tree | C++ | Java (Striver / takeUforward)"
  lazyLoad={true}
  webp
/>

---

## Approaches:

### 1. Recursive Depth-First Search (DFS)

To find the diameter of the tree, we need to find the longest path between any two leaf nodes. The longest path passing through any given node is the sum of the maximum depth of its left subtree and the maximum depth of its right subtree.

We can optimize the standard depth-finding algorithm to calculate the diameter simultaneously in a single pass.

1. **Global/Reference Variable:** Initialize a variable `diameter` to keep track of the maximum diameter found so far.
2. **Recursive Function:** Create a DFS function to calculate the height of a given node.
3. **Base Case:** If the current node is `null`, its height is `0`.
4. **Recursive Step:** Recursively calculate the height of the `left` subtree and the `right` subtree.
5. **Update Diameter:** The longest path through the *current* node is `leftHeight + rightHeight`. Update our global `diameter` if this sum is greater than the current maximum.
6. **Return Height:** The function must return the actual height of the current node to its parent, which is `1 + max(leftHeight, rightHeight)`.

### Complexity
* **Time Complexity:** `O(N)` where `N` is the number of nodes in the binary tree. We traverse every node exactly once.
* **Space Complexity:** `O(H)` where `H` is the height of the tree. This accounts for the recursion stack space. In a perfectly balanced tree, this is `O(log N)`. In the worst-case (a completely skewed tree), the space complexity is `O(N)`.

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
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDiameter = 0;
        calculateHeight(root, maxDiameter);
        return maxDiameter;
    }
    
private:
    int calculateHeight(TreeNode* node, int& maxDiameter) {
        // Base case: null node has height 0
        if (node == nullptr) {
            return 0;
        }
        
        // Recursively find the height of left and right subtrees
        int leftHeight = calculateHeight(node->left, maxDiameter);
        int rightHeight = calculateHeight(node->right, maxDiameter);
        
        // Update the maximum diameter found so far
        maxDiameter = max(maxDiameter, leftHeight + rightHeight);
        
        // Return the height of the current node
        return 1 + max(leftHeight, rightHeight);
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
    int maxDiameter = 0;
    
    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        calculateHeight(root);
        return maxDiameter;
    }
    
    private int calculateHeight(TreeNode node) {
        // Base case: null node has height 0
        if (node == null) {
            return 0;
        }
        
        // Recursively find the height of left and right subtrees
        int leftHeight = calculateHeight(node.left);
        int rightHeight = calculateHeight(node.right);
        
        // Update the maximum diameter found so far
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        
        // Return the height of the current node
        return 1 + Math.max(leftHeight, rightHeight);
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
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.max_diameter = 0
        
        def calculate_height(node):
            # Base case: null node has height 0
            if not node:
                return 0
                
            # Recursively find the height of left and right subtrees
            left_height = calculate_height(node.left)
            right_height = calculate_height(node.right)
            
            # Update the maximum diameter found so far
            self.max_diameter = max(self.max_diameter, left_height + right_height)
            
            # Return the height of the current node
            return 1 + max(left_height, right_height)
            
        calculate_height(root)
        return self.max_diameter
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
var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0;
    
    const calculateHeight = (node) => {
        // Base case: null node has height 0
        if (node === null) {
            return 0;
        }
        
        // Recursively find the height of left and right subtrees
        const leftHeight = calculateHeight(node.left);
        const rightHeight = calculateHeight(node.right);
        
        // Update the maximum diameter found so far
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        
        // Return the height of the current node
        return 1 + Math.max(leftHeight, rightHeight);
    };
    
    calculateHeight(root);
    return maxDiameter;
};
```
