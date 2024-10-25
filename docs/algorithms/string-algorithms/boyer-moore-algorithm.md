---

id: boyer-moore-algorithm
sidebar_position: 12
title: Boyer-Moore Algorithm
sidebar_label: Boyer-Moore Algorithm

---

### Definition:

The Boyer-Moore Algorithm is a highly efficient string searching algorithm developed by Robert S. Boyer and J Strother Moore in 1977. It is considered one of the most efficient string matching algorithms in practice, particularly for large alphabets and long patterns. The algorithm scans the characters of the pattern from right to left and can skip portions of the text, making it sublinear in many cases.

### Characteristics:

- **Bad Character Rule**:
  - Uses character-based shifting
  - Skips characters not in pattern
  - Efficient for large alphabets

- **Good Suffix Rule**:
  - Utilizes previously matched suffixes
  - Enables larger shifts
  - Complements bad character rule

- **Preprocessing Phase**:
  - Builds bad character table
  - Constructs good suffix table
  - Prepares for efficient shifts

- **Right-to-Left Scanning**:
  - Examines pattern from right to left
  - Enables larger jumps in text
  - Improves average-case performance

### Time Complexity:

- **Preprocessing: $O(m + σ)$**
  - Where m is pattern length
  - σ is alphabet size
  - One-time computation

- **Searching: $O(m \times n)$**
  - Where n is text length
  - Best case: O(n/m)
  - Average case: O(n/m)

### Space Complexity:

- **Space Usage: $O(m + σ)$**
  - Bad character table
  - Good suffix table
  - Pattern storage

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class BoyerMooreAlgorithm {
private:
    static const int ALPHABET_SIZE = 256;
    
    // Compute the bad character table
    void computeBadChar(const string& pattern, 
                       vector<int>& badChar) {
        int m = pattern.length();
        
        // Initialize table with -1
        fill(badChar.begin(), badChar.end(), -1);
        
        // Fill the actual bad character occurrences
        for (int i = 0; i < m; i++) {
            badChar[pattern[i]] = i;
        }
    }
    
    // Compute the good suffix table
    void computeGoodSuffix(const string& pattern, 
                          vector<int>& goodSuffix) {
        int m = pattern.length();
        vector<int> suffix(m);
        
        // Compute suffix array
        computeSuffixArray(pattern, suffix);
        
        // Initialize with m (pattern length)
        fill(goodSuffix.begin(), goodSuffix.end(), m);
        
        // Case 1: matching suffixes
        for (int i = m - 1; i >= 0; i--) {
            if (suffix[i] == i + 1) {
                for (int j = 0; j < m - 1 - i; j++) {
                    if (goodSuffix[j] == m) {
                        goodSuffix[j] = m - 1 - i;
                    }
                }
            }
        }
        
        // Case 2: matching prefixes
        for (int i = 0; i < m - 1; i++) {
            goodSuffix[m - 1 - suffix[i]] = m - 1 - i;
        }
    }
    
    // Compute suffix array for good suffix rule
    void computeSuffixArray(const string& pattern, 
                          vector<int>& suffix) {
        int m = pattern.length();
        
        suffix[m - 1] = m;
        int g = m - 1;
        int f = 0;
        
        for (int i = m - 2; i >= 0; i--) {
            if (i > g && suffix[i + m - 1 - f] < i - g) {
                suffix[i] = suffix[i + m - 1 - f];
            } else {
                if (i < g) {
                    g = i;
                }
                f = i;
                while (g >= 0 && pattern[g] == pattern[g + m - 1 - f]) {
                    g--;
                }
                suffix[i] = f - g;
            }
        }
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        vector<int> badChar(ALPHABET_SIZE);
        vector<int> goodSuffix(m);
        
        computeBadChar(pattern, badChar);
        computeGoodSuffix(pattern, goodSuffix);
        
        // Searching phase
        int s = 0;  // shift
        while (s <= n - m) {
            int j = m - 1;
            
            // Match pattern from right to left
            while (j >= 0 && pattern[j] == text[s + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                matches.push_back(s);
                s += goodSuffix[0];
            } else {
                // Calculate shift using both rules
                int shift1 = j - badChar[text[s + j]];
                int shift2 = goodSuffix[j];
                s += max(1, max(shift1, shift2));
            }
        }
        
        return matches;
    }
};

// Demonstration class
class BoyerMooreDemo {
public:
    static void demonstrateSearch() {
        BoyerMooreAlgorithm algo;
        string text = "ABAAABCDAABACABAABAAB";
        string pattern = "AABACAB";
        
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
    BoyerMooreDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Bad Character Rule**:
   - Rightmost occurrence lookup
   - Character-based shifting
   - Alphabet-dependent performance

2. **Good Suffix Rule**:
   - Suffix-based pattern matching
   - Prefix-suffix relationships
   - Optimized shifting strategy

3. **Optimization Techniques**:
   - Combined shift rules
   - Efficient preprocessing
   - Skip character optimization

### Applications:

1. **Text Processing**:
   - Text editors
   - Word processors
   - Search utilities

2. **Bioinformatics**:
   - DNA sequence matching
   - Protein pattern search
   - Genomic analysis

3. **Network Security**:
   - Deep packet inspection
   - Pattern matching
   - Intrusion detection

4. **Information Retrieval**:
   - Search engines
   - Document scanning
   - Content filtering

### Advanced Features:

1. **Algorithm Variants**:
   - Turbo Boyer-Moore
   - Tuned Boyer-Moore
   - Extended Boyer-Moore

2. **Implementation Optimizations**:
   - Cache-efficient versions
   - Vectorized implementations
   - Memory-optimized variants

### Comparison with Other Algorithms:

1. **Advantages**:
   - Sublinear average case
   - Excellent practical performance
   - Better for longer patterns

2. **Trade-offs**:
   - Complex preprocessing
   - Higher space requirements
   - Implementation complexity

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Large character skips
   - Non-matching suffixes

2. **Average Case**:
   - O(n/m) expected time
   - Better than linear
   - Practical efficiency

3. **Worst Case**:
   - O(mn) theoretical bound
   - Rare in practice
   - Still performs well

### Summary:

The Boyer-Moore Algorithm stands as one of the most efficient string matching algorithms in practical applications. Its innovative approach of scanning patterns from right to left, combined with two powerful shifting rules (bad character and good suffix), enables it to skip large portions of the text during the search process.

The algorithm's efficiency stems from its ability to use preprocessing information about both individual characters and pattern suffixes to make intelligent decisions about how far to shift the pattern when a mismatch occurs. While the preprocessing phase and implementation are more complex compared to simpler algorithms, the superior searching performance, especially for longer patterns and larger alphabets, makes it a preferred choice in many real-world applications.

The implementation provides a robust foundation for text processing tasks, with the flexibility to be optimized for specific use cases through various available variants and optimizations. Despite its theoretical worst-case complexity, Boyer-Moore consistently demonstrates excellent practical performance, making it a cornerstone algorithm in string matching applications.