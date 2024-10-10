---

id: shift-or-algo  
sidebar_position: 5  
title: Shift-Or Algorithm  
sidebar_label: Shift-Or Algorithm  

---

### Definition:

The Shift-Or algorithm, also known as the **Bitap algorithm for exact matching**, is a string matching technique that uses bitwise operations to perform efficient pattern searching. It is particularly suitable for exact matching tasks and handles fixed-length patterns by representing them as bitmasks. The algorithm processes the text and the pattern in parallel, allowing for quick and efficient searches.

### Characteristics:

- **Bitwise Matching**:
  - The Shift-Or algorithm encodes the search pattern as a set of bitmasks, where each bit represents whether a character in the text matches a position in the pattern. This allows multiple pattern positions to be checked simultaneously using bitwise operations.

- **Exact Matching**:
  - The algorithm is designed for exact string matching, where no mismatches, insertions, or deletions are allowed. It performs efficiently for small patterns.

- **Compact Representation**:
  - Shift-Or uses bitwise shifting to represent pattern states, providing a compact and efficient approach to handling pattern matching.

- **Linear Time Complexity**:
  - The algorithm processes the input text linearly, making it highly efficient for exact matching tasks, particularly when the pattern length is small compared to the text length.

### Time Complexity:

- **Best Case: $O\left(\frac{n}{w}\right)$**  
  In the best case, where `w` is the word size of the machine, the algorithm processes multiple characters in parallel, leading to a faster search in practice.

- **Average Case: $O(n)$**  
  On average, the algorithm performs in linear time with respect to the text length `n`, as it makes a single pass through the text.

- **Worst Case: $O(n)$**  
  Even in the worst-case scenario, the Shift-Or algorithm maintains linear time complexity since it processes each character of the text once.

### Space Complexity:

- **Space Complexity: $O(m)$**  
  The algorithm requires space proportional to the pattern length `m` to store bitmasks, making it space-efficient for small patterns.

### C++ Implementation:

**Exact Matching**
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

#define CHAR_SIZE 256 // Extended ASCII

void preprocessPattern(const string& pattern, vector<int>& patternMask) {
    int m = pattern.size();
    for (int i = 0; i < CHAR_SIZE; ++i) {
        patternMask[i] = ~0; // Initialize all bits to 1
    }
    for (int i = 0; i < m; ++i) {
        patternMask[pattern[i]] &= ~(1 << i); // Set bitmask for the pattern
    }
}

void shiftOrSearch(const string& text, const string& pattern) {
    int n = text.size();
    int m = pattern.size();

    if (m > n) return;

    vector<int> patternMask(CHAR_SIZE);
    preprocessPattern(pattern, patternMask);

    int R = ~0; // All bits are initially set to 1
    int matchBit = 1 << (m - 1); // The bit that will indicate a match

    for (int i = 0; i < n; ++i) {
        // Update the state
        R = (R << 1) | patternMask[text[i]];

        // If the matchBit is 0, a match is found
        if ((R & matchBit) == 0) {
            cout << "Pattern found at index " << i - m + 1 << endl;
        }
    }
}

int main() {
    string text = "abracadabra";
    string pattern = "abra";

    shiftOrSearch(text, pattern);

    return 0;
}
```

### Summary:

The Shift-Or algorithm is a highly efficient and compact exact string matching technique, using bitwise operations to process the text and the pattern in parallel. Its linear time complexity makes it ideal for exact matching tasks, especially for small patterns. With its ability to perform pattern matching using simple bitwise operations, the Shift-Or algorithm offers both speed and simplicity, making it a solid choice for exact string matching problems.