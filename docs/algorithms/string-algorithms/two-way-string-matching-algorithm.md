---

id: two-way-string-matching
sidebar_position: 8
title: Two-Way String-Matching Algorithm
sidebar_label: Two-Way String-Matching Algorithm

---

### Definition:

The Two-Way String-Matching Algorithm, developed by Crochemore and Perrin, is an efficient pattern matching algorithm that combines forward and backward scanning techniques. It improves upon classical algorithms by processing the pattern in both directions, reducing the number of character comparisons needed during the search phase.

### Characteristics:

- **Bidirectional Scanning**:
  - Combines both left-to-right and right-to-left scanning
  - Uses the advantages of both scanning directions
  - Reduces the number of character comparisons

- **Critical Factorization**:
  - Divides the pattern into two parts based on its periodicity
  - Uses the critical factorization theorem
  - Optimizes the matching process based on pattern structure

- **Efficient Shifting**:
  - Employs maximal suffixes for efficient shift calculations
  - Utilizes period information for better shifts
  - Reduces the number of comparisons needed

- **Pattern Preprocessing**:
  - Analyzes pattern structure before searching
  - Computes critical factorization points
  - Prepares shift tables for both directions

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is the length of the pattern
  - Includes critical factorization computation
  - Computing maximal suffixes and shift tables

- **Searching: $O(n)$**
  - Where n is the length of the text
  - Best case performance of O(n/m)
  - Sublinear on average

### Space Complexity:

- **Space Usage: $O(m)$**
  - Where m is the pattern length
  - Storage for preprocessing information
  - Constant extra space during search phase

### C++ Implementation:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class TwoWayStringMatcher {
private:
    // Compute the maximal suffix for forward scanning
    pair<int, int> maximalSuffix(const string& pattern) {
        int m = pattern.length();
        int ms = -1, j = 0, k = 1, p = 1;
        
        while (j + k < m) {
            char a = pattern[j + k];
            char b = pattern[ms + k];
            
            if (a < b) {
                j += k;
                k = 1;
                p = j - ms;
            }
            else if (a == b) {
                if (k != p)
                    k++;
                else {
                    j += p;
                    k = 1;
                }
            }
            else { // a > b
                ms = j;
                j = ms + 1;
                k = 1;
                p = 1;
            }
        }
        return make_pair(ms, p);
    }
    
    // Compute the maximal suffix for backward scanning
    pair<int, int> maximalSuffixReverse(const string& pattern) {
        string revPattern = pattern;
        reverse(revPattern.begin(), revPattern.end());
        return maximalSuffix(revPattern);
    }
    
    // Find critical factorization point
    int criticalFactorization(const string& pattern) {
        auto [ms1, p1] = maximalSuffix(pattern);
        auto [ms2, p2] = maximalSuffixReverse(pattern);
        return max(ms1 + 1, (int)pattern.length() - ms2 - 2);
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0) return matches;
        
        // Preprocessing
        int critical = criticalFactorization(pattern);
        
        // Searching phase
        int i = 0;
        while (i <= n - m) {
            // Try matching at current position
            int j;
            
            // Forward scan from critical point
            for (j = critical; j < m && pattern[j] == text[i + j]; j++);
            if (j < m) {
                i++;
                continue;
            }
            
            // Backward scan from critical point
            for (j = critical - 1; j >= 0 && pattern[j] == text[i + j]; j--);
            if (j < 0) {
                matches.push_back(i);
            }
            
            // Shift pattern
            i += max(1, critical - j);
        }
        
        return matches;
    }
};

class TwoWayStringMatcherDemo {
public:
    static void demonstrateSearch() {
        TwoWayStringMatcher matcher;
        string text = "GCATCGCAGAGAGTATACAGTACG";
        string pattern = "GCAGAGAG";
        
        vector<int> matches = matcher.search(text, pattern);
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    TwoWayStringMatcherDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Pattern Analysis**:
   - Critical factorization computation
   - Period calculation
   - Maximal suffix computation

2. **Scanning Strategy**:
   - Forward scanning from critical point
   - Backward scanning when needed
   - Efficient shift calculation

3. **Optimization Techniques**:
   - Period-based shifts
   - Critical factorization
   - Bidirectional scanning

### Applications:

1. **Text Processing**:
   - Text editors
   - Document search
   - Pattern matching systems

2. **Bioinformatics**:
   - DNA sequence matching
   - Protein sequence analysis
   - Genomic pattern finding

3. **Information Retrieval**:
   - Search engines
   - Document indexing
   - Content filtering

4. **Network Security**:
   - Intrusion detection
   - Pattern-based monitoring
   - Network traffic analysis

### Advanced Features:

1. **Variants and Extensions**:
   - Multiple pattern matching
   - Approximate matching
   - Unicode support

2. **Performance Optimizations**:
   - SIMD implementations
   - Cache-aware variants
   - Parallel processing adaptations

### Comparison with Other Algorithms:

1. **Advantages**:
   - Fewer comparisons on average
   - Better worst-case behavior
   - Efficient for periodic patterns

2. **Trade-offs**:
   - More complex preprocessing
   - Additional memory for tables
   - Implementation complexity

### Summary:

The Two-Way String-Matching Algorithm represents a sophisticated approach to pattern matching that combines the benefits of both forward and backward scanning. Its use of critical factorization and bidirectional scanning makes it particularly efficient for many practical applications. The algorithm's sublinear average-case performance and robust worst-case behavior make it suitable for situations where consistent performance is required.

The implementation, while more complex than simpler string matching algorithms, provides excellent performance characteristics and is particularly well-suited for applications where pattern matching performance is crucial. The algorithm's ability to handle periodic patterns efficiently and its reduced number of character comparisons make it a valuable tool in the string matching algorithm arsenal.