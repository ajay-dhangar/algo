---

id: crochemores-algorithm
sidebar_position: 9
title: Crochemore's Algorithm
sidebar_label: Crochemore's Algorithm

---

### Definition:

Crochemore's Algorithm is a string matching algorithm developed by Maxime Crochemore that uses pattern periodicity properties to achieve efficient pattern matching. It's particularly notable for its optimal worst-case time complexity and its ability to handle periodic patterns efficiently.

### Characteristics:

- **Periodicity-Based Approach**:
  - Exploits pattern periodicity for efficient matching
  - Uses period-based shifts for pattern advancement
  - Optimizes matching for repetitive patterns

- **Border Analysis**:
  - Computes pattern borders during preprocessing
  - Uses border information for shift calculations
  - Efficiently handles overlapping matches

- **Memory Efficiency**:
  - Requires minimal additional space
  - In-place processing where possible
  - Efficient handling of pattern information

- **Optimal Complexity**:
  - Achieves optimal worst-case time complexity
  - Efficient for both periodic and non-periodic patterns
  - Balanced preprocessing and searching phases

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is the pattern length
  - Includes border computation
  - Period analysis of the pattern

- **Searching: $O(n)$**
  - Where n is the text length
  - Linear time worst-case complexity
  - Optimal for single pattern matching

### Space Complexity:

- **Space Usage: $O(m)$**
  - Constant extra space beyond pattern storage
  - Border information storage
  - Period information maintenance

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class CrochemoreAlgorithm {
private:
    // Compute the border array for the pattern
    vector<int> computeBorder(const string& pattern) {
        int m = pattern.length();
        vector<int> border(m + 1, -1);
        border[0] = -1;
        
        for (int i = 1; i <= m; i++) {
            int b = border[i - 1];
            while (b >= 0 && pattern[b] != pattern[i - 1]) {
                b = border[b];
            }
            border[i] = b + 1;
        }
        return border;
    }

    // Compute the period array
    vector<int> computePeriod(const string& pattern, const vector<int>& border) {
        int m = pattern.length();
        vector<int> period(m + 1);
        
        for (int i = 1; i <= m; i++) {
            if (border[i] > 0 && 
                pattern[border[i] - 1] != pattern[i - 1]) {
                period[i] = i - border[i];
            } else {
                period[i] = period[i - 1];
            }
        }
        return period;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0) return matches;
        
        // Preprocessing
        vector<int> border = computeBorder(pattern);
        vector<int> period = computePeriod(pattern, border);
        
        // Searching phase
        int i = 0;  // text position
        int j = 0;  // pattern position
        
        while (i <= n - m) {
            while (j < m && pattern[j] == text[i + j]) {
                j++;
            }
            
            if (j == m) {
                matches.push_back(i);
                j = border[j];
            }
            
            if (j == 0) {
                i++;
            } else {
                // Use period information for shifting
                int shift = j - border[j];
                i += shift;
                j = border[j];
            }
        }
        
        return matches;
    }

    // Advanced variant with critical factorization
    vector<int> searchWithCriticalFactorization(const string& text, 
                                              const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0) return matches;
        
        // Preprocessing
        vector<int> border = computeBorder(pattern);
        vector<int> period = computePeriod(pattern, border);
        
        // Find critical position
        int critical = m / 2;  // Simplified critical factorization
        
        // Searching with critical factorization
        int i = 0;
        while (i <= n - m) {
            // Match forward from critical position
            int j = critical;
            while (j < m && pattern[j] == text[i + j]) {
                j++;
            }
            
            if (j == m) {
                // Match backward from critical position
                j = critical - 1;
                while (j >= 0 && pattern[j] == text[i + j]) {
                    j--;
                }
                
                if (j < 0) {
                    matches.push_back(i);
                }
            }
            
            // Compute shift using period information
            int shift = max(1, j - border[j]);
            i += shift;
        }
        
        return matches;
    }
};

// Demonstration class
class CrochemoreDemo {
public:
    static void demonstrateSearch() {
        CrochemoreAlgorithm algo;
        string text = "ABABCABABABCABAB";
        string pattern = "ABABC";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        // Basic search
        vector<int> matches = algo.search(text, pattern);
        cout << "Basic Search - Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Search with critical factorization
        matches = algo.searchWithCriticalFactorization(text, pattern);
        cout << "Critical Factorization Search - Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    CrochemoreDemo::demonstrateSearch();
    return 0;
}
```

### Key Features:

1. **Pattern Analysis**:
   - Border computation
   - Period calculation
   - Critical factorization

2. **Matching Strategy**:
   - Period-based shifting
   - Border-based matching
   - Efficient skip mechanism

3. **Optimization Techniques**:
   - Critical factorization
   - Period-based shifts
   - Border information usage

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Text search systems
   - Document processing

2. **Bioinformatics**:
   - DNA sequence analysis
   - Protein pattern matching
   - Genome sequencing

3. **Data Analysis**:
   - Pattern recognition
   - Data mining
   - Sequence analysis

4. **String Processing**:
   - Compiler design
   - Text editors
   - Search engines

### Advanced Features:

1. **Algorithm Variants**:
   - Critical factorization version
   - Multiple pattern matching
   - Approximate matching

2. **Implementation Optimizations**:
   - Cache-efficient variants
   - SIMD implementations
   - Parallel processing

### Comparison with Other Algorithms:

1. **Advantages**:
   - Optimal worst-case complexity
   - Efficient for periodic patterns
   - Minimal space requirements

2. **Trade-offs**:
   - Complex implementation
   - Preprocessing overhead
   - Critical factorization computation

### Summary:

Crochemore's Algorithm represents a sophisticated approach to string matching that combines theoretical optimality with practical efficiency. Its use of pattern periodicity and border information makes it particularly effective for patterns with repetitive structures. The algorithm's optimal worst-case time complexity and efficient space usage make it suitable for applications where predictable performance is crucial.

The implementation provides two variants: a basic version and an advanced version using critical factorization. Both versions demonstrate the algorithm's key features of period-based shifting and border-based matching. The algorithm's ability to handle periodic patterns efficiently and its optimal complexity characteristics make it a valuable tool in string matching applications, particularly where patterns may have repetitive structures.