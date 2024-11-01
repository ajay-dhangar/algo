---
id: graph-reversal 
title: Graph-reversal
sidebar_label: Graph-reversal 
description: "Reverse a directed graph so that the incoming edges will be converted to outgoing edges betwwen the same nodes."  
tags: [dsa, algorithms, graph]
---

### Problem Statement:
Suppose we have a directed graph, we have to find its reverse so if an edge goes from i to j, it now goes from j to i. Here input will be an adjacency list, and if there are n nodes, the nodes will be (0, 1, ..., n-1).

<Ads />

### Approach:
The approach to transposing a directed graph involves creating a new structure to hold reversed edges. For each vertex, the algorithm iterates through its outgoing edges and appends the vertex to the list of the target vertex in the new structure. This efficiently constructs the transposed graph in linear time relative to the number of vertices and edges.

### Algorithm Steps:

1. **Initialize Result Structure**:
   - Create a list (or vector) `ans` of empty lists, with a size equal to the number of vertices in the graph.

2. **Iterate Over Each Vertex**:
   - For each vertex `i` in the graph:
     - Retrieve the list of vertices that `i` points to (i.e., its outgoing edges).

3. **Reverse Edges**:
   - For each vertex `x` in the outgoing edges of vertex `i`:
     - Append vertex `i` to the list at index `x` in `ans`. This step captures the transposition of the edge from `x` to `i`.

4. **Return Transposed Graph**:
   - Return the `ans` list, which now represents the transposed graph.

These steps succinctly outline the algorithm's approach to transforming the directed graph into its transpose.
### Time Complexity:
- The time complexity of the program is `O(V + E)`, where `V` is the number of vertices and `E` is the number of edges, as it processes each vertex and edge once.

### Sample Input:

```
    {{1, 2}, {4}, {4}, {1, 2}, {3}}
```
### Sample Output:

```
    [[], [0, 3], [0, 3], [4], [1, 2]]
```

<Ads />

### Explanation of Sample:

- The input `graph = [[1,2],[4],[4],[1,2],[3]]` represents a directed graph as an adjacency list where:
  
    - Node 0 points to nodes 1 and 2.
    - Node 1 points to node 4.
    - Node 2 points to node 4.
    - Node 3 points to nodes 1 and 2.
    - Node 4 points to node 3.

- The reversed graph representation is `ans = [[], [0, 3], [0, 3], [4], [1, 2]]`, which means:
  
    - Node 0 has no outgoing edges.
    - Nodes 1 and 2 have outgoing edges to nodes 0 and 3.
    - Node 3 has an outgoing edge to node 4.
    - Node 4 has outgoing edges to nodes 1 and 2.

### Diagrammatic Representation of the input:
![directed_graph](https://github.com/user-attachments/assets/b3a8fc46-e508-45a0-bf97-458c2054f085)

### Diagrammatic Representation of the output:
![directed_graph1](https://github.com/user-attachments/assets/7cb03236-3f1a-49cc-b2ce-6ef73aac7fa4)

<Ads />

### C++ Implementation:

```cpp

#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> solve(vector<vector<int>>& graph) {
        vector<vector<int>> ans(graph.size());
        for (int i = 0; i < graph.size(); ++i) {
            for (int x : graph[i]) {
                ans[x].push_back(i);
            }
        }
        return ans;
    }
};

int main() {
    Solution ob;
    vector<vector<int>> graph = {{1, 2}, {4}, {4}, {1, 2}, {3}};
    vector<vector<int>> result = ob.solve(graph);

    // Print the result
    for (const auto& vec : result) {
        cout << "[ ";
        for (int val : vec) {
            cout << val << " ";
        }
        cout << "]" << endl;
    }

    return 0;
}
```
