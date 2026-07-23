---
id: trie
title: Trie (Prefix Tree)
sidebar_label: Trie (Prefix Tree)
description: "A comprehensive guide to the Trie (Prefix Tree) data structure with visual diagrams, Insert, Search, Delete, and AutoComplete implementations in Python, Java, and C++, and practice problems."
tags:
  [
    trie,
    prefix-tree,
    data-structures,
    advanced,
    dsa,
    strings,
    interview-prep,
    competitive-programming,
  ]
---

# Trie (Prefix Tree)

A **Trie** (pronounced "try", from re**trie**val) is a tree-based data structure designed for storing and searching strings with shared prefixes. Unlike a HashMap, a Trie lets you search by **prefix** in O(m) time where m is the length of the word — making it the backbone of search autocomplete, spell checkers, and IP routing.

## Video Explanation

<LiteYouTubeEmbed
  id="zIjfhVPRZCg"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Data Structures: Tries"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

---

## 🧠 Why Trie? — Comparison with Other Structures

```
Store words: ["apple", "app", "apt", "bat", "ball"]
Then answer: "Give all words starting with 'ap'"

❌ Array/List:
  Scan every word → O(n × m) per query → slow for large dictionaries

❌ HashMap:
  O(1) exact lookup but NO prefix search support
  "app" → exists, but "give all words starting with ap" requires scanning all keys

✅ Trie:
  Insert: O(m) per word
  Prefix search: O(m) to reach prefix node, then collect all words below → Fast!
```

---

## 🌳 Trie Structure — Visual Diagram

```
Words inserted: ["app", "apple", "apt", "bat", "ball"]

                root
               /    \
              a      b
              |      |
              p      a
             / \    / \
            p   t  t   l
            |   |  |   |
           [✓] [✓][✓]  l
            |           |
            l           [✓]
            |
            e
            |
           [✓]

[✓] = isEndOfWord is true

Paths from root:
root→a→p→p        = "app"   ✓
root→a→p→p→l→e    = "apple" ✓
root→a→p→t        = "apt"   ✓
root→b→a→t        = "bat"   ✓
root→b→a→l→l      = "ball"  ✓
```

---

## 🔩 Node Structure

```
Each Trie node contains:
1. children[26]  → array of 26 pointers (one per lowercase letter a-z)
                   children[0] = pointer to 'a' child
                   children[1] = pointer to 'b' child
                   ...
                   children[25] = pointer to 'z' child
2. isEndOfWord   → boolean flag: true if a valid word ends at this node

Initially all children = null, isEndOfWord = false
```

---

## ➕ Operation 1: Insert

### Visual Dry-Run — Insert "app"

```
Start at root. Word = "app"

Character 'a':
  root.children[0] == null? → YES → create new node
  Move to children[0]

Character 'p':
  node.children[15] == null? → YES → create new node
  Move to children[15]

Character 'p':
  node.children[15] == null? → YES → create new node
  Move to children[15]

End of word → set isEndOfWord = true ✓

root → [a] → [p] → [p*]     (* = end of word)
```

### Visual Dry-Run — Insert "apple" after "app"

```
Word = "apple"

'a' → node exists (root.children[0]) → just move, no new node
'p' → node exists → just move
'p' → node exists → just move  (this was end of "app", stays end)
'l' → null → create new node, move
'e' → null → create new node, move
End → isEndOfWord = true ✓

root → [a] → [p] → [p*] → [l] → [e*]
```

### Code

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```python
class TrieNode:
    def __init__(self):
        self.children = {}        # char → TrieNode
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()   # create node if missing
            node = node.children[char]              # move to next node
        node.is_end_of_word = True                  # mark end of word

# Example
trie = Trie()
trie.insert("app")
trie.insert("apple")
trie.insert("apt")
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.HashMap;

class TrieNode {
    HashMap<Character, TrieNode> children;
    boolean isEndOfWord;

    public TrieNode() {
        children = new HashMap<>();
        isEndOfWord = false;
    }
}

public class Trie {
    protected TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) {
                node.children.put(c, new TrieNode());  // create node if missing
            }
            node = node.children.get(c);               // move to next node
        }
        node.isEndOfWord = true;                       // mark end of word
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
#include <vector>
#include <string>
#include <iostream>
using namespace std;

struct TrieNode {
    vector<TrieNode*> children;
    bool isEndOfWord;

    TrieNode() : children(26, nullptr), isEndOfWord(false) {}
    ~TrieNode() {
        for (auto child : children) {
            delete child;
        }
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    ~Trie() {
        delete root;
    }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) {
                node->children[idx] = new TrieNode();  // create node if missing
            }
            node = node->children[idx];                // move to next node
        }
        node->isEndOfWord = true;                      // mark end of word
    }
};
```

  </TabItem>
</Tabs>

**Time Complexity:** O(m) where m = length of word
**Space Complexity:** O(m) per word inserted

---

## 🔍 Operation 2: Search (Exact Word)

### Visual Dry-Run

```
Trie contains: ["app", "apple", "apt"]

root → [a] → [p] → [p*] → [l] → [e*]
                  ↘ [t*]

Search "app":
'a' → exists → move
'p' → exists → move
'p' → exists → move
End → isEndOfWord = TRUE ✅ → "app" EXISTS

Search "ap":
'a' → exists → move
'p' → exists → move
End → isEndOfWord = FALSE ❌ → "ap" is NOT a word
(node exists as prefix but not marked as complete word)
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False        # path doesn't exist
            node = node.children[char]
        return node.is_end_of_word  # true only if complete word
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return false;           // path doesn't exist
            }
            node = node.children.get(c);
        }
        return node.isEndOfWord;        // true only if complete word
    }
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
    bool search(const string& word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) {
                return false;           // path doesn't exist
            }
            node = node->children[idx];
        }
        return node->isEndOfWord;       // true only if complete word
    }
```

  </TabItem>
</Tabs>

**Time Complexity:** O(m) &nbsp;|&nbsp; **Space Complexity:** O(1)

---

## 🔎 Operation 3: StartsWith (Prefix Search)

### Visual Dry-Run

```
startsWith("ap"):
'a' → exists → move
'p' → exists → move
Reached end of prefix → node exists → TRUE ✅

startsWith("bx"):
'b' → exists → move
'x' → does NOT exist → FALSE ❌

Key difference:
search("ap")     → FALSE (not a complete word)
startsWith("ap") → TRUE  (it IS a valid prefix)
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False        # prefix path doesn't exist
            node = node.children[char]
        return True                 # prefix exists
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return false;           // prefix path doesn't exist
            }
            node = node.children.get(c);
        }
        return true;                    // prefix exists
    }
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
    bool startsWith(const string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) {
                return false;           // prefix path doesn't exist
            }
            node = node->children[idx];
        }
        return true;                    // prefix exists
    }
```

  </TabItem>
</Tabs>

**Time Complexity:** O(m) &nbsp;|&nbsp; **Space Complexity:** O(1)

---

## 🗑️ Operation 4: Delete

### Visual Dry-Run

```
Delete "app" from Trie containing ["app", "apple", "apt"]

Before:
root → [a] → [p] → [p*] → [l] → [e*]
                  ↘ [t*]

Strategy: Only unmark isEndOfWord at the last node.
Do NOT delete the node — "apple" still needs this path!

After deleting "app":
root → [a] → [p] → [p] → [l] → [e*]   ← 'p' no longer end of word
                  ↘ [t*]

search("app")   → FALSE ✅ (deleted)
search("apple") → TRUE  ✅ (intact)
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
    def delete(self, word: str) -> bool:
        if not self.search(word):
            return False

        def _delete(node, word, depth):
            if depth == len(word):
                node.is_end_of_word = False
                return len(node.children) == 0

            char = word[depth]
            if _delete(node.children[char], word, depth + 1):
                del node.children[char]
                return len(node.children) == 0 and not node.is_end_of_word
            return False

        _delete(self.root, word, 0)
        return True
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
    public boolean delete(String word) {
        if (!search(word)) return false;
        deleteHelper(root, word, 0);
        return true;
    }

    private boolean deleteHelper(TrieNode node, String word, int depth) {
        if (depth == word.length()) {
            node.isEndOfWord = false;
            return node.children.isEmpty();
        }

        char c = word.charAt(depth);
        boolean shouldDelete = deleteHelper(node.children.get(c), word, depth + 1);

        if (shouldDelete) {
            node.children.remove(c);
            return node.children.isEmpty() && !node.isEndOfWord;
        }

        return false;
    }
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
    bool deleteWord(const string& word) {
        if (!search(word)) return false;
        deleteWordHelper(root, word, 0);
        return true;
    }

private:
    bool deleteWordHelper(TrieNode* node, const string& word, int depth) {
        if (depth == (int)word.size()) {
            node->isEndOfWord = false;
            for (auto child : node->children)
                if (child) return false;
            return true;
        }

        int idx = word[depth] - 'a';
        bool shouldDelete = deleteWordHelper(node->children[idx], word, depth + 1);

        if (shouldDelete) {
            delete node->children[idx];
            node->children[idx] = nullptr;
            if (!node->isEndOfWord) {
                for (auto child : node->children)
                    if (child) return false;
                return true;
            }
        }

        return false;
    }
```

  </TabItem>
</Tabs>

**Time Complexity:** O(m) &nbsp;|&nbsp; **Space Complexity:** O(m) recursion stack

---

## ✨ Bonus: AutoComplete Feature

### Visual Dry-Run

```
Trie: ["app", "apple", "apt", "bat", "ball"]
AutoComplete("ap"):

Step 1: Navigate to node for prefix "ap"
  root → 'a' → 'p' → [at this node]

Step 2: DFS from this node collecting all complete words
  → 'p'* → found "app"
       → 'l' → 'e'* → found "apple"
  → 't'* → found "apt"

Result: ["app", "apple", "apt"] ✅
```

### Code

<Tabs>
  <TabItem value="python" label="Python" default>

```python
class TrieWithAutoComplete(Trie):
    def autocomplete(self, prefix: str) -> list:
        node = self.root

        # Navigate to prefix node
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]

        # DFS to collect all words
        results = []
        self._dfs(node, prefix, results)
        return results

    def _dfs(self, node, current_word, results):
        if node.is_end_of_word:
            results.append(current_word)
        for char, child_node in node.children.items():
            self._dfs(child_node, current_word + char, results)

# Example
trie = TrieWithAutoComplete()
for word in ["app", "apple", "apt", "bat", "ball"]:
    trie.insert(word)

print(trie.autocomplete("ap"))   # ['app', 'apple', 'apt']
print(trie.autocomplete("ba"))   # ['bat', 'ball']
print(trie.autocomplete("xyz"))  # []
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

public class TrieWithAutoComplete extends Trie {

    public List<String> autocomplete(String prefix) {
        TrieNode node = root;
        List<String> results = new ArrayList<>();

        // Navigate to prefix node
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return results;
            node = node.children.get(c);
        }

        // DFS to collect all words
        dfs(node, new StringBuilder(prefix), results);
        return results;
    }

    private void dfs(TrieNode node, StringBuilder current, List<String> results) {
        if (node.isEndOfWord) {
            results.add(current.toString());
        }
        for (char c : node.children.keySet()) {
            current.append(c);
            dfs(node.children.get(c), current, results);
            current.deleteCharAt(current.length() - 1);  // backtrack
        }
    }
}
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```cpp
class TrieWithAutoComplete : public Trie {
public:
    vector<string> autocomplete(const string& prefix) {
        TrieNode* node = root;
        vector<string> results;

        // Navigate to prefix node
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) return results;
            node = node->children[idx];
        }

        // DFS to collect all words
        string current = prefix;
        dfs(node, current, results);
        return results;
    }

private:
    void dfs(TrieNode* node, string& current, vector<string>& results) {
        if (node->isEndOfWord) results.push_back(current);
        for (int i = 0; i < 26; i++) {
            if (node->children[i]) {
                current.push_back('a' + i);
                dfs(node->children[i], current, results);
                current.pop_back();     // backtrack
            }
        }
    }
};
```

  </TabItem>
</Tabs>

---

## ⚡ Brute Force vs Trie

```
Dictionary: 100,000 words, average length 8
Query: "Find all words starting with 'pre'"

❌ BRUTE FORCE — O(n × m):
  Check every word: 100,000 × 8 = 800,000 operations per query

✅ TRIE — O(m + k):
  Navigate prefix "pre": 3 steps
  Collect k=500 matching words: 503 operations total

Speedup: ~1,600x faster ✅
```

---

## 📊 Complexity Summary

| Operation    | Time     | Space      |
| ------------ | -------- | ---------- |
| Insert       | O(m)     | O(m)       |
| Search       | O(m)     | O(1)       |
| StartsWith   | O(m)     | O(1)       |
| Delete       | O(m)     | O(m) stack |
| AutoComplete | O(m + k) | O(k)       |

> m = length of word/prefix &nbsp;|&nbsp; k = number of results returned

---

## ❌ Common Mistakes

1. **Confusing search() and startsWith()** — `search("app")` checks for a complete word. `startsWith("app")` checks for any word with that prefix. They return different results!
2. **Deleting shared prefix nodes** — Never delete a node if other words share its path. Always check children before removing.
3. **Case sensitivity** — Tries are case-sensitive. Always normalize input to lowercase before inserting or searching.
4. **Array vs HashMap for children** — Array `children[26]` is O(1) access but wastes memory. HashMap uses less memory but has overhead. Choose based on your character set size.
5. **Forgetting isEndOfWord** — Inserting "apple" without marking `isEndOfWord=true` causes `search("apple")` to return false even though the path exists.

---

## 🏋️ Practice Problems

| #   | Problem                      | Concept                    | Difficulty |
| --- | ---------------------------- | -------------------------- | ---------- |
| 1   | Implement Trie (Prefix Tree) | Insert, Search, StartsWith | 🟡 Medium  |
| 2   | Longest Common Prefix        | Trie traversal             | 🟢 Easy    |
| 3   | Design Add and Search Words  | Wildcard search in Trie    | 🟡 Medium  |
| 4   | Replace Words                | Prefix replacement         | 🟡 Medium  |
| 5   | Map Sum Pairs                | Trie with values           | 🟡 Medium  |
| 6   | Word Search II               | Trie + DFS on grid         | 🔴 Hard    |
| 7   | Maximum XOR of Two Numbers   | Binary Trie                | 🔴 Hard    |
| 8   | Stream of Characters         | Trie + sliding window      | 🔴 Hard    |

---

## 🌍 Real-World Applications

- **Search autocomplete** — Google and Bing suggest completions as you type
- **Spell checker** — Word processors verify if a word exists in the dictionary
- **IP routing (LPM)** — Routers use binary Tries for Longest Prefix Match
- **T9 predictive text** — Mobile keyboard word prediction
- **DNA sequence matching** — Biological sequence databases

---

## 🔗 Related Topics

- **[Segment Tree](./segment-tree.md)**: Tree structure specialized for range queries and updates ($O(\log N)$).
- **[Disjoint Set Union (DSU)](./disjoint-set-union.md)**: Manages dynamic connectivity and equivalence relations ($O(\alpha(N))$).
- **[Two Pointers & Sliding Window](./two-pointers-sliding-window.md)**: Efficient subarray and substring processing techniques ($O(N)$).

---

## 🔗 References

- [Trie - GeeksforGeeks](https://www.geeksforgeeks.org/trie-insert-and-search/)
- [Implement Trie - LeetCode 208](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Design Add and Search Words - LeetCode 211](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
- [Word Search II - LeetCode 212](https://leetcode.com/problems/word-search-ii/)
