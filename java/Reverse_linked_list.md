---
id: reverse-linked-list
sidebar_position: 1 
title: Reverse Linked List 
sidebar_label: Reverse Linked List 
description: "This document explains reversing a linked list in java." 
tags: [java, data structures, linked list]
---

# *Reversing a Linked List*

## *Description*

Given a singly linked list, reverse the order of its nodes.

## *Approach*

- *Steps:*

1. Initialize three pointers: `prev`, `cur`, and `next`.
2. Traverse the linked list.
3. In each iteration, reverse the `next` pointer of the current node.
4. Move `prev` and `cur` one step forward.

## *Java Implementation*

```
public class LinkedList {
    static Node head;

    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    public static void reverse() {
        Node prev = null;
        Node cur = head;
        Node next = null;

        while (cur != null) {
            next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }

        head = prev;
    }

    public static void printList() {
        Node temp = head;

        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.head = new Node(1);
        list.head.next = new Node(2);
        list.head.next.next = new Node(3);
        list.head.next.next.next = new Node(4);
        list.head.next.next.next.next = new Node(5);

        System.out.println("Original List: ");
        printList();

        reverse();

        System.out.println("Reversed List: ");
        printList();
    }
}
```

- *Time Complexity*: O(n), where n is the number of nodes.

- *Space Complexity*: O(1), as only a constant amount of space is used.

# *Conclusion*
In this article, we learned about reversing a linked list and implemented it in Java.
