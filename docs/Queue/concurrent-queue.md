# Concurrent Queue Data Structure

A concurrent queue is a thread-safe data structure designed for safe access by multiple threads. It allows efficient queue operations while ensuring data integrity and preventing race conditions.

## Introduction

A concurrent queue follows the First In First Out (FIFO) principle, allowing multiple threads to perform enqueue and dequeue operations safely without explicit locks. This makes it ideal for multithreading environments.

## Operations

1. **Enqueue**: Add an element to the back of the queue.
2. **Dequeue**: Remove the element from the front of the queue.
3. **Peek**: Retrieve the element at the front of the queue without removing it.
4. **isEmpty**: Check if the queue is empty.
5. **isFull**: Check if the queue is full.
6. **Size**: Get the number of elements in the queue.

## Implementation

### Python Code

```python
import threading

class ConcurrentQueue:
    def __init__(self, size):
        self.size = size
        self.elements = [None] * size
        self.front = 0
        self.rear = 0
        self.lock = threading.Lock()

    def enqueue(self, element):
        with self.lock:
            if self.is_full():
                return "Queue Overflow"
            self.rear = (self.rear + 1) % self.size
            self.elements[self.rear] = element

    def dequeue(self):
        with self.lock:
            if self.is_empty():
                return "Queue Underflow"
            frontElement = self.elements[self.front]
            self.front = (self.front + 1) % self.size
            return frontElement

    def peek(self):
        with self.lock:
            if self.is_empty():
                return "Queue is empty"
            return self.elements[self.front]

    def is_empty(self):
        with self.lock:
            return self.front == self.rear

    def is_full(self):
        with self.lock:
            return (self.rear + 1) % self.size == self.front

    def size_of_queue(self):
        with self.lock:
            return (self.rear - self.front + self.size) % self.size

# Example usage
if __name__ == "__main__":
    cq = ConcurrentQueue(5)
    cq.enqueue(10)
    cq.enqueue(20)
    print(cq.dequeue())  # Output: 10
    print(cq.peek())     # Output: 20
    print(cq.is_empty()) # Output: False
    print(cq.size_of_queue()) # Output: 1
```

## Complexity

- **Time Complexity**:
  - **Enqueue**: \(O(1)\)
  - **Dequeue**: \(O(1)\)
  - **Peek**: \(O(1)\)
  - **isEmpty**: \(O(1)\)
  - **isFull**: \(O(1)\)
  - **Size**: \(O(1)\)

- **Space Complexity**: \(O(n)\), where \(n\) is the maximum number of elements that can be stored in the queue.

## Conclusion

The concurrent queue is an efficient data structure that simplifies multithreading operations by automatically managing synchronization. It is particularly useful in scenarios such as task scheduling, producer-consumer problems, and buffering tasks in concurrent systems. By ensuring thread safety and minimizing the need for explicit locks, it enhances performance and simplifies the design of concurrent applications.

