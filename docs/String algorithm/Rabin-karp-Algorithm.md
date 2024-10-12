---
id: Rabin-karp-Algorithm
title: "Rabin-Karp Algorithm"
sidebar_label: "Rabin-Karp"
sidebar_position: 7
description: "A comprehensive guide to using the Rabin-Karp Algorithm for efficient pattern matching."
tags: [pattern matching, string algorithms, competitive programming]
---

# Rabin-Karp Algorithm for Pattern Matching

## Definition:

The Rabin-Karp Algorithm is a string-searching algorithm that uses hashing to find an exact match of a pattern in a text. By comparing hash values of the pattern with the hash values of substrings of the text, it achieves an average time complexity of O(n + m), where `n` is the length of the text and `m` is the length of the pattern.

## Explanation:

The algorithm works by computing a hash value for the pattern and each substring of the text of the same length. If the hash values match, the substring and the pattern are compared character by character to confirm the match. This approach works efficiently in practice, especially when using a rolling hash to update the hash value of the substring in constant time.

## Code

### Code Implementation (Python):

```python
def rabin_karp(pattern, text, q):
    """Rabin-Karp algorithm for pattern matching.

    Args:
        pattern: The pattern string to search for.
        text: The text string where the pattern is to be searched.
        q: A prime number for modulo operation in hashing.

    Returns:
        A list of starting indices where the pattern is found in the text.
    """
    d = 256  # Number of characters in the input alphabet
    m = len(pattern)
    n = len(text)
    p = 0  # Hash value for the pattern
    t = 0  # Hash value for the text
    h = 1
    result = []

    # The value of h would be "pow(d, m-1)%q"
    for i in range(m-1):
        h = (h * d) % q

    # Calculate the hash value of the pattern and the first window of the text
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q

    # Slide the pattern over text one by one
    for i in range(n - m + 1):
        # Check the hash values of the current window of text and the pattern
        if p == t:
            # If the hash values match, then check characters one by one
            if text[i:i+m] == pattern:
                result.append(i)

        # Calculate hash value for the next window of text
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q

            # We might get a negative value of t, converting it to positive
            if t < 0:
                t += q

    return result
```

### Code Implementation (C++):

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

#define d 256

vector<int> rabin_karp(string pattern, string text, int q) {
    int m = pattern.length();
    int n = text.length();
    int p = 0; // Hash value for the pattern
    int t = 0; // Hash value for the text
    int h = 1;
    vector<int> result;

    // The value of h would be pow(d, m-1) % q
    for (int i = 0; i < m - 1; i++)
        h = (h * d) % q;

    // Calculate the hash value of the pattern and the first window of the text
    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }

    // Slide the pattern over text one by one
    for (int i = 0; i <= n - m; i++) {
        // Check the hash values of the current window of text and pattern
        if (p == t) {
            // If the hash values match, check for characters one by one
            bool flag = true;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag)
                result.push_back(i);
        }

        // Calculate hash value for the next window of text
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;

            // We might get a negative value of t, converting it to positive
            if (t < 0)
                t = t + q;
        }
    }

    return result;
}

int main() {
    string text = "ABCCDABCDABCD";
    string pattern = "ABCD";
    int q = 101; // A prime number

    vector<int> result = rabin_karp(pattern, text, q);
    
    cout << "Pattern found at indices: ";
    for (int i : result)
        cout << i << " ";
    cout << endl;
    
    return 0;
}
```

### Code Implementation (Java):

```java
import java.util.*;

public class RabinKarp {

    public static List<Integer> rabin_karp(String pattern, String text, int q) {
        int d = 256;
        int m = pattern.length();
        int n = text.length();
        int p = 0; // Hash value for the pattern
        int t = 0; // Hash value for the text
        int h = 1;
        List<Integer> result = new ArrayList<>();

        // The value of h would be "pow(d, m-1) % q"
        for (int i = 0; i < m - 1; i++) {
            h = (h * d) % q;
        }

        // Calculate the hash value of the pattern and first window of the text
        for (int i = 0; i < m; i++) {
            p = (d * p + pattern.charAt(i)) % q;
            t = (d * t + text.charAt(i)) % q;
        }

        // Slide the pattern over text one by one
        for (int i = 0; i <= n - m; i++) {
            // Check the hash values of current window of text and pattern
            if (p == t) {
                // If hash values match, check characters one by one
                if (text.substring(i, i + m).equals(pattern)) {
                    result.add(i);
                }
            }

            // Calculate hash value for the next window of text
            if (i < n - m) {
                t = (d * (t - text.charAt(i) * h) + text.charAt(i + m)) % q;

                // We might get negative value of t, converting it to positive
                if (t < 0) {
                    t = (t + q);
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        String text = "ABCCDABCDABCD";
        String pattern = "ABCD";
        int q = 101; // A prime number

        List<Integer> result = rabin_karp(pattern, text, q);
        System.out.println("Pattern found at indices: " + result);
    }
}
```

## Explanation of the Code:

- **rabin_karp:** This function implements the Rabin-Karp algorithm, where it computes the hash values for the pattern and substrings of the text.
- The rolling hash technique is used to efficiently update the hash values in constant time while sliding the pattern over the text.
- If the hash values match, a character-by-character comparison is done to confirm the match.

### Example Usage:

For the text `text = "ABCCDABCDABCD"` and pattern `pattern = "ABCD"`, the output will be:
```
Pattern found at indices: [6, 10]
```

## Applications in Competitive Programming

### Pattern Matching:
The Rabin-Karp algorithm is efficient for finding multiple occurrences of a pattern in a text, making it suitable for DNA sequence matching, plagiarism detection, and large-scale text search.

### Rolling Hash:
The rolling hash function allows efficient recomputation of hash values, making this algorithm practical even for long texts and patterns.

### Substring Search:
It is widely used for finding substrings within large text data, especially in applications like word processors, search engines, and databases.
```
