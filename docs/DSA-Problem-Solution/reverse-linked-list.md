---
id: reverse-linked-list
sidebar_position: 1
title: Reverse Linked List
sidebar_label: Reverse Linked List
description: "This document explains the Reverse Linked List problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Reverse Linked List

## Description
Given the head of a singly linked list, reverse the list, and return the reversed list.

## Approach

To reverse the linked list, we iterate through the list and reverse the `next` pointers of each node. We use three pointers (`prev`, `current`, and `next_node`) to track and reverse the list iteratively.

### Steps:

1. **Initialize**:  
   - Set `prev` to `None` and `current` to the head of the list.

2. **Iterate**:  
   - Traverse each node in the list.
   - Save the next node in `next_node`.
   - Reverse the pointer of `current` to point to `prev`.
   - Move `prev` and `current` one step forward.

3. **Return**:  
   - After the loop, `prev` points to the new head of the reversed list.

## Python Implementation

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        current = head
        
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        return prev
```
Time Complexity: O(n) <br />
Space Complexity: O(1)        
