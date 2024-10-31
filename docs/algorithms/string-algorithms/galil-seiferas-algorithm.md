---
id: galil-seiferas-algorithm
sidebar_position: 30
title: Galil-Seiferas Algorithm
sidebar_label: Galil-Seiferas Algorithm
---

### Definition:

The Galil-Seiferas Algorithm is a linear-time string matching algorithm that requires no preprocessing of the pattern. It achieves optimal worst-case complexity without using additional space for pattern preprocessing, making it theoretically significant in string matching literature.

### Characteristics:

- **No Preprocessing**:
  - Pattern-independent processing
  - Direct text scanning
  - Constant extra space

- **Linear Time Matching**:
  - Optimal complexity
  - Efficient comparisons
  - Sequential processing

- **Pattern Analysis**:
  - Local period computation
  - Mismatch handling
  - Shift calculation

- **Position Management**:
  - Text position tracking
  - Pattern alignment
  - Shift optimization

### Time Complexity:

- **Preprocessing: $O(1)$**
  - No pattern preprocessing
  - Constant initialization
  - Direct scanning

- **Searching: $O(n)$**
  - Where n is text length
  - Linear worst-case
  - Optimal complexity

### Space Complexity:

- **Space Usage: $O(1)$**
  - Constant extra space
  - No preprocessing storage
  - Minimal memory requirement

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class GalilSeiferas {
private:
    // Helper function to compute local period
    int computeLocalPeriod(const string& pattern, int start, int end) {
        int period = 1;
        while (start + period <= end) {
            if (pattern[start] != pattern[start + period]) {
                break;
            }
            period++;
        }
        return period;
    }

public:
    vector<int> search(const string& text, const string& pattern) {
        vector<int> matches;
        
        if (pattern.empty() || text.empty()) return matches;
        
        int n = text.length();
        int m = pattern.length();
        
        int i = 0;  // text position
        
        while (i <= n - m) {
            int j = 0;  // pattern position
            
            // Check for potential match
            while (j < m && text[i + j] == pattern[j]) {
                j++;
            }
            
            // Found a match
            if (j == m) {
                matches.push_back(i);
            }
            
            if (j == 0) {
                i++;
            } else {
                // Compute local period for efficient shifting
                int period = computeLocalPeriod(pattern, 0, j - 1);
                i += max(1, j - period);
            }
        }
        
        return matches;
    }
    
    // Advanced implementation with additional optimizations
    vector<int> advancedSearch(const string& text, const string& pattern) {
        vector<int> matches;
        
        if (pattern.empty() || text.empty()) return matches;
        
        int n = text.length();
        int m = pattern.length();
        
        // Precompute pattern character occurrences
        vector<bool> patternChars(256, false);
        for (char c : pattern) {
            patternChars[c] = true;
        }
        
        int i = 0;
        while (i <= n - m) {
            // Quick character check
            if (!patternChars[text[i]]) {
                i++;
                continue;
            }
            
            int j = 0;
            // Match attempt with early termination
            while (j < m && text[i + j] == pattern[j]) {
                j++;
            }
            
            if (j == m) {
                matches.push_back(i);
            }
            
            if (j == 0) {
                i++;
            } else {
                // Optimized shifting based on local period
                int period = computeLocalPeriod(pattern, 0, j - 1);
                i += max(1, j - period);
            }
        }
        
        return matches;
    }
};