---
id: circular-deque-dsa 
title: Circular Deque Data Structure 
sidebar_label: Circular Deque 
sidebar_position: 6 
description: "A circular deque is a double-ended queue data structure that connects the rear and front ends to form a circular structure, allowing insertion and deletion from both ends. This structure is ideal for scenarios requiring dynamic insertion and deletion at both ends." 
tags: [dsa, data-structures, Circular Deque]
---



## Introduction to Circular Deque
A circular deque (double-ended queue) is an advanced linear data structure that extends the concept of a circular queue by allowing insertion and deletion of elements from both the front and rear ends. This structure offers flexibility for applications that require dynamic additions and removals at both ends, such as real-time task scheduling, caching, and managing resource pools efficiently.

## Circular Deque Operations
#### InsertFront: Add an element to the front of the deque.
#### InsertRear: Add an element to the rear of the deque.
#### DeleteFront: Remove an element from the front of the deque.
#### DeleteRear: Remove an element from the rear of the deque.
#### PeekFront: Retrieve the front element without removing it.
#### PeekRear: Retrieve the rear element without removing it.
#### isEmpty: Check if the deque is empty.
#### isFull: Check if the deque is full.


```cpp
#include <iostream>
using namespace std;

class CircularDeque {
private:
    int *elements;
    int front, rear, size, capacity;

public:
    CircularDeque(int capacity) {
        this->capacity = capacity;
        elements = new int[capacity];
        front = -1;
        rear = 0;
        size = 0;
    }

    bool insertFront(int element) {
        if (is_full()) {
            cout << "Deque Overflow" << endl;
            return false;
        }
        front = (front == -1) ? 0 : (front - 1 + capacity) % capacity;
        elements[front] = element;
        size++;
        return true;
    }

    bool insertRear(int element) {
        if (is_full()) {
            cout << "Deque Overflow" << endl;
            return false;
        }
        rear = (rear + 1) % capacity;
        elements[rear] = element;
        size++;
        return true;
    }

    int deleteFront() {
        if (is_empty()) {
            cout << "Deque Underflow" << endl;
            return -1;
        }
        int frontElement = elements[front];
        front = (front + 1) % capacity;
        size--;
        return frontElement;
    }

    int deleteRear() {
        if (is_empty()) {
            cout << "Deque Underflow" << endl;
            return -1;
        }
        int rearElement = elements[rear];
        rear = (rear - 1 + capacity) % capacity;
        size--;
        return rearElement;
    }

    int peekFront() {
        if (is_empty()) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        return elements[front];
    }

    int peekRear() {
        if (is_empty()) {
            cout << "Deque is empty" << endl;
            return -1;
        }
        return elements[rear];
    }

    bool is_empty() {
        return size == 0;
    }

    bool is_full() {
        return size == capacity;
    }

    ~CircularDeque() {
        delete[] elements;
    }
};

// Example usage
int main() {
    CircularDeque deque(5);
    deque.insertFront(10);
    deque.insertRear(20);
    cout << deque.peekFront() << endl;   // Output: 10
    cout << deque.peekRear() << endl;    // Output: 20
    deque.deleteFront();
    cout << deque.is_empty() << endl;    // Output: false
    deque.deleteRear();
    cout << deque.is_empty() << endl;    // Output: true
    return 0;
}
```
## Complexity Analysis

### Time Complexity:

InsertFront: $O(1)$
InsertRear: $O(1)$
DeleteFront: $O(1)$
DeleteRear: $O(1)$
PeekFront and PeekRear: $O(1)$
isEmpty and isFull: $O(1)$

### Space Complexity:
$O(n)$, where $n$ is the maximum number of elements in the deque (capacity).