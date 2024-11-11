---

id: sunday-algorithm
sidebar_position: 14
title: Sunday Algorithm
sidebar_label: Sunday Algorithm

---

### Definition:

The Sunday Algorithm is a string matching algorithm developed by Daniel M. Sunday in 1990. It extends the Boyer-Moore approach by examining the character immediately following the pattern's alignment window to determine shift distances. This modification often results in larger shifts, making it particularly efficient for short patterns and large alphabets.

### Characteristics:

- **Next Character Rule**:
  - Examines character after current window
  - Determines maximum possible shift
  - Enables larger jumps in text

- **Shift Table**:
  - Preprocesses pattern for shifts
  - Character-based lookup
  - Simple calculation method

- **Preprocessing Phase**:
  - Builds shift lookup table
  - One-time computation
  - Alphabet-dependent preprocessing

- **Left-to-Right Pattern Comparison**:
  - Pattern comparison from left
  - Uses preprocessed shift values
  - Efficient character skipping

### Time Complexity:

- **Preprocessing: $O(m + σ)$**
  - Where m is pattern length
  - σ is alphabet size
  - One-time table construction

- **Searching: $O(m \times n)$**
  - Where n is text length
  - Best case: O(n/m)
  - Average case: sublinear

### Space Complexity:

- **Space Usage: $O(σ)$**
  - Shift table storage
  - Alphabet size dependent
  - Constant pattern storage

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class SundayAlgorithm {
private:
    // Compute the shift table for the pattern
    unordered_map<char, int> computeShiftTable(const string& pattern) {
        unordered_map<char, int> shiftTable;
        int m = pattern.length();
        
        // Initialize all characters with pattern length + 1
        for (int i = 0; i < 256; i++) {
            shiftTable[i] = m + 1;
        }
        
        // Fill the actual shifts for pattern characters
        for (int i = 0; i < m; i++) {
            shiftTable[pattern[i]] = m - i;
        }
        
        return shiftTable;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocess pattern
        unordered_map<char, int> shiftTable = computeShiftTable(pattern);
        
        // Searching phase
        int pos = 0;
        while (pos <= n - m) {
            int i = 0;
            
            // Try to match pattern at current position
            while (i < m && pattern[i] == text[pos + i]) {
                i++;
            }
            
            if (i == m) {
                // Pattern found
                matches.push_back(pos);
            }
            
            // Calculate shift based on next character
            if (pos + m < n) {
                pos += shiftTable[text[pos + m]];
            } else {
                break;
            }
        }
        
        return matches;
    }
};

// Demonstration class
class SundayDemo {
public:
    static void demonstrateSearch() {
        SundayAlgorithm algo;
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
        
        // Demonstrate with different pattern
        pattern = "TACG";
        cout << "\nSearching for pattern: " << pattern << endl;
        matches = algo.search(text, pattern);
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    SundayDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Next Character Rule**:
   - Examines character beyond window
   - Maximum possible shifts
   - Efficient skip calculation

2. **Shift Table**:
   - Character-based lookup
   - Simple preprocessing
   - Efficient shift values

3. **Optimization Techniques**:
   - Quick character lookups
   - Efficient shift calculation
   - Minimal comparisons

### Applications:

1. **Text Processing**:
   - Document searching
   - Text editors
   - Word processors

2. **Pattern Matching**:
   - String searching
   - Content filtering
   - Data analysis

3. **Information Retrieval**:
   - Document scanning
   - Content indexing
   - Pattern detection

4. **Bioinformatics**:
   - DNA sequence matching
   - Protein pattern search
   - Genomic analysis

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Case-insensitive matching
   - Unicode support

2. **Implementation Optimizations**:
   - Cache-friendly versions
   - Memory-efficient variants
   - Parallel implementations

### Comparison with Other Algorithms:

1. **Advantages**:
   - Simpler implementation than Boyer-Moore
   - Better average-case performance
   - Larger shifts possible

2. **Trade-offs**:
   - Additional memory for shift table
   - Pattern length dependent
   - Alphabet size dependency

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Maximum character skips
   - Optimal shifting

2. **Average Case**:
   - Sublinear performance
   - Efficient for short patterns
   - Good practical speed

3. **Worst Case**:
   - O(mn) theoretical bound
   - Rare in practice
   - Still maintains efficiency

### Summary:

The Sunday Algorithm represents a practical improvement over traditional string matching algorithms through its innovative use of the next character rule. Its simplicity in implementation combined with efficient shifting makes it particularly effective for real-world applications, especially when dealing with short patterns and large alphabets.

The algorithm's strength lies in its ability to determine shifts based on characters following the current window, often allowing it to skip more characters than algorithms like Boyer-Moore. While it maintains the same worst-case complexity as other string matching algorithms, its practical performance and ease of implementation make it a valuable choice for many text processing applications.

The implementation provides a straightforward yet efficient approach to string matching, with the flexibility to be optimized for specific use cases. Its balanced combination of simplicity and performance, particularly for short patterns, makes it a practical choice in many string matching scenarios, complementing the broader family of string searching algorithms.