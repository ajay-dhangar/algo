---
id: doubly-linked-lists
sidebar_position: 4
title: Doubly Linked Lists
sidebar_label: Doubly Linked Lists
---

import Authors from '../../../src/components/Authors'

---

## <Authors names="@ajay-dhangar, @oebelus" />

---

A doubly linked list is a type of linked list in which each node contains a data field and two links - one to the next node and another to the previous node in the sequence.

## Characteristics

- Each node has data, a pointer to the next node, and a pointer to the previous node
- The first node's previous pointer and the last node's next pointer point to null
- Both forward and backward traversal is possible

## Basic Operations

### 1. Insertion

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtBeginning(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  insertAtEnd(data) {
    let newNode = new Node(data);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }
}
```

### 2. Deletion

```javascript
deleteNode(key) {
    let temp = this.head;

    while (temp != null && temp.data != key) {
        temp = temp.next;
    }

    if (temp == null) return;

    if (temp.prev != null) {
        temp.prev.next = temp.next;
    } else {
        this.head = temp.next;
    }

    if (temp.next != null) {
        temp.next.prev = temp.prev;
    } else {
        this.tail = temp.prev;
    }
}
```

### 3. Traversal

```javascript
printForward() {
    let temp = this.head;
    while (temp != null) {
        console.log(temp.data);
        temp = temp.next;
    }
}

printBackward() {
    let temp = this.tail;
    while (temp != null) {
        console.log(temp.data);
        temp = temp.prev;
    }
}
```

### 4. Searching

```javascript
search(key) {
    let current = this.head;
    while (current != null) {
        if (current.data === key) return true;
        current = current.next;
    }
    return false;
}
```

## Advantages and Disadvantages

### Advantages

- Can be traversed in both directions
- Deletion operation is more efficient if pointer to the node to be deleted is given

### Disadvantages

- Every node requires extra space for the previous pointer
- Operations require more work as there are more pointers to deal with

Doubly linked lists are versatile data structures that allow for efficient insertion, deletion, and bi-directional traversal. They are particularly useful in scenarios where backward traversal is frequently required, such as in browser's history functionality or undo operations in software.
