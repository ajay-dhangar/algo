---

id: boyer-moore-algo  
sidebar_position: 6  
title: Boyer-Moore Algorithm  
sidebar_label: Boyer-Moore Algorithm  

---

### Definition:

The **Boyer-Moore Algorithm** is a pattern matching algorithm used to find the occurrences of a pattern string within a text. It is known for its efficiency, especially when the pattern is relatively short compared to the text. The algorithm preprocesses the pattern and uses information from the pattern to skip sections of the text, resulting in fewer comparisons.

### Characteristics:

- **Efficient Skipping**:
  - Boyer-Moore shifts the pattern more than one character if possible, leading to faster search times compared to other pattern-matching algorithms like the naive or KMP algorithms.

- **Right-to-Left Comparison**:
  - It compares characters of the pattern to the text starting from the rightmost character, allowing for potential large jumps if mismatches occur early.

- **Preprocessing for Shifts**:
  - Two pre-processing tables (Bad Character Table and Good Suffix Table) are used to determine the amount of shift required when a mismatch is found.

### Phases of the Algorithm:

1. **Bad Character Rule**:
   - If a mismatch occurs, the pattern is shifted such that the bad character in the text aligns with the last occurrence of that character in the pattern. If the character is not in the pattern, the pattern is shifted past that character.

2. **Good Suffix Rule**:
   - If a mismatch occurs after matching some suffix of the pattern, the pattern is shifted to align the next occurrence of that suffix in the text. If no such occurrence is found, the pattern is shifted to the position of the next possible matching suffix.

### Time Complexity:

- **Preprocessing Time**: $O(m + \Sigma)$, where `m` is the length of the pattern and `Σ` is the alphabet size.
- **Average Case**: $O(n/m)$, where `n` is the length of the text and `m` is the length of the pattern. This is much faster than brute-force in practice.
- **Worst Case**: $O(n \cdot m)$, although rare, in the worst case the algorithm performs no better than brute-force.

### Space Complexity:

- **Space Complexity**: $O(m + \Sigma)$ for storing the Bad Character Table and Good Suffix Table.

### Applications of Boyer-Moore Algorithm:

- **String Searching**:
  - It is primarily used in text search applications such as searching for words in a document or strings in files.

- **Intrusion Detection Systems**:
  - In cybersecurity, Boyer-Moore is used for searching patterns in network data for detecting potential threats.

- **DNA Sequence Alignment**:
  - It can be used in bioinformatics for matching DNA sequences, which can be treated as strings.

### C++ Implementation:

**Boyer-Moore Algorithm Implementation**
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

# define NO_OF_CHARS 256

// Function to generate the bad character table
void badCharHeuristic(string& pattern, int size, vector<int>& badChar) {
    for (int i = 0; i < NO_OF_CHARS; i++)
        badChar[i] = -1;
    for (int i = 0; i < size; i++)
        badChar[(int) pattern[i]] = i;
}

// Boyer-Moore search function
void boyerMooreSearch(string& text, string& pattern) {
    int m = pattern.size();
    int n = text.size();

    vector<int> badChar(NO_OF_CHARS);

    // Fill the bad character table
    badCharHeuristic(pattern, m, badChar);

    int shift = 0;
    while (shift <= (n - m)) {
        int j = m - 1;

        // Compare pattern from right to left
        while (j >= 0 && pattern[j] == text[shift + j])
            j--;

        if (j < 0) {
            cout << "Pattern found at index " << shift << endl;
            shift += (shift + m < n) ? m - badChar[text[shift + m]] : 1;
        } else {
            shift += max(1, j - badChar[text[shift + j]]);
        }
    }
}

int main() {
    string text = "ABAAABCD";
    string pattern = "ABC";
    boyerMooreSearch(text, pattern);
    return 0;
}
```


## Use Cases:

- **Searching for Substrings in Large Text**:
  - Boyer-Moore is used in scenarios where the pattern is much smaller than the text, and multiple search operations are needed.

- **Efficient Searching in Large Data**:
  - It is especially useful in text processing tasks where fast pattern matching is required, such as searching in documents, databases, or DNA sequences.

## Advantages and Disadvantages:

### Advantages:
- **Fast Matching**:
  - The Boyer-Moore algorithm skips large sections of the text, making it much faster than traditional methods like the naive string matching algorithm.
  
- **Best Case Linear Time**:
  - In the best case, the algorithm performs search operations in O(n/m) time, where `n` is the length of the text, and `m` is the length of the pattern.

- **Preprocessing Makes it Faster**:
  - Preprocessing the pattern with both the bad character and good suffix heuristics reduces unnecessary comparisons, leading to improved performance.

### Disadvantages:
- **Worst Case Complexity**:
  - In the worst-case scenario, Boyer-Moore has a time complexity of O(n * m), making it inefficient for some specific patterns and text combinations (such as repeated characters).

- **Complex Preprocessing**:
  - The preprocessing phase for both heuristics is more complex compared to simpler string matching algorithms.

## Optimizations and Applications:

- **Efficient Searching in DNA Sequences**:
  - The Boyer-Moore algorithm can be applied in bioinformatics for efficient pattern matching in DNA sequences, where long texts and patterns are often encountered.

- **Used in Text Editors and Search Utilities**:
  - It is frequently used in text editors, grep-like utilities, and other software tools where efficient substring searching is required.

## Summary:

The Boyer-Moore algorithm is a powerful and efficient string matching algorithm that uses bad character and good suffix heuristics to skip sections of text, resulting in significantly faster search times. With best-case time complexity of O(n/m), it is widely used in text processing tasks where pattern matching in large datasets is common. Despite its complex preprocessing and potential worst-case inefficiency, Boyer-Moore is still one of the most efficient algorithms for string search in practical applications.
