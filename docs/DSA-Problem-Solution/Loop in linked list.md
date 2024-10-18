---
id: loop-in-a-linked-list
title: "Finding loop in a linked list."
sidebar_label: "loop"
sidebar_position: 10
description: "This document includes solution to problem finding loop in a linked list along with approach and implementation."
tags: [Linked list, loop]
---



# Finding a Loop in a Linked List

## Problem Description

In a linked list, a **loop** occurs when a node's next pointer points back to a previous node, creating a cycle. Detecting a loop is crucial, as it can lead to infinite traversals and memory issues. The goal is to determine whether a loop exists in the linked list and, if so, identify the node where the loop begins.

## Approach

One of the most efficient methods for detecting a loop in a linked list is **Floyd's Cycle-Finding Algorithm**, also known as the "Tortoise and Hare" algorithm.

### Steps:

1. **Initialization**: Use two pointers, `slow` and `fast`. The `slow` pointer moves one step at a time, while the `fast` pointer moves two steps at a time.

2. **Traversal**:
   - Start both pointers at the head of the linked list.
   - Move `slow` by one node and `fast` by two nodes in each iteration.
   - If `fast` reaches the end of the list (`null`), there is no loop.
   - If `slow` equals `fast`, a loop exists.

3. **Finding the Start of the Loop**:
   - Once a loop is detected, to find the starting node of the loop:
     - Move one pointer back to the head of the list and keep the other at the meeting point.
     - Move both pointers one step at a time; the node where they meet is the start of the loop.

## Implementation

## Java
```java
class Node {
    int value;
    Node next;

    Node(int value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    Node head;

    // Detect loop using Floyd's Cycle-Finding Algorithm
    public Node detectLoop() {
        Node slow = head;
        Node fast = head;

        // Phase 1: Detect loop
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) { // Loop detected
                break;
            }
        }

        // No loop
        if (fast == null || fast.next == null) {
            return null;
        }

        // Phase 2: Find the start of the loop
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow; // Start of the loop
    }

    // Method to create a loop for testing
    public void createLoop(int loopStartIndex) {
        Node loopStartNode = head;
        Node lastNode = head;
        int index = 0;

        // Find the loop start node
        while (index < loopStartIndex) {
            loopStartNode = loopStartNode.next;
            index++;
        }

        // Find the last node
        while (lastNode.next != null) {
            lastNode = lastNode.next;
        }

        // Create the loop
        lastNode.next = loopStartNode;
    }
}

// Example usage
public class Main {
    public static void main(String[] args) {
        LinkedList ll = new LinkedList();
        ll.head = new Node(1);
        ll.head.next = new Node(2);
        ll.head.next.next = new Node(3);
        ll.head.next.next.next = new Node(4);
        ll.head.createLoop(1); // Creating a loop back to node with value 2

        Node loopStart = ll.detectLoop();
        if (loopStart != null) {
            System.out.println("Loop detected at node with value: " + loopStart.value);
        } else {
            System.out.println("No loop detected.");
        }
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

    Node(int val) : value(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;

    LinkedList() : head(nullptr) {}

    // Detect loop using Floyd's Cycle-Finding Algorithm
    Node* detectLoop() {
        Node* slow = head;
        Node* fast = head;

        // Phase 1: Detect loop
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) { // Loop detected
                break;
            }
        }

        // No loop
        if (fast == nullptr || fast->next == nullptr) {
            return nullptr;
        }

        // Phase 2: Find the start of the loop
        slow = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }

        return slow; // Start of the loop
    }

    // Method to create a loop for testing
    void createLoop(int loopStartIndex) {
        Node* loopStartNode = head;
        Node* lastNode = head;
        int index = 0;

        // Find the loop start node
        while (index < loopStartIndex) {
            loopStartNode = loopStartNode->next;
            index++;
        }

        // Find the last node
        while (lastNode->next != nullptr) {
            lastNode = lastNode->next;
        }

        // Create the loop
        lastNode->next = loopStartNode;
    }
};

// Example usage
int main() {
    LinkedList ll;
    ll.head = new Node(1);
    ll.head->next = new Node(2);
    ll.head->next->next = new Node(3);
    ll.head->next->next->next = new Node(4);
    ll.head->createLoop(1); // Creating a loop back to node with value 2

    Node* loopStart = ll.detectLoop();
    if (loopStart != nullptr) {
        std::cout << "Loop detected at node with value: " << loopStart->value << std::endl;
    } else {
        std::cout << "No loop detected." << std::endl;
    }

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

    def detect_loop(self):
        slow = fast = self.head

        # Phase 1: Detect loop
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:  # Loop detected
                break
        else:
            return None  # No loop

        # Phase 2: Find the start of the loop
        slow = self.head
        while slow != fast:
            slow = slow.next
            fast = fast.next

        return slow  # Start of the loop

# Example usage
if __name__ == "__main__":
    ll = LinkedList()
    ll.head = Node(1)
    ll.head.next = Node(2)
    ll.head.next.next = Node(3)
    ll.head.next.next.next = Node(4)
    ll.head.next.next.next.next = ll.head.next  # Creating a loop

    loop_start = ll.detect_loop()
    if loop_start:
        print(f"Loop detected at node with value: {loop_start.value}")
    else:
        print("No loop detected.")
```





