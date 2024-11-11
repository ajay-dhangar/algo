---
id: expression tree
title: Postfix to Infix conversion
sidebar_label: expression tree
description: "Given a postfix expression construct a tree that stores operator as internal nodes and the opernads as leaves. On inorder traversal it gives the infix expression of the postfix."
tags: [dsa, binary trees, recursion, c++]
---

## Introduction
Binary trees are a fundamental data structure used to represent hierarchical relationships between elements. Each node in a binary tree has at most two children, referred to as the left child and the right child. This structure allows for efficient searching, insertion, and deletion operations, making binary trees an essential concept in computer science. A postfix expression is an arithmetic expression where operators follow their operands, allowing evaluation without parentheses or precedence rules, using a stack-based approach. An infix expression is an arithmetic expression where operators are placed between operands (e.g., A + B), requiring parentheses or operator precedence to determine the order of operations.


## Problem Definition
Given a postfix expression, construct an expression tree from the given expression, where operators are internal nodes, and operands are leaf nodes. When you perform an inorder traversal on this tree, it should yield the corresponding infix expression of the postfix input.

## Approach
### 1. Initialize a Stack
   - Create an empty stack to store tree nodes.

### 2. Process Each Character in the Postfix Expression
   - **If the character is an operand** (e.g., a letter or number), create a new tree node with this operand as its value, and push it onto the stack.
   - **If the character is an operator** (e.g., `+`, `-`, `*`, `/`):
     - Pop the top two nodes from the stack. The first node popped is the **right child**, and the second node is the **left child**.
     - Create a new tree node with the operator as its value and set the popped nodes as its children (left and right).
     - Push this new node (subtree) back onto the stack.

### 3. Final Root Node
   - After processing all characters, the stack will contain only one node, which is the **root of the expression tree**.

### 4. Inorder Traversal to Get Infix Expression
   - Perform an **inorder traversal** on the tree. This traversal will give the infix expression equivalent of the original postfix expression.

## Example Walkthrough
For a postfix expression `"ab+c*"`:

1. Process `a` and `b` (operands): push as nodes onto the stack.
2. Process `+` (operator): pop `b` and `a`, create a `+` node with `a` as the left child and `b` as the right child, and push the `+` node back.
3. Process `c` (operand): push as a node onto the stack.
4. Process `*` (operator): pop the `+` subtree and `c`, create a `*` node with `+` as the left child and `c` as the right child, and push the `*` node back.
5. The stack now has one node (root of the tree).

**Inorder traversal** on this tree will yield `((a + b) * c)`, which is the infix expression.

## C++ Code Implementation

```cpp

#include <iostream>
#include <stack>
#include <string>

using namespace std;

// TreeNode class to represent each node in the expression tree
class TreeNode {
public:
    char value;
    TreeNode* left;
    TreeNode* right;

    TreeNode(char val) : value(val), left(nullptr), right(nullptr) {}
};

// Function to check if a character is an operator
bool isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/');
}

// Function to construct the expression tree from a postfix expression
TreeNode* constructExpressionTree(const string& postfix) {
    stack<TreeNode*> stack;

    for (char ch : postfix) {
        if (isOperator(ch)) {
            // Pop two nodes for the operator
            TreeNode* right = stack.top(); stack.pop();
            TreeNode* left = stack.top(); stack.pop();

            // Create a new node with the operator and attach left and right children
            TreeNode* node = new TreeNode(ch);
            node->left = left;
            node->right = right;

            // Push the new subtree back onto the stack
            stack.push(node);
        } else {
            // Push operand as a new node onto the stack
            stack.push(new TreeNode(ch));
        }
    }

    // The remaining node in the stack is the root of the expression tree
    return stack.top();
}

// Function to perform inorder traversal of the expression tree
void inorderTraversal(TreeNode* root) {
    if (root == nullptr) return;

    // Add parentheses for operators to get the correct infix expression
    if (isOperator(root->value)) cout << "(";
    
    inorderTraversal(root->left);
    cout << root->value;
    inorderTraversal(root->right);
    
    if (isOperator(root->value)) cout << ")";
}

int main() {
    string postfix = "ab+c*";
    
    // Construct the expression tree
    TreeNode* root = constructExpressionTree(postfix);
    
    // Print the infix expression using inorder traversal
    cout << "Infix Expression: ";
    inorderTraversal(root);
    cout << endl;

    return 0;
}

```
## Code Analysis

### Time Complexity
- **Constructing the Expression Tree**: **O(n)**, where **n** is the number of characters in the postfix expression.
- **Inorder Traversal**: **O(n)**.
- **Overall**: **O(n)**.

### Space Complexity
- **Stack and Tree Storage**: **O(n)** for both the stack and the expression tree.

## Summary
The implementation effectively constructs an expression tree from a postfix expression and outputs the corresponding infix expression, with efficient time and space complexities, and a clear, maintainable structure.
