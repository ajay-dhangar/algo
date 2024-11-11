---

id: reverse-factor-algorithm
sidebar_position: 28
title: Reverse Factor Algorithm
sidebar_label: Reverse Factor Algorithm

---

### Definition:

The Reverse Factor Algorithm is a string matching algorithm that utilizes suffix automaton concepts for pattern matching. It processes the pattern from right to left and builds a suffix automaton to efficiently identify matches. The algorithm is particularly effective for patterns with repeated suffixes.

### Characteristics:

- **Suffix Automaton**:
  - State machine construction
  - Suffix links
  - Transition function

- **Right-to-Left Processing**:
  - Reverse pattern scanning
  - Suffix-based matching
  - Efficient state transitions

- **Pattern Analysis**:
  - Suffix structure
  - State computation
  - Transition table

- **State Management**:
  - Automaton states
  - Transition tracking
  - Match detection

### Time Complexity:

- **Preprocessing: $O(m)$**
  - Where m is pattern length
  - Automaton construction
  - State computation

- **Searching: $O(n)$**
  - Where n is text length
  - Linear scan
  - State transitions

### Space Complexity:

- **Space Usage: $O(m|Σ|)$**
  - Where |Σ| is alphabet size
  - State information
  - Transition table

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <unordered_map>
using namespace std;

class ReverseFactor {
private:
    struct State {
        map<char, int> transitions;
        int suffixLink;
        int length;
        bool isFinal;
        
        State() : suffixLink(-1), length(0), isFinal(false) {}
    };
    
    vector<State> automaton;
    string pattern;
    int states;
    
    // Build suffix automaton for reversed pattern
    void buildAutomaton() {
        automaton.clear();
        automaton.resize(2 * pattern.length());
        states = 0;
        
        // Initialize first state
        automaton.push_back(State());
        states++;
        
        int last = 0;
        // Process pattern from right to left
        for (int i = pattern.length() - 1; i >= 0; i--) {
            char c = pattern[i];
            
            // Create new state
            int current = states++;
            automaton.push_back(State());
            automaton[current].length = automaton[last].length + 1;
            
            // Add transition from last to current state
            int p = last;
            while (p != -1 && !automaton[p].transitions.count(c)) {
                automaton[p].transitions[c] = current;
                p = automaton[p].suffixLink;
            }
            
            if (p == -1) {
                automaton[current].suffixLink = 0;
            } else {
                int q = automaton[p].transitions[c];
                if (automaton[p].length + 1 == automaton[q].length) {
                    automaton[current].suffixLink = q;
                } else {
                    // Clone state
                    int clone = states++;
                    automaton.push_back(State());
                    automaton[clone] = automaton[q];
                    automaton[clone].length = automaton[p].length + 1;
                    
                    while (p != -1 && automaton[p].transitions[c] == q) {
                        automaton[p].transitions[c] = clone;
                        p = automaton[p].suffixLink;
                    }
                    
                    automaton[q].suffixLink = automaton[current].suffixLink = clone;
                }
            }
            
            last = current;
        }
        
        // Mark final states
        int state = last;
        while (state != -1) {
            automaton[state].isFinal = true;
            state = automaton[state].suffixLink;
        }
    }

public:
    vector<int> search(const string& text, const string& pat) {
        vector<int> matches;
        pattern = pat;
        
        if (pattern.empty() || text.empty()) return matches;
        
        // Build automaton for reversed pattern
        buildAutomaton();
        
        // Searching phase
        int state = 0;
        for (int i = 0; i <= text.length() - pattern.length(); i++) {
            state = 0;
            bool matched = true;
            
            // Check pattern match from current position
            for (int j = i + pattern.length() - 1; j >= i; j--) {
                if (automaton[state].transitions.count(text[j])) {
                    state = automaton[state].transitions[text[j]];
                } else {
                    matched = false;
                    break;
                }
            }
            
            if (matched && automaton[state].isFinal) {
                matches.push_back(i);
            }
        }
        
        return matches;
    }
    
    // Advanced search with optimizations
    vector<int> advancedSearch(const string& text, const string& pat) {
        vector<int> matches;
        pattern = pat;
        
        if (pattern.empty() || text.empty()) return matches;
        
        // Build automaton
        buildAutomaton();
        
        // Precompute character occurrence in pattern
        vector<bool> patternChars(256, false);
        for (char c : pattern) {
            patternChars[c] = true;
        }
        
        // Searching with optimizations
        int state = 0;
        for (int i = 0; i <= text.length() - pattern.length(); i++) {
            // Quick check for pattern characters
            if (!patternChars[text[i]]) {
                continue;
            }
            
            state = 0;
            bool matched = true;
            
            // Check pattern match with early termination
            for (int j = i + pattern.length() - 1; j >= i; j--) {
                if (!automaton[state].transitions.count(text[j])) {
                    matched = false;
                    break;
                }
                state = automaton[state].transitions[text[j]];
            }
            
            if (matched && automaton[state].isFinal) {
                matches.push_back(i);
            }
        }
        
        return matches;
    }
};

// Demonstration class
class ReverseFactorDemo {
public:
    static void demonstrateAlgorithm() {
        ReverseFactor algo;
        
        // Example 1: Basic pattern matching
        string text = "ACACABAACACABACACA";
        string pattern = "ACABA";
        
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
        
        // Example 2: Pattern with repeating suffixes
        text = "ABCABCABCABC";
        pattern = "ABCABC";
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
    ReverseFactorDemo::demonstrateAlgorithm();
    return 0;
}
```

### Key Features:

1. **Suffix Automaton Construction**:
   - Efficient state building
   - Transition management
   - Suffix link computation

2. **Right-to-Left Processing**:
   - Reverse pattern matching
   - State transition optimization
   - Efficient match detection

3. **Optimized Implementation**:
   - Character filtering
   - Early termination
   - State management

### Applications:

1. **Text Processing**:
   - Pattern matching
   - Suffix analysis
   - Text searching

2. **String Analysis**:
   - Suffix detection
   - Pattern recognition
   - Text verification

3. **Data Processing**:
   - String matching
   - Content filtering
   - Pattern identification

4. **Information Retrieval**:
   - Document searching
   - Pattern detection
   - Content analysis

### Advanced Features:

1. **Algorithm Variants**:
   - Multiple pattern support
   - Enhanced state management
   - Optimized transitions

2. **Implementation Optimizations**:
   - Character filtering
   - State caching
   - Transition optimization

### Performance Characteristics:

1. **Best Case**:
   - O(n) operations
   - Efficient state transitions
   - Quick pattern detection

2. **Average Case**:
   - Linear time performance
   - Efficient matching
   - State-based optimization

3. **Worst Case**:
   - O(n) comparisons
   - Linear scan guarantee
   - Predictable performance

### Summary:

The Reverse Factor Algorithm represents a sophisticated approach to string matching using suffix automaton concepts. Its ability to process patterns from right to left and utilize state transitions makes it particularly effective for patterns with repeated suffixes.

The algorithm's strength lies in its efficient state machine construction and transition management, enabling quick pattern matching through state transitions. The implementation provides both basic and optimized versions for different use cases.

The practical applications of this algorithm extend to various text processing scenarios where suffix-based pattern matching is beneficial. Its linear time complexity and efficient state management make it particularly valuable for specific pattern matching requirements.

The algorithm's combination of suffix automaton concepts and right-to-left processing provides a unique approach to pattern matching, making it especially useful in scenarios where traditional left-to-right algorithms might be less efficient.