---
id: z-algorithm
title: Z-Algorithm
sidebar_label: Z-Algorithm
sidebar_position: 1
description: A linear time string matching algorithm that finds all occurrences of a pattern in a text.
tags: [string, algorithm, pattern-matching, advanced]
---

# Z-Algorithm

The Z-Algorithm finds all occurrences of a pattern in a text in linear time $O(N + M)$, where $N$ is the length of the text and $M$ is the length of the pattern.

## Intuition
The algorithm constructs a **Z-array** where $Z[i]$ is the length of the longest substring starting from $S[i]$ which is also a prefix of $S$. 
To find a pattern $P$ in a text $T$, we create a new string $S = P + \text{"\$"} + T$. If $Z[i]$ equals the length of $P$, we found a match!

## Implementation

### Python
```python
def get_z_array(s):
    n = len(s)
    z = [0] * n
    l, r, k = 0, 0, 0
    for i in range(1, n):
        if i > r:
            l, r = i, i
            while r < n and s[r - l] == s[r]:
                r += 1
            z[i] = r - l
            r -= 1
        else:
            k = i - l
            if z[k] < r - i + 1:
                z[i] = z[k]
            else:
                l = i
                while r < n and s[r - l] == s[r]:
                    r += 1
                z[i] = r - l
                r -= 1
    return z

def z_algorithm(text, pattern):
    # Note: The delimiter '$' is assumed to not appear in either text or pattern.
    concat = pattern + "$" + text
    l = len(concat)
    z = get_z_array(concat)
    res = []
    # Start searching after pattern and delimiter to avoid redundant iterations
    for i in range(len(pattern) + 1, l):
        if z[i] == len(pattern):
            res.append(i - len(pattern) - 1)
    return res
```

## Complexity Analysis
- **Time Complexity:** $O(N + M)$ where $N$ is text length and $M$ is pattern length.
- **Space Complexity:** $O(N + M)$ for the concatenated string and Z-array.

