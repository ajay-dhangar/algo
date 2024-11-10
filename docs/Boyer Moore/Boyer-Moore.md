---
id: boyer-moore
title: "Boyer-Moore String Matching Algorithm"
sidebar_label: "Boyer-Moore Algorithm"
sidebar_position: 1
description: "Efficient pattern matching with the Boyer-Moore algorithm, using advanced heuristics for optimal performance."
tags: [Algorithm, Boyer-Moore, Pattern Matching, String Searching]
---

# Boyer-Moore Algorithm
## Overview
The Boyer-Moore algorithm is one of the most efficient string-searching algorithms, especially when the pattern is significantly shorter than the text. It leverages two key heuristics — the **Bad Character** and **Good Suffix** rules — to skip sections of the text, making it faster than other naive search methods, especially on large datasets.

## Use Cases
- **Text Processing and Search Engines**: Fast search within large texts, files, or logs.
- **DNA and Protein Sequence Matching**: Effective for finding specific genetic patterns in bioinformatics.
- **Intrusion Detection**: Detects specific malicious patterns in network data.

## Algorithm Details
### Key Concepts
1. **Bad Character Heuristic**: If a character in the text doesn’t match the pattern, the algorithm shifts the pattern to align the last occurrence of that character in the pattern with the mismatch.
2. **Good Suffix Heuristic**: If a substring at the end of the pattern matches but the mismatch is earlier, shift the pattern so that the matched substring aligns with the next possible match in the pattern.
3. **Optimal Skipping**: These heuristics enable large skips, making the Boyer-Moore algorithm efficient for longer texts.

### Algorithm Complexity
- **Best Case**: \(O(n/m)\), where \(n\) is the length of the text and \(m\) is the length of the pattern.
- **Worst Case**: \(O(n \times m)\), though this occurs rarely due to effective skipping.

## Example Pseudocode
### Boyer-Moore Pattern Search

```cpp
function boyerMooreSearch(text, pattern):
    preprocess pattern to create badCharTable and goodSuffixTable
    shift = 0

    while shift <= (length(text) - length(pattern)):
        j = length(pattern) - 1

        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1

        if j < 0:
            print("Pattern found at index", shift)
            shift += goodSuffixTable[0]
        else:
            shift += max(goodSuffixTable[j], j - badCharTable[text[shift + j]])
```

## Code Example in C++: Boyer-Moore Algorithm

```Cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

#define NO_OF_CHARS 256

// Preprocesses the pattern to create the bad character table
void badCharHeuristic(string &pattern, vector<int> &badCharTable) {
    int m = pattern.length();
    fill(badCharTable.begin(), badCharTable.end(), -1);

    for (int i = 0; i < m; i++)
        badCharTable[(int) pattern[i]] = i;
}

// Searches for occurrences of pattern in text using Boyer-Moore
void boyerMooreSearch(string &text, string &pattern) {
    int n = text.length();
    int m = pattern.length();
    vector<int> badCharTable(NO_OF_CHARS, -1);

    // Fill the bad character table by preprocessing the pattern
    badCharHeuristic(pattern, badCharTable);

    int shift = 0;  // Shift of the pattern with respect to text
    while (shift <= (n - m)) {
        int j = m - 1;

        // Decrement j while characters match between pattern and text
        while (j >= 0 && pattern[j] == text[shift + j])
            j--;

        // If pattern is present at current shift
        if (j < 0) {
            cout << "Pattern found at index " << shift << endl;

            // Shift the pattern to align the next character in text
            shift += (shift + m < n) ? m - badCharTable[text[shift + m]] : 1;
        } else {
            // Shift pattern so that bad character in text aligns with its last occurrence in pattern
            shift += max(1, j - badCharTable[text[shift + j]]);
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

## Explanation of the Code
- Bad Character Table: Preprocessing creates a table that tells the algorithm how far to shift the pattern when a mismatch occurs.
- Pattern Shifting: For each mismatch, the algorithm calculates the maximum shift based on the bad character table and moves the pattern forward, skipping unnecessary comparisons.
- Pattern Found: If a match is found, the algorithm shifts the pattern to check for further occurrences.

## Example Walkthrough
For the text "ABAAABCD" and the pattern "ABC", the Boyer-Moore algorithm precomputes where each character appears in the pattern and skips irrelevant sections of the text. When the pattern is matched or mismatched, it shifts intelligently based on the bad character table.

## Real-World Example
The Boyer-Moore algorithm is widely used in search engines, file comparison tools, and DNA sequence analysis due to its efficiency with longer texts and multiple searches. Its ability to skip sections of text makes it ideal for scenarios where speed is essential, such as in cybersecurity for real-time data scanning.

By adding the Boyer-Moore algorithm, we enhance the Algo repository with a highly efficient, widely applicable pattern-searching tool. This algorithm is especially useful for developers and researchers working with large text processing tasks.
