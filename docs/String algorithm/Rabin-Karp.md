---
id: rabin-karp-algorithm
title: "Rabin-Karp Algorithm"
sidebar_label: "Rabin-Karp"
sidebar_position: 7
description: "An efficient pattern matching algorithm using hashing and the rolling hash technique."
tags: [pattern matching, string algorithms, Rabin-Karp, rolling hash, competitive programming]
---

# Rabin-Karp Algorithm

## Overview

The **Rabin-Karp Algorithm** is a string searching algorithm that uses hashing to find a pattern in a text. By calculating and comparing hash values of the pattern and substrings of the text, it improves the efficiency of pattern matching, especially when dealing with multiple patterns or long texts.

### Time Complexity:
- **Average Case:** O(n + m)  
- **Worst Case:** O(n * m)  
Where:
- `n` is the length of the text.
- `m` is the length of the pattern.

## How It Works

1. Compute the hash value for the pattern and the first substring of the text.
2. Slide the pattern over the text one character at a time, updating the hash value of the current substring (using a rolling hash technique).
3. If the hash values of the pattern and the substring match, verify by checking the characters.
4. Repeat this process until all possible positions in the text are checked.

## Example

For the text `text = "ABCCDABCDABCD"` and pattern `pattern = "ABCD"`, the algorithm computes the hash value of the pattern and slides it over the text, comparing hash values at each step. Matches are found at indices 6 and 10.

## Code Implementation

### Python

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
    for i in range(m - 1):
        h = (h * d) % q

    # Calculate the hash value of the pattern and the first window of the text
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q

    # Slide the pattern over text one by one
    for i in range(n - m + 1):
        # Check the hash values of the current window of text and the pattern
        if p == t:
            # If the hash values match, check characters one by one
            if text[i:i+m] == pattern:
                result.append(i)

        # Calculate hash value for the next window of text
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q

            # We might get a negative value of t, converting it to positive
            if t < 0:
                t += q

    return result

# Example usage
text = "ABCCDABCDABCD"
pattern = "ABCD"
matches = rabin_karp(pattern, text, 101)  # 101 is a prime number used for hashing
print("Pattern found at indices:", matches)
```

### C++

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

## Advantages

- **Efficiency with Multiple Patterns:** When searching for multiple patterns in the same text, Rabin-Karp performs well, as the hash values can be reused.
- **Rolling Hash:** Allows for efficient recalculation of hash values, reducing the number of comparisons.

## Limitations

- **Hash Collisions:** In rare cases, different substrings may produce the same hash value (a collision). When this happens, character-by-character comparison is needed to confirm a match.
- **Worst-Case Performance:** If collisions happen frequently, the algorithm’s performance can degrade to O(n * m), similar to the naive search.

## Applications

- **Plagiarism Detection:** Comparing documents for overlapping sequences of text.
- **Pattern Matching in Computational Biology:** Finding DNA sequences within long strands of genetic material.
- **Text Processing:** Useful in applications like searching in large-scale documents or detecting substrings.

## Conclusion

The **Rabin-Karp Algorithm** is a powerful and efficient string searching algorithm, particularly suited for applications requiring multiple pattern searches. While hash collisions can degrade its performance in the worst case, the rolling hash technique makes it much faster on average.
```

---

