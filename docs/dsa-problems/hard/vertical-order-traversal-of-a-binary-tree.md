---
id: vertical-order-traversal-of-a-binary-tree
title: "Vertical Order Traversal of a Binary Tree"
sidebar_label: Vertical Order Traversal of a Binary Tree
description: "Solving the Vertical Order Traversal of a Binary Tree problem using Coordinate Mapping and Sorting."
tags: [DSA, leetcode, binary-tree, bfs, dfs, sorting, hash-table]
---

## Description:

Given the `root` of a binary tree, calculate the **vertical order traversal** of the binary tree.

For each node at position `(row, col)`, its left and right children will be at positions `(row + 1, col - 1)` and `(row + 1, col + 1)` respectively. The root of the tree is at `(0, 0)`.

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return the vertical order traversal of the binary tree.

**Example 1:**

Input: `root = [3,9,20,null,null,15,7]`
Output: `[[9],[3,15],[20],[7]]`
**Explanation:**
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.

**Example 2:**

Input: `root = [1,2,3,4,5,6,7]`
Output: `[[4],[2],[1,5,6],[3],[7]]`
**Explanation:**
Column -2: Only node 4 is in this column.
Column -1: Only node 2 is in this column.
Column 0: Nodes 1, 5, and 6 are in this column.
          1 is at the top, so it comes first.
          5 and 6 are at the same position (2, 0), so we order them by their value, 5 before 6.
Column 1: Only node 3 is in this column.
Column 2: Only node 7 is in this column.

---

## Video Explanation:

<LiteYouTubeEmbed
  id="q_a6lpbKJdw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Vertical Order Traversal of Binary Tree | C++ | Java"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Coordinate Mapping with Sorting (Optimal)

To perform a vertical order traversal, we need to group the nodes by their column indices. Furthermore, nodes in the same column need to be sorted sequentially by their row (depth) and lastly by their actual value if both their column and row are identical. 

We can map every node in the binary tree to a 2D coordinate `(col, row)` using either Breadth-First Search (BFS) or Depth-First Search (DFS). 

1. **Mapping Coordinates:** Start at the root with the coordinate `(0, 0)`. 
   - Moving to a left child updates coordinates to `(col - 1, row + 1)`.
   - Moving to a right child updates coordinates to `(col + 1, row + 1)`.
2. **Storing Data:** We can store the nodes as tuples of `(col, row, value)`. In C++ and Java, nested maps (like `TreeMap`) combined with priority queues/multisets are perfect for keeping the data inherently sorted as it is inserted. In Python and JavaScript, a flat list of tuples is easier to manage.
3. **Sorting & Grouping:** Once traversed, we sort the collected node data. We group all the values that share a column index into sub-arrays and push them sequentially into our final result array.

#### Complexity
* **Time Complexity:** $O(N \log N)$ where $N$ is the number of nodes in the tree. We visit each node once, and then sort the items (or insert them into a self-balancing binary search tree/min-heap) which takes $O(N \log N)$ time.
* **Space Complexity:** $O(N)$ for storing all node coordinates in our data structure and for the recursion stack (or BFS queue) space.

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
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        // map -> col : map -> row : multiset -> values
        map<int, map<int, multiset<int>>> nodes;
        // queue -> pair -> node : pair -> col : row
        queue<pair<TreeNode*, pair<int, int>>> q;
        
        if (root) q.push({root, {0, 0}});
        
        while (!q.empty()) {
            auto p = q.front();
            q.pop();
            TreeNode* node = p.first;
            int col = p.second.first, row = p.second.second;
            
            nodes[col][row].insert(node->val);
            
            if (node->left) q.push({node->left, {col - 1, row + 1}});
            if (node->right) q.push({node->right, {col + 1, row + 1}});
        }
        
        vector<vector<int>> ans;
        for (auto& [col, rowMap] : nodes) {
            vector<int> colList;
            for (auto& [row, values] : rowMap) {
                colList.insert(colList.end(), values.begin(), values.end());
            }
            ans.push_back(colList);
        }
        return ans;
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
    static class Tuple {
        TreeNode node;
        int row, col;
        public Tuple(TreeNode node, int row, int col) {
            this.node = node;
            this.row = row;
            this.col = col;
        }
    }
    
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        // TreeMap to sort by col -> TreeMap to sort by row -> PriorityQueue to sort values
        TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>();
        Queue<Tuple> q = new ArrayDeque<>();
        
        if (root != null) q.offer(new Tuple(root, 0, 0));
        
        while (!q.isEmpty()) {
            Tuple tuple = q.poll();
            TreeNode node = tuple.node;
            int row = tuple.row;
            int col = tuple.col;
            
            map.putIfAbsent(col, new TreeMap<>());
            map.get(col).putIfAbsent(row, new PriorityQueue<>());
            map.get(col).get(row).offer(node.val);
            
            if (node.left != null) q.offer(new Tuple(node.left, row + 1, col - 1));
            if (node.right != null) q.offer(new Tuple(node.right, row + 1, col + 1));
        }
        
        List<List<Integer>> res = new ArrayList<>();
        for (TreeMap<Integer, PriorityQueue<Integer>> cols : map.values()) {
            List<Integer> colList = new ArrayList<>();
            for (PriorityQueue<Integer> nodes : cols.values()) {
                while (!nodes.isEmpty()) {
                    colList.add(nodes.poll());
                }
            }
            res.add(colList);
        }
        return res;
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
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        nodes = []
        
        def dfs(node, row, col):
            if not node:
                return
            nodes.append((col, row, node.val))
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)
            
        dfs(root, 0, 0)
        
        # Sort by column first, then by row, then by value
        nodes.sort()
        
        ans = []
        curr_col = float('-inf')
        
        for col, row, val in nodes:
            if col != curr_col:
                curr_col = col
                ans.append([])
            ans[-1].append(val)
            
        return ans
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
 * @return {number[][]}
 */
var verticalTraversal = function(root) {
    const nodes = [];
    
    const dfs = (node, row, col) => {
        if (!node) return;
        nodes.push({ col, row, val: node.val });
        dfs(node.left, row + 1, col - 1);
        dfs(node.right, row + 1, col + 1);
    };
    
    dfs(root, 0, 0);
    
    // Sort by column first, then by row, then by value
    nodes.sort((a, b) => {
        if (a.col !== b.col) return a.col - b.col;
        if (a.row !== b.row) return a.row - b.row;
        return a.val - b.val;
    });
    
    const ans = [];
    let currCol = -Infinity;
    
    for (const node of nodes) {
        if (node.col !== currCol) {
            currCol = node.col;
            ans.push([]);
        }
        ans[ans.length - 1].push(node.val);
    }
    
    return ans;
};
```