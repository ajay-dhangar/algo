---
id: trie-intro-2
sidebar_position: 11
title: Tries (Prefix Trees theory)
sidebar_label: Tries
description: "In this blog post, we'll explore Tries, a powerful data structure for string-based operations like prefix searches and autocomplete."
tags: [dsa, data structures, tries]
---

# Trie Data Structure

## Introduction

A **Trie** (also called a **Prefix Tree**) is a special type of tree used to store collections of strings. It is commonly used for tasks involving prefix-based search, such as autocomplete, dictionary implementations, and spell checking.

The key idea of a Trie is to use the **prefixes** of words to share common parts and reduce memory usage. Each node in a Trie represents a single character, and the paths from the root to a leaf represent words.

## Key Concepts

1. **Root**: The Trie starts from the root node, which is an empty node or a node with no character.
2. **Edges**: Each edge represents a character from the alphabet.
3. **Nodes**: Each node stores a character and points to its children (the next characters in words that share the same prefix).
4. **End of Word**: Some nodes are marked as "end of word" nodes, indicating that the characters from the root to this node form a valid word.

## Operations

### 1. **Insert Operation**

The insert operation is used to add a word to the Trie. The process is as follows:
- Start from the root and for each character in the word, check if it already exists as a child of the current node.
- If not, create a new node for that character.
- Mark the final node as the "end of word" to signify that the path represents a complete word.

### 2. **Search Operation**

The search operation checks whether a given word exists in the Trie:
- Start at the root and for each character in the word, check if it exists as a child node.
- If you reach the end of the word and the current node is marked as the "end of word", then the word exists in the Trie.

### 3. **Prefix Search**

A common use case of a Trie is to find all words that start with a given prefix:
- Traverse the Trie using the characters of the prefix.
- Once the prefix is found, collect all the words that follow from the remaining nodes.

## Example

Here is a simple visualization of a Trie that stores the words "cat", "car", "dog", and "dot":



In this Trie:
- "cat", "car", "dog", and "dot" are stored.
- The nodes marked as **(EOW)** indicate the "end of word".

## Time Complexity

- **Insert**: O(m) where *m* is the length of the word being inserted.
- **Search**: O(m) where *m* is the length of the word being searched.
- **Prefix Search**: O(m + k) where *m* is the length of the prefix and *k* is the number of characters in the words that match the prefix.

## Advantages of Trie

1. **Efficient for Prefix Search**: Tries are optimal for prefix searches, as they can find all words with a given prefix in linear time relative to the length of the prefix.
2. **Reduced Space for Shared Prefixes**: By sharing common prefixes, Tries can reduce the memory usage for storing large sets of related words.

## Disadvantages of Trie

1. **Memory Usage**: While Tries are efficient in terms of search, they may use more memory than other data structures like hash maps if there are many different words with few shared prefixes.
2. **Complexity**: Implementing a Trie from scratch can be more complex compared to other data structures.

## Common Applications

- **Autocomplete systems**: Finding all words that begin with a given prefix.
- **Spell checking**: Checking if a given word exists in a dictionary.
- **IP routing**: Tries can be used to represent routing tables in networking.

---

## Example Code (C++)

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
    trie.insert("cat");
    trie.insert("car");
    trie.insert("dog");

    cout << trie.search("cat") << endl;  // Outputs: 1 (true)
    cout << trie.search("car") << endl;  // Outputs: 1 (true)
    cout << trie.search("bat") << endl;  // Outputs: 0 (false)

    return 0;
}
```