---
id: huffman-coding-algorithm
title: Huffman Coding
sidebar_label: Huffman Coding
sidebar_position: 7
description: An elegant greedy algorithm for lossless data compression using variable-length prefix codes.
tags: [greedy, algorithm, huffman-coding, compression]
---

Huffman Coding is a lossless data compression algorithm. The greedy strategy assigns variable-length codes to input characters, with lengths assigned based on frequencies of corresponding characters.

## Real-World Analogy

Suppose you want to send a secret message via telegram where every letter costs money based on the length of its signal. To save cost, you design shorter signals for the most common letters (like 'E' or 'A') and longer signals for rare letters (like 'Q' or 'Z').

## Greedy Choice Property

At each step, the algorithm greedily picks the **two nodes with the lowest frequencies** to merge them into a single parent node whose frequency is the sum of the two children. This process repeats until only one root node remains.

This ensures that characters with higher frequencies end up closer to the root of the tree, resulting in shorter binary codes.

## Step-by-Step Walkthrough

* Create a leaf node for each unique character and build a min-heap (priority queue) of all leaf nodes.
* While there is more than one node in the heap:
  * Remove the two nodes with the lowest frequency from the min-heap.
  * Create a new internal node with a frequency equal to the sum of the two nodes' frequencies.
  * Make the first node the left child and the second node the right child.
  * Insert this new node back into the min-heap.
* The remaining node in the heap is the root node of the Huffman Tree.

## Complexity Analysis

* **Time Complexity:** $O(N \log N)$ where $N$ is the number of unique characters, because we perform $N$ insertions and deletions on a min-heap.
* **Space Complexity:** $O(N)$ to store the tree nodes.

## Implementation

### Python

```python
import heapq

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
        
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(char_freqs):
    # char_freqs is a list of tuples (char, freq)
    heap = [Node(char, freq) for char, freq in char_freqs]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        merged = Node(None, left.freq + right.freq)
        merged.left = left
        merged.right = right
        
        heapq.heappush(heap, merged)
        
    return heap[0]
```

### C++

```cpp
#include <iostream>
#include <queue>
#include <vector>

struct Node {
    char data;
    unsigned freq;
    Node *left, *right;
    Node(char data, unsigned freq) : data(data), freq(freq), left(nullptr), right(nullptr) {}
};

struct compare {
    bool operator()(Node* l, Node* r) {
        return (l->freq > r->freq);
    }
};

Node* buildHuffmanTree(const std::vector<char>& data, const std::vector<unsigned>& freq) {
    std::priority_queue<Node*, std::vector<Node*>, compare> minHeap;
    
    for (size_t i = 0; i < data.size(); ++i) {
        minHeap.push(new Node(data[i], freq[i]));
    }
    
    while (minHeap.size() != 1) {
        Node* left = minHeap.top(); minHeap.pop();
        Node* right = minHeap.top(); minHeap.pop();
        
        Node* top = new Node('$', left->freq + right->freq);
        top->left = left;
        top->right = right;
        minHeap.push(top);
    }
    return minHeap.top();
}
```
