## Double-Ended Queue (Deque) Data Structure

### Introduction to Deque

A **Double-Ended Queue (Deque)** is a linear data structure that allows the insertion and deletion of elements from both ends, making it more flexible than a regular queue. While a standard queue follows the First In First Out (FIFO) principle, a deque allows for both FIFO and Last In First Out (LIFO) operations by allowing insertion/removal from both the front and the rear of the queue.

### Key Operations in Deque

1. **Insert Front**: Add an element to the front of the deque.
2. **Insert Rear**: Add an element to the rear of the deque.
3. **Delete Front**: Remove the element from the front of the deque.
4. **Delete Rear**: Remove the element from the rear of the deque.
5. **Peek Front**: Retrieve the element at the front without removing it.
6. **Peek Rear**: Retrieve the element at the rear without removing it.
7. **isEmpty**: Check if the deque is empty.
8. **isFull**: Check if the deque is full.

### Pseudocode

1. **Insert Front**:

    ```text
    function insertFront(deque, element):
         if isFull(deque):
              return "Deque Overflow"
         deque.front = (deque.front - 1 + deque.size) % deque.size
         deque.elements[deque.front] = element
    ```

2. **Insert Rear**:

    ```text
    function insertRear(deque, element):
         if isFull(deque):
              return "Deque Overflow"
         deque.rear = (deque.rear + 1) % deque.size
         deque.elements[deque.rear] = element
    ```

3. **Delete Front**:

    ```text
    function deleteFront(deque):
         if isEmpty(deque):
              return "Deque Underflow"
         frontElement = deque.elements[deque.front]
         deque.front = (deque.front + 1) % deque.size
         return frontElement
    ```

4. **Delete Rear**:

    ```text
    function deleteRear(deque):
         if isEmpty(deque):
              return "Deque Underflow"
         rearElement = deque.elements[deque.rear]
         deque.rear = (deque.rear - 1 + deque.size) % deque.size
         return rearElement
    ```

5. **isEmpty**:

    ```text
    function isEmpty(deque):
         return deque.front == deque.rear
    ```

6. **isFull**:

    ```text
    function isFull(deque):
         return (deque.rear + 1) % deque.size == deque.front
    ```

### Python Implementation of Deque

Here is a Python implementation of the double-ended queue (deque):

```python
class Deque:
     def __init__(self, size):
          self.size = size
          self.elements = [None] * size
          self.front = 0
          self.rear = 0

     def insert_front(self, element):
          if self.is_full():
               return "Deque Overflow"
          self.front = (self.front - 1 + self.size) % self.size
          self.elements[self.front] = element

     def insert_rear(self, element):
          if self.is_full():
               return "Deque Overflow"
          self.rear = (self.rear + 1) % self.size
          self.elements[self.rear] = element

     def delete_front(self):
          if self.is_empty():
               return "Deque Underflow"
          front_element = self.elements[self.front]
          self.front = (self.front + 1) % self.size
          return front_element

     def delete_rear(self):
          if self.is_empty():
               return "Deque Underflow"
          rear_element = self.elements[self.rear]
          self.rear = (self.rear - 1 + self.size) % self.size
          return rear_element

     def peek_front(self):
          if self.is_empty():
               return "Deque is empty"
          return self.elements[self.front]

     def peek_rear(self):
          if self.is_empty():
               return "Deque is empty"
          return self.elements[self.rear]

     def is_empty(self):
          return self.front == self.rear

     def is_full(self):
          return (self.rear + 1) % self.size == self.front

# Example usage
deque = Deque(5)
deque.insert_rear(10)
deque.insert_front(20)
print(deque.delete_front())  # Output: 20
print(deque.peek_rear())     # Output: 10
print(deque.is_empty())      # Output: False
```

### Complexity

- **Time Complexity**:

  - Insertion (Front/Rear): $O(1)$
  - Deletion (Front/Rear): $O(1)$
  - Peek (Front/Rear): $O(1)$
  - isEmpty: $O(1)$
  - isFull: $O(1)$

- **Space Complexity**: $O(n)$, where $n$ is the number of elements that can be stored in the deque.

### Example

Consider a deque with the following operations:

1. Insert 10 at the rear.
2. Insert 20 at the front.
3. Delete from the front.
4. Peek the rear element.
5. Check if the deque is empty.

**Operations**:

- Insert 10 at rear: Deque becomes [_, 10, _, _, _]
- Insert 20 at front: Deque becomes [_, 10, _, _, 20]
- Delete from front: Removes 20, Deque becomes [_, 10, _, _, _]
- Peek rear: Returns 10
- isEmpty: Returns false

### Conclusion

A deque is a versatile and efficient data structure that allows operations from both ends of the queue, making it useful in applications requiring flexible data access patterns, such as browser history, task scheduling, and palindrome checking.
