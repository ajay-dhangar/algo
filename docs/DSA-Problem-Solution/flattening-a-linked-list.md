---
id: flattening-a-linked-list
title: "Flattening a linked list involves converting a multi-level linked list into a single-level linked list."
sidebar_label: "flattening a linked list"
sidebar_position: 15
description: "Flattening a linked list involves converting a multi-level linked list into a single-level linked list."
tags: [linked list,flattening]
---

# Flattening a Linked List

Flattening a linked list involves converting a multi-level linked list into a single-level linked list. In this context, a multi-level linked list is one where each node may point to another linked list (next and child pointers). Flattening means that all child lists are combined into a single list, maintaining the original order.

## Structure of the Linked List

A node in a multi-level linked list can be represented as follows:

```plaintext
class Node {
    int data;
    Node next;  // Pointer to the next node in the same level
    Node child; // Pointer to the child linked list
}
```

Example
Consider the following multi-level linked list:

```plaintext
1 -> 2 -> 3
          |
          4 -> 5
          |
          6
```
The goal is to flatten this structure into a single linked list:

```plaintext
1 -> 2 -> 3 -> 4 -> 5 -> 6
```

## Steps to Flatten the Linked List
1. ### Traversal: Start from the head of the list and traverse through each node.
2. ### Recursive Flattening:
      - For each node, recursively flatten the child list if it exists.
      - Connect the child list to the current node and then continue with the next node.
3. ### Connecting Nodes: Ensure that the next pointers are set correctly so that the flattened structure maintains the correct order.

## Implementation
## Java
```java
class Node {
    int data;
    Node next;
    Node child;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.child = null;
    }
}

public class LinkedListFlattener {

    public Node flatten(Node root) {
        if (root == null) {
            return null;
        }

        Node dummy = new Node(0);
        Node tail = dummy;

        flattenHelper(root, tail);

        return dummy.next;
    }

    private void flattenHelper(Node node, Node tail) {
        while (node != null) {
            tail.next = node;
            tail = tail.next;

            if (node.child != null) {
                flattenHelper(node.child, tail);
            }

            node = node.next;
        }
    }

    // Example Usage
    public static void main(String[] args) {
        // Create nodes and link them as per the multi-level structure
    }
}

```

## C++
```cpp
class Node {
public:
    int data;
    Node* next;
    Node* child;

    Node(int data) : data(data), next(nullptr), child(nullptr) {}
};

class LinkedListFlattener {
public:
    Node* flatten(Node* root) {
        if (!root) {
            return nullptr;
        }

        Node* dummy = new Node(0); // Dummy head for the new flattened list
        Node* tail = dummy;

        flattenHelper(root, tail);

        return dummy->next; // Return the next of dummy head which is the flattened list
    }

private:
    void flattenHelper(Node* node, Node*& tail) {
        while (node) {
            // Attach current node to the tail of the flattened list
            tail->next = node;
            tail = tail->next;

            // If there's a child, flatten it
            if (node->child) {
                flattenHelper(node->child, tail);
            }

            // Move to the next node
            node = node->next;
        }
    }
};

// Example Usage
int main() {
    // Create nodes and link them as per the multi-level structure
}

```
## Python
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.child = None

def flatten(root):
    if not root:
        return None

    # Pointer to traverse the linked list
    current = root
    # Dummy head for the new flattened list
    dummy = Node(0)
    tail = dummy

    # Function to recursively flatten the linked list
    def flatten_helper(node):
        nonlocal tail
        while node:
            # Attach current node to the tail of the flattened list
            tail.next = node
            tail = tail.next

            # If there's a child, flatten it
            if node.child:
                flatten_helper(node.child)

            # Move to the next node
            node = node.next

    flatten_helper(current)
    # Return the next of dummy head which is the flattened list
    return dummy.next

# Example Usage
# Create nodes and link them as per the multi-level structure
```
