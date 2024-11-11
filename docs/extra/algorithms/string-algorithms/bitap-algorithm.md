---

id: bitap-algo  
sidebar_position: 3  
title: Bitap Algorithm  
sidebar_label: Bitap Algorithm  

---

### Definition:

The Bitap algorithm, also known as the **Shift-Or**, **Shift-And**, or **Bitap for Approximate String Matching**, is a string matching algorithm that efficiently finds patterns in a text with possible mismatches or errors. The algorithm leverages bitwise operations to perform both exact and approximate string matching, making it ideal for fuzzy searching.

### Characteristics:

- **Bitwise Matching**:
  - The Bitap algorithm uses bitwise operations to compare the pattern against the text. Each bit represents whether a character in the text matches a position in the pattern.

- **Approximate Matching**:
  - It supports approximate matching, where the pattern may have a certain number of mismatches, insertions, or deletions. This is especially useful in fields like text retrieval or DNA sequence matching.

- **Pattern Masking**:
  - The pattern is preprocessed into bitmasks, which are then used during the text scan to track how much of the pattern has been matched, including the handling of allowed errors.

- **Linear Search with Errors**:
  - The algorithm scans the text linearly, and the number of allowed errors (insertions, deletions, substitutions) is parameterized, allowing for flexible search criteria.

### Time Complexity:

- **Best Case: $O\left(\frac{n}{w}\right)$**  
  The best-case complexity is linear, as the algorithm processes `w` characters in parallel per word size `w` of the machine.

- **Average Case: $O(n)$**  
  On average, the algorithm performs in linear time with respect to the text size `n`, especially for small patterns or when only a few errors are allowed.

- **Worst Case: $O(n \times m)$**  
  In the worst case, if the pattern is large or if there are many errors allowed, the time complexity can degrade to quadratic, where `m` is the pattern length.

### Space Complexity:

- **Space Complexity: $O(m)$**  
  The algorithm requires space proportional to the pattern length `m` for storing bitmasks, making it efficient in terms of memory usage.

### C++ Implementation:

**Approximate Matching with `k` Allowed Errors**
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

#define CHAR_SIZE 256 // Extended ASCII

void preprocessPattern(const string& pattern, vector<int>& patternMask) {
    int m = pattern.size();
    for (int i = 0; i < CHAR_SIZE; ++i) {
        patternMask[i] = ~0;
    }
    for (int i = 0; i < m; ++i) {
        patternMask[pattern[i]] &= ~(1 << i);
    }
}

void bitapSearch(const string& text, const string& pattern, int maxErrors) {
    int n = text.size();
    int m = pattern.size();

    if (m > n) return;

    vector<int> patternMask(CHAR_SIZE);
    preprocessPattern(pattern, patternMask);

    vector<int> R(maxErrors + 1, ~0);
    for (int i = 0; i <= maxErrors; ++i) {
        R[i] = ~1; // All bits set except the least significant bit
    }

    for (int i = 0; i < n; ++i) {
        int oldR_jMinus1 = ~0;
        for (int j = 0; j <= maxErrors; ++j) {
            int temp = R[j];
            R[j] = ((R[j] << 1) | patternMask[text[i]]);
            if (j > 0) {
                R[j] &= (oldR_jMinus1 << 1) | (R[j - 1] << 1) | oldR_jMinus1;
            }
            oldR_jMinus1 = temp;
        }
        if ((R[maxErrors] & (1 << (m - 1))) == 0) {
            cout << "Pattern found at index " << i - m + 1 << " with " << maxErrors << " allowed errors." << endl;
        }
    }
}

int main() {
    string text = "this is a simple example";
    string pattern = "example";
    int maxErrors = 1; // Allow 1 error (insertion, deletion, or substitution)

    bitapSearch(text, pattern, maxErrors);

    return 0;
}
```

### Summary:

The Bitap algorithm is a highly efficient string matching technique that supports approximate matching, making it ideal for applications requiring fuzzy search capabilities. Its use of bitwise operations allows for fast text scanning, while its flexibility in handling errors sets it apart from other exact matching algorithms. Despite its quadratic worst-case complexity, it performs well for small patterns and a limited number of errors.