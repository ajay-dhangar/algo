---
id: min-stack 
title: Min Stack 
sidebar_label: Min Stack 
description: "A MinStack is a data structure that supports standard stack operations while efficiently retrieving the minimum element in constant time."  
tags: [dsa, algorithms, stack]
---

### Definition:
A MinStack is a specialized stack data structure that supports standard stack operations (push, pop, top) while also providing the ability to retrieve the minimum element in constant time O(1). It achieves this by maintaining an additional mechanism that tracks the minimum value, ensuring efficient access to both the stack's top element and the minimum element at any point.

### Problem Statement:
Design a Data Structure MinStack that supports all the stack operations like push(), pop(), isEmpty(), isFull() and an additional operation getmin() which should return minimum element from the MinStack. All these operations of MinStack must have a time complexity of O(1)

### Algorithm Steps:

 1. Use a dynamic stack to hold elements, allowing it to grow as needed.
 2. Track the minimum element in constant time by adjusting how elements are stored when a new minimum is encountered.
 3. When adding a new element, check if it is less than the current minimum; if so, store a modified value in the stack to represent the new minimum.
 4. When removing an element, determine if it is the current minimum; if so, recalculate the minimum based on the modified values stored in the stack.

### Steps Involved:
**1. MinStack Structure:**
   - Variables:                  
     - `stack<int> mainStack`: Holds stack elements.
     - `int minElement`: Tracks the minimum value.
     
**2. Functions:**    

  - `isEmpty():` Checks if the stack is empty.                   
  - `isFull():` Always returns false.                
  - `getmin():` Prints the minimum element.                  
  - `peek():` Shows the top element or the minimum if the top is less.                        
  - `pop():` Removes the top element and updates minElement.                 
  - `push(int val):` Adds an element, updating minElement if necessary.                      
   
**3. Main Function:**    

  - Demonstrates the stack by pushing values, printing the minimum, popping elements, and checking the top.               

### Time Complexity:
- The time complexity of the `MinStack` implementation is as follows: `push()`, `pop()`, and `getmin()` operations all run in `O(1)` time, as they perform a constant number of operations regardless of the stack size. The `peek()` operation also executes in `O(1)` time since it only accesses the top element of the stack. The `isEmpty()` and `isFull()` functions similarly operate in `O(1)` time by checking the state of the stack. Overall, all operations in this stack implementation are efficient, with a consistent time complexity of `O(1)` for each operation.

### Space Complexity:
- The space complexity of the MinStack implementation is `O(n)`, where `n` is the number of elements stored in the stack. This is due to the need to store each element in the underlying stack data structure, while only a few additional variables (like minElement) are used, which do not contribute significantly to the space usage.

### Sample Input:
    push(9)
    push(15)
    getmin()
    push(1)
    getmin()
    pop()
    getmin()
    push(4)
    getmin()
    pop()
    peek()

### Sample Output:
    Element Pushed: 9
    Element Pushed: 15
    Minimum Element in the stack is: 9
    Element Pushed: 1
    Minimum Element in the stack is: 1
    Element popped: 1
    Minimum Element in the stack is: 9
    Element Pushed: 4
    Minimum Element in the stack is: 4
    Element popped: 4
    Top Most Element is: 15

### Explanation of Sample:

- Elements 9, 15, and 1 are pushed, updating the stack and the minimum value accordingly.
- After pushing, the minimum values (9 and then 1) are printed.
- The top element (1) is popped, and the new minimum (9) is displayed; then 4 is pushed and becomes the new minimum.
- Finally, the top element (15) is displayed after popping 4.

### C++ Implementation:

```cpp

#include <bits/stdc++.h>
using namespace std;

struct MinStack {
    stack<int> mainStack;
    int minElement;

    // Check if the stack is empty
    bool isEmpty() {
        return mainStack.empty();
    }

    // Check if the stack is full (always false for dynamic stack)
    bool isFull() {
        // Since std::stack can grow dynamically, we'll return false
        return false;
    }

    void getmin() {
        if (isEmpty())
            cout << "Stack is empty\n";
        else
            cout << "Minimum Element in the stack is: " << minElement << "\n";
    }

    void peek() {
        if (isEmpty()) {
            cout << "Stack is empty ";
            return;
        }

        int topElement = mainStack.top(); // Top element.
        cout << "Top Most Element is: ";
        
        // If topElement < minElement, minElement stores
        // the actual top element value.
        (topElement < minElement) ? cout << minElement : cout << topElement;
    }

    // Remove the top element from MinStack
    void pop() {
        if (isEmpty()) {
            cout << "Stack is empty\n";
            return;
        }

        cout << "Element popped: ";
        int topElement = mainStack.top();
        mainStack.pop();

        // Minimum will change if the minimum element
        // is being removed.
        if (topElement < minElement) {
            cout << minElement << "\n";
            minElement = 2 * minElement - topElement;
        } else {
            cout << topElement << "\n";
        }
    }

    // Inserts an element into MinStack
    void push(int val) {
        // Insert new number into the stack
        if (isEmpty()) {
            minElement = val;
            mainStack.push(val);
            cout << "Element Pushed: " << val << "\n";
            return;
        }

        // If new number is less than minElement
        else if (val < minElement) {
            mainStack.push(2 * val - minElement);
            minElement = val;
        } else {
            mainStack.push(val);
        }

        cout << "Element Pushed: " << val << "\n";
    }
};

int main() {
    MinStack s;

    // Function calls
    s.push(9);
    s.push(15);
    s.getmin();
    s.push(1);
    s.getmin();
    s.pop();
    s.getmin();
    s.push(4);
    s.getmin();
    s.pop();
    s.peek();

    return 0;
}


```
