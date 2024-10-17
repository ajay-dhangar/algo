# Depth-First Search (DFS)

Depth-First Search (DFS) is a fundamental algorithm for traversing or searching through graph data structures. It explores as far down one branch as possible before backtracking, making it particularly useful for certain types of problems.

## Table of Contents

1. [Overview](#overview)
2. [How DFS Works](#how-dfs-works)
3. [Algorithm](#algorithm)
4. [Characteristics of DFS](#characteristics-of-dfs)
5. [Use Cases](#use-cases)
6. [Implementation](#implementation)
7. [Time and Space Complexity](#time-and-space-complexity)
8. [Advantages and Disadvantages](#advantages-and-disadvantages)
9. [Conclusion](#conclusion)

## Overview

DFS is primarily used for searching trees or graphs and is notable for its efficiency in exploring deep branches of a graph. It uses a stack (either explicitly or via recursion) to keep track of nodes that need to be explored.

## How DFS Works

1. **Initialization**: Begin at the selected source node and mark it as visited.
2. **Stack Management**: Place the source node on a stack.
3. **Exploration**:
   - While the stack is not empty:
     - Pop the top node from the stack.
     - Process the node (e.g., print its value or store it).
     - Push all unvisited neighboring nodes onto the stack and mark them as visited.
4. **Termination**: The process continues until all reachable nodes from the starting node have been visited.

## Algorithm

Here is the step-by-step algorithm for DFS:

1. Create a stack and push the starting node onto the stack, marking it as visited.
2. While the stack is not empty:
   - Pop the top node from the stack.
   - Process the node (print it, store it, etc.).
   - For each unvisited neighbor of the node:
     - Mark it as visited.
     - Push it onto the stack.

### Pseudocode

```plaintext
DFS(Graph, start):
    create a stack S
    mark start as visited
    push start onto S
    
    while S is not empty:
        node = pop S
        process(node)
        
        for each neighbor in Graph[node]:
            if neighbor is not visited:
                mark neighbor as visited
                push neighbor onto S
