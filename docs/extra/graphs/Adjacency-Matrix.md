---
id: adjacency-matrix
title: Adjacency matrix
sidebar_label: Adjacency matrix
description: "An adjacency matrix is a 2D array used to represent a graph, where each cell (i, j) is set to 1 if there's an edge from node i to node j, and 0 otherwise."
tags: [Graph,Algorithm, DSA]
---
# Adjacency Matrix
## Problem Statement
Write a program in to create adjacency matrix of a given graph. If a graph has n vertices, we use n x n matrix to represent the graph.Let's assume the n x n matrix as adj[n][n].
- if there is an edge from vertex i to j, mark adj[i][j] as 1. i.e. adj[i][j] == 1
- if there is no edge from vertex i to j, mark adj[i][j] as 0. i.e. adj[i][j] == 0

## Approach:
The approach constructs a graph using an adjacency matrix, initialized to 0, where each user-specified neighbor for a node sets the corresponding matrix entry to 1, visually representing edges between nodes when displayed.

## Algorithm Overview

1. **Input the Number of Nodes**: Prompt the user to input the number of nodes in the graph. Initialize an adjacency matrix of size  `V x V`  with all entries set to zero.

2. **Create the Adjacency Matrix**:
   - For each node, ask the user for the number of neighbors.
   - For each neighbor, set the corresponding matrix entry to 1 to indicate an edge between the nodes.

3. **Display the Adjacency Matrix**:
   - Print a formatted adjacency matrix that shows connections between nodes, with rows and columns representing nodes and entries indicating edges.

4. **User Interaction**:
   - The program takes user input for each node’s neighbors, allowing dynamic graph construction based on user-defined connections.

## Example

### Sample Input:
 
Enter the number of nodes in G: 5                  

Enter the number of neighbors of 0: 2                               
Enter the neighbors of 0 (0-based indices): 1 2                         

Enter the number of neighbors of 1: 2                                    
Enter the neighbors of 1 (0-based indices): 0 3                           

Enter the number of neighbors of 2: 2                      
Enter the neighbors of 2 (0-based indices): 0 3                           

Enter the number of neighbors of 3: 3                          
Enter the neighbors of 3 (0-based indices): 2 1 4                        

Enter the number of neighbors of 4: 1                       
Enter the neighbors of 4 (0-based indices): 3                      

```
   0 ---- 1
   |      |
   2 ---- 1 --- 4                       
```

### Sample Output:

The adjacency matrix is:

	       v1	v2	v3	v4	v5	
      v1	0	1	1	0	0	
      v2	1	0	0	1	0	
      v3	1	0	0	1	0	
      v4	0	1	1	0	1	
      v5	0	0	0	1	0
       

### Time Complexity
- The time complexity of the code is `O(V^2)` for both creating and displaying the graph, where  `V` is the number of nodes.
  
### C++ Implementation
```cpp
#include <iostream>
#include <vector>

void createGraph(std::vector<std::vector<int>>& Adj, int no_of_nodes) {
    int val;
    for (int i = 0; i < no_of_nodes; i++) {
        std::cout << "\nEnter the number of neighbors of " << i << ": ";
        std::cin >> val;
        std::cout << "\nEnter the neighbors of " << i << " (0-based indices): ";
        std::fill(Adj[i].begin(), Adj[i].end(), 0);
        for (int j = 0; j < val; j++) {
            int neighbor;
            std::cin >> neighbor;
            Adj[i][neighbor] = 1;
        }
    }
}

void displayGraph(const std::vector<std::vector<int>>& Adj, int no_of_nodes) {
    std::cout << "\nThe adjacency matrix is:\n";
    std::cout << "\t";
    for (int i = 0; i < no_of_nodes; i++) {
        std::cout << "v" << i + 1 << "\t";
    }
    std::cout << "\n";
    for (int i = 0; i < no_of_nodes; i++) {
        std::cout << "v" << i + 1 << "\t";
        for (int j = 0; j < no_of_nodes; j++) {
            std::cout << Adj[i][j] << "\t";
        }
        std::cout << "\n";
    }
}

int main() {
    int no_of_nodes;
    std::cout << "\nEnter the number of nodes in G: ";
    std::cin >> no_of_nodes;
    std::vector<std::vector<int>> Adj(no_of_nodes, std::vector<int>(no_of_nodes, 0));
    createGraph(Adj, no_of_nodes);
    displayGraph(Adj, no_of_nodes);  
    return 0;
}
```
