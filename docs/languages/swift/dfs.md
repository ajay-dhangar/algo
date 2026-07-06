---
id: swift-dfs
title: Depth-First Search (DFS) in Swift
sidebar_label: Depth-First Search (DFS)
sidebar_position: 9
description: Learn how to implement Depth-First Search (DFS) for graph traversal in Swift, with recursive and iterative code examples and complexity analysis.
tags: [swift, graphs, algorithms, dfs]
---

# Depth-First Search (DFS) in Swift

Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at a root/source node and explores as far as possible along each branch before backtracking.

## Implementation in Swift

Here is the implementation of DFS in Swift using an adjacency list graph representation. We provide the recursive implementation, which is the most common.

```swift
class Graph {
    let vertices: Int
    var adjList: [[Int]]
    
    init(vertices: Int) {
        self.vertices = vertices
        self.adjList = Array(repeating: [], count: vertices)
    }
    
    func addEdge(from source: Int, to destination: Int, isDirected: Bool = false) {
        adjList[source].append(destination)
        if !isDirected {
            adjList[destination].append(source)
        }
    }
    
    func dfs(startingNode: Int) -> [Int] {
        var visited = Array(repeating: false, count: vertices)
        var traversalOrder = [Int]()
        
        dfsHelper(node: startingNode, visited: &visited, order: &traversalOrder)
        
        return traversalOrder
    }
    
    private func dfsHelper(node: Int, visited: inout [Bool], order: inout [Int]) {
        visited[node] = true
        order.append(node)
        
        for neighbor in adjList[node] {
            if !visited[neighbor] {
                dfsHelper(node: neighbor, visited: &visited, order: &order)
            }
        }
    }
}

// Example usage:
let graph = Graph(vertices: 5)
graph.addEdge(from: 0, to: 1)
graph.addEdge(from: 0, to: 2)
graph.addEdge(from: 1, to: 3)
graph.addEdge(from: 2, to: 4)

let dfsResult = graph.dfs(startingNode: 0)
print("DFS Traversal starting from node 0: \(dfsResult)")
// Output: DFS Traversal starting from node 0: [0, 1, 3, 2, 4]
```

## Complexity Analysis

- **Time Complexity**: $O(V + E)$ where $V$ is the number of vertices and $E$ is the number of edges.
- **Space Complexity**: $O(V)$ call stack space due to recursion helper in the worst case (for a path graph).
