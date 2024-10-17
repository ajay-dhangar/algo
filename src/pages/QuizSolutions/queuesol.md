
# Queue Quiz

## 1. Following is C-like pseudo-code of a function that takes a Queue as an argument, and uses a stack S to do processing.

```c
void fun(Queue *Q)
{
    Stack S;  // Say it creates an empty stack S

    // Run while Q is not empty
    while (!isEmpty(Q))
    {
        // deQueue an item from Q and push the dequeued item to S
        push(&S, deQueue(Q));
    }

    // Run while Stack S is not empty
    while (!isEmpty(&S))
    {
      // Pop an item from S and enqueue the popped item to Q
      enQueue(Q, pop(&S));
    }
}
```

- **Options:**
  - A) Removes the last from Q
  - B) Keeps the Q same as it was before the call
  - C) Makes Q empty
  - D) Reverses the Q

- **Answer:** D) Reverses the Q

- **Explanation:**  
  The function uses a stack to reverse the queue. First, all elements are dequeued from the queue and pushed into the stack. Then, elements are popped from the stack and enqueued back into the queue. Since the stack follows LIFO order, the queue is reversed.


## 2. How many stacks are needed to implement a queue? Consider the situation where no other data structure like arrays or linked lists is available to you.

- **Options:**
  - A) 1
  - B) 2
  - C) 3
  - D) 4

- **Answer:** B) 2

- **Explanation:**  
  To implement a queue using stacks, two stacks are required. One stack is used for enqueuing elements, and the other is used for dequeuing them.


## 3. Which of the following operations on a queue data structure has a time complexity of O(1)?

- **Options:**
  - A) Enqueue
  - B) Dequeue
  - C) Peek
  - D) Clear

- **Answer:** A and B

- **Explanation:**  
  Both enqueue and dequeue operations in a standard queue have a time complexity of O(1) as they involve simple pointer adjustments.


## 4. A priority queue can be efficiently implemented using which of the following data structures?

- **Options:**
  - A) Array
  - B) Linked List
  - C) Heap Data Structures like Binary Heap, Fibonacci Heap
  - D) None of the above

- **Answer:** C) Heap Data Structures like Binary Heap, Fibonacci Heap

- **Explanation:**  
  Heaps are the most efficient data structures to implement priority queues as they allow insertion and removal of elements in logarithmic time.


## 5. Which of the following is true about linked list implementation of a queue?

- **Options:**
  - A) In push operation, if new nodes are inserted at the beginning of the linked list, then in pop operation, nodes must be removed from the end.
  - B) In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.
  - C) Both of the above
  - D) None of the above

- **Answer:** C) Both of the above

- **Explanation:**  
  In a linked list implementation of a queue, nodes can either be inserted at the beginning or end, and the opposite operation should be performed to remove nodes, depending on where the nodes were added.


## 6. A Priority-Queue is implemented as a Max-Heap. Initially, it has 5 elements. The level-order traversal of the heap is given below: 10, 8, 5, 3, 2. Two new elements '1' and '7' are inserted in the heap in that order. The level-order traversal of the heap after the insertion of the elements is:

- **Options:**
  - A) 10, 8, 7, 5, 3, 2, 1
  - B) 10, 8, 7, 2, 3, 1, 5
  - C) 10, 8, 7, 1, 2, 3, 5
  - D) 10, 8, 7, 3, 2, 1, 5

- **Answer:** A) 10, 8, 7, 5, 3, 2, 1

- **Explanation:**  
  Inserting elements '1' and '7' into the Max-Heap results in the heap structure adjusting such that the maximum element remains at the root. The final level-order traversal after the insertions is 10, 8, 7, 5, 3, 2, 1.


## 7. Which of the following is true about the circular queue?

- **Options:**
  - A) It avoids memory wastage compared to the simple linear queue.
  - B) It has a fixed size and cannot be dynamically resized.
  - C) Dequeue and enqueue operations wrap around at the end.
  - D) All of the above

- **Answer:** D) All of the above

- **Explanation:**  
  Circular queues eliminate the problem of unused space in linear queues by wrapping around the enqueue and dequeue operations. It uses fixed-size memory but optimizes the use of available space.


## 8. In a circular queue, if `front == rear + 1`, what does it signify?

- **Options:**
  - A) Queue is empty
  - B) Queue is full
  - C) Queue is circular
  - D) Invalid state

- **Answer:** B) Queue is full

- **Explanation:**  
  In a circular queue, the condition `front == rear + 1` indicates that the queue is full because the rear has wrapped around and is just before the front.


## 9. What is the time complexity of inserting an element in an unsorted priority queue?

- **Options:**
  - A) O(1)
  - B) O(log n)
  - C) O(n)
  - D) O(n^2)

- **Answer:** A) O(1)

- **Explanation:**  
  Inserting an element into an unsorted priority queue takes constant time because there is no need to maintain order during insertion. However, removal of the highest priority element will take O(n) time.


## 10. How is a double-ended queue (Deque) different from a standard queue?

- **Options:**
  - A) It allows insertion and deletion from both ends.
  - B) It only allows deletion from one end.
  - C) It is always implemented using a circular array.
  - D) It has more memory overhead compared to a queue.

- **Answer:** A) It allows insertion and deletion from both ends.

- **Explanation:**  
  A double-ended queue (Deque) is a generalized form of a queue where insertion and deletion operations can be performed at both the front and rear ends.
