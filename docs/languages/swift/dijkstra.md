---
id: swift-dijkstra
title: Dijkstra's Algorithm in Swift
sidebar_label: Dijkstra's Algorithm
sidebar_position: 10
description: Learn how to implement Dijkstra's Algorithm in Swift for finding the shortest path in a weighted graph, with code examples and complexity analysis.
tags: [swift, graphs, algorithms, shortest-path, dijkstra]
---

# Dijkstra's Algorithm in Swift

Dijkstra's Algorithm finds the shortest path from a starting source node to all other nodes in a weighted graph with non-negative edge weights.

## Implementation in Swift

Here is the implementation of Dijkstra's Algorithm using a weighted adjacency list representation.

```swift
struct Edge {
    let to: Int
    let weight: Int
}

class WeightedGraph {
    let vertices: Int
    var adjList: [[Edge]]
    
    init(vertices: Int) {
        self.vertices = vertices
        self.adjList = Array(repeating: [], count: vertices)
    }
    
    func addEdge(from source: Int, to destination: Int, weight: Int, isDirected: Bool = false) {
        adjList[source].append(Edge(to: destination, weight: weight))
        if !isDirected {
            adjList[destination].append(Edge(to: source, weight: weight))
        }
    }
    
    func dijkstra(from source: Int) -> [Int] {
        var distances = Array(repeating: Int.max, count: vertices)
        var visited = Array(repeating: false, count: vertices)
        
        distances[source] = 0
        
        for _ in 0..<vertices {
            // Find the vertex with the minimum distance value from the set of non-visited vertices
            var minDistance = Int.max
            var minVertex = -1
            
            for v in 0..<vertices {
                if !visited[v] && distances[v] < minDistance {
                    minDistance = distances[v]
                    minVertex = v
                }
            }
            
            if minVertex == -1 { break }
            
            visited[minVertex] = true
            
            for edge in adjList[minVertex] {
                let neighbor = edge.to
                let weight = edge.weight
                
                if !visited[neighbor] && distances[minVertex] != Int.max && distances[minVertex] + weight < distances[neighbor] {
                    distances[neighbor] = distances[minVertex] + weight
                }
            }
        }
        
        return distances
    }
}

// Example usage:
let graph = WeightedGraph(vertices: 5)
graph.addEdge(from: 0, to: 1, weight: 9)
graph.addEdge(from: 0, to: 2, weight: 6)
graph.addEdge(from: 1, to: 2, weight: 2)
graph.addEdge(from: 1, to: 3, weight: 1)
graph.addEdge(from: 2, to: 3, weight: 2)
graph.addEdge(from: 3, to: 4, weight: 4)

let shortestDistances = graph.dijkstra(from: 0)
print("Shortest distances from source node 0: \(shortestDistances)")
// Output: Shortest distances from source node 0: [0, 8, 6, 8, 12]
```

## Complexity Analysis

- **Time Complexity**:
  - $O(V^2)$ with a simple array/visited search implementation.
  - $O((V + E) \log V)$ when implemented with a binary heap/priority queue.
- **Space Complexity**: $O(V)$ auxiliary space to keep track of distances and visited vertices.
