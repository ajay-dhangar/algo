---
id: swap-kth-nodes
sidebar_position: 1
title: "Swap kth Node from Beginning and End"
description: "This tutorial explains how to swap the kth node from the beginning and kth node from the end of a linked list."
sidebar_label: "Linked List Swapping"
tags: [dsa, linked-lists]
---

# Swap kth Node from Beginning and End

## Problem Statement

Given the head of a linked list and an integer `k`, return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

### Example

**Input:**
- `head = [1, 2, 3, 4, 5]`
- `k = 2`

**Output:**
- `[1, 4, 3, 2, 5]`

## Solution Explanation

To swap the kth node from the beginning with the kth node from the end:
1. **Find the kth node from the beginning**: 
   - Traverse the list until the kth node is reached using a pointer (`first`).
2. **Find the kth node from the end**:
   - Traverse the list again but from the head and stop at the `n-k+1`th node using a pointer (`second`), where `n` is the length of the list.
3. **Swap the values of the two nodes**:
   - Swap the `val` fields of the two nodes.

### Complexity
- **Time Complexity**: `O(n)`, where `n` is the number of nodes in the list, as we traverse the list twice.
- **Space Complexity**: `O(1)`, as we use only a few extra pointers for the operation.

## Code Implementation

Here’s the C++ code to swap the kth node from the beginning and the kth node from the end:

```cpp
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode *first = head, *second = head, *current = head;
        int length = 0;

        // Find the length of the list
        while (current != nullptr) {
            length++;
            current = current->next;
        }

        // Find the kth node from the beginning
        for (int i = 1; i < k; i++) {
            first = first->next;
        }

        // Find the kth node from the end
        for (int i = 1; i < length - k + 1; i++) {
            second = second->next;
        }

        // Swap the values of the two nodes
        swap(first->val, second->val);

        return head;
    }
};

// Helper function to create a linked list from an array
ListNode* createLinkedList(int* values, int size) {
    ListNode* dummy = new ListNode(0);
    ListNode* current = dummy;
    for (int i = 0; i < size; i++) {
        current->next = new ListNode(values[i]);
        current = current->next;
    }
    return dummy->next;
}

// Helper function to print a linked list
void printLinkedList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val;
        if (head->next != nullptr) {
            cout << "->";
        }
        head = head->next;
    }
    cout << endl;
}

int main() {
    // Example input
    int listValues[] = {1, 2, 3, 4, 5};
    int k = 2;

    ListNode* head = createLinkedList(listValues, 5);

    cout << "Original List: ";
    printLinkedList(head);

    Solution solution;
    ListNode* modifiedHead = solution.swapNodes(head, k);

    cout << "Modified List: ";
    printLinkedList(modifiedHead);

    return 0;
}
``