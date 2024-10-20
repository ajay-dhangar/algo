---
id: segregate-even-odd-nodes
title: "Segregate even and odd nodes in a linked list"
sidebar_label: "Segregate"
sidebar_position: 8
description: "In a linked list, the goal is to rearrange the nodes such that all even-valued nodes appear before all odd-valued nodes.  "
tags: [linked list]
---



# Segregate Even and Odd Nodes in a Linked List

## Problem Description

In a linked list, the goal is to rearrange the nodes such that all even-valued nodes appear before all odd-valued nodes. The relative order of the even and odd nodes should remain the same as in the original list. For example, given the linked list `1 -> 2 -> 3 -> 4 -> 5`, the output should be `2 -> 4 -> 1 -> 3 -> 5`.

## Approach

To segregate even and odd nodes, we can use the following approach:

1. **Initialize Pointers**:
   - Use two pointers to keep track of the even and odd nodes separately: `evenHead` and `oddHead`.
   - Create two additional pointers to build the segregated list: `evenTail` and `oddTail`.

2. **Traverse the List**:
   - Iterate through the linked list and for each node:
     - If the node's value is even, append it to the even list.
     - If the node's value is odd, append it to the odd list.

3. **Combine the Lists**:
   - After traversing the list, connect the end of the even list to the head of the odd list.

4. **Handle Edge Cases**:
   - If the even list is empty, return the head of the odd list.
   - If the odd list is empty, return the head of the even list.

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

    // Function to segregate even and odd nodes
    public Node segregateEvenOdd() {
        if (head == null) return null;

        Node evenHead = null, oddHead = null;
        Node evenTail = null, oddTail = null;

        Node current = head;

        while (current != null) {
            if (current.value % 2 == 0) {
                // Append to even list
                if (evenHead == null) {
                    evenHead = current;
                    evenTail = evenHead;
                } else {
                    evenTail.next = current;
                    evenTail = evenTail.next;
                }
            } else {
                // Append to odd list
                if (oddHead == null) {
                    oddHead = current;
                    oddTail = oddHead;
                } else {
                    oddTail.next = current;
                    oddTail = oddTail.next;
                }
            }
            current = current.next;
        }

        // Combine even and odd lists
        if (evenTail != null) {
            evenTail.next = oddHead;
        }
        
        if (oddTail != null) {
            oddTail.next = null; // End the odd list
        }

        return evenHead != null ? evenHead : oddHead; // Return the head of the combined list
    }

    // Function to add a new node at the end of the list
    public void a





```
## C++

```cpp
#include <iostream>

class Node {
public:
    int value;
    Node* next;

    Node(int val) : value(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;

    LinkedList() : head(nullptr) {}

    // Function to segregate even and odd nodes
    Node* segregateEvenOdd() {
        if (!head) return nullptr;

        Node* evenHead = nullptr;
        Node* oddHead = nullptr;
        Node* evenTail = nullptr;
        Node* oddTail = nullptr;

        Node* current = head;

        while (current) {
            if (current->value % 2 == 0) {
                // Append to even list
                if (!evenHead) {
                    evenHead = current;
                    evenTail = evenHead;
                } else {
                    evenTail->next = current;
                    evenTail = evenTail->next;
                }
            } else {
                // Append to odd list
                if (!oddHead) {
                    oddHead = current;
                    oddTail = oddHead;
                } else {
                    oddTail->next = current;
                    oddTail = oddTail->next;
                }
            }
            current = current->next;
        }

        // Combine even and odd lists
        if (evenTail) {
            evenTail->next = oddHead;
        }
        
        if (oddTail) {
            oddTail->next = nullptr; // End the odd list
        }

        return evenHead ? evenHead : oddHead; // Return the head of the combined list
    }

    // Function to add a new node at the end of the list
    void append(int value) {
        Node* newNode = new Node(value);
        if (!head) {
            head = newNode;
            return;
        }

        Node* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }

    // Function to print the linked list
    void printList() {
        Node* current = head;
        while (current) {
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

    std::cout << "Original list: ";
    ll.printList();

    ll.head = ll.segregateEvenOdd();

    std::cout << "Segregated list: ";
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

    def segregate_even_odd(self):
        if self.head is None:
            return None

        even_head = even_tail = None
        odd_head = odd_tail = None

        current = self.head

        while current:
            if current.value % 2 == 0:
                # Append to even list
                if even_head is None:
                    even_head = even_tail = current
                else:
                    even_tail.next = current
                    even_tail = even_tail.next
            else:
                # Append to odd list
                if odd_head is None:
                    odd_head = odd_tail = current
                else:
                    odd_tail.next = current
                    odd_tail = odd_tail.next
            current = current.next

        # Combine even and odd lists
        if even_tail:
            eve
```
