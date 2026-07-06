---
id: swift-bfs
title: Breadth-First Search (BFS) in Swift
sidebar_label: Breadth-First Search (BFS)
sidebar_position: 8
description: Learn how to implement Breadth-First Search (BFS) for graph traversal in Swift, with code examples and complexity analysis.
tags: [swift, graphs, algorithms, bfs]
---

# Breadth-First Search (BFS) in Swift

Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node (called the source or root) and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.

## Implementation in Swift

Here is the implementation of BFS using an adjacency list graph representation in Swift.

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
    
    func bfs(startingNode: Int) -> [Int] {
        var visited = Array(repeating: false, count: vertices)
        var traversalOrder = [Int]()
        var queue = [Int]()
        
        visited[startingNode] = true
        queue.append(startingNode)
        
        while !queue.isEmpty {
            let currentNode = queue.removeFirst()
            traversalOrder.append(currentNode)
            
            for neighbor in adjList[currentNode] {
                if !visited[neighbor] {
                    visited[neighbor] = true
                    queue.append(neighbor)
                }
            }
        }
        
        return traversalOrder
    }
}

// Example usage:
let graph = Graph(vertices: 5)
graph.addEdge(from: 0, to: 1)
graph.addEdge(from: 0, to: 2)
graph.addEdge(from: 1, to: 3)
graph.addEdge(from: 2, to: 4)

let bfsResult = graph.bfs(startingNode: 0)
print("BFS Traversal starting from node 0: \(bfsResult)")
// Output: BFS Traversal starting from node 0: [0, 1, 2, 3, 4]
```

## Complexity Analysis

- **Time Complexity**: $O(V + E)$ where $V$ is the number of vertices and $E$ is the number of edges in the graph.
- **Space Complexity**: $O(V)$ auxiliary space to keep track of visited nodes and to maintain the queue.
