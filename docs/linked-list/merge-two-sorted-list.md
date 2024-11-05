---
id: merge-two-sorted-list
sidebar_position: 1
title: "Merge Two Sorted Linked Lists"
description: "This tutorial explains how to merge two sorted list using Cpp."
sidebar_label: "Linked List Intersection"
tags: [dsa, linked-lists, merge,cpp]
---
# Merge Two Sorted Linked Lists

## Problem Statement

Given two sorted linked lists, the task is to merge them into one sorted linked list. The merged linked list should be created by splicing together the nodes of the input lists.

### Example

**Input:**
- `list1 = [1, 2, 4]`
- `list2 = [1, 3, 4]`

**Output:**
- `Merged List: 1 -> 1 -> 2 -> 3 -> 4 -> 4`

### Constraints
- Both lists are sorted in non-decreasing order.
- The output should maintain the sorted order by merging nodes directly from the input lists.

## Solution Explanation

To merge the two sorted linked lists:
1. **Dummy Node and Tail**: Start with a dummy node to simplify list manipulation. Use a `tail` pointer to keep track of the last node in the merged list.
2. **Comparison and Insertion**:
   - Traverse both lists. For each pair of nodes from the two lists, attach the smaller node to the `tail` and move to the next node in that list.
3. **Remaining Nodes**:
   - Once one list is exhausted, link the rest of the nodes from the remaining list to the `tail`.
4. **Return Merged List**:
   - The merged list starts from `dummy.next` since `dummy` is just a placeholder.

### Complexity
- **Time Complexity**: `O(n + m)`, where `n` and `m` are the lengths of the two input lists.
- **Space Complexity**: `O(1)` (in-place merging without additional data structures).

## Code Implementation

Here’s the C++ code for merging two sorted linked lists:

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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0); // Dummy node to start the merged list
        ListNode* tail = &dummy;

        // Merge the lists by comparing nodes
        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }

        // Attach the remaining nodes, if any
        tail->next = list1 ? list1 : list2;

        return dummy.next; // Return the head of the merged list
    }
};
```