---
id: odd-even-linked-list
sidebar_position: 1
title: Odd Even Linked List
sidebar_label: Odd Even Linked List
description: "This document explains the Odd Even Linked List problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Odd Even Linked List

## Description

Given a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices. Please note that the even indexed nodes should maintain their relative order. The same goes for the odd indexed nodes.

### Note:
- The head of the odd indexed list should point to the head of the even indexed list after rearranging.

## Approach

To solve this problem, we can use two pointers to separate the odd and even indexed nodes while maintaining their relative order. The approach involves:
1. Initializing two pointers, `odd` and `even`, to point to the first node and the second node, respectively.
2. Using a pointer `even_head` to keep track of the head of the even indexed list.
3. Iterating through the list and rearranging the `next` pointers for odd and even nodes.
4. At the end of the iteration, connecting the last odd node to the head of the even indexed list.

## Python Implementation

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # If the list is empty or has only one node, return it as is
        if not head or not head.next:
            return head
        
        # Initialize pointers for the odd and even nodes
        odd = head
        even = head.next
        evenHead = even  # Store the head of the even list to connect later
        
        # Traverse the list and rearrange odd and even nodes
        while even and even.next:
            # Link the current odd node to the next odd node
            odd.next = even.next
            odd = odd.next  # Move the odd pointer forward
            
            # Link the current even node to the next even node
            even.next = odd.next
            even = even.next  # Move the even pointer forward
        
        # Connect the last odd node to the head of the even list
        odd.next = evenHead
        
        return head
```        
Time Complexity: O(n) <br />
Space Complexity: O(1)