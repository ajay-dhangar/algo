---
id: rabin-karp-algorithm
title: "Rabin-Karp Algorithm"
sidebar_label: "Rabin-Karp"
sidebar_position: 7
description: "A comprehensive guide to using the Rabin-Karp Algorithm for efficient pattern matching."
tags: [pattern matching, string algorithms, competitive programming]
---



# Boyer-Moore Algorithm for Pattern Matching

## Definition:

The Boyer-Moore algorithm is an efficient pattern-matching algorithm that searches for occurrences of a pattern in a text by leveraging information from the pattern itself. It achieves sublinear time complexity in many cases, making it one of the fastest string searching algorithms.

## Explanation:

The Boyer-Moore algorithm preprocesses the pattern to create two heuristic tables: the **bad character rule** and the **good suffix rule**. These tables help determine how far the search window can be moved after a mismatch, significantly reducing the number of comparisons needed.

### Bad Character Rule:

When a mismatch occurs, the bad character rule dictates that the pattern should be shifted to the right so that the last occurrence of the mismatched character in the pattern aligns with the text character, or the pattern should be shifted past the text character if the character does not exist in the pattern.

### Good Suffix Rule:

If a part of the pattern matches the text but fails at some point, the good suffix rule determines how much to shift the pattern based on the longest suffix of the pattern that matches the text.

## Code Implementation (Python):

```python
def bad_character_heuristic(pattern):
    """Creates the bad character table for the given pattern.

    Args:
        pattern: The pattern string.

    Returns:
        A dictionary mapping characters to their last occurrence index in the pattern.
    """
    bad_char = {}
    for i in range(len(pattern)):
        bad_char[pattern[i]] = i
    return bad_char

def boyer_moore_search(pattern, text):
    """Performs Boyer-Moore algorithm for pattern matching.

    Args:
        pattern: The pattern to be searched.
        text: The text in which the pattern is searched.

    Returns:
        A list of starting indices where the pattern is found in the text.
    """
    m = len(pattern)
    n = len(text)
    bad_char = bad_character_heuristic(pattern)
    result = []

    s = 0  # shift of the pattern with respect to text
    while s <= n - m:
        j = m - 1

        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        if j < 0:
            result.append(s)
            s += (m - bad_char.get(text[s + m], -1)) if s + m < n else 1
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))

    return result

# Example usage
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"


result = boyer_moore_search(pattern, text)

print("Pattern found at indices:", result)
```
