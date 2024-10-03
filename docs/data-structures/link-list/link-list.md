# Linked List Documentation

## Introduction
A **linked list** is a linear data structure where elements, called **nodes**, are stored in a sequence, and each node points to the next node using a reference. Unlike arrays, linked lists do not store data elements in contiguous memory locations.

## Types of Linked Lists
There are three main types of linked lists:
1. **Singly Linked List**: Each node points to the next node, and the last node points to `null`.
2. **Doubly Linked List**: Each node contains references to both the previous and the next node.
3. **Circular Linked List**: The last node points back to the first node, forming a circular structure.

## Node Structure
Each node in a linked list contains two parts:
- **Data**: The value stored in the node.
- **Next (Pointer/Reference)**: A reference to the next node in the list.

In the case of a doubly linked list, each node will also have a **previous** pointer.

### Singly Linked List Node
```cpp
class Node {
public:
    int data;
    Node* next;
    
    Node(int val) {
        data = val;
        next = nullptr;
    }
};
```
### Doubly Linked List Node
```cpp
class Node {
public:
    int data;
    Node* next;
    Node* prev;
    
    Node(int val) {
        data = val;
        next = nullptr;
        prev = nullptr;
    }
};
```
### Operations on a Linked List
The following are common operations that can be performed on a linked list:

## 1. Insertion

 Inserting a new node into a linked list can be done at:

- The beginning of the list.
- The end of the list.
- A specific position in the list.
- Example of insertion at the beginning:
 ```cpp
  void insertAtBeginning(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}
```
## 2. Deletion
Deleting a node from the linked list can be performed by:

- Deleting the first node.
- Deleting the last node.
- Deleting a node at a specific position.
 
Example of deletion of a node with a specific value:
```cpp
void deleteNode(Node*& head, int key) {
    Node* temp = head;
    Node* prev = nullptr;
    
    if (temp != nullptr && temp->data == key) {
        head = temp->next;
        delete temp;
        return;
    }

    while (temp != nullptr && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == nullptr) return;
    
    prev->next = temp->next;
    delete temp;
}
```
## 3. Traversal
Traversing a linked list means visiting each node and performing an action, such as printing the node's data.
```cpp
void printList(Node* node) {
    while (node != nullptr) {
        std::cout << node->data << " -> ";
        node = node->next;
    }
    std::cout << "null" << std::endl;
}
```
## 4. Searching
Searching in a linked list involves finding a node with a specific value.
```cpp
bool search(Node* head, int key) {
    Node* current = head;
    while (current != nullptr) {
        if (current->data == key)
            return true;
        current = current->next;
    }
    return false;
}

```
### Advantages of Linked Lists
- *Dynamic Size*: The size of a linked list can be modified at runtime, unlike arrays.
- Efficient Insertion/Deletion: Insertion and deletion operations are generally faster because they do not require shifting elements.
### Disadvantages of Linked Lists
- Memory Overhead: Linked lists require extra memory for storing pointers/references.
- Sequential Access: Linked lists must be traversed from the head to access a specific element, making access time linear ` (O(n))`.
### Applications of Linked Lists
- Implementation of stacks and queues.
- Undo functionality in software.
- Dynamic memory allocation.
- Representation of sparse matrices.
## Conclusion
Linked lists are a fundamental data structure, providing flexibility for dynamic memory management but at the cost of extra memory and slower access times. Understanding linked lists is essential for mastering data structures and algorithms.

git 