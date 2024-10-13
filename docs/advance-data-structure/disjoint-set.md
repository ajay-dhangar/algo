---
id: disjoint-set-union
sidebar_position: 1
title: Disjoint Set Union (Union-Find)
sidebar_label: Disjoint Set Union
description: "Disjoint Set Union (Union-Find) is an efficient data structure to track the union of disjoint sets."
tags: [union-find, advance data structures, disjoint set]
---

# Disjoint Set Union (Union-Find)

The **Disjoint Set Union (DSU)**, also known as **Union-Find**, is an efficient data structure that tracks a collection of disjoint (non-overlapping) sets. It supports two main operations efficiently:

- **Find**: Determine the root or representative of the set containing a specific element.
- **Union**: Merge two sets into a single set.

## Purpose

The Union-Find data structure is widely used in algorithms that require grouping elements and checking for connectivity, such as:

- **Dynamic connectivity problems**.
- **Kruskal’s Algorithm** for finding the Minimum Spanning Tree (MST) in graphs.
- **Network connectivity**.

## Operations

1. **Make Set**: Initialize a set with a single element.
2. **Find**: Determine the root of the set containing the element.
3. **Union**: Join two sets.

## Time Complexity

- **Time Complexity**: O(α(n)) per operation, where α(n) is the inverse Ackermann function, which grows extremely slowly.

## Implementations

### C++

```cpp
#include <iostream>
using namespace std;

class DisjointSet {
    int *parent, *rank;
    int n;

public:
    DisjointSet(int n) {
        this->n = n;
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    int find(int v) {
        if (v == parent[v])
            return v;
        return parent[v] = find(parent[v]); // Path compression
    }

    void unionSets(int a, int b) {
        a = find(a);
        b = find(b);
        if (a != b) {
            if (rank[a] < rank[b])
                swap(a, b);
            parent[b] = a;
            if (rank[a] == rank[b])
                rank[a]++;
        }
    }
};
```
### Java
```java
class DisjointSet {
    private int[] parent, rank;

    public DisjointSet(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    public int find(int v) {
        if (v == parent[v])
            return v;
        return parent[v] = find(parent[v]); // Path compression
    }

    public void union(int a, int b) {
        a = find(a);
        b = find(b);
        if (a != b) {
            if (rank[a] < rank[b])
                swap(a, b);
            parent[b] = a;
            if (rank[a] == rank[b])
                rank[a]++;
        }
    }

    private void swap(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
    }
}
```
### Python
```python
class DisjointSet:
    def __init__(self, n):
        self.parent = [i for i in range(n)]
        self.rank = [0] * n

    def find(self, v):
        if v != self.parent[v]:
            self.parent[v] = self.find(self.parent[v])  # Path compression
        return self.parent[v]

    def union(self, a, b):
        a = self.find(a)
        b = self.find(b)
        if a != b:
            if self.rank[a] < self.rank[b]:
                a, b = b, a
            self.parent[b] = a
            if self.rank[a] == self.rank[b]:
                self.rank[a] += 1
```
### Pseudo Code
```
function makeSet(n):
    parent = array of size n
    rank = array of size n
    for i from 0 to n-1:
        parent[i] = i
        rank[i] = 0

function find(v):
    if v == parent[v]:
        return v
    parent[v] = find(parent[v])  // Path compression
    return parent[v]

function union(a, b):
    a = find(a)
    b = find(b)
    if a != b:
        if rank[a] < rank[b]:
            swap(a, b)
        parent[b] = a
        if rank[a] == rank[b]:
            rank[a] += 1
```
### Conclusion
The Disjoint Set Union (Union-Find) is an essential data structure for efficiently managing disjoint sets and performing union and find operations. 
Its applications in network connectivity and graph algorithms make it a fundamental topic in data structures and algorithms.