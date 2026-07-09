---
id: binary-tree-right-side-view
title: "Binary Tree Right Side View"
sidebar_label: Binary Tree Right Side View
description: "Solving the Binary Tree Right Side View problem using a Depth-First Search (DFS) approach."
tags: [DSA, leetcode, binary-tree, dfs, recursion]
---

## Description:

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.

**Example 1:**

Input: `root = [1,2,3,null,5,null,4]`
Output: `[1,3,4]`

**Example 2:**

Input: `root = [1,null,3]`
Output: `[1,3]`

**Example 3:**

Input: `root = []`
Output: `[]`

---

## Video Explanation

<LiteYouTubeEmbed
  id="KV4mRzTjlAk"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Right/Left View of Binary Tree | C++ | Java"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Depth-First Search (DFS) (Optimal)

To find the right side view of a binary tree, we want to collect the rightmost node at every level. While a Level Order Traversal (BFS) is very intuitive for this, a **Depth-First Search (DFS)** is actually much more elegant and space-efficient.

We can perform a modified **pre-order traversal**, prioritizing the right child over the left child (`Root -> Right -> Left`). 
By keeping track of our current `depth` during the traversal, we can guarantee that the *first* time we reach a new depth, we are looking at the rightmost node for that specific level!

1. **State:** Keep track of the current `depth` and a `result` array to store the visible nodes.
2. **Base Case:** If the current node is `null`, return.
3. **Check Visibility:** Since we always explore the right side first, if `depth == result.length`, it means we are visiting this depth level for the very first time. Add the node's value to the `result` array.
4. **Recursive Step:** Recursively call the DFS function on the `right` child (incrementing the depth), and then on the `left` child (incrementing the depth).

#### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the total number of nodes in the binary tree. We visit every single node exactly once.
* **Space Complexity:** $O(H)$ where $H$ is the height of the tree. This accounts for the memory used by the recursion call stack. In the worst-case scenario (a completely skewed tree), the space complexity would be $O(N)$. In the best-case scenario (a perfectly balanced tree), the space complexity would be $O(\log N)$.

#### Solutions:

**C++**
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
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
    
private:
    void dfs(TreeNode* node, int depth, vector<int>& res) {
        if (!node) return;
        
        // If it's the first time we visit this depth, add the node
        if (depth == res.size()) {
            res.push_back(node->val);
        }
        
        // Traverse right first, then left
        dfs(node->right, depth + 1, res);
        dfs(node->left, depth + 1, res);
    }
};
```

**Java**
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
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, 0, res);
        return res;
    }
    
    private void dfs(TreeNode node, int depth, List<Integer> res) {
        if (node == null) return;
        
        // If it's the first time we visit this depth, add the node
        if (depth == res.size()) {
            res.add(node.val);
        }
        
        // Traverse right first, then left
        dfs(node.right, depth + 1, res);
        dfs(node.left, depth + 1, res);
    }
}
```

**Python**
```py
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        
        def dfs(node, depth):
            if not node:
                return
                
            # If it's the first time we visit this depth, add the node
            if depth == len(res):
                res.append(node.val)
                
            # Traverse right first, then left
            dfs(node.right, depth + 1)
            dfs(node.left, depth + 1)
            
        dfs(root, 0)
        return res
```

**JavaScript**
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    const res = [];
    
    const dfs = (node, depth) => {
        if (!node) return;
        
        // If it's the first time we visit this depth, add the node
        if (depth === res.length) {
            res.push(node.val);
        }
        
        // Traverse right first, then left
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    };
    
    dfs(root, 0);
    return res;
};
```