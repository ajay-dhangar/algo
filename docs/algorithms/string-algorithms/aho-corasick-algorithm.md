---
id: aho-corasick-algorithm
title: "Aho-Corasick Algorithm"
sidebar_label: "Aho-Corasick"
sidebar_position: 9
description: "An efficient algorithm for multiple pattern matching using a trie and failure links."
tags: [pattern matching, string algorithms, Aho-Corasick, trie, competitive programming]
---

In computer science, the **Aho-Corasick Algorithm** is a string searching algorithm that efficiently finds multiple patterns in a given text. It constructs a finite-state machine in the form of a trie (prefix tree) with failure links, allowing it to search for all patterns simultaneously in linear time.

<AdsComponent />

## Overview

The **Aho-Corasick Algorithm** is a classical string matching algorithm used for efficiently finding multiple patterns within a given text. It constructs a finite-state machine in the form of a trie (prefix tree) with failure links, which allows it to search for all patterns simultaneously in linear time.

### Time Complexity:
- **Construction Time:** O(m), where `m` is the total number of characters in all patterns.
- **Search Time:** O(n), where `n` is the length of the text.

## How It Works

1. **Trie Construction:** All patterns are inserted into a trie where each node represents a character in the patterns.
2. **Failure Links:** Failure links are added to each node, pointing to the longest suffix which is also a prefix. This allows the algorithm to efficiently transition between nodes when a mismatch occurs.
3. **Pattern Search:** The text is processed one character at a time, following the trie structure to match the patterns. If a mismatch occurs, failure links are used to skip unnecessary comparisons.

## Example

Given patterns `["he", "she", "his", "hers"]` and the text `"ushers"`, the Aho-Corasick algorithm constructs a trie with failure links to search for these patterns. The algorithm finds matches for `"he"`, `"she"`, and `"hers"`.

## Code Implementation

### Python

```python
from collections import deque, defaultdict

class AhoCorasick:
    def __init__(self, patterns):
        """Initialize the Aho-Corasick automaton for the given patterns."""
        self.trie = {}
        self.output = defaultdict(list)
        self.fail = {}

        # Build the trie
        self._build_trie(patterns)

        # Add failure links
        self._build_failure_links()

    def _build_trie(self, patterns):
        """Insert patterns into the trie."""
        self.trie = {'root': {}}
        new_node = 0

        for idx, pattern in enumerate(patterns):
            node = 'root'
            for char in pattern:
                if char not in self.trie[node]:
                    new_node += 1
                    self.trie[node][char] = str(new_node)
                    self.trie[str(new_node)] = {}
                node = self.trie[node][char]
            self.output[node].append(pattern)

    def _build_failure_links(self):
        """Construct the failure links for Aho-Corasick."""
        queue = deque()
        self.fail['root'] = 'root'

        # Initialize failure links for the first level of the trie
        for char, node in self.trie['root'].items():
            self.fail[node] = 'root'
            queue.append(node)

        # BFS for setting failure links
        while queue:
            curr_node = queue.popleft()

            for char, next_node in self.trie[curr_node].items():
                queue.append(next_node)

                # Find failure link for current node
                fail_node = self.fail[curr_node]
                while fail_node != 'root' and char not in self.trie[fail_node]:
                    fail_node = self.fail[fail_node]

                if char in self.trie[fail_node]:
                    self.fail[next_node] = self.trie[fail_node][char]
                else:
                    self.fail[next_node] = 'root'

                # Combine output of fail state
                self.output[next_node].extend(self.output[self.fail[next_node]])

    def search(self, text):
        """Search for patterns in the given text."""
        node = 'root'
        results = []

        for i, char in enumerate(text):
            while node != 'root' and char not in self.trie[node]:
                node = self.fail[node]

            if char in self.trie[node]:
                node = self.trie[node]
            else:
                node = 'root'

            # Check if any pattern ends at this character
            if self.output[node]:
                for pattern in self.output[node]:
                    results.append((i - len(pattern) + 1, pattern))

        return results

# Example usage
patterns = ["he", "she", "his", "hers"]
text = "ushers"
ac = AhoCorasick(patterns)
matches = ac.search(text)
print("Matches found:", matches)
```

### C++

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <map>
using namespace std;

class AhoCorasick {
    struct Node {
        map<char, int> children;
        int fail;
        vector<int> output;
    };
    
    vector<Node> trie;
    vector<string> patterns;

public:
    AhoCorasick(const vector<string>& patterns) {
        trie.push_back(Node());  // Root node
        this->patterns = patterns;
        build_trie();
        build_failure_links();
    }

    void build_trie() {
        for (int idx = 0; idx < patterns.size(); ++idx) {
            string pattern = patterns[idx];
            int node = 0;

            for (char ch : pattern) {
                if (!trie[node].children.count(ch)) {
                    trie[node].children[ch] = trie.size();
                    trie.push_back(Node());
                }
                node = trie[node].children[ch];
            }
            trie[node].output.push_back(idx);
        }
    }

    void build_failure_links() {
        queue<int> q;
        for (auto& [ch, next_node] : trie[0].children) {
            trie[next_node].fail = 0;
            q.push(next_node);
        }

        while (!q.empty()) {
            int curr_node = q.front();
            q.pop();

            for (auto& [ch, next_node] : trie[curr_node].children) {
                int fail = trie[curr_node].fail;

                while (fail != 0 && !trie[fail].children.count(ch)) {
                    fail = trie[fail].fail;
                }

                if (trie[fail].children.count(ch)) {
                    trie[next_node].fail = trie[fail].children[ch];
                } else {
                    trie[next_node].fail = 0;
                }

                trie[next_node].output.insert(trie[next_node].output.end(),
                                              trie[trie[next_node].fail].output.begin(),
                                              trie[trie[next_node].fail].output.end());
                q.push(next_node);
            }
        }
    }

    vector<pair<int, string>> search(const string& text) {
        int node = 0;
        vector<pair<int, string>> results;

        for (int i = 0; i < text.size(); ++i) {
            char ch = text[i];

            while (node != 0 && !trie[node].children.count(ch)) {
                node = trie[node].fail;
            }

            if (trie[node].children.count(ch)) {
                node = trie[node].children[ch];
            } else {
                node = 0;
            }

            for (int pattern_idx : trie[node].output) {
                results.emplace_back(i - patterns[pattern_idx].size() + 1, patterns[pattern_idx]);
            }
        }

        return results;
    }
};

int main() {
    vector<string> patterns = {"he", "she", "his", "hers"};
    string text = "ushers";

    AhoCorasick ac(patterns);
    vector<pair<int, string>> matches = ac.search(text);

    cout << "Matches found:\n";
    for (const auto& [idx, pattern] : matches) {
        cout << "Pattern \"" << pattern << "\" found at index " << idx << endl;
    }

    return 0;
}
```

<Ads />

## Advantages

- **Multiple Pattern Search:** Efficiently searches for multiple patterns in a single pass through the text.
- **Linear Time Complexity:** After preprocessing the patterns, the search runs in linear time relative to the length of the text.
- **Failure Links:** These allow the algorithm to efficiently backtrack and reuse previously computed results when mismatches occur.

## Applications

- **Text Search:** Useful in applications such as search engines, text editors, and data mining where multiple patterns need to be searched.
- **Intrusion Detection Systems:** Often used to detect multiple predefined patterns in network traffic.
- **DNA Sequence Analysis:** Helps in finding multiple patterns within genetic sequences.

## Conclusion

The **Aho-Corasick Algorithm** is an optimal solution for problems involving multiple pattern matching. Its combination of a trie and failure links ensures that it can handle large datasets and multiple queries efficiently.
