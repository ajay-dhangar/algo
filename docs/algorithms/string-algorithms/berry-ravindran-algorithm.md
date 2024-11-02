---

id: berry-ravindran-algorithm
sidebar_position: 23
title: Berry-Ravindran Algorithm
sidebar_label: Berry-Ravindran Algorithm

---

### Definition:

The Berry-Ravindran Algorithm is an efficient pattern matching algorithm that combines features of the Quick Search and Zhu-Takaoka algorithms. It uses two consecutive characters after the current window to determine shift distances, making it particularly effective for medium to large pattern lengths and alphabets.

### Characteristics:

- **Bad Character Rule**:
  - Two-character lookup
  - Extended shifting strategy
  - Efficient skip calculation

- **Preprocessing Phase**:
  - Two-dimensional shift table
  - Character pair analysis
  - Shift optimization

- **Right-to-Left Scanning**:
  - Pattern comparison
  - Efficient shifting
  - Quick mismatch detection

- **Extended Window**:
  - Next character examination
  - Pair-based shifting
  - Optimized jumps

### Time Complexity:

- **Preprocessing: $O(m + σ²)$**
  - Where m is pattern length
  - σ is alphabet size
  - Two-dimensional table

- **Searching: $O(m \times n)$**
  - Where n is text length
  - Sublinear in practice
  - Better average case

### Space Complexity:

- **Space Usage: $O(σ²)$**
  - Shift table storage
  - Two-character indices
  - Constant pattern space

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class BerryRavindran {
private:
    static const int ALPHABET_SIZE = 256;
    
    // Compute bad character shift table for two characters
    vector<vector<int>> computeShiftTable(const string& pattern) {
        int m = pattern.length();
        vector<vector<int>> shiftTable(ALPHABET_SIZE, 
                                     vector<int>(ALPHABET_SIZE));
        
        // Initialize with maximum shift
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            for (int j = 0; j < ALPHABET_SIZE; j++) {
                shiftTable[i][j] = m + 2;
            }
        }
        
        // Fill shift values for pattern characters
        for (int i = 0; i <= m - 1; i++) {
            // Last character pair gets shift of 1
            if (i == m - 1) {
                for (int k = 0; k < ALPHABET_SIZE; k++) {
                    shiftTable[pattern[i]][k] = 1;
                }
                continue;
            }
            
            // Other positions get m - i
            shiftTable[pattern[i]][pattern[i + 1]] = m - i;
        }
        
        return shiftTable;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        auto shiftTable = computeShiftTable(pattern);
        
        // Searching phase
        int pos = 0;
        while (pos <= n - m) {
            // Compare pattern with text from right to left
            int j = m - 1;
            while (j >= 0 && pattern[j] == text[pos + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                matches.push_back(pos);
                pos++;
            } else {
                // Calculate shift using two characters after current window
                if (pos + m + 1 >= n) {
                    // End of text reached
                    break;
                }
                
                unsigned char nextChar1 = text[pos + m];
                unsigned char nextChar2 = text[pos + m + 1];
                pos += shiftTable[nextChar1][nextChar2];
            }
        }
        
        return matches;
    }
    
    // Function to visualize shift table
    void printShiftTable(const string& pattern) {
        auto shiftTable = computeShiftTable(pattern);
        cout << "Shift Table (showing non-default values):" << endl;
        
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            for (int j = 0; j < ALPHABET_SIZE; j++) {
                if (shiftTable[i][j] != pattern.length() + 2) {
                    cout << "(" << (char)i << "," << (char)j << "): " 
                         << shiftTable[i][j] << endl;
                }
            }
        }
    }
};

// Demonstration class
class BerryRavindranDemo {
public:
    static void demonstrateAlgorithm() {
        BerryRavindran algo;
        
        // Example 1: Basic pattern matching
        string text = "ABCABCDABABCDABCDABDE";
        string pattern = "ABCDABD";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        vector<int> matches = algo.search(text, pattern);
        
        cout << "\nPattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Example 2: Show shift table
        cout << "\nShift table for pattern '" << pattern << "':" << endl;
        algo.printShiftTable(pattern);
        
        // Example 3: Different pattern
        pattern = "AABAAA";
        text = "AABAABAAAABAAA";
        cout << "\nNew Text: " << text << endl;
        cout << "New Pattern: " << pattern << endl;
        
        matches = algo.search(text, pattern);
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    BerryRavindranDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Two-Character Shifts**:
   - Enhanced bad character rule
   - Pair-based lookup
   - Maximum shift calculation

2. **Efficient Preprocessing**:
   - Two-dimensional shift table
   - Pattern analysis
   - Shift optimization

3. **Fast Scanning**:
   - Right-to-left comparison
   - Quick shift decisions
   - Optimal skip values

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Text search
   - Document analysis

2. **Information Retrieval**:
   - String searching
   - Content scanning
   - Pattern detection

3. **Data Analysis**:
   - Sequence matching
   - Pattern recognition
   - Content filtering

4. **File Systems**:
   - File searching
   - Content indexing
   - Pattern matching

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern matching
   - Case-insensitive matching
   - Unicode support

2. **Implementation Optimizations**:
   - Cache-efficient versions
   - Memory-efficient variants
   - Parallel processing

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Large shifts
   - Efficient skipping

2. **Average Case**:
   - Sublinear time
   - Better than Boyer-Moore
   - Efficient for large alphabets

3. **Worst Case**:
   - O(mn) comparisons
   - Pattern dependent
   - Rare in practice

### Summary:

The Berry-Ravindran Algorithm represents an efficient approach to pattern matching by utilizing two-character lookahead for shift calculations. Its combination of features from Quick Search and Zhu-Takaoka algorithms makes it particularly effective for practical applications.

The algorithm's strength lies in its enhanced shifting strategy, which allows for larger jumps in the text by considering two characters after the current window. The implementation provides both the core functionality and additional features for analysis and visualization.

The practical applications range from simple text searches to complex pattern matching scenarios. Its improved average-case performance makes it particularly valuable in situations where efficient string matching is crucial, such as in text editors and search engines.

The algorithm's innovative approach to shift calculation, while requiring additional preprocessing space, provides significant benefits in terms of reduced comparisons and improved average-case performance, making it a valuable addition to the string matching algorithm family.