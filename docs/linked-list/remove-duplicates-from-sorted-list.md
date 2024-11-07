---
id: remove-duplicates-from-sorted-list
sidebar_position: 1
title: "Remove Duplicates from Sorted Linked Lists"
description: "This tutorial explains how to remove duplicates from sorted list using Cpp."
sidebar_label: "Linked List Intersection"
tags: [dsa, linked-lists,cpp]
---

# Remove Duplicates from Sorted List

## Problem Statement

Given the head of a sorted linked list, remove all duplicates such that each element appears only once. Return the modified linked list, which remains sorted.

### Example

**Input:**
- `head = [1,1,2]`

**Output:**
- `[1,2]`

### Constraints
- The list is sorted in non-decreasing order.
- The output should retain the sorted order with no duplicate values.

## Solution Explanation

To remove duplicates from the sorted linked list:
1. **Single Pass with Current Pointer**:
   - Use a pointer (`current`) to traverse the list.
   - At each node, compare the value of `current` with `current->next`.
   - If the values are the same, update the `next` pointer of `current` to skip the duplicate node.
   - If the values are different, move `current` to the next node.
2. **End Condition**:
   - Continue the process until `current` reaches the end of the list.
3. **In-place Modification**:
   - This algorithm modifies the list in place without additional data structures.

### Complexity
- **Time Complexity**: `O(n)`, where `n` is the number of nodes in the linked list, as we traverse each node once.
- **Space Complexity**: `O(1)`, as it operates in constant space by modifying the list in place.

## Code Implementation

Here’s the C++ code for removing duplicates from a sorted linked list:

```cpp
#include <iostream>
#include<vector>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if (!head) return nullptr; // If list is empty, return null
        
        ListNode* current = head; // Start with the head of the list

        // Traverse the list
        while (current && current->next) {
            if (current->val == current->next->val) {
                // Skip the duplicate node
                ListNode* duplicate = current->next;
                current->next = duplicate->next;
                delete duplicate; // Free memory for the duplicate node
            } else {
                // Move to the next distinct element
                current = current->next;
            }
        }
        
        return head; // Return the modified list without duplicates
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

// Helper function to print a linked list
void printLinkedList(ListNode* head) {
    while (head) {
        cout << head->val;
        if (head->next) cout << " -> ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    vector<int> list_values = {1, 1, 2};
    ListNode* head = createLinkedList(list_values);

    cout << "Original List: ";
    printLinkedList(head);

    Solution solution;
    ListNode* modifiedHead = solution.deleteDuplicates(head);

    cout << "List after removing duplicates: ";
    printLinkedList(modifiedHead);

    return 0;
}
```