---
id: doubly-linked-list
title: Doubly Linked List Data Structure (C Language)
sidebar_label: Introduction to Doubly Linked List
description: 'A doubly linked list is a dynamic data structure where each node contains two pointers, one pointing to the previous node and another pointing to the next node, and one is data field. This enables efficient traversal in both directions, making it a versatile structure for scenarios where bi-directional data manipulation is needed.'
tags: [dsa, data-structures, Doubly LinkedList , C language]
---

### Introduction to Doubly Linked List

A **Doubly Linked List (DLL)** is a type of linked list where each node has three fields: the data itself, a pointer to the next node in the sequence, and a pointer to the previous node. Unlike a Singly Linked List, where traversal is only possible in one direction (from head to tail), a doubly linked list allows for both forward and backward traversal, making it more flexible for operations like insertions, deletions, and reversals.

In **C**, doubly linked lists are implemented using structs and pointers. Each node is dynamically allocated using memory functions, such as **malloc()**, allowing the list to grow or shrink in size as needed. This data structure is particularly useful when you need efficient manipulation of a sequence of elements and quick access in both directions.

### Doubly Linked list Structure in C

 ```text
    typedef struct node 
    { 
        int data; 
        struct node*prev; 
        struct node*next; 
        }node;
 ```

### Pseudocode

#### Basic Operations

1. **Creation**:

   ```text
    node*create() 
    { 
        node*h,*p,*s,*head; 
        int x,i,num; 
        //memory allocation
        h=(node*)malloc(sizeof(node)); 
        h->prev=h->next=NULL; 
        //ask user that how many elements they want to insert
        printf("\nenter no. of elements_"); 
        scanf("%d",&x); 
        //taking user input
        printf("\nenter data_"); 
        scanf("%d",&h->data); 
        //taking two pointer at start and at the end
        p=h; 
        for(i=1;i<x;i++) 
        { 
            p->next=(node*)malloc(sizeof(node)); 
            s=p; 
            p=p->next; 
            p->prev=s; 
            p->next=NULL; 
            printf("\nenter data_"); 
            scanf("%d",&p->data); 
        } 
        head=p; 
        //can make choice of where side of control user want to start
        printf("\nChoice to give control from start or from last if(num =1 last node pointer will be pass)"); 
        scanf("%d",&num); 
        if(num==1) 
        return(h); 
        return(head); 
    }
   ```

2. **Traversal**:

   ```text
    void display(node*head) 
    { 
        node*p; 
        p=head; 
        //checking if the pointer pass from front or from end (in my case but you can create your creativity)
        if(p->next!=NULL) 
        { 
            printf("\nDLL is:(by going with next)\n"); 
            while(p!=NULL) 
            { 
                printf("%d\t",p->data); 
                p=p->next; 
            } 
        } 
        else 
        { 
            printf("\nDLL is:(by going with previous)\n"); 
            while(p!=NULL) 
            { 
                printf("%d\t",p->data); 
                p=p->prev; 
            } 
        } 
    }
   ```
3. **Insertion (begining , last , or any location)**:

   ```text
    void insertion(node*head) 
    { 
        int loc,i; 
        node*p,*q,*s; 
        p=(node*)malloc(sizeof(node)); 
        p->next=p->prev=NULL; 
        printf("\nenter inerting element_"); 
        //making your data's node to insert
        scanf("%d",&p->data); 
        //enter location where you want to insert
        printf("\nenter location_"); 
        scanf("%d",&loc); 
        q=head;
        //insertion at begining 
        if(loc==1) 
        { 
            p->next=head; 
            head->prev=p; 
            display(p); 
        } 
        else 
        { 
            for(i=2;i<loc;i++) 
            q=q->next; 
            s=q->next; 
            p->next=s; 
            s->prev=p; 
            q->next=p; 
            p->prev=q; 
            //see the inserted linked list
            display(head); 
        } 
    }
   ```
4. **Deletion (at begining , at last , or at any location)**:

   ```text
    void delete(node*head) 
    { 
        node*p,*q,*s; 
        int loc,i; 
        //from where you want to delete
        printf("\nenter location_"); 
        scanf("%d",&loc);
        //at begining 
        if(loc==1) 
        { 
            head=head->next; 
            head->prev=NULL; 
            //see the deleted DLL
            display(head); 
         } 
         else 
         { 
            p=head; 
            for(i=2;i<loc;i++) 
            p=p->next; 
            q=p->next->next; 
            p->next=NULL; 
            p->next=q; 
            q->prev=p; 
            //see the deleted DLL
            display(head); 
        } 
    }
   ```
5. **Main function**:

   ```text
    void main() 
    { 
        node*head; 
        printf("Doubly Linked list\n"); 
        //creating function 
        head=create(); 
        //display function
        display(head); 
        //insertion function
        insertion(head); 
        //delete function
        delete(head); 
    }
   ```
### Complexity

- **Time Complexity**:

  - Traversal: $O(n)$
  - Insertion : $O(1)$
  - Deletion: $O(1)$

- **Space Complexity**: $O(1)$

### Advantages:

  -Bidirectional traversal: You can traverse the list both forward and backward.
  -Efficient insertion and deletion: Insertion and deletion operations are efficient at both ends of the list as well as in the middle, as you don’t need to shift elements like you would in an array.

### Disadvantages:

**Extra memory**: 
     Each node requires additional memory for storing the pointer to the previous node.
**More complex code**: 
     The management of two pointers (previous and next) makes the implementation more complex than a singly linked list.

### Use Cases:

**Browser History**: 
     Moving forward and backward through previously visited pages.
**Undo/Redo Operations**: 
     Navigating through changes in a document or application.
**Navigation systems**: 
     Efficiently traversing elements in both directions in applications such as playlists or slideshows.

### Conclusion

In this **C** implementation, we cover fundamental operations such as inserting and deleting nodes at both ends, as well as traversing the list in both directions. Understanding doubly linked lists is essential for mastering dynamic data structures and memory management in **C**.
