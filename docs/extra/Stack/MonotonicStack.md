---
id: monotonic-stack
title: Monotonic Stack
sidebar_label: Monotonic Stack
sidebar_position: 4
description: 'Monotonic Stack is a data structure technique used to maintain elements in a particular order, typically increasing or decreasing, and is commonly used for solving problems involving range queries, such as finding the next greater element.'
tags: [dsa, algorithms, stack, monotonic-stack]
---

### Introduction

A **Monotonic Stack** is a special type of stack that maintains its elements in a sorted order, either strictly increasing or strictly decreasing. It is a powerful tool used in many problems where you need to find the next or previous greater or smaller elements efficiently.

Monotonic stacks are primarily used in problems related to range queries, like finding the next greater or smaller elements in a sequence, solving problems that involve temperatures, stock prices, or histogram areas.

### How the Stack Works

A monotonic stack operates under two variations:
1. **Monotonically Increasing Stack**: The stack maintains elements in increasing order, where the top of the stack has the smallest value.
2. **Monotonically Decreasing Stack**: The stack maintains elements in decreasing order, where the top of the stack has the largest value.

The fundamental principle is to push elements onto the stack while ensuring the monotonic property is not violated. If the property is violated by a new element, elements are popped from the stack until the property is restored. This approach helps in reducing the time complexity of certain range query problems.

### Algorithm

To construct a monotonic stack:
1. Initialize an empty stack.
2. Iterate through each element in the input.
3. For each element, check if it violates the monotonic property of the stack.
   - If it does, keep popping elements from the stack until the property is restored.
   - Push the current element onto the stack.
4. Repeat this process until all elements have been processed.

### Applications

- **Next Greater Element**: Finding the next greater element for each element in an array can be efficiently solved using a monotonic stack.
- **Histogram Problems**: Finding the largest rectangle in a histogram or largest area under a histogram can be solved using a decreasing monotonic stack.
- **Stock Span Problem**: Calculating the stock span for a series of days is another application of the monotonic stack.
- **Temperature Problem**: Finding the number of days until a warmer temperature can be solved using a monotonic stack.
  
### Pseudocode

```text
Function monotonicStack(arr):
    Initialize empty stack
    For each element in arr:
        While stack is not empty and element violates monotonic property:
            Pop element from stack
        Push current element to stack
    Return stack
```

### Implementation in C++

```cpp
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

// Function to find the next greater element using a monotonic stack
vector<int> nextGreaterElement(vector<int>& nums) {
    vector<int> result(nums.size(), -1); // Initialize result with -1
    stack<int> st; // Monotonic stack

    for (int i = 0; i < nums.size(); i++) {
        // While stack is not empty and current element is greater than the stack's top
        while (!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i]; // Set the next greater element
            st.pop(); // Pop the top
        }
        st.push(i); // Push the current index onto the stack
    }

    return result;
}

int main() {
    vector<int> nums = {2, 1, 2, 4, 3};
    vector<int> result = nextGreaterElement(nums);

    // Output the result
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

### Time Complexity
- Time Complexity: $O(n)$
Each element is pushed and popped from the stack at most once, making the overall time complexity linear.
- Space Complexity: $O(n)$
The stack requires space proportional to the number of elements in the input array.