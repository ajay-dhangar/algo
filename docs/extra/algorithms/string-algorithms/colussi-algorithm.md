---

id: colussi-algorithm
sidebar_position: 27
title: Colussi Algorithm
sidebar_label: Colussi Algorithm

---

### Definition:

The Colussi Algorithm is an improvement over the Knuth-Morris-Pratt (KMP) algorithm that reduces the number of character comparisons. It divides pattern positions into two classes and uses a two-phase pattern scanning approach, leading to more efficient pattern matching by optimizing the order of character comparisons.

### Characteristics:

- **Two-Phase Scanning**:
  - Position classification
  - Optimized comparison order
  - Reduced comparisons

- **Pattern Analysis**:
  - Position categorization
  - Jump table computation
  - Efficient preprocessing

- **Enhanced Failure Function**:
  - Advanced shift calculation
  - Improved skip values
  - Optimized backtracking

- **Efficient Processing**:
  - Reduced comparisons
  - Smart position handling
  - Quick mismatch detection

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Pattern analysis
  - Table construction

- **Searching: $O(n)$**
  - Where n is text length
  - Reduced comparisons
  - Linear scan

### Space Complexity:

- **Space Usage: $O(m)$**
  - Position tables
  - Jump information
  - Pattern data

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class ColussiAlgorithm {
private:
    struct PreprocessData {
        vector<int> jump;     // Jump table
        vector<bool> pos;     // Position classification
        vector<int> next;     // Next position to check
        vector<int> shift;    // Shift values
    };
    
    // Preprocess pattern for efficient matching
    PreprocessData preprocess(const string& pattern) {
        int m = pattern.length();
        PreprocessData data;
        data.jump.resize(m + 1, 0);
        data.pos.resize(m, false);
        data.next.resize(m, 0);
        data.shift.resize(m + 1, 0);
        
        // Classify positions
        for (int i = 0; i < m; i++) {
            data.pos[i] = (i == 0 || pattern[i] != pattern[i-1]);
        }
        
        // Compute jump table
        int lastPos = -1;
        for (int i = 0; i < m; i++) {
            if (data.pos[i]) {
                if (lastPos >= 0) {
                    data.next[lastPos] = i;
                }
                lastPos = i;
            }
            data.jump[i + 1] = lastPos;
        }
        
        // Compute shift table
        for (int i = 0; i < m; i++) {
            if (data.pos[i]) {
                int j = i;
                while (j > 0 && !data.pos[j-1]) {
                    j--;
                }
                data.shift[i] = i - j;
            }
        }
        
        return data;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        PreprocessData data = preprocess(pattern);
        
        // Searching phase
        int i = 0;  // text position
        while (i <= n - m) {
            int j = 0;  // pattern position
            bool matched = true;
            
            // First phase: check classified positions
            while (j < m) {
                if (data.pos[j]) {
                    if (text[i + j] != pattern[j]) {
                        matched = false;
                        break;
                    }
                    j = data.next[j];
                } else {
                    j++;
                }
            }
            
            if (matched) {
                // Second phase: verify remaining positions
                j = 0;
                bool fullMatch = true;
                while (j < m) {
                    if (!data.pos[j] && text[i + j] != pattern[j]) {
                        fullMatch = false;
                        break;
                    }
                    j++;
                }
                
                if (fullMatch) {
                    matches.push_back(i);
                }
            }
            
            // Calculate shift
            if (j == 0) {
                i++;
            } else {
                i += data.shift[j];
            }
        }
        
        return matches;
    }
    
    // Enhanced search with additional optimizations
    vector<int> advancedSearch(const string& text, const string& pattern) {
        vector<int> matches;
        int n = text.length();
        int m = pattern.length();
        
        if (m == 0 || m > n) return matches;
        
        // Preprocessing
        PreprocessData data = preprocess(pattern);
        
        // Character occurrence map
        vector<bool> patternChars(256, false);
        for (char c : pattern) {
            patternChars[c] = true;
        }
        
        // Searching with optimizations
        int i = 0;
        while (i <= n - m) {
            // Quick character check
            if (!patternChars[text[i]]) {
                i++;
                continue;
            }
            
            int j = 0;
            bool matched = true;
            
            // Two-phase scanning with early termination
            for (j = 0; j < m && matched; j++) {
                if (data.pos[j]) {
                    if (text[i + j] != pattern[j]) {
                        matched = false;
                    }
                }
            }
            
            if (matched) {
                // Verify remaining positions
                bool fullMatch = true;
                for (j = 0; j < m; j++) {
                    if (!data.pos[j] && text[i + j] != pattern[j]) {
                        fullMatch = false;
                        break;
                    }
                }
                
                if (fullMatch) {
                    matches.push_back(i);
                }
            }
            
            // Optimized shift calculation
            i += matched ? 1 : max(1, data.shift[j]);
        }
        
        return matches;
    }
};

// Demonstration class
class ColussiDemo {
public:
    static void demonstrateAlgorithm() {
        ColussiAlgorithm algo;
        
        // Example 1: Basic pattern matching
        string text = "AABAACAADAABAAABAA";
        string pattern = "AABAA";
        
        cout << "Text: " << text << endl;
        cout << "Pattern: " << pattern << endl;
        
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
        
        // Example 2: Different pattern
        text = "ABCABCDABABCDABCDABDE";
        pattern = "ABCDABD";
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
    ColussiDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Position Classification**:
   - Two-phase scanning
   - Optimized comparison order
   - Smart position selection

2. **Enhanced Processing**:
   - Reduced comparisons
   - Efficient shift calculation
   - Quick mismatch detection

3. **Advanced Optimization**:
   - Character filtering
   - Early termination
   - Smart shifting

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Text search
   - Content analysis

2. **String Analysis**:
   - Pattern detection
   - Content filtering
   - Text verification

3. **Data Processing**:
   - String matching
   - Pattern recognition
   - Content searching

4. **Performance-Critical Systems**:
   - Real-time searching
   - Efficient matching
   - Fast text processing

### Advanced Features:

1. **Algorithm Variants**:
   - Enhanced position classification
   - Multiple pattern support
   - Optimized scanning

2. **Implementation Optimizations**:
   - Character filtering
   - Early termination
   - Efficient shifting

### Performance Characteristics:

1. **Best Case**:
   - O(n/m) comparisons
   - Quick pattern detection
   - Efficient skipping

2. **Average Case**:
   - Better than KMP
   - Reduced comparisons
   - Efficient processing

3. **Worst Case**:
   - O(n) comparisons
   - Linear time guarantee
   - Optimal performance

### Summary:

The Colussi Algorithm represents a significant improvement over the KMP algorithm by introducing position classification and two-phase scanning. Its innovative approach to pattern matching reduces the number of character comparisons while maintaining linear time complexity.

The algorithm's strength lies in its ability to optimize the order of character comparisons through intelligent position classification and enhanced shift calculations. The implementation provides both basic and advanced features for efficient pattern matching.

The practical applications of this algorithm extend to various text processing scenarios where performance is critical. Its reduced number of comparisons makes it particularly valuable in situations requiring efficient string matching.

The algorithm's combination of theoretical improvements and practical optimizations makes it a powerful choice for pattern matching tasks, especially in performance-critical applications where reducing the number of comparisons is essential.