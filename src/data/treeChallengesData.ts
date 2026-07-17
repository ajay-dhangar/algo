export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface TreeChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: "Trees";
  timeLimit: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  starterCodes?: Record<string, string>;
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
  solution: string;
}

export const TREE_CHALLENGES: TreeChallenge[] = [
  // ─── EASY ───────────────────────────────────────────────────────────────────
  {
    id: "tree-01",
    title: "Tree Traversals (Inorder, Preorder, Postorder)",
    slug: "tree-traversals",
    difficulty: "Easy",
    category: "Trees",
    timeLimit: "20 min",
    description: `Given the root of a binary tree, return the **inorder**, **preorder**, and **postorder** traversals as three separate arrays.

- **Preorder**: Root → Left → Right  
- **Inorder**: Left → Root → Right  
- **Postorder**: Left → Right → Root`,
    examples: [
      {
        input: "root = [1, null, 2, 3]",
        output: '{ inorder: [1,3,2], preorder: [1,2,3], postorder: [3,2,1] }',
        explanation: "For a tree with root 1, right child 2, and 2's left child 3.",
      },
      {
        input: "root = [1]",
        output: '{ inorder: [1], preorder: [1], postorder: [1] }',
        explanation: "Single node tree.",
      },
    ],
    constraints: [
      "Number of nodes is in the range [0, 100]",
      "-100 <= Node.val <= 100",
    ],
    starterCode: `// TreeNode definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: build tree from level-order array
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
    i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {{ inorder: number[], preorder: number[], postorder: number[] }}
 */
function treeTraversals(root) {
  // Your code here
}

// Test
const root = buildTree([1, null, 2, 3]);
console.log(JSON.stringify(treeTraversals(root)));
// Expected: {"inorder":[1,3,2],"preorder":[1,2,3],"postorder":[3,2,1]}
`,
    starterCodes: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def tree_traversals(root):
    # Your code here
    pass
`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <vector>
#include <map>
using namespace std;

map<string, vector<int>> treeTraversals(TreeNode* root) {
    // Your code here
    return {};
}
`
    },
    testCases: [
      { input: "[1, null, 2, 3]", expected: '{"inorder":[1,3,2],"preorder":[1,2,3],"postorder":[3,2,1]}', description: "Basic tree" },
      { input: "[]", expected: '{"inorder":[],"preorder":[],"postorder":[]}', description: "Empty tree" },
      { input: "[1]", expected: '{"inorder":[1],"preorder":[1],"postorder":[1]}', description: "Single node" },
      { input: "[1,2,3,4,5]", expected: '{"inorder":[4,2,5,1,3],"preorder":[1,2,4,5,3],"postorder":[4,5,2,3,1]}', description: "Full tree" },
    ],
    timeComplexity: "O(n) — each node is visited exactly once per traversal.",
    spaceComplexity: "O(h) — recursion stack depth equals tree height h; O(n) worst-case for skewed trees.",
    hint: "Use recursion. For inorder: recurse left, push root.val, recurse right.",
    solution: `function treeTraversals(root) {
  const inorder = [], preorder = [], postorder = [];
  function dfs(node) {
    if (!node) return;
    preorder.push(node.val);
    dfs(node.left);
    inorder.push(node.val);
    dfs(node.right);
    postorder.push(node.val);
  }
  dfs(root);
  return { inorder, preorder, postorder };
}`,
  },
  {
    id: "tree-02",
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-binary-tree",
    difficulty: "Easy",
    category: "Trees",
    timeLimit: "15 min",
    description: `Given the root of a binary tree, return its **maximum depth**.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "The longest path is 3→20→15 or 3→20→7, length 3." },
      { input: "root = [1,null,2]", output: "2", explanation: "Path is 1→2." },
    ],
    constraints: ["Number of nodes in [0, 10^4]", "-100 <= Node.val <= 100"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Your code here
}

const root = buildTree([3,9,20,null,null,15,7]);
console.log(maxDepth(root)); // Expected: 3
`,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "3", description: "Standard tree" },
      { input: "[1,null,2]", expected: "2", description: "Right-skewed" },
      { input: "[]", expected: "0", description: "Empty tree" },
      { input: "[1]", expected: "1", description: "Single node" },
      { input: "[1,2,3,4,5,6,7]", expected: "3", description: "Perfect binary tree" },
    ],
    timeComplexity: "O(n) — visit every node once.",
    spaceComplexity: "O(h) — recursion stack, O(log n) balanced, O(n) skewed.",
    hint: "maxDepth(node) = 1 + max(maxDepth(left), maxDepth(right)). Base case: null → 0.",
    solution: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
  },
  {
    id: "tree-03",
    title: "Count Leaf Nodes",
    slug: "count-leaf-nodes",
    difficulty: "Easy",
    category: "Trees",
    timeLimit: "15 min",
    description: `Given the root of a binary tree, return the **number of leaf nodes**.

A **leaf node** is a node with no children (both left and right are null).`,
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "Leaves are 4, 5, and 3." },
      { input: "root = [1]", output: "1", explanation: "Root itself is the only leaf." },
    ],
    constraints: ["Number of nodes in [1, 10^4]", "Node values are integers"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function countLeafNodes(root) {
  // Your code here
}

const root = buildTree([1,2,3,4,5]);
console.log(countLeafNodes(root)); // Expected: 3
`,
    testCases: [
      { input: "[1,2,3,4,5]", expected: "3", description: "Five-node tree" },
      { input: "[1]", expected: "1", description: "Single node" },
      { input: "[1,2,3]", expected: "2", description: "Root + two leaves" },
      { input: "[1,2,null,3]", expected: "1", description: "Left-skewed branch" },
    ],
    timeComplexity: "O(n) — every node is visited.",
    spaceComplexity: "O(h) — recursive stack.",
    hint: "A leaf has !node.left && !node.right. Count recursively.",
    solution: `function countLeafNodes(root) {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}`,
  },
  {
    id: "tree-04",
    title: "Sum of All Nodes",
    slug: "sum-of-all-nodes",
    difficulty: "Easy",
    category: "Trees",
    timeLimit: "15 min",
    description: `Given the root of a binary tree, return the **sum of all node values** in the tree.`,
    examples: [
      { input: "root = [1,2,3,4,5]", output: "15", explanation: "1+2+3+4+5 = 15." },
      { input: "root = [-1,2,-3]", output: "-2", explanation: "-1+2+(-3) = -2." },
    ],
    constraints: ["Number of nodes in [0, 10^4]", "-1000 <= Node.val <= 1000"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumOfAllNodes(root) {
  // Your code here
}

const root = buildTree([1,2,3,4,5]);
console.log(sumOfAllNodes(root)); // Expected: 15
`,
    testCases: [
      { input: "[1,2,3,4,5]", expected: "15", description: "Positive values" },
      { input: "[-1,2,-3]", expected: "-2", description: "Mixed signs" },
      { input: "[]", expected: "0", description: "Empty tree" },
      { input: "[7]", expected: "7", description: "Single node" },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    hint: "sumOfAllNodes(node) = node.val + sumOfAllNodes(left) + sumOfAllNodes(right).",
    solution: `function sumOfAllNodes(root) {
  if (!root) return 0;
  return root.val + sumOfAllNodes(root.left) + sumOfAllNodes(root.right);
}`,
  },

  // ─── MEDIUM ─────────────────────────────────────────────────────────────────
  {
    id: "tree-05",
    title: "Level Order Traversal",
    slug: "level-order-traversal",
    difficulty: "Medium",
    category: "Trees",
    timeLimit: "25 min",
    description: `Given the root of a binary tree, return the **level order traversal** of its nodes' values (i.e., from left to right, level by level) as a 2D array.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]." },
      { input: "root = [1]", output: "[[1]]", explanation: "Single node." },
    ],
    constraints: ["Number of nodes in [0, 2000]", "-1000 <= Node.val <= 1000"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  // Your code here
}

const root = buildTree([3,9,20,null,null,15,7]);
console.log(JSON.stringify(levelOrder(root))); // Expected: [[3],[9,20],[15,7]]
`,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "[[3],[9,20],[15,7]]", description: "Standard tree" },
      { input: "[1]", expected: "[[1]]", description: "Single node" },
      { input: "[]", expected: "[]", description: "Empty tree" },
      { input: "[1,2,3,4,5]", expected: "[[1],[2,3],[4,5]]", description: "Five-node tree" },
    ],
    timeComplexity: "O(n) — each node enqueued/dequeued once.",
    spaceComplexity: "O(n) — queue holds up to n/2 nodes at leaf level.",
    hint: "Use a BFS queue. For each level, record its size, then dequeue exactly that many nodes, collecting values and enqueuing their children.",
    solution: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
  },
  {
    id: "tree-06",
    title: "Lowest Common Ancestor",
    slug: "lowest-common-ancestor",
    difficulty: "Medium",
    category: "Trees",
    timeLimit: "30 min",
    description: `Given a binary tree and two nodes **p** and **q**, find their **Lowest Common Ancestor (LCA)**.

The LCA is defined as the lowest node in the tree that has both p and q as descendants (a node can be a descendant of itself).`,
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3", explanation: "LCA of 5 and 1 is 3." },
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5", explanation: "LCA of 5 and 4 is 5, since 5 is an ancestor of 4." },
    ],
    constraints: [
      "Number of nodes in [2, 10^5]",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique",
      "p != q, both exist in the tree",
    ],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @param {number} p - value of node p
 * @param {number} q - value of node q
 * @return {number} value of LCA node
 */
function lowestCommonAncestor(root, p, q) {
  // Your code here
}

const root = buildTree([3,5,1,6,2,0,8,null,null,7,4]);
console.log(lowestCommonAncestor(root, 5, 1)); // Expected: 3
console.log(lowestCommonAncestor(root, 5, 4)); // Expected: 5
`,
    testCases: [
      { input: "[3,5,1,6,2,0,8,null,null,7,4] p=5 q=1", expected: "3", description: "LCA is root" },
      { input: "[3,5,1,6,2,0,8,null,null,7,4] p=5 q=4", expected: "5", description: "One is ancestor of other" },
      { input: "[1,2] p=1 q=2", expected: "1", description: "Root and child" },
    ],
    timeComplexity: "O(n) — potentially visit all nodes.",
    spaceComplexity: "O(h) — recursion stack.",
    hint: "If the current node is p or q, return it. Recurse on both sides. If both return non-null, current node is LCA.",
    solution: `function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root ? root.val : null;
  const left = lowestCommonAncestor_node(root.left, p, q);
  const right = lowestCommonAncestor_node(root.right, p, q);
  if (left && right) return root.val;
  return left ? left : right;
}
// Note: implement as recursive helper returning the node itself.`,
  },
  {
    id: "tree-07",
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    category: "Trees",
    timeLimit: "25 min",
    description: `Given the root of a binary tree, determine if it is a **valid Binary Search Tree (BST)**.

A valid BST requires:
- The left subtree of a node contains only nodes with keys **strictly less than** the node's key.
- The right subtree contains only nodes with keys **strictly greater than** the node's key.
- Both subtrees must also be valid BSTs.`,
    examples: [
      { input: "root = [2,1,3]", output: "true", explanation: "1 < 2 < 3, valid BST." },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Node 4 is in the right subtree of 5, but 4 < 5." },
    ],
    constraints: ["Number of nodes in [1, 10^4]", "-2^31 <= Node.val <= 2^31 - 1"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
  // Your code here
}

console.log(isValidBST(buildTree([2,1,3]))); // true
console.log(isValidBST(buildTree([5,1,4,null,null,3,6]))); // false
`,
    testCases: [
      { input: "[2,1,3]", expected: "true", description: "Valid BST" },
      { input: "[5,1,4,null,null,3,6]", expected: "false", description: "Invalid BST" },
      { input: "[1]", expected: "true", description: "Single node" },
      { input: "[5,4,6,null,null,3,7]", expected: "false", description: "Subtree violation" },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    hint: "Pass min and max bounds down the recursion. Each node's value must satisfy min < node.val < max.",
    solution: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`,
  },
  {
    id: "tree-08",
    title: "Diameter of Binary Tree",
    slug: "diameter-binary-tree",
    difficulty: "Medium",
    category: "Trees",
    timeLimit: "25 min",
    description: `Given the root of a binary tree, return the **diameter** — the length of the longest path between any two nodes.

The path may or may not pass through the root. The length is measured in **number of edges**.`,
    examples: [
      { input: "root = [1,2,3,4,5]", output: "3", explanation: "Path [4,2,1,3] or [5,2,1,3], length 3." },
      { input: "root = [1,2]", output: "1", explanation: "Single edge between 1 and 2." },
    ],
    constraints: ["Number of nodes in [1, 10^4]", "-100 <= Node.val <= 100"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
  // Your code here
}

console.log(diameterOfBinaryTree(buildTree([1,2,3,4,5]))); // 3
console.log(diameterOfBinaryTree(buildTree([1,2]))); // 1
`,
    testCases: [
      { input: "[1,2,3,4,5]", expected: "3", description: "Standard case" },
      { input: "[1,2]", expected: "1", description: "Two nodes" },
      { input: "[1]", expected: "0", description: "Single node" },
      { input: "[1,2,null,3,null,4]", expected: "3", description: "Left-skewed" },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    hint: "The diameter through a node equals depth(left) + depth(right). Track the max via a closure variable.",
    solution: `function diameterOfBinaryTree(root) {
  let max = 0;
  function depth(node) {
    if (!node) return 0;
    const l = depth(node.left), r = depth(node.right);
    max = Math.max(max, l + r);
    return 1 + Math.max(l, r);
  }
  depth(root);
  return max;
}`,
  },
  {
    id: "tree-09",
    title: "Left View / Right View of Binary Tree",
    slug: "left-right-view-binary-tree",
    difficulty: "Medium",
    category: "Trees",
    timeLimit: "25 min",
    description: `Given the root of a binary tree, return both the **left view** and **right view**.

- **Left view**: The first node visible when looking from the left side at each level.
- **Right view**: The last node visible when looking from the right side at each level.`,
    examples: [
      { input: "root = [1,2,3,4,5,6,7]", output: '{ left: [1,2,4], right: [1,3,7] }', explanation: "First and last node of each level." },
      { input: "root = [1,2,null,3]", output: '{ left: [1,2,3], right: [1,2,3] }', explanation: "Only one node per level." },
    ],
    constraints: ["Number of nodes in [0, 500]"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {{ left: number[], right: number[] }}
 */
function treeViews(root) {
  // Your code here
}

const root = buildTree([1,2,3,4,5,6,7]);
console.log(JSON.stringify(treeViews(root)));
// Expected: {"left":[1,2,4],"right":[1,3,7]}
`,
    testCases: [
      { input: "[1,2,3,4,5,6,7]", expected: '{"left":[1,2,4],"right":[1,3,7]}', description: "Full tree" },
      { input: "[1,2,null,3]", expected: '{"left":[1,2,3],"right":[1,2,3]}', description: "Left-skewed" },
      { input: "[]", expected: '{"left":[],"right":[]}', description: "Empty tree" },
    ],
    timeComplexity: "O(n) — BFS visits all nodes.",
    spaceComplexity: "O(n) — queue storage.",
    hint: "Use BFS (level order). For each level, the first node is in the left view; the last is in the right view.",
    solution: `function treeViews(root) {
  if (!root) return { left: [], right: [] };
  const left = [], right = [], queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === 0) left.push(node.val);
      if (i === size - 1) right.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return { left, right };
}`,
  },

  // ─── HARD ────────────────────────────────────────────────────────────────────
  {
    id: "tree-10",
    title: "Serialize and Deserialize Binary Tree",
    slug: "serialize-deserialize-binary-tree",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "45 min",
    description: `Design an algorithm to **serialize** a binary tree to a string and **deserialize** that string back to the original tree structure.

- \`serialize(root)\` → string  
- \`deserialize(data)\` → TreeNode

There is no restriction on how your serialization/deserialization algorithm works, as long as a tree can be serialized to a string and this string can be deserialized to the original tree structure.`,
    examples: [
      { input: "root = [1,2,3,null,null,4,5]", output: "Same tree reconstructed", explanation: "serialize then deserialize returns the same tree." },
      { input: "root = []", output: "null", explanation: "Empty tree." },
    ],
    constraints: ["Number of nodes in [0, 10^4]", "-1000 <= Node.val <= 1000"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}
function treeToArray(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length) {
    const n = q.shift();
    res.push(n ? n.val : null);
    if (n) { q.push(n.left); q.push(n.right); }
  }
  while (res[res.length - 1] === null) res.pop();
  return res;
}

/**
 * Encodes a tree to a single string.
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
  // Your code here
}

/**
 * Decodes your encoded data to tree.
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
  // Your code here
}

// Test: serialize then deserialize should yield same tree
const root = buildTree([1,2,3,null,null,4,5]);
const serialized = serialize(root);
console.log("Serialized:", serialized);
const deserialized = deserialize(serialized);
console.log("Deserialized:", JSON.stringify(treeToArray(deserialized)));
// Expected: [1,2,3,null,null,4,5]
`,
    testCases: [
      { input: "[1,2,3,null,null,4,5]", expected: "[1,2,3,null,null,4,5]", description: "Standard tree round-trip" },
      { input: "[]", expected: "[]", description: "Empty tree" },
      { input: "[1]", expected: "[1]", description: "Single node" },
      { input: "[1,2,null,3]", expected: "[1,2,null,3]", description: "Left-skewed" },
    ],
    timeComplexity: "O(n) for both serialize and deserialize.",
    spaceComplexity: "O(n) for the output string and reconstruction queue.",
    hint: "Use preorder DFS: serialize as 'val,#,#,...' where # = null. Split by comma and rebuild recursively using an index pointer.",
    solution: `function serialize(root) {
  const parts = [];
  function dfs(node) {
    if (!node) { parts.push('#'); return; }
    parts.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(',');
}
function deserialize(data) {
  const vals = data.split(',');
  let i = 0;
  function dfs() {
    if (vals[i] === '#') { i++; return null; }
    const node = new TreeNode(Number(vals[i++]));
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  return dfs();
}`,
  },
  {
    id: "tree-11",
    title: "Vertical Order Traversal",
    slug: "vertical-order-traversal",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "40 min",
    description: `Given the root of a binary tree, calculate the **vertical order traversal**.

For each node at position (row, col):
- Root is at (0, 0).
- Left child of a node at (r, c) is at (r+1, c-1).
- Right child is at (r+1, c+1).

Return an array of node values grouped by column from left to right. Within the same column and row, sort by node value.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[9],[3,15],[20],[7]]", explanation: "Columns from left to right." },
      { input: "root = [1,2,3,4,5,6,7]", output: "[[4],[2],[1,5,6],[3],[7]]", explanation: "Nodes in same col+row are sorted." },
    ],
    constraints: ["Number of nodes in [1, 1000]", "0 <= Node.val <= 1000"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function verticalTraversal(root) {
  // Your code here
}

const root = buildTree([3,9,20,null,null,15,7]);
console.log(JSON.stringify(verticalTraversal(root)));
// Expected: [[9],[3,15],[20],[7]]
`,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "[[9],[3,15],[20],[7]]", description: "Standard case" },
      { input: "[1,2,3,4,5,6,7]", expected: "[[4],[2],[1,5,6],[3],[7]]", description: "Full tree with ties" },
      { input: "[1]", expected: "[[1]]", description: "Single node" },
    ],
    timeComplexity: "O(n log n) — sorting nodes.",
    spaceComplexity: "O(n)",
    hint: "Collect (col, row, val) tuples via BFS. Sort by col, then row, then val. Group by col.",
    solution: `function verticalTraversal(root) {
  const nodes = [];
  const queue = [[root, 0, 0]];
  while (queue.length) {
    const [node, row, col] = queue.shift();
    nodes.push([col, row, node.val]);
    if (node.left) queue.push([node.left, row + 1, col - 1]);
    if (node.right) queue.push([node.right, row + 1, col + 1]);
  }
  nodes.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  const map = new Map();
  for (const [col, , val] of nodes) {
    if (!map.has(col)) map.set(col, []);
    map.get(col).push(val);
  }
  return [...map.keys()].sort((a, b) => a - b).map(k => map.get(k));
}`,
  },
  {
    id: "tree-12",
    title: "Construct Tree from Traversal Arrays",
    slug: "construct-tree-from-traversals",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "45 min",
    description: `Given two integer arrays **preorder** and **inorder** where:
- \`preorder\` is the preorder traversal of a binary tree
- \`inorder\` is the inorder traversal of the same tree

Construct and return the binary tree. Return the level-order representation.`,
    examples: [
      { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]", explanation: "Classic reconstruction." },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]", explanation: "Single node." },
    ],
    constraints: ["1 <= inorder.length <= 3000", "preorder.length == inorder.length", "All values are unique"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function treeToLevelOrder(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length) {
    const n = q.shift();
    res.push(n ? n.val : null);
    if (n) { q.push(n.left); q.push(n.right); }
  }
  while (res[res.length - 1] === null) res.pop();
  return res;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTreeFromTraversals(preorder, inorder) {
  // Your code here
}

const root = buildTreeFromTraversals([3,9,20,15,7], [9,3,15,20,7]);
console.log(JSON.stringify(treeToLevelOrder(root)));
// Expected: [3,9,20,null,null,15,7]
`,
    testCases: [
      { input: "pre=[3,9,20,15,7] in=[9,3,15,20,7]", expected: "[3,9,20,null,null,15,7]", description: "Classic case" },
      { input: "pre=[-1] in=[-1]", expected: "[-1]", description: "Single node" },
      { input: "pre=[1,2] in=[2,1]", expected: "[1,2]", description: "Root with left child" },
    ],
    timeComplexity: "O(n) with a hash map for inorder indices.",
    spaceComplexity: "O(n)",
    hint: "The first element of preorder is always the root. Find it in inorder to split left/right subtrees. Recurse.",
    solution: `function buildTreeFromTraversals(preorder, inorder) {
  const map = new Map(inorder.map((v, i) => [v, i]));
  let pi = 0;
  function build(left, right) {
    if (left > right) return null;
    const val = preorder[pi++];
    const node = new TreeNode(val);
    const mid = map.get(val);
    node.left = build(left, mid - 1);
    node.right = build(mid + 1, right);
    return node;
  }
  return build(0, inorder.length - 1);
}`,
  },
  {
    id: "tree-13",
    title: "Binary Tree Maximum Path Sum",
    slug: "binary-tree-max-path-sum",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "45 min",
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. A node can only appear once in the path, and the path does not need to pass through the root.

Given the root of a binary tree, return the **maximum path sum** (the path can start and end at any node).`,
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "Path: 2 → 1 → 3, sum = 6." },
      { input: "root = [-3]", output: "-3", explanation: "Only the root node." },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "Path: 15 → 20 → 7, sum = 42." },
    ],
    constraints: ["Number of nodes in [1, 3 * 10^4]", "-1000 <= Node.val <= 1000"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  // Your code here
}

console.log(maxPathSum(buildTree([1,2,3]))); // 6
console.log(maxPathSum(buildTree([-10,9,20,null,null,15,7]))); // 42
`,
    testCases: [
      { input: "[1,2,3]", expected: "6", description: "Simple three-node tree" },
      { input: "[-10,9,20,null,null,15,7]", expected: "42", description: "Classic LeetCode example" },
      { input: "[-3]", expected: "-3", description: "Single negative node" },
      { input: "[2,-1]", expected: "2", description: "Positive root with negative child" },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    hint: "For each node, compute the max gain it contributes going upward (only one branch). Update global max with left_gain + node.val + right_gain.",
    solution: `function maxPathSum(root) {
  let max = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const l = Math.max(gain(node.left), 0);
    const r = Math.max(gain(node.right), 0);
    max = Math.max(max, node.val + l + r);
    return node.val + Math.max(l, r);
  }
  gain(root);
  return max;
}`,
  },
  {
    id: "tree-14",
    title: "Recover Binary Search Tree",
    slug: "recover-binary-search-tree",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "50 min",
    description: `You are given the root of a binary search tree (BST), where the values of **exactly two nodes** have been swapped by mistake.

Recover the tree without changing its structure. Return the inorder traversal after recovery.`,
    examples: [
      { input: "root = [1,3,null,null,2]", output: "[1,2,3]", explanation: "3 and 2 were swapped. After recovery: [3,1,null,null,2] → inorder [1,2,3]." },
      { input: "root = [3,1,4,null,null,2]", output: "[1,2,3,4]", explanation: "3 and 2 were swapped. Recovered inorder." },
    ],
    constraints: ["Number of nodes in [2, 1000]", "-2^31 <= Node.val <= 2^31 - 1"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}
function inorderArray(root) {
  const res = [];
  function dfs(n) { if (!n) return; dfs(n.left); res.push(n.val); dfs(n.right); }
  dfs(root);
  return res;
}

/**
 * @param {TreeNode} root
 * @return {void} Modify root in-place.
 */
function recoverTree(root) {
  // Your code here
}

const root = buildTree([1,3,null,null,2]);
recoverTree(root);
console.log(JSON.stringify(inorderArray(root))); // Expected: [1,2,3]
`,
    testCases: [
      { input: "[1,3,null,null,2]", expected: "[1,2,3]", description: "Adjacent swap" },
      { input: "[3,1,4,null,null,2]", expected: "[1,2,3,4]", description: "Non-adjacent swap" },
    ],
    timeComplexity: "O(n) for standard inorder; O(1) extra space with Morris traversal.",
    spaceComplexity: "O(h) with recursion, O(1) with Morris.",
    hint: "Inorder traversal of a valid BST is sorted. Find two nodes that are 'out of place': first inversion gives the first node, second gives the second. Swap their values.",
    solution: `function recoverTree(root) {
  let first = null, second = null, prev = null;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prev && prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;
    inorder(node.right);
  }
  inorder(root);
  [first.val, second.val] = [second.val, first.val];
}`,
  },
  {
    id: "tree-15",
    title: "Symmetric Tree",
    slug: "symmetric-tree",
    difficulty: "Easy",
    category: "Trees",
    timeLimit: "15 min",
    description: `Given the root of a binary tree, check whether it is a **mirror of itself** (i.e., symmetric around its center).`,
    examples: [
      { input: "root = [1,2,2,3,4,4,3]", output: "true", explanation: "The tree is symmetric." },
      { input: "root = [1,2,2,null,3,null,3]", output: "false", explanation: "Not symmetric — asymmetric subtrees." },
    ],
    constraints: ["Number of nodes in [1, 1000]", "-100 <= Node.val <= 100"],
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
function buildTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (arr[i] != null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] != null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
  // Your code here
}

console.log(isSymmetric(buildTree([1,2,2,3,4,4,3]))); // true
console.log(isSymmetric(buildTree([1,2,2,null,3,null,3]))); // false
`,
    testCases: [
      { input: "[1,2,2,3,4,4,3]", expected: "true", description: "Symmetric tree" },
      { input: "[1,2,2,null,3,null,3]", expected: "false", description: "Asymmetric" },
      { input: "[1]", expected: "true", description: "Single node" },
      { input: "[1,2,2,null,3,3,null]", expected: "true", description: "Another symmetric" },
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    hint: "Define isMirror(left, right): both null → true, one null → false, values differ → false, else recurse isMirror(left.left, right.right) && isMirror(left.right, right.left).",
    solution: `function isSymmetric(root) {
  function isMirror(l, r) {
    if (!l && !r) return true;
    if (!l || !r || l.val !== r.val) return false;
    return isMirror(l.left, r.right) && isMirror(l.right, r.left);
  }
  return isMirror(root.left, root.right);
}`,
  },
];

export default TREE_CHALLENGES;
