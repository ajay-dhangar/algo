---

id: apostolico-giancarlo-algo  
sidebar_position: 1  
title: Apostolico–Giancarlo Algorithm  
sidebar_label: Apostolico–Giancarlo Algorithm  

---

### Definition:

The Apostolico–Giancarlo algorithm is an advanced string matching algorithm designed for efficient searching of a pattern in a text by minimizing redundant comparisons. It utilizes the knowledge gained from previous mismatches to skip unnecessary character comparisons.

### Characteristics:

- **Efficient Skipping**:
  - This algorithm reduces the number of comparisons by reusing information about previously matched characters and skipping over sections of text that cannot possibly match the pattern.

- **Text Scanning**:
  - It processes the text in a left-to-right fashion, scanning characters and performing checks to see if the pattern matches.

- **Optimal Shifts**:
  - Apostolico–Giancarlo optimizes the pattern shifting process after mismatches by using suffix information, ensuring fewer comparisons in cases of repeated patterns.

- **Suboptimal on Small Patterns**:
  - While efficient for longer patterns, its performance may not be as significant for smaller ones compared to simpler algorithms like Knuth-Morris-Pratt (KMP).

### Time Complexity:

- **Best Case: O(n/m)**  
  In the best-case scenario, the algorithm performs optimally, making only a fraction of comparisons proportional to the length of the text divided by the length of the pattern.

- **Average Case: O(n)**  
  On average, the Apostolico–Giancarlo algorithm makes approximately linear scans through the text, resulting in efficient performance for most practical use cases.

- **Worst Case: O(n * m)**  
  In the worst case, if the pattern has repeated sections that align poorly with the text, the algorithm could degrade to quadratic time complexity, where `n` is the text length and `m` is the pattern length.

### Space Complexity:

- **Space Complexity: O(m + n)**  
  The algorithm requires additional space for storing suffix and shift tables, but the space overhead is linear with respect to both the pattern and the text size.

### C++ Implementation:

**Iterative Approach**
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

void computeSuffixArray(const string& pattern, vector<int>& suffixArray) {
    int m = pattern.length();
    suffixArray[m - 1] = m;
    for (int i = m - 2; i >= 0; --i) {
        int j = i;
        while (j >= 0 && pattern[j] == pattern[m - 1 - (i - j)]) {
            --j;
        }
        suffixArray[i] = i - j;
    }
}

void apostolicoGiancarloSearch(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();
    if (m > n) return;

    vector<int> suffixArray(m);
    computeSuffixArray(pattern, suffixArray);

    int i = 0;
    while (i <= n - m) {
        int j = m - 1;
        while (j >= 0 && pattern[j] == text[i + j]) {
            --j;
        }
        if (j < 0) {
            cout << "Pattern found at index " << i << endl;
            i += suffixArray[0]; // Shift based on the suffix array
        } else {
            i += max(1, suffixArray[j]);
        }
    }
}

int main() {
    string text = "ABAAABCDABC";
    string pattern = "ABC";
    
    apostolicoGiancarloSearch(text, pattern);

    return 0;
}
```

### Summary:

The Apostolico–Giancarlo algorithm is an advanced string matching algorithm that leverages optimal shifts and pattern reuse to efficiently find patterns within text. Though it offers significant performance advantages for large and repetitive patterns, it is not always the first choice for small or simple patterns.