---
id: floyds-cycle-detection
title: Floyd's Cycle Detection Algorithm
sidebar_label: Floyd's Cycle Detection
sidebar_position: 3
description: 'Floyd’s Cycle Detection Algorithm, also called the Tortoise and Hare Algorithm, is a method used to detect cycles in a linked list. It uses two pointers that move at different speeds through the list to determine if a cycle exists.'
tags: [dsa, algorithms, cycle-detection, linkedList]
---

### Introduction

Floyd's Cycle Detection Algorithm, also known as the **Tortoise and Hare** algorithm, is a two-pointer technique used to detect the presence of a cycle in a linked list. Named after the story of the tortoise and the hare, the algorithm relies on two pointers moving at different speeds—one fast and one slow—to identify if a loop exists in a linked list.

The algorithm efficiently detects cycles with a time complexity of $O(n)$ and does not require extra space, making it a more memory-efficient solution compared to hash-based methods.

### How the Algorithm Works

Imagine you have a circular race track, and two runners are running around it. One is slower (the tortoise), and the other is faster (the hare). If the track is circular (i.e., there is a cycle), the faster runner will eventually lap the slower runner. This same concept is applied in Floyd's algorithm for linked lists:

1. **Two Pointers (Tortoise and Hare)**:
   - The **Tortoise** moves one step at a time.
   - The **Hare** moves two steps at a time.
   
2. **Cycle Detection**:
   - If the linked list has a cycle, the hare will eventually meet the tortoise inside the loop.
   - If the hare reaches the end of the list (`NULL`), the list is cycle-free.

### Applications

- **Cycle Detection in Linked Lists**: The algorithm is widely used in detecting cycles in singly linked lists, particularly in problems related to data structures and algorithms.
- **Cycle Detection in Graphs**: Though not limited to linked lists, variations of this algorithm are also applied to detect cycles in directed and undirected graphs.
- **Fast and Memory-Efficient**: Unlike using hash sets to store visited nodes, Floyd's algorithm uses constant space.

### Algorithm Steps

1. Initialize two pointers, `slow` and `fast`, both starting at the head of the linked list.
2. Move the `slow` pointer one step at a time and the `fast` pointer two steps at a time.
3. If there is a cycle, the `slow` and `fast` pointers will eventually meet.
4. If the `fast` pointer reaches the end of the list (i.e., encounters `NULL`), there is no cycle.

### Pseudocode

```text
Function detectCycle(head):
    If head is NULL:
        Return False
    Initialize slow = head and fast = head
    While fast is not NULL and fast.next is not NULL:
        Move slow by one node (slow = slow.next)
        Move fast by two nodes (fast = fast.next.next)
        If slow == fast:
            Return True  # Cycle detected
    Return False  # No cycle detected
```
### Implementation in C++

```cpp
#include <iostream>
using namespace std;

class ListNode {
public:
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    if (!head || !head->next) return false;

    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}

// Example usage
int main() {
    ListNode* head = new ListNode(3);
    head->next = new ListNode(2);
    head->next->next = new ListNode(0);
    head->next->next->next = new ListNode(-4);
    head->next->next->next->next = head->next; // Creating a cycle

    if (hasCycle(head)) {
        cout << "Cycle detected!" << endl;
    } else {
        cout << "No cycle." << endl;
    }

    return 0;
}
```
### Time and Space Complexity
- Time Complexity: $O(n)$
In the worst case, both pointers will traverse the entire list once.
- Space Complexity: $O(1)$
This algorithm only uses a constant amount of extra memory, regardless of the size of the input.
