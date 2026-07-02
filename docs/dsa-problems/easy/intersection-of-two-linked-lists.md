---
id: intersection-of-two-linked-lists
title: "Intersection of Two Linked Lists"
sidebar_label: Intersection of Two Linked Lists
description: "Solving the Intersection of Two Linked Lists problem using an optimal two-pointer approach."
tags: [DSA, leetcode, linked-list, two-pointers]
---

## Description:

Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.

The test cases are generated such that there are no cycles anywhere in the entire linked structure.

**Note:** The linked lists must retain their original structure after the function returns.

**Example 1:**

Input: `intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3`
Output: `Intersected at '8'`
**Explanation:** The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.

**Example 2:**

Input: `intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2`
Output: `No intersection`
**Explanation:** From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
The two lists do not intersect, so return null.

---

## Approaches:

### 1. Optimal Two-Pointer Approach

A naive approach would be to store the nodes of the first list in a Hash Set, which takes extra memory, or to calculate the lengths of both lists first. However, we can solve this brilliantly in a single pass using two pointers.

The core idea is to compensate for the difference in lengths between the two linked lists. 

1. **Initialize:** Create two pointers, `ptrA` and `ptrB`, starting at `headA` and `headB` respectively.
2. **Traverse:** Move both pointers forward one node at a time.
3. **Switch Tracks:** - When `ptrA` reaches the end of list A (becomes `null`), redirect it to the head of list B.
   - When `ptrB` reaches the end of list B (becomes `null`), redirect it to the head of list A.
4. **Collision:** Because both pointers will eventually travel the exact same total distance (`length of A + length of B`), they are guaranteed to collide at the exact intersection node! 
   - If there is no intersection, they will both reach the end of their second list (become `null`) at the exact same time, successfully exiting the loop and returning `null`.

### Complexity
* **Time Complexity:** $O(M + N)$ where $M$ is the length of `listA` and $N$ is the length of `listB`. In the worst-case scenario (no intersection), each pointer traverses both lists exactly once.
* **Space Complexity:** $O(1)$. We only use two pointers, requiring constant extra memory regardless of the list sizes.

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;
        
        ListNode *ptrA = headA;
        ListNode *ptrB = headB;
        
        while (ptrA != ptrB) {
            // If ptrA reaches the end, switch to headB. Otherwise, move to next.
            ptrA = ptrA ? ptrA->next : headB;
            // If ptrB reaches the end, switch to headA. Otherwise, move to next.
            ptrB = ptrB ? ptrB->next : headA;
        }
        
        return ptrA;
    }
};
```

### Java
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 * int val;
 * ListNode next;
 * ListNode(int x) {
 * val = x;
 * next = null;
 * }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        
        ListNode ptrA = headA;
        ListNode ptrB = headB;
        
        while (ptrA != ptrB) {
            // If ptrA reaches the end, switch to headB. Otherwise, move to next.
            ptrA = (ptrA == null) ? headB : ptrA.next;
            // If ptrB reaches the end, switch to headA. Otherwise, move to next.
            ptrB = (ptrB == null) ? headA : ptrB.next;
        }
        
        return ptrA;
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
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        if not headA or not headB:
            return None
            
        ptrA, ptrB = headA, headB
        
        while ptrA != ptrB:
            # If ptrA reaches the end, switch to headB. Otherwise, move to next.
            ptrA = ptrA.next if ptrA else headB
            # If ptrB reaches the end, switch to headA. Otherwise, move to next.
            ptrB = ptrB.next if ptrB else headA
            
        return ptrA
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    
    let ptrA = headA;
    let ptrB = headB;
    
    while (ptrA !== ptrB) {
        // If ptrA reaches the end, switch to headB. Otherwise, move to next.
        ptrA = ptrA ? ptrA.next : headB;
        // If ptrB reaches the end, switch to headA. Otherwise, move to next.
        ptrB = ptrB ? ptrB.next : headA;
    }
    
    return ptrA;
};
```