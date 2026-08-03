---
id: size-of-largest-bst-in-binary-tree
title: Size of Largest BST in Binary Tree
sidebar_label: Size of Largest BST in Binary Tree
tags:
  - GFG
  - Binary Tree
  - BST
description: >-
  Determine whether the subtree rooted at each node is a Binary Search Tree
  (BST). Find the size of the largest BST.
companies:
  - Amazon
---

# Size of Largest BST in Binary Tree (GFG)

## Description

The **Size of Largest BST in Binary Tree** problem is based on determining whether the subtree rooted at each node is a Binary Search Tree (BST). If any node follows the properties of a BST and has the maximum size, we update the size of the largest BST.

## Video Explanation

<LiteYouTubeEmbed
  id="X0oXMdtUDwo"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L53. Largest BST in Binary Tree"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

### Problem Definition

Given:

- A binary tree

Objective:

- Find the size of largest BST in tree

### Algorithm Overview

1. **Recursion Approach**:

- Create a structure to store the minimum value, maximum value, and size of the largest BST for any given subtree.
- Implement a recursive function that traverse through the binary tree.
- For each node, first, recursively gather information from its left and right children.
- For each node, check whether the current subtree is a BST by comparing the node’s value with the maximum of the left subtree and the minimum of the right subtree.
- If the conditions are satisfied, update the size of the largest BST found by combining the sizes of the valid left and right subtrees with the current node.
- As the recursive calls return, keep track of the largest BST size. - Finally, after traversing the entire tree, return the size of the largest BST found.

2. **Return** `size`, which indicates the size of the largest BST found.

### Time Complexity

- **Time Complexity**: O(N) as we have to traverse throughout the tree consisting of N nodes.
- **Space Complexity**: O(N) for auxiliary stack space storing all the recursive calls.

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
   class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};

// Information about the subtree: Minimum value,
// Maximum value, and Size of the largest BST
class BSTInfo {
  public:
    int min;
    int max;
    int mxSz;

    BSTInfo(int mn, int mx, int sz) {
        min = mn;
        max = mx;
        mxSz = sz;
    }
};

// Function to determine the largest BST in the binary tree
BSTInfo largestBSTBT(Node *root) {
    if (!root)
        return BSTInfo(INT_MAX, INT_MIN, 0);

    BSTInfo left = largestBSTBT(root->left);
    BSTInfo right = largestBSTBT(root->right);

    // Check if the current subtree is a BST
    if (left.max < root->data && right.min > root->data) {
        return BSTInfo(min(left.min, root->data),
                       max(right.max, root->data), 1 + left.mxSz + right.mxSz);
    }

    return BSTInfo(INT_MIN, INT_MAX, max(left.mxSz, right.mxSz));
}

// Function to return the size of the largest BST
int largestBST(Node *root) {
    return largestBSTBT(root).mxSz;
}

};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    static class NodeInfo {
        boolean isBST;
        int size;
        int min;
        int max;
        NodeInfo(boolean isBST, int size, int min, int max) {
            this.isBST = isBST;
            this.size = size;
            this.min = min;
            this.max = max;
        }
    }
    
    private int maxSize = 0;
    
    public int largestBst(TreeNode root) {
        maxSize = 0;
        traverse(root);
        return maxSize;
    }
    
    private NodeInfo traverse(TreeNode root) {
        if (root == null) {
            return new NodeInfo(true, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);
        }
        NodeInfo left = traverse(root.left);
        NodeInfo right = traverse(root.right);
        
        if (left.isBST && right.isBST && root.val > left.max && root.val < right.min) {
            int currentSize = left.size + right.size + 1;
            maxSize = Math.max(maxSize, currentSize);
            return new NodeInfo(true, currentSize, 
                                Math.min(root.val, left.min), 
                                Math.max(root.val, right.max));
        }
        return new NodeInfo(false, 0, 0, 0);
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class NodeInfo:
    def __init__(self, is_bst, size, min_val, max_val):
        self.is_bst = is_bst
        self.size = size
        self.min_val = min_val
        self.max_val = max_val

class Solution:
    def largestBst(self, root: Optional[TreeNode]) -> int:
        self.max_size = 0
        
        def traverse(node):
            if not node:
                return NodeInfo(True, 0, float('inf'), float('-inf'))
            
            left = traverse(node.left)
            right = traverse(node.right)
            
            if left.is_bst and right.is_bst and node.val > left.max_val and node.val < right.min_val:
                curr_size = left.size + right.size + 1
                self.max_size = max(self.max_size, curr_size)
                return NodeInfo(True, curr_size, 
                                min(node.val, left.min_val), 
                                max(node.val, right.max_val))
            return NodeInfo(False, 0, 0, 0)
            
        traverse(root)
        return self.max_size
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var largestBst = function(root) {
    let maxSize = 0;
    
    function traverse(node) {
        if (!node) {
            return { isBST: true, size: 0, min: Infinity, max: -Infinity };
        }
        
        const left = traverse(node.left);
        const right = traverse(node.right);
        
        if (left.isBST && right.isBST && node.val > left.max && node.val < right.min) {
            const currSize = left.size + right.size + 1;
            maxSize = Math.max(maxSize, currSize);
            return {
                isBST: true,
                size: currSize,
                min: Math.min(node.val, left.min),
                max: Math.max(node.val, right.max)
            };
        }
        
        return { isBST: false, size: 0, min: 0, max: 0 };
    }
    
    traverse(root);
    return maxSize;
};
```

  </TabItem>
</Tabs>
