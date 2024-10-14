---
id: intersection-linked-lists
sidebar_position: 1
title: "Find the Intersection Point of Two Linked Lists in C++"
description: "This tutorial explains how to find the intersection point of two singly linked lists using C++."
sidebar_label: "Linked List Intersection"
tags: [dsa, linked-lists, intersection]
---

## Linked List Intersection:

This tutorial provides a C++ implementation to find the intersection point of two singly linked lists. Intersection occurs when two lists share the same nodes after a certain point.

### Problem Statement:

Given two singly linked lists, find the node where the two linked lists intersect. Intersection is determined based on the reference of nodes, not the value.

### Approach:

The key steps in the approach are as follows:

1. **Count the Nodes in Each List**: Determine the number of nodes in both linked lists.
2. **Calculate the Difference**: Find the difference in the number of nodes between the two lists.
3. **Align the Longer List**: Traverse the longer list by the difference in lengths so that both lists now have an equal number of nodes left.
4. **Find the Intersection Point**: Traverse both lists simultaneously until the intersection is found by comparing the node addresses.

### C++ Implementation:

Here is the C++ code that implements this approach:

```cpp
#include <iostream>
using namespace std;

/* Node structure */
class Node {
public:
    int data;
    Node* next;
};

/* Function to count the number of nodes in a list */
int getCount(Node* head);

/* Function to get the intersection point of two linked lists */
int getIntersectionNode(Node* head1, Node* head2);

/* Helper function to find the intersection point */
int findIntersection(int diff, Node* head1, Node* head2);

/* Count the number of nodes in the linked list */
int getCount(Node* head) {
    int count = 0;
    Node* current = head;
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    return count;
}

/* Function to find the intersection node */
int getIntersectionNode(Node* head1, Node* head2) {
    int count1 = getCount(head1);
    int count2 = getCount(head2);
    int diff;

    if (count1 > count2) {
        diff = count1 - count2;
        return findIntersection(diff, head1, head2);
    } else {
        diff = count2 - count1;
        return findIntersection(diff, head2, head1);
    }
}

/* Function to find the intersection node after adjusting for the difference */
int findIntersection(int diff, Node* head1, Node* head2) {
    Node* current1 = head1;
    Node* current2 = head2;

    // Move the pointer of the longer list ahead by the difference in counts
    for (int i = 0; i < diff; i++) {
        if (current1 == nullptr) {
            return -1;
        }
        current1 = current1->next;
    }

    // Traverse both lists simultaneously to find the intersection point
    while (current1 != nullptr && current2 != nullptr) {
        if (current1 == current2) {
            return current1->data;
        }
        current1 = current1->next;
        current2 = current2->next;
    }

    return -1;
}

/* Driver Code */
int main() {
    Node* newNode;

    // Create two linked lists
    Node* head1 = new Node();
    head1->data = 10;
    Node* head2 = new Node();
    head2->data = 3;

    newNode = new Node();
    newNode->data = 6;
    head2->next = newNode;

    newNode = new Node();
    newNode->data = 9;
    head2->next->next = newNode;

    newNode = new Node();
    newNode->data = 15;
    head1->next = newNode;
    head2->next->next->next = newNode;

    newNode = new Node();
    newNode->data = 30;
    head1->next->next = newNode;

    head1->next->next->next = nullptr;

    cout << "The intersection point is " << getIntersectionNode(head1, head2) << endl;

    return 0;
}
```
## Explanation:

## Step 1: The function getCount() counts the number of nodes in each linked list.
## Step 2: The getIntersectionNode() function computes the difference between the lengths of the two lists and calls findIntersection() to adjust the longer list.
## Step 3: The findIntersection() function aligns both lists by moving the pointer of the longer list ahead by the difference in node counts, and then simultaneously traverses both lists to find the intersection.

Example Usage:


Given the following lists:
```
List 1: 10 -> 15 -> 30 -> NULL
List 2: 3 -> 6 -> 9 -> 15 -> 30 -> NULL
```
The output would be:
```
  The intersection point is 15
```
The intersection point is 15
Time Complexity:

Time Complexity: O(m + n), where m and n are the lengths of the two linked lists.

Space Complexity: O(1), since no additional space is required.


Applications:
This method is useful in several contexts:

Linked List Algorithms: Finding intersections is a common problem in linked list manipulation.
Networking: Detecting loops or intersections in routing tables.
Geometric Applications: Identifying overlapping paths or routes.

