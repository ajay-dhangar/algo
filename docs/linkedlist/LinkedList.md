---
id: linkedlist-in-dsa
title: LinkedList in Data Structures and Algorithms
sidebar_label: LinkedList
sidebar_position: 2
description: "A linked list is a linear data structure in which elements are not stored in contiguous memory locations. Instead, each element, called a node, contains a data part and a reference (or link) to the next node in the sequence. Linked lists are used in various applications such as dynamic memory allocation, implementation of data structures like stacks and queues, and more."
tags:
  [
    dsa,
    data-structures,
    linkedlist,
    linked-list,
    linkedlist-data-structure,
    linkedlist-in-dsa,
    linkedlist-in-data-structure,
    linkedlist-in-algorithm,
    linkedlist-in-dsa-example,
    linkedlist-in-dsa-explanation,
    linkedlist-in-dsa-conclusion,
    linkedlist-in-dsa-importance,
    linkedlist-in-dsa-syntax,
    linkedlist-in-dsa-declaration,
    linkedlist-in-dsa-access,
    linkedlist-in-dsa-update,
    linkedlist-in-dsa-insertion,
    linkedlist-in-dsa-deletion,
    linkedlist-in-dsa-traversal,
    linkedlist-in-dsa-program,
    linkedlist-in-dsa-code,
    linkedlist-in-dsa-js,
    linkedlist-in-dsa-java,
    linkedlist-in-dsa-python,
    linkedlist-in-dsa-c,
    linkedlist-in-dsa-cpp,
    linkedlist-in-dsa-ts,
  ]
---

A linked list is a linear data structure in which elements are not stored in contiguous memory locations. Instead, each element, called a node, contains a data part and a reference (or link) to the next node in the sequence. Linked lists are used in various applications such as dynamic memory allocation, implementation of data structures like stacks and queues, and more.

## Why are Linked Lists important?

Linked lists are important because they provide a flexible way to store and manipulate data. They allow for efficient insertion and deletion of elements, which can be particularly useful in applications where the size of the data set changes frequently.

## How to declare a Linked List?

A linked list can be declared in various programming languages using the following syntax:

# LinkedList in Data Structures and Algorithms (DSA)

## Introduction

A linked list is a fundamental data structure in computer science that represents a sequence of nodes. Each node contains data and a reference to the next node in the sequence.

## Types of Linked Lists

- **Singly Linked List**: Each node points to the next node and the last node points to null.
- **Doubly Linked List**: Each node points to both the next and the previous nodes.
- **Circular Linked List**: The last node points to the first node, forming a circle.
- **Circular Doubly Linked List**: Combines properties of both circular and doubly linked lists.

## Basic Operations

- **Insertion**: Adding a node to the linked list.
- **Deletion**: Removing a node from the linked list.
- **Traversal**: Accessing each node of the linked list.
- **Search**: Finding a node with a specific value.
- **Update**: Modifying the value of an existing node.

## Why are Linked Lists important?

Linked lists are important because they provide a flexible way to store and manipulate data. They allow for efficient insertion and deletion of elements, which can be particularly useful in applications where the size of the data set changes frequently.

## How to declare a Linked List?

A linked list can be declared in various programming languages using the following syntax:

<Tabs>
    <TabItem value="js" label="JavaScript" default>
      
      ```js
      // Node class in JavaScript
      class Node {
        constructor(data) {
          this.data = data;
          this.next = null;
        }
      }
      
      // LinkedList class in JavaScript
      class LinkedList {
        constructor() {
          this.head = null;
        }
        
        // Add a node at the end
        append(data) {
          let newNode = new Node(data);
          if (this.head === null) {
            this.head = newNode;
            return;
          }
          let current = this.head;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      }
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Node class in Java
      class Node {
          int data;
          Node next;
          Node(int d) { data = d; next = null; }
      }
      
      // LinkedList class in Java
      public class LinkedList {
          Node head;
          
          // Add a node at the end
          public void append(int data) {
              Node newNode = new Node(data);
              if (head == null) {
                  head = newNode;
                  return;
              }
              Node current = head;
              while (current.next != null) {
                  current = current.next;
              }
              current.next = newNode;
          }
      }
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Node class in Python
      class Node:
          def __init__(self, data):
              self.data = data
              self.next = None
      
      # LinkedList class in Python
      class LinkedList:
          def __init__(self):
              self.head = None
          
          # Add a node at the end
          def append(self, data):
              new_node = Node(data)
              if self.head is None:
                  self.head = new_node
                  return
              last = self.head
              while last.next:
                  last = last.next
              last.next = new_node
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Node structure in C
      struct Node {
          int data;
          struct Node* next;
      };
      
      // LinkedList structure in C
      struct LinkedList {
          struct Node* head;
      };
      
      // Function to create a new node
      struct Node* createNode(int data) {
          struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
          newNode->data = data;
          newNode->next = NULL;
          return newNode;
      }
      
      // Function to add a node at the end
      void append(struct LinkedList* list, int data) {
          struct Node* newNode = createNode(data);
          if (list->head == NULL) {
              list->head = newNode;
              return;
          }
          struct Node* temp = list->head;
          while (temp->next != NULL) {
              temp = temp->next;
          }
          temp->next = newNode;
      }
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Node class in C++
      class Node {
      public:
          int data;
          Node* next;
          Node(int d) { data = d; next = nullptr; }
      };
      
      // LinkedList class in C++
      class LinkedList {
      public:
          Node* head;
          LinkedList() { head = nullptr; }
          
          // Add a node at the end
          void append(int data) {
              Node* newNode = new Node(data);
              if (head == nullptr) {
                  head = newNode;
                  return;
              }
              Node* current = head;
              while (current->next != nullptr) {
                  current = current->next;
              }
              current->next = newNode;
          }
      };
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Node class in TypeScript
      class Node {
          data: number;
          next: Node | null;
      
          constructor(data: number) {
              this.data = data;
              this.next = null;
          }
      }
      
      // LinkedList class in TypeScript
      class LinkedList {
          head: Node | null;
      
          constructor() {
              this.head = null;
          }
      
          // Add a node at the end
          append(data: number): void {
              let newNode = new Node(data);
              if (this.head === null) {
                  this.head = newNode;
                  return;
              }
              let current = this.head;
              while (current.next !== null) {
                  current = current.next;
              }
              current.next = newNode;
          }
      }
      ```
    </TabItem>
</Tabs>

## How to access a Linked List?

A linked list can be accessed by traversing the nodes starting from the head.

<Tabs>
    <TabItem value="js" label="JavaScript" default>
      
      ```js
      // Access elements in a LinkedList in JavaScript
      let list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      let current = list.head;
      while (current !== null) {
        console.log(current.data);
        current = current.next;
      }
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Access elements in a LinkedList in Java
      LinkedList list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      Node current = list.head;
      while (current != null) {
          System.out.println(current.data);
          current = current.next;
      }
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Access elements in a LinkedList in Python
      list = LinkedList()
      list.append(10)
      list.append(20)
      list.append(30)
      
      current = list.head
      while current:
          print(current.data)
          current = current.next
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Access elements in a LinkedList in C
      struct LinkedList list;
      list.head = NULL;
      append(&list, 10);
      append(&list, 20);
      append(&list, 30);
      
      struct Node* current = list.head;
      while (current != NULL) {
          printf("%d\n", current->data);
          current = current->next;
      }
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Access elements in a LinkedList in C++
      LinkedList list;
      list.append(10);
      list.append(20);
      list.append(30);
      
      Node* current = list.head;
      while (current != nullptr) {
          std::cout << current->data << std::endl;
          current = current->next;
      }
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Access elements in a LinkedList in TypeScript
      let list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      let current = list.head;
      while (current !== null) {
          console.log(current.data);
          current = current.next;
      }
      ```
    </TabItem>
</Tabs>

## How to update a Linked List?

A linked list can be updated by changing the data of a node directly.

<Tabs>
    <TabItem value="js" label="JavaScript" default>
      
      ```js
      // Update elements in a LinkedList in JavaScript
      let list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      let current = list.head;
      while (current !== null) {
        if (current.data === 20) {
          current.data = 25;
        }
        current = current.next;
      }
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Update elements in a LinkedList in Java
      LinkedList list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      Node current = list.head;
      while (current != null) {
          if (current.data == 20) {
              current.data = 25;
          }
          current = current.next;
      }
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Update elements in a LinkedList in Python
      list = LinkedList()
      list.append(10)
      list.append(20)
      list.append(30)
      
      current = list.head
      while current:
          if current.data == 20:
              current.data = 25
          current = current.next
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Update elements in a LinkedList in C
      struct LinkedList list;
      list.head = NULL;
      append(&list, 10);
      append(&list, 20);
      append(&list, 30);
      
      struct Node* current = list.head;
      while (current != NULL) {
          if (current->data == 20) {
              current->data = 25;
          }
          current = current->next;
      }
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Update elements in a LinkedList in C++
      LinkedList list;
      list.append(10);
      list.append(20);
      list.append(30);
      
      Node* current = list.head;
      while (current != nullptr) {
          if (current->data == 20) {
              current->data = 25;
          }
          current = current->next;
      }
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Update elements in a LinkedList in TypeScript
      let list = new LinkedList();
      list.append(10);
      list.append(20);
      list.append(30);
      
      let current = list.head;
      while (current !== null) {
          if (current.data === 20) {
              current.data = 25;
          }
          current = current.next;
      }
      ```
    </TabItem>
</Tabs>

## How to delete a node from a Linked List?

A node can be deleted from a linked list by adjusting the links of the adjacent nodes.

<Tabs>
    <TabItem value="js" label="JavaScript" default>
      
      ```js
      // Delete a node from a LinkedList in JavaScript
      class LinkedList {
        // ...
        delete(data) {
          if (this.head === null) return;
          if (this.head.data === data) {
            this.head = this.head.next;
            return;
          }
          let current = this.head;
          while (current.next !== null) {
            if (current.next.data === data) {
              current.next = current.next.next;
              return;
            }
            current = current.next;
          }
        }
      }
      ```
    </TabItem>
    <TabItem value="java" label="Java">
      
      ```java
      // Delete a node from a LinkedList in Java
      public class LinkedList {
          // ...
          public void delete(int data) {
              if (head == null) return;
              if (head.data == data) {
                  head = head.next;
                  return;
              }
              Node current = head;
              while (current.next != null) {
                  if (current.next.data == data) {
                      current.next = current.next.next;
                      return;
                  }
                  current = current.next;
              }
          }
      }
      ```
    </TabItem>
    <TabItem value="python" label="Python">
      
      ```python
      # Delete a node from a LinkedList in Python
      class LinkedList:
          # ...
          def delete(self, data):
              if self.head is None:
                  return
              if self.head.data == data:
                  self.head = self.head.next
                  return
              current = self.head
              while current.next:
                  if current.next.data == data:
                      current.next = current.next.next
                      return
                  current = current.next
      ```
    </TabItem>
    <TabItem value="c" label="C">
      
      ```c
      // Delete a node from a LinkedList in C
      void deleteNode(struct LinkedList* list, int data) {
          if (list->head == NULL) return;
          struct Node* temp = list->head;
          if (temp->data == data) {
              list->head = temp->next;
              free(temp);
              return;
          }
          struct Node* prev = NULL;
          while (temp != NULL && temp->data != data) {
              prev = temp;
              temp = temp->next;
          }
          if (temp == NULL) return;
          prev->next = temp->next;
          free(temp);
      }
      ```
    </TabItem>
    <TabItem value="cpp" label="C++">
      
      ```cpp
      // Delete a node from a LinkedList in C++
      class LinkedList {
          // ...
          void deleteNode(int data) {
              if (head == nullptr) return;
              Node* temp = head;
              if (temp->data == data) {
                  head = temp->next;
                  delete temp;
                  return;
              }
              Node* prev = nullptr;
              while (temp != nullptr && temp->data != data) {
                  prev = temp;
                  temp = temp->next;
              }
              if (temp == nullptr) return;
              prev->next = temp->next;
              delete temp;
          }
      };
      ```
    </TabItem>
    <TabItem value="ts" label="TypeScript">
      
      ```ts
      // Delete a node from a LinkedList in TypeScript
      class LinkedList {
        // ...
        delete(data: number) {
          if (this.head === null) return;
          if (this.head.data === data) {
            this.head = this.head.next;
            return;
          }
          let current = this.head;
          while (current.next !== null) {
            if (current.next.data === data) {
              current.next = current.next.next;
              return;
            }
            current = current.next;
          }
        }
      }
      ```
    </TabItem>
</Tabs>

## Applications of Linked Lists

- **Dynamic memory allocation**: Linked lists can efficiently manage memory allocation and deallocation.
- **Implementation of stacks and queues**: Linked lists provide the foundation for stack and queue data structures.
- **Graph representation**: Adjacency lists use linked lists to represent graphs.
- **Handling sparse matrices**: Linked lists efficiently store and manipulate sparse matrices.

## Common Linked List Problems

- **Reverse a Linked List**: Reversing the nodes of a linked list.
- **Detect a cycle in a Linked List**: Checking if a linked list contains a cycle.
- **Merge two sorted Linked Lists**: Combining two sorted linked lists into one sorted linked list.
- **Find the middle of a Linked List**: Finding the middle node in a linked list.

## Advanced Linked List Variants

- **Doubly Linked List**: A linked list where each node has references to both the next and previous nodes.
- **Circular Linked List**: A linked list where the last node points back to the first node.
- **Skip List**: A linked list with additional pointers for faster search.

## Resources and References

- **Books**:
  - "Introduction to Algorithms" by Cormen, Leiserson, Rivest, and Stein
  - "Data Structures and Algorithm Analysis in C" by Mark Allen Weiss
- **Online Courses**:
  - Coursera: Data Structures and Algorithms Specialization
  - edX: Data Structures Fundamentals
- **Websites**:
  - [GeeksforGeeks](https://www.geeksforgeeks.org)
  - [LeetCode](https://leetcode.com)
  - [HackerRank](https://www.hackerrank.com)

---

By understanding and mastering these linked list concepts and algorithms, you will be well-equipped to tackle a wide range of problems in data structures and algorithms.

## Conclusion

Linked lists are a fundamental data structure in computer science and play a crucial role in various applications and algorithms. This guide covers the essential concepts and operations associated with linked lists, providing a comprehensive understanding of how they work and how to implement them in different programming languages.

Understanding linked lists is crucial for solving numerous problems in computer science, from basic data manipulation to complex algorithms in dynamic memory allocation, graph representation, and more. The examples provided demonstrate how to work with linked lists efficiently, ensuring a robust foundation for tackling more advanced DSA concepts. Mastery of linked lists enhances your ability to handle data structures and perform operations crucial in both everyday programming and competitive coding.

Problems for Practice
To further practice and test your understanding of linked lists, consider solving the following problems from LeetCode:

1. Reverse Linked List
2. Linked List Cycle
3. Merge Two Sorted Lists
4. Remove Nth Node From End of List
5. Add Two Numbers

Engaging with these problems will help reinforce the concepts learned and provide practical experience in using linked lists effectively. By practicing these problems, you will enhance your problem-solving skills and deepen your understanding of linked list manipulation in various contexts.
