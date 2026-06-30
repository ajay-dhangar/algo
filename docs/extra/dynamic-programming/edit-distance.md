---
id: edit-distance
title: Edit Distance (Wagner-Fischer Algorithm)
sidebar_label: Edit Distance
sidebar_position: 19
description: Find the minimum number of single-character edit operations (insert, delete, replace) required to transform one string into another using dynamic programming.
tags: [dynamic-programming, dp, strings, algorithms, interview]
---

# Edit Distance

## Introduction

**Edit Distance** (also known as Levenshtein Distance) measures how different two strings are by counting the minimum number of single-character operations needed to transform one string into the other.

The three allowed operations are:
- **Insert** a character
- **Delete** a character
- **Replace** a character

## Video Explanation

<LiteYouTubeEmbed
  id="7gMLNiEz3nw"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="L-4.5: Deadlock Avoidance Banker's Algorithm with Example |With English Subtutles"
  poster="maxresdefault"
  lazyLoad={true}
  webp
/>

### Example

Transform `"horse"` → `"ros"`:
1. Replace `h` with `r` → `rorse`
2. Delete `r` → `rose`
3. Delete `e` → `ros`

Minimum operations: **3**

## Problem Definition

Given two strings `word1` and `word2`, return the minimum number of operations to convert `word1` to `word2`.

## Dynamic Programming Approach

Define `dp[i][j]` as the minimum edit distance between the first `i` characters of `word1` and the first `j` characters of `word2`.

### Recurrence Relation

$$
dp[i][j] = \begin{cases}
dp[i-1][j-1] & \text{if } word1[i-1] = word2[j-1] \\
1 + \min(dp[i-1][j],\; dp[i][j-1],\; dp[i-1][j-1]) & \text{otherwise}
\end{cases}
$$

The three terms inside `min` correspond to:
- `dp[i-1][j]` → delete from `word1`
- `dp[i][j-1]` → insert into `word1`
- `dp[i-1][j-1]` → replace in `word1`

### Base Cases

- `dp[i][0] = i` — delete all `i` characters of `word1`
- `dp[0][j] = j` — insert all `j` characters of `word2`

### Visualization

For `word1 = "horse"`, `word2 = "ros"`:

```
    ""  r  o  s
""   0  1  2  3
h    1  1  2  3
o    2  2  1  2
r    3  2  2  2
s    4  3  3  2
e    5  4  4  3
```

Answer: `dp[5][3] = 3`

## Complexity

| | Complexity |
|---|---|
| Time | $O(m \times n)$ |
| Space | $O(m \times n)$, reducible to $O(\min(m, n))$ |

where `m` and `n` are the lengths of `word1` and `word2`.

## Implementations

### Python

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

    return dp[m][n]

print(minDistance("horse", "ros"))   # Output: 3
print(minDistance("intention", "execution"))  # Output: 5
```

#### Space-Optimized Version (O(n) space)

```python
def minDistance_optimized(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    prev = list(range(n + 1))

    for i in range(1, m + 1):
        curr = [i] + [0] * n
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])
        prev = curr

    return prev[n]
```

### C++

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        }
    }

    return dp[m][n];
}

int main() {
    cout << minDistance("horse", "ros") << endl;       // Output: 3
    cout << minDistance("intention", "execution") << endl; // Output: 5
    return 0;
}
```

### Java

```java
public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                                   Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }

        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros"));       // Output: 3
        System.out.println(minDistance("intention", "execution")); // Output: 5
    }
}
```

### Pseudocode

```
function editDistance(word1, word2):
    m, n = length(word1), length(word2)
    dp[0..m][0..n] = 0

    for i = 0 to m: dp[i][0] = i   // delete all chars from word1
    for j = 0 to n: dp[0][j] = j   // insert all chars of word2

    for i = 1 to m:
        for j = 1 to n:
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]            // no operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],     // delete from word1
                    dp[i][j-1],     // insert into word1
                    dp[i-1][j-1]    // replace
                )

    return dp[m][n]
```

## Applications

- **Spell checking** — suggest corrections for misspelled words
- **DNA sequence alignment** — compare genetic sequences
- **Diff tools** — compute differences between file versions
- **Plagiarism detection** — measure similarity between documents
- **Natural language processing** — fuzzy string matching
