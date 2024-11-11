---
id: suffix-tree-algorithm
title: Suffix Tree Algorithm
sidebar_label: Suffix Tree
tags: [String Matching, DSA, Suffix Tree, Tree]
description: Construct and search a Suffix Tree efficiently to represent all suffixes of a string for substring searching and pattern matching.
---

In computer science, a **suffix tree** is a compressed trie containing all the suffixes of a given text as their keys and positions in the text as their values. Suffix trees allow particularly fast implementations of many important string operations, such as substring search. They are used in bioinformatics applications, such as in the construction of the Burrows–Wheeler transform and in the compression of DNA sequences.

<AdsComponent />

## Description

A **suffix tree** is a compressed tries of all the suffixes of a given string. It allows for efficient substring searching, pattern matching, and other operations on strings. Suffix trees provide a way to represent all substrings of a string in a space-efficient manner.

### Problem Definition

- **Input**:
  - A string `S` of length `n`.
  
- **Output**:
  - A suffix tree representing all suffixes of `S`.

<Ads />

### Algorithm Overview

1. **Construction**:
   - Build the suffix tree by inserting all suffixes of the string.
   - Use an efficient algorithm (e.g., Ukkonen's algorithm) to construct the suffix tree in linear time.

2. **Searching**:
   - Traverse the suffix tree to search for patterns and substrings efficiently.

### Time Complexity

- Construction: `O(n)` (for efficient algorithms like Ukkonen's).
- Search: `O(m)` for a pattern of length `m`.

### Space Complexity

- `O(n)` for storing the suffix tree.

### C++ Implementation

Below is a simple implementation of a suffix tree. Note that a full implementation may require more complexity to handle various cases.

```cpp
#include <iostream>
#include <map>
#include <vector>
#include <string>

using namespace std;

struct SuffixTreeNode {
    map<char, SuffixTreeNode*> children;
    int start, *end;
    int suffixIndex;
};

class SuffixTree {
public:
    SuffixTreeNode* root;
    string text;

    SuffixTree(const string& text) {
        this->text = text;
        root = new SuffixTreeNode();
        root->start = -1;
        root->end = new int(-1);
        buildSuffixTree();
    }

    void buildSuffixTree() {
        int n = text.size();
        for (int i = 0; i < n; i++) {
            insertSuffix(i);
        }
    }

    void insertSuffix(int index) {
        SuffixTreeNode* currentNode = root;
        for (int i = index; i < text.size(); i++) {
            char currentChar = text[i];
            if (currentNode->children.find(currentChar) == currentNode->children.end()) {
                currentNode->children[currentChar] = new SuffixTreeNode();
            }
            currentNode = currentNode->children[currentChar];
        }
        currentNode->suffixIndex = index;
    }
};

int main() {
    string text = "banana";
    SuffixTree suffixTree(text);
    cout << "Suffix tree constructed for: " << text << endl;
    return 0;
}
```

<Ads />

## Conclusion

The suffix tree is a powerful data structure for string matching and pattern searching. It allows for efficient construction and searching of substrings in linear time. Suffix trees are widely used in bioinformatics and other applications where string operations are required.
