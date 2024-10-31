---
id: sbom-algorithm
sidebar_position: 29
title: Set Backward Oracle Matching Algorithm
sidebar_label: SBOM Algorithm
---

### Definition:

The Set Backward Oracle Matching (SBOM) algorithm is a string matching algorithm that combines the factor oracle automaton with backward pattern matching. It processes the text from right to left using a minimal automaton called the factor oracle, which recognizes at least all the factors of the pattern.

### Characteristics:

- **Factor Oracle**:
  - Minimal automaton construction
  - Forward and backward transitions
  - Factor recognition capabilities

- **Backward Matching**:
  - Right-to-left scanning
  - Window shifting mechanism
  - Pattern factorization

- **Pattern Analysis**:
  - Factor identification
  - Oracle construction
  - Shift computation

- **State Management**:
  - Oracle states
  - Transition tracking
  - Factor recognition

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Oracle construction
  - State initialization

- **Searching: $O(n)$**
  - Where n is text length
  - Average case sublinear
  - Efficient shifting

### Space Complexity:

- **Space Usage: $O(m)$**
  - Where m is pattern length
  - Oracle storage
  - Transition information

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class SBOM {
private:
    struct State {
        unordered_map<char, int> transitions;
        int length;
        
        State() : length(0) {}
    };
    
    vector<State> oracle;
    string pattern;
    int states;
    
    // Build factor oracle for pattern
    void buildOracle() {
        oracle.clear();
        oracle.resize(pattern.length() + 1);
        states = pattern.length() + 1;
        
        // Initialize first state
        for (int i = 0; i <= pattern.length(); i++) {
            oracle[i] = State();
            oracle[i].length = i;
        }
        
        // Build transitions
        for (int i = 0; i < pattern.length(); i++) {
            oracle[i].transitions[pattern[i]] = i + 1;
            
            // External transitions
            for (int j = i - 1; j >= 0; j--) {
                char c = pattern[i];
                if (oracle[j].transitions.count(c)) {
                    break;
                }
                oracle[j].transitions[c] = i + 1;
            }
        }
    }

public:
    vector<int> search(const string& text, const string& pat) {
        vector<int> matches;
        pattern = pat;
        
        if (pattern.empty() || text.empty()) return matches;
        
        // Build oracle
        buildOracle();
        
        // Searching phase
        int pos = pattern.length() - 1;
        while (pos < text.length()) {
            int state = 0;
            int j = pos;
            
            // Backward matching
            while (j >= pos - pattern.length() + 1 && 
                   oracle[state].transitions.count(text[j])) {
                state = oracle[state].transitions[text[j]];
                j--;
            }
            
            // Check if match found
            if (j == pos - pattern.length()) {
                matches.push_back(pos - pattern.length() + 1);
            }
            
            // Shift pattern
            pos += pattern.length();
        }
        
        return matches;
    }
    
    // Advanced search with optimizations
    vector<int> advancedSearch(const string& text, const string& pat) {
        vector<int> matches;
        pattern = pat;
        
        if (pattern.empty() || text.empty()) return matches;
        
        // Build oracle
        buildOracle();
        
        // Precompute pattern characters
        vector<bool> patternChars(256, false);
        for (char c : pattern) {
            patternChars[c] = true;
        }
        
        // Searching with optimizations
        int pos = pattern.length() - 1;
        while (pos < text.length()) {
            // Quick character check
            if (!patternChars[text[pos]]) {
                pos += pattern.length();
                continue;
            }
            
            int state = 0;
            int j = pos;
            
            // Backward matching with early termination
            while (j >= pos - pattern.length() + 1 && 
                   oracle[state].transitions.count(text[j])) {
                state = oracle[state].transitions[text[j]];
                j--;
            }
            
            if (j == pos - pattern.length()) {
                matches.push_back(pos - pattern.length() + 1);
            }
            
            pos += pattern.length();
        }
        
        return matches;
    }
};