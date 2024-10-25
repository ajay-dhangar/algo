---

id: knuth-morris-pratt-algorithm
sidebar_position: 11
title: Knuth-Morris-Pratt Algorithm
sidebar_label: Knuth-Morris-Pratt Algorithm

---

### Definition:

The Knuth-Morris-Pratt (KMP) Algorithm is a string matching algorithm developed by Donald Knuth, James H. Morris, and Vaughan Pratt. It improves upon naive string matching by utilizing information about previous character matches to avoid unnecessary comparisons, making it particularly efficient for patterns containing repeating subsequences.

### Characteristics:

- **Failure Function**:
  - Computes partial match table (also called failure function)
  - Tracks longest proper prefixes that are also suffixes
  - Enables efficient backtracking

- **Linear Time Matching**:
  - Never backtracks in the main text
  - Utilizes preprocessed information
  - Maintains constant space complexity

- **Preprocessing Phase**:
  - Builds failure function array
  - Analyzes pattern structure
  - Enables optimal shifts during search

- **Left-to-Right Scanning**:
  - Scans both pattern and text left to right
  - Uses failure function for mismatches
  - Maintains linear time complexity

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Constructs failure function
  - One-time computation

- **Searching: $O(n)$**
  - Where n is text length
  - Linear time guaranteed
  - No backtracking in text

### Space Complexity:

- **Space Usage: $O(m)$**
  - Failure function array
  - No additional dynamic space
  - Independent of text length

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class KMPAlgorithm {
private:
    // Compute the failure function
    vector<int> computeLPSArray(const string& pattern) {
        int m = pattern.length();
        vector<int> lps(m, 0);
        
        int len = 0;  // length of previous longest prefix suffix
        int i = 1;
        
        while (i < m) {
            if (pattern[i] == pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing: compute failure function
        vector<int> lps = computeLPSArray(pattern);
        
        // Searching phase
        int i = 0;  // index for text
        int j = 0;  // index for pattern
        
        while (i < n) {
            if (pattern[j] == text[i]) {
                i++;
                j++;
            }
            
            if (j == m) {
                // Pattern found
                matches.push_back(i - j);
                j = lps[j - 1];
            } else if (i < n && pattern[j] != text[i]) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return matches;
    }
};

// Demonstration class
class KMPDemo {
public:
    static void demonstrateSearch() {
        KMPAlgorithm algo;
        string text = "ABABDABACDABABCABAB";
        string pattern = "ABABCABAB";
        
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
    KMPDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Failure Function**:
   - Efficient prefix-suffix matching
   - Optimal shift calculation
   - Pattern preprocessing

2. **Linear Time Guarantee**:
   - No backtracking in text
   - Optimal worst-case complexity
   - Efficient pattern matching

3. **Optimization Techniques**:
   - Preprocessed pattern analysis
   - Efficient state transitions
   - Minimal character comparisons

### Applications:

1. **Text Processing**:
   - Text editors
   - File searching
   - Document analysis

2. **Bioinformatics**:
   - DNA sequence matching
   - Protein pattern analysis
   - Genome sequencing

3. **Network Security**:
   - Packet inspection
   - Signature detection
   - Data filtering

4. **Information Retrieval**:
   - Pattern matching
   - Text mining
   - Content searching

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Circular string matching
   - Approximate matching

2. **Implementation Optimizations**:
   - Cache-friendly versions
   - Parallel implementations
   - Memory-efficient variants

### Comparison with Other Algorithms:

1. **Advantages**:
   - Linear time guarantee
   - No text backtracking
   - Efficient for repetitive patterns

2. **Trade-offs**:
   - Preprocessing overhead
   - Additional space requirement
   - Complex implementation

### Performance Characteristics:

1. **Best Case**:
   - O(n) comparisons
   - Linear scanning
   - Immediate mismatches

2. **Average Case**:
   - O(n) performance
   - Consistent behavior
   - Pattern-independent

3. **Worst Case**:
   - O(n) guaranteed
   - No performance degradation
   - Stable behavior

### Summary:

The Knuth-Morris-Pratt Algorithm represents a significant advancement in string matching algorithms by introducing the concept of the failure function. This innovation allows the algorithm to avoid unnecessary comparisons by utilizing information about previous matches, resulting in a guaranteed linear-time performance.

The algorithm's efficiency comes from its ability to preprocess the pattern and build a failure function that enables optimal shifts during the matching phase. While it requires additional space for preprocessing, the KMP algorithm's guarantee of linear-time performance and its ability to handle repetitive patterns make it a valuable tool in various applications, from text processing to bioinformatics.

The implementation combines elegant theoretical concepts with practical efficiency, making it a fundamental algorithm in computer science. Its consistent performance characteristics and lack of text backtracking make it particularly suitable for real-time applications and streaming data processing.