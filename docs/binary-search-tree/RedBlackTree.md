---
id: rbt-intro
sidebar_position: 17
title: Red-Black Trees
sidebar_label: Red-Black Trees
description: "In this blog post, we'll dive into Red-Black Trees, a self-balancing binary search tree known for efficient operations, widely used in real-world applications like Linux kernel and Java's TreeMap."
tags: [dsa, data structures, red black tree]
---

## Introduction
A **Red-Black Tree** is a self-balancing binary search tree where each node has an additional attribute: a color, which can be either red or black. The primary objective of these trees is to maintain balance during insertions and deletions, ensuring efficient data retrieval and manipulation.

## Definition and Structure
A Red-Black Tree consists of nodes that follow a set of rules:
- **Color**: Each node is either red or black.
- **Data**: The value stored in the node.
- **Left Child**: Reference to the left subtree (smaller values).
- **Right Child**: Reference to the right subtree (larger values).
- **Parent**: Reference to the parent node.
- **Root is always black**: The root node is black, ensuring a stable structure.

## Properties of Red-Black Trees
A Red-Black Tree have the following properties:
- **Node Color:** Each node is either red or black.
- **Root Property:** The root of the tree is always black.
- **Red Property:** Red nodes cannot have red children (no two consecutive red nodes on any path).
- **Black Property:** Every path from a node to its descendant null nodes (leaves) has the same number of black nodes.
- **Leaf Property:** All leaves (NIL nodes) are black.

These properties ensure that the longest path from the root to any leaf is no more than twice as long as the shortest path, maintaining the tree’s balance and efficient performance.

## Rules for constructing Red-Black Tree:
- The black height of the red-black tree is the number of black nodes on a path from the root node to a leaf node. 
- Leaf nodes are also counted as black nodes. So, a red-black tree of height h has black height &gt= h/2.
- Height of a red-black tree with n nodes is h &lt= 2 log2(n + 1).
- All leaves (NIL) are black.
- The black depth of a node is defined as the number of black nodes from the root to that node i.e the number of black ancestors.

## Correct Red-Black Tree:
```
    10B
   /   \
  5R    20B
 / \    /  \
2B  8B 15R 25B
```
**Explanation:**
- **Property 1** (Every node is either red or black): Satisfied as all nodes are either red (R) or black (B).
- **Property 2** (The root is always black): The root node 10 is black.
- **Property 3** (Red nodes cannot have red children): No two consecutive red nodes exist. Red nodes 5 and 15 have only black children.
- **Property 4** (Every path from a node to its descendants has the same number of black nodes): All paths from root to leaves contain an equal number of black nodes (e.g., path 10 -> 5 -> 2 and path 10 -> 20 -> 25 both have 2 black nodes).

## Incorrect Red-Black Tree:
```
    10R
   /   \
  5R    20B
 / \    /  \
2B  8B 15R 25R

```
**Explanation:**
- **Property 1:** Satisfied as all nodes are either red or black.
- **Property 2:** Violated since the root node 10 is red, but it should be black.
- **Property 3:** Violated due to two consecutive red nodes (10 and 5).
- **Property 4:** Satisfied, as the black heights are consistent on both paths.

## Basic Operations on Red-Black Tree:
The basic operations on a Red-Black Tree include:

- Insertion
- Search
- Deletion
- Rotation

**1. Insertion**
Inserting a new node in a Red-Black Tree involves a two-step process: performing a standard binary search tree (BST) insertion, followed by fixing any violations of Red-Black properties.

***Insertion Steps***
- BST Insert: Insert the new node like in a standard BST.
- Fix Violations:
    - If the parent of the new node is black, no properties are violated.
    - If the parent is red, the tree might violate the Red Property, requiring fixes.
- Fixing Violations During Insertion
    - After inserting the new node as a red node, we might encounter several cases depending on the colors of the node’s parent and uncle (the sibling of the parent):

        - Case 1: Uncle is Red: Recolor the parent and uncle to black, and the grandparent to red. Then move up the tree to check for further violations.
        - Case 2: Uncle is Black:
            - Sub-case 2.1: Node is a right child: Perform a left rotation on the parent.
            - Sub-case 2.2: Node is a left child: Perform a right rotation on the grandparent and recolor appropriately.

**2. Searching**
Searching for a node in a Red-Black Tree is similar to searching in a standard Binary Search Tree (BST). The search operation follows a straightforward path from the root to a leaf, comparing the target value with the current node’s value and moving left or right accordingly.

***Search Steps***
- Start at the Root: Begin the search at the root node.
- Traverse the Tree:
    - If the target value is equal to the current node’s value, the node is found.
    - If the target value is less than the current node’s value, move to the left child.
    - If the target value is greater than the current node’s value, move to the right child.
- Repeat: Continue this process until the target value is found or a NIL node is reached (indicating the value is not present in the tree).

**3. Deletion**
Deleting a node from a Red-Black Tree also involves a two-step process: performing the BST deletion, followed by fixing any violations that arise.

***Deletion Steps***
- BST Deletion: Remove the node using standard BST rules.
- Fix Double Black:
    - If a black node is deleted, a “double black” condition might arise, which requires specific fixes.
- Fixing Violations During Deletion
    - When a black node is deleted, we handle the double black issue based on the sibling’s color and the colors of its children:

        - Case 1: Sibling is Red: Rotate the parent and recolor the sibling and parent.
        - Case 2: Sibling is Black:
            - Sub-case 2.1: Sibling’s children are black: Recolor the sibling and propagate the double black upwards.
            - Sub-case 2.2: At least one of the sibling’s children is red:
            1. If the sibling’s far child is red: Perform a rotation on the parent and sibling, and recolor appropriately.
            2. If the sibling’s near child is red: Rotate the sibling and its child, then handle as above.
            3. If both children are black: Recolor the sibling and propagate the double black upwards

**4. Rotation**
Rotations are fundamental operations in maintaining the balanced structure of a Red-Black Tree (RBT). They help to preserve the properties of the tree, ensuring that the longest path from the root to any leaf is no more than twice the length of the shortest path. Rotations come in two types: left rotations and right rotations.

***1. Left Rotation***
- A left rotation at node 𝑥x moves 𝑥x down to the left and its right child 𝑦y up to take 𝑥x’s place.
- Before Rotation:
``` 
    x
     \
      y
     / \
    a   b
``` 
- After Left Rotation:
``` 
      y
     / \
    x   b
     \
      a
``` 
- Left Rotation Steps:
    1. Set y to be the right child of x.
    2. Move y’s left subtree to x’s right subtree.
    3. Update the parent of x and y.
    4. Update x’s parent to point to y instead of x.
    5. Set y’s left child to x.
    6. Update x’s parent to y.
```cpp
Pseudocode of Left Rotation:

// Utility function to perform left rotation
void leftRotate(Node* x)
{
    Node* y = x->right;
    x->right = y->left;
    if (y->left != NIL) {
        y->left->parent = x;
    }
    y->parent = x->parent;
    if (x->parent == nullptr) {
        root = y;
    }
    else if (x == x->parent->left) {
        x->parent->left = y;
    }
    else {
        x->parent->right = y;
    }
    y->left = x;
    x->parent = y;
}
``` 
***2. Right Rotation***
- A right rotation at node 𝑥x moves 𝑥x down to the right and its left child 𝑦y up to take 𝑥x’s place.
- Before Right Rotation:
```
      x
     /
    y
   / \
  a   b
```
- After Right Rotation:
```
    y
   / \
  a   x
     /
    b
```
- Right Rotation Steps:
    1. Set y to be the left child of x.
    2. Move y’s right subtree to x’s left subtree.
    3. Update the parent of x and y.
    4. Update x’s parent to point to y instead of x.
    5. Set y’s right child to x.
    6. Update x’s parent to y.
```cpp
Pseudocode of Right Rotation:

// Utility function to perform right rotation
void rightRotate(Node* x)
{
    Node* y = x->left;
    x->left = y->right;
    if (y->right != NIL) {
        y->right->parent = x;
    }
    y->parent = x->parent;
    if (x->parent == nullptr) {
        root = y;
    }
    else if (x == x->parent->right) {
        x->parent->right = y;
    }
    else {
        x->parent->left = y;
    }
    y->right = x;
    x->parent = y;
}
```

## Advantages of Red-Black Trees:

- **Balanced**: Red-Black Trees are self-balancing, meaning they automatically maintain a balance between the heights of the left and right subtrees. This ensures that search, insertion, and deletion operations take O(log n) time in the worst case.
- **Efficient search, insertion, and deletion**: Due to their balanced structure, Red-Black Trees offer efficient operations. Search, insertion, and deletion all take O(log n) time in the worst case.
- **Simple to implement**: The rules for maintaining the Red-Black Tree properties are relatively simple and straightforward to implement.
- **Widely used**: Red-Black Trees are a popular choice for implementing various data structures, such as maps, sets, and priority queues.

## Disadvantages of Red-Black Trees:

- **More complex than other balanced trees**: Compared to simpler balanced trees like AVL trees, Red-Black Trees have more complex insertion and deletion rules.
- **Constant overhead**: Maintaining the Red-Black Tree properties adds a small overhead to every insertion and deletion operation.
- **Not optimal for all use cases**: While efficient for most operations, Red-Black Trees might not be the best choice for applications where frequent insertions and deletions are required, as the constant overhead can become significant.

## Applications of Red-Black Trees:

- **Implementing maps and sets**: Red-Black Trees are often used to implement maps and sets, where efficient search, insertion, and deletion are crucial.
- **Priority queues**: Red-Black Trees can be used to implement priority queues, where elements are ordered based on their priority.
- **File systems**: Red-Black Trees are used in some file systems to manage file and directory structures.
- **In-memory databases**: Red-Black Trees are sometimes used in in-memory databases to store and retrieve data efficiently.
- **Graphics and game development**: Red-Black Trees can be used in graphics and game development for tasks like collision detection and pathfinding.

Red-Black Trees provide an efficient way to maintain balance in binary search trees, ensuring that operations like insertion, deletion, and searching can be performed in logarithmic time. Their unique properties and the need for rotation operations make them an essential data structure in computer science.

By understanding the mechanisms of Red-Black Trees, including their properties, operations, and the importance of balancing, you can effectively utilize this data structure in various applications, ensuring optimized performance in scenarios requiring frequent data manipulation.