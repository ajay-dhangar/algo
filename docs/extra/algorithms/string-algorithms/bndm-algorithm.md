---

id: bndm-algo  
sidebar_position: 2  
title: BNDM Algorithm  
sidebar_label: BNDM Algorithm  

---

### Definition:

The BNDM (Backward Nondeterministic Dawg Matching) algorithm is an efficient string matching algorithm derived from the Backward Dawg Matching (BDM) algorithm. It uses bitwise operations to simulate a nondeterministic automaton, matching the pattern in reverse order while scanning the text.

### Characteristics:

- **Bitwise Automaton Simulation**:
  - BNDM represents the search pattern as a bitmask and simulates a nondeterministic automaton using bitwise operations. This reduces the number of character comparisons and enables efficient pattern matching.

- **Reverse Pattern Matching**:
  - The algorithm scans the pattern in reverse, comparing it against the text from right to left, which helps in faster identification of mismatches and skips.

- **Efficient for Short Patterns**:
  - BNDM is particularly efficient for short patterns, often outperforming other string matching algorithms like Boyer-Moore and Knuth-Morris-Pratt for small pattern sizes.

- **Extension of BDM**:
  - It improves upon the BDM algorithm by handling more general cases and providing better performance for non-trivial patterns.

### Time Complexity:

- **Best Case: $O\left(\frac{n}{w}\right)$**  
  In the best-case scenario, where `w` is the word size of the machine, the algorithm takes advantage of the word-level parallelism and makes few character comparisons.

- **Average Case: $O(n)$**  
  On average, BNDM performs linear scans through the text, making it highly efficient for typical use cases, especially with short patterns.

- **Worst Case: $O(n \times m)$**  
  In the worst case, when the text and pattern have poor alignment, BNDM may require multiple full scans of the text, leading to quadratic complexity, where `n` is the text length and `m` is the pattern length.

### Space Complexity:

- **Space Complexity: $O(m)$**  
  The space complexity of BNDM is linear with respect to the pattern length, as the algorithm stores bitmasks and tables based on the pattern.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

#define CHAR_SIZE 256 // Assuming extended ASCII

void preprocessPattern(const string& pattern, vector<int>& B) {
    int m = pattern.length();
    for (int i = 0; i < CHAR_SIZE; ++i) {
        B[i] = 0;
    }
    for (int i = 0; i < m; ++i) {
        B[pattern[i]] |= (1 << i);
    }
}

void BNDMSearch(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();

    if (m > n) return;

    vector<int> B(CHAR_SIZE);
    preprocessPattern(pattern, B);

    for (int i = 0; i <= n - m; ) {
        int j = m - 1;
        int mask = (1 << j);
        int D = -1; // Bit mask for the current window

        while (D && j >= 0) {
            D &= B[text[i + j]];
            if (D) {
                --j;
                D <<= 1;
            }
        }

        if (j < 0) {
            cout << "Pattern found at index " << i << endl;
        }

        // Shift the window based on the number of bits set in D
        i += (m - __builtin_ctz(D));
    }
}

int main() {
    string text = "ABCABCABCD";
    string pattern = "ABC";

    BNDMSearch(text, pattern);

    return 0;
}
```

### Summary:

The BNDM (Backward Nondeterministic Dawg Matching) algorithm is an efficient and powerful string matching technique, especially for small patterns. It leverages bitwise operations and reverse pattern matching to minimize unnecessary character comparisons, making it highly suitable for short strings and quick searches. Its linear time complexity in average cases makes it a solid choice for string matching tasks in practical applications.