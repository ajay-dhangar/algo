# Tree Algorithms in C++

This repository contains implementations of basic tree algorithms in C++.

## Tree Node Structure

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

## 1. Binary Tree Traversals

### In-order Traversal

```cpp
void inorderTraversal(TreeNode* root) {
    if (root == nullptr) return;
    inorderTraversal(root->left);
    cout << root->val << " ";
    inorderTraversal(root->right);
}
```

### Pre-order Traversal

```cpp
void preorderTraversal(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->val << " ";
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}
```

### Post-order Traversal

```cpp
void postorderTraversal(TreeNode* root) {
    if (root == nullptr) return;
    postorderTraversal(root->left);
    postorderTraversal(root->right);
    cout << root->val << " ";
}
```

### Level-order Traversal (BFS)

```cpp
#include <queue>

void levelOrderTraversal(TreeNode* root) {
    if (root == nullptr) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}
```

## 2. Binary Search Tree (BST) Operations

### Insertion

```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (root == nullptr) return new TreeNode(val);
    if (val < root->val)
        root->left = insert(root->left, val);
    else if (val > root->val)
        root->right = insert(root->right, val);
    return root;
}
```

### Search

```cpp
TreeNode* search(TreeNode* root, int val) {
    if (root == nullptr || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}
```

### Finding Minimum Value

```cpp
TreeNode* findMin(TreeNode* root) {
    while (root->left != nullptr) root = root->left;
    return root;
}
```

## 3. Tree Properties

### Height of a Tree

```cpp
int height(TreeNode* root) {
    if (root == nullptr) return 0;
    return 1 + max(height(root->left), height(root->right));
}
```

### Size of a Tree

```cpp
int size(TreeNode* root) {
    if (root == nullptr) return 0;
    return 1 + size(root->left) + size(root->right);
}
```

## 4. Lowest Common Ancestor (LCA)

```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (root == nullptr || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}
```

## 5. Tree Transformations

### Mirror a Binary Tree

```cpp
void mirror(TreeNode* root) {
    if (root == nullptr) return;
    swap(root->left, root->right);
    mirror(root->left);
    mirror(root->right);
}
```

## 6. Miscellaneous

### Check if Two Trees are Identical

```cpp
bool areIdentical(TreeNode* root1, TreeNode* root2) {
    if (root1 == nullptr && root2 == nullptr) return true;
    if (root1 == nullptr || root2 == nullptr) return false;
    return (root1->val == root2->val) &&
           areIdentical(root1->left, root2->left) &&
           areIdentical(root1->right, root2->right);
}
```

### Find the Diameter of a Binary Tree

```cpp
int diameterOfBinaryTree(TreeNode* root) {
    int diameter = 0;
    
    function<int(TreeNode*)> dfs = [&](TreeNode* node) {
        if (node == nullptr) return 0;
        int left = dfs(node->left);
        int right = dfs(node->right);
        diameter = max(diameter, left + right);
        return 1 + max(left, right);
    };
    
    dfs(root);
    return diameter;
}
```

These implementations cover the basic algorithms for tree data structures in C++. They can be used as a reference or starting point for more complex tree-related problems.
