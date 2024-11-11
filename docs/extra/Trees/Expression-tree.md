---
id: expression-tree
title: Expression-tree
sidebar_label: Expression-tree
description: "An Expression Tree is a binary tree representing expressions with operators as internal nodes and operands as leaves."  
tags: [dsa, algorithms, trees]
---

### Definition:
An Expression Tree is a binary tree in which each internal node represents an operator, and each leaf node represents an operand. By performing an inorder traversal of this tree, the corresponding infix expression can be retrieved. This structure is useful for evaluating expressions and converting between different notations (infix, postfix, prefix).

### Problem Statement:
Given a postfix expression, construct an expression tree where:
- Operators are stored as internal nodes.
- Operands are stored as leaves.
  
### The program should support:
1. **Tree Construction**: Build the expression tree from a postfix expression.
2. **Inorder Traversal**: Traverse the tree in inorder to display the infix expression.

### Algorithm

1. Use a stack to construct the tree from the postfix expression.
2. For each character in the postfix expression:
   - If the character is an operand, create a node and push it onto the stack.
   - If the character is an operator, pop two nodes from the stack, create a new node for the operator, and set the popped nodes as its left and right children.
3. The final node remaining in the stack becomes the root of the expression tree.

### Structure: 
1. **Node Structure**: 
Each node represents an element (operator or operand) in the expression:
    - `value`: Stores either an operand or operator.
    - `left`: Pointer to the left child.
    - `right`: Pointer to the right child.

2. **Functions**
    - `isOperator(char c)`: Checks if a character is an operator.
    - `constructExpressionTree(const std::string& postfix)`: Builds the expression tree from a postfix expression.
    - `inorderTraversal(Node* root)`: Performs an inorder traversal of the expression tree to display the infix expression with parentheses for operator precedence.

3. **Main Function**
    - Takes a postfix expression as input.
    - Constructs the tree using `constructExpressionTree()`.
    - Executes `inorderTraversal()` to display the infix expression.

### Time Complexity
- Each function runs in `O(n)` time, where `n` is the number of characters in the postfix expression. Building the tree and performing inorder traversal both require visiting each node once.

### Space Complexity
- The space complexity is `O(n)` due to the expression tree nodes and the stack used during construction.

### Sample Input:
Enter postfix expression: PQR*-X/

### Sample Output:
Infix expression: ((P-(Q*R))/X)


### C++ Implementation:

```cpp

#include <iostream>
#include <stack>
#include <string>

// Node structure for expression tree
struct Node {
    char value;
    Node* left;
    Node* right;
    
    Node(char val) : value(val), left(nullptr), right(nullptr) {}
};

// Function to check if a character is an operator
bool isOperator(char c) {
    return (c == '+' || c == '-' || c == '*' || c == '/');
}

// Function to construct an expression tree from a postfix expression
Node* constructExpressionTree(const std::string& postfix) {
    std::stack<Node*> stack;
    
    for (char ch : postfix) {
        if (isOperator(ch)) {
            Node* node = new Node(ch);
            // Pop two operands for the operator
            node->right = stack.top();
            stack.pop();
            node->left = stack.top();
            stack.pop();
            stack.push(node);
        } else {
            // Operand, push to stack
            stack.push(new Node(ch));
        }
    }
    
    // The root of the expression tree
    return stack.top();
}

// Inorder traversal of the expression tree to get the infix expression
void inorderTraversal(Node* node) {
    if (!node) return;
    
    // Print left operand with parentheses for correct infix form
    if (isOperator(node->value)) std::cout << "(";
    
    inorderTraversal(node->left);
    std::cout << node->value;
    inorderTraversal(node->right);
    
    if (isOperator(node->value)) std::cout << ")";
}

int main() {
    std::string postfix;
    std::cout << "Enter postfix expression: ";
    std::cin >> postfix;

    Node* root = constructExpressionTree(postfix);

    std::cout << "Infix expression: ";
    inorderTraversal(root);
    std::cout << std::endl;

    return 0;
}


```
