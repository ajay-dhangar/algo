---
id: kmp-algorithm
title: "KMP Algorithm"
sidebar_label: "KMP"
sidebar_position: 8
description: "A comprehensive guide to using the KMP Algorithm for efficient pattern matching."
tags: [pattern matching, string algorithms, competitive programming]
---

In computer science, the **KMP (Knuth-Morris-Pratt) Algorithm** is an efficient pattern-matching algorithm that searches for occurrences of a pattern in a text. It achieves linear time complexity by precomputing an auxiliary array called the LPS (Longest Prefix Suffix) array, which helps skip unnecessary comparisons during the search.

<AdsComponent />

## Definition:

The KMP (Knuth-Morris-Pratt) algorithm is an efficient pattern-matching algorithm that searches for occurrences of a pattern in a text in O(n) time, where `n` is the length of the text. It achieves this by precomputing an auxiliary array called the LPS (Longest Prefix Suffix) array, which is used to skip unnecessary comparisons during the search.

## Explanation:

Given a pattern and a text, the KMP algorithm precomputes the LPS array, which stores the length of the longest proper prefix of the pattern that is also a suffix for each position in the pattern. This allows the algorithm to avoid rechecking characters that have already been matched, resulting in efficient string searching.

### LPS Array:

The LPS array helps in determining how much the pattern should be shifted without re-evaluating characters that have already been matched. For every mismatch during the search, the LPS array tells how many characters can be skipped.

<Ads />

## Code

### Code Implementation (Python):

```python
def calculate_lps(pattern):
    """Preprocesses the pattern and computes the LPS array.

    Args:
        pattern: The pattern string.

    Returns:
        The LPS (Longest Prefix Suffix) array for the given pattern.
    """
    lps = [0] * len(pattern)
    length = 0  # length of the previous longest prefix suffix
    i = 1

    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    return lps


def kmp_search(pattern, text):
    """Performs KMP algorithm for pattern matching.

    Args:
        pattern: The pattern to be searched.
        text: The text in which the pattern is searched.

    Returns:
        A list of starting indices where the pattern is found in the text.
    """
    m = len(pattern)
    n = len(text)
    lps = calculate_lps(pattern)
    i = 0  # index for text
    j = 0  # index for pattern
    result = []

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            result.append(i - j)
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return result
```

### Code Implementation (C++):

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> calculate_lps(const string& pattern) {
    int m = pattern.length();
    vector<int> lps(m);
    int length = 0;  // length of the previous longest prefix suffix
    int i = 1;

    while (i < m) {
        if (pattern[i] == pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length != 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

vector<int> kmp_search(const string& pattern, const string& text) {
    int m = pattern.length();
    int n = text.length();
    vector<int> lps = calculate_lps(pattern);
    vector<int> result;

    int i = 0;  // index for text
    int j = 0;  // index for pattern

    while (i < n) {
        if (pattern[j] == text[i]) {
            i++;
            j++;
        }

        if (j == m) {
            result.push_back(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] != text[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    vector<int> result = kmp_search(pattern, text);

    cout << "Pattern found at indices: ";
    for (int i : result) {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
```

### Code Implementation (Java):

```java
import java.util.*;

public class KMPAlgorithm {

    public static int[] calculate_lps(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int length = 0;
        int i = 1;

        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(length)) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length != 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }

    public static List<Integer> kmp_search(String pattern, String text) {
        int m = pattern.length();
        int n = text.length();
        int[] lps = calculate_lps(pattern);
        List<Integer> result = new ArrayList<>();

        int i = 0; // index for text
        int j = 0; // index for pattern

        while (i < n) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++;
                j++;
            }

            if (j == m) {
                result.add(i - j);
                j = lps[j - 1];
            } else if (i < n && pattern.charAt(j) != text.charAt(i)) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        String text = "ABABDABACDABABCABAB";
        String pattern = "ABABCABAB";
        List<Integer> result = kmp_search(pattern, text);
        System.out.println("Pattern found at indices: " + result);
    }
}
```
### Code Implementation (JavaScript):

```javascript
function calculateLPS(pattern) {
    const m = pattern.length;
    const lps = new Array(m).fill(0); // Longest Prefix Suffix array
    let length = 0; // Length of the previous longest prefix suffix
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function kmpSearch(pattern, text) {
    const m = pattern.length;
    const n = text.length;
    const lps = calculateLPS(pattern);
    const result = [];

    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            result.push(i - j); // Pattern found at index i - j
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const result = kmpSearch(pattern, text);

console.log("Pattern found at indices:", result.join(" ")); // Output the indices
```

<AdsComponent />

## Explanation of the Code:

- **calculate_lps:** This function computes the LPS array for the given pattern. The LPS array is used to determine the next positions to compare in case of a mismatch.
- **kmp_search:** This function performs the actual KMP search by using the LPS array to skip unnecessary comparisons in the text. It outputs all starting indices where the pattern is found.

### Example Usage:

For the text `text = "ABABDABACDABABCABAB"` and pattern `pattern = "ABABCABAB"`, the output will be:
```
Pattern found at indices: [10]
```

## Applications in Competitive Programming

### Pattern Matching:
The KMP algorithm is widely used in competitive programming due to its efficiency in searching for patterns in a text, making it useful in DNA sequence analysis, data compression, and other text-search problems.

### String Matching:
KMP helps solve problems where multiple occurrences of a pattern need to be found, avoiding redundant comparisons, which makes it faster than brute-force approaches.

### Substring Search:
This algorithm is useful in word processors, search engines, and file comparison tools where efficient substring searching is critical.
