---
id: graph-cloning 
title: Graph-cloning 
sidebar_label: Graph-cloning  
description: "The program is to return a deep copy of the graph, preserving the structure and values of its nodes."  
tags: [dsa, algorithms, graph]
---

### Problem Statement:
You are given the reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value and a list of its neighbors. There are n nodes in the graph each with a unique value from 0 to n-1.

## Definition:
### Input
- A pointer/reference to a node of the original graph. Each node is represented as follows:
  - An integer `val`, which is the unique value of the node.
  - A list of pointers/references to neighboring nodes.

### Output
- A pointer/reference to the corresponding cloned node of the graph.

### Constraints
- The graph is guaranteed to be connected and undirected.
- The node values are unique integers ranging from `0` to `n - 1`, where `n` is the number of nodes in the graph.

### Approach
To clone a graph, perform a depth-first search (DFS) or breadth-first search (BFS) starting from the given node, using a hash map to track visited nodes and ensure that each node is cloned only once, along with its neighbors.

## Algorithm Steps

1. **Check for Null Node**:
   - If the input node is `null`, return `null`.

2. **Check Visited Nodes**:
   - If the node has already been cloned (exists in the visited map), return the clone from the map.

3. **Create a Clone Node**:
   - Create a new node with the same value as the original node.
   - Store the clone in the visited map.

4. **Clone Neighbors**:
   - Iterate through each neighbor of the original node:
     - Recursively call the clone function for each neighbor.
     - Add the cloned neighbor to the `neighbors` list of the cloned node.

5. **Return Cloned Node**:
   - After cloning all neighbors, return the cloned node.

## Time Complexity:
- The time complexity of the graph cloning algorithm is `O(V + E)`, where `V` is the number of vertices and `E` is the number of edges. Each node and its neighbors are visited once during the DFS traversal, making the process linear with respect to the graph's size. The use of a map to track visited nodes ensures efficient lookups.

### Sample Input:
    ``` 
         0
        / \
       1---2
    ```
### Sample Output:
    Original graph:
    Node: 0 Neighbors: 1 2
    Node: 1 Neighbors: 0 2
    Node: 2 Neighbors: 0 1
    
    Cloned graph:
    Node: 0 Neighbors: 1 2
    Node: 1 Neighbors: 0 2
    Node: 2 Neighbors: 0 1

### C++ Implementation:

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

class Node {
public:
    int val;
    vector<Node*> neighbors;

    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
};

class Solution {
public:
    unordered_map<Node*, Node*> visited;

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (visited.find(node) != visited.end()) {
            return visited[node];
        }

        Node* cloneNode = new Node(node->val);
        visited[node] = cloneNode;

        for (Node* neighbor : node->neighbors) {
            cloneNode->neighbors.push_back(cloneGraph(neighbor));
        }

        return cloneNode;
    }
};

void printGraph(Node* node, unordered_map<Node*, bool>& printed) {
    if (!node || printed[node]) return;

    printed[node] = true; // Mark this node as printed
    cout << "Node: " << node->val << " Neighbors: ";
    for (Node* neighbor : node->neighbors) {
        cout << neighbor->val << " ";
    }
    cout << endl;

    for (Node* neighbor : node->neighbors) {
        printGraph(neighbor, printed);
    }
}

int main() {
    Node* node0 = new Node(0);
    Node* node1 = new Node(1);
    Node* node2 = new Node(2);
    
    node0->neighbors.push_back(node1);
    node0->neighbors.push_back(node2);
    node1->neighbors.push_back(node0);
    node1->neighbors.push_back(node2);
    node2->neighbors.push_back(node0);
    node2->neighbors.push_back(node1);

    Solution solution;
    Node* clonedGraph = solution.cloneGraph(node0);

    // Print the original graph
    cout << "Original graph:" << endl;
    unordered_map<Node*, bool> printed;
    printGraph(node0, printed);

    // Print the cloned graph
    cout << "\nCloned graph:" << endl;
    printed.clear(); // Reset printed map for cloned graph
    printGraph(clonedGraph, printed);

    return 0;
}
```

