---
id: stack-in-dsa
title: Stack Using Array
sidebar_label: Stack Using Array
sidebar_position: 1
description: "Stack is a linear data structure that follows LIFO principle"
tags: [dsa, data-structures, stack, LIFO]
---

### Introduction to Stack

A stack is a linear data structure that follows the Last In First Out (LIFO) principle. This means that the last element added to the stack will be the first one to be removed. Stacks are used in various applications such as expression evaluation, function call management in recursion, and more.

### Stack Operations

1. **Push**: Add an element to the top of the stack.
2. **Pop**: Remove the top element from the stack.
3. **Peek (or Top)**: Retrieve the top element of the stack without removing it.
4. **isEmpty**: Check if the stack is empty.
5. **Size**: Get the number of elements in the stack.

### Pseudocode

#### Basic Operations

1. **Push**:

   ```text
   function push(stack, element):
       stack.append(element)
   ```

2. **Pop**:

   ```text
   function pop(stack):
       if isEmpty(stack):
           return "Stack Underflow"
       return stack.pop()
   ```

3. **Peek**:

   ```text
   function peek(stack):
       if isEmpty(stack):
           return "Stack is empty"
       return stack[-1]
   ```

4. **isEmpty**:

   ```text
   function isEmpty(stack):
       return len(stack) == 0
   ```

5. **Size**:
   ```text
   function size(stack):
       return len(stack)
   ```

### Implementation in Python, C++, and Java

#### Python Implementation

```python
class Stack:
    def __init__(self):
        self.elements = []

    def push(self, element):
        self.elements.append(element)

    def pop(self):
        if self.is_empty():
            return "Stack Underflow"
        return self.elements.pop()

    def peek(self):
        if self.is_empty():
            return "Stack is empty"
        return self.elements[-1]

    def is_empty(self):
        return len(self.elements) == 0

    def size(self):
        return len(self.elements)

# Example usage
stack = Stack()
stack.push(10)
stack.push(20)
print(stack.pop())    # Output: 20
print(stack.peek())   # Output: 10
print(stack.is_empty())  # Output: False
print(stack.size())   # Output: 1
```

#### C++ Implementation

```cpp
#include <iostream>
#include <vector>

class Stack {
private:
    std::vector<int>.elements;

public:
    void push(int element) {
    .elements.push_back(element);
    }

    int pop() {
        if (isEmpty()) {
            std::cerr << "Stack Underflow" << std::endl;
            return -1;
        }
        int top =.elements.back();
    .elements.pop_back();
        return top;
    }

    int peek() {
        if (isEmpty()) {
            std::cerr << "Stack is empty" << std::endl;
            return -1;
        }
        return.elements.back();
    }

    bool isEmpty() {
        return.elements.empty();
    }

    int size() {
        return.elements.size();
    }
};

// Example usage
int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    std::cout << stack.pop() << std::endl;    // Output: 20
    std::cout << stack.peek() << std::endl;   // Output: 10
    std::cout << std::boolalpha << stack.isEmpty() << std::endl;  // Output: false
    std::cout << stack.size() << std::endl;   // Output: 1
    return 0;
}
```

#### Java Implementation

```java
import java.util.ArrayList;

public class Stack {
    private ArrayList<Integer>.elements;

    public Stack() {
    .elements = new ArrayList<>();
    }

    public void push(int element) {
    .elements.add(element);
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return.elements.remove.elements.size() - 1);
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        return.elements.get.elements.size() - 1);
    }

    public boolean isEmpty() {
        return.elements.isEmpty();
    }

    public int size() {
        return.elements.size();
    }

    // Example usage
    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.push(10);
        stack.push(20);
        System.out.println(stack.pop());    // Output: 20
        System.out.println(stack.peek());   // Output: 10
        System.out.println(stack.isEmpty());  // Output: false
        System.out.println(stack.size());   // Output: 1
    }
}
```

### Complexity

- **Time Complexity**:

  - Push: $O(1)$
  - Pop: $O(1)$
  - Peek: $O(1)$
  - isEmpty: $O(1)$
  - Size: $O(1)$

- **Space Complexity**: $O(n)$, where $n$ is the number of elements in the stack.

### Example

Consider a stack with the following operations:

1. Push 10
2. Push 20
3. Pop
4. Peek
5. Check if empty
6. Get size

**Operations**:

- Push 10: Stack becomes [10]
- Push 20: Stack becomes [10, 20]
- Pop: Removes 20, Stack becomes [10]
- Peek: Returns 10, Stack remains [10]
- isEmpty: Returns false
- Size: Returns 1

### Conclusion

A stack is a fundamental data structure used in computer science for various applications where the LIFO (Last In First Out) principle is required. It is simple to implement and provides efficient operations for adding and removing elements. Understanding and using stacks effectively can help solve many algorithmic problems.
