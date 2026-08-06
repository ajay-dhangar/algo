/**
 * Central registry of code-snippet sets used by <LanguageComparator />.
 *
 * Each entry maps an algorithm id to a small set of language implementations.
 * Doc authors reference an entry by id (see MDXComponents.js registration):
 *
 *   <LanguageComparator algorithm="sqrt-decomposition" />
 *
 * Add a new algorithm by adding a new key here — no changes needed to the
 * component itself.
 */

export interface LanguageSnippet {
  label: string;
  language: string; // Prism language id
  code: string;
}

export interface ComparatorEntry {
  title: string;
  languages: Record<string, LanguageSnippet>;
}

export const CODE_SNIPPET_REGISTRY: Record<string, ComparatorEntry> = {
  "sqrt-decomposition": {
    title: "Sqrt Decomposition — Range Sum Query",
    languages: {
      cpp: {
        label: "C++",
        language: "cpp",
        code: `class SqrtDecomposition {
    vector<int> arr;
    vector<long long> blockSum;
    int n, blockSize;

public:
    SqrtDecomposition(vector<int>& input) {
        arr = input;
        n = arr.size();
        blockSize = max(1, (int)sqrt(n));
        blockSum.assign((n / blockSize) + 1, 0);
        for (int i = 0; i < n; i++) {
            blockSum[i / blockSize] += arr[i];
        }
    }

    long long query(int l, int r) {
        long long sum = 0;
        while (l <= r) {
            int startOfBlock = (l / blockSize) * blockSize;
            int endOfBlock = min(startOfBlock + blockSize - 1, n - 1);
            if (startOfBlock == l && endOfBlock <= r) {
                sum += blockSum[l / blockSize];
                l = endOfBlock + 1;
            } else {
                sum += arr[l];
                l++;
            }
        }
        return sum;
    }

    void update(int idx, int val) {
        blockSum[idx / blockSize] += (val - arr[idx]);
        arr[idx] = val;
    }
};`,
      },
      java: {
        label: "Java",
        language: "java",
        code: `class SqrtDecomposition {
    private int[] arr;
    private long[] blockSum;
    private int n, blockSize;

    public SqrtDecomposition(int[] input) {
        arr = input.clone();
        n = arr.length;
        blockSize = Math.max(1, (int) Math.sqrt(n));
        blockSum = new long[(n / blockSize) + 1];
        for (int i = 0; i < n; i++) {
            blockSum[i / blockSize] += arr[i];
        }
    }

    public long query(int l, int r) {
        long sum = 0;
        while (l <= r) {
            int startOfBlock = (l / blockSize) * blockSize;
            int endOfBlock = Math.min(startOfBlock + blockSize - 1, n - 1);
            if (startOfBlock == l && endOfBlock <= r) {
                sum += blockSum[l / blockSize];
                l = endOfBlock + 1;
            } else {
                sum += arr[l];
                l++;
            }
        }
        return sum;
    }

    public void update(int idx, int val) {
        blockSum[idx / blockSize] += (val - arr[idx]);
        arr[idx] = val;
    }
}`,
      },
      python: {
        label: "Python",
        language: "python",
        code: `import math

class SqrtDecomposition:
    def __init__(self, arr):
        self.arr = arr[:]
        self.n = len(arr)
        self.block_size = max(1, int(math.sqrt(self.n)))
        self.block_sum = [0] * ((self.n // self.block_size) + 1)
        for i, val in enumerate(arr):
            self.block_sum[i // self.block_size] += val

    def query(self, l, r):
        total = 0
        while l <= r:
            start_of_block = (l // self.block_size) * self.block_size
            end_of_block = min(start_of_block + self.block_size - 1, self.n - 1)
            if start_of_block == l and end_of_block <= r:
                total += self.block_sum[l // self.block_size]
                l = end_of_block + 1
            else:
                total += self.arr[l]
                l += 1
        return total

    def update(self, idx, val):
        self.block_sum[idx // self.block_size] += (val - self.arr[idx])
        self.arr[idx] = val`,
      },
    },
  },

  "persistent-segment-tree": {
    title: "Persistent Segment Tree — Versioned Range Sum",
    languages: {
      cpp: {
        label: "C++",
        language: "cpp",
        code: `struct Node {
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
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return node->sum;
        int mid = (start + end) / 2;
        return query(node->left, start, mid, l, r) +
               query(node->right, mid + 1, end, l, r);
    }

public:
    PersistentSegmentTree(vector<int>& arr) {
        n = arr.size();
        roots.push_back(build(arr, 0, n - 1)); // version 0
    }

    int update(int version, int idx, int val) {
        roots.push_back(update(roots[version], 0, n - 1, idx, val));
        return roots.size() - 1;
    }

    long long query(int version, int l, int r) {
        return query(roots[version], 0, n - 1, l, r);
    }
};`,
      },
      java: {
        label: "Java",
        language: "java",
        code: `class PersistentSegmentTree {
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
}`,
      },
      python: {
        label: "Python",
        language: "python",
        code: `class Node:
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
        """Creates a new version from \`version\`; returns the new version index."""
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
        return self._query(self.roots[version], 0, self.n - 1, l, r)`,
      },
    },
  },

  "heavy-light-decomposition": {
    title: "Heavy-Light Decomposition — Path Max Query",
    languages: {
      cpp: {
        label: "C++",
        language: "cpp",
        code: `const int MAXN = 100005;
vector<int> adj[MAXN];
int parent_[MAXN], depth_[MAXN], subtreeSize[MAXN], heavyChild[MAXN];
int chainHead[MAXN], posInBase[MAXN], nodeValue[MAXN];
int baseArray[MAXN];
int timer_ = 0;
int seg[4 * MAXN];

void build(int node, int start, int end) {
    if (start == end) { seg[node] = baseArray[start]; return; }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    seg[node] = max(seg[2 * node], seg[2 * node + 1]);
}

int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INT_MIN;
    if (l <= start && end <= r) return seg[node];
    int mid = (start + end) / 2;
    return max(query(2 * node, start, mid, l, r), query(2 * node + 1, mid + 1, end, l, r));
}

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
}`,
      },
      python: {
        label: "Python",
        language: "python",
        code: `class HeavyLightDecomposition:
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
        return result`,
      },
    },
  },
};

export type ComparatorAlgorithmId = keyof typeof CODE_SNIPPET_REGISTRY;
