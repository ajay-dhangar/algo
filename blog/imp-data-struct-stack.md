---
slug: stack-in-data-structures
title: 'Introduction to the Stack Data Structure'
authors: [Riya-Sharma]
tags: [stack, algorithms, dsa, java, python, cpp, data-structures]
---

In data structures, a stack is a linear data structure that follows the LIFO (Last In First Out) principle. This means the element inserted last is removed first. Stacks are widely used in programming for recursion, expression evaluation, browser history, and many other applications.

<!-- truncate -->

## What is Stack?

A Stack is a linear data structure in which insertion and deletion take place only from one end called the **top**. It works on the **LIFO (Last In First Out)** principle.

**Below are Some Examples of Stack:**
```markdown
Stack of Plates
Undo/Redo Operations
Browser History
Function Call Stack
```

## How Stack is Represented:

A stack can be implemented using arrays or linked lists. It follows the **LIFO (Last In First Out)** principle, where the last inserted element is removed first.

Here are some important stack operations:

- **Push Operation**: Adds an element to the top of the stack.
  ```java
  stack.push(10);
  ```

- **Pop Operation**: Removes the top element from the stack.
  ```java
  stack.pop();
  ```

- **Peek Operation**: Returns the top element without removing it.
  ```java
  stack.peek();
  ```

- **isEmpty Operation**: Checks whether the stack is empty or not.
  ```java
  stack.isEmpty();
  ```

Understanding these operations is important because stacks are widely used in recursion, expression evaluation, browser history, and many algorithmic problems.


## How Stack Works:

A stack works on the **LIFO (Last In First Out)** principle. This means the most recently inserted element is removed first.

Consider the following example:

```text
Top
 ┌───┐
 | 30|
 | 20|
 | 10|
 └───┘
```
- 10 is inserted first
- 20 is inserted after 10
- 30 is inserted last and becomes the top element

If we perform a pop() operation, 30 will be removed first because it was inserted last.

This behavior makes stacks very useful in applications like recursion, undo operations, and function calls.



## Declaration of Stack:

In different programming languages, a stack can be declared using built-in libraries or by implementing it manually using arrays or linked lists. The idea remains the same: elements are added and removed from one end called the **top**.

Here are some common ways to declare a stack:

- **C++**:
  ```cpp
  #include <stack>
  using namespace std;

  stack<int> st;
  ```



### Applications of Stack:

Stacks are widely used in computer science and real-world applications. Some of the major uses are:

- **Function Calls and Recursion**:  
  The system uses a call stack to store function calls and execution context.

- **Expression Evaluation**:  
  Used in evaluating postfix, prefix, and infix expressions.

- **Balanced Parentheses Problem**:  
  Helps in checking whether brackets like (), {}, [] are properly matched.

- **Undo/Redo Operations**:  
  Used in text editors and IDEs to reverse actions.

- **Browser History**:  
  Back and forward navigation in browsers works using stacks.

- **Depth First Search (DFS)**:  
  Graph traversal technique uses stack (explicitly or via recursion).


### Java Example of Stack

```java
import java.util.*;

class Main {
    public static void main(String[] args) {

        Stack<Integer> st = new Stack<>();

        // Push elements into stack
        st.push(10);
        st.push(20);
        st.push(30);

        System.out.println("Stack: " + st);

        // Top element
        System.out.println("Top Element: " + st.peek());

        // Remove top element
        st.pop();

        System.out.println("After Pop: " + st);

        // Check if stack is empty
        System.out.println("Is Stack Empty? " + st.isEmpty());
    }
}
```

### Output:

```text
Stack: [10, 20, 30]
Top Element: 30
After Pop: [10, 20]
Is Stack Empty? false
```

### Conclusion:

Stack is one of the most fundamental and widely used data structures in computer science. Its **LIFO (Last In First Out)** behavior makes it highly useful in solving many programming and real-world problems efficiently.

Stacks are used in recursion, expression evaluation, browser history, undo operations, graph traversal, and many important algorithms. Because of their simple implementation and fast operations, they are an essential topic for every programmer and competitive coder.

Understanding stacks also builds a strong foundation for learning advanced data structures and algorithms.
