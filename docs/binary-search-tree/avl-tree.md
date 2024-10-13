---
id: avl-tree-intro
sidebar_position: 16
title: AVL Trees
sidebar_label: AVL Trees
description: "In this blog post, we'll explore AVL trees, a type of self-balancing binary search tree that ensures efficient searching, insertion, and deletion operations."
tags: [dsa, data structures, avl]
---

## Introduction
An **AVL Tree** is a self-balancing binary search tree (BST) where the difference in heights between the left and right subtrees of any node is at most one. This balancing property ensures that the tree remains approximately balanced after insertions and deletions, resulting in efficient operations. AVL trees are named after their inventors, Georgy Adelson-Velsky and Evgenii Landis, who introduced this data structure in 1962.

## Definition and Structure
An AVL tree consists of nodes similar to a BST, but with an added balance factor for each node:
- **Data:** The value stored in the node.
- **Left Child:** A reference to the left subtree (containing nodes with smaller values).
- **Right Child:** A reference to the right subtree (containing nodes with larger values).
- **Balance Factor:** The height difference between the left and right subtrees, calculated as `height(left subtree) - height(right subtree)`.

The AVL tree maintains this balance factor throughout all operations, ensuring that the height remains logarithmic.

## Properties
Some important properties of AVL trees include:
- **Height:** The height of an AVL tree with `n` nodes is guaranteed to be O(log n).
- **Balance Factor:** For any node, the balance factor must be -1, 0, or +1.
- **Rotations:** To maintain balance during insertions and deletions, AVL trees utilize rotations (single and double) to rebalance the tree.

    ``` 
         10
        /  \
       5    20
      / \   / \
     2   7 15  25

    Height of the tree: 2
    Balance Factor of node 10: 0
    Balanced: Yes
    ```

## Types of Rotations
1. **Single Right Rotation (LL Rotation)**: Performed when a left-heavy subtree becomes unbalanced due to an insertion in the left child.
   
   ![LL Rotation](https://images.javatpoint.com/ds/images/avl-tree2.jpg)

2. **Single Left Rotation (RR Rotation)**: Performed when a right-heavy subtree becomes unbalanced due to an insertion in the right child.
   
   ![RR Rotation](https://media.geeksforgeeks.org/wp-content/uploads/20221229131815/avl11-(1)-768.png)

3. **Left-Right Rotation (LR Rotation)**: Performed when a left-heavy subtree becomes unbalanced due to an insertion in the right child of the left child.
   
   ![LR Rotation](https://media.geeksforgeeks.org/wp-content/uploads/20221229131629/avl33-(1)-768.png)

4. **Right-Left Rotation (RL Rotation)**: Performed when a right-heavy subtree becomes unbalanced due to an insertion in the left child of the right child.
   
   ![RL Rotation](https://media.geeksforgeeks.org/wp-content/uploads/20221229131517/avl44-(1)-768.png)

## Operations on AVL Trees

### 1. Insertion
To insert a new value into an AVL tree:
- Insert it like a regular BST.
- After insertion, update the heights and balance factors of nodes along the path back to the root.
- Perform rotations as necessary to maintain the AVL balance property.

#### Code Example (C++)

```cpp
Node* insert(Node* root, int key) {
    // Regular BST insertion
    if (root == nullptr) {
        return new Node(key);
    }
    
    if (key < root->data) {
        root->left = insert(root->left, key);
    } else if (key > root->data) {
        root->right = insert(root->right, key);
    } else {
        return root; // Duplicate keys not allowed
    }
    
    // Update height and balance factor
    updateHeight(root);
    
    // Perform rotations to balance the tree
    return balance(root);
}
```

### 2. Searching
Searching in an AVL tree is similar to searching in a standard BST due to its structure:
1. Start at the root node.
2. Compare the target value with the root node:
   - If equal, return the node.
   - If less, search the left subtree.
   - If greater, search the right subtree.
3. If the target value is not found, return `false`.

### C++ Implementation

```cpp
bool search(Node* root, int key) {
    if (root == nullptr) return false;
    
    if (root->data == key) return true;
    
    if (key < root->data) return search(root->left, key);
    
    return search(root->right, key);
}
```

### 3. Deletion
Deletion in an AVL tree also follows the binary search tree rules but requires additional steps to maintain balance:
- Delete the node as you would in a BST.
- Update the heights and balance factors.
- Perform rotations if necessary.

### Case 1: Deleting a Leaf Node
Simply remove the node.

### Case 2: Deleting a Node with One Child
Replace the node with its child.

### Case 3: Deleting a Node with Two Children
Find the inorder predecessor or successor and replace the node, then delete the predecessor or successor.

#### Implementation:
```cpp
Node* deleteNode(Node* root, int key) {
    if (root == nullptr) return nullptr;

    if (key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node with only one child or no child
        if ((root->left == nullptr) || (root->right == nullptr)) {
            Node* temp = root->left ? root->left : root->right;
            delete root;
            return temp;
        }
        
        // Node with two children: Get the inorder successor
        Node* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    
    // Update height and balance
    updateHeight(root);
    return balance(root);
}
```

## Advantages and Disadvantages
### Advantages:
- Ensures O(log n) time complexity for search, insertion, and deletion due to strict balancing.
- Self-balancing eliminates the possibility of degradation into a linked list structure.

### Disadvantages:
- More complex to implement compared to standard binary search trees.
- Additional memory required for storing height information and more rotations may increase overhead.

## Applications of AVL Trees
- **Database Indexing:** Used in databases to maintain sorted data for efficient retrieval.
- **Memory Management:** Employed in dynamic memory allocation algorithms.
- **Auto-complete Systems:** Utilized in applications that require efficient prefix searches.
- **Routing Algorithms:** Applied in network routing protocols where balanced trees improve efficiency.

AVL trees are a powerful data structure that combines the advantages of binary search trees with the need for balance, ensuring efficient operations across various applications.