---
id: rabin-karp-algorithm
title: "Rabin-Karp Algorithm"
sidebar_label: "Rabin-Karp"
sidebar_position: 7
description: "A comprehensive guide to using the Rabin-Karp Algorithm for efficient pattern matching."
tags: [pattern matching, string algorithms, competitive programming]
---

Robins-Karp Algorithm is a string-searching algorithm that uses hashing to find an exact match of a pattern in a text. By comparing hash values of the pattern with the hash values of substrings of the text, it achieves an average time complexity of O(n + m), where `n` is the length of the text and `m` is the length of the pattern.

<AdsComponent />

## Explanation:

The algorithm works by computing a hash value for the pattern and each substring of the text of the same length. If the hash values match, the substring and the pattern are compared character by character to confirm the match. This approach works efficiently in practice, especially when using a rolling hash to update the hash value of the substring in constant time.

## Code Implementation:


<Tabs>
    <TabItem value="Python" lang="python">
    ```python
    def rabin_karp(text: str, pattern: str) -> list:
        def hash_string(s: str) -> int:
            return sum(ord(s[i]) * 101 ** i for i in range(len(s)))

        n, m = len(text), len(pattern)
        pattern_hash = hash_string(pattern)
        text_hash = hash_string(text[:m])
        indices = []

        for i in range(n - m + 1):
            if pattern_hash == text_hash and text[i:i + m] == pattern:
                indices.append(i)
            if i < n - m:
                text_hash = (text_hash - ord(text[i]) * 101 ** (m - 1)) * 101 + ord(text[i + m])

        return indices

    # Example Usage
    text = "ABCCDABCDABCD"
    pattern = "ABCD"
    print("Pattern found at indices:", rabin_karp(text, pattern))
    ```
    </TabItem>

    <TabItem value="C++" lang="cpp">
    ```cpp
    #include <iostream>
    #include <string>
    #include <vector>

    std::vector<int> rabin_karp(const std::string& text, const std::string& pattern) {
        auto hash_string = [](const std::string& s) -> int {
            int hash = 0;
            for (size_t i = 0; i < s.size(); ++i) {
                hash += s[i] * 101 * i;
            }
            return hash;
        };

        int n = text.size(), m = pattern.size();
        int pattern_hash = hash_string(pattern);
        int text_hash = hash_string(text.substr(0, m));
        std::vector<int> indices;

        for (int i = 0; i <= n - m; ++i) {
            if (pattern_hash == text_hash && text.substr(i, m) == pattern) {
                indices.push_back(i);
            }
            if (i < n - m) {
                text_hash = (text_hash - text[i] * 101 * (m - 1)) * 101 + text[i + m];
            }
        }

        return indices;
    }

    // Example Usage
    int main() {
        std::string text = "ABCCDABCDABCD";
        std::string pattern = "ABCD";
        std::vector<int> indices = rabin_karp(text, pattern);
        std::cout << "Pattern found at indices: ";
        for (int idx : indices) {
            std::cout << idx << " ";
        }
        return 0;
    }
    ```

    </TabItem>

</Tabs>

<Ads />

## Explanation of the Code:

- **rabin_karp:** This function implements the Rabin-Karp algorithm, where it computes the hash values for the pattern and substrings of the text.
- The rolling hash technique is used to efficiently update the hash values in constant time while sliding the pattern over the text.
- If the hash values match, a character-by-character comparison is done to confirm the match.

### Example Usage:

For the text `text = "ABCCDABCDABCD"` and pattern `pattern = "ABCD"`, the output will be:
```
Pattern found at indices: [6, 10]
```

<AdsComponent />

## Applications in Competitive Programming

### Pattern Matching:
The Rabin-Karp algorithm is efficient for finding multiple occurrences of a pattern in a text, making it suitable for DNA sequence matching, plagiarism detection, and large-scale text search.

### Rolling Hash:
The rolling hash function allows efficient recomputation of hash values, making this algorithm practical even for long texts and patterns.

### Substring Search:
It is widely used for finding substrings within large text data, especially in applications like word processors, search engines, and databases.

<Ads />

## Advantages

- **Linear Time Complexity:** The algorithm has an average-case time complexity of O(n + m), where `n` is the length of the text and `m` is the length of the pattern.
- **Multiple Pattern Search:** It can search for multiple patterns in a single pass through the text.
- **Rolling Hash:** The rolling hash technique allows for efficient updates of hash values in constant time.
- **Space Efficiency:** The algorithm uses a constant amount of space for storing hash values and indices.
- **Simple Implementation:** The algorithm is relatively easy to implement and understand.
- **Robustness:** It can handle large datasets and multiple queries efficiently.
- **Practicality:** Suitable for real-world applications like text search, DNA sequence analysis, and plagiarism detection.
- **Scalability:** Works well with large texts and patterns due to its linear time complexity.

## Conclusion

The Rabin-Karp Algorithm is a powerful tool for pattern matching in strings, offering a balance between time complexity and practicality. By leveraging hashing and the rolling hash technique, it efficiently finds occurrences of a pattern in a text, making it a valuable algorithm in competitive programming and real-world applications.
