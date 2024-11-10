---
id: Data Structures
title: Introduction to Data Structures fundamentals
sidebar_label: Data Structures
sidebar_position: 3
description: "Information About Data structures in progamming"
tags: [Data structures,fundamentals]
---


# Data Structures in C

## What are Data Structures?
Data structures are specialized formats for organizing, processing, and storing data. They provide a way to manage large amounts of data efficiently for various operations such as searching, inserting, updating, and deleting.

## Types of Data Structures

### 1. Primitive Data Structures
Primitive data structures are the basic building blocks of data handling in C. They include:

- **Integers (`int`)**: Used to store whole numbers.
- **Floats (`float`)**: Used to store single-precision floating-point numbers.
- **Doubles (`double`)**: Used to store double-precision floating-point numbers.
- **Characters (`char`)**: Used to store single characters.
- **Boolean (`_Bool`)**: Used to store true/false values.

### 2. Non-Primitive Data Structures
Non-primitive data structures are more complex structures built from primitive data types. They include:

#### a. Arrays
An array is a collection of elements of the same type, stored in contiguous memory locations.

- **Declaration**:
    ```c
    int arr[10]; // Array of integers
    ```

- **Initialization**:
    ```c
    int arr[5] = {1, 2, 3, 4, 5};
    ```

- **Accessing Elements**:
    ```c
    int first = arr[0]; // Accessing the first element
    ```

#### b. Structures
Structures allow you to group different data types under a single name.

- **Declaration**:
    ```c
    struct Person {
        char name[50];
        int age;
    };
    ```

- **Initialization**:
    ```c
    struct Person person1 = {"Alice", 30};
    ```

- **Accessing Members**:
    ```c
    printf("%s is %d years old.", person1.name, person1.age);
    ```

#### c. Unions
Unions allow you to store different data types in the same memory location. Only one member can hold a value at any given time.

- **Declaration**:
    ```c
    union Data {
        int intVal;
        float floatVal;
        char charVal;
    };
    ```

- **Initialization**:
    ```c
    union Data data;
    data.intVal = 5; // Only intVal holds a value at this moment
    ```

#### d. Enumerations
An enumeration is a user-defined data type consisting of a set of named integer constants.

- **Declaration**:
    ```c
    enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday };
    ```

- **Using Enumerations**:
    ```c
    enum Day today = Friday;
    ```

### 3. Abstract Data Types (ADTs)
ADTs are data structures defined by their behavior (operations) rather than their implementation.

#### a. Linked Lists
A linked list is a collection of nodes where each node contains data and a pointer to the next node.

- **Node Structure**:
    ```c
    struct Node {
        int data;
        struct Node* next;
    };
    ```

- **Example of Inserting a Node**:
    ```c
    void insert(struct Node** head, int newData) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = newData;
        newNode->next = (*head);
        (*head) = newNode;
    }
    ```

#### b. Stacks
A stack is a linear data structure that follows the Last In First Out (LIFO) principle.

- **Operations**:
    - **Push**: Add an element to the top.
    - **Pop**: Remove an element from the top.
    - **Peek**: Get the top element without removing it.

#### c. Queues
A queue is a linear data structure that follows the First In First Out (FIFO) principle.

- **Operations**:
    - **Enqueue**: Add an element to the rear.
    - **Dequeue**: Remove an element from the front.

### 4. Trees
A tree is a hierarchical data structure consisting of nodes. The top node is called the root, and each node can have child nodes.

- **Binary Tree**: Each node has at most two children.
- **Binary Search Tree (BST)**: A binary tree where the left child is less than the parent and the right child is greater.

### 5. Graphs
A graph is a collection of nodes (vertices) connected by edges. Graphs can be directed or undirected.

- **Representation**:
    - **Adjacency Matrix**: A 2D array to represent the graph.
    - **Adjacency List**: An array of lists to represent the graph.

## Summary
- Data structures are crucial for organizing and managing data effectively.
- C provides both primitive and non-primitive data structures.
- Understanding various data structures helps optimize algorithms and enhances programming skills.
