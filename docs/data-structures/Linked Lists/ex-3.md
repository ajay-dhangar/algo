---
id: circular-linked-lists
sidebar_position: 5
title: Circular Linked Lists
sidebar_label: Circular Linked Lists
---

import Authors from '../../../src/components/Authors'

---

## <Authors names="@ajay-dhangar, @oebelus" />

---

A circular linked list is a variation of a linked list in which the last node points back to the first node, creating a circle. It can be either singly circular or doubly circular.

## Characteristics

- The last node points to the first node, creating a circle
- There is no NULL at the end
- Can be traversed starting from any point

## Basic Operations

### 1. Insertion

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtBeginning(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let temp = this.head;
      while (temp.next !== this.head) {
        temp = temp.next;
      }
      newNode.next = this.head;
      temp.next = newNode;
      this.head = newNode;
    }
  }

  insertAtEnd(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let temp = this.head;
      while (temp.next !== this.head) {
        temp = temp.next;
      }
      temp.next = newNode;
      newNode.next = this.head;
    }
  }
}
```

### 2. Deletion

```javascript
deleteNode(key) {
    if (!this.head) return;

    let current = this.head;
    let prev = null;

    while (current.data !== key) {
        if (current.next === this.head) {
            return; // key not found
        }
        prev = current;
        current = current.next;
    }

    if (current === this.head && current.next === this.head) {
        this.head = null;
        return;
    }

    if (current === this.head) {
        prev = this.head;
        while (prev.next !== this.head) {
            prev = prev.next;
        }
        this.head = current.next;
        prev.next = this.head;
    } else if (current.next === this.head) {
        prev.next = this.head;
    } else {
        prev.next = current.next;
    }
}
```

### 3. Traversal

```javascript
printList() {
    if (!this.head) return;

    let temp = this.head;
    do {
        console.log(temp.data);
        temp = temp.next;
    } while (temp !== this.head);
}
```

### 4. Searching

```javascript
search(key) {
    if (!this.head) return false;

    let temp = this.head;
    do {
        if (temp.data === key) return true;
        temp = temp.next;
    } while (temp !== this.head);

    return false;
}
```

## Advantages and Disadvantages

### Advantages

- Any node can be a starting point
- Useful for implementation of queue
- Useful for repeated operations around the list

### Disadvantages

- Slightly more complex than singly and doubly linked lists
- Reversing a circular linked list is more complicated

Circular linked lists are particularly useful in applications where you need to repeatedly go around a list of elements, such as in scheduling algorithms or in certain types of games. They provide an efficient way to cycle through a set of elements without having to check for the end of the list.
