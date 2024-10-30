---
id: Regular Expression Matching
title: Regular Expression Matching
sidebar_label: Regular Expression Matching  
description: " to implement regular expression matching with support for '.' and '*'."
tags: [java,dsa, algorithms,Problem solving,Strings,hard]
---

# Game Theory

**Regular Expression Matching** 
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

- '.' Matches any single character.​​​​
- '*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Note that the same word in the dictionary may be reused multiple times in the segmentation.
- Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

- Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

## Apporach
#### 1.Initialize DP Table:
    Create a DP table mat with dimensions (len(s) + 1) x (len(p) + 1) initialized to False.
mat[i][j] will be True if the first i characters in s can match the first j characters in p.

#### 2.Base Case:

    mat[0][0] is True because an empty string matches an empty pattern.

#### 3.Pattern Initialization:

    Handle cases where the pattern p contains * that can match zero preceding elements.
    Update mat[0][i] to True if the pattern up to i can match an empty string.

#### 4.Fill DP Table:

    Iterate through each character in s and p.
    For each pair (i, j), update the DP table based on the characters in s and p:
    If p[j-1] is . or matches s[i-1], mat[i][j] is set to mat[i-1][j-1].
    If p[j-1] is *, it can match zero or more of the preceding element:
    Check if * matches zero elements: mat[i][j] = mat[i][j-2].
    Check if * matches one or more elements: mat[i][j] is updated to mat[i][j] or mat[i-1][j] if the preceding element matches s[i-1].

#### 5.Return Result:

    The result is mat[len(s)][len(p)], indicating whether the entire string s matches the pattern p.
  
# Complexity:

## Time complexity:
The time complexity is O(n×m) where n is the length of the string s and m is the length of the pattern p. This is because we fill in an (n+1) x (m+1) DP table.

## Space complexity:
The space complexity is O(n×m) for the DP table used to store match results.
## java Implementation 

```java

class Solution {
    public boolean isMatch(String s, String p) {
        boolean[][] mat = new boolean[s.length() + 1][p.length() + 1];

        mat[0][0] = true;

        for (int i = 1; i < mat[0].length; i++) {
            if (p.charAt(i - 1) == '*') mat[0][i] = mat[0][i - 2];
        }

        for (int i = 1; i < mat.length; i++) {
            for (int j = 1; j < mat[0].length; j++) {
                if (p.charAt(j - 1) == '.' || p.charAt(j - 1) == s.charAt(i - 1)) {
                    mat[i][j] = mat[i - 1][j - 1];
                } else if (p.charAt(j - 1) == '*') {
                    mat[i][j] = mat[i][j - 2];
                    if (p.charAt(j - 2) == '.' || p.charAt(j - 2) == s.charAt(i - 1)) {
                        mat[i][j] = mat[i][j] | mat[i - 1][j];
                    }
                } else {
                    mat[i][j] = false;
                }
            }
        }

        return mat[s.length()][p.length()];
    }
}

```



## Conclusion 
- The provided Java implementation effectively solves the regular expression matching problem using dynamic programming. By maintaining a 2D boolean array mat to track matches between substrings of the input string s and the pattern p, the algorithm ensures that each character and pattern element is processed efficiently. This approach has a time complexity of O(n * m), where n is the length of the string and m is the length of the pattern, making it both efficient and easy to understand