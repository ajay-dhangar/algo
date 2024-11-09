---
id: z-algorithm
title: "Z Algorithm"
sidebar_label: "Z Algorithm"
sidebar_position: 6
description: "A comprehensive guide to using the Z-Algorithm for efficient pattern matching."
tags: [pattern matching, string algorithms, competitive programming]
---

In computer science, the **Z-Algorithm** is an efficient linear-time algorithm used for pattern matching in strings. It computes an array Z for a given string S, where Z[i] contains the length of the longest substring starting from S[i] that is also a prefix of S. The Z-Algorithm is widely used in competitive programming and string matching applications.

<AdsComponent />

## Definition:

The Z-Algorithm computes an array Z for a string S such that Z[i] contains the length of the longest substring starting from S[i] that is also a prefix of S. It is an efficient method to solve pattern matching problems.

## Explanation:

Given a string S of length n, the Z-array is computed where Z[i] is the length of the longest substring starting from S[i] that matches the prefix of S. The algorithm runs in O(n) time and is used in various string matching applications.

<Ads />

## Code Implementation

```python
def calculate_z(S):
    """Calculates the Z-array for a given string S.

    Args:
        S: The input string.

    Returns:
        A list where each element i contains the length of the longest substring 
        starting from S[i] which is also a prefix of S.
    """
    Z = [0] * len(S)
    L, R, K = 0, 0, 0
    for i in range(1, len(S)):
        if i > R:
            L, R = i, i
            while R < len(S) and S[R] == S[R - L]:
                R += 1
            Z[i] = R - L
            R -= 1
        else:
            K = i - L
            if Z[K] < R - i + 1:
                Z[i] = Z[K]
            else:
                L = i
                while R < len(S) and S[R] == S[R - L]:
                    R += 1
                Z[i] = R - L
                R -= 1
    return Z
```

### Code Implementation (C++):

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> calculate_z(string S) {
    int n = S.length();
    vector<int> Z(n);
    int L = 0, R = 0, K;

    for (int i = 1; i < n; i++) {
        if (i > R) {
            L = R = i;
            while (R < n && S[R] == S[R - L])
                R++;
            Z[i] = R - L;
            R--;
        } else {
            K = i - L;
            if (Z[K] < R - i + 1) {
                Z[i] = Z[K];
            } else {
                L = i;
                while (R < n && S[R] == S[R - L])
                    R++;
                Z[i] = R - L;
                R--;
            }
        }
    }
    return Z;
}

int main() {
    string S = "aabcaabxaaaz";
    vector<int> Z = calculate_z(S);
    
    cout << "Z-array: ";
    for (int z : Z)
        cout << z << " ";
    cout << endl;
    
    return 0;
}
```

### Code Implementation (Java):

```java
import java.util.Arrays;

public class ZAlgorithm {

    public static int[] calculate_z(String S) {
        int n = S.length();
        int[] Z = new int[n];
        int L = 0, R = 0, K;

        for (int i = 1; i < n; i++) {
            if (i > R) {
                L = R = i;
                while (R < n && S.charAt(R) == S.charAt(R - L))
                    R++;
                Z[i] = R - L;
                R--;
            } else {
                K = i - L;
                if (Z[K] < R - i + 1) {
                    Z[i] = Z[K];
                } else {
                    L = i;
                    while (R < n && S.charAt(R) == S.charAt(R - L))
                        R++;
                    Z[i] = R - L;
                    R--;
                }
            }
        }
        return Z;
    }

    public static void main(String[] args) {
        String S = "aabcaabxaaaz";
        int[] Z = calculate_z(S);
        
        System.out.println("Z-array: " + Arrays.toString(Z));
    }
}
```

<AdsComponent />

## Explanation of the Code:

- **calculate_z:** This function computes the Z-array for the given string S. The Z-array holds the length of the longest substring starting from index i that matches the prefix of the string.
- The Z-values are calculated using two pointers, L and R, which define the current window where a match with the prefix exists.

### Example Usage:

For the string `S = "aabcaabxaaaz"`, the computed Z-array is `[0, 1, 0, 0, 3, 1, 0, 0, 2, 1, 0, 0]`.

## Applications in Competitive Programming

### Pattern Matching:
The Z-algorithm is used to search for occurrences of a pattern in a text by concatenating the pattern and text with a unique separator and computing the Z-array.

### String Matching:
Efficiently find all occurrences of a pattern in a string, which is useful in solving problems like finding periodicities in strings or solving DNA sequence matching.

### Prefix-Suffix Problems:
Can be used to find all prefixes of a string that are also suffixes, which is helpful in problems like finding palindromes and string periodicity.
