---
id: singly-linked-lists
sidebar_position: 3
title: Singly Linked Lists
sidebar_label: Singly Linked Lists
---

import Authors from '../../../src/components/Authors'

---

## <Authors names="@ajay-dhangar, @oebelus" />

---

A singly linked list is a linear data structure in which elements are stored in nodes. Each node contains a data field and a reference (or link) to the next node in the sequence.

## Characteristics

- Each node has data and a pointer to the next node
- The last node points to null
- Only forward traversal is possible

## Basic Operations

### 1. Insertion

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtBeginning(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtEnd(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}
```

### 2. Deletion

```javascript
deleteNode(key) {
    let temp = this.head;
    let prev = null;

    if (temp != null && temp.data == key) {
        this.head = temp.next;
        return;
    }

    while (temp != null && temp.data != key) {
        prev = temp;
        temp = temp.next;
    }

    if (temp == null) return;

    prev.next = temp.next;
}
```

### 3. Traversal

```javascript
printList() {
    let temp = this.head;
    while (temp) {
        console.log(temp.data);
        temp = temp.next;
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

- Dynamic size
- Efficient insertion and deletion at the beginning

### Disadvantages

- No random access
- Extra memory for pointers

Singly linked lists are fundamental data structures that serve as a building block for more complex data structures. They are particularly useful when you need constant-time insertion at the beginning of the list and do not require backward traversal.

---
