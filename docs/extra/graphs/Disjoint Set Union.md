---
id: disjoint-set-union
title: Disjoint Set Union (DSU)
sidebar_label: Introduction to Disjoint Set Union
description: 'The Disjoint Set Union (DSU) algorithm efficiently manages dynamic connectivity and union-find operations.'
tags: [dsa, data-structures, DSU, C language]
---

### Solutions:


## C++ 

```c
#include <vector>
using namespace std;

class DisjointSetUnion {
public:
    vector<int> parent, rank;

    // Constructor to initialize the DSU
    DisjointSetUnion(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    // Find function with path compression
    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);  // Path compression
        }
        return parent[u];
    }

    // Union function with union by rank
    void unionSets(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);

        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
};

// Example Usage
int main() {
    DisjointSetUnion dsu(5);  // Create 5 disjoint sets
    dsu.unionSets(0, 1);
    dsu.unionSets(1, 2);
    cout << dsu.find(0) << endl;  // Output: 0
    cout << dsu.find(1) << endl;  // Output: 0 (due to union)
    return 0;
}
```

## Java

```java
public class DisjointSetUnion {
    private int[] parent;
    private int[] rank;

    // Constructor to initialize the DSU
    public DisjointSetUnion(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    // Find function with path compression
    public int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);  // Path compression
        }
        return parent[u];
    }

    // Union function with union by rank
    public void union(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);

        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }

    // Example Usage
    public static void main(String[] args) {
        DisjointSetUnion dsu = new DisjointSetUnion(5);  // Create 5 disjoint sets
        dsu.union(0, 1);
        dsu.union(1, 2);
        System.out.println(dsu.find(0));  // Output: 0
        System.out.println(dsu.find(1));  // Output: 0 (due to union)
    }
}
```

## Python

```python
class DisjointSetUnion:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
    
    # Find function with path compression
    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])  # Path compression
        return self.parent[u]
    
    # Union function with union by rank
    def union(self, u, v):
        rootU = self.find(u)
        rootV = self.find(v)
        
        if rootU != rootV:
            if self.rank[rootU] > self.rank[rootV]:
                self.parent[rootV] = rootU
            elif self.rank[rootU] < self.rank[rootV]:
                self.parent[rootU] = rootV
            else:
                self.parent[rootV] = rootU
                self.rank[rootU] += 1

# Example Usage
dsu = DisjointSetUnion(5)  # Create 5 disjoint sets
dsu.union(0, 1)
dsu.union(1, 2)
print(dsu.find(0))  # Output: 0
print(dsu.find(1))  # Output: 0 (due to union)

```



## Key Concepts:

➢ Path Compression: When performing the find operation, we make all nodes
   point directly to the root, flattening the structure and speeding up future operations.
➢ Union by Rank: The smaller tree is attached under the root of the larger
   tree to keep the tree as flat as possible, improving the efficiency of find operations.



All three implementations support efficient find and union operations with a time complexity of nearly O(1) due to path compression and union by rank.