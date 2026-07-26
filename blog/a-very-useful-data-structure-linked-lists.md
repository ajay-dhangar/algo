---
slug: a-very-useful-data-structure-linked-lists
title: A Very Useful Data Structure - Linked Lists
authors: [Aryan-Jain]
tags: [linked-list, data-structures, algorithms, C++, java, python]
---

A linked list is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element, or node, contains data and a pointer to the next node in the sequence. This structure offers flexibility and dynamic memory allocation, making it a powerful tool for various programming tasks.

<!-- truncate -->

In this blog, we'll explore:

- **Dynamic Size**: How linked lists can grow or shrink dynamically as needed.
- **Efficiency**: The benefits of insertion and deletion operations.
- **Flexibility**: Representing different data structures.

---

## Why Use Linked Lists?

* **Dynamic Size:** Linked lists can grow or shrink dynamically as needed, unlike arrays which have a fixed size.
* **Efficient Insertion and Deletion:** Inserting or deleting elements in a linked list is efficient, especially when operations are performed at the beginning or end of the list.
* **Flexibility:** Linked lists can represent various data structures, such as stacks, queues, and trees.
* **Memory Efficient:** Linked lists can be more memory efficient than arrays in certain scenarios, as they don't require contiguous memory allocation.

## Types of Linked Lists

1. **Singly Linked List:** Each node points to the next node.
2. **Doubly Linked List:** Each node points to both the next and previous nodes.
3. **Circular Linked List:** The last node points back to the first node, forming a circular structure.

## Common Operations on Linked Lists

* **Traversal:** Iterating through the list to access each node.
* **Insertion:** Adding a new node at a specific position.
* **Deletion:** Removing a node from a specific position.
* **Searching:** Finding a node with a specific value.
* **Reversal:** Reversing the order of nodes in the list.

## Real-world Applications

* Implementing data structures like stacks and queues
* Managing dynamic memory
* Creating undo/redo functionality in software
* Implementing music players and video players
* Implementing hash tables

## C Code Examples

### Singly Linked List

```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Function to create a new node
struct Node* newNode(int data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = data;
    new_node->next = NULL;
    return new_node;
}

// Function to insert a new node at the beginning
void insertAtBeginning(struct Node** head_ref, int new_data) {
    struct Node* new_node = newNode(new_data);
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}

// Function to print the linked list
void printList(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

int main() {
    struct Node* head = NULL;

    insertAtBeginning(&head, 3);
    insertAtBeginning(&head, 2);
    insertAtBeginning(&head, 1);

    printList(head);

    return 0;
}
```
