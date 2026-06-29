---
id: linked-list-cycle
title: "Linked List Cycle"
sidebar_label: Linked List Cycle
description: "Solving the Linked List Cycle problem using Floyd's Cycle-Finding Algorithm."
tags: [DSA, leetcode, linked-list, two-pointers]
---

## Description:

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter.**

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

**Example 1:**

Input: `head = [3,2,0,-4], pos = 1`
Output: `true`
**Explanation:** There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

**Example 2:**

Input: `head = [1,2], pos = 0`
Output: `true`
**Explanation:** There is a cycle in the linked list, where the tail connects to the 0th node.

**Example 3:**

Input: `head = [1], pos = -1`
Output: `false`
**Explanation:** There is no cycle in the linked list.

---

## Approaches:

### 1. Floyd's Cycle-Finding Algorithm (Tortoise and Hare)

The most optimal way to detect a cycle in a linked list without using extra memory is the **Two Pointer** technique, specifically Floyd's Cycle-Finding Algorithm. 

We use two pointers moving at different speeds:
- A **slow** pointer (the tortoise) that moves one step at a time.
- A **fast** pointer (the hare) that moves two steps at a time.

1. **Initialize:** Start both the `slow` and `fast` pointers at the `head` of the linked list.
2. **Traverse:** Loop through the list. In each iteration, move the `slow` pointer by one node and the `fast` pointer by two nodes.
3. **Check for Cycle:** - If there is no cycle, the `fast` pointer will eventually reach the end of the list (i.e., `fast` or `fast.next` becomes `null`). In this case, we return `false`.
   - If there is a cycle, the `fast` pointer will loop around and eventually "lap" the `slow` pointer. If `slow` and `fast` ever point to the exact same node, a cycle exists, and we return `true`.

### Complexity
* **Time Complexity:** $O(N)$ where $N$ is the number of nodes in the linked list. In the worst case, if there is a cycle, the fast pointer will catch the slow pointer in less than $N$ iterations. If there is no cycle, the fast pointer reaches the end in $N/2$ iterations.
* **Space Complexity:** $O(1)$. We only use two pointers, regardless of the size of the linked list.

---

## Solutions:

### C++
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * ListNode *next;
 * ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;
        
        while (fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
            
            if (slow == fast) {
                return true;
            }
        }
        
        return false;
    }
};
```

### Java
```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 * int val;
 * ListNode next;
 * ListNode(int x) {
 * val = x;
 * next = null;
 * }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow == fast) {
                return true;
            }
        }
        
        return false;
    }
}
```

### Python
```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
            if slow == fast:
                return True
                
        return False
```

### JavaScript
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 * this.val = val;
 * this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
};
```