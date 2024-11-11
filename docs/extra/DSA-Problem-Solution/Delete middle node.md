---
id: delete-middle-node-of-a-linked-list
title: "Deleting middle node of linked list."
sidebar_label: "Deleting middle node of linked list."
sidebar_position: 9
description: " This document explains the 'Deleting the middle element of a linked list' problem, including its description, approach, and implementation."
tags: [DSA,problem-solving,linked list]
---

# Delete the Middle Node of a Linked List

## Problem Description

Given a singly linked list, the task is to delete the middle node. If the list has an even number of nodes, delete the second middle node. For example, given the linked list `1 -> 2 -> 3 -> 4 -> 5`, after deletion, it should become `1 -> 2 -> 4 -> 5`. If the list is `1 -> 2 -> 3 -> 4`, it should become `1 -> 2 -> 4`.

## Approach

To delete the middle node of a linked list, we can use the following approach:

1. **Find the Length of the List**:
   - Traverse the list to count the total number of nodes.

2. **Determine the Middle Index**:
   - Calculate the middle index based on whether the length is even or odd.

3. **Traverse to the Node Before the Middle**:
   - Move through the list until reaching the node just before the middle node.

4. **Delete the Middle Node**:
   - Adjust the pointers to bypass the middle node, effectively removing it from the list.

## Implementation

## Java
```java
class Node {
    int value;
    Node next;

    Node(int val) {
        this.value = val;
        this.next = null;
    }
}

class LinkedList {
    Node head;

    // Function to delete the middle node
    public void deleteMiddle() {
        if (head == null) return; // If the list is empty

        // Step 1: Find the length of the list
        int length = 0;
        Node current = head;
        while (current != null) {
            length++;
            current = current.next;
        }

        // Step 2: Determine the middle index
        int middleIndex = length / 2;

        // Step 3: Traverse to the node before the middle
        current = head;
        for (int i = 0; i < middleIndex - 1; i++) {
            current = current.next;
        }

        // Step 4: Delete the middle node
        if (current.next != null) {
            current.next = current.next.next; // Bypass the middle node
        } else {
            // If the list has only one node
            head = null;
        }
    }

    // Function to add a new node at the end of the list
    public void append(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            return;
        }

        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Function to print the linked list
    public void printList() {
        Node current = head;
        while (current != null) {
            System.out.print(current.value + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}

// Example usage
public class Main {
    public static void main(String[] args) {
        LinkedList ll = new LinkedList();
        ll.append(1);
        ll.append(2);
        ll.append(3);
        ll.append(4);
        ll.append(5);

        System.out.print("Original Linked List: ");
        ll.printList();

        ll.deleteMiddle();

        System.out.print("Linked List After Deleting Middle Node: ");
        ll.printList();
    }
}


```

## C++

```cpp

#include <iostream>

class Node {
public:
    int value;
    Node* next;

    Node(int val) {
        value = val;
        next = nullptr;
    }
};

class LinkedList {
public:
    Node* head;

    LinkedList() {
        head = nullptr;
    }

    // Function to delete the middle node
    void deleteMiddle() {
        if (head == nullptr) return; // If the list is empty

        // Step 1: Find the length of the list
        int length = 0;
        Node* current = head;
        while (current != nullptr) {
            length++;
            current = current->next;
        }

        // Step 2: Determine the middle index
        int middleIndex = length / 2;

        // Step 3: Traverse to the node before the middle
        current = head;
        for (int i = 0; i < middleIndex - 1; i++) {
            current = current->next;
        }

        // Step 4: Delete the middle node
        if (current->next != nullptr) {
            current->next = current->next->next; // Bypass the middle node
        } else {
            // If the list has only one node
            head = nullptr;
        }
    }

    // Function to add a new node at the end of the list
    void append(int value) {
        Node* newNode = new Node(value);
        if (head == nullptr) {
            head = newNode;
            return;
        }

        Node* current = head;
        while (current->next != nullptr) {
            current = current->next;
        }
        current->next = newNode;
    }

    // Function to print the linked list
    void printList() {
        Node* current = head;
        while (current != nullptr) {
            std::cout << current->value << " -> ";
            current = current->next;
        }
        std::cout << "nullptr" << std::endl;
    }
};

// Example usage
int main() {
    LinkedList ll;
    ll.append(1);
    ll.append(2);
    ll.append(3);
    ll.append(4);
    ll.append(5);

    std::cout << "Original Linked List: ";
    ll.printList();

    ll.deleteMiddle();

    std::cout << "Linked List After Deleting Middle Node: ";
    ll.printList();

    return 0;
}

```

## Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def delete_middle(self):
        if not self.head:
            return
        
        # Step 1: Find the length of the list
        length = 0
        current = self.head
        while current:
            length += 1
            current = current.next

        # Step 2: Determine the middle index
        middle_index = length // 2

        # Step 3: Traverse to the node before the middle
        current = self.head
        for _ in range(middle_index - 1):
            current = current.next

        # Step 4: Delete the middle node
        if current.next:  # If there is a middle node to delete
            current.next = current.next.next

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return

        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def print_list(self):
        current = self.head
        while current:
            print(current.value, end=" -> ")
            current = current.next
        print("None")

# Example usage
if __name__ == "__main__":
    ll = LinkedList()
    ll.append(1)
    ll.append(2)
    ll.append(3)
    ll.append(4)
    ll.append(5)

    print("Original Linked List: ")
    ll.print_list()

    ll.delete_middle()

    print("Linked List After Deleting Middle Node: ")
    ll.print_list()
```