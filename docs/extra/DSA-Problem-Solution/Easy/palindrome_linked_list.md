---
id: palindrome-linked-list-problem
sidebar_position: 5
title: Palindrome Linked List
sidebar_label: Palindrome Linked List
description: "This document explains the Palindrome Linked List problem, including its description, approach, and implementation."
tags: [dsa, algorithms, problem-solving]
---

# Palindrome Linked List

## Problem Statement
Determine if a linked list is a palindrome.

## Approach
To check if the linked list is a palindrome, we can use the fast and slow pointer technique to find the middle of the list, then reverse the second half and compare it with the first half.

### Steps:

1. **Find the Middle**:  
   - Use two pointers to find the midpoint of the list

2. **Reverse the Second Half**:  
   - Reverse the second half of the list.

3. **Compare**:  
   - Compare the first half and the reversed second half.

4. **Return**:  
   - Return true if they are equal; otherwise, return false.

## Python Implementation

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head:
            return True

        # Step 1: Find the middle
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Step 2: Reverse the second half
        prev = None
        while slow:
            next_node = slow.next
            slow.next = prev
            prev = slow
            slow = next_node

        # Step 3: Compare the two halves
        left, right = head, prev
        while right:  # Only need to compare the second half
            if left.val != right.val:
                return False
            left = left.next
            right = right.next

        return True
```
Time Complexity: O(n) <br /> 
Space Complexity: O(1)    