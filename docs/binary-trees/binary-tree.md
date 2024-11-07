---
id: binary-tree-intro
sidebar_position: 1
title: Binary Trees
sidebar_label: Binary Trees
description: "In this blog post, we'll explore binary trees, a fundamental data structure in computer science that enables efficient data organization and retrieval."
tags: [dsa, data structures, binary trees]
---

## Introduction
Binary trees are a fundamental data structure used to represent hierarchical relationships between elements. Each node in a binary tree has at most two children, referred to as the left child and the right child. This structure allows for efficient searching, insertion, and deletion operations, making binary trees an essential concept in computer science.

## Definition and Structure
A binary tree consists of nodes, where each node contains:
- **Data:** The value stored in the node.
- **Left Child:** A reference to the left subtree (or null if no left child exists).
- **Right Child:** A reference to the right subtree (or null if no right child exists).

The tree begins with a single node called the **root**. The hierarchical structure allows for organized storage and retrieval of data.

## Properties
Key characteristics of binary trees include:
- **Height:** The length of the longest path from the root to a leaf node. The height of an empty tree is -1, and the height of a tree with only one node is 0.
- **Depth:** The distance from the root to a specific node. The root node has a depth of 0.
- **Balance:** A tree is considered balanced if the heights of the left and right subtrees of any node differ by at most one.
  
    ```
           A
         /   \
        B     C
       /     / \
      D     F   G

    Height of the tree: 2

    Depth of D, E, F: 2

    Balanced: Yes, the tree is balanced.
    ```


## Types of Binary Trees
1. **Full Binary Trees:** Every node has either 0 or 2 children.
    ```  
         A
        / \
       B   C
      / \   
     D   E 
    ```

2. **Complete Binary Trees:** All levels are completely filled except possibly for the last level, which is filled from left to right.
    ```       
           A
         /   \
        B     C
       / \   / 
      D   E F   
    ```
3. **Perfect Binary Trees:** All internal nodes have two children, and all leaf nodes are at the same level.
    ```
           A
         /   \
        B     C
       / \   / \
      D   E F   G
    ```
4. **Balanced Binary Trees:** The heights of the two child subtrees of any node differ by at most one (e.g., AVL Trees, Red-Black Trees).
   ```
            A (d=1)
           / \ 
    (d=0) B   C (d=0)
             / \ 
      (d=0) F   G (d=0)

      Depth of a node(d)=[height of left child - height of right child]
      ```


5. **Degenerate Trees:** Each parent node has only one child, essentially behaving like a linked list.
    ```
        A
         \
          B
           \
            C
             \
              D
## Implementation

Let us see how to implement binary search in C++:
```cpp
struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};
int main(){

    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->right->left = new Node(5);
    root->right->right = new Node(6);
    //        1
    //       / \
    //      2   3
    //     /   / \
    //    4   5   6

}
```
## Advantages and Disadvantages
**Advantages:**
- Efficient searching, insertion, and deletion operations.
- Provides a hierarchical representation of data.
- Allows for ease of traversal using various methods (in-order, pre-order, post-order).

**Disadvantages:**
- Can become unbalanced, leading to degraded performance (e.g., O(n) in the worst case).
- Memory overhead for pointers, as each node must store references to its children.


## Applications of Binary Trees

- **Search Algorithms**:  
  Binary search algorithms use the structure of binary trees to efficiently search for a specific element.

- **Sorting Algorithms**:  
  Binary trees can be used to implement efficient sorting algorithms, such as tree sort and heap sort.

- **Database Systems**:  
  Binary trees can be used to store data in a database system, with each node representing a record. This allows for efficient search operations and enables the database system to handle large amounts of data.

- **File Systems**:  
  Binary trees can be used to implement file systems, where each node represents a directory or file.

- **Compression Algorithms**:  
  Binary trees can be used to implement Huffman coding, a compression algorithm that assigns variable-length codes to characters based on their frequency of occurrence in the input data.

- **Decision Trees**:  
  Binary trees can be used to implement decision trees.

- **Game AI**:  
  Binary trees can be used to implement game AI, where each node represents a possible move in the game. The AI algorithm can search the tree to find the best possible move.


