---
id: clone-linked-list-with-random-and-next-pointer
title: "Cloning a Linked List with Random and Next Pointers"
sidebar_label: "clone linked list"
sidebar_position: 16
description: "Cloning a linked list that contains both next and random pointers involves creating a new linked list that is an exact copy of the original, preserving the structure and relationships of the nodes."
tags: [linked list,clone]
---

# Cloning a Linked List with Random and Next Pointers

## Introduction

Cloning a linked list that contains random pointers can be complex. Each node in the list has two pointers:
- **Next Pointer**: Points to the next node in the list.
- **Random Pointer**: Points to any node in the list or null.

This guide will walk you through the steps to create a deep copy of such a linked list.

Here are the detailed steps to clone a linked list with random and next pointers:

### Step 1: Define the Node Structure
First, define the structure of the linked list node, which includes the value, next, and random pointers.

### Step 2: Clone Nodes and Insert Them
Iterate Through the Original List: For each node, create a copy and insert it right after the original node.

### Step 3: Set Random Pointers
Set Random Pointers: For each original node, set the random pointer of the cloned node to the cloned version of the node pointed to by the original node's random pointer.

### Step 4: Separate the Lists
Restore the Original List and Extract the Cloned List: Iterate through the modified list to separate the original and cloned nodes.

### Step 5: Combine Steps into a Single Function

## Implementation

## Java

```java
class Node {
    int value;
    Node next;
    Node random;

    public Node(int value) {
        this.value = value;
        this.next = null;
        this.random = null;
    }
}

public class CloneLinkedList {
    
    // Step 1: Clone Nodes and Insert Them
    public void cloneWithNextPointer(Node head) {
        Node current = head;
        while (current != null) {
            Node cloneNode = new Node(current.value);
            cloneNode.next = current.next;
            current.next = cloneNode;
            current = cloneNode.next;
        }
    }

    // Step 2: Set Random Pointers
    public void setRandomPointers(Node head) {
        Node current = head;
        while (current != null) {
            if (current.random != null) {
                current.next.random = current.random.next;
            }
            current = current.next.next;
        }
    }

    // Step 3: Separate the Lists
    public Node separateLists(Node head) {
        if (head == null) return null;

        Node original = head;
        Node cloneHead = head.next;
        Node cloneCurrent = cloneHead;

        while (original != null && cloneCurrent != null) {
            original.next = cloneCurrent.next;
            original = original.next;
            cloneCurrent.next = (original != null) ? original.next : null;
            cloneCurrent = cloneCurrent.next;
        }

        return cloneHead;
    }

    // Main function to clone the linked list
    public Node cloneLinkedList(Node head) {
        if (head == null) return null;

        cloneWithNextPointer(head);
        setRandomPointers(head);
        return separateLists(head);
    }

    // Function to print the linked list for verification
    public void printList(Node head) {
        Node current = head;
        while (current != null) {
            int randomValue = (current.random != null) ? current.random.value : -1;
            System.out.println("Node value: " + current.value + ", Random points to: " + randomValue);
            current = current.next;
        }
    }

    // Example usage
    public static void main(String[] args) {
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);

        node1.next = node2;
        node2.next = node3;
        node1.random = node3;  // node1's random points to node3
        node2.random = node1;  // node2's random points to node1
        node3.random = node2;  // node3's random points to node2

        CloneLinkedList cloner = new CloneLinkedList();
        Node clonedHead = cloner.cloneLinkedList(node1);

        System.out.println("Original List:");
        cloner.printList(node1);
        System.out.println("\nCloned List:");
        cloner.printList(clonedHead);
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
    Node* random;

    Node(int val) : value(val), next(nullptr), random(nullptr) {}
};

class CloneLinkedList {
public:
    // Step 1: Clone Nodes and Insert Them
    void cloneWithNextPointer(Node* head) {
        Node* current = head;
        while (current != nullptr) {
            Node* cloneNode = new Node(current->value);
            cloneNode->next = current->next;
            current->next = cloneNode;
            current = cloneNode->next;
        }
    }

    // Step 2: Set Random Pointers
    void setRandomPointers(Node* head) {
        Node* current = head;
        while (current != nullptr) {
            if (current->random != nullptr) {
                current->next->random = current->random->next;
            }
            current = current->next->next;
        }
    }

    // Step 3: Separate the Lists
    Node* separateLists(Node* head) {
        if (head == nullptr) return nullptr;

        Node* original = head;
        Node* cloneHead = head->next;
        Node* cloneCurrent = cloneHead;

        while (original != nullptr && cloneCurrent != nullptr) {
            original->next = cloneCurrent->next;
            original = original->next;
            cloneCurrent->next = (original != nullptr) ? original->next : nullptr;
            cloneCurrent = cloneCurrent->next;
        }

        return cloneHead;
    }

    // Main function to clone the linked list
    Node* cloneLinkedList(Node* head) {
        if (head == nullptr) return nullptr;

        cloneWithNextPointer(head);
        setRandomPointers(head);
        return separateLists(head);
    }

    // Function to print the linked list for verification
    void printList(Node* head) {
        Node* current = head;
        while (current != nullptr) {
            int randomValue = (current->random != nullptr) ? current->random->value : -1;
            std::cout << "Node value: " << current->value << ", Random points to: " << randomValue << std::endl;
            current = current->next;
        }
    }
};

// Example usage
int main() {
    Node* node1 = new Node(1);
    Node* node2 = new Node(2);
    Node* node3 = new Node(3);

    node1->next = node2;
    node2->next = node3;
    node1->random = node3;  // node1's random points to node3
    node2->random = node1;  // node2's random points to node1
    node3->random = node2;  // node3's random points to node2

    CloneLinkedList cloner;
    Node* clonedHead = cloner.cloneLinkedList(node1);

    std::cout << "Original List:" << std::endl;
    cloner.printList(node1);
    std::cout << "\nCloned List:" << std::endl;
    cloner.printList(clonedHead);

    // Clean up memory (optional)
    // Note: In a real application, you'd want to properly delete the nodes
    // to avoid memory leaks.

    return 0;
}

```
## Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.random = None

class CloneLinkedList:
    # Step 1: Clone Nodes and Insert Them
    def clone_with_next_pointer(self, head):
        current = head
        while current:
            clone_node = Node(current.value)
            clone_node.next = current.next
            current.next = clone_node
            current = clone_node.next

    # Step 2: Set Random Pointers
    def set_random_pointers(self, head):
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next

    # Step 3: Separate the Lists
    def separate_lists(self, head):
        if not head:
            return None

        original = head
        clone_head = head.next
        clone_current = clone_head

        while original and clone_current:
            original.next = clone_current.next
            original = original.next
            clone_current.next = original.next if original else None
            clone_current = clone_current.next

        return clone_head

    # Main function to clone the linked list
    def clone_linked_list(self, head):
        if not head:
            return None

        self.clone_with_next_pointer(head)
        self.set_random_pointers(head)
        return self.separate_lists(head)

    # Function to print the linked list for verification
    def print_list(self, head):
        current = head
        while current:
            random_val = current.random.value if current.random else None
            print(f"Node value: {current.value}, Random points to: {random_val}")
            current = current.next

# Example usage
if __name__ == "__main__":
    # Creating nodes
    node1 = Node(1)
    node2 = Node(2)
    node3 = Node(3)

    # Establishing next and random pointers
    node1.next = node2
    node2.next = node3
    node1.random = node3  # node1's random points to node3
    node2.random = node1  # node2's random points to node1
    node3.random = node2  # node3's random points to node2

    cloner = CloneLinkedList()
    cloned_head = cloner.clone_linked_list(node1)

    print("Original List:")
    cloner.print_list(node1)
    print("\nCloned List:")
    cloner.print_list(cloned_head)

```


