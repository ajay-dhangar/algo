---
id: circular-queue-dsa
title: Circular Queue Data Structure
sidebar_label: Circular Queue
sidebar_position: 5
description: "A circular queue is a linear data structure that connects the rear and front ends to form a circular structure. This makes it efficient for resource management and suitable for scenarios where data needs to be processed in a round-robin fashion."
tags: [dsa, data-structures, Circular Queue]
---

### Introduction to Circular Queue

A **circular queue** is a linear data structure that connects the last position to the first to form a circular structure. Unlike a standard queue, a circular queue efficiently reuses memory by connecting the rear end back to the front, making it ideal for applications like CPU scheduling, managing shared resources, and handling real-time data streams.


### Circular Queue Operations

1. **Enqueue**: Add an element to the rear of the queue.
2. **Dequeue**: Remove an element from the front of the queue.
3. **PeekFront**: Retrieve the element at the front without removing it.
4. **PeekRear**: Retrieve the element at the rear without removing it.
5. **isEmpty**: Check if the queue is empty.
6. **isFull**: Check if the queue is full.

### Pseudocode for Basic Operations

#### Enqueue

```cpp
#include <iostream>
using namespace std;

class CircularQueue {
private:
    int *elements;
    int front, rear, size;

public:
    CircularQueue(int size) {
        this->size = size;
        elements = new int[size];
        front = rear = 0;
    }

    void enqueue(int element) {
        if (is_full()) {
            cout << "Queue Overflow" << endl;
            return;
        }
        rear = (rear + 1) % size;
        elements[rear] = element;
    }

    int dequeue() {
        if (is_empty()) {
            cout << "Queue Underflow" << endl;
            return -1;
        }
        int frontElement = elements[front];
        front = (front + 1) % size;
        return frontElement;
    }

    int peek_front() {
        if (is_empty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return elements[front];
    }

    int peek_rear() {
        if (is_empty()) {
            cout << "Queue is empty" << endl;
            return -1;
        }
        return elements[rear];
    }

    bool is_empty() {
        return front == rear;
    }

    bool is_full() {
        return (rear + 1) % size == front;
    }

    ~CircularQueue() {
        delete[] elements;
    }
};

// Example usage
int main() {
    CircularQueue cq(5);
    cq.enqueue(10);
    cq.enqueue(20);
    cout << cq.dequeue() << endl;  // Output: 10
    cout << cq.peek_rear() << endl;  // Output: 20
    cout << boolalpha << cq.is_empty() << endl;  // Output: false
    return 0;
}
```

## Complexity Analysis
### Time Complexity:
Enqueue: $O(1)$
Dequeue: $O(1)$
PeekFront and PeekRear: $O(1)$
isEmpty and isFull: $O(1)$
Space Complexity: $O(n)$, where $n$ is the maximum number of elements in the queue.

## Conclusion
A circular queue is an efficient and space-optimized data structure useful for managing resources in a round-robin fashion, such as in task scheduling, memory buffering, and real-time data handling. Its circular design enables effective memory usage, making it a preferred choice in resource-constrained environments.