---

id: ukkonens-algorithm
sidebar_position: 7
title: Ukkonen's Algorithm
sidebar_label: Ukkonen's Algorithm

---

### Definition:

Ukkonen's Algorithm is an online algorithm for constructing suffix trees in linear time. Published by Esko Ukkonen in 1995, it builds a suffix tree for a string by processing characters one by one from left to right. The algorithm is notable for its efficiency and the elegant way it handles suffix links to achieve linear time complexity.

### Characteristics:

- **Online Processing**:
  - Processes text left to right, one character at a time
  - Can handle streaming input
  - Tree is always complete for currently processed text

- **Implicit Suffixes**:
  - Uses implicit suffixes to avoid explicitly storing all suffixes
  - Maintains active points and suffix links for efficient navigation
  - Handles rule extensions incrementally

- **Suffix Links**:
  - Uses suffix links to quickly move between related nodes
  - Reduces traversal time during tree construction
  - Essential for achieving linear time complexity

- **Space Optimization**:
  - Uses path compression to reduce space requirements
  - Maintains only necessary internal nodes
  - Efficiently handles repeated patterns

### Time Complexity:

- **Construction: $O(n)$**
  - Where n is the length of the input string
  - Amortized linear time for all operations
  - Each phase processes one character in amortized constant time

- **Space Complexity: $O(n)$**
  - Storage for nodes and edges
  - Additional space for suffix links
  - Path compression keeps space requirement linear

### C++ Implementation:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

class SuffixTreeNode {
public:
    unordered_map<char, SuffixTreeNode*> children;
    SuffixTreeNode* suffixLink;
    int start;
    int* end;
    int suffixIndex;

    SuffixTreeNode(int start, int* end) {
        this->start = start;
        this->end = end;
        this->suffixIndex = -1;
        this->suffixLink = nullptr;
    }
};

class SuffixTree {
private:
    string text;
    SuffixTreeNode* root;
    SuffixTreeNode* lastNewNode;
    SuffixTreeNode* activeNode;
    int activeEdge;
    int activeLength;
    int remainingSuffixCount;
    int leafEnd;
    int* rootEnd;
    int* splitEnd;
    vector<int> size;

    bool walkDown(SuffixTreeNode* currNode) {
        if (activeLength >= edgeLength(currNode)) {
            activeEdge += edgeLength(currNode);
            activeLength -= edgeLength(currNode);
            activeNode = currNode;
            return true;
        }
        return false;
    }

    int edgeLength(SuffixTreeNode* n) {
        return *(n->end) - n->start + 1;
    }

    void extendSuffixTree(int pos) {
        leafEnd = pos;
        remainingSuffixCount++;
        lastNewNode = nullptr;

        while (remainingSuffixCount > 0) {
            if (activeLength == 0)
                activeEdge = pos;

            if (activeNode->children.find(text[activeEdge]) == 
                activeNode->children.end()) {
                activeNode->children[text[activeEdge]] = 
                    new SuffixTreeNode(pos, &leafEnd);

                if (lastNewNode != nullptr) {
                    lastNewNode->suffixLink = activeNode;
                    lastNewNode = nullptr;
                }
            } else {
                SuffixTreeNode* next = activeNode->children[text[activeEdge]];
                if (walkDown(next))
                    continue;

                if (text[next->start + activeLength] == text[pos]) {
                    if (lastNewNode != nullptr && activeNode != root) {
                        lastNewNode->suffixLink = activeNode;
                        lastNewNode = nullptr;
                    }
                    activeLength++;
                    break;
                }

                splitEnd = new int(next->start + activeLength - 1);
                SuffixTreeNode* split = new SuffixTreeNode(next->start, splitEnd);
                activeNode->children[text[activeEdge]] = split;

                split->children[text[pos]] = 
                    new SuffixTreeNode(pos, &leafEnd);
                next->start += activeLength;
                split->children[text[next->start]] = next;

                if (lastNewNode != nullptr)
                    lastNewNode->suffixLink = split;

                lastNewNode = split;
            }

            remainingSuffixCount--;
            if (activeNode == root && activeLength > 0) {
                activeLength--;
                activeEdge = pos - remainingSuffixCount + 1;
            } else if (activeNode != root) {
                activeNode = activeNode->suffixLink != nullptr ? 
                    activeNode->suffixLink : root;
            }
        }
    }

    void setSuffixIndexByDFS(SuffixTreeNode* n, int labelHeight) {
        if (n == nullptr) return;

        if (n->start != -1)
            cout << "Start: " << n->start << " End: " << *(n->end) << endl;

        bool leaf = true;
        for (auto& child : n->children) {
            if (child.second != nullptr) {
                leaf = false;
                setSuffixIndexByDFS(child.second, 
                    labelHeight + edgeLength(child.second));
            }
        }

        if (leaf) {
            n->suffixIndex = text.length() - labelHeight;
            cout << "Suffix Index: " << n->suffixIndex << endl;
        }
    }

public:
    SuffixTree(string txt) {
        text = txt;
        rootEnd = new int(-1);
        root = new SuffixTreeNode(-1, rootEnd);
        activeNode = root;
        activeEdge = -1;
        activeLength = 0;
        remainingSuffixCount = 0;
        leafEnd = -1;

        for (int i = 0; i < text.length(); i++)
            extendSuffixTree(i);

        int labelHeight = 0;
        setSuffixIndexByDFS(root, labelHeight);
    }

    ~SuffixTree() {
        // Cleanup code here
    }
};

int main() {
    string txt = "banana$";
    SuffixTree tree(txt);
    return 0;
}
```

### Key Features:

1. **Extension Rules**:
   - Rule 1: Add new leaf
   - Rule 2: Split and add leaf
   - Rule 3: Already exists (do nothing)

2. **Important Concepts**:
   - Active Point (Node, Edge, Length)
   - Suffix Links
   - End Point
   - Remaining Suffixes

3. **Optimization Techniques**:
   - Skip/Count Trick
   - Path Compression
   - Smart Node Hopping

### Applications:

1. **String Processing**:
   - Pattern matching
   - Substring queries
   - Common substring finding

2. **Bioinformatics**:
   - DNA sequence analysis
   - Genome assembly
   - Pattern finding in biological sequences

3. **Text Processing**:
   - Text editors
   - Search engines
   - Data compression

4. **Database Systems**:
   - Indexing
   - Fast substring searches
   - Query optimization

### Advanced Features:

1. **Generalized Suffix Trees**:
   - Multiple string support
   - Set matching operations
   - Common substrings between strings

2. **Memory Optimizations**:
   - Compressed suffix trees
   - Disk-based implementations
   - Memory-efficient variants

### Summary:

Ukkonen's Algorithm represents a significant advancement in suffix tree construction, offering linear-time complexity through clever use of suffix links and active points. Its online nature makes it particularly suitable for streaming applications, while its efficiency makes it practical for large-scale text processing tasks. The algorithm's elegant handling of suffix links and its ability to process text incrementally have made it a fundamental tool in string processing and bioinformatics applications.

The implementation, while complex, provides a robust foundation for building suffix trees that can be used in various applications ranging from pattern matching to genome analysis. The algorithm's ability to handle dynamic updates and its efficient space usage make it particularly valuable in modern applications where real-time processing of large text data is required.