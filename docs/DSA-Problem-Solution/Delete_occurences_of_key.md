---
id: delete-all-occurences-of-key
title: "Deleting All Occurrences of a Key in a Doubly Linked List"
sidebar_label: "Deleting All Occurrences of a Key in a Doubly Linked List
sidebar_position: 12
description: "This document provides a detailed explanation and implementation for deleting all occurrences of a key in a doubly linked list , including step-by-step instructions and example code."
tags: [Linked list,Deletion]
---


# Deleting All Occurrences of a Key in a Doubly Linked List (DLL)

## Introduction

A Doubly Linked List (DLL) is a data structure consisting of nodes, where each node contains three components: 
- A data field
- A pointer to the next node
- A pointer to the previous node.

This structure allows traversal in both directions and efficient insertion and deletion operations.

## Problem Statement

Given a DLL and a key, the task is to delete all nodes that contain the specified key. 

### Example

*Input:*
```
DLL: 10 <-> 20 <-> 30 <-> 20 <-> 40 Key: 20
```

*Output:*
```
DLL: 10 <-> 30 <-> 40
```


## Approach

1. *Initialize Pointers*: Start with a pointer at the head of the list.
2. *Traverse the DLL*: Loop through the list and check each node's data against the key.
3. *Delete Nodes*:
   - If a node's data matches the key:
     - Adjust the pointers of the previous and next nodes.
     - If the node is the head, update the head pointer.
     - Move to the next node after deletion.
4. *Continue Traversal*: Keep traversing until the end of the list.

## Implementation
## Java Code Implementation
```java
class Node {
    int data;
    Node next;
    Node prev;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    Node head;

    // Method to append a node at the end of the list
    public void append(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node last = head;
        while (last.next != null) {
            last = last.next;
        }
        last.next = newNode;
        newNode.prev = last;
    }

    // Method to delete all occurrences of a key
    public void deleteAllOccurrences(int key) {
        Node current = head;

        while (current != null) {
            if (current.data == key) {
                // Node to be deleted
                if (current.prev != null) {
                    current.prev.next = current.next;
                }
                if (current.next != null) {
                    current.next.prev = current.prev;
                }
                if (current == head) { // Move head if needed
                    head = current.next;
                }
                // Move to next node
                Node temp = current;
                current = current.next;
                temp = null; // Free the deleted node
            } else {
                current = current.next;
            }
        }
    }

    // Method to display the list
    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " <-> ");
            current = current.next;
        }
        System.out.println("null");
    }
}

// Example Usage
public class Main {
    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.append(10);
        dll.append(20);
        dll.append(30);
        dll.append(20);
        dll.append(40);

        System.out.println("Original DLL:");
        dll.display();

        dll.deleteAllOccurrences(20);

        System.out.println("DLL after deleting 20:");
        dll.display();
    }
}
```


## C++ Code Implementation

```cpp
#include <iostream>

class Node {
public:
    int data;
    Node* next;
    Node* prev;

    Node(int data) {
        this->data = data;
        this->next = nullptr;
        this->prev = nullptr;
    }
};

class DoublyLinkedList {
public:
    Node* head;

    DoublyLinkedList() {
        head = nullptr;
    }

    // Method to append a node at the end of the list
    void append(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* last = head;
        while (last->next != nullptr) {
            last = last->next;
        }
        last->next = newNode;
        newNode->prev = last;
    }

    // Method to delete all occurrences of a key
    void deleteAllOccurrences(int key) {
        Node* current = head;

        while (current != nullptr) {
            if (current->data == key) {
                // Node to be deleted
                if (current->prev != nullptr) {
                    current->prev->next = current->next;
                }
                if (current->next != nullptr) {
                    current->next->prev = current->prev;
                }
                if (current == head) { // Move hea
```


## Python Code Implementation
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node
        new_node.prev = last

    def delete_all_occurrences(self, key):
        current = self.head
        while current:
            if current.data == key:
                # Node to be deleted
                if current.prev:
                    current.prev.next = current.next
                if current.next:
                    current.next.prev = current.prev
                if current == self.head:  # Move head if needed
                    self.head = current.next
                # Move to next node
                temp = current
                current = current.next
                del temp  # Free the deleted node
            else:
                current = current.next

    def display(self):
        current = self.head
        while current:
            print(current.data, end=' <-> ')
            current = current.next
        print('None')

# Example Usage
dll = DoublyLinkedList()
dll.append(10)
dll.append(20)
dll.append(30)
dll.append(20)
dll.append(40)

print("Original DLL:")
dll.display()

dll.delete_all_occurrences(20)

print("DLL after deleting 20:")
dll.display()
```