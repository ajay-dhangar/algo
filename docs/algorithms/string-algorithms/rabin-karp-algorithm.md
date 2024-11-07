---

id: rabin-karp-algorithm
sidebar_position: 13
title: Rabin-Karp Algorithm
sidebar_label: Rabin-Karp Algorithm

---

### Definition:

The Rabin-Karp Algorithm is a string searching algorithm developed by Michael O. Rabin and Richard M. Karp in 1987. It uses hashing to efficiently find exact string matches or multiple pattern matches within a text. The algorithm is particularly effective for multiple pattern matching and plagiarism detection due to its ability to efficiently compute rolling hashes.

### Characteristics:

- **Rolling Hash Function**:
  - Computes pattern hash value
  - Updates hash efficiently
  - Uses sliding window technique

- **Multiple Pattern Matching**:
  - Handles multiple patterns simultaneously
  - Efficient for plagiarism detection
  - Scales well with pattern count

- **Preprocessing Phase**:
  - Calculates pattern hash
  - Prepares rolling hash
  - Sets up modular arithmetic

- **Left-to-Right Scanning**:
  - Sequential text processing
  - Constant-time hash updates
  - Efficient window sliding

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Hash computation
  - One-time calculation

- **Searching: $O(m \times n)$**
  - Where n is text length
  - Average case: O(n + m)
  - Worst case with spurious hits

### Space Complexity:

- **Space Usage: $O(1)$**
  - Constant extra space
  - Rolling hash storage
  - Pattern hash storage

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <cmath>
using namespace std;

class RabinKarpAlgorithm {
private:
    // Large prime number for hash calculation
    static const int PRIME = 101;
    static const int ALPHABET_SIZE = 256;
    
    // Calculate hash value for a string
    long long calculateHash(const string& str, int length) {
        long long hash = 0;
        for (int i = 0; i < length; i++) {
            hash += str[i] * pow(PRIME, i);
        }
        return hash;
    }
    
    // Calculate new rolling hash from previous hash
    long long recalculateHash(long long oldHash, char oldChar, 
                            char newChar, int patternLength, 
                            long long powValue) {
        oldHash -= oldChar;
        oldHash /= PRIME;
        oldHash += newChar * pow(PRIME, patternLength - 1);
        return oldHash;
    }
    
    // Check if two strings match
    bool checkStrings(const string& text, const string& pattern, 
                     int start) {
        for (int i = 0; i < pattern.length(); i++) {
            if (text[start + i] != pattern[i]) {
                return false;
            }
        }
        return true;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Calculate pattern hash
        long long patternHash = calculateHash(pattern, m);
        
        // Calculate hash for first window of text
        long long textHash = calculateHash(text, m);
        
        // Power value for rolling hash calculation
        long long powValue = pow(PRIME, m - 1);
        
        // Slide pattern over text
        for (int i = 0; i <= n - m; i++) {
            if (patternHash == textHash) {
                // Verify character by character on hash match
                if (checkStrings(text, pattern, i)) {
                    matches.push_back(i);
                }
            }
            
            // Calculate hash for next window
            if (i < n - m) {
                textHash = recalculateHash(textHash, text[i], 
                                         text[i + m], m, powValue);
            }
        }
        
        return matches;
    }
    
    // Function for multiple pattern search
    vector<vector<int>> multiPatternSearch(const string& text, 
                                         const vector<string>& patterns) {
        vector<vector<int>> allMatches;
        for (const string& pattern : patterns) {
            allMatches.push_back(search(text, pattern));
        }
        return allMatches;
    }
};

// Demonstration class
class RabinKarpDemo {
public:
    static void demonstrateSearch() {
        RabinKarpAlgorithm algo;
        string text = "ABCCDDAEFGABCDABCDABDE";
        string pattern = "ABCD";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        vector<int> matches = algo.search(text, pattern);
        
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Demonstrate multiple pattern matching
        vector<string> patterns = {"ABCD", "CDD", "EFG"};
        cout << "\nMultiple Pattern Matching:" << endl;
        vector<vector<int>> multiMatches = 
            algo.multiPatternSearch(text, patterns);
        
        for (size_t i = 0; i < patterns.size(); i++) {
            cout << "Pattern '" << patterns[i] << "' found at: ";
            for (int pos : multiMatches[i]) {
                cout << pos << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    RabinKarpDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Rolling Hash Function**:
   - Constant-time updates
   - Efficient sliding window
   - Modular arithmetic

2. **Multiple Pattern Support**:
   - Simultaneous pattern matching
   - Hash-based comparison
   - Scalable matching

3. **Optimization Techniques**:
   - Efficient hash computation
   - Quick hash updates
   - Spurious hit handling

### Applications:

1. **Text Analysis**:
   - Plagiarism detection
   - Document similarity
   - Content comparison

2. **Bioinformatics**:
   - DNA pattern matching
   - Multiple sequence alignment
   - Genomic pattern search

3. **Network Security**:
   - Network packet inspection
   - Pattern-based filtering
   - Signature detection

4. **Information Retrieval**:
   - Document indexing
   - Content searching
   - Pattern identification

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Approximate matching
   - Parallel implementations

2. **Implementation Optimizations**:
   - Efficient hash functions
   - Memory-efficient versions
   - Cache-friendly variants

### Comparison with Other Algorithms:

1. **Advantages**:
   - Efficient multiple pattern matching
   - Simple implementation
   - Good average-case performance

2. **Trade-offs**:
   - Hash collision possibility
   - Worst-case performance
   - Mathematical overhead

### Performance Characteristics:

1. **Best Case**:
   - O(n + m) comparisons
   - No spurious hits
   - Efficient hash matches

2. **Average Case**:
   - O(n + m) expected time
   - Few spurious hits
   - Practical efficiency

3. **Worst Case**:
   - O(mn) with many collisions
   - Rare in practice
   - Hash function dependent

### Summary:

The Rabin-Karp Algorithm represents a unique approach to string matching by leveraging the power of hashing techniques. Its primary strength lies in its ability to efficiently handle multiple pattern matching scenarios, making it particularly valuable in applications such as plagiarism detection and content analysis.

The algorithm's efficiency stems from its use of rolling hash functions, which allow for constant-time updates as the pattern window slides through the text. While hash collisions can theoretically lead to worst-case performance, proper implementation and choice of hash function make such cases rare in practice.

The implementation provides a robust foundation for both single and multiple pattern matching tasks, with the flexibility to be optimized for specific use cases. The algorithm's simple yet effective approach, combined with its practical performance characteristics, makes it a valuable tool in various text processing applications, especially those involving multiple pattern matching or content similarity analysis.

The Rabin-Karp Algorithm's unique characteristics make it particularly well-suited for specialized applications where multiple pattern matching or content similarity detection is required, complementing other string matching algorithms in the broader landscape of text processing solutions.