---
id: naive-string-matching
title: Naive String Matching Algorithm
sidebar_label: Naive String Matching
tags: [String Matching, Naive Approach, Algorithms, DSA]
description: Simple method to find all occurrences of a pattern within a text by comparing each character.
---

# Naive String Matching Algorithm

## Description

The **Naive String Matching Algorithm** is a straightforward method for finding all occurrences of a pattern (substring) within a given text (string). This algorithm works by checking for the presence of the pattern at each possible position in the text. It does this by comparing characters one by one, making it easy to understand and implement, but it is not the most efficient approach for larger datasets.

### Problem Definition

- **Input**:
  - A string `txt` of length `n`.
  - A pattern `pat` of length `m`.
  
- **Output**:
  - The starting indices of all occurrences of `pat` in `txt`.

### Algorithm Overview

1. **Initialization**: Start from the first character of the text.
2. **Outer Loop**: For each position in the text (from `0` to `n - m`), check if the pattern matches the substring of the text starting at that position.
3. **Inner Loop**: For each character in the pattern, compare it with the corresponding character in the text:
   - If a mismatch occurs, break out of the inner loop and move to the next starting position in the text.
   - If all characters match, record the starting index of the match.
4. **Continue Searching**: Repeat the process for the next starting position in the text.
5. **Termination**: Continue until the end of the text is reached.

### Time Complexity

- The worst-case time complexity is `O(n * m)`, where `n` is the length of the text and `m` is the length of the pattern. This can occur when every character of the text needs to be compared with every character of the pattern (e.g., when the text and pattern are similar).

### Space Complexity

- The space complexity is `O(1)` since the algorithm uses a constant amount of space regardless of the input size.

### C++ Implementation

```cpp
#include <iostream>
#include <string>

using namespace std;

void naiveStringMatch(const string& txt, const string& pat) {
    int n = txt.length();
    int m = pat.length();

    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
            if (txt[i + j] != pat[j])
                break;
        }
        if (j == m) {
            cout << "Pattern found at index " << i << endl;
        }
    }
}

int main() {
    string txt = "AABAACAADAABAAABAA";
    string pat = "AABA";
    naiveStringMatch(txt, pat);
    return 0;
}
```