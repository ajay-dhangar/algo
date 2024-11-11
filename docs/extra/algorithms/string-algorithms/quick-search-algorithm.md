---

id: quick-search-algorithm
sidebar_position: 26
title: Quick Search Algorithm
sidebar_label: Quick Search Algorithm

---

### Definition:

The Quick Search Algorithm is a string matching algorithm that extends the Boyer-Moore approach by examining the character immediately following the current pattern window. It simplifies the bad character rule by only looking at the character after the current window position, making it particularly efficient for short patterns.

### Characteristics:

- **Next Character Rule**:
  - Examines character after window
  - Simplified bad character rule
  - Quick shift calculation

- **Preprocessing Phase**:
  - Simple shift table
  - Character-based lookup
  - Efficient computation

- **Right-to-Left Scanning**:
  - Pattern comparison
  - Next character analysis
  - Efficient shifting

- **Simple Implementation**:
  - Minimal preprocessing
  - Straightforward logic
  - Easy maintenance

### Time Complexity:

- **Preprocessing: $O(m + σ)$**
  - Where m is pattern length
  - σ is alphabet size
  - One-time computation

- **Searching: $O(m \times n)$**
  - Where n is text length
  - Better average case
  - Pattern-dependent performance

### Space Complexity:

- **Space Usage: $O(σ)$**
  - Shift table storage
  - Character-based indices
  - Constant pattern space

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class QuickSearchAlgorithm {
private:
    static const int ALPHABET_SIZE = 256;
    
    // Compute the bad character shift table
    vector<int> computeShiftTable(const string& pattern) {
        int m = pattern.length();
        vector<int> shift(ALPHABET_SIZE, m + 1);
        
        // Fill the shift table
        for (int i = 0; i < m; i++) {
            shift[pattern[i]] = m - i;
        }
        
        return shift;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        vector<int> shift = computeShiftTable(pattern);
        
        // Searching phase
        int pos = 0;
        while (pos <= n - m) {
            int i = 0;
            
            // Check pattern match
            while (i < m && pattern[i] == text[pos + i]) {
                i++;
            }
            
            if (i == m) {
                // Pattern found
                matches.push_back(pos);
            }
            
            // Calculate shift using character after the window
            if (pos + m < n) {
                pos += shift[text[pos + m]];
            } else {
                break;
            }
        }
        
        return matches;
    }
    
    // Advanced search with additional optimizations
    vector<int> advancedSearch(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        vector<int> shift = computeShiftTable(pattern);
        
        // Character occurrence map
        vector<bool> patternChars(ALPHABET_SIZE, false);
        for (char c : pattern) {
            patternChars[c] = true;
        }
        
        // First and last characters of pattern
        char firstChar = pattern[0];
        char lastChar = pattern[m - 1];
        
        // Searching phase with optimizations
        int pos = 0;
        while (pos <= n - m) {
            // Quick check for first and last characters
            if (text[pos] == firstChar && text[pos + m - 1] == lastChar) {
                int i = 1;
                while (i < m - 1 && pattern[i] == text[pos + i]) {
                    i++;
                }
                
                if (i == m - 1) {
                    matches.push_back(pos);
                }
            }
            
            // Calculate shift using next character
            if (pos + m < n) {
                char nextChar = text[pos + m];
                // Additional optimization: if next character not in pattern
                if (!patternChars[nextChar]) {
                    pos += m + 1;
                } else {
                    pos += shift[nextChar];
                }
            } else {
                break;
            }
        }
        
        return matches;
    }
    
    // Visualize shift table
    void printShiftTable(const string& pattern) {
        vector<int> shift = computeShiftTable(pattern);
        cout << "Shift Table (showing non-default values):" << endl;
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            if (shift[i] != pattern.length() + 1) {
                cout << (char)i << ": " << shift[i] << endl;
            }
        }
    }
};

// Demonstration class
class QuickSearchDemo {
public:
    static void demonstrateAlgorithm() {
        QuickSearchAlgorithm algo;
        
        // Example 1: Basic pattern matching
        string text = "GCATCGCAGAGAGTATACAGTACG";
        string pattern = "GCAGAGAG";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        // Show shift table
        cout << "\nShift table for pattern:" << endl;
        algo.printShiftTable(pattern);
        
        // Basic search
        vector<int> matches = algo.search(text, pattern);
        cout << "\nBasic search - Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Advanced search
        matches = algo.advancedSearch(text, pattern);
        cout << "Advanced search - Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
        
        // Example 2: Short pattern
        text = "ABCABCDABABCDABCDABDE";
        pattern = "ABCD";
        cout << "\nText: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
        matches = algo.advancedSearch(text, pattern);
        cout << "Pattern found at positions: ";
        for (int pos : matches) {
            cout << pos << " ";
        }
        cout << endl;
    }
};

int main() {
    QuickSearchDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Next Character Rule**:
   - Simple shift calculation
   - Efficient character skipping
   - Pattern-based shifting

2. **Efficient Preprocessing**:
   - Simple shift table
   - Character-based lookup
   - Fast computation

3. **Optimized Implementation**:
   - Early termination checks
   - Character occurrence filtering
   - Quick shift decisions

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Text search
   - Document scanning

2. **String Searching**:
   - Content filtering
   - Pattern detection
   - Text analysis

3. **Data Analysis**:
   - Pattern recognition
   - Content searching
   - String matching

4. **Real-time Processing**:
   - Quick text search
   - Stream processing
   - Interactive applications

### Advanced Features:

1. **Algorithm Variants**:
   - Enhanced character checking
   - Multiple pattern support
   - Case-insensitive matching

2. **Implementation Optimizations**:
   - Character filtering
   - Early termination
   - Efficient shifting

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Efficient character skipping
   - Quick pattern detection

2. **Average Case**:
   - Better than Boyer-Moore
   - Reduced comparisons
   - Efficient for short patterns

3. **Worst Case**:
   - O(mn) comparisons
   - Pattern dependent
   - Still maintains efficiency

### Summary:

The Quick Search Algorithm represents a practical simplification of the Boyer-Moore approach, focusing on the character following the current window for shift calculations. Its straightforward implementation and efficient performance make it particularly suitable for short patterns and real-time applications.

The algorithm's strength lies in its simplified shifting strategy and minimal preprocessing requirements. While maintaining good average-case performance, it reduces implementation complexity compared to more sophisticated string matching algorithms.

The practical applications range from basic text searching to real-time pattern matching scenarios. Its efficiency with short patterns and simple implementation make it a valuable choice for applications where implementation simplicity and quick pattern matching are priorities.

The algorithm's balance of performance and simplicity makes it an excellent choice for many practical string matching applications, particularly when dealing with short patterns or requiring straightforward implementation.