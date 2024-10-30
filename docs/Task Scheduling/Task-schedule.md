---
id: task-scheduling
title: Task Scheduling
sidebar_label: Task Scheduling
description: The program finds a valid order for task execution based on dependencies, using Topological Sorting with Kahn’s algorithm.
tags: [Topological Sorting, DAG, DSA, Scheduling]
---

### Task Scheduling (Topological Sorting)

This project demonstrates a Task Scheduling algorithm using Topological Sorting (Kahn’s Algorithm) implemented in C. This algorithm determines an order in which tasks can be completed given dependencies between them.

## Table of Contents
- [Description](#description)
- [Algorithm](#algorithm)
- [Usage](#usage)
- [Example](#example)
- [Limitations](#limitations)

## Description

The Task Scheduling problem is often represented as a Directed Acyclic Graph (DAG) where each task is a node and each dependency is a directed edge. The aim is to find a sequence in which all tasks can be completed without violating dependencies.

### Problem Statement

Given a DAG, determine an order of tasks such that:
- Each task appears before any task that depends on it.
- If the graph has a cycle (cyclic dependency), no scheduling order is possible.

### Solution Approach

This implementation uses Kahn’s Algorithm for Topological Sorting:
1. **In-Degree Calculation**: Compute the in-degree (number of incoming edges) for each node.
2. **Queue Initialization**: Add all nodes with in-degree 0 to a queue, as these nodes have no dependencies.
3. **Processing Queue**: For each node in the queue:
   - Add it to the result (scheduled tasks).
   - For each outgoing edge, reduce the in-degree of the connected node. If any node’s in-degree becomes zero, add it to the queue.
4. **Cycle Check**: If all nodes are processed, a valid schedule exists; otherwise, the graph has a cycle.

```c
#define V 6
void topologicalSort(int graph[V][V], int inDegree[]) {
    int queue[V], front = 0, rear = 0;
    int result[V], index = 0;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i;
        }
    }

    while (front < rear) {
        int u = queue[front++];
        result[index++] = u;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] == 1) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    queue[rear++] = v;
                }
            }
        }
    }

    if (index != V) {
        printf("Cycle detected! Task scheduling not possible.\n");
        return;
    }

    printf("Task scheduling order:\n");
    for (int i = 0; i < V; i++) {
        printf("Task %d ", result[i]);
    }
    printf("\n");
}
```

## Usage

### Requirements
- C compiler (e.g., GCC).

### Running the Program

1. **Compile** the code using:
   ```bash
   gcc task_scheduling.c -o task_scheduling
   ```
2. **Execute** the program:
   ```bash
   ./task_scheduling
   ```

The program will output the scheduling order of tasks if a valid order exists, or indicate that a cycle was detected.

### Code Structure

- **topologicalSort**: Performs topological sorting using Kahn’s algorithm, stores the order in `result`, and detects cycles.
- **main**: Defines the adjacency matrix for the graph and initializes in-degrees, then calls `topologicalSort` to determine task order.

## Example

Using the adjacency matrix:
```
graph[V][V] = {
    {0, 1, 1, 0, 0, 0},
    {0, 0, 0, 1, 1, 0},
    {0, 0, 0, 0, 1, 1},
    {0, 0, 0, 0, 0, 0},
    {0, 0, 0, 0, 0, 1},
    {0, 0, 0, 0, 0, 0}
};
```

The output will be:
```
Task scheduling order:
Task 0 Task 1 Task 2 Task 3 Task 4 Task 5 
```

This result shows a valid task order where all dependencies are met.

## Limitations

- The algorithm only works for Directed Acyclic Graphs (DAGs). If the graph contains a cycle, no valid scheduling order exists.
- This implementation is designed for small graphs and may need optimization or alternative data structures for larger graphs.

---

### Notes

- The adjacency matrix can be modified to test other task dependency structures.
- This code assumes a fixed number of vertices (`V`). Adjust this constant and matrix size to test larger graphs.
