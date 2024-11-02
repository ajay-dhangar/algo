---
id: add-two-numbers-as-linked-lists
title: "Add two numbers represented as linked lists"
sidebar_label:  "Addition"
sidebar_position: 11
description: "This document provides a detailed explanation and implementation for adding two numbers represented as linked lists, including step-by-step instructions and example code."
tags: [Linked list]
---

# Adding Two Numbers Represented as Linked Lists

## Problem Statement

Given two linked lists, where each node contains a single digit, add the two numbers represented by these linked lists and return the result as a new linked list. The digits are stored in reverse order, meaning the head of the list contains the least significant digit.

## Steps to Solve the Problem

1. **Initialization**: 
   - Create a new linked list to store the result.
   - Use a pointer (or current node) to traverse the result list.
   - Initialize a variable to keep track of carry from the addition.

2. **Traverse Both Lists**: 
   - Use a loop to traverse both linked lists until both are fully processed.
   - At each step, retrieve the current digits from both linked lists (if available) and add them along with any carry from the previous step.

3. **Calculate Sum**: 

 - The sum for each position is calculated as:
          sum = digit1 + digit2 + carry

 - The new digit to add to the result is:
 new digit = sum mod 10

- The carry for the next position is:
  carry = sum // 10


4. **Create New Nodes**: 
   - Create a new node with the calculated new digit and attach it to the result list.
   - Move the current pointer of the result list to the new node.

5. **Handle Remaining Carry**: 
   - After the loop, if there is a carry left, create a new node for it.

6. **Return the Result**: 
   - Return the head of the result linked list.

## Example

**Input**:
```
 List1: `2 -> 4 -> 3` (represents the number 342)
 List2: `5 -> 6 -> 4` (represents the number 465)
```

**Process**:
- Start with carry = 0.
- Add the digits:
```
  - (3 + 4 + 0 = 7) → New list: `7`
  - (4 + 6 + 0 = 10) → New list: `7 -> 0` (carry = 1)
  - (2 + 5 + 1 = 8) → New list: `7 -> 0 -> 8`
  ```

**Output**:
```
- Result: `7 -> 0 -> 8` (represents the number 807)
```

## Java Code Implementation

```java
// Definition for singly-linked list.
class ListNode {
    int val; // Value of the node
    ListNode next; // Pointer to the next node

    ListNode(int val) {
        this.val = val;
        this.next = null; // Initialize next to null
    }
}

public class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyHead = new ListNode(0); // Dummy head for the result list
        ListNode current = dummyHead; // Pointer for the current node in the result
        int carry = 0; // Variable to store carry value

        // Loop until both lists are processed and no carry remains
        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0; // Get value from l1 or 0
            int val2 = (l2 != null) ? l2.val : 0; // Get value from l2 or 0

            int sum = val1 + val2 + carry; // Calculate sum
            carry = sum / 10; // Update carry for next iteration
            current.next = new ListNode(sum % 10); // Create new node for the result
            current = current.next; // Move to the next node in the result

            // Move to the next nodes in l1 and l2
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        return dummyHead.next; // Return the head of the resulting linked list
    }

    // Example usage
    public static void main(String[] args) {
        // Create first linked list: 2 -> 4 -> 3 (represents 342)
        ListNode l1 = new ListNode(2);
        l1.next = new ListNode(4);
        l1.next.next = new ListNode(3);

        // Create second linked list: 5 -> 6 -> 4 (represents 465)
        ListNode l2 = new ListNode(5);
        l2.next = new ListNode(6);
        l2.next.next = new ListNode(4);

        // Create a solution object and add the two numbers
        Solution solution = new Solution();
        ListNode result = solution.addTwoNumbers(l1, l2);

        // Output the result
        System.out.print("Result: ");
        while (result != null) {
            System.out.print(result.val + " ");
            result = result.next;
        }
        // Output: Result: 7 0 8 (represents 807)
    }
}

```

## C++ Code Implementation

```cpp
#include <iostream>

// Definition for singly-linked list.
struct ListNode {
    int val; // Value of the node
    ListNode* next; // Pointer to the next node
    ListNode(int x) : val(x), next(nullptr) {} // Constructor
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummyHead = new ListNode(0); // Dummy head for the result list
        ListNode* current = dummyHead; // Pointer for the current node in the result
        int carry = 0; // Variable to store carry value

        // Loop until both lists are processed and no carry remains
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int val1 = (l1 != nullptr) ? l1->val : 0; // Get value from l1 or 0
            int val2 = (l2 != nullptr) ? l2->val : 0; // Get value from l2 or 0

            int sum = val1 + val2 + carry; // Calculate sum
            carry = sum / 10; // Update carry for next iteration
            current->next = new ListNode(sum % 10); // Create new node for the result
            current = current->next; // Move to the next node in the result

            // Move to the next nodes in l1 and l2
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }

        return dummyHead->next; // Return the head of the resulting linked list
    }
};

// Example usage
int main() {
    // Create first linked list: 2 -> 4 -> 3 (represents 342)
    ListNode* l1 = new ListNode(2);
    l1->next = new ListNode(4);
    l1->next->next = new ListNode(3);

    // Create second linked list: 5 -> 6 -> 4 (represents 465)
    ListNode* l2 = new ListNode(5);
    l2->next = new ListNode(6);
    l2->next->next = new ListNode(4);

    // Create a solution object and add the two numbers
    Solution solution;
    ListNode* result = solution.addTwoNumbers(l1, l2);

    // Output the result
    std::cout << "Result: ";
    while (result != nullptr) {
        std::cout << result->val << " ";
        result = result->next;
    }
    // Output: Result: 7 0 8 (represents 807)

    // Free memory (cleanup)
    delete l1->next->next;
    delete l1->next;
    delete l1;
    delete l2->next->next;
    delete l2->next;
    delete l2;
    // Free the result list nodes here as needed

    return 0;
}


```


## Python Code Implementation

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    dummy_head = ListNode(0)
    current = dummy_head
    carry = 0

    while l1 or l2 or carry:
        val1 = (l1.val if l1 else 0)
        val2 = (l2.val if l2 else 0)

        total = val1 + val2 + carry
        carry = total // 10
        current.next = ListNode(total % 10)

        current = current.next 
        if l1: l1 = l1.next
        if l2: l2 = l2.next

    return dummy_head.next
```
