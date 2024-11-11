---
id: intersection-linked-lists-python
sidebar_position: 1
title: "Find the Intersection Point of Two Linked Lists in Python using hash set"
description: "This tutorial explains how to find the intersection point of two singly linked lists using Python."
sidebar_label: "Linked List Intersection"
tags: [dsa, linked-lists, intersection,python,hash-set]
---

# Intersection of Two Linked Lists

## Problem Statement

In a linked list, the intersection of two lists occurs when two linked lists share a common node. Given two linked lists, this problem aims to find the node where the two lists intersect. If they do not intersect, the result should be `None`.

### Example

Consider the following two linked lists:

- **List A**: `1 -> 2 -> 3`
- **List B**: `4 -> 5`
- Both lists intersect at the node with value `3`.

The expected output in this case is:


## Approach

To solve this problem, we can use a hash set to store the nodes of the first linked list. As we traverse the second linked list, we can check if any node exists in the set. If we find a match, that node is the intersection point.

### Steps:

1. Traverse the first linked list and add each node to a set.
2. Traverse the second linked list and check if any node is in the set.
3. If a node is found in the set, return that node as the intersection.
4. If no nodes match, return `None`.

## Python Code

Below is the implementation of the solution in Python:

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        # Using a set to store the nodes of the first linked list
        seen_nodes = set()
        curr = headA
        
        while curr:
            seen_nodes.add(curr)  # Add the current node to the set
            curr = curr.next
        
        curr2 = headB
        while curr2:
            if curr2 in seen_nodes:  # Check if current node is in the set
                return curr2  # Intersection found
            curr2 = curr2.next
        
        return None  # No intersection

# Helper function to create a linked list from a list
def create_linked_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for value in values[1:]:
        curr.next = ListNode(value)
        curr = curr.next
    return head

# Example usage
if __name__ == "__main__":
    # Create linked lists for the example
    # List A: 1 -> 2 -> 3
    # List B: 4 -> 5
    # Intersection at node with value 3
    intersection_node = ListNode(3)
    
    headA = create_linked_list([1, 2])
    headA.next.next = intersection_node  # Connect intersection
    headB = create_linked_list([4, 5])
    headB.next.next = intersection_node  # Connect intersection

    solution = Solution()
    intersection = solution.getIntersectionNode(headA, headB)

    if intersection:
        print(f"Intersection at node with value: {intersection.val}")
    else:
        print("No intersection")
```        