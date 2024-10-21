---
id: palindrome-partitioning-iv
title: Palindrome Partitioning IV
sidebar_label: Palindrome Partitioning IV
tags: [Palindrome, String Manipulation, Dynamic Programming, DSA]
description: Determine if a string can be partitioned into palindromic substrings with at most k changes.
---

# Palindrome Partitioning IV

### Description
The problem is to determine if a given string can be partitioned into substrings such that every substring is a palindrome, and you are allowed to perform at most `k` changes to the characters of the string.

### Problem Definition
- **Input**: A string `s` and an integer `k`.
- **Output**: Return `true` if the string can be partitioned into palindromes with at most `k` changes; otherwise, return `false`.

### Example
- **Input**: 
  - `s = "abc"`, `k = 1`
  
- **Output**: 
  - `true` (the substring "a" can remain as is, and "b" can be changed to "c" to form "aca").

### Algorithm Overview
1. Use a two-pointer approach to check for palindromes.
2. Count the number of characters that need to be changed for each substring to make it a palindrome.
3. If the total changes exceed `k`, return false; otherwise, return true.

### Time Complexity
- O(n^2) - where `n` is the length of the string.

### C++ Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

bool isPalindrome(string& s, int left, int right) {
    while (left < right) {
        if (s[left++] != s[right--]) return false;
    }
    return true;
}

bool canPartitionWithKChanges(string s, int k) {
    int n = s.size();
    vector<vector<int>> dp(n + 1, vector<int>(k + 1, INT_MAX));
    dp[0][0] = 0;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (isPalindrome(s, j, i - 1)) {
                for (int changes = 0; changes <= k; changes++) {
                    dp[i][changes] = min(dp[i][changes], dp[j][changes]);
                }
            }
        }
        for (int changes = 1; changes <= k; changes++) {
            dp[i][changes] = min(dp[i][changes], dp[i - 1][changes - 1] + 1);
        }
    }

    return dp[n][k] <= k;
}

int main() {
    string s = "abc";
    int k = 1;
    cout << (canPartitionWithKChanges(s, k) ? "True" : "False") << endl;
    return 0;
}
```