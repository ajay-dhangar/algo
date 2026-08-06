---
id: persistent-segment-tree
sidebar_position: 20
title: "Persistent Segment Tree"
sidebar_label: Persistent Segment Tree
description: "A Persistent Segment Tree keeps every previous version of itself accessible after an update, enabling efficient queries on historical states of an array."
tags: [persistent segment tree, segment trees, advance data structures, range queries]
---

A **Persistent Segment Tree** is a Segment Tree that preserves **all of its previous versions** whenever it is updated, instead of overwriting itself in place. Each update creates a new "version" of the tree that shares most of its structure with the previous version, so you can query the array **as it existed at any point in time**.

## Purpose

Persistent Segment Trees are used when a problem requires:

- **Querying historical versions** of an array (e.g., "what was the sum of range `[l, r]` after the 5th update?").
- **K-th smallest/largest element in a range** (a classic use case, often combined with coordinate compression).
- **Persistent Disjoint Set Union / other persistent structures** built on the same versioning idea.
- **Rollback-style undo functionality** without storing full copies of the array.

## How It Works

A normal Segment Tree update rewrites $O(\log n)$ nodes along the path from the root to the affected leaf, but those writes overwrite the old nodes.

A **persistent** version instead:

1. **Never mutates existing nodes.** On update, it creates **new copies only for the $O(\log n)$ nodes on the root-to-leaf path**.
2. **Reuses every other subtree** from the previous version by pointing to the same (unchanged) child nodes.
3. **Keeps an array of root pointers**, one per version, so any historical version can be queried by starting from its root.

Because only $O(\log n)$ new nodes are created per update, both time and extra space per update stay at $O(\log n)$, even though logically you now have access to every version of the tree ever created.

## Operations

1. **Build**: Construct version 0 from the initial array — $O(n)$.
2. **Update(version, idx, val)**: Create a new version with `arr[idx] = val`, reusing all unaffected nodes — $O(\log n)$.
3. **Query(version, l, r)**: Answer a range query against a specific historical version — $O(\log n)$.

## Time Complexity

- **Building (version 0)**: $O(n)$
- **Update (new version)**: $O(\log n)$ time, $O(\log n)$ extra space
- **Query (any version)**: $O(\log n)$
- **Total space for $q$ updates**: $O(n + q \log n)$

## Implementations

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    long long sum;
    Node *left, *right;
    Node(long long val = 0, Node* l = nullptr, Node* r = nullptr)
        : sum(val), left(l), right(r) {}
};

class PersistentSegmentTree {
    int n;
    vector<Node*> roots; // roots[v] = root of version v

    Node* build(vector<int>& arr, int start, int end) {
        if (start == end) return new Node(arr[start]);
        int mid = (start + end) / 2;
        Node* l = build(arr, start, mid);
        Node* r = build(arr, mid + 1, end);
        return new Node(l->sum + r->sum, l, r);
    }

    Node* update(Node* prev, int start, int end, int idx, int val) {
        if (start == end) return new Node(val);
        int mid = (start + end) / 2;
        if (idx <= mid) {
            Node* newLeft = update(prev->left, start, mid, idx, val);
            return new Node(newLeft->sum + prev->right->sum, newLeft, prev->right);
        } else {
            Node* newRight = update(prev->right, mid + 1, end, idx, val);
            return new Node(prev->left->sum + newRight->sum, prev->left, newRight);
        }
    }

    long long query(Node* node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0; // out of range
        if (l <= start && end <= r) return node->sum; // fully covered
        int mid = (start + end) / 2;
        return query(node->left, start, mid, l, r) +
               query(node->right, mid + 1, end, l, r);
    }

public:
    PersistentSegmentTree(vector<int>& arr) {
        n = arr.size();
        roots.push_back(build(arr, 0, n - 1)); // version 0
    }

    // Creates a new version from `version`, returns the new version index
    int update(int version, int idx, int val) {
        roots.push_back(update(roots[version], 0, n - 1, idx, val));
        return roots.size() - 1;
    }

    long long query(int version, int l, int r) {
        return query(roots[version], 0, n - 1, l, r);
    }
};
```

### Java

```java
class PersistentSegmentTree {
    static class Node {
        long sum;
        Node left, right;
        Node(long sum, Node left, Node right) {
            this.sum = sum;
            this.left = left;
            this.right = right;
        }
    }

    private int n;
    private java.util.List<Node> roots = new java.util.ArrayList<>();

    private Node build(int[] arr, int start, int end) {
        if (start == end) return new Node(arr[start], null, null);
        int mid = (start + end) / 2;
        Node l = build(arr, start, mid);
        Node r = build(arr, mid + 1, end);
        return new Node(l.sum + r.sum, l, r);
    }

    private Node update(Node prev, int start, int end, int idx, int val) {
        if (start == end) return new Node(val, null, null);
        int mid = (start + end) / 2;
        if (idx <= mid) {
            Node newLeft = update(prev.left, start, mid, idx, val);
            return new Node(newLeft.sum + prev.right.sum, newLeft, prev.right);
        } else {
            Node newRight = update(prev.right, mid + 1, end, idx, val);
            return new Node(prev.left.sum + newRight.sum, prev.left, newRight);
        }
    }

    private long query(Node node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return node.sum;
        int mid = (start + end) / 2;
        return query(node.left, start, mid, l, r) + query(node.right, mid + 1, end, l, r);
    }

    public PersistentSegmentTree(int[] arr) {
        n = arr.length;
        roots.add(build(arr, 0, n - 1)); // version 0
    }

    public int update(int version, int idx, int val) {
        roots.add(update(roots.get(version), 0, n - 1, idx, val));
        return roots.size() - 1;
    }

    public long query(int version, int l, int r) {
        return query(roots.get(version), 0, n - 1, l, r);
    }
}
```

### Python

```python
class Node:
    __slots__ = ("sum", "left", "right")
    def __init__(self, sum_val=0, left=None, right=None):
        self.sum = sum_val
        self.left = left
        self.right = right

class PersistentSegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.roots = [self._build(arr, 0, self.n - 1)]  # version 0

    def _build(self, arr, start, end):
        if start == end:
            return Node(arr[start])
        mid = (start + end) // 2
        left = self._build(arr, start, mid)
        right = self._build(arr, mid + 1, end)
        return Node(left.sum + right.sum, left, right)

    def _update(self, prev, start, end, idx, val):
        if start == end:
            return Node(val)
        mid = (start + end) // 2
        if idx <= mid:
            new_left = self._update(prev.left, start, mid, idx, val)
            return Node(new_left.sum + prev.right.sum, new_left, prev.right)
        else:
            new_right = self._update(prev.right, mid + 1, end, idx, val)
            return Node(prev.left.sum + new_right.sum, prev.left, new_right)

    def update(self, version, idx, val):
        """Creates a new version from `version`; returns the new version index."""
        self.roots.append(self._update(self.roots[version], 0, self.n - 1, idx, val))
        return len(self.roots) - 1

    def _query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return node.sum
        mid = (start + end) // 2
        return self._query(node.left, start, mid, l, r) + self._query(node.right, mid + 1, end, l, r)

    def query(self, version, l, r):
        return self._query(self.roots[version], 0, self.n - 1, l, r)
```

### Pseudo Code

```
function build(arr, start, end):
    if start == end: return Node(arr[start])
    mid = (start + end) / 2
    left = build(arr, start, mid)
    right = build(arr, mid + 1, end)
    return Node(left.sum + right.sum, left, right)

function update(prevNode, start, end, idx, val):
    if start == end: return Node(val)         // new leaf, old one untouched
    mid = (start + end) / 2
    if idx <= mid:
        newLeft = update(prevNode.left, start, mid, idx, val)
        return Node(newLeft.sum + prevNode.right.sum, newLeft, prevNode.right)  // reuse right subtree
    else:
        newRight = update(prevNode.right, mid + 1, end, idx, val)
        return Node(prevNode.left.sum + newRight.sum, prevNode.left, newRight) // reuse left subtree

function query(node, start, end, l, r):
    if r < start or end < l: return 0
    if l <= start and end <= r: return node.sum
    mid = (start + end) / 2
    return query(node.left, start, mid, l, r) + query(node.right, mid + 1, end, l, r)
```

## Compare Languages Side-by-Side

<LanguageComparator algorithm="persistent-segment-tree" />

## Complexity Cheat Sheet

| Operation | Time Complexity | Extra Space per Call |
| :--- | :--- | :--- |
| **Build (version 0)** | $O(n)$ | $O(n)$ |
| **Update (new version)** | $O(\log n)$ | $O(\log n)$ |
| **Query (any version)** | $O(\log n)$ | $O(1)$ |
| **Total after $q$ updates** | - | $O(n + q \log n)$ |

## Common Use Cases

- **K-th smallest element in `arr[l..r]`**: build one persistent tree per prefix (over compressed values), then binary-search on the tree using `roots[r]` and `roots[l-1]`.
- **Version-controlled arrays**: undo/redo functionality where each edit is a cheap new version instead of a full array copy.
- **Persistent Union-Find**: the same "never mutate, always branch" idea applied to disjoint-set structures.

## Conclusion

A Persistent Segment Tree extends the ordinary Segment Tree with cheap, full version history by copying only the $O(\log n)$ nodes touched by each update and reusing everything else. It's a key building block in competitive programming for offline range queries, k-th order statistics, and any problem that needs to reason about "the array as it was at time `t`."
