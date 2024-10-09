---
id: tree-sort
sidebar_position: 15
title: Tree Sort Algorithm
sidebar_label: Tree Sort
description: "In this blog post, we'll explore the Tree Sort algorithm, which uses binary search trees (BSTs) for efficient sorting of elements."
tags: [dsa, data structures, bst, sorting]
---

## Introduction
**Tree Sort** is a comparison-based sorting algorithm that leverages a Binary Search Tree (BST) to sort elements efficiently. The algorithm works by inserting elements into a BST, then performing an in-order traversal to retrieve elements in sorted order. This method is optimal for dynamic and partially sorted data and ensures an average time complexity of O(n log n) when the BST is balanced.

## Definition and Structure
Tree Sort consists of two main steps:
- **Insert** all elements into a Binary Search Tree.
- Perform an **in-order traversal** of the BST to retrieve elements in a sorted sequence.

The in-order traversal takes advantage of the BST’s property, where the left subtree contains values smaller than the root and the right subtree contains values larger than the root, allowing for sorted output.

## Properties
The properties of Tree Sort stem from the underlying Binary Search Tree structure:
- **Average Time Complexity:** O(n log n) for balanced trees.
- **Worst-Case Time Complexity:** O(n²) when the BST is unbalanced (degenerates into a linked list).
- **Space Complexity:** O(n), as additional memory is required to store the BST nodes.

## Example Structure
In the example below, we’ll insert elements {5, 1, 8, 7, 2, 9} into a BST and perform an in-order traversal:

**Tree Structure after Insertion:**
    ```
        5
       / \
      1   8
       \  / 
        2 7 
           \
            9
    ```
## In-Order Traversal Output
The in-order traversal visits nodes in ascending order, producing the output: **1 2 5 7 8 9.**

#### Code Example (C++)
```cpp
#include <iostream>
using namespace std;

// Structure of a BST Node
struct Node {
    int data;
    Node* left;
    Node* right;

    // Constructor
    Node(int value) {
        data = value;
        left = right = nullptr;
    }
};

// Function to insert a new node into the BST
Node* insert(Node* root, int key) {
    if (root == nullptr) {
        return new Node(key);
    }
    
    if (key < root->data) {
        root->left = insert(root->left, key);
    } else if (key > root->data) {
        root->right = insert(root->right, key);
    }
    
    return root;
}

// In-order traversal of the BST
void inOrder(Node* root) {
    if (root != nullptr) {
        inOrder(root->left);
        cout << root->data << " ";
        inOrder(root->right);
    }
}

// Tree Sort function
void treeSort(int arr[], int n) {
    Node* root = nullptr;
    for (int i = 0; i < n; i++) {
        root = insert(root, arr[i]);
    }

    cout << "Sorted elements: ";
    inOrder(root);
    cout << endl;
}

int main() {
    int arr[] = {5, 1, 8, 7, 2, 9};
    int n = sizeof(arr) / sizeof(arr[0]);

    treeSort(arr, n);

    return 0;
}

```

## Advantages and Disadvantages

### Advantages:

- **Efficient for dynamic data:** Tree Sort works well when data is inserted or deleted frequently, as the BST maintains the sorted structure.

- **Average-case Performance:** The average time complexity of O(n log n) makes Tree Sort suitable for many applications.

### Disadvantages:

- **Worst-case Performance:** If the BST is unbalanced, the time complexity degrades to O(n²), leading to slower performance.

- **Additional Space Requirement:** BST nodes require additional memory, with a space complexity of O(n).

- **Complex Implementation:** The recursive nature of the BST and the need for balancing can make the implementation
complex.

## Applications of Tree Sort

- **Database Sorting:** Tree Sort is used in database management systems to maintain and sort dynamic datasets efficiently.

- **Sorting Dynamic Data:** Tree Sort is well-suited for situations where data is being modified continuously.

- **Partially Sorted Data:** When the data is nearly sorted, Tree Sort offers a convenient way to complete the sorting.
