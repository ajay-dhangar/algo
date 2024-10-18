# Breadth-First Search (BFS)

Breadth-First Search (BFS) is a fundamental algorithm for traversing or searching through graph data structures. It explores the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.

## Table of Contents

1. [Overview](#overview)
2. [How BFS Works](#how-bfs-works)
3. [Algorithm](#algorithm)
4. [Characteristics of BFS](#characteristics-of-bfs)
5. [Use Cases](#use-cases)
6. [Implementation](#implementation)
7. [Time and Space Complexity](#time-and-space-complexity)
8. [Advantages and Disadvantages](#advantages-and-disadvantages)
9. [Conclusion](#conclusion)

## Overview

BFS is primarily used for searching trees or graphs and is notable for its ability to find the shortest path in an unweighted graph. It uses a queue to keep track of nodes that need to be explored.

## How BFS Works

1. **Initialization**: Begin at the selected source node and mark it as visited.
2. **Queue Management**: Place the source node in a queue.
3. **Exploration**: 
   - While the queue is not empty:
     - Dequeue the front node.
     - Process the node (e.g., printing its value or storing it).
     - Enqueue all unvisited neighboring nodes and mark them as visited.
4. **Termination**: The process continues until all reachable nodes from the starting node have been visited.

## Algorithm

Here is the step-by-step algorithm for BFS:

1. Create a queue and enqueue the starting node, marking it as visited.
2. While the queue is not empty:
   - Dequeue the front node from the queue.
   - Process the node (print it, store it, etc.).
   - For each unvisited neighbor of the node:
     - Mark it as visited.
     - Enqueue it to the queue.

### Pseudocode

```plaintext
BFS(Graph, start):
    create a queue Q
    mark start as visited
    enqueue start onto Q
    
    while Q is not empty:
        node = dequeue Q
        process(node)
        
        for each neighbor in Graph[node]:
            if neighbor is not visited:
                mark neighbor as visited
                enqueue neighbor onto Q
