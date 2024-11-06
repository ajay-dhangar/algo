---
id: max-twin-sum
sidebar_position: 1
title: "Maximum Twin Sum of Linked List"
description: "This tutorial explains how to find the maximum twin sum in a linked list using C."
sidebar_label: "Max Twin Sum"
tags: [dsa, linked-lists, c]
---

# Maximum Twin Sum of Linked List

## Problem Statement

In a linked list with an even number of nodes (size n), certain nodes are designated as "twins." Specifically, the i-th node (starting from index 0) is paired with the (n−1−i)-th node as its twin, for all i such that 0≤i≤(n/2)-1. In other words, the first node is paired with the last node, the second node with the second-last node, and so on, up to the midpoint of the list.

For example, in a linked list of 4 nodes, node 0 is the twin of node 3, and node 1 is the twin of node 2. Each pair has a "twin sum," which is simply the sum of the values of the two nodes in the pair. The goal is to find the maximum twin sum among all such twin pairs in the linked list.

### Example

**Input:**
- `head = [5,4,2,1]`

**Output:**
- `6`

**Explanation:**
- Nodes 0 and 1 are the twins of nodes 3 and 2, respectively.
- All twin pairs have a twin sum of 6.
- There are no other nodes with twins in the linked list.
- Thus, the maximum twin sum of the linked list is 6.

## Solution Explanation

To solve this problem efficiently:

1. **Reverse the Second Half of the List**:
   - First, we traverse the list to find its middle point.
   - We then reverse the second half of the list so that we can easily compare the corresponding twin nodes.
   
2. **Calculate Twin Sum**:
   - After reversing the second half, we can iterate through the first half of the list and the reversed second half simultaneously to compute the twin sum for each pair.
   - Keep track of the maximum twin sum as we traverse both halves.

3. **Return Maximum Twin Sum**:
   - Finally, after traversing all pairs, return the maximum twin sum.

### Time and Space Complexity:
- **Time Complexity**: `O(n)`, where `n` is the number of nodes in the list. We traverse the list twice: once for finding the middle and reversing the second half, and once for calculating the twin sums.
- **Space Complexity**: `O(1)`, as we modify the list in place and do not use any extra data structures.

## Code Implementation

Here’s the C code for finding the maximum twin sum in a linked list:

```c
#include <stdio.h>
#include <stdlib.h>

// Definition for singly-linked list.
struct ListNode {
    int val;
    struct ListNode *next;
};

// Function to reverse the linked list
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    struct ListNode* next = NULL;

    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Function to find the maximum twin sum
int pairSum(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;

    // Find the middle of the list using slow and fast pointers
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // Reverse the second half of the list
    struct ListNode* secondHalf = reverseList(slow);
    struct ListNode* firstHalf = head;

    int maxSum = 0;

    // Calculate the twin sum for each pair
    while (secondHalf != NULL) {
        int currentSum = firstHalf->val + secondHalf->val;
        maxSum = (currentSum > maxSum) ? currentSum : maxSum;
        
        firstHalf = firstHalf->next;
        secondHalf = secondHalf->next;
    }

    return maxSum;
}

// Helper function to create a linked list from an array
struct ListNode* createLinkedList(int* values, int size) {
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* current = dummy;
    for (int i = 0; i < size; i++) {
        current->next = (struct ListNode*)malloc(sizeof(struct ListNode));
        current = current->next;
        current->val = values[i];
    }
    return dummy->next;
}

// Helper function to print a linked list
void printLinkedList(struct ListNode* head) {
    struct ListNode* current = head;
    while (current != NULL) {
        printf("%d", current->val);
        if (current->next != NULL) {
            printf("->");
        }
        current = current->next;
    }
    printf("\n");
}

int main() {
    // Example input
    int values[] = {5, 4, 2, 1};

    struct ListNode* head = createLinkedList(values, 4);

    // Print the original list
    printf("Original List: ");
    printLinkedList(head);

    // Find the maximum twin sum
    int result = pairSum(head);

    // Output the result
    printf("Maximum Twin Sum: %d\n", result);

    return 0;
}
```