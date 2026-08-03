---
id: reverse-linked-list
title: Reverse Linked List
sidebar_label: Reverse Linked List
description: >-
  This document explains the Reverse Linked List problem, including its
  description, approach, and implementation.
tags:
  - dsa
  - algorithms
  - problem-solving
companies:
  - Amazon
  - LinkedIn
  - Meta
  - Microsoft
---

# Reverse Linked List

## Description
Given the head of a singly linked list, reverse the list, and return the reversed list.

## Video Explanation

<LiteYouTubeEmbed
  id="sYcOK51hl-A"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Reverse a linked list - Iterative method"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

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

## Solutions

<Tabs groupId="programming-language">
  <TabItem value="cpp" label="C++" default>

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
   ListNode* reverseList(ListNode* head) {
      if(head == NULL || head->next == NULL) return head;
      ListNode* prev = NULL;
      ListNode* newHead = reverseList(head->next);
      head->next->next = head;
      head->next=prev;
      return newHead;
   }
};
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

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

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```javascript
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};
```

  </TabItem>
</Tabs>
