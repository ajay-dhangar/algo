---
id: stack-reversal
title: Stack Reversal
sidebar_label: Stack Reversal
description: "Reversing a stack involves changing the order of elements so that the bottom becomes the top and vice versa."
tags: [dsa, algorithms, stack]
---

### Definition:
Reversing a stack means rearranging the elements in such a way that the last element added becomes the first element to be removed, effectively flipping the order of the stack.

### Problem Statement:
Given a stack of integers, the task is to reverse the stack using recursion. The function should return the stack with the order of elements reversed, without using any additional data structures except for the recursion stack.

### Algorithm Steps:

1. **Base Case:** If the stack is empty, return from the function.
2. **Recursive Case:**
   - Pop the top element from the stack.
   - Call the function recursively to reverse the remaining stack.
   - Insert the popped element at the bottom of the reversed stack.
   
3. **Insertion at Bottom:** A helper function is required to insert an element at the bottom of the stack.

### Steps Involved:
1. **Function `reverseStack`:** This function is responsible for reversing the stack recursively.
  
   *Step 1.1:* Check if the stack is empty; if it is, return.
   *Step 1.2:* Pop the top element and store it.
   *Step 1.3:* Recursively call `reverseStack` for the remaining stack.
  
2. **Function `insertAtBottom`:** This function inserts an element at the bottom of the stack.

   *Step 2.1:* Check if the stack is empty; if it is, push the element.
   *Step 2.2:* Pop the top element, call `insertAtBottom` recursively, and push the popped element back.

3. **Main Function:** The main function initializes the stack, calls `reverseStack`, and displays the reversed stack.

### Time Complexity:
- The time complexity of this solution is `O(n)`, where `n` is the number of elements in the stack. This is because each element is processed a constant number of times (popped and inserted).

### Sample Input:
Stack: [1, 2, 3, 4, 5]

### Sample Output:
Stack after reversal: [5, 4, 3, 2, 1]

### Explanation of Sample:
- The stack is reversed so that the top element (5) becomes the bottom, and the bottom element (1) becomes the top.

### C++ Implementation:
```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to insert an element at the bottom of the stack
void insertAtBottom(stack<int>& s, int x) {
    if (s.empty()) {
        s.push(x);
    } else {
        int temp = s.top();
        s.pop();
        insertAtBottom(s, x);
        s.push(temp);
    }
}

// Function to reverse the stack
void reverseStack(stack<int>& s) {
    if (!s.empty()) {
        int x = s.top();
        s.pop();
        reverseStack(s);
        insertAtBottom(s, x);
    }
}

int main() {
    stack<int> s;
    s.push(1);
    s.push(2);
    s.push(3);
    s.push(4);
    s.push(5);

    reverseStack(s);

    cout << "Stack after reversal: ";
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
    return 0;
}
```
### Python Implementation:
```py
def insert_at_bottom(stack, x):
    """Helper function to insert an element at the bottom of the stack."""
    if not stack:
        stack.append(x)
    else:
        temp = stack.pop()
        insert_at_bottom(stack, x)
        stack.append(temp)

def reverse_stack(stack):
    """Function to reverse the stack using recursion."""
    if stack:
        x = stack.pop()
        reverse_stack(stack)
        insert_at_bottom(stack, x)

if __name__ == "__main__":
    # Sample stack
    stack = [1, 2, 3, 4, 5]

    reverse_stack(stack)

    print("Stack after reversal:", stack)

```
