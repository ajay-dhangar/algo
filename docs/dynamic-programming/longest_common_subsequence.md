---
id: longest-common-subsequence
title: Longest Common Subsequence
sidebar_label: "Longest Common Subsequence"  
sidebar_position: 4  
description: Longest Common Subsequence (LCS) is a dynamic programming technique that finds the longest subsequence common to two strings. It’s widely used in text comparison, bioinformatics, and file differencing tools. 
tags: [DP, Longest common subsequence ]  
---
# Longest Common Subsequence (LCS)

## Introduction

The **Longest Common Subsequence (LCS)** is a fundamental problem in computer science, particularly in the field of dynamic programming. It helps in finding the longest subsequence that is common to two sequences (strings or arrays). A **subsequence** is a sequence that appears in the same relative order but not necessarily contiguously within the original sequence.

### Example

For example, consider the two strings:
- String X: `ABCBDAB`
- String Y: `BDCAB`

The longest common subsequence (LCS) between these two strings is `"BCAB"`, which has a length of 4.

## Problem Definition

Given two sequences (X and Y), the goal is to find the length of the longest subsequence that is common to both sequences.

## Dynamic Programming Approach

To solve the LCS problem, we can utilize dynamic programming by creating a 2D table where `dp[i][j]` represents the length of the LCS of the first `i` characters of string X and the first `j` characters of string Y.

### Recurrence Relation

1. If the characters of X and Y match (i.e., `X[i-1] == Y[j-1]`), then:
   $$
   dp[i][j] = dp[i-1][j-1] + 1
   $$
2. If the characters do not match, we take the maximum value from either ignoring the current character from X or Y:
   $$
   dp[i][j] = \max(dp[i-1][j], dp[i][j-1])
   $$

### Base Case

- If either string is empty, then `dp[i][0] = 0` and `dp[0][j] = 0` since there can be no common subsequence.

## Code Implementation in C++

Here’s a C++ implementation of the LCS problem:

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int lcs(string X, string Y) {
    int m = X.length();
    int n = Y.length();
    
    // Create a 2D dp table to store lengths of LCS
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    // Fill dp table in bottom-up manner
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]); // Characters do not match
            }
        }
    }

    // The length of LCS is found at dp[m][n]
    return dp[m][n];
}

int main() {
    string X = "ABCBDAB";
    string Y = "BDCAB";
    cout << "Length of LCS: " << lcs(X, Y) << endl;  // Output: 4

    // Additional test cases
    string X1 = "AGGTAB";
    string Y1 = "GXTXAYB";
    cout << "Length of LCS (AGGTAB, GXTXAYB): " << lcs(X1, Y1) << endl;  // Output: 4

    string X2 = "AA";
    string Y2 = "AB";
    cout << "Length of LCS (AA, AB): " << lcs(X2, Y2) << endl;  // Output: 1

    string X3 = "ABC";
    string Y3 = "DEF";
    cout << "Length of LCS (ABC, DEF): " << lcs(X3, Y3) << endl;  // Output: 0

    string X4 = "AAB";
    string Y4 = "AAAB";
    cout << "Length of LCS (AAB, AAAB): " << lcs(X4, Y4) << endl;  // Output: 2

    return 0;
}
```
## Explanation of the Code

1.  **Initial Setup:**
    
    -   We first determine the lengths of the input strings X and Y using `length()`.
    -   We create a 2D vector `dp` of size `(m + 1) x (n + 1)`, initializing all elements to 0.
2.  **Filling the Table:**
    
    -   We iterate through each character of both strings X and Y using nested loops.
    -   If `X[i - 1]` is equal to `Y[j - 1]`, we set `dp[i][j]` to `dp[i - 1][j - 1] + 1`, indicating that we've found a matching character.
    -   If the characters do not match, we set `dp[i][j]` to the maximum of the values from the cell above (`dp[i - 1][j]`) and the cell to the left (`dp[i][j - 1]`).
3.  **Returning the Result:**
    
    -   Once the table is completely filled, the value at `dp[m][n]` contains the length of the longest common subsequence.



## Time and Space Complexity

-   **Time Complexity:** The time complexity is $O(m \times n)$ because we fill up a table of size `(m + 1) x (n + 1)` in nested loops.
-   **Space Complexity:** The space complexity is also $O(m \times n)$ due to the 2D table used for storing intermediate results.

## Conclusion

The Longest Common Subsequence (LCS) is a key problem in dynamic programming with various applications, including file comparison and DNA sequence analysis. The approach described here utilizes a 2D table to efficiently solve the problem, allowing for easy retrieval of the LCS length.