---

id: suffix-array-algorithm
sidebar_position: 17
title: Suffix Array Algorithm
sidebar_label: Suffix Array Algorithm

---

### Definition:

The Suffix Array Algorithm is a space-efficient data structure that stores all suffixes of a string in lexicographically sorted order. Combined with the LCP (Longest Common Prefix) array, it provides efficient solutions for various string processing problems, including pattern matching, substring searches, and string analysis.

### Characteristics:

- **Lexicographical Sorting**:
  - Orders all suffixes
  - Maintains position information
  - Enables binary search

- **LCP Array**:
  - Stores common prefix lengths
  - Enhances string operations
  - Supports efficient queries

- **Construction Methods**:
  - Multiple building approaches
  - Trade-offs in complexity
  - Optimization options

- **Space Efficiency**:
  - Linear space usage
  - Implicit suffix storage
  - Compact representation

### Time Complexity:

- **Construction: $O(n \times log n)$**
  - Using standard sorting
  - Can be O(n) with specialized algorithms
  - Includes LCP array construction

- **Pattern Matching: $O(m \times log n)$**
  - Where m is pattern length
  - Uses binary search
  - Additional O(m) for verification

### Space Complexity:

- **Overall: $O(n)$**
  - Suffix array storage
  - LCP array (optional)
  - Auxiliary space for construction

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class SuffixArray {
private:
    string text;
    vector<int> suffixArray;
    vector<int> lcpArray;
    
    // Compute suffix array using prefix doubling
    void buildSuffixArray() {
        int n = text.length();
        vector<int> rank(n);
        vector<int> tempRank(n);
        vector<pair<pair<int,int>,int>> pairs(n);
        
        // Initialize with single character ranks
        for (int i = 0; i < n; i++) {
            rank[i] = text[i];
            suffixArray[i] = i;
        }
        
        for (int len = 1; len < n; len *= 2) {
            // Create pairs for sorting
            for (int i = 0; i < n; i++) {
                pairs[i] = {{rank[i], 
                            i + len < n ? rank[i + len] : -1}, i};
            }
            
            // Sort suffixes
            sort(pairs.begin(), pairs.end());
            
            // Update ranks
            tempRank[pairs[0].second] = 0;
            for (int i = 1; i < n; i++) {
                tempRank[pairs[i].second] = tempRank[pairs[i-1].second];
                if (pairs[i].first != pairs[i-1].first) {
                    tempRank[pairs[i].second]++;
                }
            }
            rank = tempRank;
            
            // Check if all ranks are unique
            if (rank[pairs[n-1].second] == n-1) break;
        }
        
        // Store final suffix array
        for (int i = 0; i < n; i++) {
            suffixArray[i] = pairs[i].second;
        }
    }
    
    // Compute LCP array using Kasai's algorithm
    void buildLCPArray() {
        int n = text.length();
        vector<int> rank(n);
        lcpArray.resize(n);
        
        // Compute rank array (inverse of suffix array)
        for (int i = 0; i < n; i++) {
            rank[suffixArray[i]] = i;
        }
        
        int k = 0;  // Length of previous LCP
        for (int i = 0; i < n; i++) {
            if (rank[i] == n-1) {
                k = 0;
                continue;
            }
            
            int j = suffixArray[rank[i] + 1];
            
            // Compute LCP
            while (i + k < n && j + k < n && 
                   text[i + k] == text[j + k]) {
                k++;
            }
            
            lcpArray[rank[i]] = k;
            
            if (k > 0) k--;
        }
    }

public:
    SuffixArray(const string& str) : text(str) {
        suffixArray.resize(text.length());
        buildSuffixArray();
        buildLCPArray();
    }
    
    // Pattern matching using binary search
    vector<int> findPattern(const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        // Binary search for lower bound
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            int cmp = text.compare(suffixArray[mid], m, pattern);
            
            if (cmp == 0) {
                // Found a match, gather all occurrences
                int start = mid;
                while (start > 0 && 
                       text.compare(suffixArray[start-1], m, pattern) == 0) {
                    start--;
                }
                int end = mid;
                while (end < n-1 && 
                       text.compare(suffixArray[end+1], m, pattern) == 0) {
                    end++;
                }
                
                for (int i = start; i <= end; i++) {
                    matches.push_back(suffixArray[i]);
                }
                break;
            }
            
            if (cmp < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        sort(matches.begin(), matches.end());
        return matches;
    }
    
    // Get longest common prefix at position i
    int getLCP(int i) {
        return lcpArray[i];
    }
    
    // Get suffix array
    const vector<int>& getSuffixArray() const {
        return suffixArray;
    }
    
    // Get LCP array
    const vector<int>& getLCPArray() const {
        return lcpArray;
    }
    
    // Get all suffixes in sorted order
    vector<string> getAllSuffixes() {
        vector<string> suffixes;
        for (int pos : suffixArray) {
            suffixes.push_back(text.substr(pos));
        }
        return suffixes;
    }
};

// Demonstration class
class SuffixArrayDemo {
public:
    static void demonstrateAlgorithm() {
        string text = "banana$";
        SuffixArray sa(text);
        
        cout << "Text: " << text << endl;
        
        // Display suffix array
        cout << "\nSuffix Array:" << endl;
        vector<string> suffixes = sa.getAllSuffixes();
        const vector<int>& positions = sa.getSuffixArray();
        for (size_t i = 0; i < suffixes.size(); i++) {
            cout << positions[i] << ": " << suffixes[i] << endl;
        }
        
        // Display LCP array
        cout << "\nLCP Array:" << endl;
        const vector<int>& lcp = sa.getLCPArray();
        for (size_t i = 0; i < lcp.size()-1; i++) {
            cout << "LCP[" << i << "]: " << lcp[i] << endl;
        }
        
        // Pattern matching demonstration
        string pattern = "ana";
        cout << "\nSearching for pattern: " << pattern << endl;
        vector<int> matches = sa.findPattern(pattern);
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    SuffixArrayDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Efficient Construction**:
   - Multiple building methods
   - LCP array computation
   - Rank array utilization

2. **Pattern Matching Support**:
   - Binary search capability
   - Multiple occurrence handling
   - Linear space usage

3. **Enhanced Operations**:
   - Longest common prefix queries
   - Substring searches
   - Lexicographical ordering

### Applications:

1. **String Processing**:
   - Pattern matching
   - Substring searches
   - String analysis

2. **Bioinformatics**:
   - Genome sequence analysis
   - DNA pattern matching
   - Sequence comparison

3. **Data Compression**:
   - Burrows-Wheeler transform
   - Text indexing
   - Compression algorithms

4. **Text Mining**:
   - Document analysis
   - String similarity
   - Pattern discovery

### Advanced Features:

1. **Algorithm Variants**:
   - DC3/Skew algorithm
   - SA-IS algorithm
   - Linear-time construction

2. **Implementation Optimizations**:
   - Cache-efficient versions
   - Memory-optimized variants
   - Parallel construction

### Comparison with Other Algorithms:

1. **Advantages**:
   - Space efficiency
   - Fast pattern matching
   - Versatile applications

2. **Trade-offs**:
   - Construction complexity
   - Memory requirements
   - Implementation complexity

### Performance Characteristics:

1. **Best Case**:
   - O(n log n) construction
   - O(m log n) pattern matching
   - Linear space usage

2. **Average Case**:
   - Consistent performance
   - Efficient pattern matching
   - Predictable behavior

3. **Worst Case**:
   - O(n log n) construction
   - O(m + log n) pattern matching
   - Linear space requirement

### Summary:

The Suffix Array Algorithm represents a powerful and space-efficient approach to string processing and pattern matching. Its ability to store all suffixes in sorted order while maintaining linear space complexity makes it a valuable tool for various string-related applications.

The algorithm's strength lies in its combination of space efficiency and fast pattern matching capabilities. When coupled with the LCP array, it provides enhanced functionality for string processing tasks, including longest common prefix queries and efficient substring searches.

The implementation provides a comprehensive solution for string processing needs, offering pattern matching, suffix enumeration, and LCP queries. The algorithm's versatility and efficiency make it particularly valuable in applications ranging from text processing to bioinformatics, where efficient string operations are crucial.

The ability to support various construction methods and optimizations allows for adaptation to specific use cases, while maintaining its fundamental efficiency in handling string-related operations. Its practical applications in data compression, text mining, and sequence analysis demonstrate its significance in modern computing applications.