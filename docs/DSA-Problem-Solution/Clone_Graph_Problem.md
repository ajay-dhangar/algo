---
id: Clone_Graph_Problem
title: Clone Graph Problem
sidebar_label: Clone Graph Problem
sidebar_position: 12
description: "A detailed description of clone graph problem in DSA"
tags: [Clone_Graph_Problem, DSA, ProblemSolving]
---

Here's how to solve the **Clone Graph Problem** using both **C++** and **Python**:

---

# Clone Graph Problem in C++ and Python

The **Clone Graph Problem** is an important question in data structures and algorithms. It challenges your understanding of graph traversal using both Depth-First Search (DFS) and Breadth-First Search (BFS) and how to copy a graph structure accurately.

---

## Problem Statement

You are given a reference to a node in a **connected, undirected graph**. Each node has a value (or label) and a list of its neighbors. Your task is to return a **deep copy (clone) of the entire graph**.

### Node Class Representation

**C++ Class Definition**:

```cpp
class Node {
public:
    int val;
    vector<Node*> neighbors;
    
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
};
```

**Python Class Definition**:

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
```

---

## Solution Approaches

### 1. Depth-First Search (DFS) Approach

The idea is to use **DFS** to traverse the graph and clone each node. We use a **hash map** to track cloned nodes and avoid duplications.

### C++ Implementation Using DFS

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

// Definition for a Node
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
    unordered_map<Node*, Node*> map; // Hash map to store original and cloned nodes

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr; // If the graph is empty

        if (map.find(node) != map.end()) {
            return map[node]; // Return the already cloned node
        }

        // Clone the current node
        Node* clone = new Node(node->val);
        map[node] = clone;

        // Recursively clone all neighbors
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }

        return clone;
    }
};
```

### Python Implementation Using DFS

```python
class Solution:
    def __init__(self):
        self.map = {}  # Dictionary to store original and cloned nodes

    def cloneGraph(self, node):
        if not node:
            return None  # If the graph is empty

        if node in self.map:
            return self.map[node]  # Return the already cloned node

        # Clone the current node
        clone = Node(node.val)
        self.map[node] = clone

        # Recursively clone all neighbors
        for neighbor in node.neighbors:
            clone.neighbors.append(self.cloneGraph(neighbor))

        return clone
```

### Time Complexity: `O(V + E)`

- `V` is the number of vertices (nodes).
- `E` is the number of edges.
- Each node and edge is visited once.

### Space Complexity: `O(V)`

- Space is used to store the cloned nodes in the hash map.

---

### 2. Breadth-First Search (BFS) Approach

You can also solve the problem using **BFS**, which iteratively traverses the graph and clones each node.

### C++ Implementation Using BFS

```cpp
#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
using namespace std;

// Definition for a Node
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
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr; // If the graph is empty

        unordered_map<Node*, Node*> map; // Hash map to store original and cloned nodes
        queue<Node*> q; // Queue for BFS

        // Create a clone of the starting node
        Node* clone = new Node(node->val);
        map[node] = clone;
        q.push(node);

        while (!q.empty()) {
            Node* current = q.front();
            q.pop();

            for (Node* neighbor : current->neighbors) {
                if (map.find(neighbor) == map.end()) {
                    // Clone the neighbor
                    map[neighbor] = new Node(neighbor->val);
                    q.push(neighbor); // Add to queue for BFS
                }
                // Connect the clone to its neighbors
                map[current]->neighbors.push_back(map[neighbor]);
            }
        }

        return clone;
    }
};
```

### Python Implementation Using BFS

```python
from collections import deque

class Solution:
    def cloneGraph(self, node):
        if not node:
            return None  # If the graph is empty

        map = {}  # Dictionary to store original and cloned nodes
        queue = deque([node])  # Queue for BFS

        # Create a clone of the starting node
        map[node] = Node(node.val)

        while queue:
            current = queue.popleft()

            for neighbor in current.neighbors:
                if neighbor not in map:
                    # Clone and store the neighbor
                    map[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)  # Add to queue for BFS
                # Connect the clone to its neighbors
                map[current].neighbors.append(map[neighbor])

        return map[node]  # Return the cloned node
```

### Time Complexity: `O(V + E)`

- `V` is the number of vertices (nodes).
- `E` is the number of edges.
- Each node and edge is visited once.

### Space Complexity: `O(V)`

- Space is used to store the cloned nodes in the hash map.

---

## Key Concepts to Understand

1. **Graph Traversal**: Knowing how to traverse a graph using DFS and BFS.
2. **Hash Maps**: Used to track and map cloned nodes.
3. **Handling Cycles**: Ensuring cycles in the graph are correctly replicated without infinite loops.

---

## Summary

- The **Clone Graph Problem** can be solved using DFS or BFS. 
- Both methods involve using a hash map to track cloned nodes and avoid redundant cloning.
- This problem tests your ability to work with graphs, understand traversal techniques, and replicate structures efficiently.

Mastering graph cloning techniques will help you solve complex graph-related problems and perform well in coding interviews. Happy coding!
