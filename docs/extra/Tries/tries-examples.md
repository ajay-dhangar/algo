---
id: trie-intro-3
sidebar_position: 11
title: Tries (Prefix Trees examples)
sidebar_label: Tries
description: "In this blog post, we'll explore Tries, a powerful data structure for string-based operations like prefix searches and autocomplete."
tags: [dsa, data structures, tries]
---
# Trie Examples

This repository contains several examples of how to use a Trie (prefix tree) for common tasks such as word insertion, search, autocomplete, and prefix matching.

## Example 1: Inserting Words into a Trie

This example demonstrates how to insert words into a Trie and how to search for words.

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }

    // Insert a word into the Trie
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }

    // Search for a word in the Trie
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return node->isEndOfWord;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("banana");
    cout << trie.search("apple") << endl;  // Outputs: 1 (true)
    cout << trie.search("bat") << endl;    // Outputs: 0 (false)
    return 0;
}
```

## Example 2: Implementing Autocomplete with a Trie
This example demonstrates how to implement an autocomplete feature using a Trie.

```cpp
Copy code
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
    }
};

class Trie {
    TrieNode* root;
    
    void getWords(TrieNode* node, string prefix, vector<string>& result) {
        if (node->isEndOfWord) result.push_back(prefix);
        for (auto& p : node->children) {
            getWords(p.second, prefix + p.first, result);
        }
    }
    
public:
    Trie() {
        root = new TrieNode();
    }

    // Insert a word into the Trie
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }

    // Get all words with a given prefix
    vector<string> autocomplete(string prefix) {
        TrieNode* node = root;
        vector<string> result;
        for (char c : prefix) {
            if (!node->children.count(c)) return result;
            node = node->children[c];
        }
        getWords(node, prefix, result);
        return result;
    }
};

int main() {
    Trie trie;
    trie.insert("cat");
    trie.insert("car");
    trie.insert("cart");
    trie.insert("dog");
    
    vector<string> result = trie.autocomplete("ca");
    for (string word : result) {
        cout << word << endl;  // Outputs: cat, car, cart
    }
    
    return 0;
}

```

## Example 3: Prefix Matching with a Trie
This example shows how to check if a prefix exists in a Trie.

```cpp
Copy code
#include <iostream>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }

    // Insert a word into the Trie
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }

    // Check if there is any word in the Trie that starts with a given prefix
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c)) return false;
            node = node->children[c];
        }
        return true;
    }
};

int main() {
    Trie trie;
    trie.insert("hello");
    trie.insert("help");
    trie.insert("world");
    
    cout << trie.startsWith("he") << endl;  // Outputs: 1 (true)
    cout << trie.startsWith("wor") << endl; // Outputs: 1 (true)
    cout << trie.startsWith("woe") << endl; // Outputs: 0 (false)
    
    return 0;
}
```