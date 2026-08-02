---
id: lowest-common-ancestor
title: Lowest Common Ancestor
sidebar_label: Lowest Common Ancestor
description: A detailed solution to the lowest common ancestor dsa problem from leetcode
tags:
  - lowest common ancestor
  - lca
  - dsa
  - prolem solving
companies:
  - Google
  - Meta
  - Microsoft
---

# Lowest Common Ancestor (LCA) in a Binary Tree

The **Lowest Common Ancestor (LCA)** of two nodes `p` and `q` in a binary tree is defined as the lowest node in the tree that has both `p` and `q` as descendants (where a node can be a descendant of itself).

---

## Problem Statement

Given a binary tree and two nodes `p` and `q`, find their lowest common ancestor.

## Video Explanation

<LiteYouTubeEmbed
  id="_-QHfMDde90"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L27. Lowest Common Ancestor in Binary Tree | LCA | C++ | Java"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

### Node Class Representation

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
};
```

  </TabItem>
</Tabs>
