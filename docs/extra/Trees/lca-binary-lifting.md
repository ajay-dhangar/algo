````md
---
id: lca-binary-lifting
title: "Lowest Common Ancestor (LCA) using Binary Lifting"
sidebar_label: LCA using Binary Lifting
sidebar_position: 14
description: "Learn how to find the Lowest Common Ancestor (LCA) in a tree efficiently using the Binary Lifting (Binary Doubling) technique."
tags: [data structures, trees, dynamic programming, binary-lifting]
---



Finding the **Lowest Common Ancestor (LCA)** of two nodes in a tree is a fundamental problem. While a simple recursive depth-first search (DFS) can find the LCA in $\mathcal{O}(N)$ time, it is highly inefficient if we have to answer multiple queries on a large tree.

The **Binary Lifting** technique is an advanced approach that leverages **Dynamic Programming (Binary Doubling)** to answer each LCA query in **$\mathcal{O}(\log N)$** time, with a one-time preprocessing step of **$\mathcal{O}(N \log N)$**.

---

## Video Explanation

<LiteYouTubeEmbed
  id="_-QHfMDde90"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L27. Lowest Common Ancestor in Binary Tree | LCA | C++ | Java"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

## The Core Intuition: Jumping in Powers of 2

Instead of climbing up the tree one step at a time (which takes $\mathcal{O}(N)$ in the worst case), binary lifting allows us to "jump" up the tree in powers of 2 ($1, 2, 4, 8, 16, \dots$). 

Any integer distance $d$ can be uniquely represented as a sum of powers of 2 (binary representation). For example, if a node needs to go up $13$ levels, it can jump:

$$\text{Distance } 13 = 2^3 + 2^2 + 2^0 = 8 + 4 + 1$$

To achieve this, we precompute a table `up[node][i]` which stores the **$2^i$-th ancestor** of each `node`.

---

## Mathematical Formulation & DP State

Let `up[u][i]` be the $2^i$-th ancestor of node `u`.

- **Base Case ($i = 0$)**: The $2^0$-th (first) ancestor of node `u` is its immediate parent.

  $$\text{up}[u][0] = \text{parent}[u]$$

- **Transitions ($i > 0$)**: The $2^i$-th ancestor is the $2^{i-1}$-th ancestor of the $2^{i-1}$-th ancestor of `u`.

  $$\text{up}[u][i] = \text{up}[\text{up}[u][i-1]][i-1]$$

### Visual Representation of Jumps

```mermaid
graph TD
    Ancestor["up[u][i] (2^i-th Parent)"]
    MidAncestor["up[u][i-1] (2^(i-1)-th Parent)"]
    Node["u (Start Node)"]
    
    MidAncestor -->|2^(i-1) levels| Ancestor
    Node -->|2^(i-1) levels| MidAncestor
    Node -.->|Total jump of 2^i levels| Ancestor
    
    style Node fill:#6c5ce7,stroke:#333,stroke-width:2px,color:#fff
    style Ancestor fill:#00b894,stroke:#333,stroke-width:2px,color:#fff
````

---

## The Algorithm Design

The algorithm consists of two distinct phases: **Preprocessing** and **Query Processing**.

### Phase 1: Preprocessing ($\mathcal{O}(N \log N)$)

1. Run a Depth-First Search (DFS) starting from the root node.
2. During the DFS, calculate the `depth` of each node and set its immediate parent: `up[u][0] = parent`.
3. Fill the rest of the dynamic programming table `up[u][i]` for $i$ from $1$ to $\log_2(N)$ using the DP transition.

### Phase 2: Query Processing ($\mathcal{O}(\log N)$)

To find the LCA of two nodes `u` and `v`:

1. **Align Depths**: If `u` and `v` are at different depths, lift the deeper node up until its depth matches the other node's depth.
2. **Check for Equality**: If `u` becomes equal to `v`, then `u` (or `v`) is the LCA.
3. **Lift Together**: If they are still different, we try to make the largest possible jumps up the tree. We check if `up[u][i]` is not equal to `up[v][i]`. If they are different, we jump both nodes to their respective ancestors: `u = up[u][i]` and `v = up[v][i]`. We repeat this from $i = \log_2(N)$ down to $0$.
4. **Final Step**: After the loop terminates, both `u` and `v` will be exactly one level below their common ancestor. Therefore, the LCA is `up[u][0]`.

---


## Implementations

<Tabs>
  <TabItem value="cpp" label="C++" default>

```cpp
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

class TreeLCA {
private:
    int n;
    int l;
    vector<vector<int>> adj;
    vector<int> depth;
    vector<vector<int>> up;

    // DFS to record depth and immediate parent
    void dfs(int v, int p, int d) {
        depth[v] = d;
        up[v][0] = p;

        // Compute dynamic programming transitions for binary lifting
        for (int i = 1; i <= l; ++i) {
            up[v][i] = up[up[v][i - 1]][i - 1];
        }

        for (int u : adj[v]) {
            if (u != p) {
                dfs(u, v, d + 1);
            }
        }
    }

public:
    TreeLCA(int nodes, const vector<vector<int>>& adjList) {
        n = nodes;
        adj = adjList;
        l = n > 0 ? ceil(log2(n)) : 0;

        depth.resize(n);
        up.assign(n, vector<int>(l + 1));

        // Precompute starting from root (node 0)
        if (n > 0) {
            dfs(0, 0, 0);
        }
    }

    // Lift a node 'v' up by 'k' levels
    int getKthAncestor(int v, int k) {
        for (int i = 0; i <= l; ++i) {
            if ((k >> i) & 1) {
                v = up[v][i];
            }
        }
        return v;
    }

    // Find the Lowest Common Ancestor
    int getLCA(int u, int v) {
        // 1. Ensure 'u' is the deeper node
        if (depth[u] < depth[v]) {
            swap(u, v);
        }

        // 2. Bring both nodes to the same depth
        u = getKthAncestor(u, depth[u] - depth[v]);

        // 3. If they are the same node, we found the LCA
        if (u == v) return u;

        // 4. Lift both nodes up simultaneously
        for (int i = l; i >= 0; --i) {
            if (up[u][i] != up[v][i]) {
                u = up[u][i];
                v = up[v][i];
            }
        }

        // 5. The parent of either node is now the LCA
        return up[u][0];
    }
};

int main() {
    // Example: Tree with 7 nodes (0 to 6)
    //       0
    //      / \
    //     1   2
    //    / \   \
    //   3   4   5
    //      /
    //     6

    int n = 7;
    vector<vector<int>> adj(n);

    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0, 5};
    adj[3] = {1};
    adj[4] = {1, 6};
    adj[5] = {2};
    adj[6] = {4};

    TreeLCA lcaFinder(n, adj);

    cout << "LCA of 3 and 6: " 
         << lcaFinder.getLCA(3, 6) 
         << " (Expected: 1)" << endl;

    cout << "LCA of 6 and 5: " 
         << lcaFinder.getLCA(6, 5) 
         << " (Expected: 0)" << endl;

    cout << "LCA of 4 and 6: " 
         << lcaFinder.getLCA(4, 6) 
         << " (Expected: 4)" << endl;

    return 0;
}
```

  </TabItem>

  <TabItem value="python" label="Python">

```python
import math

class TreeLCA:
    def __init__(self, n, adj):
        self.n = n
        self.adj = adj
        self.l = math.ceil(math.log2(n)) if n > 0 else 0

        self.depth = [0] * n
        self.up = [[0] * (self.l + 1) for _ in range(n)]

        # Start DFS from root (node 0)
        if n > 0:
            self._dfs(0, 0, 0)

    def _dfs(self, v, p, d):
        self.depth[v] = d
        self.up[v][0] = p

        # Fill DP transitions for binary lifting
        for i in range(1, self.l + 1):
            self.up[v][i] = self.up[self.up[v][i - 1]][i - 1]

        for u in self.adj[v]:
            if u != p:
                self._dfs(u, v, d + 1)

    def get_kth_ancestor(self, v, k):
        """Lifts node 'v' up by 'k' levels."""
        for i in range(self.l + 1):
            if (k >> i) & 1:
                v = self.up[v][i]
        return v

    def get_lca(self, u, v):
        """Finds the Lowest Common Ancestor of 'u' and 'v'."""

        # 1. Bring u to be the deeper node
        if self.depth[u] < self.depth[v]:
            u, v = v, u

        # 2. Lift 'u' to same depth as 'v'
        u = self.get_kth_ancestor(u, self.depth[u] - self.depth[v])

        # 3. If they are the same node, we're done
        if u == v:
            return u

        # 4. Jump up together using decreasing powers of 2
        for i in range(self.l, -1, -1):
            if self.up[u][i] != self.up[v][i]:
                u = self.up[u][i]
                v = self.up[v][i]

        # 5. One step below the LCA, so return parent
        return self.up[u][0]


# Example Usage:
if __name__ == "__main__":

    # Tree Structure:
    #       0
    #      / \
    #     1   2
    #    / \   \
    #   3   4   5
    #      /
    #     6

    n = 7

    adj = [[] for _ in range(n)]

    adj[0] = [1, 2]
    adj[1] = [0, 3, 4]
    adj[2] = [0, 5]
    adj[3] = [1]
    adj[4] = [1, 6]
    adj[5] = [2]
    adj[6] = [4]

    lca_finder = TreeLCA(n, adj)

    print(f"LCA of 3 and 6: {lca_finder.get_lca(3, 6)} (Expected: 1)")
    print(f"LCA of 6 and 5: {lca_finder.get_lca(6, 5)} (Expected: 0)")
    print(f"LCA of 4 and 6: {lca_finder.get_lca(4, 6)} (Expected: 4)")
```

  </TabItem>
</Tabs>

---

## Step-by-Step Complexity Analysis

### Time Complexity

1. **Preprocessing Phase ($\mathcal{O}(N \log N)$)**:

   * The DFS visits each of the $N$ nodes exactly once.
   * At each node, we loop $\log_2(N)$ times to calculate the binary ancestors.
   * Total Preprocessing Time: $\mathcal{O}(N \log N)$.

2. **Query Phase ($\mathcal{O}(\log N)$)**:

   * Lifting a node to match the depth of another takes at most $\mathcal{O}(\log N)$ jumps.
   * Finding the LCA by jumping together also takes $\log_2(N)$ steps.
   * Total Query Time: $\mathcal{O}(\log N)$.

### Space Complexity

* **DP Table Space ($\mathcal{O}(N \log N)$)**:

  * We store a table `up[N][log N]` containing the ancestors.
  * DFS recursion call stack consumes $\mathcal{O}(H)$ space, where $H$ is the height of the tree.
  * Total Space Complexity: $\mathcal{O}(N \log N)$.

---

## When to use Binary Lifting?

| Algorithm                  | Preprocessing Time      | Query Time            | Best Use Case                                    |
| :------------------------- | :---------------------- | :-------------------- | :----------------------------------------------- |
| **Simple DFS / Recursion** | None                    | $\mathcal{O}(N)$      | Only a single query or small tree size.          |
| **RMQ (Sparse Table)**     | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$      | Static trees with **millions** of queries.       |
| **Binary Lifting**         | $\mathcal{O}(N \log N)$ | $\mathcal{O}(\log N)$ | Standard online query sets; simple to implement. |

```
```
