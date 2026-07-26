---
id: range-sum-of-linked-list
title: Range Sum of Linked List
sidebar_label: Range Sum of Linked List
description: 'Calculate the sum of node values within this range.'
tags: [dsa, data-structures, LinkedList]
---

### Range Sum of Linked List

Given a linked list and a range defined by start and end (0-indexed), calculate the sum of the node values within this range.

### Implementation in c++

```cpp
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

int rangeSum(ListNode* head, int start, int end) {
    int rangeSum = 0;         // Sum of values within the range
    int position = 0;          // Track the current position in the list
    ListNode* current = head;  // Pointer to traverse the list

    // Traverse the linked list
    while (current != nullptr) {
        // If the position is within the specified range, add to sum
        if (position >= start && position <= end) {
            rangeSum += current->val;
        }
        
        // Break if we've passed the end of the range
        if (position > end) {
            break;
        }

        // Move to the next node and increment the position
        current = current->next;
        position++;
    }

    return rangeSum;
}

int main() {
    // Creating a sample linked list: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);

    // Calculate the sum of node values from position 1 to 3 (inclusive)
    int start = 1;
    int end = 3;
    cout << "Range Sum: " << rangeSum(head, start, end) << endl;  // Output should be 2 + 3 + 4 = 9

    // Clean up the memory allocated for the linked list
    ListNode* temp;
    while (head != nullptr) {
        temp = head;
        head = head->next;
        delete temp;
    }

    return 0;
}
```

### Complexity

- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
