---
id: accounts-merge
title: "Accounts Merge"
sidebar_label: Accounts Merge
description: "Solution for LeetCode 721: Accounts Merge, utilizing Graph Traversal and Disjoint Set Union (DSU) to group connected components."
tags: [DSA, leetcode, graph, dsu, union-find, hash-table, sorting]
---

## Description:

Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails **in sorted order**. The accounts themselves can be returned in any order.


---

## Video Explanation:

<LiteYouTubeEmbed
  id="FMwpt_aQOGw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="G-50. Accounts Merge - DSU"
  poster="maxresdefault"
  webp
/>

---

## Approaches:

### 1. Disjoint Set Union (DSU) / Union-Find (Optimal)

This problem essentially asks us to find connected components, making it a perfect fit for a **Disjoint Set Union (DSU)** data structure. Every account index acts as a node in our graph, and we want to draw edges between accounts that share the same email address.

**Algorithm:**
1. **Initialize a DSU Structure:** Create a DSU (or Union-Find) initialized with `N` elements, where `N` is the total number of accounts.
2. **Map Emails to Nodes:** 
   - Traverse the `accounts` array.
   - For every email in an account, check if we have seen this email before (using a Hash Map `mapMailNode`).
   - If it's a new email, map it to the current account index `i`.
   - If we have seen it before, use the DSU to `union` the current account index `i` with the previously stored account index of that email. This operation dynamically merges their sets.
3. **Group Emails by Ultimate Parent:** 
   - After traversing all accounts, create an array of lists `mergedMail` of size `N`.
   - Iterate through every mapped email in the Hash Map. Find the ultimate parent (root node) of its assigned account index using the DSU.
   - Add the email into the `mergedMail` list at the ultimate parent's index.
4. **Format the Output:** 
   - Traverse the `mergedMail` structure. If an index is empty, skip it.
   - For non-empty lists, sort the emails lexicographically.
   - Prepend the account name `accounts[i][0]` to the sorted emails and push it to the final `ans` array.
   
#### Complexity
* **Time Complexity:** $O(N \times K \log(N \times K))$ where $N$ is the number of accounts and $K$ is the maximum number of emails per account. The Union-Find operations take nearly $O(1)$ constant time (specifically $O(\alpha(N))$). The dominating factor is the sorting step at the end for each group of emails, which takes $O(E \log E)$ where $E$ is the number of unique emails in an ultimate parent group.
* **Space Complexity:** $O(N \times K)$ to store the HashMap, the Disjoint Set arrays (parent and size variables), and the arrays holding the merged results.

#### Solutions:

**C++**
```cpp
class DisjointSet {
    vector<int> parent, size;
public:
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]); // Path compression
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        DisjointSet ds(n);
        unordered_map<string, int> mapMailNode;
        
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                string mail = accounts[i][j];
                if (mapMailNode.find(mail) == mapMailNode.end()) {
                    mapMailNode[mail] = i;
                } else {
                    ds.unionBySize(i, mapMailNode[mail]);
                }
            }
        }
        
        vector<vector<string>> mergedMail(n);
        for (auto it : mapMailNode) {
            string mail = it.first;
            int node = ds.findUPar(it.second);
            mergedMail[node].push_back(mail);
        }
        
        vector<vector<string>> ans;
        for (int i = 0; i < n; i++) {
            if (mergedMail[i].empty()) continue;
            sort(mergedMail[i].begin(), mergedMail[i].end());
            vector<string> temp;
            temp.push_back(accounts[i][0]); // Add Name
            for (auto it : mergedMail[i]) {
                temp.push_back(it);
            }
            ans.push_back(temp);
        }
        return ans;
    }
};
```

**Java**
```java
class DisjointSet {
    List<Integer> parent = new ArrayList<>();
    List<Integer> size = new ArrayList<>();
    
    public DisjointSet(int n) {
        for (int i = 0; i < n; i++) {
            parent.add(i);
            size.add(1);
        }
    }
    public int findUPar(int node) {
        if (node == parent.get(node)) return node;
        int ulp = findUPar(parent.get(node));
        parent.set(node, ulp);
        return parent.get(node);
    }
    public void unionBySize(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size.get(ulp_u) < size.get(ulp_v)) {
            parent.set(ulp_u, ulp_v);
            size.set(ulp_v, size.get(ulp_v) + size.get(ulp_u));
        } else {
            parent.set(ulp_v, ulp_u);
            size.set(ulp_u, size.get(ulp_u) + size.get(ulp_v));
        }
    }
}

class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        DisjointSet ds = new DisjointSet(n);
        Map<String, Integer> mapMailNode = new HashMap<>();
        
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts.get(i).size(); j++) {
                String mail = accounts.get(i).get(j);
                if (!mapMailNode.containsKey(mail)) {
                    mapMailNode.put(mail, i);
                } else {
                    ds.unionBySize(i, mapMailNode.get(mail));
                }
            }
        }
        
        List<String>[] mergedMail = new ArrayList[n];
        for (int i = 0; i < n; i++) mergedMail[i] = new ArrayList<String>();
        
        for (Map.Entry<String, Integer> it : mapMailNode.entrySet()) {
            String mail = it.getKey();
            int node = ds.findUPar(it.getValue());
            mergedMail[node].add(mail);
        }
        
        List<List<String>> ans = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (mergedMail[i].isEmpty()) continue;
            Collections.sort(mergedMail[i]);
            List<String> temp = new ArrayList<>();
            temp.add(accounts.get(i).get(0)); // Add Name
            temp.addAll(mergedMail[i]);
            ans.add(temp);
        }
        return ans;
    }
}
```

**Python**
```py
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def findUPar(self, node):
        if self.parent[node] == node:
            return node
        self.parent[node] = self.findUPar(self.parent[node])
        return self.parent[node]

    def unionBySize(self, u, v):
        ulp_u = self.findUPar(u)
        ulp_v = self.findUPar(v)
        if ulp_u == ulp_v:
            return
        if self.size[ulp_u] < self.size[ulp_v]:
            self.parent[ulp_u] = ulp_v
            self.size[ulp_v] += self.size[ulp_u]
        else:
            self.parent[ulp_v] = ulp_u
            self.size[ulp_u] += self.size[ulp_v]

class Solution:
    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:
        n = len(accounts)
        ds = DisjointSet(n)
        map_mail_node = {}
        
        for i in range(n):
            for j in range(1, len(accounts[i])):
                mail = accounts[i][j]
                if mail not in map_mail_node:
                    map_mail_node[mail] = i
                else:
                    ds.unionBySize(i, map_mail_node[mail])
                    
        merged_mail = [[] for _ in range(n)]
        for mail, node in map_mail_node.items():
            root_node = ds.findUPar(node)
            merged_mail[root_node].append(mail)
            
        ans = []
        for i in range(n):
            if not merged_mail[i]:
                continue
            merged_mail[i].sort()
            temp = [accounts[i][0]] + merged_mail[i]
            ans.append(temp)
            
        return ans
```

**JavaScript**
```js
class DisjointSet {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }
    findUPar(node) {
        if (node === this.parent[node]) return node;
        return this.parent[node] = this.findUPar(this.parent[node]);
    }
    unionBySize(u, v) {
        const ulp_u = this.findUPar(u);
        const ulp_v = this.findUPar(v);
        if (ulp_u === ulp_v) return;
        if (this.size[ulp_u] < this.size[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
            this.size[ulp_v] += this.size[ulp_u];
        } else {
            this.parent[ulp_v] = ulp_u;
            this.size[ulp_u] += this.size[ulp_v];
        }
    }
}

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    const n = accounts.length;
    const ds = new DisjointSet(n);
    const mapMailNode = new Map();
    
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < accounts[i].length; j++) {
            const mail = accounts[i][j];
            if (!mapMailNode.has(mail)) {
                mapMailNode.set(mail, i);
            } else {
                ds.unionBySize(i, mapMailNode.get(mail));
            }
        }
    }
    
    const mergedMail = Array.from({ length: n }, () => []);
    for (const [mail, node] of mapMailNode.entries()) {
        const rootNode = ds.findUPar(node);
        mergedMail[rootNode].push(mail);
    }
    
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (mergedMail[i].length === 0) continue;
        mergedMail[i].sort();
        ans.push([accounts[i][0], ...mergedMail[i]]);
    }
    
    return ans;
};
```