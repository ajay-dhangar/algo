---
id: aho-corasick-algorithm
title: Aho-Corasick Algorithm
sidebar_label: Aho-Corasick
tags: [String Matching, DSA, Aho-Corasick, Tries]
description: Solve the Aho-Corasick problem using efficient string matching to find occurrences of multiple patterns simultaneously in a given text.
---

# Aho-Corasick Algorithm

## Description

The Aho-Corasick algorithm is an efficient string matching algorithm used to find occurrences of multiple patterns in a given text simultaneously. It's particularly useful for applications such as virus scanning, intrusion detection systems, and DNA sequence analysis.

### Problem Definition

Given:
- A set of pattern strings `P = {p1, p2, ..., pk}`
- A text string T

Objective:
- Find all occurrences of any pattern from P in T

### Algorithm Overview

1. **Construct Tries**: Build a tries(prefix tree) from the set of patterns.
2. **Add Failure Links**: Construct failure links for each node in the tries.
3. **Add Output Links**: Add output links to nodes where patterns end.
4. **Search Text**: Traverse the text using the constructed automaton to find matches.

### Key Features

- Pre-processes the patterns to build an efficient automaton
- Searches for all patterns simultaneously in a single pass through the text
- Handles overlapping patterns efficiently

### Time Complexity

- Pre-processing: O(m), where m is the sum of the lengths of all patterns
- Searching: O(n + z), where n is the length of the text and z is the number of pattern occurrences

### Space Complexity

O(m), where m is the sum of the lengths of all patterns

## C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    int outputIndex = -1;
    TrieNode* failureLink = nullptr;
};

class AhoCorasick {
private:
    TrieNode* root;

public:
    AhoCorasick() {
        root = new TrieNode();
    }

    void insert(const string& pattern, int index) {
        TrieNode* node = root;
        for (char c : pattern) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->outputIndex = index;
    }

    void buildFailureLinks() {
        queue<TrieNode*> q;
        for (const auto& pair : root->children) {
            pair.second->failureLink = root;
            q.push(pair.second);
        }

        while (!q.empty()) {
            TrieNode* current = q.front();
            q.pop();

            for (const auto& pair : current->children) {
                char c = pair.first;
                TrieNode* child = pair.second;

                TrieNode* fallback = current->failureLink;
                while (fallback != nullptr && !fallback->children.count(c)) {
                    fallback = fallback->failureLink;
                }
                child->failureLink = fallback ? fallback->children[c] : root;

                q.push(child);
            }
        }
    }

    void search(const string& text, const vector<string>& patterns) {
        TrieNode* current = root;
        for (int i = 0; i < text.length(); i++) {
            while (current != nullptr && !current->children.count(text[i])) {
                current = current->failureLink;
            }
            current = current ? current->children[text[i]] : root;

            TrieNode* temp = current;
            while (temp != nullptr) {
                if (temp->outputIndex != -1) {
                    cout << "Pattern found: " << patterns[temp->outputIndex] << " at index " << (i - patterns[temp->outputIndex].length() + 1) << endl;
                }
                temp = temp->failureLink;
            }
        }
    }
};

int main() {
    AhoCorasick ac;
    vector<string> patterns = {"he", "she", "his", "hers"};
    for (int i = 0; i < patterns.size(); i++) {
        ac.insert(patterns[i], i);
    }
    ac.buildFailureLinks();
    
    string text = "ushers";
    ac.search(text, patterns);

    return 0;
}
```
