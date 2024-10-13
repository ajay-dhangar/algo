---
id: kahn
title: Kahn's Algorithm
sidebar_label: Kahn's Algorithm
description: "In this blog post, we will delve into Kahn's Algorithm, an efficient method for topological sorting of a directed acyclic graph (DAG). This algorithm provides a way to find a linear ordering of vertices such that for every directed edge u → v, vertex u comes before vertex v."
tags: [dsa, algorithms, topological sorting]
---

## 📚 Kahn's Algorithm

Kahn's Algorithm is an efficient method for performing topological sorting on a Directed Acyclic Graph (DAG). It provides a way to order the vertices of the graph such that for every directed edge \( u \rightarrow v \), vertex \( u \) comes before vertex \( v \) in the ordering. This algorithm is particularly useful in scenarios where certain tasks must be completed before others, such as scheduling problems or resolving dependencies.

### 📝 How Kahn's Algorithm Works

Kahn's Algorithm operates based on the concept of in-degrees of vertices in a directed graph. The in-degree of a vertex is the number of edges directed towards it. The algorithm follows these steps:

1. **Calculate In-Degrees**: 
   - Initialize an array `inDegree` to keep track of the in-degrees of all vertices. 
   - Traverse the graph and populate the `inDegree` array.

2. **Initialize the Queue**: 
   - Create a queue to hold all vertices with an in-degree of 0 (i.e., vertices that have no dependencies).

3. **Process the Queue**:
   - While the queue is not empty, perform the following:
     - Dequeue a vertex \( u \) and append it to the topological ordering.
     - For each outgoing edge from \( u \) to vertex \( v \), reduce the in-degree of \( v \) by 1. 
     - If the in-degree of \( v \) becomes 0, enqueue \( v \).

4. **Check for Cycles**:
   - After processing all vertices, if the number of vertices in the topological ordering is less than the total number of vertices in the graph, a cycle exists, and a topological sort is not possible.

### 🛠️ Time Complexity

The time complexity of Kahn's Algorithm is \( O(V + E) \), where \( V \) is the number of vertices and \( E \) is the number of edges in the graph. This efficiency makes Kahn's Algorithm suitable for large graphs.

### 🖥️ C++ Implementation

Here’s how Kahn's Algorithm can be implemented in C++:

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> kahnTopologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> inDegree(V, 0);
    vector<int> topologicalOrder;

    // Calculate in-degrees of all vertices
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) {
            inDegree[v]++;
        }
    }

    // Initialize the queue with vertices of in-degree 0
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }

    // Process the queue
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topologicalOrder.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }

    // Check if there was a cycle
    if (topologicalOrder.size() != V) {
        return {}; // Return an empty vector if there's a cycle
    }

    return topologicalOrder; // Return the topological order
}

int main() {
    int V = 6; // Number of vertices
    vector<vector<int>> adj(V);

    // Example graph edges (0->1, 0->2, etc.)
    adj[5].push_back(2);
    adj[5].push_back(0);
    adj[4].push_back(0);
    adj[4].push_back(1);
    adj[2].push_back(3);
    adj[3].push_back(1);

    vector<int> result = kahnTopologicalSort(V, adj);

    if (result.empty()) {
        cout << "Graph has a cycle, topological sort not possible." << endl;
    } else {
        cout << "Topological Sort: ";
        for (int u : result) {
            cout << u << " ";
        }
        cout << endl;
    }

    return 0;
}


```
### 🔍 Applications of Kahn's Algorithm
Task Scheduling: Used in scenarios where certain tasks must be completed before others.
Build Systems: Helps manage dependencies between files and targets.
Course Scheduling: Useful in academic settings to manage prerequisite courses.
Version Control Systems: Resolves dependencies in source code versioning.

### ⚖️ Advantages and Limitations
Advantages:
Provides a clear and efficient method for topological sorting.
Handles large graphs effectively with 
O(V+E) time complexity.

### Limitations:
Only applicable to Directed Acyclic Graphs (DAGs);
Cannot be used for graphs with cycles.



### 📝 Conclusion
Kahn's Algorithm is a powerful tool for performing topological sorting in directed acyclic graphs. Its efficiency and straightforward implementation make it a preferred choice in many applications requiring task management based on dependencies. Understanding this algorithm can significantly aid in solving various computational problems involving directed graphs.