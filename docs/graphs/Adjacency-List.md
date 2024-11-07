---
id: adjacency-list
title: Adjacency List
sidebar_label: Adjacency List
description: "Adjacency list is used to represent a graph using array and linked list"  
tags: [dsa, algorithms, graph]
---

## Problem Statement:

Write a program to store and display a graph in the form of adjacency list.
Let’s assume there are n vertices in the graph So, create an array of list of size n as adjList[n].
- adjList[0] will have all the nodes which are connected (neighbour) to vertex 0.
- adjList[1] will have all the nodes which are connected (neighbour) to vertex 1 and so on.


## Defination
An adjacency list is a way to represent a graph using an array of linked lists. Each index of the array corresponds to a vertex in the graph, and the linked list at each index contains the vertices that are directly connected to that vertex by an edge.

## Algorithm Steps:

1. **Initialize the Array**:  
   Create an array (or vector) of size `V` (number of vertices), where each element is a linked list (or pointer) initially set to `nullptr` or empty.

2. **Add Edges**:  
   For each vertex `u`, input its neighbors (vertices `v` that it is connected to by an edge). For each neighbor `v`, create a new node in the linked list at index `u` and link it to the previous node. Repeat this for all edges of the graph.

3. **Link Nodes**:  
   For each vertex `u`, ensure that the linked list at `AdjList[u]` contains the nodes of all its neighbors `v`. Each node in the list stores the vertex identifier and a pointer to the next neighbor.

4. **Final Structure**:  
   After processing all vertices and their neighbors, the array will represent the adjacency list of the graph, where each element in the array corresponds to a vertex and contains a linked list of all vertices adjacent to it.


## Code Breakdown

1. **Define the Node Structure**:  
   The `Node` structure represents each vertex's neighbor. It contains an integer `vertex` to store the neighbor's identifier, and a pointer `next` to link to the next neighbor in the adjacency list.

2. **Create the Graph (`createGraph` Function)**:  
   The function begins by initializing an array of linked lists (`AdjList`) for storing the adjacency list. For each node, it prompts the user to input the number of neighbors, then iterates through the neighbors and adds each one to the corresponding node's adjacency list using linked nodes.

3. **Display the Graph (`displayGraph` Function)**:  
   This function iterates through each node and prints its adjacency list. For each node, it prints the vertex followed by the `-->` symbol and the list of its connected neighbors, formatted in a readable way.

4. **Delete the Graph (`deleteGraph` Function)**:  
   After the graph is no longer needed, the function deallocates the memory used by each linked list to prevent memory leaks. It iterates through each node’s linked list, deleting each node one by one and setting the corresponding adjacency list to `nullptr`.


## Time Complexity:
- The time complexity of the program is `O(V + E)`, where `V` is the number of vertices and `E` is the number of edges. This is because each vertex and its edges are processed once in the `createGraph`, `displayGraph`, and `deleteGraph` functions.

## Example:

### Sample Input:

Enter the number of nodes in G: 5                        

Enter the number of neighbours of node 0: 2                              
Enter the neighbour 1 of node 0: 1                       
Enter the neighbour 2 of node 0: 2                       

Enter the number of neighbours of node 1: 2                     
Enter the neighbour 1 of node 1: 0                 
Enter the neighbour 2 of node 1: 3                     

Enter the number of neighbours of node 2: 2                    
Enter the neighbour 1 of node 2: 0                  
Enter the neighbour 2 of node 2: 3                      

Enter the number of neighbours of node 3: 3                      
Enter the neighbour 1 of node 3: 2                   
Enter the neighbour 2 of node 3: 1                
Enter the neighbour 3 of node 3: 4                        

Enter the number of neighbours of node 4: 1                  
Enter the neighbour 1 of node 4: 3                                                              

### Sample Output:

The adjacency list is given by:       
```
0-->1-->2
1-->0-->3
2-->0-->3
3-->2-->1-->4
4-->3
```
### Diagrammatic Representataion of the code sample:
```
   0 ---- 1
   |      |
   2 ---- 3 --- 4                       
```


### C++ Implementation:
```cpp
#include <iostream>
#include <vector>

struct Node {
    int vertex;
    Node* next;
};

void createGraph(std::vector<Node*>& adjList, int no_of_nodes) {
    Node* new_node;
    Node* last;
    int n, val;

    for (int i = 0; i < no_of_nodes; i++) {
        last = nullptr;
        std::cout << "\nEnter the number of neighbours of node " << i << ": ";
        std::cin >> n;
        for (int j = 1; j <= n; j++) {
            std::cout << "Enter the neighbour " << j << " of node " << i << ": ";
            std::cin >> val;
            if (val >= no_of_nodes || val < 0) {
                std::cerr << "Error: Invalid node value. It must be between 0 and " << no_of_nodes - 1 << ".\n";
                --j;
                continue;
            }
            new_node = new Node();
            new_node->vertex = val;
            new_node->next = nullptr;
            if (adjList[i] == nullptr)
                adjList[i] = new_node;
            else
                last->next = new_node;
            last = new_node;
        }
    }
}

void displayGraph(const std::vector<Node*>& adjList, int no_of_nodes) {
    std::cout << "\nThe adjacency list is given by:\n";
    for (int i = 0; i < no_of_nodes; i++) {
        std::cout << i;
        Node* ptr = adjList[i];
        while (ptr != nullptr) {
            std::cout << "-->" << ptr->vertex;
            ptr = ptr->next;
        }
        std::cout << std::endl;
    }
}

void deleteGraph(std::vector<Node*>& adjList, int no_of_nodes) {
    Node* temp;
    Node* ptr;
    for (int i = 0; i < no_of_nodes; i++) {
        ptr = adjList[i];
        while (ptr != nullptr) {
            temp = ptr;
            ptr = ptr->next;
            delete temp;
        }
        adjList[i] = nullptr;
    }
}

int main() {
    int no_of_nodes;
    std::cout << "\nEnter the number of nodes in G: ";
    std::cin >> no_of_nodes;
    
    std::vector<Node*> adjList(no_of_nodes, nullptr);  // Allocate based on input size
    
    createGraph(adjList, no_of_nodes);
    displayGraph(adjList, no_of_nodes);
    deleteGraph(adjList, no_of_nodes);
    
    return 0;
}
```
