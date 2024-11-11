---

id: turbo-boyer-moore-algorithm
sidebar_position: 20
title: Turbo Boyer-Moore Algorithm
sidebar_label: Turbo Boyer-Moore Algorithm

---

### Definition:

The Turbo Boyer-Moore Algorithm is an enhanced version of the classic Boyer-Moore algorithm that improves performance by utilizing information from previous comparisons. It reduces the number of character comparisons by remembering matched portions of the pattern and using this information for subsequent shifts.

### Characteristics:

- **Memory Utilization**:
  - Stores previous match information
  - Turbo shifting technique
  - Factor-based optimization

- **Enhanced Shifting**:
  - Advanced bad character rule
  - Improved good suffix rule
  - Turbo shift calculation

- **Pattern Analysis**:
  - Preprocessing phase
  - Factor recognition
  - Match history tracking

- **Efficient Scanning**:
  - Right-to-left scanning
  - Skip character technique
  - Match factorization

### Time Complexity:

- **Preprocessing: $O(m + σ)$**
  - Where m is pattern length
  - σ is alphabet size
  - One-time computation

- **Searching: $O(n)$**
  - Where n is text length
  - Sublinear in practice
  - Better than original Boyer-Moore

### Space Complexity:

- **Space Usage: $O(m + σ)$**
  - Pattern storage
  - Shift tables
  - Match memory

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class TurboBoyerMoore {
private:
    static const int ALPHABET_SIZE = 256;
    
    // Compute bad character rule
    vector<int> computeBadChar(const string& pattern) {
        vector<int> badChar(ALPHABET_SIZE, -1);
        int m = pattern.length();
        
        for (int i = 0; i < m; i++) {
            badChar[pattern[i]] = i;
        }
        
        return badChar;
    }
    
    // Compute good suffix rule
    vector<int> computeGoodSuffix(const string& pattern) {
        int m = pattern.length();
        vector<int> goodSuffix(m + 1, 0);
        vector<int> suffix = computeSuffixArray(pattern);
        
        for (int i = 0; i < m; i++) {
            goodSuffix[i] = m;
        }
        
        for (int i = m - 1; i >= 0; i--) {
            if (suffix[i] == i + 1) {
                for (int j = 0; j < m - 1 - i; j++) {
                    if (goodSuffix[j] == m) {
                        goodSuffix[j] = m - 1 - i;
                    }
                }
            }
        }
        
        for (int i = 0; i <= m - 2; i++) {
            goodSuffix[m - 1 - suffix[i]] = m - 1 - i;
        }
        
        return goodSuffix;
    }
    
    // Compute suffix array
    vector<int> computeSuffixArray(const string& pattern) {
        int m = pattern.length();
        vector<int> suffix(m, m);
        int g = m - 1;
        int f = m - 1;
        
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
        
        return suffix;
    }

public:
    // Main search function
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0) return matches;
        
        // Preprocessing
        vector<int> badChar = computeBadChar(pattern);
        vector<int> goodSuffix = computeGoodSuffix(pattern);
        
        // Searching phase with turbo shift
        int j = 0;  // text position
        while (j <= n - m) {
            int i = m - 1;  // pattern position
            int lastMismatch = -1;
            int turboShift = 0;
            
            // Right to left scan with memory
            while (i >= 0 && lastMismatch == -1) {
                if (pattern[i] != text[j + i]) {
                    lastMismatch = i;
                }
                i--;
            }
            
            if (lastMismatch == -1) {
                // Pattern found
                matches.push_back(j);
                turboShift = goodSuffix[0];
            } else {
                // Calculate shifts
                int bcShift = lastMismatch - badChar[text[j + lastMismatch]];
                int gsShift = goodSuffix[lastMismatch];
                turboShift = max(bcShift, gsShift);
                
                // Turbo shift optimization
                if (lastMismatch < m - 1) {
                    turboShift = max(turboShift, 
                                   m - 1 - lastMismatch);
                }
            }
            
            j += turboShift;
        }
        
        return matches;
    }
};

// Demonstration class
class TurboDemo {
public:
    static void demonstrateAlgorithm() {
        TurboBoyerMoore algo;
        string text = "GCATCGCAGAGAGTATACAGTACG";
        string pattern = "GCAGAGAG";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        vector<int> matches = algo.search(text, pattern);
        
        cout << "\nPattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Additional test case
        text = "AABAACAADAABAAABAA";
        pattern = "AABA";
        cout << "\nText: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        matches = algo.search(text, pattern);
        
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    TurboDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Turbo Shifting**:
   - Enhanced shift calculation
   - Memory-based optimization
   - Efficient skip mechanism

2. **Pattern Processing**:
   - Advanced preprocessing
   - Shift table generation
   - Match history utilization

3. **Optimization Techniques**:
   - Match memory usage
   - Factor-based shifts
   - Skip calculations

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Text search
   - Document analysis

2. **Information Retrieval**:
   - Search engines
   - Content filtering
   - Pattern detection

3. **Data Analysis**:
   - String searching
   - Pattern recognition
   - Content scanning

4. **File Systems**:
   - File searching
   - Content indexing
   - Pattern matching

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Approximate matching
   - Extended turbo shifts

2. **Implementation Optimizations**:
   - Cache efficiency
   - Memory management
   - Parallel processing

### Comparison with Basic Boyer-Moore:

1. **Advantages**:
   - Better average performance
   - Reduced comparisons
   - Memory utilization

2. **Trade-offs**:
   - Implementation complexity
   - Memory overhead
   - Preprocessing time

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Optimal shifting
   - Maximum skip

2. **Average Case**:
   - Sublinear performance
   - Efficient character skipping
   - Better than basic Boyer-Moore

3. **Worst Case**:
   - O(n) guaranteed
   - Linear scan
   - Pattern dependent

### Summary:

The Turbo Boyer-Moore Algorithm represents a significant enhancement over the classic Boyer-Moore algorithm by incorporating memory of previous comparisons and utilizing advanced shifting techniques. Its ability to remember matched portions of the pattern and use this information for subsequent shifts makes it particularly efficient for pattern matching tasks.

The algorithm's strength lies in its sophisticated shift calculations and memory utilization, which often result in fewer character comparisons than the original Boyer-Moore algorithm. The implementation provides both the basic functionality and advanced features that make it suitable for various text processing applications.

The practical applications range from simple text searches to complex pattern matching scenarios. Its improved performance characteristics make it particularly valuable in situations where efficient string matching is crucial, such as in search engines and content analysis systems.

The algorithm's enhancements, while adding some complexity to the implementation, provide tangible benefits in terms of reduced comparisons and improved average-case performance, making it a valuable tool in the string matching algorithm arsenal.