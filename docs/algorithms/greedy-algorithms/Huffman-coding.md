---

id: huffman-coding  
title: Huffman Coding Algorithm  
sidebar_label: Huffman Coding  
description: "In this blog post, we'll explore Huffman Coding, a popular lossless data compression algorithm that assigns variable-length codes to input characters based on their frequencies."  
tags: [dsa, algorithms, greedy algorithms, compression]

---

### Definition:

Huffman Coding is a lossless data compression algorithm used to compress data in an optimal way by assigning shorter codes to more frequent characters and longer codes to less frequent ones. It works by constructing a binary tree where the most frequent characters have the shortest binary representations, leading to optimal compression. 

### Characteristics:

- **Greedy Approach**:  
  Huffman Coding uses a greedy strategy to build the binary tree. Starting with individual characters and their frequencies, the algorithm greedily selects the two least frequent nodes, merges them into a new node, and repeats the process until a single tree is formed. Each path from the root to a leaf node gives the binary code for a character.
  
1. **Calculate Frequencies**:  
   Count the frequency of each character in the input data.

2. **Build a Priority Queue**:  
   Insert all characters into a priority queue (min-heap) based on their frequencies, with the least frequent characters having the highest priority.

3. **Construct Huffman Tree**:  
   Repeatedly take two nodes with the lowest frequencies from the priority queue, merge them, and insert the resulting node back into the queue. This process continues until only one node (the root of the Huffman tree) remains.

4. **Generate Codes**:  
   Traverse the tree to assign binary codes to characters, with left edges representing a "0" and right edges representing a "1".

### Problem Statement:

Given a set of characters and their corresponding frequencies, the task is to build a Huffman tree and generate a binary code for each character such that the total length of the encoded data is minimized. The objective is to compress the input data by replacing each character with its Huffman code.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N \log N)$**  
  The time complexity is dominated by the operations on the priority queue (heap), which requires $O(\log N)$ for insertion and extraction. Since there are N nodes to process, the overall complexity is $O(N \log N)$.

### Space Complexity:

- **Space Complexity: $O(N)$**  
  The space complexity is $O(N)$ due to the storage requirements for the priority queue, the Huffman tree, and the encoded character map.

### Example:

Consider the following input:

Characters: `{a, b, c, d, e}`  
Frequencies: `{5, 9, 12, 13, 16}`  

Step-by-Step Execution:

1. **Create Priority Queue (Min-Heap)**:  
   Insert characters with their frequencies into the min-heap:
   - `a(5), b(9), c(12), d(13), e(16)`

2. **Construct Huffman Tree**:
   - Extract the two lowest frequencies (`a=5` and `b=9`), merge them into a new node with frequency `14`.
   - Insert the new node back into the min-heap: `{c(12), d(13), e(16), merged(14)}`
   - Repeat the process until the entire tree is constructed:
     - Merge `c(12)` and `d(13)` into a node with frequency `25`.
     - Merge the nodes with frequencies `14` and `16` into `30`.
     - Merge `25` and `30` to get the final root with frequency `55`.

3. **Assign Codes**:
   - Traverse the Huffman Tree and assign binary codes to each character:
     - `a = 1100`, `b = 1101`, `c = 100`, `d = 101`, `e = 0`

### C++ Implementation:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

// Huffman Tree Node
struct Node {
    char data;
    int freq;
    Node *left, *right;
    Node(char data, int freq) {
        left = right = nullptr;
        this->data = data;
        this->freq = freq;
    }
};

// Comparison object for priority queue
struct compare {
    bool operator()(Node* l, Node* r) {
        return l->freq > r->freq;
    }
};

// Print Huffman Codes
void printCodes(Node* root, string str) {
    if (!root) return;
    if (root->data != '$') cout << root->data << ": " << str << "\n";
    printCodes(root->left, str + "0");
    printCodes(root->right, str + "1");
}

// Main Huffman Coding Function
void huffmanCoding(char data[], int freq[], int size) {
    priority_queue<Node*, vector<Node*>, compare> minHeap;

    for (int i = 0; i < size; ++i)
        minHeap.push(new Node(data[i], freq[i]));

    while (minHeap.size() != 1) {
        Node *left = minHeap.top(); minHeap.pop();
        Node *right = minHeap.top(); minHeap.pop();
        
        Node* top = new Node('$', left->freq + right->freq);
        top->left = left;
        top->right = right;
        minHeap.push(top);
    }

    printCodes(minHeap.top(), "");
}

int main() {
    char data[] = { 'a', 'b', 'c', 'd', 'e' };
    int freq[] = { 5, 9, 12, 13, 16 };

    int size = sizeof(data) / sizeof(data[0]);
    huffmanCoding(data, freq, size);

    return 0;
}
```

### Summary:

Huffman Coding is a widely used greedy algorithm that provides optimal data compression by assigning variable-length codes to characters based on their frequencies. The algorithm constructs a binary tree to represent the characters, ensuring that the most frequent characters have the shortest codes. It is used in file compression formats such as ZIP and in transmission protocols. The algorithm runs in $O(N \log N)$ time, making it efficient for practical use cases in data compression and communication systems.