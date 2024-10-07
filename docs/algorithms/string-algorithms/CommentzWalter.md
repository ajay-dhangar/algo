---

id: commentz-walter-algo  
sidebar_position: 4  
title: Commentz-Walter Algorithm  
sidebar_label: Commentz-Walter Algorithm  

---

### Definition:

The Commentz-Walter algorithm is an efficient string matching algorithm that combines the ideas of the Boyer-Moore algorithm and the Aho-Corasick algorithm. It is designed for multi-pattern matching, making it useful when searching for multiple patterns within a large text. By employing efficient pattern shifts and automaton-based techniques, it minimizes unnecessary comparisons.

### Characteristics:

- **Multi-Pattern Matching**:
  - The algorithm can handle multiple search patterns simultaneously, unlike other algorithms that focus on matching a single pattern. It builds an automaton for multiple patterns, enabling fast searching.

- **Backward Matching**:
  - Like the Boyer-Moore algorithm, the Commentz-Walter algorithm compares the pattern with the text from right to left, allowing it to skip over portions of the text when mismatches occur.

- **Efficient Shift Table**:
  - It utilizes a shift table, much like Boyer-Moore, to determine how far to skip when a mismatch occurs, improving the performance compared to simpler algorithms.

- **Combines Automaton and Heuristic Approaches**:
  - The algorithm uses an automaton (like in Aho-Corasick) to quickly match prefixes of the patterns and applies the Boyer-Moore heuristic to skip sections of the text, resulting in a powerful combination.

### Time Complexity:

- **Best Case: O(n / m)**  
  In the best case, the algorithm achieves sublinear performance due to the pattern skipping mechanism, where `n` is the text length and `m` is the minimum length of the patterns.

- **Average Case: O(n)**  
  On average, the Commentz-Walter algorithm processes the text in linear time, making it highly efficient for most practical scenarios involving multiple patterns.

- **Worst Case: O(n * m)**  
  The worst-case complexity occurs when the text and patterns have poor alignment, leading to more comparisons and resulting in quadratic time complexity.

### Space Complexity:

- **Space Complexity: O(m)**  
  The space complexity is linear with respect to the total length of the patterns, as the algorithm stores shift tables and automata structures for efficient pattern matching.

### C++ Implementation:

**Iterative Approach for Multi-Pattern Matching**
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

#define CHAR_SIZE 256 // Extended ASCII

// Preprocessing the pattern for building the bad character shift table
void preprocessBadCharacterShift(const vector<string>& patterns, unordered_map<char, int>& badCharShift, int maxPatternLength) {
    for (int i = 0; i < CHAR_SIZE; ++i) {
        badCharShift[i] = maxPatternLength; // Default shift is the length of the longest pattern
    }
    for (const auto& pattern : patterns) {
        for (int i = 0; i < pattern.size(); ++i) {
            badCharShift[pattern[i]] = maxPatternLength - i - 1;
        }
    }
}

// Commentz-Walter Algorithm
void commentzWalterSearch(const string& text, const vector<string>& patterns) {
    int n = text.size();
    int maxPatternLength = 0;

    // Find the maximum length of all patterns
    for (const auto& pattern : patterns) {
        maxPatternLength = max(maxPatternLength, (int)pattern.size());
    }

    // Preprocess bad character shift
    unordered_map<char, int> badCharShift;
    preprocessBadCharacterShift(patterns, badCharShift, maxPatternLength);

    int i = 0;
    while (i <= n - maxPatternLength) {
        bool matched = false;

        // Compare all patterns in reverse order
        for (const auto& pattern : patterns) {
            int m = pattern.size();
            int j = m - 1;

            while (j >= 0 && pattern[j] == text[i + j]) {
                --j;
            }

            if (j < 0) {
                cout << "Pattern \"" << pattern << "\" found at index " << i << endl;
                matched = true;
            }
        }

        if (!matched) {
            i += badCharShift[text[i + maxPatternLength - 1]]; // Shift based on the bad character rule
        } else {
            i += maxPatternLength; // Shift by the full length if matched
        }
    }
}

int main() {
    string text = "ABCABCABCDABC";
    vector<string> patterns = {"ABC", "ABCD"};

    commentzWalterSearch(text, patterns);

    return 0;
}
```

### Summary:

The Commentz-Walter algorithm is a hybrid string matching technique that efficiently handles multiple patterns by combining the strengths of the Boyer-Moore heuristic and the Aho-Corasick automaton. It performs well in scenarios requiring the simultaneous search for multiple patterns within a large text. While its worst-case performance can be quadratic, its average case is linear, making it highly effective for practical applications.