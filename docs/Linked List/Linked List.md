---
id: linked-list-intro
sidebar_position: 11
title: Linked Lists
sidebar_label: Linked Lists
description: "In this blog post, we'll explore linked lists, a linear data structure that enables efficient insertion and deletion operations."
tags: [dsa, data structures, linked lists]
---
## Introduction
Linked lists are a fundamental linear data structure where elements, called nodes, are linked together in a sequence using pointers. Unlike arrays, linked lists allow for efficient insertion and deletion at any position since nodes are not stored contiguously in memory.

## Definition and Structure
A linked list consists of nodes, where each node contains:
- **Data:** The value stored in the node.
- **Next:** A reference to the next node in the sequence (or `null` if there is no next node).

The sequence starts from a node called the **head** and continues until it reaches a node that points to `null`, which marks the end of the list.

## Properties
Key characteristics of linked lists include:
- **Dynamic Size:** Unlike arrays, linked lists can grow and shrink dynamically as nodes are added or removed.
- **Sequential Access:** Accessing elements in a linked list requires traversal from the head, as elements are not indexed like in an array.
  
    ```
    Head -> A -> B -> C -> D -> null
    ```

## Implementation

Let us see how to implement a singly linked list in C++:

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) {
        data = val;
        next = nullptr;
    }
};

void printList(Node* head) {
    Node* temp = head;
    while (temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "null" << endl;
}

int main() {
    Node* head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);
    head->next->next->next = new Node(40);

    // 10 -> 20 -> 30 -> 40 -> null
    printList(head);
    return 0;
}
```

## Types of Linked Lists
1. **Singly Linked Lists:** Each node has a reference to the next node in the sequence.

    Example:
    ```plaintext
    Head -> 10 -> 20 -> 30 -> null
    ```

2. **Doubly Linked Lists:** Each node has two references—one to the next node and one to the previous node.
   
    Example:
    ```plaintext
    Head <-> 10 <-> 20 <-> 30 <-> null
    ```

3. **Circular Linked Lists:** The last node points back to the head, forming a circular structure.
    ```plaintext
    Head -> 10 -> 20 -> 30 --|
           |-----------------|
    ```

4. **Doubly Circular Linked Lists:** Similar to a circular linked list but with both next and previous references.
    ```plaintext
    Head <-> 10 <-> 20 <-> 30 <-> Head
    ```

## Advantages and Disadvantages
### Advantages:

- **Efficient Insertion/Deletion**: Can insert and delete nodes at any position in constant time if the node reference is known.
- **Dynamic Size**: Can easily grow and shrink in size without the need for resizing or memory reallocation like arrays.

### Disadvantages:

- **No Random Access**: Unlike arrays, linked lists do not provide direct access to elements via index, requiring traversal from the head.
- **Memory Overhead**: Each node requires extra memory for storing a pointer to the next node.
- **Slow Lookups**: Finding an element requires linear time (O(n)) as the list must be traversed.

## Applications of Linked Lists
- **Implementation of Stacks and Queues**:
Linked lists are often used to implement dynamic stacks and queues, allowing for efficient memory management.

- **Dynamic Memory Allocation**: Many memory management systems use linked lists to keep track of free and used memory blocks.

- **Adjacency Lists in Graphs**: Linked lists are used to represent adjacency lists in graph data structures, allowing for efficient traversal of nodes.

- **Polynomial Representation**: Linked lists are used to represent polynomials, where each term is stored in a node.

    Example:
    ```
    (5x^2 + 3x + 2) -> 5 -> 3 -> 2 -> null
    ```
- **Browser History (Back and Forward Buttons)**: Doubly linked lists can be used to store a user's navigation history in web browsers, allowing them to move backward and forward seamlessly.