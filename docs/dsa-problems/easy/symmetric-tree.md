---
id: symmetric-tree
title: Symmetric Tree
sidebar_label: Symmetric
description: >-
  This document includes the solution to the problem of checking whether a
  binary tree is symmetric around its center, along with the approach and
  implementation.
tags:
  - binary tree
  - symmetric
companies:
  - Apple
  - Meta
  - Microsoft
---

# Symmetric Tree

## Problem Description

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

A binary tree is symmetric if the left subtree is a mirror reflection of the right subtree.

## Video Explanation

<LiteYouTubeEmbed
  id="nKggNAiEpBE"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L25. Check for Symmetrical Binary Trees | C++ | Java"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## Approach

To determine if a binary tree is symmetric, we can use a **recursive approach**. We will compare the left and right subtrees of the tree.

### Steps:

1. **Checker Function**: Create a helper function that takes two nodes as arguments and checks if they are mirrors of each other.
   - If both nodes are `null`, return `true`.
   - If one node is `null` and the other is not, return `false`.
   - If the values of both nodes are different, return `false`.
   - Recursively check the left child of the first node against the right child of the second node, and the right child of the first node against the left child of the second node.

2. **Main Function**: In the main function, call the checker function with the left and right children of the root.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }
    
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1->val == t2->val) && isMirror(t1->right, t2->left) && isMirror(t1->left, t2->right);
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;         // Node value
    TreeNode left;   // Left child
    TreeNode right;  // Right child

    // Constructor to create a node with no children
    TreeNode() {}

    // Constructor to create a node with a value
    TreeNode(int val) { 
        this.val = val; 
    }

    // Constructor to create a node with a value and children
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val; 
        this.left = left; 
        this.right = right; 
    }
}

class Solution {
    // Main function to check if the tree is symmetric
    public boolean isSymmetric(TreeNode root) {
        return checker(root.left, root.right); // Check if left and right subtrees are mirrors
    }

    // Helper function to check if two nodes are mirrors of each other
    public static boolean checker(TreeNode p, TreeNode q) {
        // Both nodes are null, so they are symmetric
        if (p == null && q == null) {
            return true;
        }
        // One node is null while the other is not, so they are not symmetric
        if (p == null || q == null) {
            return false;
        }
        // Values of the nodes must be the same for them to be mirrors
        if (p.val != q.val) {
            return false;
        }
        // Recursively check the left and right children for mirror symmetry
        return checker(p.left, q.right) && checker(p.right, q.left);
    }
}
//C++ Implementation
#include <iostream>

using namespace std;

/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;          // Node value
    TreeNode* left;   // Pointer to left child
    TreeNode* right;  // Pointer to right child

    // Constructor to create a node with a value
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // Main function to check if the tree is symmetric
    bool isSymmetric(TreeNode* root) {
        return checker(root->left, root->right); // Check if left and right subtrees are mirrors
    }

    // Helper function to check if two nodes are mirrors of each other
    bool checker(TreeNode* p, TreeNode* q) {
        // Both nodes are null, so they are symmetric
        if (!p && !q) {
            return true;
        }
        // One node is null while the other is not, so they are not symmetric
        if (!p || !q) {
            return false;
        }
        // Values of the nodes must be the same for them to be mirrors
        if (p->val != q->val) {
            return false;
        }
        // Recursively check the left and right children for mirror symmetry
        return checker(p->left, q->right) && checker(p->right, q->left);
    }
};
//Python Implementation
class TreeNode:
    def __init__(self, x):
        self.val = x      # Node value
        self.left = None  # Left child
        self.right = None # Right child

class Solution:
    # Main function to check if the tree is symmetric
    def isSymmetric(self, root: TreeNode) -> bool:
        return self.checker(root.left, root.right) # Check if left and right subtrees are mirrors

    # Helper function to check if two nodes are mirrors of each other
    def checker(self, p: TreeNode, q: TreeNode) -> bool:
        # Both nodes are null, so they are symmetric
        if not p and not q:
            return True
        # One node is null while the other is not, so they are not symmetric
        if not p or not q:
            return False
        # Values of the nodes must be the same for them to be mirrors
        if p.val != q.val:
            return False
        # Recursively check the left and right children for mirror symmetry
        return self.checker(p.left, q.right) and self.checker(p.right, q.left)
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def isMirror(t1, t2):
            if not t1 and not t2:
                return True
            if not t1 or not t2:
                return False
            return (t1.val == t2.val) and isMirror(t1.right, t2.left) and isMirror(t1.left, t2.right)
        
        return isMirror(root.left, root.right) if root else True
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var isSymmetric = function(root) {
    if (!root) return true;
    
    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1.val === t2.val) && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right);
    }
    
    return isMirror(root.left, root.right);
};
```

  </TabItem>
</Tabs>
