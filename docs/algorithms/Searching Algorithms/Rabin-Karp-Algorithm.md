---

id: Rabin-Karp-algorithm 
sidebar_position: 5 
title: Rabin-Karp algorithm
sidebar_label: Rabin-Karp algorithm
---
## Definition 📖

**Rabin-Karp algorithm** is a string-searching algorithm that utilizes hashing to find a pattern within a text. This algorithm is particularly efficient for finding multiple patterns within the same text by comparing hash values, reducing the need for repeated character comparisons.

## Characteristics ✨

- **Hash-Based Search**:
  - Rabin-Karp uses a hash function to convert a pattern and substrings of the text into hash values. It compares these hash values to identify matching patterns.

- **Efficient for Multiple Patterns**:
  - Ideal for cases with multiple patterns, as it can reuse the hash calculations, making it efficient in such scenarios.

- **Rolling Hash**:
  - Uses a rolling hash technique to quickly update the hash value for the next substring, enhancing efficiency for large texts.

## Time Complexity ⏱️

- **Best Case: `O(n + m)`** 🌟
  
  When there are no hash collisions, the algorithm efficiently processes both text and pattern in linear time.

- **Average Case: `O(n + m)`** 🔄
  
  Typically performs well with a low number of hash collisions, maintaining linear time complexity.

- **Worst Case: `O(n * m)`** 💥
  
  In cases with many hash collisions, the algorithm may degrade to checking each substring individually.

## Space Complexity 💾

- **Space Complexity: `O(1)`**  
  Requires constant space for the hash values and other variables, making it memory-efficient.

## C++ Implementation 💻

Here’s a simple implementation of the Rabin-Karp algorithm in C++:

```cpp
#include <iostream>
#include <string>
using namespace std;

const int d = 256; // Number of characters in the input alphabet
const int q = 101; // A prime number for modulo operation

void rabinKarpSearch(string pattern, string text) {
    int m = pattern.length();
    int n = text.length();
    int i, j;
    int p = 0; // Hash value for pattern
    int t = 0; // Hash value for text
    int h = 1;

    // Calculate the hash value of the pattern and first window of text
    for (i = 0; i < m - 1; i++)
        h = (h * d) % q;

    for (i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }

    // Slide the pattern over text
    for (i = 0; i <= n - m; i++) {
        if (p == t) { // Check for hash match
            for (j = 0; j < m; j++) {
                if (text[i + j] != pattern[j])
                    break;
            }
            if (j == m)
                cout << "Pattern found at index " << i << endl;
        }
        
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;
            if (t < 0)
                t += q;
        }
    }
}

int main() {
    string text = "ABCCDABCDABCD";
    string pattern = "ABCD";
    rabinKarpSearch(pattern, text);
    return 0;
}
```
## Applications of Rabin-Karp Algorithm 🌐
**Text Search Engines:**
  - Widely used in text search applications where multiple patterns need to be matched, as it can efficiently handle repeated hash calculations.
    
**Plagiarism Detection:**
  - Helps in detecting plagiarism by checking for large sections of identical or similar text within documents.
    
**DNA Sequence Analysis:**
  - Useful for matching specific gene sequences by searching for patterns in large DNA strands.

## Advantages and Disadvantages
**Advantages:** ✅

  - **Efficient for Multiple Patterns:**
    
      Offers efficient handling of multiple patterns in a single pass.
    
  - **Low Memory Requirement:**
    
      Uses constant memory, as it doesn’t require additional space for each character.
    
**Disadvantages:** ⚠️

  - **Hash Collisions:**
    
      Performance can degrade in the presence of hash collisions, especially in repetitive or similar text.

 - **Not Ideal for Small Texts:**
  
      Other algorithms may be more efficient for shorter texts where the hash calculation overhead is less advantageous.

## Summary 📚

The Rabin-Karp algorithm is an efficient, hash-based approach for pattern searching, especially suitable for finding multiple patterns in a large body of text.
It balances memory efficiency and speed in scenarios with minimal hash collisions, making it a preferred choice in applications like text searching and DNA analysis.
