---
id: disjoint-set-union
title: Disjoint Set Union (DSU) / Union-Find
sidebar_label: Disjoint Set Union (DSU)
description: "A comprehensive guide to Disjoint Set Union (DSU) with visual diagrams, Path Compression, Union by Rank optimizations, step-by-step dry-runs, code templates in Python, Java, and C++, and practice problems."
tags:
  [
    dsu,
    union-find,
    disjoint-set,
    algorithms,
    advanced,
    graphs,
    dsa,
    competitive-programming,
    interview-prep,
  ]
---

# Disjoint Set Union (DSU) / Union-Find

**Disjoint Set Union (DSU)**, also called **Union-Find**, is a powerful data structure that efficiently tracks a collection of elements partitioned into **non-overlapping (disjoint) sets**. It answers two questions in nearly O(1) time:

1. **Find**: Which set does this element belong to?
2. **Union**: Merge two sets together.

---

## 🧠 Real-World Analogy

Think of students in different friend groups:

```
Initially everyone is their own group:
{Alice}  {Bob}  {Charlie}  {David}  {Eve}

After Alice and Bob become friends → Union(Alice, Bob):
{Alice, Bob}  {Charlie}  {David}  {Eve}

After Charlie and David become friends → Union(Charlie, David):
{Alice, Bob}  {Charlie, David}  {Eve}

After Bob and Charlie become friends → Union(Bob, Charlie):
{Alice, Bob, Charlie, David}  {Eve}

Are Alice and David in the same group? → Find(Alice) == Find(David)? → YES ✅
Are Alice and Eve in the same group?   → Find(Alice) == Find(Eve)?   → NO  ❌
```

---

## 🐢 Naive Implementation (Without Optimizations)

Each element points to a **parent**. The root of the tree is the **representative** of the set.

```
Initial state: parent[i] = i (everyone is their own parent)
Elements: 0  1  2  3  4
parent:   0  1  2  3  4

Union(0,1): parent[1] = 0
  0  1  2  3  4
  |
  1

Union(1,2): parent[2] = 1
  0
  |
  1
  |
  2

Union(2,3): parent[3] = 2
  0
  |
  1
  |
  2
  |
  3
```

⚠️ **Problem**: Tree becomes a chain → Find() takes O(n) per call!

---

## ⚡ Optimization 1: Union by Rank

**Idea**: Always attach the **shorter tree** under the **taller tree** to keep the tree flat.

```
Union by Rank — always attach smaller rank under larger rank:

rank[0]=0  rank[1]=0  rank[2]=0  rank[3]=0

Union(0,1): rank equal → make 0 root of 1, rank[0]++
  0(rank=1)
  |
  1(rank=0)

Union(2,3): rank equal → make 2 root of 3, rank[2]++
  2(rank=1)
  |
  3(rank=0)

Union(0,2): rank equal → make 0 root of 2, rank[0]++
      0(rank=2)
     / \
    1   2(rank=1)
        |
        3

Tree stays BALANCED → max height = O(log n)
```

---

## ⚡ Optimization 2: Path Compression

**Idea**: When we call Find(x), make **every node on the path point directly to the root**. This flattens the tree for all future calls.

```
Before Path Compression:
Find(3) traverses: 3 → 2 → 0 (root)

     0
     |
     2
     |
     3

After Path Compression (Find(3)):
All nodes on path now point directly to root 0:

     0
    /|\
   1  2  3   ← 3 now points directly to 0!

Next Find(3) = O(1) ✅
```

---

## 🔥 Combined: Path Compression + Union by Rank

This gives **nearly O(1)** amortized time per operation — the most efficient possible.

```
Time Complexity: O(α(n)) per operation
where α = inverse Ackermann function ≈ constant (≤ 5) for all practical inputs
```

---

## 💻 Full Implementation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))  # parent[i] = i initially
        self.rank = [0] * n           # rank[i] = 0 initially

    def find(self, x):
        # Path Compression: point directly to root
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already in same set

        # Union by Rank: attach smaller rank under larger rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True  # Successfully merged

    def connected(self, x, y):
        return self.find(x) == self.find(y)


# Example Usage
dsu = DSU(5)
dsu.union(0, 1)
dsu.union(2, 3)
dsu.union(1, 2)

print(dsu.connected(0, 3))  # True  → 0-1-2-3 all connected
print(dsu.connected(0, 4))  # False → 4 is isolated
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class DSU {
    private int[] parent;
    private int[] rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;  // each element is its own parent
            rank[i] = 0;
        }
    }

    // Find with Path Compression
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // path compression
        }
        return parent[x];
    }

    // Union with Union by Rank
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) return false;  // already in same set

        // Attach smaller rank under larger rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }

        return true;  // successfully merged
    }

    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }

    public static void main(String[] args) {
        DSU dsu = new DSU(5);
        dsu.union(0, 1);
        dsu.union(2, 3);
        dsu.union(1, 2);

        System.out.println(dsu.connected(0, 3));  // true
        System.out.println(dsu.connected(0, 4));  // false
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <vector>
#include <numeric>
#include <iostream>
using namespace std;

class DSU {
public:
    vector<int> parent, rank_;

    DSU(int n) {
        parent.resize(n);
        rank_.resize(n, 0);
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }

    // Find with Path Compression
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // path compression
        }
        return parent[x];
    }

    // Union with Union by Rank
    bool union_(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) return false;  // already in same set

        // Attach smaller rank under larger rank
        if (rank_[rootX] < rank_[rootY]) {
            parent[rootX] = rootY;
        } else if (rank_[rootX] > rank_[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank_[rootX]++;
        }

        return true;  // successfully merged
    }

    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};

int main() {
    DSU dsu(5);
    dsu.union_(0, 1);
    dsu.union_(2, 3);
    dsu.union_(1, 2);

    cout << dsu.connected(0, 3) << endl;  // 1 (true)
    cout << dsu.connected(0, 4) << endl;  // 0 (false)
    return 0;
}
```

  </TabItem>
</Tabs>

---

## 🔍 Step-by-Step Dry Run

```
n=6, Elements: 0 1 2 3 4 5
Initial: parent=[0,1,2,3,4,5]  rank=[0,0,0,0,0,0]

─────────────────────────────────────────────
Union(0, 1):
  find(0)=0, find(1)=1
  rank equal → parent[1]=0, rank[0]=1
  parent=[0,0,2,3,4,5]  rank=[1,0,0,0,0,0]

  0(rank=1)
  |
  1

─────────────────────────────────────────────
Union(2, 3):
  find(2)=2, find(3)=3
  rank equal → parent[3]=2, rank[2]=1
  parent=[0,0,2,2,4,5]  rank=[1,0,1,0,0,0]

  0(rank=1)    2(rank=1)
  |            |
  1            3

─────────────────────────────────────────────
Union(4, 5):
  find(4)=4, find(5)=5
  rank equal → parent[5]=4, rank[4]=1
  parent=[0,0,2,2,4,4]  rank=[1,0,1,0,1,0]

  0(rank=1)    2(rank=1)    4(rank=1)
  |            |            |
  1            3            5

─────────────────────────────────────────────
Union(0, 2):
  find(0)=0, find(2)=2
  rank[0]=1 == rank[2]=1 → parent[2]=0, rank[0]=2
  parent=[0,0,0,2,4,4]  rank=[2,0,1,0,1,0]

       0(rank=2)
      / \
     1   2(rank=1)
         |
         3

─────────────────────────────────────────────
Union(0, 4):
  find(0)=0, find(4)=4
  rank[0]=2 > rank[4]=1 → parent[4]=0
  parent=[0,0,0,2,0,4]  rank=[2,0,1,0,1,0]

         0(rank=2)
       / | \
      1  2   4(rank=1)
         |   |
         3   5

─────────────────────────────────────────────
Find(5) with Path Compression:
  5 → parent[5]=4 → parent[4]=0 (root!)
  Path compress: parent[5] = 0 directly!
  parent=[0,0,0,2,0,0]

         0(rank=2)
       / | \ \
      1  2  4  5   ← 5 now points directly to 0!
         |
         3

─────────────────────────────────────────────
connected(3, 5)?
  find(3): 3→2→0 (root), path compress → parent[3]=0
  find(5): 5→0 (root, already compressed)
  find(3)==find(5) → 0==0 → TRUE ✅
```

---

## 🌍 Classic Application: Cycle Detection in Graph

```
Problem: Given edges [(0,1),(1,2),(2,0)], detect if there's a cycle.

DSU = {0,1,2} initially

Edge(0,1): find(0)=0, find(1)=1 → different → union → no cycle
Edge(1,2): find(1)=0, find(2)=2 → different → union → no cycle
Edge(2,0): find(2)=0, find(0)=0 → SAME ROOT → CYCLE DETECTED! 🔴
```

<Tabs>
  <TabItem value="python" label="Python" default>

```python
def has_cycle(n, edges):
    dsu = DSU(n)
    for u, v in edges:
        if not dsu.union(u, v):
            return True   # same component → cycle!
    return False

print(has_cycle(3, [(0,1),(1,2),(2,0)]))  # True
print(has_cycle(3, [(0,1),(1,2)]))        # False
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
public class GraphCycleDetector {
    public static boolean hasCycle(int n, int[][] edges) {
        DSU dsu = new DSU(n);
        for (int[] edge : edges) {
            if (!dsu.union(edge[0], edge[1])) {
                return true;  // same component → cycle!
            }
        }
        return false;
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
bool hasCycle(int n, vector<pair<int,int>>& edges) {
    DSU dsu(n);
    for (auto& [u, v] : edges) {
        if (!dsu.union_(u, v)) {
            return true;  // same component → cycle!
        }
    }
    return false;
}
```

  </TabItem>
</Tabs>

---

## ⚡ Brute Force vs DSU

```
Problem: Check if nodes A and B are connected after Q union operations

❌ BRUTE FORCE (BFS/DFS each time):
  Each query: O(V + E)
  Q queries:  O(Q × (V + E))
  For Q=10⁵, V=10⁵ → 10¹⁰ operations → TLE ❌

✅ DSU with Path Compression + Union by Rank:
  Each union/find: O(α(n)) ≈ O(1)
  Q queries: O(Q × α(n)) ≈ O(Q)
  For Q=10⁵ → 10⁵ operations → Fast ✅
```

---

## 📊 Complexity Summary

| Operation | Naive DSU | Union by Rank only | Path Compression only | Both Optimizations |
| --------- | --------- | ------------------ | --------------------- | ------------------ |
| Find      | O(n)      | O(log n)           | O(log n) amortized    | **O(α(n)) ≈ O(1)** |
| Union     | O(n)      | O(log n)           | O(log n) amortized    | **O(α(n)) ≈ O(1)** |
| Space     | O(n)      | O(n)               | O(n)                  | **O(n)**           |

> α(n) = Inverse Ackermann function. For all practical values of n (up to 10^80), α(n) ≤ 5.

---

## ❌ Common Mistakes

1. **Not using Path Compression** — Without it, Find() degrades to O(n) for skewed trees.
2. **Not using Union by Rank** — Leads to unbalanced trees even with path compression.
3. **Forgetting to check if already connected before union** — Always check `find(x) == find(y)` first to avoid redundant merges.
4. **Using 1-indexed elements with 0-indexed parent array** — Initialize `parent` of size `n+1` if elements are 1-indexed.
5. **Modifying rank incorrectly** — Only increment rank when two trees of equal rank merge.

---

## 🏋️ Practice Problems

| #   | Problem                                     | Concept              | Difficulty |
| --- | ------------------------------------------- | -------------------- | ---------- |
| 1   | Number of Connected Components in Graph     | Basic DSU            | 🟢 Easy    |
| 2   | Find if Path Exists in Graph                | Basic DSU            | 🟢 Easy    |
| 3   | Redundant Connection                        | Cycle Detection      | 🟡 Medium  |
| 4   | Number of Provinces                         | Connected Components | 🟡 Medium  |
| 5   | Accounts Merge                              | DSU with strings     | 🟡 Medium  |
| 6   | Most Stones Removed with Same Row or Column | DSU on coordinates   | 🟡 Medium  |
| 7   | Satisfiability of Equality Equations        | DSU on characters    | 🟡 Medium  |
| 8   | Kruskal's Minimum Spanning Tree             | DSU + Greedy         | 🔴 Hard    |
| 9   | Swim in Rising Water                        | DSU + Binary Search  | 🔴 Hard    |

---

## 🌍 Real-World Applications

- **Network connectivity** — Check if two computers are in the same network
- **Kruskal's MST algorithm** — Build minimum spanning tree by adding edges without creating cycles
- **Image segmentation** — Group pixels belonging to the same region
- **Social networks** — Friend circle / community detection
- **Compiler optimization** — Pointer analysis / Alias analysis (e.g., Steensgaard's algorithm) to group aliased variables

---

## 🔗 References

- [DSU - CP-Algorithms](https://cp-algorithms.com/data_structures/disjoint_set_union.html)
- [Union-Find - GeeksforGeeks](https://www.geeksforgeeks.org/union-find/)
- [Number of Connected Components - LeetCode 323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
- [Redundant Connection - LeetCode 684](https://leetcode.com/problems/redundant-connection/)
- [Accounts Merge - LeetCode 721](https://leetcode.com/problems/accounts-merge/)
