---
id: next-greater-node-in-linked-list
sidebar_position: 1
title: "Next Greater Node in Linked List"
description: "This tutorial explains how to find the next greater node in a linked list using C++."
sidebar_label: "Next Greater Node"
tags: [dsa, linked-lists, cpp]
---

# Next Greater Node in Linked List

## Problem Statement

Given the head of a linked list with `n` nodes, for each node, find the value of the next node that is strictly greater. If no such node exists, return 0 for that position.

Return an integer array `answer` where `answer[i]` is the value of the next greater node of the `i`th node (1-indexed). 

### Example

**Input:**
- `head = [2,1,5]`

**Output:**
- `[5,5,0]`

### Constraints
- The linked list can have up to `10^4` nodes.
- Each node contains a non-negative integer value.

## Solution Explanation

To solve the problem:
1. **Traverse and Store Values**:
   - First, convert the linked list to an array of values. This allows for easy access and processing.
2. **Next Greater Element with Stack**:
   - Use a stack to keep track of indices of elements that are waiting for a "next greater" element.
   - Traverse the array, and for each value, check if it’s greater than the values represented by indices in the stack.
   - If so, pop indices from the stack and assign this value as the "next greater" for each of these indices.
   - Push the current index onto the stack if it doesn't have a greater element in the remainder of the array.
3. **Final Result**:
   - Return the result array where each position `i` contains the next greater node for the node `i`, or 0 if no greater value exists.

### Complexity
- **Time Complexity**: `O(n)`, where `n` is the number of nodes, as each node is processed once.
- **Space Complexity**: `O(n)`, for storing values in the array and using the stack.

## Code Implementation

Here’s the C++ code for finding the next greater node in a linked list:

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    vector<int> nextLargerNodes(ListNode* head) {
        vector<int> values;
        
        // Convert linked list to an array of values
        while (head) {
            values.push_back(head->val);
            head = head->next;
        }
        
        int n = values.size();
        vector<int> result(n, 0); // Initialize result array with 0s
        stack<int> s; // Stack to track indices for next greater element
        
        // Traverse the values array to find next greater element for each node
        for (int i = 0; i < n; ++i) {
            // Check if current value is greater than values at indices in the stack
            while (!s.empty() && values[i] > values[s.top()]) {
                result[s.top()] = values[i];
                s.pop();
            }
            s.push(i); // Push the current index
        }
        
        return result; // Result array with next greater values
    }
};

// Helper function to create a linked list from an array
ListNode* createLinkedList(const vector<int>& values) {
    ListNode dummy(0);
    ListNode* current = &dummy;
    for (int value : values) {
        current->next = new ListNode(value);
        current = current->next;
    }
    return dummy.next;
}

// Main function for testing
int main() {
    vector<int> list_values = {2, 1, 5};
    ListNode* head = createLinkedList(list_values);

    Solution solution;
    vector<int> result = solution.nextLargerNodes(head);

    cout << "Next greater nodes: ";
    for (int val : result) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}
```
