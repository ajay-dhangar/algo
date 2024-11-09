---
id: lowest-common-ancestor
title: Lowest Common Ancestor
sidebar_label: Lowest Common Ancestor
sidebar_position: 12
description: A detailed 
tags: [lowest common ancestor, lca, dsa, prolem solving]
---

# Lowest Common Ancestor (LCA) in a Binary Tree

The **Lowest Common Ancestor (LCA)** of two nodes `p` and `q` in a binary tree is defined as the lowest node in the tree that has both `p` and `q` as descendants (where a node can be a descendant of itself).

---

## Problem Statement

Given a binary tree and two nodes `p` and `q`, find their lowest common ancestor.

### Node Class Representation

**C++ Class Definition**:

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

**Python Class Definition**:

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
```

---

## Solution Approach: Recursive Strategy

We use a **recursive approach** to solve the LCA problem efficiently. The idea is to traverse the tree and return the node if it matches either `p` or `q`. Otherwise, we check the left and right subtrees for `p` and `q` and determine the LCA based on the results.

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

// Definition for a binary tree node
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root; // Base case

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        if (left && right) return root; // If both left and right are not null, root is the LCA
        return left ? left : right;     // Otherwise, return the non-null child
    }
};
```

### Python Implementation

```python
class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root == p or root == q:  # Base case
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root  # If both left and right are not null, root is the LCA
        return left if left else right  # Otherwise, return the non-null child
```

---

### Time Complexity: `O(N)`

- `N` is the number of nodes in the binary tree.
- We traverse each node of the binary tree only once.

### Space Complexity: `O(H)`

- `H` is the height of the tree, which represents the space used by the recursion stack.
- In the worst case (a skewed tree), `H` can be `O(N)`. In a balanced tree, `H` is `O(log N)`.

---

## Key Concepts to Understand

1. **Binary Tree Traversal**: Understanding how to traverse the binary tree recursively.
2. **Recursive Approach**: Using recursion to check for `p` and `q` in both left and right subtrees.
3. **Base Cases**: Properly handling cases where the current node is `p` or `q`, or if the current node is `nullptr`.

---

## Solution Approach: Iterative Strategy (Optional)

For cases where recursion is not ideal, an **iterative approach** using parent pointers and a set can be used. Here’s a brief outline for this approach:

1. Use a **hash map** to store parent pointers of all nodes in the tree.
2. Use this information to track ancestors of `p` and then find the first common ancestor of `q`.

### Python Implementation (Iterative)

```python
def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    parent = {root: None}
    stack = [root]

    # Traverse the tree until both nodes are found
    while p not in parent or q not in parent:
        node = stack.pop()
        if node.left:
            parent[node.left] = node
            stack.append(node.left)
        if node.right:
            parent[node.right] = node
            stack.append(node.right)

    # Store ancestors of p in a set
    ancestors = set()
    while p:
        ancestors.add(p)
        p = parent[p]

    # Find the first common ancestor of q
    while q not in ancestors:
        q = parent[q]

    return q
```

### Time Complexity: `O(N)`

- Traversing the tree to fill the parent pointers takes `O(N)` time.
- Tracing back the ancestors of `p` and `q` also takes `O(N)` time.

### Space Complexity: `O(N)`

- The hash map and ancestor set both use `O(N)` space.

---

## Summary

- The **LCA Problem** is a fundamental question in tree data structures, often appearing in coding interviews.
- The **recursive solution** is simple and efficient for balanced binary trees.
- The **iterative solution** is useful when recursion depth might become a concern.

Mastering this problem will strengthen your understanding of binary tree traversal and recursion, making it easier to solve more complex tree-based problems. Happy coding!
