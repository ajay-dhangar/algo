---
id: rabin-karp-algorithm
title: "Rabin-Karp Algorithm for Pattern Searching"
sidebar_label: "Rabin-Karp Algorithm"
sidebar_position: 1
description: "Detailed explanation and implementation of the Rabin-Karp algorithm for pattern searching in strings."
tags: [Algorithm, Rabin-Karp, Pattern Matching, String Searching]
---

# Rabin-Karp Algorithm
## Overview
The Rabin-Karp algorithm is a string-searching algorithm that uses hashing to find patterns in text efficiently. It is especially useful for locating multiple occurrences of a pattern within a text and performs well in average cases, though it can degrade in performance if there are hash collisions.

The algorithm's main advantage is its use of a **rolling hash function**, which allows it to re-compute hash values efficiently as it slides over the text.

## Use Cases
- **Plagiarism Detection**: Identifies similar or identical sequences within a document.
- **DNA Sequence Matching**: Finds specific nucleotide patterns within larger DNA sequences.
- **Spam Detection**: Helps locate keywords or patterns within large datasets for filtering purposes.

## Algorithm Details
### Key Concepts
1. **Hashing**: The pattern and text windows are hashed to enable quick comparison.
2. **Rolling Hash**: A technique to compute hash values in constant time by reusing previous hash values as the window slides across the text.
3. **Collision Handling**: To address hash collisions, the algorithm performs an additional string comparison when hashes match.

### Algorithm Complexity
- **Average Time Complexity**: \(O(n + m)\), where \(n\) is the length of the text and \(m\) is the length of the pattern.
- **Worst-Case Complexity**: \(O(n \times m)\) in cases of frequent hash collisions.

## Example Pseudocode
### Rabin-Karp Pattern Search

```cpp
// Given a text T and pattern P, this function finds all occurrences of P in T.

function rabinKarp(text, pattern, prime):
    n = length(text)
    m = length(pattern)
    hashPattern = computeHash(pattern, prime)
    hashText = computeHash(text.substring(0, m), prime)
    
    for i from 0 to n - m:
        if hashPattern == hashText:
            if text.substring(i, i + m) == pattern:
                print("Pattern found at index", i)
        
        if i < n - m:
            hashText = recomputeHash(text, i, m, hashText, prime)

function computeHash(str, prime):
    hashValue = 0
    for each character in str:
        hashValue = (hashValue * 256 + ASCII(character)) % prime
    return hashValue
```

## Code Example in C++: Rabin-Karp Algorithm
```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int d = 256;  // Number of characters in the input alphabet

void rabinKarpSearch(string text, string pattern, int prime) {
    int m = pattern.length();
    int n = text.length();
    int p = 0;  // Hash value for pattern
    int t = 0;  // Hash value for text
    int h = 1;

    // Calculate the value of h (d^(m-1)) % prime
    for (int i = 0; i < m - 1; i++)
        h = (h * d) % prime;

    // Calculate the hash value of pattern and first window of text
    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % prime;
        t = (d * t + text[i]) % prime;
    }

    // Slide the pattern over text one character at a time
    for (int i = 0; i <= n - m; i++) {
        // Check the hash values of current window of text and pattern
        if (p == t) {
            // If the hash values match, check the actual characters
            bool match = true;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match)
                cout << "Pattern found at index " << i << endl;
        }

        // Calculate hash value for the next window of text
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % prime;
            if (t < 0)
                t = (t + prime);
        }
    }
}

int main() {
    string text = "GEEKS FOR GEEKS";
    string pattern = "GEEK";
    int prime = 101;  // A prime number
    rabinKarpSearch(text, pattern, prime);
    return 0;
}
```

## Explanation of the Code
- Hash Initialization: Calculates initial hash values for both the pattern and the first window of text.
- Hash Comparison: If the hash values match, the algorithm checks the actual text to confirm a match.
- Hash Update: Uses a rolling hash to efficiently update the hash value as it slides through the text, maintaining constant time complexity for each shift.

## Example Walkthrough
Consider the text "GEEKS FOR GEEKS" and the pattern "GEEK". The algorithm computes the initial hash for "GEEK" and matches it against the rolling hash of each substring in the text, sliding character-by-character to check each window.

## Real-World Example
The Rabin-Karp algorithm is widely used in applications requiring fast, efficient pattern matching. Examples include searching for specific words or sequences in large documents or databases, identifying duplicate code snippets, and finding malicious patterns within network packets.

By adding the Rabin-Karp algorithm, we enhance the Algo repository with a fast and robust solution for text searching, useful in both educational contexts and practical applications like data processing and network security.
