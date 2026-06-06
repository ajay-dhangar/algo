---
id: disjoint-set-union-algo
sidebar_position: 19
title: "Disjoint Set Union (Union Find)"
sidebar_label: Disjoint Set Union
description: "An overview of the Disjoint Set Union (Union Find) data structure, including implementations in C++, Java, and Python, complexity analysis, and applications."
tags: [algorithms, data-structures, union-find, graph-theory]
---

### Definition:

The **Disjoint Set Union (DSU)**, also known as **Union Find**, is a data structure that efficiently maintains a collection of disjoint (non-overlapping) sets. It supports two primary operations:

* **Find(x)**: Determines which set an element belongs to.
* **Union(x, y)**: Merges the sets containing elements `x` and `y`.

DSU is widely used in graph algorithms, particularly in **Kruskal's Minimum Spanning Tree Algorithm**, connected component detection, and dynamic connectivity problems.

### Characteristics:

* **Efficient Set Management**
  Maintains multiple disjoint sets efficiently.

* **Path Compression**
  Optimizes the Find operation by making nodes point directly to the root.

* **Union by Rank / Size**
  Keeps the tree shallow by attaching smaller trees under larger ones.

* **Near Constant Time Operations**
  With both optimizations, operations run in almost constant time.

### Time Complexity:

* **Find Operation:** O(α(N))
* **Union Operation:** O(α(N))
* **Average Case:** O(α(N))
* **Worst Case:** O(α(N))

Where `α(N)` is the inverse Ackermann function, which grows extremely slowly and is practically constant.

### Space Complexity:

* **Space Complexity:** O(N)

### Approach:

1. Initialize each element as its own parent.
2. Use Find to determine set representatives.
3. Use Union to merge sets.
4. Apply Path Compression during Find.
5. Apply Union by Rank or Size during Union.

---

### C++ Implementation:

```cpp
#include <bits/stdc++.h>
using namespace std;

class DSU {
private:
    vector<int> parent, rankv;

public:
    DSU(int n) {
        parent.resize(n);
        rankv.resize(n, 0);

        for (int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int x) {
        if (parent[x] == x)
            return x;

        return parent[x] = find(parent[x]);
    }

    void unite(int x, int y) {
        int px = find(x);
        int py = find(y);

        if (px == py) return;

        if (rankv[px] < rankv[py])
            parent[px] = py;
        else if (rankv[px] > rankv[py])
            parent[py] = px;
        else {
            parent[py] = px;
            rankv[px]++;
        }
    }
};

int main() {
    DSU dsu(5);

    dsu.unite(0, 1);
    dsu.unite(1, 2);

    cout << (dsu.find(0) == dsu.find(2)) << endl;

    return 0;
}
```

### Output

```text
1
```

---

### Java Implementation:

```java
class DSU {
    int[] parent;
    int[] rank;

    DSU(int n) {
        parent = new int[n];
        rank = new int[n];

        for (int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);

        return parent[x];
    }

    void union(int x, int y) {
        int px = find(x);
        int py = find(y);

        if (px == py) return;

        if (rank[px] < rank[py])
            parent[px] = py;
        else if (rank[px] > rank[py])
            parent[py] = px;
        else {
            parent[py] = px;
            rank[px]++;
        }
    }
}
```

---

### Python Implementation:

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])

        return self.parent[x]

    def union(self, x, y):
        px = self.find(x)
        py = self.find(y)

        if px == py:
            return

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1


dsu = DSU(5)
dsu.union(0, 1)
dsu.union(1, 2)

print(dsu.find(0) == dsu.find(2))
```

---

## Complexity Analysis

### Time Complexity

| Operation | Complexity |
| --------- | ---------- |
| Find      | O(α(N))    |
| Union     | O(α(N))    |

### Space Complexity

* **O(N)**

---

## Applications of DSU

* Kruskal's Minimum Spanning Tree Algorithm
* Connected Components in Graphs
* Cycle Detection in Undirected Graphs
* Dynamic Connectivity Problems
* Network Clustering
* Image Processing and Segmentation

---

## Advantages

* Extremely efficient.
* Easy to implement.
* Near constant-time operations.
* Widely used in competitive programming and graph algorithms.

## Limitations

* Does not support efficient split operations.
* Primarily useful for connectivity-related problems.

## Conclusion

Disjoint Set Union (Union Find) is one of the most important data structures in graph theory and competitive programming. Through Path Compression and Union by Rank, it achieves near constant-time performance, making it ideal for connectivity queries, cycle detection, and minimum spanning tree algorithms.
