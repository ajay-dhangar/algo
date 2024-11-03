---
id: <Wildcard Matching>
title: <Wildcard Matching>
sidebar_label: <Wildcard Matching>
sidebar_position: <1>
description: <This Java solution uses dynamic programming to check if a string s matches a pattern p that includes * and ? as wildcard characters. The wildcardMatchingUtil function is a recursive helper, storing results in a 2D DP array to avoid redundant calculations. The * wildcard can match any sequence, while ? matches any single character.>
tags: [java, dynamic progrmming, data structure]
---

# *Wildcard Matching*

## * Description*
This Java solution uses dynamic programming to check if a string s matches a pattern p that includes * and ? as wildcard characters. The wildcardMatchingUtil function is a recursive helper, storing results in a 2D DP array to avoid redundant calculations. The * wildcard can match any sequence, while ? matches any single character.

## *Approach*

- *Steps :*
Recursive Function with Memoization: The core of the approach is a recursive function wildcardMatchingUtil that checks if the strings match up to specific indices i and j for pattern p and string s respectively. A memoization table dp[i][j] is used to avoid redundant calculations by storing previously computed results.

Base Cases:

If both i and j are -1, this means both strings have been completely matched, so we return 1 (indicating a match).
If i < 0 and j >= 0, this means the pattern p is exhausted while s is not, so we return 0 (no match).
If j < 0 and i >= 0, this means s is exhausted while there are still characters left in p. For a match to be possible, the remaining characters in p must all be '*', which is checked by isAllStars. If isAllStars returns true, we return 1 (match); otherwise, 0 (no match).
Recursive Cases:

If p[i] matches s[j] (either the characters are the same or p[i] is ?), we move to the previous characters in both p and s (i.e., i-1 and j-1).
If p[i] is '*', it can represent either an empty sequence or any sequence of characters:
For an empty sequence, we move to the previous character in p (i.e., i-1).
For any sequence of characters, we stay on i but move j back (i.e., j-1).
These recursive cases are evaluated with an OR condition, and the result is stored in dp[i][j].

Memoization Table Initialization:

The wildcardMatching function initializes the memoization table dp with -1 to signify uncomputed states.
Final Result: The function isMatch returns true if the wildcard matching returns 1, indicating a match, and false otherwise.

## *java implementation *


class Solution {
    public boolean isMatch(String s, String p) {
        return wildcardMatching(p, s) == 1;
    }
    
    private static boolean isAllStars(String S1, int i) {
        for (int j = 0; j <= i; j++) {
            if (S1.charAt(j) != '*')
                return false;
        }
        return true;
    }

    private static int wildcardMatchingUtil(String S1, String S2, int i, int j, int[][] dp) {
        if (i < 0 && j < 0)
            return 1;
        if (i < 0 && j >= 0)
            return 0;
        if (j < 0 && i >= 0)
            return isAllStars(S1, i) ? 1 : 0;

        if (dp[i][j] != -1) return dp[i][j];

        if (S1.charAt(i) == S2.charAt(j) || S1.charAt(i) == '?')
            return dp[i][j] = wildcardMatchingUtil(S1, S2, i - 1, j - 1, dp);
        else {
            if (S1.charAt(i) == '*') {
                return dp[i][j] = (wildcardMatchingUtil(S1, S2, i - 1, j, dp) == 1 || wildcardMatchingUtil(S1, S2, i, j - 1, dp) == 1) ? 1 : 0;
            } else {
                return dp[i][j] = 0;
            }
        }
    }

    private static int wildcardMatching(String S1, String S2) {
        int n = S1.length();
        int m = S2.length();

        int dp[][] = new int[n][m];
        for (int row[] : dp)
            Arrays.fill(row, -1);

        return wildcardMatchingUtil(S1, S2, n - 1, m - 1, dp);
    }
}

---

Output:
---

The function returns true if the pattern matches the string, and false otherwise.
---

- *Time Complexity*
-- The time complexity of this solution is O(nxm).

- *Space Complexity*
--  O(nxm)

# *Conclusion*
This is an efficient approach using memoization to solve the problem in 𝑂(𝑛×𝑚) time. The approach optimally handles the * and ? characters and avoids redundant computations through dynamic programming. However, it uses additional space for the dp table, making it suitable for moderate-size inputs where memory consumption is acceptable..
