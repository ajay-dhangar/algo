---

id: zhu-takaoka-algorithm
sidebar_position: 10
title: Zhu-Takaoka Algorithm
sidebar_label: Zhu-Takaoka Algorithm

---

### Definition:

The Zhu-Takaoka Algorithm is a string matching algorithm developed by R.F. Zhu and T. Takaoka as an improvement to the Boyer-Moore algorithm. It enhances the bad character rule by considering two consecutive characters instead of just one, leading to potentially larger shifts and better average-case performance.

### Characteristics:

- **Two-Character Bad Character Rule**:
  - Uses pairs of characters for shift calculations
  - Improves upon Boyer-Moore's single character approach
  - Enables larger shifts in many cases

- **Good Suffix Rule**:
  - Incorporates the Boyer-Moore good suffix rule
  - Combines with two-character bad character rule
  - Optimizes shifting based on suffix matches

- **Preprocessing Phase**:
  - Computes two-character bad character table
  - Builds good suffix shift table
  - Prepares efficient lookup structures

- **Right-to-Left Scanning**:
  - Scans pattern from right to left
  - Uses enhanced shift calculations
  - Maintains Boyer-Moore efficiency

### Time Complexity:

- **Preprocessing: $O(m + σ²)$**
  - Where m is pattern length
  - σ is alphabet size
  - Two-character table construction

- **Searching: $O(n)$**
  - Where n is text length
  - Best case: O(n/m)
  - Sublinear on average

### Space Complexity:

- **Space Usage: $O(m + σ²)$**
  - Two-character bad character table
  - Good suffix table
  - Auxiliary preprocessing data

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class ZhuTakaokaAlgorithm {
private:
    static const int ALPHABET_SIZE = 256;
    
    // Compute the bad character table for two consecutive characters
    void computeBadCharTable(const string& pattern, 
                           vector<vector<int>>& badChar) {
        int m = pattern.length();
        
        // Initialize with pattern length
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            for (int j = 0; j < ALPHABET_SIZE; j++) {
                badChar[i][j] = m;
            }
        }
        
        // Fill the table with actual values
        for (int i = 0; i < m - 1; i++) {
            unsigned char first = pattern[i];
            unsigned char second = pattern[i + 1];
            badChar[first][second] = m - 1 - i;
        }
    }
    
    // Compute the good suffix table
    void computeGoodSuffix(const string& pattern, 
                          vector<int>& goodSuffix) {
        int m = pattern.length();
        vector<int> suffix(m);
        
        // Case 1: matching suffixes
        int lastPrefix = m;
        for (int i = m - 1; i >= 0; i--) {
            if (isPrefix(pattern, i + 1)) {
                lastPrefix = i + 1;
            }
            goodSuffix[i] = lastPrefix + (m - 1 - i);
        }
        
        // Case 2: matching suffixes that are not prefixes
        for (int i = 0; i < m - 1; i++) {
            int len = suffixLength(pattern, i);
            if (len > 0) {
                goodSuffix[m - 1 - len] = m - 1 - i + len;
            }
        }
    }
    
    // Check if pattern[p..m] is a prefix of pattern
    bool isPrefix(const string& pattern, int p) {
        int m = pattern.length();
        for (int i = p, j = 0; i < m; i++, j++) {
            if (pattern[i] != pattern[j]) {
                return false;
            }
        }
        return true;
    }
    
    // Length of the longest suffix of pattern[0..p] that matches
    // a suffix of pattern
    int suffixLength(const string& pattern, int p) {
        int m = pattern.length();
        int len = 0;
        int i = p;
        int j = m - 1;
        
        while (i >= 0 && pattern[i] == pattern[j]) {
            len++;
            i--;
            j--;
        }
        return len;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        vector<vector<int>> badChar(ALPHABET_SIZE, 
                                  vector<int>(ALPHABET_SIZE));
        vector<int> goodSuffix(m);
        
        computeBadCharTable(pattern, badChar);
        computeGoodSuffix(pattern, goodSuffix);
        
        // Searching phase
        int i = 0;
        while (i <= n - m) {
            int j = m - 1;
            
            // Match pattern from right to left
            while (j >= 0 && pattern[j] == text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                matches.push_back(i);
                i += goodSuffix[0];
            } else {
                // Calculate shift
                int shift1 = j < 1 ? 1 : 
                    badChar[text[i + j - 1]][text[i + j]];
                int shift2 = goodSuffix[j];
                i += max(shift1, shift2);
            }
        }
        
        return matches;
    }
};

// Demonstration class
class ZhuTakaokaDemo {
public:
    static void demonstrateSearch() {
        ZhuTakaokaAlgorithm algo;
        string text = "GCATCGCAGAGAGTATACAGTACG";
        string pattern = "GCAGAGAG";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        vector<int> matches = algo.search(text, pattern);
        
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    ZhuTakaokaDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Enhanced Bad Character Rule**:
   - Two-character lookup table
   - Improved shift calculations
   - Better average-case performance

2. **Good Suffix Integration**:
   - Boyer-Moore good suffix rule
   - Suffix-based shifting
   - Prefix-suffix relationships

3. **Optimization Techniques**:
   - Efficient preprocessing
   - Combined shift strategies
   - Right-to-left scanning

### Applications:

1. **Text Processing**:
   - Text editors
   - Document search
   - Pattern matching systems

2. **Bioinformatics**:
   - DNA sequence analysis
   - Protein pattern matching
   - Genome searching

3. **Network Security**:
   - Intrusion detection
   - Network monitoring
   - Pattern-based filtering

4. **Information Retrieval**:
   - Search engines
   - Content analysis
   - Document indexing

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Approximate matching
   - Unicode support

2. **Implementation Optimizations**:
   - Cache-efficient variants
   - SIMD implementations
   - Memory-efficient versions

### Comparison with Boyer-Moore:

1. **Advantages**:
   - Larger shifts on average
   - Better handling of patterns with repeating characters
   - Improved performance for certain pattern types

2. **Trade-offs**:
   - Larger preprocessing space
   - More complex implementation
   - Additional preprocessing time

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Occurs with non-matching characters
   - Benefits from two-character shifts

2. **Average Case**:
   - Sublinear performance
   - Better than Boyer-Moore for many patterns
   - Efficient for large alphabets

3. **Worst Case**:
   - O(nm) theoretical bound
   - Rare in practice
   - Still maintains practical efficiency

### Summary:

The Zhu-Takaoka Algorithm represents a significant improvement over the Boyer-Moore algorithm through its innovative use of two-character bad character rules. This enhancement allows for potentially larger shifts during the matching process, leading to better average-case performance. The algorithm maintains the advantages of Boyer-Moore while adding its own optimizations.

The implementation combines the enhanced bad character rule with the good suffix rule from Boyer-Moore, providing a robust and efficient string matching solution. The algorithm's ability to consider character pairs makes it particularly effective for patterns where single-character approaches might be less efficient. While it requires more preprocessing space and time than Boyer-Moore, the improved shifting strategy often leads to better overall performance, especially for certain types of patterns and larger alphabets.