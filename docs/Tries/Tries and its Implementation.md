---
id: trie-intro
sidebar_position: 11
title: Tries (Prefix Trees)
sidebar_label: Tries
description: "In this blog post, we'll explore Tries, a powerful data structure for string-based operations like prefix searches and autocomplete."
tags: [dsa, data structures, tries]
---

## Introduction
Tries, also known as **Prefix Trees**, are a specialized data structure used primarily for **efficient retrieval of keys** in a dataset of strings. Tries are particularly useful when dealing with problems involving dynamic sets of strings, such as word searches, dictionary implementations, or autocomplete systems. Unlike other data structures such as hash tables, tries store characters at each level, providing a more structured representation of the key itself.

## Definition and Structure
A Trie is a tree-like data structure where each node represents a single character of a string. The root node is typically an empty node, and each path down the tree represents a word or prefix.

Key components of a Trie node:
- **Children**: References to its child nodes, typically stored in an array or hash map.
- **End of Word**: A boolean flag to indicate if the current node represents the end of a valid word.

**Example Trie storing ["and", "ant", "do", "dad"]:**
```
         (root)
        /     \  
       a       d
      /       / \
     n       o   a
    / \     /     \
   d   t  (do)     d
  /     \           \
(and)  (ant)        (dad)
```


## Properties
- **Prefix-based Search**: Tries excel in finding all words that share a common prefix.
- **Space Efficiency**: Although tries can be space-heavy in some cases, they eliminate the need to store redundant prefixes, making them more space-efficient for large datasets of similar strings.
- **Time Complexity**: Trie operations such as insertion, search, and deletion have a time complexity of **O(m)**, where **m** is the length of the word or prefix being processed.

## Types of Tries
1. **Standard Trie**: Every node has 26 possible children (if dealing with lowercase alphabets), and each child represents one of the letters of the alphabet.
    ```  
        Insert words: "cat", "can"
        
           root
           /
          c
         /
        a
       / \
      t   n
    ```

2. **Compressed Trie (Radix Tree)**: In a compressed trie, chains of single children are compressed into one node, reducing the overall size of the trie.
    ```
       Insert words: "cat", "car"

           root
           /
          c
         /
        a
       / \
      t   r
    ```

3. **Suffix Trie**: A specialized trie used for storing all possible suffixes of a given string. Suffix tries are useful in **pattern matching** problems.

## Operations on Tries

### 1. **Insertion**
To insert a word into a trie, we traverse through each character of the word and insert it into the corresponding child node if it does not already exist. Once we have processed the last character, we mark the current node as the end of the word.

### 2. **Search**
Searching for a word in a trie follows a similar traversal as insertion. If we can traverse through all the characters of the word, and the final node is marked as the end of the word, then the word exists in the trie.

### 3. **Deletion**
Deleting a word requires careful handling to avoid breaking the structure of the trie. If the word to be deleted is a prefix of other words, we should only unmark the end of the word flag. If no other words depend on the nodes being deleted, we can remove them safely.

## Implementation

Here’s an example of how you can implement a Trie in C++:

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;

    TrieNode() {
        isEndOfWord = false;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return node->isEndOfWord;
    }

    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return true;
    }
};

int main() {
    Trie* trie = new Trie();
    trie->insert("apple");
    cout << trie->search("apple") << endl; // true
    cout << trie->search("app") << endl;   // false
    cout << trie->startsWith("app") << endl; // true
    trie->insert("app");
    cout << trie->search("app") << endl;   // true
}
```
## Advantages and Disadvantages

**Advantages:**
- **Prefix Search**: Tries enable fast lookups for words or prefixes, making them ideal for autocomplete functionality.
- **Efficient Storage**: Common prefixes are stored once, reducing redundancy.
- **Fast Insertions and Searches**: Operations on a Trie (insertion, search, and deletion) are fast with a time complexity of **O(m)**, where **m** is the length of the word.
- **No Hash Collisions**: Unlike hash tables, tries do not suffer from hash collisions, ensuring consistent performance for string operations.

**Disadvantages:**
- **Space Consumption**: Tries can consume a significant amount of memory, especially when the alphabet size is large, due to the need for pointers in each node.
- **Implementation Complexity**: Compared to hash tables or arrays, tries are more complex to implement, especially with memory management.

## Applications of Tries

- **Autocomplete Systems**:  
  Tries are used in search engines and text editors to provide efficient autocomplete suggestions based on a prefix.

- **Spell Checking**:  
  Tries can quickly validate whether a word exists in a dictionary, making them suitable for spell check systems.

- **IP Routing**:  
  Tries, specifically compressed tries, are used in IP routing tables to store and retrieve routing paths efficiently.

- **Word Games**:  
  Many word-based games like Scrabble or Boggle use tries to validate possible word combinations and optimize the search for valid words.

- **Pattern Matching Algorithms**:  
  Tries, particularly suffix tries, are used in string pattern matching problems like substring search, and are efficient for tasks like finding all occurrences of a word or a prefix.

