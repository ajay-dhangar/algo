---
id: heavy-light-decomposition
sidebar_position: 21
title: "Heavy-Light Decomposition"
sidebar_label: Heavy-Light Decomposition
description: "Heavy-Light Decomposition breaks a tree into chains so that path queries and updates can be answered in O(log^2 n) using a Segment Tree."
tags: [heavy-light decomposition, trees, segment trees, advance data structures]
---

**Heavy-Light Decomposition (HLD)** is a technique for decomposing a tree into a set of vertical chains so that **any path between two nodes** can be broken into $O(\log n)$ chain segments. Combined with a **Segment Tree** (or Fenwick Tree) over each chain, this lets you answer path queries and updates (sum, max, etc.) between any two nodes in $O(\log^2 n)$, instead of $O(n)$ with a naive walk.

## Purpose

Heavy-Light Decomposition is used when a problem asks you to:

- **Query or update values along the path** between two arbitrary nodes in a tree (e.g., "what is the maximum edge weight on the path from `u` to `v`?").
- **Support subtree queries** as well as path queries efficiently, since HLD also gives each subtree a contiguous range.
- Solve tree problems that would otherwise require $O(n)$ per query if walked naively.

## How It Works

1. **Classify edges as heavy or light.**
   For every node, the edge to the child with the **largest subtree size** is a **heavy edge**; all other child edges are **light edges**.

2. **Chains.**
   Following only heavy edges from any node forms a **heavy chain**. Every node belongs to exactly one chain. Light edges always connect the *bottom* of one chain to the *top* of another.

3. **Flatten chains into an array.**
   Assign each node a position in a base array such that **every heavy chain occupies a contiguous range**. Build a Segment Tree over this array.

4. **Key property — at most $O(\log n)$ light edges on any root-to-node path.**
   Because every time you cross a light edge the subtree size at least halves, a path between any two nodes crosses at most $O(\log n)$ chains.

5. **Path query(u, v).**
   Repeatedly jump `u` (or `v`, whichever has the deeper chain top) to the top of its current chain, query that chain's contiguous segment in the Segment Tree, then move to the parent of the chain top — continue until `u` and `v` are in the same chain, then do one final query. Each "jump" is $O(\log n)$ (segment tree query), and there are $O(\log n)$ jumps, giving $O(\log^2 n)$ total.

## Operations

1. **Preprocessing**: Compute subtree sizes, heavy child per node, chain heads, depths, and the flattened array positions — $O(n)$.
2. **Path Query(u, v)**: Combine segment tree queries over $O(\log n)$ chain segments — $O(\log^2 n)$.
3. **Path Update(u, v, val)**: Same chain-jumping approach, applying a range update per chain segment — $O(\log^2 n)$.
4. **Subtree Query/Update(u)**: Since each subtree is also a contiguous range in the flattened array, this is a single Segment Tree query/update — $O(\log n)$.

## Time Complexity

- **Preprocessing (two DFS passes)**: $O(n)$
- **Path Query / Update**: $O(\log^2 n)$
- **Subtree Query / Update**: $O(\log n)$
- **Space**: $O(n)$

## Implementations

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;
const int MAXN = 100005;

vector<int> adj[MAXN];
int parent_[MAXN], depth_[MAXN], subtreeSize[MAXN], heavyChild[MAXN];
int chainHead[MAXN], posInBase[MAXN], nodeValue[MAXN];
int baseArray[MAXN];
int timer_ = 0;

// Segment tree for range max on the flattened array
int seg[4 * MAXN];
void build(int node, int start, int end) {
    if (start == end) { seg[node] = baseArray[start]; return; }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    seg[node] = max(seg[2 * node], seg[2 * node + 1]);
}
void update(int node, int start, int end, int idx, int val) {
    if (start == end) { seg[node] = val; return; }
    int mid = (start + end) / 2;
    if (idx <= mid) update(2 * node, start, mid, idx, val);
    else update(2 * node + 1, mid + 1, end, idx, val);
    seg[node] = max(seg[2 * node], seg[2 * node + 1]);
}
int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INT_MIN;
    if (l <= start && end <= r) return seg[node];
    int mid = (start + end) / 2;
    return max(query(2 * node, start, mid, l, r), query(2 * node + 1, mid + 1, end, l, r));
}

// Pass 1: compute subtree sizes & heavy child
int dfsSize(int u, int p) {
    parent_[u] = p;
    subtreeSize[u] = 1;
    int maxChildSize = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        depth_[v] = depth_[u] + 1;
        int childSize = dfsSize(v, u);
        subtreeSize[u] += childSize;
        if (childSize > maxChildSize) {
            maxChildSize = childSize;
            heavyChild[u] = v;
        }
    }
    return subtreeSize[u];
}

// Pass 2: assign chain heads and flatten positions
void dfsHLD(int u, int head) {
    chainHead[u] = head;
    posInBase[u] = timer_++;
    baseArray[posInBase[u]] = nodeValue[u];
    if (heavyChild[u] != -1)
        dfsHLD(heavyChild[u], head); // continue same chain
    for (int v : adj[u]) {
        if (v != parent_[u] && v != heavyChild[u])
            dfsHLD(v, v); // start a new chain
    }
}

// Path max query between u and v
int pathQuery(int u, int v) {
    int result = INT_MIN;
    while (chainHead[u] != chainHead[v]) {
        if (depth_[chainHead[u]] < depth_[chainHead[v]]) swap(u, v);
        result = max(result, query(1, 0, timer_ - 1, posInBase[chainHead[u]], posInBase[u]));
        u = parent_[chainHead[u]];
    }
    if (depth_[u] > depth_[v]) swap(u, v);
    result = max(result, query(1, 0, timer_ - 1, posInBase[u], posInBase[v]));
    return result;
}
```

### Python

```python
import sys
sys.setrecursionlimit(200000)

class HeavyLightDecomposition:
    def __init__(self, n, adj, values):
        self.n = n
        self.adj = adj
        self.values = values
        self.parent = [0] * n
        self.depth = [0] * n
        self.subtree_size = [1] * n
        self.heavy_child = [-1] * n
        self.chain_head = [0] * n
        self.pos_in_base = [0] * n
        self.timer = 0
        self.base_array = [0] * n

        self._dfs_size(0, -1)
        self._dfs_hld(0, 0)
        self.seg = [float("-inf")] * (4 * n)
        self._build(1, 0, n - 1)

    def _dfs_size(self, u, p):
        self.parent[u] = p
        size = 1
        max_child_size = 0
        for v in self.adj[u]:
            if v == p:
                continue
            self.depth[v] = self.depth[u] + 1
            child_size = self._dfs_size(v, u)
            size += child_size
            if child_size > max_child_size:
                max_child_size = child_size
                self.heavy_child[u] = v
        self.subtree_size[u] = size
        return size

    def _dfs_hld(self, u, head):
        self.chain_head[u] = head
        self.pos_in_base[u] = self.timer
        self.base_array[self.timer] = self.values[u]
        self.timer += 1
        if self.heavy_child[u] != -1:
            self._dfs_hld(self.heavy_child[u], head)  # extend same chain
        for v in self.adj[u]:
            if v != self.parent[u] and v != self.heavy_child[u]:
                self._dfs_hld(v, v)  # new chain

    def _build(self, node, start, end):
        if start == end:
            self.seg[node] = self.base_array[start]
            return
        mid = (start + end) // 2
        self._build(2 * node, start, mid)
        self._build(2 * node + 1, mid + 1, end)
        self.seg[node] = max(self.seg[2 * node], self.seg[2 * node + 1])

    def _query(self, node, start, end, l, r):
        if r < start or end < l:
            return float("-inf")
        if l <= start and end <= r:
            return self.seg[node]
        mid = (start + end) // 2
        return max(self._query(2 * node, start, mid, l, r),
                    self._query(2 * node + 1, mid + 1, end, l, r))

    def path_query(self, u, v):
        result = float("-inf")
        while self.chain_head[u] != self.chain_head[v]:
            if self.depth[self.chain_head[u]] < self.depth[self.chain_head[v]]:
                u, v = v, u
            result = max(result, self._query(1, 0, self.n - 1,
                                               self.pos_in_base[self.chain_head[u]],
                                               self.pos_in_base[u]))
            u = self.parent[self.chain_head[u]]
        if self.depth[u] > self.depth[v]:
            u, v = v, u
        result = max(result, self._query(1, 0, self.n - 1, self.pos_in_base[u], self.pos_in_base[v]))
        return result
```

### Pseudo Code

```
// Pass 1: sizes and heavy child
function dfsSize(u, parent):
    size = 1
    for each child v of u (v != parent):
        depth[v] = depth[u] + 1
        childSize = dfsSize(v, u)
        size += childSize
        if childSize > size of current heavyChild[u]:
            heavyChild[u] = v
    subtreeSize[u] = size
    return size

// Pass 2: chain heads + flattened positions
function dfsHLD(u, head):
    chainHead[u] = head
    posInBase[u] = timer++
    if heavyChild[u] exists:
        dfsHLD(heavyChild[u], head)      // same chain continues
    for each child v of u (v != parent, v != heavyChild[u]):
        dfsHLD(v, v)                     // v starts a brand-new chain

function pathQuery(u, v):
    result = identity
    while chainHead[u] != chainHead[v]:
        if depth[chainHead[u]] < depth[chainHead[v]]: swap(u, v)
        result = combine(result, segmentTreeQuery(posInBase[chainHead[u]], posInBase[u]))
        u = parent[chainHead[u]]
    if depth[u] > depth[v]: swap(u, v)
    result = combine(result, segmentTreeQuery(posInBase[u], posInBase[v]))
    return result
```

## Complexity Cheat Sheet

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Preprocessing (2 DFS passes)** | $O(n)$ | $O(n)$ |
| **Path Query / Update** | $O(\log^2 n)$ | - |
| **Subtree Query / Update** | $O(\log n)$ | - |
| **Segment Tree storage** | - | $O(n)$ |

## Common Use Cases

- **Path max/sum/gcd queries** on trees (e.g., "heaviest edge on the path between two cities").
- **Path updates**, such as adding a value to every node/edge on a path (e.g., range-update variant of the segment tree).
- **LCA computation** as a byproduct — the chain-jumping loop naturally terminates at the LCA of `u` and `v`.
- Common in competitive programming problems tagged "tree + range query."

## Conclusion

Heavy-Light Decomposition turns tree path queries into a small number of contiguous-range Segment Tree queries by exploiting the fact that any root-to-node path crosses at most $O(\log n)$ "light" edges. It's one of the most important techniques for handling path and subtree queries efficiently on trees, and a natural next step after learning Segment Trees and LCA.
