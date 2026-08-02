---
id: palindrome-linked-list-problem
title: Palindrome Linked List
sidebar_label: Palindrome Linked List
description: >-
  This document explains the Palindrome Linked List problem, including its
  description, approach, and implementation.
tags:
  - dsa
  - algorithms
  - problem-solving
companies:
  - Meta
---

# Palindrome Linked List

## Problem Statement
Determine if a linked list is a palindrome.

## Video Explanation

<LiteYouTubeEmbed
  id="qf6qp7GzD5Q"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L6. Odd Even Linked List | Multiple Approaches"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode *prev = nullptr, *curr = slow, *next = nullptr;
        while (curr) {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        ListNode *p1 = head, *p2 = prev;
        while (p2) {
            if (p1->val != p2->val) return false;
            p1 = p1->next;
            p2 = p2->next;
        }
        return true;
    }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null, curr = slow, next = null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        ListNode p1 = head, p2 = prev;
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

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

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var isPalindrome = function(head) {
    if (!head || !head.next) return true;
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let prev = null, curr = slow;
    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    let p1 = head, p2 = prev;
    while (p2) {
        if (p1.val !== p2.val) return false;
        p1 = p1.next;
        p2 = p2.next;
    }
    return true;
};
```

  </TabItem>
</Tabs>
