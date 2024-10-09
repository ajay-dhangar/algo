---
id: huffman-coding
title: Huffman Coding Algorithm
sidebar_label: Huffman Coding
description: "In this blog post, we'll explore the Huffman Coding Algorithm, a widely used method for lossless data compression."
tags: [dsa, algorithms, compression, huffman coding]
---

### Definition:

Huffman Coding is a popular algorithm used for lossless data compression. It is based on the frequency of occurrence of characters in a given text. The algorithm creates a binary tree where each character is represented by a unique binary code. The main goal is to minimize the total number of bits used to represent the characters, making the data more compact.

### Characteristics:

- **Variable-Length Codes**:
  - Characters that occur more frequently are assigned shorter codes, while less frequent characters receive longer codes. This approach ensures that the overall size of the encoded data is minimized.

- **Greedy Algorithm**:
  - Huffman Coding employs a greedy strategy by constructing a binary tree from the least frequent characters to the most frequent. At each step, the two nodes with the lowest frequencies are combined to create a new node, which continues until only one node remains.

### Problem Statement:

Given a string of characters along with their frequencies, the objective is to generate a Huffman code for each character and output the encoded string. The goal is to achieve optimal compression by minimizing the total number of bits used.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N \log N)$**  
The complexity is determined by the operations of building the priority queue and constructing the Huffman tree, where N is the number of unique characters.

### Space Complexity:

- **Space Complexity: $O(N)$**  
Space is required for storing the frequency table and the Huffman tree, leading to a space complexity of $O(N)$.

### Example:

Consider the following example where we have a string `“hello huffman”` with the frequency of characters as follows:

- `h`: 2
- `e`: 1
- `l`: 2
- `o`: 1
- `u`: 1
- `f`: 2
- `m`: 1
- `n`: 1

#### Step-by-Step Execution:

1. **Calculate Frequencies**: Count the occurrences of each character.
2. **Build Priority Queue**: Create a priority queue (min-heap) from the characters based on their frequencies.
3. **Construct Huffman Tree**:
   - Extract the two nodes with the lowest frequency.
   - Create a new internal node with these two nodes as children and a frequency equal to the sum of their frequencies.
   - Repeat until only one node remains in the queue, which becomes the root of the Huffman tree.

4. **Generate Codes**: Traverse the tree to assign binary codes to each character. Move left adds `0`, and move right adds `1`.

### C++ Implementation:

Here’s a C++ implementation of the Huffman Coding algorithm:

```cpp
#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>
using namespace std;

// A tree node
struct Node {
    char data;
    int freq;
    Node *left, *right;

    Node(char d, int f) : data(d), freq(f), left(nullptr), right(nullptr) {}
};

// Custom comparator for the priority queue
struct compare {
    bool operator()(Node* left, Node* right) {
        return left->freq > right->freq; // Min-heap
    }
};

// Function to generate Huffman codes
void generateHuffmanCodes(Node* root, string str, unordered_map<char, string>& huffmanCodes) {
    if (!root) return;

    // Leaf node
    if (!root->left && !root->right) {
        huffmanCodes[root->data] = str;
    }

    generateHuffmanCodes(root->left, str + "0", huffmanCodes);
    generateHuffmanCodes(root->right, str + "1", huffmanCodes);
}

// Function to perform Huffman coding
void huffmanCoding(const string& data) {
    // Calculate frequency of each character
    unordered_map<char, int> freq;
    for (char ch : data) {
        freq[ch]++;
    }

    // Create a priority queue to build the Huffman tree
    priority_queue<Node*, vector<Node*>, compare> minHeap;

    // Create a leaf node for each character and add it to the priority queue
    for (auto& pair : freq) {
        minHeap.push(new Node(pair.first, pair.second));
    }

    // Iterate until the heap contains one node
    while (minHeap.size() > 1) {
        Node *left = minHeap.top(); minHeap.pop();
        Node *right = minHeap.top(); minHeap.pop();

        // Create a new internal node with the sum of frequencies
        Node *internalNode = new Node('\0', left->freq + right->freq);
        internalNode->left = left;
        internalNode->right = right;

        minHeap.push(internalNode);
    }

    // Get the root of the Huffman tree
    Node* root = minHeap.top();

    // Generate Huffman codes
    unordered_map<char, string> huffmanCodes;
    generateHuffmanCodes(root, "", huffmanCodes);

    // Print the Huffman codes
    cout << "Character Codes:\n";
    for (auto& pair : huffmanCodes) {
        cout << pair.first << ": " << pair.second << endl;
    }

    // Encoding the data
    string encodedString = "";
    for (char ch : data) {
        encodedString += huffmanCodes[ch];
    }

    cout << "\nEncoded String: " << encodedString << endl;
}

int main() {
    string data = "hello huffman"; // Input data
    huffmanCoding(data); // Perform Huffman coding
    return 0;
}
```

### Summary:
Huffman Coding is a fundamental algorithm in data compression that efficiently minimizes the size of data by assigning variable-length binary codes based on character frequencies. By using a greedy approach, it constructs a binary tree that provides optimal prefix codes, making it widely applicable in file formats and data transmission protocols. The algorithm is especially useful for applications requiring lossless compression and has a time complexity of $O(N \log N)$.